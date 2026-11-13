/* Andam v31: War and nuclear, part 1. Pictures and the first six guides.
   Facts come from Ready.gov, CDC, FDA, WHO, ICRC and Philippine agencies (see each guide's Sources).
   Loaded after figures4.js, i18n.js and i18n2.js. Bisaya text is in war-ceb1.js and war-ceb2.js. */

/* ---------- pictures ---------- */

FIGS.nuke_timeline = {
  cap: "If a nuclear weapon goes off: 1 Flash: look away and drop. 2 Blast wave: stay down, cover your head. 3 Get inside a strong building within about 10 minutes. 4 Stay tuned to the radio and stay in for at least 24 hours.",
  get svg() {
    return _svg(`
    <circle class="fs o" cx="40" cy="44" r="13"/><path class="o" d="M40 22v-6M40 66v6M18 44h-6M62 44h6M24 28l-4-4M56 60l4 4M56 28l4-4M24 60l-4 4"/>
    ${_t(40, 98, T("1 Flash", "1 Silaw"))}${_t(40, 112, T("Look away,", "Ayaw tan-awa,"), "middle", "m")}${_t(40, 124, T("drop down", "yukbo"), "middle", "m")}
    <path class="o" d="M96 62q14-22 0-40M104 66q22-26 0-48M112 70q30-30 0-56"/>
    ${_t(120, 98, T("2 Blast wave", "2 Balod"))}${_t(120, 112, T("Stay down,", "Pabilin nga"), "middle", "m")}${_t(120, 124, T("cover head", "yukbo, tabuni ulo"), "middle", "m")}
    <path class="o fa" d="M178 70V46L200 28L222 46V70z"/><path class="o" d="M194 70V56h12v14"/>
    ${_t(200, 98, T("3 Inside", "3 Sulod"))}${_t(200, 112, T("Within about", "Sulod sa mga"), "middle", "m")}${_t(200, 124, T("10 minutes", "10 ka minuto"), "middle", "m")}
    <rect class="o fa" x="262" y="30" width="36" height="36" rx="5"/><circle class="o" cx="280" cy="52" r="8"/><path class="o" d="M270 30l12-12"/>
    ${_t(280, 98, T("4 Stay tuned", "4 Maminaw"))}${_t(280, 112, T("Radio on,", "Radyo, pabilin"), "middle", "m")}${_t(280, 124, T("stay in 24 h+", "sulod 24 oras+"), "middle", "m")}
    ${_t(160, 160, T("Get inside. Stay inside. Stay tuned.", "Sulod. Pabilin sa sulod. Maminaw."), "middle", "d")}`,
    "Four steps after a nuclear explosion: flash, blast wave, get inside, stay tuned");
  }
};

FIGS.fallout_decay = {
  cap: "Fallout fades fast. A planning rule: for every 7 times longer after the explosion, the radiation is about 10 times weaker. About 10% after 7 hours, 1% after 2 days, 0.1% after 2 weeks. This is why early sheltering works.",
  get svg() {
    return _svg(`
    <path class="o" d="M20 140H300"/>
    <rect class="o fs" x="36" y="30" width="36" height="110"/><rect class="o fa" x="108" y="124" width="36" height="16"/><rect class="o fa" x="180" y="137" width="36" height="3"/><rect class="o fa" x="252" y="139" width="36" height="1"/>
    ${_t(54, 24, "100%")}${_t(126, 118, "10%")}${_t(198, 131, "1%")}${_t(270, 133, "0.1%")}
    ${_t(54, 156, T("1 hour", "1 oras"), "middle", "m")}${_t(126, 156, T("7 hours", "7 oras"), "middle", "m")}${_t(198, 156, T("2 days", "2 adlaw"), "middle", "m")}${_t(270, 156, T("2 weeks", "2 semana"), "middle", "m")}
    ${_t(160, 176, T("Time after the explosion", "Panahon human sa pagbuto"), "middle", "d")}`,
    "Bars showing radiation falling to 10 percent after 7 hours, 1 percent after 2 days and 0.1 percent after 2 weeks");
  }
};

