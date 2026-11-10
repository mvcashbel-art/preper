/* Handa figures: simple line diagrams for the step-by-step guides.
   They use the app's colors, so they work in light and dark. Arrows animate only while a guide is open. */

const _svg = (inner, label) => `<svg class="figsvg" viewBox="0 0 320 180" role="img" aria-label="${label}">${inner}</svg>`;
const _t = (x, y, s, a = "middle", c = "") => `<text class="ft ${c}" x="${x}" y="${y}" text-anchor="${a}">${s}</text>`;
const _ar = (x1, y1, x2, y2, c = "flow") => {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 7;
  const p1 = [x2 - h * Math.cos(a - 0.45), y2 - h * Math.sin(a - 0.45)];
  const p2 = [x2 - h * Math.cos(a + 0.45), y2 - h * Math.sin(a + 0.45)];
  const k = c.split(" ").filter((x) => x !== "flow").join(" ");
  return `<path class="fl ${c}" d="M${x1} ${y1}L${x2} ${y2}"/><path class="fh ${k}" d="M${x2} ${y2}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}z"/>`;
};
const _sun = (x, y) => `<circle class="fs o" cx="${x}" cy="${y}" r="9"/><path class="o" d="M${x} ${y - 15}v-4M${x} ${y + 15}v4M${x - 15} ${y}h-4M${x + 15} ${y}h4M${x - 11} ${y - 11}l-3-3M${x + 11} ${y + 11}l3 3M${x + 11} ${y - 11}l3-3M${x - 11} ${y + 11}l-3 3"/>`;

