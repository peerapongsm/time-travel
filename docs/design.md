# Time Travel — Design Specification

**Date:** 2026-09-12  
**Status:** Recommended design approved  
**Workspace folder:** `project-50-time-travel`  
**Repository:** `peerapongsm/time-travel`  
**Production URL:** `https://time-travel.peerapongsm.dev/`

## 1. Product premise

Time Travel is an English-language interactive finance and history course for a
fictional traveler who may arrive anywhere in the world at any historical date.
The traveler knows recorded history but does not possess unlimited starting
capital, immunity from danger, or permission to ignore local law and custom.
The fiction uses a low-impact closed timeline: the traveler may exploit a
recorded opportunity, but their position is assumed too small to change the
event, market, or result that makes the lesson possible.

The primary question is:

> If you could arrive anywhere in this year, what historically plausible move
> could build or preserve wealth, and why did that opportunity exist?

The product is not a modern investment recommender and does not claim that
historical hindsight predicts future returns. It teaches mechanisms such as
scarcity, trade routes, compounding, information advantages, bubbles,
diversification, liquidity, custody, and exit timing through concrete episodes.

## 2. Goals and success criteria

The shipped site must:

1. Accept any arrival year from 3000 BCE through 2026 CE without a year zero.
2. Resolve that year to a researched briefing containing one recommended wealth
   move and two alternatives when evidence supports them.
3. State where to go, what to acquire or do, the capital tier, the entry window,
   the exit condition, the historical mechanism, access requirements, and
   material risks.
4. Teach one reusable finance concept per briefing through a short interactive
   decision and explanation.
5. distinguish sourced historical facts, estimates, and editorial inference.
6. Work well on mobile and provide a purpose-built wider desktop layout.
7. Remain usable without accounts, a backend, or paid services.
8. Deploy on GitHub Pages at the registered custom subdomain.
9. Appear as a completed project in Armory and become measurable by Armory
   Analytics.

## 3. Experience

### 3.1 Arrival console

The landing view resembles a restrained temporal field terminal rather than a
generic finance dashboard. It contains:

- a numeric year field;
- a BCE/CE selector;
- quick-jump era chips;
- an adaptive timeline showing more detail near the present;
- a single `Generate briefing` action.

The year field is the authoritative input. The visual timeline is a navigation
aid and never makes keyboard or screen-reader use dependent on dragging.

The timeline uses editorial density rather than a misleading linear scale:

| Period | Editorial resolution |
|---|---|
| 3000–1001 BCE | millennium-scale windows |
| 1000 BCE–499 CE | 250-year windows |
| 500–1499 CE | century-scale windows |
| 1500–1799 | 25–50-year windows |
| 1800–1949 | decade-scale windows |
| 1950–1999 | five-year windows |
| 2000–2015 | two-year windows |
| 2016–2026 | annual windows |

These are coverage targets, not permission to invent an opportunity for every
tick. A selected year resolves to the narrowest evidence-backed window that
contains it. If none exists, the interface clearly offers the nearest earlier
and later briefings instead of silently changing the year.

### 3.2 Temporal briefing

Each briefing opens with a concise mission card:

- **Arrival:** year or window;
- **Destination:** city, region, or trade corridor;
- **Recommended move:** one sentence;
- **Capital:** pocket, working, substantial, or patron-backed;
- **Time to exit:** duration or observable event;
- **Wealth potential:** qualitative band, plus a numeric multiple only when
  reliable price evidence supports one;
- **Evidence confidence:** high, medium, or contextual;
- **Risk:** physical, political, legal, custody, liquidity, and execution.
- **Access:** identity, status, local counterparties, transport, custody, and
  any era-specific barrier the traveler must solve before transacting.

The briefing then unfolds in five short stages:

1. **Spot the opening** — what changed and who had not reacted yet.
2. **Make the move** — what the traveler would actually acquire, build, fund,
   transport, or bet on.
3. **Protect the position** — custody, diversification, social access, and
   survival constraints.
4. **Know the exit** — a date, event, price regime, or warning sign.
5. **Learn the mechanism** — the reusable finance/history lesson.

