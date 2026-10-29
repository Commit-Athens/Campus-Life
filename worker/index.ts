/** Cloudflare rate limiting binding (see "ratelimits" in wrangler.jsonc). */
interface RateLimit {
  limit(options: { key: string }): Promise<{ success: boolean }>
}

export interface Env {
  ASSETS: Fetcher
  ELEVENLABS_API_KEY: string
  /** Optional override; defaults to a multilingual ElevenLabs voice. */
  ELEVENLABS_VOICE_ID?: string
  /** Caps TTS calls per IP so the key's credits can't be drained. */
  TTS_LIMITER?: RateLimit
}

const DEFAULT_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL' // Sarah — multilingual
const MODEL_ID = 'eleven_multilingual_v2'

// No CORS headers: the API is same-origin only, so other sites can't call it from a browser.

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

async function handleTts(request: Request, env: Env): Promise<Response> {
  // Browsers always send Origin on a POST; reject calls from other sites.
  const origin = request.headers.get('Origin')
  if (origin && origin !== new URL(request.url).origin) {
    return json({ error: 'Forbidden' }, 403)
  }

  if (env.TTS_LIMITER) {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    const { success } = await env.TTS_LIMITER.limit({ key: ip })
    if (!success) return json({ error: 'Too many requests, try again in a minute' }, 429)
  }

  if (!env.ELEVENLABS_API_KEY) {
    return json(
      { error: 'ELEVENLABS_API_KEY is not configured on this Worker' },
      503,
    )
  }

  let body: { text?: string }
  try {
    body = (await request.json()) as typeof body
  } catch {
    return json({ error: 'Expected JSON body' }, 400)
  }

  const text = (body.text || '').trim()
  if (!text) return json({ error: 'text is required' }, 400)
  if (text.length > 2500) return json({ error: 'text too long (max 2500)' }, 400)

  // Voice and model are fixed server-side; clients only choose the text.
  const voiceId = env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID

  const upstream = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
      }),
    },
  )

  if (!upstream.ok) {
    // Log the details for `wrangler tail`, but don't send account or quota info to the browser.
    console.error('ElevenLabs request failed', upstream.status, (await upstream.text()).slice(0, 500))
    return json({ error: 'Speech service unavailable' }, 502)
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') || 'audio/mpeg',
      'Cache-Control': 'no-store',
    },
  })
}

async function handleHealth(env: Env): Promise<Response> {
  return json({
    ok: true,
    elevenlabsConfigured: Boolean(env.ELEVENLABS_API_KEY),
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/elevenlabs/health' && request.method === 'GET') {
      return handleHealth(env)
    }

    if (url.pathname === '/api/elevenlabs/tts' && request.method === 'POST') {
      return handleTts(request, env)
    }

    return env.ASSETS.fetch(request)
  },
}
