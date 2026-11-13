(() => {
  "use strict";

  /* If this page is the one-file copy, its source is still untouched here: keep it so the app can hand itself on. */
  const PRISTINE = "<!doctype html>\n" + document.documentElement.outerHTML;

  /* ---------- state ---------- */
  const KEY = "handa.v1";
  const uid = () => Math.random().toString(36).slice(2, 9);
  const defaults = () => ({
    checked: {}, notes: {}, price: {}, custom: {},
    family: { meet1: "", meet2: "", meet3: "", route: "", outName: "", outPhone: "", members: [], nums: [], seeded: false },
    comms: { have: {}, notes: {}, checkin: "", channel: "", codes: "" },
    drill: { steps: {}, last: "", found: "" },
    levels: { people: 5, goal: 2, done: {} },
    howto: { done: {}, got: {}, calc: {}, fill: {} },
    stock: [], places: [], nearby: [],
    news: {}, medid: {}, plan: { months: 6, warn: 30 }, checks: {},
    watch: [{ id: "home", name: "Isabel, Leyte", lat: 10.93, lng: 124.43, home: true }], alerts: {},
    settings: { theme: "auto", size: "m", motion: "auto", lang: "en", nav: "simple", splash: "on", news: "on" },
    ui: { tab: "home", phase: 0, toBuy: false, open: {}, detail: {} }
  });

  const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
  /* Build the whole app as one HTML file (works from the saved copy, with no internet), then share or save it. */
  async function buildAppFile() {
    if (!document.querySelector("script[src]")) return PRISTINE; // already the one-file copy
    const get = (u) => fetch(u).then((r) => { if (!r.ok) throw new Error(u); return r; });
    const b64 = (blob) => new Promise((ok, no) => { const f = new FileReader(); f.onload = () => ok(String(f.result).split(",")[1]); f.onerror = no; f.readAsDataURL(blob); });
    let html = await (await get("index.html")).text();
    let css = await (await get("styles.css")).text();
    for (const m of [...css.matchAll(/url\((fonts\/[^)]+)\)/g)]) {
      css = css.split(m[0]).join("url(data:font/woff2;base64," + await b64(await (await get(m[1])).blob()) + ")");
    }
    const img = async (u) => "data:image/png;base64," + await b64(await (await get(u)).blob());
    html = html.replace('<link rel="manifest" href="manifest.webmanifest">\n', "")
      .replace('<link rel="icon" href="icons/icon-192.png">', '<link rel="icon" href="' + await img("icons/icon-192.png") + '">')
      .replace('<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">', '<link rel="apple-touch-icon" href="' + await img("icons/apple-touch-icon.png") + '">')
      .replace(/<link rel="preload"[^>]*>\n/, "")
      .replace('<link rel="stylesheet" href="styles.css">', () => "<style>" + css + "</style>");
    for (const m of [...html.matchAll(/<script src="([^"]+)"><\/script>/g)]) {
      const js = (await (await get(m[1])).text()).split("</script").join("<\\/script");
      html = html.replace(m[0], () => "<script>" + js + "</script>");
    }
    return html;
  }
  async function shareApp() {
    toast(tx("Getting the app ready…"));
    let html;
    try { html = await buildAppFile(); } catch (e) { toast(tx("Couldn't prepare the file. Open the app once with internet, then try again.")); return; }
    const file = new File([html], "Andam.html", { type: "text/html" });
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: "Andam" }); return; }
    } catch (e) { if (e && e.name === "AbortError") return; }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file); a.download = "Andam.html";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast(tx("Saved as Andam.html in your Downloads. Send it with Bluetooth, Nearby Share or a USB stick."));
  }

  function merge(base, src) {
    if (!isObj(src)) return base;
    for (const k of Object.keys(src)) {
      if (isObj(base[k]) && isObj(src[k])) merge(base[k], src[k]);
      else base[k] = src[k];
    }
    return base;
  }

  let storageOk = true;
  function load() {
    const s = defaults();
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) merge(s, JSON.parse(raw));
    } catch (e) { storageOk = false; }
    return s;
  }
  let S = load();
  let warned = false;
  let SYNC = null;
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(S));
      if (SYNC) SYNC.touch();
    } catch (e) {
      storageOk = false;
      if (!warned) { warned = true; toast("This phone is blocking saving. Your changes will be lost when you close the app."); }
    }
  }
  function seed() {
    if (!S.family.seeded) {
      NUMBERS.forEach((n) => S.family.nums.push({ id: uid(), label: n.label, phone: n.phone }));
      S.family.seeded = true;
      save();
    }
  }
  seed();

  /* ---------- helpers ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const peso = (n) => "₱" + Math.round(n).toLocaleString("en-PH");
  const telHref = (p) => "tel:" + String(p || "").replace(/[^\d+]/g, "");
  const smsHref = (p) => "sms:" + String(p || "").replace(/[^\d+]/g, "");
  const ceb = () => S.settings.lang === "ceb";
  const tx = (s) => (ceb() && (CEB.ui[s] || (typeof X !== "undefined" && X[s]))) || s;

  function getPath(path) {
    return path.split(".").reduce((o, k) => (o == null ? o : o[k]), S);
  }
  function setPath(path, val) {
    const keys = path.split(".");
    let o = S;
    for (let i = 0; i < keys.length - 1; i++) {
      if (o[keys[i]] == null) o[keys[i]] = {};
      o = o[keys[i]];
    }
    const last = keys[keys.length - 1];
    if ((val === false || val === "") && !Array.isArray(o)) delete o[last];
    else o[last] = val;
  }

  let toastTimer;
  function toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.hidden = true), 3500);
  }

  function allItems() {
    const out = [];
    CATS.forEach((c) => {
      c.items.forEach((i) => out.push({ ...i, cat: c.id }));
      (S.custom[c.id] || []).forEach((i) => out.push({ ...i, cat: c.id, custom: true }));
    });
    return out;
  }

  /* ---------- views ---------- */
  const chevron = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

  /* Plan items that depend on how many people: shown as a line under the title. */
  const PLANQ = {
    w1: (n) => `${fmtN(n * 12)} L for 3 days (${Math.ceil(n * 12 / 19)} jugs of 19 L)`,
    f1: (n) => `${fmtN(n * 12)} kg for 30 days (${Math.ceil(n * 12 / 50)} sack${Math.ceil(n * 12 / 50) > 1 ? "s" : ""} of 50 kg)`,
    f2: (n) => `${fmtN(n * 30)} cans for 30 days`,
    f3: (n) => `${fmtN(n)} L of cooking oil a month (estimate)`,
    m9: (n) => `${n} cards`, e1: (n) => `${n} flashlights or headlamps`, e3: (n) => `${n} power banks`,
    s2: (n) => `${n} whistles`, s4: (n) => `${n} sets`, s7: (n) => `${n} mats and ${n} blankets`,
    g1: (n) => `${n} go bags, about ${fmtN(n * 1.5)} L of water in total`
  };
  const planQ = (i) => (PLANQ[i.id] ? `<div class="qty">${esc(`For ${nPeople()} ${nPeople() === 1 ? "person" : "people"}: ${PLANQ[i.id](nPeople())}`)}</div>` : "");
  function detailHtml(i) {
    const rows = [];
    if (i.e) rows.push(`<dt>Examples</dt><dd>${esc(i.e)}</dd>`);
    if (i.w) rows.push(`<dt>Where to buy</dt><dd>${esc(i.w)}</dd>`);
    if (i.pr) rows.push(`<dt>Price seen (Nov 2026)</dt><dd>${esc(i.pr)}</dd>`);
    if (i.n) rows.push(`<dt>Tip</dt><dd>${esc(ppl(i.n))}</dd>`);
    const priceField = i.b > 0 || i.custom
      ? `<label class="field"><span>Price you found or paid (₱)</span><input type="number" inputmode="decimal" min="0" step="any" data-bind="price.${i.id}" data-re="1" value="${esc(S.price[i.id] ?? "")}"></label>` : "";
    return `<div class="detail">
      ${rows.length ? `<dl>${rows.join("")}</dl>` : ""}
      ${priceField}
      <label class="field"><span>Your note</span><input type="text" data-bind="notes.${i.id}" value="${esc(S.notes[i.id] ?? "")}" placeholder="Where you bought it, how many, brand"></label>
      ${i.custom ? `<div class="actions"><button class="btn danger small" data-a="rmcustom" data-id="${i.id}" data-cat="${i.cat}">Remove this item</button></div>` : ""}
    </div>`;
  }

  function itemHtml(i) {
    const chk = !!S.checked[i.id];
    const open = !!S.ui.detail[i.id];
    const price = Number(S.price[i.id]) || 0;
    const band = `<span class="tag">${BANDS[i.b]}</span>`;
    return `<div class="item ${chk ? "done" : ""}">
      <div class="row">
        <input class="chk" type="checkbox" id="c_${i.id}" data-bind="checked.${i.id}" data-re="1" ${chk ? "checked" : ""}>
        <div>
          <label class="t" for="c_${i.id}">${esc(i.t)}</label>${planQ(i)}
          <div class="meta"><span class="tag p${i.p}">${PHASES[i.p]}</span>${band}${price ? `<span class="tag price">${peso(price)}</span>` : ""}</div>
        </div>
        <button class="more" data-a="detail" data-id="${i.id}" aria-expanded="${open}">${open ? "Hide" : "Details"}</button>
      </div>
      ${open ? detailHtml(i) : ""}
    </div>`;
  }

  /* ---------- dates: food and medicine ---------- */
  const todayStart = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const daysLeft = (iso) => { const t0 = Date.parse(iso + "T00:00:00"); return isNaN(t0) ? null : Math.round((t0 - todayStart()) / 864e5); };
  const STK_TYPES = [["spoil", "Easily spoiled (meat, fish, milk)"], ["fresh", "Vegetables and fruit"], ["food", "Canned and dry food"], ["medicine", "Medicine"], ["water", "Water"], ["battery", "Batteries"], ["other", "Other"]];
  const FRESH_DAYS = 3; // vegetables, fruit, meat, fish and milk spoil fast, so they are flagged this many days ahead at most
  const STK_NAMES = ["Kangkong", "Kamote tops", "Squash", "Eggplant", "Tomatoes", "Banana", "Fresh fish", "Pork", "Chicken", "Eggs", "Fresh milk", "Rice", "Canned sardines", "Canned tuna", "Corned beef", "Instant noodles", "Biscuits", "Powdered milk", "Cooking oil", "Mongo beans", "Bottled water", "Paracetamol", "Oral rehydration salts", "Betadine", "Alcohol", "Bandages", "Vitamins", "Prescription medicine", "AA batteries", "Butane canisters"];
  const warnDays = () => Math.max(1, Number(S.plan.warn) || 30);
  /* How close an item is: d = days left (negative = expired), lvl = bad (expired or within a week), soon, ok, none (no date) */
  const itemWarn = (x) => (x.cat === "fresh" || x.cat === "spoil" ? Math.min(FRESH_DAYS, warnDays()) : warnDays());
  function stockInfo(x) {
    const d = x.date ? daysLeft(x.date) : null, w = itemWarn(x);
    const lvl = d === null ? "none" : d < 0 ? "bad" : d <= Math.min(7, w) ? "bad" : d <= w ? "soon" : "ok";
    return { d, lvl };
  }
  function stockStats() {
    let exp = 0, soon = 0;
    S.stock.forEach((x) => { const d = stockInfo(x).d; if (d === null) return; if (d < 0) exp++; else if (d <= itemWarn(x)) soon++; });
    return { exp, soon, bad: exp + soon };
  }
  const pl = (n, one, many) => n + " " + (n === 1 ? one : many);
  /* "9 days", "3 weeks", "5 months", "1 year 3 months" */
  function fmtDur(d) {
    if (d < 14) return pl(d, "day", "days");
    if (d < 60) return pl(Math.round(d / 7), "week", "weeks");
    if (d < 365) return pl(Math.round(d / 30.44), "month", "months");
    let y = Math.floor(d / 365), m = Math.round((d - y * 365) / 30.44);
    if (m >= 12) { y++; m = 0; }
    return pl(y, "year", "years") + (m ? " " + pl(m, "month", "months") : "");
  }
  const WARN_CHOICES = [7, 14, 30, 60, 90, 180, 365, 730];
  const winLabel = (n) => (n <= 14 ? pl(n / 7, "week", "weeks") : n < 365 ? pl(Math.round(n / 30), "month", "months") : pl(Math.round(n / 365), "year", "years"));
  function stockStatus(x) {
    const { d, lvl } = stockInfo(x);
    if (d === null) return `<span class="tag">No date</span>`;
    if (d < 0) return `<span class="tag bad">Expired ${fmtDur(-d)} ago</span>`;
    if (d === 0) return `<span class="tag bad">Expires today</span>`;
    if (lvl === "ok") return `<span class="tag">OK · ${fmtDur(d)} left</span>`;
    return `<span class="tag ${lvl === "bad" ? "bad" : "soon"}">${fmtDur(d)} left</span>`;
  }
  function bannerHtml() {
    const st = stockStats();
    if (!st.bad || S.ui.bannerDay === new Date().toISOString().slice(0, 10)) return "";
    return `<div class="expbanner" role="status"><div><b>Check your dates</b>${st.exp ? `<span>${st.exp} expired</span>` : ""}${st.soon ? `<span>${st.soon} expire within ${winLabel(warnDays())}</span>` : ""}</div>
      <div class="actions"><button class="btn small" data-a="bannergo">See them</button><button class="btn small ghost" data-a="bannerhide">Hide for today</button></div></div>`;
  }
  /* ---------- how long your storage lasts ---------- */
  const FOOD_KCAL = [
    [/rice|bigas|bugas/i, { kg: 3600 }], [/mongo|monggo|bean|lentil/i, { kg: 3400 }], [/oat/i, { kg: 3800 }], [/flour|pasta|spaghetti|macaroni/i, { kg: 3600 }],
    [/sugar|asukal/i, { kg: 3870 }], [/milk/i, { kg: 5000 }], [/peanut butter/i, { kg: 5900 }], [/oil/i, { l: 8000, kg: 8800 }],
    [/noodle|pancit/i, { u: 280 }], [/sardine/i, { u: 300 }], [/tuna/i, { u: 250 }], [/corned beef|meat loaf|luncheon/i, { u: 350 }], [/biscuit|cracker|bread/i, { u: 300, kg: 4500 }]
  ];
  function parseQty(q) {
    const m = String(q || "").toLowerCase().replace(",", ".").match(/(\d+(?:\.\d+)?)\s*([a-z]+)?/);
    return m ? { n: parseFloat(m[1]), u: m[2] || "" } : null;
  }
  function supplyDays() {
    const n = nPeople(), W = 4, K = 2000;
    let liters = 0, kcal = 0, skipped = [], expired = 0;
    S.stock.forEach((x) => {
      const cat = x.cat || "food", name = (x.name || "").trim();
      const isWater = cat === "water" || (/water/i.test(name) && cat !== "medicine");
      if (!(isWater || cat === "food")) return;
      if (x.date && daysLeft(x.date) !== null && daysLeft(x.date) < 0) { expired++; return; }
      const q = parseQty(x.qty);
      if (!q) { skipped.push(name || "?"); return; }
      const u = q.u;
      if (isWater) {
        const f = /^(l|lt|ltr|liter|liters|litre|litres)$/.test(u) ? 1 : u === "ml" ? 0.001 : /^(jug|jugs|galon|galons)$/.test(u) ? 19 : /^(gal|gallon|gallons)$/.test(u) ? 3.8 : 0;
        if (f) liters += q.n * f; else skipped.push(name || "water");
        return;
      }
      const e = (FOOD_KCAL.find(([re]) => re.test(name)) || [])[1];
      const kg = /^(kg|kilo|kilos)$/.test(u) ? 1 : u === "g" ? 0.001 : /^(lb|lbs)$/.test(u) ? 0.4536 : /^(sack|sacks)$/.test(u) && /rice|bigas|bugas/i.test(name) ? 50 : 0;
      const lit = /^(l|lt|liter|liters|litre|litres)$/.test(u), cnt = /^(can|cans|tin|tins|pack|packs|pcs|pc|piece|pieces|sachet|sachets)$/.test(u);
      if (e && kg && e.kg) kcal += q.n * kg * e.kg; else if (e && lit && e.l) kcal += q.n * e.l; else if (e && cnt && e.u) kcal += q.n * e.u; else skipped.push(name || "?");
    });
    return { n, liters, kcal, waterDays: liters / (n * W), foodDays: kcal / (n * K), skipped, expired };
  }
  function supplyCard() {
    if (!S.stock.length) return "";
    const r = supplyDays();
    const dur = (d) => (d < 1 ? tx("Less than a day") : fmtDur(d < 14 ? Math.floor(d) : Math.round(d)));
    const row = (name, d, detail, bad, soon) => `<div class="sup"><b>${esc(tx(name))}</b><span class="tag ${d < bad ? "bad" : d < soon ? "soon" : ""}">${esc(dur(d))}</span><small>${esc(detail)}</small></div>`;
    const skip = [...new Set(r.skipped)].slice(0, 6);
    return `<div class="block supply"><h4>${esc(tx("How long your storage lasts"))}</h4>
      <label class="field pplin"><span>${esc(tx("For this many people"))}</span><input type="number" inputmode="numeric" min="1" max="30" data-bind="levels.people" data-re="1" value="${r.n}"></label>
      ${row("Water", r.waterDays, Math.round(r.liters) + " L", 3, 7)}
      ${row("Food", r.foodDays, "≈ " + Math.round(r.kcal).toLocaleString("en-PH") + " kcal", 7, 30)}
      <p class="hint">${esc(tx("A rough guide: 4 liters of water and about 2,000 kcal of food per person a day. Only water and dry or canned food that has not expired are counted."))}</p>
      ${skip.length ? `<p class="hint">${esc(tx("Not counted"))}: ${esc(skip.join(", "))}. ${esc(tx("Write the amount with a unit, like 20 L, 2 jugs, 10 kg or 24 cans."))}</p>` : ""}
      ${r.expired ? `<p class="hint">${r.expired} ${esc(tx(r.expired === 1 ? "expired item was left out." : "expired items were left out."))}</p>` : ""}</div>`;
  }

  /* ---------- Storage tab: everything you have stored ---------- */
  let stkQ = ""; // search text (kept while you move between tabs)
  const stkTypeNow = () => S.ui.stkType || "all";
  const stkDateKey = (x) => x.date || "9999";
  function viewStorage() {
    const typeSel = (id, bind, cur) => `<select ${id ? `id="${id}"` : ""} ${bind ? `data-bind="${bind}"` : ""}>${STK_TYPES.map(([v, l]) => `<option value="${v}" ${cur === v ? "selected" : ""}>${esc(tx(l))}</option>`).join("")}</select>`;
    const st = stockStats(), tf = stkTypeNow();
    const isSoon = (x) => { const d = stockInfo(x).d; return d !== null && d >= 0 && d <= itemWarn(x); };
    const keep = (x) => tf === "all" ? true : tf === "soon" ? isSoon(x) : (x.cat || "food") === tf;
    const byType = (S.ui.stkGroup || "type") === "type";
    const groups = new Map();
    S.stock.map((x, i) => ({ x, i })).filter((it) => keep(it.x)).sort((p, q) => (stkDateKey(p.x) < stkDateKey(q.x) ? -1 : stkDateKey(p.x) > stkDateKey(q.x) ? 1 : 0)).forEach((it) => {
      const label = byType ? (STK_TYPES.find((t) => t[0] === (it.x.cat || "food")) || ["", "Other"])[1] : (it.x.where || "").trim(), key = byType ? (it.x.cat || "food") : label.toLowerCase();
      if (!groups.has(key)) groups.set(key, { label, list: [] });
      groups.get(key).list.push(it);
    });
    const keys = [...groups.keys()].sort((p, q) => byType ? STK_TYPES.findIndex((t) => t[0] === p) - STK_TYPES.findIndex((t) => t[0] === q) : (p === "" ? 1 : q === "" ? -1 : p.localeCompare(q)));
    const itemHtml = ({ x, i }) => {
      const typeName = (STK_TYPES.find((t) => t[0] === (x.cat || "food")) || ["", ""])[1];
      const q = [x.name, x.where, x.qty, typeName].join(" ").toLowerCase();
      return `<details class="stkitem stk lv-${stockInfo(x).lvl}" data-cat="s_${esc(x.id)}" data-q="${esc(q)}" ${S.ui.open["s_" + x.id] ? "open" : ""}>
        <summary><span class="stkname">${esc(x.name || "(no name)")}</span>${x.qty ? `<span class="stkqty">${esc(x.qty)}</span>` : ""}${stockStatus(x)}</summary>
        <div class="stkbody">
          <div class="grid2">
            <label class="field"><span>${esc(tx("What"))}</span><input type="text" list="stkNames" data-bind="stock.${i}.name" value="${esc(x.name)}" placeholder="Rice, canned sardines, medicine"></label>
            <label class="field"><span>${esc(tx("Use by"))}</span><input type="date" data-bind="stock.${i}.date" data-re="1" value="${esc(x.date)}"></label>
          </div>
          <div class="grid2">
            <label class="field"><span>${esc(tx("Type"))}</span>${typeSel("", "stock." + i + ".cat", x.cat || "food")}</label>
            <label class="field"><span>${esc(tx("How many"))}</span><input type="text" data-bind="stock.${i}.qty" value="${esc(x.qty)}"></label>
          </div>
          <label class="field"><span>${esc(tx("Where it is kept"))}</span><input type="text" data-bind="stock.${i}.where" data-re="1" value="${esc(x.where || "")}" placeholder="Kitchen shelf, go bag, ref"></label>
          <div class="actions"><button class="btn danger small" data-a="rmstock" data-idx="${i}">${esc(tx("Remove"))}</button></div>
        </div>
      </details>`;
    };
    const list = keys.map((k) => { const g = groups.get(k); return `<section class="stkgrp"><h4>${g.label ? esc(byType ? tx(g.label) : g.label) : esc(tx("No place set"))} <span class="count">${g.list.length}</span></h4>${g.list.map(itemHtml).join("")}</section>`; }).join("");
    const nType = (v) => S.stock.filter((x) => (x.cat || "food") === v).length;
    const chip = (v, label, n) => `<button class="chip" data-a="stktype" data-v="${v}" aria-pressed="${tf === v}">${esc(label)} ${n}</button>`;
    const chips = chip("all", tx("All"), S.stock.length) + (st.bad || tf === "soon" ? chip("soon", tx("Expiring soon"), S.stock.filter(isSoon).length) : "") +
      STK_TYPES.filter(([v]) => nType(v) || tf === v).map(([v, l]) => chip(v, tx(l), nType(v))).join("");
    const choices = WARN_CHOICES.includes(warnDays()) ? WARN_CHOICES : [...WARN_CHOICES, warnDays()].sort((a, b) => a - b);
    const warnOpts = choices.map((n) => `<option value="${n}" ${warnDays() === n ? "selected" : ""}>${winLabel(n)}</option>`).join("");
    const addOpen = S.ui.open.stkadd === undefined ? !S.stock.length : S.ui.open.stkadd;
    return `<section class="block" id="storage">
      <h2 style="margin:.1rem 0 .2rem">${esc(tx("Storage"))}</h2>
      <p class="blurb">${esc(tx("Everything you have stored, in one place. Put in what it is, how many, where it is kept and its expiry date. Tap an item to change it."))}</p>
      <div class="budget" aria-label="Storage summary">
        <div><small>${esc(tx("Items"))}</small><b>${S.stock.length}</b></div>
        <div><small>${esc(tx("Expiring soon"))}</small><b>${st.soon}</b></div>
        <div><small>${esc(tx("Expired"))}</small><b>${st.exp}</b></div>
      </div>
    </section>
    ${supplyCard()}
    <datalist id="stkNames">${STK_NAMES.map((n) => `<option value="${n}">`).join("")}</datalist>
    <details class="cat" data-cat="stkadd" id="stkadd" ${addOpen ? "open" : ""}>
      <summary><h3>${esc(tx("Add an item"))}</h3>${chevron}</summary>
      <div class="person stkadd">
        <div class="grid2">
          <label class="field"><span>${esc(tx("What"))}</span><input type="text" id="stkName" list="stkNames" placeholder="Rice, canned sardines, medicine"></label>
          <label class="field"><span>${esc(tx("Use by"))}</span><input type="date" id="stkDate"></label>
        </div>
        <div class="grid2">
          <label class="field"><span>${esc(tx("Type"))}</span>${typeSel("stkType", "", "food")}</label>
          <label class="field"><span>${esc(tx("How many"))}</span><input type="text" id="stkQty"></label>
        </div>
        <label class="field"><span>${esc(tx("Where it is kept"))}</span><input type="text" id="stkWhere" placeholder="Kitchen shelf, go bag, ref"></label>
        <div class="actions"><button class="btn small" data-a="addstock">${esc(tx("Add to the list"))}</button></div>
      </div>
    </details>
    ${S.stock.length ? `<div class="stksearch"><input type="search" id="stkSearch" placeholder="${esc(tx("Search your items"))}" value="${esc(stkQ)}" autocomplete="off" aria-label="${esc(tx("Search your items"))}"></div>
    <div class="chips" role="group" aria-label="Filters">${chips}</div>
    <div class="chips" role="group" aria-label="${esc(tx("Group by"))}"><span class="grpl">${esc(tx("Group by"))}</span><button class="chip" data-a="stkgroup" data-v="type" aria-pressed="${byType}">${esc(tx("Type"))}</button><button class="chip" data-a="stkgroup" data-v="place" aria-pressed="${!byType}">${esc(tx("Where it is kept"))}</button></div>
    ${list || `<p class="empty">${esc(tx("Nothing here."))}</p>`}
    <p class="empty" id="stkNone" hidden>${esc(tx("Nothing matches your search."))}</p>` : `<p class="empty">${esc(tx("Nothing stored yet. Add what you have: rice, water, medicine, batteries."))}</p>`}
    <details class="cat" data-cat="stock" id="stock" ${S.ui.open.stock ? "open" : ""}>
      <summary><h3>${esc(tx("Expiry reminders"))}</h3>${chevron}</summary>
      <div class="person"><label class="field" style="margin:0"><span>${esc(tx("Remind me this long before"))}</span><select data-bind="plan.warn" data-re="1">${warnOpts}</select></label>
        <div class="actions"><button class="btn small ghost" data-a="stockcal">${esc(tx("Add the dates to my phone's calendar"))}</button></div>
        <p class="hint" style="margin:.4rem 0 .4rem">${esc(tx("Vegetables, fruit, meat, fish and milk spoil fast, so they are flagged 3 days ahead."))}</p>
        <p class="hint" style="margin:.4rem 0 0">${esc(tx("Creates one file with every dated item. Open it, and your calendar app reminds you before each date and on the day."))}</p></div>
    </details>`;
  }
  function stkFilterDom() {
    const q = stkQ.trim().toLowerCase();
    let shown = 0;
    document.querySelectorAll("#app .stkgrp").forEach((g) => {
      let n = 0;
      g.querySelectorAll(".stkitem").forEach((el) => { const ok = !q || el.dataset.q.includes(q); el.hidden = !ok; if (ok) n++; });
      g.hidden = !n; shown += n;
    });
    const none = document.getElementById("stkNone"); if (none) none.hidden = !(q && !shown);
  }

  /* Calendar file (.ics): all-day event on each expiry date, with an alarm before and on the day. */
  function stockIcs() {
    const w = warnDays(), esc2 = (t) => String(t).replace(/\\/g, "\\\\").replace(/[;,]/g, (m) => "\\" + m).replace(/\r?\n/g, "\\n");
    const alarmsFor = (x) => { const w = itemWarn(x); return [...new Set([w, w > 30 ? 30 : 0, w > 7 ? 7 : 0].filter(Boolean))].sort((a, b) => b - a); }; // e.g. 1 year, 1 month, 1 week before, then the day itself
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    const dt = (iso, plus) => { const d = new Date(iso + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + plus); return d.toISOString().slice(0, 10).replace(/-/g, ""); };
    const ev = S.stock.filter((x) => x.date && /^\d{4}-\d{2}-\d{2}$/.test(x.date)).map((x) => {
      const name = (x.name || "Item").trim() || "Item";
      const lines = ["BEGIN:VEVENT", "UID:" + x.id + "@andam", "DTSTAMP:" + stamp, "DTSTART;VALUE=DATE:" + dt(x.date, 0), "DTEND;VALUE=DATE:" + dt(x.date, 1),
        "SUMMARY:" + esc2("Andam: " + name + " expires"), "DESCRIPTION:" + esc2([x.qty ? "How many: " + x.qty : "", x.where ? "Kept at: " + x.where : "", "Eat, use or replace it."].filter(Boolean).join("\n")),
        ...alarmsFor(x).flatMap((a) => ["BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:" + esc2(name + " expires in " + fmtDur(a)), "TRIGGER:-P" + (a - 1) + "DT15H", "END:VALARM"]),
        "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:" + esc2(name + " expires today"), "TRIGGER:PT9H", "END:VALARM", "END:VEVENT"];
      return lines.join("\r\n");
    });
    if (!ev.length) return "";
    return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Andam//Expiry dates//EN", "CALSCALE:GREGORIAN", ...ev, "END:VCALENDAR"].join("\r\n") + "\r\n";
  }
  async function shareStockCal() {
    const ics = stockIcs();
    if (!ics) { toast(tx("Add an item with an expiry date first.")); return; }
    const file = new File([ics], "Andam-expiry-dates.ics", { type: "text/calendar" });
    try { if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: "Andam" }); return; } } catch (e) { if (e && e.name === "AbortError") return; }
    const a = document.createElement("a"); a.href = URL.createObjectURL(file); a.download = "Andam-expiry-dates.ics";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast(tx("Saved Andam-expiry-dates.ics. Open it to add the dates to your calendar."));
  }

  /* ---------- tip of the day, monthly check, season reminders ---------- */
  const lt = (o) => (ceb() && o.ceb) || o.en;
  const ymd = () => { const d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); };
  const monthKey = () => { const d = new Date(); return d.getFullYear() + "_" + (d.getMonth() + 1); };
  const mKey = (m) => "m" + monthKey() + "_" + m.id;
  const monthDone = () => MONTHLY.filter((m) => S.checks[mKey(m)]).length;
  const curSeason = () => SEASONS.find((x) => x.months.includes(new Date().getMonth() + 1)) || SEASONS[0];
  const sKey = (se, k) => "s" + new Date().getFullYear() + "_" + se.id + "_" + k;
  function pruneChecks() { // old months and years are forgotten
    const m = "m" + monthKey() + "_", y = "s" + new Date().getFullYear() + "_";
    Object.keys(S.checks).forEach((k) => { if (!(k.startsWith(m) || k.startsWith(y))) delete S.checks[k]; });
  }
  function tipIdx() {
    if (S.ui.tipDay !== ymd()) { S.ui.tipDay = ymd(); S.ui.tipOff = 0; }
    return (Math.floor(todayStart() / 864e5) + (S.ui.tipOff || 0)) % TIPS.length;
  }
  function tipCard() {
    const t = TIPS[tipIdx()], n = monthDone();
    return `<div class="tipcard" role="note">
      <div class="tiphead"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.9.7 1.5 1.6 1.5 2.6V16h4v-.5c0-1 .6-1.9 1.5-2.6A6 6 0 0 0 12 3z"/></svg><b>${esc(tx("Tip of the day"))}</b></div>
      <p>${esc(lt(t))}</p>
      <div class="actions">${t.g ? `<button class="btn small" data-a="hwgo" data-id="${t.g}">${esc(tx("Open the guide"))}</button>` : ""}<button class="btn small ghost" data-a="nexttip">${esc(tx("Next tip"))}</button></div>
      ${n < MONTHLY.length ? `<p class="tipdue"><span class="tag soon">${esc(tx("Monthly check"))} ${n}/${MONTHLY.length}</span> <button class="btn small ghost" data-a="monthgo">${esc(tx("Do it now"))}</button></p>` : `<p class="tipdue"><span class="tag">${esc(tx("Monthly check done"))}</span></p>`}
    </div>`;
  }
  const chkRow = (key, text, extra) => `<label class="chkrow"><input class="chk" type="checkbox" data-bind="checks.${key}" data-re="1" ${S.checks[key] ? "checked" : ""}><span>${esc(text)}</span>${extra || ""}</label>`;
  function monthlyBlock() {
    const n = monthDone(), open = !!S.ui.open.monthly;
    const rows = MONTHLY.map((m) => chkRow(mKey(m), lt(m), m.tab ? `<button class="btn small ghost" type="button" data-a="tab" data-tab="${m.tab}">${esc(tx("Open"))}</button>` : m.act ? `<button class="btn small ghost" type="button" data-a="${m.act}">${esc(tx("Open"))}</button>` : "")).join("");
    return `<details class="cat" data-cat="monthly" id="monthly" ${open ? "open" : ""}>
      <summary><h3>${esc(tx("Monthly check"))}</h3><span class="count">${n} ${esc(tx("of"))} ${MONTHLY.length}</span>${chevron}
        <span class="mini"><i style="width:${Math.round((n / MONTHLY.length) * 100)}%"></i></span></summary>
      <p class="blurb">${esc(tx("Ten minutes once a month keeps everything ready. The ticks start over on the 1st."))}</p>
      ${rows}
      <div class="actions"><button class="btn small ghost" data-a="monthcal">${esc(tx("Remind me every month (calendar)"))}</button></div>
    </details>`;
  }
  function seasonBlock() {
    const now = curSeason(), open = S.ui.open.season === undefined ? false : S.ui.open.season;
    const nowDone = now.items.filter((_, k) => S.checks[sKey(now, k)]).length;
    const one = (se) => `<div class="season ${se === now ? "now" : ""}"><h4>${esc(lt(se))}${se === now ? ` <span class="tag soon">${esc(tx("Now"))}</span>` : ""}</h4>${se.items.map((it, k) => chkRow(sKey(se, k), lt(it))).join("")}</div>`;
    return `<details class="cat" data-cat="season" id="season" ${open ? "open" : ""}>
      <summary><h3>${esc(tx("Season reminders"))}</h3><span class="count">${nowDone} ${esc(tx("of"))} ${now.items.length}</span>${chevron}</summary>
      <p class="blurb">${esc(tx("What to do in each part of the year. The one for this season is on top."))}</p>
      ${one(now)}${SEASONS.filter((se) => se !== now).map(one).join("")}
    </details>`;
  }
  function monthIcs() {
    const d = new Date(); if (d.getDate() > 1) d.setMonth(d.getMonth() + 1); d.setDate(1);
    const p2 = (n) => String(n).padStart(2, "0"), start = d.getFullYear() + p2(d.getMonth() + 1) + "01";
    const nx = new Date(d.getFullYear(), d.getMonth(), 2), end = nx.getFullYear() + p2(nx.getMonth() + 1) + p2(nx.getDate());
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    const desc = MONTHLY.map((m) => "- " + m.en).join("\\n");
    return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Andam//Monthly check//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT", "UID:monthly-check@andam", "DTSTAMP:" + stamp,
      "DTSTART;VALUE=DATE:" + start, "DTEND;VALUE=DATE:" + end, "RRULE:FREQ=MONTHLY", "SUMMARY:Andam: monthly readiness check", "DESCRIPTION:" + desc,
      "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Andam monthly check", "TRIGGER:PT9H", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\r\n") + "\r\n";
  }
  async function shareMonthCal() {
    const file = new File([monthIcs()], "Andam-monthly-check.ics", { type: "text/calendar" });
    try { if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: "Andam" }); return; } } catch (e) { if (e && e.name === "AbortError") return; }
    const a = document.createElement("a"); a.href = URL.createObjectURL(file); a.download = "Andam-monthly-check.ics";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast(tx("Saved Andam-monthly-check.ics. Open it to add the reminder to your calendar."));
  }

  let updateReady = false;
  const updateBanner = () => (updateReady ? `<div class="expbanner" role="status"><div><b>${esc(tx("A new version of Andam is ready."))}</b></div><div class="actions"><button class="btn small" data-a="applyupdate">${esc(tx("Update now"))}</button></div></div>` : "");

  /* ---------- warnings near you (weather, earthquakes, storms) ---------- */
  const HAZ = [["flood", "Floods here"], ["landslide", "Landslide risk"], ["surge", "Storm surge"], ["fire", "Fire risk"], ["evac", "Evacuation center"], ["safe", "Safe place"]];
  let alertBusy = false, alertResults = null;
  const alertsOn = () => S.settings.alertsAuto !== "off";
  function alertAgo(ms) {
    const m = Math.max(0, Math.round((Date.now() - ms) / 60000));
    if (m < 2) return tx("just now");
    if (m < 90) return m + " " + tx("min ago");
    const h = Math.round(m / 60); if (h < 36) return h + " " + tx("h ago");
    return Math.round(h / 24) + " " + tx("days ago");
  }
  function localNotes(p) { // your own place notes that are close to this spot
    return S.places.filter((x) => x.hazard && x.lat !== "" && x.lat != null && ALERTS.hav(p.lat, p.lng, Number(x.lat), Number(x.lng)) <= 3)
      .map((x) => ({ k: "note", lvl: 1, a: { label: x.label || "", text: tx((HAZ.find((h) => h[0] === x.hazard) || ["", ""])[1]) + (x.note ? ": " + x.note : "") } }));
  }
  function placeItems(p) { const r = S.alerts[p.id]; return [...(r ? r.items : []), ...localNotes(p)].sort((a, b) => b.lvl - a.lvl); }
  function softRender() { // refresh without interrupting someone who is typing
    const a = document.activeElement;
    if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && app.contains(a)) return;
    render();
  }
  async function runAlerts(manual) {
    if (alertBusy || !S.watch.length) return;
    if (!navigator.onLine) { if (manual) toast(tx("No internet. Showing the last check.")); return; }
    const before = alertBanner();
    alertBusy = true; if (S.ui.tab === "plan") softRender();
    let bad = 0;
    await Promise.all(S.watch.map(async (p) => {
      try { const r = await ALERTS.check(p.lat, p.lng); if (r.ok) S.alerts[p.id] = r; else bad++; } catch (e) { bad++; }
    }));
    alertBusy = false; S.ui.alertAt = Date.now();
    Object.keys(S.alerts).forEach((id) => { if (!S.watch.some((p) => p.id === id)) delete S.alerts[id]; });
    save(); if (S.ui.tab === "plan" || alertBanner() !== before) softRender();
    if (manual && bad) toast(tx("Couldn't reach the warning services. Try again later."));
  }
  function autoAlerts() { if (alertsOn() && S.watch.length && (!S.ui.alertAt || Date.now() - S.ui.alertAt > 3600000)) runAlerts(false); }
  function addWatch(p) {
    if (S.watch.length >= 5) { toast(tx("You can watch up to 5 places. Remove one first.")); return false; }
    S.watch = S.watch.filter((x) => !(p.gps && x.gps)); S.watch.push({ id: p.gps ? "gps" : uid(), name: p.name, lat: p.lat, lng: p.lng, gps: !!p.gps });
    return true;
  }
  function alertBanner() {
    if (S.ui.alertHide === ymd()) return "";
    let top = null, where = "";
    S.watch.forEach((p) => { const r = S.alerts[p.id]; if (!r || Date.now() - r.at > 12 * 3600000) return; r.items.forEach((it) => { if (it.lvl >= 3 && (!top || it.lvl > top.lvl)) { top = it; where = p.name; } }); });
    if (!top) return "";
    return `<div class="expbanner alertban" role="alert"><div><b>${esc(tx("Warning near"))} ${esc(where)}</b><span>${esc(ALERTS.text(top, ceb()).t)}</span></div>
      <div class="actions"><button class="btn small" data-a="alertgo">${esc(tx("See"))}</button><button class="btn small ghost" data-a="alerthide">${esc(tx("Hide for today"))}</button></div></div>`;
  }
  function alertsCard() {
    const lvTag = (l) => `<span class="tag ${l >= 3 ? "bad" : l === 2 ? "soon" : ""}">${esc(ALERTS.levelName(l, ceb()))}</span>`;
    const failMap = { weather: "weather", quakes: "earthquakes", storms: "storms and events" };
    const rows = S.watch.map((p) => {
      const r = S.alerts[p.id], items = placeItems(p), top = items.reduce((m, it) => Math.max(m, it.lvl), 0);
      return `<div class="watchrow"><div class="wh"><b>${esc(p.name)}${p.gps ? ` <small>${esc(Number(p.lat).toFixed(2))}, ${esc(Number(p.lng).toFixed(2))}</small>` : ""}</b>
        ${r ? lvTag(top) : `<span class="tag">${esc(tx("Not checked yet"))}</span>`}
        <button class="btn danger small" data-a="alertrm" data-id="${esc(p.id)}" aria-label="${esc(tx("Remove"))}">✕</button></div>
        ${r ? `<p class="hint" style="margin:.1rem 0 .3rem">${esc(tx("Checked"))} ${esc(alertAgo(r.at))}</p>` : ""}
        ${items.length ? items.map((it) => { const t = ALERTS.text(it, ceb()); return `<div class="alrt lv${it.lvl}"><b>${esc(t.t)}</b><p>${esc(t.b)}</p></div>`; }).join("") : r ? `<p class="alrt lv0">${esc(tx("Nothing to worry about in the next 2 days."))}</p>` : ""}
        ${r && r.failed.length ? `<p class="hint">${esc(tx("Could not check"))}: ${r.failed.map((f) => esc(tx(failMap[f] || f))).join(", ")}</p>` : ""}
      </div>`;
    }).join("");
    const ph = S.watch.some((p) => ALERTS.inPH(p.lat, p.lng));
    const open = S.ui.open.alerts === undefined ? true : S.ui.open.alerts;
    const worst = S.watch.reduce((m, p) => Math.max(m, S.alerts[p.id] ? placeItems(p).reduce((a, it) => Math.max(a, it.lvl), 0) : 0), 0);
    return `<details class="cat alertcard" data-cat="alerts" id="alerts" ${open ? "open" : ""}>
      <summary><h3>${esc(tx("Warnings near you"))}</h3><span class="count">${alertBusy ? esc(tx("Checking…")) : esc(ALERTS.levelName(worst, ceb()))}</span>${chevron}</summary>
      ${rows || `<p class="empty">${esc(tx("Add a place to watch."))}</p>`}
      <div class="actions"><button class="btn small" data-a="alertcheck" ${alertBusy ? "disabled" : ""}>${esc(tx("Check now"))}</button><button class="btn small ghost" data-a="alertgps">${esc(tx("Use my location now"))}</button><button class="btn small ghost" data-a="map">${esc(tx("Open the map"))}</button></div>
      <div class="alrtadd"><input type="search" id="alertQ" placeholder="${esc(tx("Search a town or city to watch"))}" autocomplete="off" aria-label="${esc(tx("Search a town or city to watch"))}"><button class="btn small ghost" data-a="alertsearch">${esc(tx("Search"))}</button></div>
      ${alertResults ? (alertResults.length ? alertResults.map((r, i) => `<button class="btn small ghost resbtn" data-a="alertadd" data-i="${i}">+ ${esc(r.name)}</button>`).join("") : `<p class="hint">${esc(tx("No place found."))}</p>`) : ""}
      <div class="chips" style="margin-top:.6rem"><button class="chip" data-a="alertauto" aria-pressed="${alertsOn()}">${esc(tx("Check when I open the app"))}</button></div>
      <p class="hint">${esc(tx("A guide made from free forecasts and quake reports, not an official warning. When it matters, listen to PAGASA, PHIVOLCS and your LGU. It needs internet; offline you see the last check. Your location is only sent to these services to get the results."))}</p>
      <p class="hint">${esc(tx("Want a message on your phone even when the app is closed? Use the Andam push alerts add-on (free ntfy app). The setup guide came with this app."))}</p>
      ${ph ? `<p class="hint">${esc(tx("Official sources (need internet)"))}: <a href="https://www.pagasa.dost.gov.ph/" target="_blank" rel="noopener">PAGASA</a> · <a href="https://www.phivolcs.dost.gov.ph/" target="_blank" rel="noopener">PHIVOLCS</a> · <a href="https://ndrrmc.gov.ph/" target="_blank" rel="noopener">NDRRMC</a></p>` : `<p class="hint">${esc(tx("Outside the Philippines, use your country's weather and disaster agency."))}</p>`}
      <p class="hint">Weather data by <a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo.com</a> (CC BY 4.0) · Earthquakes: USGS · Storms and events: NASA EONET</p>
    </details>`;
  }

  /* ---------- shopping list to send ---------- */
  async function shareShopList() {
    const lines = [];
    let total = 0;
    CATS.forEach((c) => {
      const list = [...c.items, ...(S.custom[c.id] || []).map((i) => ({ ...i, custom: true }))].filter((i) => !S.checked[i.id] && (i.b > 0 || i.custom));
      if (!list.length) return;
      lines.push("", c.name.toUpperCase());
      list.forEach((i) => { const pr = Number(S.price[i.id]) || 0; total += pr; lines.push("[ ] " + i.t + (pr ? " (" + peso(pr) + ")" : "")); });
    });
    if (!lines.length) { toast(tx("Nothing left to buy.")); return; }
    const text = "Andam: " + tx("Shopping list") + lines.join("\n") + (total ? "\n\n" + tx("About") + " " + peso(total) + " (" + tx("prices you entered") + ")" : "");
    try { if (navigator.share) { await navigator.share({ title: "Andam", text }); return; } } catch (e) { if (e && e.name === "AbortError") return; }
    try { await navigator.clipboard.writeText(text); toast(tx("Shopping list copied. Paste it into a message.")); } catch (e) { toast(tx("Couldn't copy the list.")); }
  }

  function viewPlan() {
    pruneChecks();
    const items = allItems();
    const tot = { 1: 0, 2: 0, 3: 0 }, done = { 1: 0, 2: 0, 3: 0 };
    let planned = 0, bought = 0;
    items.forEach((i) => {
      tot[i.p]++;
      const pr = Number(S.price[i.id]) || 0;
      planned += pr;
      if (S.checked[i.id]) { done[i.p]++; bought += pr; }
    });
    const next = items.find((i) => i.p === 1 && !S.checked[i.id]) || items.find((i) => !S.checked[i.id]);
    const catName = (id) => CATS.find((c) => c.id === id).name;

    const seg = [1, 2, 3].map((k) => {
      const pct = tot[k] ? Math.round((done[k] / tot[k]) * 100) : 0;
      return `<div class="seg" role="img" aria-label="${PHASES[k]}: ${done[k]} of ${tot[k]} done"><div class="bar"><i style="width:${pct}%"></i></div><b>${PHASES[k]}</b><small>${done[k]} of ${tot[k]} done</small></div>`;
    }).join("");

    const chips = [[0, "All"], [1, "Start now"], [2, "Next"], [3, "Later"]].map(([v, l]) =>
      `<button class="chip" data-a="phase" data-phase="${v}" aria-pressed="${S.ui.phase === v}">${l}</button>`).join("") +
      `<button class="chip" data-a="tobuy" aria-pressed="${S.ui.toBuy}">Still to buy</button>` +
      `<button class="chip" data-a="shoplist">${esc(tx("Send my shopping list"))}</button>`;

    const cats = CATS.map((c) => {
      const list = [...c.items.map((i) => ({ ...i, cat: c.id })), ...(S.custom[c.id] || []).map((i) => ({ ...i, cat: c.id, custom: true }))];
      const doneN = list.filter((i) => S.checked[i.id]).length;
      const shown = list.filter((i) =>
        (S.ui.phase === 0 || i.p === S.ui.phase) && (!S.ui.toBuy || (!S.checked[i.id] && (i.b > 0 || i.custom))));
      const filtering = S.ui.phase !== 0 || S.ui.toBuy;
      if (filtering && !shown.length) return "";
      const open = S.ui.open[c.id] === undefined ? c.id === "water" : S.ui.open[c.id];
      const pct = list.length ? Math.round((doneN / list.length) * 100) : 0;
      return `<details class="cat" data-cat="${c.id}" ${open ? "open" : ""}>
        <summary><h3>${esc(c.name)}</h3><span class="count">${doneN} of ${list.length}</span>${chevron}
          <span class="mini"><i style="width:${pct}%"></i></span></summary>
        <p class="blurb">${esc(c.blurb)}</p>
        ${shown.map(itemHtml).join("")}
        <div class="addrow">
          <input type="text" id="add_${c.id}" placeholder="Add your own item" aria-label="Add your own item to ${esc(c.name)}">
          <select id="addp_${c.id}" aria-label="When"><option value="1">Start now</option><option value="2">Next</option><option value="3">Later</option></select>
          <button class="btn small" data-a="addcustom" data-cat="${c.id}">Add</button>
        </div>
      </details>`;
    }).join("");

    return `<section class="view">
      ${alertsCard()}
      ${tipCard()}
      ${drillCard()}
      <h2>Readiness plan</h2>
      <p class="lede">Check things off as you get them. Start with the yellow “Start now” items: they are the cheapest and matter most.</p>
      <div class="tide">${seg}</div>
      ${next ? `<div class="nextup"><div><b>Next up</b><p>${esc(next.t)}</p><span class="hint">${esc(catName(next.cat))}</span></div></div>` : `<div class="nextup"><div><b>Everything is checked</b><p>Run a drill and see what still fails.</p></div></div>`}
      <div class="budget" aria-label="Budget">
        <div><small>Prices you entered</small><b>${peso(planned)}</b></div>
        <div><small>Already bought</small><b>${peso(bought)}</b></div>
        <div><small>Still to buy</small><b>${peso(planned - bought)}</b></div>
      </div>
      <div class="block"><label class="field" style="margin:0"><span>${esc(tx("Months to finish buying"))}</span><input type="number" inputmode="numeric" min="1" max="60" data-bind="plan.months" data-re="1" value="${Math.max(1, Number(S.plan.months) || 6)}"></label>
        <p class="hint" style="margin:.5rem 0 0">${planned - bought > 0 ? "About " + peso((planned - bought) / Math.max(1, Number(S.plan.months) || 6)) + " a month for what is still to buy." : "Open Details on an item and type the price you found, then the monthly amount shows here."}</p></div>
      ${monthlyBlock()}${seasonBlock()}
      <div class="chips" role="group" aria-label="Filters">${chips}</div>
      ${cats || '<p class="empty">Nothing matches this filter. Try “All”.</p>'}
      <p class="hint" style="margin-top:1.25rem">The cost tag is the rough price of one item. Peso figures in Details come from Philippine shop listings seen in November 2026. Prices change, so check before you buy.</p>
    </section>`;
  }

  function viewFamily() {
    const f = S.family;
    const members = f.members.map((m, idx) => `<div class="person">
      <div class="grid2">
        <label class="field"><span>Name</span><input type="text" data-bind="family.members.${idx}.name" value="${esc(m.name)}"></label>
        <label class="field"><span>Phone</span><input type="tel" inputmode="tel" data-bind="family.members.${idx}.phone" value="${esc(m.phone)}"></label>
      </div>
      <label class="field"><span>Health and needs (allergies, medicines, blood type)</span><input type="text" data-bind="family.members.${idx}.notes" value="${esc(m.notes)}"></label>
      <label class="field" style="display:flex;gap:.6rem;align-items:center"><input class="chk" type="checkbox" data-bind="family.members.${idx}.bag" ${m.bag ? "checked" : ""}> <span style="margin:0">Go bag is packed</span></label>
      <div class="actions">
        <button class="btn small" data-a="dial" data-mode="tel" data-path="family.members.${idx}.phone">Call</button>
        <button class="btn small ghost" data-a="dial" data-mode="sms" data-path="family.members.${idx}.phone">Text</button>
        <button class="btn danger small" data-a="rmmember" data-idx="${idx}">Remove</button>
      </div>
    </div>`).join("");

    const nums = f.nums.map((n, idx) => `<div class="person">
      <div class="grid2">
        <label class="field"><span>Who</span><input type="text" data-bind="family.nums.${idx}.label" value="${esc(n.label)}"></label>
        <label class="field"><span>Number</span><input type="tel" inputmode="tel" data-bind="family.nums.${idx}.phone" value="${esc(n.phone)}"></label>
      </div>
      <div class="actions"><button class="btn small" data-a="dial" data-mode="tel" data-path="family.nums.${idx}.phone">Call</button><button class="btn danger small" data-a="rmnum" data-idx="${idx}">Remove</button></div>
    </div>`).join("");

    return `<section class="view">
      <h2>Family</h2>
      <p class="lede">Everything here stays on this phone. Fill it in with your family and keep a paper copy too.</p>

      <div class="block"><h4>Where we meet</h4>
        <label class="field"><span>First choice: near home</span><input type="text" data-bind="family.meet1" value="${esc(f.meet1)}" placeholder="For example, the church yard or the barangay hall"></label>
        <label class="field"><span>Second choice: outside the neighborhood</span><input type="text" data-bind="family.meet2" value="${esc(f.meet2)}"></label>
        <label class="field"><span>Out-of-town place, if we can't come home</span><input type="text" data-bind="family.meet3" value="${esc(f.meet3)}"></label>
        <label class="field"><span>How to get to the evacuation center (roads, landmarks)</span><input type="text" data-bind="family.route" value="${esc(f.route || "")}" placeholder="For example: down the main road, left at the church, past the bridge"></label>
      </div>

      <div class="block"><h4>Contact outside the area</h4>
        <p class="hint" style="margin:0">One relative or friend far away whom everyone calls or texts when local lines are jammed.</p>
        <div class="grid2">
          <label class="field"><span>Name</span><input type="text" data-bind="family.outName" value="${esc(f.outName)}"></label>
          <label class="field"><span>Phone</span><input type="tel" inputmode="tel" data-bind="family.outPhone" value="${esc(f.outPhone)}"></label>
        </div>
        <div class="actions"><button class="btn small" data-a="dial" data-mode="tel" data-path="family.outPhone">Call</button><button class="btn small ghost" data-a="dial" data-mode="sms" data-path="family.outPhone">Text</button></div>
      </div>

      <h3>People</h3>
      <div class="block">${members || '<p class="empty">Add each person in your household and anyone you check on.</p>'}
        <div class="actions"><button class="btn" data-a="addmember">Add a person</button></div></div>

      <h3>${esc(tx("Important places"))}</h3>
      <div class="block"><p class="hint" style="margin:0">${esc(tx("Add the high ground, evacuation center, clinic and water source. Tap “Use my location” while standing there. The numbers work without internet."))}</p>
        ${placesHtml()}
        <div class="actions"><button class="btn" data-a="addplace">${esc(tx("Add a place"))}</button><button class="btn ghost" data-a="map" data-focus="add">${esc(tx("Add on the map"))}</button></div></div>

      <h3>Emergency numbers</h3>
      <div class="block">${nums}
        <p class="hint">Add your barangay, rural health unit, municipal DRRM office, and the nearest hospital.</p>
        <div class="actions"><button class="btn" data-a="addnum">Add a number</button></div></div>

      ${idForm()}

      <h3>${esc(tx("Wallet cards"))}</h3>
      <div class="block"><p class="hint" style="margin:0">${esc(tx("A small card for every person, to cut out and keep in a wallet or go-bag. It shows the name, phone number, health needs and where the family meets. Print it, or save it as a PDF."))}</p>
        <div class="actions"><button class="btn small" data-a="printcards">${esc(tx("Print wallet cards"))}</button></div></div>

      <h3>${esc(tx("Invite my family to Andam"))}</h3>
      <div class="block"><p class="hint" style="margin:0">${esc(tx("Send the link or show the QR code so a sister or parent can open Andam on their own phone."))}${SYNC && SYNC.configured() ? " " + esc(tx("If they log in with your family login, they see the same things.")) : ""}</p>
        <div class="actions"><button class="btn small" data-a="invite">${esc(tx("Send the Andam link"))}</button><button class="btn small ghost" data-a="inviteqr">${esc(tx("Show QR code"))}</button></div></div>

      <h3>${esc(tx("Share with family"))}</h3>
      <div class="block"><p class="hint" style="margin:0">${esc(tx("Send your family page (people, numbers, meeting places and important places) to a sister or parent. They add it to their phone. Nothing else is shared."))}</p>
        <div class="actions"><button class="btn small" data-a="sharefam">${esc(tx("Send my family page"))}</button></div>
        <label class="field"><span>${esc(tx("Paste a family page here"))}</span><textarea id="famIn" style="min-height:4rem;font-size:.8rem"></textarea></label>
        <div class="actions"><button class="btn small" data-a="impfam">${esc(tx("Add to this phone"))}</button></div></div>
    </section>`;
  }

  function placesHtml() {
    return S.places.map((p, i) => {
      const has = p.lat != null && p.lng != null && p.lat !== "";
      return `<div class="person">
        <div class="grid2">
          <label class="field"><span>${esc(tx("Place"))}</span><input type="text" list="placeKinds" data-bind="places.${i}.label" value="${esc(p.label)}" placeholder="High ground"></label>
          <label class="field"><span>${esc(tx("Note"))}</span><input type="text" data-bind="places.${i}.note" value="${esc(p.note)}"></label>
        </div>
        <label class="field"><span>${esc(tx("Hazard or use"))}</span><select data-bind="places.${i}.hazard" data-re="1"><option value="">—</option>${HAZ.map(([v, l]) => `<option value="${v}" ${p.hazard === v ? "selected" : ""}>${esc(tx(l))}</option>`).join("")}</select></label>
        ${has ? `<p class="coords">${esc(p.lat)}, ${esc(p.lng)}</p>` : ""}
        <div class="phrow"><span class="ph" data-ph="place_${esc(p.id)}"></span><label class="phbtn" for="ph_place_${esc(p.id)}">${esc(tx("Add a photo (for example the evacuation map or a route sign)"))}</label><input type="file" id="ph_place_${esc(p.id)}" accept="image/*" data-ph-in="place_${esc(p.id)}" hidden></div>
        <div class="actions"><button class="btn small" data-a="placegps" data-idx="${i}">${esc(tx("Use my location"))}</button>
          ${has ? `<a class="btn small ghost" href="geo:${esc(p.lat)},${esc(p.lng)}?q=${esc(p.lat)},${esc(p.lng)}(${encodeURIComponent(p.label || "Place")})">${esc(tx("Open in maps"))}</a>` : ""}
          <button class="btn danger small" data-a="rmplace" data-idx="${i}">${esc(tx("Remove"))}</button></div>
      </div>`;
    }).join("") + `<datalist id="placeKinds"><option value="High ground"><option value="Evacuation center"><option value="Clinic or hospital"><option value="Water source"><option value="Church"><option value="Relative's home"></datalist>`;
  }


  /* ---------- emergency ID card ---------- */
  const BLOOD = ["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const isoToday = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  function idForm() {
    const m = S.medid || {};
    const f = (k, lab, type, ph) => `<label class="field"><span>${esc(tx(lab))}</span><input type="${type || "text"}" ${type === "tel" ? 'inputmode="tel"' : ""} data-bind="medid.${k}" value="${esc(m[k] || "")}" ${ph ? `placeholder="${esc(tx(ph))}"` : ""}></label>`;
    const open = !!S.ui.open.idcard;
    return `<details class="cat" data-cat="idcard" id="idcard" ${open ? "open" : ""}>
      <summary><h3>${esc(tx("Emergency ID card"))}</h3><span class="count">${m.name ? esc(m.name) : esc(tx("Not filled in"))}</span>${chevron}</summary>
      <p class="hint" style="margin:0">${esc(tx("A big, clear screen for a rescuer or a doctor if you cannot speak. Stays on this phone. It is not in the family page you share, but it is in your backup, so keep the backup private."))}</p>
      <div class="grid2">${f("name", "Full name")}<label class="field"><span>${esc(tx("Blood type"))}</span><select data-bind="medid.blood">${BLOOD.map((b) => `<option value="${b}" ${m.blood === b ? "selected" : ""}>${b || "—"}</option>`).join("")}</select></label></div>
      ${f("allergies", "Allergies", "text", "For example: penicillin, shrimp")}
      ${f("conditions", "Medical conditions", "text", "For example: asthma, diabetes")}
      ${f("meds", "Medicines taken", "text")}
      <div class="grid2">${f("c1n", "Contact 1 name")}${f("c1p", "Contact 1 phone", "tel")}</div>
      <div class="grid2">${f("c2n", "Contact 2 name")}${f("c2p", "Contact 2 phone", "tel")}</div>
      ${f("addr", "Home address or barangay")}
      ${f("notes", "Other notes", "text", "For example: doctor's name, wears glasses")}
      <div class="actions"><button class="btn" data-a="idcard">${esc(tx("Show my ID card"))}</button></div>
      <p class="hint">${esc(tx("Tip: open the card, take a screenshot, and set it as your lock screen picture so anyone can read it without your passcode."))}</p>
    </details>`;
  }
  function idCardHtml() {
    const m = S.medid || {}, row = (lab, v, cls) => (v ? `<div class="idrow ${cls || ""}"><small>${esc(tx(lab))}</small><b>${esc(v)}</b></div>` : "");
    const contact = (n, p) => (p ? `<a class="idcall" href="${esc(telHref(p))}"><small>${esc(n || tx("Contact"))}</small><b>${esc(p)}</b></a>` : "");
    const empty = !Object.keys(m).some((k) => k !== "upd" && m[k]);
    return `<div class="idin"><div class="idbar"><b>${esc(tx("EMERGENCY ID"))}</b><span class="noprint"><button class="btn small ghost" data-a="idprint">${esc(tx("Print"))}</button> <button class="btn small ghost" data-a="idclose">${esc(tx("Close"))}</button></span></div>
      ${empty ? `<p class="lede">${esc(tx("Nothing filled in yet. Go to Family, then Emergency ID card."))}</p>` : `
      <h2 class="idname">${esc(m.name || "")}</h2>
      ${m.blood ? `<div class="idblood"><small>${esc(tx("Blood type"))}</small><b>${esc(m.blood)}</b></div>` : ""}
      ${row("Allergies", m.allergies, "idwarn")}${row("Medical conditions", m.conditions)}${row("Medicines taken", m.meds)}
      ${(m.c1p || m.c2p) ? `<h3>${esc(tx("Call"))}</h3>${contact(m.c1n, m.c1p)}${contact(m.c2n, m.c2p)}` : ""}
      ${row("Home address or barangay", m.addr)}${row("Other notes", m.notes)}
      <p class="hint">${m.upd ? esc(tx("Updated")) + " " + esc(m.upd) + " · " : ""}Andam</p>`}
    </div>`;
  }
  function openIdCard() {
    const d = document.getElementById("iddlg");
    d.innerHTML = idCardHtml();
    if (ceb()) translateDom(d, true);
    if (typeof d.showModal === "function") { if (!d.open) d.showModal(); } else d.setAttribute("open", "");
  }

  /* ---------- family drill reminder ---------- */
  const DRILL_IDEAS = [
    { en: "Night earthquake: practise drop, cover and hold on, then walk to your meeting place in the dark with your go-bag.", ceb: "Linog sa gabii: sulayi ang yuko, tago ug kapyot, dayon lakaw padulong sa tagboanan sa kangitngit dala ang go-bag." },
    { en: "Typhoon warning: give everyone 10 minutes to charge phones, fill water, and pack the go-bag. Time it.", ceb: "Pasidaan sa bagyo: hatagi ang tanan og 10 ka minuto sa pag-charge sa telepono, pagpuno og tubig, ug pag-empake sa go-bag. Oraha." },
    { en: "Flood: walk the real route to the high ground or evacuation center. Note anything that would be blocked.", ceb: "Baha: lakaw sa tinuod nga dalan paingon sa taas nga dapit o evacuation center. Sulati ang mga butang nga mababagan." },
    { en: "Power out for 24 hours: cook, wash, and light the house without grid power. See what runs out first.", ceb: "Walay kuryente 24 ka oras: pagluto, paglaba, ug suga sa balay nga walay kuryente. Tan-awa kung unsa ang unang mahurot." },
    { en: "Fire at night: find two ways out of every room and agree on one place to meet outside.", ceb: "Sunog sa gabii: pangitaa ang duha ka dalan paggawas sa matag lawak ug magkasabot sa usa ka tagboanan sa gawas." },
    { en: "Phones down: try to reach each other with no signal. Use your meeting places and the out-of-town contact.", ceb: "Walay signal: sulayi nga magkita nga walay telepono. Gamita ang inyong tagboanan ug ang kontak sa layo." }
  ];
  function drillInfo() {
    const last = S.drill.last, t0 = Date.parse(last + "T00:00:00");
    if (!last || isNaN(t0)) return { never: true, due: true, days: null };
    const days = Math.round((todayStart() - t0) / 864e5);
    return { never: false, due: days >= 180, days };
  }
  const drillIdea = () => DRILL_IDEAS[(new Date().getMonth() + (drillInfo().never ? 0 : 1)) % DRILL_IDEAS.length];
  function drillCard() {
    const i = drillInfo();
    if (!i.due || (S.ui.drillSnooze && S.ui.drillSnooze >= isoToday())) return "";
    return `<div class="tipcard drillcard" role="note">
      <div class="tiphead"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l2.5 2M9.5 2.5h5"/></svg><b>${esc(tx("Time for a family drill"))}</b></div>
      <p>${esc(i.never ? tx("You have not done a drill yet. One hour now shows what would fail on a bad day.") : "Your last drill was about " + fmtDur(i.days) + " ago.")}</p>
      <p><b>${esc(tx("Try this one"))}:</b> ${esc(lt(drillIdea()))}</p>
      <div class="actions"><button class="btn small" data-a="tab" data-tab="drill">${esc(tx("Open the drill"))}</button><button class="btn small ghost" data-a="drillsnooze">${esc(tx("Remind me in a week"))}</button></div>
    </div>`;
  }

  /* ---------- read a guide aloud (English only) ---------- */
  const canSpeak = () => "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined" && !ceb();
  const speakBtn = () => (canSpeak() ? `<button class="btn small ghost speakbtn" type="button" data-a="speak" aria-pressed="false">${esc(tx("Listen"))}</button>` : "");
  let speaking = null;
  function stopSpeak() {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    if (speaking) { speaking.setAttribute("aria-pressed", "false"); speaking.textContent = tx("Listen"); speaking = null; }
  }
  function speakFrom(btn) {
    if (!canSpeak()) return;
    if (speaking === btn) { stopSpeak(); return; }
    stopSpeak();
    const body = btn.closest(".body"); if (!body) return;
    const c = body.cloneNode(true);
    c.querySelectorAll(".speakbtn, button, input, select, textarea, svg, figure, pre, .phrow, .pplbar, .noprint, .calc, .src").forEach((n) => n.remove());
    c.querySelectorAll("li, p, h4, dt, dd, summary, .stx b, .facts span").forEach((n) => n.appendChild(document.createTextNode(". ")));
    const txt = c.textContent.replace(/\s+/g, " ").replace(/\.\s*\./g, ".").replace(/([.!?:;])\s*\./g, "$1").trim();
    const parts = txt.split(/(?<=[.!?:;])\s+/), chunks = []; let cur = "";
    parts.forEach((p) => { if ((cur + " " + p).length > 200 && cur) { chunks.push(cur); cur = p; } else cur = cur ? cur + " " + p : p; });
    if (cur) chunks.push(cur);
    if (!chunks.length) return;
    speaking = btn; btn.setAttribute("aria-pressed", "true"); btn.textContent = tx("Stop");
    chunks.forEach((ch, i) => {
      const u = new SpeechSynthesisUtterance(ch); u.lang = "en-US"; u.rate = 0.92;
      if (i === chunks.length - 1) u.onend = () => { if (speaking === btn) stopSpeak(); };
      u.onerror = () => { if (speaking === btn) stopSpeak(); };
      speechSynthesis.speak(u);
    });
  }


  /* ---------- news headlines (cached so the last news is still there offline) ---------- */
  const NEWS_Q = {
    dis: '(typhoon OR "tropical storm" OR earthquake OR flood OR landslide OR drought OR "El Nino" OR volcano OR tsunami OR PAGASA OR Phivolcs OR NDRRMC OR "state of calamity") sourcecountry:philippines sourcelang:english',
    war: '("nuclear war" OR "nuclear weapon" OR "nuclear weapons" OR "nuclear attack" OR "nuclear strike" OR "nuclear test" OR missile OR airstrike OR invasion OR "West Philippine Sea" OR "South China Sea" OR "Taiwan Strait" OR "armed conflict") sourcelang:english'
  };
  const NEWS_MAX_AGE = 30 * 60 * 1000;
  const newsState = { busy: false, failed: false, last: 0, asked: false };
  const decodeHtml = (t) => { const e = document.createElement("textarea"); e.innerHTML = t; return e.value; };
  const normTitle = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  function parseSeen(sd) {
    const m = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/.exec(sd || "");
    return m ? Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]) : 0;
  }
  function cleanNews(list) {
    const seen = new Set(), out = [];
    (list || []).forEach((a) => {
      if (!a || !a.title || !/^https?:\/\//i.test(a.url || "")) return;
      if (a.language && !/english/i.test(a.language)) return;
      const title = decodeHtml(String(a.title)).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
      const key = normTitle(title);
      if (title.length < 15 || seen.has(key)) return;
      seen.add(key);
      out.push({ ti: title, u: a.url, d: String(a.domain || "").replace(/^www\./, ""), t: parseSeen(a.seendate) });
    });
    return out.sort((x, y) => y.t - x.t).slice(0, 15);
  }
  const newsKey = () => (S.ui.newsTab === "war" ? "war" : "dis");
  async function fetchNews(key) {
    if (S.settings.news === "off" || newsState.busy) return;
    if (navigator.onLine === false) { newsState.failed = true; refreshNewsViews(); return; }
    const wait = 5600 - (Date.now() - newsState.last);
    newsState.busy = true; newsState.failed = false; refreshNewsViews();
    try {
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));
      const url = "https://api.gdeltproject.org/api/v2/doc/doc?mode=artlist&format=json&maxrecords=60&sort=datedesc&timespan=3d&query=" + encodeURIComponent(NEWS_Q[key]);
      const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 15000);
      newsState.last = Date.now();
      const r = await fetch(url, { signal: ctl.signal });
      clearTimeout(to);
      if (!r.ok) throw new Error("http " + r.status);
      const j = JSON.parse(await r.text());
      const items = cleanNews(j.articles);
      if (items.length) { S.news[key] = { t: Date.now(), items }; save(); } else if (!S.news[key]) throw new Error("empty");
    } catch (e) { newsState.failed = true; }
    newsState.busy = false;
    refreshNewsViews();
  }
  async function maybeRefreshNews() {
    if (newsState.asked || S.settings.news === "off") return;
    newsState.asked = true;
    for (const k of ["dis", "war"]) {
      const c = S.news[k];
      if (!c || Date.now() - c.t > NEWS_MAX_AGE) { await fetchNews(k); if (navigator.onLine === false) break; }
    }
  }
  function ago(t) {
    const m = Math.max(0, Math.round((Date.now() - t) / 60000));
    if (m < 2) return tx("just now");
    if (m < 90) return m + " " + tx("min ago");
    if (m < 60 * 36) return Math.round(m / 60) + " " + tx("h ago");
    return Math.round(m / 1440) + " " + tx("d ago");
  }
  function newsStatus(key) {
    const c = S.news[key];
    if (newsState.busy) return `<span class="newsst">${esc(tx("Loading the latest news"))}</span>`;
    if (!c) return `<span class="newsst bad">${esc(tx(newsState.failed ? "No news yet. Connect to the internet once to load headlines." : "No news saved yet."))}</span>`;
    const when = new Date(c.t).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
    const old = Date.now() - c.t > 24 * 3600 * 1000;
    if (newsState.failed || navigator.onLine === false) return `<span class="newsst bad">${esc(tx(navigator.onLine === false ? "No internet. Showing the last saved news from" : "Could not update the news. Showing the last saved news from"))} ${esc(when)}${old ? ` · ${esc(tx("These headlines are old."))}` : ""}</span>`;
    return `<span class="newsst">${esc(tx("Updated"))} ${esc(ago(c.t))}</span>`;
  }
  function newsList(key, n) {
    const c = S.news[key];
    if (!c || !c.items.length) return "";
    return `<div class="newslist">${c.items.slice(0, n).map((a) => `<a class="newsrow" href="${esc(a.u)}" target="_blank" rel="noopener noreferrer"><b dir="auto">${esc(a.ti)}</b><small>${esc(a.d)}${a.t ? " · " + esc(ago(a.t)) : ""}</small></a>`).join("")}</div>`;
  }
  const NEWS_NOTE = "Headlines come from news websites, not from Andam, and can be wrong. For official warnings, check PAGASA, PHIVOLCS and your barangay.";
  const WAR_NOTE = "War and nuclear news comes from around the world and can be alarming. Stay calm. Check official sources: your barangay, NDRRMC and the government.";
  const newsChips = (act) => { const k = newsKey(); return `<div class="chips" role="group">${[["dis", "Weather and calamities"], ["war", "War and nuclear"]].map(([v, l]) => `<button class="chip" data-a="${act}" data-v="${v}" aria-pressed="${k === v}">${esc(tx(l))}</button>`).join("")}</div>`; };
  function newsCard() {
    if (S.settings.news === "off") return "";
    const key = newsKey();
    return `<div class="block newscard"><h3>${esc(tx("News right now"))}</h3>${newsChips("newshometab")}${newsStatus(key)}${newsList(key, 4)}
      <div class="actions"><button class="btn small" data-a="newsopen">${esc(tx("All headlines"))}</button><button class="btn small ghost" data-a="newsrefresh" ${newsState.busy ? "disabled" : ""}>${esc(tx("Refresh"))}</button></div>
      <p class="hint">${esc(tx(key === "war" ? WAR_NOTE : NEWS_NOTE))}</p></div>`;
  }
  function newsDlgHtml() {
    const key = newsKey();
    return `<div class="idin"><div class="idbar"><b>${esc(tx("NEWS"))}</b><button class="btn small ghost" data-a="newsclose">${esc(tx("Close"))}</button></div>
      ${newsChips("newstab")}
      ${newsStatus(key)}${newsList(key, 15)}
      <div class="actions"><button class="btn small" data-a="newsrefresh" ${newsState.busy ? "disabled" : ""}>${esc(tx("Refresh"))}</button></div>
      <p class="hint">${esc(tx(key === "war" ? WAR_NOTE : NEWS_NOTE))}</p></div>`;
  }
  function refreshNewsViews() {
    const d = document.getElementById("newsdlg");
    if (d && d.open) { d.innerHTML = newsDlgHtml(); if (ceb()) translateDom(d, true); }
    if (S.ui.tab === "home") render();
  }
  function openNews() {
    const d = document.getElementById("newsdlg");
    d.innerHTML = newsDlgHtml(); if (ceb()) translateDom(d, true);
    if (typeof d.showModal === "function") { if (!d.open) d.showModal(); } else d.setAttribute("open", "");
    if (!S.news[newsKey()] || Date.now() - S.news[newsKey()].t > NEWS_MAX_AGE) fetchNews(newsKey());
  }

  /* ---------- Home: the simple screen ---------- */
  const IC = {
    warn: '<path d="M12 3.5 2.5 20h19z"/><path d="M12 10v5M12 17.5v.5"/>',
    map: '<path d="M9 4 3 6.5v14L9 18l6 2.5 6-2.5v-14L15 6.5z"/><path d="M9 4v14M15 6.5v14"/>',
    fam: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17 14.2c2.6.3 4.5 2.5 4.5 5.3"/>',
    box: '<path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M3.5 6l1.2 1.2L7 5M3.5 12l1.2 1.2L7 11M3.5 18l1.2 1.2L7 17"/>',
    timer: '<circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l2.5 2M9.5 2.5h5"/>',
    steps: '<path d="M3 20h5v-5h5v-5h5V6"/>',
    radio: '<circle cx="12" cy="12" r="1.8"/><path d="M8.2 8.2a5.4 5.4 0 0 0 0 7.6M15.8 8.2a5.4 5.4 0 0 1 0 7.6M5.4 5.4a9.4 9.4 0 0 0 0 13.2M18.6 5.4a9.4 9.4 0 0 1 0 13.2"/>',
    id: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c.5-1.7 1.7-2.5 3-2.5s2.5.8 3 2.5M14 10h4M14 13h3"/>',
    print: '<path d="M7 9V3h10v6M7 17H4v-7h16v7h-3"/><rect x="7" y="14" width="10" height="7"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16"/><path d="M9 8h7"/>'
  };
  const ic = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]}</svg>`;
  const gTitle = (id) => { const g = GUIDES.find((x) => x.id === id), o = ceb() && CEB.quick[id]; return o ? o.title : g ? g.title : id; };
  const SITUATIONS = [
    { en: "Earthquake", ceb: "Linog", g: "gd7" },
    { en: "A typhoon is coming", ceb: "Moabot ang bagyo", g: "gd6" },
    { en: "Flood", ceb: "Baha", g: "gd8" },
    { en: "Fire, landslide, tsunami or volcanic ash", ceb: "Sunog, pagguba sa bakilid, tsunami o abo sa bulkan", hw: "hazards" },
    { en: "Someone is hurt", ceb: "Naay nasamdan", act: "helpnow" },
    { en: "Someone is sick or has a fever", ceb: "Naay masakiton o hilanat", g: "gd25" },
    { en: "No electricity", ceb: "Walay kuryente", g: "gd15" },
    { en: "After the disaster", ceb: "Human sa katalagman", g: "gd30" },
    { en: "No clean water", ceb: "Walay limpyong tubig", g: "gd1" },
    { en: "We have to leave home", ceb: "Kinahanglan mi mobiya sa balay", g: "gd16" },
    { en: "Someone is trapped", ceb: "Naay nalikopan", g: "gd39" },
    { en: "A pregnant woman is in labor or in danger", ceb: "Ang buntis manganak o naa sa peligro", g: "gd37" },
    { en: "The sea pulled back, or a tsunami or storm surge is coming", ceb: "Mi-atras ang dagat, o moabot ang tsunami o daluyong sa bagyo", g: "gd36" },
    { en: "The ground is cracking or the slope is moving", ceb: "Naliki ang yuta o naglihok ang bakilid", g: "gd35" },
    { en: "Going to an evacuation center", ceb: "Moadto sa evacuation center", g: "gd38" },
    { en: "Earthquake in a tall building, car, school or on the coast", ceb: "Linog sa taas nga building, awto, eskwelahan o baybayon", g: "gd34" },
    { en: "Feeling scared or very stressed", ceb: "Nahadlok o grabe ang kapit-os", g: "gd33" },
    { en: "Very hot or dry weather, and water is running short", ceb: "Init kaayo o uga ang panahon, ug nagkunhod ang tubig", g: "gd40" },
    { en: "Nuclear explosion or a radiation warning", ceb: "Nukleyar nga pagbuto o pasidaan sa radiation", g: "gd41" },
    { en: "After fallout: radioactive dust on us", ceb: "Human sa fallout: naay radioactive nga abog sa amoa", g: "gd42" },
    { en: "War, shelling or an air raid", ceb: "Gubat, pamomba o air raid", g: "gd45" },
    { en: "Found a bomb, shell or strange metal object", ceb: "Nakakita og bomba, bala o katingad-ang puthaw", g: "gd46" },
    { en: "Getting ready for nuclear fallout or war", ceb: "Pag-andam para sa nukleyar nga fallout o gubat", hw: "war7" }
  ];
  const NOTICES = [
    { id: "elnino2026", until: "2027-06-30", title: "El Niño is active now",
      body: "PAGASA says a very strong El Niño is active and may last into mid-2027. Expect less rain and hotter days. Parts of Leyte have been listed for dry conditions.",
      src: "From PAGASA, checked 13 Nov 2026. PAGASA updates its advisory every month.", g: "gd40", btn: "What to do about El Niño" }
  ];
  function noticeCards() {
    return NOTICES.filter((n) => isoToday() <= n.until && !(S.ui.noticeHide || {})[n.id]).map((n) => `<div class="block notice" role="note"><h3>${esc(tx(n.title))}</h3><p>${esc(tx(n.body))}</p><p class="hint">${esc(tx(n.src))}</p><div class="actions"><button class="btn" data-a="guideopen" data-id="${n.g}">${esc(tx(n.btn))}</button><button class="btn ghost small" data-a="noticehide" data-id="${n.id}">${esc(tx("Hide"))}</button></div></div>`).join("");
  }
  function warnStatus() {
    let top = -1, any = false;
    S.watch.forEach((p) => { const r = S.alerts[p.id]; if (!r) return; any = true; top = Math.max(top, placeItems(p).reduce((m, it) => Math.max(m, it.lvl), 0)); });
    if (!any) return { t: tx("Tap to check"), c: "" };
    return top >= 3 ? { t: tx("Warning"), c: "bad" } : top === 2 ? { t: tx("Watch"), c: "soon" } : { t: tx("All clear"), c: "ok" };
  }
  function stuffStatus() {
    if (!S.stock.length) return { t: tx("Nothing added yet"), c: "" };
    const n = stockStats().bad;
    return n ? { t: n + " " + tx(n === 1 ? "item needs attention" : "items need attention"), c: "bad" } : { t: tx("All OK"), c: "ok" };
  }
  function firstSteps() {
    const f = S.family;
    const steps = [
      { done: famPhones().length > 0, t: "Add your family's phone numbers", tab: "family" },
      { done: !!f.meet1, t: "Choose a place where the family meets", tab: "family" },
      { done: S.stock.some((x) => (x.cat || "") === "water"), t: "Write down the water you store", tab: "storage" }
    ];
    if (steps.every((x) => x.done)) return "";
    return `<div class="block firststeps"><h3>${esc(tx("Get ready in 3 small steps"))}</h3>${steps.map((x) => `<div class="fsrow ${x.done ? "done" : ""}"><span class="fsmark" aria-hidden="true">${x.done ? "✓" : "○"}</span><span>${esc(tx(x.t))}</span>${x.done ? "" : `<button class="btn small" data-a="tab" data-tab="${x.tab}">${esc(tx("Do it"))}</button>`}</div>`).join("")}</div>`;
  }
  function viewHome() {
    const w = warnStatus(), st = stuffStatus(), dr = drillInfo();
    const next = allItems().find((i) => i.p === 1 && !S.checked[i.id]) || allItems().find((i) => !S.checked[i.id]);
    const tile = (icon, title, status, attrs) => `<button class="tile" ${attrs}><span class="tic">${ic(icon)}</span><b>${esc(title)}</b>${status ? `<span class="tag ${status.c}">${esc(status.t)}</span>` : ""}</button>`;
    return `<section class="view home">
      <div class="hello"><h2>${esc(tx("Hello! What do you need?"))}</h2>
        <div class="chips langrow" role="group" aria-label="Language"><button class="chip" data-a="setlang" data-v="en" aria-pressed="${!ceb()}">English</button><button class="chip" data-a="setlang" data-v="ceb" aria-pressed="${ceb()}">Bisaya</button></div></div>
      <div class="bigrow">
        <button class="bigbtn danger" data-a="helpnow"><span>${esc(tx("I need help now"))}</span><small>${esc(tx("Call, text, first aid"))}</small></button>
        <button class="bigbtn ok" data-a="famtext" data-id="safe"><span>${esc(tx("I'm safe"))}</span><small>${esc(tx("Tell my family"))}</small></button>
      </div>
      ${newsCard()}
      ${SYNC ? SYNC.cardHtml() : ""}
      ${noticeCards()}
      ${firstSteps()}
      <h3>${esc(tx("What's happening?"))}</h3>
      ${(() => { const b = (x) => `<button class="situbtn" ${x.g ? `data-a="guideopen" data-id="${x.g}"` : x.hw ? `data-a="hwgo" data-id="${x.hw}"` : `data-a="${x.act}"`}><span>${esc(lt(x))}</span><span aria-hidden="true">›</span></button>`; return `<div class="situ">${SITUATIONS.slice(0, 8).map(b).join("")}</div><details class="situmore" data-cat="situmore" ${S.ui.open.situmore ? "open" : ""}><summary>${esc(tx("More situations"))}</summary><div class="situ">${SITUATIONS.slice(8).map(b).join("")}</div></details>`; })()}
      <h3>${esc(tx("Check your things"))}</h3>
      <div class="tiles">
        ${tile("warn", tx("Warnings near you"), w, 'data-a="tab" data-tab="plan"')}
        ${tile("map", tx("Map"), null, 'data-a="map"')}
        ${tile("fam", tx("My family"), { t: famPhones().length + " " + tx(famPhones().length === 1 ? "number saved" : "numbers saved"), c: famPhones().length ? "ok" : "" }, 'data-a="tab" data-tab="family"')}
        ${tile("box", tx("My things"), st, 'data-a="tab" data-tab="storage"')}
        ${tile("timer", tx("Family drill"), dr.due ? { t: tx("Time to practice"), c: "soon" } : { t: tx("Done recently"), c: "ok" }, 'data-a="tab" data-tab="drill"')}
        ${tile("list", tx("What to get next"), next ? { t: next.t, c: "" } : null, 'data-a="tab" data-tab="plan"')}
      </div>
      ${tipCard()}
      <div class="actions"><button class="btn ghost" data-a="tab" data-tab="more">${esc(tx("Everything in Andam"))}</button></div>
    </section>`;
  }
  function viewMore() {
    const row = (icon, title, sub, attrs) => `<button class="morebtn" ${attrs}><span class="tic">${ic(icon)}</span><span><b>${esc(tx(title))}</b><small>${esc(tx(sub))}</small></span></button>`;
    return `<section class="view"><h2>${esc(tx("Everything in Andam"))}</h2>
      <div class="morelist">
        ${row("list", "Plan", "The checklist of things to get", 'data-a="tab" data-tab="plan"')}
        ${row("steps", "Levels", "Get ready step by step", 'data-a="tab" data-tab="levels"')}
        ${row("box", "Storage", "What you have stored and when it expires", 'data-a="tab" data-tab="storage"')}
        ${row("radio", "Comms", "Radios, signals and how we reach each other", 'data-a="tab" data-tab="comms"')}
        ${row("timer", "Drill", "Practice with your family, with an alarm and timer", 'data-a="tab" data-tab="drill"')}
        ${row("warn", "News", "Weather, calamity and war headlines (saved for offline)", 'data-a="newsopen"')}
        ${row("map", "Map", "Evacuation centers, hazards and help nearby", 'data-a="map"')}
        ${row("id", "Emergency ID card", "Your medical details in big letters", 'data-a="idcard"')}
        ${row("print", "Print the family sheet", "One page for the fridge", 'data-a="printsheet"')}
        ${row("id", "Print wallet cards", "A small card for every person", 'data-a="printcards"')}
        ${row("gear", "Settings", "Language, text size, backup", 'data-a="settings"')}
      </div></section>`;
  }

  /* ---------- "I need help now" ---------- */
  const FIRSTAID = ["gd2", "gd3", "gd17", "gd4", "gd18", "gd20", "gd19", "gd23", "gd22", "gd26", "gd28", "gd29", "gd24", "gd10"];
  function helpHtml() {
    const f = S.family, phones = [...f.members.filter((m) => m.phone).map((m) => [m.name || m.phone, m.phone]), ...(f.outPhone ? [[f.outName || f.outPhone, f.outPhone]] : []), ...f.nums.filter((n) => n.phone && !["911", "143"].includes(String(n.phone).replace(/\D/g, ""))).map((n) => [n.label || n.phone, n.phone])];
    return `<div class="idin"><div class="idbar"><b>${esc(tx("EMERGENCY HELP"))}</b><button class="btn small ghost" data-a="helpclose">${esc(tx("Close"))}</button></div>
      <a class="bigcall" href="tel:911"><small>${esc(tx("Emergency hotline"))}</small><b>911</b></a>
      <a class="idcall" href="tel:143"><small>${esc(tx("Philippine Red Cross"))}</small><b>143</b></a>
      <div class="actions"><button class="btn danger" data-a="famtext" data-id="help">${esc(tx("Text my family: I need help"))}</button><button class="btn ghost" data-a="idcard">${esc(tx("Show my Emergency ID card"))}</button></div>
      ${phones.length ? `<h3>${esc(tx("Call someone"))}</h3>${phones.slice(0, 8).map(([n, p]) => `<a class="idcall small" href="${esc(telHref(p))}"><small>${esc(n)}</small><b>${esc(p)}</b></a>`).join("")}` : ""}
      <h3>${esc(tx("First aid and danger, step by step"))}</h3>
      <div class="situ">${FIRSTAID.map((id) => `<button class="situbtn" data-a="guideopen" data-id="${id}"><span>${esc(gTitle(id))}</span><span aria-hidden="true">›</span></button>`).join("")}</div>
      <p class="hint">${esc(tx("First aid helps until a doctor can see the person. If you can, call for help first."))}</p></div>`;
  }
  function openHelp() {
    const d = document.getElementById("helpdlg");
    d.innerHTML = helpHtml();
    if (ceb()) translateDom(d, true);
    if (typeof d.showModal === "function") { if (!d.open) d.showModal(); } else d.setAttribute("open", "");
  }
  function closeHelp() { const d = document.getElementById("helpdlg"); if (d && d.open) d.close(); }

  /* ---------- drill alarm and timer ---------- */
  let drillRun = null, sirenNodes = null, sirenT = null, actx = null;
  function siren(on) {
    try {
      if (!on) { clearInterval(sirenT); if (sirenNodes) { sirenNodes.o.stop(); sirenNodes = null; } return; }
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
      const o = actx.createOscillator(), g = actx.createGain(); o.type = "sawtooth"; g.gain.value = 0.22; o.connect(g); g.connect(actx.destination); o.start();
      let hi = false; const sw = () => { o.frequency.setValueAtTime(hi ? 920 : 620, actx.currentTime); hi = !hi; }; sw(); sirenT = setInterval(sw, 650);
      sirenNodes = { o };
    } catch (e) { /* no sound on this phone: the timer still works */ }
  }
  const clock = (ms) => { const s = Math.floor(ms / 1000); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
  function drillHtml(stage) {
    const steps = ["Drop, cover your head, hold on (until the shaking stops).", "Take your go-bag and your family's papers.", "Walk to your meeting place together. Do not run.", "Count everyone. Call out each name."];
    if (stage === "done") return `<div class="idin"><div class="idbar"><b>${esc(tx("DRILL DONE"))}</b></div><p class="drillbig">${esc(clock(drillRun.ms))}</p><p>${esc(tx(drillRun.ms <= 600000 ? "Good. You were at the meeting place within 10 minutes." : "It took longer than 10 minutes. That is useful to know: find what slowed you down."))}</p><div class="actions"><button class="btn" data-a="drillsave">${esc(tx("Save this drill"))}</button><button class="btn ghost" data-a="drillcancel">${esc(tx("Close"))}</button></div></div>`;
    return `<div class="idin"><div class="idbar"><b>${esc(tx("DRILL"))}</b></div><p class="drillbig" id="drillclock">00:00</p><p class="hint">${esc(tx("Goal: everyone at the meeting place in 10 minutes."))}</p><ol class="drillsteps">${steps.map((x) => `<li>${esc(tx(x))}</li>`).join("")}</ol><div class="actions"><button class="btn" data-a="drillarrive">${esc(tx("We are all at the meeting place"))}</button><button class="btn ghost" data-a="drillcancel">${esc(tx("Cancel"))}</button></div></div>`;
  }
  function drillStart(sound) {
    const d = document.getElementById("drilldlg");
    drillRun = { t0: Date.now(), ms: 0 };
    d.innerHTML = drillHtml("run"); if (ceb()) translateDom(d, true);
    if (typeof d.showModal === "function") { if (!d.open) d.showModal(); } else d.setAttribute("open", "");
    if (sound) { siren(true); setTimeout(() => siren(false), 8000); if (navigator.vibrate) navigator.vibrate([400, 200, 400, 200, 400]); }
    try { if (navigator.wakeLock) navigator.wakeLock.request("screen").then((l) => { drillRun.lock = l; }).catch(() => {}); } catch (e) { /* ok */ }
    drillRun.timer = setInterval(() => { const c = document.getElementById("drillclock"); if (c) c.textContent = clock(Date.now() - drillRun.t0); }, 500);
  }
  function drillEnd() {
    if (!drillRun) return;
    clearInterval(drillRun.timer); siren(false); try { if (drillRun.lock) drillRun.lock.release(); } catch (e) { /* ok */ }
    const d = document.getElementById("drilldlg"); if (d && d.open) d.close();
  }
  function drillIcs() {
    const i = drillInfo(), d = new Date(); d.setHours(0, 0, 0, 0);
    if (i.never || i.due) d.setDate(d.getDate() + 7); else { d.setTime(Date.parse(S.drill.last + "T00:00:00")); d.setDate(d.getDate() + 180); }
    const p2 = (n) => String(n).padStart(2, "0"), f = (x) => x.getFullYear() + p2(x.getMonth() + 1) + p2(x.getDate()), nx = new Date(d.getTime() + 864e5);
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Andam//Family drill//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT", "UID:family-drill@andam", "DTSTAMP:" + stamp,
      "DTSTART;VALUE=DATE:" + f(d), "DTEND;VALUE=DATE:" + f(nx), "RRULE:FREQ=MONTHLY;INTERVAL=6", "SUMMARY:Andam: family emergency drill", "DESCRIPTION:Practice with your family: earthquake or typhoon drill. Open Andam > Drill.",
      "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Family drill in one week", "TRIGGER:-P6DT15H", "END:VALARM", "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Family drill today", "TRIGGER:PT9H", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\r\n") + "\r\n";
  }
  async function shareIcs(text, name) {
    const file = new File([text], name, { type: "text/calendar" });
    try { if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: "Andam" }); return; } } catch (e) { if (e && e.name === "AbortError") return; }
    const a = document.createElement("a"); a.href = URL.createObjectURL(file); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast(tx("Saved the calendar file. Open it to add the reminder to your calendar."));
  }

  /* ---------- quick text to the family ---------- */
  const FAM_MSGS = [
    { id: "safe", en: "I am safe. We are OK.", ceb: "Luwas ko. Okay ra mi." },
    { id: "help", en: "I need help.", ceb: "Nanginahanglan ko og tabang." },
    { id: "move", en: "We are moving to our meeting place.", ceb: "Moadto mi sa among tagboanan." },
    { id: "home", en: "I am on my way home.", ceb: "Pauli na ko sa balay." }
  ];
  const famPhones = () => { const f = S.family, seen = {}, out = []; [...f.members.map((m) => m.phone), f.outPhone].forEach((p) => { const d = String(p || "").replace(/[^\d+]/g, ""); if (d.length >= 5 && !seen[d]) { seen[d] = 1; out.push(d); } }); return out; };
  function openSms(phones, body) {
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const a = document.createElement("a"); a.href = "sms:" + phones.join(",") + (ios ? "&" : "?") + "body=" + encodeURIComponent(body);
    document.body.appendChild(a); a.click(); a.remove();
  }
  function sendFamilyText(id) {
    const m = FAM_MSGS.find((x) => x.id === id), phones = famPhones();
    if (!m) return;
    if (!phones.length) { toast(tx("Add your family's phone numbers in the Family tab first.")); return; }
    const go = (extra) => openSms(phones, lt(m) + (extra || ""));
    if (S.ui.smsLoc && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => go(" " + tx("My location") + ": https://maps.google.com/?q=" + p.coords.latitude.toFixed(5) + "," + p.coords.longitude.toFixed(5)), () => go(""), { timeout: 8000, maximumAge: 300000 });
    } else go("");
  }
  function famTextCard() {
    const phones = famPhones(), names = S.family.members.filter((m) => m.phone).map((m) => m.name || m.phone);
    return `<div class="block"><h4>${esc(tx("Quick text to the family"))}</h4>
      <p class="hint">${esc(tx("Opens your messages with the numbers from the Family tab. Texts often go through when calls and data do not."))}</p>
      <div class="actions">${FAM_MSGS.map((m) => `<button class="btn small ${m.id === "help" ? "danger" : ""}" data-a="famtext" data-id="${m.id}">${esc(lt(m))}</button>`).join("")}</div>
      <div class="chips" style="margin-top:.6rem"><button class="chip" data-a="smsloc" aria-pressed="${!!S.ui.smsLoc}">${esc(tx("Add my location"))}</button></div>
      <p class="hint">${phones.length ? esc(tx("Sends to")) + ": " + esc(names.join(", ")) + (S.family.outPhone ? ", " + esc(S.family.outName || S.family.outPhone) : "") : esc(tx("No numbers yet. Add them in the Family tab."))}</p></div>`;
  }

  function viewComms() {
    const c = S.comms;
    const layers = LAYERS.map((l) => `<div class="layer">
      <h4>${esc(l.name)}</h4>
      <p>${esc(l.text)}</p>
      <p class="hint">Range: ${esc(l.range)}</p>
      <label style="display:flex;gap:.6rem;align-items:center"><input class="chk" type="checkbox" data-bind="comms.have.${l.id}" ${c.have[l.id] ? "checked" : ""}> We have this working</label>
      <label class="field"><span>Notes</span><input type="text" data-bind="comms.notes.${l.id}" value="${esc(c.notes[l.id] ?? "")}" placeholder="Who has it, channel, settings"></label>
    </div>`).join("");
    return `<section class="view">
      <h2>Communication plan</h2>
      <p class="lede">Phones will fail first. Work down this list from short range to long range, and test each layer before you need it.</p>
      ${famTextCard()}
      <div class="block"><h4>Check-in</h4>
        <label class="field"><span>Daily check-in time</span><input type="text" data-bind="comms.checkin" value="${esc(c.checkin)}" placeholder="For example, 6:00 PM every day"></label>
        <label class="field"><span>Radio channel or frequency</span><input type="text" data-bind="comms.channel" value="${esc(c.channel)}"></label>
        <label class="field"><span>Code words (safe, need help, moving to the meeting place)</span><textarea data-bind="comms.codes">${esc(c.codes)}</textarea></label>
      </div>
      <div class="block">${layers}</div>
      <p class="hint">Radios and satellite devices are regulated by the NTC. Buy from authorized dealers and check the rules first. The gear is listed under “Phones and communication” in the plan.</p>
    </section>`;
  }


  /* ---------- step-by-step guides ---------- */
  const FILL = {
    nomad1: [["wifi", "Wi-Fi name of the NOMAD router", "text"], ["addr", "Address to type (for example http://192.168.1.50:8080)", "text"],
      ["helper", "Your helper's name", "text"], ["hphone", "Your helper's phone", "tel"]]
  };
  const cv = (k, d) => { const v = S.howto.calc[k]; return v === undefined ? d : (parseFloat(v) || 0); };
  function calcResult() {
    let wh = 0, run = 0;
    CALC_ROWS.forEach((r) => {
      const q = cv(r.id + "_q", r.q), w = cv(r.id + "_w", r.w), h = cv(r.id + "_h", r.h);
      wh += q * w * h; if (h > 0) run += q * w;
    });
    if (wh <= 0) return "<p>Enter at least one item to see the result.</p>";
    const days = cv("days", 1) || 1;
    const panelW = wh / (4.5 * 0.85);
    const panelRound = Math.ceil(panelW / 50) * 50;
    const batt = (wh * days) / 0.8;
    const inv = Math.max(500, Math.ceil((run * 1.25) / 500) * 500);
    const volt = inv <= 1000 ? 12 : inv <= 3000 ? 24 : 48;
    const alt = panelW <= 450 ? `, or about ${Math.ceil(panelW / 100)} folding panels of 100 W` : "";
    const path = wh <= 1000 ? "A power station with panels (guide: Solar 2)."
      : wh <= 2500 ? "A big power station, or a small home battery system (guides: Solar 2 or Solar 3)."
      : wh <= 15000 ? "A home battery system (guide: Solar 3)."
      : "A large home or farm system. Ask installers for quotes.";
    return `<dl class="res">
      <div><dt>Energy you use in a day</dt><dd>${_n(wh)} Wh (${(wh / 1000).toFixed(1)} kWh)</dd></div>
      <div><dt>Solar panels needed</dt><dd>About ${_n(panelRound)} W of panels, for example ${Math.ceil(panelW / 450)} panel${Math.ceil(panelW / 450) > 1 ? "s" : ""} of 450 W${alt}</dd></div>
      <div><dt>Battery to store</dt><dd>About ${_n(batt)} Wh (${(batt / 1000).toFixed(1)} kWh) to last ${days} day${days > 1 ? "s" : ""} without sun</dd></div>
      <div><dt>Inverter size</dt><dd>${_n(inv)} W or more. Motors (fridge, pump) need extra power to start: ask the seller</dd></div>
      <div><dt>Battery voltage (common rule)</dt><dd>${volt} V</dd></div>
      <div><dt>Best fit</dt><dd><b>${path}</b></dd></div></dl>`;
  }
  function calcBlock() {
    const rows = CALC_ROWS.map((r) => {
      const f = (k, lab, def) => `<label>${lab}<input type="number" inputmode="decimal" min="0" data-calc data-bind="howto.calc.${r.id}_${k}" value="${cv(r.id + "_" + k, def)}"></label>`;
      return `<div class="crow"><div class="cname">${esc(r.name)}</div><div class="cin">${f("q", "How many", r.q)}${f("w", "Watts each", r.w)}${f("h", "Hours a day", r.h)}</div></div>`;
    }).join("");
    const d = cv("days", 1) || 1;
    return `<div class="block calc"><h4>Solar calculator</h4>
      <p class="hint">Change the numbers to match your home. Watts are on the label. The answer updates as you type.</p>${rows}
      <label class="field"><span>Days you want the battery to last with no sun</span>
        <select data-calc data-bind="howto.calc.days">${[1, 2, 3].map((n) => `<option value="${n}" ${d === n ? "selected" : ""}>${n} day${n > 1 ? "s" : ""}</option>`).join("")}</select></label>
      <div id="calcOut" class="calcout">${calcResult()}</div></div>`;
  }
  const figHtml = (k) => (FIGS[k] ? `<figure class="fig">${FIGS[k].svg}<figcaption>${esc((ceb() && CEB.figs[k]) || FIGS[k].cap)}</figcaption></figure>` : "");

  function localize(g) {
    const o = ceb() && CEB.guides[g.id];
    if (!o) return g;
    const m = (arr, ov) => (ov ? arr.map((x, i) => ({ ...x, ...(ov[i] || {}) })) : arr);
    return { ...g, title: o.title || g.title, intro: o.intro || g.intro, time: o.time || g.time, cost: o.cost || g.cost,
      buy: m(g.buy, o.buy), steps: m(g.steps, o.steps), terms: o.terms || g.terms, warn: o.warn || g.warn, sources: o.sources || g.sources, _tr: true };
  }

  /* People-aware text: {n} = people, {ppl} = "5 people", {n*12} = 12 x people, {n*28/19} = rounded up. */
  const nPeople = () => Math.max(1, Math.min(30, Number(S.levels.people) || 1));
  const fmtN = (x) => (x >= 10 ? Math.round(x).toLocaleString("en-PH") : String(Math.round(x * 10) / 10));
  function ppl(str) {
    if (typeof str !== "string" || str.indexOf("{") < 0) return str;
    const n = nPeople();
    return str.replace(/\{ppl\}/g, ceb() ? n + " ka tawo" : n + (n === 1 ? " person" : " people"))
      .replace(/\{n(?:\*([\d.]+))?(?:\/([\d.]+))?\}/g, (m, k, d) => { const v = n * (k ? +k : 1); return fmtN(d ? Math.ceil(v / +d) : v); });
  }
  const hasPpl = (g) => /\{(n|ppl)[}*\/]/.test(JSON.stringify(g));
  function renderHowto(g0) {
    const hp = hasPpl(g0);
    const g = hp ? JSON.parse(JSON.stringify(localize(g0), (k, v) => (typeof v === "string" ? ppl(v) : v))) : localize(g0);
    const H = S.howto;
    const stN = g.steps.filter((_, i) => H.done[g.id + "_" + i]).length;
    const gotN = g.buy.filter((_, i) => H.got[g.id + "_" + i]).length;
    const of = tx("of");
    const prog = (g.terms ? `${g.terms.length} ${tx("words")}` : `${stN} ${of} ${g.steps.length} ${tx("steps done")}${g.buy.length ? " · " + gotN + " " + of + " " + g.buy.length + " " + tx("bought") : ""}`) + (ceb() && !g._tr ? " · " + tx("English only") : "");
    const buy = g.buy.length ? `<h4 class="hh">${tx("What to buy")}</h4><ul class="buylist">${g.buy.map((b, i) => {
      const id = "hb_" + g.id + "_" + i, k = g.id + "_" + i;
      return `<li class="${H.got[k] ? "done" : ""}"><input class="chk" type="checkbox" id="${id}" data-bind="howto.got.${k}" data-re="1" ${H.got[k] ? "checked" : ""}>
        <label for="${id}"><b>${esc(b.t)}</b>${b.p ? `<span class="pr">${esc(b.p)}</span>` : ""}${b.n ? `<span class="nt">${esc(b.n)}</span>` : ""}</label>
        <div class="phrow"><span class="ph" data-ph="${k}"></span><label class="phbtn" for="ph_${k}">${tx("My photo")}</label><input type="file" id="ph_${k}" accept="image/*" data-ph-in="${k}" hidden></div></li>`;
    }).join("")}</ul>` : "";
    const steps = g.steps.length ? `<h4 class="hh">${tx("What to do")}</h4><ol class="steplist">${g.steps.map((st, i) => {
      const id = "hs_" + g.id + "_" + i, k = g.id + "_" + i;
      return `<li class="${H.done[k] ? "done" : ""}"><div class="srow"><input class="chk" type="checkbox" id="${id}" data-bind="howto.done.${k}" data-re="1" ${H.done[k] ? "checked" : ""}>
        <label for="${id}"><span class="num">${i + 1}</span><span class="stx"><b>${esc(st.t)}</b><span>${esc(st.d)}</span></span></label></div>
        ${st.code ? `<pre class="cmd">${esc(st.code)}</pre>` : ""}${st.fig ? figHtml(st.fig) : ""}</li>`;
    }).join("")}</ol>` : "";
    const terms = g.terms ? `<dl class="gloss">${g.terms.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join("")}</dl>` : "";
    const fill = g.fill && FILL[g.id] ? `<div class="block"><h4>${tx("Write it here")}</h4><p class="hint">Keep the Wi-Fi password on paper, not in this app.</p>${FILL[g.id].map(([k, lab, type]) =>
      `<label class="field"><span>${esc(lab)}</span><input type="${type}" data-bind="howto.fill.${g.id}_${k}" value="${esc(H.fill[g.id + "_" + k] || "")}"></label>`).join("")}</div>` : "";
    const warn = g.warn.length ? `<div class="warnbox"><b>${tx("Be careful")}</b><ul>${g.warn.map((w) => `<li>${esc(w)}</li>`).join("")}</ul></div>` : "";
    const src = g.sources.length ? `<p class="src">${tx("Sources:")} ${g.sources.map(esc).join(" ")}</p>` : "";
    const facts = `<p class="facts"><span><b>${tx("Time:")}</b> ${esc(g.time)}</span><span><b>${tx("Cost:")}</b> ${esc(g.cost)}</span></p>`;
    return `<details class="guide hw" id="hw_${g.id}" data-cat="hw_${g.id}"${S.ui.open["hw_" + g.id] ? " open" : ""}>
      <summary>${ICONS[g.icon] || ""}<span class="lt"><b>${esc(g.title)}</b><small>${prog}</small></span></summary>
      <div class="body">${speakBtn()}<p class="intro">${esc(g.intro)}</p>${hp ? `<label class="pplbar">${tx("Amounts are for")} <input type="number" inputmode="numeric" min="1" max="30" data-bind="levels.people" data-re="1" value="${nPeople()}" aria-label="${tx("How many people are you planning for?")}"> ${tx("people")}</label>` : ""}${facts}${g.calc ? calcBlock() : ""}${fill}${terms}${buy}${steps}${warn}${src}</div></details>`;
  }

  function viewGuides() {
    const byId = {}; HOWTO.forEach((g) => { byId[g.id] = g; });
    const gOpen = (key, dflt) => (S.ui.open[key] === undefined ? dflt : S.ui.open[key]);
    const section = (key, dflt, title, count, inner) => `<details class="cat gsec" data-cat="${key}" id="${key}"${gOpen(key, dflt) ? " open" : ""}>
      <summary><h3>${esc(title)}</h3><span class="count">${count}</span>${chevron}</summary><div class="gbody">${inner}</div></details>`;
    const groups = HOWTO_GROUPS.map(([name, ids], gi) => { const have = ids.filter((id) => byId[id]);
      return section("gs" + gi, gi === 0, tx(name), have.length, have.map((id) => renderHowto(byId[id])).join("")); }).join("");
    const quick = GUIDES.map((g) => { const o = ceb() && CEB.quick[g.id]; return `<details class="guide" id="qg_${g.id}"><summary>${esc(o ? o.title : g.title)}</summary><div class="body">${speakBtn()}${QFIG[g.id] ? figHtml(QFIG[g.id]) : ""}${o ? o.html : g.html}</div></details>`; }).join("");
    return `<section class="view">
      <h2>${esc(ceb() ? CEB.ui.Guides_title : "Guides")}</h2>
      <p class="lede">${esc(tx("Step by step: what to buy and what to do, with pictures. Tick things as you go. New to this? Open “Start here” first."))}</p>
      <div class="block"><h4>${esc(tx("Fridge sheets"))}</h4>
        <p class="hint">${esc(tx("One page with your family's meeting places, numbers and what to do in a typhoon, flood, earthquake and tsunami. Print it or save as PDF and put it on the fridge."))}</p>
        <div class="actions"><button class="btn small" data-a="printsheet">${esc(tx("Print the family sheet"))}</button><button class="btn small ghost" data-a="printcards">${esc(tx("Print wallet cards"))}</button></div></div>
      ${groups}
      ${section("gsq", false, tx("Quick guides (first aid, typhoon, earthquake)"), GUIDES.length, `<p class="lede">${esc(tx("Short reminders that work offline. They don't replace training: take a first aid and CPR course."))}</p>${quick}`)}
    </section>`;
  }

  function viewDrill() {
    const d = S.drill;
    const doneN = DRILL.filter((s) => d.steps[s.id]).length;
    return `<section class="view">
      <h2>24-hour drill</h2>
      <p class="lede">A drill shows what really fails. Do one every six months and fix the biggest gap first.</p>
      ${(() => { const i = drillInfo(); return `<div class="block"><p style="margin:0"><b>${esc(i.never ? tx("No drill recorded yet.") : "Last drill: " + fmtDur(i.days) + " ago")}</b></p><p class="hint" style="margin:.3rem 0 0"><b>${esc(tx("Try this one"))}:</b> ${esc(lt(drillIdea()))}</p><div class="actions"><button class="btn small" data-a="drilldone">${esc(tx("I did a drill today"))}</button></div></div>`; })()}
      <div class="block"><h4>${esc(tx("Practice run with an alarm"))}</h4>
        <p class="hint" style="margin:0">${esc(tx("Starts a timer. Everyone gets to the meeting place. Try it when everyone is home."))}</p>
        <div class="actions"><button class="btn" data-a="drillstart" data-sound="1">${esc(tx("Start with alarm"))}</button><button class="btn ghost" data-a="drillstart">${esc(tx("Start quietly"))}</button><button class="btn ghost" data-a="drillics">${esc(tx("Add the next drill to my calendar"))}</button></div>
        ${S.drill.time ? `<p class="hint">${esc(tx("Last practice run"))}: ${esc(S.drill.time)}</p>` : ""}</div>
      <div class="block">
        ${DRILL.map((s) => `<div class="item" style="border-top:0"><div class="row" style="grid-template-columns:auto 1fr">
          <input class="chk" type="checkbox" id="x_${s.id}" data-bind="drill.steps.${s.id}" ${d.steps[s.id] ? "checked" : ""}>
          <label class="t" for="x_${s.id}">${esc(s.t)}</label></div></div>`).join("")}
        <p class="hint">${doneN} of ${DRILL.length} steps done</p>
      </div>
      <div class="block"><h4>What happened</h4>
        <label class="field"><span>Date of the last drill</span><input type="date" data-bind="drill.last" value="${esc(d.last)}"></label>
        <label class="field"><span>What failed or was missing</span><textarea data-bind="drill.found" placeholder="For example, no can opener, router wouldn't power on, radio batteries dead">${esc(d.found)}</textarea></label>
        <div class="actions"><button class="btn ghost small" data-a="resetdrill">Clear the steps for the next drill</button></div>
      </div>
    </section>`;
  }


  /* ---------- levels ---------- */
  const lvReached = (l) => {
    let r = 0;
    for (const rg of l.rungs) { if (S.levels.done[l.id + "_" + rg.h]) r = rg.h; else break; }
    return r;
  };
  const lvLabel = (r) => (r ? "Reached: " + HZ[r - 1].name : "Not started");
  const lvSteps = (r, goal) => `<span class="steps" aria-hidden="true">${[1, 2, 3, 4].map((k) => `<i class="${k <= r ? "on" : ""}${k === goal ? " g" : ""}"></i>`).join("")}</span>`;

  const glinks = (id) => {
    const gs = (LAD_GUIDES[id] || []).map((gid) => HOWTO.find((g) => g.id === gid)).filter(Boolean);
    return gs.length ? `<div class="glinks"><b>Step-by-step guides</b>${gs.map((g) => `<button class="btn ghost small" data-a="hwgo" data-id="${g.id}">${esc(localize(g).title)}</button>`).join("")}</div>` : "";
  };
  function viewLevels() {
    const L = S.levels;
    const n = Math.max(1, Math.min(30, Number(L.people) || 1));
    const goal = Math.max(1, Math.min(4, Number(L.goal) || 2));
    const reached = LADDERS.map(lvReached);
    const meet = reached.filter((r) => r >= goal).length;
    const circ = 213.6;
    const dash = (meet / LADDERS.length) * circ;
    const chips = HZ.map((h) => `<button class="chip" data-a="lvgoal" data-goal="${h.id}" aria-pressed="${h.id === goal}">${h.name}<small>${h.span}</small></button>`).join("");
    const tiles = LADDERS.map((l, i) => {
      const r = reached[i];
      return `<button class="tile ${r >= goal ? "ok" : "gap"}" data-a="lvgo" data-id="${l.id}" aria-label="${esc(l.name)}. ${lvLabel(r)}. Open this area.">
        ${ICONS[l.icon]}<b>${esc(l.name)}</b>${lvSteps(r, goal)}<small>${lvLabel(r)}</small></button>`;
    }).join("");
    const next = LADDERS.map((l, i) => ({ l, r: reached[i] })).filter((x) => x.r < goal).slice(0, 4).map((x) => {
      const rg = x.l.rungs[x.r];
      return `<li><button class="linkbtn" data-a="lvgo" data-id="${x.l.id}"><b>${esc(x.l.name)}</b>: ${HZ[x.r].name}, ${esc(rg.t)}</button></li>`;
    }).join("");
    const areas = LADDERS.map((l, i) => {
      const r = reached[i];
      const rungs = l.rungs.map((rg) => {
        const key = l.id + "_" + rg.h;
        const done = !!L.done[key];
        const hz = HZ[rg.h - 1];
        return `<article class="rung${done ? " done" : ""}${rg.h > goal ? " beyond" : ""}">
          <div class="rhead"><input class="chk" type="checkbox" id="lvc_${key}" data-bind="levels.done.${key}" data-re="1" ${done ? "checked" : ""}>
            <label for="lvc_${key}"><span class="hz h${rg.h}">${hz.name}</span><span class="sz">${esc(rg.size)}</span><span class="rt">${esc(rg.t)}</span></label></div>
          <p class="cov">${esc(rg.covers)}</p>
          <ul>${rg.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
          <p class="calc">${esc(rg.calc(n))}</p>
          <div class="meta"><span class="tag price">${esc(rg.cost)}</span>${rg.est ? '<span class="tag est">Estimate</span>' : ""}</div>
          ${rg.note ? `<p class="note">${esc(rg.note)}</p>` : ""}
        </article>`;
      }).join("");
      return `<details class="lad" id="lv_${l.id}" data-cat="lv_${l.id}"${S.ui.open["lv_" + l.id] ? " open" : ""}>
        <summary>${ICONS[l.icon]}<span class="lt"><b>${esc(l.name)}</b><small>${lvLabel(r)}</small></span>${lvSteps(r, goal)}</summary>
        <div class="lbody"><p class="intro">${esc(l.intro)}</p>${glinks(l.id)}${rungs}
        <p class="src">Sources: ${l.sources.map(esc).join(" ")}</p></div></details>`;
    }).join("");
    return `<section class="view">
      <h2>Levels</h2>
      <p class="lede">Pick how long you want to last. Every area is a ladder from small to big. Tick each step when your family has it.</p>
      <div class="block">
        <label class="field"><span>How many people are you planning for?</span>
          <input type="number" inputmode="numeric" min="1" max="30" data-bind="levels.people" data-re="1" value="${n}"></label>
        <p class="mini">Your goal</p>
        <div class="chips goalchips" role="group" aria-label="Goal">${chips}</div>
      </div>
      <div class="hero">
        <svg class="ring" viewBox="0 0 80 80" role="img" aria-label="${meet} of ${LADDERS.length} areas reach your goal">
          <circle class="ring-bg" cx="40" cy="40" r="34"/><circle class="ring-fg" cx="40" cy="40" r="34" style="stroke-dasharray:${dash.toFixed(1)} 214"/>
          <text x="40" y="46" text-anchor="middle">${meet}/${LADDERS.length}</text></svg>
        <div><b>${meet} of ${LADDERS.length} areas reach your goal</b><small>Goal: ${HZ[goal - 1].name} (${HZ[goal - 1].span}) for ${n} ${n === 1 ? "person" : "people"}</small></div>
      </div>
      <div class="tiles">${tiles}</div>
      ${next ? `<div class="block"><h4>Next steps toward your goal</h4><ul class="nextlist">${next}</ul></div>` : `<div class="block"><h4>Goal reached in every area</h4><p>Raise your goal to the next level.</p></div>`}
      ${areas}
      <p class="hint">Peso figures are Philippine listings seen in November 2026. “Estimate” means my rule of thumb, not a quoted price. Check locally before you buy or build.</p>
    </section>`;
  }

  const navVis = () => (S.settings.nav === "full" ? ["home", "plan", "storage", "family", "guides", "more"] : ["home", "guides", "family", "more"]);
  const VIEWS = { home: viewHome, more: viewMore, plan: viewPlan, levels: viewLevels, family: viewFamily, storage: viewStorage, comms: viewComms, guides: viewGuides, drill: viewDrill };

  /* ---------- render ---------- */
  const app = document.getElementById("app");
  function render() {
    const y = window.scrollY;
    FIGCEB = ceb();
    app.innerHTML = updateBanner() + alertBanner() + bannerHtml() + (VIEWS[S.ui.tab] || viewPlan)();
    if (SYNC) SYNC.paint();
    hydratePhotos();
    if (S.ui.tab === "storage") stkFilterDom();
    if (ceb()) translateDom(app, true);
    const vis = navVis(), cur = vis.includes(S.ui.tab) ? S.ui.tab : "more";
    document.querySelectorAll(".nav button").forEach((b) => {
      if (b.dataset.tab === cur) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
    });
    window.scrollTo(0, y);
  }
  function setTab(t) {
    stopSpeak();
    S.ui.tab = t; save(); render(); window.scrollTo(0, 0); playEnter();
  }
  let enterTimer;
  function playEnter() {
    app.classList.add("enter"); clearTimeout(enterTimer);
    enterTimer = setTimeout(() => app.classList.remove("enter"), 1600);
  }
  let popId = null;

  function applySettings() {
    const r = document.documentElement;
    if (S.settings.theme === "light" || S.settings.theme === "dark") r.dataset.theme = S.settings.theme; else delete r.dataset.theme;
    if (S.settings.size === "l" || S.settings.size === "xl") r.dataset.size = S.settings.size; else delete r.dataset.size;
    if (S.settings.motion === "off") r.dataset.motion = "off"; else delete r.dataset.motion;
    r.lang = ceb() ? "ceb" : "en";
    document.querySelectorAll(".nav [data-i]").forEach((el) => { el.textContent = tx(el.dataset.i); });
    const vis = navVis();
    document.querySelectorAll(".nav button").forEach((b) => { b.hidden = !vis.includes(b.dataset.tab); });
    document.querySelector(".nav .wrap").style.setProperty("--n", vis.length);
    translateDom(document.querySelector("header.top"), ceb());
    translateDom(document.querySelector(".nav"), ceb());
    if (window._st) { const so = document.getElementById("offlineStatus"); if (so) so.textContent = tx(window._st); }
    translateDom(document.getElementById("settings"), ceb());
    document.title = ceb() ? "Andam – Pag-andam para sa kaluwasan" : "Andam – Prep for survival";
  }

  /* ---------- settings dialog ---------- */
  const dlg = document.getElementById("settings");
  function backupText() {
    const data = JSON.parse(JSON.stringify(S));
    delete data.ui; delete data.alerts; delete data.nearby; delete data.news;
    return JSON.stringify({ app: "handa", v: 1, saved: new Date().toISOString(), data }, null, 1);
  }
  function openSettings() {
    document.getElementById("theme").value = S.settings.theme;
    document.getElementById("size").value = S.settings.size;
    document.getElementById("motion").value = S.settings.motion || "auto";
    document.getElementById("lang").value = S.settings.lang || "en";
    document.getElementById("navmode").value = S.settings.nav || "simple";
    document.getElementById("splashmode").value = S.settings.splash || "on";
    document.getElementById("newsmode").value = S.settings.news || "on";
    document.getElementById("backup").value = backupText();
    const ss = document.getElementById("syncStatus"); if (ss) ss.textContent = SYNC ? SYNC.settingsLine() : "";
    document.getElementById("restoreText").value = "";
    const lb = document.getElementById("lastBackup"); if (lb) lb.textContent = S.settings.lastBackup ? tx("Last backup") + ": " + S.settings.lastBackup : tx("You have not saved a backup yet.");
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
  }

  /* ---------- photos (stay on this phone, in IndexedDB) ---------- */
  let pdb = null;
  function photoDB() {
    if (pdb) return pdb;
    pdb = new Promise((res, rej) => {
      if (!window.indexedDB) return rej(new Error("no idb"));
      const r = indexedDB.open("handa-photos", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("p");
      r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
    });
    return pdb;
  }
  const idb = (mode, fn) => photoDB().then((db) => new Promise((res, rej) => {
    const t = db.transaction("p", mode); const rq = fn(t.objectStore("p"));
    t.oncomplete = () => res(rq && rq.result); t.onerror = () => rej(t.error);
  }));
  function shrink(file) {
    return new Promise((res, rej) => {
      const img = new Image(); const url = URL.createObjectURL(file);
      img.onload = () => {
        const k = Math.min(1, 640 / Math.max(img.width, img.height));
        const c = document.createElement("canvas"); c.width = Math.max(1, Math.round(img.width * k)); c.height = Math.max(1, Math.round(img.height * k));
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        c.toBlob((b) => (b ? res(b) : rej(new Error("blob"))), "image/jpeg", 0.72);
      };
      img.onerror = () => { URL.revokeObjectURL(url); rej(new Error("img")); };
      img.src = url;
    });
  }
  const dropPhoto = (k) => { photoDB().then(() => idb("readwrite", (st) => st.delete(k))).catch(() => {}); };
  const getPhoto = (k) => photoDB().then(() => idb("readonly", (st) => st.get(k)));
  function hydratePhotos() {
    const slots = document.querySelectorAll("[data-ph]");
    if (!slots.length) return;
    photoDB().then(() => slots.forEach((el) => idb("readonly", (st) => st.get(el.dataset.ph)).then((blob) => {
      if (blob && el.isConnected) {
        el.innerHTML = `<img src="${URL.createObjectURL(blob)}" alt="Your photo"><button class="phx" data-a="phdel" data-k="${el.dataset.ph}" aria-label="${esc(tx("Remove photo"))}">×</button>`;
      }
    }))).catch(() => {});
  }

  /* ---------- share the family page ---------- */
  function familyCode() {
    const f = S.family;
    const pack = { app: "handa", kind: "family", v: 1,
      family: { meet1: f.meet1, meet2: f.meet2, meet3: f.meet3, route: f.route, outName: f.outName, outPhone: f.outPhone,
        members: f.members.map(({ name, phone, notes }) => ({ name, phone, notes })), nums: f.nums.map(({ label, phone }) => ({ label, phone })) },
      places: S.places.map(({ label, note, lat, lng, hazard }) => ({ label, note, lat, lng, hazard })) };
    return "HANDA1:" + btoa(unescape(encodeURIComponent(JSON.stringify(pack))));
  }
  function importFamily(text) {
    let pack;
    const raw = String(text || "").trim();
    try {
      const m = raw.match(/HANDA1:([A-Za-z0-9+/=\s]+)/);
      const json = m ? decodeURIComponent(escape(atob(m[1].replace(/\s+/g, "")))) : raw;
      pack = JSON.parse(json);
    } catch (e) { return false; }
    if (!pack || pack.app !== "handa" || pack.kind !== "family" || !isObj(pack.family)) return false;
    const f = S.family, n = pack.family; let added = 0;
    ["meet1", "meet2", "meet3", "route", "outName", "outPhone"].forEach((k) => { if (!f[k] && n[k]) { f[k] = String(n[k]); added++; } });
    const key = (s) => String(s || "").toLowerCase().replace(/\s+/g, "");
    (n.members || []).forEach((m) => { if (m && m.name && !f.members.some((x) => key(x.name) === key(m.name))) { f.members.push({ id: uid(), name: String(m.name), phone: String(m.phone || ""), notes: String(m.notes || ""), bag: false }); added++; } });
    (n.nums || []).forEach((m) => { if (m && m.phone && !f.nums.some((x) => key(x.phone) === key(m.phone))) { f.nums.push({ id: uid(), label: String(m.label || ""), phone: String(m.phone) }); added++; } });
    (pack.places || []).forEach((p) => { if (p && p.label && !S.places.some((x) => key(x.label) === key(p.label) && String(x.lat) === String(p.lat))) { S.places.push({ id: uid(), label: String(p.label), note: String(p.note || ""), lat: p.lat ?? "", lng: p.lng ?? "", hazard: HAZ.some((h) => h[0] === p.hazard) ? p.hazard : "" }); added++; } });
    save(); render();
    toast(added ? added + " added to this phone." : "Nothing new to add: this phone already has it.");
    return true;
  }

  /* ---------- printable fridge sheet ---------- */
  function sheetHtml() {
    const L = SHEET[ceb() ? "ceb" : "en"], f = S.family;
    const line = (a, b) => `<p><b>${esc(a)}:</b> ${b ? esc(b) : `<span class="blank">${esc(L.none)}</span>`}</p>`;
    const ppl = f.members.length ? f.members.map((m) => `<li><b>${esc(m.name || "?")}</b> ${esc(m.phone || "")}${m.notes ? ` <small>${esc(m.notes)}</small>` : ""}</li>`).join("") : `<li class="blank">${esc(L.none)}</li>`;
    const nums = f.nums.filter((n) => n.phone).map((n) => `<li><b>${esc(n.label || "")}</b> ${esc(n.phone)}</li>`).join("");
    const places = S.places.filter((p) => p.label && !["evac", "safe", "flood", "landslide", "surge", "fire"].includes(p.hazard)).map((p) => `<li><b>${esc(p.label)}</b> ${esc(p.note || "")} ${p.lat != null && p.lat !== "" ? `<small>${esc(p.lat)}, ${esc(p.lng)}</small>` : ""}</li>`).join("");
    return `<h1>${esc(L.title)}</h1>
      <div class="sg"><div><h2>${esc(L.meet)}</h2>${line(L.m1, f.meet1)}${line(L.m2, f.meet2)}${line(L.m3, f.meet3)}${line(L.out, [f.outName, f.outPhone].filter(Boolean).join(" "))}</div>
      <div><h2>${esc(L.people)}</h2><ul>${ppl}</ul></div></div>
      ${(() => {
        const names = (h) => S.places.filter((x) => x.label && x.hazard === h).map((x) => `<li><b>${esc(x.label)}</b> ${esc(x.note || "")} ${x.lat != null && x.lat !== "" ? `<small>${esc(x.lat)}, ${esc(x.lng)}</small>` : ""}</li>`).join("");
        const ev = names("evac"), sf = names("safe"), av = HAZ.filter((h) => ["flood", "landslide", "surge", "fire"].includes(h[0])).map((h) => names(h[0]) ? `<li><small>${esc(tx(h[1]))}</small><ul>${names(h[0])}</ul></li>` : "").join("");
        return (ev || sf || av || f.route) ? `<div class="sg"><div><h2>${esc(tx("Evacuation"))}</h2>${ev ? `<ul>${ev}</ul>` : ""}${sf ? `<p><b>${esc(tx("Safe place"))}</b></p><ul>${sf}</ul>` : ""}${f.route ? `<p><b>${esc(tx("Route"))}:</b> ${esc(f.route)}</p>` : ""}</div>${av ? `<div><h2>${esc(tx("Stay away from"))}</h2><ul>${av}</ul></div>` : ""}</div>` : "";
      })()}
      <div class="sg"><div><h2>${esc(L.nums)}</h2><ul><li><b>${esc(L.emergency)}</b></li>${nums}</ul></div>
      <div><h2>${esc(L.places)}</h2><ul>${places || `<li class="blank">${esc(L.none)}</li>`}</ul></div></div>
      <div class="sg">${L.blocks.map(([h, items]) => `<div class="sb"><h2>${esc(h)}</h2><ul>${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
      <h2>${esc(L.bag)}</h2><p>${L.bagItems.map((x, i) => `${i + 1} ${esc(x)}`).join(" · ")}</p>
      <p class="foot">${esc(L.foot)}</p>`;
  }
  function printSheet() {
    let el = document.getElementById("sheet");
    if (!el) { el = document.createElement("div"); el.id = "sheet"; document.body.appendChild(el); }
    el.innerHTML = sheetHtml(); el.classList.remove("cardsheet");
    document.body.classList.add("print-sheet");
    setTimeout(() => window.print(), 200);
  }
  window.addEventListener("afterprint", () => document.body.classList.remove("print-sheet"));

  /* ---------- wallet cards: one small card per person, to cut out ---------- */
  function cardsHtml() {
    const f = S.family, m = S.medid || {};
    const row = (lab, v, cls) => (v ? `<p class="${cls || ""}"><b>${esc(tx(lab))}:</b> ${esc(v)}</p>` : "");
    const foot = row("We meet at", f.meet1) + row("Contact outside the area", [f.outName, f.outPhone].filter(Boolean).join(" ")) + `<p class="wcf">${esc(tx("Emergency"))}: 911 · Andam</p>`;
    const wrap = (inner) => { const n = inner.replace(/<[^>]*>/g, "").length; return `<div class="wc${n > 360 ? " tiny" : n > 230 ? " dense" : ""}">${inner}</div>`; };
    const cards = [], mine = (m.name || "").trim().toLowerCase();
    if (Object.keys(m).some((k) => k !== "upd" && m[k])) {
      cards.push(wrap(`<div class="wch"><b>${esc(m.name || tx("My name"))}</b>${m.blood ? `<span class="wcb">${esc(m.blood)}</span>` : ""}</div>` +
        row("Allergies", m.allergies, "wcw") + row("Medical conditions", m.conditions) + row("Medicines taken", m.meds) +
        row("Call", [m.c1n, m.c1p].filter(Boolean).join(" ")) + row("Call", [m.c2n, m.c2p].filter(Boolean).join(" ")) +
        row("Home address or barangay", m.addr) + row("Other notes", m.notes) + foot));
    }
    f.members.forEach((p) => {
      if (!(p.name || p.phone || p.notes)) return;
      if (mine && (p.name || "").trim().toLowerCase() === mine) return;
      cards.push(wrap(`<div class="wch"><b>${esc(p.name || "?")}</b></div>` + row("My phone", p.phone) + row("Health and needs", p.notes) + foot));
    });
    if (!cards.length) return "";
    const blank = () => `<div class="wc blank"><div class="wch"><b>Andam</b></div>${["Name", "Blood type", "Allergies", "Call"].map((k) => `<p>${esc(tx(k))}:</p>`).join("")}<p></p></div>`;
    while (cards.length % 8) cards.push(blank());
    let out = "";
    for (let i = 0; i < cards.length; i += 8) out += `<div class="wcp">${i === 0 ? `<p class="wchint">${esc(tx("Cut along the dotted lines. Keep one card in your wallet and one in each go-bag."))}</p>` : ""}<div class="wcs">${cards.slice(i, i + 8).join("")}</div></div>`;
    return out;
  }
  function printCards() {
    const html = cardsHtml();
    if (!html) { toast(tx("Add people in the Family tab first.")); return; }
    let el = document.getElementById("sheet");
    if (!el) { el = document.createElement("div"); el.id = "sheet"; document.body.appendChild(el); }
    el.innerHTML = html; el.classList.add("cardsheet");
    document.body.classList.add("print-sheet");
    setTimeout(() => window.print(), 200);
  }

  /* ---------- invite the family: a link and a QR code ---------- */
  const PUBLIC_URL = "https://mvcashbel-art.github.io/preper/";
  function inviteUrl() {
    try {
      const u = new URL(location.href);
      if (u.protocol === "https:" && !/^(localhost|127\.|\[)/.test(u.hostname)) { u.hash = ""; u.search = ""; u.pathname = u.pathname.replace(/[^/]*$/, ""); return u.toString(); }
    } catch (e) {}
    return PUBLIC_URL;
  }
  function inviteText() {
    const url = inviteUrl(), login = SYNC && SYNC.configured();
    return "Andam: get ready for typhoons, floods and earthquakes. Open this on your phone: " + url + "\n" +
      (login ? "To see the same family information, tap the person icon at the top right and log in with the family login name and passphrase.\n" : "") +
      "\nAndam: pangandam para sa bagyo, baha ug linog. Ablihi kini sa imong telepono: " + url + "\n" +
      (login ? "Aron makita ang parehas nga impormasyon sa pamilya, i-tap ang icon sa tawo sa tuo nga taas ug mag-login gamit ang ngalan sa login ug passphrase sa pamilya.\n" : "");
  }
  function sendInvite() {
    const msg = inviteText();
    if (navigator.share) { navigator.share({ title: "Andam", text: msg }).catch(() => {}); return; }
    (navigator.clipboard ? navigator.clipboard.writeText(msg) : Promise.reject()).then(() => toast(tx("Link copied. Paste it in a message.")), () => toast(tx("Couldn't copy on this phone.")));
  }
  function openQr() {
    const d = document.getElementById("qrdlg"), url = inviteUrl(), svg = window.AndamQR ? window.AndamQR.svg(url) : "";
    d.innerHTML = `<div class="idin"><div class="idbar"><b>${esc(tx("Scan to open Andam"))}</b><span><button class="btn small ghost" data-a="qrclose">${esc(tx("Close"))}</button></span></div>
      ${svg ? `<div class="qrbox">${svg}</div>` : ""}
      <p class="hint">${esc(tx("Ask them to point their phone camera at this square. The link opens in their browser."))}</p>
      <p class="qrurl">${esc(url)}</p>
      <div class="actions"><button class="btn small" data-a="invite">${esc(tx("Send the Andam link"))}</button></div></div>`;
    if (ceb()) translateDom(d, true);
    if (typeof d.showModal === "function") { if (!d.open) d.showModal(); } else d.setAttribute("open", "");
  }

  /* ---------- events ---------- */
  document.addEventListener("click", (e) => {
    const im = e.target.closest && e.target.closest(".ph img");
    if (im) { im.parentElement.classList.toggle("big"); return; }
    const el = e.target.closest("[data-a]");
    if (!el) return;
    const d = el.dataset;
    if (d.a.startsWith("sy_")) { if (SYNC) SYNC.act(d.a); return; }
    switch (d.a) {
      case "tab": setTab(d.tab); break;
      case "phase": S.ui.phase = Number(d.phase); save(); render(); break;
      case "lvgoal": S.levels.goal = Number(d.goal); save(); render(); break;
      case "lvgo": {
        S.ui.open["lv_" + d.id] = true; save(); render();
        const t = document.getElementById("lv_" + d.id);
        if (t) t.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
        break;
      }
      case "hwgo": {
        S.ui.open["hw_" + d.id] = true; S.ui.tab = "guides";
        HOWTO_GROUPS.forEach(([n, ids], gi) => { S.ui.open["gs" + gi] = ids.includes(d.id); });
        S.ui.open.gsq = false; save(); render();
        const t = document.getElementById("hw_" + d.id);
        if (t) t.scrollIntoView({ block: "start" });
        break;
      }
      case "tobuy": S.ui.toBuy = !S.ui.toBuy; save(); render(); break;
      case "detail": S.ui.detail[d.id] = !S.ui.detail[d.id]; save(); render(); break;
      case "addcustom": {
        const input = document.getElementById("add_" + d.cat);
        const text = input.value.trim();
        if (!text) { toast("Type the item first."); input.focus(); break; }
        const p = Number(document.getElementById("addp_" + d.cat).value) || 1;
        (S.custom[d.cat] = S.custom[d.cat] || []).push({ id: "u_" + uid(), t: text, p, b: 0 });
        S.ui.open[d.cat] = true; save(); render(); break;
      }
      case "rmcustom":
        S.custom[d.cat] = (S.custom[d.cat] || []).filter((i) => i.id !== d.id);
        delete S.checked[d.id]; delete S.price[d.id]; delete S.notes[d.id]; delete S.ui.detail[d.id];
        save(); render(); break;
      case "addmember": S.family.members.push({ id: uid(), name: "", phone: "", notes: "", bag: false }); save(); render(); break;
      case "rmmember":
        if (confirm("Remove this person from the list?")) { S.family.members.splice(Number(d.idx), 1); save(); render(); }
        break;
      case "addnum": S.family.nums.push({ id: uid(), label: "", phone: "" }); save(); render(); break;
      case "rmnum":
        S.family.nums.splice(Number(d.idx), 1); save(); render(); break;
      case "resetdrill": S.drill.steps = {}; save(); render(); break;
      case "dial": {
        const num = getPath(d.path);
        if (!num) { toast("Add a phone number first."); break; }
        window.location.href = (d.mode === "sms" ? smsHref : telHref)(num);
        break;
      }
      case "addstock": {
        const g = (id) => { const e = document.getElementById(id); return e ? e.value.trim() : ""; };
        const name = g("stkName"), date = g("stkDate");
        if (!name && !date) { toast(tx("Write what it is, or pick a date, first.")); break; }
        S.stock.push({ id: uid(), name, qty: g("stkQty"), date, cat: g("stkType") || "food", where: g("stkWhere") });
        S.ui.open.stkadd = true; save(); render(); break;
      }
      case "stockcal": shareStockCal(); break;
      case "bannerhide": S.ui.bannerDay = new Date().toISOString().slice(0, 10); save(); render(); break;
      case "bannergo": S.ui.tab = "storage"; S.ui.stkType = "soon"; stkQ = ""; save(); render(); window.scrollTo(0, 0); break;
      case "stkgroup": S.ui.stkGroup = d.v; save(); render(); break;
      case "alertcheck": runAlerts(true); break;
      case "alertauto": S.settings.alertsAuto = alertsOn() ? "off" : "on"; save(); render(); break;
      case "alerthide": S.ui.alertHide = ymd(); save(); render(); break;
      case "alertgo": S.ui.tab = "plan"; S.ui.open.alerts = true; save(); render(); { const t = document.getElementById("alerts"); if (t) t.scrollIntoView({ block: "start" }); } break;
      case "alertrm": S.watch = S.watch.filter((p) => p.id !== d.id); delete S.alerts[d.id]; save(); render(); break;
      case "alertgps": {
        if (!navigator.geolocation) { toast(tx("This phone can't give its location here.")); break; }
        toast(tx("Finding your location…"));
        navigator.geolocation.getCurrentPosition((pos) => {
          const lat = Math.round(pos.coords.latitude * 1000) / 1000, lng = Math.round(pos.coords.longitude * 1000) / 1000;
          if (addWatch({ gps: true, name: tx("My location"), lat, lng })) { save(); render(); runAlerts(true); }
        }, () => toast(tx("Couldn't get your location. Allow location for this app, or search a place instead.")), { timeout: 15000, maximumAge: 600000 });
        break;
      }
      case "alertsearch": {
        const q = (document.getElementById("alertQ") || {}).value || "";
        if (q.trim().length < 2) { toast(tx("Type a town or city first.")); break; }
        if (!navigator.onLine) { toast(tx("No internet. Showing the last check.")); break; }
        ALERTS.search(q.trim()).then((r) => { alertResults = r; render(); }).catch(() => toast(tx("Couldn't reach the warning services. Try again later.")));
        break;
      }
      case "alertadd": {
        const r = alertResults && alertResults[Number(d.i)];
        if (r && addWatch(r)) { alertResults = null; save(); render(); runAlerts(true); }
        break;
      }
      case "famtext": sendFamilyText(d.id); break;
      case "smsloc": S.ui.smsLoc = !S.ui.smsLoc; save(); render(); break;
      case "applyupdate": window.location.reload(); break;
      case "shoplist": shareShopList(); break;
      case "nexttip": S.ui.tipOff = (S.ui.tipOff || 0) + 1; save(); render(); break;
      case "monthgo": S.ui.tab = "plan"; S.ui.open.monthly = true; save(); render(); { const t = document.getElementById("monthly"); if (t) t.scrollIntoView({ block: "start" }); } break;
      case "monthcal": shareMonthCal(); break;
      case "stktype": S.ui.stkType = d.v; save(); render(); break;
      case "rmstock": { const r = S.stock.splice(Number(d.idx), 1)[0]; if (r) delete S.ui.open["s_" + r.id]; save(); render(); break; }
      case "addplace": S.places.push({ id: uid(), label: "", note: "", lat: "", lng: "" }); save(); render(); break;
      case "rmplace": { const pl = S.places[Number(d.idx)]; if (pl) dropPhoto("place_" + pl.id); S.places.splice(Number(d.idx), 1); save(); render(); break; }
      case "placegps": {
        if (!navigator.geolocation) { toast("This phone can't find its location here."); break; }
        const i = Number(d.idx); toast("Finding your location…");
        navigator.geolocation.getCurrentPosition((pos) => {
          if (S.places[i]) { S.places[i].lat = pos.coords.latitude.toFixed(5); S.places[i].lng = pos.coords.longitude.toFixed(5); save(); render(); toast("Saved. Write these numbers on paper too."); }
        }, () => toast("Couldn't get the location. Allow location for this app and try outdoors."), { enableHighAccuracy: true, timeout: 20000, maximumAge: 60000 });
        break;
      }
      case "map": MAPV.open({ get S() { return S; }, save, toast, tx, ceb: ceb(), esc, HAZ, uid, render: () => render(), getPhoto, dropPhoto }, d.focus); break;
      case "setlang": S.settings.lang = d.v === "ceb" ? "ceb" : "en"; save(); applySettings(); render(); break;
      case "noticehide": S.ui.noticeHide = Object.assign({}, S.ui.noticeHide, { [d.id]: true }); save(); render(); break;
      case "newsopen": openNews(); break;
      case "newsclose": { const nd = document.getElementById("newsdlg"); if (nd.open) nd.close(); break; }
      case "newstab": S.ui.newsTab = d.v === "war" ? "war" : "dis"; save(); openNews(); break;
      case "newshometab": S.ui.newsTab = d.v === "war" ? "war" : "dis"; save(); render(); if (!S.news[newsKey()]) fetchNews(newsKey()); break;
      case "newsrefresh": fetchNews(newsKey()); break;
      case "helpnow": openHelp(); break;
      case "splashhelp": hideSplash(); openHelp(); break;
      case "helpclose": closeHelp(); break;
      case "guideopen": {
        closeHelp(); S.ui.tab = "guides"; S.ui.open.gsq = true; save(); render(); window.scrollTo(0, 0);
        const t = document.getElementById("qg_" + d.id); if (t) { t.open = true; t.scrollIntoView({ block: "start" }); }
        break;
      }
      case "drillstart": drillStart(!!d.sound); break;
      case "drillarrive": if (drillRun) { drillRun.ms = Date.now() - drillRun.t0; clearInterval(drillRun.timer); siren(false); const dd = document.getElementById("drilldlg"); dd.innerHTML = drillHtml("done"); if (ceb()) translateDom(dd, true); } break;
      case "drillsave": if (drillRun) { S.drill.last = isoToday(); S.drill.time = clock(drillRun.ms); delete S.ui.drillSnooze; save(); drillEnd(); render(); toast(tx("Drill saved. Next one in about six months.")); } break;
      case "drillcancel": drillEnd(); break;
      case "drillics": shareIcs(drillIcs(), "Andam-family-drill.ics"); break;
      case "idcard": openIdCard(); break;
      case "idclose": { const d2 = document.getElementById("iddlg"); d2.close ? d2.close() : d2.removeAttribute("open"); break; }
      case "idprint": document.body.classList.add("pid"); window.print(); setTimeout(() => document.body.classList.remove("pid"), 800); break;
      case "drilldone": S.drill.last = isoToday(); S.drill.steps = {}; delete S.ui.drillSnooze; save(); render(); toast(tx("Drill saved. Next one in about six months.")); break;
      case "drillsnooze": { const d2 = new Date(); d2.setDate(d2.getDate() + 7); S.ui.drillSnooze = d2.getFullYear() + "-" + String(d2.getMonth() + 1).padStart(2, "0") + "-" + String(d2.getDate()).padStart(2, "0"); save(); render(); break; }
      case "speak": speakFrom(el); break;
      case "shareapp": shareApp(); break;
      case "sharefam": {
        const code = familyCode();
        const msg = "Andam family page. Open Andam, go to Family, paste this under Share with family, and tap Add to this phone:\n\n" + code;
        if (navigator.share) navigator.share({ title: "Andam family page", text: msg }).catch(() => {});
        else (navigator.clipboard ? navigator.clipboard.writeText(msg) : Promise.reject()).then(() => toast("Copied. Paste it in a message."), () => toast("Couldn't copy on this phone."));
        break;
      }
      case "impfam": {
        const ta = document.getElementById("famIn");
        if (!importFamily(ta && ta.value)) toast("That doesn't look like an Andam family page. Paste the whole text.");
        break;
      }
      case "phdel": idb("readwrite", (st) => st.delete(d.k)).then(() => { const el = document.querySelector('[data-ph="' + d.k + '"]'); if (el) el.innerHTML = ""; }).catch(() => {}); break;
      case "printsheet": printSheet(); break;
      case "printcards": printCards(); break;
      case "invite": sendInvite(); break;
      case "inviteqr": openQr(); break;
      case "qrclose": { const d2 = document.getElementById("qrdlg"); d2.close ? d2.close() : d2.removeAttribute("open"); break; }
      case "settings": openSettings(); break;
      case "closesettings": dlg.close ? dlg.close() : dlg.removeAttribute("open"); break;
      case "copybackup": {
        const ta = document.getElementById("backup");
        ta.select(); S.settings.lastBackup = new Date().toISOString().slice(0, 10); save();
        (navigator.clipboard ? navigator.clipboard.writeText(ta.value) : Promise.reject()).then(
          () => toast("Backup copied. Paste it into a message to yourself."),
          () => { document.execCommand && document.execCommand("copy"); toast("Backup copied."); });
        break;
      }
      case "dlbackup": {
        S.settings.lastBackup = new Date().toISOString().slice(0, 10); save();
        const blob = new Blob([backupText()], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "andam-backup-" + new Date().toISOString().slice(0, 10) + ".json";
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 2000);
        break;
      }
      case "restore": {
        try {
          const obj = JSON.parse(document.getElementById("restoreText").value);
          if (!obj || obj.app !== "handa" || !isObj(obj.data)) throw new Error("bad");
          const ui = S.ui;
          S = merge(defaults(), obj.data); S.ui = ui;
          save(); applySettings(); render(); dlg.close && dlg.close();
          toast("Backup restored.");
        } catch (err) { toast("That doesn't look like an Andam backup. Paste the whole text."); }
        break;
      }
      case "reset":
        if (confirm(tx("Erase everything you entered on this phone? This can't be undone.") + (SYNC && SYNC.loggedIn() ? "\n\n" + tx("You will also be logged out. Your online copy stays.") : ""))) {
          if (SYNC && SYNC.loggedIn()) SYNC.logoutQuiet();
          S = defaults(); seed(); save(); applySettings(); render(); dlg.close && dlg.close(); toast("Everything was cleared.");
        }
        break;
      case "print": dlg.close && dlg.close(); setTimeout(() => window.print(), 250); break;
      case "install":
        if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt = null; el.hidden = true; }
        break;
    }
  });

  document.addEventListener("change", (e) => {
    const el = e.target;
    if (el.dataset && el.dataset.phIn && el.files && el.files[0]) {
      const k = el.dataset.phIn;
      shrink(el.files[0]).then((blob) => idb("readwrite", (st) => st.put(blob, k))).then(() => hydratePhotos()).catch(() => toast("Couldn't save that photo on this phone."));
      return;
    }
    if (el.id === "restoreFile" && el.files && el.files[0]) {
      el.files[0].text().then((t) => { document.getElementById("restoreText").value = t; });
      return;
    }
    const b = el.closest && el.closest("[data-bind]");
    if (!b) return;
    const path = b.dataset.bind;
    let val = b.type === "checkbox" ? b.checked : b.value;
    let reachBefore = null, lad = null;
    if (b.hasAttribute("data-calc") && val === "") val = "0";
    if (path === "levels.people") val = Math.max(1, Math.min(30, parseInt(val, 10) || 1));
    if (path.startsWith("levels.done.")) {
      lad = LADDERS.find((x) => x.id === path.split(".")[2].split("_")[0]);
      reachBefore = lad ? lvReached(lad) : null;
      if (val) popId = el.id;
    }
    setPath(path, val);
    if (path.startsWith("medid.") && path !== "medid.upd") S.medid.upd = isoToday();
    save();
    if (lad && lvReached(lad) >= S.levels.goal && reachBefore < S.levels.goal) toast(lad.name + " now reaches " + HZ[S.levels.goal - 1].name + ".");
    if (path.startsWith("settings.")) applySettings();
    if (b.dataset.re) {
      render();
      if (popId) { const c = document.getElementById(popId); if (c) c.classList.add("pop"); popId = null; }
    }
  });

  // live solar calculator
  document.addEventListener("input", (e) => {
    if (e.target && e.target.id === "stkSearch") { stkQ = e.target.value; stkFilterDom(); return; }
    const b = e.target.closest && e.target.closest("[data-calc]");
    if (!b) return;
    setPath(b.dataset.bind, b.value === "" ? "0" : b.value); save();
    const out = document.getElementById("calcOut"); if (out) out.innerHTML = calcResult();
  });

  // tap a section: close the others and scroll so the opened one sits at the top
  document.addEventListener("click", (e) => {
    const sm = e.target.closest && e.target.closest("details.guide.hw > summary, details.lad > summary, details.cat > summary");
    if (!sm) return;
    const d = sm.parentElement;
    if (d.open) return; // it is closing
    document.querySelectorAll("details.guide.hw[open], details.lad[open], details.cat[open]").forEach((o) => { if (o !== d && !o.contains(d)) o.open = false; });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";
    setTimeout(() => { d.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); }, 60);
  });

  // remember which sections are open
  document.addEventListener("toggle", (e) => {
    const d = e.target;
    if (d.dataset && d.dataset.cat && S.ui.open[d.dataset.cat] !== d.open) {
      S.ui.open[d.dataset.cat] = d.open; save();
    }
  }, true);

  // print: open every section
  window.addEventListener("beforeprint", () => document.querySelectorAll("details").forEach((d) => (d.open = true)));
  window.addEventListener("afterprint", render);

  /* ---------- install and offline ---------- */
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); deferredPrompt = e;
    const b = document.getElementById("installBtn"); if (b) b.hidden = false;
  });
  const status = document.getElementById("offlineStatus");
  const setSt = (m) => { window._st = m; status.textContent = tx(m); };
  const savedCount = () => (window.caches
    ? caches.keys().then((ks) => { const k = ks.find((x) => x.indexOf("andam-") === 0); return k ? caches.open(k).then((c) => c.keys()).then((r) => r.length) : 0; }).catch(() => 0)
    : Promise.resolve(0));
  if (location.protocol === "file:") {
    setSt("This single file works without internet");
  } else if (!("serviceWorker" in navigator)) {
    setSt("Can't save for offline here: this address is not https. Use the https web address, or the one-file copy.");
  } else {
    const findMissing = () => fetch("sw.js", { cache: "no-store" }).then((r) => r.text()).then((t) => {
      const list = (t.match(/ASSETS = \[([\s\S]*?)\]/) || [, ""])[1].match(/"[^"]+"/g) || [];
      return Promise.all(list.map((q) => q.slice(1, -1)).filter((u) => u !== "./").map((u) =>
        fetch(u, { cache: "no-store" }).then((r) => (r.ok ? null : u), () => u)));
    }).then((r) => r.filter(Boolean)).catch(() => []);
    const watch = (w) => { if (w) w.addEventListener("statechange", () => {
      if (w.state !== "redundant" || navigator.serviceWorker.controller) return;
      setSt("Offline saving failed: a file is missing on the web host. Upload every file in the folder, including icons and fonts.");
      findMissing().then((miss) => { if (miss.length) setSt("Offline saving failed. These files are missing on the web host: " + miss.slice(0, 6).join(", ") + (miss.length > 6 ? " and more" : "") + ". Upload them, keeping the same folder names."); });
    }); };
    const hadSw = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener("controllerchange", () => { if (hadSw && !updateReady) { updateReady = true; softRender(); } });
    navigator.serviceWorker.register("sw.js").then((reg) => { watch(reg.installing); reg.addEventListener("updatefound", () => watch(reg.installing));
      const chk = () => reg.update().catch(() => {}); setTimeout(chk, 4000);
      document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") chk(); }); })
      .catch(() => setSt("Offline mode could not start. This browser or page may block it."));
    navigator.serviceWorker.ready.then(() => savedCount().then((n) => setSt(n ? "Ready: works without internet (" + n + " files saved)" : "Ready: works without internet")));
    setTimeout(() => { if (!window._st) setSt("Not saved for offline yet. Reload once with internet. If this stays, the files are not on an https address, or this browser blocks saving."); }, 6000);
  }
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

  /* ---------- opening screen ---------- */
  const SPLASH_MIN = 3000, SPLASH_MAX = 14000;
  let splashT = null;
  function hideSplash() {
    const el = document.getElementById("splash");
    clearInterval(splashT);
    if (!el) return;
    el.classList.add("out");
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 350);
  }
  /* Stays at least 3 seconds, and longer (up to 14 s) if the page, fonts or offline files are still loading. */
  function startSplash() {
    const el = document.getElementById("splash");
    if (!el) return;
    if (ceb()) translateDom(el, true);
    const bar = el.querySelector(".spl-bar i"), msg = el.querySelector(".spl-msg"), t0 = Date.now();
    let ready = false;
    const within = (p, ms) => Promise.race([Promise.resolve(p).catch(() => {}), new Promise((r) => setTimeout(r, ms))]);
    const loaded = document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true }));
    const fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    const offline = "serviceWorker" in navigator && location.protocol.startsWith("http") ? within(navigator.serviceWorker.ready, SPLASH_MAX - 1000) : Promise.resolve();
    Promise.all([loaded, fonts, offline]).then(() => { ready = true; });
    splashT = setInterval(() => {
      const ms = Date.now() - t0, f = Math.min(1, ms / SPLASH_MIN);
      if (bar) bar.style.width = Math.round((ready || f < 0.9 ? f : 0.9) * 100) + "%";
      if (ms >= SPLASH_MIN && !ready && msg && !msg.dataset.late) { msg.dataset.late = "1"; msg.textContent = tx("Almost ready, still loading"); }
      if ((ms >= SPLASH_MIN && ready) || ms >= SPLASH_MAX) hideSplash();
    }, 100);
    el.addEventListener("click", (e) => { if (!e.target.closest("button")) hideSplash(); });
  }

  /* ---------- start ---------- */
  if (typeof AndamSync === "function") {
    SYNC = AndamSync({
      get: () => S, defaults, merge, save, tx, esc, ceb, translateDom,
      fresh: () => { const d = defaults(); NUMBERS.forEach((n) => d.family.nums.push({ id: uid(), label: n.label, phone: n.phone })); d.family.seeded = true; return d; },
      replace: (ns) => { S = ns; save(); applySettings(); render(); },
      rerender: () => { render(); }
    });
  }
  applySettings();
  startSplash();
  setTimeout(maybeRefreshNews, 1500);
  if (location.hash && VIEWS[location.hash.slice(1)]) S.ui.tab = location.hash.slice(1);
  render(); playEnter();
  setTimeout(autoAlerts, 1200);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") autoAlerts(); });
  window.addEventListener("online", autoAlerts);
  if (!storageOk) toast("This phone is blocking saving. Your changes will be lost when you close the app.");
})();
