import { describe, expect, it } from "vitest";
import type { Briefing } from "../src/domain";
import { windows } from "../src/data/windows";
import { validateBriefings } from "../src/lib/validateContent";
import { briefings } from "../src/data";

describe("ancient and medieval course content", () => {
  it("covers the first 13 canonical windows with at least 18 sourced opportunities", () => {
    const earlyBriefings = briefings.filter((briefing) => briefing.window.end <= 1499);
    expect(earlyBriefings.map((briefing) => briefing.window)).toEqual(windows.slice(0, 13));
    const firstOpportunityIds = [
      "uruk-accounts",
      "kanesh-tin",
      "sidon-textile-orders",
      "athens-spina-pottery",
      "roman-glass-distribution",
      "gansu-commercial-agent",
      "samarkand-caravan-supplies",
      "changsha-export-bowls",
      "song-market-delivery",
      "quanzhou-kiln-port-link",
      "kilwa-ceramic-orders",
      "lubeck-merchant-service",
      "venice-book-orders"
    ];
    earlyBriefings.forEach((briefing, index) => {
      expect(briefing.opportunities[0].id).toBe(firstOpportunityIds[index]);
    });
    expect(earlyBriefings.flatMap((briefing) => briefing.opportunities).length).toBeGreaterThanOrEqual(18);
    expect(validateBriefings(earlyBriefings)).toEqual([]);
  });

  it("keeps ancient returns qualitative and identifies the hypothetical recommendation", () => {
    for (const opportunity of briefings.filter((briefing) => briefing.window.end <= 1499).flatMap((briefing) => briefing.opportunities)) {
      expect(opportunity.payoff).toEqual(expect.objectContaining({ basis: "qualitative" }));
      expect(opportunity.payoff.multiple).toBeUndefined();
      expect(opportunity.action).toMatch(/^Case evidence:\s+\S[\s\S]*?\s+Inference:/);
      expect(opportunity.lesson.choices.filter((choice) => choice.correct)).toHaveLength(1);
    }
  });
});

