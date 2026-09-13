import type { Briefing, Opportunity, Risk, Source } from "../domain";
import { windows } from "./windows";

type OpportunitySeed = {
  id: string;
  destination: string;
  title: string;
  evidence: string;
  availability: string;
  earlier: string;
  inference: string;
  category: Opportunity["category"];
  capitalTier: Opportunity["capitalTier"];
  access: string[];
  exitSignal: string;
  payoffLabel: string;
  risks: Risk[];
  lesson: [concept: string, prompt: string, correct: string, incorrect: string, explanation: string];
  sources: Source[];
  confidence?: Opportunity["confidence"];
  ethicsNote?: string;
};

export const createOpportunity = (seed: OpportunitySeed): Opportunity => ({
  id: seed.id,
  destination: seed.destination,
  title: seed.title,
  action: `Case evidence: ${seed.evidence} Availability: ${seed.availability} Earlier arrival: ${seed.earlier} Inference: ${seed.inference}`,
  category: seed.category,
  capitalTier: seed.capitalTier,
  access: seed.access,
  exitSignal: seed.exitSignal,
  payoff: { label: seed.payoffLabel, basis: "qualitative" },
  risks: seed.risks,
  lesson: {
    concept: seed.lesson[0],
    prompt: seed.lesson[1],
    choices: [
      { label: seed.lesson[2], consequence: "This follows the documented timing, access, and risk limits.", correct: true },
      { label: seed.lesson[3], consequence: "This assumes access or an outcome that the evidence does not support.", correct: false }
    ],
    explanation: seed.lesson[4]
  },
  sources: seed.sources,
  confidence: seed.confidence ?? "medium",
  ethicsNote: seed.ethicsNote
});

const source = (title: string, publisher: string, url: string, claim: string, kind: Source["kind"]): Source => ({
  title,
  publisher,
  url,
  claim,
  kind
});

const savingsTimeline = source(
  "Timeline of U.S. Savings Bonds",
  "U.S. TreasuryDirect",
  "https://www.treasurydirect.gov/research-center/history-of-savings-bond/timeline/",
  "Treasury records Series E availability through 1980, the 1952 introduction of Series H, J, and K, and later changes to the savings-bond program.",
  "history"
);

const retiredBonds = source(
  "Historical and retired bonds",
  "U.S. TreasuryDirect",
  "https://www.treasurydirect.gov/savings-bonds/historical-retired-bonds/",
  "Treasury lists issue dates, issue prices, maturity periods, and redemption rules for retired savings-bond series.",
  "mechanism"
);

const spHistory = source(
  "S&P 500 Through History",
  "S&P Dow Jones Indices",
  "https://www.spglobal.com/spdji/en/documents/campaigns/sp-500-through-history-202301.pdf",
  "S&P dates the live index launch to March 4, 1957 and distinguishes actual index history from pre-launch back-testing.",
  "history"
);

const spPrice = source(
  "S&P 500",
  "S&P Dow Jones Indices",
  "https://www.spglobal.com/spdji/en/indices/equity/sp-500/",
  "The index provider publishes the launch date, methodology, constituent count, and dated index levels while warning that past performance is not a guarantee.",
  "price"
);

const diversification = source(
  "Beginners' Guide to Asset Allocation, Diversification, and Rebalancing",
  "U.S. Securities and Exchange Commission",
  "https://www.sec.gov/about/reports-publications/investorpubsassetallocationhtm",
  "The SEC explains diversification across and within asset classes, liquidity matching, and periodic rebalancing without promising protection from every loss.",
  "mechanism"
);

const cycles = source(
  "US Business Cycle Expansions and Contractions",
  "National Bureau of Economic Research",
  "https://www.nber.org/research/data/us-business-cycle-expansions-and-contractions",
  "The NBER chronology dates postwar U.S. recessions and expansions, including contractions in 1953-54, 1957-58, 1960-61, 1973-75, 1980-82, and 1990-91.",
  "history"
);

const goldLaw = source(
  "Public Law 93-373",
  "U.S. Congress",
  "https://www.congress.gov/93/statute/STATUTE-88/STATUTE-88-Pg445.pdf",
  "The 1974 statute allowed U.S. citizens to purchase, hold, sell, or otherwise deal with gold, effective no later than December 31, 1974.",
  "history"
);

const goldPrice = source(
  "Gold Fixing Price 10:30 A.M. (London time) in London Bullion Market",
  "Federal Reserve Bank of St. Louis",
  "https://fred.stlouisfed.org/series/GOLDAMGBD228NLBM",
  "The FRED series publishes dated London morning gold-price observations and identifies the underlying bullion-market source.",
  "price"
);

