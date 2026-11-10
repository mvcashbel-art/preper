/* Handa v4: animated picture-guides for the Quick guides (first aid, typhoon, earthquake...).
   Panels light up one after another, and the key action loops while the guide is open.
   Text inside the pictures follows the language setting (FIGCEB is set by app.js). */

let FIGCEB = false;
const T = (a, b) => (FIGCEB ? b : a);
const _qs = (inner, label) => `<svg class="figsvg q" viewBox="0 0 320 200" role="img" aria-label="${label}">${inner}</svg>`;
const _cx = [58, 160, 262];
const _num = (k) => `<circle class="fs o" cx="${_cx[k - 1] - 42}" cy="22" r="9"/><text class="ft" x="${_cx[k - 1] - 42}" y="26" text-anchor="middle" style="fill:var(--signal-ink)">${k}</text>`;
const _pc = (k, a, b) => `<text class="ft s" x="${_cx[k - 1]}" y="160" text-anchor="middle">${a}</text><text class="ft s m" x="${_cx[k - 1]}" y="174" text-anchor="middle">${b}</text>`;
const _pn = (k, inner) => `<g class="pn p${k}">${inner}</g>`;
const _warn = (s) => `<text class="ft s d" x="160" y="194" text-anchor="middle">${s}</text>`;

FIGS.q_water = {
  cap: "Make water safe: let it settle and strain it through a clean cloth, boil it for one full minute, then cool it in a clean covered container.",
  get svg() {
    const c = _cx;
    return _qs(`
    ${_pn(1, `${_num(1)}
      <path class="o fg" d="M${c[0] - 18} 40h36v38q0 4-4 4h-28q-4 0-4-4z"/>
      <path class="o dash" d="M${c[0] - 28} 96h56"/>
      <circle class="fb q-drop" cx="${c[0] - 8}" cy="98" r="2.6"/><circle class="fb q-drop d2" cx="${c[0] + 4}" cy="98" r="2.6"/><circle class="fb q-drop d3" cx="${c[0] + 12}" cy="98" r="2.6"/>
      <path class="o fa" d="M${c[0] - 24} 128h48l-6 14h-36z"/>
      ${_pc(1, T("Settle, strain", "Pahulaga, unya"), T("through clean cloth", "salaga sa tela"))}`)}
    ${_pn(2, `${_num(2)}
      <path class="o fa" d="M${c[1] - 26} 78h52v38q0 6-6 6h-40q-6 0-6-6z"/><path class="o" d="M${c[1] - 26} 90h-8M${c[1] + 26} 90h8"/>
      <circle class="o fa q-bubble" cx="${c[1] - 10}" cy="98" r="3.4"/><circle class="o fa q-bubble b2" cx="${c[1] + 2}" cy="96" r="3"/><circle class="o fa q-bubble b3" cx="${c[1] + 12}" cy="99" r="3.6"/>
      <path class="o q-steam" d="M${c[1] - 10} 70q-5-7 0-14t0-12"/><path class="o q-steam b2" d="M${c[1] + 4} 70q-5-7 0-14t0-12"/><path class="o q-steam b3" d="M${c[1] + 16} 70q-5-7 0-14t0-12"/>
      <path class="o fs q-flame" d="M${c[1] - 14} 142q14-30 28 0z"/>
      ${_pc(2, T("Boil 1 minute", "Pabukala 1 min"), T("full rolling boil", "lawom nga bukal"))}`)}
    ${_pn(3, `${_num(3)}
      <rect class="o fb" x="${c[2] - 9}" y="50" width="18" height="12" rx="3"/>
      <rect class="o fa" x="${c[2] - 18}" y="62" width="36" height="66" rx="6"/><rect class="fw" x="${c[2] - 17}" y="84" width="34" height="43" rx="5"/>
      <circle class="fs o" cx="${c[2] + 32}" cy="70" r="10"/><path class="o" d="M${c[2] + 27} 70l4 4 7-8"/>
      ${_pc(3, T("Cool and cover", "Palabyi, tabuni"), T("clean container", "limpyong sudlan"))}`)}
    ${_warn(T("Never drink floodwater.", "Ayaw og inom sa tubig-baha."))}`, T("Settle and strain, boil one minute, cool and cover", "Pahulaga, pabukala, palabyi ug tabuni"));
  }
};

