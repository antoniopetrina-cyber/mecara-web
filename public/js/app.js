/* Mecara – interakcija: popis za upit, termini, radno vrijeme. Sadržaj stranice je u HTML-u; ovo samo dodaje funkcije. */
(function () {
"use strict";
const M = window.MECARA; if (!M) return;
const lang = document.documentElement.lang === "en" ? "en" : "hr";
const D = M.ui[lang];
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const loc = lang === "hr" ? "hr-HR" : "en-GB";

/* ---------- vrijeme po Dubrovniku ---------- */
const TZ = "Europe/Zagreb", DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
function zNow() {
  const o = {};
  new Intl.DateTimeFormat("en-GB", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", weekday: "short", hourCycle: "h23" })
    .formatToParts(new Date()).forEach(p => o[p.type] = p.value);
  return { y: +o.year, m: +o.month, d: +o.day, mins: (+o.hour) * 60 + (+o.minute), dow: DOW.indexOf(o.weekday) };
}
const zDate = (y, m, d) => new Date(Date.UTC(y, m - 1, d, 12));
const key = d => d.toISOString().slice(0, 10);
function easter(y) { const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31),da=((h+l-7*m+114)%31)+1; return zDate(y,mo,da); }
const hc = {};
function holidays(y) {
  if (hc[y]) return hc[y];
  const s = new Set(["01-01","01-06","05-01","05-30","06-22","08-05","08-15","11-01","11-18","12-25","12-26"].map(x => y + "-" + x));
  const e = easter(y); [0, 1, 60].forEach(n => { const x = new Date(e); x.setUTCDate(e.getUTCDate() + n); s.add(key(x)); });
  return hc[y] = s;
}
const toMin = s => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };
const H = M.site.hours, OPEN = toMin(H.open), CLOSE = toMin(H.close);
const FIRST = OPEN + 60, LAST = CLOSE - 30, LEAD = 120;
const isClosedDay = d => !H.days.includes(d.getUTCDay()) || holidays(d.getUTCFullYear()).has(key(d));

function renderOpen() {
  const txt = $("open-txt"), dot = $("open-dot"); if (!txt || !dot) return;
  const n = zNow(), d = zDate(n.y, n.m, n.d);
  const hol = holidays(n.y).has(key(d));
  const open = !isClosedDay(d) && n.mins >= OPEN && n.mins < CLOSE;
  dot.className = "dot" + (open ? "" : " off");
  if (open) { txt.textContent = D.openNow; return; }
  if (hol) { txt.textContent = D.holiday; return; }
  if (!isClosedDay(d) && n.mins < OPEN) { txt.textContent = D.closedNow; return; }
  // sljedeći dan otvaranja: ako nije sutra i pada u ponedjeljak, reci "u ponedjeljak"
  const next = new Date(d); let gap = 0;
  do { next.setUTCDate(next.getUTCDate() + 1); gap++; } while (isClosedDay(next) && gap < 10);
  txt.textContent = (gap > 1 && next.getUTCDay() === 1) ? D.closedSun : D.closedNow;
}

/* ---------- popis za upit (provjerava podatke iz preglednika) ---------- */
const STORE = "mecara-upit-v2";
function load() {
  let raw = {}; try { raw = JSON.parse(localStorage.getItem(STORE) || "{}"); } catch (e) { raw = {}; }
  const out = {}; if (!raw || typeof raw !== "object" || Array.isArray(raw)) return out;
  for (const [k, c] of Object.entries(raw)) {
    if (!c || typeof c !== "object") continue;
    const q = Number(c.qty);
    if (c.type === "p" && M.products[c.id] && q > 0 && q <= 100) out["p-" + c.id] = { type: "p", id: c.id, qty: Math.round(q * 100) / 100 };
    else if (c.type === "cut" && M.cuts[c.id]) out["cut-" + c.id] = { type: "cut", id: c.id };
    else if (c.type === "ws" && M.workshops[c.id]) out["ws-" + c.id] = { type: "ws", id: c.id };
  }
  return out;
}
let list = load();
try { localStorage.removeItem("mecara-cart"); localStorage.removeItem("mecara-lang"); } catch (e) {}
const save = () => { try { localStorage.setItem(STORE, JSON.stringify(list)); } catch (e) {} };
const fmtNum = n => n.toLocaleString(loc, { maximumFractionDigits: 2 });
const step = u => u === "kg" ? 0.25 : 1;
const defQty = u => u === "kg" ? 1 : u === "g100" ? 2 : 2;
function qtyLabel(u, q) { return u === "kg" ? fmtNum(q) + " kg" : u === "g100" ? (q * 100) + " g" : q + " " + D.pcs; }
const money = n => n.toLocaleString(loc, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
function lineInfo(k) {
  const c = list[k];
  if (c.type === "p") { const p = M.products[c.id]; return { name: p[lang], q: qtyLabel(p.u, c.qty), eur: p.eur * c.qty }; }
  if (c.type === "ws") { const w = M.workshops[c.id]; return { name: (lang === "hr" ? "Radionica: " : "Workshop: ") + w[lang] + " (" + w.date + ")", q: "1 " + (lang === "hr" ? "osoba" : "person"), eur: w.eur }; }
  const x = M.cuts[c.id]; return { name: D.room + ": " + x[lang] + " · " + x.day + " " + D.days, q: fmtNum(x.kg) + " kg", eur: x.eur * x.kg };
}

function toast(m) { const el = $("toast"); if (!el) return; el.textContent = m; el.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("show"), 2200); }

/* ---------- proizvodi: koračnici i dodavanje ---------- */
const qtys = {};
document.querySelectorAll(".prod").forEach(li => {
  const id = li.dataset.id, u = li.dataset.unit, out = li.querySelector("output");
  if (!M.products[id]) return;
  qtys[id] = defQty(u);
  const minus = li.querySelector('[data-step="-1"]');
  const upd = () => { out.textContent = qtyLabel(u, qtys[id]); minus.disabled = qtys[id] <= step(u); };
  li.querySelectorAll("[data-step]").forEach(b => b.addEventListener("click", () => {
    const s = step(u) * Number(b.dataset.step);
    qtys[id] = Math.min(50, Math.max(step(u), Math.round((qtys[id] + s) * 100) / 100)); upd();
  }));
  upd();
});
document.querySelectorAll("[data-add]").forEach(b => b.addEventListener("click", () => {
  const id = b.dataset.id, kind = b.dataset.add;
  if (kind === "p" && M.products[id]) {
    const k = "p-" + id;
    if (list[k]) list[k].qty = Math.min(100, Math.round((list[k].qty + qtys[id]) * 100) / 100);
    else list[k] = { type: "p", id, qty: qtys[id] };
  } else if (kind === "cut" && M.cuts[id]) { if (list["cut-" + id]) { toast(D.reservedT); return; } list["cut-" + id] = { type: "cut", id }; }
  else if (kind === "ws" && M.workshops[id]) { if (list["ws-" + id]) return; list["ws-" + id] = { type: "ws", id }; }
  else return;
  save(); hideResult(); renderList();
  if (kind === "cut" || kind === "ws") { renderCuts(); toast(D.toastAdded); return; }
  const old = b.textContent; b.textContent = M.added[lang]; b.classList.add("done");
  setTimeout(() => { b.textContent = old; b.classList.remove("done"); }, 1300);
  toast(D.toastAdded);
}));

/* ---------- termini ---------- */
let selDay = null, selTime = null, curDay = null;
const hhmm = m => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
function dayList() {
  const n = zNow(), today = zDate(n.y, n.m, n.d), out = [];
  for (let i = 0; out.length < 6 && i < 21; i++) {
    const d = new Date(today); d.setUTCDate(today.getUTCDate() + i);
    if (isClosedDay(d)) continue;
    const slots = []; for (let m = FIRST; m <= LAST; m += 30) if (i > 0 || m >= n.mins + LEAD) slots.push(m);
    if (slots.length) out.push({ d, i, slots });
  }
  return out;
}
const dayLabel = x => x.i === 0 ? D.today : x.i === 1 ? D.tomorrow : x.d.toLocaleDateString(loc, { timeZone: "UTC", weekday: "short", day: "numeric", month: "numeric" });
function chip(label, pressed, on) { const b = document.createElement("button"); b.type = "button"; b.className = "chip"; b.textContent = label; b.setAttribute("aria-pressed", String(pressed)); b.addEventListener("click", on); return b; }
function renderSlots() {
  const de = $("days"), te = $("times"); if (!de) return;
  de.textContent = ""; te.textContent = "";
  const days = dayList();
  if (!days.length) { de.textContent = D.noSlots; curDay = null; return; }
  curDay = days.find(x => key(x.d) === selDay) || days[0]; selDay = key(curDay.d);
  if (!curDay.slots.includes(selTime)) selTime = curDay.slots[0];
  days.forEach(x => de.appendChild(chip(dayLabel(x), x === curDay, () => { selDay = key(x.d); selTime = null; renderSlots(); hideResult(); })));
  curDay.slots.forEach(m => te.appendChild(chip(hhmm(m), m === selTime, () => { selTime = m; renderSlots(); hideResult(); })));
}

/* ---------- prikaz popisa ---------- */
function renderList() {
  const keys = Object.keys(list), L = $("lines"); if (!L) return;
  L.textContent = "";
  if (!keys.length) { const p = document.createElement("p"); p.className = "empty"; p.textContent = D.empty; L.appendChild(p); }
  let sum = 0;
  keys.forEach(k => {
    const li = lineInfo(k), d = document.createElement("div"); d.className = "line"; sum += li.eur;
    d.innerHTML = `<div><div class="nm">${esc(li.name)}</div><div class="q">${esc(li.q)}</div></div><b class="num">${esc(money(li.eur))}</b><button class="rm" type="button">${esc(D.remove)}</button>`;
    d.querySelector(".rm").addEventListener("click", () => { delete list[k]; save(); hideResult(); renderList(); renderCuts(); });
    L.appendChild(d);
  });
  if ($("sum")) $("sum").textContent = money(sum);
  $("cart-n").textContent = keys.length;
  $("open-cart").setAttribute("aria-label", D.cartAria + " " + keys.length);
}

/* ---------- poruka ---------- */
const clean = s => s.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
const validTel = s => { const d = s.replace(/\D/g, ""); return /^\+?[\d\s\/().-]+$/.test(s) && d.length >= 8 && d.length <= 15; };
function buildMsg() {
  const m = D.msg, lines = Object.keys(list).map(k => { const li = lineInfo(k); return li.name + " — " + li.q; });
  const note = clean($("c-note").value);
  return [m.head, m.name + ": " + clean($("c-name").value), m.contact + ": " + clean($("c-tel").value),
    m.when + ": " + (curDay ? dayLabel(curDay) + " (" + curDay.d.toLocaleDateString(loc, { timeZone: "UTC", day: "numeric", month: "numeric", year: "numeric" }) + ") " + hhmm(selTime) : "-"),
    m.products + ":", ...lines, m.est + ": " + money(Object.keys(list).reduce((a, k) => a + lineInfo(k).eur, 0)), note ? m.note + ": " + note : "", m.end].filter(Boolean).join("\n");
}
function hideResult() { const r = $("result"); if (r) r.classList.remove("show"); const a = $("after-open"); if (a) a.hidden = true; }
function showResult(msg) {
  const r = $("result"); $("msg").textContent = msg;
  const wa = $("wa");
  if (M.site.enquiryLive) { wa.hidden = false; wa.href = "https://wa.me/" + M.site.whatsapp + "?text=" + encodeURIComponent(msg); }
  else wa.hidden = true;
  r.querySelector(".wip-note").hidden = M.site.enquiryLive;
  r.classList.add("show");
  r.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
}

/* ---------- ladica: fokus i tipkovnica ---------- */
let lastFocus = null;
const outside = () => [document.querySelector("main"), document.querySelector("header.top"), document.querySelector("footer"), document.querySelector(".proto"), document.querySelector(".crumbs"), document.querySelector(".skip")];
function openList(e) {
  if (e) e.preventDefault();
  lastFocus = document.activeElement; renderSlots(); renderList();
  document.body.classList.add("cart-open"); outside().forEach(x => x && (x.inert = true));
  $("drawer").setAttribute("aria-hidden", "false");
  setTimeout(() => $("close-cart").focus(), 50);
}
function closeList() {
  if (!document.body.classList.contains("cart-open")) return;
  document.body.classList.remove("cart-open"); outside().forEach(x => x && (x.inert = false));
  $("drawer").setAttribute("aria-hidden", "true");
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
document.querySelectorAll("[data-open-enquiry]").forEach(a => a.addEventListener("click", openList));
$("close-cart").addEventListener("click", closeList);
$("scrim").addEventListener("click", closeList);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeList(); });
$("send").addEventListener("click", () => {
  const err = $("c-err"); err.textContent = "";
  if (!Object.keys(list).length) { err.textContent = D.noItems; return; }
  if (!clean($("c-name").value)) { err.textContent = D.noName; $("c-name").focus(); return; }
  if (!validTel($("c-tel").value.trim())) { err.textContent = D.badTel; $("c-tel").focus(); return; }
  renderSlots(); showResult(buildMsg());
});
$("wa").addEventListener("click", () => { $("after-open").hidden = false; });
$("copy").addEventListener("click", async () => {
  const pre = $("msg");
  try { await navigator.clipboard.writeText(pre.textContent); toast(D.copied); }
  catch (e) { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast(D.copyFail); }
});
["c-name", "c-tel", "c-note"].forEach(id => $(id).addEventListener("input", hideResult));

