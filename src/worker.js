// Mecara Worker: glavni host, javni API (/api/live, /api/enquiry) i admin API (/api/admin/*).
import SEED from "./seed-data.js";

const CANONICAL_HOST = "www.mecara.app";
const COOKIE = "mecara_admin";
const SESSION_DAYS = 14;
const enc = new TextEncoder();

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isProdHost = url.hostname === "mecara.app" || url.hostname === CANONICAL_HOST;
    if (isProdHost && (url.hostname !== CANONICAL_HOST || url.protocol !== "https:")) {
      url.hostname = CANONICAL_HOST; url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    // stare adrese spojenih stranica → nove (trajno)
    const MOVED = { "/komora/": "/odlezani-steakovi/", "/en/dry-age-room/": "/en/dry-aged-steaks/", "/rostilj-planer/": "/meso-za-rostilj/#planner", "/en/bbq-planner/": "/en/bbq-meat/#planner" };
    const mv = MOVED[url.pathname.endsWith("/") ? url.pathname : url.pathname + "/"];
    if (mv) return Response.redirect("https://" + CANONICAL_HOST + mv, 301);
    if (url.pathname.startsWith("/api/")) {
      try { return await api(request, env, url); }
      catch (e) { console.error(e); return json({ error: "Greška na poslužitelju." }, 500); }
    }
    return env.ASSETS.fetch(request);
  },
};

/* ---------------- pomoćne ---------------- */
function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex", ...headers } });
}
const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
const sha256 = async s => hex(await crypto.subtle.digest("SHA-256", enc.encode(s)));
async function pbkdf2(password, saltHex, iters) {
  const salt = new Uint8Array(saltHex.match(/../g).map(h => parseInt(h, 16)));
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  return hex(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: iters }, key, 256));
}
function safeEqual(a, b) { if (a.length !== b.length) return false; let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i); return r === 0; }
const str = (v, max) => (typeof v === "string" ? v : v == null ? "" : String(v)).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, max);
const num = (v, min, max) => { const n = Number(v); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : null; };
const isDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s + "T00:00:00Z"));
const ID_RE = /^[a-z0-9-]{1,40}$/;
function zagrebToday() {
  const o = {}; new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Zagreb", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date()).forEach(p => o[p.type] = p.value);
  return `${o.year}-${o.month}-${o.day}`;
}
const daysSince = (d, today) => Math.max(0, Math.round((Date.parse(today + "T12:00:00Z") - Date.parse(d + "T12:00:00Z")) / 864e5));
async function readJson(request) {
  const len = Number(request.headers.get("content-length") || 0);
  if (len > 20000) throw new HttpError(413, "Zahtjev je prevelik.");
  const t = await request.text(); if (t.length > 20000) throw new HttpError(413, "Zahtjev je prevelik.");
  try { return JSON.parse(t || "{}"); } catch { throw new HttpError(400, "Neispravan zahtjev."); }
}
class HttpError extends Error { constructor(status, msg) { super(msg); this.status = status; } }

async function ensureSeed(env) {
  const r = await env.DB.prepare("SELECT (SELECT COUNT(*) FROM products) p, (SELECT COUNT(*) FROM cuts) c, (SELECT COUNT(*) FROM workshops) w").first();
  const st = [];
  if (!r.p) SEED.products.forEach((p, i) => st.push(env.DB.prepare("INSERT OR IGNORE INTO products (id,cat,unit,name_hr,name_en,desc_hr,desc_en,eur,sort) VALUES (?,?,?,?,?,?,?,?,?)").bind(p.id, p.cat, p.unit, p.name_hr, p.name_en, p.desc_hr, p.desc_en, p.eur, i)));
  if (!r.c) SEED.cuts.forEach((c, i) => st.push(env.DB.prepare("INSERT OR IGNORE INTO cuts (id,name_hr,name_en,sub_hr,sub_en,desc_hr,desc_en,kg,start_date,target,eur,sort) VALUES (?,?,?,?,?,?,?,?,date('now',?),?,?,?)").bind(c.id, c.name_hr, c.name_en, c.sub_hr, c.sub_en, c.desc_hr, c.desc_en, c.kg, `-${c.day} days`, c.target, c.eur, i)));
  if (!r.w) SEED.workshops.forEach((w, i) => st.push(env.DB.prepare("INSERT OR IGNORE INTO workshops (id,date,when_hr,when_en,title_hr,title_en,desc_hr,desc_en,eur,seats,sort) VALUES (?,?,?,?,?,?,?,?,?,?,?)").bind(w.id, w.date, w.when_hr, w.when_en, w.title_hr, w.title_en, w.desc_hr, w.desc_en, w.eur, w.seats, i)));
  if (st.length) await env.DB.batch(st);
}

