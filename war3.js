/* Andam v31: War and nuclear, part 3. Science and myths guides, a one-page checklist,
   short offline quick guides (gd41-gd49) and the Plan category "War supply kit". */

const HOWTO_WAR3 = [
  {
    id: "war15", title: "How it works: radiation, fallout and what the words mean", icon: "med",
    time: "30 minutes to read", cost: "Free",
    intro: "Understanding a little of the science makes the advice make sense and keeps you from fear and from false cures. This guide explains radiation, how a nuclear explosion hurts, what fallout is, why time and walls protect you, and the words you will hear on the radio.",
    buy: [],
    steps: [
      { t: "What radiation is", d: "Radiation is energy that travels as rays or particles. Some is harmless and everywhere: light, radio waves, and the natural background radiation from soil, rocks, space and food. 'Ionizing' radiation, from nuclear reactions, has enough energy to damage the cells of the body. A radioactive material is one that gives off this radiation as it slowly changes into another material, which is called decay." },
      { t: "Kinds of radiation and what stops them", d: "Alpha particles are stopped by paper or skin, and are dangerous mainly if you breathe or swallow the material. Beta particles are stopped by thin metal or thick clothing, but can burn skin. Gamma rays pass through a lot but are reduced by thick walls, concrete, earth and water. In fallout, gamma rays from dust outside are the main reason for sheltering behind thick material." },
      { t: "Exposure versus contamination", d: "Exposure means radiation reaches your body, like being in sunlight. Contamination means radioactive dust is on or in something, like a person with dirt on the skin. A person who is exposed does not become radioactive. A person with dust on clothes and skin is contaminated and can spread dust, so wash it off. Removing outer clothes removes most of it." },
      { t: "How a nuclear explosion hurts", d: "Near the blast, most harm comes from three things: the blast wave (about half the damage), heat and fire (about a third), and the initial radiation. Farther away, flash blindness and glass injuries are the main concerns. Fallout then follows downwind. The area of severe damage depends on the size of the weapon, and modern weapons can be much larger than the ones used in 1945." },
      { t: "What fallout is", d: "When a bomb explodes near the ground, it sucks up soil and debris, which mix with radioactive material and fall back as dust, sometimes visible as ash or fine grit. The heaviest and most dangerous particles fall in the first hours near and downwind of the blast. The lighter ones travel farther and arrive later in smaller amounts. Fallout is not a gas and not a cloud you can outrun." },
      { fig: "fallout_decay", t: "Why waiting works: the 7-10 rule", d: "Fallout radiation drops fast. As a rule of thumb: every time the time since the explosion is multiplied by 7, the dose rate falls to one tenth. After 7 hours the rate is about 10% of what it was at 1 hour; after 49 hours (about 2 days) about 1%; after 2 weeks about 0.1%. This is why the advice is to stay inside at least 24 hours and to come out only when officials say so." },
      { t: "Why walls and soil help", d: "Gamma rays are weakened by mass. Roughly: a wood-frame house cuts radiation by half or less, a brick or concrete-block house by about a factor of 10, and being in a basement or the middle of a big building by a factor of 100 or more. Each extra layer of earth or concrete multiplies the protection. This is why basements, middle floors and inner rooms are the best places." },
      { t: "Units you may hear", d: "Becquerel (Bq) counts radioactive decays per second in a material. Gray (Gy) is energy absorbed by the body, and sievert (Sv) is the dose adjusted for health effect. Millisievert (mSv) is a thousandth of a sievert. The average person gets about 2 to 3 mSv a year from natural background. A chest X-ray is about 0.1 mSv. Radiation sickness starts with doses of around 1 Sv or more over a short time. Do not memorize these. Just know that low doses cause little risk, and the aim is to keep doses as low as practical." },
      { t: "Health effects in plain words", d: "A very high dose over a short time damages bone marrow, gut and skin and causes radiation sickness. A moderate dose slightly raises the risk of cancer years later. A low dose carries very small risk. Children and unborn babies are more sensitive. Radioactive iodine goes to the thyroid; cesium behaves like potassium and spreads in the body; strontium goes to bones. Most people will receive low doses if they follow the advice." },
      { t: "Reactor accidents versus bombs", d: "A bomb produces a huge blast and fallout from a few minutes to days. A reactor accident has no blast of that kind, and releases radioactive material, often iodine and cesium, over hours or days, from one place. For both, shelter, listening to authorities, controlling food and water, and sometimes iodine pills are the main tools. Chernobyl and Fukushima showed that food and milk controls and evacuation reduce harm." },
      { t: "Detectors and apps", d: "Official detectors measure dose rate. A cheap Geiger counter or phone app cannot tell you if you are safe, and can give false alarms or false comfort. Trust the official measurements from the government." },
      { t: "EMP, 'nuclear winter' and other big ideas", d: "A nuclear blast high in the sky can create an electromagnetic pulse that damages electronics over a wide area. Keep a battery radio and spare batteries in a metal tin as a precaution, though evidence is limited. Large wars with many weapons could affect climate and food supply worldwide; this is a reason for a long-term stock of food and for seeds. These are unlikely, but preparation costs little." }
    ],
    warn: [
      "A person who was exposed to radiation is not radioactive. Do not avoid or reject them.",
      "Do not trust cheap detectors or apps to decide whether to stay or leave.",
      "These numbers are rules of thumb for understanding, not for making decisions in place of officials."
    ],
    sources: ["CDC: Radiation emergencies, ionizing radiation basics", "WHO: Ionizing radiation and health effects", "Ready.gov: Radiation emergencies", "IAEA and UNSCEAR: Chernobyl and Fukushima health findings", "Federation of American Scientists and US Government emergency planning guidance (7-10 rule)"]
  },
  {
    id: "war16", title: "Myths and facts about nuclear war and fallout", icon: "med",
    time: "15 minutes to read", cost: "Free",
    intro: "Fear and rumors lead people to do useless or dangerous things. Here are common myths and what is actually known. Share these with family and neighbors.",
    buy: [],
    steps: [
      { t: "Myth: Nothing can protect you, so why prepare?", d: "Fact: Away from the blast area, being inside a strong building greatly reduces the dose, and the simple rule of Get inside, Stay inside, Stay tuned saves lives. Most people are not near the blast. Preparing is useful, cheap and also helps in typhoons and floods." },
      { t: "Myth: Fallout is a cloud that you can outrun", d: "Fact: Fallout is dust that falls from the sky over hours, and is heavier near the blast. Trying to drive away in the first hour puts you in the open on jammed roads. Go inside the nearest strong building." },
      { t: "Myth: You must wait for the siren", d: "Fact: There may be no siren and no phone alert. Learn the signs and act: a flash, a loud blast or a mushroom cloud means get inside now." },
      { t: "Myth: Anyone exposed to radiation is radioactive", d: "Fact: Exposure does not make a person radioactive. Contamination with dust is washed off with soap and water and by removing outer clothes." },
      { t: "Myth: Take an iodine pill right away, just in case", d: "Fact: KI protects only the thyroid, only against radioactive iodine, and only if taken at the right time on the advice of officials. It does not protect against other radiation. Taking it without need carries small risks." },
      { t: "Myth: Betadine, iodized salt or kelp are a substitute", d: "Fact: They do not contain a safe, effective dose and some can harm you. Use KI only from health authorities." },
      { t: "Myth: Drinking water and eating food will be impossible for weeks", d: "Fact: Sealed and stored food and water are safe. Normal food supply returns in time. The key is not to eat open or outdoor food and not to drink untested rainwater until officials say so." },
      { t: "Myth: A bunker is the only way", d: "Fact: A strong inner room in a concrete building with extra mass is a good option. In Leyte, deep bunkers can flood and are not recommended without engineering advice." },
      { t: "Myth: Radiation makes food and water glow or taste strange", d: "Fact: You cannot see, smell or taste radiation. Rely on official announcements." },
      { t: "Myth: Plastic sheeting and tape make the room safe", d: "Fact: They help keep dust out, but protection comes mostly from thick walls and distance from the outside. Do not seal yourself so tightly that you cannot breathe." },
      { t: "Myth: After a day it is all fine", d: "Fact: Radiation drops quickly but is not zero. Follow official advice about when to leave and about food, water and cleaning, and for how long to avoid certain areas." },
      { t: "Myth: The Philippines will be hit directly", d: "Fact: There is no certainty, and being a far-away country with no nuclear weapons does not make us a likely target of such attacks. More likely risks are from regional conflict, energy and trade disruption, and cyber incidents. Prepare calmly and in proportion." },
      { t: "Myth: Miracle cures, supplements or machines protect you", d: "Fact: There is no pill or device that prevents radiation damage, except for KI against radioactive iodine. Avoid scams." },
      { t: "Myth: Children should not be told", d: "Fact: Children cope better with simple truthful information and a plan. See the Fear, children and rumors guide." }
    ],
    warn: ["Be suspicious of any message with a 'miracle cure', a panic warning or a request for money."],
    sources: ["Ready.gov: Nuclear explosion myths and facts", "CDC: Radiation emergencies FAQ", "WHO: Iodine thyroid blocking", "FDA: Potassium iodide guidance"]
  },
  {
    id: "war17", title: "One-page checklist: before, when warned, during and after", icon: "bag",
    time: "5 minutes to read, print it", cost: "Free",
    intro: "This is the short version of the whole section. Print it or copy it into your notes. Each item points to a full guide.",
    buy: [],
    steps: [
      { t: "BEFORE: do these now", d: "1. Store 14 days of water ({n*56} liters for {ppl}) and food that needs no cooking. 2. Battery or hand-crank radio, flashlights, power banks. 3. First-aid kit, 30 days of medicines, ORS, thermometer. 4. N95 masks, plastic sheeting, duct tape, buckets with lids, garbage bags. 5. Clean spare clothes sealed in a bag. 6. Cash in small bills, copies of papers. 7. Family plan, outside contact, meeting places, wallet cards. 8. Choose a safe room and a nearest strong building. 9. Learn first aid. 10. Know your neighbors. (Guides: Supply kit; Family plan; Fallout shelter at home.)" },
      { t: "WARNING or FLASH: first seconds", d: "Look away from the flash. Drop to the ground, face down, cover your head, eyes closed, until the blast wave passes (can take 30 seconds or more). In a vehicle, stop and duck down. (Guide: Nuclear explosion, the first hour.)" },
      { t: "FIRST 10 MINUTES: get inside", d: "Go into the nearest strong building. Basements, middle floors and inner rooms are best. Do not drive. Do not look for family. Bring pets inside. Close windows and doors; turn off fans and air-conditioners." },
      { t: "INSIDE: stay inside, stay tuned", d: "Take off outer clothes if you were outside and wash with soap and water. Bag the clothes. Turn on the radio. Stay at least 24 hours unless officials say otherwise. Drink stored water, eat stored food. Give first aid. Use the bucket toilet. Keep a log. (Guides: Fallout shelter at home; After fallout.)" },
      { t: "ALL DAY: routines", d: "Listen to the radio on a schedule. Keep children busy. Take medicines on time. Check on the older and sick. Do not leave until told. Take turns to rest." },
      { t: "AFTER: when officials say it is safe", d: "Leave only as told, with go-bag and mask. Follow evacuation routes. Do not eat garden food, local fresh milk, wild food or drink rainwater until tested. Wipe surfaces with damp cloths. Check on neighbors. Register with Restoring Family Links if separated. (Guides: Leaving home; After fallout.)" },
      { t: "IODINE PILLS (only if officials say)", d: "130 mg adults and pregnant women; 65 mg ages 3 to 18; 32 mg ages 1 month to 3 years; 16 mg newborns; anyone 70 kg or more takes 130 mg. Follow the package label and officials. Ask a doctor in advance. (Guide: Radiation sickness and iodine pills.)" },
      { t: "NEVER", d: "Never look at the flash. Never go out to look. Never drive away in the first hour. Never burn fuel or charcoal indoors. Never eat food left open outside. Never share unverified rumors. Never touch an unexploded bomb or strange metal capsule." }
    ],
    warn: ["Check with the official source for your area. The numbers here are general guidance, and the instructions of officials come first."],
    sources: ["Ready.gov: Nuclear explosion", "CDC: Radiation emergencies", "FDA: Potassium iodide guidance"]
  }
];

