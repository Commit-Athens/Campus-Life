# CampusLife: build order for Claude Code

How to use: paste one prompt at a time into Claude Code. Wait until it's done, run the app, check the "Done when" line, commit, then paste the next one. `CLAUDE.md` already has the stack, design system and rules, so the prompts stay short.

Start every session with: "Read CLAUDE.md first."

---

## Phase 1: Foundation (0:00-0:20)

### 1. Scaffold + theme
**Prompt:** Scaffold the project (Vite, React, TS, Tailwind, React Router, lucide-react). Add the color tokens and Inter font from CLAUDE.md. Create `src/components/` with Button (primary and secondary), Chip, SearchInput, ListRow and EmptyState.
**Done when:** `npm run dev` shows a styled demo page with all components.

### 2. App shell + 4-tab bar
**Prompt:** Build the app shell: header with the CampusLife logo (inline SVG mortarboard, "Life" in blue), search and avatar icons, and a bottom TabBar with Home, Προνόμια, Study Groups and Περισσότερα. Add routes `/feed`, `/hub`, `/community`, `/more` with placeholder pages.
**Done when:** tabs switch pages and the active tab is blue.

### 3. Greek strings + university data
**Prompt:** Create `src/i18n/el.ts` for all UI strings, `src/data/universities.ts` (NKUA, NTUA, UniWA), shared types in `types.ts`, and a `useUniversity` context with a `forUniversity(items, id)` helper. Persist the selection in `localStorage`.
**Done when:** switching university in code changes the header badge.

### 4. Splash + onboarding + university picker
**Prompt:** Add a dark splash screen with logo and tagline, then one onboarding screen with the "Ξεκίνα" button and "Παράλειψη" link, where the user picks a university. Show it only once. Add a university switcher from the header badge.
**Done when:** first launch shows onboarding, reload skips it, and the badge opens a working switcher.

---

## Phase 2: Dashboards (0:20-1:15)

### 5. Campus Feed: announcements
**Prompt:** Build the Live Feed page with FeedCards from sample data (at least 5 per university): source avatar, relative time, title, body, source link. Add filter chips (Όλα, Ανακοινώσεις, Αίθουσες, Σχολή).
**Done when:** chips filter the list and a university switch changes the content.

### 6. Campus Feed: student posts + Lost & Found
**Prompt:** Add student post cards and Lost & Found cards with placeholder photos to the feed, with their own filter chips. Add a "show all universities" toggle.
**Done when:** all three card types appear and filter correctly.

### 7. Benefits (Προνόμια)
**Prompt:** Build the Benefits page: chips (Όλα, Μεταφορές, Φαγητό, Βιβλία), a featured banner card at the top, and ListRows with colored icon circles. Add search.
**Done when:** category chips and search both filter the list; "no results" state shows.

### 8. Student Hub: checklist, links, exams, internships
**Prompt:** Under the Hub page, add sections: useful university links (homepage URLs only), first-year checklist, exam calendar (sample dates), internships and hackathons. Use a simple section nav at the top.
**Done when:** every section renders with sample data for each university.

### 9. Study Groups
**Prompt:** Build the Study Groups page: search field, "Προτεινόμενες ομάδες" with GroupRows (name, member count, course), and "Παραδείγματα σημειώσεων" with NoteRows showing PDF info and a download icon. Add the round "+" button in the header.
**Done when:** search filters groups and notes.

### 10. Community: housing + points counter
**Prompt:** Add housing and roommate listing cards and a notes-by-course filter to the Study Groups page (as extra sections or tabs), plus a points counter shown in the header of More.
**Done when:** listings render and the points counter shows a number.

### 11. More page
**Prompt:** Build the More page: static profile card (name, faculty, department, semester), university switcher, a "Roadmap" card listing the future features (non-interactive), and settings placeholders only if they work.
**Done when:** profile shows data for the selected university.

---

## Phase 2b: Campus Plus (from `new-features-to-add.md`)

Demo versions only; see "Campus Plus" in CLAUDE.md for the limits (no phone numbers, no fake URLs, local data only).

