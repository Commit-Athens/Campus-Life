# New Features to Add (Build Now)

> **Adopted with changes.** These are now in scope as demo versions: see "Campus Plus" in `CLAUDE.md` and Phase 2b in `BUILD_PLAN.md`. Main differences: no phone numbers in verification, chat is local-only, passes are scoped 5 per university, and crawl cards stay at ΕΚΠΑ / ΕΜΠ / ΠΑΔΑ with homepage links only (no fake source URLs).

These items were previously “later / roadmap.” They are now **in scope for the next build** as demo-ready prototype features (sample data + real UI interactions unless noted).

## 1. Student verification login

**Priority:** Build now  
**Difficulty:** Medium

### Requirements

- Login / verify screen before gated features unlock
- Collect and validate:
  - Full name
  - Phone number
  - Student card ID
- Persist session locally for the demo (no real university SSO yet)
- Logged-out users can browse public dashboards; chat requires login

### Acceptance

- [ ] User can submit name, phone, and student card ID
- [ ] Invalid / empty fields show clear errors
- [ ] Verified session shows name in the header
- [ ] User can log out and re-verify

---

## 2. Real-time campus chat (Discord-like, logged-in only)

**Priority:** Build now  
**Difficulty:** Medium–Hard

### Requirements

- Channel list (e.g. `#general`, `#exams`, `#housing`, `#random`)
- Message list with author + timestamp
- Send messages only when verified/logged in
- Guest state: locked UI with CTA to verify
- Demo mode may simulate “live” messages with local storage (true WebSocket backend can follow)

### Acceptance

- [ ] Logged-out users cannot post
- [ ] Logged-in users can switch channels and send messages
- [ ] Messages persist for the session (local demo OK)
- [ ] Feels like a simple Discord-style campus chat

---

## 3. Partner discount passes (15 dummy passes)

**Priority:** Build now  
**Difficulty:** Easy

### Requirements

- Add **15** sample partner passes (cafes, bookshops, gyms, transit, food, local services)
- Each pass shows: partner name, offer, category, and a “Show pass” / claim interaction
- Dummy only — no real partner redemption API

### Suggested sample partners

1. Exarchia Coffee Collective — −20% drinks  
2. Pangrati Bakery — free tea with pastry  
3. Campus Book Nook — −15% textbooks  
4. Zografou Gyro Spot — student menu €4.50  
5. Metro Student Deal — day pass promo  
6. Syntagma Copy Center — −10% printing  
7. Kolonaki Study Cafe — 2-for-1 freddo  
8. Pedion Areos Bike Share — first hour free  
9. Local Laundromat — −25% wash+fold  
10. Museum Student Sunday — free entry day  
11. University Gym Partner — 1-week trial  
12. Plaka Souvlaki — free fries with wrap  
13. Tech Repair Desk — −15% screen fix  
14. Night Bus Cafe — late-night student rate  
15. Neighborhood Barber — student cut €10  

### Acceptance

- [ ] All 15 passes visible in the Hub / Passes area
- [ ] User can open / claim a pass (demo confirmation)
- [ ] Clear “sample partner” labeling

---

## 4. Anonymous support forum

**Priority:** Build now  
**Difficulty:** Medium

### Requirements

- Forum threads with anonymous display names (e.g. “Anon Fox”, “Anon Oak”)
- Categories: stress, housing, courses, money, other
- Post a new anonymous question
- Reply without revealing real identity
- Soft safety note: not a crisis service; show emergency/help pointer

### Acceptance

- [ ] Browse threads without login
- [ ] Posting works with anonymous alias
- [ ] Replies appear under the thread
- [ ] Safety disclaimer visible

---

## 5. Dummy university website crawl pages

**Priority:** Build now  
**Difficulty:** Easy–Medium

### Requirements

- Dedicated pages/sections for several Greek universities
- Present as “crawled from university sites” sample content (announcements, deadlines, links)
- Not live crawling yet — static/demo data that shows the product direction

### Universities (initial set)

1. National and Kapodistrian University of Athens (NKUA / UoA)  
2. National Technical University of Athens (NTUA)  
3. Athens University of Economics and Business (AUEB)  
4. Aristotle University of Thessaloniki (AUTH)  
5. University of Patras  

### Per-university card/page should include

- University name + short blurb  
- 2–3 sample “crawled” announcements with fake source URLs  
- Last-updated timestamp (demo)  
- Link out to the real university homepage  

### Acceptance

- [ ] At least 5 university pages/cards
- [ ] Each has sample crawled announcements
- [ ] UI makes clear this is demo crawl data (roadmap to live crawl)

---

## Still later (not in this build)

- Live university website crawling (real fetch/scrape pipeline)
- Real discount redemption with partners
- Automatic exam calendar collection
- Carpool matching
- AR navigation and voice assistant
- Production student SSO / registry verification

---

## Build order (suggested)

1. Student verification login  
2. Discount passes (15)  
3. University crawl demo pages  
4. Anonymous support forum  
5. Logged-in campus chat  

## Rule of thumb

Ship working demo flows with sample data first. Prefer a few solid interactions (verify → chat, claim pass, post anonymously) over empty screens for every edge case.
