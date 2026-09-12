# Time Travel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish an English interactive finance/history course that turns any arrival year from 3000 BCE through 2026 CE into a sourced time-traveler wealth briefing.

**Architecture:** A framework-free Vite/TypeScript static site resolves a civil BCE/CE year into one of 63 curated briefing windows. Researched briefing modules feed a small DOM UI, URL state, and local-only course progress; GitHub Pages serves the build at the custom domain.

**Tech Stack:** Vite 8, TypeScript 6, Vitest 4, jsdom 29, semantic HTML, CSS, GitHub Actions/Pages, Cloudflare DNS, shared Umami analytics.

**Spec:** `docs/superpowers/specs/2026-09-12-time-travel-design.md`

## Global Constraints

- English-only interface and content.
- Supported civil years are 3000 BCE through 2026 CE; civil year zero is invalid.
- Internal years use astronomical numbering (`0` = 1 BCE).
- Exactly 63 non-overlapping briefing windows cover the supported range.
- Publish 90–120 sourced opportunities across those windows.
- Use a numeric payoff only when comparable entry and exit evidence is cited.
- Never recommend exploitation, fraud, theft, violence, market manipulation, or current/future gambling.
- No backend, authentication, CMS, service worker, runtime framework, chart library, or paid service.
- Never insert researched strings as HTML; create DOM nodes and assign `textContent`.
- Mobile is a one-column mission flow; desktop is a distinct two-pane console.
- No client-side secret or environment credential.
- Production URL is `https://time-travel.peerapongsm.dev/`.
- Use `npm.cmd` for local Windows commands; GitHub Actions uses `npm` on Linux.

---

### Task 1: Create the independent project and verified build shell

**Files:**
- Create: `project-50-time-travel/package.json`
- Create: `project-50-time-travel/package-lock.json`
- Create: `project-50-time-travel/tsconfig.json`
- Create: `project-50-time-travel/vite.config.ts`
- Create: `project-50-time-travel/vitest.config.ts`
- Create: `project-50-time-travel/index.html`
- Create: `project-50-time-travel/src/main.ts`
- Create: `project-50-time-travel/src/style.css`
- Create: `project-50-time-travel/tests/smoke.test.ts`
- Create: `project-50-time-travel/public/CNAME`
- Create: `project-50-time-travel/.github/workflows/deploy.yml`
- Create: `project-50-time-travel/.gitignore`
- Create: `project-50-time-travel/CONTEXT.md`
- Copy: root design and plan into `project-50-time-travel/docs/`

**Interfaces:**
- Consumes: approved design and this plan.
- Produces: `npm test`, `npm run build`, and a Git repository on branch `main`.

- [ ] **Step 1: Create the package and TypeScript configuration**

Use these dependency floors and scripts:

```json
{
  "name": "time-travel",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "test": "vitest run",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@types/node": "^26.0.1",
    "jsdom": "^29.1.1",
    "typescript": "^6.0.3",
    "vite": "^8.1.3",
    "vitest": "^4.1.9"
  }
}
```

Set `vite.config.ts` to `defineConfig({ base: "/" })` and configure Vitest with
`environment: "jsdom"`. Run `npm install` to create the lockfile.

- [ ] **Step 2: Add the smallest buildable page and failing smoke assertion**

`index.html` must contain `#app`, the standard Vite module entry, the shared
Umami script, and a `<noscript>` explanation. The test must load `index.html`
and assert `id="app"`, `src="/src/main.ts"`, and the Umami website id
`3f09453d-0b39-443e-8845-5e65611cc58a` exist.

- [ ] **Step 3: Add the deploy contract**

Write `public/CNAME` as:

```text
time-travel.peerapongsm.dev
```

The workflow must run `npm ci`, `npm test`, and `npm run build`, upload `dist`
with `actions/upload-pages-artifact@v3`, then deploy with
`actions/deploy-pages@v4` using Pages permissions.

- [ ] **Step 4: Run the shell checks**

Run: `npm.cmd test && npm.cmd run build`  
Expected: smoke test passes and `dist/index.html` plus `dist/CNAME` exist.