Two alternative cards let the learner compare a safer or more accessible move
with the highest-upside recommendation.

### 3.3 Interactive lesson

Every briefing contains one two- or three-step decision. Examples include
choosing between carrying more inventory and diversifying routes, exiting a
bubble before liquidity vanishes, protecting bearer assets, or deciding how
much capital to risk on a known sporting result.

The learner receives an immediate consequence and a compact explanation. There
is no sprawling game economy, character inventory, or fake real-time market. A
lesson should take roughly 60–120 seconds. Completed lessons add a stamp to a
local “traveler's ledger”; progress is stored in `localStorage` and can be
reset.

### 3.4 Browse mode

After the first briefing, users can switch to an atlas listing all published
windows by era, mechanism, capital tier, risk, and region. Browse mode reuses
the same briefing data and is not a separate content system.

## 4. Content model

Each briefing record owns one coverage window and its ranked opportunities:

```ts
type Briefing = {
  id: string;
  window: { start: HistoricalYear; end: HistoricalYear };
  opportunities: Opportunity[];
};

type Opportunity = {
  id: string;
  destination: string;
  title: string;
  action: string;
  category: "trade" | "land" | "enterprise" | "security" | "event" | "asset";
  capitalTier: "pocket" | "working" | "substantial" | "patron";
  access: string[];
  exitSignal: string;
  payoff: { label: string; multiple?: number; basis: "documented" | "estimated" | "qualitative" };
  risks: Risk[];
  lesson: Lesson;
  sources: Source[];
  confidence: "high" | "medium" | "contextual";
  ethicsNote?: string;
};

type Source = {
  title: string;
  publisher: string;
  url: string;
  claim: string;
  kind: "history" | "price" | "mechanism" | "result" | "odds";
};

type Risk = {
  kind: "physical" | "political" | "legal" | "custody" | "liquidity" | "execution";
  detail: string;
};

type Lesson = {
  concept: string;
  prompt: string;
  choices: { label: string; consequence: string; correct: boolean }[];
  explanation: string;
};
```

`HistoricalYear` stores astronomical integers internally (`0` means 1 BCE) so
ordering and range logic stay simple. Formatting and parsing hide astronomical
year zero from users and expose conventional BCE/CE labels.

The initial release targets 55–65 researched briefing windows and 90–120
opportunity records. A briefing has one ranked recommendation and up to two
alternatives when evidence supports them. Content categories should include:

- long-distance commodities such as metals, salt, silk, spices, and dyes;
- land and infrastructure around documented expansion corridors;
- financing, insurance, shipping, and early joint-stock enterprise;
- industrial and communications transitions;
- public securities, commodities, currencies, and digital assets;
- collectibles or durable stores of value where provenance is defensible;
- a small number of well-documented sporting-event foreknowledge examples.

The catalog must not recommend slavery, theft, colonial seizure, fraud, violent
exploitation, deliberate disaster profiteering, insider manipulation, or an
action whose wealth depends primarily on harming people. Historically important
examples may be discussed as warnings rather than playable recommendations.

## 5. Evidence and financial honesty

Every opportunity must cite at least one credible source for the historical
event and one source for a price, payoff, or economic mechanism when a numeric
claim is shown. Prefer museums, archives, universities, central banks,
government datasets, exchanges, company filings, and established historical
reference works. Secondary summaries may help discovery but must not be the
only support for a precise claim.

Ancient and early-modern values should normally use qualitative payoff bands.
The site must not convert denarii, cowries, florins, or commodity cargo into a
single modern-dollar number without a defensible and clearly explained basis.
Where sources disagree, show a range and lower the confidence label.

Each source is visible from the briefing. Editorial inference is labeled as
such. A methodology page explains selection, historical-year representation,
payoff bands, source standards, and limitations.

Event betting is presented only as retrospective historical education. The
site does not offer odds, links, or recommendations for current or future
gambling and does not imply that past results make gambling profitable. A known
result without sourced contemporary odds may describe the informational
advantage but must label the payout unquantified.

