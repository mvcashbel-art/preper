/* Handa content. Phases: 1 = start now, 2 = next, 3 = later.
   Cost bands (b): 0 = free, 1 = under ₱500, 2 = ₱500–₱5,000, 3 = over ₱5,000 (rough price of one item).
   Peso figures in "p" come from Philippine shop listings seen in November 2026 and will change. */

const PHASES = { 1: "Start now", 2: "Next", 3: "Later" };
const BANDS = { 0: "Free", 1: "Under ₱500", 2: "₱500–5,000", 3: "Over ₱5,000" };
const BAND_LABEL = { 0: "free", 1: "under ₱500", 2: "₱500 to ₱5,000", 3: "over ₱5,000" };

const CATS = [
  {
    id: "water", name: "Water",
    blurb: "Plan on 4 liters per person per day for drinking and basic washing. Three days is the minimum.",
    items: [
      { id: "w1", t: "Store drinking water: 4 liters per person per day, at least 3 days", p: 1, b: 1,
        e: "Blue 5-gallon (about 19 L) jugs from a water refilling station",
        w: "Water refilling station, supermarket",
        n: "For {ppl}: about {n*12} L for 3 days. Keep jugs closed, in shade, and refill them every few weeks." },
      { id: "w2", t: "Clean containers with tight lids (jugs, jerry cans, covered drums)", p: 1, b: 2,
        e: "20 L jerry cans, 200 L plastic drum with cover",
        w: "Hardware stores (Wilcon, Handyman, True Value, local ferreteria), Shopee, Lazada" },
      { id: "w3", t: "Learn to make water safe: boil for 1 minute, or use plain unscented bleach", p: 1, b: 0,
        e: "Plain household bleach. Check the label for 5–9% sodium hypochlorite.",
        n: "Steps are in the Guides tab. Boiling is the best method." },
      { id: "w4", t: "Know your backup water source (well, spring, neighbor's pump) and how to carry water", p: 1, b: 0 },
      { id: "w5", t: "Portable water filter for each household", p: 2, b: 2,
        e: "Sawyer Mini, LifeStraw Go or Flex",
        w: "Shopee, Lazada, Ubuy, Desertcart (mostly imported)",
        pr: "About ₱2,200–6,100 in imported listings",
        n: "Filters remove germs but not chemicals. When unsure, boil too." },
      { id: "w6", t: "Catch rainwater: clean drum with cover, plus a tarp or gutter", p: 2, b: 2,
        n: "Use for washing and flushing. Filter and boil before drinking." },
      { id: "w7", t: "Extend your water store to 7 days or more", p: 3, b: 1 }
    ]
  },
  {
    id: "food", name: "Food and cooking",
    blurb: "Store what your family already eats, and rotate it. Start with 2 weeks, then build up.",
    items: [
      { id: "f1", t: "Rice: one or two sacks, in sealed bins off the floor", p: 1, b: 2,
        w: "Palengke, rice dealer, supermarket",
        n: "An adult eats about 0.4 kg of dry rice a day. For {ppl}: about {n*12} kg for 30 days, or {n*12/50} sack(s) of 50 kg." },
      { id: "f2", t: "Protein that keeps without a fridge: canned fish or meat, or mongo, beans, peanut butter, soy chunks", p: 1, b: 2,
        e: "Mega, 555 or Ligo sardines; Century Tuna; Argentina corned beef; mongo; peanut butter",
        w: "Supermarket, palengke, sari-sari store" },
      { id: "f3", t: "Dried fish, salt, sugar, cooking oil, vinegar, soy sauce", p: 1, b: 1,
        e: "Tuyo, danggit, dilis, asin" },
      { id: "f4", t: "Instant noodles, oatmeal, crackers, and biscuits", p: 1, b: 1,
        e: "Lucky Me!, SkyFlakes, Quaker oats" },
      { id: "f5", t: "Airtight bins for rice and dry goods (rodent- and moisture-proof)", p: 1, b: 2,
        w: "Hardware stores, Shopee, Lazada" },
      { id: "f6", t: "Manual can opener", p: 1, b: 1 },
      { id: "f7", t: "Portable butane stove and spare butane canisters", p: 1, b: 2,
        w: "Hardware stores, outdoor shops, Shopee, Lazada",
        n: "Use in a well-ventilated area. Never burn charcoal or run a generator indoors." },
      { id: "f8", t: "Matches and lighters in a waterproof container", p: 1, b: 1 },
      { id: "f9", t: "Start a food garden: kangkong, kamote, malunggay, pechay, banana, cassava", p: 2, b: 1,
        w: "Municipal agriculture office, agri-supply stores" },
      { id: "f10", t: "Save seeds and cuttings in sealed, dry jars", p: 2, b: 0 },
      { id: "f13", t: "Plant a typhoon-tough row outside: kamote, cassava, gabi, banana", p: 2, b: 1,
        n: "These recover after strong wind and flooding. See “Grow vegetables outside” in the Guides tab." },
      { id: "f14", t: "Try sprouting mongo beans indoors: ready in 3–5 days with no soil or sun", p: 2, b: 0,
        n: "See “Grow food indoors or underground” in the Guides tab." },
      { id: "f11", t: "Powdered milk, 3-in-1 coffee, and a few comfort foods", p: 2, b: 1 },
      { id: "f12", t: "Build up to 4 weeks of stored food", p: 3, b: 2 }
    ]
  },
  {
    id: "medical", name: "Medical and hygiene",
    blurb: "Check labels and expiry dates. For prescription medicine, ask your doctor or the rural health unit.",
    items: [
      { id: "m1", t: "First-aid kit: bandages, gauze, tape, scissors, tweezers, gloves", p: 1, b: 2,
        w: "Mercury Drug, Watsons, Rose Pharmacy; Philippine Red Cross kits on Shopee or Lazada" },
      { id: "m2", t: "Wound care: povidone-iodine (Betadine), 70% alcohol, saline solution", p: 1, b: 1 },
      { id: "m3", t: "Pain and fever medicine: paracetamol (Biogesic), ibuprofen (Medicol, Advil)", p: 1, b: 1,
        n: "Follow the label. Don't take two ibuprofen-type medicines together." },
      { id: "m4", t: "Oral rehydration salts (Hydrite) and loperamide (Diatabs)", p: 1, b: 1,
        n: "Use rehydration salts first. See a doctor if diarrhea has blood, a high fever, or won't stop." },
      { id: "m5", t: "Allergy and cold medicine: cetirizine, Neozep or similar", p: 2, b: 1,
        n: "Ask the pharmacist what is safe for each family member." },
      { id: "m6", t: "One-month reserve of any regular prescription medicines", p: 1, b: 2,
        n: "Ask your doctor how to keep a reserve and rotate it before it expires." },
      { id: "m7", t: "Mosquito net (kulambo) and insect repellent, for dengue", p: 1, b: 1 },
      { id: "m8", t: "Hygiene: soap, alcohol, toothbrushes, sanitary napkins, toilet paper, garbage bags", p: 1, b: 2 },
      { id: "m9", t: "A medical info card for each person: blood type, allergies, medicines, doctor", p: 1, b: 0 },
      { id: "m10", t: "Thermometer, blood pressure monitor, N95 masks, gloves", p: 2, b: 2 },
      { id: "m11", t: "Take a first aid and CPR course", p: 2, b: 1,
        w: "Philippine Red Cross chapter, BFP, or your municipal DRRM office" },
      { id: "m12", t: "Ask your doctor or health center about leptospirosis prevention before flood season", p: 2, b: 0 },
      { id: "m13", t: "Spare eyeglasses and hearing aid batteries, if needed", p: 2, b: 1 }
    ]
  },
  {
    id: "power", name: "Power and light",
    blurb: "Start with lights, radio, and power banks. Add solar and a power station as your budget allows.",
    items: [
      { id: "e1", t: "A flashlight or headlamp for each person, plus spare batteries", p: 1, b: 1 },
      { id: "e2", t: "Hand-crank or solar AM/FM radio for weather bulletins and news", p: 1, b: 2,
        w: "Lazada, Shopee, Ubuy",
        pr: "About ₱1,300–3,400 in imported listings",
        n: "Look for AM and FM. Shortwave is a bonus." },
      { id: "e3", t: "Power banks: one 20,000 mAh per person, kept charged", p: 1, b: 2,
        e: "Anker, Xiaomi, Realme, Romoss",
        w: "Shopee, Lazada, gadget stores",
        n: "Top them up once a month." },
      { id: "e4", t: "Solar lights and rechargeable LED lanterns", p: 1, b: 1,
        w: "Shopee, Lazada, hardware stores" },
      { id: "e5", t: "Charging cables for every phone type, plus a car charger", p: 1, b: 1 },
      { id: "e6", t: "Rechargeable AA and AAA batteries with a charger", p: 2, b: 1 },
      { id: "e7", t: "Small power station (about 100–320 Wh) for phones, radio, router, and lights", p: 2, b: 3,
        e: "Jackery Explorer 100 Plus, EcoFlow RIVER 3, Bluetti Premium 30 V2",
        w: "Official Jackery, EcoFlow and Bluetti stores on Shopee or Lazada; Villman; authorized dealers",
        pr: "Jackery 100 Plus ₱6,499–8,399. EcoFlow RIVER 3 (245 Wh) about ₱15,990. Bluetti Premium 30 V2 (320 Wh) about ₱15,660.",
        n: "Prefer LiFePO4 batteries, which last longer. Buy from official stores so the warranty is valid." },
      { id: "e8", t: "Foldable 100 W solar panel to recharge it", p: 2, b: 3,
        e: "Anker SOLIX PS100, Bluetti PV100",
        w: "Anker PH, Bluetti dealers, Shopee, Lazada",
        pr: "About ₱11,800–12,700",
        n: "Check your power station's solar input limit and plug type first. A 100 W panel gives roughly 250–350 Wh on a sunny day, less when cloudy." },
      { id: "e9", t: "Larger power station (500–1,000 Wh) to run the NOMAD server, router, and a fan", p: 3, b: 3,
        e: "Bluetti AC60P, EcoFlow DELTA 3 1000 Air, Jackery Explorer 1000 V2",
        w: "Villman, official stores, authorized dealers",
        pr: "Bluetti AC60P (504 Wh) about ₱24,995. EcoFlow DELTA 3 1000 Air (960 Wh) about ₱38,990. Jackery Explorer 1000 V2 ₱44,999.",
        n: "A 60 W mini PC running 8 hours uses about 480 Wh. Models with a UPS mode switch over without rebooting the server." },
      { id: "e10", t: "More solar capacity (200–400 W) and a safe way to mount it", p: 3, b: 3,
        pr: "Anker SOLIX PS200 (200 W) about ₱22,490" },
      { id: "e11", t: "Surge protector or AVR for the NOMAD server and router", p: 2, b: 2 },
      { id: "e12", t: "Fuel stored safely, if you own a generator or gas stove", p: 2, b: 2,
        n: "Store away from living areas. Never run a generator indoors." }
    ]
  },
  {
    id: "shelter", name: "Shelter and safety",
    blurb: "Know where to go before you need to. Typhoons, floods, and earthquakes each need a different plan.",
    items: [
      { id: "s1", t: "Know your safest room, two exit routes, and the nearest evacuation center", p: 1, b: 0,
        n: "Ask your barangay or municipal DRRM office. Walk the route once with the family." },
      { id: "s2", t: "A whistle for each person", p: 1, b: 1 },
      { id: "s3", t: "Tarpaulin (trapal), rope, nylon cord, duct tape, and cable ties", p: 1, b: 2,
        w: "Hardware stores" },
      { id: "s4", t: "Raincoat, rubber boots, and work gloves for each adult", p: 1, b: 2 },
      { id: "s5", t: "Waterproof dry bag or sealed container for documents and electronics", p: 1, b: 1 },
      { id: "s6", t: "Basic tools: hammer, nails, handsaw, bolo, pliers, screwdrivers", p: 2, b: 2 },
      { id: "s7", t: "Sleeping mats (banig) and blankets for each person", p: 2, b: 2 },
      { id: "s8", t: "Fire extinguisher (ABC type) and a smoke alarm", p: 2, b: 2,
        n: "Ask your local BFP office where to buy and how to use one." },
      { id: "s9", t: "Secure the roof and trim big branches before typhoon season", p: 2, b: 1 }
    ]
  },
  {
    id: "gobag", name: "Go bags (one per person)",
    blurb: "Pack enough for 3 days in a waterproof bag you can carry. Keep it near the door and refresh it every 3 months.",
    items: [
      { id: "g1", t: "Water (1–2 liters) and a way to purify more", p: 1, b: 1 },
      { id: "g2", t: "Ready-to-eat food for 3 days: biscuits, canned food, energy bars", p: 1, b: 2 },
      { id: "g3", t: "Flashlight, whistle, power bank, and a small radio", p: 1, b: 2 },
      { id: "g4", t: "Small first-aid kit and 3 days of personal medicine", p: 1, b: 1 },
      { id: "g5", t: "Change of clothes, towel, raincoat, and slippers", p: 1, b: 1 },
      { id: "g6", t: "Copies of IDs in sealed plastic, plus cash", p: 1, b: 1 },
      { id: "g7", t: "Mask, alcohol, soap, and sanitary items", p: 1, b: 1 },
      { id: "g8", t: "Check and refresh every go bag every 3 months", p: 1, b: 0 }
    ]
  },
  {
    id: "docs", name: "Documents and money",
    blurb: "When power and signal fail, paper and cash still work.",
    items: [
      { id: "d1", t: "Copies of IDs, PSA birth and marriage certificates, land title or tax declaration, and school and medical records", p: 1, b: 1,
        w: "Photocopy shop, or scan with your phone" },
      { id: "d2", t: "Write down account numbers: PhilHealth, SSS or GSIS, insurance. Never write PINs or passwords.", p: 1, b: 0 },
      { id: "d3", t: "Cash in small bills (₱20, ₱50, ₱100, ₱500), enough for at least a week", p: 1, b: 2,
        n: "ATMs, GCash and Maya stop working when power and signal fail." },
      { id: "d4", t: "Digital copies of documents on a USB drive and on the NOMAD server", p: 1, b: 1 },
      { id: "d5", t: "A paper list of emergency numbers and addresses", p: 1, b: 0 }
    ]
  },
  {
    id: "comms", name: "Phones and communication",
    blurb: "Layer your options: your phones first, then local radios, then long-range. See the Comms tab for the plan.",
    items: [
      { id: "c1", t: "A paper contact list with every family member's numbers and addresses", p: 1, b: 0 },
      { id: "c2", t: "Agree on meeting places and a daily check-in time (see the Comms tab)", p: 1, b: 0 },
      { id: "c3", t: "SIMs from two networks (Globe and Smart or DITO) so one outage doesn't cut you off", p: 1, b: 1,
        n: "Dual-SIM Android phones are common and affordable." },
      { id: "c4", t: "Globe SIM in an Android phone supported by Starlink satellite-to-phone service", p: 2, b: 2,
        n: "Globe says supported Android phones work. iPhone support wasn't announced at launch. Ask Globe which models, which plans, and what limits apply." },
      { id: "c5", t: "A basic keypad phone with a long-lasting battery, kept charged as a backup", p: 2, b: 1 },
      { id: "c6", t: "Install an offline phone-to-phone messaging app (such as Briar) on family phones, and test it", p: 2, b: 0,
        n: "Range is short, about tens of meters, but it needs no network." },
      { id: "c7", t: "Handheld two-way radios, bought only from an NTC-authorized radio dealer", p: 2, b: 2,
        w: "NTC-accredited radio dealers. Ask the NTC regional office for the list.",
        n: "NTC rules for short-range radios require a special permit number per unit, which authorized dealers issue. Transmitting with unregistered radios can be illegal, so ask the dealer first." },
      { id: "c8", t: "Meshtastic text nodes for talking across your barangay", p: 3, b: 2,
        e: "Heltec WiFi LoRa 32 V3, LILYGO T-Beam Supreme",
        w: "Shopee, Lazada, Ubuy (imported)",
        pr: "About ₱3,400 (Heltec V3) to ₱5,100 (T-Beam Supreme)",
        n: "Meshtastic's own firmware notes say an NTC-approved device is required in the Philippines. Check with the NTC before you rely on it." },
      { id: "c9", t: "Satellite messenger (Garmin inReach or ZOLEO) with a monthly plan, if sold and allowed here", p: 3, b: 3,
        pr: "Roughly US$150 (ZOLEO) to US$500 (inReach), plus a monthly plan",
        n: "Ask a local Garmin or ZOLEO dealer about availability and plans. Each device needs its own plan." },
      { id: "c10", t: "Satellite phone from an authorized provider", p: 3, b: 3,
        n: "NTC rules say only type-approved terminals may be used here, and a license is required. Smart sells Thuraya service." },
      { id: "c11", t: "Study for the NTC amateur radio license and join a local ham club (PARA)", p: 3, b: 2,
        w: "Philippine Amateur Radio Association (PARA) and NTC" }
    ]
  },
  {
    id: "maps", name: "Maps and information",
    blurb: "Download first, while you still have internet.",
    items: [
      { id: "i1", t: "Download offline maps of Leyte and the Philippines on every phone", p: 1, b: 0,
        e: "Organic Maps, OsmAnd, or Google Maps offline areas",
        n: "Do this on Wi-Fi. Open the map once offline to confirm it works." },
      { id: "i2", t: "Check hazard maps for your barangay (flood, landslide, earthquake, storm surge) and save screenshots", p: 1, b: 0,
        e: "HazardHunterPH, Project NOAH",
        n: "Also save them to the NOMAD server." },
      { id: "i3", t: "Get a printed map of your municipality with evacuation routes", p: 1, b: 1,
        w: "Municipal DRRM office or LGU planning office" },
      { id: "i4", t: "Print the key guides from the Guides tab (water, first aid, typhoon, earthquake)", p: 1, b: 1,
        w: "Any print shop. You can also use Print in Settings." },
      { id: "i5", t: "Save official sources for offline reading: PAGASA, PHIVOLCS, NDRRMC, Philippine Red Cross", p: 2, b: 0 }
    ]
  },
  {
    id: "nomad", name: "Project NOMAD server",
    blurb: "Your offline library: Wikipedia, maps, medical references, and an AI assistant. Needs at least 5 GB free, and about 25 GB with the AI.",
    items: [
      { id: "n1", t: "Computer for the server: a low-power mini PC or used laptop with 8–16 GB RAM", p: 2, b: 3,
        w: "Villman, PC Express, DataBlitz, local computer shops, Shopee, Lazada",
        n: "A GPU and 32 GB RAM help the AI. A low-power machine saves battery." },
      { id: "n2", t: "SSD of 1–2 TB for the server", p: 2, b: 3 },
      { id: "n3", t: "Install Ubuntu, then Project N.O.M.A.D. (steps are in your chat notes)", p: 2, b: 0 },
      { id: "n4", t: "Download Wikipedia, Philippine maps, medical references, and courses", p: 2, b: 0,
        n: "This uses lots of data. Download somewhere with fast, cheap Wi-Fi." },
      { id: "n5", t: "Add your own files: typhoon and earthquake guides, farming guides, family documents, church materials", p: 2, b: 0 },
      { id: "n6", t: "A Wi-Fi router so phones can reach the server without internet", p: 2, b: 2 },
      { id: "n7", t: "Backup drive with a second copy, stored in a different place", p: 2, b: 2 },
      { id: "n8", t: "Test: switch off the internet and use NOMAD from a phone", p: 2, b: 0 },
      { id: "n9", t: "Run the server from your power station and measure how long it lasts", p: 3, b: 0 }
    ]
  },
  {
    id: "people", name: "Skills and community",
    blurb: "In a long emergency, neighbors and skills matter more than stored supplies.",
    items: [
      { id: "k1", t: "Meet your barangay officials and ask about the evacuation plan and drills", p: 1, b: 0 },
      { id: "k2", t: "Share your plan with your church group and neighbors, and agree who helps whom", p: 1, b: 0 },
      { id: "k3", t: "Practice cooking on a stove or fire without electricity", p: 2, b: 0 },
      { id: "k4", t: "Practice treating water, setting up a tarp shelter, and tying basic knots", p: 2, b: 0 },
      { id: "k5", t: "Keep tradeable essentials: salt, soap, medicine, batteries, tools", p: 3, b: 2 },
      { id: "k6", t: "Share seeds and start a community garden with neighbors", p: 3, b: 0 },
      { id: "k7", t: "Learn basic repairs: roof, plumbing, motorcycle or bicycle", p: 3, b: 0 }
    ]
  }
];

