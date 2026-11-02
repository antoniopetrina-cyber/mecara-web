// Generator statičkih stranica: node build/build.mjs  → piše HTML u public/
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, ROUTES, UI, CATS, PRODUCTS, CUTS, FAQ, META, ALT } from "./content.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const abs = p => SITE.host + p;
const money = (n, lang) => n.toLocaleString(lang === "hr" ? "hr-HR" : "en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const kgf = (n, lang) => n.toLocaleString(lang === "hr" ? "hr-HR" : "en-GB", { maximumFractionDigits: 2 }) + " kg";
const unitPrice = (u, lang) => u === "kg" ? "€/kg" : u === "g100" ? "€/100 g" : (lang === "hr" ? "€/kom" : "€/pc");
const V = Date.now().toString(36); // verzija za CSS/JS (osvježavanje predmemorije)

const PHOTOS = {
  interior: ["KKP4539", 1600, 1064], ageing: ["KKP4503", 1064, 1600], cutting: ["KKP4582", 1600, 1064],
  counter: ["KKP4545", 1600, 1064], marinated: ["KKP4551", 1600, 1064], marinated2: ["KKP4561", 1600, 1064],
  entrance: ["KKP4497", 1064, 1600], interior2: ["KKP4512", 1600, 1064], pantry: ["KKP4498", 1064, 1600],
  jars: ["KKP4591", 1600, 1064], shop: ["KKP4506", 1600, 1064],
};
function pic(key, alt, { cls = "ph", sizes = "(max-width: 760px) 100vw, 50vw", eager = false } = {}) {
  const [f, w, h] = PHOTOS[key]; const b = `/img/foto/${f}`;
  const load = eager ? `loading="eager" fetchpriority="high"` : `loading="lazy"`;
  return `<picture class="${cls}"><source type="image/webp" srcset="${b}-800.webp 800w, ${b}.webp 1600w" sizes="${sizes}"><img src="${b}-800.jpg" srcset="${b}-800.jpg 800w, ${b}.jpg 1600w" sizes="${sizes}" alt="${esc(alt)}" width="${w}" height="${h}" ${load} decoding="async"></picture>`;
}

function faqBlock(lang, keys) {
  return `<section class="block faq-block"><div class="wrap narrow">
  <h2>${esc(UI[lang].faqTitle)}</h2>
  <div class="faq">${keys.map(k => `<details><summary>${esc(FAQ[k][lang][0])}</summary><p>${esc(FAQ[k][lang][1])}</p></details>`).join("")}</div>
</div></section>`;
}

function crumbs(lang, page, title) {
  if (page === "home") return "";
  return `<nav class="crumbs wrap" aria-label="${esc(UI[lang].crumbs)}"><a href="${ROUTES.home[lang]}">${esc(UI[lang].home)}</a> <span aria-hidden="true">/</span> <span aria-current="page">${esc(title)}</span></nav>`;
}

function productList(lang, items) {
  const u = UI[lang];
  return `<ul class="prods">${items.map(p => `<li class="prod" data-id="${p.id}" data-unit="${p.unit}">
    <div class="prod-txt"><h4>${esc(p[lang].name)}</h4><p>${esc(p[lang].desc)}</p><div class="meta"><span class="pill">${esc(u.unit[p.unit])}</span><span class="pill num">${money(p.eur, lang)} ${unitPrice(p.unit, lang)}</span></div></div>
    <div class="prod-act">
      <div class="stepper" role="group" aria-label="${esc(u.qty)}: ${esc(p[lang].name)}"><button type="button" data-step="-1" aria-label="${esc(u.less)}">−</button><output aria-live="polite"></output><button type="button" data-step="1" aria-label="${esc(u.more)}">+</button></div>
      <button class="add" type="button" data-add="p" data-id="${p.id}">${esc(u.add)}</button>
    </div></li>`).join("")}</ul>`;
}

function cutCards(lang) {
  const u = UI[lang];
  return `<ul class="komora">${CUTS.map((c, i) => { const ready = c.day >= c.target;
    const tag = ready ? `<span class="tag ready">${esc(u.ready)}</span>` : `<span class="tag aging">${esc(u.inDays.replace("{n}", c.target - c.day))}</span>`;
    return `<li class="cut" data-cut="${c.id}"><canvas aria-hidden="true" data-seed="${i + 1}"></canvas><div class="body">
      <div class="row"><h3>${esc(c[lang][0])}</h3>${tag}</div>
      <div class="row muted meta-row"><span>${esc(c.sub[lang])}</span><span class="num">${kgf(c.kg, lang)}</span></div>
      <p class="cut-desc">${esc(c[lang][1])}</p>
      <div><div class="row mono muted days-row"><span>${c.day} / ${c.target} ${esc(u.days)}</span><span aria-hidden="true">#${String(i + 1).padStart(2, "0")}</span></div>
      <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${c.target}" aria-valuenow="${c.day}" aria-label="${esc(c[lang][0])}: ${c.day} / ${c.target} ${esc(u.days)}"><i data-pct="${Math.min(100, Math.round(c.day / c.target * 100))}"></i></div></div>
      <div class="row"><span class="price num">${c.eur} €/kg</span><b class="num">≈ ${money(c.eur * c.kg, lang)} €</b></div>
      <button class="btn small" type="button" data-add="cut" data-id="${c.id}">${esc(u.cutAdd)}</button>
    </div></li>`; }).join("")}</ul>`;
}
const KOMORA = {
  hr: ["Dry-age komora · uživo", "Svaki steak ima svoje ime i svoj broj dana", "Ovo nema nijedna mesnica u Dubrovniku: vidite točno koji komad visi u komori, koliko je težak i koliko je dana odležao. Rezervirate baš taj komad, a mi ga čuvamo za vas."],
  en: ["Dry-age room · live", "Every steak has a name and a day count", "No other butcher in Dubrovnik shows this: the exact piece hanging in the room, its weight and how many days it has aged. Reserve that piece and we keep it for you."],
};

function visitBlock(lang) {
  const u = UI[lang];
  const t = lang === "hr"
    ? ["Posjetite nas u Lapadu", "Mecara se nalazi u centru DOC, na adresi Kralja Tomislava 7 u Dubrovniku. Svratite po meso za današnji ručak, provjerite izbor steakova ili se raspitajte o ponudi za veće druženje."]
    : ["Visit our butcher shop in Lapad", "Find Mecara inside the DOC shopping centre at Kralja Tomislava 7, Dubrovnik. Stop by for your next meal, browse the steak selection or ask about meat for a larger gathering."];
  return `<section class="block" id="posjeti"><div class="wrap">
  <div class="sec-head"><div><h2>${esc(t[0])}</h2><p>${esc(t[1])}</p><p class="muted">${esc(u.parking)}</p></div>
  <div class="ctas"><a class="btn ghost" href="${esc(SITE.maps)}" target="_blank" rel="noopener noreferrer">${esc(u.directions)}</a>${SITE.phone ? `<a class="btn ghost" href="tel:${esc(SITE.phone.replace(/\s/g, ""))}">${esc(u.call)}: ${esc(SITE.phone)}</a>` : ""}</div></div>
  <div class="gallery">
    ${pic("entrance", ALT.entrance[lang], { sizes: "(max-width: 760px) 50vw, 25vw" })}
    ${pic("interior2", ALT.interior[lang], { sizes: "(max-width: 760px) 100vw, 50vw" })}
    ${pic("pantry", ALT.pantry[lang], { sizes: "(max-width: 760px) 50vw, 25vw" })}
    ${pic("jars", ALT.jars[lang], { sizes: "(max-width: 760px) 50vw, 25vw" })}
    ${pic("shop", ALT.shop[lang], { sizes: "(max-width: 760px) 50vw, 50vw" })}
  </div></div></section>`;
}

const enquiryCta = (lang, label) => `<a class="btn" href="${ROUTES.contact[lang]}" data-open-enquiry>${esc(label)}</a>`;

/* ------------------------------ stranice ------------------------------ */
const PAGES = {
  home(lang) {
    const u = UI[lang], hr = lang === "hr";
    const T = hr ? {
      eye: "Mecara · DOC, Lapad", h1a: "Vaša mesnica u Dubrovniku.", h1b: "Dobar obrok počinje dobrim komadom.",
      lead: "Birate meso za svakodnevni ručak, roštilj s društvom ili večeru uz steak? U Mecari u Lapadu pronađite svoj komad i pitajte nas kako ga pripremiti. Tu su i suhomesnati proizvodi, sirevi i dodaci za stol koji vrijedi okupiti.",
      b1: "Pogledajte ponudu", b2: "Pronađite nas u DOC-u",
      cookH: "Što danas pripremate?",
      cards: [["Za ručak","Od gulaša do pečenja, dobar izbor počinje pravim komadom. Recite nam što kuhate i za koliko osoba pa ćemo vam pomoći pri odabiru.", ROUTES.ponuda.hr+"#junetina"],
              ["Za roštilj","Ćevapi, burgeri, kobasice ili odresci: složite izbor prema društvu i načinu pripreme. Količinu prilagodite prilozima i apetitu gostiju.", ROUTES.bbq.hr],
              ["Za steak večeru","Pogledajte izbor odležanih steakova. Za konkretan rez, debljinu i raspoloživu težinu obratite se mesaru.", ROUTES.steak.hr],
              ["Za platu","Suhomesnati proizvodi, sirevi i nekoliko dobro odabranih dodataka dovoljni su za jednostavno posluženje. Pitajte što je trenutačno u ponudi.", ROUTES.ponuda.hr+"#suho"]],
      steakH: "Odležani steakovi, odabrani za vaš način pripreme",
      steakP: "Nije svaki steak isti. Rez, debljina i odležavanje utječu na izbor, a važno je i pripremate li ga na tavi ili roštilju. Recite nam kakvu večeru planirate i pomoći ćemo vam odabrati odgovarajući komad.",
      steakB: "Pogledajte odležane steakove", steakN: "Dostupnost, težinu i cijenu pojedinog komada provjerite prije dolaska.",
      bbqH: "Meso za roštilj bez nepotrebnog nagađanja",
      bbqP: "Pripremate ručak za obitelj ili veće druženje? Krenite od broja ljudi, odaberite nekoliko vrsta mesa i dodajte priloge koje volite. Za pomoć pri količini i izboru obratite se mesaru.",
      bbqB: "Pogledajte ponudu za roštilj",
      stepsH: "Od upita do preuzimanja",
      steps: [["Odaberite što trebate.","Navedite proizvode, okvirnu količinu i kako želite da meso bude narezano."],["Pričekajte potvrdu.","Provjeravamo dostupnost i dogovaramo termin. Ako nešto nije dostupno, predložit ćemo zamjenu."],["Preuzmite u Mecari.","Dođite u potvrđenom terminu na Kralja Tomislava 7, u centru DOC u Lapadu."]],
      stepsN: "Slanje upita nije potvrda narudžbe. Kod proizvoda koji se prodaju po težini konačan iznos ovisi o stvarno izvaganoj količini.",
      askH: "Razgovarajte s mesarom", askP: "Ne morate znati naziv svakog reza. Dovoljno je reći što želite pripremiti, koliko ljudi dolazi i kakvu opremu imate. Zajedno ćemo lakše doći do dobrog izbora.", askB: "Pošaljite upit Mecari",
    } : {
      eye: "Mecara · DOC shopping centre, Lapad", h1a: "Your butcher in Dubrovnik.", h1b: "A good meal starts with the right cut.",
      lead: "Cooking at your apartment, planning a barbecue or choosing a steak for dinner? Visit Mecara in Lapad for meat, advice on cuts and a selection of cured meats, cheeses and deli favourites.",
      b1: "Explore our selection", b2: "Find us in Lapad",
      cookH: "What are you cooking?",
      cards: [["Everyday meals","From a slow-cooked stew to a family roast, the right cut makes planning easier. Tell us what you are making and how many people you are cooking for.", ROUTES.ponuda.en+"#junetina"],
              ["Barbecue favourites","Choose from the available ćevapi, burgers, sausages and steaks. Build your selection around your guests, side dishes and the grill you will be using.", ROUTES.bbq.en],
              ["Steak night","Explore our dry-aged selection and ask about the cuts, thicknesses and weights currently available.", ROUTES.steak.en],
              ["Something to share","Put together a simple spread with cured meats, cheese and deli accompaniments. Ask us what is available today.", ROUTES.ponuda.en+"#suho"]],
      steakH: "Find the right dry-aged steak",
      steakP: "The cut, thickness and ageing all help shape your choice. Let us know whether you are using a frying pan or a barbecue and we can help you choose a steak for the meal you have in mind.",
      steakB: "Explore dry-aged steaks", steakN: "Please check availability, weight and price before visiting for a specific cut.",
      bbqH: "Plan your barbecue with less guesswork",
      bbqP: "Start with the number of guests, choose a few types of meat and allow for the side dishes you will serve. Ask the butcher for help choosing cuts and quantities.",
      bbqB: "Explore BBQ meat",
      stepsH: "How collection enquiries work",
      steps: [["Tell us what you need.","Choose your products and approximate quantities, and include any cutting requests."],["Wait for confirmation.","We check availability and agree a collection time. If an item is unavailable, we can discuss an alternative."],["Collect from Mecara.","Visit us at Kralja Tomislava 7, inside the DOC shopping centre in Lapad, at your confirmed time."]],
      stepsN: "Sending an enquiry does not confirm an order. For products sold by weight, the final amount depends on the actual quantity weighed.",
      askH: "Ask the butcher", askP: "You do not need to know every cut by name. Tell us what you want to cook, how many people are coming and what cooking equipment you have. We will help you choose.", askB: "Send Mecara an enquiry",
    };
    return `
<section class="hero">
  ${pic("interior", "", { cls: "hero-bg", sizes: "100vw", eager: true })}
  <div class="wrap">
    <div>
      <span class="mono eyebrow">${esc(T.eye)}</span>
      <h1>${esc(T.h1a)} <em class="copper-text">${esc(T.h1b)}</em></h1>
      <p class="lead">${esc(T.lead)}</p>
      <div class="ctas"><a class="btn" href="${ROUTES.ponuda[lang]}">${esc(T.b1)}</a><a class="btn ghost" href="#posjeti">${esc(T.b2)}</a></div>
    </div>
    <div class="facts">
      <div><span class="k">${esc(u.labels.now)}</span><span class="open-now"><i class="dot" id="open-dot" aria-hidden="true"></i><span id="open-txt" aria-live="polite">${esc(u.statusLoading)}</span></span></div>
      <div><span class="k">${esc(u.labels.address)}</span><span>${esc(u.addr)}</span></div>
      <div><span class="k">${esc(u.labels.hours)}</span><span>${esc(u.hoursText)}</span></div>
      <div><span class="k">${esc(u.labels.parking)}</span><span>${esc(u.parking)}</span></div>
    </div>
  </div>
</section>
<section class="block"><div class="wrap">
  <div class="sec-head"><h2>${esc(T.cookH)}</h2></div>
  <div class="cards4">${T.cards.map(c => `<a class="card" href="${c[2]}"><h3>${esc(c[0])}</h3><p>${esc(c[1])}</p><span class="arrow" aria-hidden="true">→</span></a>`).join("")}</div>
</div></section>
<section class="block"><div class="wrap feature">
  <div><h2>${esc(T.steakH)}</h2><p>${esc(T.steakP)}</p><div class="ctas"><a class="btn" href="${ROUTES.steak[lang]}">${esc(T.steakB)}</a></div><p class="note">${esc(T.steakN)}</p></div>
  ${pic("ageing", ALT.ageing[lang], { cls: "ph tall", sizes: "(max-width: 860px) 100vw, 40vw" })}
</div></section>
<section class="block" id="komora"><div class="wrap">
  <div class="sec-head"><div><span class="mono eyebrow">${esc(KOMORA[lang][0])}</span><h2>${esc(KOMORA[lang][1])}</h2><p>${esc(KOMORA[lang][2])}</p></div></div>
  ${cutCards(lang)}
</div></section>
<section class="block"><div class="wrap feature rev">
  ${pic("marinated2", ALT.marinated[lang], { sizes: "(max-width: 860px) 100vw, 50vw" })}
  <div><h2>${esc(T.bbqH)}</h2><p>${esc(T.bbqP)}</p><div class="ctas"><a class="btn" href="${ROUTES.bbq[lang]}">${esc(T.bbqB)}</a></div></div>
</div></section>
${SITE.enquiryLive ? `<section class="block"><div class="wrap"><div class="sec-head"><h2>${esc(T.stepsH)}</h2></div>
  <ol class="steps">${T.steps.map(s => `<li><b>${esc(s[0])}</b> ${esc(s[1])}</li>`).join("")}</ol><p class="note">${esc(T.stepsN)}</p></div></section>` : ""}
<section class="block"><div class="wrap feature">
  <div><h2>${esc(T.askH)}</h2><p>${esc(T.askP)}</p><div class="ctas">${enquiryCta(lang, T.askB)}</div></div>
  ${pic("cutting", ALT.cutting[lang], { sizes: "(max-width: 860px) 100vw, 50vw" })}
</div></section>
${visitBlock(lang)}
${faqBlock(lang, ["where", "confirmed", "estimate", "time", "parking"])}`;
  },

  ponuda(lang) {
    const hr = lang === "hr";
    const T = hr ? {
      h1: "Svježe meso i delikatese u Dubrovniku",
      lead: "U Mecari u Lapadu birajte meso prema jelu koje planirate. Za gulaš, pečenje, peku ili brzu pripremu na tavi ne trebate isti komad — zato uz izbor mesa vrijedi zatražiti i savjet mesara.",
      s: [["Od svakodnevnog ručka do posebne večere","Pregledajte kategorije junetine, teletine, janjetine, svinjetine i piletine te provjerite aktualnu ponudu. Za određeni rez ili veću količinu javite nam se prije dolaska. Navedite želite li meso u komadu, narezano ili pripremljeno za određeno jelo."],
          ["Suhomesnati proizvodi, sirevi i dodaci","Uz glavno jelo složite i jednostavno predjelo. Pršut, suhomesnati proizvodi i sirevi mogu biti početak plate za obitelj ili društvo. Proizvođač, podrijetlo i sastojci navode se uz konkretan proizvod; za ono što nije jasno pitajte prije kupnje."]],
      catH: "Ponuda po kategorijama",
      endH: "Provjerite današnju dostupnost", endP: "Ponuda se mijenja. Ako tražite određeni proizvod, pošaljite nam naziv i količinu. Dostupnost i mogućnost pripreme potvrđujemo zasebno.",
      c1: "Pitajte za proizvod", c2: "Pogledajte odležane steakove",
    } : {
      h1: "Fresh meat and deli favourites in Dubrovnik",
      lead: "Choose your meat around the meal you want to make. At Mecara in Lapad, ask about cuts for stews, roasting, peka, pan cooking or the barbecue.",
      s: [["Meat for everyday cooking and special dinners","Browse the beef, veal, lamb, pork and chicken categories, then check the current selection. If you need a particular cut or a larger quantity, contact us before visiting. Let us know whether you would like a whole piece, individual portions or a cut suited to a specific dish."],
          ["Cured meats, cheese and deli accompaniments","Add a few things to share before the main meal. Explore the available prosciutto, cured meats and cheeses, and check the producer, origin and ingredients for each product."]],
      catH: "Browse by category",
      endH: "Check what is available today", endP: "Our selection can change. Send us the product name and approximate quantity you need, and we will confirm availability and any preparation requests.",
      c1: "Ask about a product", c2: "Explore dry-aged steaks",
    };
    return `
<section class="page-head"><div class="wrap">
  <h1>${esc(T.h1)}</h1><p class="lead">${esc(T.lead)}</p>
</div></section>
<div class="wrap strip">
  ${pic("cutting", ALT.cutting[lang], { sizes: "(max-width: 760px) 100vw, 50vw" })}
  ${pic("counter", ALT.counter[lang], { sizes: "(max-width: 760px) 50vw, 25vw" })}
  ${pic("marinated", ALT.marinated[lang], { sizes: "(max-width: 760px) 50vw, 25vw" })}
</div>
<section class="block"><div class="wrap two-col">${T.s.map(s => `<div><h2>${esc(s[0])}</h2><p>${esc(s[1])}</p></div>`).join("")}</div></section>
<section class="block"><div class="wrap">
  <h2>${esc(T.catH)}</h2>
  <nav class="chips" aria-label="${esc(T.catH)}">${CATS.map(c => `<a class="chip" href="#${c.id}">${esc(c[lang][0])}</a>`).join("")}</nav>
  ${CATS.map(c => { const items = PRODUCTS.filter(p => p.cat === c.id); if (!items.length) return "";
    return `<section class="cat" id="${c.id}" aria-labelledby="h-${c.id}"><h3 id="h-${c.id}">${esc(c[lang][0])}</h3><p class="muted">${esc(c[lang][1])}</p>${productList(lang, items)}</section>`; }).join("")}
</div></section>
<section class="block"><div class="wrap narrow">
  <h2>${esc(T.endH)}</h2><p>${esc(T.endP)}</p>
  <div class="ctas">${enquiryCta(lang, T.c1)}<a class="btn ghost" href="${ROUTES.steak[lang]}">${esc(T.c2)}</a></div>
</div></section>
${faqBlock(lang, ["avail", "thick", "gluten", "ready", "large"])}`;
  },

  steak(lang) {
    const hr = lang === "hr";
    const T = hr ? {
      h1: "Odležani steakovi u Dubrovniku",
      lead: "Za dobru steak večeru prvo odaberite rez koji odgovara vašem ukusu i načinu pripreme. U Mecari se raspitajte o aktualnom izboru odležanih komada, njihovoj težini i debljini rezanja.",
      s: [["Koji steak odabrati?","Volite li komad s kosti ili odrezak bez kosti? Pripremate li jednu porciju ili steak za dijeljenje? Recite nam što vam je važno. Nazivi poput rib-eye, T-bone i ramstek ne znače isti rez, pa ćemo izbor povezati s vašim planom za večeru."],
          ["Što provjeriti prije naručivanja","Za konkretan komad provjerite vrstu reza, podrijetlo, podatak o odležavanju, raspoloživu težinu i cijenu po kilogramu. Ako želite određenu debljinu, navedite je u upitu."],
          ["Rezervacija i potvrda","Rezervirajte komad iz komore i pošaljite upit. Mecara vam porukom potvrđuje da je komad spreman i u kojem terminu možete doći."]],
      cutsH: "Rezovi za koje možete pitati", cta: "Pitajte za današnji izbor steakova",
    } : {
      h1: "Dry-aged steaks in Dubrovnik",
      lead: "Start your steak dinner with a cut that suits your taste and cooking equipment. Ask Mecara about the dry-aged cuts currently available, their weights and the thicknesses we can prepare.",
      s: [["Which cut suits your dinner?","Would you prefer a bone-in steak or a boneless cut? Are you cooking individual portions or sharing a larger piece? Tell us your plans and ask about the differences between cuts such as rib-eye, T-bone and striploin."],
          ["Check the details of your cut","Before ordering, confirm the cut, origin, ageing information, available weight and price per kilogram. Include your preferred thickness if you have one."],
          ["Reserve and confirm","Reserve a piece from the ageing room and send your enquiry. Mecara confirms by message that it is ready and when you can collect it."]],
      cutsH: "Cuts you can ask about", cta: "Ask about today's steak selection",
    };
    return `
<section class="page-head"><div class="wrap feature">
  <div><h1>${esc(T.h1)}</h1><p class="lead">${esc(T.lead)}</p><div class="ctas">${enquiryCta(lang, T.cta)}</div></div>
  ${pic("ageing", ALT.ageing[lang], { cls: "ph tall", sizes: "(max-width: 860px) 100vw, 40vw", eager: true })}
</div></section>
<section class="block"><div class="wrap three-col">${T.s.map(s => `<div><h2>${esc(s[0])}</h2><p>${esc(s[1])}</p></div>`).join("")}</div></section>
<section class="block" id="komora"><div class="wrap"><div class="sec-head"><div><span class="mono eyebrow">${esc(KOMORA[lang][0])}</span><h2>${esc(KOMORA[lang][1])}</h2><p>${esc(KOMORA[lang][2])}</p></div></div>${cutCards(lang)}
  <div class="ctas center">${enquiryCta(lang, T.cta)}</div></div></section>
${faqBlock(lang, ["dryaged", "thick", "estimate"])}`;
  },

  bbq(lang) {
    const hr = lang === "hr";
    const T = hr ? {
      h1: "Meso za roštilj u Dubrovniku",
      lead: "Za dobar roštilj ne morate kupiti od svega pomalo. Odaberite nekoliko vrsta mesa koje vaše društvo voli i količinu prilagodite broju gostiju, prilozima i trajanju druženja.",
      s1: ["Složite svoj izbor","Ćevapi i burgeri, kobasice, piletina ili svinjski vrat mogu biti osnova klasičnog roštilja. Za drugačiju večeru dodajte odreske prema aktualnoj ponudi. Ako želite izbjeći određeni sastojak, provjerite sastav svakog mariniranog ili pripremljenog proizvoda."],
      s2: ["Recite nam koliko vas dolazi","U upitu navedite broj odraslih i djece, izbor mesa i imate li obilne priloge. Za veće druženje javite se ranije kako bismo provjerili raspoložive količine."],
      s3: ["Željena količina, potvrđen dogovor","Završni izbor i termin preuzimanja potvrđujemo porukom."],
      cta: "Pošaljite popis mesaru",
    } : {
      h1: "BBQ meat in Dubrovnik",
      lead: "Choose a few favourites and build your barbecue around your group. The amount you need depends on your guests, side dishes and whether meat is the main part of the meal.",
      s1: ["Build your BBQ selection","Ask about ćevapi, burgers, grill sausages, chicken and pork neck, or add steaks from the current selection. Ćevapi are small seasoned minced-meat pieces for grilling; ask about the meat blend and ingredients of the batch you are buying."],
      s2: ["Tell us about your group","Include the number of adults and children, your preferred meats and any substantial side dishes. For a larger barbecue, contact us in advance to check quantities."],
      s3: ["Confirm your selection","We confirm the final selection and collection arrangements by message."],
      cta: "Send your list to the butcher",
    };
    const items = ["p15","p16","p17","p10","p11","p13","p14","p2","p9"].map(id => PRODUCTS.find(p => p.id === id));
    return `
<section class="page-head"><div class="wrap feature">
  <div><h1>${esc(T.h1)}</h1><p class="lead">${esc(T.lead)}</p></div>
  ${pic("marinated2", ALT.marinated[lang], { sizes: "(max-width: 860px) 100vw, 45vw", eager: true })}
</div></section>
<section class="block"><div class="wrap">
  <h2>${esc(T.s1[0])}</h2><p class="narrow-p">${esc(T.s1[1])}</p>
  ${productList(lang, items)}
</div></section>
<section class="block"><div class="wrap two-col">
  <div><h2>${esc(T.s2[0])}</h2><p>${esc(T.s2[1])}</p></div>
  <div><h2>${esc(T.s3[0])}</h2><p>${esc(T.s3[1])}</p><div class="ctas">${enquiryCta(lang, T.cta)}</div></div>
</div></section>
${faqBlock(lang, ["large", "ready", "estimate"])}`;
  },

  about(lang) {
    const hr = lang === "hr";
    const T = hr ? {
      h1: "Mecara, vaša mesnica u Lapadu",
      lead: "Mecara je mjesto za ljude koji vole znati što kupuju i kako će to pripremiti. Naći ćete nas u centru DOC u Dubrovniku, gdje razgovor o dobrom obroku često počinje jednostavnim pitanjem: što danas kuhate?",
      s: [["Izbor koji počinje vašim jelom","Nekad trebate komad za sporo kuhanje, nekad nekoliko odrezaka, a nekad dovoljno mesa za cijelo društvo. Naš je pristup pomoći vam odabrati prema jelu, količini i načinu pripreme."],
          ["Jasne informacije o ponudi","Za podrijetlo, sastojke i dostupnost pitajte za konkretan proizvod. Želimo da prije kupnje imate informacije koje su vam potrebne, bez nagađanja prema fotografiji ili nazivu."],
          ["Navratite u DOC","Pogledajte aktualnu ponudu ili nam se javite s popisom onoga što trebate. Za posebne rezove i veće količine najbolje je provjeriti mogućnosti unaprijed."]],
      cta: "Upoznajte našu ponudu",
    } : {
      h1: "Mecara, your butcher shop in Lapad",
      lead: "Mecara is for people who want to know what they are buying and how to cook it. Find us inside the DOC shopping centre in Dubrovnik, where choosing a good meal can start with a simple question: what are you making today?",
      s: [["Choose around the meal","You may need a cut for slow cooking, a few steaks or enough meat for a whole group. Tell us about the dish, your guest count and your cooking equipment so we can help with your choice."],
          ["Ask about the product","Check the origin, ingredients and availability of the item you want to buy. A clear answer about a particular product is more useful than guessing from its name or photo."],
          ["Visit us at DOC","Browse the current selection or contact us with your list. For specific cuts and larger quantities, it is best to check in advance."]],
      cta: "Explore our selection",
    };
    return `
<section class="page-head"><div class="wrap feature">
  <div><h1>${esc(T.h1)}</h1><p class="lead">${esc(T.lead)}</p></div>
  ${pic("entrance", ALT.entrance[lang], { cls: "ph tall", sizes: "(max-width: 860px) 100vw, 40vw", eager: true })}
</div></section>
<section class="block"><div class="wrap three-col">${T.s.map(s => `<div><h2>${esc(s[0])}</h2><p>${esc(s[1])}</p></div>`).join("")}</div>
<div class="wrap ctas center"><a class="btn" href="${ROUTES.ponuda[lang]}">${esc(T.cta)}</a></div></section>
<div class="wrap wide-photo">${pic("interior2", ALT.interior[lang], { sizes: "100vw" })}</div>`;
  },

  contact(lang) {
    const u = UI[lang], hr = lang === "hr";
    const T = hr ? {
      h1: "Kontakt i dolazak u Mecaru",
      lead: "Posjetite nas u Lapadu ili nam pošaljite upit o ponudi. Ako trebate određeni rez, veću količinu ili pripremu za poseban datum, navedite pojedinosti kako bismo mogli provjeriti mogućnosti.",
      addrK: "Adresa", addrV: "Mecara, Kralja Tomislava 7, centar DOC, 20000 Dubrovnik",
      telK: "Telefon / WhatsApp", mailK: "E-mail",
      whatH: "Što napisati u upitu", whatP: "Navedite proizvod ili jelo koje planirate, okvirnu količinu, željeni datum i način rezanja ako vam je važan. Za preuzimanje pričekajte potvrdu termina.",
      send: "Pošaljite upit",
    } : {
      h1: "Contact Mecara and find our shop",
      lead: "Visit us in Lapad or ask about the current selection. If you need a specific cut, a larger quantity or preparation for a particular date, include the details so we can check what is possible.",
      addrK: "Address", addrV: "Mecara, Kralja Tomislava 7, DOC shopping centre, 20000 Dubrovnik, Croatia",
      telK: "Phone / WhatsApp", mailK: "Email",
      whatH: "What to include in your enquiry", whatP: "Tell us the product or meal you have in mind, approximate quantity, preferred date and any cutting requirements. Wait for a confirmed collection time before making arrangements.",
      send: "Send an enquiry",
    };
    return `
<section class="page-head"><div class="wrap feature">
  <div><h1>${esc(T.h1)}</h1><p class="lead">${esc(T.lead)}</p>
  <dl class="facts static">
    <div><dt class="k">${esc(T.addrK)}</dt><dd>${esc(T.addrV)}</dd></div>
    <div><dt class="k">${esc(u.labels.hours)}</dt><dd>${esc(u.hoursText)}</dd></div>
    <div><dt class="k">${esc(u.labels.now)}</dt><dd class="open-now"><i class="dot" id="open-dot" aria-hidden="true"></i><span id="open-txt" aria-live="polite">${esc(u.statusLoading)}</span></dd></div>
    ${SITE.phone ? `<div><dt class="k">${esc(T.telK)}</dt><dd><a href="tel:${esc(SITE.phone.replace(/\s/g, ""))}">${esc(SITE.phone)}</a></dd></div>` : ""}
    ${SITE.email ? `<div><dt class="k">${esc(T.mailK)}</dt><dd><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></dd></div>` : ""}
    <div><dt class="k">${esc(u.labels.parking)}</dt><dd>${esc(u.parking)}</dd></div>
    <div><dt class="k">Instagram</dt><dd><a href="${esc(SITE.instagram)}" rel="noopener noreferrer">@_mecaradubrovnik</a></dd></div>
  </dl>
  <div class="ctas"><a class="btn ghost" href="${esc(SITE.maps)}" target="_blank" rel="noopener noreferrer">${esc(u.directions)}</a>${SITE.phone ? `<a class="btn ghost" href="tel:${esc(SITE.phone.replace(/\s/g, ""))}">${esc(u.call)}</a>` : ""}${enquiryCta(lang, T.send)}</div>
  </div>
  ${pic("entrance", ALT.entrance[lang], { cls: "ph tall", sizes: "(max-width: 860px) 100vw, 40vw", eager: true })}
</div></section>
<section class="block"><div class="wrap narrow"><h2>${esc(T.whatH)}</h2><p>${esc(T.whatP)}</p></div></section>
${faqBlock(lang, ["where", "avail", "confirmed", "time", "parking"])}`;
  },
};

/* ------------------------------ okvir stranice ------------------------------ */
function storeLd() {
  return { "@context": "https://schema.org", "@type": "Store", "@id": SITE.host + "/#store", name: "Mecara", url: SITE.host + "/",
    image: SITE.host + "/img/foto/KKP4539.jpg", logo: SITE.host + "/img/logo-full.png",
    address: { "@type": "PostalAddress", streetAddress: "Kralja Tomislava 7", addressLocality: "Dubrovnik", postalCode: "20000", addressCountry: "HR" },
    sameAs: [SITE.instagram], ...(SITE.phone ? { telephone: SITE.phone } : {}) };
}
function crumbLd(lang, page, title) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: UI[lang].home, item: abs(ROUTES.home[lang]) },
    { "@type": "ListItem", position: 2, name: title, item: abs(ROUTES[page][lang]) } ] };
}