(() => {
  const grp = HOWTO_GROUPS.find((x) => x[0] === "War and nuclear");
  grp[1].splice(2, 0, "war17");
  grp[1].push("war15", "war16");
  const byId = {};
  HOWTO.concat(HOWTO_WAR3).forEach((x) => { byId[x.id] = x; });
  HOWTO.length = 0;
  HOWTO_GROUPS.forEach(([, gi]) => gi.forEach((id) => { if (byId[id]) HOWTO.push(byId[id]); }));
})();

/* ---------- quick guides (short, offline) ---------- */

GUIDES.push(
  { id: "gd41", title: "Nuclear explosion: the first minutes", html: `
    <p><b>Get inside. Stay inside. Stay tuned.</b></p>
    <ol>
      <li><b>Flash:</b> do not look at it. Turn away, drop down, cover your head, close your eyes. Stay down until the blast wave passes. It can take 30 seconds or more.</li>
      <li><b>In a vehicle:</b> stop safely, duck below the windows and cover your head. Do not try to drive away.</li>
      <li><b>Within about 10 minutes</b> get into the nearest strong building. Basements and the middle floors of big concrete buildings are best. Any building is better than outside.</li>
      <li>Move away from outer walls, windows and the roof. Close windows and doors. Turn off fans and air-conditioners.</li>
      <li>If you were outside, take off your outer clothes, bag them, and wash (see After fallout).</li>
      <li>Turn on a battery radio. Stay inside at least 24 hours unless officials say otherwise.</li>
    </ol>
    <p><b>Do not</b> go out to look, drive away, or leave to find family. Meet later.</p>
    <p class="hint">See also: Nuclear explosion, the first hour (War and nuclear in Guides).</p>` },
  { id: "gd42", title: "After fallout: take off, wash, change", html: `
    <ol>
      <li>Take off your outer clothes. This removes up to 90% of the dust. Roll them inward, do not shake. Put them in a bag, tie it, and keep it away from people.</li>
      <li>Wash with soap and shampoo and warm water. Do not scrub. No conditioner. No bleach.</li>
      <li>If no shower: wash hands, face and bare skin with soap, or wipe with damp cloths. Blow your nose, wipe eyelids, lashes and ears.</li>
      <li>Put on clean clothes. Wipe shoes and leave them outside. Wipe pets gently.</li>
      <li>Wipe surfaces with a damp cloth. Do not sweep dry.</li>
    </ol>
    <p><b>Food and water:</b> sealed and stored food and water are safe. Do not eat or drink anything left open outside. Do not drink rainwater, eat garden food, or drink fresh milk until officials say so.</p>
    <p class="hint">A washed person is not dangerous to others.</p>` },
  { id: "gd43", title: "Shelter from fallout: where and how long", html: `
    <ul>
      <li><b>Best:</b> basement, underground parking, or the middle floors of a multi-story concrete building, in the middle of the building.</li>
      <li><b>Good:</b> an inner room or stairwell of a concrete house, with water jugs or sacks stacked along the walls.</li>
      <li><b>Poor:</b> top floor with a flat roof, rooms by outside walls or windows, wood, nipa or GI sheet houses, cars.</li>
    </ul>
    <p><b>How long:</b> at least 24 hours, usually up to a few days. Radiation falls to about a tenth after 7 hours and a hundredth after 2 days. Come out only when officials say so.</p>
    <p><b>Inside:</b> stored water and food, radio, flashlight, medicines, bucket toilet. Never burn charcoal, gas or kerosene in the room. Keep children busy, take turns to listen to the radio.</p>
    <p class="hint">See the long guide: Fallout shelter at home.</p>` },
  { id: "gd44", title: "Iodine pills (KI): the short version", html: `
    <p><b>Take only when officials say so.</b> KI protects only the thyroid, and only against radioactive iodine. It does not protect against other radiation.</p>
    <ul>
      <li>Adults over 18, pregnant and breastfeeding women: <b>130 mg</b></li>
      <li>Children 3 to 18 years: <b>65 mg</b> (anyone 70 kg or more: 130 mg)</li>
      <li>Children 1 month to 3 years: <b>32 mg</b></li>
      <li>Newborns up to 1 month: <b>16 mg</b></li>
    </ul>
    <p>One dose a day, only while officials say there is a risk. Follow the package label first. Babies and children are most at risk. Adults over 40 are least likely to need it.</p>
    <p><b>Not a substitute:</b> iodized salt, Betadine, tincture of iodine, kelp. Never use them.</p>
    <p class="hint">Ask a doctor in advance about thyroid illness or iodine allergy. Get KI only from the health office or a licensed pharmacist.</p>` },
  { id: "gd45", title: "Air raid or shelling: take cover", html: `
    <ol>
      <li>Do not go outside to look. Move to the lowest floor, an inner room or corridor, away from windows and glass.</li>
      <li>Lie down, cover your head and neck, and open your mouth slightly.</li>
      <li>Outside with no building: lie flat in a ditch or low ground, away from walls, trees, poles and vehicles.</li>
      <li>Gunfire: get down behind solid cover such as concrete or earth. Thin walls do not stop bullets.</li>
      <li>Wait for it to be quiet. A second blast often follows.</li>
      <li>Then check for injury, fire and gas. Listen to the radio.</li>
    </ol>
    <p class="hint">Stay in groups, keep children close and know your evacuation route.</p>` },
  { id: "gd46", title: "Found a bomb, shell or strange object", html: `
    <ol>
      <li><b>Do not touch it.</b></li>
      <li><b>Do not move it</b>, kick it, throw it or take it home.</li>
      <li><b>Walk back</b> the way you came, in your own footprints.</li>
      <li><b>Mark</b> the place from a distance.</li>
      <li><b>Tell</b> the barangay, police or 911.</li>
    </ol>
    <p>Old war shells can explode even after decades. A small metal capsule or container may be radioactive: keep far away and tell the authorities. Do not sell it as scrap.</p>
    <p class="hint">Children: never pick up strange objects. Tell an adult.</p>` },
  { id: "gd47", title: "Blast and burn first aid in brief", html: `
    <ol>
      <li><b>Bleeding:</b> press firmly with a clean cloth for 10 minutes. For life-threatening limb bleeding, use a tourniquet 5 to 8 cm above the wound, tighten until it stops, write the time.</li>
      <li><b>Burns:</b> cool under clean running water for 20 minutes. No ice or oil. Cover loosely. Do not break blisters.</li>
      <li><b>Breathing or chest pain, or deafness after a blast:</b> keep the person still, warm and calm. Get medical help.</li>
      <li><b>Trapped over an hour:</b> give water or ORS and get a doctor when freed, even if they look well.</li>
      <li><b>Shock:</b> lay down, keep warm, raise legs if no head, neck or leg injury.</li>
    </ol>
    <p><b>In fallout:</b> save life first, then wash off dust. Do not go out to rescue people unless officials say it is safe.</p>
    <p class="hint">See also: Heavy bleeding, Burns, Someone is trapped.</p>` },
  { id: "gd48", title: "Leaving home: evacuation checklist", html: `
    <ul>
      <li>Leave only when officials order it, or fighting reaches you.</li>
      <li>Take: go-bag, water, food, radio, flashlight, power bank, medicines, masks, clean clothes, whistle, papers, cash.</li>
      <li>Wear long clothes, hat and shoes. Cover nose and mouth.</li>
      <li>Switch off power, gas and water. Lock the house. Leave a note.</li>
      <li>Go in daylight, with others, by the announced route. Keep children holding hands.</li>
      <li>Register at the evacuation center. Keep the family together.</li>
      <li>Text your outside contact: name, safe, where you are.</li>
    </ul>
    <p class="hint">Separated? Register with the Red Cross Restoring Family Links. Do not hand children or papers to strangers.</p>` },
  { id: "gd49", title: "Radio, rumors and staying calm", html: `
    <ul>
      <li>Listen to official radio: NDRRMC, your LGU, DOH. Listen 10 minutes every hour to save battery.</li>
      <li>Write down what you hear and the time.</li>
      <li>Check two official sources before you share a warning. Do not forward what you cannot check.</li>
      <li>Use short text messages instead of calls. Use your outside contact.</li>
      <li>Keep routines: meals, sleep, play, medicines. Take turns to rest.</li>
      <li>Tell children the truth simply: 'We have a plan, and adults are keeping us safe.'</li>
      <li>Check on older, sick and disabled neighbors.</li>
    </ul>
    <p class="hint">Feelings of fear are normal. Ask for help if they stay strong or you think of harming yourself.</p>` }
);