FIGS.q_bleed = {
  cap: "Heavy bleeding: press hard on the wound with a clean cloth, add more cloth if it soaks through (do not lift it), and raise the arm or leg if you can.",
  get svg() {
    const c = _cx;
    return _qs(`
    ${_pn(1, `${_num(1)}
      <rect class="o fg" x="${c[0] - 42}" y="100" width="84" height="22" rx="11"/>
      <rect class="o fa" x="${c[0] - 14}" y="90" width="28" height="12" rx="3"/>
      <g class="q-hold"><rect class="o fs" x="${c[0] - 14}" y="60" width="28" height="28" rx="9"/><path class="o" d="M${c[0] - 6} 60V40M${c[0] + 6} 60V40"/></g>
      ${_ar(c[0] + 30, 56, c[0] + 30, 84, "flow r")}
      ${_pc(1, T("Press firmly", "Pidyoga og lig-on"), T("clean cloth", "limpyong tela"))}`)}
    ${_pn(2, `${_num(2)}
      <rect class="o fg" x="${c[1] - 42}" y="104" width="84" height="22" rx="11"/>
      <rect class="o fa" x="${c[1] - 16}" y="92" width="32" height="12" rx="3"/><rect class="o fa" x="${c[1] - 14}" y="82" width="28" height="10" rx="3"/>
      <circle class="fh r q-drop slow" cx="${c[1] + 22}" cy="82" r="3"/>
      <path class="o" d="M${c[1] - 6} 50l12 12M${c[1] + 6} 50l-12 12" style="stroke:var(--danger)"/>
      ${_pc(2, T("Soaked? Add cloth", "Basa? Dugangi"), T("do not lift it off", "ayaw kuhaa"))}`)}
    ${_pn(3, `${_num(3)}
      <g transform="rotate(-38 ${c[2]} 118)"><rect class="o fg" x="${c[2] - 40}" y="106" width="80" height="22" rx="11"/><rect class="o fa" x="${c[2] - 12}" y="98" width="24" height="10" rx="3"/></g>
      ${_ar(c[2] + 36, 100, c[2] + 36, 56, "flow")}
      ${_pc(3, T("Raise it, press", "Itaas, pidyot"), T("10 minutes", "10 ka minuto"))}`)}
    ${_warn(T("Deep wound or keeps bleeding? Get medical help.", "Lawom o padayon ang dugo? Pangita og tabang."))}`, T("Press, add cloth without lifting, raise the limb", "Pidyoga, dugangi ang tela, itaas ang bahin"));
  }
};

FIGS.q_cpr = {
  cap: "CPR: hands on the center of the chest, push hard and fast, about 5 to 6 cm deep, 100 to 120 times a minute. The dot shows the beat. This is a reminder, not training.",
  get svg() {
    return _qs(`
    <rect class="o fa" x="14" y="124" width="196" height="26" rx="13"/>
    <circle class="o fa" cx="30" cy="110" r="14"/>
    <circle class="fs o" cx="112" cy="124" r="15" style="fill-opacity:.55"/>
    <g class="q-press"><path class="o thick" d="M106 60V22M118 60V22"/>
      <rect class="o fs" x="94" y="82" width="36" height="14" rx="7"/><rect class="o fs" x="100" y="68" width="24" height="12" rx="6"/></g>
    <line class="o dash" x1="70" y1="96" x2="70" y2="124"/>${_t(70, 90, "5–6 cm", "middle", "m")}
    <circle class="fb q-pulse" cx="268" cy="60" r="14"/>
    <text class="ft xl" x="268" y="108" text-anchor="middle">100–120</text>
    ${_t(268, 126, T("pushes a minute", "pidyot kada minuto"), "middle", "m")}
    ${_t(112, 168, T("Center of the chest", "Tunga sa dughan"))}
    ${_t(112, 184, T("Push hard and fast", "Pidyoga og kusog ug dali"), "middle", "m")}
    ${_t(268, 150, T("Call 911 first", "Tawag una sa 911"), "middle", "d")}`, T("Hands on the center of the chest pushing 100 to 120 times a minute", "Mga kamot sa tunga sa dughan, 100 hangtod 120 ka pidyot kada minuto"));
  }
};