function layout(lang, page) {
  const u = UI[lang], other = lang === "hr" ? "en" : "hr";
  const [title, desc] = META[page][lang];
  const url = abs(ROUTES[page][lang]);
  const h1Title = page === "home" ? title : title.split(" — ")[0];
  const navTitle = (u.nav.find(n => n[0] === page) || [null, h1Title])[1];
  const ld = [page === "home" || page === "contact" ? storeLd() : null, page !== "home" ? crumbLd(lang, page, navTitle) : null].filter(Boolean);
  const robots = SITE.wip ? "noindex, nofollow" : "index, follow, max-image-preview:large";
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="hr" href="${abs(ROUTES[page].hr)}">
<link rel="alternate" hreflang="en" href="${abs(ROUTES[page].en)}">
<link rel="alternate" hreflang="x-default" href="${abs(ROUTES[page].hr)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Mecara">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${lang === "hr" ? "hr_HR" : "en_GB"}">
<meta property="og:locale:alternate" content="${lang === "hr" ? "en_GB" : "hr_HR"}">
<meta property="og:image" content="${SITE.host}/img/og/mecara-dubrovnik.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${lang === "hr" ? "Mecara, mesnica u Lapadu u Dubrovniku" : "Mecara, butcher shop in Lapad, Dubrovnik"}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#13100e">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/img/icon-256.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fonts/bodoni-moda-latin-500-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/instrument-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/styles.css?v=${V}">
${ld.map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n")}
</head>
<body data-page="${page}">
<a class="skip" href="#main">${esc(u.skip)}</a>
${SITE.wip ? `<div class="proto" role="note"><b>${esc(u.wip)}</b> <span>${esc(u.wipText)}</span></div>` : ""}
<header class="top">
  <div class="wrap">
    <a class="brand" href="${ROUTES.home[lang]}" aria-label="Mecara – ${esc(u.home)}">
      <img src="/img/wordmark.png" alt="Mecara" width="119" height="26">
      <span>${lang === "hr" ? "MESO DOMAĆIH UZGAJIVAČA" : "BUTCHER SHOP · DUBROVNIK"}</span>
    </a>
    <nav class="links" aria-label="${esc(u.navLabel)}">
      ${u.nav.map(([k, l]) => `<a href="${ROUTES[k][lang]}"${k === page ? ' aria-current="page"' : ""}>${esc(l)}</a>`).join("\n      ")}
    </nav>
    <a class="lang-link" href="${ROUTES[page][other]}" hreflang="${other}" lang="${other}"><span aria-hidden="true">${esc(u.otherShort)}</span><span class="sr">${esc(u.other)}</span></a>
    <a class="cartbtn" href="${ROUTES.contact[lang]}" id="open-cart" data-open-enquiry aria-haspopup="dialog" aria-controls="drawer"><span class="lbl">${esc(u.enquiryBtn)}</span> <span class="n" id="cart-n">0</span></a>
  </div>
</header>
${crumbs(lang, page, navTitle)}
<main id="main" tabindex="-1">
${PAGES[page](lang)}
</main>
<footer>
  <div class="wrap foot-grid">
    <div><img class="foot-logo" src="/img/wordmark.png" alt="Mecara" width="137" height="30" loading="lazy">
      <b>${esc(u.footTitle)}</b><br>${esc(u.footAddr)}<br>${esc(u.hoursText)}
      ${SITE.phone || SITE.email ? `<br>${[SITE.phone && (lang === "hr" ? "Telefon: " : "Phone: ") + esc(SITE.phone), SITE.email && "E-mail: " + esc(SITE.email)].filter(Boolean).join(" · ")}` : ""}
      ${SITE.legalName && SITE.oib ? `<br>${lang === "hr" ? "" : "Operated by "}${esc(SITE.legalName)} · OIB: ${esc(SITE.oib)}` : ""}
    </div>
    <nav aria-label="Footer"><a href="${ROUTES.ponuda[lang]}">${esc(u.nav[0][1])}</a><a href="${ROUTES.contact[lang]}">${esc(u.nav[4][1])}</a><a href="${esc(SITE.instagram)}" rel="noopener noreferrer">Instagram</a><a href="${ROUTES[page][other]}" hreflang="${other}" lang="${other}">${esc(u.other)}</a></nav>
  </div>
  <div class="wrap"><p class="privacy">${esc(u.privacy)}</p></div>
</footer>
${drawer(lang)}
<div class="toast" id="toast" role="status"></div>
<script src="/js/catalog.js?v=${V}" defer></script>
<script src="/js/app.js?v=${V}" defer></script>
</body>
</html>
`;
}

function drawer(lang) {
  const d = UI[lang].d;
  return `<aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" aria-hidden="true">
  <header><h2 id="drawer-title">${esc(d.title)}</h2><button class="x" type="button" id="close-cart" aria-label="${esc(d.close)}">✕</button></header>
  <div class="scroll">
    <div id="lines"></div>
    <div class="field"><span class="legend" id="l-day">${esc(d.date)}</span><div class="slots" id="days" role="group" aria-labelledby="l-day"></div></div>
    <div class="field"><span class="legend" id="l-time">${esc(d.time)}</span><div class="slots" id="times" role="group" aria-labelledby="l-time"></div></div>
    <p class="note">${esc(d.notConfirmed)}</p>
    <div class="field"><label for="c-name">${esc(d.name)}</label><input type="text" id="c-name" maxlength="80" autocomplete="name"></div>
    <div class="field"><label for="c-tel">${esc(d.tel)}</label><input type="tel" id="c-tel" placeholder="+385 9x xxx xxxx" maxlength="20" autocomplete="tel" inputmode="tel"></div>
    <div class="field"><label for="c-note">${esc(d.note)}</label><textarea id="c-note" maxlength="600" placeholder="${esc(d.notePh)}"></textarea></div>
    <div class="result" id="result">
      <b>${esc(d.ready)}</b>
      <pre id="msg"></pre>
      <p class="wip-note">${esc(d.wipNote)}</p>
      <div class="ctas"><a class="btn small wa" id="wa" href="#" target="_blank" rel="noopener noreferrer" hidden>${esc(d.openWa)}</a><button class="btn small ghost" type="button" id="copy">${esc(d.copy)}</button></div>
      <p class="note" id="after-open" hidden>${esc(d.afterOpen)}</p>
    </div>
  </div>
  <div class="foot">
    <div class="sum"><span>${esc(d.est)}</span><b id="sum">0,00 €</b></div>
    <p class="note">${esc(d.weigh)}</p>
    <p class="err" id="c-err" role="alert"></p>
    <button class="btn" type="button" id="send">${esc(SITE.enquiryLive ? d.prepare : d.prepareWip)}</button>
  </div>
</aside>
<div class="scrim" id="scrim"></div>`;
}

function notFound() {
  return `<!DOCTYPE html>
<html lang="hr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>404 · Mecara</title>
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="stylesheet" href="/css/styles.css?v=${V}">
</head>
<body>
<main class="wrap nf">
  <img src="/img/bull.png" alt="" width="520" height="289" class="nf-bull">
  <h1>${esc(UI.hr.notFound.title)}</h1>
  <p class="muted" lang="en">${esc(UI.en.notFound.title)}</p>
  <div class="ctas center"><a class="btn" href="/">${esc(UI.hr.notFound.btn)}</a><a class="btn ghost" href="/en/" lang="en">${esc(UI.en.notFound.btn)}</a></div>
</main>
</body>
</html>
`;
}

/* ------------------------------ zapisivanje ------------------------------ */
function write(rel, content) { const f = join(ROOT, rel); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, content); }
const pages = Object.keys(ROUTES);
for (const page of pages) for (const lang of ["hr", "en"]) write(join(ROUTES[page][lang], "index.html"), layout(lang, page));
write("404.html", notFound());

const catalog = {
  site: { whatsapp: SITE.whatsapp, enquiryLive: !!(SITE.enquiryLive && /^\d{10,15}$/.test(SITE.whatsapp)), hours: SITE.hours },
  products: Object.fromEntries(PRODUCTS.map(p => [p.id, { u: p.unit, eur: p.eur, hr: p.hr.name, en: p.en.name }])),
  cuts: Object.fromEntries(CUTS.map(c => [c.id, { hr: c.hr[0], en: c.en[0], kg: c.kg, eur: c.eur, day: c.day }])),
  ui: { hr: { ...UI.hr.d, reserved: UI.hr.reserved, days: UI.hr.days }, en: { ...UI.en.d, reserved: UI.en.reserved, days: UI.en.days } },
  added: { hr: UI.hr.added, en: UI.en.added }, add: { hr: UI.hr.add, en: UI.en.add },
};
write("js/catalog.js", `/* Generirano iz build/content.mjs – ne uređivati ručno */\nwindow.MECARA=${JSON.stringify(catalog)};\n`);

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.flatMap(p => ["hr", "en"].map(l => `  <url><loc>${abs(ROUTES[p][l])}</loc><xhtml:link rel="alternate" hreflang="hr" href="${abs(ROUTES[p].hr)}"/><xhtml:link rel="alternate" hreflang="en" href="${abs(ROUTES[p].en)}"/></url>`)).join("\n")}
</urlset>
`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE.host}/sitemap.xml\n`);
console.log("OK:", pages.length * 2, "stranica + 404, sitemap, robots, catalog");