describe("early modern and industrial course content", () => {
  it("covers the 21 canonical windows from 1500 through 1949 with at least 30 sourced opportunities", () => {
    const eraBriefings = briefings.filter((briefing) => briefing.window.start >= 1500 && briefing.window.end <= 1949);
    expect(eraBriefings.map((briefing) => briefing.window)).toEqual(windows.slice(13, 34));

    const firstOpportunityIds = [
      "antwerp-bourse-brokerage",
      "london-exchange-intelligence",
      "amsterdam-bank-settlement",
      "lloyds-shipping-intelligence",
      "aire-calder-freight",
      "bridgewater-canal-carriage",
      "jacquard-card-service",
      "erie-canal-supplies",
      "erie-canal-freight",
      "railway-telegraph-service",
      "gold-rush-logistics",
      "sewing-machine-service",
      "atlantic-cable-messages",
      "suez-route-logistics",
      "pearl-street-electrics",
      "electric-tube-connections",
      "model-t-service",
      "assembly-line-quality",
      "pre-crash-deleveraging",
      "baby-bond-savings",
      "transistor-training"
    ];

    eraBriefings.forEach((briefing, index) => {
      expect(briefing.opportunities[0].id).toBe(firstOpportunityIds[index]);
    });
    expect(eraBriefings.flatMap((briefing) => briefing.opportunities)).toHaveLength(32);
    expect(validateBriefings(eraBriefings)).toEqual([]);
  });

  it("keeps returns qualitative, separates evidence from inference, and has one correct lesson choice", () => {
    const opportunities = briefings
      .filter((briefing) => briefing.window.start >= 1500 && briefing.window.end <= 1949)
      .flatMap((briefing) => briefing.opportunities);

    for (const opportunity of opportunities) {
      expect(opportunity.payoff.basis).toBe("qualitative");
      expect(opportunity.payoff.multiple).toBeUndefined();
      expect(opportunity.action).toMatch(/^Case evidence:\s+\S[\s\S]*?\s+Inference:/);
      expect(opportunity.lesson.choices.filter((choice) => choice.correct)).toHaveLength(1);
    }
  });

  it("publishes availability gates and an actionable posture before late-window mechanisms exist", () => {
    const opportunities = new Map(
      briefings
        .filter((briefing) => briefing.window.start >= 1500 && briefing.window.end <= 1949)
        .flatMap((briefing) => briefing.opportunities)
        .map((opportunity) => [opportunity.id, opportunity])
    );

    expect(opportunities.size).toBe(32);
    for (const opportunity of opportunities.values()) {
      expect(opportunity.action).toMatch(/^Case evidence:\s+\S[\s\S]*?\s+Availability:\s+\S[\s\S]*?\s+Earlier arrival:\s+\S[\s\S]*?\s+Inference:\s+\S[\s\S]*$/);
    }

    const lateMechanisms = [
      ["antwerp-bourse-brokerage", "1532"],
      ["london-exchange-intelligence", "1571"],
      ["scheldt-transshipment-service", "late sixteenth century"],
      ["amsterdam-bank-settlement", "1609"],
      ["amsterdam-exchange-logistics", "1611"],
      ["lloyds-shipping-intelligence", "1688"],
      ["lloyds-cargo-insurance", "1688"],
      ["south-sea-capital-preservation", "1720 frenzy"],
      ["bridgewater-canal-carriage", "1761"],
      ["boulton-watt-installation", "1777"],
      ["jacquard-card-service", "1804-1805"],
      ["hudson-steamboat-wharf", "1807"],
      ["erie-canal-supplies", "1817"],
      ["erie-canal-freight", "1825"],
      ["stockton-rail-maintenance", "1825"],
      ["railway-telegraph-service", "1839"],
      ["gold-rush-logistics", "1849"],
      ["railway-mania-exit", "mid-1840s"],
      ["sewing-machine-service", "1851"],
      ["atlantic-cable-messages", "1866"],
      ["bessemer-tooling-service", "1865"],
      ["pearl-street-electrics", "1882"],
      ["electric-tube-connections", "1890 opening"],
      ["model-t-service", "1908"],
      ["assembly-line-quality", "1913"],
      ["radio-repair-service", "confirmed customer has a compatible radio"],
      ["baby-bond-savings", "1935"],
      ["transistor-training", "June 1948 public announcement"]
    ] as const;

    for (const [id, availabilityMarker] of lateMechanisms) {
      const action = opportunities.get(id)?.action;
      expect(action, `${id} should exist`).toBeDefined();
      expect(action).toContain(availabilityMarker);
      expect(action).toMatch(/\bEarlier arrival:\s+\S/);
    }
  });
});

