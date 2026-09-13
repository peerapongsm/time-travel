const sections = [
  ["Time representation", "The catalog stores years as astronomical integers so dates sort and compare cleanly: internal year 0 means 1 BCE. The interface always uses civil BCE and CE labels, and civil year zero is never valid."],
  ["Timeline assumption", "This is a closed-timeline historical course. It treats documented outcomes as hindsight for a traveler while keeping the historical constraints, uncertainty, and lawful access conditions visible."],
  ["Capital and wealth", "Pocket, working, substantial, and patron capital are era-relative editorial tiers, not modern-dollar conversions. Wealth means a change relative to the traveler's starting position and the local economy at the stated exit."],
  ["Sources and payoffs", "The source hierarchy favors primary records, museums, archives, universities, governments, exchanges, central banks, and company filings. A numeric payoff appears only when comparable entry and exit evidence is cited; otherwise the payoff stays qualitative. Historical fact, estimate, and editorial inference are kept distinct."],
  ["Limits and ethics", "Historical betting appears, if at all, only as retrospective education. The course gives no current or future gambling recommendation, odds, or links, and an unsourced contemporary payout remains unquantified. It excludes exploitation, fraud, theft, violence, market manipulation, and profit that primarily harms people."],
  ["Hindsight boundary", "The 2026 briefing is the evidence boundary. It does not predict markets, events, or payoffs after 2026, and past outcomes are not a promise of future results."]
] as const;

export const renderMethodology = (): HTMLElement => {
  const article = document.createElement("article");
  article.className = "methodology";
  const title = document.createElement("h1");
  title.textContent = "Methodology and limits";
  const intro = document.createElement("p");
  intro.textContent = "How this historical finance course represents time, evidence, uncertainty, and ethical limits.";
  article.append(title, intro);
  sections.forEach(([heading, copy]) => {
    const section = document.createElement("section");
    const title = document.createElement("h2");
    title.textContent = heading;
    const paragraph = document.createElement("p");
    paragraph.textContent = copy;
    section.append(title, paragraph);
    article.append(section);
  });
  return article;
};
