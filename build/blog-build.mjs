// Blog "Za stolom s Mecarom" – generira /blog/ i /en/blog/ (naslovnica, rubrike, članci).
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseBlog, toBlocks, renderBlocks, wordCount, inline, esc } from "./blog-parse.mjs";
import { BLOG_IMAGES } from "./blog-images.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "blog-source.md");
const PUBLISHED = "2026-11-02";

export const BLOG_ROUTES = { hr: "/blog/", en: "/en/blog/" };
export const CATS = [
  { id: "danas",   hr: ["Što danas kuhati?", "sto-danas-kuhati"],         en: ["What to Cook Today", "what-to-cook-today"],
    intro: { hr: "Piletina iz pećnice, mesne okruglice, ručak iz jedne tave. Recepti s popisom sastojaka i koracima koje je lako pratiti.", en: "Oven chicken, meatballs, a one-pan dinner. Recipes with a proper ingredient list and steps you can actually follow." } },
  { id: "mesar",   hr: ["Pitaj mesara", "pitaj-mesara"],                   en: ["Ask the Butcher", "ask-the-butcher"],
    intro: { hr: "Koji rez uzeti, koje meso ide u gulaš i što pitati kad kupujete mljeveno. Krenite od jela koje želite skuhati.", en: "Which cut to buy, what goes in a stew, what to ask about mince. Start with what you want to cook." } },
  { id: "rostilj", hr: ["Roštilj i steakovi", "rostilj-i-steakovi"],       en: ["BBQ & Steaks", "bbq-and-steaks"],
    intro: { hr: "Koliko mesa kupiti, kako ispeći steak na tavi i koje pogreške roštilj čine težim nego što mora biti.", en: "How much to buy, how to cook a steak in a pan, and the usual mistakes that make a barbecue harder than it should be." } },
  { id: "kuhinja", hr: ["Iz dubrovačke kuhinje", "iz-dubrovacke-kuhinje"], en: ["From the Dubrovnik Table", "from-the-dubrovnik-table"],
    intro: { hr: "Peka, pršut, sir i nedjeljni stol. Ideje iz načina na koji se na jugu kuha i sjedi za stolom.", en: "Peka, prosciutto, cheese and Sunday lunch. Ideas taken from how people cook and eat together in the south of Croatia." } },
  { id: "gosti",   hr: ["Za goste Dubrovnika", "za-goste-dubrovnika"],     en: ["For Visitors to Dubrovnik", "for-visitors-to-dubrovnik"],
    intro: { hr: "Kuhate u apartmanu ili vili? Što pitati u mesnici, kako isplanirati kupnju i što znače imena domaćih jela.", en: "Cooking in an apartment or villa in Dubrovnik? What to ask at the butcher, how to plan the shopping and what the local dish names mean." } },
];
const catPath = (c, lang) => lang === "hr" ? `/blog/rubrika/${c.hr[1]}/` : `/en/blog/category/${c.en[1]}/`;
const artPath = (a, lang) => lang === "hr" ? `/blog/${a.slug.hr}/` : `/en/blog/${a.slug.en}/`;

const RELATED = { M01: ["R02","M02","T03"], M02: ["T03","M01","K03"], M03: ["T02","R03","G02"], R01: ["R03","G03","M03"], R02: ["M01","T03","G01"], R03: ["R01","G03","M03"],
  K01: ["G02","K03","M02"], K02: ["G02","K03","G03"], K03: ["T01","K01","K02"], G01: ["G02","T03","G03"], G02: ["K01","K02","M03"], G03: ["R01","R03","G01"],
  T01: ["T02","K03","G01"], T02: ["M03","T01","T03"], T03: ["M02","M01","T02"] };
// CTA → postojeće prodajne stranice
const CTA = { M01: ["steak"], M02: ["ponuda","#junetina"], M03: ["ponuda","#junetina"], R01: ["planner"], R02: ["komora"], R03: ["bbq"], K01: ["ponuda","#janjetina"], K02: ["ponuda","#suho"],
  K03: ["ponuda"], G01: ["contact"], G02: ["bbq"], G03: ["villa"], T01: ["ponuda","#piletina"], T02: ["ponuda","#junetina"], T03: ["ponuda","#junetina"] };