FIGS.q_burn = {
  cap: "Burns: cool under clean running water for 20 minutes, take off rings before it swells, cover loosely with clean plastic wrap. No ice, toothpaste, butter or oil.",
  get svg() {
    const c = _cx;
    return _qs(`
    ${_pn(1, `${_num(1)}
      <path class="o" d="M${c[0] - 30} 34h40q8 0 8 8v8"/>
      <circle class="fb q-drop" cx="${c[0] + 18}" cy="56" r="2.6"/><circle class="fb q-drop d2" cx="${c[0] + 18}" cy="56" r="2.6"/><circle class="fb q-drop d3" cx="${c[0] + 18}" cy="56" r="2.6"/>
      <rect class="o fg" x="${c[0] - 40}" y="106" width="84" height="22" rx="11"/>
      <circle class="o fa" cx="${c[0] + 66}" cy="116" r="0"/>
      <circle class="o" cx="${c[0] - 36}" cy="78" r="11"/><path class="o q-tick" d="M${c[0] - 36} 78v-8" style="transform-origin:${c[0] - 36}px 78px"/>
      ${_pc(1, T("Cool under water", "Palabyi sa tubig"), T("20 minutes", "20 ka minuto"))}`)}
    ${_pn(2, `${_num(2)}
      <rect class="o fg" x="${c[1] - 40}" y="96" width="84" height="22" rx="11"/>
      <circle class="o fs" cx="${c[1] + 10}" cy="107" r="10" style="fill-opacity:.8"/>
      ${_ar(c[1] + 10, 66, c[1] + 10, 90, "flow y")}
      ${_pc(2, T("Take off rings", "Tangtanga ang"), T("before it swells", "singsing"))}`)}
    ${_pn(3, `${_num(3)}
      <rect class="o fg" x="${c[2] - 40}" y="96" width="84" height="22" rx="11"/>
      <rect class="o dash" x="${c[2] - 22}" y="88" width="50" height="38" rx="10" style="stroke:var(--accent)"/>
      ${_pc(3, T("Cover loosely", "Tabuni og luag"), T("plastic wrap", "plastic wrap"))}`)}
    ${_warn(T("No ice, toothpaste, butter or oil.", "Ayaw og yelo, toothpaste, mantikilya o lana."))}`, T("Cool with running water, remove rings, cover loosely", "Palabyi sa tubig, tangtanga ang singsing, tabuni og luag"));
  }
};

FIGS.q_ors = {
  cap: "Home rehydration drink: one liter of clean (boiled and cooled) water, 6 level teaspoons of sugar, half a level teaspoon of salt. Sip small amounts often.",
  get svg() {
    const c = _cx;
    return _qs(`
    ${_pn(1, `${_num(1)}
      <rect class="o fb" x="${c[0] - 7}" y="44" width="14" height="10" rx="2"/>
      <path class="o fa" d="M${c[0] - 16} 54h32l4 12v58q0 6-6 6h-28q-6 0-6-6V66z"/><path class="fw" d="M${c[0] - 18} 84h36v40q0 6-6 6h-24q-6 0-6-6z"/>
      <text class="ft" x="${c[0]}" y="108" text-anchor="middle">1 L</text>
      ${_pc(1, T("1 liter of clean", "1 litro nga"), T("boiled, cooled water", "limpyong tubig"))}`)}
    ${_pn(2, `${_num(2)}
      <path class="o fg" d="M${c[1] - 40} 130q10-26 20 0z"/><path class="o fa" d="M${c[1] + 8} 130q8-14 16 0z"/>
      <path class="o" d="M${c[1] - 34} 100q6-12 12 0h-12z"/>
      <text class="ft s" x="${c[1] - 30}" y="88" text-anchor="middle">${T("6 tsp sugar", "6 tsp asukar")}</text><text class="ft s" x="${c[1] + 18}" y="104" text-anchor="middle">${T("½ tsp salt", "½ tsp asin")}</text>
      ${_pc(2, T("Level spoons", "Patag nga kutsarita"), T("stir well", "ukra og maayo"))}`)}
    ${_pn(3, `${_num(3)}
      <path class="o fa" d="M${c[2] - 20} 66h40l-5 58q0 6-6 6h-18q-6 0-6-6z"/>
      <rect class="fw q-sip" x="${c[2] - 17}" y="72" width="34" height="56" rx="6"/>
      ${_pc(3, T("Sip small, often", "Lagok gamay"), T("every few minutes", "kanunay"))}`)}
    ${_warn(T("Blood in stool, high fever, or very sleepy? Get help fast.", "Dugo sa tae, hilanat, o tulog-tulog? Pangita og tabang."))}`, T("One liter of clean water, sugar and salt, sipped often", "1 litro nga limpyong tubig, asukar ug asin, hinay-hinay nga inom"));
  }
};

