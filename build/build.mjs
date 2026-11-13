// Generator statičkih stranica: node build/build.mjs  → piše HTML u public/
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, ROUTES, UI, CATS, PRODUCTS, CUTS, FAQ, META, ALT, WORKSHOPS, BOXES } from "./content.mjs";

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
  hr: ["Dry-age komora · uživo", "Svaki komad ima svoj broj i svoje dane", "To vam u Dubrovniku neće pokazati nijedna druga mesnica. Ovdje vidite koji komad visi u komori, koliko teži i koliko je dana već odležao. Rezervirate baš njega, a mi ga čuvamo za vas."],
  en: ["Dry-age room · live", "Every piece numbered, every day counted", "You won't find this at any other butcher in Dubrovnik. You can see the actual piece hanging in the room, what it weighs and how many days it has aged. Reserve it and we'll set it aside for you."],
};

function visitBlock(lang) {
  const u = UI[lang];
  const t = lang === "hr"
    ? ["Svratite do nas u Lapad", "Mecara je u centru DOC, Kralja Tomislava 7. Dođite po meso za ručak, pogledajte koje steakove imamo ili nas pitajte za veće druženje."]
    : ["Visit our butcher shop in Lapad", "We're inside the DOC shopping centre at Kralja Tomislava 7, Dubrovnik. Pop in for tonight's dinner, have a look at the steaks, or ask us about meat for a bigger group."];
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
      eye: "Mecara · DOC, Lapad", h1a: "Vaša mesnica u Dubrovniku.", h1b: "Ručak počinje za pultom.",
      lead: "Treba vam meso za ručak, nešto za roštilj ili steak za večeru? Dođite u Mecaru u Lapadu, pokažite što vam se sviđa i pitajte kako to pripremiti. Imamo i suhomesnato, sir i ono sitno što ide uz stol.",
      b1: "Pogledajte što imamo", b2: "Kako do nas u DOC-u",
      cookH: "Što se danas kuha kod vas?",
      cards: [["Za ručak","Gulaš traži jedan komad, pečenje drugi. Recite nam što kuhate i za koliko ljudi, pa ćemo izabrati zajedno.", ROUTES.ponuda.hr+"#junetina"],
              ["Za roštilj","Ćevapi, burgeri, kobasice, odresci. Uzmite ono što vaše društvo stvarno jede, a količinu odredite prema prilozima i apetitu.", ROUTES.bbq.hr],
              ["Za steak večeru","Odležani steakovi čekaju u komori. Koji rez je trenutačno tu, koliko je težak i kako ga narezati, pitajte mesara.", ROUTES.steak.hr],
              ["Za platu","Malo suhomesnatog, malo sira i par dodataka. Za jednostavnu platu više ne treba. Pitajte što trenutačno imamo.", ROUTES.ponuda.hr+"#suho"]],
      steakH: "Odležani steakovi, birani prema tome kako ih pečete",
      steakP: "Rez, debljina i broj dana u komori mijenjaju steak. Mijenja ga i to pečete li ga na tavi ili na roštilju. Recite nam kakvu večeru spremate i naći ćemo komad koji joj odgovara.",
      steakB: "Pogledajte odležane steakove", steakN: "Dolazite po točno određeni komad? Prije toga provjerite je li još tu, koliko teži i koliko košta.",
      bbqH: "Meso za roštilj, bez nagađanja",
      bbqP: "Krenite od broja ljudi. Onda odaberite nekoliko vrsta mesa i razmislite o prilozima. Planer vam daje prvu procjenu, a ostatak dogovorite s mesarom.",
      bbqB: "Meso za roštilj",
      stepsH: "Kako ide upit",
      steps: [["Napišite što trebate.","Proizvode, okvirnu količinu i kako da vam narežemo meso."],["Pričekajte našu potvrdu.","Provjerimo što imamo i dogovorimo termin. Ako nečega nema, predložit ćemo zamjenu."],["Dođite po meso.","U dogovoreni termin, na Kralja Tomislava 7, u centru DOC u Lapadu."]],
      stepsN: "Poslan upit još nije narudžba. Kod onoga što se prodaje na težinu plaćate koliko stvarno izvažemo.",
      askH: "Pitajte mesara", askP: "Ne morate znati kako se koji rez zove. Recite što kuhate, koliko vas je i na čemu pečete. Dalje ćemo lako.", askB: "Pošaljite upit Mecari",
    } : {
      eye: "Mecara · DOC shopping centre, Lapad", h1a: "Your butcher in Dubrovnik.", h1b: "Dinner starts at the counter.",
      lead: "Self-catering in an apartment, firing up a barbecue, or after a steak for tonight? Come to Mecara in Lapad. We'll help you pick the cut and tell you how to cook it. There's cured meat, cheese and a few deli bits on the shelves too.",
      b1: "See what we have", b2: "Find us in Lapad",
      cookH: "What's on the menu?",
      cards: [["Everyday meals","A stew wants one cut, a roast another. Tell us what you're making and how many you're feeding, and we'll point you to the right piece.", ROUTES.ponuda.en+"#junetina"],
              ["Barbecue","Ćevapi, burgers, sausages, steaks. Pick what your lot will actually eat, then size it to the side dishes and the grill you've got.", ROUTES.bbq.en],
              ["Steak night","Have a look at the dry-aged steaks, then ask which cuts, thicknesses and weights we have in right now.", ROUTES.steak.en],
              ["Something to share","Cured meats, a bit of cheese, something from the deli shelf. That's a spread sorted. Ask what we have today.", ROUTES.ponuda.en+"#suho"]],
      steakH: "A dry-aged steak for the way you cook",
      steakP: "Cut, thickness and days of ageing all change the steak. So does pan versus barbecue. Tell us which you're using and we'll find a piece that suits the dinner you're planning.",
      steakB: "See the dry-aged steaks", steakN: "After one particular cut? Check it's still available, and its weight and price, before you come in.",
      bbqH: "Plan your barbecue without the guesswork",
      bbqP: "Count your guests first. Pick a few meats, then think about the sides. The BBQ planner gives you a rough figure to start from, and the butcher can adjust it with you.",
      bbqB: "See BBQ meat",
      stepsH: "How an enquiry works",
      steps: [["Send your list.","Products, rough quantities and how you'd like them cut."],["We confirm.","We check what's in and agree a collection time. If something's missing, we'll talk about an alternative."],["Pick it up.","Kralja Tomislava 7, inside the DOC shopping centre in Lapad, at the time we agreed."]],
      stepsN: "An enquiry isn't a confirmed order. Anything sold by weight is charged on what it actually weighs.",
      askH: "Ask the butcher", askP: "No need to know the cuts by name. Tell us what you want to cook, how many are eating and what you're cooking on. We'll take it from there.", askB: "Send Mecara an enquiry",
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
  <div class="sec-head"><div><span class="mono eyebrow">${esc(KOMORA[lang][0])}</span><h2>${esc(KOMORA[lang][1])}</h2><p>${esc(KOMORA[lang][2])}</p></div><a class="btn ghost" href="${ROUTES.komora[lang]}">${lang === "hr" ? "Kako radi komora" : "Inside the ageing room"}</a></div>
  ${cutCards(lang)}
</div></section>
<section class="block"><div class="wrap feature rev">
  ${pic("marinated2", ALT.marinated[lang], { sizes: "(max-width: 860px) 100vw, 50vw" })}
  <div><h2>${esc(T.bbqH)}</h2><p>${esc(T.bbqP)}</p><div class="ctas"><a class="btn" href="${ROUTES.planner[lang]}">${lang === "hr" ? "Izračunajte količine" : "Work out quantities"}</a><a class="btn ghost" href="${ROUTES.bbq[lang]}">${esc(T.bbqB)}</a></div></div>
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
      lead: "Za gulaš ne uzimate isti komad kao za peku. Pečenje traži svoje, a brzo na tavi opet nešto treće. U Mecari u Lapadu birajte meso prema jelu, a ako niste sigurni, pitajte mesara.",
      s: [["Za svaki dan i za posebnu večeru","Ispod su junetina, teletina, janjetina, svinjetina i piletina, pa pogledajte što je trenutačno u ponudi. Trebate li točno određeni rez ili veću količinu, javite se prije nego što dođete. Recite i želite li meso u komadu, narezano ili spremno za određeno jelo."],
          ["Suhomesnato, sir i ono uz to","Dok se glavno jelo peče, netko će htjeti nešto gricnuti. Pršut, suhomesnato i sir dobar su početak plate za obitelj ili društvo. Proizvođač, podrijetlo i sastojci pišu uz svaki proizvod. Ako vam nešto nije jasno, pitajte prije kupnje."]],
      catH: "Što imamo, po kategorijama",
      endH: "Provjerite što je danas tu", endP: "Ponuda se mijenja. Tražite li nešto određeno, pošaljite nam naziv i količinu. Imamo li to i možemo li ga pripremiti kako želite, potvrdit ćemo posebno.",
      c1: "Pitajte za proizvod", c2: "Pogledajte odležane steakove",
    } : {
      h1: "Fresh meat and deli favourites in Dubrovnik",
      lead: "Pick the meat for the dish, not the other way round. A stew, a roast, a peka, a quick pan fry and a barbecue all want different cuts. Come to Mecara in Lapad and ask which.",
      s: [["Everyday cooking and special dinners","Beef, veal, lamb, pork and chicken are all below, so have a look at what's in. Need a particular cut, or a lot of something? Get in touch before you come. Tell us if you want it as a whole piece, in portions or cut for a specific dish."],
          ["Cured meats, cheese and deli bits","Something to pick at before the main event. We have prosciutto, other cured meats and cheese. The producer, origin and ingredients are listed with each product."]],
      catH: "Browse by category",
      endH: "What's in today", endP: "The selection changes. Send us the product name and roughly how much you need. We'll confirm whether we have it and whether we can prepare it the way you asked.",
      c1: "Ask about a product", c2: "See the dry-aged steaks",
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

  komora(lang) {
    const hr = lang === "hr";
    const T = hr ? {
      eye: "Dry-age komora · uživo", h1: "Komora: odležani steakovi uživo",
      lead: "U Dubrovniku ovo nećete vidjeti ni u jednoj drugoj mesnici. Ovdje je točno onaj komad koji visi u komori, njegova težina i broj dana koliko odležava. Rezervirate li ga, čuvamo ga za vas.",
      cta: "Što je sada u komori", cta2: "Kako rezervirati",
      liveH: "Trenutačno u komori",
      readH: "Kako čitati karticu",
      read: [["Dani odležavanja","Prvi broj kaže koliko je dana komad već u komori. Drugi kaže koliko ga namjeravamo držati. Traka pokazuje koliko je puta iza njega."],
             ["Spreman ili Spreman za X d.","„Spreman” znači da je odležao koliko smo planirali i može se rezati. Kod „Spreman za 6 d.” komad svejedno možete rezervirati, samo ga preuzimate kad bude gotov."],
             ["Težina i okvirni iznos","Težina je ono što komad teži danas. Okvirni iznos dobijete kad cijenu po kilogramu pomnožite s tom težinom. Konačan iznos ovisi o težini nakon čišćenja i rezanja."],
             ["Broj komada","Svaki komad ima broj (#01, #02…). Kad dođete u Mecaru, znate točno koji je vaš."]],
      whatH: "Što je suho odležavanje?",
      what: ["Kod suhog odležavanja (dry aging) cijeli komad junetine, najčešće s kosti, visi tjednima u posebnoj komori. Temperatura je malo iznad nule, a vlagu i strujanje zraka držimo pod kontrolom.",
             "Meso za to vrijeme gubi dio vode i okus mu se zgusne. Prirodni enzimi polako omekšaju vlakna. Steak je na kraju mekši, a okus dublji i blago orašast. Toga u svježem mesu nema.",
             "Vanjski se sloj osuši i prije rezanja ga odrežemo. Zato je odležano meso skuplje po kilogramu. Dio težine ode, a čeka se tjednima."],
      daysH: "Koliko dana?",
      days: [["oko 21 dan","Blaži okus, jako sočno. Dobro za početak ako odležano meso tek upoznajete."],
             ["28 – 35 dana","Okus je jači i puniji, a meso primjetno mekše. Ovo se najčešće uzima za steak večeru."],
             ["45 dana i više","Intenzivno i prepoznatljivo. Za one koji odležane steakove već vole."]],
      daysN: "Ovo je okvirno. Na okus utječu i rez, masnoća i sam komad, pa pitajte mesara što bi on uzeo za vaše jelo.",
      howH: "Kako rezervirati komad",
      how: [["Odaberite komad","Na kartici kliknite „Rezerviraj ovaj komad”. Komad ide u vaš upit."],
            ["Pošaljite upit","Otvorite „Vaš upit”, izaberite dan i sat preuzimanja i napišite kako da ga narežemo."],
            ["Pričekajte potvrdu","Porukom vam potvrđujemo komad, točnu težinu i termin."],
            ["Dođite u DOC","Mecara je na Kralja Tomislava 7. Sat parkinga na parkiralištu centra DOC i Tommyja je besplatan."]],
      cookH: "Kako ispeći odležani steak",
      cook: ["Izvadite steak iz hladnjaka 30 do 60 minuta prije pečenja, da dođe na sobnu temperaturu.",
             "Solite ga neposredno prije pečenja ili barem 40 minuta ranije. Papar ide na kraju.",
             "Tava ili roštilj moraju biti jako vrući. Pecite dok se ne uhvati korica, a onda ga po želji dovršite na nižoj temperaturi.",
             "Neka odmori 5 do 10 minuta. Režite poprijeko vlakana.",
             "Ako je komad debeo i s kosti, pitajte mesara koliko ga peći i do koje pečenosti."],
      endH: "Ne znate koji komad uzeti?", endP: "Recite nam za koliko ljudi kuhate, pečete li na tavi ili na roštilju i kakav okus volite. Mesar će vam izabrati komad iz komore.",
      endB: "Pošaljite upit", endB2: "Svi odležani steakovi",
    } : {
      eye: "Dry-age room · live", h1: "Ageing room: dry-aged steaks, live",
      lead: "You won't see this at any other butcher in Dubrovnik. Here's the exact piece hanging in the room, what it weighs and how many days it has aged. Reserve it and we'll keep it back for you.",
      cta: "See what's ageing now", cta2: "How to reserve",
      liveH: "In the room right now",
      readH: "Reading a card",
      read: [["Days aged","Two numbers. The first is how long the piece has been in the room, the second is how long we plan to leave it. The bar shows how far it's got."],
             ["Ready or Ready in X d","“Ready” means it's done its time and can be cut. “Ready in 6 d” means you can reserve it now and collect it when it's finished."],
             ["Weight and estimated amount","Weight is what the piece weighs today. The estimate is the price per kilo times that weight. What you actually pay depends on the weight after trimming and cutting."],
             ["Piece number","Each piece is numbered (#01, #02…), so when you come in you know exactly which one is yours."]],
      whatH: "What is dry ageing?",
      what: ["A whole piece of beef, usually on the bone, hangs for weeks in its own room. The temperature sits just above freezing, and humidity and airflow are kept under control. That's dry ageing.",
             "The meat slowly loses water, which concentrates the flavour. Natural enzymes work on the fibres at the same time and soften them. You end up with a more tender steak and a deeper, slightly nutty taste that fresh beef simply doesn't have.",
             "The outside dries out and gets trimmed off before we cut. Hence the higher price per kilo. Some weight is lost, and it takes weeks."],
      daysH: "How long should it age?",
      days: [["around 21 days","Milder, very juicy. A good place to start if aged beef is new to you."],
             ["28 – 35 days","Fuller and more pronounced, and noticeably more tender. This is what most people go for at a steak dinner."],
             ["45 days and more","Intense and distinctive. For people who already know they love aged steak."]],
      daysN: "Treat these as a rough guide. The cut, the fat and the piece itself all affect the flavour, so ask the butcher what they'd pick for your meal.",
      howH: "How to reserve a piece",
      how: [["Choose a piece","Click “Reserve this piece” on the card. It goes into your enquiry."],
            ["Send your enquiry","Open “Your enquiry”, pick a collection day and time, and tell us how you want it cut."],
            ["Wait for our message","We confirm the piece, its exact weight and your collection time by message."],
            ["Collect at DOC","Mecara is at Kralja Tomislava 7. The first hour in the DOC and Tommy car park is free."]],
      cookH: "Cooking a dry-aged steak",
      cook: ["Take it out of the fridge 30 to 60 minutes before cooking so it comes up to room temperature.",
             "Salt it right before it goes in, or at least 40 minutes ahead. Pepper goes on at the end.",
             "Get the pan or grill very hot. Sear until there's a crust, then finish over lower heat if it needs it.",
             "Rest it for 5 to 10 minutes. Slice across the grain.",
             "Thick, bone-in cut? Ask the butcher about timing and doneness."],
      endH: "Can't decide?", endP: "Tell us how many you're cooking for, pan or grill, and what sort of flavour you like. The butcher will pick a piece from the room for you.",
      endB: "Send an enquiry", endB2: "All dry-aged steaks",
    };
    return `
<section class="page-head"><div class="wrap feature">
  <div><span class="mono eyebrow">${esc(T.eye)}</span><h1>${esc(T.h1)}</h1><p class="lead">${esc(T.lead)}</p>
  <div class="ctas"><a class="btn" href="#uzivo">${esc(T.cta)}</a><a class="btn ghost" href="#rezervacija">${esc(T.cta2)}</a></div></div>
  ${pic("ageing", ALT.ageing[lang], { cls: "ph tall", sizes: "(max-width: 860px) 100vw, 40vw", eager: true })}
</div></section>
<section class="block" id="uzivo"><div class="wrap"><h2>${esc(T.liveH)}</h2>${cutCards(lang)}</div></section>
<section class="block"><div class="wrap"><h2>${esc(T.readH)}</h2>
  <div class="cards4 info">${T.read.map(r => `<div class="card"><h3>${esc(r[0])}</h3><p>${esc(r[1])}</p></div>`).join("")}</div>
</div></section>
<section class="block"><div class="wrap feature rev">
  ${pic("cutting", ALT.cutting[lang], { sizes: "(max-width: 860px) 100vw, 45vw" })}
  <div><h2>${esc(T.whatH)}</h2>${T.what.map(p => `<p>${esc(p)}</p>`).join("")}</div>
</div></section>
<section class="block"><div class="wrap"><h2>${esc(T.daysH)}</h2>
  <div class="days-grid">${T.days.map(d => `<div class="card"><span class="mono eyebrow">${esc(d[0])}</span><p>${esc(d[1])}</p></div>`).join("")}</div>
  <p class="note">${esc(T.daysN)}</p>
</div></section>
<section class="block" id="rezervacija"><div class="wrap"><h2>${esc(T.howH)}</h2>
  <ol class="steps4">${T.how.map((h, i) => `<li><span class="n">${i + 1}</span><b>${esc(h[0])}</b><p>${esc(h[1])}</p></li>`).join("")}</ol>
</div></section>
<section class="block"><div class="wrap two-col">
  <div><h2>${esc(T.cookH)}</h2><ul class="ticks">${T.cook.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>
  <div><h2>${esc(T.endH)}</h2><p>${esc(T.endP)}</p><div class="ctas">${enquiryCta(lang, T.endB)}<a class="btn ghost" href="${ROUTES.steak[lang]}">${esc(T.endB2)}</a></div></div>
</div></section>
${faqBlock(lang, ["dryaged", "thick", "estimate"])}`;
  },

  steakMerged(lang) {
    const hr = lang === "hr";
    const S = hr ? [["Koji steak uzeti?","S kosti ili bez? Porcija po osobi ili jedan veliki komad za dijeljenje? Rib-eye, T-bone i ramstek nisu isto, pa nam recite kako zamišljate večeru i zajedno ćemo izabrati rez."],
          ["Što provjeriti prije narudžbe","Pitajte koji je rez, odakle je meso, koliko je odležavalo, koliko ga ima i koliko košta po kilogramu. Ako želite određenu debljinu, napišite je u upitu."],
          ["Rezervacija i potvrda","Rezervirajte komad iz komore i pošaljite upit. Porukom vam javljamo kad je spreman i kada možete doći po njega."]]
      : [["Which cut for your dinner?","Bone-in or boneless? One each, or a big one to share? Rib-eye, T-bone and striploin aren't the same thing, so tell us what you've got planned and ask us about the difference."],
          ["Check the details","Before you order, ask about the cut, origin, ageing, available weight and price per kilo. Want it a certain thickness? Say so in your enquiry."],
          ["Reserve and confirm","Reserve a piece from the ageing room and send your enquiry. We'll message you when it's ready and when you can pick it up."]];
    let body = PAGES.komora(lang);
    body = body.replace(/<h1>[^<]*<\/h1>/, `<h1>${esc(hr ? "Odležani steakovi u Dubrovniku" : "Dry-aged steaks in Dubrovnik")}</h1>`);
    const three = `<section class="block"><div class="wrap three-col">${S.map(x => `<div><h2>${esc(x[0])}</h2><p>${esc(x[1])}</p></div>`).join("")}</div></section>`;
    // umetni nakon žive komore
    return body.replace(/(<section class="block" id="uzivo">[\s\S]*?<\/section>)/, `$1\n${three}`);
  },
  bbqMerged(lang) {
    const bbq = PAGES.bbq(lang);
    let pl = PAGES.planner(lang);
    pl = pl.replace(/^\s*<section class="page-head">[\s\S]*?<\/section>/, "");          // bez drugog naslova
    pl = pl.replace(/\$\{?faq[\s\S]*$/, "");
    const plH = lang === "hr" ? ["Roštilj planer","Koliko mesa trebate za roštilj?","Upišite koliko vas je i odaberite kakav roštilj radite. Planer će predložiti okvirnu količinu, a vi je možete mijenjati prije nego što pošaljete upit."]
                              : ["BBQ planner","How much meat do you need?","Put in the number of guests and pick a style. The planner suggests a rough amount of meat, and you can change it before sending your enquiry."];
    const plHead = `<section class="block planner-intro" id="planner-top"><div class="wrap"><span class="mono eyebrow">${esc(plH[0])}</span><h2>${esc(plH[1])}</h2><p class="narrow-p">${esc(plH[2])}</p></div></section>`;
    // planer odmah nakon naslova stranice, prije popisa proizvoda; FAQ planera izbacujemo (bbq ima svoj)
    pl = pl.replace(/<section class="faq-block[\s\S]*$/, "");
    return bbq.replace(/(<section class="page-head">[\s\S]*?<\/section>)/, `$1\n${plHead}\n${pl}`);
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
<section class="block" id="komora"><div class="wrap"><div class="sec-head"><div><span class="mono eyebrow">${esc(KOMORA[lang][0])}</span><h2>${esc(KOMORA[lang][1])}</h2><p>${esc(KOMORA[lang][2])}</p></div><a class="btn ghost" href="${ROUTES.komora[lang]}">${lang === "hr" ? "Kako funkcionira komora" : "How the ageing room works"}</a></div>${cutCards(lang)}
  <div class="ctas center">${enquiryCta(lang, T.cta)}</div></div></section>
${faqBlock(lang, ["dryaged", "thick", "estimate"])}`;
  },

  bbq(lang) {
    const hr = lang === "hr";
    const T = hr ? {
      h1: "Meso za roštilj u Dubrovniku",
      lead: "Ne treba vam od svega pomalo. Uzmite nekoliko vrsta mesa koje vaše društvo stvarno jede, a količinu odredite prema broju ljudi, prilozima i tome koliko će se sjediti.",
      s1: ["Složite svoj izbor","Ćevapi, burgeri, kobasice, piletina, svinjski vrat. Od toga se radi klasičan roštilj. Želite li nešto drugačije, dodajte odreske iz trenutačne ponude. Ako netko izbjegava određeni sastojak, provjerite sastav svakog mariniranog ili pripremljenog proizvoda."],
      s2: ["Koliko vas dolazi?","U upitu napišite broj odraslih i djece, koje meso želite i hoće li biti puno priloga. Za veće društvo javite se ranije, da stignemo provjeriti imamo li dovoljno."],
      s3: ["Dogovor stiže porukom","Konačan izbor i termin preuzimanja potvrđujemo porukom."],
      cta: "Pošaljite popis mesaru",
    } : {
      h1: "BBQ meat in Dubrovnik",
      lead: "Pick a few favourites and plan around who's coming. How much you need depends on the guests, the sides, and whether the meat is the main event.",
      s1: ["Build your BBQ selection","Ćevapi, burgers, grill sausages, chicken and pork neck are the usual suspects. Steaks from the current selection work too. Ćevapi are small seasoned minced-meat pieces for the grill; ask about the meat blend and ingredients in the batch you're buying."],
      s2: ["Tell us about your group","How many adults and children, which meats, and whether there'll be plenty of sides. For a bigger barbecue, get in touch early so we can check quantities."],
      s3: ["Confirm your selection","We confirm the final selection and collection details by message."],
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
  <div><h2>${esc(T.s3[0])}</h2><p>${esc(T.s3[1])}</p><div class="ctas"><a class="btn ghost" href="${ROUTES.planner[lang]}">${lang === "hr" ? "Otvorite roštilj planer" : "Open the BBQ planner"}</a>${enquiryCta(lang, T.cta)}</div></div>
</div></section>
${faqBlock(lang, ["large", "ready", "estimate"])}`;
  },

  planner(lang) {
    const hr = lang === "hr";
    const T = hr ? {
      h1: "Koliko mesa trebate za roštilj?",
      lead: "Upišite broj gostiju i izaberite kakav roštilj radite. Planer predlaže okvirnu količinu mesa, a vi je prije slanja upita možete promijeniti.",
      adults: "Odrasli", kids: "Djeca", hunger: "Koliko su gladni?", style: "Kakav roštilj?",
      hungerOpts: ["Lagano","Normalno","Jako gladni"], styleOpts: ["Klasika","Premium","Dalmatinski"],
      styleDesc: ["Ćevapi, svinjski vrat, kobasice i piletina.","Juneći ramstek, janjeći kotleti i pileći file.","Janjetina i teletina za peku, uz kobasice."],
      plan: "Prijedlog", total: "Ukupno, okvirno", add: "Stavite prijedlog u upit",
      note: "Količine su za sirovo meso. Ovo je procjena, a ne potvrda zalihe, cijene ni termina preuzimanja.",
      empty: "Upišite koliko vas je pa ćemo predložiti količine.",
      fitH: "Prilagodite plan svom društvu", fitP: "Djeca, meso s kosti, predjela i prilozi mijenjaju račun. Rezultat uzmite kao polazište za kupnju. Svako je druženje drugačije.",
      howH: "Kako planer računa", how: ["Odrasla osoba: oko 250 g (lagano), 350 g (normalno) ili 500 g (jako gladni) sirovog mesa.","Dijete je pola porcije odrasle osobe.","Zaokružuje se na četvrtinu kilograma. Najmanje je 0,25 kg po vrsti mesa."],
      howN: "Gramaže su prijedlog iz radne verzije. Konačno ih potvrđuje mesar.",
      more: "Pogledajte meso za roštilj",
    } : {
      h1: "How much meat do you need for a BBQ?",
      lead: "Enter how many are coming and pick a BBQ style. The planner suggests a rough amount of meat, which you can change before you send an enquiry.",
      adults: "Adults", kids: "Children", hunger: "How hungry?", style: "What kind of BBQ?",
      hungerOpts: ["Light","Normal","Very hungry"], styleOpts: ["Classic","Premium","Dalmatian"],
      styleDesc: ["Ćevapi, pork neck, sausages and chicken.","Beef striploin, lamb chops and chicken breast.","Lamb and veal for peka, with sausages."],
      plan: "Suggested amounts", total: "Estimated total", add: "Add this to your enquiry",
      note: "Quantities are for raw meat. This is an estimate, not a confirmation of stock, prices or collection time.",
      empty: "Enter a guest count to see a suggestion.",
      fitH: "Adjust it for your group", fitP: "Children, bone-in cuts, starters and sides all change the numbers. Use the result as somewhere to start. No two barbecues are the same.",
      howH: "How the planner works", how: ["Each adult: about 250 g (light), 350 g (normal) or 500 g (very hungry) of raw meat.","A child counts as half an adult.","Amounts are rounded to a quarter of a kilo, with at least 0.25 kg of each meat."],
      howN: "These amounts come from the working version. The butcher will confirm them.",
      more: "See BBQ meat",
    };
    const seg = (name, opts, sel, desc) => `<div class="seg" role="radiogroup">${opts.map((o, i) => `<label class="chip radio"><input type="radio" name="${name}" value="${i}"${i === sel ? " checked" : ""}><span>${esc(o)}</span>${desc ? `<small>${esc(desc[i])}</small>` : ""}</label>`).join("")}</div>`;
    return `
<section class="page-head"><div class="wrap feature">
  <div><h1>${esc(T.h1)}</h1><p class="lead">${esc(T.lead)}</p></div>
  ${pic("marinated", ALT.marinated[lang], { sizes: "(max-width: 860px) 100vw, 45vw", eager: true })}
</div></section>
<section class="block"><div class="wrap planner" id="planner" data-empty="${esc(T.empty)}">
  <form class="panel" id="plan-form">
    <div class="num-row">
      <div class="field"><label for="pl-adults">${esc(T.adults)}</label><input type="number" id="pl-adults" min="0" max="80" value="8" inputmode="numeric"></div>
      <div class="field"><label for="pl-kids">${esc(T.kids)}</label><input type="number" id="pl-kids" min="0" max="80" value="0" inputmode="numeric"></div>
    </div>
    <fieldset><legend>${esc(T.hunger)}</legend>${seg("hunger", T.hungerOpts, 1)}</fieldset>
    <fieldset><legend>${esc(T.style)}</legend>${seg("style", T.styleOpts, 0, T.styleDesc)}</fieldset>
  </form>
  <div class="panel">
    <span class="mono muted">${esc(T.plan)}</span>
    <ul class="plan-list" id="plan" aria-live="polite"><li class="muted">${esc(T.empty)}</li></ul>
    <div class="plan-total"><span>${esc(T.total)}</span><b class="num" id="plan-total">–</b></div>
    <button class="btn" type="button" id="plan-add">${esc(T.add)}</button>
    <p class="note">${esc(T.note)}</p>
  </div>
</div></section>
<section class="block"><div class="wrap two-col">
  <div><h2>${esc(T.fitH)}</h2><p>${esc(T.fitP)}</p><div class="ctas"><a class="btn ghost" href="${ROUTES.bbq[lang]}">${esc(T.more)}</a></div></div>
  <div><h2>${esc(T.howH)}</h2><ul class="ticks">${T.how.map(x => `<li>${esc(x)}</li>`).join("")}</ul><p class="note">${esc(T.howN)}</p></div>
</div></section>
${faqBlock(lang, ["large", "estimate"])}`;
  },

  villa(lang) {
    const hr = lang === "hr";
    const T = hr ? {
      eye: "Vile i jahte · na engleskom i hrvatskom",
      h1: "Meso za vile i jahte na dubrovačkom području",
      lead: "Roštilj u vili, večera na brodu, popis za privatnog chefa? Pošaljite nam što trebate od mesa i delikatesa, za koliko gostiju i za kada. Provjerit ćemo što imamo i predložiti izbor.",
      s: [["Prema vašoj kuhinji","Napišite rezove, količine i kako da zapakiramo. Radite li peku, roštilj ili steak večeru, recite nam i čime raspolažete u kuhinji te kada kuhate."],
          ["Lokacija i termin","U upitu navedite adresu vile ili ime broda, marinu i vez. Je li dostava moguća, koliko košta i kada stiže, potvrđujemo za svaki upit posebno. Ako dostava ne ide, provjerit ćemo možete li meso preuzeti u trgovini."],
          ["Potvrda prije pripreme","Prije nego što išta pripremimo, dogovaramo proizvode, eventualne zamjene, cijenu ili način obračuna te uvjete preuzimanja ili dostave. Poslan obrazac još nije potvrđena narudžba."]],
      boxH: "Paketi", formH: "Zatražite ponudu za svoju grupu",
      f: { type: "Vrsta lokacije", types: ["Vila","Apartman","Jahta"], date: "Željeni datum", guests: "Broj gostiju", name: "Kontakt osoba", tel: "Mobitel s pozivnim brojem države", email: "E-mail", where: "Adresa / naziv broda, marina i vez", wherePh: "npr. Vila Sunce, Orašac ili M/Y Adria, ACI Komolac, vez 12", box: "Odabrani paket", note: "Napomene o rezanju i pakiranju", notePh: "Rezovi, količine, pakiranje, alergeni", submit: "Pripremi upit", need: "Nedostaje nešto od ovoga: datum, broj gostiju, kontakt osoba, mobitel ili lokacija.", where2: "Bez lokacije ne možemo provjeriti što je izvedivo." },
      head: "Upit za vilu / jahtu – Mecara",
    } : {
      eye: "Villas & yachts · English and Croatian",
      h1: "Meat for villas and yachts in the Dubrovnik area",
      lead: "Barbecue at the villa, dinner on board, or a shopping list for your private chef? Send us the meat and deli items you want, the number of guests and the date. We'll check what we have and come back with a selection.",
      s: [["Prepared for your kitchen","List the cuts, quantities and how you'd like them packed. Tell us if it's a barbecue, a peka or a steak dinner, what equipment you have, and when you're cooking."],
          ["Location and timing","Give us the villa address, or the yacht name, marina and berth. Whether we can deliver, what it costs and when are confirmed case by case. If delivery isn't possible, we can talk about collection from the shop."],
          ["Confirmed before we prepare","Before we prepare anything, we agree the products, any substitutions, the price or weight-based calculation, and collection or delivery. Sending the form doesn't confirm a booking."]],
      boxH: "Selections", formH: "Request a quote for your group",
      f: { type: "Location type", types: ["Villa","Apartment","Yacht"], date: "Preferred date", guests: "Number of guests", name: "Contact name", tel: "Mobile number including country code", email: "Email", where: "Address / yacht name, marina and berth", wherePh: "e.g. Villa Sunset, Orašac or M/Y Adria, ACI Komolac, berth 12", box: "Preferred selection", note: "Cutting and packaging requests", notePh: "Cuts, quantities, packaging, allergens", submit: "Prepare enquiry", need: "We still need the date, guests, contact name, mobile and location.", where2: "Tell us where you'll be so we can check what's possible." },
      head: "Villa / yacht enquiry – Mecara",
    };
    const d = UI[lang].d;
    return `
<section class="page-head"><div class="wrap feature">
  <div><span class="mono eyebrow">${esc(T.eye)}</span><h1>${esc(T.h1)}</h1><p class="lead">${esc(T.lead)}</p><div class="ctas"><a class="btn" href="#upit-vila">${esc(T.formH)}</a></div></div>
  ${pic("interior2", ALT.interior[lang], { sizes: "(max-width: 860px) 100vw, 45vw", eager: true })}
</div></section>
<section class="block"><div class="wrap three-col">${T.s.map(x => `<div><h2>${esc(x[0])}</h2><p>${esc(x[1])}</p></div>`).join("")}</div></section>
<section class="block" id="upit-vila"><div class="wrap villa">
  <div><h2>${esc(T.boxH)}</h2><div class="boxes">${BOXES.map((b, i) => `<label class="box"><input type="radio" name="box" form="villa-form" value="${b.id}"${i === 0 ? " checked" : ""}><div><h3>${esc(b[lang][0])}</h3><p>${esc(b[lang][1])}</p></div><span class="mono muted">${esc(hr ? b.price : b.priceEn)}</span></label>`).join("")}</div></div>
  <form class="panel" id="villa-form" novalidate data-head="${esc(T.head)}" data-need="${esc(T.f.need)}">
    <h2>${esc(T.formH)}</h2>
    <div class="form-grid">
      <div class="field"><label for="v-type">${esc(T.f.type)}</label><select id="v-type">${T.f.types.map(x => `<option>${esc(x)}</option>`).join("")}</select></div>
      <div class="field"><label for="v-date">${esc(T.f.date)}</label><input type="date" id="v-date" required></div>
      <div class="field"><label for="v-guests">${esc(T.f.guests)}</label><input type="number" id="v-guests" min="2" max="80" value="8" inputmode="numeric" required></div>
      <div class="field"><label for="v-name">${esc(T.f.name)}</label><input type="text" id="v-name" maxlength="80" autocomplete="name" required></div>
      <div class="field"><label for="v-tel">${esc(T.f.tel)}</label><input type="tel" id="v-tel" maxlength="20" autocomplete="tel" inputmode="tel" placeholder="+44 7700 900123" required></div>
      <div class="field"><label for="v-email">${esc(T.f.email)}</label><input type="email" id="v-email" maxlength="120" autocomplete="email"></div>
      <div class="field full"><label for="v-where">${esc(T.f.where)}</label><input type="text" id="v-where" maxlength="160" placeholder="${esc(T.f.wherePh)}" required aria-describedby="v-where-h"><small class="note" id="v-where-h">${esc(T.f.where2)}</small></div>
      <div class="field full"><label for="v-note">${esc(T.f.note)}</label><textarea id="v-note" maxlength="800" placeholder="${esc(T.f.notePh)}"></textarea></div>
    </div>
    <input type="text" id="v-hp" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <p class="err" id="v-err" role="alert"></p>
    <button class="btn" type="submit">${esc(T.f.submit)}</button>
    <div class="result" id="v-result">
      <p class="status-line" role="status"></p>
      <b>${esc(d.ready)}</b><pre></pre>
      <p class="wip-note">${esc(d.wipNote)}</p>
      <div class="ctas"><a class="btn small wa" href="#" target="_blank" rel="noopener noreferrer" hidden>${esc(d.openWa)}</a><button class="btn small ghost" type="button" id="v-copy">${esc(d.copy)}</button></div>
    </div>
  </form>
</div></section>`;
  },

  workshops(lang) {
    const hr = lang === "hr", u = UI[lang];
    const T = hr ? {
      h1: "Radionice o mesu i pripremi steakova u Dubrovniku",
      lead: "Na radionici stojite s nama za pultom. Gledamo meso, kušamo, a vi pitate što vas zanima. Svaku najavimo s datumom, trajanjem, jezikom, cijenom i onim što ćemo raditi.",
      sH: "Što se radi", sP: "Ovisi o temi. Jednom biramo steak iz komore i pričamo o tavi i roštilju, drugi put slažemo platu od pršuta i sira. Grupe su male, da svi sve vide.",
      listH: "Nadolazeće radionice", seats: "mjesta", signup: "Prijavi se", added: "Prijava u upitu",
      howH: "Prijava", how: "Kliknite „Prijavi se” pa pošaljite upit. Mjesto vam potvrdimo porukom. Kad se radionica popuni, na gumbu piše da je popunjena.",
      ask: "Pitajte kad je sljedeća",
    } : {
      h1: "Meat and steak workshops in Dubrovnik",
      lead: "Our workshops happen at the counter, not in front of a slideshow. You look, you taste, you ask. Each one is listed with its date, length, language, price and what we'll actually be doing.",
      sH: "What happens on the night", sP: "Depends on the theme. One evening it's picking a steak from the ageing room and talking pans versus grills; another it's a proper board of prosciutto and cheese. Groups stay small so nobody's peering over shoulders.",
      listH: "Upcoming workshops", seats: "places", signup: "Sign up", added: "In your enquiry",
      howH: "Booking a place", how: "Hit “Sign up”, then send your enquiry. We'll message you to confirm. Once a workshop fills up, the button says so.",
      ask: "Ask about the next workshop",
    };
    return `
<section class="page-head"><div class="wrap feature">
  <div><h1>${esc(T.h1)}</h1><p class="lead">${esc(T.lead)}</p></div>
  ${pic("cutting", ALT.cutting[lang], { sizes: "(max-width: 860px) 100vw, 45vw", eager: true })}
</div></section>
<section class="block"><div class="wrap"><h2>${esc(T.listH)}</h2>
  <div class="courses">${WORKSHOPS.map(w => `<div class="course" data-ws="${w.id}"><div class="date">${esc(w.date)}<small>${esc(w.when[lang])}</small></div><div><h3>${esc(w[lang][0])}</h3><p>${esc(w[lang][1])}</p></div><span class="mono muted">${w.eur} € · ${w.seats} ${esc(T.seats)}</span><button class="btn small ghost" type="button" data-add="ws" data-id="${w.id}" data-done="${esc(T.added)}">${esc(T.signup)}</button></div>`).join("")}</div>
</div></section>
<section class="block"><div class="wrap two-col">
  <div><h2>${esc(T.sH)}</h2><p>${esc(T.sP)}</p></div>
  <div><h2>${esc(T.howH)}</h2><p>${esc(T.how)}</p><div class="ctas">${enquiryCta(lang, T.ask)}</div></div>
</div></section>`;
  },

  about(lang) {
    const hr = lang === "hr";
    const T = hr ? {
      h1: "Mecara, vaša mesnica u Lapadu",
      lead: "Mecara je mesnica u centru DOC u Lapadu. Na zidu bik, u vitrini meso, a za pultom netko tko će vas pitati što kuhate prije nego što išta stavi na vagu.",
      s: [["Prvo pitamo što kuhate","Gulaš i steak ne traže isti komad. Ni peka za osam ljudi i ručak za dvoje. Zato prvo pitamo za jelo, koliko vas je i pečete li na tavi, u pećnici ili na roštilju, a tek onda režemo. Ne znate kako se rez zove? Nema veze. Opišite jelo, to je dovoljno."],
          ["Pitajte slobodno","Odakle je, što je unutra, ima li ga danas. Na konkretno pitanje dobit ćete konkretan odgovor."],
          ["Svratite","Prvi sat na parkiralištu centra DOC i Tommyja je besplatan. Trebate li neki poseban rez ili veću količinu, javite se ranije."]],
      cta: "Pogledajte ponudu",
    } : {
      h1: "Mecara, your butcher shop in Lapad",
      lead: "We're a butcher's counter inside the DOC shopping centre in Lapad. Bull on the wall, meat in the cabinet, and someone behind the counter who'll ask what you're cooking before anything goes on the scale.",
      s: [["Tell us what's for dinner","A stew and a steak want different cuts. So do a peka for eight and lunch for two. We ask about the dish, the headcount and whether you've got a pan, an oven or a grill, and cut to suit. No idea what the cut is called? Describe the meal. That'll do."],
          ["Ask away","Where it's from, what's in it, whether it's in today. Ask about the actual piece and you'll get a proper answer."],
          ["Drop by","First hour at the DOC and Tommy car park is free. After something unusual, or a lot of it? Give us a shout first."]],
      cta: "See what's in",
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
      lead: "Dođite do nas u Lapad ili nam pošaljite upit. Trebate li određeni rez, veću količinu ili nešto spremno za točno određeni datum, napišite pojedinosti pa ćemo provjeriti što se može.",
      addrK: "Adresa", addrV: "Mecara, Kralja Tomislava 7, centar DOC, 20000 Dubrovnik",
      telK: "Telefon / WhatsApp", mailK: "E-mail",
      whatH: "Što napisati u upitu", whatP: "Proizvod ili jelo koje planirate, okvirnu količinu, datum i, ako vam je važno, kako da narežemo. Prije nego što krenete po meso, pričekajte da vam potvrdimo termin.",
      send: "Pošaljite upit",
    } : {
      h1: "Contact Mecara and find our shop",
      lead: "Come and see us in Lapad, or send an enquiry. If you need a specific cut, a larger quantity or something ready for a particular date, give us the details and we'll see what we can do.",
      addrK: "Address", addrV: "Mecara, Kralja Tomislava 7, DOC shopping centre, 20000 Dubrovnik, Croatia",
      telK: "Phone / WhatsApp", mailK: "Email",
      whatH: "What to include in your enquiry", whatP: "The product or dish you have in mind, roughly how much, the date, and how you want it cut if that matters. Wait until we've confirmed a collection time before you plan around it.",
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

export function layout(lang, page, opt = {}) {
  const u = UI[lang], other = lang === "hr" ? "en" : "hr";
  const [title, desc] = opt.meta || META[page][lang];
  const alt = opt.alt || { hr: ROUTES[page].hr, en: ROUTES[page].en };
  const url = abs(alt[lang]);
  const h1Title = page === "home" ? title : title.split(" — ")[0];
  const navKey = opt.navKey || page;
  const navTitle = (u.nav.find(n => n[0] === page) || [null, h1Title])[1];
  const ld = opt.ld || [page === "home" || page === "contact" ? storeLd() : null, page !== "home" ? crumbLd(lang, page, navTitle) : null].filter(Boolean);
  const ogImage = opt.ogImage || `${SITE.host}/img/og/mecara-dubrovnik.jpg`;
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
<link rel="alternate" hreflang="hr" href="${abs(alt.hr)}">
<link rel="alternate" hreflang="en" href="${abs(alt.en)}">
<link rel="alternate" hreflang="x-default" href="${abs(alt.hr)}">
<meta property="og:type" content="${opt.ogType || "website"}">
<meta property="og:site_name" content="Mecara">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${lang === "hr" ? "hr_HR" : "en_GB"}">
<meta property="og:locale:alternate" content="${lang === "hr" ? "en_GB" : "hr_HR"}">
<meta property="og:image" content="${ogImage}">${opt.ogImage ? "" : `\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">`}
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
<body data-page="${page}"${opt.bodyClass ? ` class="${opt.bodyClass}"` : ""}>
<a class="skip" href="#main">${esc(u.skip)}</a>
${SITE.wip ? `<div class="proto" role="note"><b>${esc(u.wip)}</b> <span>${esc(u.wipText)}</span></div>` : ""}
<header class="top">
  <div class="wrap">
    <a class="brand" href="${ROUTES.home[lang]}" aria-label="Mecara – ${esc(u.home)}">
      <img src="/img/wordmark.png" alt="Mecara" width="119" height="26">
      <span>${lang === "hr" ? "MESO DOMAĆIH UZGAJIVAČA" : "BUTCHER SHOP · DUBROVNIK"}</span>
    </a>
    <nav class="links" aria-label="${esc(u.navLabel)}">
      ${u.nav.map(([k, l]) => `<a href="${ROUTES[k][lang]}"${k === navKey ? ' aria-current="page"' : ""}>${esc(l)}</a>`).join("\n      ")}
    </nav>
    <nav class="lang-switch" aria-label="${lang === "hr" ? "Jezik" : "Language"}">${["hr", "en"].map(l => `<a href="${alt[l]}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="true"' : ""}><span aria-hidden="true">${l.toUpperCase()}</span><span class="sr">${l === "hr" ? "Hrvatski" : "English"}</span></a>`).join('<span class="sep" aria-hidden="true">|</span>')}</nav>
    <a class="cartbtn" href="${ROUTES.contact[lang]}" id="open-cart" data-open-enquiry aria-haspopup="dialog" aria-controls="drawer"><span class="lbl">${esc(u.enquiryBtn)}</span> <span class="n" id="cart-n">0</span></a>
  </div>
</header>
<nav class="bottom-nav" aria-label="${lang === "hr" ? "Brza navigacija" : "Quick navigation"}">
  ${[["ponuda", lang === "hr" ? "Ponuda" : "Shop"], ["steak", lang === "hr" ? "Komora" : "Steaks"], ["bbq", lang === "hr" ? "Roštilj" : "BBQ"], ["blog", "Blog"]].map(([k, l]) => `<a class="pill-nav" href="${ROUTES[k][lang]}"${k === navKey ? ' aria-current="page"' : ""}>${esc(l)}</a>`).join("")}
  <details class="more-nav"><summary class="pill-nav">${lang === "hr" ? "Više" : "More"}</summary>
    <div class="more-panel">${[["villa"], ["workshops"], ["about"], ["contact"]].map(([k]) => `<a href="${ROUTES[k][lang]}"${k === navKey ? ' aria-current="page"' : ""}>${esc(u.nav.find(n => n[0] === k)[1])}</a>`).join("")}
      <a href="${alt[other]}" hreflang="${other}" lang="${other}">${other === "en" ? "English" : "Hrvatski"}</a></div>
  </details>
</nav>
${opt.crumbsHtml !== undefined ? opt.crumbsHtml : crumbs(lang, page, navTitle)}
<main id="main" tabindex="-1">
${opt.body || PAGES[page](lang)}
</main>
<footer>
  <div class="wrap foot-grid">
    <div><img class="foot-logo" src="/img/wordmark.png" alt="Mecara" width="137" height="30" loading="lazy">
      <b>${esc(u.footTitle)}</b><br>${esc(u.footAddr)}<br>${esc(u.hoursText)}
      ${SITE.phone || SITE.email ? `<br>${[SITE.phone && (lang === "hr" ? "Telefon: " : "Phone: ") + esc(SITE.phone), SITE.email && "E-mail: " + esc(SITE.email)].filter(Boolean).join(" · ")}` : ""}
      ${SITE.legalName && SITE.oib ? `<br>${lang === "hr" ? "" : "Operated by "}${esc(SITE.legalName)} · OIB: ${esc(SITE.oib)}` : ""}
    </div>
    <nav aria-label="Footer"><a href="${ROUTES.home[lang]}">${esc(u.home)}</a>${u.nav.map(([k, l]) => `<a href="${ROUTES[k][lang]}">${esc(l)}</a>`).join("")}<a href="${esc(SITE.instagram)}" rel="noopener noreferrer">Instagram</a><a href="${alt[other]}" hreflang="${other}" lang="${other}">${esc(u.other)}</a></nav>
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
    <input type="text" id="c-hp" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <div class="field"><label for="c-name">${esc(d.name)}</label><input type="text" id="c-name" maxlength="80" autocomplete="name"></div>
    <div class="field"><label for="c-tel">${esc(d.tel)}</label><input type="tel" id="c-tel" placeholder="+385 9x xxx xxxx" maxlength="20" autocomplete="tel" inputmode="tel"></div>
    <div class="field"><label for="c-note">${esc(d.note)}</label><textarea id="c-note" maxlength="600" placeholder="${esc(d.notePh)}"></textarea></div>
    <div class="result" id="result">
      <p class="status-line" role="status"></p>
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
const pages = Object.keys(ROUTES).filter(p => p !== "blog" && !ROUTES[p].alias);
const MERGED = { steak: "steakMerged", bbq: "bbqMerged" };
for (const page of pages) for (const lang of ["hr", "en"]) {
  let body = MERGED[page] ? PAGES[MERGED[page]](lang) : undefined;
  if (page === "steak" && body) body = body.replace(/<a class="btn ghost" href="[^"]*">(Svi odležani steakovi|All dry-aged steaks)<\/a>/, "");
  write(join(ROUTES[page][lang], "index.html"), layout(lang, page, body ? { body } : {}));
}
write("404.html", notFound());

const catalog = {
  site: { whatsapp: SITE.whatsapp, enquiryLive: !!(SITE.enquiryLive && /^\d{10,15}$/.test(SITE.whatsapp)), hours: SITE.hours },
  products: Object.fromEntries(PRODUCTS.map(p => [p.id, { u: p.unit, eur: p.eur, hr: p.hr.name, en: p.en.name }])),
  cuts: Object.fromEntries(CUTS.map(c => [c.id, { hr: c.hr[0], en: c.en[0], kg: c.kg, eur: c.eur, day: c.day }])),
  workshops: Object.fromEntries(WORKSHOPS.map(w => [w.id, { hr: w.hr[0], en: w.en[0], date: w.date, eur: w.eur, seats: w.seats }])),
  planner: { grams: [250, 350, 500], styles: [[["p15",.3],["p10",.3],["p16",.2],["p13",.2]],[["p2",.4],["p9",.3],["p14",.3]],[["p8",.45],["p7",.35],["p16",.2]]] },
  ui: Object.fromEntries(["hr", "en"].map(l => [l, { ...UI[l].d, reserved: UI[l].reserved, days: UI[l].days, ready: UI[l].ready, inDays: UI[l].inDays, cutAdd: UI[l].cutAdd, unit: UI[l].unit, qty: UI[l].qty, less: UI[l].less, more: UI[l].more, add: UI[l].add }])),
  added: { hr: UI.hr.added, en: UI.en.added }, add: { hr: UI.hr.add, en: UI.en.add },
};
write("js/catalog.js", `/* Generirano iz build/content.mjs – ne uređivati ručno */\nwindow.MECARA=${JSON.stringify(catalog)};\n`);

const { buildBlog } = await import("./blog-build.mjs");
const blog = buildBlog({ layout, write, ROUTES, UI, SITE, abs });
const smPairs = [...pages.map(p => ROUTES[p]), ...blog.sitemap];
// početni podaci za bazu (Worker ih upiše ako su tablice prazne)
writeFileSync(join(ROOT, "..", "src", "seed-data.js"), "// Generirano iz build/content.mjs\nexport default " + JSON.stringify({
  products: PRODUCTS.map(p => ({ id: p.id, cat: p.cat, unit: p.unit, name_hr: p.hr.name, name_en: p.en.name, desc_hr: p.hr.desc, desc_en: p.en.desc, eur: p.eur })),
  cuts: CUTS.map(c => ({ id: c.id, name_hr: c.hr[0], name_en: c.en[0], sub_hr: c.sub.hr, sub_en: c.sub.en, desc_hr: c.hr[1], desc_en: c.en[1], kg: c.kg, day: c.day, target: c.target, eur: c.eur })),
  workshops: WORKSHOPS.map(w => ({ id: w.id, date: "2026-" + w.date.split(".").filter(Boolean).reverse().join("-"), when_hr: w.when.hr, when_en: w.when.en, title_hr: w.hr[0], title_en: w.en[0], desc_hr: w.hr[1], desc_en: w.en[1], eur: w.eur, seats: w.seats })),
}) + ";\n");
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${smPairs.flatMap(r => ["hr", "en"].map(l => `  <url><loc>${abs(r[l])}</loc><xhtml:link rel="alternate" hreflang="hr" href="${abs(r.hr)}"/><xhtml:link rel="alternate" hreflang="en" href="${abs(r.en)}"/></url>`)).join("\n")}
</urlset>
`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE.host}/sitemap.xml\n`);
console.log("OK:", pages.length * 2, "stranica +", blog.count * 2, "članaka + blog/rubrike, 404, sitemap, robots, catalog");