FIGS.shelter_house = {
  cap: "Where to shelter in a tall concrete building: the middle floors, in the middle of the building, away from outer walls and the roof. The top floor is worst because a flat roof collects fallout. Basements and underground parking are very good.",
  get svg() {
    return _svg(`
    <rect class="o fa" x="100" y="14" width="90" height="112"/>
    <path class="o" d="M100 42H190M100 70H190M100 98H190"/>
    <path class="o" d="M96 14H194"/>
    <rect class="o" x="100" y="126" width="90" height="30" style="stroke-dasharray:5 4"/>
    <circle class="fs o" cx="145" cy="56" r="7"/><circle class="fs o" cx="145" cy="84" r="7"/><circle class="fs o" cx="145" cy="112" r="7"/><circle class="fs o" cx="145" cy="141" r="7"/>
    <path class="o" d="M110 28H180" style="stroke-dasharray:2 5"/>
    ${_t(92, 28, T("Worst:", "Dili maayo:"), "end", "m")}${_t(92, 41, T("roof dust", "abog sa atop"), "end", "m")}
    ${_t(198, 58, T("Best:", "Labing maayo:"), "start", "m")}${_t(198, 71, T("middle floors", "tunga nga andana"), "start", "m")}
    ${_t(198, 114, T("Good: low,", "Maayo: ubos,"), "start", "m")}${_t(198, 127, T("inside rooms", "sulod nga lawak"), "start", "m")}
    ${_t(92, 140, T("Basement:", "Basement:"), "end", "m")}${_t(92, 153, T("very good", "maayo kaayo"), "end", "m")}
    ${_t(160, 174, T("Stay away from outer walls and windows", "Ipahilayo sa gawas nga dingding ug bintana"), "middle", "d")}`,
    "Cross-section of a tall concrete building showing the best floors to shelter on");
  }
};

FIGS.decon_steps = {
  cap: "Came in from outside after fallout? 1 Take off your outer clothes: this removes up to 90% of the dust. Bag them and keep them away from people. 2 Wash with soap and shampoo, no conditioner. Do not scrub. 3 Put on clean clothes.",
  get svg() {
    return _svg(`
    <path class="o fa" d="M22 40l16-10h20l16 10l-10 14l-8-5v42H40V49l-8 5z"/><path class="o" d="M30 34l40 56" style="stroke-dasharray:3 4"/>
    ${_t(54, 124, T("1 Clothes off", "1 Hukasa sinina"), "middle")}${_t(54, 138, T("removes 90%", "wagtang 90%"), "middle", "m")}${_t(54, 150, T("bag them", "ibag ug ipalayo"), "middle", "m")}
    <path class="o" d="M138 34h44M160 34v10"/><path class="o fw" d="M146 56q-3 8 0 12M160 52q-3 8 0 12M174 56q-3 8 0 12M146 80q-3 8 0 12M160 76q-3 8 0 12M174 80q-3 8 0 12"/>
    ${_t(160, 124, T("2 Wash", "2 Hugasi"), "middle")}${_t(160, 138, T("soap, shampoo", "sabon, shampoo"), "middle", "m")}${_t(160, 150, T("no conditioner", "walay conditioner"), "middle", "m")}
    <path class="o fa" d="M242 40l16-10h20l16 10l-10 14l-8-5v42h-26V49l-8 5z"/><path class="o" d="M254 72l8 8l16-18"/>
    ${_t(266, 124, T("3 Change", "3 Ilisi"), "middle")}${_t(266, 138, T("clean clothes", "limpyong sinina"), "middle", "m")}${_t(266, 150, T("from a drawer", "gikan sa aparador"), "middle", "m")}
    ${_t(160, 172, T("Blow your nose. Wipe eyes, ears, eyelashes.", "Suka ang ilong. Hinloi ang mata, dalunggan, pilok."), "middle", "d")}`,
    "Three steps to clean radioactive dust off yourself: outer clothes off, wash, clean clothes");
  }
};