describe("modern and recent course content", () => {
  const taskSixBriefings = (): Briefing[] => briefings.filter((briefing) => briefing.window.start >= 1950);
  const taskSixOpportunity = (id: string) => taskSixBriefings().flatMap((briefing) => briefing.opportunities)
    .find((opportunity) => opportunity.id === id);

  it("completes the 63-window catalog with 90-120 sourced opportunities", () => {
    expect(briefings).toHaveLength(63);
    expect(briefings.map((briefing) => briefing.window)).toEqual(windows);
    expect(briefings.flatMap((briefing) => briefing.opportunities).length).toBeGreaterThanOrEqual(90);
    expect(briefings.flatMap((briefing) => briefing.opportunities).length).toBeLessThanOrEqual(120);
    expect(validateBriefings(briefings)).toEqual([]);
  });

  it("locks the curated top recommendation for every 1950-2026 window", () => {
    const firstOpportunityIds = [
      "postwar-savings-bond-ladder",
      "sp500-after-launch",
      "public-market-diversification",
      "series-e-1965-maturity-plan",
      "legal-gold-after-1974",
      "gold-position-sizing",
      "personal-computer-service",
      "microsoft-ipo-cash-buy",
      "broad-index-rebalancing",
      "amazon-post-ipo-sizing",
      "dotcom-deleveraging",
      "amazon-post-crash-sizing",
      "google-ipo-public-auction",
      "pre-crisis-deleveraging",
      "crisis-index-rebalance",
      "bitcoin-acquisition-custody",
      "diversified-equity-recovery",
      "ethereum-crowdsale-custody",
      "diversified-index-2016",
      "rebalance-crypto-2017",
      "treasury-bill-liquidity-2018",
      "diversified-plan-2019",
      "pandemic-rebalance-2020",
      "inflation-linked-savings-2021",
      "treasury-bill-ladder-2022",
      "cash-yield-diversification-2023",
      "concentration-rebalance-2024",
      "liquidity-buffer-2025",
      "hindsight-ends-here"
    ];

    const items = taskSixBriefings();
    expect(items.map((briefing) => briefing.window)).toEqual(windows.slice(34));
    items.forEach((briefing, index) => {
      expect(briefing.opportunities[0].id).toBe(firstOpportunityIds[index]);
    });
    expect(items.flatMap((briefing) => briefing.opportunities)).toHaveLength(44);
  });

  it("uses the direct Treasury maturity table for the 1965-1969 top recommendation", () => {
    const opportunity = taskSixOpportunity("series-e-1965-maturity-plan");

    expect(opportunity?.destination).toMatch(/savings-bond agent/i);
    expect(opportunity?.action).toMatch(/December 1965 through May 1969|seven-year original maturity/i);
    expect(opportunity?.sources.map((source) => source.url)).toContain("https://www.treasurydirect.gov/forms/savpdp0035.pdf");
    expect(opportunity?.action).not.toMatch(/Berkshire|New York Stock Exchange/i);
  });

  it("gates the 2002-2003 Amazon case on the already-public 2002 Form 10-K", () => {
    const opportunity = taskSixOpportunity("amazon-post-crash-sizing");

    expect(opportunity?.destination).toMatch(/after.+2002 Form 10-K.+public.+2003/i);
    expect(opportunity?.action).toMatch(/once the 2002 Form 10-K is public/i);
    expect(opportunity?.sources.map((source) => source.url)).toContain("https://www.sec.gov/Archives/edgar/data/1018724/000095014903000355/v87419ore10vk.htm");
    expect(opportunity?.sources.map((source) => source.url)).not.toContain("https://www.sec.gov/Archives/edgar/data/1018724/000119312504029488/d10k.htm");
  });

  it("supports dot-com risk control with contemporary SEC and NBER records", () => {
    const opportunity = taskSixOpportunity("dotcom-deleveraging");
    const urls = opportunity?.sources.map((source) => source.url);

    expect(urls).toContain("https://www.sec.gov/enforcement-litigation/litigation-releases/lr-16700");
    expect(urls).toContain("https://www.nber.org/research/data/us-business-cycle-expansions-and-contractions");
    expect(opportunity?.action).toMatch(/September 14, 2000|March through November 2001/i);
    expect(opportunity?.sources.map((source) => source.title).join(" ")).not.toMatch(/SecondMarket|S&P 500 Through History/i);
  });

  it("uses Treasury's direct issue-date table for Series E and early Series EE maturity claims", () => {
    const maturityTableUrl = "https://www.treasurydirect.gov/forms/savpdp0035.pdf";
    const cases = [
      ["postwar-savings-bond-ladder", /10 years|9 years and 8 months/i],
      ["series-e-maturity-match", /8 years and 11 months|7 years and 9 months/i],
      ["series-e-1965-maturity-plan", /seven-year original maturity/i],
      ["early-eighties-ee-maturity-check", /11 years|9 years|8 years/i]
    ] as const;

    for (const [id, datedTerm] of cases) {
      const opportunity = taskSixOpportunity(id);
      expect(opportunity?.sources.map((source) => source.url), `${id} source`).toContain(maturityTableUrl);
      expect(opportunity?.action, `${id} dated term`).toMatch(datedTerm);
    }

    const earlyEighties = taskSixOpportunity("early-eighties-ee-maturity-check");
    expect(earlyEighties?.destination).toMatch(/savings-bond agent/i);
    expect(earlyEighties?.action).not.toMatch(/auction|dealer|selling before maturity|marketable Treasury/i);
  });

  it("uses S&P's dated Worth the Weight artifact for the 2024 concentration case", () => {
    const opportunity = taskSixOpportunity("concentration-rebalance-2024");

    expect(opportunity?.sources.map((source) => source.url)).toContain("https://www.spglobal.com/spdji/en/documents/research/research-worth-the-weight.pdf");
    expect(opportunity?.action).toMatch(/June 28, 2024.+more than half a century/i);
    expect(opportunity?.sources.map((source) => source.title).join(" ")).not.toMatch(/Economic Moats/i);
  });

  it("describes Microsoft's first-day $35.50 as intraday rather than the close", () => {
    const opportunity = taskSixOpportunity("microsoft-ipo-cash-buy");
    const publishedClaims = opportunity?.sources.map((source) => source.claim).join(" ");

    expect(opportunity?.action).toMatch(/\$35\.50.+before the end of the day/i);
    expect(`${opportunity?.action} ${publishedClaims}`).not.toMatch(/\$35\.50 (?:closing|close)/i);
  });

  it("orders published evidence, availability, earlier-arrival posture, and inference", () => {
    for (const briefing of taskSixBriefings()) {
      for (const opportunity of briefing.opportunities) {
        expect(opportunity.action).toMatch(/^Case evidence:\s+\S[\s\S]*?\s+Availability:\s+\S[\s\S]*?\s+Earlier arrival:\s+\S[\s\S]*?\s+Inference:\s+\S[\s\S]*$/);
        if (briefing.window.start !== briefing.window.end) {
          expect(opportunity.action).toMatch(/Earlier arrival:[\s\S]*\b(?:prepare|defer|keep|hold|learn|build|wait|preserve|verify|research)\b/i);
        }
      }
    }
  });

  it("publishes one correct lesson and the required evidence roles", () => {
    for (const opportunity of taskSixBriefings().flatMap((briefing) => briefing.opportunities)) {
      expect(opportunity.lesson.choices).toHaveLength(2);
      expect(opportunity.lesson.choices.filter((choice) => choice.correct)).toHaveLength(1);
      expect(opportunity.sources.some((source) => source.kind === "history")).toBe(true);
      if (opportunity.category === "asset") {
        expect(opportunity.sources.some((source) => source.kind === "price" || source.kind === "mechanism")).toBe(true);
      }
    }
  });

  it("ends hindsight in 2026 without a numeric future payoff", () => {
    const current = taskSixBriefings().at(-1);
    const opportunity = current?.opportunities[0];
    expect(current?.window).toEqual({ start: 2026, end: 2026 });
    expect(opportunity?.id).toBe("hindsight-ends-here");
    expect(opportunity?.payoff.multiple).toBeUndefined();
    expect(opportunity?.payoff.label).not.toMatch(/\b\d+(?:\.\d+)?\s*(?:x|%|percent)\b/i);
    expect(opportunity?.action).toMatch(/hindsight ends here/i);
    expect(opportunity?.sources.map((source) => source.url)).toEqual([
      "https://www.federalreserve.gov/monetarypolicy/2026-07-mpr-summary.htm",
      "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202609&type=daily_treasury_bill_rates"
    ]);
    expect(opportunity?.action).not.toMatch(/S&P|largest index constituents/i);
  });
});

