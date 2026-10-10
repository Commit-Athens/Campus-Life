# CampusLife

A mobile-first campus app prototype for university students in Athens, covering three universities:

| ID | University | Homepage |
|----|-----------|----------|
| `nkua` | National and Kapodistrian University of Athens | https://www.uoa.gr |
| `ntua` | National Technical University of Athens | https://www.ntua.gr |
| `uniwa` | University of West Attica | https://www.uniwa.gr |

Built in a ~3-hour hackathon sprint. The goal is a polished, working demo, not a production system.

## Multi-university model

- The user picks a university once (first-launch picker, changeable from a switcher in the app header). Persist the choice in `localStorage`; default to `nkua`.
- Every content item in `src/data/` carries a `universityId: 'nkua' | 'ntua' | 'uniwa' | 'all'`. `'all'` means shared across universities (e.g. cross-campus hackathons).
- Pages show items matching the selected university plus `'all'`. Both feeds and Community get an extra toggle to see "All universities".
- Keep university metadata (name, short name, accent color, homepage) in one file: `src/data/universities.ts`. Never hard-code a university name in a component.
- Balance sample data: at least 4-5 items per section per university so no university looks empty.
- Faculties, departments, and course names in sample data must fit the selected university (e.g. engineering schools for NTUA, not law).

## Prime directives

1. **Demo over completeness.** A few interactions that really work beat many buttons that do nothing. Never add a control that has no behavior.
2. **Sample data by default.** All content comes from static files in `src/data/`. No backend, no auth, no network calls.
3. **Stay in scope.** Build only what is listed under "In scope". Anything under "Out of scope" appears at most as a non-interactive "Coming soon" roadmap item.
4. **Small, reviewable steps.** One feature at a time. After each one, make sure the app builds and runs, then stop and summarize in 1-2 lines.
5. **Don't invent facts.** Sample data must be plausible but clearly sample. Link only to real homepage-level URLs (https://www.uoa.gr, https://www.ntua.gr, https://www.uniwa.gr). Never fabricate deep links, phone numbers, or official-looking notices that could mislead a real student.

## Stack

- React + Vite + TypeScript
- Tailwind CSS (mobile-first) with the brand tokens below, Inter font (Greek subset), lucide-react for icons
- React Router for navigation (bottom tab bar on mobile)
- State: `useState` / Context. Persist small things (likes, checklist, joins) in `localStorage`, wrapped in try/catch
- Deploy: Vercel (static build)

No other dependencies unless clearly needed. Ask before adding one.

## In scope: three dashboards

Tab labels and layouts for these dashboards are defined in "Brand and design system" below.

### 1. Campus Feed: two separate feeds, each its own bottom tab
- **Official feed (`/feed`)**: university announcements, each with a source link, plus "Από το web" items (static sample data standing in for crawled info; no real crawling). Chips: Όλα / Ανακοινώσεις / Αίθουσες / Σχολή / Από το web
- **Student feed (`/posts`)**: student posts (simple social feed) and Lost & Found posts with photos (placeholder images in `public/`). Chips: Όλα / Αναρτήσεις / Χαμένα & Ευρεθέντα
- Every card has a working "Χρήσιμο / Όχι χρήσιμο" (useful / not useful) vote with live counts, persisted; first vote on a card gives +1 activity point

### 2. Student Hub (`/hub`)
- Useful university links
- First-year checklist with progress bar (persisted)
- Student discounts and affordable food, with search + category filter
- Exam calendar (sample dates)
- Internships and hackathons list

### 3. Student Community (`/community`)
- Study groups with upcoming sessions and a working Join / Joined toggle
- Course notes directory (list + filter by course)
- Housing and roommate listing cards
- Simple activity points counter (increments on likes, joins, checklist items)

### 4. Campus Plus (demo versions, from `new-features-to-add.md`)
Adopted from the team's "build now" list, scaled to what a static demo can honestly show. Everything is local sample data, clearly labelled as demo.

- **Student verification (demo)**: a "Verify" step on top of the existing demo login. Collects full name and student card ID, validates format only (no phone numbers, no real registry check). Verified accounts get a badge in the header; posting in chat requires it. Persisted in `localStorage`, reset on logout.
- **Campus chat (demo)** in Community: channels `#general`, `#exams`, `#housing`, `#random` per university, sample messages, send/receive stored locally. Locked with a "Verify to chat" prompt when not verified. Label it as a demo, not real-time.
- **Partner passes** in Προνόμια: 15 fictional sample partners (5 per university, near each campus) with offer, category and a "Show pass" sheet with a demo code; claimed state persisted. Every pass says "Δείγμα συνεργάτη". Invent names that can't be mistaken for real businesses or transit operators.
- **Anonymous support forum** in Community: random aliases (e.g. "Ανώνυμη Αλεπού"), categories (άγχος, στέγαση, μαθήματα, οικονομικά, άλλο), post and reply locally. Always show a safety note: not a crisis service; in an emergency call 112; for support, contact the university's counselling service via its homepage.
- **University sources (demo crawl)** in the Ανακοινώσεις feed: one card per university with a short blurb, a demo "last updated" time and its "Από το web" items. Links go only to the real homepage; no fake source URLs. Stays at the three supported universities (AUEB, AUTH and Patras are roadmap).