/* ---------------- javni podaci ---------------- */
async function liveData(env, admin = false) {
  await ensureSeed(env);
  const today = zagrebToday();
  const where = admin ? "" : "WHERE active = 1";
  const [cuts, products, workshops, taken] = await env.DB.batch([
    env.DB.prepare(`SELECT * FROM cuts ${where} ORDER BY sort, id`),
    env.DB.prepare(`SELECT * FROM products ${where} ORDER BY sort, id`),
    env.DB.prepare(`SELECT * FROM workshops ${where} ORDER BY date, sort`),
    env.DB.prepare("SELECT items_json FROM enquiries WHERE status IN ('novo','potvrdeno','spremno') AND items_json LIKE '%\"ws\"%'"),
  ]);
  const wsCount = {};
  for (const e of taken.results) { try { for (const it of JSON.parse(e.items_json)) if (it.type === "ws") wsCount[it.id] = (wsCount[it.id] || 0) + (it.qty || 1); } catch {} }
  return {
    today,
    cuts: cuts.results.map(c => ({ ...c, day: daysSince(c.start_date, today), reserved: c.reserved_enquiry != null, ...(admin ? {} : { reserved_enquiry: undefined }) })),
    products: products.results,
    workshops: workshops.results.map(w => ({ ...w, seatsLeft: Math.max(0, w.seats - (wsCount[w.id] || 0)) })),
  };
}

/* ---------------- autentikacija ---------------- */
function getCookie(request, name) { const m = (request.headers.get("cookie") || "").match(new RegExp("(?:^|;\\s*)" + name + "=([^;]+)")); return m ? m[1] : null; }
async function currentAdmin(request, env) {
  const tok = getCookie(request, COOKIE); if (!tok || !/^[a-f0-9]{64}$/.test(tok)) return null;
  const row = await env.DB.prepare("SELECT email, expires_at FROM sessions WHERE token_hash = ?").bind(await sha256(tok)).first();
  if (!row || row.expires_at < Date.now()) return null;
  return row.email;
}
async function tooMany(env, key, limit, windowMs) {
  const r = await env.DB.prepare("SELECT COUNT(*) n FROM login_attempts WHERE k = ? AND at > ?").bind(key, Date.now() - windowMs).first();
  return r.n >= limit;
}
async function login(request, env) {
  const body = await readJson(request);
  const email = str(body.email, 120).toLowerCase(), password = typeof body.password === "string" ? body.password.slice(0, 200) : "";
  const ip = await sha256("ip:" + (request.headers.get("cf-connecting-ip") || "x"));
  if (await tooMany(env, "e:" + email, 5, 15 * 60e3) || await tooMany(env, "i:" + ip, 20, 15 * 60e3)) return json({ error: "Previše neuspjelih pokušaja. Pokušajte ponovno za 15 minuta." }, 429);
  const admin = await env.DB.prepare("SELECT * FROM admins WHERE email = ?").bind(email).first();
  // uvijek računaj hash da vrijeme odgovora ne otkriva postoji li e-mail
  const h = await pbkdf2(password || "x", admin ? admin.salt : "00".repeat(16), admin ? admin.iters : 20000);
  if (!admin || !safeEqual(h, admin.pass_hash)) {
    await env.DB.batch([env.DB.prepare("INSERT INTO login_attempts (k, at) VALUES (?, ?)").bind("e:" + email, Date.now()), env.DB.prepare("INSERT INTO login_attempts (k, at) VALUES (?, ?)").bind("i:" + ip, Date.now())]);
    return json({ error: "Pogrešan e-mail ili lozinka." }, 401);
  }
  const token = hex(crypto.getRandomValues(new Uint8Array(32)));
  const exp = Date.now() + SESSION_DAYS * 864e5;
  await env.DB.batch([
    env.DB.prepare("INSERT INTO sessions (token_hash, email, expires_at, created_at) VALUES (?, ?, ?, ?)").bind(await sha256(token), email, exp, Date.now()),
    env.DB.prepare("UPDATE admins SET last_login = datetime('now') WHERE email = ?").bind(email),
    env.DB.prepare("DELETE FROM sessions WHERE expires_at < ?").bind(Date.now()),
    env.DB.prepare("DELETE FROM login_attempts WHERE at < ?").bind(Date.now() - 864e5),
  ]);
  return json({ ok: true, email }, 200, { "set-cookie": `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_DAYS * 86400}` });
}

