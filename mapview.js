/* Andam v19: the map.
   Shows your saved places (evacuation centers, safe places, hazards), warnings from the last check,
   your location, and clinics, police, fire stations and shelters nearby (OpenStreetMap data, saved for offline).
   Needs internet for map pictures. Offline you still get the list with distance and direction.
   Uses Leaflet (BSD-2). The app gives this file its tools through open(ctx). */

const MAPV = (() => {
  let C = null, map = null, tiles = null, addMode = false, addAt = null, tmp = null, addLabel = "", addKind = "evac";
  let tileOk = 0, tileBad = 0, busy = "", radar = null, cloud = null, noteMsg = "";
  const grp = {}, mk = {};
  const el = (id) => document.getElementById(id);

  const FAC = {
    hospital: ["Hospital", "#d62c3a", "H"], clinic: ["Clinic", "#d62c3a", "+"], police: ["Police", "#2b4a9a", "P"],
    fire_station: ["Fire station", "#e08a00", "F"], shelter: ["Shelter", "#1f9d55", "S"], assembly: ["Assembly point", "#1f9d55", "A"],
    school: ["School (often used as an evacuation center. Confirm with your MDRRMO.)", "#6b7280", "s"]
  };
  const HCOL = { flood: "#1d6fd1", landslide: "#8a5a2b", surge: "#0e8f9a", fire: "#e5531a", evac: "#1f9d55", safe: "#7a4fd1", "": "#0F5C63" };
  const HGLY = { flood: "≈", landslide: "▲", surge: "≈", fire: "!", evac: "E", safe: "✓", "": "•" };
  const LVCOL = ["#6b7280", "#6b7280", "#e0a800", "#e5531a", "#b00020"];
  const LAYERS = [["places", "My places"], ["alerts", "Warnings"], ["near", "Help nearby"], ["radar", "Rain radar"], ["cloud", "Clouds"]];
  const DEF = { places: 1, alerts: 1, near: 1 };

  const tx = (s) => C.tx(s);
  const esc = (s) => C.esc(s);
  const S = () => C.S;
  const layers = () => { const u = S().ui; if (!u.mapLayers) u.mapLayers = { ...DEF }; return u.mapLayers; };

  /* ---------- distance and direction ---------- */
  const rad = (d) => (d * Math.PI) / 180;
  const bearing = (a, b, c, d) => {
    const y = Math.sin(rad(d - b)) * Math.cos(rad(c)), x = Math.cos(rad(a)) * Math.sin(rad(c)) - Math.sin(rad(a)) * Math.cos(rad(c)) * Math.cos(rad(d - b));
    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  };
  const DIRS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const fmtKm = (k) => (k < 1 ? Math.max(10, Math.round(k * 100) * 10) + " m" : k < 10 ? (Math.round(k * 10) / 10) + " km" : Math.round(k) + " km");
  function away(p, r) {
    if (!r) return "";
    const k = ALERTS.hav(r.lat, r.lng, p.lat, p.lng);
    return fmtKm(k) + " " + DIRS[Math.round(bearing(r.lat, r.lng, p.lat, p.lng) / 45) % 8];
  }
  function ref() {
    const me = S().ui.me;
    if (me && Date.now() - me.at < 6 * 3600000) return { lat: me.lat, lng: me.lng, name: tx("my location"), me: true };
    const h = S().watch.find((w) => w.home) || S().watch[0];
    return h ? { lat: Number(h.lat), lng: Number(h.lng), name: h.name } : null;
  }
  const ios = () => /iPad|iPhone|iPod/.test(navigator.userAgent);
  const geoHref = (p) => ios() ? "https://maps.apple.com/?ll=" + p.lat + "," + p.lng + "&q=" + encodeURIComponent(p.name || "Place")
    : "geo:" + p.lat + "," + p.lng + "?q=" + p.lat + "," + p.lng + "(" + encodeURIComponent(p.name || "Place") + ")";

  /* ---------- the points to show ---------- */
  function hazName(h) { const f = C.HAZ.find((x) => x[0] === h); return f ? tx(f[1]) : ""; }
  function myPlaces() {
    return S().places.filter((p) => p.lat !== "" && p.lat != null && p.lng !== "" && !isNaN(Number(p.lat)) && !isNaN(Number(p.lng)))
      .map((p) => ({ key: "p:" + p.id, id: p.id, src: "place", name: p.label || tx("Place"), sub: hazName(p.hazard), note: p.note || "", lat: Number(p.lat), lng: Number(p.lng), haz: p.hazard || "" }));
  }
  function nearby() {
    const seen = {}, out = [];
    (S().nearby || []).forEach((e) => e.items.forEach((i) => { if (seen[i.i]) return; seen[i.i] = 1; out.push({ key: "n:" + i.i, src: "near", name: i.n || tx(FAC[i.k][0]), kind: i.k, sub: tx(FAC[i.k][0]), lat: i.la, lng: i.lo }); }));
    return out;
  }
  function warnings() {
    const out = [], seen = {};
    S().watch.forEach((w) => { const r = S().alerts[w.id]; if (!r) return; r.items.forEach((it) => { if (!it.ll) return; const k = it.k + it.ll.join(","); if (seen[k]) return; seen[k] = 1; out.push({ key: "w:" + k, src: "alert", it, lat: it.ll[0], lng: it.ll[1] }); }); });
    return out;
  }

  /* ---------- markers ---------- */
  function icon(col, glyph, cls) { const pin = cls === "mk-pin"; return L.divIcon({ className: "mk " + cls, html: '<i style="background:' + col + '"><b>' + glyph + "</b></i>", iconSize: [28, 28], iconAnchor: pin ? [14, 30] : [14, 14], popupAnchor: [0, pin ? -28 : -14] }); }
  function pop(p, extra) {
    const r = ref();
    return "<b>" + esc(p.name) + "</b>" + (p.sub ? "<br><small>" + esc(p.sub) + "</small>" : "") + (p.note ? "<br>" + esc(p.note) : "") + (r ? "<br><small>" + esc(away(p, r)) + " " + esc(tx("from")) + " " + esc(r.name) + "</small>" : "") + (p.src === "place" ? '<div class="ppho" data-pk="place_' + esc(p.id) + '"></div>' : "") +
      '<div class="mpop"><a href="' + esc(geoHref(p)) + '">' + esc(tx("Open in maps")) + "</a>" + (extra || "") + "</div>";
  }
  function draw() {
    if (!map) return;
    Object.keys(grp).forEach((k) => grp[k].clearLayers());
    Object.keys(mk).forEach((k) => delete mk[k]);
    const on = layers(), s = S();
    // watched places (home and others)
    s.watch.forEach((w) => {
      const m = L.marker([Number(w.lat), Number(w.lng)], { icon: icon("#0A3F45", "⌂", "mk-sq"), zIndexOffset: 100 }).bindPopup("<b>" + esc(w.name) + "</b><br><small>" + esc(tx("A place you watch for warnings")) + "</small>");
      grp.watch.addLayer(m);
    });
    if (s.ui.me) grp.me.addLayer(L.circleMarker([s.ui.me.lat, s.ui.me.lng], { radius: 8, color: "#fff", weight: 3, fillColor: "#1a73e8", fillOpacity: 1 }).bindPopup(esc(tx("You are here"))));
    myPlaces().forEach((p) => {
      const m = L.marker([p.lat, p.lng], { icon: icon(HCOL[p.haz] || HCOL[""], HGLY[p.haz] || "•", "mk-pin"), zIndexOffset: 200 })
        .bindPopup(pop(p, ' · <button class="linkbtn" data-m="rm" data-id="' + esc(p.id) + '">' + esc(tx("Remove")) + "</button>"));
      grp.places.addLayer(m); mk[p.key] = m;
    });
    nearby().forEach((p) => {
      const f = FAC[p.kind];
      const m = L.marker([p.lat, p.lng], { icon: icon(f[1], f[2], "mk-dot") }).bindPopup(pop(p));
      grp.near.addLayer(m); mk[p.key] = m;
    });
    warnings().forEach((p) => {
      const t = ALERTS.text(p.it, C.ceb);
      const m = L.marker([p.lat, p.lng], { icon: icon(LVCOL[p.it.lvl] || LVCOL[1], "!", "mk-dia") })
        .bindPopup("<b>" + esc(t.t) + "</b><br><small>" + esc(ALERTS.levelName(p.it.lvl, C.ceb)) + "</small><br>" + esc(t.b));
      grp.alerts.addLayer(m);
    });
    ["places", "alerts", "near"].forEach((k) => { if (on[k]) { if (!map.hasLayer(grp[k])) grp[k].addTo(map); } else if (map.hasLayer(grp[k])) map.removeLayer(grp[k]); });
  }

  /* ---------- panels under the map ---------- */
  function renderBar() {
    el("mapbar").innerHTML = "<h2>" + esc(tx("Map")) + '</h2><button class="btn small ghost" data-m="close">' + esc(tx("Close")) + "</button>";
  }
  function renderChips() {
    const on = layers();
    el("mapchips").innerHTML = '<div class="chips">' + LAYERS.map(([k, l]) => '<button class="chip" data-m="layer" data-k="' + k + '" aria-pressed="' + !!on[k] + '">' + esc(tx(l)) + "</button>").join("") + "</div>" +
      '<div class="actions"><button class="btn small" data-m="me">' + esc(tx("Find me")) + '</button><button class="btn small" data-m="near" ' + (busy === "near" ? "disabled" : "") + ">" + esc(busy === "near" ? tx("Searching…") : tx("Find help nearby")) + '</button><button class="btn small ' + (addMode ? "" : "ghost") + '" data-m="add">' + esc(tx("Add a place")) + "</button></div>";
  }
  function renderNote() {
    const bad = !navigator.onLine ? tx("No internet. The map pictures can't load, but your saved places and the list below still work.")
      : (tileBad >= 4 && !tileOk) ? tx("Map pictures didn't load. You may be offline or the map service may be busy. Your saved places and the list below still work.") : "";
    el("mapnote").innerHTML = (bad ? '<p class="alrt lv2">' + esc(bad) + "</p>" : "") + (noteMsg ? '<p class="hint">' + esc(noteMsg) + "</p>" : "");
  }
  function renderAdd() {
    const box = el("mapadd");
    if (!addMode) { box.innerHTML = ""; return; }
    box.innerHTML = '<div class="block"><p class="hint" style="margin:0">' + esc(addAt ? tx("Place chosen. Pick what it is and save it.") : tx("Tap the map where the place is.")) + "</p>" +
      '<label class="field"><span>' + esc(tx("Hazard or use")) + '</span><select id="maKind">' + C.HAZ.map(([v, l]) => '<option value="' + v + '" ' + (v === addKind ? "selected" : "") + ">" + esc(tx(l)) + "</option>").join("") + "</select></label>" +
      '<label class="field"><span>' + esc(tx("Name")) + '</span><input type="text" id="maName" value="' + esc(addLabel) + '" placeholder="' + esc(tx("For example: Isabel Central School")) + '"></label>' +
      '<div class="actions"><button class="btn small" data-m="addsave" ' + (addAt ? "" : "disabled") + ">" + esc(tx("Save place")) + '</button><button class="btn small ghost" data-m="addhere">' + esc(tx("Use my location")) + '</button><button class="btn small ghost" data-m="addcancel">' + esc(tx("Cancel")) + "</button></div></div>";
  }
  function renderList() {
    const r = ref(), s = S();
    const row = (p, sub) => '<li><button class="linkbtn" data-m="go" data-key="' + esc(p.key) + '"><b>' + esc(p.name) + "</b></button> <span class=\"hint\">" + esc(sub || "") + "</span>" +
      '<span class="dist">' + esc(away(p, r)) + '</span> <a class="mini" href="' + esc(geoHref(p)) + '">' + esc(tx("Open in maps")) + "</a></li>";
    const by = (a, b) => (r ? ALERTS.hav(r.lat, r.lng, a.lat, a.lng) - ALERTS.hav(r.lat, r.lng, b.lat, b.lng) : 0);
    const mine = myPlaces().sort(by), near = nearby().sort(by);
    const kinds = ["hospital", "clinic", "police", "fire_station", "shelter", "assembly", "school"];
    const lastAt = (s.nearby || []).reduce((m, e) => Math.max(m, e.at), 0);
    el("maplist").innerHTML = (r ? '<p class="hint">' + esc(tx("Distances from")) + " " + esc(r.name) + "." + (r.me ? "" : " " + esc(tx("Tap “Find me” to measure from where you are now."))) + "</p>" : "") +
      "<h3>" + esc(tx("Your saved places")) + "</h3>" +
      (mine.length ? "<ul class=\"maplist\">" + mine.map((p) => row(p, [p.sub, p.note].filter(Boolean).join(" · "))).join("") + "</ul>" : '<p class="empty">' + esc(tx("Nothing saved yet. Add an evacuation center, high ground or clinic.")) + "</p>") +
      "<h3>" + esc(tx("Help nearby")) + "</h3>" +
      (near.length ? '<p class="hint">' + esc(tx("Saved the last time you were online")) + ": " + esc(new Date(lastAt).toLocaleDateString()) + ". " + esc(tx("Data from OpenStreetMap can be incomplete or old. Confirm with your barangay or MDRRMO.")) + "</p>" +
        kinds.map((k) => { const g = near.filter((p) => p.kind === k).slice(0, k === "school" ? 6 : 8); return g.length ? "<h4>" + esc(tx(FAC[k][0])) + '</h4><ul class="maplist">' + g.map((p) => row(p, "")).join("") + "</ul>" : ""; }).join("")
        : '<p class="empty">' + esc(tx("Nothing saved yet. Tap “Find help nearby” while online.")) + "</p>");
  }
  function renderLegend() {
    const dot = (c, g, cl) => '<span class="mk mk-static ' + cl + '"><i style="background:' + c + '"><b>' + g + "</b></i></span>";
    el("maplegend").innerHTML = '<div class="legend">' +
      C.HAZ.map(([v, l]) => "<span>" + dot(HCOL[v], HGLY[v], "mk-pin") + esc(tx(l)) + "</span>").join("") +
      "<span>" + dot("#d62c3a", "H", "mk-dot") + esc(tx("Hospital")) + " / " + esc(tx("Clinic")) + "</span><span>" + dot("#2b4a9a", "P", "mk-dot") + esc(tx("Police")) + "</span><span>" + dot("#e08a00", "F", "mk-dot") + esc(tx("Fire station")) + "</span>" +
      "<span>" + dot("#1f9d55", "S", "mk-dot") + esc(tx("Shelter")) + "</span><span>" + dot("#6b7280", "s", "mk-dot") + esc(tx("School")) + "</span><span>" + dot("#e5531a", "!", "mk-dia") + esc(tx("Warnings")) + "</span></div>" +
      '<p class="hint">' + esc(tx("Schools are shown because many are used as evacuation centers. Your MDRRMO decides which ones open.")) + "</p>" +
      '<p class="hint">' + esc(tx("For maps that work with no internet at all, install the free Organic Maps app and download your province.")) + ' <a href="https://organicmaps.app/" target="_blank" rel="noopener">organicmaps.app</a></p>' +
      '<p class="hint">Map © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors · Leaflet · ' + esc(tx("Rain radar")) + ': <a href="https://www.rainviewer.com/" target="_blank" rel="noopener">RainViewer</a></p>';
  }
  function panels() { renderBar(); renderChips(); renderNote(); renderAdd(); renderList(); renderLegend(); }

  /* ---------- actions ---------- */
  let sayT; function say(m) { noteMsg = m; renderNote(); clearTimeout(sayT); sayT = setTimeout(() => { noteMsg = ""; if (map) renderNote(); }, 7000); }
  function findMe(done) {
    if (!navigator.geolocation) { C.toast(tx("This phone can't find its location here.")); return; }
    C.toast(tx("Finding your location…"));
    navigator.geolocation.getCurrentPosition((pos) => {
      const la = +pos.coords.latitude.toFixed(5), lo = +pos.coords.longitude.toFixed(5);
      S().ui.me = { lat: la, lng: lo, at: Date.now() }; C.save();
      if (done) done(la, lo); else { map.setView([la, lo], Math.max(map.getZoom(), 14), { animate: false }); }
      draw(); renderList();
    }, () => C.toast(tx("Couldn't get the location. Allow location for this app and try outdoors.")), { enableHighAccuracy: true, timeout: 20000, maximumAge: 60000 });
  }
  async function overpass(lat, lng) {
    const R = 6000, q = '[out:json][timeout:25];(nwr["amenity"~"^(hospital|clinic|police|fire_station|shelter)$"](around:' + R + "," + lat + "," + lng + ');nwr["emergency"="assembly_point"](around:' + R + "," + lat + "," + lng + ');nwr["amenity"="school"](around:' + R + "," + lat + "," + lng + "););out center tags 200;";
    let lastErr;
    for (const host of ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"]) {
      const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 30000);
      try {
        const r = await fetch(host, { method: "POST", body: "data=" + encodeURIComponent(q), headers: { "Content-Type": "application/x-www-form-urlencoded" }, signal: ctl.signal });
        if (!r.ok) throw new Error("HTTP " + r.status);
        return await r.json();
      } catch (e) { lastErr = e; } finally { clearTimeout(t); }
    }
    throw lastErr;
  }
  function parseNear(j, lat, lng) {
    const out = [];
    (j.elements || []).forEach((e) => {
      const t = e.tags || {}, c = e.type === "node" ? { lat: e.lat, lon: e.lon } : e.center;
      if (!c || c.lat == null) return;
      const k = FAC[t.amenity] ? t.amenity : t.emergency === "assembly_point" ? "assembly" : "";
      if (!k) return;
      out.push({ i: e.type[0] + e.id, k, n: String(t.name || t["name:en"] || "").slice(0, 60), la: Math.round(c.lat * 1e5) / 1e5, lo: Math.round(c.lon * 1e5) / 1e5 });
    });
    out.sort((a, b) => ALERTS.hav(lat, lng, a.la, a.lo) - ALERTS.hav(lat, lng, b.la, b.lo));
    let schools = 0;
    return out.filter((i) => (i.k !== "school" || ++schools <= 25)).slice(0, 120);
  }
  async function findNear() {
    if (busy) return;
    if (!navigator.onLine) { C.toast(tx("No internet. Showing the last check.")); return; }
    const c = map.getCenter(); busy = "near"; renderChips(); say(tx("Searching…"));
    try {
      const j = await overpass(c.lat, c.lng), items = parseNear(j, c.lat, c.lng), key = Math.round(c.lat * 20) / 20 + "," + Math.round(c.lng * 20) / 20;
      const s = S(); s.nearby = (s.nearby || []).filter((e) => e.key !== key); s.nearby.unshift({ key, at: Date.now(), lat: c.lat, lng: c.lng, items }); s.nearby = s.nearby.slice(0, 4);
      C.save(); layers().near = 1;
      say(items.length ? tx("Found") + " " + items.length + ". " + tx("Saved on this phone for offline.") : tx("Nothing found within 6 km. The map data may be incomplete here."));
    } catch (e) { say(tx("Couldn't reach the map data service. Try again later.")); }
    busy = ""; renderChips(); draw(); renderList();
  }
  async function toggleOverlay(kind) {
    const on = layers();
    const drop = () => { if (kind === "radar" && radar) { map.removeLayer(radar); radar = null; } if (kind === "cloud" && cloud) { map.removeLayer(cloud); cloud = null; } };
    if (!on[kind]) { drop(); return; }
    try {
      if (!navigator.onLine) throw new Error("offline");
      const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 12000);
      const j = await fetch("https://api.rainviewer.com/public/weather-maps.json", { signal: ctl.signal }).then((r) => { if (!r.ok) throw new Error("HTTP"); return r.json(); }).finally(() => clearTimeout(t));
      const list = kind === "radar" ? (j.radar && j.radar.past) : (j.satellite && j.satellite.infrared);
      if (!list || !list.length) throw new Error("none");
      const path = list[list.length - 1].path, url = j.host + path + "/256/{z}/{x}/{y}/" + (kind === "radar" ? "2/1_1" : "0/0_0") + ".png";
      drop();
      const lay = L.tileLayer(url, { opacity: kind === "radar" ? 0.65 : 0.5, maxNativeZoom: 7, maxZoom: 19, attribution: '<a href="https://www.rainviewer.com/">RainViewer</a>' }).addTo(map);
      if (kind === "radar") radar = lay; else cloud = lay;
      say(kind === "radar" ? tx("Rain radar shows the latest picture. Colors show where it is raining now.") : tx("Cloud picture shows the latest satellite image."));
    } catch (e) { on[kind] = 0; C.save(); say(kind === "radar" ? tx("Rain radar is not available right now.") : tx("The cloud picture is not available right now.")); }
    renderChips();
  }

  /* ---------- tap the map to add a place ---------- */
  function setTmp(ll) {
    addAt = { lat: +ll.lat.toFixed(5), lng: +ll.lng.toFixed(5) };
    if (tmp) map.removeLayer(tmp);
    tmp = L.marker([addAt.lat, addAt.lng], { icon: icon("#111", "+", "mk-pin") }).addTo(map);
    renderAdd();
  }
  function endAdd() { addMode = false; addAt = null; addLabel = ""; if (tmp) { map.removeLayer(tmp); tmp = null; } renderAdd(); renderChips(); }
  function saveAdd() {
    if (!addAt) return;
    const kindEl = el("maKind"), nameEl = el("maName");
    const kind = kindEl ? kindEl.value : addKind, name = ((nameEl && nameEl.value) || "").trim() || hazName(kind) || tx("Place");
    S().places.push({ id: C.uid(), label: name, note: "", lat: String(addAt.lat), lng: String(addAt.lng), hazard: kind });
    C.save(); endAdd(); say(tx("Saved.")); draw(); renderList();
  }

  /* ---------- clicks inside the map screen ---------- */
  function onClick(e) {
    const b = e.target.closest && e.target.closest("[data-m]");
    if (!b) return;
    const d = b.dataset;
    e.preventDefault();
    switch (d.m) {
      case "close": el("mapdlg").close ? el("mapdlg").close() : el("mapdlg").removeAttribute("open"); break;
      case "layer": { const on = layers(); on[d.k] = on[d.k] ? 0 : 1; C.save(); renderChips(); draw(); if (d.k === "radar" || d.k === "cloud") toggleOverlay(d.k); break; }
      case "me": findMe(); break;
      case "near": findNear(); break;
      case "add": if (addMode) endAdd(); else { addMode = true; renderAdd(); renderChips(); } break;
      case "addcancel": endAdd(); break;
      case "addhere": findMe((la, lo) => { map.setView([la, lo], Math.max(map.getZoom(), 15), { animate: false }); setTmp({ lat: la, lng: lo }); }); break;
      case "addsave": saveAdd(); break;
      case "rm": { const i = S().places.findIndex((p) => p.id === d.id); if (i >= 0) { if (C.dropPhoto) C.dropPhoto("place_" + d.id); S().places.splice(i, 1); C.save(); map.closePopup(); draw(); renderList(); } break; }
      case "go": {
        const m = mk[d.key]; if (!m) break;
        const ll = m.getLatLng(); el("mapbox").scrollIntoView({ block: "start" });
        map.setView(ll, Math.max(map.getZoom(), 16), { animate: false }); m.openPopup(); break;
      }
    }
  }

  /* ---------- open ---------- */
  function build() {
    const dlg = el("mapdlg");
    dlg.innerHTML = '<div class="mapin"><div class="mapbar" id="mapbar"></div><div class="mapscroll"><div id="mapbox" role="application"></div><div id="mapnote"></div><div id="mapchips"></div><div id="mapadd"></div><div id="maplist"></div><div id="maplegend"></div></div></div>';
    dlg.addEventListener("click", onClick);
    dlg.addEventListener("input", (e) => { if (e.target.id === "maName") addLabel = e.target.value; });
    dlg.addEventListener("change", (e) => { if (e.target.id === "maKind") addKind = e.target.value; });
    dlg.addEventListener("close", () => { if (addMode) endAdd(); C.render(); });
    window.addEventListener("online", () => { if (dlg.open) renderNote(); });
    window.addEventListener("offline", () => { if (dlg.open) renderNote(); });
  }
  function init() {
    map = L.map("mapbox", { zoomControl: true, attributionControl: true, worldCopyJump: true });
    tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
    tiles.on("tileload", () => { tileOk++; if (tileOk === 1) renderNote(); });
    tiles.on("tileerror", () => { tileBad++; if (tileBad === 4 && !tileOk) renderNote(); });
    ["places", "alerts", "near", "watch", "me"].forEach((k) => (grp[k] = L.layerGroup()));
    grp.watch.addTo(map); grp.me.addTo(map);
    map.on("click", (e) => { if (addMode) setTmp(e.latlng); });
    map.on("popupopen", (e) => { // show the photo you saved for a place, if there is one
      const box = e.popup.getElement() && e.popup.getElement().querySelector("[data-pk]");
      if (!box || !C.getPhoto) return;
      C.getPhoto(box.dataset.pk).then((blob) => { if (blob && box.isConnected) { box.innerHTML = '<img alt="">'; box.firstChild.src = URL.createObjectURL(blob); } }).catch(() => {});
    });
    const r = ref(), pts = myPlaces();
    if (r) {
      const near = pts.filter((p) => ALERTS.hav(r.lat, r.lng, p.lat, p.lng) <= 40);
      if (near.length) map.fitBounds(L.latLngBounds([[r.lat, r.lng], ...near.map((p) => [p.lat, p.lng])]), { padding: [30, 30], maxZoom: 15, animate: false });
      else map.setView([r.lat, r.lng], 13, { animate: false });
    } else map.setView([12.5, 122], 6, { animate: false });
  }
  function open(ctx, focus) {
    C = ctx;
    const dlg = el("mapdlg");
    if (typeof L === "undefined") { C.toast(tx("The map could not start.")); return; }
    if (!dlg.firstChild) build();
    tileOk = 0; tileBad = 0; noteMsg = "";
    if (typeof dlg.showModal === "function") { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute("open", "");
    if (!map) init();
    panels(); draw();
    setTimeout(() => { map.invalidateSize(); }, 60);
    const on = layers();
    if (navigator.onLine) { if (on.radar && !radar) toggleOverlay("radar"); if (on.cloud && !cloud) toggleOverlay("cloud"); }
    if (focus === "add") { addMode = true; renderAdd(); renderChips(); }
  }
  return { open };
})();
