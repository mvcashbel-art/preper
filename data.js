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
    id: "baby", name: "Babies and young children",
    blurb: "Babies and small children cannot wait, carry supplies or tell you what is wrong. Pack for them first. See also: Guides, Babies, older people and anyone who needs extra help.",
    items: [
      { id: "bb1", t: "Breast milk is safest. If your baby uses formula: at least 3 days of formula and safe water to mix it", p: 1, b: 2,
        n: "Use boiled and cooled water only. A clean cup and spoon is safer than a bottle when washing is hard." },
      { id: "bb2", t: "Diapers, wipes and rash cream for at least 3 days", p: 1, b: 2,
        n: "If you use cloth diapers, keep extra clean ones. Washing needs water." },
      { id: "bb3", t: "A small go-bag for each child: change of clothes, hat, blanket and a comfort toy", p: 1, b: 1 },
      { id: "bb4", t: "Child medicines: paracetamol syrup or drops and oral rehydration salts", p: 1, b: 1,
        e: "Paracetamol drops or syrup, Hydrite",
        w: "Mercury Drug, Watsons, Rose Pharmacy",
        n: "Ask a doctor or pharmacist for the right amount for your child's weight. Write it on the bottle. Never guess a dose, and never give aspirin to a child." },
      { id: "bb5", t: "Vaccine record (immunization card) and a copy of the birth certificate, in a waterproof bag", p: 1, b: 0 },
      { id: "bb6", t: "Name, your name and your phone number written on a wristband or on the child's clothes", p: 1, b: 0,
        n: "If you get separated, anyone can call you. Use a marker on a strip of cloth. Keep a recent photo of each child on your phone." },
      { id: "bb7", t: "Teach children their full name, your name, your phone number and the family meeting place", p: 1, b: 0 },
      { id: "bb8", t: "Soft familiar foods for toddlers: biscuits, lugaw ingredients, canned milk", p: 2, b: 1 },
      { id: "bb9", t: "A baby carrier or sling to keep your hands free", p: 2, b: 1 }
    ]
  },
  {
    id: "elder", name: "Older adults and people with illness or disability",
    blurb: "People who are older, ill or have a disability need more time, more supplies and one person named to help them. See also: Guides, Babies, older people and anyone who needs extra help.",
    items: [
      { id: "el1", t: "Name one person (and a backup) who will help each older or disabled family member to leave", p: 1, b: 0,
        n: "Practice the way out together once, including stairs, slopes and mud." },
      { id: "el2", t: "Keep the walking aid, cane or wheelchair near the exit, and plan how to carry the person if the path is blocked", p: 1, b: 1 },
      { id: "el3", t: "A small bag by the bed with dentures, spare eyeglasses, hearing aid batteries and daily-use items", p: 1, b: 1 },
      { id: "el4", t: "A written list of their conditions, doctor's name and medicines, in the bag and on your phone", p: 1, b: 0,
        n: "Use the Emergency ID card in the Family tab." },
      { id: "el5", t: "For anyone who needs oxygen, dialysis or an electric medical device: ask the doctor or hospital now for an emergency plan and a backup battery", p: 1, b: 0,
        n: "Do not wait for the typhoon to ask." },
      { id: "el6", t: "Soft, easy food and extra water for people who cannot chew or swallow well", p: 2, b: 1 },
      { id: "el7", t: "Adult diapers or underpads, wipes, and a bedside commode or bucket, if needed", p: 2, b: 2 },
      { id: "el8", t: "Keep them warm or cool: light blanket, hat, a battery fan", p: 2, b: 1 },
      { id: "el9", t: "Check on older neighbors who live alone, and tell them where you will be", p: 2, b: 0 }
    ]
  },
  {
    id: "meds", name: "Medicines and health records",
    blurb: "Running out of regular medicine is one of the most common problems in an emergency. Plan for it before the storm.",
    items: [
      { id: "md1", t: "A written list of everyone's regular medicines: name, strength, when taken and what for", p: 1, b: 0 },
      { id: "md2", t: "At least 7 days of every regular medicine in the go-bag", p: 1, b: 2,
        n: "Ask your doctor how to build up to one month at home. Use the oldest first and replace it before it expires." },
      { id: "md3", t: "Keep medicines in their original packs, in a waterproof bag, away from heat and sunlight", p: 1, b: 1 },
      { id: "md4", t: "Copies of prescriptions, with the doctor's name and phone number", p: 1, b: 0 },
      { id: "md5", t: "Allergies written on a card and in the Emergency ID card", p: 1, b: 0 },
      { id: "md6", t: "Know the nearest health center and hospital, and a second way to reach them if the road is blocked", p: 1, b: 0,
        n: "Mark them on the Map." },
      { id: "md7", t: "Medicines that need to stay cold (such as insulin): ask the pharmacist how long they last without a fridge, and keep a small cooler and ice packs", p: 2, b: 2,
        n: "Do not freeze insulin. Ask the pharmacist about your brand." },
      { id: "md8", t: "Copies of recent lab results and medical records, on paper and in your phone", p: 2, b: 0 },
      { id: "md9", t: "A pill box or labeled bags for each day", p: 2, b: 1 },
      { id: "md10", t: "Check medicine expiry dates every 6 months", p: 2, b: 0 }
    ]
  },
  {
    id: "elnino", name: "El Niño: drought and heat",
    blurb: "A very strong El Niño can bring months of less rain and hotter days. Prepare water, shade and food before the dry months get worse. See also: Guides, El Niño: drought, water and heat.",
    items: [
      { id: "en1", t: "Extra stored drinking water, aiming for 14 days for everyone", p: 1, b: 2,
        n: "Use clean containers with tight lids. Replace the water every 6 months." },
      { id: "en2", t: "Tight lids or covers on every water container, to keep mosquitoes out", p: 1, b: 1,
        n: "Scrub any open container once a week." },
      { id: "en3", t: "Know where to get water near you: wells, springs, water points and refilling stations, and a way to carry it", p: 1, b: 0 },
      { id: "en4", t: "Oral rehydration salts and a thermometer", p: 1, b: 1,
        e: "Hydrite, digital thermometer",
        w: "Mercury Drug, Watsons, Rose Pharmacy" },
      { id: "en5", t: "Buckets or drums to catch rainwater whenever it rains", p: 2, b: 1,
        n: "Boil or treat rainwater before you drink it." },
      { id: "en6", t: "Hats, light cotton clothes and an umbrella for shade", p: 2, b: 1 },
      { id: "en7", t: "A battery fan or hand fan, a power bank and a flashlight for brownouts", p: 2, b: 2 },
      { id: "en8", t: "Dry-season garden: mulch (dry leaves or straw), a watering can and seeds of crops that take dry weather (camote, cassava, okra)", p: 2, b: 1,
        n: "Water early in the morning at the roots. See Grow vegetables outside in Guides." },
      { id: "en9", t: "Clear dry grass and trash from around the house, and keep a bucket of water ready", p: 2, b: 0 },
      { id: "en10", t: "Extra staple food: rice, canned fish, dried fish, noodles", p: 2, b: 2,
        n: "Prices can rise in a drought. Buy a little more each week, not everything at once." }
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
    </ol>` },
  { id: "gd17", title: "Choking", html: `
    <p>Act if the person cannot speak, cough or breathe, or grabs their throat. If they can cough, let them keep coughing.</p>
    <p><b>Adult or child over 1 year:</b></p>
    <ol>
      <li>Shout for help. Stand behind the person.</li>
      <li>Give 5 hard back blows between the shoulder blades with the heel of your hand.</li>
      <li>Then give up to 5 abdominal thrusts: make a fist above the belly button, grip it with your other hand, and pull hard inward and upward.</li>
      <li>Keep alternating 5 back blows and 5 thrusts until the object comes out or the person collapses.</li>
    </ol>
    <p><b>Baby under 1 year:</b> lay the baby face down along your forearm, head lower than the body. Give 5 back blows, then turn the baby over and give 5 chest thrusts with two fingers in the middle of the chest. Repeat.</p>
    <p>If the person stops responding, call for help and start CPR. Anyone who was choking should be checked by a doctor afterward.</p>
    <p class="hint">Pregnant or very large person: give chest thrusts instead of abdominal thrusts.</p>` },
  { id: "gd18", title: "Broken bone or sprain", html: `
    <p>Signs: strong pain, swelling, a bent or odd shape, cannot move or put weight on it.</p>
    <ol>
      <li>Keep the person still. Do not try to straighten a bent limb.</li>
      <li>Stop any bleeding first (press with a clean cloth). Cover open wounds.</li>
      <li>Hold the limb still with a splint: a straight stick, rolled newspaper or folded cardboard on both sides, tied with cloth above and below the injury. Not too tight: fingers and toes must stay pink and warm.</li>
      <li>Rest it higher than the heart if you can. Cold cloth on the swelling for 20 minutes at a time, never ice directly on skin.</li>
      <li>Get to a doctor or hospital. Use a stretcher or carry the person if the leg, hip, back or neck is hurt.</li>
    </ol>
    <p class="hint">Neck or back injury, or a bone coming through the skin: do not move the person unless there is danger (fire, collapse). Call for help.</p>` },
  { id: "gd19", title: "Heat stroke", html: `
    <p>Signs: very hot skin, confusion, fainting, fast pulse, headache, seizures. The person may stop sweating. This is an emergency.</p>
    <ol>
      <li>Move the person to shade or a cool place. Call for help (911) or get them to a hospital.</li>
      <li>Take off extra clothing. Cool the body fast: wet cloths or a sponge on the neck, armpits and groin, fan the person, pour cool (not ice-cold) water on the skin.</li>
      <li>If fully awake and able to swallow, give small sips of cool water. Never force drinks on someone who is confused or drowsy.</li>
      <li>Keep cooling until help comes. If the person stops responding or breathing, start CPR.</li>
    </ol>
    <p class="hint">Prevent it: drink water often, rest in shade at midday, and never leave a child or older person in a closed car or hot room.</p>` },
  { id: "gd20", title: "Snake and dog bites", html: `
    <p><b>Snake bite</b></p>
    <ol>
      <li>Move away from the snake. Keep the person calm and still: movement spreads venom faster.</li>
      <li>Keep the bitten arm or leg still and a little below the heart. Take off rings and watches before it swells.</li>
      <li>Go to a hospital now. Carry the person if you can. If you can do it safely, note what the snake looked like. Do not chase or catch it.</li>
    </ol>
    <p><b>Do not</b> cut the bite, suck it, burn it, use a tight tourniquet, or put herbs or ice on it.</p>
    <p><b>Dog, cat or other animal bite</b></p>
    <ol>
      <li>Wash the wound right away with soap and running water for 15 minutes.</li>
      <li>Go to an animal bite center or health center the same day for rabies shots, even if the animal looked healthy. If you can, keep the animal under watch.</li>
    </ol>
    <p class="hint">Rabies is almost always deadly once symptoms start, but shots given early prevent it.</p>` },
  { id: "gd21", title: "After a flood: dirty water and leptospirosis", html: `
    <p>Floodwater and mud can carry germs from animal urine, sewage and cuts. Leptospirosis is one of them.</p>
    <ol>
      <li>Stay out of floodwater when you can. If you must wade, wear tall boots and cover cuts. Do not swim, and do not let children play in it.</li>
      <li>Wash with soap and clean water afterward, and dry your feet. Clean any cut and keep it covered.</li>
      <li>Do not drink floodwater or use it to wash food or dishes. Boil water for 1 minute first, or use your water treatment tablets or bleach.</li>
      <li>Throw away food that touched floodwater, except sealed cans, which you can wash and dry first.</li>
    </ol>
    <p><b>Go to a health center within 1 to 2 days</b> if you waded in floodwater, especially with a cut. They may give a preventive medicine. Go at once if you get fever, red eyes, bad muscle pain (especially calves), yellow skin or eyes, or less urine in the weeks that follow.</p>
    <p class="hint">Do not take medicine for this on your own. Let the health worker decide.</p>` },
  { id: "gd22", title: "Electric shock and fallen wires", html: `
    <ol>
      <li>Do not touch the person or the wire. Electricity can pass through you.</li>
      <li>Switch off the power at the main switch or breaker if you can reach it safely, or ask someone to call the electric company.</li>
      <li>If you cannot switch it off, push the person or the wire away with something dry that does not conduct, such as a dry wooden stick or a dry plastic chair. Stand on something dry.</li>
      <li>Call for help (911). Once it is safe, check breathing. If the person is not breathing, start CPR.</li>
      <li>Burns from electric shock can be deep. Cover them loosely with a clean cloth and get the person to a doctor, even if they feel fine.</li>
    </ol>
    <p><b>Fallen wire outside:</b> stay at least 10 meters away (about two jeepney lengths), warn others, and treat every wire as live. If a wire touches your car, stay inside and wait for help unless there is fire.</p>
    <p class="hint">After a flood or typhoon, never touch switches or appliances with wet hands or while standing in water.</p>` },
  { id: "gd23", title: "Stroke and heart attack signs", html: `
    <p><b>Stroke: think FAST</b></p>
    <ul>
      <li><b>F</b>ace: one side droops when they smile.</li>
      <li><b>A</b>rms: one arm is weak or drifts down when both are raised.</li>
      <li><b>S</b>peech: slurred, strange, or they cannot speak.</li>
      <li><b>T</b>ime: call 911 and go to a hospital right away. Note when it started.</li>
    </ul>
    <p>Sudden bad headache, loss of vision, or trouble walking can also be a stroke. Do not give food or drink.</p>
    <p><b>Heart attack</b></p>
    <ul>
      <li>Pressure, squeezing or pain in the chest, spreading to the arm, jaw, neck or back. Sweating, nausea, short breath. Women and older people may only feel tired, sick or short of breath.</li>
      <li>Call for help at once. Sit the person down, loosen tight clothing, and keep them calm and still.</li>
      <li>If they stop responding and are not breathing normally, start CPR.</li>
    </ul>
    <p class="hint">Do not wait to see if it passes. Minutes matter. Do not let them walk or drive themselves.</p>` },
  { id: "gd24", title: "Gas (LPG) leak", html: `
    <p>You smell gas (like rotten eggs or cabbage), hear a hiss, or the tank is leaking.</p>
    <ol>
      <li>No flames. No matches, lighters or candles. Do not switch lights, fans or phones on or off, and do not unplug anything: a spark can ignite the gas.</li>
      <li>If it is safe and quick, close the valve on the tank (turn clockwise).</li>
      <li>Open doors and windows. Get everyone outside, away from the house, and keep children and pets with you.</li>
      <li>From a safe distance, call the fire station (BFP) or your barangay. Do not go back in.</li>
      <li>Leave the tank outside in the open until a professional has checked it. Never test for leaks with a flame. Brush soapy water on joints: bubbles show a leak.</li>
    </ol>
    <p class="hint">Store the tank upright, outside or in an open place, away from heat. Replace old hoses and regulators.</p>` },
  { id: "gd25", title: "Fever and dengue", html: `
    <p>Dengue spreads by day-biting mosquitoes. Suspect it with sudden high fever for 2 to 7 days, bad headache, pain behind the eyes, body and joint pain, or a rash.</p>
    <ol>
      <li>Rest and drink plenty of fluids (water, oral rehydration solution, soup).</li>
      <li>For fever or pain, paracetamol only. Do <b>not</b> take aspirin or ibuprofen: they can make bleeding worse.</li>
      <li>See a doctor early. Do not wait for it to get worse.</li>
    </ol>
    <p><b>Go to a hospital immediately</b> when the fever drops but the person gets worse: severe belly pain, vomiting that will not stop, bleeding (gums, nose, black stool), cold or clammy skin, very sleepy or restless, or hard to wake.</p>
    <p><b>Prevent it (4S):</b> Search and destroy places where water collects (cans, tires, pots, gutters); Self-protection with long sleeves and repellent; Seek early consultation; Support spraying in outbreaks. Cover water containers and change flower vase water weekly.</p>
    <p class="hint">Any fever in a baby under 3 months, or a fever that lasts more than 3 days in anyone, needs a doctor.</p>` },
  { id: "gd26", title: "Drowning and water rescue", html: `
    <p>Many rescuers drown trying to save someone. <b>Do not jump in</b> unless you are trained.</p>
    <ol>
      <li>Shout for help and send someone to call 911.</li>
      <li><b>Reach or throw.</b> Hold out a pole, branch or cloth from the shore while you lie down or hold something solid. Or throw a rope, a floating bottle, a plastic jug or a cooler.</li>
      <li>Pull the person to safety. Lay them on their back on firm ground.</li>
      <li>If the person is <b>not breathing</b>: tilt the head back and give <b>5 rescue breaths</b> mouth to mouth. Then start chest compressions (see the CPR guide) and keep going until help comes or the person breathes.</li>
      <li>If breathing: put them on their side, take off wet clothes and cover them with something dry and warm.</li>
    </ol>
    <p><b>Everyone who nearly drowned needs a doctor</b>, even if they seem fine. Water in the lungs can cause trouble hours later.</p>
    <p class="hint">In a flood, never walk or drive through moving water. 15 cm of fast water can knock an adult down.</p>` },
  { id: "gd27", title: "Lightning", html: `
    <p>If you can hear thunder, you are close enough to be hit.</p>
    <ol>
      <li>Go <b>inside a building</b> or a car with a hard roof. Close the windows.</li>
      <li>Stay away from windows, wires, metal pipes, taps and anything plugged in. Unplug appliances if you can do it early.</li>
      <li>Outside with no shelter: get off hills, open fields, beaches and the water. Stay away from tall lone trees, poles and metal fences. <b>Last resort only:</b> crouch low on the balls of your feet with your head tucked in. Do not lie flat.</li>
      <li>Wait <b>30 minutes</b> after the last thunder before you go out again.</li>
    </ol>
    <p><b>A person hit by lightning is safe to touch.</b> Call 911. If they are not breathing, start CPR right away. Many people hit by lightning survive when CPR is started early.</p>
    <p class="hint">Count the seconds between flash and thunder. If it is under 30, go in now.</p>` },
  { id: "gd28", title: "Cuts, wounds and infection", html: `
    <ol>
      <li>Wash your hands first, or use clean gloves.</li>
      <li><b>Stop the bleeding</b> by pressing firmly with a clean cloth. (For heavy bleeding, see the Heavy bleeding guide.)</li>
      <li>Rinse the wound with a lot of clean running water, for several minutes. Safe boiled-and-cooled water is fine. Remove dirt gently.</li>
      <li>Cover with a clean bandage or cloth. Change it every day, and whenever it is wet or dirty.</li>
      <li>Check the <b>tetanus shot</b>. If it is more than 5 to 10 years old, or you do not know, or the wound is dirty or deep, ask a clinic for a booster.</li>
    </ol>
    <p><b>See a doctor</b> for a deep or gaping cut, a bite, a wound from rusty metal, or a wound with dirt you cannot get out.</p>
    <p><b>Signs of infection:</b> more redness, swelling or pain after the second day, warm skin, pus or a bad smell, red lines going up the arm or leg, or fever. Go to a clinic the same day.</p>
    <p class="hint">Do not put alcohol, soy sauce, toothpaste or coffee on a wound. They harm the skin.</p>` },
  { id: "gd29", title: "Fever in a child", html: `
    <ol>
      <li>Give <b>plenty of fluids</b>: breast milk, water, oral rehydration solution. Small sips often.</li>
      <li>Dress the child lightly. A lukewarm sponge bath is fine. No cold water or alcohol rubs.</li>
      <li>For discomfort, you may give <b>paracetamol</b>. Follow the label for the child's weight and age, or ask a pharmacist or doctor. <b>Never give aspirin to a child.</b></li>
      <li>Watch the child. A child who drinks, plays a little and wakes easily is usually okay.</li>
    </ol>
    <p><b>Go to a doctor or hospital now</b> if: the baby is under 3 months old with any fever; the fever lasts more than 3 days; the child is very sleepy, hard to wake or limp; has a stiff neck, a rash that does not fade when pressed, trouble breathing, will not drink, keeps vomiting, or has little or no urine.</p>
    <p><b>If the child has a seizure (fits):</b> lay them on their side on a soft place, move hard things away, do not put anything in the mouth, and do not hold them down. Note the time. Most stop within 5 minutes. Call for help if it lasts more than 5 minutes, or if it is the first time.</p>
    <p class="hint">Dengue and measles can start as a plain fever. See the Fever and dengue guide too.</p>` },
  { id: "gd30", title: "After the disaster: the first day", html: `
    <p>Wait for the all-clear from your barangay or local officials before you go home, and move slowly.</p>
    <ol>
      <li>Check yourself and your family for injuries first. Treat serious problems and call for help.</li>
      <li>Tell your family you are safe: tap <b>I'm safe</b> on the Home screen. Send texts, not calls, so the lines stay free.</li>
      <li>Look at your house from outside before you go in: leaning walls, big cracks, a sagging roof or floor. If it looks unsafe, stay out.</li>
      <li>Go in with sturdy shoes, long sleeves and gloves. Do not light matches or candles. If you smell gas, open windows, leave, and do not touch switches.</li>
      <li>Stay away from fallen wires and from anything wet near electricity. Keep the main switch off until an electrician checks the house.</li>
      <li>Take photos of the damage <b>before</b> you clean up. They help when you ask for aid.</li>
      <li>Use only safe water and food until you know the supply is clean.</li>
    </ol>
    <p>Aftershocks, floodwater that comes back, and landslides on wet slopes can happen hours or days later. Keep your go-bag ready.</p>
    <p class="hint">Do not walk or drive through floodwater. It can hide holes, wires and sharp things.</p>` },
  { id: "gd31", title: "Damage check and clean-up", html: `
    <ol>
      <li>Wear boots, gloves, long sleeves and a mask when you handle debris, mud or mold. Avoid wading in floodwater.</li>
      <li>Never run a generator, charcoal stove or gas stove <b>inside</b> the house, even with windows open. The smoke has carbon monoxide, which kills quietly.</li>
      <li>Take out wet mattresses, cloth, paper and food that touched floodwater. Throw away what you cannot wash and dry in 1 to 2 days, or mold will grow.</li>
      <li>Wash hard surfaces with soap and water, then wipe with about 1 cup (250 mL) of plain bleach in 4 liters of water. Never mix bleach with other cleaners.</li>
      <li>Lift with your legs, not alone if it is heavy. Watch for nails and glass. If you cut yourself, clean the wound and ask about a tetanus shot.</li>
      <li>Empty anything that holds water (cans, tires, pots). Mosquitoes breed in it within days, and dengue follows.</li>
      <li>Flooded wells and containers are unsafe. Boil or treat all drinking water until the health office says it is safe.</li>
      <li>Do not touch dead animals with bare hands. Ask the barangay health worker how to remove them.</li>
    </ol>
    <p class="hint">See also: After a flood (leptospirosis), Make water safe, Food safety, Gas leak, Electric shock.</p>` },
  { id: "gd32", title: "Getting help and rebuilding", html: `
    <ol>
      <li>Go to the barangay hall and register your family, so you are on the list for relief goods and help.</li>
      <li>Bring IDs and papers if you have them. If they are lost, tell the barangay. Ask which documents are needed.</li>
      <li>Record the damage: photos, a list of what you lost, and any receipts.</li>
      <li>Ask the municipal DRRM office or social welfare office what help is available now (food, shelter materials, repair, cash or livelihood help). Programs change, so ask each time.</li>
      <li>Check on neighbors, especially older people, babies, pregnant women and people who live alone. Share what you learn.</li>
      <li>Get news only from officials and trusted sources. Relief goods should be free. Do not pay "fees" to strangers, and be careful with your personal details.</li>
      <li>Restock what you used. Update your plan: what worked, what did not, what you wish you had.</li>
    </ol>
    <p class="hint">Church groups and community groups often organize help. Tell them what your family needs, and what you can give.</p>` },
  { id: "gd33", title: "Stress and feelings after a disaster", html: `
    <p>After a disaster, almost everyone feels shaken. Fear, anger, sadness, trouble sleeping, bad dreams, headaches, trouble eating or concentrating, jumpiness, or feeling numb are common. For most people they ease over days to weeks.</p>
    <p><b>What helps:</b></p>
    <ol>
      <li>Get back to a routine: meals, sleep, work, prayer, small chores.</li>
      <li>Talk with someone you trust. You do not need to be strong for everyone all the time.</li>
      <li>Eat, drink water and rest, even a little.</li>
      <li>Limit the news and rumors on your phone.</li>
      <li>Accept help. Help someone else with a small task. It lifts the mind.</li>
    </ol>
    <p><b>Children:</b> stay close and keep routines. Explain what happened in simple, true words. Let them draw or play. Clinging, fear of the dark and bedwetting are common and usually pass.</p>
    <p><b>See a health worker or doctor</b> if feelings get stronger after 2 to 4 weeks, you cannot sleep or eat, you cannot do daily things, you drink more alcohol, or you feel hopeless.</p>
    <p><b>If you or someone you know is thinking of suicide:</b> stay with the person and call 911, or the NCMH Crisis Hotline: <b>1553</b> (free from a landline), 0919-057-1553 (Smart/TNT) or 0917-899-8727 (Globe/TM). They answer 24 hours.</p>` },
  { id: "gd34", title: "Earthquake: tall building, car, school and the coast", html: `
    <p>The basic move is the same everywhere: <b>drop, cover your head and neck, hold on</b>. These are the differences.</p>
    <ul>
      <li><b>Tall building:</b> do not run out while it shakes, and never use the elevator. Stay away from windows. When the shaking stops, take the stairs, one floor at a time, with shoes on.</li>
      <li><b>In bed:</b> stay there and cover your head with a pillow. Move only when it is safe.</li>
      <li><b>School or church:</b> get under the desk or bench, cover your head, and listen to the teacher or leader. Do not run for the door.</li>
      <li><b>In a car:</b> stop in an open place, away from bridges, poles, wires and buildings. Stay inside until the shaking stops.</li>
      <li><b>Market or crowd:</b> protect your head and move away from shelves and glass. Do not rush the exits.</li>
      <li><b>By the sea or a river mouth:</b> if the shaking was strong or long, or you cannot stand, go to high ground right away. Do not wait for a siren.</li>
    </ul>
    <p>When it stops: check yourself and others for injuries, expect aftershocks, and use text messages instead of calls.</p>
    <p class="hint">Make a plan with your family now: in each place you go every day (home, school, church, work), where is the safe spot?</p>` },
  { id: "gd35", title: "Landslide warning signs", html: `
    <p>Landslides often follow days of heavy rain, a strong earthquake, or cutting into a slope. Be alert if you live under a slope, near a cliff, or in a stream channel.</p>
    <p><b>Signs that the slope may move:</b></p>
    <ul>
      <li>New cracks in the ground, a road, a wall or a floor.</li>
      <li>Trees, poles or fences that begin to tilt.</li>
      <li>Water coming out of the slope in new places, or a stream that suddenly turns muddy or drops.</li>
      <li>Bulging ground at the bottom of the slope, or doors and windows that suddenly stick.</li>
      <li>A rumbling sound, or rocks and soil falling.</li>
    </ul>
    <p><b>What to do:</b></p>
    <ol>
      <li>Leave at once if you see these signs. Do not wait for an official order.</li>
      <li>Move to the side, away from the path of the slide, then to firm high ground. Do not run down the slope or along the stream.</li>
      <li>Tell your neighbors and the barangay.</li>
      <li>Stay away after it stops. More can come down.</li>
    </ol>
    <p class="hint">Ask the barangay or the municipal DRRM office whether your house is in a landslide-prone area, and where to go in a warning.</p>` },
  { id: "gd36", title: "Storm surge and tsunami: when to move", html: `
    <p><b>Storm surge</b> is a rise of the sea pushed by a typhoon. It can flood the coast several meters deep, and it can come fast, before the winds are worst. If your area is told to evacuate for storm surge, go early.</p>
    <p><b>Tsunami</b> comes after an earthquake or other event under the sea. It is a series of waves that can arrive minutes to hours after the shaking.</p>
    <p><b>Move to high ground right away if:</b></p>
    <ul>
      <li>You are near the sea and the earthquake was strong or lasted long, or you could not stand.</li>
      <li>The sea suddenly pulls far back, or you hear a loud roar from the sea.</li>
      <li>Officials give a tsunami warning or sound the siren.</li>
    </ul>
    <ol>
      <li>Go inland and uphill, on foot if you can. Roads jam quickly.</li>
      <li>If you cannot get away from the coast in time, go to the 3rd floor or higher of a strong concrete building, or to the roof.</li>
      <li>Stay up. The first wave is often not the biggest. Wait for the all-clear from officials, which can take many hours.</li>
      <li>Do not go down to the beach to look, or to collect fish.</li>
    </ol>
    <p class="hint">Learn the evacuation route and the high place for your barangay now. Walk it with your family once.</p>` },
  { id: "gd37", title: "Pregnancy and childbirth in an emergency", html: `
    <p>If someone in your family is pregnant, plan early. Ask the midwife or the rural health unit about the due date, the nearest place with a trained birth attendant, and how to get there if the road is blocked.</p>
    <p><b>Go to a health worker or hospital at once for:</b> bleeding from the vagina, a very bad headache with blurry vision, fits (convulsions), severe belly pain, fever, the baby moving much less, water breaking before labor starts, or labor that is very long.</p>
    <p><b>If the baby is coming and help cannot arrive in time:</b></p>
    <ol>
      <li>Stay calm. Call for help. Wash your hands. Use a clean cloth, towel or plastic sheet under the mother.</li>
      <li>Let the mother push in the position that feels right. Support the baby's head as it comes out. Do not pull on the baby.</li>
      <li>Dry the baby well with a clean cloth and put the baby on the mother's bare chest, with a cloth over both. Keep them warm. Cover the baby's head.</li>
      <li>If the baby does not cry or breathe, rub the back firmly with the cloth. If still no breathing, give gentle puffs of air over the mouth and nose and get help at once.</li>
      <li>Do not pull on the cord. Wait for the afterbirth (placenta) to come out by itself. Leave the cord alone until a health worker can tie and cut it. If no one can come for many hours, ask a health worker by phone how to do it safely.</li>
      <li>Let the baby feed at the breast. This helps the mother's womb tighten and reduces bleeding.</li>
    </ol>
    <p><b>Heavy bleeding after the birth is an emergency.</b> Rub the lower belly firmly in circles, let the baby feed, and take the mother to a hospital right away.</p>
    <p class="hint">A midwife or nurse should read this page with you before an emergency. Keep the mother's medical papers in the go-bag.</p>` },
  { id: "gd38", title: "Living in an evacuation center", html: `
    <p><b>When you arrive:</b> register with the camp manager or barangay staff, and tell them who in your family is sick, pregnant, older or has a disability. Find the water, toilets, clinic and exits. Tell your family and neighbors where you are.</p>
    <p><b>Stay healthy:</b></p>
    <ul>
      <li>Wash your hands with soap, especially after the toilet and before eating.</li>
      <li>Drink only safe water. Keep your own cup and bottle.</li>
      <li>Cough into your elbow. Tell the staff early if someone has a fever, rash, diarrhea or cough.</li>
      <li>Keep your medicines with you, and your go-bag close when you sleep.</li>
    </ul>
    <p><b>Stay safe:</b></p>
    <ul>
      <li>Keep children and older people close. Agree on a meeting spot inside the center.</li>
      <li>Women and girls: go to the toilet or wash areas in a group or with someone you trust, and sleep near your family.</li>
      <li>Report any harassment, theft or abuse to the camp manager, barangay officials or the police Women and Children Protection Desk. You will be believed.</li>
      <li>Keep valuables and papers on your body or in a small bag you carry.</li>
    </ul>
    <p class="hint">Offer a small job to help (cleaning, water, watching children). It keeps the center calm and keeps you busy.</p>` },
  { id: "gd39", title: "Someone is trapped", html: `
    <p>Your own safety comes first. A second victim does not help.</p>
    <ol>
      <li>Check that the area is safe: shaky walls, aftershocks, fire, gas, wires, rising water. If it is not safe, stay out and call for rescue.</li>
      <li>Call 911 or your barangay. Say where the person is and how many people are trapped.</li>
      <li>Call out, then stay quiet and listen. Tap on a pipe or wall and listen for a reply. Mark the spot.</li>
      <li>Tell the person help is coming. Keep talking. Keep them warm, and if they can swallow, give small sips of water.</li>
      <li>Stop any bleeding you can reach (see Heavy bleeding). Keep dust off the person's face with a cloth.</li>
      <li>Move only light things that are safe to move, and never pull out something heavy that is holding up a wall or beam.</li>
    </ol>
    <p><b>A person who has been under a heavy weight for hours needs a doctor as soon as they are freed,</b> even if they look okay. Do not move someone with a neck or back injury unless the place is about to collapse.</p>
    <p class="hint">Keep a whistle in your go-bag. A whistle can be heard from further than a voice.</p>` },
  { id: "gd40", title: "El Niño: drought, water and heat", html: `
    <p>El Niño brings less rain and hotter days for months. Dry spells and drought can follow. Typhoons can still come, so keep your typhoon plan ready too. Check PAGASA's El Niño advisory each month and listen to your barangay.</p>
    <p><b>Water first</b></p>
    <ol>
      <li>Store extra drinking water now, in clean containers with tight lids. Aim for 14 days for everyone if you can.</li>
      <li><b>Keep every water container covered.</b> Mosquitoes breed in uncovered stored water within days, and dengue rises. Scrub open containers once a week.</li>
      <li>Drinking and cooking come first. Reuse washing water for flushing and for plants.</li>
      <li>Catch rainwater whenever it rains. Boil or treat it before you drink it.</li>
      <li>Know your water sources: wells, springs, water points and refilling stations. Wells can run low, or taste salty near the coast. Do not drink from muddy or still pools.</li>
    </ol>
    <p><b>Heat</b></p>
    <ul>
      <li>Drink water before you feel thirsty. Wear light clothes and a hat. Rest in the shade during the hottest hours, from about 11 AM to 3 PM.</li>
      <li>Never leave children, older people or pets in a closed car or a hot room.</li>
      <li>Watch for heat stroke (see the Heat stroke guide). Babies, older people and pregnant women need extra care. Check on neighbors.</li>
    </ul>
    <p><b>Fire</b></p>
    <ul>
      <li>Dry grass and brush burn fast. Do not burn rubbish. Clear dry grass and trash from around the house, and keep a bucket of water near.</li>
      <li>Never leave a cooking fire. Put out cigarettes fully.</li>
    </ul>
    <p><b>Food and the garden</b></p>
    <ul>
      <li>Mulch the soil with dry leaves or straw. Water early in the morning at the roots. Choose crops that take dry weather, such as camote, cassava and okra. Save seeds.</li>
      <li>Prices can rise in a drought. Buy a little extra staple food each week instead of everything at once, so there is enough for your neighbors too.</li>
    </ul>
    <p><b>Power:</b> dry months can cause brownouts. Keep a power bank, flashlight and a fan that works on batteries.</p>
    <p class="hint">See also: Make water safe, Heat stroke, Grow vegetables outside, Fever and dengue.</p>` }
];
