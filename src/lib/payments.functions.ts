import { createServerFn } from "@tanstack/react-start";
import { parseCurrency, type Currency } from "@/content/payments";

/**
 * Creates a payment at the provider and returns its payment page URL.
 * STUB — not connected yet.
 *
 * TODO when connecting Robokassa / YooKassa:
 * - Provider credentials only from Secrets (process.env inside the handler), never in code.
 * - Amount and currency are taken from payments.ts on the server; the client sends only "rub" | "eur".
 * - Fiscal receipt (54-ФЗ) with VAT 5% in the receipt items.
 * - Customer e-mail for the receipt is entered on the provider's page; we store no personal data.
 * - Payment is confirmed ONLY by the provider's server notification (Result URL / webhook)
 *   with signature check and idempotency — never by the /payment/success redirect.
 */
export const createPayment = createServerFn({ method: "POST" })
  .inputValidator((data: { currency: Currency }) => ({ currency: parseCurrency(data?.currency) }))
  .handler(async (): Promise<{ url: string }> => {
    throw new Error("Payment provider not configured");
  });