const validBriefing = (): Briefing => ({
  id: "fixture",
  window: windows[4],
  opportunities: [
    {
      id: "fixture-opportunity",
      destination: "Fixture city",
      title: "Fixture opportunity",
      action: "Use the documented mechanism.",
      category: "trade",
      capitalTier: "working",
      access: ["A local trading licence."],
      exitSignal: "Exit when the documented condition changes.",
      payoff: { label: "Qualitative outcome", basis: "qualitative" },
      risks: [{ kind: "execution", detail: "Execution can fail." }],
      lesson: {
        concept: "Timing",
        prompt: "Choose the documented move.",
        choices: [
          { label: "Wait", consequence: "The opening closes.", correct: false },
          { label: "Act", consequence: "The mechanism is available.", correct: true }
        ],
        explanation: "Timing changes access to an opportunity."
      },
      sources: [
        {
          title: "Historical record",
          publisher: "Archive",
          url: "https://example.com/history",
          claim: "The historical event occurred.",
          kind: "history"
        }
      ],
      confidence: "high"
    }
  ]
});

describe("briefing windows", () => {
  it("defines 63 contiguous, non-overlapping windows across the supported range", () => {
    expect(windows).toHaveLength(63);
    expect(windows[0].start).toBe(-2999);
    expect(windows.at(-1)?.end).toBe(2026);

    for (let index = 1; index < windows.length; index += 1) {
      expect(windows[index].start).toBe(windows[index - 1].end + 1);
    }
  });
});