“Rich” means wealth relative to the traveler's starting position and the local
economy at the stated exit. Capital tiers are era-relative editorial bands, not
fixed modern-dollar amounts. A numeric multiple appears only when the entry and
exit values are comparable and sourced; otherwise the site uses a qualitative
band with an explanation.

## 6. Architecture

Use Vite, TypeScript, semantic HTML, and CSS with no runtime framework. The site
is a static export suitable for GitHub Pages and a custom-domain root path.

Suggested boundaries:

- `src/data/` — reviewed opportunity records and source metadata;
- `src/lib/year.ts` — BCE/CE parsing, formatting, comparison, and boundaries;
- `src/lib/resolve.ts` — exact-window and nearest-window resolution;
- `src/lib/progress.ts` — small `localStorage` adapter;
- `src/ui/` — arrival console, briefing, lesson, atlas, and methodology views;
- `tests/` — focused tests for year conversion, boundary resolution, content
  validity, and progress serialization.

There is no server, database, authentication, CMS, service worker, charting
library, router dependency, or user-generated content in the first release.
Views can use URL query/hash state so a briefing is linkable and refresh-safe.
All researched content is bundled at build time. UI code creates DOM nodes and
assigns text content; it does not render source strings as HTML.

## 7. Responsive and accessible design

Mobile is a one-column mission flow with a sticky year control and progressive
disclosure. Desktop becomes a two-pane console: adaptive timeline and filters
on the left, active briefing on the right. It must not be the mobile column
merely widened.

Minimum accessibility requirements:

- semantic form labels and headings;
- full keyboard operation;
- visible focus states;
- adequate contrast;
- reduced-motion behavior;
- status announcements for resolved years and lesson outcomes;
- no information conveyed only by color;
- touch targets of at least 44 CSS pixels.

## 8. Validation and testing

Automated checks must cover:

- BCE/CE parsing and formatting, including the missing civil year zero;
- first and last supported years;
- duplicate or partially overlapping briefing-window rejection;
- exact, nearest-earlier, and nearest-later resolution;
- required fields, HTTPS source URLs, access constraints, confidence labels,
  payoff-basis consistency, and lesson choices for every published record;
- a minimum of one credible historical source per opportunity and a separate
  price/mechanism source for every numeric payoff claim;
- safe progress load/reset when storage is absent or malformed;
- production build and base URL behavior.

Security checks must also confirm that no secret or environment credential is
required by the client build, researched strings are never inserted as raw
HTML, external links use safe opener behavior, and dependency audit findings do
not include an unresolved high-severity production vulnerability.

Manual verification must cover mobile and desktop layouts, keyboard navigation,
screen-reader labels, reduced motion, direct briefing links, refresh behavior,
and the live custom domain over HTTPS.

## 9. Deployment and portfolio integration

The project will be a public GitHub repository at
`https://github.com/peerapongsm/time-travel`. GitHub Actions runs tests and the
production build, uploads `dist`, and deploys GitHub Pages. `public/CNAME`
contains `time-travel.peerapongsm.dev`; Vite uses `/` as its base because the
custom domain serves the site at the root.

Cloudflare receives the GitHub Pages CNAME record. HTTPS and the live site must
be checked after DNS propagation.

After the live deployment:

1. append Armory project id 55 with slug `time-travel`, live URL, repository,
   tags, and completed phases;
2. push and verify the Armory card;
3. confirm Armory Analytics loads the Armory feed and derives
   `time-travel.peerapongsm.dev` as the analytics hostname;
4. run the Armory Analytics tests and verify the deployed dashboard includes
   Time Travel after its next data refresh;
5. include the shared Umami tracking script in Time Travel so the derived target
   receives measurements.

No hard-coded project entry is needed in Armory Analytics unless live evidence
shows its feed-driven discovery has regressed.

## 10. Deliberate exclusions

The first release excludes:

- user accounts or cloud-synced progress;
- personalized recommendations based on present-day finances;
- live market data or predictions beyond the documented 2026 cutoff;
- currency-conversion theater for poorly comparable ancient values;
- a full portfolio simulator;
- generative AI briefings;
- community submissions or moderation;
- automatic content scraping.

These features add operational or evidentiary cost without improving the core
history-through-decisions experience.
