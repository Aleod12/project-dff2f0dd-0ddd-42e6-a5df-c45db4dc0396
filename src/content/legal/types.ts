/** Inline tokens inside any text: «{policyLink}», «{policyLinkWith}» (творительный падеж), «{offerLink}», «{consentLink}» become internal links; «[ЗАПОЛНИТЬ: …]» is highlighted. */
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; columns: string[]; rows: string[][] };

export type LegalSection = { id: string; heading: string; blocks: LegalBlock[] };

export type LegalDocKey = "privacy" | "consent" | "offer";

export type LegalDoc = {
  key: LegalDocKey;
  title: string;
  /** Optional line under the title. */
  subtitle?: string;
  updated: string;
  /** Muted paragraph above section 1. */
  intro?: string;
  sections: LegalSection[];
};