export const modern: Briefing[] = [
  {
    id: "postwar-savings-and-recovery",
    window: windows[34],
    opportunities: [
      createOpportunity({
        id: "postwar-savings-bond-ladder",
        destination: "Authorized U.S. savings-bond agent, 1950-1954",
        title: "Match postwar savings to dated maturities",
        evidence: "Series E savings bonds remained available in the early 1950s, while Series H, J, and K began in 1952 with published issue and redemption terms.",
        availability: "Buy only a series actually offered on the travel date through an authorized issuing agent and only if the traveler is eligible.",
        earlier: "keep near-term cash liquid, research the current series, and defer purchase until its terms and authorized seller are verified.",
        inference: "ladder modest, lawfully owned savings across available maturity dates and retain registration records instead of treating one bond as emergency cash.",
        category: "security",
        capitalTier: "pocket",
        access: ["Eligibility accepted by an authorized agent, lawful funds, current issue terms, and separate emergency cash."],
        exitSignal: "Redeem under the published schedule as each planned need arrives; do not improvise a resale market for a nonmarketable bond.",
        payoffLabel: "Scheduled saving with less dependence on a stock-market quotation",
        risks: [{ kind: "liquidity", detail: "A nonmarketable bond may not meet an unexpected cash need without early-redemption limits." }],
        lesson: ["Liquidity matching", "Which funds belong in a savings-bond ladder?", "Money not needed before the stated redemption dates", "Rent and emergency cash", "Safety depends on matching the instrument's access rules to the date the money is needed."],
        sources: [savingsTimeline, retiredBonds],
        confidence: "high"
      }),
      createOpportunity({
        id: "postwar-diversified-shares",
        destination: "Regulated U.S. public markets, 1950-1954",
        title: "Spread a postwar equity allocation across businesses",
        evidence: "The postwar expansion included a documented 1953-54 recession, showing that even a growing economy did not move in one direction.",
        availability: "A stock allocation requires a lawful brokerage account, settled cash, public disclosures, and securities actually listed on the travel date.",
        earlier: "research multiple industries, preserve cash for obligations, and wait for account and settlement access rather than assuming modern index funds exist.",
        inference: "buy a modest basket of disclosed, liquid companies over time and rebalance instead of placing all capital in one remembered winner.",
        category: "asset",
        capitalTier: "substantial",
        access: ["A lawful broker, verified identity and funds, current listings, public disclosures, and capacity to hold through volatility."],
        exitSignal: "Rebalance to the planned allocation or sell when a company's public facts break the thesis; never depend on an exact historical peak.",
        payoffLabel: "Participation in postwar business growth with single-company risk limited",
        risks: [{ kind: "liquidity", detail: "Recessions and thin trading can produce losses or prevent sale near a remembered quotation." }],
        lesson: ["Diversification", "How should a traveler use knowledge of broad postwar growth?", "Own several disclosed businesses without leverage", "Bet everything on one remembered name", "Broad historical growth does not identify a single survivor in advance."],
        sources: [cycles, diversification],
        ethicsNote: "Use only public information available on the travel date; future memory is not permission to seek confidential records."
      })
    ]
  },
  {
    id: "index-launch-and-household-saving",
    window: windows[35],
    opportunities: [
      createOpportunity({
        id: "sp500-after-launch",
        destination: "Regulated U.S. securities market, 1957-1959",
        title: "Use the live broad-market benchmark only after launch",
        evidence: "S&P launched the 500-stock index on March 4, 1957; figures shown for earlier dates are later back-tests rather than a tradable live record.",
        availability: "The benchmark exists only from March 1957, while any fund or basket tracking it must itself be offered, affordable, and settle through a lawful broker.",
        earlier: "research a diversified cash-owned basket and defer any claim to buy an S&P 500-linked product until a real vehicle is offered.",
        inference: "use the live benchmark to measure diversification and costs, then buy only an available broad basket without leverage or a promise of index-perfect tracking.",
        category: "asset",
        capitalTier: "substantial",
        access: ["A lawful brokerage relationship, settled cash, an actually available diversified vehicle or basket, and verified fees."],
        exitSignal: "Rebalance on a written schedule or when liquidity needs change; ignore the impossible instruction to sell at a later chart's exact high.",
        payoffLabel: "Broad equity participation measured against a live benchmark",
        risks: [{ kind: "execution", detail: "A hand-built basket may be costly and may not track the index closely." }],
        lesson: ["Back-test awareness", "Can a 1955 traveler buy the S&P 500 as later charts show it?", "Wait for a real benchmark and available vehicle", "Treat back-tested history as a live product", "An index history and an investable product have separate availability dates."],
        sources: [spHistory, spPrice],
        confidence: "high"
      }),
      createOpportunity({
        id: "series-e-maturity-match",
        destination: "Authorized U.S. savings-bond agent, 1955-1959",
        title: "Check the issue month before promising redemption",
        evidence: "Treasury's retired-bond tables show that Series E maturity periods changed by issue date during this window.",
        availability: "A purchase is available only through an authorized agent under the exact issue month's rules and eligibility requirements.",
        earlier: "preserve liquid cash and verify the issue-date table before committing funds to a redemption plan.",
        inference: "record the issue month, expected redemption schedule, owner registration, and a separate emergency reserve before buying.",
        category: "security",
        capitalTier: "pocket",
        access: ["An authorized agent, lawful funds, accepted registration, and the issue-specific redemption schedule."],
        exitSignal: "Redeem according to the issue's published terms when the planned need arrives.",
        payoffLabel: "Predictable saving under issue-specific Treasury terms",
        risks: [{ kind: "liquidity", detail: "Using the wrong issue schedule can leave the saver short when cash is needed." }],
        lesson: ["Instrument vintages", "What determines a retired savings bond's schedule?", "Its series and issue date", "A later bond's current terms", "Products with the same name can carry different rules across vintages."],
        sources: [savingsTimeline, retiredBonds],
        confidence: "high"
      })
    ]
  },
  {
    id: "public-markets-and-office-copying",
    window: windows[36],
    opportunities: [
      createOpportunity({
        id: "public-market-diversification",
        destination: "Regulated U.S. public markets, 1960-1964",
        title: "Build a basket that can survive a recession",
        evidence: "The NBER dates a U.S. contraction from April 1960 to February 1961, followed by a long expansion, while the live S&P 500 measured a broad market.",
        availability: "Use only listed securities and pooled vehicles actually offered by a regulated intermediary on the travel date.",
        earlier: "research fees and holdings, keep an emergency reserve, and defer a purchase until lawful settlement and diversification can be verified.",
        inference: "add cash gradually across industries and rebalance after large moves rather than selecting survivors from a future chart.",
        category: "asset",
        capitalTier: "substantial",
        access: ["A regulated broker, public disclosures, settled cash, and enough holdings to reduce single-company dependence."],
        exitSignal: "Rebalance on a planned date or sell when obligations require cash; never borrow to force the timing.",
        payoffLabel: "Long-run market participation with recession risk acknowledged",
        risks: [{ kind: "liquidity", detail: "A broad basket can still fall sharply during a recession." }],
        lesson: ["Sequence risk", "What protects a near-term obligation from a market decline?", "Keep that obligation outside volatile equities", "Assume the next expansion arrives before payment is due", "Diversification cannot fix a mismatch between market risk and a cash deadline."],
        sources: [cycles, diversification],
        confidence: "high"
      }),
      createOpportunity({
        id: "xerox-914-service",
        destination: "Offices using Xerox 914 copiers, 1960-1964",
        title: "Service the copier already under contract",
        evidence: "The Xerox 914, introduced in 1959, was a fast plain-paper copier capable of very high monthly use and became a major office product.",
        availability: "Work exists only after a customer has an installed 914 and Xerox or an authorized service organization accepts the technician.",
        earlier: "learn electrical and mechanical safety, but defer model-specific work until training, parts, and a customer machine are available.",
        inference: "perform authorized cleaning, inspection, and parts replacement against a work order, earning for uptime rather than speculating on manufacturer shares.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Authorized training, the customer's consent, safe isolation procedures, and compatible parts."],
        exitSignal: "Close the job after the customer accepts a copy-quality and safety check.",
        payoffLabel: "Possible recurring office-equipment service income",
        risks: [{ kind: "physical", detail: "A heavy electromechanical machine can shock, burn, or injure an untrained technician." }],
        lesson: ["Installed-base service", "What is the bounded opening around a successful copier?", "Maintain an installed machine under authorization", "Claim the patent or sell nonexistent inventory", "A growing installed base creates legitimate maintenance work without requiring ownership of the core invention."],
        sources: [source("Xerox 914 Plain Paper Copier", "National Museum of American History", "https://americanhistory.si.edu/collections/object/nmah_1085916", "The Smithsonian dates the 914's introduction to 1959 and describes its speed, plain-paper operation, and large installed-use capacity.", "history")]
      })
    ]
  },
  {
    id: "ownership-and-allocation-discipline",
    window: windows[37],
    opportunities: [
      createOpportunity({
        id: "berkshire-cash-ownership",
        destination: "New York Stock Exchange, 1965-1969",
        title: "Buy a disclosed holding company only with cash",
        evidence: "Berkshire Hathaway's shareholder archive begins with 1965-era management records, and its annual table reports per-share market-value changes from 1965 onward.",
        availability: "A purchase requires publicly traded shares, a lawful broker, settled cash, and public reports available on the travel date.",
        earlier: "research the textile company's filings and preserve liquidity, but defer any purchase until lawful share access and current disclosures are confirmed.",
        inference: "take only a small cash-funded position, diversify around it, and judge the disclosed capital-allocation record rather than assuming future management outcomes.",
        category: "asset",
        capitalTier: "substantial",
        access: ["A lawful brokerage account, settled cash, public company reports, and capacity to hold an illiquid concentrated position."],
        exitSignal: "Sell or trim if public capital allocation departs from the thesis or the position overwhelms the portfolio.",
        payoffLabel: "Exposure to a documented long-run capital-allocation record without leverage",
        risks: [{ kind: "liquidity", detail: "A remembered survivor can still be volatile, hard to size, and dependent on management execution." }],
        lesson: ["Survivorship bias", "What should future knowledge change about position size?", "Keep one famous survivor inside a diversified plan", "Make it the entire portfolio", "Knowing one eventual winner hides the many contemporaneous firms that did not survive."],
        sources: [
          source("Shareholder Letters", "Berkshire Hathaway", "https://www.berkshirehathaway.com/letters/letters.html", "Berkshire publishes its long-running shareholder-letter archive beginning with the early management period.", "history"),
          source("2018 Annual Letter", "Berkshire Hathaway", "https://www.berkshirehathaway.com/letters/2018ltr.pdf", "The official annual report tabulates annual per-share market-value changes from 1965 through 2018.", "price")
        ],
        ethicsNote: "Trade only public securities through ordinary market access; do not seek nonpublic acquisition plans."
      }),
      createOpportunity({
        id: "late-sixties-index-rebalance",
        destination: "Regulated U.S. securities market, 1965-1969",
        title: "Rebalance before one long expansion becomes certainty",
        evidence: "The NBER records an expansion through December 1969, while the live S&P 500 provided a broad public-market measure.",
        availability: "Rebalancing requires existing lawful holdings and instruments that can actually settle on the travel date.",
        earlier: "build a written target allocation, keep cash for obligations, and defer trades until the broker confirms settlement and fees.",
        inference: "trim holdings that have grown beyond the target and restore bonds or cash without trying to call the exact cycle peak.",
        category: "asset",
        capitalTier: "substantial",
        access: ["Lawful custody of the holdings, current quotations, a broker, and a written target allocation."],
        exitSignal: "Finish when the portfolio returns to its target weights; do not turn rebalancing into a market-timing bet.",
        payoffLabel: "Concentration reduced before the next contraction",
        risks: [{ kind: "execution", detail: "Taxes, spreads, and delayed settlement can make excessive trading costly." }],
        lesson: ["Rebalancing", "What does a long expansion justify?", "Restore the planned allocation", "Assume the expansion cannot end", "Rebalancing controls exposure without claiming to know the precise turning point."],
        sources: [cycles, diversification]
      })
    ]
  },
  {
    id: "gold-access-and-concentration-risk",
    window: windows[38],
    opportunities: [
      createOpportunity({
        id: "legal-gold-after-1974",
        destination: "Lawful U.S. bullion market, December 31, 1974",
        title: "Wait for lawful gold ownership, then keep it small",
        evidence: "Congress ended the federal prohibition on U.S. citizens purchasing, holding, selling, or dealing in gold no later than December 31, 1974; official market data record volatile bullion prices afterward.",
        availability: "The U.S. bullion purchase is unavailable before the statute takes effect and still requires a lawful seller, authentic metal, funds, and custody.",
        earlier: "keep capital in lawful liquid instruments, research assay and storage, and defer the gold purchase until the legal gate opens.",
        inference: "after legality is confirmed, buy only a modest authenticated allocation without leverage and document storage and resale costs.",
        category: "asset",
        capitalTier: "working",
        access: ["Legal eligibility after the effective date, a reputable dealer, assay evidence, lawful funds, insurance, and secure custody."],
        exitSignal: "Rebalance when gold exceeds its portfolio role or custody and spreads erase the reason for holding it.",
        payoffLabel: "A limited non-cash diversifier with no promised return",
        risks: [{ kind: "custody", detail: "Physical gold can be stolen, substituted, or expensive to insure and sell." }, { kind: "legal", detail: "Arriving before the effective date makes the intended purchase unlawful." }],
        lesson: ["Legal availability", "What is the first condition for a 1974 U.S. gold plan?", "Wait until private dealing is lawful", "Assume future legality applies early", "A known later market does not erase the law in force on the arrival date."],
        sources: [goldLaw, goldPrice],
        confidence: "high"
      }),
      createOpportunity({
        id: "nifty-fifty-concentration-check",
        destination: "Regulated U.S. public markets, 1970-1974",
        title: "Reduce concentration before the 1973-75 contraction",
        evidence: "The NBER dates a recession from November 1973 to March 1975, interrupting the preceding expansion.",
        availability: "The defensive move requires lawful existing holdings, public quotations, and assets that can settle before market stress worsens.",
        earlier: "prepare a target allocation, preserve near-term cash, and research diversified vehicles instead of opening a concentrated trade for hindsight alone.",
        inference: "trim any single-company exposure that dominates the plan and hold an unleveraged mix of disclosed securities and liquid reserves.",
        category: "asset",
        capitalTier: "substantial",
        access: ["Custody of the shares, a broker, settled alternatives, and a written allocation tied to actual obligations."],
        exitSignal: "Stop after restoring target weights; do not short companies or manipulate sentiment around the contraction.",
        payoffLabel: "Portfolio drawdown risk reduced through diversification",
        risks: [{ kind: "liquidity", detail: "Diversified holdings can still decline together during a severe recession." }],
        lesson: ["Concentration risk", "What can hindsight safely improve before a downturn?", "Reduce dependence on one security", "Borrow to short the whole market", "The ethical advantage is risk control, not forcing or exploiting a collapse."],
        sources: [cycles, diversification],
        ethicsNote: "This is a cash-owned rebalancing lesson; it excludes shorts, rumors, and manipulation."
      })
    ]
  },
  {
    id: "inflation-and-bullion-discipline",
    window: windows[39],
    opportunities: [
      createOpportunity({
        id: "gold-position-sizing",
        destination: "Lawful U.S. bullion market, 1975-1979",
        title: "Size gold for uncertainty, not a guaranteed peak",
        evidence: "Private U.S. gold dealing was lawful in this window, and the official London fixing series records large, dated price movements.",
        availability: "Purchase requires an operating lawful dealer, verified metal or a disclosed regulated vehicle, custody, and a realizable resale route.",
        earlier: "research spreads and storage, keep an emergency reserve, and defer buying until lawful access and authenticity are confirmed.",
        inference: "hold only a capped, unleveraged allocation and rebalance before it becomes the whole portfolio rather than aiming for a remembered daily high.",
        category: "asset",
        capitalTier: "working",
        access: ["A lawful dealer or regulated vehicle, assay or disclosure evidence, secure custody, and a buyer for eventual exit."],
        exitSignal: "Trim when the position exceeds its allocation or resale spreads and storage costs overwhelm its diversification role.",
        payoffLabel: "Possible inflation and crisis diversification with volatile pricing",
        risks: [{ kind: "liquidity", detail: "Bullion prices, dealer spreads, and resale demand can move sharply against the holder." }],
        lesson: ["Position sizing", "How should a traveler handle a volatile diversifier?", "Cap it and rebalance", "Treat the future high as guaranteed", "A documented historical rise does not make execution, custody, or the peak certain."],
        sources: [goldLaw, goldPrice],
        confidence: "high"
      }),
      createOpportunity({
        id: "series-h-income-match",
        destination: "Authorized U.S. savings-bond agent, 1975-1979",
        title: "Use only the savings-bond series that fits the cash need",
        evidence: "Treasury records Series H availability through 1979 and Series E availability through 1980, each with different payment and redemption features.",
        availability: "A series is usable only while issued, through an authorized agent, and under its exact registration and holding rules.",
        earlier: "research each series, keep emergency cash available, and defer purchase until the payment pattern matches the planned expense.",
        inference: "choose the current issue whose cash-flow and maturity terms fit the goal rather than buying the bond with the most familiar letter.",
        category: "security",
        capitalTier: "pocket",
        access: ["Eligibility, authorized issuance, lawful funds, registration records, and separate liquid reserves."],
        exitSignal: "Redeem under published terms when the matched liability arrives.",
        payoffLabel: "Government-backed saving matched to a planned cash need",
        risks: [{ kind: "liquidity", detail: "A long holding schedule can conflict with near-term expenses." }],
        lesson: ["Cash-flow matching", "Which bond series is preferable?", "The available one whose terms fit the liability", "The one remembered from a later advertisement", "Instrument names matter less than dated terms and the saver’s actual need."],
        sources: [savingsTimeline, retiredBonds],
        confidence: "high"
      })
    ]
  },
  {
    id: "personal-computing-and-rate-cycle",
    window: windows[40],
    opportunities: [
      createOpportunity({
        id: "personal-computer-service",
        destination: "Authorized IBM PC retailers and customers, 1981-1984",
        title: "Configure the open-architecture PC already sold",
        evidence: "IBM introduced the model 5150 in August 1981 with off-the-shelf parts, retail channels, word-processing and spreadsheet software, and later PC variants.",
        availability: "PC-specific work starts only after the August 1981 release and after a retailer or owner authorizes service on a compatible machine.",
        earlier: "learn general electronics and software, prepare checklists, and defer IBM PC claims until hardware, documentation, and parts are public.",
        inference: "offer authorized setup, backup, peripheral installation, and user training against a work order instead of copying software or firmware.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["A customer's consent, model-specific documentation, compatible parts, lawful software, and safe electrical practice."],
        exitSignal: "Collect after the customer accepts a documented boot, print, and backup test.",
        payoffLabel: "Possible setup and support income around an installed PC base",
        risks: [{ kind: "execution", detail: "Incompatible parts or lost customer data can turn a small service job into a costly liability." }],
        lesson: ["Technology complements", "Where is the accessible opening after a standard PC launches?", "Authorized setup and support", "Copy protected software for resale", "A new platform creates lawful demand for configuration and training."],
        sources: [source("The IBM PC", "IBM", "https://www.ibm.com/history/personal-computer", "IBM dates the 5150 introduction to August 1981 and documents its retail channels, open architecture, applications, and later variants.", "history")],
        ethicsNote: "Use licensed software and customer-authorized access; never copy credentials, data, or code."
      }),
      createOpportunity({
        id: "early-eighties-treasury-ladder",
        destination: "U.S. Treasury securities market, 1980-1984",
        title: "Ladder maturities instead of betting on one rate turn",
        evidence: "The NBER dates two recessions across 1980-82, while Treasury securities remained government obligations with maturity-specific terms.",
        availability: "A ladder requires securities actually offered through a lawful channel and enough settled cash to hold each rung to maturity.",
        earlier: "research denominations and maturity dates, preserve near-term liquidity, and defer each purchase until the auction or dealer access is confirmed.",
        inference: "spread cash needs across short and intermediate maturities rather than leverage a single prediction about interest rates.",
        category: "security",
        capitalTier: "working",
        access: ["A lawful Treasury purchase channel, current terms, settled funds, custody records, and a schedule of future expenses."],
        exitSignal: "Use maturity proceeds for the planned need or roll only after checking the new rate and liquidity requirement.",
        payoffLabel: "Known maturity dates through a volatile rate cycle",
        risks: [{ kind: "liquidity", detail: "Selling before maturity can produce a loss when market rates move." }],
        lesson: ["Duration", "Why use several maturity dates?", "Reduce dependence on one reinvestment date", "Put every dollar in the longest bond", "A ladder spreads timing risk without pretending to know the exact rate peak."],
        sources: [cycles, source("Timeline of U.S. Savings Bonds", "U.S. TreasuryDirect", "https://www.treasurydirect.gov/research-center/history-of-savings-bond/timeline/", "Treasury records the 1980 transition from Series E to Series EE and the continued retail savings channel.", "mechanism")]
      })
    ]
  },
  {
    id: "public-software-and-broad-markets",
    window: windows[41],
    opportunities: [
      createOpportunity({
        id: "microsoft-ipo-cash-buy",
        destination: "NASDAQ public offering, March 1986",
        title: "Treat the Microsoft IPO as one risky public company",
        evidence: "Microsoft went public in March 1986 at a stated offering price of $21, with a higher first-day close and a subsequently documented long price history.",
        availability: "Shares are available only after the public offering through a lawful broker able to allocate or buy settled shares; future success does not grant an IPO allocation.",
        earlier: "research public filings, keep the intended capital liquid, and defer the trade until shares are public and a broker confirms access.",
        inference: "buy only a small cash-funded position after public trading begins, diversify it, and accept that the executable price may differ from the offer.",
        category: "asset",
        capitalTier: "working",
        access: ["A lawful broker, settled cash, public disclosures, an actual allocation or market seller, and capacity for severe volatility."],
        exitSignal: "Trim when the position exceeds its allocation or public business facts break the thesis; do not target an exact future high.",
        payoffLabel: "Exposure to a documented public software company with survivorship risk explicit",
        risks: [{ kind: "execution", detail: "IPO allocations and first-day prices are not guaranteed to an unknown traveler." }],
        lesson: ["IPO access", "Does knowing the later winner guarantee the offer price?", "No; buy only through actual public access", "Assume an underwriter owes an allocation", "An offer price is evidence, not a promise that every investor can transact there."],
        sources: [
          source("Facts About Microsoft", "Microsoft", "https://news.microsoft.com/facts-about-microsoft/", "Microsoft's official company facts document its founding, products, and corporate history.", "history"),
          source("Microsoft goes public", "Microsoft", "https://news.microsoft.com/announcement/microsoft-goes-public/", "Microsoft records the $21 offering price and the first day's $35.50 closing price while describing later appreciation.", "price")
        ],
        confidence: "high"
      }),
      createOpportunity({
        id: "late-eighties-diversified-index",
        destination: "Regulated U.S. securities market, 1985-1989",
        title: "Keep the remembered technology winner inside a broad plan",
        evidence: "The live S&P 500 measured hundreds of large U.S. companies across industries during this expansion.",
        availability: "A diversified purchase requires a fund or cash-built basket actually offered on the travel date with disclosed holdings and fees.",
        earlier: "research available funds, preserve liquidity, and wait for a regulated intermediary rather than assuming a modern low-cost product exists.",
        inference: "direct most equity capital to a broad available basket and keep any remembered winner as a capped satellite position.",
        category: "asset",
        capitalTier: "substantial",
        access: ["A regulated broker, public fund disclosures or basket holdings, settled cash, and verified fees."],
        exitSignal: "Rebalance periodically and reduce any position that breaches the written cap.",
        payoffLabel: "Broad equity participation with single-stock dependence limited",
        risks: [{ kind: "liquidity", detail: "A broad equity market can still fall abruptly, as no index eliminates market risk." }],
        lesson: ["Core and satellite", "How should one remembered winner fit the portfolio?", "As a capped position around a diversified core", "As the only holding", "Survivorship knowledge is least dangerous when position limits remain intact."],
        sources: [spHistory, diversification]
      })
    ]
  },
  {
    id: "recession-and-capital-preservation",
    window: windows[42],
    opportunities: [
      createOpportunity({
        id: "broad-index-rebalancing",
        destination: "Regulated U.S. securities market, 1990-1994",
        title: "Rebalance through the 1990-91 recession",
        evidence: "The NBER dates the recession from July 1990 to March 1991; broad public-market history shows why one downturn should not be confused with a guaranteed entry day.",
        availability: "Rebalancing requires lawful existing holdings, settled cash, public prices, and a diversified vehicle actually available at the time.",
        earlier: "prepare target weights and a cash reserve, then wait for ordinary broker access rather than borrowing to front-run the contraction.",
        inference: "restore the planned stock-bond mix in measured steps during and after the contraction, without betting on the official trough date being known contemporaneously.",
        category: "asset",
        capitalTier: "substantial",
        access: ["Lawful custody, a regulated broker, available broad holdings, settled cash, and a multi-year horizon."],
        exitSignal: "Stop trading once target weights are restored; sell later only for rebalancing, needs, or a broken public thesis.",
        payoffLabel: "Disciplined market participation without claiming the exact recession trough",
        risks: [{ kind: "execution", detail: "The trough was dated later, and market prices could fall further after any purchase." }],
        lesson: ["Retrospective dates", "Could a 1990 investor know the official trough in real time?", "No; rebalance in steps", "Place one all-in order on the later date", "Economic turning points are established retrospectively, so the actionable rule must survive uncertainty."],
        sources: [cycles, spPrice],
        confidence: "high"
      }),
      createOpportunity({
        id: "series-ee-capital-buffer",
        destination: "Authorized U.S. Series EE savings-bond channel, 1990-1994",
        title: "Keep a registered savings layer outside equities",
        evidence: "Treasury records Series EE as the successor to Series E and documents registered ownership and issue-specific holding rules.",
        availability: "Purchase requires an authorized channel, eligibility, current Series EE terms, and money not needed before redemption is allowed.",
        earlier: "research issue rules, keep immediate expenses liquid, and defer purchase until registration and redemption access are confirmed.",
        inference: "use a modest registered bond allocation for a dated goal while keeping market investments separate.",
        category: "security",
        capitalTier: "pocket",
        access: ["Eligibility, an authorized seller, registration documents, lawful funds, and a separate emergency reserve."],
        exitSignal: "Redeem under the issue's rules for the planned goal; do not treat it as exchange-traded cash.",
        payoffLabel: "Registered government saving separated from equity volatility",
        risks: [{ kind: "liquidity", detail: "Early redemption limits can make a savings bond unsuitable for immediate needs." }],
        lesson: ["Portfolio roles", "What job should a savings bond perform?", "Fund a dated, non-immediate goal", "Replace all emergency cash", "A conservative security remains useful only when its liquidity fits the obligation."],
        sources: [savingsTimeline, retiredBonds],
        confidence: "high"
      })
    ]
  },
  {
    id: "internet-equities-and-position-sizing",
    window: windows[43],
    opportunities: [
      createOpportunity({
        id: "amazon-post-ipo-sizing",
        destination: "NASDAQ public market, May 1997-1999",
        title: "Buy Amazon only after its public offering, and keep it small",
        evidence: "Amazon's SEC-filed 1997 prospectus describes its young online-book business and public offering, while a later SEC speech identifies its May 1997 IPO and the exceptional survivor outcome.",
        availability: "Shares require post-offering public trading, a lawful broker, settled cash, and the ability to tolerate a complete loss; the $18 offer price is not guaranteed to every buyer.",
        earlier: "research the filed business risks, preserve capital, and defer purchase until the shares are public and a broker confirms an executable quote.",
        inference: "take only a small cash-funded position after public trading begins and hold it inside a diversified portfolio rather than treating hindsight as certainty.",
        category: "asset",
        capitalTier: "working",
        access: ["A regulated broker, settled cash, the public prospectus, actual market liquidity, and a loss limit."],
        exitSignal: "Trim if the position overwhelms the portfolio or public disclosures undermine the business thesis; never borrow to wait for a remembered outcome.",
        payoffLabel: "Exposure to an exceptional documented survivor with failure risk acknowledged",
        risks: [{ kind: "liquidity", detail: "A young Internet retailer could fail, dilute holders, or lose most of its market value." }],
        lesson: ["Survivorship bias", "What does Amazon's later success conceal?", "Many contemporaneous Internet firms failed", "Every Internet IPO was destined to win", "A future winner is visible only after the failed cohort disappears from memory."],
        sources: [
          source("Enhancing the Demand for IPOs", "U.S. Securities and Exchange Commission", "https://www.sec.gov/newsroom/speeches-statements/fleming-enhancing-demand-ipos-050917", "The SEC identifies Amazon's July 1994 founding, July 1995 sales start, May 1997 prospectus, and exceptional later outcome.", "history"),
          source("Amazon.com prospectus", "U.S. Securities and Exchange Commission", "https://www.sec.gov/Archives/edgar/data/1018724/0000891020-97-000868.txt", "The filed prospectus documents the offering, $18 public price, business model, losses, competition, and investor risks.", "price")
        ],
        confidence: "high"
      }),
      createOpportunity({
        id: "internet-bubble-position-cap",
        destination: "Regulated U.S. securities market, 1995-1999",
        title: "Cap the Internet theme before it becomes the portfolio",
        evidence: "SEC records from the period warned that online stock promotion could amplify confusing noise and false pre-IPO claims as Internet investing expanded.",
        availability: "Any purchase requires a registered intermediary, public disclosure, settled cash, and a security actually listed or lawfully offered.",
        earlier: "research filings and fees, keep a broad core, and defer theme purchases until public access and position limits are documented.",
        inference: "limit Internet companies to a small diversified sleeve and reject promotions that rely on future listing promises or private tips.",
        category: "asset",
        capitalTier: "working",
        access: ["A regulated broker, filed disclosures, verified listing status, settled cash, and a written theme cap."],
        exitSignal: "Rebalance when the theme exceeds its cap or public disclosures fail the thesis; do not spread rumors to create an exit.",
        payoffLabel: "Participation in Internet growth without portfolio-wide survival dependence",
        risks: [{ kind: "legal", detail: "False pre-IPO promotions and market hype can expose the buyer to fraud and illiquid securities." }],
        lesson: ["Theme risk", "How should a new technology theme enter a portfolio?", "As a capped, disclosed allocation", "Through any exciting pre-IPO claim", "A real technology shift does not validate every company or promotion attached to it."],
        sources: [
          source("Rethinking Information About Issuers in the Age of the Internet", "U.S. Securities and Exchange Commission", "https://www.sec.gov/news/speech/speecharchive/1999/spch258.htm", "The SEC described online investing's access benefits and warned that bulletin boards and other channels could fraudulently hype stocks.", "history"),
          diversification
        ],
        ethicsNote: "Use filed public information only; reject false promotions, private tips, and any attempt to manufacture demand."
      })
    ]
  }
];
