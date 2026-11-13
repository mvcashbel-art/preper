/* Tiny QR code maker for Andam: works offline, no library.
   Byte mode, error correction level L, versions 1 to 5 (up to 106 characters).
   AndamQR.make(text)  -> array of rows (1 = dark) or null if the text is too long
   AndamQR.svg(text)   -> an SVG string with the quiet border, or "" if too long */
(function () {
  "use strict";
  const DATA = [0, 19, 34, 55, 80, 108], ECC = [0, 7, 10, 15, 20, 26], CAP = [0, 17, 32, 53, 78, 106];
  const ALIGN = [null, [], [6, 18], [6, 22], [6, 26], [6, 30]];
  const EXP = new Array(512), LOG = new Array(256);
  (function () { let x = 1; for (let i = 0; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 256) x ^= 0x11d; } for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255]; })();
  const mul = (a, b) => (a && b ? EXP[LOG[a] + LOG[b]] : 0);

  function rsRemainder(data, n) {
    let g = [1];
    for (let i = 0; i < n; i++) {
      const ng = new Array(g.length + 1).fill(0);
      for (let j = 0; j < g.length; j++) { ng[j] ^= g[j]; ng[j + 1] ^= mul(g[j], EXP[i]); }
      g = ng;
    }
    const r = new Array(n).fill(0);
    data.forEach((b) => { const f = b ^ r[0]; r.shift(); r.push(0); for (let i = 0; i < n; i++) r[i] ^= mul(g[i + 1], f); });
    return r;
  }

  function toBytes(s) {
    if (typeof TextEncoder === "function") return Array.from(new TextEncoder().encode(s));
    const u = unescape(encodeURIComponent(s)), out = []; for (let i = 0; i < u.length; i++) out.push(u.charCodeAt(i)); return out;
  }

  function codewords(bytes, v) {
    const bits = [];
    const put = (val, n) => { for (let i = n - 1; i >= 0; i--) bits.push((val >>> i) & 1); };
    put(4, 4); put(bytes.length, 8); bytes.forEach((b) => put(b, 8));
    const cap = DATA[v] * 8;
    for (let i = 0; i < 4 && bits.length < cap; i++) bits.push(0);
    while (bits.length % 8) bits.push(0);
    const out = [];
    for (let i = 0; i < bits.length; i += 8) { let b = 0; for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j]; out.push(b); }
    for (let p = 0xec; out.length < DATA[v]; p ^= 0xec ^ 0x11) out.push(p);
    return out.concat(rsRemainder(out, ECC[v]));
  }

  function build(cw, v, forceMask) {
    const size = 17 + 4 * v;
    const m = Array.from({ length: size }, () => new Array(size).fill(false));
    const fn = Array.from({ length: size }, () => new Array(size).fill(false));
    const setF = (x, y, d) => { if (x >= 0 && y >= 0 && x < size && y < size) { m[y][x] = d; fn[y][x] = true; } };
    for (let i = 0; i < size; i++) { setF(6, i, i % 2 === 0); setF(i, 6, i % 2 === 0); }
    const finder = (cx, cy) => { for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) { const d = Math.max(Math.abs(dx), Math.abs(dy)); setF(cx + dx, cy + dy, d !== 2 && d !== 4); } };
    finder(3, 3); finder(size - 4, 3); finder(3, size - 4);
    const al = ALIGN[v], last = al.length - 1;
    al.forEach((ax, i) => al.forEach((ay, j) => {
      if ((i === 0 && j === 0) || (i === 0 && j === last) || (i === last && j === 0)) return;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) setF(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }));
    const format = (mask) => {
      const data = (1 << 3) | mask; let rem = data;
      for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
      const bits = ((data << 10) | rem) ^ 0x5412, bit = (i) => ((bits >>> i) & 1) === 1;
      for (let i = 0; i <= 5; i++) setF(8, i, bit(i));
      setF(8, 7, bit(6)); setF(8, 8, bit(7)); setF(7, 8, bit(8));
      for (let i = 9; i < 15; i++) setF(14 - i, 8, bit(i));
      for (let i = 0; i < 8; i++) setF(size - 1 - i, 8, bit(i));
      for (let i = 8; i < 15; i++) setF(8, size - 15 + i, bit(i));
      setF(8, size - 8, true);
    };
    format(0);
    let k = 0;
    for (let right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vert = 0; vert < size; vert++) for (let j = 0; j < 2; j++) {
        const x = right - j, y = ((right + 1) & 2) === 0 ? size - 1 - vert : vert;
        if (!fn[y][x] && k < cw.length * 8) { m[y][x] = ((cw[k >>> 3] >>> (7 - (k & 7))) & 1) === 1; k++; }
      }
    }
    const MASK = [(x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, (x, y) => x % 3 === 0, (x, y) => (x + y) % 3 === 0,
      (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0, (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
      (x, y) => ((((x * y) % 2) + ((x * y) % 3)) % 2) === 0, (x, y) => ((((x + y) % 2) + ((x * y) % 3)) % 2) === 0];
    const apply = (mask) => { for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!fn[y][x] && MASK[mask](x, y)) m[y][x] = !m[y][x]; };
    const penalty = () => {
      let p = 0;
      const lines = [];
      for (let y = 0; y < size; y++) { lines.push(m[y].map((b) => (b ? "1" : "0")).join("")); }
      for (let x = 0; x < size; x++) { let s = ""; for (let y = 0; y < size; y++) s += m[y][x] ? "1" : "0"; lines.push(s); }
      lines.forEach((s) => {
        const runs = s.match(/0+|1+/g) || []; runs.forEach((r) => { if (r.length >= 5) p += r.length - 2; });
        const a = s.match(/(?=10111010000)/g), b = s.match(/(?=00001011101)/g); p += 40 * ((a ? a.length : 0) + (b ? b.length : 0));
      });
      for (let y = 0; y < size - 1; y++) for (let x = 0; x < size - 1; x++) { const c = m[y][x]; if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) p += 3; }
      let dark = 0; m.forEach((r) => r.forEach((c) => { if (c) dark++; }));
      p += Math.floor(Math.abs(dark * 20 - size * size * 10) / (size * size)) * 10;
      return p;
    };
    let best = 0, bestP = Infinity;
    if (forceMask === undefined) {
      for (let mk = 0; mk < 8; mk++) { apply(mk); format(mk); const p = penalty(); if (p < bestP) { bestP = p; best = mk; } apply(mk); }
    } else best = forceMask;
    apply(best); format(best);
    return m.map((r) => r.map((c) => (c ? 1 : 0)));
  }

  function make(text, forceMask) {
    const bytes = toBytes(String(text || ""));
    let v = 1; while (v <= 5 && bytes.length > CAP[v]) v++;
    if (v > 5) return null;
    return build(codewords(bytes, v), v, forceMask);
  }
  function svg(text) {
    const m = make(text); if (!m) return "";
    const n = m.length, q = 4; let d = "";
    m.forEach((row, y) => row.forEach((c, x) => { if (c) d += "M" + (x + q) + "," + (y + q) + "h1v1h-1z"; }));
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + (n + 2 * q) + " " + (n + 2 * q) + '" shape-rendering="crispEdges" role="img"><rect width="100%" height="100%" fill="#fff"/><path d="' + d + '" fill="#000"/></svg>';
  }
  window.AndamQR = { make, svg };
})();