- [ ] **Step 5: Initialize and commit**

```bash
git init -b main
git add .
git commit -m "chore: scaffold time travel"
```

### Task 2: Implement civil and astronomical year handling

**Files:**
- Create: `project-50-time-travel/src/domain.ts`
- Create: `project-50-time-travel/src/lib/year.ts`
- Create: `project-50-time-travel/tests/year.test.ts`

**Interfaces:**
- Consumes: none.
- Produces: `HistoricalYear`, `civilToAstronomical`, `astronomicalToCivil`, `parseYear`, and `formatYear`.

- [ ] **Step 1: Write failing boundary and round-trip tests**

```ts
expect(civilToAstronomical(1, "BCE")).toBe(0);
expect(civilToAstronomical(3000, "BCE")).toBe(-2999);
expect(civilToAstronomical(1, "CE")).toBe(1);
expect(astronomicalToCivil(0)).toEqual({ year: 1, era: "BCE" });
expect(formatYear(-2999)).toBe("3000 BCE");
expect(parseYear(0, "CE")).toEqual({ ok: false, error: "There is no year zero." });
expect(parseYear(2027, "CE")).toEqual({ ok: false, error: "Choose a year from 3000 BCE through 2026 CE." });
```

- [ ] **Step 2: Run the test and confirm failure**

Run: `npm.cmd test -- tests/year.test.ts`  
Expected: FAIL because `src/lib/year.ts` does not exist.

- [ ] **Step 3: Add minimal types and conversions**

```ts
export type Era = "BCE" | "CE";
export type HistoricalYear = number;
export type CivilYear = { year: number; era: Era };

export const MIN_YEAR = -2999;
export const MAX_YEAR = 2026;
export const civilToAstronomical = (year: number, era: Era) => era === "BCE" ? 1 - year : year;
export const astronomicalToCivil = (year: HistoricalYear): CivilYear =>
  year <= 0 ? { year: 1 - year, era: "BCE" } : { year, era: "CE" };
```

`parseYear` must reject non-integers, civil zero, and values outside the bounds.

- [ ] **Step 4: Run focused and full checks**

Run: `npm.cmd test -- tests/year.test.ts && npm.cmd test && npm.cmd run build`  
Expected: all checks pass.

- [ ] **Step 5: Commit**

```bash
git add src/domain.ts src/lib/year.ts tests/year.test.ts
git commit -m "feat: model historical years"
```

### Task 3: Define briefings, resolution, and content validation

**Files:**
- Modify: `project-50-time-travel/src/domain.ts`
- Create: `project-50-time-travel/src/data/windows.ts`
- Create: `project-50-time-travel/src/data/index.ts`
- Create: `project-50-time-travel/src/lib/resolve.ts`
- Create: `project-50-time-travel/src/lib/validateContent.ts`
- Create: `project-50-time-travel/tests/resolve.test.ts`
- Create: `project-50-time-travel/tests/content.test.ts`

**Interfaces:**
- Consumes: `HistoricalYear`.
- Produces: `Briefing`, `Opportunity`, `briefings`, `resolveBriefing(year)`, and `validateBriefings(items)`.

- [ ] **Step 1: Write failing resolver and validator tests**

The resolver result is explicit:

```ts
type Resolution =
  | { kind: "exact"; briefing: Briefing }
  | { kind: "gap"; earlier: Briefing | null; later: Briefing | null };
```

Tests must prove inclusive bounds, first/last years, a gap result, duplicate ids,
partial overlaps, missing access constraints, non-HTTPS sources, and a numeric
payoff without separate price and history/mechanism sources are rejected.

- [ ] **Step 2: Run tests and confirm failure**

Run: `npm.cmd test -- tests/resolve.test.ts tests/content.test.ts`  
Expected: FAIL because the resolver and validator do not exist.

- [ ] **Step 3: Define the exact 63-window manifest**

Use these inclusive civil ranges, converted once to astronomical numbers:

