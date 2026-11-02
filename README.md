# Mecara – web aplikacija

Web stranica i aplikacija za narudžbe mesnice **Mecara**, Kralja Tomislava 7 (DOC), Dubrovnik.

## Što je unutra
- `public/index.html` – cijela stranica (komora, ponuda, roštilj planer, Villa & Yacht, tečajevi, narudžba preko WhatsAppa, HR/EN)
- `public/_headers` – sigurnosna zaglavlja za Cloudflare
- `wrangler.toml` – postavke za Cloudflare

## Objava na Cloudflare (jednom)
Cloudflare → Workers & Pages → Create → **Import a repository** → izaberi `mecara-web`
- Project name: `mecara-web`
- Build command: *(prazno)*
- Deploy command: `npx wrangler deploy`

Svaki novi commit na `main` automatski se objavi na `mecara-web.<tvoj-račun>.workers.dev`.

## Prije prave objave
- U `public/index.html` zamijeni `WA_NUMBER` pravim brojem
- Upiši prave cijene i proizvode (lista `P` i `CUTS` u skripti)
- Dodaj fotke i logo u `public/img/`