## Out of scope (roadmap only, no code)

Live university crawling (real fetch/scrape pipeline), real-time chat backend (WebSockets), real student verification (SSO / registry), real discount redemption with partners, more universities (AUEB, AUTH, Patras), automatic exam collection, carpool matching, AR navigation, voice assistant, LLM/RAG assistant.

The demo versions under "Campus Plus" are in scope; the real systems behind them are not. Show these on a small "Roadmap" card in More, not as working features.

## Project structure

```
src/
  components/    shared UI (Card, Chip, TabBar, ProgressBar, EmptyState)
  pages/         Feed.tsx, Hub.tsx, Community.tsx
  data/          *.ts or *.json sample data, typed
  i18n/          el.ts (and en.ts if time allows): all UI strings
  hooks/         useLocalStorage.ts, useUniversity.tsx
  types.ts       shared types
public/          placeholder images
```

Keep components small and typed. Co-locate nothing exotic; keep it easy for a student to read and explain.

## Conventions

- TypeScript strict; no `any`
- Functional components, hooks only
- Tailwind utility classes; extract a component rather than repeating long class strings
- Data files export typed arrays (e.g. `export const announcements: Announcement[]`), each item with a `universityId`
- A shared `useUniversity()` hook/context exposes the selected university; filter data through one helper (`forUniversity(items, id)`), not ad-hoc in each page
- Every list view needs an empty state; every filter needs a "no results" message
- Accessible basics: buttons are `<button>`, images have `alt`, tap targets at least 44px
- UI strings come from `src/i18n/` (Greek first), never inline in components
- Colors only via theme tokens; spacing and radius consistent with the design system above

## Brand and design system

Brand: **CampusLife**, with "Life" in the primary blue. Tagline (Greek): **"Μάθε τι γίνεται. Πριν πας."** ("Know what's happening. Before you go."). Logo: a mortarboard (graduation cap) mark in blue. Recreate it as an inline SVG; do not use external image assets for the logo or icons.

Look and feel: clean, friendly, light UI. White cards on a very light blue-grey page, generous spacing, large rounded corners (cards `rounded-2xl`, buttons and chips fully rounded), soft shadows or thin borders, one blue accent.

### Colors (define as Tailwind theme tokens, never hard-code hex in components)

| Token | Hex | Use |
|-------|-----|-----|
| `primary` | `#2563EB` | Buttons, active tab, links, "Life" in the logo |
| `ink` | `#0F172A` | Text (the splash uses the fixed `night` token, same hex) |
| `surface` | `#E2E8F0` | Chips, inputs, dividers, tags (page background is a lighter tint, e.g. `#F8FAFF`) |
| `success` | `#22C55E` | Confirmed, joined, completed |
| `warning` | `#F59E0B` | Pending, deadlines |
| `error` | `#EF4444` | Errors, urgent notices |

Pale tints of `primary` / `success` / `warning` are fine for icon circles and tag backgrounds. University accent colors (from `universities.ts`) appear only on the small university badge in the header, never as the main theme.

### Typography: Inter (Google Fonts, with Greek subset)

| Style | Size / line height | Weight |
|-------|--------------------|--------|
| H1 | 32/40 | Bold |
| H2 | 24/32 | Semibold |
| H3 | 18/26 | Semibold |
| Body | 16/24 | Regular |
| Caption | 14/20 | Regular |

### Icons
Outline style, 1.5-2px stroke, via `lucide-react`: `Home`, `Gift`, `Users`, `BookOpen`, `Megaphone`, `Calendar`, `MapPin`, `Star`, `MessageCircle`, `Settings`, `Search`, `Bell`, `ChevronRight`, `Download`. Nothing decorative that isn't from this set.

