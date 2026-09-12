export type Era = "BCE" | "CE";

export type HistoricalYear = number;

export type CivilYear = {
  year: number;
  era: Era;
};

export type Window = {
  start: HistoricalYear;
  end: HistoricalYear;
};

export type Source = {
  title: string;
  publisher: string;
  url: string;
  claim: string;
  kind: "history" | "price" | "mechanism" | "result" | "odds";
};

export type Risk = {
  kind: "physical" | "political" | "legal" | "custody" | "liquidity" | "execution";
  detail: string;
};

export type Lesson = {
  concept: string;
  prompt: string;
  choices: { label: string; consequence: string; correct: boolean }[];
  explanation: string;
};

export type Opportunity = {
  id: string;
  destination: string;
  title: string;
  action: string;
  category: "trade" | "land" | "enterprise" | "security" | "event" | "asset";
  capitalTier: "pocket" | "working" | "substantial" | "patron";
  access: string[];
  exitSignal: string;
  payoff: {
    label: string;
    multiple?: number;
    basis: "documented" | "estimated" | "qualitative";
  };
  risks: Risk[];
  lesson: Lesson;
  sources: Source[];
  confidence: "high" | "medium" | "contextual";
  ethicsNote?: string;
};

export type Briefing = {
  id: string;
  window: Window;
  opportunities: Opportunity[];
};