const LAYERS = [
  { id: "l1", name: "Inside your home: NOMAD Wi-Fi",
    text: "A router with no internet lets every phone reach the server and, with the right apps, each other.",
    range: "Your house and yard" },
  { id: "l2", name: "Phone networks on two SIMs",
    text: "Keep a Globe and a Smart or DITO SIM. If Globe has Starlink satellite-to-phone service for your phone, it works for text when towers are down.",
    range: "Wherever a network works" },
  { id: "l3", name: "Phone-to-phone messaging",
    text: "Apps such as Briar link phones directly by Bluetooth or Wi-Fi. Install and test them now.",
    range: "Tens of meters" },
  { id: "l4", name: "Handheld radios",
    text: "Voice between family members nearby. Buy from an NTC-authorized dealer so each unit carries a permit number.",
    range: "Several hundred meters to a few km" },
  { id: "l5", name: "Meshtastic text nodes",
    text: "Small LoRa radios that relay text between phones across a barangay or town. Check NTC approval before relying on them.",
    range: "A few km, more with relays" },
  { id: "l6", name: "Satellite messenger or satellite phone",
    text: "Reaches family abroad or 1,000 km away. The person on the other end needs a phone number, email, or their own device.",
    range: "Anywhere with a view of the sky" },
  { id: "l7", name: "Amateur (ham) radio",
    text: "The only option with no company or network behind it. Needs an NTC license, a radio, an antenna, and power.",
    range: "Hundreds to thousands of km" },
  { id: "l8", name: "AM/FM radio (listen only)",
    text: "For PAGASA bulletins, NDRRMC advisories, and local news. Keep a hand-crank or solar radio.",
    range: "Receive only" }
];