```text
3000–2001 BCE; 2000–1001 BCE; 1000–501 BCE; 500–1 BCE
1–249; 250–499; 500–749; 750–999
1000–1099; 1100–1199; 1200–1299; 1300–1399; 1400–1499
1500–1549; 1550–1599; 1600–1649; 1650–1699; 1700–1749; 1750–1799
1800–1809; every subsequent decade through 1940–1949
1950–1954; every subsequent five-year window through 1995–1999
2000–2001; every subsequent two-year window through 2014–2015
2016; 2017; 2018; 2019; 2020; 2021; 2022; 2023; 2024; 2025; 2026
```

The test must assert exactly 63 windows, complete coverage, and no overlap.

- [ ] **Step 4: Implement the minimum validator and resolver**

Use arrays, sets, `URL`, and ordinary loops. Do not add a schema library. Allow
identical source organizations only when the URLs point to distinct evidence;
numeric payoff claims require one historical source and one price/mechanism
source.

- [ ] **Step 5: Run checks and commit**

Run: `npm.cmd test && npm.cmd run build`  
Expected: all checks pass using small inline valid/invalid fixtures; production
briefings remain incomplete until the researched modules land in Tasks 4–6.

```bash
git add src/domain.ts src/data src/lib/resolve.ts src/lib/validateContent.ts tests
git commit -m "feat: add briefing resolution contract"
```

### Task 4: Research ancient through medieval briefings

**Files:**
- Create: `project-50-time-travel/src/data/ancient.ts`
- Create: `project-50-time-travel/src/data/medieval.ts`
- Modify: `project-50-time-travel/src/data/index.ts`
- Modify: `project-50-time-travel/tests/content.test.ts`

**Interfaces:**
- Consumes: `Briefing` and the first 13 window definitions.
- Produces: 13 sourced briefings and at least 18 opportunities.

- [ ] **Step 1: Research claims before writing records**

Use primary/authoritative sources where available: museum collections and essays,
university economic-history projects, translated commercial tablets, central-bank
history material, and peer-reviewed reference works. Candidate mechanisms are
Mesopotamian grain/silver contracts, Bronze Age tin routes, Phoenician commodity
trade, Hellenistic/Roman shipping or land, late-Roman currency preservation,
Indian Ocean trade, Abbasid commercial instruments, Song commerce, Venetian
trade, Pax Mongolica routes, post-plague labor scarcity, and early print/Atlantic
navigation. Replace a candidate when the evidence does not support an executable
or ethical recommendation.

- [ ] **Step 2: Write the 13 records**

Each briefing must rank one recommendation, add alternatives only when supported,
include a 2–3 choice lesson, list access barriers, and use qualitative payoff by
default. Each source object records `title`, `publisher`, `url`, and the exact
claim it supports.

- [ ] **Step 3: Run content checks**

Run: `npm.cmd test -- tests/content.test.ts`  
Expected: 13 windows, at least 18 opportunities, no numeric ancient payoff without
the required evidence, and zero validation errors.

- [ ] **Step 4: Editorial review and commit**

Reject any record whose actionable wealth depends on slavery, colonial seizure,
war casualties, theft, or a status the traveler cannot plausibly obtain.

```bash
git add src/data/ancient.ts src/data/medieval.ts src/data/index.ts tests/content.test.ts
git commit -m "content: add ancient and medieval briefings"
```

### Task 5: Research early-modern and industrial briefings

**Files:**
- Create: `project-50-time-travel/src/data/earlyModern.ts`
- Create: `project-50-time-travel/src/data/industrial.ts`
- Modify: `project-50-time-travel/src/data/index.ts`
- Modify: `project-50-time-travel/tests/content.test.ts`

**Interfaces:**
- Consumes: the 1500–1949 window definitions.
- Produces: 21 sourced briefings and at least 30 opportunities.

- [ ] **Step 1: Research the 1500–1799 windows**

Cover evidence-backed mechanisms such as spice-route repricing, early joint-stock
ownership, marine insurance, sovereign debt, canals, and early industrial
equipment. Treat bubbles as exit-timing lessons; do not claim shorting access
unless contemporary instruments and access are documented.

- [ ] **Step 2: Research each decade from 1800 through 1949**

