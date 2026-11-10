/* Andam v18: hazard and warning checks for wherever you are.
   Free public services, no account: Open-Meteo (weather), USGS (earthquakes), NASA EONET (storms, volcanoes, floods).
   These are a guide, not an official warning. The text is built here in English and Bisaya.
   Levels: 0 clear, 1 note, 2 watch, 3 warning, 4 danger. */

const ALERTS = (() => {
  const rad = (d) => (d * Math.PI) / 180;
  const hav = (la1, lo1, la2, lo2) => {
    const a = Math.sin(rad(la2 - la1) / 2) ** 2 + Math.cos(rad(la1)) * Math.cos(rad(la2)) * Math.sin(rad(lo2 - lo1) / 2) ** 2;
    return 6371 * 2 * Math.asin(Math.min(1, Math.sqrt(a)));
  };
  const inPH = (la, lo) => la >= 4 && la <= 22 && lo >= 116 && lo <= 128;
  const r1 = (n) => Math.round(n * 10) / 10;

  async function getJson(url, ms) {
    const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), ms || 12000);
    try { const r = await fetch(url, { signal: ctl.signal }); if (!r.ok) throw new Error("HTTP " + r.status); return await r.json(); }
    finally { clearTimeout(t); }
  }

  /* ---- weather: rain, wind, heat for the next 48 hours ---- */
  async function weather(lat, lng) {
    const j = await getJson("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lng +
      "&hourly=precipitation,wind_gusts_10m,apparent_temperature&forecast_days=3&timezone=auto&wind_speed_unit=kmh");
    const h = j.hourly, off = (j.utc_offset_seconds || 0) * 1000, now = Date.now(), out = [];
    const idx = [];
    h.time.forEach((s, i) => { const t = Date.parse(s + "Z") - off; if (t >= now - 30 * 60000 && t <= now + 48 * 3600000) idx.push([i, t]); });
    if (!idx.length) return out;
    const inH = (t) => Math.max(0, Math.round((t - now) / 3600000));
    // rain
    let max1 = 0, max1t = now, best24 = 0, best24t = now;
    idx.forEach(([i, t], k) => {
      const p = Number(h.precipitation[i]) || 0;
      if (p > max1) { max1 = p; max1t = t; }
      let s = 0; for (let m = k; m < Math.min(idx.length, k + 24); m++) s += Number(h.precipitation[idx[m][0]]) || 0;
      if (s > best24) { best24 = s; best24t = t; }
    });
    const rl = max1 >= 30 || best24 >= 150 ? 4 : max1 >= 15 || best24 >= 100 ? 3 : max1 >= 7.5 || best24 >= 50 ? 2 : best24 >= 25 ? 1 : 0;
    if (rl) out.push({ k: "rain", lvl: rl, a: { h1: r1(max1), d: Math.round(best24), in: inH(max1 >= 7.5 ? max1t : best24t) } });
    // wind gusts
    let g = 0, gt = now;
    idx.forEach(([i, t]) => { const v = Number(h.wind_gusts_10m[i]) || 0; if (v > g) { g = v; gt = t; } });
    const wl = g >= 100 ? 4 : g >= 75 ? 3 : g >= 55 ? 2 : 0;
    if (wl) out.push({ k: "wind", lvl: wl, a: { g: Math.round(g), in: inH(gt) } });
    // heat (feels-like)
    let ap = -99, apt = now;
    idx.forEach(([i, t]) => { const v = Number(h.apparent_temperature[i]); if (!isNaN(v) && v > ap) { ap = v; apt = t; } });
    const hl = ap >= 52 ? 4 : ap >= 42 ? 3 : ap >= 38 ? 1 : 0;
    if (hl) out.push({ k: "heat", lvl: hl, a: { t: Math.round(ap), in: inH(apt) } });
    return out;
  }

  /* ---- earthquakes in the last 48 hours within 400 km (USGS) ---- */
  async function quakes(lat, lng) {
    const since = new Date(Date.now() - 48 * 3600000).toISOString().slice(0, 19);
    const j = await getJson("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=" + lat + "&longitude=" + lng +
      "&maxradiuskm=400&minmagnitude=4&orderby=time&limit=50&starttime=" + since);
    const list = (j.features || []).map((f) => {
      const c = f.geometry && f.geometry.coordinates || [], p = f.properties || {};
      const d = hav(lat, lng, c[1], c[0]), m = Number(p.mag) || 0;
      const lvl = (m >= 7 && d <= 400) || (m >= 6 && d <= 150) ? 4 : (m >= 6) || (m >= 5 && d <= 100) ? 3 : m >= 5 || (m >= 4.5 && d <= 150) ? 2 : d <= 200 ? 1 : 0;
      return { k: "quake", ll: [c[1], c[0]], lvl: p.tsunami === 1 ? Math.max(lvl, 3) : lvl, a: { m: r1(m), d: Math.round(d), ago: Math.max(0, Math.round((Date.now() - p.time) / 60000)), ts: p.tsunami === 1 ? 1 : 0 } };
    }).filter((x) => x.lvl > 0).sort((a, b) => b.lvl - a.lvl || b.a.m - a.a.m);
    return list.slice(0, 3);
  }

  /* ---- storms, volcanoes, floods, landslides, fires near you (NASA EONET) ---- */
  async function events(lat, lng) {
    const B = 10;
    const j = await getJson("https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=100&bbox=" + (lng - B) + "," + (lat + B) + "," + (lng + B) + "," + (lat - B));
    const out = [];
    (j.events || []).forEach((e) => {
      const cat = e.categories && e.categories[0] && e.categories[0].id, g = (e.geometry || [])[(e.geometry || []).length - 1];
      if (!g || !g.coordinates) return;
      let c = g.coordinates; while (Array.isArray(c[0])) c = c[0];
      const d = hav(lat, lng, c[1], c[0]), ageD = (Date.now() - Date.parse(g.date)) / 864e5;
      let lvl = 0, kind = "";
      if (cat === "severeStorms" && ageD <= 3) { kind = "storm"; lvl = d <= 500 ? 3 : d <= 1000 ? 2 : 0; }
      else if (cat === "volcanoes" && ageD <= 30) { kind = "volcano"; lvl = d <= 100 ? 3 : d <= 300 ? 2 : 0; }
      else if (cat === "floods" && ageD <= 5) { kind = "flood"; lvl = d <= 200 ? 2 : 0; }
      else if (cat === "landslides" && ageD <= 5) { kind = "landslide"; lvl = d <= 100 ? 2 : 0; }
      else if (cat === "wildfires" && ageD <= 3) { kind = "fire"; lvl = d <= 50 ? 2 : 0; }
      if (lvl) out.push({ k: kind, ll: [c[1], c[0]], lvl, a: { n: String(e.title || "").slice(0, 60), d: Math.round(d) } });
    });
    return out.sort((a, b) => b.lvl - a.lvl || a.a.d - b.a.d).slice(0, 4);
  }

  /* run every source; one that fails does not stop the others */
  async function check(lat, lng) {
    const jobs = [["weather", weather], ["quakes", quakes], ["storms", events]];
    const done = await Promise.allSettled(jobs.map(([, f]) => f(lat, lng)));
    const items = [], failed = [];
    done.forEach((r, i) => { if (r.status === "fulfilled") items.push(...r.value); else failed.push(jobs[i][0]); });
    items.sort((a, b) => b.lvl - a.lvl);
    return { at: Date.now(), items, failed, ok: failed.length < jobs.length };
  }

  async function search(q) {
    const j = await getJson("https://geocoding-api.open-meteo.com/v1/search?count=6&language=en&format=json&name=" + encodeURIComponent(q));
    return (j.results || []).map((r) => ({ name: r.name + (r.admin1 ? ", " + r.admin1 : r.country ? ", " + r.country : ""), lat: Math.round(r.latitude * 1000) / 1000, lng: Math.round(r.longitude * 1000) / 1000 }));
  }

  /* ---- words ---- */
  const LV = { en: ["Clear", "Note", "Watch", "Warning", "Danger"], ceb: ["Maayo", "Timan-i", "Bantayi", "Pasidaan", "Peligro"] };
  const levelName = (l, ceb) => (ceb ? LV.ceb : LV.en)[l] || "";
  const inT = (n, ceb) => (n <= 0 ? (ceb ? "karon" : "now") : ceb ? "sulod sa mga " + n + " ka oras" : "in about " + n + " h");
  const agoT = (m, ceb) => { const h = Math.round(m / 60); return m < 90 ? (ceb ? "mga " + Math.max(1, m) + " ka minuto ang milabay" : Math.max(1, m) + " min ago") : (ceb ? "mga " + h + " ka oras ang milabay" : h + " h ago"); };

  function text(it, ceb) {
    const a = it.a || {}, L = it.lvl;
    const T = (en, cb) => (ceb ? cb : en);
    switch (it.k) {
      case "rain": return {
        t: T(["Rain expected", "Rain expected", "Heavy rain expected", "Very heavy rain expected", "Extreme rain expected"][L], ["Moulan", "Moulan", "Kusog nga ulan", "Hilabihan kakusog nga ulan", "Grabeng kakusog nga ulan"][L]),
        b: T("Up to " + a.h1 + " mm in one hour and about " + a.d + " mm in 24 hours, " + inT(a.in) + ". " + (L >= 3 ? "Floods and landslides are possible. Be ready to move to higher ground." : L === 2 ? "Streams and low roads may flood. Watch the river and slopes." : "Bring a raincoat."),
             "Hangtud " + a.h1 + " mm sa usa ka oras ug mga " + a.d + " mm sulod sa 24 ka oras, " + inT(a.in, 1) + ". " + (L >= 3 ? "Posibleng mobaha ug mag-guba ang bakilid. Andam nga mobalhin sa mas taas nga dapit." : L === 2 ? "Basin mobaha ang sapa ug ubos nga dalan. Bantayi ang suba ug bakilid." : "Magdala og kapote."))
      };
      case "wind": return {
        t: T(["", "", "Strong winds expected", "Very strong winds expected", "Destructive winds expected"][L], ["", "", "Kusog nga hangin", "Hilabihan kakusog nga hangin", "Makaguba nga hangin"][L]),
        b: T("Gusts up to " + a.g + " km/h, " + inT(a.in) + ". Tie down loose roofing and objects. Stay indoors, away from windows.",
             "Bugso sa hangin hangtud " + a.g + " km/h, " + inT(a.in, 1) + ". Higpita ang luag nga yero ug butang. Pabilin sa sulod, layo sa bintana.")
      };
      case "heat": return {
        t: T(["", "Very hot", "", "Heat danger", "Extreme heat danger"][L], ["", "Init kaayo", "", "Peligro sa kainit", "Grabeng peligro sa kainit"][L]),
        b: T("Feels like up to " + a.t + "°C, " + inT(a.in) + ". Drink water often, rest in the shade at midday, and check on children and the elderly." + (L >= 3 ? " Heat stroke is possible." : ""),
             "Murag " + a.t + "°C ang gibati, " + inT(a.in, 1) + ". Inom og tubig kanunay, pahulay sa landong sa udto, ug tan-awa ang bata ug tigulang." + (L >= 3 ? " Posible ang heat stroke." : ""))
      };
      case "quake": return {
        t: T("Magnitude " + a.m + " earthquake about " + a.d + " km away", "Linog nga magnitude " + a.m + " mga " + a.d + " km ang gilay-on"),
        b: T(agoT(a.ago) + ". " + (L >= 3 ? "Expect aftershocks and check your home for damage. On the coast, if you felt long strong shaking, go uphill. " : "Aftershocks are possible. ") + (a.ts ? "A tsunami message was issued. " : "") + "Check PHIVOLCS for details. Magnitudes here come from USGS and can differ.",
             agoT(a.ago, 1) + ". " + (L >= 3 ? "Hulata ang mga aftershock ug susiha ang balay kung naay kadaot. Sa baybayon, kung nibati og taas ug kusog nga uyog, dangat sa taas nga dapit. " : "Posible ang aftershock. ") + (a.ts ? "Naay gipagawas nga pahibalo sa tsunami. " : "") + "Tan-awa ang PHIVOLCS alang sa detalye. Ang magnitude dinhi gikan sa USGS ug mahimong lahi.")
      };
      case "storm": return {
        t: T(a.n + " is about " + a.d + " km away", "Ang " + a.n + " mga " + a.d + " km ang gilay-on"),
        b: T("Follow PAGASA for its track and wind signals. " + (L >= 3 ? "Prepare water, charge phones, secure the house, and be ready to evacuate if told." : "Keep your go-bag and phones ready."),
             "Sunda ang PAGASA alang sa dagan ug signal sa hangin. " + (L >= 3 ? "Andama ang tubig, i-charge ang telepono, higpita ang balay, ug andam nga mo-evacuate kung gisugo." : "Andama ang go-bag ug telepono."))
      };
      case "volcano": return {
        t: T(a.n + " (volcano) is about " + a.d + " km away", a.n + " (bulkan) mga " + a.d + " km ang gilay-on"),
        b: T("Follow PHIVOLCS for the alert level and the danger zone.", "Sunda ang PHIVOLCS alang sa alert level ug danger zone.")
      };
      case "flood": case "landslide": case "fire": {
        const kind = { flood: ["flood", "baha"], landslide: ["landslide", "pagguba sa bakilid"], fire: ["fire", "sunog"] }[it.k];
        return { t: T("Reported " + kind[0] + ": " + a.n + " (about " + a.d + " km away)", "Gitaho nga " + kind[1] + ": " + a.n + " (mga " + a.d + " km ang gilay-on)"), b: T("Check local news and your LGU before you travel.", "Susiha ang lokal nga balita ug LGU sa dili ka mobiya.") };
      }
      case "note": return { t: T("Your note: " + a.label, "Imong nota: " + a.label), b: a.text };
    }
    return { t: it.k, b: "" };
  }

  return { check, search, text, levelName, hav, inPH };
})();
