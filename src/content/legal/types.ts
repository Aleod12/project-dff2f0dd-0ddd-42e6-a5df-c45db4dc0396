export type LegalDoc = {
  title: string;
  updated: string;
  sections: { id: string; heading: string; paragraphs: string[] }[];
};