Candidate anchors include consols after major uncertainty, canal and railway
expansion, gold-rush logistics rather than prospecting luck, telegraph and
shipping infrastructure, petroleum distribution, electrification, public
securities, the 1920s exit before the crash, and diversified recovery assets.
Avoid war-profiteering recommendations.

- [ ] **Step 3: Write records and run validation**

Run: `npm.cmd test -- tests/content.test.ts`  
Expected: all 21 windows are present, at least 30 opportunities are added, and
every numeric payoff has separate historical and price/mechanism evidence.

- [ ] **Step 4: Commit**

```bash
git add src/data/earlyModern.ts src/data/industrial.ts src/data/index.ts tests/content.test.ts
git commit -m "content: add early modern and industrial briefings"
```

### Task 6: Research modern and recent briefings

**Files:**
- Create: `project-50-time-travel/src/data/modern.ts`
- Create: `project-50-time-travel/src/data/recent.ts`
- Modify: `project-50-time-travel/src/data/index.ts`
- Modify: `project-50-time-travel/tests/content.test.ts`

**Interfaces:**
- Consumes: the 1950–2026 window definitions.
- Produces: 29 sourced briefings, enough alternatives to bring the catalog total to 90–120, and an honest present-boundary lesson for 2026.

- [ ] **Step 1: Research 1950–1999 with price evidence**

Use exchange/company filings, central-bank or official series, and reputable
archives for postwar equities, gold after convertibility changes, technology
IPOs, and documented event outcomes. Candidate event lessons include Buster
Douglas in 1990 only if contemporary odds are credibly sourced.

- [ ] **Step 2: Research 2000–2015**

Cover the dot-com unwind, gold, selected public technology entries, Bitcoin
mining/acquisition and custody, and the Ethereum crowdsale only with dated price
and access evidence. Explain survivorship bias and custody risk.

- [ ] **Step 3: Research every year from 2016 through 2026**

Use dated primary market data and official event results. Leicester City's
2015–16 title may be an event alternative only with sourced contemporary odds.
For 2026, publish a “hindsight ends here” briefing: diversification, liquidity,
and uncertainty rather than a guaranteed wealth move. Do not assert outcomes
after the site's evidence cutoff date, 2026-09-12.

- [ ] **Step 4: Run full catalog validation**

Run: `npm.cmd test -- tests/content.test.ts`  
Expected: exactly 63 briefings, 90–120 opportunities, complete supported-year
coverage, all validation checks pass, and the 2026 record contains no numeric
future payoff.

- [ ] **Step 5: Commit**

```bash
git add src/data/modern.ts src/data/recent.ts src/data/index.ts tests/content.test.ts
git commit -m "content: complete time travel briefings"
```

### Task 7: Add linkable application state and local progress

**Files:**
- Create: `project-50-time-travel/src/lib/route.ts`
- Create: `project-50-time-travel/src/lib/progress.ts`
- Create: `project-50-time-travel/tests/route.test.ts`
- Create: `project-50-time-travel/tests/progress.test.ts`

**Interfaces:**
- Consumes: briefing ids and `CivilYear`.
- Produces: `readRoute`, `writeRoute`, `loadProgress`, `completeLesson`, and `resetProgress`.

- [ ] **Step 1: Write failing URL and storage tests**

Test `?year=2016&era=CE`, invalid query fallback, briefing ids, malformed JSON,
duplicate completion, reset, and `localStorage` unavailability.

- [ ] **Step 2: Run and confirm failure**

Run: `npm.cmd test -- tests/route.test.ts tests/progress.test.ts`  
Expected: FAIL because both modules are absent.

- [ ] **Step 3: Implement with platform primitives**

Use `URLSearchParams`, `history.replaceState`, `JSON.parse`, `JSON.stringify`, and
a single storage key `time-travel-progress-v1`. Catch only storage/parse failures
and return an empty progress record.

- [ ] **Step 4: Run checks and commit**

Run: `npm.cmd test && npm.cmd run build`

```bash
git add src/lib/route.ts src/lib/progress.ts tests/route.test.ts tests/progress.test.ts
git commit -m "feat: add linkable local course state"
```

### Task 8: Build the mobile-first arrival console and desktop shell

