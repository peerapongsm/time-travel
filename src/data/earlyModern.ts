import type { Briefing } from "../domain";
import { windows } from "./windows";

export const earlyModern: Briefing[] = [
  {
    id: "antwerp-bourse-and-port",
    window: windows[13],
    opportunities: [
      {
        id: "antwerp-bourse-brokerage",
        destination: "Antwerp bourse (present-day Belgium)",
        title: "Verify prices before committing a merchant's purse",
        action: "Case evidence: Antwerp's purpose-built bourse opened in 1532, brought European traders together, and set daily prices for goods including grain and spices as well as securities. Inference: after securing a recognized role, compare posted terms, inspect samples, and introduce a willing buyer and seller for a stated commission. Do not trade goods whose ownership or labor conditions cannot be verified.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Language ability, a credible introduction, and permission to conduct business at the bourse.", "A written or witnessed commission agreement; time-travel knowledge is not membership or credit."],
        exitSignal: "Collect only after both parties accept the documented terms; stop if provenance, price, or authority cannot be checked.",
        payoff: { label: "Possible commission income without owning the cargo", basis: "qualitative" },
        risks: [{ kind: "legal", detail: "An outsider may lack standing to broker a contract or enforce a fee." }, { kind: "execution", detail: "A quoted price is useless if quality, measure, or counterparty differs." }],
        lesson: {
          concept: "Price discovery",
          prompt: "A spice quotation sounds attractive. What makes it actionable?",
          choices: [
            { label: "A verified sample and willing counterparties", consequence: "You connect the public quotation to a transaction that can actually settle.", correct: true },
            { label: "The headline price alone", consequence: "You may compare unlike goods or rely on a party who cannot perform.", correct: false }
          ],
          explanation: "An exchange improves information, but verification and access still determine whether information becomes income."
        },
        sources: [{ title: "Into the City: Antwerp city guide", publisher: "Museum aan de Stroom", url: "https://mas.be/sites/mas/files/guidebook.pdf", claim: "The museum guide dates Antwerp's new stock exchange to 1532 and describes it as the daily price-setting market for goods and securities used by traders from across Europe.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Broker only voluntary trade in lawfully owned goods; exclude plantation products, enslaved people, weapons, and seized cargo."
      },
      {
        id: "antwerp-port-handling",
        destination: "Port of Antwerp (present-day Belgium)",
        title: "Coordinate an inspected port delivery",
        action: "Case evidence: Antwerp's sixteenth-century growth depended partly on the Scheldt and a port receiving overseas goods, including spices. Inference: contract with a willing merchant to check quantities, arrange lawful storage, and deliver a named non-exploitative cargo to a confirmed city buyer. Charge for the completed handoff rather than betting on the cargo price.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Port permission, local measures, and a merchant who authorizes custody of the shipment.", "A traceable cargo, safe storage, and a buyer-approved delivery record."],
        exitSignal: "Release the goods only against the agreed receipt and collect the handling fee; refuse cargo with uncertain ownership.",
        payoff: { label: "Possible handling and coordination fees", basis: "qualitative" },
        risks: [{ kind: "custody", detail: "Loss, substitution, or spoilage can make the handler liable." }, { kind: "legal", detail: "Port and guild rules can bar unauthorized work." }],
        lesson: {
          concept: "Fee income",
          prompt: "Which plan limits exposure to a volatile imported-goods price?",
          choices: [
            { label: "Own a large unpriced cargo", consequence: "Your capital depends on a resale price you have not verified.", correct: false },
            { label: "Complete a contracted delivery for a fee", consequence: "The value comes from an observable service rather than an open inventory bet.", correct: true }
          ],
          explanation: "A busy market creates service demand. A defined fee can be more accessible than financing the merchandise."
        },
        sources: [{ title: "World Port: About trade and shipping", publisher: "Museum aan de Stroom", url: "https://mas.be/en/content/6-world-port", claim: "The museum describes the Scheldt and port as important to Antwerp's growth and identifies spices and other overseas goods moving through the city from the sixteenth century.", kind: "history" }],
        confidence: "contextual",
        ethicsNote: "Handle only goods with voluntary, non-coercive supply chains; the historical port also carried products tied to exploitation."
      }
    ]
  },
  {
    id: "exchange-intelligence-and-transshipment",
    window: windows[14],
    opportunities: [
      {
        id: "london-exchange-intelligence",
        destination: "Royal Exchange, London (England)",
        title: "Turn posted market news into a verified errand",
        action: "Case evidence: London's Royal Exchange opened in 1571 as a purpose-built trading center where merchants saw commodity prices, bankruptcies, and ship movements. Inference: with a merchant's authorization, copy a requested quotation or arrival notice, confirm it at the Exchange, and deliver it for an agreed fee. Report facts without trading on confidential information.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Literacy, permission to enter the relevant public or merchant area, and a client who defines the requested information.", "A time-stamped written record; rumors and private correspondence are outside the assignment."],
        exitSignal: "Deliver the verified note and collect the fee; stop when the information cannot be independently confirmed.",
        payoff: { label: "Possible information and messenger income", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "Late or mistranscribed information can be worse than no report." }, { kind: "legal", detail: "Exchange rules or merchant status may limit where an outsider can work." }],
        lesson: {
          concept: "Information quality",
          prompt: "A client wants today's ship-arrival news. What should you deliver?",
          choices: [
            { label: "A verified, dated notice", consequence: "The client can distinguish current evidence from tavern rumor.", correct: true },
            { label: "The most exciting rumor", consequence: "Speed without verification can create a costly false signal.", correct: false }
          ],
          explanation: "Information has commercial value when its source, time, and meaning are clear."
        },
        sources: [{ title: "A history of the Royal Exchange", publisher: "London Museum", url: "https://www.londonmuseum.org.uk/collections/london-stories/history-royal-exchange/", claim: "London Museum dates the Royal Exchange's official opening to 1571 and describes posted commodity prices, bankruptcies, and ship arrivals and departures.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Use public information for peaceful trade; exclude colonial campaigns, human trafficking, seized goods, and manipulation."
      },
      {
        id: "scheldt-transshipment-service",
        destination: "Scheldt route near Antwerp and Zeeland (present-day Belgium and Netherlands)",
        title: "Quote the extra handoffs before taking the cargo",
        action: "Case evidence: as control of Scheldt shipping tightened late in the sixteenth century, dues rose and cargoes between Antwerp and the North Sea were transferred twice to smaller vessels. Inference: if authorities and owners consent, quote a bounded loading, checking, and handoff service for ordinary lawful goods. Include every toll and transfer before accepting the job.",
        category: "enterprise",
        capitalTier: "working",
        access: ["Permission from the relevant authorities and vessel owners at each transfer point.", "Paid carriers, compatible measures, and cargo documents that establish ownership."],
        exitSignal: "Settle at each documented handoff; decline the route when dues or delays erase the quoted surplus.",
        payoff: { label: "Possible transshipment service margin", basis: "qualitative" },
        risks: [{ kind: "political", detail: "Changing control of the river can close a route or invalidate a permit." }, { kind: "custody", detail: "Each transfer adds loss, damage, and dispute risk." }],
        lesson: {
          concept: "Friction costs",
          prompt: "A route now requires two extra transfers. What happens to the plan?",
          choices: [
            { label: "Reprice every handoff and toll", consequence: "You test whether the service still works after the new friction.", correct: true },
            { label: "Use the old cost estimate", consequence: "The apparent margin ignores the route that must actually be completed.", correct: false }
          ],
          explanation: "Political and logistical friction changes unit economics even when the origin and destination stay the same."
        },
        sources: [{ title: "Scheldt Free!", publisher: "Museum aan de Stroom", url: "https://mas.be/en/page/scheldt-free", claim: "The museum explains that late-sixteenth-century controls increased Scheldt dues and required cargoes to be transshipped twice between Antwerp and the North Sea.", kind: "history" }],
        confidence: "contextual",
        ethicsNote: "Provide lawful civilian logistics only; do not evade a blockade, move contraband, or serve armed forces."
      }
    ]
  },
  {
    id: "amsterdam-settlement-and-logistics",
    window: windows[15],
    opportunities: [
      {
        id: "amsterdam-bank-settlement",
        destination: "Amsterdam Exchange Bank (present-day Netherlands)",
        title: "Settle an existing trade in accepted bank money",
        action: "Case evidence: Amsterdam founded the Exchange Bank in 1609 to value varied coins, support reliable payments, and settle bills of exchange through bank accounts. Inference: for a lawful deal already agreed, use the bank's authorized deposit and transfer process if both counterparties qualify and accept it. The saving is safer settlement, not a speculative return.",
        category: "security",
        capitalTier: "working",
        access: ["Eligibility for an account or an authorized local account holder willing to settle the specific transaction.", "Accepted coins, documented ownership of funds, and counterparties named in the transfer."],
        exitSignal: "Complete the payment and retain the bank record; do not leave idle balances without understanding withdrawal terms.",
        payoff: { label: "Potentially lower coin-assay and settlement friction", basis: "qualitative" },
        risks: [{ kind: "custody", detail: "Depositing money replaces physical possession with a claim administered by the bank." }, { kind: "legal", detail: "Rules for accounts and bills can exclude or bind an unknown traveler." }],
        lesson: {
          concept: "Settlement risk",
          prompt: "Why might a merchant prefer a bank transfer to a sack of mixed coins?",
          choices: [
            { label: "The bank standardizes value and records payment", consequence: "Both sides reduce disputes over clipped or unfamiliar coins.", correct: true },
            { label: "Every bank claim is risk-free", consequence: "A recorded claim still depends on rules, access, and custody.", correct: false }
          ],
          explanation: "A payment system can reduce one class of risk without eliminating counterparty or access risk."
        },
        sources: [{ title: "1609 De Wisselbank", publisher: "Amsterdam City Archives", url: "https://www.amsterdam.nl/stadsarchief/canon-amsterdam-2008/1609-wisselbank/", claim: "The city archive describes the bank's 1609 founding, coin valuation, account transfers, and required settlement of bills of exchange through the institution.", kind: "history" }],
        confidence: "high"
      },
      {
        id: "amsterdam-exchange-logistics",
        destination: "Amsterdam Exchange and nearby warehouses (present-day Netherlands)",
        title: "Book the cargo space before promising delivery",
        action: "Case evidence: Amsterdam's 1611 Exchange concentrated merchandise trading, ship-space arrangements, credit, payments, warehouse rental, and hired handling labor. Inference: match a confirmed owner of ordinary lawful goods with documented storage and cargo space, charging only for the completed coordination. Verify every provider instead of assuming exchange access guarantees performance.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["A recognized client, permission to conduct business, and providers willing to confirm their terms.", "Cargo documents, an agreed loading date, and a witnessed fee arrangement."],
        exitSignal: "Collect after storage and ship space are confirmed in writing; cancel before taking custody if any provider withdraws.",
        payoff: { label: "Possible coordination income with limited inventory exposure", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "A missed sailing can create storage charges and a failed delivery." }, { kind: "legal", detail: "Established brokers or exchange rules may exclude a newcomer." }],
        lesson: {
          concept: "Operational dependencies",
          prompt: "A buyer and seller agree, but no vessel space is booked. Is the sale complete?",
          choices: [
            { label: "No; delivery capacity is still a dependency", consequence: "You expose the missing step before goods and money are committed.", correct: true },
            { label: "Yes; agreement makes transport automatic", consequence: "The cargo can miss its market even though both parties meant well.", correct: false }
          ],
          explanation: "A commercial chain is only as executable as its unresolved logistical step."
        },
        sources: [{ title: "1611 The Exchange", publisher: "Amsterdam City Archives", url: "https://www.amsterdam.nl/stadsarchief/canon/windows/11/", claim: "The city archive describes Amsterdam's 1611 Exchange as a place to trade merchandise, arrange ship space, obtain credit, hire warehouse space, and engage handlers.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Coordinate only peaceful, traceable goods and freely contracted labor; exclude colonial-company cargo and human trafficking."
      }
    ]
  },
  {
    id: "shipping-information-and-insurance",
    window: windows[16],
    opportunities: [
      {
        id: "lloyds-shipping-intelligence",
        destination: "Edward Lloyd's Coffee House, London (England)",
        title: "Sell verified shipping intelligence, not a sea gamble",
        action: "Case evidence: by 1688 Lloyd's coffee house drew shipowners and captains because it specialized in shipping information. Inference: with permission, compile public arrival, departure, and vessel-condition reports for a peaceful merchant and charge a stated subscription or delivery fee. Keep observations separate from predictions.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Entry to the coffee-house information network and sources willing to be identified.", "A subscribing client, dated notes, and no claim to privileged or confidential records."],
        exitSignal: "Deliver each verified report and collect the agreed fee; suspend service when reports cannot be corroborated.",
        payoff: { label: "Possible recurring information-service income", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "Stale or false vessel news can cause a client's costly decision." }, { kind: "legal", detail: "A newcomer may be denied access or accused of misrepresenting a report." }],
        lesson: {
          concept: "Evidence and forecast",
          prompt: "A captain reports that a ship arrived. What can you responsibly sell?",
          choices: [
            { label: "The dated arrival report and its source", consequence: "The client can judge a documented fact.", correct: true },
            { label: "A guarantee that the next voyage will arrive", consequence: "You turn past evidence into an unsupported promise.", correct: false }
          ],
          explanation: "Good intelligence records what is known and leaves uncertainty visible."
        },
        sources: [{ title: "Coffee and commerce 1652-1811", publisher: "Lloyd's", url: "https://www.lloyds.com/about-lloyds/history/coffee-and-commerce", claim: "Lloyd's records its first mention in 1688 and describes the coffee house as a gathering place for shipowners and captains specializing in shipping information.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Report peaceful civilian shipping only; exclude slave voyages, privateering, colonial seizures, and wartime cargo."
      },
      {
        id: "lloyds-cargo-insurance",
        destination: "London marine-insurance market (England)",
        title: "Insure one lawful cargo before it sails",
        action: "Case evidence: at Lloyd's coffee house, individual underwriters sold insurance to shipowners against a vessel not returning. Inference: ask a recognized broker to place coverage for a small, peaceful, traceable cargo, disclose the ship's condition, and compare the premium with the loss you can bear. Do not pretend that a policy or underwriting seat is automatically available.",
        category: "security",
        capitalTier: "working",
        access: ["A broker and underwriter willing to accept the owner, vessel, route, and cargo.", "Insurable ownership, an honestly disclosed vessel condition, and funds for the quoted premium."],
        exitSignal: "Close the trade on delivery, or submit a truthful claim under the policy terms after a covered loss; do not renew if the premium defeats the trade.",
        payoff: { label: "Loss protection for an otherwise viable trade", basis: "qualitative" },
        risks: [{ kind: "legal", detail: "A nondisclosure or excluded peril can invalidate a claim." }, { kind: "custody", detail: "Insurance transfers specified risk; it does not prevent cargo loss or guarantee collection." }],
        lesson: {
          concept: "Risk transfer",
          prompt: "What does marine insurance change?",
          choices: [
            { label: "It transfers only the covered loss under stated terms", consequence: "You can size the remaining risk and premium honestly.", correct: true },
            { label: "It makes every voyage profitable", consequence: "Freight, prices, exclusions, and execution risk remain.", correct: false }
          ],
          explanation: "Insurance can cap a defined loss, but it cannot repair weak economics or undisclosed risk."
        },
        sources: [{ title: "Lloyd's Buildings", publisher: "Lloyd's", url: "https://www.lloyds.com/about-lloyds/history/lloyds-buildings", claim: "Lloyd's describes its 1688 coffee-house market as a place where shipowners obtained ship and cargo insurance from individual underwriters.", kind: "history" }],
        confidence: "contextual",
        ethicsNote: "Cover only voluntary civilian commerce; never insure slave trading, conquest, privateering, weapons, or seized cargo."
      }
    ]
  },
  {
    id: "navigation-and-bubble-discipline",
    window: windows[17],
    opportunities: [
      {
        id: "aire-calder-freight",
        destination: "Leeds and the Aire and Calder Navigation (England)",
        title: "Move cloth on the new water route",
        action: "Case evidence: after a 1699 Act, river improvements let water-borne goods reach Leeds; merchants could ship cloth through Hull to continental markets. Inference: in the operating years of this window, contract a small barge movement for a confirmed cloth merchant, include tolls and handling, and settle on documented delivery. The route is evidence of access, not a guaranteed margin.",
        category: "trade",
        capitalTier: "working",
        access: ["A willing cloth owner, lawful navigation access, and a carrier accepting the cargo and destination.", "Funds for tolls and handling plus a buyer or consignee named before departure."],
        exitSignal: "Settle immediately after accepted delivery; pause when tolls, delay, or road competition remove the surplus.",
        payoff: { label: "Possible freight or delivery margin", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "Flood, grounding, or damage can interrupt a waterborne delivery." }, { kind: "execution", detail: "Tolls and multiple handoffs can consume a thin freight spread." }],
        lesson: {
          concept: "Infrastructure economics",
          prompt: "A new navigation reaches the city. What must be true before you load cloth?",
          choices: [
            { label: "A consignee and full delivery cost are known", consequence: "The route becomes a testable service rather than a vague growth story.", correct: true },
            { label: "Any cargo will sell because the canal exists", consequence: "Infrastructure cannot supply a buyer or a positive net margin by itself.", correct: false }
          ],
          explanation: "Infrastructure lowers a bottleneck only when demand and complete costs line up."
        },
        sources: [{ title: "Aire and Calder Navigation Cut and Locks", publisher: "Historic England", url: "https://historicengland.org.uk/listing/the-list/list-entry/1375056", claim: "Historic England records the 1699 Navigation Act and explains that improvements enabled merchants to ship cloth from Leeds by water to Hull and continental markets.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Carry traceable civilian goods using paid labor; exclude military supply, coerced work, and colonial seizure."
      },
      {
        id: "south-sea-capital-preservation",
        destination: "London securities market, 1720 (England)",
        title: "Leave the South Sea frenzy before it becomes your plan",
        action: "Case evidence: South Sea Company shares rose dramatically in 1720 amid an investment frenzy, then crashed and ruined thousands. Inference: if you arrive holding the shares, sell through a lawful broker before the documented frenzy peaks; otherwise decline the promotion and keep capital in transparent, liquid form. Do not short, spread rumors, or manufacture demand.",
        category: "asset",
        capitalTier: "substantial",
        access: ["Lawful ownership or a broker who can sell an existing holding; no assumed right to borrow shares or trade on credit.", "A settlement plan and a non-speculative place to hold proceeds whose custody terms you understand."],
        exitSignal: "Exit when rapid price appreciation and public frenzy replace evidence of trading income; do not wait for the historical peak to the day.",
        payoff: { label: "Capital preserved by avoiding the documented collapse", basis: "qualitative" },
        risks: [{ kind: "liquidity", detail: "A rush for the exit can prevent sale near the last quoted price." }, { kind: "execution", detail: "Knowing the story does not guarantee a broker, buyer, settlement, or precise timing." }],
        lesson: {
          concept: "Bubble exits",
          prompt: "The share price soars while little trade occurs. What is the disciplined move?",
          choices: [
            { label: "Reduce or avoid the position", consequence: "You protect capital when price enthusiasm outruns the documented business.", correct: true },
            { label: "Borrow more because everyone is buying", consequence: "Leverage turns a reversal into forced loss.", correct: false }
          ],
          explanation: "A time traveler does not need to find the exact top. The useful lesson is to leave when the thesis becomes crowd excitement."
        },
        sources: [{ title: "South Sea Bubble: the first financial crisis in the Bank's history", publisher: "Bank of England", url: "https://www.bankofengland.co.uk/about/history", claim: "The Bank's history records the South Sea Company's limited trade, the dramatic 1720 stock rise and frenzy, and the crash that ruined thousands.", kind: "history" }],
        confidence: "high",
        ethicsNote: "This is an exit and avoidance lesson, not a short sale or a plan to deceive later buyers."
      }
    ]
  },
  {
    id: "canals-and-steam-service",
    window: windows[18],
    opportunities: [
      {
        id: "bridgewater-canal-carriage",
        destination: "Worsley to Manchester, Bridgewater Canal (England)",
        title: "Run a contracted load on the industrial canal",
        action: "Case evidence: the Bridgewater Canal's first section opened in 1761 to move coal from Worsley to Manchester and became a model for later industrial canals. Inference: after obtaining the owner's permission, quote carriage or handling for a confirmed lawful load using available boats and paid crews. Start with one delivery and count tolls, delay, and return capacity.",
        category: "enterprise",
        capitalTier: "working",
        access: ["A navigation permit or contract, a suitable boat, and a trained, freely paid crew.", "A named shipper and receiver plus funds for tolls, loading, and the return journey."],
        exitSignal: "Collect on accepted delivery; stop adding trips if empty returns, congestion, or damage erase the surplus.",
        payoff: { label: "Possible repeat carriage income", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "Grounding, collision, or cargo damage can interrupt settlement." }, { kind: "execution", detail: "A profitable outward load may be undermined by an empty return." }],
        lesson: {
          concept: "Capacity utilization",
          prompt: "Your outward boat is full. What still matters to the route economics?",
          choices: [
            { label: "The return load and complete round-trip cost", consequence: "You price the asset for the whole cycle.", correct: true },
            { label: "Only the outward invoice", consequence: "An empty return can consume the apparent gain.", correct: false }
          ],
          explanation: "Transport assets earn across cycles, not isolated invoices."
        },
        sources: [{ title: "Bridgewater Canal Pickering's Bridge", publisher: "Historic England", url: "https://historicengland.org.uk/listing/the-list/list-entry/1457565", claim: "Historic England dates the canal's authorization to 1759 and first opening to 1761, explaining that it was built to carry coal from Worsley to Manchester.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Operate civilian freight with paid crews; exclude coercive labor and military supply."
      },
      {
        id: "boulton-watt-installation",
        destination: "Birmingham industrial districts (England)",
        title: "Sell steam-engine installation skill",
        action: "Case evidence: Boulton and Watt's 1777 factory engine showed that complex steam equipment required site-specific sizing, locally made parts, installation oversight, and multi-year charges linked to usefulness. Inference: train under an authorized engineer and offer paid surveying, fitting, or maintenance on a consenting civilian factory installation. Do not copy patented work or claim engineering competence you cannot demonstrate.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Documented mechanical skill, an authorized employer or patent holder, and a factory that requests the work.", "Site access, locally compatible parts, and safety authority to stop a faulty installation."],
        exitSignal: "Collect by completed inspection or milestone; leave the job if safety, authorization, or payment terms fail.",
        payoff: { label: "Possible skilled installation and maintenance income", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "Pressurized machinery and moving parts can kill workers if fitted or operated incorrectly." }, { kind: "legal", detail: "Patent rights and contracts constrain who may build or service the engine." }],
        lesson: {
          concept: "Complementary services",
          prompt: "The engine is valuable but difficult to install. Where is the smaller opening?",
          choices: [
            { label: "Authorized fitting and maintenance", consequence: "You earn by solving a documented adoption bottleneck.", correct: true },
            { label: "Claim the design as your invention", consequence: "Theft and patent conflict replace a legitimate service.", correct: false }
          ],
          explanation: "A major technology creates demand for the skills and services required to make it work safely."
        },
        sources: [{ title: "James Watt, office equipment and high-street fashion", publisher: "Science Museum Group", url: "https://blog.sciencemuseum.org.uk/james-watt-high-street-fashion/", claim: "The museum describes the 1777 Old Bess engine, site-specific design and construction, installation oversight, and charges tied over time to fuel savings.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Serve voluntary civilian industry and insist on paid, safe work; exclude mines or factories using coerced labor."
      }
    ]
  }
];