Object.assign(QFIG, { gd41: "nuke_timeline", gd42: "decon_steps", gd43: "shelter_house", gd46: "uxo_rule" });

/* ---------- Plan category ---------- */

CATS.push({
  id: "war", name: "War supply kit: nuclear fallout and conflict",
  blurb: "Build this in layers: 3 days, then 14 days, then 3 months. Most items are food, water, light, a radio and medicine, and also help in typhoons. See Guides, War and nuclear.",
  items: [
    { id: "wr1", t: "Drinking water for 14 days: 4 liters per person per day, in sealed containers", p: 1, b: 2, n: "Replace every 6 months. Keep some in the safe room." },
    { id: "wr2", t: "14 days of food that needs no cooking: canned fish and meat, biscuits, peanut butter, dried fruit", p: 1, b: 2, n: "Choose pull-tab cans. Eat and replace." },
    { id: "wr3", t: "Battery or hand-crank AM/FM radio and spare batteries", p: 1, b: 2, w: "Lazada, Shopee, appliance stores", pr: "About ₱800–2,500 (estimate)" },
    { id: "wr4", t: "Flashlights or headlamps and spare batteries; power banks charged", p: 1, b: 1 },
    { id: "wr5", t: "First-aid kit and 30 days of regular medicines, ORS, thermometer", p: 1, b: 2 },
    { id: "wr6", t: "N95 or KN95 masks, at least 5 per person", p: 1, b: 1 },
    { id: "wr7", t: "Heavy plastic sheeting, duct tape, scissors, strong garbage bags", p: 2, b: 1 },
    { id: "wr8", t: "Buckets with lids for the toilet, soap, shampoo, wet wipes, toilet paper, sanitary pads", p: 2, b: 1 },
    { id: "wr9", t: "Clean spare clothes and shoes sealed in a bag or drawer for each person", p: 2, b: 0 },
    { id: "wr10", t: "Safe room chosen, with a plan for the nearest strong building written on the Family tab", p: 1, b: 0 },
    { id: "wr11", t: "Family plan, outside contact, meeting places and wallet cards printed", p: 1, b: 0 },
    { id: "wr12", t: "Cash in small bills and waterproof copies of IDs and papers", p: 2, b: 1 },
    { id: "wr13", t: "Sacks, jugs or boxes to fill with water, sand or soil as extra wall mass", p: 3, b: 1 },
    { id: "wr14", t: "3 months of rice, noodles, dried fish, oil, salt and sugar", p: 3, b: 3, n: "Buy a little extra each week." },
    { id: "wr15", t: "Take a first-aid and CPR course (Philippine Red Cross)", p: 2, b: 1 },
    { id: "wr16", t: "Potassium iodide only if the health office stocks it for emergencies", p: 3, b: 1, n: "Only from the health office or a licensed pharmacist. Take only if officials say." },
    { id: "wr17", t: "Pet food and water for 14 days, a carrier and a leash", p: 3, b: 1 }
  ]
});
