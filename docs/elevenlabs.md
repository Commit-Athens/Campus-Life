# ElevenLabs on CampusLife

The Worker exposes a server-side proxy so the React app (and future agents) can use ElevenLabs without shipping the API key to the browser.

## Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/elevenlabs/health` | `{ elevenlabsConfigured: boolean }` |
| `POST` | `/api/elevenlabs/tts` | Body `{ text }` (max 2500 chars) → `audio/mpeg` |

The proxy is same-origin only (no CORS), rejects requests from other origins, and is rate limited to 10 requests per IP per minute (`TTS_LIMITER` in `wrangler.jsonc`). Voice and model are fixed server-side. Upstream errors are logged (`npx wrangler tail`), not returned to the browser.

## Cloudflare secret

Set once on the `campuslife` Worker (not in git):

```bash
npx wrangler secret put ELEVENLABS_API_KEY
# optional:
npx wrangler secret put ELEVENLABS_VOICE_ID
```

Local development: copy `.dev.vars.example` → `.dev.vars`.

## Client helper

```ts
import { playSpeech } from '../lib/elevenlabs'

await playSpeech({ text: 'Γεια σου από το CampusLife' })
```