/* ---------------- API usmjerivač ---------------- */
async function api(request, env, url) {
  const p = url.pathname, m = request.method;
  if (m !== "GET" && m !== "HEAD") {
    // CSRF zaštita: samo s vlastite domene, JSON i naše zaglavlje
    const origin = request.headers.get("origin");
    if (!origin || new URL(origin).host !== url.host || request.headers.get("x-mecara") !== "1" || !(request.headers.get("content-type") || "").includes("application/json"))
      return json({ error: "Zahtjev nije dopušten." }, 403);
  }
  try {
    if (p === "/api/live" && m === "GET") { const d = await liveData(env); return json(d, 200, { "cache-control": "public, max-age=20" }); }
    if (p === "/api/enquiry" && m === "POST") return await createEnquiry(request, env);
    if (p === "/api/admin/login" && m === "POST") return await login(request, env);

    if (p.startsWith("/api/admin/")) {
      const email = await currentAdmin(request, env);
      if (!email) return json({ error: "Prijavite se." }, 401);
      if (p === "/api/admin/logout" && m === "POST") {
        const tok = getCookie(request, COOKIE); if (tok) await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await sha256(tok)).run();
        return json({ ok: true }, 200, { "set-cookie": `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0` });
      }
      if (p === "/api/admin/me" && m === "GET") return json({ email });
      if (p === "/api/admin/data" && m === "GET") {
        const d = await liveData(env, true);
        const enq = await env.DB.prepare("SELECT * FROM enquiries ORDER BY id DESC LIMIT 300").all();
        return json({ email, ...d, enquiries: enq.results.map(e => ({ ...e, ip_hash: undefined })) });
      }
      if (p === "/api/admin/password" && m === "POST") return await changePassword(request, env, email);
      let mm;
      if ((mm = p.match(/^\/api\/admin\/(cuts|products|workshops)$/)) && m === "POST") return await upsert(env, mm[1], await readJson(request));
      if ((mm = p.match(/^\/api\/admin\/(cuts|products|workshops)\/([a-z0-9-]{1,40})$/)) && m === "DELETE") { await env.DB.prepare(`DELETE FROM ${mm[1]} WHERE id = ?`).bind(mm[2]).run(); return json({ ok: true }); }
      if ((mm = p.match(/^\/api\/admin\/cuts\/([a-z0-9-]{1,40})\/release$/)) && m === "POST") { await env.DB.prepare("UPDATE cuts SET reserved_enquiry = NULL, updated_at = datetime('now') WHERE id = ?").bind(mm[1]).run(); return json({ ok: true }); }
      if ((mm = p.match(/^\/api\/admin\/enquiries\/(\d{1,9})$/)) && m === "POST") return await updateEnquiry(env, +mm[1], await readJson(request));
      if ((mm = p.match(/^\/api\/admin\/enquiries\/(\d{1,9})$/)) && m === "DELETE") return await deleteEnquiry(env, +mm[1]);
    }
    return json({ error: "Ne postoji." }, 404);
  } catch (e) {
    if (e instanceof HttpError) return json({ error: e.message }, e.status);
    throw e;
  }
}