FIGS.uxo_rule = {
  cap: "Found a bomb, shell, grenade or strange metal object? 1 Do not touch it. 2 Do not move it. 3 Walk back the way you came. 4 Mark the place from far away. 5 Tell the barangay, police or 911.",
  get svg() {
    return _svg(`
    <path class="o fs" d="M20 34l8-8h8l8 8v18l-8 8h-8l-8-8z"/><path class="o" d="M28 40v-8M32 40v-10M36 40v-8"/>
    ${_t(32, 84, "1", "middle")}${_t(32, 98, T("Do not", "Ayaw"), "middle", "m")}${_t(32, 110, T("touch", "hilabti"), "middle", "m")}
    <path class="o fs" d="M84 34l8-8h8l8 8v18l-8 8h-8l-8-8z"/><path class="o" d="M96 36v20M88 46h16"/>
    ${_t(96, 84, "2", "middle")}${_t(96, 98, T("Do not", "Ayaw"), "middle", "m")}${_t(96, 110, T("move", "ibalhin"), "middle", "m")}
    <path class="o" d="M144 46h34M144 46l9-8M144 46l9 8"/>
    ${_t(160, 84, "3", "middle")}${_t(160, 98, T("Walk back", "Balik sa"), "middle", "m")}${_t(160, 110, T("same way", "gikan nimo"), "middle", "m")}
    <circle class="o fa" cx="208" cy="52" r="5"/><circle class="o fa" cx="224" cy="56" r="5"/><circle class="o fa" cx="240" cy="52" r="5"/><path class="o" d="M224 44V28M224 28h10v7h-10"/>
    ${_t(224, 84, "4", "middle")}${_t(224, 98, T("Mark it", "Markahi"), "middle", "m")}${_t(224, 110, T("from far", "sa layo"), "middle", "m")}
    <rect class="o fa" x="276" y="26" width="24" height="38" rx="5"/><path class="o" d="M282 32h12M286 58h4"/>
    ${_t(288, 84, "5", "middle")}${_t(288, 98, T("Tell 911", "Tawag 911"), "middle", "m")}${_t(288, 110, T("or barangay", "o barangay"), "middle", "m")}
    ${_t(160, 150, T("Children: never pick up strange objects.", "Mga bata: ayaw pagkuha og katingad-ang butang."), "middle", "d")}
    ${_t(160, 168, T("Old war shells can still explode after many years.", "Ang daan nga bala sa gubat mahimo pa gihapong mobuto."), "middle", "m")}`,
    "Five steps for a suspected explosive item: do not touch, do not move, walk back, mark, tell");
  }
};

/* ---------- guides 1 to 6 ---------- */

