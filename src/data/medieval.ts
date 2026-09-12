import type { Briefing } from "../domain";
import { windows } from "./windows";

export const medieval: Briefing[] = [
  {
    id: "oasis-services",
    window: windows[6],
    opportunities: [
      {
        id: "samarkand-caravan-supplies",
        destination: "Samarkand and the Zarafshan corridor (Uzbekistan)",
        title: "Supply the journey's next stage",
        action: "Case evidence: UNESCO documents ancient caravan roads and extensive east-west exchange along this corridor. Inference: arrange ordinary provisions and packing supplies for the next leg through willing local sellers. Start with confirmed orders; your business need not finance a cargo across an entire continent.",
        category: "enterprise",
        capitalTier: "working",
        access: ["Local language, lawful market access and relationships with suppliers and caravan leaders.", "Working funds and an agreed delivery point; access to water or land is not automatic."],
        exitSignal: "Receive payment at handover; stop restocking if normal caravan traffic or supplies are interrupted.",
        payoff: { label: "Repeat service margin; not a documented fortune", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "Delayed caravans can strand perishable stock." }, { kind: "political", detail: "Local control and route safety can change within this long period." }],
        lesson: {
          concept: "Supporting infrastructure",
          prompt: "A valuable cargo passes through town. Which smaller opening can you test?",
          choices: [
            { label: "Borrow to compete with the whole caravan", consequence: "You assume risks far beyond a local service.", correct: false },
            { label: "Fill a confirmed supply order for its next leg", consequence: "You can test demand with a bounded delivery.", correct: true }
          ],
          explanation: "Economic activity creates demand for support. A small, repeatable service can be accessible even when the headline trade requires great wealth."
        },
        sources: [{ title: "Silk Roads: Zarafshan-Karakum Corridor", publisher: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/1675/", claim: "UNESCO identifies ancient caravan roads through the Zarafshan-Karakum Corridor and extensive east-west trade from the second century BCE to the sixteenth century CE. It does not establish a fifth–eighth-century named merchant or an individual supply service.", kind: "history" }],
        confidence: "contextual",
        ethicsNote: "Pay suppliers and workers freely; never restrict essential water or food to manufacture a shortage."
      }
    ]
  },
  {
    id: "tang-maritime-cargo",
    window: windows[7],
    opportunities: [
      {
        id: "changsha-export-bowls",
        destination: "Changsha and Guangzhou (China)",
        title: "Sell useful bowls into a proven export market",
        action: "Case evidence: the ninth-century Tang shipwreck carried Changsha bowls and finer ceramics for different customers. Inference: purchase an inspected batch of new bowls and sell it to an established export merchant at port. The wreck proves cargo and danger, not the profitability of its voyage.",
        category: "trade",
        capitalTier: "working",
        access: ["Willing kiln suppliers, an interpreter and permission to trade through the port.", "A buyer specification and funds for packing, delivery and rejected pieces."],
        exitSignal: "Settle with the export merchant before reinvesting; cut batches when breakage or rejections rise.",
        payoff: { label: "Potential wholesale income; voyage profit unknown", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "Ceramic cargo can break or sink; a known trade route is not a guarantee." }, { kind: "execution", detail: "The wrong grade or decoration may miss the buyer's market." }],
        lesson: {
          concept: "Evidence versus outcome",
          prompt: "Thousands of export bowls survive in a shipwreck. What does that prove?",
          choices: [
            { label: "A cargo existed, but this voyage did not complete", consequence: "You can study the market without inventing a successful return.", correct: true },
            { label: "Every exporter must have become rich", consequence: "Cargo volume alone supplies neither sale receipts nor costs.", correct: false }
          ],
          explanation: "An archaeological find can establish production and trade while revealing little about net earnings. Match the conclusion to the evidence actually preserved."
        },
        sources: [{ title: "Tang Shipwreck", publisher: "Asian Civilisations Museum, Singapore National Heritage Board", url: "https://www.acm.nhb.gov.sg/galleries/maritime-trade/tang-shipwreck", claim: "The ninth-century wreck carried bulk Changsha bowls alongside finer wares; the museum interprets this variety as serving different customers in maritime trade.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Trade new, voluntarily produced goods; neither wreck salvage nor acquisition from looters is the proposed opportunity."
      }
    ]
  },
  {
    id: "song-market-revolution",
    window: windows[8],
    opportunities: [
      {
        id: "song-market-delivery",
        destination: "Song market towns and canal ports (China)",
        title: "Move ordinary goods through a growing market",
        action: "Case evidence: Song commerce connected specialized farms, market towns and water transport. Inference: arrange a small delivery of tea or household oil from a willing supplier to a confirmed town buyer. Earn from reliable distribution; check the local price and guild conditions before every purchase.",
        category: "trade",
        capitalTier: "working",
        access: ["Local language, lawful market access and any required guild relationship.", "A carrier, verified quantities and capital sufficient for a complete delivery."],
        exitSignal: "Sell on delivery; pause when freight, spoilage or market charges remove the surplus.",
        payoff: { label: "Possible recurring distribution margin", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "Losses and delays can consume a thin margin on ordinary goods." }, { kind: "legal", detail: "Organized markets and guild relationships can exclude a newcomer." }],
        lesson: {
          concept: "Specialization",
          prompt: "Farmers can buy what others produce. What service becomes more useful?",
          choices: [
            { label: "Dependable transport between producer and buyer", consequence: "Specialization requires a way to exchange the output.", correct: true },
            { label: "Assuming every household makes everything", consequence: "You miss the reason a distribution business can exist.", correct: false }
          ],
          explanation: "Specialization and exchange support each other. Your opening is to make a useful connection work at a cost below what customers will pay."
        },
        sources: [{ title: "The Song Economic Revolution: Commercialization", publisher: "Columbia University, Asia for Educators", url: "https://afe.easia.columbia.edu/songdynasty-module/econ-rev-commercial.html", claim: "Song farmers marketed surpluses and specialized in commercial crops; merchants organized by trade, while expanding commerce increased demand for transport, particularly by water.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Use voluntary purchases and paid transport; do not hoard necessities or manufacture scarcity."
      },
      {
        id: "song-paper-settlement",
        destination: "Sichuan paper-money markets (China)",
        title: "Save on payment transport without trusting blindly",
        action: "Case evidence: merchants used deposit certificates, and Song authorities began issuing paper money in the 1020s. Inference: for an existing trade, compare an accepted local paper settlement with hauling coin. Verify issuer, validity and acceptance first. This is a cost-saving method, not permission to issue money yourself.",
        category: "security",
        capitalTier: "working",
        access: ["An authorized issuer or intermediary and a seller who accepts the specific note.", "Knowledge of local validity and redemption terms; this later development is unavailable in 1000 CE."],
        exitSignal: "Complete the purchase or redeem under the agreed terms; avoid accumulating notes beyond transaction needs.",
        payoff: { label: "Potentially lower transaction costs; no investment yield implied", basis: "qualitative" },
        risks: [{ kind: "custody", detail: "A claim on an issuer is not the same asset as the metal it replaces." }, { kind: "liquidity", detail: "A note accepted here may be refused elsewhere or after its term." }],
        lesson: {
          concept: "Counterparty risk",
          prompt: "Paper is easier to carry than coins. What new question must you answer?",
          choices: [
            { label: "Who will honor this specific claim?", consequence: "You identify the issuer and acceptance conditions behind its usefulness.", correct: true },
            { label: "How much does the paper weigh?", consequence: "Convenience alone says nothing about whether someone will accept it.", correct: false }
          ],
          explanation: "Financial instruments can remove one cost and introduce another risk. Evaluate the promise and the parties, not just the convenient form."
        },
        sources: [{ title: "From Copper Coins to Paper Notes", publisher: "Columbia University, Asia for Educators", url: "https://afe.easia.columbia.edu/songdynasty-module/econ-rev-money.html", claim: "Heavy strings of coins encouraged merchant deposit certificates; a limited set of issuers preceded the Song government's takeover of paper issuance in the 1020s.", kind: "history" }],
        confidence: "medium"
      }
    ]
  },
  {
    id: "quanzhou-production-to-port",
    window: windows[9],
    opportunities: [
      {
        id: "quanzhou-kiln-port-link",
        destination: "Quanzhou, Fujian (China)",
        title: "Connect a kiln's output to the port",
        action: "Case evidence: Quanzhou's tenth–fourteenth-century trade linked ceramic production, transport and maritime markets. Inference: coordinate inspected ceramic orders between a local kiln and a port merchant for an agreed fee. The twelfth-century case rests on this documented system, not a claim that every export earned a fortune.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["A kiln willing to sell, a known port buyer and language support.", "Permission to conduct business and a written or witnessed acceptance agreement."],
        exitSignal: "Collect after the buyer accepts the delivery; decline orders you cannot inspect or trace.",
        payoff: { label: "Possible coordination fees; amount not documented", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "Production delays, poor firing or broken delivery can prevent acceptance." }, { kind: "legal", detail: "Port administration and established intermediaries govern access." }],
        lesson: {
          concept: "Bottlenecks",
          prompt: "A kiln has goods and a ship has buyers. Why might a coordinator still matter?",
          choices: [
            { label: "Matching quality, timing and delivery can fail", consequence: "Removing that failure can be worth a clearly agreed fee.", correct: true },
            { label: "All output automatically reaches any buyer", consequence: "You overlook the work between production and a completed sale.", correct: false }
          ],
          explanation: "Infrastructure makes trade possible, but connections still need coordination. A useful intermediary solves a specific failure rather than merely standing between two parties."
        },
        sources: [{ title: "Quanzhou: Emporium of the World in Song–Yuan China", publisher: "UNESCO World Heritage Committee", url: "https://whc.unesco.org/en/decisions/7934", claim: "Quanzhou's tenth–fourteenth-century maritime economy integrated ceramic and iron production with bridges, docks, administration and marketing.", kind: "history" }],
        confidence: "contextual",
        ethicsNote: "Use freely contracted makers and carriers; pay for genuine coordination rather than imposing a gatekeeping charge."
      }
    ]
  },
  {
    id: "swahili-ocean-markets",
    window: windows[10],
    opportunities: [
      {
        id: "kilwa-ceramic-orders",
        destination: "Kilwa Kisiwani, Swahili coast (Tanzania)",
        title: "Meet a Swahili buyer on their terms",
        action: "Case evidence: thirteenth-century Kilwa participated in Indian Ocean trade including Persian and Chinese ceramics. Inference: work with a local merchant to pre-sell a small, legally purchased consignment of new tableware. Let local customers specify the goods; arrival from abroad gives you no special commercial rights.",
        category: "trade",
        capitalTier: "working",
        access: ["A willing Swahili merchant partner, interpretation and local permission to trade.", "A confirmed order, established ownership and freight and breakage funds."],
        exitSignal: "Receive settlement after acceptance; stop if the buyer or lawful route disappears.",
        payoff: { label: "Possible import margin; historical prices not comparable", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "Imported styles may not match local demand." }, { kind: "physical", detail: "Sea transit can destroy a valuable but fragile cargo." }],
        lesson: {
          concept: "Local market knowledge",
          prompt: "You can reach any port. What do you still lack on arrival?",
          choices: [
            { label: "Nothing; distance was the only barrier", consequence: "You still need a customer, permission and a trusted way to settle.", correct: false },
            { label: "Relationships and knowledge of local demand", consequence: "A local partner can make your global mobility commercially useful.", correct: true }
          ],
          explanation: "Travel removes distance, not the need for consent or knowledge. An unfamiliar market is a community of informed participants, not an empty opportunity."
        },
        sources: [{ title: "Ruins of Kilwa Kisiwani and Ruins of Songo Mnara", publisher: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/144/", claim: "Kilwa prospered in the thirteenth and fourteenth centuries; its Indian Ocean commerce included Persian ceramics and Chinese porcelain.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Only voluntary new-goods trade is proposed. Exclude enslaved people, coerced extraction, ivory and seizure of property."
      }
    ]
  },
  {
    id: "hanseatic-connections",
    window: windows[11],
    opportunities: [
      {
        id: "lubeck-merchant-service",
        destination: "Lübeck and Hanseatic trading towns (Germany and northern Europe)",
        title: "Start inside an existing merchant network",
        action: "Case evidence: Hanseatic merchants organized shipping communities and foreign trading posts; cities coordinated decisions in the later fourteenth century. Inference: offer delivery checking and correspondence to a merchant for an agreed fee. Begin as a paid service provider rather than assuming access to a privileged trading post.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Relevant languages, a credible introduction and legal residence or work access.", "An established merchant who can authorize your work; network privileges are not transferable by assertion."],
        exitSignal: "Collect fees per verified assignment; suspend work when shipping or safe access is interrupted.",
        payoff: { label: "Possible service income and repeat clients", basis: "qualitative" },
        risks: [{ kind: "legal", detail: "Merchant associations and towns can deny an outsider access." }, { kind: "physical", detail: "Piracy and dangerous voyages can interrupt goods and correspondence." }],
        lesson: {
          concept: "Access barriers",
          prompt: "You know a powerful network exists. Does that give you its privileges?",
          choices: [
            { label: "No; secure a recognized role first", consequence: "You distinguish a real institution from access you have not earned.", correct: true },
            { label: "Yes; historical knowledge is enough", consequence: "An accurate map cannot grant a legal or social status.", correct: false }
          ],
          explanation: "Institutions can reduce costs for members while excluding outsiders. A modest authorized role is more credible than pretending to be a merchant prince."
        },
        sources: [{ title: "The medieval Hanseatic League", publisher: "THE HANSA, Union of Cities", url: "https://www.hanse.org/en/the-medieval-hanseatic-league", claim: "Merchant shipping communities developed into a town network with foreign trading posts; Hanseatic Days occurred from the second half of the fourteenth century, and piracy motivated cooperation.", kind: "history" }],
        confidence: "contextual",
        ethicsNote: "Serve peaceful, voluntary exchange; do not participate in coercive blockades, privateering or seized cargo sales."
      }
    ]
  },
  {
    id: "print-and-accounts",
    window: windows[12],
    opportunities: [
      {
        id: "venice-book-orders",
        destination: "Venice (Italy)",
        title: "Sell the book before funding the whole edition",
        action: "Case evidence: printing arrived in Venice in 1469, initially under a monopoly. Inference: after checking current privileges, partner with an authorized printer to sell a modest batch of useful books to confirmed buyers. If you arrive before printing exists here, this later-century example is not yet available.",
        category: "trade",
        capitalTier: "working",
        access: ["A lawful printer partnership and knowledge of existing printing privileges.", "Literacy in the buyers' language, verified orders and funds for stock and delivery."],
        exitSignal: "Sell through the batch before financing another; stop if demand or legal permission fails.",
        payoff: { label: "Potential book-trade margin; no promised bestseller", basis: "qualitative" },
        risks: [{ kind: "liquidity", detail: "An unsold edition ties up paper and capital." }, { kind: "legal", detail: "A printing privilege can exclude your proposed supplier or title." }],
        lesson: {
          concept: "Technology and demand",
          prompt: "A press can reproduce many books. What still limits the business?",
          choices: [
            { label: "Enough buyers at a viable price", consequence: "Cheap reproduction helps only if the output sells.", correct: true },
            { label: "Nothing once the press works", consequence: "You mistake production capacity for revenue.", correct: false }
          ],
          explanation: "A technical breakthrough expands what is possible. Customer demand, permissions and working capital determine what you can profitably deliver."
        },
        sources: [{ title: "Printers and Publishers: The Merchants of Venice", publisher: "Oxford University Press", url: "https://academic.oup.com/book/36379/chapter-abstract/319945217", claim: "Printing began in Venice in 1469 when Johannes de Spira obtained a five-year monopoly from the Venetian Senate.", kind: "history" }],
        confidence: "contextual"
      },
      {
        id: "venice-bookkeeping-service",
        destination: "Venice (Italy)",
        title: "Turn commercial arithmetic into a paid skill",
        action: "Case evidence: Pacioli's arithmetic and bookkeeping compendium was published in Venice in 1494. Inference: learn the local methods and offer to reconcile a willing merchant's purchases, sales and unsettled accounts. The publication is a dated learning resource, not evidence that an unknown newcomer could immediately win clients.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Practical bookkeeping ability, the relevant language and a client who grants access to records.", "A lawful paid role and a clear confidentiality and payment agreement; the 1494 book is unavailable earlier."],
        exitSignal: "Collect the agreed fee after reconciliation; decline clients who demand false accounts.",
        payoff: { label: "Possible professional income; fees not documented", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "Incomplete records can prevent a reliable reconciliation." }, { kind: "legal", detail: "False entries or mishandled entrusted funds can create liability." }],
        lesson: {
          concept: "Cash versus profit",
          prompt: "The cashbox is full, but suppliers remain unpaid. Is all the cash yours to spend?",
          choices: [
            { label: "Yes; cash received is profit", consequence: "Spending it can leave you unable to meet existing obligations.", correct: false },
            { label: "No; reconcile costs and amounts owed", consequence: "You distinguish available money from the surplus actually earned.", correct: true }
          ],
          explanation: "Records make obligations visible. Keeping an honest account helps a business decide what it can spend, even before it considers expansion."
        },
        sources: [{ title: "History of Accounting: Early History to 17th Century", publisher: "Library of Congress", url: "https://guides.loc.gov/history-of-accounting/practice/early-history", claim: "The guide identifies Pacioli's 1494 Venetian publication as a bookkeeping text and links surviving editions. It does not establish a historical fee for the proposed service.", kind: "history" }],
        confidence: "contextual"
      }
    ]
  }
];
