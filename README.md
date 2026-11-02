# Mecara – web (www.mecara.app)

Mesnica Mecara, Kralja Tomislava 7 (centar DOC, Lapad), Dubrovnik.

## Kako je složeno
- `build/content.mjs` – **svi tekstovi (HR/EN), proizvodi, radno vrijeme i prekidači** (`SITE`)
- `build/build.mjs` – generator: `node build/build.mjs` napravi sve stranice u `public/`
- `public/` – gotove stranice, CSS, JS, fotke, fontovi (bez vanjskih servisa)
- `src/worker.js` – preusmjerava `mecara.app` i `http` na `https://www.mecara.app`
- `public/_headers` – sigurnosna zaglavlja (CSP, HSTS…)

## Stranice
| HR | EN |
|---|---|
| / | /en/ |
| /ponuda/ | /en/meat-and-deli/ |
| /odlezani-steakovi/ | /en/dry-aged-steaks/ |
| /meso-za-rostilj/ | /en/bbq-meat/ |
| /o-nama/ | /en/about/ |
| /kontakt/ | /en/contact/ |

## Prije prave objave (u `SITE`)
1. `whatsapp`, `phone`, `email`, `legalName`, `oib` – upisati potvrđene podatke
2. `enquiryLive: true` – tek kad osoblje obrađuje upite
3. potvrditi `hours` i blagdane
4. `wip: false` – makne traku i noindex (i ukloniti `X-Robots-Tag` iz `public/_headers`)
5. pokrenuti `node build/build.mjs`, commit, push → Cloudflare objavi sam

Vile i jahte, radionice, roštilj planer i cijene nisu objavljeni dok ih vlasnik ne potvrdi (stari prototip je u povijesti gita).