### P1. Student verification (demo)
**Prompt:** Add a "Verify" step for the logged-in demo account: full name and student card ID with format validation and clear errors. Show a verified badge in the header. Persist it, clear it on logout.
**Done when:** invalid input shows errors, a valid submit shows the badge, and logout resets it.

### P2. Partner passes
**Prompt:** Add 15 fictional sample partner passes (5 per university) to Προνόμια with a "Show pass" sheet and demo code. Persist claimed passes. Label each "Δείγμα συνεργάτη".
**Done when:** each university shows 5 passes and claim/unclaim survives refresh.

### P3. University source cards
**Prompt:** In the Ανακοινώσεις feed, add a source card per university (blurb, demo "last updated", its "Από το web" items, homepage link only).
**Done when:** the "Από το web" filter shows the card for the selected university, or all three with the toggle on.

### P4. Anonymous support forum
**Prompt:** Add an anonymous forum to Community: random aliases, categories, local posts and replies, and an always-visible safety note (not a crisis service, 112 for emergencies, counselling via the university homepage).
**Done when:** a new thread and a reply appear under an alias and persist; the safety note is visible.

### P5. Campus chat (demo)
**Prompt:** Add a chat to Community with channels #general, #exams, #housing, #random per university, sample messages, and local sending. Lock sending behind verification (P1). Label it as a demo.
**Done when:** unverified users see the lock, verified users can switch channels and send, and messages persist.

---

## Phase 3: Make it work (1:15-2:00)

### 12. Confirm / like buttons
> Done early: replaced by the "Χρήσιμο / Όχι χρήσιμο" vote on both feeds (persisted, +1 point on first vote).

**Prompt:** Make the "Το επιβεβαιώνω" button on feed cards toggle and update the count. Persist in `localStorage`. Add +1 activity point on the first confirm of each card.
**Done when:** the count changes, survives refresh, and the points counter increases.

### 13. Checklist progress
**Prompt:** Make the first-year checklist items checkable with a progress bar (for example "3/8 done"). Persist the state. Award a point for each item completed.
**Done when:** progress updates live and persists.

### 14. Join study groups
**Prompt:** Make the Join button on groups toggle between "Join" and "Joined", update the member count by one, and persist it. Award a point on join.
**Done when:** state survives refresh.

### 15. Notes preview/download
**Prompt:** Make the download icon on a note open a small preview modal and download a sample PDF placed in `public/`.
**Done when:** the modal opens and the file downloads.

### 16. Exam calendar interaction
**Prompt:** Let users tap an exam to add it to "My exams", and show a next-exam countdown at the top of the Hub.
**Done when:** added exams persist and the countdown is correct.

---

## Phase 4: Polish (2:00-2:30)

### 17. Content pass
**Prompt:** Review all sample data. Make it realistic, in Greek, matched to each university's faculties. Make sure every section has at least 4-5 items per university and no real private data.
**Done when:** no section looks empty or generic for any university.

### 18. Empty states, loading, and errors
**Prompt:** Add empty states and no-results messages to every list and filter. Fix any button that does nothing.
**Done when:** a click-through finds no dead buttons.

### 19. Visual polish
**Prompt:** Compare each screen to the design system in CLAUDE.md. Fix spacing, radius, type sizes, and icon consistency. Check at 390px width.
**Done when:** all screens look consistent.

---

## Phase 5: Ship (2:30-3:00)

### 20. Test and fix
**Prompt:** Run `npm run build` and `npm run lint` and fix all errors. Then walk through every route at mobile width and list anything broken.
**Done when:** build passes and the broken-items list is empty.

### 21. Deploy
**Prompt:** Prepare the app for Vercel deployment (check build output, add SPA fallback so routes like `/feed` work on refresh). Tell me the exact steps to deploy.
**Done when:** a public URL works on your phone.

---

## If you run out of time, cut in this order
0. Campus Plus, from the end: chat (P5), forum (P4), source cards (P3), passes (P2), verification (P1)
1. English language toggle
2. Housing listings (#10)
3. Exam countdown (#16)
4. Notes preview modal (#15)
5. "All universities" toggle (#6)

Never cut: feed + confirm (#5, #12), benefits (#7), checklist (#13), study group join (#14), university switcher (#4), deploy (#21).
