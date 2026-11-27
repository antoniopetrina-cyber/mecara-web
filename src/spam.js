// Prepoznavanje reklamnih poruka poslanih kroz obrasce (katalozi, SEO ponude i slično).
// Takav zahtjev se tiho "prihvati", ali se ne sprema i ne šalje obavijest,
// da pošiljatelj ne bi znao da je blokiran pa promijenio tekst.

const BLOCKED_DOMAINS = [
  "touristfare.com",
  "touristfare",
];

const PROMO = [
  /\bcatalog(ue)?\b/i,
  /\blisted\b|\blisting\b/i,
  /\bcommission\b/i,
  /\breply with\b/i,
  /\bfree to (be|join|list)\b/i,
  /\bfollow(ing)?[ -]up\b/i,
  /\badd (you|your|it|[a-z0-9.-]+\.[a-z]{2,})\b.{0,20}\bto\b/i,
  /\b(seo|backlinks?|guest post|first page of google|rankings?|organic traffic)\b/i,
  /\b(web ?design|website design|marketing (services|agency)|lead generation)\b/i,
  /\b(crypto|bitcoin|forex|investment opportunity|loan offer)\b/i,
  /\bunsubscribe\b/i,
  /\b(sent you (an offer|a message)|contact form)\b/i,
  /\bpartnership (offer|proposal)\b/i,
];

const LINK = /(https?:\/\/|www\.)|\b[a-z0-9-]{2,}\.(com|net|org|io|app|info|biz|co|xyz|online|site|top|shop|store|link)\b/i;

export function spamScore(fields) {
  const str = (v) => (v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v));
  const entries = Object.entries(fields || {});
  const all = entries.map(([, v]) => str(v)).join(" \n ");
  const lower = all.toLowerCase();
  if (BLOCKED_DOMAINS.some((d) => lower.includes(d))) return 99;

  const text = entries.filter(([k]) => !/phone|telefon|mobitel|e-?mail|mail|website|url|source|lang|jezik|turnstile|token|csrf|ikey|request_id|^id$/i.test(k)).map(([, v]) => str(v)).join(" \n ");
  const phone = entries.filter(([k]) => /phone|telefon|mobitel/i.test(k)).map(([, v]) => str(v)).join("").replace(/\D/g, "");
  let score = 0;
  if (/(\d)\1{6,}/.test(phone) || /^\d{1,4}10{6,}$/.test(phone)) score += 2; // +387 100000000, 0000000…
  if (LINK.test(text)) score += 2;
  let hits = 0;
  for (const re of PROMO) if (re.test(text)) hits += 1;
  score += Math.min(hits, 3) * 2;
  return score;
}

export function isSpam(fields) {
  return spamScore(fields) >= 3;
}
