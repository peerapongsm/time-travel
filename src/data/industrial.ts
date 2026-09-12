import type { Briefing } from "../domain";
import { windows } from "./windows";

export const industrial: Briefing[] = [
  {
    id: "programmable-textiles-and-steam-travel",
    window: windows[19],
    opportunities: [
      {
        id: "jacquard-card-service",
        destination: "Lyon textile workshops (France)",
        title: "Encode a confirmed pattern for the Jacquard loom",
        action: "Case evidence: Joseph-Marie Jacquard developed his loom in 1804-1805; punched cards controlled which warp threads rose and allowed detailed patterns with less supervision. Availability: Jacquard-specific card work starts only after the 1804-1805 development and only at an equipped workshop. Earlier arrival: learn lawful textile drafting and loom operation, but defer punched-card services until the mechanism and training are available. Inference: after training with an authorized workshop, punch and proof a card set for a buyer-approved pattern, charging by the accepted set. Do not copy another designer's pattern or promise that every workshop has adopted the new mechanism.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["A Jacquard-equipped workshop, training on its exact mechanism, and the owner's permission.", "A buyer-approved design, lawful rights to reproduce it, and card stock that matches the loom."],
        exitSignal: "Collect after a proof weave matches the approved sample; stop if repeated errors consume the fee.",
        payoff: { label: "Possible pattern-programming and proofing income", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "One incorrect hole can propagate a visible defect through the cloth." }, { kind: "legal", detail: "Workshop rules and design ownership can prevent an outsider from taking the job." }],
        lesson: {
          concept: "Reusable instructions",
          prompt: "What gives the punched-card set value?",
          choices: [
            { label: "It reproduces an approved pattern reliably", consequence: "The workshop can repeat verified instructions without resetting every thread by hand.", correct: true },
            { label: "It guarantees that every pattern will sell", consequence: "Production repeatability cannot create customer demand.", correct: false }
          ],
          explanation: "Encoding a process reduces repeated setup, but usefulness still depends on accuracy, permission, and demand."
        },
        sources: [{ title: "Jacquard Hand Loom", publisher: "Science Museum Group", url: "https://collection.sciencemuseumgroup.org.uk/objects/co8405056/jacquard-hand-loom-jacquard-hand-loom", claim: "The museum dates Jacquard's machine to 1804-1805 and explains how punched cards controlled warp threads to weave detailed patterns.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Work only in a voluntary, safely operated workshop and respect the designer's ownership of the pattern."
      },
      {
        id: "hudson-steamboat-wharf",
        destination: "New York-Albany Hudson route (United States)",
        title: "Make the scheduled steamboat stop work",
        action: "Case evidence: Fulton's 1807 Hudson voyage demonstrated commercially viable steam propulsion between New York and Albany. Availability: this steamboat-linked service starts only after the documented 1807 voyage and a scheduled operator accepts the work. Earlier arrival: learn wharf measures and prepare a manifest process, but defer steam-route bookings until commercial service and permission exist. Inference: with the operator and wharf owner's approval, coordinate passenger baggage or pre-booked parcels for one stop, using a manifest and a stated handling fee. Do not buy a vessel or assume access to Fulton's monopoly.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["A contract with the vessel operator and permission to work at the wharf.", "A sailing schedule, customer manifest, secure handoff point, and liability terms."],
        exitSignal: "Settle fees after each manifested handoff; suspend bookings when schedules or operator permission change.",
        payoff: { label: "Possible baggage and parcel-handling income", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "Early steam vessels and river travel exposed passengers, crew, and cargo to serious hazards." }, { kind: "legal", detail: "Route monopolies and wharf rules may exclude an independent service." }],
        lesson: {
          concept: "Platform complements",
          prompt: "A new transport service begins. What is the accessible opening?",
          choices: [
            { label: "An authorized service around each stop", consequence: "You support the route without assuming ownership of its scarce core asset.", correct: true },
            { label: "Claim the exclusive route for yourself", consequence: "Historical knowledge does not grant monopoly rights or a vessel.", correct: false }
          ],
          explanation: "New infrastructure can support small complementary services when operators and customers explicitly agree."
        },
        sources: [{ title: "From Man to Machine", publisher: "Smithsonian Institution", url: "https://americanexperience.si.edu/historical-eras/industrial-united-states/pair-iron-mine-storm-king/", claim: "The Smithsonian describes Fulton's 1807 Hudson voyage from New York to Albany as demonstrating the viability of steam propulsion.", kind: "history" }],
        confidence: "contextual",
        ethicsNote: "Handle civilian passengers and lawful parcels only; do not evade transport rules or carry contraband."
      }
    ]
  },
  {
    id: "canal-construction-services",
    window: windows[20],
    opportunities: [
      {
        id: "erie-canal-supplies",
        destination: "Erie Canal works near Rome, New York (United States)",
        title: "Fill one authorized canal-work order",
        action: "Case evidence: New York authorized Erie Canal construction in 1817 and work began that year on a large public waterway. Availability: canal-work supply begins only after authorization and construction start in 1817 and only through an approved buyer. Earlier arrival: identify voluntary suppliers and preserve working capital, but defer procurement until a contractor issues a lawful specification. Inference: supply an approved contractor with a pre-ordered batch of ordinary tools, food, or repair materials from voluntary producers, paid on inspection. Do not claim a public contract, land right, or engineering role without documents.",
        category: "enterprise",
        capitalTier: "working",
        access: ["A named contractor authorized to purchase the specified goods and a lawful local trading role.", "A written quantity and quality specification, paid carriers, and working funds until inspection."],
        exitSignal: "Receive payment on accepted delivery; stop when orders, authorization, or safe access to the works end.",
        payoff: { label: "Possible contract-supply margin", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "A rejected or late delivery can strand stock far from another buyer." }, { kind: "political", detail: "Public appropriations and route decisions can delay or cancel work." }],
        lesson: {
          concept: "Contracted demand",
          prompt: "Construction is approved. Should you stock a year's supplies immediately?",
          choices: [
            { label: "No; start with an authorized purchase order", consequence: "You match inventory to a buyer who can accept and pay.", correct: true },
            { label: "Yes; approval guarantees every supplier a sale", consequence: "A public project does not remove procurement and delivery risk.", correct: false }
          ],
          explanation: "Headline infrastructure spending becomes a business only through a specific, authorized order."
        },
        sources: [{ title: "History of the New York State Canals", publisher: "New York State Canal Corporation", url: "https://www.canals.ny.gov/About/History", claim: "The state canal history records legislative approval for the Erie Canal on April 15, 1817 and construction beginning that year.", kind: "history" }],
        confidence: "contextual",
        ethicsNote: "Use voluntary suppliers and paid labor; do not seize land, underpay workers, or exploit dependence on essential food."
      }
    ]
  },
  {
    id: "canal-and-railway-operations",
    window: windows[21],
    opportunities: [
      {
        id: "erie-canal-freight",
        destination: "Buffalo-Albany Erie Canal route (United States)",
        title: "Pre-sell a canal freight delivery",
        action: "Case evidence: the Erie Canal opened in 1825 and carried timber, farm products, manufactured goods, and merchandise between inland and coastal markets. Availability: through-freight service starts only after the canal opens in 1825 and the route is navigable. Earlier arrival: line up a conditional shipper, consignee, and cost sheet, but defer accepting cargo until the opening and carrier passage are confirmed. Inference: arrange one insured, lawful shipment for a named shipper and consignee, earning an agreed coordination fee or disclosed margin. Verify tolls, handling, season, and spoilage before accepting the cargo.",
        category: "trade",
        capitalTier: "working",
        access: ["Canal and carrier permission, a lawful cargo owner, and a consignee committed to receive the shipment.", "A manifest, accepted measures, toll funds, and a contingency for delay or spoilage."],
        exitSignal: "Settle after documented delivery; pause when closure, congestion, or full route cost removes the surplus.",
        payoff: { label: "Possible repeat freight margin or coordination fee", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "Weather, lock failures, and water damage can delay or destroy cargo." }, { kind: "liquidity", detail: "Perishable or destination-specific goods may have no alternative buyer after delay." }],
        lesson: {
          concept: "Pre-sold logistics",
          prompt: "Which shipment best controls inventory risk?",
          choices: [
            { label: "A manifested load with a named consignee", consequence: "Demand and delivery terms are known before capital leaves.", correct: true },
            { label: "Any cheap goods sent west", consequence: "The canal supplies a route, not a guaranteed destination buyer.", correct: false }
          ],
          explanation: "Transport access is most useful when both ends of the transaction are defined."
        },
        sources: [{ title: "Opening of the Erie Canal", publisher: "Library of Congress", url: "https://guides.loc.gov/this-month-in-business-history/october/opening-erie-canal", claim: "The Library dates the canal's opening to 1825 and identifies timber, agricultural products, merchandise, and manufactured goods among its cargoes.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Carry voluntarily produced, lawfully owned goods; exclude trafficking, dispossession, and military supply."
      },
      {
        id: "stockton-rail-maintenance",
        destination: "Stockton and Darlington Railway, County Durham (England)",
        title: "Maintain wagons on the first steam public railway",
        action: "Case evidence: the Stockton and Darlington Railway opened in 1825 to lower coal-carriage costs, employed a locomotive foreman, and expanded wagon construction. Availability: railway-specific maintenance starts only after the 1825 opening and an authorized employer has equipment in service. Earlier arrival: build general mechanical skill and seek documented hiring terms, but defer railway work until the line and safe equipment access exist. Inference: if hired by the company or an authorized user, inspect and repair civilian wagons for an agreed wage or fee. Do not assume track access, shares, or permission to operate a locomotive.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Demonstrable mechanical skill and a contract under the railway's operating rules.", "Approved tools, safe access to stopped equipment, and a supervisor authorized to accept the repair."],
        exitSignal: "Collect by shift or accepted repair; stop work when equipment cannot be isolated or authority is unclear.",
        payoff: { label: "Possible skilled maintenance income", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "Moving wagons, steam machinery, and heavy components can cause fatal injury." }, { kind: "execution", detail: "A poor repair can fail in service and create liability." }],
        lesson: {
          concept: "Adoption support",
          prompt: "A railway opens with unfamiliar machinery. What recurring need follows?",
          choices: [
            { label: "Authorized inspection and maintenance", consequence: "Reliable operation depends on skilled work after the opening ceremony.", correct: true },
            { label: "Unauthorized locomotive trials", consequence: "Novelty does not excuse unsafe or unapproved operation.", correct: false }
          ],
          explanation: "New capital equipment creates durable demand for safe operation and repair."
        },
        sources: [{ title: "Stockton & Darlington Railway Co", publisher: "Science Museum Group", url: "https://collection.sciencemuseumgroup.org.uk/people/ap46/stockton-darlington-railway-co", claim: "The museum dates the steam-operated public railway to 1825, states its coal-carriage purpose, and records locomotive supervision and later wagon construction.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Work only under safety authority and for civilian transport; reject coerced labor or dangerous shortcuts."
      }
    ]
  },
  {
    id: "railway-telegraph-operations",
    window: windows[22],
    opportunities: [
      {
        id: "railway-telegraph-service",
        destination: "Great Western Railway telegraph, London-West Drayton (England)",
        title: "Train for the railway's new message system",
        action: "Case evidence: Cooke and Wheatstone's 1837 five-needle telegraph led to a public railway telegraph service in 1839. Availability: paid work on the cited public line starts only when the service begins in 1839 and an employer hires you. Earlier arrival: study literacy, signaling, and lawful railway procedure, but defer telegraph operation until the public service and authorized training exist. Inference: after formal instruction and hiring, operate, transcribe, or maintain the authorized line, charging only the agreed wage or service fee. Do not intercept messages, invent priority traffic, or assume employment from technical knowledge alone.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Operator training, railway authorization, and literacy in the line's procedures.", "Access to approved instruments and a clear rule for message custody and delivery."],
        exitSignal: "Collect by shift or accepted maintenance task; leave when authorization or message security cannot be maintained.",
        payoff: { label: "Possible skilled communications income", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "A mistranscribed signal can disrupt railway operations or harm people." }, { kind: "legal", detail: "Messages and equipment are controlled; unauthorized use may be criminal." }],
        lesson: {
          concept: "Network reliability",
          prompt: "What is the operator's first obligation on a fast communications line?",
          choices: [
            { label: "Transmit the authorized message accurately", consequence: "The network's value depends on trusted execution.", correct: true },
            { label: "Rewrite it to sound more urgent", consequence: "Speed magnifies the harm of an unauthorized change.", correct: false }
          ],
          explanation: "A communication network creates value only when users can trust its operators and records."
        },
        sources: [{ title: "Cooke and Wheatstone five-needle telegraph", publisher: "Science Museum Group", url: "https://collection.sciencemuseumgroup.org.uk/objects/co32899/cooke-and-wheatstone-five-needle-telegraph", claim: "The museum dates the instrument to 1837 and records the first public telegraph service in 1839 alongside the Great Western Railway.", kind: "history" }],
        confidence: "high",
        ethicsNote: "Protect message confidentiality and serve civilian transport; do not enable surveillance, violence, or market manipulation."
      }
    ]
  },
  {
    id: "migration-logistics-and-railway-mania",
    window: windows[23],
    opportunities: [
      {
        id: "gold-rush-logistics",
        destination: "Missouri River outfitting towns, 1849 (United States)",
        title: "Sell a bounded trail service, not a gold dream",
        action: "Case evidence: the 1849 migration created customers for commercial wagon services, baggage hauling, food, repairs, and experienced guides; an ambitious Pioneer Line failed after overloading and using unsuitable animals. Availability: this documented migration-service demand applies in 1849 and only where willing travelers request a safe service. Earlier arrival: train in repair or provisioning and keep equipment local, but defer trail-specific commitments until customers, route conditions, and consent are present. Inference: offer one inspected repair, meal, or modest freight delivery to a willing traveler at an agreed price, and refuse unsafe loads. Do not prospect, claim Indigenous land, or promise arrival times you cannot control.",
        category: "enterprise",
        capitalTier: "working",
        access: ["Local permission, paid staff, and demonstrable skill for the specific service.", "An inspected load, suitable animals or tools, a written price, and the customer's informed consent."],
        exitSignal: "Settle at the completed repair or supply handoff; stop before weather or route conditions make the work unsafe.",
        payoff: { label: "Possible service income without mining exposure", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "Disease, weather, water shortages, and animal failure made the trail dangerous." }, { kind: "execution", detail: "Overloading or overpromising can turn a service into a stranded liability." }],
        lesson: {
          concept: "Boomtown services",
          prompt: "Where is the controlled opportunity during a rush?",
          choices: [
            { label: "A small service with inspected capacity", consequence: "You earn from a specific need while limiting exposure to mining luck.", correct: true },
            { label: "A guaranteed fast passage for every customer", consequence: "The historical failure shows how promises can outrun animals and logistics.", correct: false }
          ],
          explanation: "A rush creates real demand, but disciplined capacity matters more than a grand promise."
        },
        sources: [{ title: "The Pioneer Line to California: An Adventure in Transportation", publisher: "U.S. National Park Service", url: "https://home.nps.gov/articles/ntir_pioneer-line-to-california-an-adventure-in-transportation.htm", claim: "The NPS documents 1849 demand for commercial trail transport and explains how one line's unsuitable animals and overloaded wagons undermined its plan.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Serve voluntary travelers without facilitating dispossession; respect Indigenous land and water and do not manufacture scarcity."
      },
      {
        id: "railway-mania-exit",
        destination: "British railway-share market, 1840s (United Kingdom)",
        title: "Refuse the late railway subscription",
        action: "Case evidence: railway speculation peaked in the mid-1840s, many subscribers committed after tiny deposits, and share prices later fell with fortunes lost. Availability: this specific exit warning becomes relevant as token-deposit subscriptions expand toward the mid-1840s peak. Earlier arrival: keep capital liquid, reject commitments whose full calls cannot be funded, and do not buy merely to sell later. Inference: sell any lawfully owned speculative subscription before unpaid calls exceed your liquid capital, or decline new issues whose full commitment you cannot fund. Do not short, spread rumors, or rely on selling to a greater fool.",
        category: "asset",
        capitalTier: "substantial",
        access: ["A lawful holding or a broker able to settle its sale; no assumed access to borrowed shares.", "A complete schedule of future capital calls and enough liquidity to meet obligations until exit."],
        exitSignal: "Exit when subscriptions depend on token deposits and buyers cannot fund the remaining calls; accept a conservative early exit rather than chasing the exact peak.",
        payoff: { label: "Capital preserved by avoiding late-stage railway speculation", basis: "qualitative" },
        risks: [{ kind: "liquidity", detail: "Falling shares and capital calls can trap a subscriber before a sale settles." }, { kind: "execution", detail: "Historical timing does not guarantee a willing buyer at the quoted price." }],
        lesson: {
          concept: "Hidden leverage",
          prompt: "A share requires only a small deposit today. What must you count?",
          choices: [
            { label: "The full future capital commitment", consequence: "You see the leverage hidden behind the small entry payment.", correct: true },
            { label: "Only the deposit", consequence: "Later calls can force a sale at the worst time.", correct: false }
          ],
          explanation: "A small initial payment can conceal a large obligation. Bubble discipline starts with the full liability."
        },
        sources: [{ title: "Parliamentary papers and Railway Mania", publisher: "National Railway Museum", url: "https://blog.railwaymuseum.org.uk/parliamentary-papers-and-railway-mania/", claim: "The museum describes the 1840s railway-share frenzy, token deposits, underfunded subscribers, the 1846 peak in schemes, and subsequent losses.", kind: "history" }],
        confidence: "high",
        ethicsNote: "This is a deleveraging and avoidance lesson; it excludes short selling, deception, and manipulation."
      }
    ]
  },
  {
    id: "mechanized-sewing-services",
    window: windows[24],
    opportunities: [
      {
        id: "sewing-machine-service",
        destination: "Boston and New York garment workshops (United States)",
        title: "Install and maintain licensed sewing machines",
        action: "Case evidence: Singer's 1851 commercial machine was built for manufacturing trades. Availability: this machine-specific service starts only after the documented 1851 model is available and a lawful workshop requests support. Earlier arrival: build general sewing-machine repair skill, but defer Singer-specific fitting until the machine, compatible parts, and authorization exist. Inference: with manufacturer authorization, train operators, fit machines, and provide maintenance to a voluntary workshop for a clear fee. Do not copy patented mechanisms or claim that productivity automatically raised workers' pay.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Mechanical competence, manufacturer or patent-license authorization, and a workshop requesting service.", "Safe shutdown procedures, compatible parts, and a written responsibility for rejected repairs."],
        exitSignal: "Collect after the machine passes an agreed stitch test; stop if unsafe conditions or licensing disputes remain.",
        payoff: { label: "Possible installation and maintenance income", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "Needles, belts, and moving mechanisms can injure operators and technicians." }, { kind: "legal", detail: "Overlapping patents can make unlicensed manufacture or modification costly." }],
        lesson: {
          concept: "Technology complements",
          prompt: "Patented machines spread through workshops. Which service remains legitimate?",
          choices: [
            { label: "Authorized training and maintenance", consequence: "You help customers use purchased equipment without taking the invention.", correct: true },
            { label: "Clone the protected machine", consequence: "The plan substitutes infringement for a service business.", correct: false }
          ],
          explanation: "Adoption creates demand around a product, but rights and worker safety remain real constraints."
        },
        sources: [{ title: "1851 - Isaac Singer's Sewing Machine Patent Model", publisher: "National Museum of American History", url: "https://americanhistory.si.edu/collections/object/nmah_1071133", claim: "The Smithsonian describes Singer's 1851 patent and commercial machine, including its workshop manufacture and design for manufacturing trades.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Serve workshops using voluntary, fairly paid labor; productivity is not permission to impose unsafe pace or suppress wages."
      }
    ]
  },
  {
    id: "global-communications-and-steel",
    window: windows[25],
    opportunities: [
      {
        id: "atlantic-cable-messages",
        destination: "Heart's Content cable station, Newfoundland (present-day Canada)",
        title: "Operate the permanent transatlantic message link",
        action: "Case evidence: the successful 1866 transatlantic cable cut message time between Europe and North America from weeks to hours. Availability: work on the permanent link starts only after the successful 1866 cable is operating and the company hires you. Earlier arrival: develop authorized land-telegraph accuracy and confidentiality skills, but defer transatlantic message work until the cable service exists. Inference: after operator training and company hiring, transmit or reconcile paid civilian messages under the station's procedures. Charge only approved tariffs or wages and never trade on message contents.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Company employment, telegraph competence, and authorization to handle the specific traffic.", "A custody log, tariff schedule, and strict confidentiality for every message."],
        exitSignal: "Reconcile the shift's messages and payments; leave the role if accuracy or confidentiality cannot be maintained.",
        payoff: { label: "Possible skilled network-operation income", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "Signal errors can alter high-value commercial instructions." }, { kind: "legal", detail: "Misuse or disclosure of entrusted messages can create liability and dismissal." }],
        lesson: {
          concept: "Information latency",
          prompt: "What changes when a message takes hours instead of weeks?",
          choices: [
            { label: "Information becomes actionable sooner", consequence: "Faster coordination is valuable if the message remains accurate and confidential.", correct: true },
            { label: "All business risk disappears", consequence: "Speed cannot guarantee prices, counterparties, or execution.", correct: false }
          ],
          explanation: "Reducing latency improves coordination while increasing the importance of trusted operators."
        },
        sources: [{ title: "Revealing the real Cooke and Wheatstone telegraph dial", publisher: "Science Museum Group", url: "https://blog.sciencemuseum.org.uk/revealing-the-real-cooke-and-wheatstone-telegraph-dial/", claim: "The museum explains that the 1866 transatlantic cable reduced Europe-North America message delivery from weeks to hours.", kind: "history" }],
        confidence: "high",
        ethicsNote: "Handle civilian messages confidentially; exclude insider trading, surveillance, manipulation, and military targeting."
      },
      {
        id: "bessemer-tooling-service",
        destination: "Barrow-in-Furness steel works (England)",
        title: "Inspect tooling for large-scale steelmaking",
        action: "Case evidence: an 1865 Bessemer converter demonstrated a viable way to produce large quantities of affordable steel by blowing air through molten iron. Availability: this converter-linked inspection case starts only after the documented 1865 installation and a works adopts the process. Earlier arrival: train in lawful materials inspection away from live molten metal, but defer Bessemer-specific work until authorized equipment and standards exist. Inference: with metallurgical training and the works' authorization, inspect civilian rails or machine components against an agreed specification. Earn by accepted tests and reject work you cannot safely verify.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Relevant training, works authorization, and calibrated inspection tools.", "A civilian order with written material tolerances and a supervisor empowered to quarantine defects."],
        exitSignal: "Collect on accepted inspection lots; stop the assignment if heat, equipment, or management prevents safe testing.",
        payoff: { label: "Possible industrial inspection income", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "Molten metal and heavy equipment present extreme workplace hazards." }, { kind: "execution", detail: "A missed defect can cause component failure far from the works." }],
        lesson: {
          concept: "Quality assurance",
          prompt: "Mass production makes more steel available. What risk grows with volume?",
          choices: [
            { label: "A repeated defect reaches many customers", consequence: "Inspection and traceability become valuable complements to scale.", correct: true },
            { label: "Quality no longer matters", consequence: "Scale magnifies rather than removes a process error.", correct: false }
          ],
          explanation: "Industrial scale rewards repeatability, which makes defect detection commercially and physically important."
        },
        sources: [{ title: "Original pilot Bessemer converter, 1865", publisher: "Science Museum Group", url: "https://collection.sciencemuseumgroup.org.uk/objects/co19568/original-pilot-bessemer-converter-1865", claim: "The museum records an 1865 converter and describes the Bessemer process as the first viable method for producing steel in large quantities at a reasonable price.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Inspect civilian infrastructure and machinery only; exclude weapons, armor, and unsafe or coerced labor."
      }
    ]
  },
  {
    id: "suez-route-services",
    window: windows[26],
    opportunities: [
      {
        id: "suez-route-logistics",
        destination: "Port Said and Ismailia, Suez Canal (Egypt)",
        title: "Prepare a lawful civilian ship for canal transit",
        action: "Case evidence: the Suez Canal opened in 1869 as a navigation route between the Mediterranean and Red Sea, with defined dimensions and daytime-only navigation in its early years. Availability: the canal opened before this window, but the service exists only when canal authorities accept the vessel, cargo, and transit plan. Earlier arrival: prepare documents and verify dimensions without promising passage; defer the job if the route or appointment is not active. Inference: under canal and vessel authority, verify documents, provisions, draft, and a daylight transit slot for one civilian ship. Charge an agreed agency fee without claiming canal ownership or company shares.",
        category: "enterprise",
        capitalTier: "working",
        access: ["Appointment by the vessel owner and recognition by canal and port authorities.", "Accurate ship dimensions, lawful cargo documents, fees, provisions, and pilot arrangements."],
        exitSignal: "Settle the agency fee after cleared transit or documented cancellation; refuse ships or cargo that fail legal or safety checks.",
        payoff: { label: "Possible port-agency and documentation income", basis: "qualitative" },
        risks: [{ kind: "legal", detail: "Canal rules, pilotage, and cargo documentation can prevent transit." }, { kind: "physical", detail: "Grounding or collision can endanger crew, cargo, and the route." }],
        lesson: {
          concept: "Route constraints",
          prompt: "A shorter route has draft and daylight limits. What should the agent do?",
          choices: [
            { label: "Verify constraints before the ship enters", consequence: "The itinerary reflects the route that can actually be navigated.", correct: true },
            { label: "Assume every vessel fits", consequence: "A famous canal does not remove physical operating limits.", correct: false }
          ],
          explanation: "Infrastructure creates value through rules and capacity, not merely a line on a map."
        },
        sources: [{ title: "Canal History", publisher: "Suez Canal Authority", url: "https://www.suezcanal.gov.eg/English/About/SuezCanal/Pages/CanalHistory.aspx", claim: "The Authority dates inauguration to 17 November 1869 and describes the early canal's dimensions, concession, transit fees, and daylight navigation.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Serve lawful civilian shipping only and acknowledge that canal construction used Egyptian labor under harsh conditions; do not romanticize or reproduce exploitation."
      }
    ]
  },
  {
    id: "urban-electrification-services",
    window: windows[27],
    opportunities: [
      {
        id: "pearl-street-electrics",
        destination: "Pearl Street service district, New York City (United States)",
        title: "Install the safe last mile of electric service",
        action: "Case evidence: Pearl Street began commercial operation in 1882, supplying light and power to nearby customers through a system that included generation, distribution, meters, and components. Availability: customer work on this system starts only after commercial operation begins in 1882 and only inside its served area. Earlier arrival: train in electrical safety and document prospective premises, but defer installation until the utility authorizes the connection. Inference: after company training and licensing, install or inspect customer wiring and meters inside the documented service area. Work for an agreed fee and never energize an unapproved circuit.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Utility authorization, electrical training, and any required city or property permission.", "Approved components, isolation procedures, and a customer within the station's limited service radius."],
        exitSignal: "Collect after inspection and safe energization; stop immediately when isolation, grounding, or authority is uncertain.",
        payoff: { label: "Possible installation and inspection income", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "Early electrical systems can shock, burn, or start fires." }, { kind: "execution", detail: "Incompatible components or a customer outside the network can make the installation fail." }],
        lesson: {
          concept: "Systems innovation",
          prompt: "Why is the lamp alone not the whole opportunity?",
          choices: [
            { label: "Customers also need distribution, meters, and safe installation", consequence: "Complementary system work turns the device into a usable service.", correct: true },
            { label: "A bulb powers itself", consequence: "The product cannot work without the rest of the network.", correct: false }
          ],
          explanation: "A practical technology often depends on an ecosystem of installation, measurement, and maintenance."
        },
        sources: [{ title: "Lighting A Revolution: 19th Century Promotion", publisher: "National Museum of American History", url: "https://americanhistory.si.edu/lighting/scripts/s19c.htm", claim: "The Smithsonian dates Pearl Street operations to 1882 and describes the central station, distribution components, meters, generators, and manufacturing support.", kind: "history" }],
        confidence: "high",
        ethicsNote: "Follow safety rules and serve consenting customers; never bypass meters or energize unsafe premises."
      }
    ]
  },
  {
    id: "electric-urban-transit",
    window: windows[28],
    opportunities: [
      {
        id: "electric-tube-connections",
        destination: "City and South London Railway stations (England)",
        title: "Connect new Tube passengers to local businesses",
        action: "Case evidence: the City and South London Railway opened in 1890 as the world's first deep-level electric tube railway. Availability: station-linked deliveries start only after the railway's 1890 opening and after station and street permissions are granted. Earlier arrival: identify consenting nearby shops and draft conditional routes, but accept no tube-linked delivery before passenger service starts. Inference: with station and street-trading permission, run a pre-booked parcel handoff or wayfinding service between a station and nearby consenting shops. Charge per completed delivery and do not represent yourself as the railway.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Permission from the relevant station, street, and shop authorities.", "Named customers, a delivery log, safe carrying capacity, and clear branding as an independent service."],
        exitSignal: "Settle after each signed handoff; move or stop when station rules, passenger flow, or delivery costs change.",
        payoff: { label: "Possible last-mile service income", basis: "qualitative" },
        risks: [{ kind: "legal", detail: "Station and street rules may bar soliciting or parcel handling." }, { kind: "execution", detail: "Crowding, missed trains, or lost parcels can destroy trust." }],
        lesson: {
          concept: "Last-mile services",
          prompt: "A fast railway reaches the district. What gap can remain?",
          choices: [
            { label: "The final connection to a specific shop or recipient", consequence: "A bounded local service can complement the trunk route.", correct: true },
            { label: "The railway guarantees every doorstep delivery", consequence: "A station connection is not the customer's final handoff.", correct: false }
          ],
          explanation: "High-capacity transport can create smaller openings at its endpoints."
        },
        sources: [{ title: "Tube 160 Heritage Leaflet", publisher: "Transport for London Corporate Archives and London Transport Museum", url: "https://foi.tfl.gov.uk/FOI-0773-2324/TUBE160%20Heritage%20Leaflet.pdf", claim: "TfL's heritage timeline identifies the 1890 City and South London Railway as the first deep-level electric tube railway.", kind: "history" }],
        confidence: "contextual",
        ethicsNote: "Serve willing shops and passengers under station rules; do not obstruct access or impersonate staff."
      }
    ]
  },
  {
    id: "mass-market-motor-service",
    window: windows[29],
    opportunities: [
      {
        id: "model-t-service",
        destination: "Detroit and early Model T markets (United States)",
        title: "Service the durable mass-market car",
        action: "Case evidence: Ford made the Model T available in 1908 as an affordable, simple, durable vehicle and expanded production rapidly. Availability: Model T-specific service starts only after the car reaches customers in 1908 and only for a confirmed compatible vehicle. Earlier arrival: build general mechanical skill and supplier relationships, but defer Model T parts purchases and service claims until the vehicle is available. Inference: after manufacturer-recognized training, stock a small set of common lawful parts and provide inspected maintenance to confirmed owners. Start by order; do not claim a dealership, warranty authority, or future sales volume without a contract.",
        category: "enterprise",
        capitalTier: "working",
        access: ["Mechanical skill, lawful premises, and any manufacturer or local authorization needed for service.", "A parts supplier, customer work order, safe lifting tools, and a written limit on the repair."],
        exitSignal: "Collect after a documented road or bench test; stop stocking a part when demand or compatibility is uncertain.",
        payoff: { label: "Possible repair and parts income", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "Fuel, moving machinery, and road testing create fire and injury risks." }, { kind: "liquidity", detail: "Wrong or obsolete parts can trap working capital." }],
        lesson: {
          concept: "Installed-base services",
          prompt: "More standardized cars reach customers. What recurring need follows?",
          choices: [
            { label: "Compatible parts and reliable maintenance", consequence: "Use creates service demand after the original sale.", correct: true },
            { label: "Speculative inventory for every possible model", consequence: "Unverified variety ties up capital in parts that may never fit.", correct: false }
          ],
          explanation: "A growing installed base can support repeat service when stock follows actual customer needs."
        },
        sources: [{ title: "The Model T", publisher: "Ford Motor Company", url: "https://corporate.ford.com/articles/history/the-model-t.html", claim: "Ford describes the Model T as affordable, simple, and durable, and records its 1 October 1908 introduction and later mass production.", kind: "history" }],
        confidence: "contextual",
        ethicsNote: "Provide honest repairs and disclose parts provenance; never falsify warranties, odometers, or safety inspections."
      }
    ]
  },
  {
    id: "assembly-line-operations",
    window: windows[30],
    opportunities: [
      {
        id: "assembly-line-quality",
        destination: "Highland Park plant, Michigan (United States)",
        title: "Catch the missing part before it leaves the line",
        action: "Case evidence: Ford introduced the moving automobile assembly line at Highland Park in 1913; narrow timed tasks increased output but could leave cars missing parts and drove worker turnover. Availability: this line-specific quality role starts only after the 1913 process is operating and the plant hires and authorizes you. Earlier arrival: learn safe inspection and recordkeeping in lawful civilian work, but defer claims about this line until it exists. Inference: if lawfully hired, perform an agreed civilian quality check at one station and record defects before the vehicle advances. Do not assume employment, ownership, or authority to redesign the line.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Plant employment, task training, and supervisor authority to flag or stop a defective unit.", "A clear inspection standard, safe position, and a record connecting each defect to its unit."],
        exitSignal: "Collect the wage for completed shifts; leave or stop the station if pace prevents the required safety check.",
        payoff: { label: "Possible skilled factory income", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "A moving line can injure workers who cannot safely complete timed tasks." }, { kind: "execution", detail: "A rushed or vague check can let the same defect repeat at scale." }],
        lesson: {
          concept: "Process control",
          prompt: "What makes a fast assembly line financially durable?",
          choices: [
            { label: "A repeatable check that catches defects safely", consequence: "Speed produces saleable units instead of repeating errors.", correct: true },
            { label: "Maximum speed regardless of missing parts", consequence: "Rework, failures, and turnover can consume the apparent gain.", correct: false }
          ],
          explanation: "Throughput is useful only when quality and worker safety survive the process."
        },
        sources: [{ title: "The Moving Assembly Line and the Five-Dollar Workday", publisher: "Ford Motor Company", url: "https://corporate.ford.com/articles/history/moving-assembly-line.html", claim: "Ford dates its moving assembly line to 1913 and describes timed tasks, missing-part problems, worker turnover, and the later wage and shift response.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Take only voluntary civilian work and preserve the right to stop unsafe production; exclude wartime manufacturing."
      }
    ]
  },
  {
    id: "radio-growth-and-market-exit",
    window: windows[31],
    opportunities: [
      {
        id: "pre-crash-deleveraging",
        destination: "New York securities market, 1920s (United States)",
        title: "Leave leverage out of the roaring market",
        action: "Case evidence: ordinary investors used brokerage houses, investment trusts, and margin loans during the 1920s boom; prices peaked in 1929 and then collapsed. Availability: the unleveraged avoidance posture applies throughout this window, while any sale requires a lawful holding and a broker able to settle it. Earlier arrival: keep capital unleveraged and liquid rather than opening a position merely because the later crash is known. Inference: hold only lawfully purchased, unleveraged securities you understand and reduce exposure when margin-fueled speculation becomes the thesis, exiting before the documented crash rather than trying to identify its exact day. Never short, manipulate prices, or trade on confidential future knowledge.",
        category: "asset",
        capitalTier: "substantial",
        access: ["A lawful brokerage account and cash ownership of the securities; no assumed credit or borrowed-share access.", "Diversification, verified custody, and enough liquidity that no margin call can force the exit."],
        exitSignal: "Move to liquid, transparent holdings as borrowed speculation and extreme enthusiasm dominate; be fully out of leveraged positions before October 1929.",
        payoff: { label: "Capital preserved by avoiding the leveraged collapse", basis: "qualitative" },
        risks: [{ kind: "liquidity", detail: "A disorderly selloff can prevent execution near the last quotation." }, { kind: "execution", detail: "Diversification and foresight do not guarantee settlement, custody, or a precise top." }],
        lesson: {
          concept: "Leverage risk",
          prompt: "What turns a falling share into a forced sale?",
          choices: [
            { label: "Borrowed money secured by the share", consequence: "Falling collateral can trigger a margin call when selling is most damaging.", correct: true },
            { label: "Owning it outright with no deadline", consequence: "The price can still fall, but no lender automatically forces liquidation.", correct: false }
          ],
          explanation: "Leverage makes timing compulsory. The bubble lesson is to remove the forced-sale mechanism before the crowd turns."
        },
        sources: [{ title: "Stock Market Crash of 1929", publisher: "Federal Reserve History", url: "https://www.federalreservehistory.org/essays/stock-market-crash-of-1929", claim: "The Federal Reserve history documents widespread margin buying, the 1929 peak, forced financial stress, and the severe subsequent market decline.", kind: "history" }],
        confidence: "high",
        ethicsNote: "This is a conservative deleveraging and exit lesson; it excludes short selling, insider trading, rumor, and manipulation."
      },
      {
        id: "radio-repair-service",
        destination: "American towns with growing radio ownership (United States)",
        title: "Repair the radio already in the customer's home",
        action: "Case evidence: radios became a leading consumer product in the 1920s, and by decade's end an estimated large share of American families owned one. Availability: repair income exists only when a confirmed customer has a compatible radio and approved parts are obtainable. Earlier arrival: build electrical safety skill and take parts only against a work order; defer repair claims until an actual set is presented. Inference: after electrical training, diagnose and repair a confirmed customer's set with approved parts and an up-front estimate. Keep the business in service and lawful equipment; do not manipulate broadcasts or make hidden advertising claims.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Electrical competence, lawful premises, and the owner's consent to inspect the set.", "Compatible replacement parts, isolation tools, and a written price ceiling before repair."],
        exitSignal: "Collect after the owner accepts a safe reception test; return the set unrepaired if parts or authorization are unavailable.",
        payoff: { label: "Possible repair income from an installed consumer base", basis: "qualitative" },
        risks: [{ kind: "physical", detail: "Stored voltage and unsafe wiring can shock the repairer or start a fire." }, { kind: "execution", detail: "A guessed diagnosis can consume parts without restoring reception." }],
        lesson: {
          concept: "Installed-base demand",
          prompt: "Why start with a customer's broken set rather than a room full of new radios?",
          choices: [
            { label: "The work order proves a specific service need", consequence: "You buy parts for known demand and a known device.", correct: true },
            { label: "Every popular product guarantees inventory sales", consequence: "Popularity cannot prevent obsolete or unsold stock.", correct: false }
          ],
          explanation: "A large installed base can support low-capital maintenance when each job begins with a real customer."
        },
        sources: [{ title: "Merchandising and Advertising", publisher: "Library of Congress", url: "https://www.loc.gov/collections/calvin-coolidge-papers/articles-and-essays/introduction-to-prosperity-and-thrift/merchandising-and-advertising/", claim: "The Library identifies radios as a leading 1920s consumer product and reports broad household ownership by the end of the decade.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Repair only consenting customers' equipment and disclose parts and limits honestly; do not intercept private communications."
      }
    ]
  },
  {
    id: "small-saver-public-securities",
    window: windows[32],
    opportunities: [
      {
        id: "baby-bond-savings",
        destination: "Authorized U.S. savings-bond agent, 1935-1939 (United States)",
        title: "Use the registered small-saver bond as capital ballast",
        action: "Case evidence: the Treasury introduced registered, nonmarketable savings bonds in 1935 for small investors, with scheduled redemption values and replacement after loss. Availability: the cited U.S. savings bond is unavailable before 1935 and still requires an authorized agent to offer the current issue. Earlier arrival: keep near-term funds in a lawful liquid custody arrangement you understand and defer this bond purchase until the program begins and eligibility is confirmed. Inference: if an authorized agent confirms your eligibility, place only capital you can hold through the stated period into the current Series A-D issue and retain registration evidence. Treat it as conservative savings, not a liquid trading vehicle.",
        category: "security",
        capitalTier: "pocket",
        access: ["Eligibility accepted by an authorized issuing agent and funds with documented lawful ownership.", "The current series terms, registration details, and enough separate cash for near-term needs."],
        exitSignal: "Redeem only under the issue's published schedule or at planned maturity; keep emergency money outside the bond.",
        payoff: { label: "Scheduled public-security growth with reduced market-price exposure", basis: "qualitative" },
        risks: [{ kind: "liquidity", detail: "A nonmarketable bond cannot be sold instantly to another investor." }, { kind: "custody", detail: "Registration reduces physical-certificate risk but still requires accurate identity and redemption records." }],
        lesson: {
          concept: "Liquidity matching",
          prompt: "Which money belongs in a nonmarketable savings bond?",
          choices: [
            { label: "Funds not needed during the planned holding period", consequence: "The instrument's redemption schedule matches the saving goal.", correct: true },
            { label: "Tomorrow's rent and food money", consequence: "An early cash need can defeat the conservative plan.", correct: false }
          ],
          explanation: "A safer asset can still be a poor fit when its liquidity does not match the investor's obligations."
        },
        sources: [{ title: "The Beginning of the Savings Bonds Program", publisher: "U.S. TreasuryDirect", url: "https://www.treasurydirect.gov/research-center/history-of-savings-bond/beginnings-of-savings-bond/", claim: "TreasuryDirect explains that savings bonds began in 1935 as registered, nonmarketable small-investor securities with fixed redemption schedules and replacement protection.", kind: "history" }],
        confidence: "high",
        ethicsNote: "Purchase only if legally eligible and through an authorized agent; never forge identity or registration."
      }
    ]
  },
  {
    id: "postwar-solid-state-learning",
    window: windows[33],
    opportunities: [
      {
        id: "transistor-training",
        destination: "New York-New Jersey electronics corridor, 1948-1949 (United States)",
        title: "Learn the public transistor before selling a service",
        action: "Case evidence: Bell Labs demonstrated transistor action in 1947, publicly announced the device in 1948, and produced early units while the technology remained delicate. Availability: authorized work based on public transistor information starts only after the June 1948 public announcement. Earlier arrival: study public vacuum-tube and electronics fundamentals, but defer transistor-specific service and never seek unpublished Bell Labs access. Inference: only after the public announcement, obtain lawful technical training and offer authorized bench testing or documentation to a civilian electronics employer. Do not assume Bell Labs access, steal unpublished research, or promise an immediate mass market.",
        category: "enterprise",
        capitalTier: "pocket",
        access: ["Public technical material, relevant electronics skill, and employment or supplier authorization.", "Lawfully obtained components, calibrated test equipment, and a civilian specification for the bench task."],
        exitSignal: "Collect on accepted test records or completed training work; stop if the device, rights, or specification cannot be verified.",
        payoff: { label: "Possible early technical-service income and portable skill", basis: "qualitative" },
        risks: [{ kind: "execution", detail: "Early point-contact devices were delicate and inconsistent, so a failed prototype may not diagnose cleanly." }, { kind: "legal", detail: "Patents, laboratory confidentiality, and employer rules limit access and reuse." }],
        lesson: {
          concept: "Frontier technology",
          prompt: "A breakthrough has just been announced. What is the credible first move?",
          choices: [
            { label: "Train and test under authorized access", consequence: "You build useful skill without assuming a mature product or stolen knowledge.", correct: true },
            { label: "Promise a global transistor business immediately", consequence: "The device is early, delicate, and controlled by rights and know-how you do not possess.", correct: false }
          ],
          explanation: "At a technology frontier, learning and reliable testing are more credible than pretending the future arrived fully formed."
        },
        sources: [{ title: "1947: Invention of the Point-Contact Transistor", publisher: "Computer History Museum", url: "https://www.computerhistory.org/siliconengine/invention-of-the-point-contact-transistor/", claim: "The museum documents the December 1947 device, the June 1948 public announcement, its delicate construction, and early production.", kind: "history" }],
        confidence: "medium",
        ethicsNote: "Use only public or licensed knowledge for civilian electronics; exclude military work, espionage, and patent theft."
      }
    ]
  }
];