**Files:**
- Modify: `project-50-time-travel/index.html`
- Modify: `project-50-time-travel/src/main.ts`
- Modify: `project-50-time-travel/src/style.css`
- Create: `project-50-time-travel/src/ui/app.ts`
- Create: `project-50-time-travel/src/ui/arrival.ts`
- Create: `project-50-time-travel/tests/arrival.test.ts`

**Interfaces:**
- Consumes: year parsing, resolution, and route state.
- Produces: accessible arrival form, era jumps, result status, and app view switching.

- [ ] **Step 1: Write failing DOM tests**

Assert labeled year input, BCE/CE controls, submit button, invalid-year alert,
keyboard submission, exact result announcement, and explicit earlier/later gap
buttons.

- [ ] **Step 2: Run and confirm failure**

Run: `npm.cmd test -- tests/arrival.test.ts`  
Expected: FAIL because `renderArrival` is absent.

- [ ] **Step 3: Implement semantic DOM rendering**

Use `document.createElement`, `textContent`, `addEventListener`, and a live status
element. Do not use `innerHTML`. Keep the numeric field authoritative; era chips
only fill the form.

- [ ] **Step 4: Add distinct responsive shells**

Below `800px`, use one column with a sticky compact arrival control. At
`min-width: 800px`, use a two-column grid with a fixed-width navigation rail and
an independently scrolling briefing pane. Preserve 44px controls, visible focus,
and `prefers-reduced-motion` rules.

- [ ] **Step 5: Run checks and commit**

Run: `npm.cmd test && npm.cmd run build`

```bash
git add index.html src/main.ts src/style.css src/ui tests/arrival.test.ts
git commit -m "feat: build temporal arrival console"
```

### Task 9: Render briefings and interactive lessons

**Files:**
- Create: `project-50-time-travel/src/ui/briefing.ts`
- Create: `project-50-time-travel/src/ui/lesson.ts`
- Modify: `project-50-time-travel/src/ui/app.ts`
- Modify: `project-50-time-travel/src/style.css`
- Create: `project-50-time-travel/tests/briefing.test.ts`
- Create: `project-50-time-travel/tests/lesson.test.ts`

**Interfaces:**
- Consumes: `Briefing`, opportunity ranking, and progress functions.
- Produces: mission card, five-stage course content, alternatives, decision feedback, sources, and ledger stamps.

- [ ] **Step 1: Write failing briefing tests**

Assert arrival, destination, action, capital, exit, payoff basis, confidence,
risk, access, source links, alternatives, and editorial inference labels render
as text. External links must set `target="_blank"` and `rel="noopener noreferrer"`.

- [ ] **Step 2: Write failing lesson tests**

Assert one choice at a time, immediate consequence, concept explanation,
completion stamp, idempotent completion, and reset behavior.

- [ ] **Step 3: Implement the five-stage briefing**

Render `Spot the opening`, `Make the move`, `Protect the position`, `Know the
exit`, and `Learn the mechanism` as semantic sections. Qualitative payoff is the
default; show `multiple` only when `basis === "documented"`.

- [ ] **Step 4: Implement lesson interaction**

Use native buttons and a small in-memory step index. Announce consequences in an
`aria-live="polite"` region and persist only the completed briefing id.

- [ ] **Step 5: Run checks and commit**

Run: `npm.cmd test && npm.cmd run build`

```bash
git add src/ui src/style.css tests/briefing.test.ts tests/lesson.test.ts
git commit -m "feat: add interactive historical briefings"
```

### Task 10: Add atlas, methodology, and accessibility verification

**Files:**
- Create: `project-50-time-travel/src/ui/atlas.ts`
- Create: `project-50-time-travel/src/ui/methodology.ts`
- Modify: `project-50-time-travel/src/ui/app.ts`
- Modify: `project-50-time-travel/src/style.css`
- Create: `project-50-time-travel/tests/atlas.test.ts`
- Create: `project-50-time-travel/tests/accessibility.test.ts`

**Interfaces:**
- Consumes: the same `briefings` array used by destination mode.
- Produces: filterable browse view, transparent methodology, and keyboard-safe navigation.

