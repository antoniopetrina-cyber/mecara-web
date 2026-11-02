// Parser za "MECARA BLOG — dokument za Claude": izvlači članke točno kako su napisani (HR i EN).
import { readFileSync } from "node:fs";

const SECTION_CAT = { C: "mesar", D: "rostilj", E: "kuhinja", F: "gosti", G: "danas" };

export function parseBlog(path) {
  const md = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
  const lines = md.split("\n");
  const articles = [];
  let section = null, cur = null, mode = null; // mode: meta | hr | en

  const flush = () => { if (cur) articles.push(cur); cur = null; mode = null; };
  for (const line of lines) {
    const sec = line.match(/^# ([A-K])\. /);
    if (sec) { flush(); section = sec[1]; continue; }
    const art = line.match(/^## ([MRKGT]\d\d) — (.+)$/);
    if (art && SECTION_CAT[section]) { flush(); cur = { id: art[1], cat: SECTION_CAT[section], working: art[2], meta: [], hr: [], en: [] }; mode = "meta"; continue; }
    if (!cur) continue;
    if (/^## /.test(line)) { flush(); continue; }
    const h = line.match(/^### (HR|EN) — (.+)$/);
    if (h) { mode = h[1].toLowerCase(); cur[mode + "H1"] = h[2].trim(); continue; }
    cur[mode].push(line);
  }
  flush();

  for (const a of articles) {
    const m = {};
    for (const l of a.meta) { const x = l.match(/^\*\*([^*]+):\*\*\s*(.*?)\s*$/); if (x) m[x[1]] = x[2]; }
    a.slug = { hr: m["HR slug"], en: m["EN slug"] };
    a.title = { hr: m["HR title"], en: m["EN title"] };
    a.desc = { hr: m["HR meta"], en: m["EN meta"] };
    a.excerpt = { hr: m["Izvadak HR"], en: m["Excerpt EN"] };
    a.sources = [...new Set((a.meta.join(" ").match(/\bS\d{1,2}\b/g) || []))];
    for (const lang of ["hr", "en"]) a[lang] = trimBlank(a[lang]);
    a.recipe = a.cat === "danas";
  }
  return articles;
}

function trimBlank(arr) { while (arr.length && !arr[0].trim()) arr.shift(); while (arr.length && !arr[arr.length - 1].trim()) arr.pop(); return arr; }

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/`(.+?)`/g, "<code>$1</code>");

// Pretvara tijelo u blokove: {type:'p'|'h2'|'ul'|'ol'|'facts'|'cta', ...}
export function toBlocks(lines) {
  const blocks = []; let i = 0;
  const isFact = l => /^\*\*[^*]+:\*\*/.test(l);
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    if (/^#### /.test(l)) { blocks.push({ type: "h2", text: l.slice(5).trim() }); i++; continue; }
    if (/^- /.test(l)) { const items = []; while (i < lines.length && /^- /.test(lines[i])) { items.push(lines[i].slice(2).trim()); i++; } blocks.push({ type: "ul", items }); continue; }
    if (/^\d+\. /.test(l)) { const items = []; while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(lines[i].replace(/^\d+\. /, "").trim()); i++; } blocks.push({ type: "ol", items }); continue; }
    // odlomak (do prazne linije)
    const para = []; while (i < lines.length && lines[i].trim() && !/^(#### |- |\d+\. )/.test(lines[i])) { para.push(lines[i]); i++; }
    if (para.every(isFact)) { blocks.push({ type: "facts", items: para.map(p => { const x = p.match(/^\*\*([^*]+):\*\*\s*(.*?)\s*$/); return [x[1], x[2]]; }) }); continue; }
    const text = para.map(p => p.replace(/\s+$/, "")).join(" ");
    if (/^\*\*.+\*\*$/.test(text.trim())) blocks.push({ type: "cta", text: text.trim().slice(2, -2) });
    else blocks.push({ type: "p", text });
  }
  return blocks;
}

export function wordCount(lines) { return lines.join(" ").replace(/[#*`\-]/g, " ").split(/\s+/).filter(Boolean).length; }

export function renderBlocks(blocks, { recipe = false, lang = "hr" } = {}) {
  let html = "";
  for (const b of blocks) {
    if (b.type === "h2") html += `<h2>${inline(b.text)}</h2>\n`;
    else if (b.type === "p") html += `<p>${inline(b.text)}</p>\n`;
    else if (b.type === "ol") html += `<ol class="${recipe ? "steps-list" : ""}">${b.items.map(x => `<li>${inline(x)}</li>`).join("")}</ol>\n`;
    else if (b.type === "ul") {
      const ing = recipe && b.ingredients;
      html += `<ul class="${ing ? "ingredients" : ""}">${b.items.map(x => ing ? `<li data-orig="${esc(x)}">${inline(x)}</li>` : `<li>${inline(x)}</li>`).join("")}</ul>\n`;
    }
  }
  return html;
}
export { inline, esc };
