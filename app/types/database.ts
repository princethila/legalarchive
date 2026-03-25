

export interface Judgment {
  id: string;
  citation: string;
  case_name: string;
  judgement_date: string;
  coram: string;
  judgment_text: string;
  parties: {
    applicants?: string[];
    respondents?: string[];
  };
  court_name: string;
  view_count: number | null;
  sections: {
    facts?: string;
    issues?: string;
    conclusion?: string;
    principles?: string;
    application?: string;
  };
  tags: {
    level_1?: string;
    level_2?: string;
    level_3?: string[];
  };
  embedding?: number[];
}