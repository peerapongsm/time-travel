import type { Briefing } from "../domain";
import { windows } from "./windows";

export const ancient: Briefing[] = [
  {
    id: "first-ledgers",
    window: windows[0],
    opportunities: [
      {
        id: "uruk-accounts",
        destination: "Uruk, Mesopotamia (present-day Iraq)",
        title: "Make yourself useful at the grain ledger",
        action: "Case evidence: around 3000 BCE, grain movements were recorded on clay. Inference: learn local measures and seek a paid role reconciling deliveries for a willing household or storekeeper. Build savings from trusted work; the tablet does not establish an open job market or a wage rate.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Demonstrable local numeracy and scribal training; modern literacy alone is insufficient.", "A sponsor and a freely negotiated role. Arrival grants no temple office or control of grain."],
        exitSignal: "Collect agreed compensation at each reconciliation; leave if payment or voluntary employment cannot be secured.",
        payoff: { label: "Skill income and a reputation; amount unknown", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "Wrong measures can turn an apparent surplus into a disputed shortage." }, { kind: "legal", detail: "An outsider may have no recognized right to work or enforce payment." }],
        lesson: {
          concept: "Human capital",
          prompt: "You can do modern arithmetic, but the store uses unfamiliar measures. What comes first?",
          choices: [
            { label: "Learn and reconcile the local measures", consequence: "Your skill becomes useful to the person who must trust the account.", correct: true },
            { label: "Promise modern accounting immediately", consequence: "Untranslated units make even correct arithmetic unreliable.", correct: false }
          ],
          explanation: "A portable skill produces income only when someone can verify its usefulness. Training and trust are entry costs, even if your starting purse is small."
        },
        sources: [{ title: "Administrative account concerning malt and barley groats", publisher: "The Metropolitan Museum of Art", url: "https://www.metmuseum.org/art/collection/search/327385", claim: "A tablet dated approximately 3100–2900 BCE, probably from Uruk, records grain distribution, likely by a temple. It supports the accounting mechanism, not hypothetical wages.", kind: "history" }],
        confidence: "contextual",
        ethicsNote: "Accept only voluntary paid work; do not appropriate institutional grain or supervise coerced labor."
      },
      {
        id: "gulf-stones",
        destination: "Ur and the Gulf trading network (Iraq and Bahrain)",
        title: "Sell a small, verified cargo across the Gulf",
        action: "Case evidence: late-third-millennium BCE merchants linked Mesopotamia, the Gulf and the Indus region. Inference: arrange a small, inspected consignment of legitimately purchased decorative stones through an established partner. Verify a buyer before committing. This later example cannot be projected back to every year of this broad window.",
        category: "trade",
        capitalTier: "working",
        access: ["A trusted multilingual trading partner and acceptance of local seals and weights.", "A seller able to establish lawful ownership and a buyer who agrees on quality."],
        exitSignal: "Settle on the agreed delivery and inspection; stop if ownership or quality cannot be verified.",
        payoff: { label: "Possible trading margin; no surviving comparable return", basis: "qualitative" },
        risks: [{ kind: "custody", detail: "A valuable consignment can be substituted or lost between agents." }, { kind: "liquidity", detail: "A rare stone has little spending power without a willing buyer." }],
        lesson: {
          concept: "Liquidity",
          prompt: "A seller calls a stone rare. What makes it a workable trade?",
          choices: [
            { label: "Its rarity alone", consequence: "You may own something impressive that nobody will buy.", correct: false },
            { label: "A verified buyer and an agreed quality standard", consequence: "You can assess the sale before tying up your purse.", correct: true }
          ],
          explanation: "A price difference is useful only if you can complete both sides. Inspection, ownership and a buyer matter more than an exotic story."
        },
        sources: [{ title: "Gulf-type stamp seal from Ur", publisher: "British Museum", url: "https://www.britishmuseum.org/collection/object/W_1932-1008-178", claim: "Seals and Mesopotamian texts attest late-third-millennium contacts with Dilmun, Magan and Meluhha, including ships carrying gemstones and wood, and the use of seals and standard weights.", kind: "history" }],
        confidence: "contextual",
        ethicsNote: "Trade only voluntarily supplied goods; neither uncertain provenance nor forced labor is an acceptable source of margin."
      }
    ]
  },
  {
    id: "bronze-age-caravans",
    window: windows[1],
    opportunities: [
      {
        id: "kanesh-tin",
        destination: "Ashur to Kanesh (Iraq to central Türkiye)",
        title: "Price the whole tin journey",
        action: "Case evidence: early-second-millennium BCE merchants carried tin and textiles to Anatolia for precious metals. Inference: buy a modest tin consignment through an established merchant, with a buyer and a complete expense account. Use the attested caravan era, not an assumed millennium-long price spread.",
        category: "trade",
        capitalTier: "working",
        access: ["A recognized merchant partner, local weights and an agreement on metal quality.", "Funds for guides, transport, duties and the time before settlement."],
        exitSignal: "Sell after the agreed inspection in Kanesh and settle expenses before reinvesting.",
        payoff: { label: "Possible net trade profit after costs; not quantified", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "Travel and cargo loss can erase the apparent price advantage." }, { kind: "execution", detail: "A gross spread may not cover the caravan's full expenses." }],
        lesson: {
          concept: "Gross versus net profit",
          prompt: "Tin sells for more at the destination. Have you found a profitable trade?",
          choices: [
            { label: "Yes, the sale price is higher", consequence: "Guides, duties and transport can consume the difference.", correct: false },
            { label: "Only after all delivery costs and losses", consequence: "You compare the sale with the full cost of getting paid.", correct: true }
          ],
          explanation: "The interesting number is what remains after settlement. A higher destination price compensates for real work and risk; it is not free money."
        },
        sources: [{ title: "Cuneiform tablet: caravan account", publisher: "The Metropolitan Museum of Art", url: "https://www.metmuseum.org/art/collection/search/325851", claim: "An Old Assyrian caravan account records tin and textiles, guide wages, donkeys and other expenses. Merchants exchanged these goods for precious metals in early-second-millennium Anatolia.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Use voluntary suppliers and paid guides; exclude weapons contracts and coerced labor."
      },
      {
        id: "kanesh-textiles",
        destination: "Ashur and Kanesh (Iraq and Türkiye)",
        title: "Keep textile trade legal and repeatable",
        action: "Case evidence: Old Assyrian merchants exported textiles and faced import, export and transit charges. Inference: match a permitted textile order to a known buyer and include those charges in the quotation. Repeated, compliant orders are the wealth mechanism; smuggling stories are evidence of risk, not a playbook.",
        category: "trade",
        capitalTier: "working",
        access: ["A merchant who knows which textiles may legally be exported and sold.", "Voluntary makers, an agreed sample and enough capital to pay charges openly."],
        exitSignal: "Receive payment for the accepted cloth, then reorder only if lawful net margins remain positive.",
        payoff: { label: "Repeat-order income; historical margin unquantified", basis: "qualitative" },
        risks: [{ kind: "legal", detail: "Trade restrictions and unpaid duties can invalidate the plan." }, { kind: "execution", detail: "A buyer can reject cloth that differs from the sample." }],
        lesson: {
          concept: "Regulatory costs",
          prompt: "The deal works only if you omit the transport tax. What should you conclude?",
          choices: [
            { label: "The quoted trade is not viable", consequence: "Reprice or decline before committing the capital.", correct: true },
            { label: "Hide the cloth to preserve the margin", consequence: "You have substituted an illegal gamble for a business.", correct: false }
          ],
          explanation: "Required charges belong inside the cost calculation. Knowledge of a historical evasion scheme does not make it a sound or acceptable investment."
        },
        sources: [{ title: "Trade and contraband in ancient Assyria", publisher: "British Museum", url: "https://www.britishmuseum.org/blog/trade-and-contraband-ancient-assyria", claim: "Old Assyrian merchants exported textiles and tin to Anatolia, while letters describe transport, import, transit and export charges and restrictions on trade.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Pay lawful charges; do not use the documented contraband methods."
      }
    ]
  },
  {
    id: "mediterranean-networks",
    window: windows[2],
    opportunities: [
      {
        id: "sidon-textile-orders",
        destination: "Sidon and eastern Mediterranean ports (Lebanon)",
        title: "Connect skilled makers to distant buyers",
        action: "Case evidence: by the late eighth century BCE, Phoenician trading posts spanned the Mediterranean; their crafts included textiles and metalwork. Inference: arrange textile orders between willing makers and an established port merchant, earning an agreed fee for accepted deliveries. Check that the network exists at your arrival date.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Local language, textile expertise and a merchant willing to introduce you.", "Permission to work and a clear agreement defining when your fee is due."],
        exitSignal: "Collect the fee after acceptance; stop taking orders if makers or buyers cease honoring terms.",
        payoff: { label: "Commission income without owning a ship", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "An unapproved design or late delivery can leave your work unpaid." }, { kind: "political", detail: "Changing control of ports can interrupt established relationships." }],
        lesson: {
          concept: "Asset-light enterprise",
          prompt: "You understand buyers' tastes but cannot buy a ship. Where can you start?",
          choices: [
            { label: "Coordinate an agreed order for a fee", consequence: "Your contribution is information and follow-through, with limited inventory exposure.", correct: true },
            { label: "Borrow enough for an entire cargo", consequence: "The debt creates risks your useful skill does not remove.", correct: false }
          ],
          explanation: "Access to a market can be valuable without ownership of every asset. But a commission still requires trust, a real customer and enforceable terms."
        },
        sources: [{ title: "The Phoenicians (1500–300 B.C.)", publisher: "The Metropolitan Museum of Art", url: "https://www.metmuseum.org/essays/the-phoenicians-1500-300-b-c", claim: "Phoenician cities were maritime trading centers; Mediterranean trading posts existed by the late eighth century BCE, and textile and metalworking skills were prominent.", kind: "history" }],
        confidence: "contextual",
        ethicsNote: "Do not finance settlement, dispossession or captive labor; contract only with willing makers."
      }
    ]
  },
  {
    id: "classical-customer-tastes",
    window: windows[3],
    opportunities: [
      {
        id: "athens-spina-pottery",
        destination: "Athens to Spina (Greece to Italy)",
        title: "Take the customer's order before firing the vase",
        action: "Case evidence: fifth- and fourth-century BCE Spina imported Athenian pottery, with evidence for designs serving local tastes. Inference: secure an order for new tableware, commission a voluntary workshop and arrange delivery. Treat the source's proposed individual commissions as interpretation, not proof of a particular profit.",
        category: "trade",
        capitalTier: "working",
        access: ["A local intermediary, lawful trading status and an independent workshop.", "A buyer-approved shape and design, plus funds for packing and freight."],
        exitSignal: "Settle after delivery and acceptance; reduce orders if local substitutes or changing tastes weaken demand.",
        payoff: { label: "Potential custom-order margin; no recorded multiple", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "Fragile cargo can break in transit." }, { kind: "liquidity", detail: "A highly customized piece can be hard to resell if the buyer withdraws." }],
        lesson: {
          concept: "Product-market fit",
          prompt: "Which shipment is better grounded in demand?",
          choices: [
            { label: "Your favorite Athenian design, without asking", consequence: "Your taste may not match the destination market.", correct: false },
            { label: "A design and quantity accepted by the buyer", consequence: "You reduce uncertainty before paying for production.", correct: true }
          ],
          explanation: "A famous product is not automatically the right product. Local preferences and confirmed demand determine whether a trading connection becomes a business."
        },
        sources: [{ title: "Athenian Masterpieces in Etruscan Tombs", publisher: "The Metropolitan Museum of Art", url: "https://www.metmuseum.org/perspectives/underwater-necropolis", claim: "Spina was a destination for Attic pottery in the fifth and fourth centuries BCE; studies identify designs targeted to local buyers and possible individual commissions.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Commission new goods from free craftspeople; archaeological finds are evidence, not a recommendation to loot tombs."
      }
    ]
  },
  {
    id: "roman-scale-and-season",
    window: windows[4],
    opportunities: [
      {
        id: "roman-glass-distribution",
        destination: "Rome and Mediterranean ports (Italy)",
        title: "Distribute the everyday glass revolution",
        action: "Case evidence: glassblowing transformed production, and Rome's glass industry matured during the first century CE. Inference: buy small batches of useful bottles or drinking vessels from free makers and sell to household-goods merchants. Start with repeatable everyday forms and measure breakage before expanding.",
        category: "trade",
        capitalTier: "working",
        access: ["An independent maker using paid labor and a merchant willing to buy the stock.", "Local trading rights and packing that survives an initial trial shipment."],
        exitSignal: "Sell each batch promptly; stop scaling when unsold stock or breakage consumes the margin.",
        payoff: { label: "Possible volume business; actual returns unknown", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "Glass that is cheap at the workshop can be expensive after breakage." }, { kind: "liquidity", detail: "Competition can reduce resale prices before stock clears." }],
        lesson: {
          concept: "Unit economics",
          prompt: "A larger shipment costs less per vessel. What else must you count?",
          choices: [
            { label: "Only the factory price", consequence: "You ignore stock that never becomes a paid sale.", correct: false },
            { label: "Damage, freight and unsold pieces", consequence: "You learn the cost per vessel actually sold.", correct: true }
          ],
          explanation: "Scale helps only when each additional sale leaves a surplus. A trial batch reveals costs that a production-price quotation conceals."
        },
        sources: [{ title: "Roman Glass", publisher: "The Metropolitan Museum of Art", url: "https://www.metmuseum.org/essays/roman-glass", claim: "The first-century CE Roman glass industry expanded with glassblowing; vessels served everyday household and commercial uses and were shipped around the Mediterranean.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "The historical industry included enslaved workers. This proposal is conditional on free production and does not treat enslavement as a cost advantage."
      },
      {
        id: "muziris-pepper",
        destination: "Muziris region, Malabar Coast (India)",
        title: "Be ready when the pepper buyers arrive",
        action: "Case evidence: the first-century CE Periplus describes pepper exports from Malabar and seasonal voyages from Egypt. Inference: buy a small inspected lot from willing growers or traders and sell to an arriving merchant. Your edge is preparation and matching supply, conditional on local prices and lawful access.",
        category: "trade",
        capitalTier: "working",
        access: ["A local interpreter and supplier, with accepted weights and permission to trade.", "Dry storage and a committed buyer; modern identification of the ancient port is not exact."],
        exitSignal: "Sell to the agreed buyer before extending storage; do not hold indefinitely for a fabled Roman markup.",
        payoff: { label: "Possible seasonal margin; no defensible return multiple", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "Moisture, poor quality or missed arrivals can spoil the transaction." }, { kind: "liquidity", detail: "A historical export does not establish today's local buying or selling price." }],
        lesson: {
          concept: "Timing and inventory",
          prompt: "Ships follow a season, but your pepper is deteriorating. What was missing?",
          choices: [
            { label: "A storage and buyer plan", consequence: "Seasonal demand helps only if saleable goods reach the buyer on time.", correct: true },
            { label: "A bigger belief in future demand", consequence: "Confidence does not repair spoiled stock.", correct: false }
          ],
          explanation: "Knowing a trade existed is different from knowing its net return. Time in storage consumes capital and can damage the product."
        },
        sources: [{ title: "Periplus of the Erythraean Sea, sections 54–57", publisher: "Internet History Sourcebooks Project, hosted by Fordham University", url: "https://sourcebooks.web.fordham.edu/ancient/periplus.asp", claim: "The translated first-century merchant account describes Muziris, pepper exports near Malabar and a favorable departure season from Egypt. It does not supply comparable entry and exit prices for this proposal.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Only voluntary pepper trade is in scope; the source's other trades and prejudiced descriptions are not endorsed."
      }
    ]
  },
  {
    id: "late-antique-agents",
    window: windows[5],
    opportunities: [
      {
        id: "gansu-commercial-agent",
        destination: "Gansu trading towns (China)",
        title: "Earn trust as the merchant's local eyes",
        action: "Case evidence: fourth-century letters show connected Sogdian merchants, and merchants are attested in Gansu in 439 CE. Inference: offer verified stock reports and delivery reconciliation to an established trader for a fee. Confirm the town is functioning at your arrival date; the evidence also records severe disruptions.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Relevant languages, a credible introduction and permission to work.", "Access to suppliers and a principal who agrees to pay for verifiable reports."],
        exitSignal: "Settle fees on checked deliveries; suspend work if communications or ordinary commerce fail.",
        payoff: { label: "Possible agency income; earnings unrecorded", basis: "qualitative" },
        risks: [{ kind: "political", detail: "Trade networks can fracture; letters do not prove continuous safe commerce." }, { kind: "execution", detail: "Outdated reports or a dishonest principal can make the service worthless." }],
        lesson: {
          concept: "Information quality",
          prompt: "A report is authentic but arrived months late. Should you commit immediately?",
          choices: [
            { label: "Yes, authenticity guarantees usefulness", consequence: "The market may have changed since the report was written.", correct: false },
            { label: "Check current stock and trading conditions", consequence: "You test freshness as well as credibility.", correct: true }
          ],
          explanation: "Reliable information needs a date and a working route to action. An old true statement can still support a bad present decision."
        },
        sources: [{ title: "Sogdian Trade", publisher: "Encyclopaedia Iranica", url: "https://www.iranicaonline.org/articles/sogdian-trade/", claim: "Letters written in 313 CE show merchant networks connecting Gansu and Samarkand; Sogdian merchants are also documented in Gansu in 439. The account notes disruption and gaps in knowledge between these dates.", kind: "history" }],
        confidence: "contextual",
        ethicsNote: "Serve ordinary voluntary commerce; do not sell targeting information or profit from abandoned property."
      }
    ]
  }
];