/* ---------- komora: trake, mramor, rezervirano ---------- */
function rng(seed) { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
function marble(cv, seed) {
  const dpr = Math.min(2, window.devicePixelRatio || 1), w = cv.clientWidth || 300, h = 140;
  cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); const g = cv.getContext("2d"); if (!g) return; g.scale(dpr, dpr);
  const r = rng(seed * 997 + 13), base = g.createLinearGradient(0, 0, w, h);
  base.addColorStop(0, "#5a1c17"); base.addColorStop(.6, "#4a1612"); base.addColorStop(1, "#2e0e0c"); g.fillStyle = base; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 70; i++) { g.beginPath(); let x = r() * w, y = r() * h; g.moveTo(x, y);
    for (let j = 0; j < 4; j++) { x += (r() - .3) * 60; y += (r() - .5) * 26; g.quadraticCurveTo(x - r() * 20, y + (r() - .5) * 14, x, y); }
    g.strokeStyle = `rgba(244,226,205,${.08 + r() * .32})`; g.lineWidth = .6 + r() * 2.6; g.lineCap = "round"; g.stroke(); }
  g.fillStyle = "rgba(240,220,196,.85)"; g.fillRect(0, h - 16, w, 16);
  const v = g.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w * .7); v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(0,0,0,.45)"); g.fillStyle = v; g.fillRect(0, 0, w, h);
}
function renderCuts() {
  document.querySelectorAll(".course[data-ws]").forEach(row => {
    const id = row.dataset.ws, on = !!list["ws-" + id], b = row.querySelector("[data-add]");
    if (!b.dataset.label) b.dataset.label = b.textContent;
    b.textContent = on ? "✓ " + b.dataset.done : b.dataset.label; b.disabled = on; b.classList.toggle("ghost", !on);
  });
  document.querySelectorAll(".cut[data-cut]").forEach(card => {
    const id = card.dataset.cut, res = !!list["cut-" + id], b = card.querySelector("[data-add]");
    card.classList.toggle("reserved", res);
    if (!b.dataset.label) b.dataset.label = b.textContent;
    b.textContent = res ? D.reserved : b.dataset.label; b.disabled = res;
  });
}
document.querySelectorAll(".bar i[data-pct]").forEach(i => i.style.width = i.dataset.pct + "%");
const paintMarble = () => document.querySelectorAll(".cut canvas[data-seed]").forEach(c => marble(c, +c.dataset.seed));
paintMarble(); let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(paintMarble, 200); });