- [ ] **Step 1: Write failing atlas tests**

Test era, mechanism, capital, risk, and region filters; zero-result copy; opening
a briefing updates URL state; and filters never mutate source data.

- [ ] **Step 2: Implement the atlas with native controls**

Use `<select>`, `<button>`, and arrays. Do not add a search or state library. Show
completed stamps from the same local progress record.

- [ ] **Step 3: Implement methodology from static copy**

Explain astronomical storage, no civil year zero, closed-timeline assumption,
capital tiers, relative wealth, source hierarchy, payoff evidence, betting
limits, ethics exclusions, and the 2026 hindsight boundary.

- [ ] **Step 4: Add accessibility assertions**

Test one `h1`, labeled controls, dialog-free navigation, live regions, link
rel attributes, and no `[style]` color-only status. Manual verification remains
required for screen readers and responsive layout.

- [ ] **Step 5: Run checks and commit**

Run: `npm.cmd test && npm.cmd run build`

```bash
git add src/ui src/style.css tests/atlas.test.ts tests/accessibility.test.ts
git commit -m "feat: add atlas and methodology"
```

### Task 11: Run the frontend-design pass and browser QA

**Files:**
- Modify: `project-50-time-travel/src/style.css`
- Modify only if required: `project-50-time-travel/src/ui/*.ts`

**Interfaces:**
- Consumes: completed functional UI.
- Produces: polished mobile and desktop experiences without changing domain behavior.

- [ ] **Step 1: Invoke the frontend-design skill**

Preserve the temporal field-terminal concept, semantic DOM, and no-framework
constraint. Improve hierarchy, typography, era navigation, decision feedback,
and desktop information density without adding decorative dependencies.

- [ ] **Step 2: Run automated regression checks**

Run: `npm.cmd test && npm.cmd run build`  
Expected: all tests and build pass unchanged.

- [ ] **Step 3: Verify rendered mobile UI**

Use a browser at 390×844. Check arrival, BCE input, exact briefing, gap handling,
lesson choices, atlas filters, methodology, keyboard focus, and reduced motion.

- [ ] **Step 4: Verify rendered desktop UI**

Use a browser at 1440×900. Confirm the two-pane layout, readable line lengths,
independent content scrolling, no clipped controls, and direct-link refresh.

- [ ] **Step 5: Commit**

```bash
git add src/style.css src/ui
git commit -m "style: refine time travel experience"
```

### Task 12: Publish GitHub Pages and configure the custom domain

**Files:**
- Modify only if needed: `project-50-time-travel/.github/workflows/deploy.yml`
- Modify only if needed: `project-50-time-travel/public/CNAME`

**Interfaces:**
- Consumes: passing local build and standing workspace authorization.
- Produces: public repository and live HTTPS custom domain.

- [ ] **Step 1: Perform the pre-publish gate**

Run: `npm.cmd test && npm.cmd run build && npm.cmd audit --omit=dev`  
Expected: tests/build pass and no high-severity production finding remains.

- [ ] **Step 2: Create and push the public repository**

```bash
gh repo create peerapongsm/time-travel --public --source=. --remote=origin --push
```

- [ ] **Step 3: Enable GitHub Pages Actions deployment**

Use `gh api` to set Pages build type to `workflow`, trigger/observe the deploy
workflow, and require a successful deployment before continuing.

- [ ] **Step 4: Configure Cloudflare**

Create or update only the DNS record for `time-travel.peerapongsm.dev` to the
GitHub Pages target, without exposing credentials. Preserve unrelated DNS
records.

- [ ] **Step 5: Verify production**

Check DNS, HTTPS, `CNAME`, page title, arrival interaction, direct briefing URL,
Umami script request, and mobile/desktop screenshots at the custom domain.

- [ ] **Step 6: Commit any deployment repair**

```bash
git add .github/workflows/deploy.yml public/CNAME
git commit -m "fix: finalize pages deployment"
git push
```

Skip the commit when no repair was required.

### Task 13: Add Time Travel to Armory

**Files:**
- Modify: `project-1-armory/projects.json`

