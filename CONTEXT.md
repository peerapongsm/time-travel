# Time Travel

An English-language, static finance-and-history course. A traveler selects a
civil year from 3000 BCE through 2026 CE and receives an evidence-backed,
ethical historical briefing.

## Boundaries

- Use Vite, TypeScript, semantic DOM, and CSS only; no backend, accounts, CMS,
  service worker, runtime framework, charts, paid services, or client secrets.
- Civil year zero is invalid; internally, astronomical year `0` represents 1
  BCE.
- The published catalog must contain exactly 63 non-overlapping coverage
  windows and 90–120 sourced opportunities.
- Never recommend exploitation, fraud, theft, violence, market manipulation,
  or current/future gambling.
- Build DOM content with nodes and `textContent`; do not inject researched
  strings as HTML.

## Evidence rules

Each opportunity needs credible historical evidence. Numeric payoffs need
comparable cited entry and exit evidence; otherwise use a qualitative payoff.
Clearly distinguish historical fact, estimate, and editorial inference.

## Commands

Use Windows `npm.cmd` locally:

```text
npm.cmd test
npm.cmd run build
npm.cmd run dev
```

GitHub Actions uses `npm ci`, `npm test`, and `npm run build` on Linux.

## Deployment

GitHub Pages publishes the static `dist` output to
`https://time-travel.peerapongsm.dev/`. `public/CNAME` holds the custom domain
and Vite uses the root base path.