const RECIPE = { T01: { protein: "piletina", time: "slow", total: 65 }, T02: { protein: "mljeveno", time: "60", total: 50 }, T03: { protein: "junetina", time: "45", total: 40 } };

const T = {
  hr: { blog: "Blog", h1: "Za stolom s Mecarom", intro: "Ideje za ručak, odgovori na pitanja o mesu i pokoji savjet za roštilj. Od izbora komada do tanjura. Nađite nešto što vam se danas kuha.",
        title: "Savjeti o mesu i ideje za ručak — Mecara blog", desc: "Što danas kuhati, koje meso uzeti i kako isplanirati roštilj. Recepti i praktični savjeti s Mecarina bloga.",
        today: "Što danas kuhati?", all: "Svi članci", cats: "Rubrike", read: "Pročitajte članak", recipe: "Pogledajte recept", ingredients: "Sastojci", method: "Priprema", servings: "Broj porcija",
        time: "Okvirno vrijeme", print: "Ispišite recept", related: "Povezani članci", explore: "Pogledajte što imamo", serving: "Ilustracija posluživanja", cut: "Ilustracija reza", photo: "Fotografija",
        published: "Objavljeno", minRead: "min čitanja", none: "Ništa ne odgovara ovom filteru.", showAll: "Prikaži sve", sources: "Izvori i dodatne informacije", home: "Naslovnica",
        fProtein: "Vrsta mesa", fTime: "Vrijeme", proteins: [["piletina","Piletina"],["junetina","Junetina"],["mljeveno","Mljeveno meso"]], times: [["45","Do 45 min"],["60","Do 60 min"],["slow","Bez žurbe"]],
        less: "Manje porcija", more: "Više porcija", scaleNote: "Količine se preračunaju prema broju porcija. Temperaturu, vrijeme pečenja i veličinu posude prilagodite sami, to se ne mijenja automatski.",
        catTitle: n => `${n} — Mecara blog`, placeholder: "Fotografija u pripremi", doneness: "Je li meso gotovo, provjerite termometrom. Vremena su okvirna." },
  en: { blog: "Blog", h1: "At the Table with Mecara", intro: "Dinner ideas, answers to your meat questions and some practical help with the barbecue. Come for a cut, leave with a recipe, or just find something to cook tonight.",
        title: "Meat Guides & Everyday Recipes — Mecara Blog", desc: "Dinner ideas, advice on choosing meat and practical BBQ guides from Mecara, for cooking in Dubrovnik or back home.",
        today: "What to Cook Today", all: "All articles", cats: "Categories", read: "Read the article", recipe: "View recipe", ingredients: "Ingredients", method: "Method", servings: "Servings",
        time: "Approximate time", print: "Print recipe", related: "Related articles", explore: "See what we have", serving: "Serving illustration", cut: "Cut illustration", photo: "Photo",
        published: "Published", minRead: "min read", none: "Nothing matches that filter.", showAll: "Show all", sources: "Sources and further reading", home: "Home",
        fProtein: "Meat", fTime: "Time", proteins: [["piletina","Chicken"],["junetina","Beef"],["mljeveno","Mince"]], times: [["45","Up to 45 min"],["60","Up to 60 min"],["slow","No rush"]],
        less: "Fewer servings", more: "More servings", scaleNote: "Quantities change with the number of servings. Oven temperature, cooking time and dish size don't, so adjust those yourself.",
        catTitle: n => `${n} — Mecara Blog`, placeholder: "Photo coming soon", doneness: "Use a thermometer to check doneness. Times are a guide." },
};

function parseSources() {
  const md = readFileSync(SRC, "utf8"); const out = {};
  for (const l of md.split("\n")) { const m = l.match(/^- \*\*(S\d+) — ([^*]+?):\*\*\s+(https?:\/\/\S+)/); if (m) out[m[1]] = { name: m[2].trim(), url: m[3] }; }
  return out;
}

