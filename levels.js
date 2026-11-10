/* Handa levels: every area as a ladder from small to big, matched to how long you want to last.
   Peso figures are Philippine shop or contractor listings seen in November 2026 and will change.
   "est" = my own estimate or rule of thumb, not a quoted price: check it locally before you spend. */

const HZ = [
  { id: 1, name: "Days", span: "up to 2 weeks", days: 7 },
  { id: 2, name: "Weeks", span: "2 to 8 weeks", days: 30 },
  { id: 3, name: "Months", span: "2 to 12 months", days: 90 },
  { id: 4, name: "Years", span: "a year or more", days: 365 }
];

const _n = (x) => Math.round(x).toLocaleString("en-PH");
const _p = (x) => "₱" + Math.round(x).toLocaleString("en-PH");
const _ceil = (x) => Math.ceil(x);

/* Small line icons. Class names (a-*) are animated in styles.css, only when a section is open or tapped. */
const ICONS = {
  food: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 12h17a8.5 8.5 0 0 1-17 0z"/><path class="a-steam s1" d="M8 8.5c-1-1 1-2 0-3.5"/><path class="a-steam s2" d="M12 8.5c-1-1 1-2 0-3.5"/><path class="a-steam s3" d="M16 8.5c-1-1 1-2 0-3.5"/></svg>',
  water: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="a-drop" d="M12 3.2s6 6.3 6 10.6a6 6 0 0 1-12 0C6 9.500 12 3.200 12 3.200z"/><path class="a-wave" d="M8.800 14.500c1-.9 2-.9 3.200 0s2.200.9 3.200 0"/></svg>',
  solar: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle class="a-core" cx="12" cy="12" r="4"/><g class="a-rays"><path d="M12 2.500v2.400M12 19.100v2.400M2.500 12h2.400M19.100 12h2.400M5.300 5.300l1.700 1.700M17 17l1.700 1.700M18.700 5.300 17 7M7 17l-1.700 1.700"/></g></svg>',
  gen: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="a-buzz"><rect x="3" y="6.500" width="18" height="11" rx="2"/><path d="M6 17.500v2M18 17.500v2"/><path class="a-bolt" d="M12.800 8.800 9.500 12.600h3.200l-1.500 2.800 3.800-4h-3.200z" fill="currentColor" stroke="none"/></g></svg>',
  grow: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 20.500h14"/><g class="a-grow"><path d="M12 20.500V10"/><path d="M12 13c-4.500.2-6-2.500-6-5.500 3.500-.2 6 1.500 6 5.500z"/><path d="M12 10c0-3.500 2.200-5.500 6-5.500.2 3.500-2 6-6 5.500z"/></g></svg>',
  shelter: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11.500 12 4l9 7.500"/><path d="M5.500 10v10.500h13V10"/><path d="M10 20.500v-5.500h4v5.500"/><circle class="a-lamp" cx="12" cy="9.800" r="1.100" fill="currentColor" stroke="none"/></svg>',
  comms: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="11" r="1.600"/><path d="M12 12.600V21M9 21h6"/><path class="a-arc w1" d="M9.200 8.200a4 4 0 0 0 0 5.600M14.800 8.200a4 4 0 0 1 0 5.600"/><path class="a-arc w2" d="M6.600 5.600a7.700 7.700 0 0 0 0 10.800M17.400 5.600a7.700 7.700 0 0 1 0 10.800"/></svg>',
  med: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="a-beat"><rect x="3.500" y="3.500" width="17" height="17" rx="4"/><path d="M12 8v8M8 12h8"/></g></svg>',
  cook: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="a-flame" d="M12 3c.5 3-3.500 4.800-3.500 9a3.500 3.500 0 0 0 7 0c0-1.300-.5-2.200-1-3-.2 1-.8 1.500-1.500 1.500C13 8.500 13.500 5.500 12 3z"/><path d="M5 21h14"/></svg>',
  san: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h9a4 4 0 0 1 4 4v1.500"/><path d="M4 5.500v5M13 8V6M17 13.500v-1"/><path class="a-drip" d="M17 16.500c0 0-1.500 1.700-1.500 2.700a1.500 1.500 0 0 0 3 0c0-1-1.500-2.700-1.500-2.700z"/></svg>'
};