FIGS.q_typhoon = {
  cap: "Typhoon: prepare early, stay inside away from windows, and after it passes stay away from fallen wires and floodwater. If told to evacuate, go.",
  get svg() {
    const c = _cx;
    return _qs(`
    ${_pn(1, `${_num(1)}
      <path class="o fa" d="M${c[0] - 32} 126V96L${c[0]} 72l32 24v30z"/><path class="strap" d="M${c[0] - 38} 98L${c[0]} 74l38 24"/>
      <rect class="o fw" x="${c[0] - 44}" y="104" width="12" height="22" rx="3" style="fill-opacity:.5;stroke:var(--ink);stroke-width:1.6"/>
      <rect class="o fs" x="${c[0] + 34}" y="110" width="10" height="16" rx="2"/>
      ${_pc(1, T("Prepare early", "Andam sayo"), T("water, charge, roof", "tubig, charge, atop"))}`)}
    ${_pn(2, `${_num(2)}
      <path class="o fa" d="M${c[1] - 34} 126V94L${c[1]} 68l34 26v32z"/>
      <rect class="o" x="${c[1] - 26}" y="98" width="14" height="14" rx="1"/><path class="o" d="M${c[1] - 19} 98v14M${c[1] - 26} 105h14"/>
      <circle class="o fs" cx="${c[1] + 12}" cy="110" r="5"/><path class="o" d="M${c[1] + 12} 115v11"/>
      <path class="fl q-wind" d="M${c[1] - 52} 70h20"/><path class="fl q-wind w2" d="M${c[1] - 56} 86h22"/><path class="fl q-wind w3" d="M${c[1] - 50} 102h18"/>
      <path class="fl q-rain" d="M${c[1] + 6} 40l-4 10M${c[1] + 22} 36l-4 10M${c[1] + 36} 42l-4 10M${c[1] + 14} 54l-4 10"/>
      ${_pc(2, T("Stay inside", "Pabilin sa sulod"), T("away from windows", "layo sa bintana"))}`)}
    ${_pn(3, `${_num(3)}
      <path class="o" d="M${c[2] - 36} 126V60M${c[2] - 44} 70h16"/><path class="o" d="M${c[2] - 36} 72q30 8 30 40" />
      <path class="fs o q-spark" d="M${c[2] - 10} 112l5-9 3 6 6-4-5 11z"/>
      <rect class="fw" x="${c[2] - 48}" y="118" width="96" height="14" style="fill-opacity:.4"/>
      <path class="o" d="M${c[2] + 20} 92l20 20M${c[2] + 40} 92l-20 20" style="stroke:var(--danger)"/>
      ${_pc(3, T("After: keep away", "Human: likayi"), T("from wires, flood", "ang kable, baha"))}`)}
    ${_warn(T("Told to evacuate? Go. Do not wait.", "Gisugo mo-evacuate? Lakaw. Ayaw paghulat."))}`, T("Prepare, stay inside, then avoid wires and floodwater", "Andam, pabilin sa sulod, likayi ang kable ug baha"));
  }
};

