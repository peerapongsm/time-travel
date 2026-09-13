import type { Briefing, Source } from "../domain";
import { createOpportunity } from "./modern";
import { windows } from "./windows";

const source = (title: string, publisher: string, url: string, claim: string, kind: Source["kind"]): Source => ({
  title,
  publisher,
  url,
  claim,
  kind
});

const diversification = source(
  "Beginners' Guide to Asset Allocation, Diversification, and Rebalancing",
  "U.S. Securities and Exchange Commission",
  "https://www.sec.gov/about/reports-publications/investorpubsassetallocationhtm",
  "The SEC explains diversification, liquidity matching, investing over time, and rebalancing while warning that diversification cannot eliminate loss.",
  "mechanism"
);

const cycles = source(
  "US Business Cycle Expansions and Contractions",
  "National Bureau of Economic Research",
  "https://www.nber.org/research/data/us-business-cycle-expansions-and-contractions",
  "The NBER chronology dates the March-November 2001, December 2007-June 2009, and February-April 2020 contractions and explains that turning points are determined retrospectively.",
  "history"
);

const spHistory = source(
  "S&P 500 Through History",
  "S&P Dow Jones Indices",
  "https://www.spglobal.com/spdji/en/documents/campaigns/sp-500-through-history-202301.pdf",
  "S&P publishes a dated long-run index history through 2022 and warns that pre-launch back-tests differ from live results.",
  "price"
);

const treasuryTimeline = source(
  "Timeline of U.S. Savings Bonds",
  "U.S. TreasuryDirect",
  "https://www.treasurydirect.gov/research-center/history-of-savings-bond/timeline/",
  "Treasury records the 1998 introduction of Series I savings bonds and later changes in retail purchase channels and holding periods.",
  "history"
);

const iBondTerms = source(
  "I bonds",
  "U.S. TreasuryDirect",
  "https://www.treasurydirect.gov/savings-bonds/i-bonds/",
  "Treasury explains that I-bond rates combine fixed and inflation-linked components, change every six months, and carry purchase and redemption rules.",
  "mechanism"
);

const treasuryArchives = source(
  "Daily Treasury Rate Archives",
  "U.S. Department of the Treasury",
  "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rate-archives",
  "Treasury publishes official historical bill and yield-curve datasets for 2002 onward and identifies how the quoted rates are constructed.",
  "history"
);

const fedOperations = source(
  "Open Market Operations",
  "Board of Governors of the Federal Reserve System",
  "https://www.federalreserve.gov/monetarypolicy/openmarket.htm",
  "The Federal Reserve lists dated target-range changes from 2003 through 2025, including tightening, easing, and near-zero-rate periods.",
  "history"
);

const greatRecession = source(
  "The Great Recession",
  "Federal Reserve History",
  "https://www.federalreservehistory.org/essays/great-recession-of-200709",
  "Federal Reserve History dates the recession to December 2007-June 2009 and documents severe declines in output, employment, housing, and the S&P 500.",
  "history"
);

const cryptoRisk = source(
  "Customer Advisory: Understand the Risks of Virtual Currency Trading",
  "U.S. Commodity Futures Trading Commission",
  "https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/understand_risks_of_virtual_currency.html",
  "The CFTC describes cash-market purchase into a personal wallet and warns about volatility, weak platform safeguards, hacking, fraud, and lack of guaranteed recourse.",
  "mechanism"
);

const goldPrice = source(
  "Gold Fixing Price 10:30 A.M. (London time) in London Bullion Market",
  "Federal Reserve Bank of St. Louis",
  "https://fred.stlouisfed.org/series/GOLDAMGBD228NLBM",
  "The FRED series publishes dated London morning gold-price observations from the underlying bullion-market source.",
  "price"
);