/* ---------- roštilj planer ---------- */
const pf = $("plan-form");
function planItems() {
  const a = Math.max(0, Math.min(80, Math.floor(+$("pl-adults").value || 0))), k = Math.max(0, Math.min(80, Math.floor(+$("pl-kids").value || 0)));
  const hunger = +(pf.querySelector('input[name="hunger"]:checked') || { value: 1 }).value;
  const style = +(pf.querySelector('input[name="style"]:checked') || { value: 0 }).value;
  const people = a + k * 0.5; if (people <= 0) return [];
  const total = people * M.planner.grams[hunger] / 1000;
  return M.planner.styles[style].filter(([id]) => M.products[id]).map(([id, share]) => ({ id, kg: Math.max(0.25, Math.round(total * share * 4) / 4) }));
}
function renderPlan() {
  const ul = $("plan"), items = planItems(); ul.textContent = ""; let sum = 0, kgs = 0;
  if (!items.length) { const li = document.createElement("li"); li.className = "muted"; li.textContent = $("planner").dataset.empty; ul.appendChild(li); $("plan-total").textContent = "–"; $("plan-add").disabled = true; return; }
  items.forEach(({ id, kg }) => { const p = M.products[id]; sum += p.eur * kg; kgs += kg;
    const li = document.createElement("li"); li.innerHTML = `<span>${esc(p[lang])}</span><span class="num muted">${esc(fmtNum(kg))} kg</span><b class="num">${esc(money(p.eur * kg))}</b>`; ul.appendChild(li); });
  $("plan-total").textContent = fmtNum(kgs) + " kg · " + money(sum); $("plan-add").disabled = false;
}
if (pf) {
  pf.addEventListener("input", renderPlan); pf.addEventListener("change", renderPlan); pf.addEventListener("submit", e => e.preventDefault());
  $("plan-add").addEventListener("click", () => {
    planItems().forEach(({ id, kg }) => { const k = "p-" + id; if (list[k]) list[k].qty = Math.min(100, Math.round((list[k].qty + kg) * 100) / 100); else list[k] = { type: "p", id, qty: kg }; });
    save(); hideResult(); renderList(); toast(D.toastAdded);
  });
  renderPlan();
}