**Interfaces:**
- Consumes: verified live URL and repository.
- Produces: Armory project id 55 with completed phases.

- [ ] **Step 1: Append and validate the Armory record**

Append this shape with all phases `done: true`:

```json
{
  "id": 55,
  "name": "Time Travel",
  "slug": "time-travel",
  "issue": "History tells us what happened, but rarely teaches how timing, access, risk, and exit discipline created wealth.",
  "solves": "An interactive time-traveler course that turns arrival years into sourced global wealth briefings and reusable finance lessons.",
  "medium": "web",
  "tags": ["history", "finance", "education", "interactive"],
  "track": "live",
  "status": "done",
  "url": "https://time-travel.peerapongsm.dev/",
  "repo": "https://github.com/peerapongsm/time-travel",
  "download": "",
  "graduated": null,
  "phases": [
    { "title": "Research + evidence model", "done": true },
    { "title": "Historical year resolver", "done": true },
    { "title": "63 briefing windows", "done": true },
    { "title": "Interactive course UI", "done": true },
    { "title": "Accessibility + responsive QA", "done": true },
    { "title": "Deploy time-travel.peerapongsm.dev", "done": true }
  ]
}
```

Run a JSON parse check and assert ids/slugs are unique.

- [ ] **Step 2: Commit, push, and verify Armory**

```bash
git add projects.json
git commit -m "feat: add time travel"
git push
```

Verify `https://peerapongsm.dev/projects.json` contains id 55 and the live Armory
page renders the Time Travel card and link.

### Task 14: Refresh and verify Armory Analytics

**Files:**
- No source modification expected in `project-2-armory-analytics`.
- Modify only on demonstrated regression: the smallest failing test and shared parser function.

**Interfaces:**
- Consumes: live Armory feed and Time Travel's Umami hostname traffic.
- Produces: an analytics target for `time-travel.peerapongsm.dev` and a verified dashboard entry.

- [ ] **Step 1: Prove generic derivation locally**

Run the existing tests, then evaluate `toTarget` with the live Armory id 55
record. Expected result:

```ts
{
  id: 55,
  name: "Time Travel",
  kind: "web",
  hostnames: ["time-travel.peerapongsm.dev"],
  legacyPath: null,
  repoOwner: null,
  repoName: null
}
```

- [ ] **Step 2: Refresh the deployed dashboard**

Trigger the Armory Analytics Vercel production deployment or its documented
refresh path without changing source. Wait for completion and inspect the live
API/dashboard.

- [ ] **Step 3: Verify the live analytics contract**

Confirm the public summary includes id 55, name `Time Travel`, kind `web`, and
does not fail when initial traffic is zero. Confirm the Time Travel page sends a
request to the shared Umami collector with its hostname.

- [ ] **Step 4: Stop if no code is needed**

Do not add a one-off project mapping or redundant test when feed-driven discovery
works. If it fails, first add one reproducing test, patch the shared parser or
fetch path, run `npm.cmd test && npm.cmd run build`, commit, push, and re-verify production.

### Task 15: Final completion audit

**Files:**
- Inspect only unless a failed requirement requires repair.

**Interfaces:**
- Consumes: spec, plan, repositories, deployments, and runtime evidence.
- Produces: requirement-by-requirement completion evidence.

- [ ] **Step 1: Audit the content contract**

Confirm 63 windows, 90–120 opportunities, 3000 BCE–2026 CE coverage, sourced
claims, access barriers, ethics rules, and the 2026 hindsight boundary.

- [ ] **Step 2: Audit application behavior**

Run the full test/build suite and manually check mobile, desktop, keyboard,
reduced motion, exact/gap resolution, lessons, local progress, atlas,
methodology, direct links, and safe external links.

- [ ] **Step 3: Audit external state**

Confirm GitHub repository visibility, successful Pages workflow, Cloudflare DNS,
HTTPS, custom-domain runtime, Armory id 55, and Armory Analytics id 55.

- [ ] **Step 4: Record final evidence**

Report exact commands, passing counts, workflow/deployment states, and live URLs.
Do not mark the project complete if any named requirement lacks direct evidence.
