(() => {
  "use strict";

  /* If this page is the one-file copy, its source is still untouched here: keep it so the app can hand itself on. */
  const PRISTINE = "<!doctype html>\n" + document.documentElement.outerHTML;

  /* ---------- state ---------- */
  const KEY = "handa.v1";
  const uid = () => Math.random().toString(36).slice(2, 9);
  const defaults = () => ({
    checked: {}, notes: {}, price: {}, custom: {},
    family: { meet1: "", meet2: "", meet3: "", outName: "", outPhone: "", members: [], nums: [], seeded: false },
    comms: { have: {}, notes: {}, checkin: "", channel: "", codes: "" },
    drill: { steps: {}, last: "", found: "" },
    levels: { people: 5, goal: 2, done: {} },
    howto: { done: {}, got: {}, calc: {}, fill: {} },
    stock: [], places: [], plan: { months: 6, warn: 30 },
    settings: { theme: "auto", size: "m", motion: "auto", lang: "en" },
    ui: { tab: "plan", phase: 0, toBuy: false, open: {}, detail: {} }
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
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(S));
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

  function viewPlan() {
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
      `<button class="chip" data-a="tobuy" aria-pressed="${S.ui.toBuy}">Still to buy</button>`;

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
        <div class="actions"><button class="btn" data-a="addplace">${esc(tx("Add a place"))}</button></div></div>

      <h3>Emergency numbers</h3>
      <div class="block">${nums}
        <p class="hint">Add your barangay, rural health unit, municipal DRRM office, and the nearest hospital.</p>
        <div class="actions"><button class="btn" data-a="addnum">Add a number</button></div></div>

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
        ${has ? `<p class="coords">${esc(p.lat)}, ${esc(p.lng)}</p>` : ""}
        <div class="actions"><button class="btn small" data-a="placegps" data-idx="${i}">${esc(tx("Use my location"))}</button>
          ${has ? `<a class="btn small ghost" href="geo:${esc(p.lat)},${esc(p.lng)}?q=${esc(p.lat)},${esc(p.lng)}(${encodeURIComponent(p.label || "Place")})">${esc(tx("Open in maps"))}</a>` : ""}
          <button class="btn danger small" data-a="rmplace" data-idx="${i}">${esc(tx("Remove"))}</button></div>
      </div>`;
    }).join("") + `<datalist id="placeKinds"><option value="High ground"><option value="Evacuation center"><option value="Clinic or hospital"><option value="Water source"><option value="Church"><option value="Relative's home"></datalist>`;
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
      <div class="body"><p class="intro">${esc(g.intro)}</p>${hp ? `<label class="pplbar">${tx("Amounts are for")} <input type="number" inputmode="numeric" min="1" max="30" data-bind="levels.people" data-re="1" value="${nPeople()}" aria-label="${tx("How many people are you planning for?")}"> ${tx("people")}</label>` : ""}${facts}${g.calc ? calcBlock() : ""}${fill}${terms}${buy}${steps}${warn}${src}</div></details>`;
  }

  function viewGuides() {
    const byId = {}; HOWTO.forEach((g) => { byId[g.id] = g; });
    const gOpen = (key, dflt) => (S.ui.open[key] === undefined ? dflt : S.ui.open[key]);
    const section = (key, dflt, title, count, inner) => `<details class="cat gsec" data-cat="${key}" id="${key}"${gOpen(key, dflt) ? " open" : ""}>
      <summary><h3>${esc(title)}</h3><span class="count">${count}</span>${chevron}</summary><div class="gbody">${inner}</div></details>`;
    const groups = HOWTO_GROUPS.map(([name, ids], gi) => { const have = ids.filter((id) => byId[id]);
      return section("gs" + gi, gi === 0, tx(name), have.length, have.map((id) => renderHowto(byId[id])).join("")); }).join("");
    const quick = GUIDES.map((g) => { const o = ceb() && CEB.quick[g.id]; return `<details class="guide"><summary>${esc(o ? o.title : g.title)}</summary><div class="body">${QFIG[g.id] ? figHtml(QFIG[g.id]) : ""}${o ? o.html : g.html}</div></details>`; }).join("");
    return `<section class="view">
      <h2>${esc(ceb() ? CEB.ui.Guides_title : "Guides")}</h2>
      <p class="lede">${esc(tx("Step by step: what to buy and what to do, with pictures. Tick things as you go. New to this? Open “Start here” first."))}</p>
      <div class="block"><h4>${esc(tx("Fridge sheets"))}</h4>
        <p class="hint">${esc(tx("One page with your family's meeting places, numbers and what to do in a typhoon, flood, earthquake and tsunami. Print it or save as PDF and put it on the fridge."))}</p>
        <div class="actions"><button class="btn small" data-a="printsheet">${esc(tx("Print the family sheet"))}</button></div></div>
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

  const VIEWS = { plan: viewPlan, levels: viewLevels, family: viewFamily, storage: viewStorage, comms: viewComms, guides: viewGuides, drill: viewDrill };

  /* ---------- render ---------- */
  const app = document.getElementById("app");
  function render() {
    const y = window.scrollY;
    FIGCEB = ceb();
    app.innerHTML = bannerHtml() + (VIEWS[S.ui.tab] || viewPlan)();
    hydratePhotos();
    if (S.ui.tab === "storage") stkFilterDom();
    if (ceb()) translateDom(app, true);
    document.querySelectorAll(".nav button").forEach((b) => {
      if (b.dataset.tab === S.ui.tab) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
    });
    window.scrollTo(0, y);
  }
  function setTab(t) {
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
    delete data.ui;
    return JSON.stringify({ app: "handa", v: 1, saved: new Date().toISOString(), data }, null, 1);
  }
  function openSettings() {
    document.getElementById("theme").value = S.settings.theme;
    document.getElementById("size").value = S.settings.size;
    document.getElementById("motion").value = S.settings.motion || "auto";
    document.getElementById("lang").value = S.settings.lang || "en";
    document.getElementById("backup").value = backupText();
    document.getElementById("restoreText").value = "";
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
      family: { meet1: f.meet1, meet2: f.meet2, meet3: f.meet3, outName: f.outName, outPhone: f.outPhone,
        members: f.members.map(({ name, phone, notes }) => ({ name, phone, notes })), nums: f.nums.map(({ label, phone }) => ({ label, phone })) },
      places: S.places.map(({ label, note, lat, lng }) => ({ label, note, lat, lng })) };
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
    ["meet1", "meet2", "meet3", "outName", "outPhone"].forEach((k) => { if (!f[k] && n[k]) { f[k] = String(n[k]); added++; } });
    const key = (s) => String(s || "").toLowerCase().replace(/\s+/g, "");
    (n.members || []).forEach((m) => { if (m && m.name && !f.members.some((x) => key(x.name) === key(m.name))) { f.members.push({ id: uid(), name: String(m.name), phone: String(m.phone || ""), notes: String(m.notes || ""), bag: false }); added++; } });
    (n.nums || []).forEach((m) => { if (m && m.phone && !f.nums.some((x) => key(x.phone) === key(m.phone))) { f.nums.push({ id: uid(), label: String(m.label || ""), phone: String(m.phone) }); added++; } });
    (pack.places || []).forEach((p) => { if (p && p.label && !S.places.some((x) => key(x.label) === key(p.label) && String(x.lat) === String(p.lat))) { S.places.push({ id: uid(), label: String(p.label), note: String(p.note || ""), lat: p.lat ?? "", lng: p.lng ?? "" }); added++; } });
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
    const places = S.places.filter((p) => p.label).map((p) => `<li><b>${esc(p.label)}</b> ${esc(p.note || "")} ${p.lat != null && p.lat !== "" ? `<small>${esc(p.lat)}, ${esc(p.lng)}</small>` : ""}</li>`).join("");
    return `<h1>${esc(L.title)}</h1>
      <div class="sg"><div><h2>${esc(L.meet)}</h2>${line(L.m1, f.meet1)}${line(L.m2, f.meet2)}${line(L.m3, f.meet3)}${line(L.out, [f.outName, f.outPhone].filter(Boolean).join(" "))}</div>
      <div><h2>${esc(L.people)}</h2><ul>${ppl}</ul></div></div>
      <div class="sg"><div><h2>${esc(L.nums)}</h2><ul><li><b>${esc(L.emergency)}</b></li>${nums}</ul></div>
      <div><h2>${esc(L.places)}</h2><ul>${places || `<li class="blank">${esc(L.none)}</li>`}</ul></div></div>
      <div class="sg">${L.blocks.map(([h, items]) => `<div class="sb"><h2>${esc(h)}</h2><ul>${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
      <h2>${esc(L.bag)}</h2><p>${L.bagItems.map((x, i) => `${i + 1} ${esc(x)}`).join(" · ")}</p>
      <p class="foot">${esc(L.foot)}</p>`;
  }
  function printSheet() {
    let el = document.getElementById("sheet");
    if (!el) { el = document.createElement("div"); el.id = "sheet"; document.body.appendChild(el); }
    el.innerHTML = sheetHtml();
    document.body.classList.add("print-sheet");
    setTimeout(() => window.print(), 200);
  }
  window.addEventListener("afterprint", () => document.body.classList.remove("print-sheet"));

  /* ---------- events ---------- */
  document.addEventListener("click", (e) => {
    const im = e.target.closest && e.target.closest(".ph img");
    if (im) { im.parentElement.classList.toggle("big"); return; }
    const el = e.target.closest("[data-a]");
    if (!el) return;
    const d = el.dataset;
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
      case "stktype": S.ui.stkType = d.v; save(); render(); break;
      case "rmstock": { const r = S.stock.splice(Number(d.idx), 1)[0]; if (r) delete S.ui.open["s_" + r.id]; save(); render(); break; }
      case "addplace": S.places.push({ id: uid(), label: "", note: "", lat: "", lng: "" }); save(); render(); break;
      case "rmplace": S.places.splice(Number(d.idx), 1); save(); render(); break;
      case "placegps": {
        if (!navigator.geolocation) { toast("This phone can't find its location here."); break; }
        const i = Number(d.idx); toast("Finding your location…");
        navigator.geolocation.getCurrentPosition((pos) => {
          if (S.places[i]) { S.places[i].lat = pos.coords.latitude.toFixed(5); S.places[i].lng = pos.coords.longitude.toFixed(5); save(); render(); toast("Saved. Write these numbers on paper too."); }
        }, () => toast("Couldn't get the location. Allow location for this app and try outdoors."), { enableHighAccuracy: true, timeout: 20000, maximumAge: 60000 });
        break;
      }
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
      case "settings": openSettings(); break;
      case "closesettings": dlg.close ? dlg.close() : dlg.removeAttribute("open"); break;
      case "copybackup": {
        const ta = document.getElementById("backup");
        ta.select();
        (navigator.clipboard ? navigator.clipboard.writeText(ta.value) : Promise.reject()).then(
          () => toast("Backup copied. Paste it into a message to yourself."),
          () => { document.execCommand && document.execCommand("copy"); toast("Backup copied."); });
        break;
      }
      case "dlbackup": {
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
        if (confirm("Erase everything you entered on this phone? This can't be undone.")) {
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
    navigator.serviceWorker.register("sw.js").then((reg) => { watch(reg.installing); reg.addEventListener("updatefound", () => watch(reg.installing)); })
      .catch(() => setSt("Offline mode could not start. This browser or page may block it."));
    navigator.serviceWorker.ready.then(() => savedCount().then((n) => setSt(n ? "Ready: works without internet (" + n + " files saved)" : "Ready: works without internet")));
    setTimeout(() => { if (!window._st) setSt("Not saved for offline yet. Reload once with internet. If this stays, the files are not on an https address, or this browser blocks saving."); }, 6000);
  }
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

  /* ---------- start ---------- */
  applySettings();
  if (location.hash && VIEWS[location.hash.slice(1)]) S.ui.tab = location.hash.slice(1);
  render(); playEnter();
  if (!storageOk) toast("This phone is blocking saving. Your changes will be lost when you close the app.");
})();