export const recent: Briefing[] = [
  {
    id: "dotcom-unwind-and-inflation-linked-saving",
    window: windows[44],
    opportunities: [
      createOpportunity({
        id: "dotcom-deleveraging",
        destination: "Regulated U.S. securities market, 2000-2001",
        title: "Remove leverage as the dot-com story breaks",
        evidence: "Contemporary SEC material identifies the 2000 dot-com peak and warned investors about false Internet and pre-IPO promotions; the NBER dates a recession from March through November 2001.",
        availability: "A defensive sale requires lawful custody, a regulated broker, an actual bid, and settlement before a position becomes illiquid.",
        earlier: "keep the portfolio diversified and unleveraged, research filings, and defer any thematic purchase that depends only on resale to another buyer.",
        inference: "trim Internet-company concentration and eliminate margin exposure without shorting, spreading rumors, or waiting for an exact chart peak.",
        category: "asset",
        capitalTier: "substantial",
        access: ["Lawful ownership, a regulated broker, current public filings, market liquidity, and a place for settled proceeds."],
        exitSignal: "Exit or reduce when promotion replaces disclosed operating evidence or the theme exceeds its written allocation.",
        payoffLabel: "Capital preserved from an overconcentrated, leveraged unwind",
        risks: [{ kind: "liquidity", detail: "Prices can gap down and buyers can disappear before an order settles." }],
        lesson: ["Deleveraging", "What can hindsight safely improve before a bubble unwinds?", "Remove borrowing and cap the theme", "Short everything at maximum leverage", "The robust lesson is to remove forced-sale risk, not to manufacture or perfectly time a collapse."],
        sources: [
          source("Presentation for the SEC Government-Business Forum", "U.S. Securities and Exchange Commission", "https://www.sec.gov/info/smallbus/2009gbforum/second-market-presentation.pdf", "The SEC-hosted chronology labels 2000 as the dot-com peak and 2001 as the following market transition.", "history"),
          spHistory
        ],
        confidence: "high",
        ethicsNote: "This is an exit and risk-control lesson; it excludes short selling, rumors, manipulation, and private tips."
      }),
      createOpportunity({
        id: "series-i-inflation-link",
        destination: "Authorized U.S. Series I savings-bond channel, 2000-2001",
        title: "Use the inflation link only for money that can wait",
        evidence: "Series I savings bonds had been introduced in 1998 and combined a fixed component with a semiannual inflation component.",
        availability: "Purchase requires an authorized channel, eligibility, current issue terms, registration, and funds not needed before the minimum holding period.",
        earlier: "research the current composite-rate formula, keep emergency cash liquid, and defer purchase until registration and redemption rules fit the goal.",
        inference: "buy a modest amount for a dated savings need and retain the issue record instead of treating a changing composite rate as permanently fixed.",
        category: "security",
        capitalTier: "pocket",
        access: ["Eligibility, an authorized purchase channel, lawful funds, registration records, and separate emergency liquidity."],
        exitSignal: "Redeem only when permitted and when the planned need outweighs the remaining inflation protection and any penalty.",
        payoffLabel: "Inflation-linked saving under changing six-month terms",
        risks: [{ kind: "liquidity", detail: "The minimum holding period and early-redemption penalty can conflict with an urgent cash need." }],
        lesson: ["Variable rates", "Does an I bond lock one composite rate for life?", "No; the inflation component resets", "Yes; the purchase-day rate never changes", "The fixed component persists, but the inflation-linked component changes on a published schedule."],
        sources: [treasuryTimeline, iBondTerms],
        confidence: "high"
      })
    ]
  },
  {
    id: "post-crash-selection-and-gold",
    window: windows[45],
    opportunities: [
      createOpportunity({
        id: "amazon-post-crash-sizing",
        destination: "NASDAQ public market, 2002-2003",
        title: "Require solvency evidence before buying a fallen survivor",
        evidence: "Amazon's filed 2003 annual report shows 2002 and 2003 operating results, cash, debt, and continuing business risks after the Internet-sector unwind.",
        availability: "Shares require a lawful broker, settled cash, a current market seller, and review of disclosures actually public on the trade date.",
        earlier: "research the latest filings, preserve diversification, and defer purchase until liquidity and solvency can be evaluated from public records.",
        inference: "take only a small cash-funded position after checking cash, obligations, dilution, and execution rather than buying solely because the price fell.",
        category: "asset",
        capitalTier: "working",
        access: ["A regulated broker, public SEC filings, an executable quote, settled cash, and capacity for total loss."],
        exitSignal: "Sell if public liquidity or operating evidence breaks the thesis, or trim if the position grows beyond its cap.",
        payoffLabel: "Selective exposure to a documented survivor after a sector collapse",
        risks: [{ kind: "liquidity", detail: "A fallen company can continue falling, dilute owners, or fail despite a famous future." }],
        lesson: ["Fallen-price fallacy", "What makes a post-crash share investable?", "Public evidence of survival capacity", "A lower price by itself", "Price decline creates no margin of safety unless the business and balance sheet can endure."],
        sources: [
          source("Amazon.com 2003 Form 10-K", "U.S. Securities and Exchange Commission", "https://www.sec.gov/Archives/edgar/data/1018724/000119312504029488/d10k.htm", "Amazon's filing reports 2002-03 operations, cash, marketable securities, obligations, and material business risks.", "history"),
          source("AMZN Historical", "Nasdaq", "https://www.nasdaq.com/market-activity/stocks/amzn/historical", "Nasdaq publishes dated historical market prices for Amazon common stock.", "price")
        ],
        confidence: "high"
      }),
      createOpportunity({
        id: "early-2000s-gold-allocation",
        destination: "Lawful bullion market, 2002-2003",
        title: "Add gold only as a bounded diversifier",
        evidence: "Official London fixing data record the gold market's dated prices through the post-dot-com period.",
        availability: "A purchase requires a lawful dealer or disclosed regulated vehicle, authentic ownership, custody, and a viable resale route.",
        earlier: "research spreads and storage, keep cash for obligations, and defer purchase until the instrument and custody can be verified.",
        inference: "add only a capped unleveraged allocation and rebalance instead of converting a recent equity loss into an all-gold bet.",
        category: "asset",
        capitalTier: "working",
        access: ["A lawful dealer or regulated vehicle, verified ownership, custody, fees, and eventual sale access."],
        exitSignal: "Trim when gold exceeds its target weight or custody and spreads defeat the diversification role.",
        payoffLabel: "A limited diversifier whose return remains uncertain",
        risks: [{ kind: "custody", detail: "Bullion or account claims can be stolen, substituted, frozen, or expensive to sell." }],
        lesson: ["Recency bias", "Should a recent equity crash make gold the entire portfolio?", "No; use a capped allocation", "Yes; the last loser can never recover", "Changing the object of an all-in bet does not create diversification."],
        sources: [cycles, goldPrice]
      })
    ]
  },
  {
    id: "public-auction-and-short-reserves",
    window: windows[46],
    opportunities: [
      createOpportunity({
        id: "google-ipo-public-auction",
        destination: "Google IPO auction, August 2004",
        title: "Follow the public auction rules, then cap the position",
        evidence: "Google's SEC filings describe a five-stage auction, required bidder ID and participating brokerage account, and an effective offering that sold public shares at $85.",
        availability: "IPO bidding exists only during the announced qualification and auction windows; a bidder ID and eligible brokerage account still do not guarantee allocation.",
        earlier: "read the prospectus, prepare settled cash, and defer bidding until qualification opens and the broker confirms eligibility.",
        inference: "submit only a price-limited bid affordable inside a diversified portfolio, or buy later in public trading rather than bypassing the auction.",
        category: "asset",
        capitalTier: "working",
        access: ["A participating brokerage account, bidder ID before the deadline, electronic prospectus delivery, settled cash, and suitability approval."],
        exitSignal: "Trim when the position exceeds its cap or disclosures break the thesis; do not depend on receiving the $85 offer price.",
        payoffLabel: "Lawful access to a disclosed technology IPO with allocation risk explicit",
        risks: [{ kind: "execution", detail: "Qualification, bidding, and price acceptance do not guarantee an allocation or first-day execution." }],
        lesson: ["Auction access", "What did a retail bidder need before placing a Google IPO bid?", "A bidder ID and participating brokerage account", "Future knowledge alone", "The prospectus made procedural access explicit and warned that an allocation was not assured."],
        sources: [
          source("Google IPO auction prospectus amendment", "U.S. Securities and Exchange Commission", "https://www.sec.gov/Archives/edgar/data/1288776/000119312504139655/ds1a.htm", "The filing documents qualification, bidder IDs, participating brokers, staged bidding, allocation risk, and the unusual auction design.", "history"),
          source("Google rescission offer filing", "U.S. Securities and Exchange Commission", "https://www.sec.gov/Archives/edgar/data/1288776/000119312504202434/ds1a.htm", "The later filing confirms effectiveness on August 18, 2004 and 19,605,052 Class A shares sold to the public at $85 each.", "price")
        ],
        confidence: "high"
      }),
      createOpportunity({
        id: "short-treasury-reserve-2005",
        destination: "U.S. Treasury securities market, 2004-2005",
        title: "Keep the next obligation in short maturities",
        evidence: "Treasury's official archive publishes daily bill and yield-curve records for this window as interest-rate conditions changed.",
        availability: "A bill purchase requires a lawful auction or broker channel, current terms, settled cash, and a maturity no later than the planned expense.",
        earlier: "prepare a cash-flow calendar, preserve near-term liquidity, and defer each purchase until the auction and settlement dates are confirmed.",
        inference: "ladder short maturities around known expenses rather than chase a single long-duration rate forecast.",
        category: "security",
        capitalTier: "working",
        access: ["A lawful Treasury purchase channel, current auction terms, settled funds, custody, and a dated cash need."],
        exitSignal: "Use proceeds at maturity or roll only after checking the next obligation and current rate.",
        payoffLabel: "Maturity-matched liquidity under documented Treasury terms",
        risks: [{ kind: "liquidity", detail: "Selling before maturity can lose value, while repeated short maturities create reinvestment risk." }],
        lesson: ["Maturity matching", "Where should next year's required cash sit?", "In instruments maturing before it is due", "In the longest bond available", "Duration should follow the liability, not a confident rate story."],
        sources: [treasuryArchives],
        confidence: "high"
      })
    ]
  },
  {
    id: "credit-boom-and-liquidity-buffer",
    window: windows[47],
    opportunities: [
      createOpportunity({
        id: "pre-crisis-deleveraging",
        destination: "U.S. household and securities markets, 2006-2007",
        title: "Reduce debt before asset prices must carry it",
        evidence: "Federal Reserve History records that housing prices and credit expanded before residential construction peaked in 2006 and mortgage-related strains emerged in 2007.",
        availability: "Deleveraging requires lawful control of the debt or asset, current payoff terms, liquid funds, and an ordinary sale or repayment channel.",
        earlier: "prepare a debt schedule, preserve cash, and defer any new leveraged purchase that depends on continually rising collateral.",
        inference: "repay variable or fragile borrowing and reduce concentrated property or equity exposure without shorting, manipulating, or waiting for a crisis headline.",
        category: "asset",
        capitalTier: "substantial",
        access: ["Loan statements, lawful asset ownership, payoff figures, a settlement agent, and a separate liquidity reserve."],
        exitSignal: "Stop after obligations and exposure fit cash flow without relying on refinancing or rising prices.",
        payoffLabel: "Forced-sale risk reduced before the credit contraction",
        risks: [{ kind: "liquidity", detail: "Assets can become hard to sell before debt payments stop." }],
        lesson: ["Refinancing risk", "What makes a rising asset price fragile?", "Debt that must be renewed or repaid", "Cash ownership with no deadline", "Leverage makes continued market access part of the investment thesis."],
        sources: [greatRecession, diversification],
        confidence: "high",
        ethicsNote: "This is conservative repayment and rebalancing, not a short, foreclosure strategy, or trade on private lending data."
      }),
      createOpportunity({
        id: "pre-crisis-treasury-buffer",
        destination: "U.S. Treasury bill market, 2006-2007",
        title: "Place near-term obligations in dated government bills",
        evidence: "Treasury's archive supplies official bill quotations for the years immediately before the financial crisis.",
        availability: "Bills require a lawful purchase channel, current auction or market access, custody, and maturities aligned with the obligation.",
        earlier: "prepare an expense calendar, keep transaction cash available, and defer each purchase until settlement and maturity are verified.",
        inference: "hold a ladder of short bills for known expenses instead of funding every obligation from volatile or leveraged assets.",
        category: "security",
        capitalTier: "working",
        access: ["A lawful Treasury channel, settled funds, auction terms, custody, and a dated expense schedule."],
        exitSignal: "Use each maturity for its matched expense; roll only surplus cash under current terms.",
        payoffLabel: "A liquidity buffer separated from credit-market risk",
        risks: [{ kind: "liquidity", detail: "A mismatched maturity or early sale can still leave a cash shortfall." }],
        lesson: ["Liquidity buckets", "Which assets should fund a near-term bill?", "Cash and short instruments matched to the date", "A leveraged property sale", "Separating near-term needs reduces the chance that market stress forces a bad sale."],
        sources: [treasuryArchives, fedOperations],
        confidence: "high"
      })
    ]
  },
  {
    id: "financial-crisis-and-rebalancing",
    window: windows[48],
    opportunities: [
      createOpportunity({
        id: "crisis-index-rebalance",
        destination: "Regulated U.S. securities market, 2008-2009",
        title: "Rebalance in steps after the crisis reprices risk",
        evidence: "Federal Reserve History records a 57% S&P 500 decline from the October 2007 peak to the March 2009 trough and dates the recession through June 2009.",
        availability: "A purchase requires a functioning regulated broker, settled cash, an available diversified fund or basket, and money not needed during the recession.",
        earlier: "prepare target weights and liquidity before the fall, then defer each rebalance step until settlement and the emergency reserve are secure.",
        inference: "restore a diversified allocation gradually with cash rather than borrow or assume that the later official trough was knowable on the day.",
        category: "asset",
        capitalTier: "substantial",
        access: ["A regulated broker, settled cash, available broad holdings, custody, and a multi-year horizon."],
        exitSignal: "Stop buying when target weights are restored; later sell only for rebalancing, needs, or a broken disclosed thesis.",
        payoffLabel: "Disciplined broad-market exposure after a documented severe drawdown",
        risks: [{ kind: "execution", detail: "Markets and intermediaries were stressed, and any entry could fall further before recovery." }],
        lesson: ["Trough uncertainty", "How should a traveler act when the later trough was not yet official?", "Rebalance in measured steps", "Borrow for one all-in order", "A process tied to allocation is usable even when the exact low cannot be known or executed."],
        sources: [greatRecession, spHistory],
        confidence: "high"
      }),
      createOpportunity({
        id: "crisis-treasury-liquidity",
        destination: "U.S. Treasury bill market, 2008-2009",
        title: "Protect the spending runway while markets are impaired",
        evidence: "The Federal Reserve documents severe 2008-09 financial stress and near-zero policy rates, while Treasury archives preserve bill quotations and maturities.",
        availability: "A bill ladder requires a functioning lawful channel, accepted auction or secondary-market access, and custody that can return funds on schedule.",
        earlier: "prepare the spending calendar, preserve settlement cash, and defer new risk assets until the runway is funded.",
        inference: "match short government maturities to essential expenses so equity holdings are not sold solely to meet immediate bills.",
        category: "security",
        capitalTier: "working",
        access: ["A lawful purchase channel, settled funds, current terms, reliable custody, and a dated spending plan."],
        exitSignal: "Spend maturities as planned or roll only funds beyond the protected runway.",
        payoffLabel: "Essential liquidity separated from distressed risk assets",
        risks: [{ kind: "custody", detail: "Operational failures or a maturity mismatch can still interrupt access to cash." }],
        lesson: ["Spending runway", "Why hold short government maturities during a crash?", "Avoid forced sales for near-term expenses", "Guarantee a high return", "The role is reliable timing, not a promised windfall."],
        sources: [greatRecession, treasuryArchives],
        confidence: "high"
      })
    ]
  },
  {
    id: "bitcoin-access-and-custody",
    window: windows[49],
    opportunities: [
      createOpportunity({
        id: "bitcoin-acquisition-custody",
        destination: "Public Bitcoin network, 2010-2011",
        title: "Acquire a tiny Bitcoin position only with recoverable custody",
        evidence: "Bitcoin Core's dated archive shows public software releases throughout 2011, while later regulator guidance documents cash-market acquisition into a personal wallet and the risk of hacking, fraud, platform failure, and lost access.",
        availability: "Act only after obtaining authentic public software or a functioning lawful cash market, verifying local law, and testing a wallet backup; future memory does not create a safe exchange.",
        earlier: "research signatures and wallet recovery, keep ordinary money separate, and defer acquisition until a tiny test transaction can be independently verified.",
        inference: "use only disposable capital, avoid leverage, complete a small lawful purchase or mined receipt for your own account, verify withdrawal, and keep redundant private backups offline.",
        category: "asset",
        capitalTier: "pocket",
        access: ["Authentic dated client software or a willing lawful seller, network access, a tested personal wallet, secure backups, and local legal compliance."],
        exitSignal: "Sell only through a lawful functioning venue after a small test withdrawal; abandon the plan if custody or source authenticity cannot be verified.",
        payoffLabel: "Highly speculative early network exposure with no promised recovery or exit",
        risks: [{ kind: "custody", detail: "Lost keys, malware, exchange failure, or a bad backup can make the entire position irrecoverable." }, { kind: "liquidity", detail: "Early markets were thin and volatile, so a quoted price did not guarantee a realizable exit." }],
        lesson: ["Bearer-asset custody", "What comes before position size in early Bitcoin?", "A tested withdrawal and recoverable wallet backup", "A large exchange balance with no backup", "Survivorship of the network does not rescue lost keys or failed counterparties."],
        sources: [
          source("Bitcoin Core version 0.3.21 released", "Bitcoin.org", "https://bitcoin.org/en/release/v0.3.21", "The dated April 27, 2011 release demonstrates public client availability within the window.", "history"),
          cryptoRisk,
          source("Exhibit 3: Bitcoin price history", "U.S. Securities and Exchange Commission", "https://www.sec.gov/file/exhibit-3-154", "The SEC-hosted exhibit identifies Mt. Gox historical trading data for July 2010 through August 2011 and shows the thin market's large price changes.", "price")
        ],
        confidence: "contextual",
        ethicsNote: "Use only lawful acquisition for your own account; do not run an unlicensed exchange, evade controls, hack wallets, or manipulate a thin market."
      })
    ]
  },
  {
    id: "recovery-and-survivorship",
    window: windows[50],
    opportunities: [
      createOpportunity({
        id: "diversified-equity-recovery",
        destination: "Regulated U.S. securities market, 2012-2013",
        title: "Own the recovery broadly instead of naming one winner",
        evidence: "The NBER chronology places the last recession trough in June 2009, while S&P's dated history records the subsequent broad-market recovery through 2012-13.",
        availability: "A purchase requires a regulated broker, settled cash, an actually offered diversified vehicle, and a horizon long enough for another decline.",
        earlier: "prepare target weights and fees, keep emergency liquidity, and defer purchase until holdings and settlement are verified.",
        inference: "add to a broad low-cost available basket over time and rebalance rather than select technology survivors from a later ranking.",
        category: "asset",
        capitalTier: "substantial",
        access: ["A regulated broker, disclosed diversified holdings, settled cash, low verified costs, and a multi-year horizon."],
        exitSignal: "Rebalance on schedule or sell for a planned need; do not chase a precise future index level.",
        payoffLabel: "Broad participation in a documented recovery with future downturns still possible",
        risks: [{ kind: "liquidity", detail: "Recovery history does not prevent a new drawdown after purchase." }],
        lesson: ["Survivor-free exposure", "How can a traveler participate without naming the next winner?", "Use a broad disclosed basket", "Buy only the later largest company", "Broad ownership reduces reliance on a hindsight-selected survivor."],
        sources: [cycles, spHistory],
        confidence: "high"
      })
    ]
  },
  {
    id: "ethereum-sale-and-custody",
    window: windows[51],
    opportunities: [
      createOpportunity({
        id: "ethereum-crowdsale-custody",
        destination: "Official Ethereum genesis sale, July-September 2014",
        title: "Use the official sale application and preserve the wallet file",
        evidence: "The Ethereum Foundation announced the sale on July 22, 2014, with an initial 2,000 ETH per BTC rate, a 42-day schedule, no guarantee of future value, and explicit warnings that a lost wallet file or password meant lost access.",
        availability: "Purchase exists only during the official sale, requires Bitcoin, the official application or published tool, legal eligibility, and a successfully downloaded encrypted wallet; ether was unusable until genesis.",
        earlier: "research the published mechanics, secure a tiny lawful Bitcoin amount and offline backups, but defer purchase until the official sale opens and its authenticity is verified.",
        inference: "if legally eligible, risk only disposable capital, use the official sale flow, verify the wallet file and password backups, and treat the token as an experimental network input rather than guaranteed wealth.",
        category: "asset",
        capitalTier: "pocket",
        access: ["Lawfully acquired Bitcoin, the verified official sale application, legal eligibility, an encrypted wallet download, password backups, and patience until genesis."],
        exitSignal: "After network launch, test access and any lawful venue with a tiny transfer before considering a sale; abandon the position if keys cannot be verified.",
        payoffLabel: "Experimental token access with launch, custody, legal, and survivorship risk",
        risks: [{ kind: "custody", detail: "Loss of the wallet file or password could permanently destroy access before the network launched." }, { kind: "legal", detail: "Token-sale eligibility and later exchange rules varied by jurisdiction and could change." }],
        lesson: ["Pre-launch custody", "What was the indispensable output of the 2014 sale flow?", "A securely backed-up wallet file and password", "A promise of future value", "The Foundation explicitly denied a value guarantee and warned that missing wallet credentials meant no access."],
        sources: [
          source("Mihai's Ethereum Project Update: The First Year", "Ethereum Foundation", "https://blog.ethereum.org/2015/03/14/ethereum-the-first-year", "The Foundation's retrospective dates the official Genesis Sale to July 2014 and reports its funding and development context.", "history"),
          source("Launching the Ether Sale", "Ethereum Foundation", "https://blog.ethereum.org/2014/07/22/launching-the-ether-sale", "The dated announcement supplies the sale rate, 42-day window, access method, lack of value guarantee, and wallet-loss warning.", "price")
        ],
        confidence: "high",
        ethicsNote: "Use only the official public process and lawful funds; never impersonate the Foundation, exploit wallets, evade law, or promote a guaranteed return."
      })
    ]
  },
  {
    id: "diversified-index-2016-briefing",
    window: windows[52],
    opportunities: [
      createOpportunity({
        id: "diversified-index-2016",
        destination: "Regulated U.S. securities market, 2016",
        title: "Prefer the broad basket to the best manager in hindsight",
        evidence: "S&P's year-end 2016 scorecard documents a strong finish for broad U.S. equity benchmarks and compares active funds with their stated indices.",
        availability: "Use only a diversified fund actually offered through a regulated broker with disclosed holdings, benchmark, fees, and settlement.",
        earlier: "prepare target weights and liquidity before 2016, then wait for verified fund access instead of assuming a later product or return.",
        inference: "choose a low-cost broad vehicle that fits the allocation and rebalance, without treating the documented 2016 result as a promise for the next year.",
        category: "asset",
        capitalTier: "substantial",
        access: ["A regulated broker, an available disclosed broad fund, settled cash, verified fees, and a long horizon."],
        exitSignal: "Rebalance on schedule or sell for a planned need, not because a single manager or sector temporarily leads.",
        payoffLabel: "Broad market participation with manager-selection risk reduced",
        risks: [{ kind: "liquidity", detail: "A broad index can still fall and a fund can track it imperfectly after fees." }],
        lesson: ["Benchmark discipline", "What does a strong index year prove about next year?", "Nothing guaranteed; keep the allocation process", "The same return must repeat", "A dated result is evidence about the past, not a forecast contract."],
        sources: [
          source("SPIVA U.S. Year-End 2016 Scorecard", "S&P Dow Jones Indices", "https://www.spglobal.com/spdji/en/documents/spiva/spiva-us-year-end-2016.pdf", "The scorecard documents 2016 broad-index performance and compares active funds against their assigned benchmarks.", "history"),
          diversification
        ]
      })
    ]
  },
  {
    id: "crypto-risk-2017-briefing",
    window: windows[53],
    opportunities: [
      createOpportunity({
        id: "rebalance-crypto-2017",
        destination: "Lawful virtual-currency cash markets, December 2017",
        title: "Rebalance the crypto position before volatility becomes the plan",
        evidence: "The CFTC's 2017 advisory described Bitcoin cash-market and newly launched derivatives risks, including volatility, leverage, hacking, weak safeguards, and fraud.",
        availability: "A sale or transfer requires lawful venue access, verified ownership, wallet control, and a tested withdrawal; derivatives require separate regulated eligibility.",
        earlier: "prepare wallet backups and a portfolio cap, then defer any transaction until legal venue and withdrawal access are verified.",
        inference: "trim a crypto holding that exceeds its written cap, withdraw remaining assets to understood custody, and avoid leverage or a guaranteed-return claim.",
        category: "asset",
        capitalTier: "pocket",
        access: ["Lawful ownership, a functioning compliant venue, tested wallet control, verified fees, and tax records."],
        exitSignal: "Stop after restoring the cap and verifying custody; do not chase the exact daily top or promote a thin market.",
        payoffLabel: "Speculative exposure reduced to a survivable size",
        risks: [{ kind: "custody", detail: "A platform or wallet failure can destroy access even when the market price later recovers." }],
        lesson: ["Risk caps", "What should a rapid gain trigger?", "A check against the written allocation", "More leverage because the trend is strong", "Rebalancing converts an accidental concentration back into a deliberate risk level."],
        sources: [
          source("Customer Advisory: Understand the Risks of Virtual Currency Trading", "U.S. Commodity Futures Trading Commission", "https://www.cftc.gov/sites/default/files/2019-12/customeradvisory_urvct121517.pdf", "The December 2017 advisory documents the launch context and material cash-market, custody, fraud, volatility, and leverage risks.", "history"),
          diversification
        ],
        confidence: "high",
        ethicsNote: "This is a reduction and custody lesson, not a current gambling recommendation or invitation to manipulate a token market."
      })
    ]
  },
  {
    id: "treasury-liquidity-2018-briefing",
    window: windows[54],
    opportunities: [
      createOpportunity({
        id: "treasury-bill-liquidity-2018",
        destination: "U.S. Treasury bill market, 2018",
        title: "Shorten the cash bucket as policy rates rise",
        evidence: "Federal Reserve records show four target-range increases in 2018, ending the year at a higher range than it began.",
        availability: "Bills require a lawful auction or broker channel, current terms, settled funds, and maturities aligned to the cash need.",
        earlier: "prepare a liability calendar and keep transaction cash liquid, then wait for each auction rather than assume its yield.",
        inference: "ladder short bills for near-term needs so new maturities can be assessed as rates change, without selling long assets at a forced time.",
        category: "security",
        capitalTier: "working",
        access: ["A lawful Treasury channel, current auction terms, settled cash, custody, and a dated expense plan."],
        exitSignal: "Use maturity proceeds for the matched need or roll only after reviewing the next date and current rate.",
        payoffLabel: "Near-term liquidity with reinvestment flexibility",
        risks: [{ kind: "liquidity", detail: "A mismatched maturity or early sale can still create a shortfall." }],
        lesson: ["Reinvestment flexibility", "Why use short rungs during a rising-rate year?", "Reassess terms as each rung matures", "Lock every cash need into one long bond", "Short maturities trade some rate certainty for access and reinvestment flexibility."],
        sources: [fedOperations, treasuryArchives],
        confidence: "high"
      })
    ]
  },
  {
    id: "allocation-2019-briefing",
    window: windows[55],
    opportunities: [
      createOpportunity({
        id: "diversified-plan-2019",
        destination: "Regulated U.S. markets, 2019",
        title: "Keep allocation rules through a policy reversal",
        evidence: "Federal Reserve records show three target-range reductions in 2019 after the increases of 2018.",
        availability: "Any rebalance requires lawful holdings, current public prices, a regulated broker, and instruments actually available in the account.",
        earlier: "prepare target weights and a cash reserve, then defer trades until fees, settlement, and fund holdings are verified.",
        inference: "restore the planned stock-bond-cash mix rather than turn the policy reversal into an all-in forecast.",
        category: "asset",
        capitalTier: "substantial",
        access: ["Lawful custody, a regulated broker, disclosed holdings, settled cash, and a written allocation."],
        exitSignal: "Stop after restoring target weights; change the plan only when goals, horizon, or capacity for loss changes.",
        payoffLabel: "Portfolio risk kept consistent as rates change",
        risks: [{ kind: "execution", detail: "Frequent reactions to policy news can create costs without improving the long-term allocation." }],
        lesson: ["Policy and portfolios", "What should a rate reversal automatically trigger?", "A review against the written plan", "A complete portfolio reversal", "Policy changes matter, but they do not replace goals, diversification, or a risk budget."],
        sources: [fedOperations, diversification],
        confidence: "high"
      })
    ]
  },
  {
    id: "pandemic-rebalance-2020-briefing",
    window: windows[56],
    opportunities: [
      createOpportunity({
        id: "pandemic-rebalance-2020",
        destination: "Regulated U.S. markets, 2020",
        title: "Fund the emergency runway before rebalancing risk",
        evidence: "The NBER dates an unusually sharp contraction from February to April 2020, and Federal Reserve records show emergency target-rate reductions in March.",
        availability: "A rebalance requires functioning account access, settled cash, diversified vehicles, and emergency funds that are not committed to volatile assets.",
        earlier: "prepare remote account access and a cash runway, but defer buying until essential expenses and custody are secure.",
        inference: "first protect near-term liquidity, then restore a diversified allocation in steps without assuming the shortest recorded recession meant an immediate personal recovery.",
        category: "asset",
        capitalTier: "substantial",
        access: ["Reliable account access, settled cash beyond the emergency reserve, disclosed diversified holdings, and a multi-year horizon."],
        exitSignal: "Stop when the cash runway and target allocation are restored; sell only for needs or later rebalancing.",
        payoffLabel: "Liquidity protected before measured participation in a volatile recovery",
        risks: [{ kind: "liquidity", detail: "Job or income loss can force a sale even if markets later recover." }],
        lesson: ["Household liquidity", "What comes before buying a crash?", "Fund essential expenses", "Invest the emergency reserve", "Market recovery cannot pay a bill if the household cannot wait for it."],
        sources: [cycles, diversification],
        confidence: "high"
      })
    ]
  },
  {
    id: "inflation-linked-saving-2021-briefing",
    window: windows[57],
    opportunities: [
      createOpportunity({
        id: "inflation-linked-savings-2021",
        destination: "TreasuryDirect Series I bond purchase, November-December 2021",
        title: "Use the announced inflation rate without pretending it is permanent",
        evidence: "Treasury's November 2021 rate chart records the new six-month I-bond earning rates, while the program rules explain semiannual resets and redemption limits.",
        availability: "Purchase requires TreasuryDirect or the then-authorized channel, eligibility, annual-limit capacity, registration, and money that can remain locked for the minimum period.",
        earlier: "prepare identity and account access, keep emergency cash outside, and wait for the official rate announcement rather than act on a rumor.",
        inference: "buy only the amount assigned to an inflation-linked savings bucket and record that the composite rate changes after its six-month earning period.",
        category: "security",
        capitalTier: "pocket",
        access: ["Eligibility, verified TreasuryDirect access, lawful funds, purchase-limit capacity, registration, and separate emergency cash."],
        exitSignal: "Redeem only after the minimum period when the planned need justifies any penalty; otherwise reassess each reset.",
        payoffLabel: "Inflation-linked saving for a bounded, illiquid cash bucket",
        risks: [{ kind: "liquidity", detail: "The minimum holding period and early-redemption penalty can make the bond unusable for immediate needs." }],
        lesson: ["Rate resets", "What does the November 2021 announcement guarantee?", "One stated earning period under program rules", "The same rate forever", "An I bond's inflation component resets; the purchase must work after the headline rate changes."],
        sources: [
          source("Series I Savings Bond Earnings Rates Effective November 1, 2021", "U.S. TreasuryDirect", "https://www.treasurydirect.gov/files/research-center/history-of-savings-bond/I-bond-rate-chart.pdf", "Treasury's dated chart records rates effective November 1, 2021 across issue vintages.", "history"),
          iBondTerms
        ],
        confidence: "high"
      })
    ]
  },
  {
    id: "treasury-ladder-2022-briefing",
    window: windows[58],
    opportunities: [
      createOpportunity({
        id: "treasury-bill-ladder-2022",
        destination: "U.S. Treasury market, 2022",
        title: "Ladder safe maturities as rates reset upward",
        evidence: "Federal Reserve records show repeated 2022 target-range increases, and Treasury announced a 9.62% six-month composite rate for I bonds bought from May through October while preserving holding penalties.",
        availability: "Bills and I bonds each require their own lawful channel, current terms, eligibility, limits, and maturity or holding-period fit.",
        earlier: "prepare a liability calendar and account access, preserve emergency cash, and wait for official auction or rate terms.",
        inference: "use short bill maturities for dated expenses and only a bounded I-bond allocation for money that can remain locked; do not chase the headline rate with all cash.",
        category: "security",
        capitalTier: "working",
        access: ["Verified Treasury access, lawful funds, current auction or I-bond terms, purchase-limit capacity, and a dated cash plan."],
        exitSignal: "Use bill maturities for matched needs and reassess I bonds after permitted redemption dates and rate resets.",
        payoffLabel: "Cash segmented by maturity and inflation sensitivity",
        risks: [{ kind: "liquidity", detail: "I-bond lockups and bill reinvestment risk make either instrument unsuitable for the wrong liability." }],
        lesson: ["Instrument fit", "Should the highest published rate receive every cash dollar?", "No; match each instrument to its liquidity job", "Yes; rate alone decides", "Yield matters only after access, limits, penalties, and the obligation date fit."],
        sources: [
          fedOperations,
          source("Fiscal Service Announces New Savings Bonds Rates", "U.S. TreasuryDirect", "https://treasurydirect.gov/news/2022/release-05-02-rates/", "Treasury announced the May-October 2022 I-bond composite rate, its six-month application, compounding, maturity, and early-redemption penalty.", "history")
        ],
        confidence: "high"
      })
    ]
  },
  {
    id: "cash-yield-2023-briefing",
    window: windows[59],
    opportunities: [
      createOpportunity({
        id: "cash-yield-diversification-2023",
        destination: "U.S. Treasury bill market, 2023",
        title: "Let the cash bucket earn without becoming the whole plan",
        evidence: "Treasury's December 2023 table records positive bill quotations across short maturities, while Federal Reserve records show the target range rising through July.",
        availability: "A bill purchase requires a lawful channel, current auction or secondary-market terms, settled cash, and maturity matched to the expense.",
        earlier: "prepare the expense schedule and account access, then wait for an actual auction or executable quote rather than assuming December's rate all year.",
        inference: "ladder short bills for reserves while retaining a diversified long-term allocation instead of moving every asset into the latest high cash yield.",
        category: "security",
        capitalTier: "working",
        access: ["A lawful Treasury channel, current terms, settled funds, custody, and a documented maturity schedule."],
        exitSignal: "Spend or roll each maturity according to the cash plan; reconsider when the yield, horizon, or obligation changes.",
        payoffLabel: "Reserve income with maturity discipline and no future-rate promise",
        risks: [{ kind: "liquidity", detail: "Short bills reduce duration but create reinvestment risk when rates fall." }],
        lesson: ["Cash drag and recency", "What should a higher cash yield change?", "The return on the reserve bucket", "The entire long-term allocation automatically", "A better cash return does not erase long-term goals or guarantee future rates."],
        sources: [
          source("Daily Treasury Bill Rates: December 2023", "U.S. Department of the Treasury", "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202312&type=daily_treasury_bill_rates", "Treasury publishes dated December 2023 bill quotations across the current short maturities.", "history"),
          fedOperations
        ],
        confidence: "high"
      })
    ]
  },
  {
    id: "concentration-2024-briefing",
    window: windows[60],
    opportunities: [
      createOpportunity({
        id: "concentration-rebalance-2024",
        destination: "Regulated U.S. equity markets, 2024",
        title: "Measure hidden concentration inside the broad index",
        evidence: "S&P research dated July 2024 reports unusually high market-cap concentration and a large gap between cap-weighted and equal-weighted average company size.",
        availability: "A rebalance requires lawful holdings, current fund disclosures, a regulated broker, settled alternatives, and awareness that equal weighting creates different turnover and risk.",
        earlier: "prepare a look-through exposure report, preserve liquidity, and defer trades until holdings, fees, taxes, and replacement instruments are verified.",
        inference: "measure overlapping mega-cap exposure across every fund and trim only enough to restore the intended diversification; do not assume equal weight must outperform.",
        category: "asset",
        capitalTier: "substantial",
        access: ["Current fund holdings, lawful custody, a regulated broker, settled alternatives, and a written concentration limit."],
        exitSignal: "Stop when look-through exposure returns to the stated cap; review again at the next scheduled rebalance.",
        payoffLabel: "Single-company and mega-cap dependence reduced without a market forecast",
        risks: [{ kind: "execution", detail: "Alternative weighting can add turnover, fees, taxes, and different sector exposure." }],
        lesson: ["Look-through concentration", "Can several funds still create one large bet?", "Yes, when their largest holdings overlap", "No, fund count alone guarantees diversification", "Diversification depends on underlying exposures, not the number of account lines."],
        sources: [
          source("A Systematic Approach for Identifying Companies with Economic Moats", "S&P Dow Jones Indices", "https://www.spglobal.com/spdji/en/research/article/a-systematic-approach-for-identifying-companies-with-economic-moats/", "The July 2024 S&P research documents extreme concentration measures and compares market-cap and equal-weight characteristics.", "history"),
          diversification
        ],
        confidence: "high"
      })
    ]
  },
  {
    id: "liquidity-2025-briefing",
    window: windows[61],
    opportunities: [
      createOpportunity({
        id: "liquidity-buffer-2025",
        destination: "U.S. Treasury bill market, 2025",
        title: "Keep optionality while policy uncertainty stays visible",
        evidence: "The Federal Reserve's September 2025 statement described elevated outlook uncertainty and a quarter-point target-range reduction, while Treasury published daily bill quotations throughout the year.",
        availability: "A bill ladder requires a lawful channel, current quotes or auction terms, settled cash, custody, and maturities matched to known needs.",
        earlier: "prepare the cash-flow calendar and account access, keep emergency funds available, and wait for executable terms instead of assuming the September decision.",
        inference: "fund a rolling short-maturity buffer and retain diversified long-term holdings rather than make one irreversible forecast from policy news.",
        category: "security",
        capitalTier: "working",
        access: ["A lawful Treasury channel, settled funds, current rates, reliable custody, and a dated liquidity plan."],
        exitSignal: "Use maturities for planned needs or roll only after reviewing current rates and the next obligation.",
        payoffLabel: "Liquidity and decision time preserved under uncertain policy",
        risks: [{ kind: "liquidity", detail: "Rolling bills exposes the saver to lower future reinvestment rates." }],
        lesson: ["Optionality", "What does a short liquidity buffer buy?", "Time to decide without a forced sale", "A guaranteed high future yield", "Liquidity has value because future conditions and personal needs remain uncertain."],
        sources: [
          source("Federal Reserve issues FOMC statement", "Board of Governors of the Federal Reserve System", "https://www.federalreserve.gov/newsevents/pressreleases/monetary20250917a.htm", "The September 17, 2025 statement reports elevated uncertainty and the Committee's quarter-point target-range reduction.", "history"),
          source("Daily Treasury Bill Rates: 2025", "U.S. Department of the Treasury", "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value=2025&type=daily_treasury_bill_rates", "Treasury publishes the dated 2025 short-bill quotation record and describes the quotation method.", "mechanism")
        ],
        confidence: "high"
      })
    ]
  },
  {
    id: "present-boundary-2026-briefing",
    window: windows[62],
    opportunities: [
      createOpportunity({
        id: "hindsight-ends-here",
        destination: "Present-day regulated accounts, evidence through September 12, 2026",
        title: "Hindsight ends here: keep liquidity and diversify",
        evidence: "By the evidence cutoff, the Federal Reserve's July report described elevated uncertainty, Treasury had published bill quotations through September 10, and S&P data showed substantial concentration in the largest index constituents.",
        availability: "Use only lawful instruments available in the traveler's jurisdiction and account today, with current disclosures, verified custody, and money matched to its time horizon.",
        earlier: "preserve a cash buffer, prepare a look-through allocation review, and wait for verified current terms rather than importing any later outcome.",
        inference: "hindsight ends here: diversify across appropriate assets, cap concentrated exposures, hold enough liquidity for near-term needs, and make no guaranteed move or numeric future-payoff claim.",
        category: "security",
        capitalTier: "working",
        access: ["Current legal eligibility, regulated account access, public disclosures, verified fees and custody, and a written horizon for each pool of money."],
        exitSignal: "Rebalance when goals, horizon, liquidity needs, or exposures change; there is no known future date or price to target.",
        payoffLabel: "Resilience and optionality rather than a promised future return",
        risks: [{ kind: "liquidity", detail: "Unexpected needs can force losses if near-term money is placed in volatile or locked assets." }, { kind: "execution", detail: "Diversification reduces some risks but cannot guarantee profit or prevent every decline." }],
        lesson: ["Epistemic boundary", "What remains knowable after September 12, 2026?", "Current terms, exposures, and personal constraints", "A guaranteed winning asset and exit date", "Historical evidence can improve process, but no published source in scope establishes the future."],
        sources: [
          source("Monetary Policy Report - July 2026 summary", "Board of Governors of the Federal Reserve System", "https://www.federalreserve.gov/monetarypolicy/2026-07-mpr-summary.htm", "The July 10, 2026 report describes the current economy and elevated uncertainty without establishing later outcomes.", "history"),
          source("Daily Treasury Bill Rates: September 2026", "U.S. Department of the Treasury", "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202609&type=daily_treasury_bill_rates", "Treasury publishes dated bill quotations through September 10, 2026, within the evidence cutoff.", "mechanism"),
          source("S&P 500", "S&P Dow Jones Indices", "https://www.spglobal.com/spdji/en/indices/equity/sp-500/", "S&P's data as of September 10, 2026 report a broad index with material top-constituent concentration and no assurance of future performance.", "price")
        ],
        confidence: "high",
        ethicsNote: "This is educational process guidance, not a prediction, guarantee, or current gambling recommendation."
      })
    ]
  }
];
