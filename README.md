# CampusLife

**Μάθε τι γίνεται. Πριν πας.** (Know what's happening. Before you go.)

CampusLife is a mobile-first campus app prototype for university students in Athens. It brings official announcements, student posts, benefits, study groups and community tools together in one Greek-first app. It was built in a ~3-hour hackathon sprint as a polished, working demo.

**Live demo:** https://campuslife.gr

> **This is a demo.** All content is sample data from static files in `src/data/`. Logins, student verification, chat, partner passes and the "Από το web" items run in the browser and are stored locally. Nothing is connected to any university system.

## Universities

The user picks a university during onboarding and can switch it from the header badge. Content changes to match, and feeds and Community can also show all universities.

| ID | University | Homepage |
|----|-----------|----------|
| `nkua` | National and Kapodistrian University of Athens | https://www.uoa.gr |
| `ntua` | National Technical University of Athens | https://www.ntua.gr |
| `uniwa` | University of West Attica | https://www.uniwa.gr |

## Features

The app has five bottom tabs:

| Tab | Route | What's in it |
|-----|-------|--------------|
| Ανακοινώσεις | `/feed` | Official announcements with source links, "Από το web" items and university source cards |
| Φοιτητές | `/posts` | Student posts and Lost & Found with photos, comments, and a new-post sheet |
| Προνόμια | `/hub` | Student benefits, partner passes, first-year checklist, useful links, exam calendar with "my exams" countdown, internships and hackathons |
| Study Groups | `/community` | Study groups with Join, course notes, housing listings, anonymous support forum, campus chat (demo) |
| Περισσότερα | `/more` | Profile, verification, university switcher, theme (Αυτόματο / Φωτεινό / Σκοτεινό), activity points, roadmap |

Other features:

- **Χρήσιμο / Όχι χρήσιμο votes** on every feed card, with live counts
- **Activity points** for votes, joins and checklist items
- **Student verification (demo):** checks the format of the name and student ID only. You must be verified to post in the campus chat.
- **Campus assistant:** a floating widget that answers questions by keyword search over the sample data (no AI model or network call)
- **Voice tips (optional):** text-to-speech through ElevenLabs, via a server-side proxy so the API key never reaches the browser
- Likes, joins, checklist progress, votes and settings are saved in `localStorage`

### Demo accounts

Pick an account on the start screen, or sign in with one of the accounts in `src/data/demoAccounts.ts` (one per university). They all use the password `demo1234`. These are fake accounts for the demo only.

## Tech stack

- React 19, TypeScript, Vite
- Tailwind CSS 4 with brand color tokens, light and dark themes
- React Router
- lucide-react icons, Inter font with the Greek subset
- Cloudflare Workers: serves the static build and the `/api/elevenlabs/*` proxy (`worker/index.ts`)

## Getting started

Requires Node.js 22 or newer.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and production build into dist/
npm run lint     # oxlint
```

In dev mode, Vite proxies `/api` to the live Worker (see `vite.config.ts`), so voice tips work without any local setup.

### Running the Worker locally (optional)

```bash
cp .dev.vars.example .dev.vars   # add your ELEVENLABS_API_KEY (never commit .dev.vars)
npm run build
npx wrangler dev
```

See [docs/elevenlabs.md](docs/elevenlabs.md) for the proxy endpoints and its limits (same-origin only, 10 requests per IP per minute).

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the app and deploys it with `wrangler deploy`. It needs these GitHub Actions secrets:

- `CLOUDFLARE_API_TOKEN` ("Edit Cloudflare Workers" template)
- `CLOUDFLARE_ACCOUNT_ID`

The ElevenLabs key lives only on the Worker:

```bash
npx wrangler secret put ELEVENLABS_API_KEY
```

## Project structure

```
src/
  components/   shared UI (Button, Chip, FeedCard, ListRow, Sheet, TabBar, ...)
  pages/        one file per tab, plus onboarding and login
  data/         typed sample data, each item tagged with a universityId
  hooks/        useUniversity, useAuth, useLocalStorage, useVotes, usePoints, ...
  i18n/         el.ts: all UI strings (Greek)
  lib/          assistant search, speech, verification helpers
worker/         Cloudflare Worker (static assets + ElevenLabs proxy)
public/         images and sample note files
```

## Contributing

- Read [CLAUDE.md](CLAUDE.md) for the scope, design system and conventions
- UI strings go in `src/i18n/el.ts`, colors come from theme tokens, and lists filter through `forUniversity()`
- Work on a feature branch. `npm run build` and `npm run lint` must pass before you merge, because merging to `main` deploys.

## Roadmap

These are not built. They appear only on the Roadmap card in More: live university crawling, real-time chat, real student verification (SSO), real partner discounts, more universities (AUEB, AUTH, Patras), automatic exam collection, carpooling, AR navigation and an AI assistant.