FIGS.q_quake = {
  cap: "Earthquake: DROP to hands and knees, take COVER under a sturdy table protecting your head and neck, HOLD ON until the shaking stops. On the coast, go uphill if shaking is long.",
  get svg() {
    const c = _cx;
    const table = (x) => `<path class="o fa" d="M${x - 38} 78h76v8h-76z"/><path class="o" d="M${x - 32} 86V128M${x + 32} 86V128"/>`;
    return _qs(`
    ${_pn(1, `${_num(1)}<g class="q-shake">
      <circle class="o fs" cx="${c[0] - 14}" cy="94" r="8"/>
      <path class="o thick" d="M${c[0] - 8} 100L${c[0] + 22} 112M${c[0] - 14} 102V126M${c[0] + 22} 112V126M${c[0] + 14} 124h-18"/></g>
      ${_pc(1, T("1  DROP", "1  DROP"), T("hands and knees", "kamot ug tuhod"))}`)}
    ${_pn(2, `${_num(2)}<g class="q-shake">${table(c[1])}
      <circle class="o fs" cx="${c[1] - 8}" cy="108" r="7"/>
      <path class="o thick" d="M${c[1] - 4} 114L${c[1] + 16} 122M${c[1] - 14} 100q6-8 12 0"/></g>
      ${_pc(2, T("2  COVER", "2  COVER"), T("head and neck", "ulo ug liog"))}`)}
    ${_pn(3, `${_num(3)}<g class="q-shake">${table(c[2])}
      <circle class="o fs" cx="${c[2] - 8}" cy="108" r="7"/><path class="o thick" d="M${c[2] - 4} 114L${c[2] + 16} 122"/>
      <circle class="fs o" cx="${c[2] - 32}" cy="108" r="5"/></g>
      ${_pc(3, T("3  HOLD ON", "3  HOLD ON"), T("sturdy table", "lig-on nga lamesa"))}`)}
    ${_warn(T("On the coast and shaking is long? Go uphill now.", "Sa baybayon, taas ang uyog? Dangat sa taas dayon."))}`, T("Drop, cover and hold on", "Drop, cover ug hold on"));
  }
};

FIGS.q_flood = {
  cap: "Flood: move to higher ground early. About 15 cm of moving water can knock an adult over and about 30 cm can float many cars. Never walk or drive through it.",
  get svg() {
    return _qs(`
    <rect class="o fa" x="22" y="84" width="64" height="50"/><path class="o fa" d="M16 86L54 56l38 30z"/><rect class="o" x="48" y="104" width="12" height="30"/>
    <rect class="fw q-rise" x="8" y="104" width="116" height="38" style="fill-opacity:.55"/>
    <path class="o" d="M150 144V70"/><path class="o" d="M150 120h10M150 96h10"/>
    ${_t(166, 124, "15 cm", "start", "m")}${_t(166, 100, "30 cm", "start", "m")}
    <path class="o fa" d="M214 144Q262 56 316 144z"/><circle class="fs o" cx="262" cy="100" r="6"/>${_ar(214, 140, 246, 108, "flow y")}
    ${_t(70, 40, T("Water rises", "Motaas ang tubig"), "middle", "m")}
    ${_t(260, 52, T("Go higher early", "Lakaw sa taas sayo"), "middle")}
    ${_t(80, 164, T("15 cm moving water knocks you down", "15 cm nga nagadagan nga tubig makapukaw"), "start", "m")}
    ${_t(80, 180, T("30 cm can float a car", "30 cm makalutaw og sakyanan"), "start", "m")}
    ${_warn(T("Never walk or drive through moving water.", "Ayaw tabok o drive sa nagadagan nga tubig."))}`, T("Water rising around a house, a depth gauge, and a hill to move to", "Motaas nga tubig libot sa balay, sukod sa lalom, ug bungtod nga dangatan"));
  }
};