export function buildBlog({ layout, write, ROUTES, UI, SITE, abs }) {
  const arts = parseBlog(SRC); const byId = Object.fromEntries(arts.map(a => [a.id, a])); const SOURCES = parseSources();
  const catById = Object.fromEntries(CATS.map(c => [c.id, c]));
  const fmtDate = lang => new Date(PUBLISHED + "T12:00:00Z").toLocaleDateString(lang === "hr" ? "hr-HR" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const minutes = (a, lang) => Math.max(1, Math.ceil(wordCount(a[lang]) / 200));

  function img(a, lang, { sizes = "(max-width: 760px) 100vw, 33vw", eager = false, cls = "ph" } = {}) {
    const im = BLOG_IMAGES[a.id];
    if (!im) return `<div class="${cls} ph-brand" role="img" aria-label="${esc(T[lang].placeholder)}"><img src="/img/bull.png" alt="" width="520" height="289" loading="lazy"><span>${esc(T[lang].placeholder)}</span></div>`;
    const load = eager ? `loading="eager" fetchpriority="high"` : `loading="lazy"`;
    return `<picture class="${cls}"><source type="image/webp" srcset="${im.base}-800.webp 800w, ${im.base}.webp 1600w" sizes="${sizes}"><img src="${im.base}-800.jpg" srcset="${im.base}-800.jpg 800w, ${im.base}.jpg 1600w" sizes="${sizes}" alt="${esc(im.alt[lang])}" width="${im.w}" height="${im.h}" ${load} decoding="async"></picture>`;
  }
  function caption(a, lang) {
    const im = BLOG_IMAGES[a.id]; if (!im) return "";
    if (im.kind === "mecara") return `<figcaption>${esc(im.alt[lang])} · ${lang === "hr" ? "Fotografija: Mecara" : "Photo: Mecara"}</figcaption>`;
    const label = im.label === "cut" ? T[lang].cut : T[lang].serving;
    return `<figcaption>${esc(label)} · ${esc(T[lang].photo)}: <a href="${esc(im.page)}" rel="noopener noreferrer">${esc(im.photographer)}</a>, ${esc(im.site)}</figcaption>`;
  }
  function card(a, lang) {
    const c = catById[a.cat], r = RECIPE[a.id];
    return `<article class="post-card"${r ? ` data-protein="${r.protein}" data-time="${r.time}"` : ""}>
      <a class="post-card-img" href="${artPath(a, lang)}" tabindex="-1" aria-hidden="true">${img(a, lang)}</a>
      <div class="post-card-body"><a class="cat-label" href="${catPath(c, lang)}">${esc(c[lang][0])}</a>
      <h3><a href="${artPath(a, lang)}">${esc(a[lang + "H1"])}</a></h3>
      <p>${esc(a.excerpt[lang])}</p>
      <div class="post-card-foot"><span class="mono muted">${minutes(a, lang)} ${esc(T[lang].minRead)}${r ? ` · ~${r.total} min` : ""}</span><a class="more" href="${artPath(a, lang)}">${esc(a.recipe ? T[lang].recipe : T[lang].read)} →</a></div></div>
    </article>`;
  }
  const crumbsHtml = (lang, items) => `<nav class="crumbs wrap" aria-label="${esc(UI[lang].crumbs)}">${items.map((it, i) => i === items.length - 1 ? `<span aria-current="page">${esc(it[0])}</span>` : `<a href="${it[1]}">${esc(it[0])}</a>`).join(' <span aria-hidden="true">/</span> ')}</nav>`;
  const crumbLd = (items) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it[0], item: abs(it[1]) })) });
  const sitemap = [];

  /* ---------- naslovnica bloga ---------- */
  for (const lang of ["hr", "en"]) {
    const t = T[lang], recipes = arts.filter(a => a.cat === "danas"), others = arts.filter(a => a.cat !== "danas");
    const chips = (name, label, opts) => `<div class="filter-group" role="group" aria-label="${esc(label)}"><span class="legend">${esc(label)}</span>${opts.map(([v, l]) => `<button type="button" class="chip" data-filter="${name}" data-value="${v}" aria-pressed="false">${esc(l)}</button>`).join("")}</div>`;
    const body = `
<section class="page-head blog-head"><div class="wrap">
  <span class="mono eyebrow">${esc(t.blog)}</span><h1>${esc(t.h1)}</h1><p class="lead">${esc(t.intro)}</p>
  <nav class="chips" aria-label="${esc(t.cats)}">${CATS.map(c => `<a class="chip" href="${catPath(c, lang)}">${esc(c[lang][0])}</a>`).join("")}</nav>
</div></section>
<section class="block" id="danas"><div class="wrap">
  <div class="sec-head"><div><h2>${esc(t.today)}</h2><p>${esc(catById.danas.intro[lang])}</p></div></div>
  <div class="filters blog-filters">${chips("protein", t.fProtein, t.proteins)}${chips("time", t.fTime, t.times)}<button type="button" class="btn small ghost" id="f-reset">${esc(t.showAll)}</button></div>
  <div class="post-grid" id="recipe-grid">${recipes.map(a => card(a, lang)).join("")}</div>
  <p class="empty" id="f-empty" hidden>${esc(t.none)}</p>
</div></section>
<section class="block"><div class="wrap"><h2>${esc(t.all)}</h2>
  ${CATS.filter(c => c.id !== "danas").map(c => `<div class="blog-cat"><div class="sec-head"><div><h3><a href="${catPath(c, lang)}">${esc(c[lang][0])}</a></h3><p>${esc(c.intro[lang])}</p></div></div>
  <div class="post-grid">${others.filter(a => a.cat === c.id).map(a => card(a, lang)).join("")}</div></div>`).join("")}
</div></section>`;
    const items = [[UI[lang].home, ROUTES.home[lang]], [t.blog, BLOG_ROUTES[lang]]];
    write(join(BLOG_ROUTES[lang], "index.html"), layout(lang, "blog", { meta: [t.title, t.desc], alt: BLOG_ROUTES, navKey: "blog", body, crumbsHtml: crumbsHtml(lang, items), ld: [crumbLd(items)] }));
    if (lang === "hr") sitemap.push(BLOG_ROUTES);
  }

  /* ---------- rubrike ---------- */
  for (const c of CATS) for (const lang of ["hr", "en"]) {
    const t = T[lang], list = arts.filter(a => a.cat === c.id);
    const body = `
<section class="page-head blog-head"><div class="wrap">
  <a class="mono eyebrow" href="${BLOG_ROUTES[lang]}">${esc(t.h1)}</a><h1>${esc(c[lang][0])}</h1><p class="lead">${esc(c.intro[lang])}</p>
  <nav class="chips" aria-label="${esc(t.cats)}">${CATS.map(x => `<a class="chip" href="${catPath(x, lang)}"${x.id === c.id ? ' aria-current="page"' : ""}>${esc(x[lang][0])}</a>`).join("")}</nav>
</div></section>
<section class="block"><div class="wrap"><div class="post-grid">${list.map(a => card(a, lang)).join("")}</div></div></section>`;
    const items = [[UI[lang].home, ROUTES.home[lang]], [t.blog, BLOG_ROUTES[lang]], [c[lang][0], catPath(c, lang)]];
    write(join(catPath(c, lang), "index.html"), layout(lang, "blog", { meta: [t.catTitle(c[lang][0]), c.intro[lang]], alt: { hr: catPath(c, "hr"), en: catPath(c, "en") }, navKey: "blog", body, crumbsHtml: crumbsHtml(lang, items), ld: [crumbLd(items)] }));
    if (lang === "hr") sitemap.push({ hr: catPath(c, "hr"), en: catPath(c, "en") });
  }

  /* ---------- članci ---------- */
  for (const a of arts) for (const lang of ["hr", "en"]) {
    const t = T[lang], c = catById[a.cat], blocks = toBlocks(a[lang]);
    const introBlock = blocks.findIndex(b => b.type === "p");
    const intro = introBlock >= 0 ? blocks.splice(introBlock, 1)[0] : null;
    const ctaIdx = blocks.findIndex(b => b.type === "cta"); const cta = ctaIdx >= 0 ? blocks.splice(ctaIdx, 1)[0] : null;
    let recipeCard = "";
    if (a.recipe) {
      const fi = blocks.findIndex(b => b.type === "facts"); const facts = fi >= 0 ? blocks.splice(fi, 1)[0].items : [];
      const sv = facts.find(f => /Porcije|Serves/.test(f[0])); const base = sv ? parseInt(sv[1], 10) : 4;
      blocks.forEach(b => { if (b.type === "ul") b.ingredients = true; });
      recipeCard = `<div class="recipe-card" data-base="${base}">
        <div class="servings"><span class="legend" id="sv-l-${lang}">${esc(t.servings)}</span>
          <div class="stepper" role="group" aria-labelledby="sv-l-${lang}"><button type="button" data-sv="-1" aria-label="${esc(t.less)}">−</button><output id="sv-out" aria-live="polite">${base}</output><button type="button" data-sv="1" aria-label="${esc(t.more)}">+</button></div></div>
        <dl class="recipe-facts">${facts.filter(f => f !== sv).map(f => `<div><dt>${esc(f[0])}</dt><dd>${inline(f[1])}</dd></div>`).join("")}</dl>
        <p class="note">${esc(t.scaleNote)} ${esc(t.doneness)}</p>
        <button type="button" class="btn small ghost" id="print-recipe">${esc(t.print)}</button>
      </div>`;
    }
    const ctaKey = CTA[a.id]; const ctaHref = ROUTES[ctaKey[0]][lang] + (ctaKey[1] || "");
    const srcList = a.sources.filter(s => SOURCES[s]);
    const rel = RELATED[a.id].map(id => byId[id]);
    const im = BLOG_IMAGES[a.id];
    const body = `
<article class="post${a.recipe ? " is-recipe" : ""}">
  <header class="post-head wrap narrow">
    <a class="cat-label" href="${catPath(c, lang)}">${esc(c[lang][0])}</a>
    <h1>${esc(a[lang + "H1"])}</h1>
    ${intro ? `<p class="lead">${inline(intro.text)}</p>` : ""}
    <p class="post-meta mono muted">${minutes(a, lang)} ${esc(t.minRead)} · ${esc(t.published)} <time datetime="${PUBLISHED}">${esc(fmtDate(lang))}</time></p>
  </header>
  <figure class="post-hero wrap">${img(a, lang, { sizes: "(max-width: 1180px) 100vw, 1140px", eager: true, cls: "ph hero-img" })}${caption(a, lang)}</figure>
  <div class="reading"><div class="wrap narrow prose">
    ${recipeCard}
    ${renderBlocks(blocks, { recipe: a.recipe, lang })}
    ${cta ? `<aside class="cta-card"><p>${inline(cta.text)}</p><a class="btn" href="${ctaHref}">${esc(t.explore)}</a></aside>` : ""}
    ${srcList.length ? `<details class="sources"><summary>${esc(t.sources)}</summary><ul>${srcList.map(s => `<li><a href="${esc(SOURCES[s].url)}" rel="noopener noreferrer">${esc(SOURCES[s].name)}</a></li>`).join("")}</ul></details>` : ""}
  </div></div>
  <section class="block related"><div class="wrap"><h2>${esc(t.related)}</h2><div class="post-grid">${rel.map(r => card(r, lang)).join("")}</div></div></section>
</article>`;
    const items = [[UI[lang].home, ROUTES.home[lang]], [t.blog, BLOG_ROUTES[lang]], [c[lang][0], catPath(c, lang)], [a[lang + "H1"], artPath(a, lang)]];
    const imgAbs = im ? SITE.host + im.base + ".jpg" : SITE.host + "/img/og/mecara-dubrovnik.jpg";
    const ld = [{ "@context": "https://schema.org", "@type": "BlogPosting", headline: a.title[lang], description: a.desc[lang], inLanguage: lang, image: imgAbs,
      datePublished: PUBLISHED, dateModified: PUBLISHED, mainEntityOfPage: abs(artPath(a, lang)),
      publisher: { "@type": "Organization", name: "Mecara", logo: { "@type": "ImageObject", url: SITE.host + "/img/logo-full.png" } } }, crumbLd(items)];
    write(join(artPath(a, lang), "index.html"), layout(lang, "blog", { meta: [a.title[lang], a.desc[lang]], alt: { hr: artPath(a, "hr"), en: artPath(a, "en") }, navKey: "blog", body,
      crumbsHtml: crumbsHtml(lang, items), ld, ogType: "article", ogImage: im ? imgAbs : null, bodyClass: a.recipe ? "recipe-page" : "" }));
    if (lang === "hr") sitemap.push({ hr: artPath(a, "hr"), en: artPath(a, "en") });
  }
  return { sitemap, count: arts.length };
}
