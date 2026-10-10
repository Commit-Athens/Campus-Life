export interface Env {
  ASSETS: Fetcher
  ELEVENLABS_API_KEY: string
  /** Optional override; defaults to a multilingual ElevenLabs voice. */
  ELEVENLABS_VOICE_ID?: string
}

const DEFAULT_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL' // Sarah — multilingual
const DEFAULT_MODEL = 'eleven_multilingual_v2'

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders },
  })
}

async function handleTts(request: Request, env: Env): Promise<Response> {
  if (!env.ELEVENLABS_API_KEY) {
    return json(
      { error: 'ELEVENLABS_API_KEY is not configured on this Worker' },
      503,
    )
  }

  let body: { text?: string; voiceId?: string; modelId?: string }
  try {
    body = (await request.json()) as typeof body
  } catch {
    return json({ error: 'Expected JSON body' }, 400)
  }

  const text = (body.text || '').trim()
  if (!text) return json({ error: 'text is required' }, 400)
  if (text.length > 2500) return json({ error: 'text too long (max 2500)' }, 400)

  const voiceId = (body.voiceId || env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID).trim()
  const modelId = (body.modelId || DEFAULT_MODEL).trim()

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
        model_id: modelId,
      }),
    },
  )

  if (!upstream.ok) {
    const detail = await upstream.text()
    return json(
      {
        error: 'ElevenLabs request failed',
        status: upstream.status,
        detail: detail.slice(0, 500),
      },
      upstream.status === 401 || upstream.status === 403 ? 502 : 502,
    )
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') || 'audio/mpeg',
      'Cache-Control': 'no-store',
      ...corsHeaders,
    },
  })
}

async function handleHealth(env: Env): Promise<Response> {
  return json({
    ok: true,
    elevenlabsConfigured: Boolean(env.ELEVENLABS_API_KEY),
    defaultVoiceId: env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID,
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    if (url.pathname === '/api/elevenlabs/health' && request.method === 'GET') {
      return handleHealth(env)
    }

    if (url.pathname === '/api/elevenlabs/tts' && request.method === 'POST') {
      return handleTts(request, env)
    }

    return env.ASSETS.fetch(request)
  },
}