const HOWTO_WAR1 = [
  {
    id: "war1", title: "War and nuclear: start here (what could really happen to us)", icon: "shelter",
    time: "About 1 hour to read, then one family talk", cost: "Free",
    intro: "War and nuclear weapons are frightening, so this section is plain about what is likely, what is unlikely and what really protects people. Most of the protection is simple: be inside a strong building, stay there, listen to the radio, and keep water and food. You do not need a bunker. Read this guide first, then the others in this group.",
    buy: [],
    steps: [
      { t: "Know what is likely and what is unlikely", d: "The Philippines has no nuclear weapons and no working nuclear power plant. The Bataan plant was finished in the 1980s but never ran. A nuclear explosion near us is very unlikely, but it would be so serious that everyone should know the first steps. More realistic dangers are fighting at sea or in the air that reaches land, cut power, fuel and food supplies, cyber attacks, a lost radioactive source, or a leak from a plant in another country. Much of what you do for typhoons and floods (water, food, radio, light, first aid, a family plan) also covers most of what war brings." },
      { t: "Three kinds of danger, three kinds of protection", d: "1. Blast, fire and flying glass from explosions: protection is distance and strong walls. 2. Radiation from fallout (radioactive dust after a nuclear explosion): protection is thick walls, being inside, and time, because it fades fast. 3. Disruption (no power, phone, fuel, cash or news): protection is supplies and a plan. When something happens, ask which one you face." },
      { t: "Learn who gives official warnings", d: "Warnings come from NDRRMC, your municipal DRRM office and barangay, and government radio and TV. Phone alerts may not work. Keep a battery or hand-crank radio. Write your barangay and municipal DRRM numbers on the Family tab. Do not move because of a forwarded message. Check with two official sources first." },
      { t: "Agree three family rules", d: "1. Where do we go first? Pick the strongest building you can reach in a few minutes. 2. Who looks after the children? Schools have their own plans: do not all run to the school, because crowds and traffic make things worse. 3. How do we find each other? Choose one contact outside the area and a meeting place, and write them on the Family tab. In an attack, people usually stay where they are inside and meet later." },
      { t: "Know your buildings", d: "Walk through your home, your workplace and your child's school. Where is the strongest inner room? Is there a concrete building within a few minutes' walk, such as a church, school, hospital or barangay hall? Save it on the Family tab under Important places as a Safe place. Ask your municipal DRRM office whether any building has been named as a shelter." },
      { t: "Build supplies in three layers", d: "Layer 1: 3 days of water and food (the Start here guide). Layer 2: 14 days of water, food and medicine, which is what Ready.gov advises when the threat is high. Layer 3: 3 months of staples for a long disruption. The Supply kit guide in this group has the full list." },
      { t: "Practice a 'get inside' drill", d: "Ask: if we heard a warning right now, how fast could everyone reach the safe room? Time it. Practice with the Drill tab. Walk with the slowest person, carry the go-bag, and check that the radio works." },
      { t: "Talk to the children", d: "Use short, true, calm words: 'We have a plan. Grown-ups are working to keep us safe.' The guide on fear, children and community has more." }
    ],
    warn: [
      "Do not buy 'radiation pills' or gadgets online. Most are fake or useless. Potassium iodide should come from health authorities or a licensed pharmacist, and only be taken when officials say so.",
      "Do not leave a safe building to look for family while there may be fallout. Stay put and meet later.",
      "Rumors spread fast in a crisis. Do not forward warnings you cannot check."
    ],
    sources: ["Ready.gov: Radiation emergencies and nuclear explosion (get inside, stay inside, stay tuned)", "CDC: Radiation emergencies", "Department of Energy, Philippines: updated national radiological emergency plan, July 2026 (GMA News)", "World Nuclear Association: Nuclear power in the Philippines (Bataan plant never operated)"]
  },
  {
    id: "war2", title: "Nuclear explosion: the first hour, step by step", icon: "shelter",
    time: "20 minutes to read, then practice", cost: "Free",
    intro: "If a nuclear weapon is ever used, the first minutes matter most, and you may get no warning. The simple rule that emergency services use is: Get inside. Stay inside. Stay tuned. Most people who are not close to the blast are hurt, if at all, by radioactive dust that falls later, and a strong building protects you from most of it.",
    buy: [],
    steps: [
      { fig: "nuke_timeline", t: "What happens, in order", d: "1. A flash brighter than the sun. It can blind you for up to a minute. 2. Heat. 3. A blast wave that arrives seconds to a minute or more later, depending on distance. It breaks glass and buildings and throws debris. 4. Fallout: radioactive dust and debris that falls from the sky, usually at least 10 minutes later, and can drift many kilometers downwind. Phones, TV and internet may stop working." },
      { t: "At the flash: look away and drop", d: "Do not look at the flash or the fireball. Turn away, drop face down, cover your head with your arms and close your eyes. Stay down until the blast wave has passed. If the blast is far away it can take 30 seconds or more to arrive. If you are outside, take cover behind anything solid." },
      { t: "In a jeepney, bus, tricycle or car", d: "Stop safely, duck down below the windows and cover your head. After the blast wave passes, leave the vehicle and go to the nearest strong building. Do not try to drive away: roads jam, and you may be caught in the open when the fallout arrives." },
      { t: "Get inside the best building you can reach in a few minutes", d: "You usually have 10 minutes or more before fallout arrives. Go into the nearest strong building: concrete or brick is best. If you can reach a basement, underground parking or a multi-story building within a few minutes, go there. Move to the middle of the building, away from outer walls and the roof. A middle floor is better than the top floor. Any building is better than being outside." },
      { fig: "shelter_house", t: "Once inside", d: "Close windows and doors. Turn off fans and air-conditioners that pull in outside air. Bring pets inside. If you were outside, take off your outer clothes and wash (see After fallout). Stay where you are, even if you are separated from family: the inside of a strong building is the safest place for everyone, and you can meet later. Children at school should stay at school." },
      { t: "Stay tuned", d: "Turn on a battery or hand-crank radio and listen for official instructions from NDRRMC and your local government. Mobile networks may be jammed or down: use short text messages, not calls. Expect to stay inside at least 24 hours unless officials say otherwise. Outside radiation drops fast (see the fallout picture in the next guide)." },
      { t: "Help the injured, but do not go out", d: "Glass cuts, burns and falling debris cause most injuries. Give first aid inside using the Quick guides: stop bleeding, cool burns with clean water, cover wounds. Do not go outside to rescue people in the first hours unless officials say it is safe. Call for help when phones work." },
      { t: "If you are far away from the blast", d: "Most people in the Philippines would be far from any blast. Even so, fallout can drift far, so listen for official advice. Officials will say whether to shelter or evacuate. Do not drive away on your own through falling dust." }
    ],
    warn: [
      "Do not look at the flash. Do not run outside to see what happened.",
      "Do not drive away on jammed roads. Get into the nearest strong building.",
      "Do not shelter on a roof or on the top floor of a building with a flat roof."
    ],
    sources: ["Ready.gov: Nuclear explosion and radiation emergencies", "CDC: Radiation emergencies", "Guam Homeland Security: blast wave can take 30 seconds or more to arrive"]
  },
  {
    id: "war3", title: "Fallout shelter at home: choose, seal and stock a safe room", icon: "shelter",
    time: "A weekend to set up, then supplies over time", cost: "About ₱3,000–15,000 for supplies (estimate). Digging a bunker is not advised here.",
    intro: "Protection from fallout comes from three things: mass (thick walls, concrete, soil), distance (away from walls and the roof) and time (radiation fades). In Leyte you do not need to dig a bunker, which can flood. A strong inner room on a lower floor of a concrete building, with extra weight stacked against the walls, is a good start. The Shelter guides cover typhoon and flood strength.",
    buy: [
      { t: "Drinking water for 14 days: {n*56} liters for {ppl}", n: "4 liters per person per day for 14 days. That is about {n*56/19} refilling-station gallons. Replace it every 6 months." },
      { t: "Food that needs no cooking for 14 days", n: "Canned fish and meat, biscuits, peanut butter, dried fruit, instant oats. Choose sealed packages. Start with what you eat already." },
      { t: "Battery or hand-crank radio (AM/FM, shortwave if possible) and spare batteries", p: "About ₱800–2,500 (estimate)" },
      { t: "Flashlights or headlamps, batteries, and power banks" },
      { t: "Heavy plastic sheeting and strong tape (duct tape)", p: "About ₱500–1,500 (estimate)", n: "To cover gaps, vents and broken windows against dust." },
      { t: "N95 or KN95 masks, at least 3 each ({n*3} for {ppl})", n: "For dust. A damp cloth over nose and mouth is the last choice." },
      { t: "A bucket with a lid and strong garbage bags, soap, toilet paper, wet wipes", n: "For the toilet in a sealed room." },
      { t: "Medicines for 14 to 30 days, first-aid kit, oral rehydration salts, thermometer" },
      { t: "Sacks, jugs or boxes to fill with water, sand or soil", n: "Extra weight for the walls. Do not stack heavy things on weak floors." },
      { t: "Blankets, mats, a battery clock, paper and pen", n: "Keep a written log of times." },
      { t: "Waterproof bag with copies of important papers, and some cash in small bills" }
    ],
    steps: [
      { fig: "shelter_house", t: "Choose the room: mass, distance, time", d: "Radiation is blocked by heavy material. The more walls, concrete, brick and soil between you and the outside, the better. Stay away from outer walls and from the roof, where dust collects. A flat roof collects fallout, so a top floor is poor. Pick a room that is also safe in a typhoon and earthquake." },
      { t: "Best, fair and poor places", d: "Best: basement or underground parking (rare here), the middle floors of a multi-story concrete building such as a church, school, hospital or barangay hall, or a windowless inner room or concrete stairwell. Fair: an inner room on the ground floor of a concrete-block house, with water jugs or sandbags stacked along the walls. Poor: light houses of wood, nipa or GI sheet, vehicles, tents, and rooms next to a neighbor's flat roof. If your house is light, plan to move to the nearest strong building within the first minutes." },
      { t: "Add mass", d: "Fill containers with water, sand or soil and stack them against the walls and window openings. Filled bookshelves help. Keep heavy weight on the ground floor or on strong slabs, not on weak upper floors that could fall after an earthquake." },
      { t: "Seal against dust, not against air", d: "Fallout is dust. Close doors and windows. Stop fans and air-conditioners that pull in outside air. Stuff damp cloths under doors and tape plastic over gaps and vents. Do not make the room fully airtight: people need air. Use an N95 mask or a damp cloth over nose and mouth if dust gets in." },
      { t: "Stock the room", d: "Keep water, food, medicine, the radio and light in the room before anything happens. Eat food that needs no cooking. Never burn charcoal, gas or kerosene in a closed room: carbon monoxide kills. Use a flashlight, not candles." },
      { t: "Toilet and trash", d: "Use a bucket with a lid and a bag. Wash hands with soap or wipes. Keep waste bags tied and in one corner away from food and water. See the Hygiene and sanitation guides." },
      { t: "Living inside", d: "Make shifts: one person listens to the radio and writes down what is said and when. Drink water, keep medicines on time, rest. Keep children busy with games, drawing and stories. Keep pets in carriers or on a leash." },
      { fig: "fallout_decay", t: "When can we go out?", d: "Follow officials. As a planning rule, radiation from fallout is about 10 times lower after 7 hours, 100 times lower after 2 days and 1,000 times lower after 2 weeks. Plan for at least 24 hours inside unless officials say otherwise. Short trips are safer the longer you wait. Go out only when officials say it is safe, or when an evacuation is ordered." },
      { t: "If your home is not a good shelter", d: "If you live in a light house and a strong building is within a few minutes' walk, decide in advance to go there at the first warning. Walk the route now. Take your go-bag and radio. Write the building on the Family tab under Important places." }
    ],
    warn: [
      "Never burn charcoal, gas or kerosene inside a closed room. Carbon monoxide kills.",
      "Do not stack heavy water or sand on a weak upper floor.",
      "Do not leave early because of a rumor or to look for family.",
      "Do not bury yourself in a hole. In Leyte, high water and earthquakes make bunkers risky (see Shelter 3)."
    ],
    sources: ["Ready.gov: Radiation emergencies (shelter in the middle of a building, brick or concrete best)", "Alaska Division of Homeland Security: flat roofs collect fallout, middle floors are best", "CDC: Radiation emergencies and shelter in place"]
  },
  {
    id: "war4", title: "After fallout: cleaning, food, water and leaving", icon: "water",
    time: "20 minutes to read", cost: "Free to little",
    intro: "Radioactive dust on your skin, clothes, food and water is the main danger after fallout. The good news: removing outer clothes and washing takes off most of it, and sealed food and stored water are safe. This guide is for after you are inside and for the days that follow.",
    buy: [
      { t: "Strong plastic bags for dirty clothes" },
      { t: "Soap, shampoo, towels, clean clothes sealed in a drawer or box", n: "Do not buy conditioner for this. It makes dust stick to hair." },
      { t: "Waterproof gloves and dust masks (N95)" },
      { t: "Sealed bottled water and sealed food" }
    ],
    steps: [
      { fig: "decon_steps", t: "If you were outside: take off your outer clothes", d: "Taking off your outer layer of clothes removes up to 90% of radioactive dust. Do it before going into the living area if you can, at the doorway or in the bathroom. Roll the clothes inward and do not shake them. Put them in a plastic bag, tie it, and keep the bag far from people and pets." },
      { t: "Wash yourself", d: "If you can shower, use warm water, soap and shampoo. Do not scrub, scald or scratch your skin. Do not use conditioner. Cover cuts so dust cannot get in. If you cannot shower, wash your hands, face and bare skin at a tap with soap, or wipe them with a damp cloth. Blow your nose gently and wipe your eyelids, eyelashes and ears. Do not use bleach or harsh disinfectant on skin." },
      { t: "Clean clothes, shoes and pets", d: "Put on clean clothes that were stored in a closed closet or drawer. Wipe shoes with a damp cloth and leave them outside. Wipe or wash pets gently, wear gloves, and bag the cloths. You may use tap water for washing even if you wait before drinking it." },
      { t: "Food", d: "Safe to eat: food in sealed cans, bottles and boxes, food in the fridge or freezer, and food kept in cupboards. Wipe the outside of anything that was outside with a damp cloth before you open it. Not safe: food or drinks that were left open outside. Do not pick or eat food from your garden or farm until officials say it is safe. Keep animals inside and feed them stored feed." },
      { t: "Water", d: "Sealed bottled water is the only water that is certain to be clean. Water in a toilet tank (not the bowl), water heater or covered container is safe. Boiling does not remove radioactive material, but it still kills germs. Tap water is likely safe, but wait for official tests before drinking it if you can. Do not use rainwater or open wells and ponds until they are tested." },
      { t: "Babies and breastfeeding", d: "Use ready formula or breast milk you stored before, with clean bottles, if you can. Officials may advise a breastfeeding mother in the affected area to pause and to express and throw away the milk for a short time. If no other food is available for the baby, keep breastfeeding." },
      { t: "Cleaning the house", d: "Dust is the problem. Wipe floors and surfaces with damp cloths. Do not sweep dry. Wear gloves and a mask. Bag the cloths and keep the bag away from people. Wash your hands afterwards." },
      { t: "Leaving the shelter", d: "Follow official instructions. If told to evacuate, take your go-bag, medicines, papers, radio and water. Wear long clothes, a hat and shoes, and cover your nose and mouth. Use the routes officials announce. Reception centers may check you for radiation. If told to stay one more day, stay." },
      { t: "Coming back and the weeks after", d: "Officials will test and mark areas. Do not eat local garden food, milk or fish until cleared. Write down where you were and when, in case a doctor asks. Return only when officials say so." }
    ],
    warn: [
      "Do not scrub skin hard or use bleach on skin.",
      "Do not drink or cook with rainwater until it has been tested.",
      "Do not eat garden food, wild food or local fresh milk until officials say it is safe.",
      "Radioactive dust is on things, not on healthy people. A washed person cannot pass it on."
    ],
    sources: ["CDC: How to self-decontaminate after a radiation emergency", "CDC: Food, drinking water and medicine safety in a radiation emergency", "CDC: Breastfeeding and infant feeding in a radiation emergency", "WHO: Radioactivity in food after a nuclear emergency"]
  },
  {
    id: "war5", title: "Radiation sickness, iodine pills and medical care", icon: "med",
    time: "25 minutes to read", cost: "Free. Iodine pills are only given or sold by health authorities.",
    intro: "Most people who are far from a blast will not get radiation sickness. Knowing the signs and what the iodine pill really does helps you stay calm and not waste money or take something harmful. This guide uses official guidance from the US FDA, the CDC and the WHO. Please ask a doctor or nurse to read it with you before a real emergency.",
    buy: [
      { t: "Potassium iodide (KI) tablets, only from the health office or a licensed pharmacist", n: "Not an everyday item here. Ask the rural health unit or municipal health office if it is stocked for emergencies. Check the strength (130 mg or 65 mg) and expiry date. Never buy it from online sellers you cannot check." },
      { t: "A digital thermometer and a notebook for symptoms and times" }
    ],
    steps: [
      { t: "What radiation sickness is", d: "Radiation sickness (acute radiation syndrome) happens only after a high dose to most of the body in a short time. The first signs are nausea, vomiting and diarrhea, starting from minutes to days later. Then people often feel better for a while, and later get ill again with tiredness, loss of appetite, fever, skin redness or burns, and hair loss. Vomiting that starts early and keeps repeating points to a higher dose. Fear, flu and food poisoning also cause vomiting, so do not assume the worst." },
      { t: "If someone has these signs", d: "Tell health workers when the signs began, where the person was and for how long. Wash off radioactive dust first. Give small sips of clean water. Cover skin burns with a clean cloth. Get medical care when officials say it is safe. Radiation sickness is not catching. Dust on clothes and skin can spread, so wash it off." },
      { t: "What potassium iodide (KI) does", d: "The thyroid gland takes up iodine. If a reactor accident or nuclear explosion releases radioactive iodine, KI fills the thyroid with harmless iodine so the radioactive kind cannot get in. It protects only the thyroid, and only against radioactive iodine. It does not protect against other radiation or other radioactive materials. It works best if taken just before or soon after exposure, and it protects for about 24 hours." },
      { t: "Dose by age (from the FDA and CDC)", d: "Take it only when officials say. Adults over 18, and pregnant or breastfeeding women: 130 mg. Children 3 to 18 years: 65 mg. Anyone 70 kg (about 150 lb) or more takes the adult dose, whatever their age. Babies and children 1 month to 3 years: 32 mg. Newborns up to 1 month: 16 mg, a single dose. Babies, children and unborn babies are most at risk. Adults over 40 are the least likely to need it. Take one dose a day only while officials say there is a risk, usually a day or two. Follow the package label first." },
      { t: "Giving small doses to children", d: "A 65 mg tablet is scored in quarters: half is about 32 mg, one quarter about 16 mg. If you only have 130 mg tablets, one example from the FDA: dissolve one tablet in about 240 mL (8 ounces) of a drink, and 30 mL (1 ounce) then holds about 16 mg. Practice the measuring with a nurse beforehand. In a real emergency, a bit more than the dose is much less risky than none." },
      { t: "Who needs to be careful", d: "Ask a doctor in advance if you or a child have an iodine allergy, a thyroid illness such as Graves' disease or nodules, or a rare skin or blood vessel illness (dermatitis herpetiformis, hypocomplementemic vasculitis). For a short course, the benefit is greater than the risk for any age. Newborns who get KI should have their thyroid checked later." },
      { t: "What does not work", d: "Iodized salt, Betadine (povidone-iodine), tincture of iodine, kelp and iodine supplements are not a replacement. They do not contain a safe, effective dose and some can poison you. Vitamins, herbal drinks and 'anti-radiation' gadgets do not work." },
      { t: "Medicines and other health needs", d: "Keep taking your regular medicines. Medicine that was inside, or in a container wiped clean, is safe. Keep 14 to 30 days of your medicines in your kit. Hospitals will be crowded. Follow instructions from reception centers and health workers." },
      { t: "Later health", d: "A small dose usually causes no health effect. A higher dose can raise the chance of cancer many years later, so health workers may follow up. Keep a note of where you were and when. Most people will need no special treatment." }
    ],
    warn: [
      "Take iodine pills only when officials say, and never more than the dose for the age.",
      "Do not use Betadine, tincture of iodine, iodized salt or kelp instead of KI. They can harm you and do not protect.",
      "Radiation sickness is not catching. Radioactive dust on clothes and skin is, so wash it off first.",
      "Do not buy 'radiation cure' products online."
    ],
    sources: ["FDA: Potassium iodide as a thyroid blocking agent in radiation emergencies (2001 guidance)", "CDC: Potassium iodide (KI) and Acute radiation syndrome", "American Thyroid Association: Nuclear radiation FAQ", "WHO: Iodine thyroid blocking"]
  },
  {
    id: "war6", title: "Plant accidents, lost radioactive sources and 'dirty bombs'", icon: "shelter",
    time: "20 minutes to read", cost: "Free",
    intro: "Not every radiation emergency is a nuclear bomb. A plant accident in another country, a lost medical or industrial source, or a 'dirty bomb' (an ordinary explosive that scatters radioactive material) are different and usually affect a smaller area. The first steps are still: get inside, stay inside, stay tuned.",
    buy: [],
    steps: [
      { t: "The situation in the Philippines", d: "The Philippines has no working nuclear power plant. The Bataan plant was built but never operated. The government is studying nuclear power, and in July 2026 the Department of Energy updated the national radiological emergency plan to cover emergencies in the Philippines, harmful radiological devices, and nuclear emergencies outside the country. If a plant is ever built, ask your municipal DRRM office for its emergency plan." },
      { t: "A plant accident in another country", d: "Radioactive material can travel far in the air but reaches faraway places in small amounts. For distant places, official advice is often 'no action needed' or limits on certain foods. Follow the advice of the Philippine government and the health authorities. Do not rush to buy or take iodine pills unless officials say so." },
      { t: "A plant accident near you", d: "Officials may order a shelter-in-place or an evacuation, hand out KI, and limit local food. Follow the order. If told to shelter: get inside, close windows and doors, turn off fans, and listen to the radio. If told to evacuate: go quickly along the route announced, with your go-bag." },
      { t: "A 'dirty bomb'", d: "The explosion itself causes most of the injuries, and radiation is usually low. If you are near it, leave the immediate area by the shortest way and go inside a building. Cover your nose and mouth with cloth. Do not touch debris. Remove your outer clothes and wash (see After fallout). Then stay tuned for instructions." },
      { t: "A lost or stolen radioactive source", d: "A source can be a small metal capsule or container, sometimes with a three-bladed radiation symbol. Do not pick it up or take it home. Keep people away, many meters if possible. Tell the barangay, the police or the municipal DRRM office, and say it may be radioactive. Do not sell it as scrap. A person who handled one and has skin burns, nausea or vomiting should see a doctor and mention it." },
      { t: "Words you may hear", d: "Exposure means radiation reaching you. Contamination means radioactive dust on or in something. Dose is how much radiation your body takes in. Becquerel counts radioactive decays, and sievert (Sv) or gray (Gy) measure dose. Background radiation is the natural level that is always around us. A cheap Geiger counter or phone app cannot tell you if you are safe, so trust official measurements." },
      { t: "Where to get official information", d: "Listen to NDRRMC, your municipal DRRM office, the DOH and national government radio. Radiation safety is handled by the Philippine Nuclear Research Institute (DOST-PNRI), which is passing its regulation role to a new agency, PhilATOM. Ask your municipal DRRM office for the radiological emergency contact and write it on the Family tab." }
    ],
    warn: [
      "Do not pick up any strange metal capsule, container or device.",
      "Do not trust phone apps or cheap detectors to decide whether it is safe.",
      "Do not take iodine pills unless officials say so."
    ],
    sources: ["Department of Energy, Philippines: updated national radiological emergency plan, July 2026 (GMA News)", "World Nuclear Association: Nuclear power in the Philippines", "CDC: Radiation emergencies (dirty bomb, shelter in place)", "Ready.gov: Radiation emergencies"]
  }
];