const FIGS = {
  solar_flow: { cap: "How a power station works: the panel charges it, and you plug your things into it. Nothing is wired into the house.", svg: _svg(`
    ${_sun(44, 26)}
    <path class="o fb" d="M14 62L80 50L90 96L24 108z"/>
    <path class="gl" d="M35 59L45 105M57 55L67 101M19 85L85 73"/>
    <path class="o" d="M52 79V118M36 118H68"/>
    ${_t(52, 134, "Panel")}
    ${_ar(92, 98, 120, 98)}
    <rect class="o fa" x="122" y="72" width="82" height="52" rx="8"/>
    ${_t(163, 88, "Station")}
    <rect class="fb" x="134" y="96" width="12" height="18" rx="2"/><rect class="fb" x="150" y="96" width="12" height="18" rx="2"/><rect class="fb" x="166" y="96" width="12" height="18" rx="2"/><rect class="fg" x="182" y="96" width="12" height="18" rx="2"/>
    ${_t(163, 140, "Power station")}
    ${_ar(206, 98, 238, 98)}
    <circle class="o fs" cx="272" cy="58" r="9"/><path class="o" d="M268 68h8v6h-8z"/>
    <rect class="o fa" x="262" y="84" width="20" height="30" rx="3"/><path class="o" d="M269 108h6"/>
    <circle class="o" cx="272" cy="140" r="11"/><path class="o" d="M272 140l0-9M272 140l8 5M272 140l-8 5"/>
    ${_t(272, 168, "Your devices")}
    ${_t(120, 174, "Plug in. No house wiring.", "middle", "m")}`, "Diagram: solar panel charges a power station, which powers a lamp, phone and fan") },

  solar_tilt: { cap: "Face the panel south and tilt it about 10 to 15 degrees. Keep it out of shade.", svg: _svg(`
    <path class="o" d="M8 150H312"/>
    ${_sun(268, 34)}
    ${_ar(254, 46, 216, 104, "flow y")}${_ar(266, 50, 228, 108, "flow y")}
    <path class="o fb" d="M100 136L210 112L212 120L102 144z"/>
    <path class="o" d="M120 140V150M200 122V150"/>
    ${_t(24, 62, "Face SOUTH", "start")}
    ${_t(24, 78, "Tilt 10–15°", "start", "m")}
    ${_t(12, 142, "NORTH", "start", "m")}${_t(308, 142, "SOUTH", "end", "m")}
    ${_t(160, 172, "Even a small shadow cuts output a lot.", "middle", "m")}`, "Side view: solar panel tilted about 12 degrees facing south with sun rays") },

  hybrid: { cap: "A home system: panels charge the battery through a hybrid inverter that also powers the house. Grid or generator is the backup.", svg: _svg(`
    <rect class="o fb" x="12" y="22" width="76" height="40" rx="3"/><path class="gl" d="M37 22V62M63 22V62M12 42H88"/>
    ${_t(50, 78, "Panels")}
    ${_ar(88, 44, 124, 76)}
    <rect class="o fa" x="124" y="60" width="84" height="48" rx="8"/>
    ${_t(166, 80, "Hybrid")}${_t(166, 96, "inverter")}
    <rect class="o fa" x="124" y="126" width="84" height="30" rx="6"/><rect class="fb" x="134" y="134" width="14" height="14" rx="2"/>
    ${_t(154, 146, "Battery", "start")}
    ${_ar(154, 110, 154, 124)}${_ar(178, 124, 178, 110)}
    <path class="o fa" d="M240 84L276 56L312 84z"/><rect class="o fa" x="246" y="84" width="60" height="38"/>
    ${_t(276, 140, "House")}
    ${_ar(210, 90, 240, 98)}
    <rect class="o dash" x="226" y="8" width="88" height="26" rx="5"/>
    ${_t(270, 25, "Grid / generator", "middle", "m")}
    ${_ar(250, 36, 206, 66, "flow dash")}
    ${_t(70, 176, "Power stays on in a blackout", "start", "m")}`, "Block diagram: panels, hybrid inverter, battery, house and grid") },

  gen_distance: { cap: "Run a generator outdoors, at least 6 m (20 ft) from the house, with the exhaust pointing away.", svg: _svg(`
    <path class="o" d="M8 64L74 28L140 64"/>
    <rect class="o fa" x="14" y="62" width="120" height="74"/>
    <rect class="o" x="24" y="80" width="18" height="18"/><rect class="o" x="104" y="80" width="18" height="18"/>
    <rect class="o fb" x="62" y="100" width="24" height="36"/>
    <rect class="o fs" x="236" y="96" width="62" height="40" rx="6"/>
    ${_t(267, 121, "GEN")}
    ${_ar(300, 106, 316, 106, "flow r")}
    <path class="o dash" d="M134 143V153M236 143V153M134 148H236"/>
    ${_t(185, 166, "6 m / 20 ft or more")}
    <path class="fl r" d="M146 40l22 22M168 40l-22 22"/>
    ${_t(14, 179, "Never in the house or garage", "start", "d")}`, "Plan view: generator outdoors 6 metres from house; red cross for indoors") },

  rain_catch: { cap: "Rain catching: roof, gutter, downspout, a first-flush pipe that throws away the dirty first rain, then a covered tank.", svg: _svg(`
    <path class="fl" d="M20 6l-4 10M44 2l-4 10M68 6l-4 10M92 2l-4 10M116 6l-4 10"/>
    <path class="o fa" d="M10 50L112 78L112 86L10 58z"/>
    <rect class="o" x="22" y="66" width="84" height="84"/>
    ${_t(56, 44, "Clean roof")}
    <rect class="o fb" x="106" y="84" width="22" height="7" rx="2"/>
    <path class="o" d="M122 91V98H242V108"/>
    ${_ar(124, 98, 150, 98)}${_ar(178, 98, 236, 98)}
    <rect class="o fa" x="145" y="98" width="10" height="44" rx="3"/>
    ${_t(150, 158, "first flush")}
    <rect class="o fa" x="190" y="108" width="104" height="52" rx="6"/>
    <path class="fw" d="M191 130H293V158Q293 159 292 159H192Q191 159 191 158z"/>
    <path class="o dash" d="M226 108H258"/>
    ${_t(268, 94, "mesh", "start", "m")}
    ${_t(242, 148, "Covered tank")}
    <path class="o" d="M294 150h10v8"/>${_t(304, 172, "Tap", "end", "m")}`, "Diagram: roof gutter downspout first flush pipe and covered water tank") },

  pantry: { cap: "Store food in sealed bins, off the floor, in a cool dry place. Label the dates and use the oldest first.", svg: _svg(`
    <path class="o" d="M8 164H312M24 20V164M200 20V164M24 64H200M24 108H200"/>
    <rect class="o fa" x="34" y="34" width="48" height="30" rx="4"/><path class="o" d="M34 42H82"/>
    <rect class="o fa" x="88" y="34" width="48" height="30" rx="4"/><path class="o" d="M88 42H136"/>
    <rect class="o fa" x="142" y="34" width="50" height="30" rx="4"/><path class="o" d="M142 42H192"/>
    <rect class="o fa" x="36" y="84" width="14" height="24"/><rect class="o fa" x="54" y="84" width="14" height="24"/><rect class="o fa" x="72" y="84" width="14" height="24"/><rect class="o fa" x="100" y="84" width="14" height="24"/><rect class="o fa" x="118" y="84" width="14" height="24"/><rect class="o fa" x="136" y="84" width="14" height="24"/>
    <path class="o" d="M34 152H110M34 158H110M120 152H196M120 158H196"/>
    <rect class="o fs" x="38" y="116" width="66" height="36" rx="10"/>${_t(71, 138, "RICE", "middle")}
    <rect class="o fs" x="124" y="116" width="66" height="36" rx="10"/>${_t(157, 138, "BEANS", "middle")}
    ${_t(214, 40, "• Sealed bins", "start")}${_t(214, 64, "• Date labels", "start")}${_t(214, 88, "• Off the floor", "start")}${_t(214, 112, "• Cool and dry", "start")}${_t(214, 136, "• Oldest first", "start")}`, "Shelves with sealed bins, cans, and rice and bean sacks on a pallet") },

  drying: { cap: "Dry fish: clean and split, salt, hang on a rack in the sun under a net, then seal in a dry container.", svg: _svg(`
    <path class="o" d="M8 160H312M60 160V70M260 160V70M52 76H268"/>
    ${_sun(40, 24)}
    <path class="o dash" d="M44 70Q160 28 276 70"/>
    ${_t(180, 30, "Net or cover (flies, rain)")}
    <path class="o" d="M90 76V88M125 76V88M160 76V88M195 76V88M230 76V88"/>
    <ellipse class="o fa" cx="90" cy="110" rx="9" ry="22"/><ellipse class="o fa" cx="125" cy="110" rx="9" ry="22"/><ellipse class="o fa" cx="160" cy="110" rx="9" ry="22"/><ellipse class="o fa" cx="195" cy="110" rx="9" ry="22"/><ellipse class="o fa" cx="230" cy="110" rx="9" ry="22"/>
    <path class="o" d="M90 132l-6 10M90 132l6 10M125 132l-6 10M125 132l6 10M160 132l-6 10M160 132l6 10M195 132l-6 10M195 132l6 10M230 132l-6 10M230 132l6 10"/>
    ${_t(160, 176, "Split, salt, dry in the sun, then seal", "middle", "m")}`, "Fish hanging on a drying rack under a net in the sun") },

  sprout_jar: { cap: "Sprouts: soak mongo overnight, then rinse twice a day and drain the jar upside down.", svg: _svg(`
    <g transform="rotate(160 100 80)">
      <rect class="o fa" x="70" y="40" width="60" height="84" rx="10"/>
      <rect class="o fb" x="68" y="34" width="64" height="8" rx="3"/>
      <path class="o" d="M84 118q4-14-2-26M100 120q-3-16 3-32M116 118q4-12-1-24"/>
    </g>
    <circle class="fw" cx="96" cy="150" r="3"/><circle class="fw" cx="108" cy="144" r="3"/><circle class="fw" cx="102" cy="160" r="3"/>
    <path class="o" d="M64 168Q100 186 136 168"/>
    ${_t(176, 44, "1  Soak overnight", "start")}${_t(176, 70, "2  Rinse twice a day", "start")}${_t(176, 96, "3  Drain upside down", "start")}${_t(176, 122, "4  Eat in 3–5 days", "start")}`, "Jar with a mesh lid draining upside down") },

  kamote: { cap: "Kamote: plant a vine cutting of 25 to 30 cm with about two thirds of it in the soil.", svg: _svg(`
    <rect class="soil" x="8" y="100" width="304" height="76"/>
    <path class="o" d="M8 100H312"/>
    <path class="o thick" d="M195 70L135 160"/>
    <ellipse class="o fa" cx="204" cy="62" rx="12" ry="7" transform="rotate(-25 204 62)"/><ellipse class="o fa" cx="186" cy="60" rx="12" ry="7" transform="rotate(25 186 60)"/>
    <path class="o" d="M165 115l-8 6M165 115l8 8M153 133l-8 6M153 133l8 8M141 151l-8 4"/>
    ${_t(232, 56, "Cutting:", "start")}${_t(232, 72, "25–30 cm", "start")}
    ${_t(232, 128, "Bury about", "start")}${_t(232, 144, "2/3 of the vine", "start")}`, "Sweet potato vine cutting planted at an angle with two thirds buried") },

  raised_bed: { cap: "A raised bed drains well in heavy rain. Mulch the top to keep the soil moist.", svg: _svg(`
    <path class="o" d="M8 140H312"/>
    <rect class="mulch" x="60" y="70" width="200" height="8"/>
    <rect class="soil" x="60" y="78" width="200" height="42"/>
    <rect class="soil2" x="60" y="120" width="200" height="20"/>
    <rect class="o" x="60" y="70" width="200" height="70"/>
    <path class="o" d="M100 70V48M140 70V44M180 70V48M220 70V44"/>
    <ellipse class="o fa" cx="92" cy="50" rx="9" ry="5"/><ellipse class="o fa" cx="108" cy="50" rx="9" ry="5"/><ellipse class="o fa" cx="132" cy="46" rx="9" ry="5"/><ellipse class="o fa" cx="148" cy="46" rx="9" ry="5"/><ellipse class="o fa" cx="172" cy="50" rx="9" ry="5"/><ellipse class="o fa" cx="188" cy="50" rx="9" ry="5"/><ellipse class="o fa" cx="212" cy="46" rx="9" ry="5"/><ellipse class="o fa" cx="228" cy="46" rx="9" ry="5"/>
    <circle class="fw" cx="120" cy="22" r="3"/><circle class="fw" cx="170" cy="14" r="3"/><circle class="fw" cx="210" cy="24" r="3"/>
    ${_t(160, 160, "Mulch • soil + compost • loosened ground")}
    ${_t(160, 176, "About 1.2 m wide so you can reach the middle", "middle", "m")}`, "Cross-section of a raised bed with mulch, soil and compost") },

  safe_room: { cap: "Pick the strongest interior room with no windows. Keep away from glass during a typhoon.", svg: _svg(`
    <rect class="o" x="30" y="16" width="260" height="130"/>
    <path class="o" d="M120 16V146M210 16V146M120 80H210"/>
    <rect class="saferoom" x="121" y="81" width="88" height="64"/>
    ${_t(165, 118, "SAFE ROOM")}
    <path class="win" d="M60 16H90M240 16H270M30 50V80M290 50V80M150 146H180"/>
    ${_t(75, 34, "windows", "middle", "m")}${_t(255, 34, "windows", "middle", "m")}
    ${_t(160, 168, "Interior room, no windows, strong door")}`, "Floor plan: interior room highlighted as the safe room, windows on outer walls") },

  roof_tie: { cap: "Most typhoon damage starts at the roof. Tie the roof to the walls and the walls to the foundation, and cover the windows.", svg: _svg(`
    <path class="o" d="M8 150H312"/>
    <rect class="o fa" x="70" y="84" width="180" height="66"/>
    <path class="o fb" d="M56 86L160 34L264 86z"/>
    <rect class="o fs" x="96" y="102" width="40" height="34"/><path class="o" d="M96 102L136 136M136 102L96 136"/>
    <rect class="o" x="190" y="108" width="28" height="42"/>
    <path class="strap" d="M84 78V150M236 78V150"/>
    ${_ar(8, 94, 44, 94)}${_ar(8, 114, 44, 114)}${_t(8, 84, "wind", "start", "m")}
    ${_t(160, 20, "Tie roof to walls to foundation")}
    ${_t(160, 170, "Plywood over windows, strong latches", "middle", "m")}`, "House front with roof tie-down straps and plywood over a window") },

  shelter_section: { cap: "A reinforced shelter: concrete roof and walls, a raised floor above past flood levels, a steel door and two vents.", svg: _svg(`
    <rect class="soil" x="8" y="152" width="304" height="28"/>
    <path class="o" d="M8 152H312"/>
    <rect class="fw" x="8" y="140" width="62" height="12"/><rect class="fw" x="250" y="140" width="62" height="12"/>
    <path class="o dash" d="M8 140H70M250 140H312"/>
    <rect class="o fg" x="72" y="130" width="176" height="22"/>
    <rect class="o fg" x="80" y="122" width="160" height="8"/>
    <rect class="o fg" x="84" y="40" width="10" height="82"/><rect class="o fg" x="226" y="40" width="10" height="82"/>
    <rect class="o fg" x="78" y="30" width="164" height="10"/>
    <rect class="o fb" x="82" y="70" width="6" height="52"/>
    <path class="o" d="M104 100H146M104 84H146M108 100V122M142 100V122M190 84H220M190 104H220"/>
    <path class="o" d="M236 112H264V98M200 30V14H214"/>
    ${_t(160, 24, "RC roof")}${_t(8, 84, "Steel", "start")}${_t(8, 98, "door", "start")}
    ${_t(268, 94, "air in", "start", "m")}${_t(218, 12, "air out", "start", "m")}
    ${_t(160, 170, "Floor above the flood line")}`, "Cross-section of a reinforced concrete shelter on a raised plinth with vents and steel door") },

  bunker_section: { cap: "An underground bunker below the water table fights seepage all year. Plan drainage, a sump pump, and vent pipes above flood level.", svg: _svg(`
    <rect class="soil" x="8" y="44" width="304" height="118"/>
    <rect class="fw" x="8" y="104" width="304" height="58"/>
    <path class="o" d="M8 44H312"/><path class="o dash wt" d="M8 104H312"/>
    <rect class="bunk" x="96" y="70" width="128" height="84"/>
    <rect class="wp" x="96" y="70" width="128" height="84"/>
    ${_ar(68, 132, 92, 132, "flow r")}${_ar(252, 132, 228, 132, "flow r")}
    <rect class="o fa" x="102" y="136" width="18" height="14"/>${_t(111, 147, "P", "middle", "m")}
    <path class="o" d="M110 136V60H110V28"/>${_t(110, 22, "pump out", "middle", "m")}
    <path class="o" d="M150 70V28M180 70V28"/>${_ar(150, 36, 150, 64)}${_ar(180, 62, 180, 36)}
    <path class="o" d="M206 74V152M214 74V152M206 90H214M206 106H214M206 122H214M206 138H214"/>
    <rect class="o fb" x="204" y="36" width="12" height="8"/>
    ${_t(236, 96, "Water table", "start")}${_t(236, 118, "rises in rain", "start", "m")}
    ${_t(160, 177, "Flooding is the big risk: ask an engineer", "middle", "d")}`, "Cross-section of an underground bunker with water table, sump pump, vents and escape ladder") },

  radio_range: { cap: "Buildings and hills block radio. A radio on a hilltop (a repeater) carries your signal much farther.", svg: _svg(`
    <path class="o fa" d="M14 126V104L36 86L58 104V126z"/>${_t(36, 142, "Home")}
    <rect class="o fg" x="80" y="104" width="18" height="22"/><rect class="o fg" x="104" y="96" width="22" height="30"/><rect class="o fg" x="132" y="108" width="16" height="18"/>
    <path class="o fa" d="M180 150Q250 40 312 150z"/>
    <path class="o" d="M248 95V66M242 72H254M244 80H252"/>
    <path class="o" d="M258 60a10 10 0 0 1 0 14M264 56a16 16 0 0 1 0 22"/>
    <path class="fl flow" d="M40 88Q130 22 236 64"/><path class="fh" d="M240 66L229 69L232 58z"/>
    ${_t(160, 162, "Handhelds: 1–3 km in town (estimate)")}
    ${_t(160, 178, "Hilltop repeater: 10–50 km (estimate)", "middle", "m")}`, "House, buildings and a hilltop repeater with signal path") },

  kit: { cap: "A basic first-aid kit. Pack it in a waterproof box and keep a card with each person's allergies and medicines.", svg: _svg(`
    <rect class="o fa" x="14" y="12" width="292" height="156" rx="12"/>
    <rect class="o" x="42" y="29" width="36" height="34" rx="3"/><path class="o" d="M42 46H78M60 29V63"/>${_t(60, 84, "Gauze")}
    <circle class="o fs" cx="160" cy="46" r="16"/><circle class="o" cx="160" cy="46" r="7"/>${_t(160, 84, "Tape")}
    <rect class="o fa" x="246" y="28" width="28" height="36" rx="3"/><path class="o" d="M250 46q4-5 8 0t8 0"/>${_t(260, 84, "ORS")}
    <rect class="o fa" x="48" y="108" width="24" height="18" rx="5"/><rect class="o fa" x="48" y="94" width="5" height="14" rx="2.5"/><rect class="o fa" x="54.500" y="94" width="5" height="14" rx="2.5"/><rect class="o fa" x="61" y="94" width="5" height="14" rx="2.5"/><rect class="o fa" x="67.500" y="94" width="5" height="14" rx="2.5"/>${_t(60, 148, "Gloves")}
    <circle class="o" cx="152" cy="120" r="5"/><circle class="o" cx="168" cy="120" r="5"/><path class="o" d="M152 116L166 94M168 116L154 94"/>${_t(160, 148, "Scissors")}
    <rect class="o fa" x="256" y="92" width="8" height="28" rx="4"/><circle class="o fs" cx="260" cy="126" r="7"/>${_t(260, 148, "Thermometer")}`, "First-aid kit contents: gauze, tape, rehydration salts, gloves, scissors, thermometer") },

  rocket: { cap: "A rocket stove burns small sticks very efficiently. Cook outdoors only.", svg: _svg(`
    <path class="o" d="M8 162H312"/>
    <path class="o fa" d="M50 112H100V62H140V148H50z"/>
    <path class="o thick" d="M12 126L56 126M12 136L56 136"/>
    ${_t(10, 112, "sticks", "start", "m")}
    <path class="o fs ani-flame" d="M84 144q-10-14 0-28q4 8 10 4q6 12-2 24z"/>
    ${_ar(120, 108, 120, 68, "flow y")}
    <path class="o fb" d="M92 62H148L144 36H96z"/>
    ${_ar(22, 152, 56, 142)}${_t(8, 150, "air", "start", "m")}
    ${_t(166, 54, "Pot above the fire", "start")}${_t(166, 92, "Insulated chimney", "start")}${_t(166, 130, "Feed small dry sticks", "start")}
    ${_t(160, 178, "Cook outdoors only", "middle", "d")}`, "Rocket stove with an L-shaped chamber, flame and cooking pot") },

  tippy_tap: { cap: "A tippy-tap: press the foot pedal to tip the jug, so you wash without touching anything.", svg: _svg(`
    <path class="o" d="M90 160V36M230 160V36M50 40H236"/>
    <path class="o" d="M160 54V40"/>
    <rect class="o" x="150" y="54" width="20" height="12"/>
    <path class="o fa" d="M138 66H182V120Q182 130 172 130H148Q138 130 138 120z"/>
    <path class="fl" d="M138 78Q120 84 118 132"/>
    <path class="o" d="M66 40V74"/><rect class="o fs" x="56" y="74" width="20" height="12" rx="2"/>${_t(66, 102, "Soap", "middle", "m")}
    <path class="o" d="M182 74Q206 92 206 146"/>
    <path class="o" d="M230 154H190"/><rect class="o fs" x="190" y="146" width="40" height="8"/>
    ${_t(160, 20, "Jug with a small hole near the top")}
    ${_t(160, 177, "Step on the pedal: water pours, hands stay clean", "middle", "m")}`, "Tippy-tap handwashing station made from a hanging jug, string, soap and foot pedal") },

  latrine_dist: { cap: "Dig a latrine at least 30 m from any well or spring, downhill of it and above flood level.", svg: _svg(`
    <path class="o soil" d="M8 70L312 150V176H8z"/>
    <path class="o" d="M30 66L44 54L58 66z"/><rect class="o fa" x="32" y="66" width="24" height="18"/>
    <rect class="o fs" x="236" y="112" width="28" height="22"/><path class="o" d="M232 112L250 100L268 112"/>
    ${_t(72, 62, "Well", "start")}${_t(272, 128, "Latrine", "start")}
    <path class="o dash" d="M44 54V32M250 100V32"/><path class="o" d="M44 32H250"/>
    ${_t(147, 26, "30 m or more")}
    ${_ar(70, 104, 170, 130)}
    ${_t(150, 166, "groundwater flows downhill")}`, "Hillside with a well uphill and a latrine at least 30 metres downhill") },

  gobag: { cap: "Pack the go-bag in this order. Keep documents and cash in a waterproof bag.", svg: _svg(`
    <path class="o" d="M54 34V24Q68 14 82 24V34"/>
    <rect class="o fa" x="20" y="34" width="96" height="128" rx="22"/>
    <rect class="o" x="34" y="108" width="68" height="44" rx="10"/>
    <circle class="o fs" cx="50" cy="60" r="9"/>${_t(50, 64, "1")}<circle class="o fs" cx="86" cy="60" r="9"/>${_t(86, 64, "2")}
    <circle class="o fs" cx="50" cy="90" r="9"/>${_t(50, 94, "3")}<circle class="o fs" cx="86" cy="90" r="9"/>${_t(86, 94, "4")}
    <circle class="o fs" cx="50" cy="130" r="9"/>${_t(50, 134, "5")}<circle class="o fs" cx="86" cy="130" r="9"/>${_t(86, 134, "6")}
    ${_t(140, 44, "1  Water, food", "start")}${_t(140, 68, "2  Light, radio", "start")}${_t(140, 92, "3  Medicine", "start")}${_t(140, 116, "4  Documents, cash", "start")}${_t(140, 140, "5  Clothes, poncho", "start")}${_t(140, 164, "6  Hygiene, whistle", "start")}`, "Backpack with six numbered packing priorities") },

  nomad_net: { cap: "NOMAD runs on your own Wi-Fi, so your family's phones can use it with no internet.", svg: _svg(`
    <rect class="o fa" x="14" y="50" width="52" height="86" rx="6"/><path class="o" d="M22 68H58M22 82H58M22 96H58"/><circle class="o fs" cx="28" cy="116" r="4"/>
    ${_t(40, 154, "NOMAD server")}
    ${_ar(68, 100, 122, 114)}
    <rect class="o fa" x="124" y="106" width="72" height="24" rx="5"/><path class="o" d="M138 106V94M182 106V94"/>
    <path class="o" d="M146 84a22 22 0 0 1 28 0M138 74a34 34 0 0 1 44 0"/>
    ${_t(160, 148, "Wi-Fi router")}
    <path class="o fa" d="M132 40a12 12 0 0 1 4-18a16 16 0 0 1 30 4a11 11 0 0 1 2 14z"/><path class="fl r" d="M140 18l22 22M162 18l-22 22"/>
    ${_t(192, 38, "no internet needed", "start", "m")}
    ${_ar(198, 114, 230, 114)}
    <rect class="o fa" x="232" y="100" width="22" height="38" rx="4"/><rect class="o fa" x="260" y="88" width="22" height="38" rx="4"/><rect class="o fa" x="288" y="100" width="22" height="38" rx="4"/>
    ${_t(270, 154, "Family phones")}
    ${_t(160, 174, "Open: http://DEVICE_IP:8080", "middle", "m")}`, "Server connected to a Wi-Fi router with no internet, serving family phones") },

  shelf_grow: { cap: "Indoor growing under LED lights: sprouts, microgreens and mushrooms. It needs power and good airflow.", svg: _svg(`
    <path class="o" d="M60 140V16M260 140V16M60 64H260M60 126H260"/>
    <rect class="o fs" x="80" y="22" width="160" height="8" rx="4"/>
    <path class="o dash" d="M100 30V50M160 30V50M220 30V50"/>
    <rect class="o fa" x="80" y="52" width="160" height="12"/>
    <path class="o" d="M96 52V40M112 52V36M128 52V42M144 52V38M160 52V42M176 52V36M192 52V40M208 52V38M224 52V42"/>
    <rect class="o fs" x="80" y="84" width="160" height="8" rx="4"/>
    <path class="o dash" d="M100 92V112M160 92V112M220 92V112"/>
    <rect class="o fa" x="80" y="114" width="160" height="12"/>
    <path class="o" d="M96 114V102M112 114V98M128 114V104M144 114V100M160 114V104M176 114V98M192 114V102M208 114V100M224 114V104"/>
    ${_t(272, 30, "LED", "start", "m")}${_t(272, 62, "tray", "start", "m")}
    ${_t(160, 164, "Sprouts, microgreens, mushrooms. Needs power.")}`, "Shelves with LED light bars above trays of seedlings") }
};