describe("briefing content validation", () => {
  it("accepts a complete qualitative fixture", () => {
    expect(validateBriefings([validBriefing()])).toEqual([]);
  });

  it("rejects a window that is not an exact canonical entry", () => {
    const item = validBriefing();
    item.window = { start: 2, end: 2 };

    expect(validateBriefings([item]).join(" ")).toMatch(/canonical window/i);
  });

  it("rejects duplicate ids and partial window overlaps", () => {
    const first = validBriefing();
    const second = validBriefing();
    first.window = { start: 1, end: 3 };
    second.window = { start: 3, end: 5 };

    expect(validateBriefings([first, second]).join(" ")).toMatch(/duplicate briefing id|overlaps/i);
  });

  it("rejects overlaps that follow a nested window", () => {
    const first = validBriefing();
    const second = validBriefing();
    const third = validBriefing();
    first.id = "first";
    second.id = "second";
    third.id = "third";
    first.window = { start: 1, end: 5 };
    second.window = { start: 2, end: 3 };
    third.window = { start: 4, end: 6 };

    const errors = validateBriefings([first, second, third]).filter((error) => error.includes("overlaps"));
    expect(errors).toEqual([
      "Briefing window overlaps: first and second.",
      "Briefing window overlaps: first and third."
    ]);
  });

  it("rejects an opportunity without access constraints", () => {
    const item = validBriefing();
    item.opportunities[0].access = [];

    expect(validateBriefings([item]).join(" ")).toMatch(/access/i);
  });

  it.each(["label", "consequence"] as const)("rejects a blank lesson choice %s", (field) => {
    const item = validBriefing();
    item.opportunities[0].lesson.choices[0][field] = "   ";

    expect(validateBriefings([item]).join(" ")).toMatch(/lesson choice/i);
  });

  it("rejects non-HTTPS evidence URLs", () => {
    const item = validBriefing();
    item.opportunities[0].sources[0].url = "http://example.com/history";

    expect(validateBriefings([item]).join(" ")).toMatch(/HTTPS/i);
  });

  it("rejects a numeric payoff without separate history and price or mechanism evidence", () => {
    const item = validBriefing();
    item.opportunities[0].payoff = { label: "2x", multiple: 2, basis: "documented" };

    expect(validateBriefings([item]).join(" ")).toMatch(/numeric payoff/i);
  });

  it.each([Number.NaN, Number.POSITIVE_INFINITY, 0, -1])(
    "rejects an invalid numeric payoff multiple: %s",
    (multiple) => {
      const item = validBriefing();
      item.opportunities[0].payoff = { label: "2x", multiple, basis: "documented" };

      expect(validateBriefings([item]).join(" ")).toMatch(/positive finite/i);
    }
  );

  it.each(["title", "publisher", "claim"] as const)("rejects a blank source %s", (field) => {
    const item = validBriefing();
    item.opportunities[0].sources[0][field] = "   ";

    expect(validateBriefings([item]).join(" ")).toMatch(/incomplete source/i);
  });

  it("accepts numeric evidence from one publisher when the URLs are distinct", () => {
    const item = validBriefing();
    item.opportunities[0].payoff = { label: "2x", multiple: 2, basis: "documented" };
    item.opportunities[0].sources.push({
      title: "Mechanism record",
      publisher: "Archive",
      url: "https://example.com/mechanism",
      claim: "The entry and exit values are comparable.",
      kind: "mechanism"
    });

    expect(validateBriefings([item])).toEqual([]);
  });
});
