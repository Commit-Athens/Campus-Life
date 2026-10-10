# ElevenLabs on CampusLife

The Worker exposes a server-side proxy so the React app (and future agents) can use ElevenLabs without shipping the API key to the browser.

## Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/elevenlabs/health` | `{ elevenlabsConfigured: boolean }` |
| `POST` | `/api/elevenlabs/tts` | Body `{ text, voiceId?, modelId? }` → `audio/mpeg` |

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