/* ---------------- upiti s weba ---------------- */
async function createEnquiry(request, env) {
  const b = await readJson(request);
  if (b.hp) return json({ ok: true, id: 0 }); // zamka za botove
  const ip = await sha256("ip:" + (request.headers.get("cf-connecting-ip") || "x"));
  const recent = await env.DB.prepare("SELECT COUNT(*) n FROM enquiries WHERE ip_hash = ? AND created_at > datetime('now','-1 hour')").bind(ip).first();
  if (recent.n >= 8) return json({ error: "Poslali ste previše upita. Pokušajte kasnije." }, 429);
  const source = b.source === "villa" ? "villa" : "web";
  const lang = b.lang === "en" ? "en" : "hr";
  const name = str(b.name, 80), phone = str(b.phone, 20), email = str(b.email, 120), note = str(b.note, 800), pickup = str(b.pickup, 60);
  const digits = phone.replace(/\D/g, "");
  if (!name || digits.length < 8 || digits.length > 15 || !/^\+?[\d\s\/().-]+$/.test(phone)) return json({ error: lang === "hr" ? "Provjerite ime i broj mobitela." : "Check your name and mobile number." }, 400);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "E-mail nije ispravan." }, 400);

  const data = await liveData(env);
  const P = Object.fromEntries(data.products.map(x => [x.id, x])), C = Object.fromEntries(data.cuts.map(x => [x.id, x])), W = Object.fromEntries(data.workshops.map(x => [x.id, x]));
  const items = []; let total = 0; const cutIds = [];
  for (const it of Array.isArray(b.items) ? b.items.slice(0, 60) : []) {
    const id = str(it && it.id, 40);
    if (it.type === "p" && P[id]) { const q = num(it.qty, 0.01, 100); if (!q) continue; const eur = P[id].eur * q; total += eur; items.push({ type: "p", id, qty: Math.round(q * 100) / 100, unit: P[id].unit, name: P[id]["name_" + lang], eur: Math.round(eur * 100) / 100 }); }
    else if (it.type === "cut" && C[id]) { if (C[id].reserved) return json({ error: (lang === "hr" ? "Komad je u međuvremenu rezerviran: " : "This piece was reserved in the meantime: ") + C[id]["name_" + lang], conflict: id }, 409); const eur = C[id].eur * C[id].kg; total += eur; cutIds.push(id); items.push({ type: "cut", id, kg: C[id].kg, day: C[id].day, name: C[id]["name_" + lang], eur: Math.round(eur * 100) / 100 }); }
    else if (it.type === "ws" && W[id]) { if (W[id].seatsLeft < 1) return json({ error: (lang === "hr" ? "Radionica je popunjena: " : "Workshop is full: ") + W[id]["title_" + lang], conflict: id }, 409); total += W[id].eur; items.push({ type: "ws", id, qty: 1, date: W[id].date, name: W[id]["title_" + lang], eur: W[id].eur }); }
  }
  let extra = null;
  if (source === "villa") {
    const v = b.extra || {};
    extra = { type: str(v.type, 40), where: str(v.where, 160), date: str(v.date, 10), guests: num(v.guests, 1, 200), box: str(v.box, 80) };
    if (!extra.where || !isDate(extra.date) || !extra.guests) return json({ error: "Please fill in date, guests and location." }, 400);
  } else if (!items.length) return json({ error: lang === "hr" ? "Dodajte barem jedan proizvod." : "Add at least one item." }, 400);

  const ins = await env.DB.prepare("INSERT INTO enquiries (source, lang, name, phone, email, pickup, note, items_json, total_eur, extra_json, ip_hash) VALUES (?,?,?,?,?,?,?,?,?,?,?)")
    .bind(source, lang, name, phone, email, pickup, note, JSON.stringify(items), Math.round(total * 100) / 100, extra ? JSON.stringify(extra) : null, ip).run();
  const id = ins.meta.last_row_id;
  // rezerviraj komade – samo ako su još slobodni (atomarno po komadu)
  for (const cid of cutIds) {
    const r = await env.DB.prepare("UPDATE cuts SET reserved_enquiry = ?, updated_at = datetime('now') WHERE id = ? AND reserved_enquiry IS NULL").bind(id, cid).run();
    if (!r.meta.changes) {
      await env.DB.batch([env.DB.prepare("UPDATE cuts SET reserved_enquiry = NULL WHERE reserved_enquiry = ?").bind(id), env.DB.prepare("DELETE FROM enquiries WHERE id = ?").bind(id)]);
      return json({ error: lang === "hr" ? "Komad je u međuvremenu rezerviran." : "This piece was reserved in the meantime.", conflict: cid }, 409);
    }
  }
  return json({ ok: true, id });
}