/* ---------- vile i jahte ---------- */
const vf = $("villa-form");
if (vf) {
  const n = zNow(), t0 = zDate(n.y, n.m, n.d); t0.setUTCDate(t0.getUTCDate() + 1);
  const dEl = $("v-date"); dEl.min = key(t0); if (!dEl.value) dEl.value = key(t0); const mx = new Date(t0); mx.setUTCFullYear(mx.getUTCFullYear() + 1); dEl.max = key(mx);
  vf.addEventListener("submit", e => {
    e.preventDefault(); vf.classList.add("tried");
    const v = id => clean($(id).value), err = $("v-err"); err.textContent = "";
    const g = Math.floor(+$("v-guests").value);
    if (!v("v-date") || v("v-date") < dEl.min || !(g >= 2 && g <= 80) || !v("v-name") || !validTel(v("v-tel")) || !v("v-where")) { err.textContent = vf.dataset.need; return; }
    const boxEl = document.querySelector('input[name="box"]:checked'), boxName = boxEl ? clean(boxEl.closest(".box").querySelector("h3").textContent) : "-";
    const L = lang === "hr" ? ["Paket", "Lokacija", "Gdje", "Datum", "Gosti", "Kontakt", "Mobitel", "E-mail", "Napomena"] : ["Selection", "Location type", "Where", "Date", "Guests", "Contact", "Mobile", "Email", "Notes"];
    const msg = [vf.dataset.head, "", L[0] + ": " + boxName, L[1] + ": " + v("v-type"), L[2] + ": " + v("v-where"), L[3] + ": " + v("v-date"), L[4] + ": " + g, L[5] + ": " + v("v-name"), L[6] + ": " + v("v-tel"), v("v-email") ? L[7] + ": " + v("v-email") : "", v("v-note") ? L[8] + ": " + v("v-note") : "", "", D.msg.end].filter((x, i, a) => x !== "" || (i > 0 && a[i - 1] !== "")).join("\n");
    const r = $("v-result"); r.querySelector("pre").textContent = msg;
    const wa = r.querySelector(".wa");
    if (M.site.enquiryLive) { wa.hidden = false; wa.href = "https://wa.me/" + M.site.whatsapp + "?text=" + encodeURIComponent(msg); } else wa.hidden = true;
    r.querySelector(".wip-note").hidden = M.site.enquiryLive; r.classList.add("show");
    r.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  });
  $("v-copy").addEventListener("click", async () => { const pre = $("v-result").querySelector("pre"); try { await navigator.clipboard.writeText(pre.textContent); toast(D.copied); } catch (e) { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast(D.copyFail); } });
}