FIGS.q_food = {
  cap: "Food without a fridge: eat fresh and cooked food first, throw away swollen, leaking or deeply dented cans, wash your hands with soap and clean water. When in doubt, throw it out.",
  get svg() {
    const c = _cx;
    return _qs(`
    ${_pn(1, `${_num(1)}
      <path class="o fa" d="M${c[0] - 26} 84h52v32q0 6-6 6h-40q-6 0-6-6z"/><path class="o" d="M${c[0] - 26} 96h-8M${c[0] + 26} 96h8"/>
      <path class="o q-steam" d="M${c[0] - 8} 76q-5-7 0-14t0-12"/><path class="o q-steam b2" d="M${c[0] + 8} 76q-5-7 0-14t0-12"/>
      <circle class="o" cx="${c[0] + 34}" cy="52" r="10"/><path class="o q-tick" d="M${c[0] + 34} 52v-6" style="transform-origin:${c[0] + 34}px 52px"/>
      ${_pc(1, T("Eat fresh first", "Pangaon sa una"), T("cooked: within 2 h", "luto: sulod 2 oras"))}`)}
    ${_pn(2, `${_num(2)}
      <path class="o fa" d="M${c[1] - 20} 70q20-8 40 0v50q-20 8-40 0z"/><path class="o" d="M${c[1] - 20} 96q20 6 40 0"/>
      <path class="o" d="M${c[1] - 34} 58l68 68M${c[1] + 34} 58l-68 68" style="stroke:var(--danger)"/>
      ${_pc(2, T("Bin swollen, leaking", "Itaktak ang"), T("or dented cans", "daot nga lata"))}`)}
    ${_pn(3, `${_num(3)}
      <path class="o fa" d="M${c[2] - 16} 90q0-12 8-12h16q8 0 8 12v18h-32z"/><path class="o" d="M${c[2] - 28} 98q-6 0-6 10"/>
      <circle class="fb q-bubble" cx="${c[2] - 8}" cy="70" r="3"/><circle class="fb q-bubble b2" cx="${c[2] + 6}" cy="66" r="4"/><circle class="fb q-bubble b3" cx="${c[2] + 16}" cy="72" r="3"/>
      <path class="o fw" d="M${c[2] - 30} 112q30 14 60 0v10q-30 14-60 0z"/>
      ${_pc(3, T("Wash your hands", "Hugasi ang kamot"), T("soap, clean water", "sabon + tubig"))}`)}
    ${_warn(T("When in doubt, throw it out.", "Kung nagduha, ilabay."))}`, T("Eat fresh first, bin bad cans, wash hands", "Pangaon sa una ang presko, itaktak ang daot nga lata, hugas kamot"));
  }
};

FIGS.q_signal = {
  cap: "Signal for help: three of anything (whistle, flashes, fires, shouts), a bright cloth or mirror, and HELP in big letters on the ground. Stay put once you have signaled.",
  get svg() {
    const c = _cx;
    return _qs(`
    ${_pn(1, `${_num(1)}
      <path class="o fs" d="M${c[0] - 22} 96h28l10 8v8h-38z"/><circle class="o" cx="${c[0] - 14}" cy="104" r="3"/>
      <g class="q-blink3"><path class="fl" d="M${c[0] + 24} 90q8 8 0 24"/><path class="fl" d="M${c[0] + 32} 82q14 14 0 40"/><path class="fl" d="M${c[0] + 40} 74q20 22 0 56"/></g>
      ${_pc(1, T("3 blasts or shouts", "3 ka pito o singgit"), T("whistle, voice", "pito, tingog"))}`)}
    ${_pn(2, `${_num(2)}
      <rect class="o fg" x="${c[1] - 34}" y="104" width="22" height="30" rx="4"/><path class="o fs" d="M${c[1] - 12} 108l16-6v26l-16-6z"/>
      <g class="q-blink3"><path class="fl y" d="M${c[1] + 8} 104l30-22M${c[1] + 8} 115h36M${c[1] + 8} 126l30 22" style="stroke:var(--signal);stroke-width:3"/></g>
      ${_pc(2, T("3 flashes of light", "3 ka suga"), T("mirror, flashlight", "salamin, suga"))}`)}
    ${_pn(3, `${_num(3)}
      <rect class="o fg" x="${c[2] - 44}" y="110" width="88" height="24" rx="2" style="fill-opacity:.7"/>
      <text class="ft xl" x="${c[2]}" y="130" text-anchor="middle" style="fill:var(--danger)">HELP</text>
      <path class="o fs" d="M${c[2] - 18} 76h36v14h-36z"/><path class="o" d="M${c[2] - 18} 76V56"/>
      ${_pc(3, T("Write HELP", "Isulat ang HELP"), T("big, on ground or roof", "dako, sa yuta o atop"))}`)}
    ${_warn(T("Stay put once you have signaled, if it is safe.", "Pabilin kung nagsenyas na, kung luwas."))}`, T("Three whistle blasts, three flashes, HELP written large", "3 ka pito, 3 ka suga, HELP nga isulat og dako"));
  }
};