const DRILL = [
  { id: "x1", t: "Pick a day and tell the whole family what you are testing" },
  { id: "x2", t: "Keep one phone on for real emergencies. Switch off the main power and put the other phones on airplane mode." },
  { id: "x3", t: "Use only stored water and food for 24 hours" },
  { id: "x4", t: "Cook one meal without electricity, outdoors or with good ventilation" },
  { id: "x5", t: "Try to reach each other using your Comms plan, then go to your meeting place" },
  { id: "x6", t: "Connect a phone to the NOMAD server over the router, without internet" },
  { id: "x7", t: "Open each go bag, check expiry dates, and note what is missing" },
  { id: "x8", t: "Run the router and a phone charger from the power station and note how long it lasts" },
  { id: "x9", t: "Write down everything that failed, then fix the biggest gap first" }
];

const NUMBERS = [
  { label: "National emergency hotline", phone: "911" },
  { label: "Philippine Red Cross", phone: "143" },
  { label: "Philippine National Police", phone: "117" },
  { label: "NDRRMC operations center", phone: "(02) 8911-5061" }
];

const GUIDES = [
  { id: "gd1", title: "Make water safe", html: `
    <p>Never drink floodwater. Use clear water if you can.</p>
    <ol>
      <li>Let cloudy water settle, then pour it through a clean cloth.</li>
      <li>Boil it at a full rolling boil for 1 minute.</li>
      <li>Let it cool in a clean, covered container.</li>
    </ol>
    <p><b>If you can't boil:</b> use plain unscented household bleach with 5–9% sodium hypochlorite (check the label). Add about 2 drops per liter of clear water, stir, and wait 30 minutes. Use double the drops for cloudy water. It should smell faintly of chlorine afterwards.</p>
    <p class="hint">Filters such as Sawyer or LifeStraw remove germs but not chemicals.</p>` },
  { id: "gd2", title: "Heavy bleeding", html: `
    <ol>
      <li>Press firmly on the wound with a clean cloth or gauze. Use your hand if that is all you have.</li>
      <li>Don't lift the cloth to check. If blood soaks through, add more cloth on top and keep pressing.</li>
      <li>Raise the injured arm or leg if you can.</li>
      <li>Keep pressing for at least 10 minutes, then bandage firmly.</li>
      <li>Get medical help for deep wounds, wounds that keep bleeding, or anything caused by rusty metal or an animal bite.</li>
    </ol>` },
  { id: "gd3", title: "CPR for an adult who is not responding", html: `
    <ol>
      <li>Shout for help and call 911 or send someone. Check that the area is safe.</li>
      <li>If the person doesn't respond and isn't breathing normally, lay them on a firm surface.</li>
      <li>Put the heel of your hand on the center of the chest, with the other hand on top.</li>
      <li>Push hard and fast: about 5–6 cm deep, 100–120 times a minute. Let the chest rise fully between pushes.</li>
      <li>If you are trained, give 2 rescue breaths after every 30 pushes. If not, keep doing pushes only.</li>
      <li>Don't stop until help takes over, the person moves or breathes, or you can't continue.</li>
    </ol>
    <p class="callout">This is a reminder, not training. Take a first aid and CPR course.</p>` },
  { id: "gd4", title: "Burns", html: `
    <ol>
      <li>Cool the burn under clean running water for 20 minutes.</li>
      <li>Remove rings and tight items before it swells.</li>
      <li>Cover loosely with clean plastic wrap or a non-stick dressing.</li>
      <li>Don't pop blisters. Don't use ice, toothpaste, butter, or oil.</li>
    </ol>
    <p>Get medical help for burns on the face, hands, or genitals, burns bigger than the person's palm, or deep burns.</p>` },
  { id: "gd5", title: "Dehydration and diarrhea", html: `
    <p><b>Home rehydration drink:</b> mix 1 liter of clean (boiled and cooled) water with 6 level teaspoons of sugar and half a level teaspoon of salt. Sip small amounts often. Use Hydrite packets if you have them.</p>
    <p>Get help fast if there is blood in the stool, a high fever, constant vomiting, very sunken eyes, almost no urine, or the person is very sleepy. Babies and older people can get worse quickly.</p>` },
  { id: "gd6", title: "Typhoon", html: `
    <ul>
      <li><b>Before:</b> follow PAGASA bulletins on your radio. Charge phones and power banks. Store water. Secure the roof and loose objects. Move early if you live near the coast or a river.</li>
      <li><b>During:</b> stay inside in the safest room, away from windows. If an evacuation is ordered, go. Don't wait for the worst of it.</li>
      <li><b>The calm "eye":</b> the storm returns from the other side. Stay inside.</li>
      <li><b>After:</b> stay away from fallen power lines and floodwater. Check the roof and walls before relaxing. Boil all drinking water.</li>
    </ul>
    <p class="callout">Storm surge can arrive with little warning. If officials tell coastal families to evacuate, go.</p>` },
  { id: "gd7", title: "Earthquake", html: `
    <ul>
      <li><b>Indoors:</b> drop, cover your head and neck, and hold on under a sturdy table. Stay away from windows and heavy shelves.</li>
      <li><b>Outdoors:</b> move away from buildings, poles, and trees.</li>
      <li><b>On the coast:</b> if shaking is strong or lasts long, go to high ground right away. Don't wait for a warning.</li>
      <li><b>After:</b> expect aftershocks. Check for injuries. If you smell gas, open windows and leave. Check the building before going back in.</li>
    </ul>` },
  { id: "gd8", title: "Flood", html: `
    <ul>
      <li>Move to higher ground early. Don't walk or drive through moving water. Even a small depth can knock an adult down.</li>
      <li>Switch off the main power if water is rising and it is safe to do so.</li>
      <li>Avoid floodwater. If you waded in it, wash well and tell the health center. Leptospirosis is a risk, and preventive medicine may be offered.</li>
    </ul>` },
  { id: "gd11", title: "Grow vegetables outside", html: `
    <p>Times are rough, counted from planting. They vary with weather and soil.</p>
    <h4>Fast greens: eat in 3–6 weeks</h4>
    <ul>
      <li><b>Kangkong:</b> push cuttings into wet soil or shallow water. First cut in about 3–4 weeks, then keep cutting.</li>
      <li><b>Alugbati:</b> plant stem cuttings with a stick or trellis. Leaves in about 4 weeks. Likes heat and rain.</li>
      <li><b>Saluyot:</b> seeds in the ground. Leaves in about 4–6 weeks.</li>
      <li><b>Pechay and mustasa:</b> seeds. Ready in about 4–5 weeks. Shade them from heavy rain and midday sun.</li>
      <li><b>Spring onion (sibuyas dahon):</b> push the white base into soil. Cut leaves in about 4–6 weeks.</li>
    </ul>
    <h4>Climbers and fruit: 2–4 months</h4>
    <ul>
      <li><b>Sitaw (yardlong beans):</b> seeds beside a fence or sturdy trellis. Pods in about 8–10 weeks.</li>
      <li><b>Okra:</b> seeds. Pods in about 8–10 weeks.</li>
      <li><b>Talong, sili:</b> seedlings. Fruit in about 3 months.</li>
      <li><b>Ampalaya and upo:</b> seeds with a trellis. Fruit in about 2–3 months.</li>
      <li><b>Kalabasa:</b> sprawling vine. Fruit in about 3–4 months, and the young leaves and shoots are edible too.</li>
    </ul>
    <h4>Storm-tough starches and perennials</h4>
    <ul>
      <li><b>Kamote (sweet potato):</b> push vine cuttings into a mound. Tops are edible from about 4 weeks. Roots in 3–4 months.</li>
      <li><b>Cassava:</b> stem cuttings. Roots in 8–12 months, and the plant survives wind and dry spells.</li>
      <li><b>Gabi (taro):</b> likes wet ground. Ready in about 6–9 months.</li>
      <li><b>Saging (banana):</b> suckers. Fruit in about 9–12 months, and it keeps producing.</li>
      <li><b>Malunggay:</b> a tree from cuttings or seeds. Leaves in a few months, then year-round. Cut back before typhoon season so wind can't snap it.</li>
      <li><b>Luya (ginger) and tanglad (lemongrass):</b> slow, but they last and need little care.</li>
    </ul>
    <h4>Tips for Leyte weather</h4>
    <ul>
      <li>Raise your beds with soil and mulch where the ground floods. Dig drainage ditches.</li>
      <li>Plant low or tough crops where wind hits hard. Tie climbers to sturdy posts.</li>
      <li>Plant a little every 2–3 weeks so you don't harvest everything at once.</li>
      <li>Compost kitchen scraps. Never use human waste on food crops.</li>
      <li>Wash vegetables in safe water and cook leafy greens if you're unsure.</li>
    </ul>` },
  { id: "gd12", title: "Grow food indoors or underground", html: `
    <p>Inside a house, shed, or bunker the limits are light, air, and power. Start with foods that need none of them.</p>
    <h4>No light needed</h4>
    <ul>
      <li><b>Mongo bean sprouts:</b> soak a handful of whole mongo beans overnight. Drain them and keep them in a jar or tray in a dark spot. Rinse with clean water 2–3 times a day. Ready in about 3–5 days.</li>
      <li><b>Mushrooms:</b> oyster mushrooms grow on rice straw or sawdust in shade and humidity, with no sunlight. Buy a starter kit or spawn from a local grower first.</li>
    </ul>
    <h4>Near a window (a few hours of sun)</h4>
    <ul>
      <li><b>Kangkong, alugbati, spring onion:</b> in pots, buckets, or cut jerry cans with drainage holes. Spring onion also regrows in a glass of water.</li>
      <li><b>Pechay and mustasa:</b> in shallow trays of soil. Cut the young leaves early.</li>
      <li><b>Chili and herbs (sili, tanglad):</b> in pots with good sun.</li>
    </ul>
    <h4>In a windowless room or bunker</h4>
    <ul>
      <li>Plants need strong light. Use LED grow lights for 12–14 hours a day. They use power, so count it in your battery plan.</li>
      <li>Leafy greens and microgreens are the most practical, as they need little light and little time.</li>
      <li>Bring in fresh air. Humidity from plants and people can cause mold, so keep air moving.</li>
      <li>Never burn charcoal, kerosene, or gas stoves in a closed space. Carbon monoxide kills.</li>
    </ul>
    <p class="callout">Sprouts can carry bacteria. Rinse them well with safe water, and cook them lightly for children, older people, and anyone who is ill.</p>` },
  { id: "gd9", title: "Food safety without a fridge", html: `
    <ul>
      <li>Eat fresh and cooked food first. Eat the frozen food next. Cooked food shouldn't sit out for more than a couple of hours in the heat.</li>
      <li>Throw away cans that are swollen, leaking, or deeply dented.</li>
      <li>Wash hands with soap and clean water before eating or cooking.</li>
      <li>When in doubt, throw it out.</li>
    </ul>` },
  { id: "gd10", title: "Signal for help", html: `
    <ul>
      <li>Three of anything is a distress signal: three whistle blasts, three flashes of light, three fires, three shouts.</li>
      <li>Use a bright cloth, a mirror, or a flashlight in the open, and write HELP in big letters on the ground or roof.</li>
      <li>Stay put once you've signaled, unless it isn't safe.</li>
    </ul>` },
  { id: "gd14", title: "Wash your hands", html: `
    <ol>
      <li>Wet your hands with clean water and put on soap.</li>
      <li>Rub for 20 seconds: palms, backs of the hands, between the fingers, under the nails.</li>
      <li>Rinse with clean water and dry with a clean cloth or in the air.</li>
    </ol>
    <p>Wash before eating or cooking, after the toilet, after cleaning a child, and after caring for someone who is sick.</p>
    <p class="hint">No soap? Clean wood ash rubbed on wet hands is better than water alone. Pour water from a jug so the hands never touch the tap or the container.</p>` },
  { id: "gd15", title: "Cook safely when the power is out", html: `
    <ol>
      <li>Cook outside, or in a very open place with a roof. Never indoors, and never in a closed room.</li>
      <li>Keep a stove, charcoal or fire at least 1 meter from walls, roof, curtains and dry leaves.</li>
      <li>Never leave a fire alone. Keep children and pets away. Keep a bucket of water or sand next to it.</li>
      <li>When done, pour water on the coals and make sure they are cold before you leave.</li>
    </ol>
    <p class="callout">Smoke and fumes from charcoal, gas, kerosene and generators can kill, even if you smell nothing. Headache, dizziness or feeling sick: go into fresh air right away and get help.</p>` },
  { id: "gd16", title: "Before you leave home", html: `
    <ol>
      <li>Switch off the main power. Close the LPG valve.</li>
      <li>Take the go-bag, medicines, phone with a power bank, and drinking water.</li>
      <li>Take your documents in a plastic bag.</li>
      <li>Lock up. Tell your family and a neighbor where you are going.</li>
      <li>Go to your evacuation center by the safe route. Never walk or drive through floodwater.</li>
    </ol>` }
];