/* ---------------- admin: uređivanje ---------------- */
const FIELDS = {
  cuts: { name_hr: ["s", 80, 1], name_en: ["s", 80, 1], sub_hr: ["s", 80], sub_en: ["s", 80], desc_hr: ["s", 400], desc_en: ["s", 400], kg: ["n", 0.05, 20, 1], start_date: ["d", 1], target: ["i", 1, 365, 1], eur: ["n", 0, 2000, 1], active: ["b"], sort: ["i", 0, 9999] },
  products: { cat: ["e", ["junetina","teletina","janjetina","svinjetina","piletina","rostilj","suho","sir","gotovo","spenza"], 1], unit: ["e", ["kg","g100","kom"], 1], name_hr: ["s", 100, 1], name_en: ["s", 100, 1], desc_hr: ["s", 400], desc_en: ["s", 400], eur: ["n", 0, 5000, 1], active: ["b"], sort: ["i", 0, 9999] },
  workshops: { date: ["d", 1], when_hr: ["s", 100], when_en: ["s", 100], title_hr: ["s", 120, 1], title_en: ["s", 120, 1], desc_hr: ["s", 400], desc_en: ["s", 400], eur: ["n", 0, 2000, 1], seats: ["i", 1, 200, 1], active: ["b"], sort: ["i", 0, 9999] },
};
async function upsert(env, table, body) {
  const spec = FIELDS[table]; const row = {};
  let id = str(body.id, 40).toLowerCase();
  if (!id) id = table.slice(0, 1) + Date.now().toString(36);
  if (!ID_RE.test(id)) throw new HttpError(400, "Neispravna oznaka.");
  for (const [k, s] of Object.entries(spec)) {
    const v = body[k], req = s[s.length - 1] === 1 && s[0] !== "b";
    if (s[0] === "s") { row[k] = str(v, s[1]); if (req && !row[k]) throw new HttpError(400, `Polje „${k}” je obavezno.`); }
    else if (s[0] === "n" || s[0] === "i") { if (v === "" || v == null) { if (req) throw new HttpError(400, `Polje „${k}” je obavezno.`); row[k] = 0; continue; } const n = num(v, s[1], s[2]); if (n == null) throw new HttpError(400, `Polje „${k}” mora biti broj.`); row[k] = s[0] === "i" ? Math.round(n) : Math.round(n * 100) / 100; }
    else if (s[0] === "d") { row[k] = str(v, 10); if (!isDate(row[k])) throw new HttpError(400, `Datum „${k}” nije ispravan.`); }
    else if (s[0] === "b") row[k] = v === false || v === 0 || v === "0" ? 0 : 1;
    else if (s[0] === "e") { row[k] = str(v, 20); if (!s[1].includes(row[k])) throw new HttpError(400, `Vrijednost „${k}” nije dopuštena.`); }
  }
  const cols = Object.keys(row);
  const sql = `INSERT INTO ${table} (id, ${cols.join(", ")}) VALUES (?, ${cols.map(() => "?").join(", ")}) ON CONFLICT(id) DO UPDATE SET ${cols.map(c => `${c} = excluded.${c}`).join(", ")}${table !== "workshops" ? ", updated_at = datetime('now')" : ""}`;
  await env.DB.prepare(sql).bind(id, ...cols.map(c => row[c])).run();
  return json({ ok: true, id });
}
const STATUSES = ["novo", "potvrdeno", "spremno", "preuzeto", "odbijeno"];
async function updateEnquiry(env, id, body) {
  const status = str(body.status, 20), note = str(body.admin_note, 800);
  if (!STATUSES.includes(status)) throw new HttpError(400, "Neispravan status.");
  const st = [env.DB.prepare("UPDATE enquiries SET status = ?, admin_note = ? WHERE id = ?").bind(status, note, id)];
  if (status === "odbijeno") st.push(env.DB.prepare("UPDATE cuts SET reserved_enquiry = NULL WHERE reserved_enquiry = ?").bind(id));
  if (status === "preuzeto") st.push(env.DB.prepare("UPDATE cuts SET active = 0, reserved_enquiry = NULL WHERE reserved_enquiry = ?").bind(id)); // komad prodan
  await env.DB.batch(st);
  return json({ ok: true });
}
async function deleteEnquiry(env, id) {
  await env.DB.batch([env.DB.prepare("UPDATE cuts SET reserved_enquiry = NULL WHERE reserved_enquiry = ?").bind(id), env.DB.prepare("DELETE FROM enquiries WHERE id = ?").bind(id)]);
  return json({ ok: true });
}
async function changePassword(request, env, email) {
  const b = await readJson(request);
  const cur = typeof b.current === "string" ? b.current : "", nw = typeof b.next === "string" ? b.next : "";
  if (nw.length < 12 || nw.length > 200) throw new HttpError(400, "Nova lozinka mora imati barem 12 znakova.");
  const a = await env.DB.prepare("SELECT * FROM admins WHERE email = ?").bind(email).first();
  if (!safeEqual(await pbkdf2(cur, a.salt, a.iters), a.pass_hash)) throw new HttpError(400, "Trenutačna lozinka nije točna.");
  const salt = hex(crypto.getRandomValues(new Uint8Array(16)));
  await env.DB.batch([
    env.DB.prepare("UPDATE admins SET pass_hash = ?, salt = ?, iters = 20000 WHERE email = ?").bind(await pbkdf2(nw, salt, 20000), salt, email),
    env.DB.prepare("DELETE FROM sessions WHERE email = ? AND token_hash != ?").bind(email, await sha256(getCookie(request, COOKIE) || "")),
  ]);
  return json({ ok: true });
}
