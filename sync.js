/* Andam sync: log in with a name + passphrase and your info follows you to any phone.
   - The phone turns name + passphrase into keys (PBKDF2). The passphrase never leaves the phone.
   - Your data is encrypted on the phone (AES-GCM) before it is sent. The server only keeps scrambled text.
   - Two phones that changed things at the same time are merged field by field. */
function AndamSync(ctx) {
  "use strict";
  const SKEY = "handa.sync";
  const ITER = 250000;
  const EXCL = ["ui", "alerts", "nearby", "news", "settings"]; // stays on each phone
  const T = (s) => ctx.tx(s), E = (s) => ctx.esc(s);
  const enc = new TextEncoder(), dec = new TextDecoder();

  /* ---------- small helpers ---------- */
  const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  const unhex = (h) => Uint8Array.from(h.match(/../g).map((x) => parseInt(x, 16)));
  const b64 = (buf) => { const u = new Uint8Array(buf); let s = ""; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); };
  const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  const sha = async (str) => hex(await crypto.subtle.digest("SHA-256", enc.encode(str)));
  const norm = (n) => String(n || "").normalize("NFKC").trim().toLowerCase().replace(/\s+/g, " ");
  const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
  const stable = (v) => JSON.stringify(v, (k, x) => (isObj(x) ? Object.keys(x).sort().reduce((o, key) => { o[key] = x[key]; return o; }, {}) : x));
  const eq = (a, b) => stable(a) === stable(b);
  const hasCrypto = () => !!(window.crypto && crypto.subtle && window.TextEncoder);

  /* ---------- what is kept on this phone about the login ---------- */
  let SY = { url: "", name: "", nameId: "", auth: "", key: "", v: 0, base: "", t: "", safety: null };
  try { Object.assign(SY, JSON.parse(localStorage.getItem(SKEY) || "{}")); } catch (e) { /* start clean */ }
  const persist = () => { try { localStorage.setItem(SKEY, JSON.stringify(SY)); } catch (e) { /* low storage */ } };
  const loggedIn = () => !!(SY.nameId && SY.auth && SY.key);
  const serverUrl = () => {
    const u = String(SY.url || window.ANDAM_SYNC_URL || "").trim();
    return /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(u) ? u : "";
  };
  const configured = () => !!serverUrl();

  /* ---------- what is synced ---------- */
  const snap = (S) => { const o = JSON.parse(JSON.stringify(S)); EXCL.forEach((k) => delete o[k]); return o; };
  const stripIds = (o) => { const c = JSON.parse(JSON.stringify(o)); if (c.family && Array.isArray(c.family.nums)) c.family.nums = c.family.nums.map((n) => ({ label: n.label, phone: n.phone })); return c; };
  const pristine = () => eq(stripIds(snap(ctx.get())), stripIds(snap(ctx.fresh())));

  /* ---------- three-way merge: base (last synced), local (this phone), remote (server) ---------- */
  const idArr = (a) => Array.isArray(a) && a.every((x) => isObj(x) && x.id != null);
  function m3(b, l, r) {
    if (eq(l, r)) return l;
    if (eq(b, l)) return r;
    if (eq(b, r)) return l;
    if (isObj(l) && isObj(r)) {
      const bb = isObj(b) ? b : {}, out = {};
      new Set([...Object.keys(l), ...Object.keys(r)]).forEach((k) => { const v = m3(bb[k], l[k], r[k]); if (v !== undefined) out[k] = v; });
      return out;
    }
    if (Array.isArray(l) && Array.isArray(r) && idArr(l) && idArr(r) && (b == null || idArr(b))) return mArr(b || [], l, r);
    return l; // both changed the same thing: this phone wins (a safety copy is kept)
  }
  function mArr(b, l, r) {
    const mp = (a) => new Map(a.map((x) => [x.id, x]));
    const B = mp(b), R = mp(r), seen = new Set(), out = [];
    l.forEach((x) => {
      seen.add(x.id);
      const rx = R.get(x.id), bx = B.get(x.id);
      if (rx) out.push(m3(bx, x, rx));
      else if (!bx || !eq(bx, x)) out.push(x); // added here, or changed here while deleted there
    });
    r.forEach((x) => {
      if (seen.has(x.id)) return;
      const bx = B.get(x.id);
      if (!bx || !eq(bx, x)) out.push(x);        // added there, or changed there while deleted here
    });
    return out;
  }
  function dedupeNums(o) {
    const f = o.family; if (!f || !Array.isArray(f.nums)) return;
    const seen = new Set();
    f.nums = f.nums.filter((n) => { const k = norm(n.label) + "|" + String(n.phone || "").replace(/\D/g, ""); if (seen.has(k)) return false; seen.add(k); return true; });
  }
  function apply(obj) {
    const S = ctx.get(), ns = ctx.merge(ctx.defaults(), JSON.parse(JSON.stringify(obj)));
    EXCL.forEach((k) => { ns[k] = S[k]; });
    dedupeNums(ns);
    ctx.replace(ns);
  }

  /* ---------- keys and encryption ---------- */
  async function derive(name, pass) {
    const n = norm(name);
    const base = await crypto.subtle.importKey("raw", enc.encode(String(pass).normalize("NFKC")), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", iterations: ITER, salt: enc.encode("andam-sync-v1|" + n) }, base, 256);
    const master = hex(bits);
    return { nameId: await sha("andam-name|" + n), auth: await sha("andam-auth|" + master), key: await sha("andam-key|" + master) };
  }
  const aesKey = (keyHex) => crypto.subtle.importKey("raw", unhex(keyHex), "AES-GCM", false, ["encrypt", "decrypt"]);
  async function encrypt(obj, keyHex) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await aesKey(keyHex || SY.key), enc.encode(JSON.stringify(obj)));
    return JSON.stringify({ v: 1, iv: b64(iv), ct: b64(ct) });
  }
  async function decrypt(blob, keyHex) {
    const j = JSON.parse(blob);
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(j.iv) }, await aesKey(keyHex || SY.key), unb64(j.ct));
    return JSON.parse(dec.decode(pt));
  }

  /* ---------- talking to the server ---------- */
  async function call(body) {
    const url = serverUrl();
    if (!url) throw { code: "nourl" };
    const ac = new AbortController(), timer = setTimeout(() => ac.abort(), 30000);
    let r;
    try { r = await fetch(url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(body), signal: ac.signal }); }
    catch (e) { throw { code: "net" }; } finally { clearTimeout(timer); }
    if (!r.ok) throw { code: "net" };
    let j; try { j = await r.json(); } catch (e) { throw { code: "server" }; }
    return j;
  }

  /* ---------- status ---------- */
  const st = { busy: false, err: "", minutes: 0, form: { name: "", pass: "", pass2: "" }, show: false, passForm: false, msg: "" };
  const MSG = {
    nourl: "The sync address is not set yet.",
    net: "No internet. Try again when you are online.",
    none: "No account with that name. Check the spelling, or tap Create account.",
    auth: "Wrong passphrase. Try again.",
    locked: "Too many wrong tries. Please wait and try again.",
    taken: "That name is already used. Add your family name or a number.",
    full: "This sync server is full. Ask the person who set it up.",
    big: "Your info is too big to save online.",
    busy: "The server is busy. Try again in a moment.",
    server: "The sync server gave an odd answer. Check the address and try again.",
    bad: "Something went wrong. Try again.",
    shortname: "The name needs at least 3 letters.",
    shortpass: "The passphrase needs at least 8 characters.",
    samepass: "The passphrase must be different from the name.",
    nocrypto: "This browser can't do secure sync. Open Andam in Chrome.",
    nomatch: "The two passphrases are not the same.",
    read: "Could not open the saved info. Check the passphrase."
  };
  const errCode = (e) => (e && (e.err || e.code)) || "bad";
  function fail(e) {
    const c = errCode(e);
    st.err = MSG[c] ? c : "bad"; st.minutes = Number(e && e.minutes) || 0; st.busy = false;
    redraw();
  }

  /* ---------- core: push and pull ---------- */
  let running = false, again = false;
  async function takeRemote(r, local) {
    let remote = null;
    if (r.blob) remote = (await decrypt(r.blob)).data;
    if (!remote) { SY.v = r.v; persist(); return; }
    let base = null; try { base = SY.base ? JSON.parse(SY.base) : null; } catch (e) { base = null; }
    if (!base) base = snap(ctx.fresh());
    const merged = m3(base, local, remote);
    if (!eq(base, local) && !eq(base, remote) && !eq(local, remote)) SY.safety = { t: new Date().toISOString(), local: stable(local), remote: stable(remote) };
    apply(merged);
    SY.v = r.v; SY.base = stable(remote); persist();
  }
  async function runSync() {
    if (!loggedIn() || running) { again = again || running; return; }
    running = true; st.busy = true; st.err = ""; redraw();
    try {
      for (let i = 0; i < 4; i++) {
        const local = snap(ctx.get()), dirty = stable(local) !== SY.base;
        if (dirty && SY.v) {
          const blob = await encrypt({ data: local, t: new Date().toISOString() });
          const r = await call({ op: "put", nameId: SY.nameId, auth: SY.auth, base: SY.v, blob });
          if (r.ok) { SY.v = r.v; SY.base = stable(local); SY.t = new Date().toISOString(); persist(); break; }
          if (r.err === "conflict") { await takeRemote(r, local); continue; }
          throw r;
        } else {
          const r = await call({ op: "get", nameId: SY.nameId, auth: SY.auth });
          if (!r.ok) throw r;
          if (r.v !== SY.v) await takeRemote(r, local);
          SY.t = new Date().toISOString(); persist();
          if (stable(snap(ctx.get())) === SY.base) break;
        }
      }
    } catch (e) {
      if (e && e.name === "OperationError") e = { code: "read" };
      const c = errCode(e);
      if (c === "auth" || c === "none") { st.err = c; }
      else st.err = MSG[c] ? c : "bad";
      st.minutes = Number(e && e.minutes) || 0;
    }
    running = false; st.busy = false; redraw();
    if (again) { again = false; setTimeout(runSync, 800); }
  }

  /* ---------- when to sync ---------- */
  let timer = null, lastPull = 0;
  function touch() {
    if (!loggedIn()) return;
    clearTimeout(timer);
    timer = setTimeout(() => { if (navigator.onLine !== false && stable(snap(ctx.get())) !== SY.base) runSync(); }, 5000);
  }
  function pullSoon() {
    if (!loggedIn() || navigator.onLine === false || Date.now() - lastPull < 20000) return;
    lastPull = Date.now(); runSync();
  }
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") pullSoon(); else if (loggedIn() && stable(snap(ctx.get())) !== SY.base && navigator.onLine !== false) runSync(); });
  window.addEventListener("online", pullSoon);
  setTimeout(pullSoon, 2500);

  /* ---------- sign up, log in, passphrase, log out ---------- */
  function check(name, pass) {
    if (!hasCrypto()) return "nocrypto";
    if (!serverUrl()) return "nourl";
    if (norm(name).length < 3) return "shortname";
    if (String(pass).length < 8) return "shortpass";
    if (norm(pass) === norm(name)) return "samepass";
    return "";
  }
  async function signup() {
    const { name, pass } = st.form, bad = check(name, pass);
    if (bad) { st.err = bad; return redraw(); }
    st.busy = true; st.err = ""; redraw();
    try {
      const k = await derive(name, pass), local = snap(ctx.get());
      const blob = await encrypt({ data: local, t: new Date().toISOString() }, k.key);
      const r = await call({ op: "signup", nameId: k.nameId, auth: k.auth, blob });
      if (!r.ok) throw r;
      Object.assign(SY, { name: String(name).trim(), nameId: k.nameId, auth: k.auth, key: k.key, v: r.v, base: stable(local), t: new Date().toISOString(), safety: null });
      persist(); st.form = { name: "", pass: "", pass2: "" }; st.busy = false; st.msg = "Account created. Your info is saved online.";
      redraw(); ctx.rerender();
    } catch (e) { fail(e); }
  }
  async function login() {
    const { name, pass } = st.form, bad = check(name, pass);
    if (bad) { st.err = bad; return redraw(); }
    st.busy = true; st.err = ""; redraw();
    try {
      const k = await derive(name, pass);
      const r = await call({ op: "get", nameId: k.nameId, auth: k.auth });
      if (!r.ok) throw r;
      let remote = null;
      try { remote = r.blob ? (await decrypt(r.blob, k.key)).data : null; } catch (e) { throw { code: "read" }; }
      const local = snap(ctx.get());
      if (remote) {
        if (pristine()) apply(remote);
        else {
          const merged = m3(snap(ctx.fresh()), local, remote);
          SY.safety = { t: new Date().toISOString(), local: stable(local), remote: stable(remote) };
          apply(merged);
        }
      }
      Object.assign(SY, { name: String(name).trim(), nameId: k.nameId, auth: k.auth, key: k.key, v: r.v, base: stable(remote || local), t: new Date().toISOString() });
      persist(); st.form = { name: "", pass: "", pass2: "" }; st.busy = false; st.msg = "You are logged in. Your info is on this phone now.";
      redraw(); ctx.rerender(); touch();
    } catch (e) { fail(e); }
  }
  function clearLogin() { SY = { url: SY.url, name: "", nameId: "", auth: "", key: "", v: 0, base: "", t: "", safety: null }; persist(); }
  async function changePass() {
    const { pass, pass2 } = st.form;
    if (String(pass).length < 8) { st.err = "shortpass"; return redraw(); }
    if (pass !== pass2) { st.err = "nomatch"; return redraw(); }
    if (norm(pass) === norm(SY.name)) { st.err = "samepass"; return redraw(); }
    st.busy = true; st.err = ""; redraw();
    try {
      await runSyncWait();
      const k = await derive(SY.name, pass), local = snap(ctx.get());
      const blob = await encrypt({ data: local, t: new Date().toISOString() }, k.key);
      const r = await call({ op: "pass", nameId: SY.nameId, auth: SY.auth, newAuth: k.auth, blob });
      if (!r.ok) throw r;
      Object.assign(SY, { auth: k.auth, key: k.key, v: r.v, base: stable(local), t: new Date().toISOString() });
      persist(); st.form = { name: "", pass: "", pass2: "" }; st.passForm = false; st.busy = false; st.msg = "Passphrase changed. Use the new one on your other phones.";
      redraw();
    } catch (e) { fail(e); }
  }
  async function runSyncWait() { while (running) await new Promise((r) => setTimeout(r, 200)); await runSync(); if (st.err) throw { code: st.err }; }
  async function delOnline() {
    if (!confirm(T("Delete your online copy? Your info stays on this phone, but it will no longer be saved online and other phones will stop syncing."))) return;
    st.busy = true; st.err = ""; redraw();
    try {
      const r = await call({ op: "del", nameId: SY.nameId, auth: SY.auth });
      if (!r.ok) throw r;
      clearLogin(); st.busy = false; st.msg = "Your online copy was deleted."; redraw(); ctx.rerender();
    } catch (e) { fail(e); }
  }
  function logout(quiet) {
    if (!quiet && !confirm(T("Log out on this phone? Your info stays on this phone and online."))) return;
    clearLogin(); st.msg = quiet ? "" : "You are logged out."; st.err = ""; redraw(); ctx.rerender();
  }
  function undoMerge() {
    if (!SY.safety || !confirm(T("Go back to this phone's info from before the last merge?"))) return;
    try { apply(JSON.parse(SY.safety.local)); SY.safety = null; persist(); st.msg = "Done. This phone's older info is back."; redraw(); touch(); } catch (e) { st.err = "bad"; redraw(); }
  }

  /* ---------- screens ---------- */
  const when = (iso) => {
    if (!iso) return "";
    const d = new Date(iso), now = new Date();
    const hm = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    return d.toDateString() === now.toDateString() ? hm : d.toLocaleDateString([], { month: "short", day: "numeric" }) + " " + hm;
  };
  function statusLine() {
    if (st.busy) return T("Syncing…");
    if (st.err) return T(MSG[st.err] || MSG.bad) + (st.err === "locked" && st.minutes ? " (" + st.minutes + " " + T("minutes") + ")" : "");
    if (navigator.onLine === false) return T("No internet. Saved on this phone, will sync later.");
    if (loggedIn() && stable(snap(ctx.get())) !== SY.base) return T("Waiting to save online…");
    return SY.t ? T("Saved online") + " " + when(SY.t) : "";
  }
  function dlgHtml() {
    const bar = `<div class="idbar"><b>${E(T("MY LOGIN"))}</b><button class="btn small ghost" data-a="sy_close">${E(T("Close"))}</button></div>`;
    const note = st.msg ? `<p class="syncok" role="status">${E(T(st.msg))}</p>` : "";
    const err = st.err ? `<p class="syncerr" role="alert">${E(statusLine())}</p>` : "";
    const dis = st.busy ? "disabled" : "";
    if (!configured()) {
      return `<div class="idin">${bar}
        <p>${E(T("Logging in keeps your info on any phone. It needs a sync address first."))}</p>
        <label class="field"><span>${E(T("Sync address"))}</span><input type="text" id="sy_url" value="${E(SY.url || "")}" placeholder="https://script.google.com/macros/s/…/exec" autocomplete="off" autocapitalize="off" spellcheck="false"></label>
        <div class="actions"><button class="btn" data-a="sy_saveurl">${E(T("Save address"))}</button></div>
        ${SY.url ? `<p class="syncerr">${E(T("That does not look like a Google Apps Script address."))}</p>` : ""}
        <p class="hint">${E(T("The person who set up Andam gets this address when they set up the sync server. Ask them for it."))}</p></div>`;
    }
    if (loggedIn()) {
      return `<div class="idin">${bar}${note}
        <p><b>${E(T("Logged in as"))} ${E(SY.name)}</b></p>
        <p class="syncst" role="status">${E(statusLine() || T("Ready."))}</p>
        <div class="actions"><button class="btn" data-a="sy_now" ${dis}>${E(T("Sync now"))}</button><button class="btn ghost" data-a="sy_logout" ${dis}>${E(T("Log out on this phone"))}</button></div>
        <p class="hint">${E(T("Your info is scrambled on this phone before it is sent. Photos stay on each phone."))}</p>
        ${st.passForm ? `<h3>${E(T("New passphrase"))}</h3>
          <label class="field"><span>${E(T("New passphrase"))}</span><input type="${st.show ? "text" : "password"}" id="sy_pass" value="${E(st.form.pass)}" autocomplete="new-password"></label>
          <label class="field"><span>${E(T("Type it again"))}</span><input type="${st.show ? "text" : "password"}" id="sy_pass2" value="${E(st.form.pass2)}" autocomplete="new-password"></label>
          <div class="actions"><button class="btn" data-a="sy_passgo" ${dis}>${E(T("Save new passphrase"))}</button><button class="btn ghost" data-a="sy_passform">${E(T("Cancel"))}</button></div>`
          : `<div class="actions"><button class="btn small ghost" data-a="sy_passform">${E(T("Change passphrase"))}</button></div>`}
        ${SY.safety ? `<div class="actions"><button class="btn small ghost" data-a="sy_undo">${E(T("Undo the last merge"))}</button></div><p class="hint">${E(T("Two phones changed things at the same time, so Andam joined them. This brings back this phone's older info."))}</p>` : ""}
        <h3>${E(T("Remove my online copy"))}</h3>
        <button class="btn danger small" data-a="sy_del" ${dis}>${E(T("Delete my online copy"))}</button></div>`;
    }
    const f = st.form;
    return `<div class="idin">${bar}${note}
      <p>${E(T("Log in to keep your family info on any phone. You only type it once."))}</p>
      <label class="field"><span>${E(T("Your login name"))}</span><input type="text" id="sy_name" value="${E(f.name)}" placeholder="${E(T("Example: santos-family-leyte"))}" autocomplete="username" autocapitalize="off" spellcheck="false"></label>
      <label class="field"><span>${E(T("Your passphrase (at least 8 letters)"))}</span><input type="${st.show ? "text" : "password"}" id="sy_pass" value="${E(f.pass)}" placeholder="${E(T("Example: three or four words together"))}" autocomplete="current-password" autocapitalize="off" spellcheck="false"></label>
      <div class="actions"><button class="btn small ghost" data-a="sy_show">${E(st.show ? T("Hide passphrase") : T("Show passphrase"))}</button></div>
      ${err}
      <div class="actions"><button class="btn" data-a="sy_login" ${dis}>${E(st.busy ? T("Working…") : T("Log in"))}</button><button class="btn ghost" data-a="sy_signup" ${dis}>${E(T("Create account"))}</button></div>
      <p class="hint"><b>${E(T("Write your passphrase down and keep it safe."))}</b> ${E(T("If you forget it, nobody can get your info back, not even the person who set this up."))}</p>
      <p class="hint">${E(T("Pick a login name nobody else would pick. Use a passphrase that is hard to guess."))}</p>
      <details class="hint"><summary>${E(T("Sync address"))}</summary>
        <label class="field"><input type="text" id="sy_url" value="${E(SY.url || window.ANDAM_SYNC_URL || "")}" autocomplete="off" autocapitalize="off" spellcheck="false"></label>
        <div class="actions"><button class="btn small ghost" data-a="sy_saveurl">${E(T("Save address"))}</button></div></details></div>`;
  }
  function readInputs() {
    const g = (id) => { const el = document.getElementById(id); return el ? el.value : null; };
    const n = g("sy_name"), p = g("sy_pass"), p2 = g("sy_pass2");
    if (n !== null) st.form.name = n;
    if (p !== null) st.form.pass = p;
    if (p2 !== null) st.form.pass2 = p2;
  }
  function redraw() {
    const d = document.getElementById("syncdlg");
    if (d && d.open) { d.innerHTML = dlgHtml(); if (ctx.ceb()) ctx.translateDom(d, true); }
    const s = document.getElementById("syncStatus"); if (s) s.textContent = settingsLine();
  }
  function open() {
    const d = document.getElementById("syncdlg"); if (!d) return;
    st.err = ""; st.msg = ""; st.passForm = false;
    d.innerHTML = dlgHtml(); if (ctx.ceb()) ctx.translateDom(d, true);
    if (typeof d.showModal === "function") { if (!d.open) d.showModal(); } else d.setAttribute("open", "");
  }
  function close() { const d = document.getElementById("syncdlg"); if (d && d.open) d.close(); }
  const settingsLine = () => (!configured() ? T("Not set up yet.") : loggedIn() ? T("Logged in as") + " " + SY.name + (statusLine() ? " · " + statusLine() : "") : T("Not logged in."));

  function cardHtml() {
    if (!configured()) return "";
    if (loggedIn()) {
      return `<button class="block synccard ok" data-a="sy_open"><b>${E(T("Logged in as"))} ${E(SY.name)}</b><span class="hint">${E(statusLine() || T("Ready."))}</span></button>`;
    }
    if ((ctx.get().ui || {}).syncHide) return "";
    return `<div class="block synccard"><h3>${E(T("Keep your info on any phone"))}</h3><p>${E(T("Log in once, and your family info follows you. No need to type it again on a new phone."))}</p><div class="actions"><button class="btn" data-a="sy_open">${E(T("Log in or create account"))}</button><button class="btn ghost small" data-a="sy_hide">${E(T("Not now"))}</button></div></div>`;
  }

  /* ---------- buttons ---------- */
  function act(a) {
    readInputs();
    switch (a) {
      case "sy_open": open(); break;
      case "sy_close": close(); break;
      case "sy_show": st.show = !st.show; redraw(); break;
      case "sy_login": login(); break;
      case "sy_signup": signup(); break;
      case "sy_now": lastPull = Date.now(); runSync(); break;
      case "sy_logout": logout(false); break;
      case "sy_passform": st.passForm = !st.passForm; st.form.pass = ""; st.form.pass2 = ""; st.err = ""; redraw(); break;
      case "sy_passgo": changePass(); break;
      case "sy_del": delOnline(); break;
      case "sy_undo": undoMerge(); break;
      case "sy_saveurl": {
        const el = document.getElementById("sy_url");
        SY.url = el ? el.value.trim() : ""; persist(); st.err = ""; redraw(); ctx.rerender();
        if (configured()) { st.msg = "Address saved."; redraw(); }
        break;
      }
      case "sy_hide": { const S = ctx.get(); S.ui.syncHide = true; ctx.save(); ctx.rerender(); break; }
    }
  }

  return { act, touch, cardHtml, open, loggedIn, configured, logoutQuiet: () => logout(true), settingsLine, _m3: m3, _snap: snap };
}
