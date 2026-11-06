/* Mecara admin panel */
(function () {
"use strict";
const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const money = n => Number(n || 0).toLocaleString("hr-HR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const CATS = { junetina: "Junetina", teletina: "Teletina", janjetina: "Janjetina", svinjetina: "Svinjetina i odojak", piletina: "Piletina", rostilj: "Za roštilj", suho: "Suhomesnato", sir: "Sirevi", gotovo: "Gotova jela", spenza: "Spenza, vino i rakija" };
const UNITS = { kg: "€/kg", g100: "€/100 g", kom: "€/kom" };
const STATUS = { novo: "Novo", potvrdeno: "Potvrđeno", spremno: "Spremno za preuzimanje", preuzeto: "Preuzeto", odbijeno: "Odbijeno" };
let D = null, tab = "upiti", enqFilter = "aktivni";

function toast(m) { const t = $("toast"); t.textContent = m; t.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2400); }
async function call(path, method = "GET", body) {
  const r = await fetch(path, { method, credentials: "same-origin", headers: body !== undefined || method !== "GET" ? { "content-type": "application/json", "x-mecara": "1" } : {}, body: body !== undefined ? JSON.stringify(body) : undefined });
  let data = {}; try { data = await r.json(); } catch (e) {}
  if (r.status === 401 && !path.endsWith("/login")) { showLogin(); throw new Error(data.error || "Prijavite se."); }
  if (!r.ok) throw new Error(data.error || "Greška (" + r.status + ").");
  return data;
}

/* ---------- prijava ---------- */
function showLogin() { $("login-view").hidden = false; $("tabs").hidden = true; $("user").hidden = true; document.querySelectorAll(".view").forEach(v => v.hidden = true); setTimeout(() => $("l-email").focus(), 50); }
$("login-form").addEventListener("submit", async e => {
  e.preventDefault(); $("l-err").textContent = "";
  const btn = e.submitter || e.target.querySelector("button"); btn.disabled = true;
  try { await call("/api/admin/login", "POST", { email: $("l-email").value.trim(), password: $("l-pass").value }); $("l-pass").value = ""; await load(); }
  catch (err) { $("l-err").textContent = err.message; }
  finally { btn.disabled = false; }
});
$("logout").addEventListener("click", async () => { try { await call("/api/admin/logout", "POST", {}); } catch (e) {} D = null; showLogin(); });

async function load() {
  D = await call("/api/admin/data");
  $("login-view").hidden = true; $("tabs").hidden = false; $("user").hidden = false; $("user-email").textContent = D.email;
  render();
}

/* ---------- kartice ---------- */
document.querySelectorAll("[data-tab]").forEach(b => b.addEventListener("click", () => { tab = b.dataset.tab; render(); }));
function render() {
  document.querySelectorAll("[data-tab]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.tab === tab)));
  document.querySelectorAll(".view").forEach(v => v.hidden = v.id !== "v-" + tab);
  $("b-novo").textContent = D.enquiries.filter(e => e.status === "novo").length;
  ({ upiti: renderEnq, komora: renderCuts, proizvodi: renderProducts, radionice: renderWorkshops, postavke: () => {} })[tab]();
}

/* ---------- upiti ---------- */
function renderEnq() {
  const f = $("enq-filter"); f.textContent = "";
  [["aktivni", "Aktivni"], ["novo", "Novo"], ["potvrdeno", "Potvrđeno"], ["spremno", "Spremno"], ["preuzeto", "Preuzeto"], ["odbijeno", "Odbijeno"], ["svi", "Svi"]].forEach(([k, l]) => {
    const b = document.createElement("button"); b.type = "button"; b.className = "chip"; b.textContent = l; b.setAttribute("aria-pressed", String(enqFilter === k));
    b.addEventListener("click", () => { enqFilter = k; renderEnq(); }); f.appendChild(b);
  });
  const list = D.enquiries.filter(e => enqFilter === "svi" ? true : enqFilter === "aktivni" ? ["novo", "potvrdeno", "spremno"].includes(e.status) : e.status === enqFilter);
  const el = $("enq-list"); el.textContent = "";
  if (!list.length) { el.innerHTML = '<p class="empty">Nema upita u ovom prikazu.</p>'; return; }
  for (const e of list) {
    let items = [], extra = null; try { items = JSON.parse(e.items_json || "[]"); } catch (x) {} try { extra = e.extra_json ? JSON.parse(e.extra_json) : null; } catch (x) {}
    const digits = (e.phone || "").replace(/\D/g, "");
    const card = document.createElement("article"); card.className = "enq st-" + e.status;
    card.innerHTML = `
      <div class="enq-head"><b>#${e.id}</b><span class="pill">${e.source === "villa" ? "Vila / jahta" : "Web upit"}</span><span class="status">${esc(STATUS[e.status] || e.status)}</span><span class="muted">${esc(new Date(e.created_at.replace(" ", "T") + "Z").toLocaleString("hr-HR", { timeZone: "Europe/Zagreb" }))}</span></div>
      <div class="enq-grid">
        <div><div class="k">Kupac</div><div>${esc(e.name)} · <span lang="${esc(e.lang)}">${e.lang === "en" ? "engleski" : "hrvatski"}</span></div>
          <div class="contact"><a href="tel:${esc(e.phone.replace(/[^\d+]/g, ""))}">${esc(e.phone)}</a>${digits ? ` · <a href="https://wa.me/${digits}" target="_blank" rel="noopener noreferrer">WhatsApp</a>` : ""}${e.email ? ` · <a href="mailto:${esc(e.email)}">${esc(e.email)}</a>` : ""}</div></div>
        ${e.pickup ? `<div><div class="k">Željeno preuzimanje</div><div>${esc(e.pickup)}</div></div>` : ""}
        ${extra ? `<div><div class="k">Vila / jahta</div><div>${esc(extra.box)} · ${esc(extra.type)} · ${esc(extra.date)} · ${esc(extra.guests)} gostiju<br>${esc(extra.where)}</div></div>` : ""}
      </div>
      ${items.length ? `<ul class="enq-items">${items.map(i => `<li><span>${i.type === "cut" ? "Komora: " : i.type === "ws" ? "Radionica: " : ""}${esc(i.name)}</span><span class="muted">${i.type === "p" ? esc(i.unit === "kg" ? i.qty + " kg" : i.unit === "g100" ? (i.qty * 100) + " g" : i.qty + " kom") : i.type === "cut" ? esc(i.kg + " kg · " + i.day + " dana") : esc(i.date || "")}</span><b>${money(i.eur)}</b></li>`).join("")}<li class="tot"><span>Okvirno ukupno</span><span></span><b>${money(e.total_eur)}</b></li></ul>` : ""}
      ${e.note ? `<p class="enq-note"><span class="k">Napomena kupca:</span> ${esc(e.note)}</p>` : ""}
      <div class="enq-act">
        <label class="field"><span class="k">Status</span><select data-f="status">${Object.entries(STATUS).map(([k, l]) => `<option value="${k}"${k === e.status ? " selected" : ""}>${l}</option>`).join("")}</select></label>
        <label class="field grow"><span class="k">Interna bilješka</span><input type="text" data-f="admin_note" maxlength="800" value="${esc(e.admin_note || "")}" placeholder="npr. javljeno kupcu, težina 1,08 kg"></label>
        <button type="button" class="btn small" data-save>Spremi</button>
        <button type="button" class="btn small ghost danger" data-del>Obriši</button>
      </div>`;
    card.querySelector("[data-save]").addEventListener("click", async () => {
      try { await call("/api/admin/enquiries/" + e.id, "POST", { status: card.querySelector('[data-f="status"]').value, admin_note: card.querySelector('[data-f="admin_note"]').value }); toast("Upit #" + e.id + " spremljen."); await load(); }
      catch (err) { toast(err.message); }
    });
    armDelete(card.querySelector("[data-del]"), async () => { await call("/api/admin/enquiries/" + e.id, "DELETE"); toast("Upit obrisan."); await load(); });
    el.appendChild(card);
  }
}
function armDelete(btn, fn) {
  btn.addEventListener("click", async () => {
    if (btn.dataset.armed !== "1") { btn.dataset.armed = "1"; const t = btn.textContent; btn.textContent = "Potvrdi brisanje"; setTimeout(() => { btn.dataset.armed = ""; btn.textContent = t; }, 3500); return; }
    try { await fn(); } catch (err) { toast(err.message); }
  });
}

/* ---------- komora ---------- */
function renderCuts() {
  const el = $("cuts-list"); el.textContent = "";
  for (const c of D.cuts) {
    const res = c.reserved_enquiry != null, ready = c.day >= c.target;
    const row = document.createElement("article"); row.className = "row-card" + (c.active ? "" : " off");
    row.innerHTML = `<div class="rc-main"><b>${esc(c.name_hr)}</b> <span class="muted">${esc(c.sub_hr)}</span>
      <div class="rc-meta"><span>${String(c.kg).replace(".", ",")} kg</span><span>${c.day} / ${c.target} dana</span><span>${money(c.eur)}/kg</span><span>≈ ${money(c.eur * c.kg)}</span></div></div>
      <div class="rc-tags">${!c.active ? '<span class="tag">Skriven</span>' : ""}${res ? `<span class="tag res">Rezerviran · upit #${c.reserved_enquiry}</span>` : ready ? '<span class="tag ready">Spreman</span>' : `<span class="tag aging">Spreman za ${c.target - c.day} d.</span>`}</div>
      <div class="rc-act">${res ? '<button type="button" class="btn small ghost" data-release>Oslobodi</button>' : ""}<button type="button" class="btn small" data-edit>Uredi</button></div>`;
    row.querySelector("[data-edit]").addEventListener("click", () => edit("cuts", c));
    const rel = row.querySelector("[data-release]"); if (rel) rel.addEventListener("click", async () => { try { await call(`/api/admin/cuts/${c.id}/release`, "POST", {}); toast("Komad je opet slobodan."); await load(); } catch (e) { toast(e.message); } });
    el.appendChild(row);
  }
  if (!D.cuts.length) el.innerHTML = '<p class="empty">U komori nema komada.</p>';
}

/* ---------- proizvodi ---------- */
function renderProducts() {
  const q = $("p-search").value.trim().toLowerCase(), el = $("products-list"); el.textContent = "";
  for (const [cat, label] of Object.entries(CATS)) {
    const items = D.products.filter(p => p.cat === cat && (!q || (p.name_hr + " " + p.name_en).toLowerCase().includes(q)));
    if (!items.length) continue;
    const h = document.createElement("h2"); h.className = "cat-h"; h.textContent = label; el.appendChild(h);
    for (const p of items) {
      const row = document.createElement("article"); row.className = "row-card prod-row" + (p.active ? "" : " off");
      row.innerHTML = `<div class="rc-main"><b>${esc(p.name_hr)}</b> <span class="muted">${esc(p.name_en)}</span></div>
        <label class="price"><span class="sr">Cijena za ${esc(p.name_hr)}</span><input type="number" step="0.01" min="0" inputmode="decimal" value="${p.eur}"><span class="muted">${UNITS[p.unit]}</span></label>
        <label class="switch"><input type="checkbox" ${p.active ? "checked" : ""}><span>Na webu</span></label>
        <div class="rc-act"><button type="button" class="btn small ghost" data-save hidden>Spremi</button><button type="button" class="btn small ghost" data-edit>Uredi</button></div>`;
      const price = row.querySelector(".price input"), act = row.querySelector(".switch input"), save = row.querySelector("[data-save]");
      const dirty = () => { save.hidden = false; save.classList.remove("ghost"); };
      price.addEventListener("input", dirty); act.addEventListener("change", dirty);
      save.addEventListener("click", async () => { try { await call("/api/admin/products", "POST", { ...p, eur: price.value, active: act.checked }); toast("Spremljeno: " + p.name_hr); await load(); } catch (e) { toast(e.message); } });
      row.querySelector("[data-edit]").addEventListener("click", () => edit("products", p));
      el.appendChild(row);
    }
  }
  if (!el.children.length) el.innerHTML = '<p class="empty">Nema proizvoda za ovu pretragu.</p>';
}
$("p-search").addEventListener("input", () => renderProducts());

/* ---------- radionice ---------- */
function renderWorkshops() {
  const el = $("workshops-list"); el.textContent = "";
  for (const w of D.workshops) {
    const row = document.createElement("article"); row.className = "row-card" + (w.active ? "" : " off");
    row.innerHTML = `<div class="rc-main"><b>${esc(w.title_hr)}</b><div class="rc-meta"><span>${esc(w.date)}</span><span>${esc(w.when_hr)}</span><span>${money(w.eur)}</span><span>${w.seats - w.seatsLeft} / ${w.seats} prijavljeno</span></div></div>
      <div class="rc-tags">${!w.active ? '<span class="tag">Skrivena</span>' : w.seatsLeft < 1 ? '<span class="tag res">Popunjeno</span>' : ""}</div>
      <div class="rc-act"><button type="button" class="btn small" data-edit>Uredi</button></div>`;
    row.querySelector("[data-edit]").addEventListener("click", () => edit("workshops", w));
    el.appendChild(row);
  }
  if (!D.workshops.length) el.innerHTML = '<p class="empty">Nema radionica.</p>';
}

/* ---------- uređivač ---------- */
const today = () => new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Zagreb" });
const FORMS = {
  cuts: { title: "komad u komori", fields: [["name_hr","Naziv (HR)","text",1],["name_en","Naziv (EN)","text",1],["sub_hr","Podnaslov (HR)","text"],["sub_en","Podnaslov (EN)","text"],["desc_hr","Opis (HR)","area"],["desc_en","Opis (EN)","area"],["kg","Težina (kg)","num",1,"0.01"],["start_date","Početak odležavanja","date",1],["target","Planirano dana","num",1,"1"],["eur","Cijena (€/kg)","num",1,"0.01"],["sort","Redoslijed","num",0,"1"],["active","Prikaži na webu","bool"]],
    blank: () => ({ id: "", name_hr: "", name_en: "", sub_hr: "", sub_en: "", desc_hr: "", desc_en: "", kg: "", start_date: today(), target: 28, eur: "", sort: D.cuts.length, active: 1 }) },
  products: { title: "proizvod", fields: [["name_hr","Naziv (HR)","text",1],["name_en","Naziv (EN)","text",1],["cat","Kategorija","sel",1,CATS],["unit","Jedinica","sel",1,{ kg: "po kg", g100: "po 100 g", kom: "po komadu" }],["eur","Cijena (€)","num",1,"0.01"],["desc_hr","Opis (HR)","area"],["desc_en","Opis (EN)","area"],["sort","Redoslijed","num",0,"1"],["active","Prikaži na webu","bool"]],
    blank: () => ({ id: "", name_hr: "", name_en: "", cat: "junetina", unit: "kg", eur: "", desc_hr: "", desc_en: "", sort: D.products.length, active: 1 }) },
  workshops: { title: "radionica", fields: [["title_hr","Naziv (HR)","text",1],["title_en","Naziv (EN)","text",1],["date","Datum","date",1],["when_hr","Vrijeme, trajanje, jezik (HR)","text"],["when_en","Vrijeme, trajanje, jezik (EN)","text"],["eur","Cijena (€ po osobi)","num",1,"0.01"],["seats","Broj mjesta","num",1,"1"],["desc_hr","Opis (HR)","area"],["desc_en","Opis (EN)","area"],["sort","Redoslijed","num",0,"1"],["active","Prikaži na webu","bool"]],
    blank: () => ({ id: "", title_hr: "", title_en: "", date: today(), when_hr: "", when_en: "", eur: "", seats: 8, desc_hr: "", desc_en: "", sort: D.workshops.length, active: 1 }) },
};
let edTable = null, edObj = null;
function edit(table, obj) {
  edTable = table; edObj = obj; const F = FORMS[table], isNew = !obj.id;
  $("ed-title").textContent = (isNew ? "Novi " : "Uredi ") + F.title;
  $("ed-err").textContent = ""; $("ed-delete").hidden = isNew;
  $("ed-body").innerHTML = F.fields.map(([k, label, type, req, extra]) => {
    const v = obj[k] ?? "", id = "f-" + k;
    if (type === "area") return `<div class="field full"><label for="${id}">${label}</label><textarea id="${id}" data-k="${k}" maxlength="400">${esc(v)}</textarea></div>`;
    if (type === "sel") return `<div class="field"><label for="${id}">${label}</label><select id="${id}" data-k="${k}">${Object.entries(extra).map(([o, l]) => `<option value="${o}"${o === v ? " selected" : ""}>${esc(l)}</option>`).join("")}</select></div>`;
    if (type === "bool") return `<div class="field full"><label class="switch"><input type="checkbox" id="${id}" data-k="${k}"${v ? " checked" : ""}><span>${label}</span></label></div>`;
    const t = type === "num" ? `type="number" step="${extra}" inputmode="decimal"` : type === "date" ? 'type="date"' : 'type="text" maxlength="120"';
    return `<div class="field"><label for="${id}">${label}${req ? " *" : ""}</label><input ${t} id="${id}" data-k="${k}" value="${esc(v)}"${req ? " required" : ""}></div>`;
  }).join("");
  $("editor").showModal();
  const first = $("ed-body").querySelector("input,select,textarea"); if (first) first.focus();
}
$("ed-form").addEventListener("submit", async e => {
  e.preventDefault(); $("ed-err").textContent = "";
  const out = { id: edObj.id };
  $("ed-body").querySelectorAll("[data-k]").forEach(el => out[el.dataset.k] = el.type === "checkbox" ? el.checked : el.value);
  try { await call("/api/admin/" + edTable, "POST", out); $("editor").close(); toast("Spremljeno."); await load(); }
  catch (err) { $("ed-err").textContent = err.message; }
});
["ed-close", "ed-cancel"].forEach(id => $(id).addEventListener("click", () => $("editor").close()));
armDelete($("ed-delete"), async () => { await call(`/api/admin/${edTable}/${edObj.id}`, "DELETE"); $("editor").close(); toast("Obrisano."); await load(); });
document.querySelectorAll("[data-new]").forEach(b => b.addEventListener("click", () => edit(b.dataset.new, FORMS[b.dataset.new].blank())));

/* ---------- lozinka ---------- */
$("pw-form").addEventListener("submit", async e => {
  e.preventDefault(); $("pw-err").textContent = "";
  try { await call("/api/admin/password", "POST", { current: $("pw-cur").value, next: $("pw-new").value }); $("pw-cur").value = $("pw-new").value = ""; toast("Lozinka je promijenjena."); }
  catch (err) { $("pw-err").textContent = err.message; }
});

load().catch(() => showLogin());
setInterval(() => { if (D && tab === "upiti" && !document.querySelector(".enq-act input:focus, .enq-act select:focus")) load().catch(() => {}); }, 60000);
})();