FIGS.q_hands = {
  cap: "Wash your hands: wet them and use soap, rub for 20 seconds (palms, backs, between the fingers, under the nails), then rinse and dry with a clean cloth.",
  get svg() {
    const c = _cx;
    return _qs(`
    ${_pn(1, `${_num(1)}
      <path class="o fb" d="M${c[0] - 28} 48h30q8 0 8 8v10h-10v-6h-28z"/>
      <circle class="fb q-drop" cx="${c[0] + 12}" cy="68" r="2.6"/><circle class="fb q-drop d2" cx="${c[0] + 12}" cy="68" r="2.6"/>
      <rect class="o fa" x="${c[0] - 26}" y="106" width="40" height="22" rx="10"/>
      <rect class="o fs" x="${c[0] + 20}" y="112" width="18" height="12" rx="4"/>
      ${_pc(1, T("Wet hands,", "Basaha ang kamot,"), T("use soap", "gamita ang sabon"))}`)}
    ${_pn(2, `${_num(2)}
      <g class="q-shake"><rect class="o fa" x="${c[1] - 36}" y="92" width="48" height="22" rx="10"/><rect class="o fa" x="${c[1] - 12}" y="104" width="48" height="22" rx="10"/></g>
      <circle class="o fb q-bubble" cx="${c[1] - 20}" cy="88" r="4"/><circle class="o fb q-bubble b2" cx="${c[1] + 6}" cy="96" r="3.2"/><circle class="o fb q-bubble b3" cx="${c[1] + 26}" cy="100" r="4"/>
      <text class="ft xl" x="${c[1]}" y="70" text-anchor="middle">20 s</text>
      ${_pc(2, T("Rub 20 seconds", "Kuskusa 20 segundo"), T("fingers, nails", "tunga sa tudlo, kuko"))}`)}
    ${_pn(3, `${_num(3)}
      <circle class="fb q-drop" cx="${c[2] - 18}" cy="52" r="2.6"/><circle class="fb q-drop d2" cx="${c[2] - 4}" cy="52" r="2.6"/><circle class="fb q-drop d3" cx="${c[2] + 10}" cy="52" r="2.6"/>
      <path class="o fg" d="M${c[2] - 26} 96h52v32h-52z"/><path class="o dash" d="M${c[2] - 26} 108h52M${c[2] - 26} 118h52"/>
      <circle class="fs o" cx="${c[2] + 30}" cy="86" r="10"/><path class="o" d="M${c[2] + 25} 86l4 4 7-8"/>
      ${_pc(3, T("Rinse, dry", "Hunaw, pauga"), T("with clean cloth", "sa limpyong tela"))}`)}
    ${_warn(T("Before eating or cooking, and after the toilet.", "Sa dili pa mokaon o magluto, ug human sa kasilyas."))}`, T("Wet, soap and rub for 20 seconds, rinse and dry", "Basa, sabon ug kuskos sulod sa 20 segundo, hunaw ug pauga"));
  }
};

FIGS.q_fire = {
  cap: "Cook safely: only outside, at least 1 meter from walls and dry things, never alone, with water or sand beside you. When done, drown the coals with water.",
  get svg() {
    const c = _cx;
    return _qs(`
    ${_pn(1, `${_num(1)}
      <path class="o fa" d="M${c[0] - 44} 128V100L${c[0] - 26} 84l18 16v28z"/>
      <rect class="o" x="${c[0] - 34}" y="106" width="10" height="12" rx="1"/>
      <path class="o fb" d="M${c[0] + 6} 128h30l-4-14h-22z"/><path class="o fs q-flame" d="M${c[0] + 12} 114q8-22 16 0z"/>
      <path class="o q-steam" d="M${c[0] + 14} 92q-4-6 0-12" style="stroke:var(--muted)"/>
      <path class="o" d="M${c[0] - 20} 70l16-16M${c[0] - 4} 70l-16-16" style="stroke:var(--danger)"/>
      ${_pc(1, T("Cook outside,", "Pagluto sa gawas,"), T("never indoors", "dili sa sulod"))}`)}
    ${_pn(2, `${_num(2)}
      <path class="o fb" d="M${c[1] - 44} 128h30l-4-14h-22z"/><path class="o fs q-flame" d="M${c[1] - 38} 114q8-22 16 0z"/>
      <path class="fl dash" d="M${c[1] - 8} 108h34"/><text class="ft s" x="${c[1] + 10}" y="100" text-anchor="middle">1 m</text>
      <path class="o" d="M${c[1] + 34} 70v58" style="stroke-width:5"/>
      <path class="o fw" d="M${c[1] + 8} 124h20l-2 12h-16z" style="fill-opacity:.5"/>
      ${_pc(2, T("Keep 1 m away", "Pa-1 metro layo"), T("never alone", "dili biyaan"))}`)}
    ${_pn(3, `${_num(3)}
      <path class="o fb" d="M${c[2] - 26} 128h48l-6-12h-36z"/>
      <path class="o q-steam" d="M${c[2] - 14} 108q-5-8 0-16" style="stroke:var(--muted)"/><path class="o q-steam b2" d="M${c[2] + 4} 108q-5-8 0-16" style="stroke:var(--muted)"/>
      <path class="o fw" d="M${c[2] + 6} 46l24 10-6 22-24-10z" style="fill-opacity:.6"/>
      <circle class="fb q-drop" cx="${c[2] - 8}" cy="70" r="2.6"/><circle class="fb q-drop d2" cx="${c[2] - 14}" cy="70" r="2.6"/>
      ${_pc(3, T("Water on coals", "Tubig sa baga"), T("until cold", "hangtud bugnaw"))}`)}
    ${_warn(T("Smoke can kill. Dizzy or headache? Go to fresh air.", "Ang aso makapatay. Nahilo o sakit ulo? Gawas sa presko nga hangin."))}`, T("Cook outside, keep clear of walls, then put coals out with water", "Pagluto sa gawas, layo sa dingding, unya patya ang baga sa tubig"));
  }
};