/* Figures that reuse the area icons */
const _inner = (k) => ICONS[k].replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
const _ic = (inner, cx, cy, s) => `<g transform="translate(${cx - 12 * s} ${cy - 12 * s}) scale(${s})" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
const _people = '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17 14.2c2.6.3 4.5 2.5 4.5 5.3"/>';
FIGS.start_five = { cap: "The first five things: water, food, light and power, medicine, and a family plan.", svg: _svg(
  [["water", "Water"], ["food", "Food"], ["solar", "Power"], ["med", "Medicine"], [null, "Family"]].map(([k, l], i) => {
    const cx = 32 + i * 64;
    return `<circle class="o fa" cx="${cx}" cy="76" r="27"/>${_ic(k ? _inner(k) : _people, cx, 76, 1.5)}<circle class="o fs" cx="${cx - 20}" cy="52" r="9"/>${_t(cx - 20, 56, String(i + 1))}${_t(cx, 128, l)}`;
  }).join("") + _t(160, 160, "Do these first. Then keep going.", "middle", "m"), "Five icons: water, food, light and power, medicine, family plan") };
FIGS.phone_tabs = { cap: "The six tabs at the bottom of the app.", svg: _svg(`
  <rect class="o fa" x="30" y="8" width="84" height="164" rx="14"/>
  <path class="o" d="M30 140H114"/>
  <circle class="fb" cx="45" cy="156" r="5"/><circle class="fb" cx="57" cy="156" r="5"/><circle class="fb" cx="69" cy="156" r="5"/><circle class="fb" cx="81" cy="156" r="5"/><circle class="fb" cx="93" cy="156" r="5"/><circle class="fb" cx="105" cy="156" r="5"/>
  <rect class="fg" x="44" y="26" width="56" height="10" rx="3"/><rect class="fg" x="44" y="44" width="56" height="10" rx="3"/><rect class="fg" x="44" y="62" width="56" height="10" rx="3"/><rect class="fg" x="44" y="80" width="40" height="10" rx="3"/>
  ${_t(134, 40, "Plan: checklist", "start")}${_t(134, 62, "Levels: small to big", "start")}${_t(134, 84, "Family: numbers, meeting place", "start")}${_t(134, 106, "Comms: reach each other", "start")}${_t(134, 128, "Guides: step by step", "start")}${_t(134, 150, "Drill: practice", "start")}`, "Phone with six tabs at the bottom") };