renderOpen(); renderList(); renderCuts();
setInterval(() => { renderOpen(); if (!document.body.classList.contains("cart-open")) renderSlots(); }, 60000);
})();

/* ===== blog: filteri recepata, porcije, ispis ===== */
(function () {
  const grid = document.getElementById("recipe-grid");
  if (grid) {
    const state = { protein: null, time: null };
    const apply = () => {
      let shown = 0;
      grid.querySelectorAll(".post-card").forEach(c => {
        const okP = !state.protein || c.dataset.protein === state.protein;
        const t = c.dataset.time, okT = !state.time || (state.time === "slow" ? t === "slow" : (t !== "slow" && +t <= +state.time));
        c.hidden = !(okP && okT); if (!c.hidden) shown++;
      });
      document.getElementById("f-empty").hidden = shown > 0;
      document.querySelectorAll("[data-filter]").forEach(b => b.setAttribute("aria-pressed", String(state[b.dataset.filter] === b.dataset.value)));
    };
    document.querySelectorAll("[data-filter]").forEach(b => b.addEventListener("click", () => { const k = b.dataset.filter; state[k] = state[k] === b.dataset.value ? null : b.dataset.value; apply(); }));
    document.getElementById("f-reset").addEventListener("click", () => { state.protein = state.time = null; apply(); });
  }
  const rc = document.querySelector(".recipe-card");
  if (rc) {
    const base = +rc.dataset.base || 4, out = document.getElementById("sv-out"); let sv = base;
    const lang = document.documentElement.lang === "en" ? "en" : "hr";
    const fmt = n => { const r = n >= 100 ? Math.round(n / 5) * 5 : n >= 10 ? Math.round(n) : Math.round(n * 10) / 10; return lang === "hr" ? String(r).replace(".", ",") : String(r); };
    // skaliraj brojeve u sastojcima, ali ne cm, °C, %, minute
    const scaleLine = (txt, f) => txt.replace(/(\d+(?:[.,]\d+)?)(?![\d.,]*\s*(?:cm|°|%|min))/g, m => fmt(parseFloat(m.replace(",", ".")) * f));
    const items = document.querySelectorAll(".ingredients li[data-orig]");
    const esc = s => s.replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
    const render = () => { out.textContent = sv; const f = sv / base;
      items.forEach(li => { li.innerHTML = esc(f === 1 ? li.dataset.orig : scaleLine(li.dataset.orig, f)).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"); });
      rc.querySelector('[data-sv="-1"]').disabled = sv <= 1; };
    rc.querySelectorAll("[data-sv]").forEach(b => b.addEventListener("click", () => { sv = Math.min(24, Math.max(1, sv + +b.dataset.sv)); render(); }));
    const pb = document.getElementById("print-recipe"); if (pb) pb.addEventListener("click", () => { try { window.print(); } catch (e) {} });
    render();
  }
})();