FIGS.q_leave = {
  cap: "Before you leave: switch off the main power and close the LPG valve, take the go-bag, medicines, phone and documents, then go to the evacuation center by the safe route.",
  get svg() {
    const c = _cx;
    return _qs(`
    ${_pn(1, `${_num(1)}
      <rect class="o fa" x="${c[0] - 36}" y="66" width="26" height="46" rx="5"/><rect class="o fs q-hold" x="${c[0] - 29}" y="74" width="12" height="16" rx="2"/>
      <rect class="o fb" x="${c[0] + 8}" y="78" width="26" height="46" rx="9"/><path class="o" d="M${c[0] + 14} 78v-8h14v8M${c[0] + 21} 70v-6"/>
      ${_pc(1, T("Power off,", "Patya ang kuryente,"), T("close LPG", "sirad-i ang LPG"))}`)}
    ${_pn(2, `${_num(2)}
      <rect class="o fb" x="${c[1] + 12}" y="62" width="20" height="26" rx="2"/><path class="o" d="M${c[1] + 16} 70h12M${c[1] + 16} 76h12"/>
      <g class="q-hold"><rect class="o fa" x="${c[1] - 34}" y="76" width="44" height="52" rx="10"/><path class="o" d="M${c[1] - 22} 76v-8q0-8 10-8t10 8v8"/><path class="o" d="M${c[1] - 26} 104h28"/></g>
      ${_pc(2, T("Take go-bag,", "Dad-a ang go-bag,"), T("papers, medicines", "papeles, tambal"))}`)}
    ${_pn(3, `${_num(3)}
      <circle class="o fs" cx="${c[2] - 34}" cy="84" r="7"/><path class="o" d="M${c[2] - 34} 91v22M${c[2] - 34} 98l-8 8M${c[2] - 34} 98l8 6M${c[2] - 34} 113l-6 13M${c[2] - 34} 113l6 13"/>
      <path class="fl q-wind" d="M${c[2] - 18} 104h34"/>
      <path class="o fa" d="M${c[2] + 14} 128v-22l16-14 16 14v22z"/><path class="o" d="M${c[2] + 26} 128v-12h8v12"/>
      ${_pc(3, T("Go to the center", "Adto sa evacuation"), T("by the safe route", "sa luwas nga dalan"))}`)}
    ${_warn(T("Tell family where you go. Never cross floodwater.", "Ingna ang pamilya kung asa ka paingon. Ayaw tabok sa baha."))}`, T("Switch off power and gas, take the bag, go to the center", "Patya ang kuryente ug gas, dad-a ang bag, adto sa evacuation"));
  }
};

const QFIG = { gd1: "q_water", gd2: "q_bleed", gd3: "q_cpr", gd4: "q_burn", gd5: "q_ors", gd6: "q_typhoon", gd7: "q_quake", gd8: "q_flood", gd9: "q_food", gd10: "q_signal", gd14: "q_hands", gd15: "q_fire", gd16: "q_leave" };
