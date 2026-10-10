# Task split

Two people build the rest of CampusLife in parallel, each with their own agent. Work is split by tab, so the two tracks rarely touch the same files. Read `CLAUDE.md` first; step numbers refer to `BUILD_PLAN.md`.

Done already (on `main`): steps 1-7 and 12, i.e. app shell, universities, onboarding, demo login, both feeds with votes and comments, Benefits.

## Track A: gribone — Hub (`/hub`) and More (`/more`)

| Order | Step | Task |
|---|---|---|
| 1 | 8 | Hub sections: university links (homepages only), first-year checklist, exam calendar, internships and hackathons, section nav |
| 2 | 13 | Checklist progress bar, persisted, +1 point per item |
| 3 | P1 | Student verification (demo): name + student card ID, verified badge in header. **Do this early: Track B's chat depends on it** |
| 4 | P2 | 15 partner passes (5 per university) in Προνόμια with "Show pass" sheet |
| 5 | 16 | My exams + next-exam countdown |
| 6 | 11 | More page: profile card, university switcher, Roadmap card |
| 7 | 10 (part) | Points counter in More (read `usePoints().points`) |

Owns: `src/pages/Hub.tsx`, `src/pages/More.tsx`, `src/components/Header.tsx`, `src/hooks/useAuth.tsx`, `src/components/AuthProvider.tsx`, new data files for links, checklist, exams, internships, passes.

## Track B: Odisseas — Community (`/community`) and feed extras

| Order | Step | Task |
|---|---|---|
| 1 | 9 | Study Groups: search, "Προτεινόμενες ομάδες" (GroupRows), "Παραδείγματα σημειώσεων" (NoteRows), round "+" button |
| 2 | 14 | Join / Joined toggle, member count +1, persisted, +1 point on join |
| 3 | 10 (part) | Housing and roommate cards, notes-by-course filter |
| 4 | 15 | Notes preview sheet + sample PDF download from `public/` |
| 5 | P3 | University source cards in the Ανακοινώσεις feed (`src/pages/Feed.tsx`), homepage links only |
| 6 | P4 | Anonymous support forum in Community, with the safety note |
| 7 | P5 | Campus chat (demo) in Community, sending locked until verified (see contract below) |

Owns: `src/pages/Community.tsx`, `src/pages/Feed.tsx`, new data files for groups, notes, housing, forum, chat, and any new components for those.

## Together, at the end

| Step | Task |
|---|---|
| 17 | Content pass: each person checks the sample data in their own track |
| 18 | Empty states and dead-button sweep: each in their own track |
| 19 | Visual polish at 390px: one person per tab, then swap and review |
| 20 | Build, lint, click through every route on a phone |
| 21 | Deploy is automatic on merge to `main` (Cloudflare workflow); just confirm the live site |

## Shared contracts

- **Verification (P1 → P5):** Track A adds `verified: boolean` and `verify(name, studentId)` to the auth context, so `useAuth().verified` tells you if the user may post. Until P1 is merged, Track B uses `const verified = false` and swaps it in later.
- **Points:** call `usePoints().award('<kind>:<id>')` (e.g. `join:nkua-g1`, `forum:post-123`). Each key counts once.
- **University filter:** always `forUniversity(items, university.id)`; feeds use `useFeedScope()` for the all-universities toggle.
- **Reuse, don't copy:** `Sheet` for dialogs, `CardActions` for votes/comments, `Chip`, `ListRow`, `EmptyState`, `Toggle`, `SearchInput`, `Button` / `ButtonLink`.

## Avoiding merge conflicts

- **`src/i18n/el.ts`:** add strings only in your own top-level section, appended at the end of the object. Track A: `hub`, `checklist`, `exams`, `passes`, `verify`, `more`. Track B: `community`, `groups`, `notes`, `housing`, `forum`, `chat`, `sources`.
- **`src/types.ts`:** append new types at the end of the file under a `// Track A` or `// Track B` comment.
- **`App.tsx`, `TabBar.tsx`, `index.css`:** shouldn't need changes. If you must, keep it to one small commit and tell the other person.
- **Branches:** one branch and PR per step (`feat/hub-...` for Track A, `feat/community-...` for Track B). Pull `main` before starting each step. Merging to `main` deploys, so merge only when `npm run build` and `npm run lint` pass.
- **PR #1** edits the old static prototype (`index.html`), which is no longer the app. Close it; its feature list now lives in `new-features-to-add.md` and Phase 2b of `BUILD_PLAN.md`.

## Deploy

Every merge to `main` runs `.github/workflows/deploy.yml`: `npm ci`, `npm run build`, then `wrangler deploy`. That deploys the `campuslife` Worker (`worker/index.ts`, the ElevenLabs proxy) and serves `dist/` as static assets.

### Open issue: deploys fail with "Invalid access token" (since 2026-10-10 12:05)

- **Symptom:** the "Deploy Worker" step fails with `Authentication error [code: 10000]` / `Invalid access token [code: 9109]`. The build step passes.
- **Cause:** the Cloudflare API token in the `CLOUDFLARE_API_TOKEN` GitHub secret was revoked or expired on Cloudflare's side. The secret hasn't changed since 11:16 and deployed fine at 11:39 and 11:48. Not a code problem: `wrangler deploy --dry-run` on `main` passes.
- **Live site:** still serves the last successful deploy (`main` as of PR #3). PRs #4 and #5 aren't live yet.
- **Fix (Odisseas, Cloudflare account owner):**
  1. Cloudflare → My Profile → API Tokens → Create Token → **"Edit Cloudflare Workers"** template, scoped to the campuslife account, **no TTL**.
  2. GitHub → Settings → Secrets and variables → Actions → update **`CLOUDFLARE_API_TOKEN`** (or `gh secret set CLOUDFLARE_API_TOKEN`). Don't paste the token in chat.
  3. Actions → "Deploy to Cloudflare" → re-run the latest run.
  4. For the voice feature (PR #4): `npx wrangler secret put ELEVENLABS_API_KEY`.



> Read CLAUDE.md and TASKS.md first. You are working on Track B (Community and feed extras). Pull main, create a branch for step 9, and build it. Stay inside the files Track B owns, follow the shared contracts and the merge-conflict rules, then run `npm run build` and `npm run lint` and stop with a 1-2 line summary.