### Components (build once in `src/components/`, reuse everywhere)
- **Button**: Primary (solid blue, full-width pill) and Secondary (white, blue outline, pill)
- **Chip / Tag**: pill on `surface`; active filter chip is solid `primary` with white text; hashtag tags like `#Μαθηματικά` use pale blue
- **SearchInput**: rounded, `surface` background, search icon, Greek placeholder ("Αναζήτηση...")
- **ListRow**: colored icon circle, title, one-line description, chevron
- **FeedCard**: source avatar + name + relative time, title, body, vote pills "Χρήσιμο (342)" / "Όχι χρήσιμο (12)", optional image
- **GroupRow / NoteRow**: group icon, name, "32 μέλη · Μαθηματικά"; notes show "PDF · 12 σελ." with a download icon
- **Toggle**, **Avatar row** (name, department, year), **ProgressBar**, **EmptyState**
- **TabBar**: bottom bar, active tab in `primary`, small labels

### Layout and navigation
- Mobile-first (design at 390px; center in a max-width container on desktop)
- Persistent bottom tab bar with 5 tabs: two feeds, the Hub, Community, and a menu:

| Tab (Greek / English) | Route | Content |
|-----------------------|-------|---------|
| Ανακοινώσεις / Live Feed | `/feed` | Official feed: announcements + web info |
| Φοιτητές / Student feed | `/posts` | Student posts + Lost & Found |
| Προνόμια / Benefits | `/hub` | Student Hub dashboard (benefits first, then checklist, links, exams, internships) |
| Study Groups | `/community` | Student Community dashboard |
| Περισσότερα / More | `/more` | Profile, university switcher, settings, roadmap card |

- Header: logo + "CampusLife" on the left; search and avatar on the right; small university badge (short name) opens the switcher
- Splash (dark `ink` background, centered logo and tagline) then a one-screen onboarding (illustration placeholder, "Όλα όσα χρειάζεσαι για τη φοιτητική ζωή", primary "Ξεκίνα" button, "Παράλειψη" link). Show onboarding once, remembered in `localStorage`; it is also where the university is picked
- Light and dark themes: "Αυτόματο" (follows the device, default), "Φωτεινό" or "Σκοτεινό", chosen in More → Ρυθμίσεις. Dark mode redefines the same color tokens (see `src/index.css`), so components never need `dark:` variants. The splash is always dark (`night` token)

### Screen patterns to match
- **Live Feed**: title "Live Feed", filter chips (Όλα, Ανακοινώσεις, Αίθουσες, Σχολή), then a vertical list of FeedCards
- **Benefits (Προνόμια)**: chips (Όλα, Μεταφορές, Φαγητό, Βιβλία), a featured banner card at the top (e.g. student transport pass, with a round blue arrow button), then ListRows such as free meals, shop discounts, scholarships, free books
- **Study Groups**: search field, section "Προτεινόμενες ομάδες" (with "Όλες" link) listing GroupRows, then section "Παραδείγματα σημειώσεων" listing NoteRows; a round blue "+" button in the header

### Language
- UI is **Greek-first**. Put all UI strings in `src/i18n/el.ts` (and `en.ts` if time allows); components read strings from there, never inline text
- Sample content (announcements, groups, courses) is also Greek, matching the selected university
- English is a stretch goal: a language toggle in More only if everything else is done

## Commands

```bash
npm install
npm run dev      # local dev
npm run build    # must pass before every commit
npm run lint
```

## Workflow

- Work on a feature branch; commit small with clear messages; never commit `.env` or secrets
- Before saying a task is done: `npm run build` passes, the page renders on a mobile viewport, and every button on it does something
- If a request is ambiguous or conflicts with scope, ask one short question instead of guessing

## Time plan (3 hours)

| Time | Focus |
|------|-------|
| 0:00-0:20 | Scaffold, routing, tab bar, shared layout, university picker + context |
| 0:20-1:15 | Build dashboards with sample data (Feed and Hub first) |
| 1:15-2:00 | Wire interactions: likes, filters, checklist, joins |
| 2:00-2:30 | Polish: realistic content, icons, empty states, styling |
| 2:30-3:00 | Test, fix, mobile check, deploy to a shareable URL |

## Definition of done (MVP)

- [ ] University picker/switcher for NKUA, NTUA and UniWA, with content that changes accordingly
- [ ] Three dashboards with clear navigation
- [ ] Announcements with source links
- [ ] Student posts and Lost & Found sample content
- [ ] Useful university resources and student benefits
- [ ] Study sessions with working join, and a first-year checklist with progress
- [ ] Matches the brand design system (colors, Inter, components, 5-tab bar, Greek-first UI)
- [ ] Campus Plus demos: verification, chat, 15 partner passes, anonymous forum, university source cards (if time allows, see BUILD_PLAN cut order)
- [ ] Polished mobile layout, deployed to a live URL