const LADDERS = [
  {
    id: "food", name: "Food", icon: "food",
    intro: "Short term you store food. Long term you can't store enough, so you must grow it. Each step builds on the one before.",
    rungs: [
      { h: 1, size: "Small", t: "A week of food that needs little or no cooking",
        covers: "7 days, so you can sit through a typhoon or a road closure.",
        items: ["Canned sardines, tuna or corned beef (plan about 1 can per person per day)", "Rice at 0.4 kg per adult per day, if you can cook", "Biscuits, crackers, peanut butter, oatmeal, instant noodles", "Drinking water (see Water)", "A manual can opener"],
        calc: (n) => `For ${n} ${n === 1 ? "person" : "people"}: about ${_n(n * 0.4 * 7)} kg of rice and ${_n(n * 7)} cans for 7 days.`,
        cost: "Price a 7-day basket at your supermarket or palengke.", est: false },
      { h: 2, size: "Medium", t: "A month of staples and a pantry that you rotate",
        covers: "About 30 days. Enough to ride out a long brownout or a hard season.",
        items: ["Rice in sealed bins, off the floor", "Mongo, dried beans, dried fish (tuyo, danggit, dilis)", "Cooking oil, salt, sugar, vinegar, soy sauce, coffee or milk powder", "Canned vegetables and fruit", "Multivitamins", "Eat the oldest first and replace what you use"],
        calc: (n) => { const r = n * 0.4 * 30; return `Rice for ${n}: about ${_n(r)} kg for 30 days, or ${_ceil(r / 50)} sack${_ceil(r / 50) > 1 ? "s" : ""} of 50 kg. Cooking oil: about ${_n(n)} L (estimate, 1 L per person per month).`; },
        cost: "Mostly the same food you already buy, just earlier.", est: false },
      { h: 3, size: "Large", t: "Three months or more of bulk staples, sealed against pests and heat",
        covers: "About 90 days with variety, so nobody gets sick of rice and sardines.",
        items: ["Rice, mongo and beans in food-grade sealed containers with tight lids", "Salt and sugar in bulk (both keep for years)", "Dried and salted fish in sealed jars", "Powdered milk, oats, canned goods you rotate", "Seeds for the garden (see Growing)", "Spices and flavorings, so the food stays edible for morale"],
        calc: (n) => { const r = n * 0.4 * 90; return `Rice for ${n}: about ${_n(r)} kg for 90 days (${_ceil(r / 50)} sacks of 50 kg).`; },
        note: "Heat and humidity shorten shelf life in the Philippines. White rice sealed dry keeps much longer than brown rice. Check bins every month for weevils or damp.",
        cost: "Bulk rice, beans and fish at palengke prices.", est: false },
      { h: 4, size: "Farm", t: "Grow, raise and preserve your own food",
        covers: "A year and beyond. A stockpile alone can't last this long for most families, so production is the plan.",
        items: ["Root crops (kamote, cassava, gabi), banana, coconut and fruit trees", "Vegetables for vitamins, with saved seeds", "Chickens or ducks, a small fish pond (tilapia)", "Drying, salting, fermenting and pressure canning", "Keep a 3-month food buffer even then"],
        calc: (n) => `Rice alone for ${n} for a year would be about ${_n(n * 0.4 * 365)} kg (${_ceil(n * 0.4 * 365 / 50)} sacks). See the Growing ladder for the land this needs.`,
        cost: "Mostly seed and labor. Land is the biggest cost.", est: true }
    ],
    sources: ["Rice figure of 0.4 kg per adult per day is the planning number used in this app's Plan tab."]
  },
  {
    id: "water", name: "Water", icon: "water",
    intro: "Plan on 4 liters per person per day for drinking and basic washing. Storing it is the easy part; a source you can renew is the long-term answer.",
    rungs: [
      { h: 1, size: "Small", t: "Water jugs for a week",
        covers: "7 days at 4 L per person per day.",
        items: ["Blue 5-gallon jugs (about 19 L) from a refilling station", "A big pot for boiling", "Plain unscented bleach (check the label for 5–9% sodium hypochlorite)", "Keep jugs closed and in the shade"],
        calc: (n) => { const l = n * 4 * 7; return `For ${n}: ${_n(l)} L for 7 days, about ${_ceil(l / 19)} jugs.`; },
        cost: "A jug and a refill at your local station.", est: true },
      { h: 2, size: "Medium", t: "Drums, a filter and a rain-catch tarp",
        covers: "30 days of drinking water, plus a way to top up from rain.",
        items: ["200 L drums with tight covers, or 20 L jerry cans", "Portable filter such as Sawyer or LifeStraw (about ₱2,200–6,100 in imported listings)", "Tarp or gutter to catch rain into a clean drum", "A siphon hose or tap"],
        calc: (n) => { const l = n * 4 * 30; return `For ${n}: ${_n(l)} L for 30 days, about ${_ceil(l / 200)} drum${_ceil(l / 200) > 1 ? "s" : ""} of 200 L.`; },
        cost: "Drums from hardware stores; filter about ₱2,200–6,100.", est: false },
      { h: 3, size: "Large", t: "A roof-fed tank with a first-flush diverter",
        covers: "About 90 days of storage, refilled by every rain.",
        items: ["A 1,000–5,000 L polyethylene tank on a stand (ask local hardware dealers for the price)", "Gutters and a first-flush diverter so the dirty first rain is thrown away", "Filter, then boil or chlorinate before drinking", "Mosquito-proof screens on every opening"],
        calc: (n) => `For ${n}: ${_n(n * 4 * 90)} L for 90 days of drinking only (double it for washing). Handy rule: 1 mm of rain on 1 m² of roof gives 1 L, so a 50 m² roof gives 50 L per mm.`,
        cost: "Tank prices vary by size and brand. Get two local quotes.", est: true },
      { h: 4, size: "Source", t: "Your own source: a well or spring, plus rain storage",
        covers: "Years. Storage runs out, a source doesn't.",
        items: ["A dug well, driven well or protected spring, with a hand pump", "Keep it away from latrines and farm runoff", "Slow sand or ceramic filter, then boiling or chlorine", "Test the water when you can, and again after floods", "Rain storage stays as a backup"],
        calc: () => "Ask the barangay or a local well driller what the water table is like on your land.",
        cost: "Quote from a local driller.", est: true }
    ],
    sources: ["4 L per person per day matches the water guide in this app. Roof rain rule is simple geometry, not a quote."]
  },
  {
    id: "solar", name: "Solar and batteries", icon: "solar",
    intro: "Solar is the only power that keeps working when fuel runs out. Start with a tiny kit, grow to a home system. A 1 kW panel array makes about 3.8 kWh a day in the Philippines (4.5 sun-hours × 0.85 loss).",
    rungs: [
      { h: 1, size: "Tiny", t: "Power banks, lanterns and a small station",
        covers: "Days: phones, a radio, lights, a router.",
        items: ["20,000 mAh power banks, rechargeable lanterns, rechargeable AA", "Small power station of about 100 Wh, such as Jackery 100 Plus (₱6,499–8,399)", "A folding solar panel (100 W panels about ₱11,800–12,700)", "Keep everything charged before a storm"],
        calc: () => "One 100 Wh unit charges a phone about 5 to 6 times (estimate).",
        cost: "Power banks and lanterns are cheap; a 100 Wh station about ₱6,500–8,400.", est: false },
      { h: 2, size: "Small", t: "A 300 to 1,000 Wh power station with 1 to 3 panels",
        covers: "Weeks: lights, fans, phones, a laptop, a small fridge for part of a day.",
        items: ["EcoFlow RIVER 3 about ₱15,990, Bluetti AC60P about ₱24,995, Anker PS200 about ₱22,490", "EcoFlow DELTA 3 1000 Air about ₱38,990, Jackery 1000 V2 ₱44,999", "200 to 400 W of panels", "Charge it from the wall before a typhoon and again from the sun"],
        calc: () => "A 1 kWh station runs lights, a fan and a router for a day or two; a small fridge about a day (estimate).",
        cost: "About ₱16,000–45,000 for the station, panels extra.", est: false },
      { h: 3, size: "Large", t: "A 3 to 5 kW hybrid home system with a lithium battery",
        covers: "Months and beyond: fridge, freezer, lights, pump, fans, with a grid or generator as backup.",
        items: ["Hybrid inverter 3 to 5 kW, LiFePO4 battery (about 10 kWh), 6 to 16 panels", "Typhoon-rated roof mounting", "Proper installer, wiring, breakers and surge protection", "Package examples: 3 kW with 4×200Ah batteries and 9 panels; 5 kW with 16 panels"],
        calc: () => "A 5 kW array makes about 19 kWh a day in good sun (estimate from 4.5 sun-hours × 0.85).",
        cost: "About ₱150,000–250,000 for 3 kW; ₱250,000–350,000 for 5 kW with installation.", est: false },
      { h: 4, size: "Farm", t: "An 8 to 16 kW system with 15 to 30 kWh of storage",
        covers: "Years: a whole household or small farm, including a well pump and workshop.",
        items: ["Western Visayas installers list 8, 12 and 16 kW hybrid systems with 15 kWh batteries", "Spare inverter or controller on the shelf", "Plan to replace batteries at about year 10", "Keep panels clean and check mounts after every typhoon"],
        calc: () => "No firm price found. Get 2 or 3 written quotes.",
        cost: "Estimate ₱500,000 to ₱1,000,000 or more; confirm with quotes.", est: true }
    ],
    sources: ["groundwork-ph.pages.dev, unbox.ph and solar-scout.vercel.app (system prices); electrotech-solar.vercel.app (4.5 sun-hours, 0.85 derate, year-10 battery replacement); Carousell listings by Project SOLAR PH."]
  },
  {
    id: "gen", name: "Generators and fuel", icon: "gen",
    intro: "A generator is a bridge, not a plan. Fuel is the hard part: months of running need hundreds of liters, so pair it with solar. Connect to house wiring only through a proper transfer switch.",
    rungs: [
      { h: 1, size: "Small", t: "A 1 to 2 kW inverter generator",
        covers: "Days: lights, fans, phones, a router, charging power stations.",
        items: ["Motoyama 1 kW inverter type about ₱8,100", "EF Power RD2500 (2 kW) about ₱10,868", "Inverter types give cleaner power for phones and laptops", "Run it outdoors only, never in the house or garage"],
        calc: () => "Small units are for short loads; they are not made to run all day for weeks.",
        cost: "About ₱8,100–10,900 in listings.", est: false },
      { h: 2, size: "Medium", t: "A 3.5 to 5.5 kW gasoline generator",
        covers: "Weeks of backup: fridge, freezer, fans and a water pump.",
        items: ["Bravus inverter 3,500 W about ₱17,600; 5,500 W about ₱25,520", "EF Power RD6500E (5 kW) about ₱24,750", "Transfer switch installed by an electrician", "Approved fuel cans, stored away from the house"],
        calc: () => "From one maker's spec, a 3 kVA gasoline set uses about 1.9 L per hour at 70% load: 2 hours a day for 14 days is about 53 L.",
        cost: "About ₱17,600–25,500 for the set.", est: false },
      { h: 3, size: "Large", t: "A 6 to 10 kVA diesel generator",
        covers: "Months, used a few hours a day for heavy loads.",
        items: ["Powerhouse silent diesel 3.6 kW about ₱45,100; 6.5 kW about ₱64,500", "Total 6 kVA diesel about ₱51,980; Yamato from ₱49,800; Victor about ₱62,000", "10 kVA units use about 1.85 L per hour in one maker's spec", "Spare oil, filters and belts"],
        calc: () => "A 10 kVA diesel running 3 hours a day for 90 days burns about 500 L. Fuel is the real cost, so use solar for the base load.",
        cost: "About ₱50,000–65,000 for 6 to 8 kW.", est: false },
      { h: 4, size: "Farm", t: "A silent standby set of 10 to 20 kVA or more",
        covers: "Years, as a backup to solar for heavy loads like welding or big pumps.",
        items: ["Yamato silent diesel from ₱286,000", "Fuji Deluxe soundproof (Kubota engine) from ₱552,000", "Cummins-based sets from ₱800,000", "Years of power should come from solar, not stored fuel"],
        calc: () => "Stored fuel doesn't last for years. Rotate it and test old fuel before using it (rule of thumb, ask your fuel supplier).",
        cost: "About ₱286,000 to ₱800,000+ in listings.", est: false }
    ],
    sources: ["khmtools.com.ph, toolssavvy.ph and goldpeaktools.com.ph listings (prices); Shinsetsu spec sheets on toolssavvy.ph (fuel use)."]
  },
  {
    id: "grow", name: "Growing food", icon: "grow",
    intro: "From a jar on the shelf to a farm. Start small now: the skill and the seeds matter more than the space. Indoor, bunker and outdoor growing are all covered.",
    rungs: [
      { h: 1, size: "Tiny", t: "Sprouts and kitchen scraps",
        covers: "Days: fresh food even with no garden.",
        items: ["Mongo (mung bean) sprouts in a jar: ready in about 3 to 5 days", "Regrow green onions in a glass of water", "Needs only water, a jar and a rinse twice a day", "Works indoors or in a shelter with no light"],
        calc: () => "Cost: almost nothing. Good first practice.",
        cost: "Pennies.", est: false },
      { h: 2, size: "Small", t: "Pots, buckets and sacks, 1 to 3 m²",
        covers: "Weeks: leafy greens on a windowsill, balcony or yard corner.",
        items: ["Kangkong cuttings, pechay, mustasa, malunggay, herbs", "Rice sacks or buckets with drain holes", "About 6 hours of sun a day", "First leaves often in 3 to 6 weeks (estimate)"],
        calc: () => "Start with 5 containers. Add more as you learn.",
        cost: "Pots, soil and seed only.", est: true },
      { h: 3, size: "Medium", t: "Backyard beds, 20 to 100 m²",
        covers: "Months: vegetables and root crops for the whole household.",
        items: ["Kamote (about 3 to 4 months), sitaw, ampalaya, talong, okra, kalabasa", "Banana, papaya and compost", "Save seeds in sealed, dry jars", "Inside a shelter: sprouts, mushrooms and microgreens under LED lights (needs power)"],
        calc: (n) => `Vegetables alongside rice: about ${_n(n * 10)} to ${_n(n * 20)} m² for ${n} (estimate, 10 to 20 m² per person).`,
        cost: "Seed, tools and compost.", est: true },
      { h: 4, size: "Farm", t: "A small farm, 0.5 to 1 ha or more",
        covers: "Years: staple calories, fruit, eggs and fish.",
        items: ["Kamote, cassava, gabi, banana, coconut, fruit trees", "Tree crop yields in PSA data: calamansi about 5,965 kg per ha, durian about 4,299 kg per ha (2016)", "Chickens or ducks, a tilapia pond", "Ask the municipal agriculture office for seedlings and training"],
        calc: (n) => `If root crops are the main calories: about ${_n(n * 1700)} m² for ${n} (${(n * 1700 / 10000).toFixed(2)} ha). Estimate: 2,000 kcal a day is about 2.3 kg of kamote, about 850 kg a year, at a modest 5 tons per hectare.`,
        cost: "Land is the main cost; the rest is seed, tools and labor.", est: true }
    ],
    sources: ["PSA Updated Average Costs of Production, 2014–2016 (calamansi and durian yield per hectare). Root-crop area is my estimate, not a PSA figure."]
  },
  {
    id: "shelter", name: "Shelter and bunker", icon: "shelter",
    intro: "In Leyte the real threats are typhoons, floods and earthquakes. A strong room above flood level beats a deep underground bunker, which can flood. Check your barangay hazard maps (GeoRisk PH, DOST-NOAH) and use a licensed engineer.",
    rungs: [
      { h: 1, size: "Small", t: "A safe corner in your strongest room",
        covers: "Days: ride out one typhoon.",
        items: ["Pick the strongest interior room, away from windows", "Shutters or plywood over windows; roof tie-downs", "Go-bags, water and food already inside", "Safe-room guidance for 24-hour storms: 7 to 10 sq ft (0.65 to 0.93 m²) per person"],
        calc: (n) => `For ${n}: about ${(n * 0.65).toFixed(1)} to ${(n * 0.93).toFixed(1)} m² minimum.`,
        cost: "Shutters, tie-downs and supplies.", est: true },
      { h: 2, size: "Small", t: "A reinforced safe room, 10 to 15 m²",
        covers: "Weeks: shelter plus supplies for a family.",
        items: ["Reinforced concrete walls and roof slab, well-grouted CHB with rebar", "Above flood level, with two vents and a strong door", "Storage for water and food", "A 4-inch CHB wall costs about ₱650–950 per m² before plaster"],
        calc: (n) => { const a = Math.max(8, n * 3); return `For ${n}: about ${_n(a)} m² (estimate, 3 m² each). Build cost about ${_p(a * 20000)} to ${_p(a * 38000)}, plus 20 to 30% for storm hardening.`; },
        cost: "₱20,000–38,000 per m² (economy to standard builds).", est: true },
      { h: 3, size: "Medium", t: "A fortified shelter, 25 to 40 m²",
        covers: "Months: bunks, storage, toilet, water tank and power.",
        items: ["Bunk beds, shelving, a sealed supply room", "Rain-fed water tank and its own toilet", "Solar panels and a battery for lights and fans", "Good ventilation and a second exit"],
        calc: (n) => { const a = Math.max(20, n * 5); return `For ${n}: about ${_n(a)} m² (estimate, 5 m² each). Build cost about ${_p(a * 20000)} to ${_p(a * 38000)}.`; },
        cost: "₱20,000–38,000 per m²; mid-range houses run ₱35,000–50,000 per m².", est: true },
      { h: 4, size: "Large", t: "A compound with several buildings",
        covers: "Years: living space, workshop, storage, garden and water on one site.",
        items: ["Raised, above-ground buildings on high, stable ground, outside flood, landslide and surge zones", "Water, solar, garden and livestock built into the site", "Building permits and a structural engineer", "Steel frame builds cost less (₱14,000–22,000 per m²) than reinforced concrete (₱22,000–32,000)"],
        calc: (n) => { const a = Math.max(40, n * 10); return `For ${n}: about ${_n(a)} m² (estimate, 10 m² each). Build cost about ${_p(a * 20000)} to ${_p(a * 38000)}.`; },
        cost: "Plan ₱1,500,000 to ₱3,000,000 or more.", est: true }
    ],
    sources: ["PNNL Building America safe rooms guide (7–10 sq ft per person for 24 h storms); FEMA (3–5 sq ft, 20–30% extra cost for shelters); aedoconstruction.com and listd.ph 2026 cost per m²; Philippine floor-area-per-person figures beyond FEMA's are my estimate."]
  },
  {
    id: "comms", name: "Radios and comms", icon: "comms",
    intro: "From a phone to a long-range radio. Radios and satellite devices are regulated by the NTC: buy from an authorized dealer and check the permit before you buy.",
    rungs: [
      { h: 1, size: "Short", t: "Phones, power banks and an AM/FM radio",
        covers: "Days: calls, texts and news while towers still work.",
        items: ["Dual SIM (Globe plus Smart or DITO)", "Hand-crank or solar emergency AM/FM radio (about ₱1,300–3,400)", "Printed list of phone numbers and a meeting place", "Android with Globe SIM can use Starlink direct-to-cell where supported"],
        calc: () => "Range: whatever the cell tower covers.",
        cost: "About ₱1,300–3,400 for the radio.", est: false },
      { h: 2, size: "Medium", t: "Licensed handheld radios, about 1 to 5 km",
        covers: "Weeks: talk to family nearby when towers are down.",
        items: ["UHF/VHF handhelds such as Baofeng BF-H6 (about ₱1,250 in a Lazada-type listing)", "Claims of 5 to 10 km are best case in open land. In towns and hills expect 1 to 3 km (estimate)", "NTC Short Range Radio permit per unit; buy from an NTC-authorized dealer", "Spare batteries and a solar charger"],
        calc: () => "Agree a channel, a check-in time and code words (see the Comms tab).",
        cost: "About ₱1,250 and up per handheld.", est: false },
      { h: 3, size: "Long", t: "A base station, mast antenna and a repeater, about 10 to 50 km",
        covers: "Months: a village network with a hilltop repeater.",
        items: ["A 25–50 W base radio on a 12 V battery with solar", "Roof mast antenna, coax and lightning protection", "Commercial handhelds (Kenwood or Motorola) listed around US$280–390 abroad, roughly ₱16,000–22,000 (estimate)", "Meshtastic nodes for text messages: Heltec V3 about ₱3,400, T-Beam Supreme about ₱5,100 (NTC-approved devices only)"],
        calc: () => "A repeater on a hill is what turns 3 km into 30 km.",
        cost: "Estimate ₱16,000 and up per commercial radio; base station extra.", est: true },
      { h: 4, size: "Global", t: "HF radio and satellite, hundreds to thousands of km",
        covers: "Years: reach family abroad or 1,000 km away when everything local is down.",
        items: ["HF ham radio with an NTC license (join PARA)", "Satellite messengers such as Garmin inReach or ZOLEO (plan per device)", "Satellite phone under NTC GMPCS rules: a licensed type-approved terminal", "A solar-powered station inside the shelter"],
        calc: () => "No PH price confirmed. Ask an authorized dealer.",
        cost: "Device plus monthly plan. Get a dealer quote.", est: true }
    ],
    sources: ["Lazada.com.ph listings (handheld prices); NTC rules as summarized in the Comms tab; commercial radio prices are US listings converted at about ₱57 per US$."]
  },
  {
    id: "med", name: "Medical", icon: "med",
    intro: "A kit helps only if you know how to use it. Do not stock prescription antibiotics without a doctor's advice, and rotate anything that expires.",
    rungs: [
      { h: 1, size: "Small", t: "A first-aid kit and a week of personal medicines",
        covers: "Days: cuts, burns, fever, diarrhea.",
        items: ["Bandages, gauze, tape, gloves, tweezers, scissors, thermometer", "Antiseptic, oral rehydration salts, a pain and fever reliever", "Each person's regular medicines for 7 days", "Learn the bleeding and CPR guides in the Guides tab"],
        calc: (n) => `Pack at least ${n} sets of the basics for ${n} people.`,
        cost: "Mostly under ₱5,000.", est: true },
      { h: 2, size: "Medium", t: "A 30-day supply of regular medicines, and wound care",
        covers: "Weeks: long outages, minor injuries.",
        items: ["Ask your doctor about a 30-day extra supply of regular medicines", "More ORS, splints, burn dressings, eye wash", "Water purification and hygiene supplies", "Take a first-aid and CPR course (Red Cross 143)"],
        calc: () => "Check expiry dates every 6 months.",
        cost: "Depends on prescriptions.", est: true },
      { h: 3, size: "Large", t: "A clinic shelf: a 90-day supply and basic tools",
        covers: "Months: a family and neighbors.",
        items: ["90-day supply of regular medicines when your doctor and pharmacy allow", "Blood pressure monitor, pulse oximeter, spare eyeglasses, dental kit", "Offline reference such as Where There Is No Doctor (Hesperian)", "Practice wound closure and splinting with a trainer"],
        calc: () => "Rotate stock: use the oldest first.",
        cost: "Depends on prescriptions and tools.", est: true },
      { h: 4, size: "Skills", t: "Prevention, training and a medicine garden",
        covers: "Years: the best medical supply is a healthy, trained household.",
        items: ["Keep vaccines and dental care current", "Train in first aid, CPR and basic nursing or EMT skills", "DOH-endorsed herbs: lagundi, sambong, tsaang gubat. They don't replace medicine for serious illness", "Know the nearest hospital and a way to reach it"],
        calc: () => "Training matters more than gear.",
        cost: "Course fees and time.", est: true }
    ],
    sources: ["Red Cross hotline and first-aid guidance as in the Guides tab. No doses are given here: follow the label or ask a doctor or pharmacist."]
  },
  {
    id: "cook", name: "Cooking fuel", icon: "cook",
    intro: "Rice needs heat. Match the fuel to how long you plan to cook without the grid. Cook outdoors or in a well-ventilated area, never with charcoal indoors.",
    rungs: [
      { h: 1, size: "Small", t: "A butane stove and canisters",
        covers: "Days.",
        items: ["Portable butane stove", "Spare butane canisters", "Matches and lighters in a waterproof container"],
        calc: () => "Test it: cook a normal day of meals and count the canisters you use. Multiply by your days.",
        cost: "Hardware stores and Shopee or Lazada.", est: true },
      { h: 2, size: "Medium", t: "An LPG stove and a spare 11 kg tank",
        covers: "Weeks.",
        items: ["Standard LPG tank with a regulator and hose", "A full spare tank, stored outdoors with ventilation", "Check hoses for leaks with soapy water"],
        calc: () => "A full spare tank can double how long you can cook.",
        cost: "Ask your LPG dealer for the current tank price.", est: true },
      { h: 3, size: "Large", t: "A wood or charcoal rocket stove",
        covers: "Months.",
        items: ["An efficient wood stove that burns twigs and coconut shells", "Dry firewood or charcoal stored under cover", "Cook outdoors; charcoal gives off deadly carbon monoxide"],
        calc: () => "Dry wood burns cleaner. Keep it off the ground and under a roof.",
        cost: "Local metalworkers can make one.", est: true },
      { h: 4, size: "Farm", t: "Fuel you grow",
        covers: "Years.",
        items: ["Fast-growing fuelwood trees such as ipil-ipil and kakawate", "Coconut husks and shells", "Biogas from animal manure", "A solar cooker for sunny days"],
        calc: () => "Plant fuelwood trees early: they take a few years to give wood.",
        cost: "Seedlings and time.", est: true }
    ],
    sources: ["General practice. Check local LPG and butane prices."]
  },
  {
    id: "san", name: "Sanitation", icon: "san",
    intro: "Waste and dirty water cause more sickness than injuries do in most disasters. Plan the toilet and handwashing before you need them.",
    rungs: [
      { h: 1, size: "Small", t: "A bucket toilet with liners, and soap",
        covers: "Days.",
        items: ["A bucket with a lid and heavy trash liners", "Wood ash or sawdust to cover waste", "Soap and a handwashing station (a jug with a spout)", "Trash bags and disinfectant"],
        calc: () => "Wash hands after the toilet and before food, every time.",
        cost: "Under ₱500.", est: true },
      { h: 2, size: "Medium", t: "A pit latrine away from your water",
        covers: "Weeks.",
        items: ["Dig it at least 30 m from any well or spring and downhill of it, above flood level", "Cover the pit and keep it dry", "Handwashing station next to it"],
        calc: () => "Never place a latrine upslope of a well.",
        cost: "Labor and a few boards or a slab.", est: true },
      { h: 3, size: "Large", t: "A dry toilet and a greywater plan",
        covers: "Months.",
        items: ["A dry composting toilet system", "Greywater from the sink and shower into a gravel pit or banana circle", "Soap, laundry and hygiene supplies including menstrual supplies"],
        calc: () => "Keep greywater away from wells and the kitchen garden's edible leaves.",
        cost: "Materials only.", est: true },
      { h: 4, size: "Farm", t: "A septic tank and a closed-loop compost system",
        covers: "Years.",
        items: ["A septic tank such as the Bestank ST-1000 purifying tank, 1,000 L, listed at ₱10,500 (gravel and charcoal not included)", "Compost animal manure and kitchen waste for the garden", "Never use fresh human waste on food crops"],
        calc: () => "Pump out a septic tank when it fills; ask a local contractor how often.",
        cost: "About ₱10,500 for a 1,000 L tank, plus installation.", est: false }
    ],
    sources: ["toolssavvy.ph and khmtools.com.ph (Bestank ST-1000 price). The 30 m latrine distance is a common sanitation guideline."]
  }
];

/* Icons for the Guides tab */
ICONS.calc = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4.500" y="3" width="15" height="18" rx="2.500"/><rect class="a-led" x="7.500" y="6" width="9" height="4" rx="1" fill="currentColor" stroke="none"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 17.500h.01M12 17.500h.01M16 17.500h.01"/></svg>';
ICONS.bag = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="a-handle" d="M9 5V4a3 3 0 0 1 6 0v1"/><rect x="5" y="5" width="14" height="16" rx="4"/><path d="M8.500 15h7v4h-7z"/></svg>';
ICONS.server = '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2.500"/><path d="M8.500 8h7M8.500 12h7"/><circle class="a-led" cx="9" cy="17" r="1.200" fill="currentColor" stroke="none"/></svg>';
