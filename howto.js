/* Handa step-by-step guides: what to buy and what to do, in order.
   Peso figures are Philippine listings seen in November 2026 and will change.
   Where no price was found, the guide says to ask a dealer. Nothing here replaces a licensed electrician,
   an engineer, a doctor, or the NTC's rules. */

/* Appliances for the solar calculator. w = typical watts (check the label), q = how many, h = hours a day. */
const CALC_ROWS = [
  { id: "led", name: "LED bulbs", w: 9, q: 4, h: 5 },
  { id: "fan", name: "Electric fan", w: 50, q: 2, h: 8 },
  { id: "phone", name: "Phone chargers", w: 10, q: 5, h: 3 },
  { id: "router", name: "Wi-Fi router and modem", w: 12, q: 1, h: 12 },
  { id: "lap", name: "Laptop", w: 60, q: 1, h: 4 },
  { id: "tv", name: "LED TV", w: 50, q: 0, h: 3 },
  { id: "fridge", name: "Small refrigerator (about 8 hours of running a day)", w: 150, q: 0, h: 8 },
  { id: "rice", name: "Rice cooker", w: 600, q: 0, h: 1 },
  { id: "pump", name: "Water pump (about 1/2 hp)", w: 370, q: 0, h: 1 }
];

/* Which guides each Levels area links to. */
const LAD_GUIDES = {
  food: ["food", "foodkeep", "foodraise"], water: ["water"], solar: ["solar1", "solar2", "solar3"], gen: ["gen"], grow: ["grow", "growin"],
  shelter: ["shelter", "shelter2", "shelter3"], comms: ["comms"], med: ["med"], cook: ["cook"], san: ["san"]
};

const HOWTO = [
  {
    id: "solar1", title: "Solar 1: Work out how much power you need", icon: "calc", calc: true,
    time: "About 30 minutes", cost: "Free",
    intro: "Every solar purchase starts here. Don't buy panels or batteries until you know how many watt-hours you use in a day.",
    buy: [
      { t: "Pen, paper and your appliances' labels or power adapters" },
      { t: "Optional: a plug-in watt meter to measure real use", n: "Sold on Shopee and Lazada. It shows the true watts of a fridge or pump." }
    ],
    steps: [
      { t: "List what must keep working in an outage", d: "Lights, phone chargers, a fan, the router, maybe a fridge. Leave out luxuries for now." },
      { t: "Find each item's watts", d: "Look on the label or the power adapter. If it shows volts and amps, watts = volts × amps." },
      { t: "Estimate hours per day", d: "A fridge runs only part of the day, about 8 hours of compressor time. Lights run the evening." },
      { t: "Fill in the calculator below", d: "Change the numbers to match your home. The results update as you type." },
      { t: "Round up and add a margin", d: "Your needs will grow. Plan for 20 to 30% more than the first answer." },
      { t: "Pick your path", d: "Under about 1 kWh a day: Solar 2 (power station). Above that: Solar 3 (home battery system)." }
    ],
    warn: [],
    sources: ["Panel size uses 4.5 sun-hours a day and a 0.85 loss factor (electrotech-solar.vercel.app). The 80% battery depth and the voltage rule are common installer rules of thumb."]
  },
  {
    id: "solar2", title: "Solar 2: Power station and panels (no wiring)", icon: "solar", lad: "solar",
    time: "1 day to set up", cost: "About ₱6,500 to ₱45,000 for the station, panels extra",
    intro: "The easiest start. Nothing is wired into your house: you plug your devices into the station, and panels recharge it.",
    buy: [
      { t: "Power station, 100 to 1,000 Wh", p: "Jackery 100 Plus ₱6,499–8,399; EcoFlow RIVER 3 about ₱15,990; Anker PS200 about ₱22,490; Bluetti AC60P about ₱24,995; EcoFlow DELTA 3 1000 Air about ₱38,990; Jackery 1000 V2 ₱44,999", n: "Check that it outputs 220–240 V at 60 Hz, the Philippine standard. Some imported models are 110–120 V." },
      { t: "Solar panel or folding panel that fits the station", p: "100 W folding panels about ₱11,800–12,700", n: "Check the station's maximum solar input watts and voltage in its manual before you buy." },
      { t: "Surge-protected power strip and a heavy extension cord" },
      { t: "Spare charging cables and USB lanterns" },
      { t: "Where to buy", n: "The brand's official store on Shopee or Lazada, or an authorized dealer with a local warranty." }
    ],
    steps: [
      { fig: "solar_flow", t: "Size it from your Solar 1 result", d: "Pick a station that holds at least half a day of your daily watt-hours, and ideally a full day." },
      { t: "Buy from a seller with a local warranty", d: "Keep the receipt and the serial number. Confirm 220 V output." },
      { t: "Charge it fully from the wall on day one", d: "Read the manual. Note the maximum output watts so you don't overload it." },
      { t: "Test with your real essentials", d: "Plug in your lights, fan and router. Time how long it lasts, and write down the real hours." },
      { fig: "solar_tilt", t: "Set up the panels in full sun", d: "In Leyte, face them south and tilt about 10 to 15 degrees (rule of thumb: tilt about equal to your latitude). Keep them out of shade: a small shadow cuts output a lot." },
      { t: "Make a charging routine", d: "Top it up from the wall before a typhoon and from the sun after. Check the manual for storage advice and recharge at least every 3 months." },
      { t: "Protect it from storms", d: "Fold or take down panels before a typhoon. Keep the station dry, cool and off the floor." },
      { t: "Practice a 24-hour blackout", d: "Run only from the station and panels for a day. Write down what ran out first." }
    ],
    warn: ["Never plug a power station or generator into a wall outlet to power the house. It can send power back into the line and kill line workers.", "Keep lithium batteries out of rain, heat and direct sun, and away from bedding."],
    sources: ["Prices from Philippine listings (Jackery, EcoFlow, Anker, Bluetti), November 2026."]
  },
  {
    id: "solar3", title: "Solar 3: Home battery system (hire a licensed electrician)", icon: "solar", lad: "solar",
    time: "Weeks to plan, 2 to 5 days to install", cost: "About ₱150,000–250,000 (3 kW) or ₱250,000–350,000 (5 kW) with installation",
    intro: "A permanent system wired into your house, with panels, a hybrid inverter and a lithium battery. This is a job for a licensed electrician (RME) or electrical engineer (REE/PEE) and a reputable solar installer, not for do-it-yourself.",
    buy: [
      { t: "Hybrid inverter, 3 to 5 kW (the box that turns battery power into the power your outlets use, and manages the panels)", p: "A 5 kW off-grid hybrid inverter such as PowMr was listed at about ₱50,274; a 10 kW at about ₱80,897", n: "Choose a hybrid or off-grid type. A grid-tie-only inverter shuts off during a blackout." },
      { t: "Long-life lithium battery (LiFePO4), about 5 to 15 kWh (kWh = how much energy it stores)", p: "Often about half the cost of the whole system", n: "Example package: 3 kW with 4 × 200 Ah batteries and 9 panels." },
      { t: "Solar panels, 6 to 16", n: "Example: 9 × 340 W for 3 kW, 16 × 340 W for 5 kW." },
      { t: "Typhoon-rated mounting rails and clamps" },
      { t: "DC cable, breakers, surge protection, conduit and a grounding rod" },
      { t: "Installation and labor", p: "Included in the package prices above" }
    ],
    steps: [
      { t: "Do the Solar 1 calculation first", d: "Take your watt-hours per day, panel watts and battery size to the installers." },
      { t: "Get at least 3 written quotes", d: "Ask for the panel and inverter models, usable battery kWh, warranty years, who installs, the typhoon rating of the mounts, and what permits are included." },
      { t: "Check your roof", d: "It must be strong, mostly shade-free and ideally face south. Ask the installer to inspect it in person." },
      { fig: "hybrid", t: "Choose hybrid with a battery", d: "That way your home keeps power in a blackout and your panels keep working." },
      { t: "Contact your electric cooperative if you connect to the grid", d: "Ask what approval they need. A fully off-grid system doesn't connect to the grid." },
      { t: "Ask to see the installer's license", d: "A licensed electrician or engineer should sign off on the wiring." },
      { t: "Commission and test", d: "With the installer present, switch off the grid and check that your essential loads keep running. Get the manuals and wiring diagram." },
      { t: "Label every breaker and keep a printed shutdown guide", d: "Everyone in the family should know how to shut the system off." },
      { t: "Maintain it", d: "Rinse dust off the panels, check connections after every typhoon, and plan to replace the batteries at about year 10 (estimate)." }
    ],
    warn: ["Panels make dangerous direct current in daylight. Wiring is for licensed people only.", "Install the battery in a shaded, ventilated place, not in a bedroom, and fit a smoke alarm nearby."],
    sources: ["groundwork-ph.pages.dev, unbox.ph and solar-scout.vercel.app (system prices); ubuy.com.ph (PowMr inverter listings); electrotech-solar.vercel.app (battery replacement near year 10)."]
  },
  {
    id: "gen", title: "Generator: choose it, connect it safely and run it", icon: "gen", lad: "gen",
    time: "1 day", cost: "About ₱8,100 to ₱65,000 for most home sets",
    intro: "A generator is a bridge, not a plan. It is loud, thirsty and dangerous if misused, but it handles heavy loads solar can't.",
    buy: [
      { t: "The generator", p: "Small inverter sets ₱8,100–10,900; 3.5–5.5 kW about ₱17,600–25,500; diesel 6–8 kW about ₱51,980–65,000", n: "An inverter type gives cleaner power for phones and laptops. Diesel suits long running." },
      { t: "Transfer switch, installed by an electrician (a safe switch that connects the generator to the house wiring)", n: "This is the only safe way to connect a generator to house wiring." },
      { t: "Approved fuel containers and fuel stabilizer for gasoline" },
      { t: "Engine oil, spare spark plug, air filter and fuel filter" },
      { t: "Battery-powered carbon monoxide alarm" },
      { t: "Dry-chemical fire extinguisher (ABC type)" },
      { t: "Heavy-duty outdoor extension cords rated for the load" }
    ],
    steps: [
      { t: "List your loads and their starting watts", d: "Motors in fridges and pumps need 2 to 3 times their running watts to start." },
      { t: "Choose the size", d: "Add up the running watts and multiply by 1.25. Make sure the set's surge watts cover the biggest motor." },
      { t: "Buy from a dealer with parts and a warranty", d: "Brands such as Honda, Yamaha, EF Power, Bravus and Powerhouse are sold locally." },
      { t: "First run", d: "Read the manual, fill the oil, add fuel and run it outdoors with a small load." },
      { fig: "gen_distance", t: "Place it outdoors, well away from the house", d: "Keep it at least 6 m (20 ft) from doors, windows and vents, with the exhaust pointing away, and under a roof that keeps rain off." },
      { t: "Connect with a transfer switch or direct cords", d: "Either have an electrician fit a transfer switch, or plug appliances straight into the generator with proper cords." },
      { t: "Fuel safely", d: "Stop the engine and let it cool before you refuel. Store fuel in approved containers, in shade, away from the house." },
      { t: "Keep it ready", d: "Run it 15 to 30 minutes under load once a month (common advice) and change the oil as the manual says." },
      { t: "Keep a fuel log", d: "Write down hours run and liters used. Use it to plan how much fuel you really need." }
    ],
    warn: ["Never run a generator in a house, garage or porch, even with a window open. Carbon monoxide kills quickly.", "Never plug a generator into a wall outlet.", "Only add fuel when the engine is off and cool."],
    sources: ["khmtools.com.ph, toolssavvy.ph and goldpeaktools.com.ph (prices and the transfer-switch advice)."]
  },
  {
    id: "water", title: "Water: store it, clean it, catch rain", icon: "water", lad: "water",
    time: "1 day for storage, 1 to 3 days for rain catching", cost: "Drums and a filter from about ₱2,200; a tank costs more",
    intro: "Plan on 4 liters per person per day. For {ppl} that is {n*4} liters every day. Store enough for the first days, then add a way to renew it from rain.",
    buy: [
      { t: "Food-grade containers with tight lids", p: "5-gallon jugs (about 19 L), 20 L jerry cans, 200 L covered drums", n: "Never reuse drums that held chemicals." },
      { t: "Plain unscented bleach (5–9% sodium hypochlorite)" },
      { t: "Portable water filter", p: "Sawyer or LifeStraw about ₱2,200–6,100 in imported listings" },
      { t: "Gutter, downspout, mesh screen and a first-flush diverter", n: "Hardware stores can supply the parts." },
      { t: "A larger tank on a stand (1,000–5,000 L)", n: "Ask local dealers for the price. Mosquito screens on every opening." },
      { t: "Siphon hose and a clean funnel" }
    ],
    steps: [
      { t: "Work out your amount", d: "People × 4 liters × days. For {ppl}: {n*28} L for 7 days, {n*120} L for 30 days. A 5-gallon jug holds about 19 L, so 7 days is about {n*28/19} jugs." },
      { t: "Wash the containers", d: "Scrub with soap, rinse well, then rinse once with a little bleach water and rinse again." },
      { t: "Fill and label", d: "Fill from a refilling station, close the lid and write the date. Store in shade, off the ground." },
      { t: "Treat when in doubt", d: "Use the “Make water safe” guide below. Boiling is best." },
      { fig: "rain_catch", t: "Build rain catching", d: "Fit a gutter on a clean roof. Put a mesh screen on the downspout and a first-flush diverter so the dirty first rain is thrown away. Avoid roofs with old lead paint or asbestos." },
      { t: "Cover and screen everything", d: "A tight cover and mosquito mesh stop breeding and dirt." },
      { t: "Treat rainwater before drinking", d: "Filter it, then boil or chlorinate." },
      { t: "Rotate", d: "Replace stored water every few months and check for smell or algae." }
    ],
    warn: ["Never drink floodwater.", "Filters remove germs but not chemicals."],
    sources: ["Guides tab (make water safe); khmtools.com.ph for pressure tanks and drums."]
  },
  {
    id: "food", title: "Food: build a 30-day pantry, then 90 days", icon: "food", lad: "food",
    time: "A few weeks of normal shopping", cost: "The same food you already eat, just bought earlier",
    intro: "Store what your family already eats, and rotate it. Don't buy a pile of food nobody likes.",
    buy: [
      { t: "Rice", p: "For {ppl}: about {n*12} kg for 30 days", n: "That is about {n*12/50} sack(s) of 50 kg (0.4 kg per adult a day)." },
      { t: "Canned fish or meat", p: "For {ppl}: about {n*30} cans for 30 days (1 a day each)", n: "Sardines, tuna, corned beef." },
      { t: "Mongo, dried beans and dried fish", p: "For {ppl}, estimate {n*3} kg of beans and {n*1} kg of dried fish per month" },
      { t: "Cooking oil, salt, sugar, vinegar, soy sauce", p: "For {ppl}, estimate {n*1} L of oil per month" },
      { t: "Coffee or milk powder, oatmeal, biscuits, instant noodles" },
      { t: "Multivitamins" },
      { t: "Airtight bins with tight lids", n: "To keep out rats, ants and damp." },
      { t: "Manual can opener" }
    ],
    steps: [
      { t: "Write down what your family eats now", d: "Plan around your real meals, not an imaginary menu." },
      { t: "Buy one extra week at every shopping trip", d: "In a month or two you have a month of food without a big bill." },
      { fig: "pantry", t: "Store it well", d: "Cool, dry and off the floor, in sealed bins. Keep light and heat away." },
      { t: "Label with dates and use the oldest first", d: "Rotate what you eat so nothing expires." },
      { t: "Do a no-electricity cooking test", d: "Cook a full day of meals on your backup stove and count the fuel." },
      { t: "Check monthly", d: "Look for weevils, damp and rats. Throw out anything spoiled." },
      { t: "Grow to 90 days", d: "Add rice, beans, salt and sugar in bulk. White rice sealed dry keeps much longer than brown." },
      { t: "Start the garden", d: "See the Growing guide. Stored food buys you time. A garden keeps you fed." }
    ],
    warn: ["Don't eat canned food that is bulging, leaking or smells bad."],
    sources: ["Rice figure of 0.4 kg per adult per day from this app's Plan tab; other per-person amounts are estimates."]
  },
  {
    id: "grow", title: "Growing: from jars to pots to beds", icon: "grow", lad: "grow",
    time: "A weekend to start; harvests from days to months", cost: "Mostly seeds, soil and your time",
    intro: "Start small and learn what thrives in your yard before you scale up. The municipal agriculture office can give advice and seedlings.",
    buy: [
      { t: "Seeds and cuttings", n: "Municipal agriculture office and agri-supply stores: kangkong, pechay, mustasa, malunggay, sitaw, okra, talong, kamote vines, saba banana." },
      { t: "Pots, buckets or rice sacks with drain holes" },
      { t: "Soil and compost, or coconut coir" },
      { t: "Hand trowel, bolo, watering can" },
      { t: "Bamboo and string for trellises" },
      { t: "Jar and mesh lid for sprouts" }
    ],
    steps: [
      { fig: "sprout_jar", t: "Sprout mongo today", d: "Soak 1 tablespoon of mongo overnight. Drain, and rinse twice a day in a jar. Eat in 3 to 5 days." },
      { t: "Choose a sunny spot", d: "Pick a place with at least 6 hours of sun and no standing water." },
      { t: "Start with easy plants", d: "Kangkong cuttings, pechay and malunggay in pots, kamote vines in the ground." },
      { fig: "raised_bed", t: "Prepare the soil", d: "Loosen it and mix in compost. Raised beds drain better in heavy rain." },
      { fig: "kamote", t: "Plant and water", d: "Water in the morning. Plant kamote vine cuttings of about 25 to 30 cm with most of the length in the soil." },
      { t: "Mulch", d: "Cover the soil with dry leaves or rice straw to hold moisture and stop weeds." },
      { t: "Start a compost pile", d: "Layer kitchen scraps with dry leaves and keep it damp." },
      { t: "Save seeds", d: "Keep seed from your best plants. Dry them fully and store in sealed, labeled jars." },
      { t: "Prepare for typhoons", d: "Plant banana and fuelwood trees as windbreaks, keep beds draining, and harvest early before a storm." },
      { t: "Add a bed each month", d: "Track what grows well and expand from there. Indoors or in a shelter, stick to sprouts, mushrooms and microgreens under LED lights (needs power)." }
    ],
    warn: ["Don't use fresh human waste on food crops."],
    sources: ["General gardening practice; ask the municipal agriculture office for local planting advice."]
  },
  {
    id: "shelter", title: "Shelter: typhoon-ready home and a safe room", icon: "shelter", lad: "shelter",
    time: "Days for house prep; months for a safe room", cost: "Shutters and tie-downs: modest. Safe room: about ₱20,000–38,000 per m²",
    intro: "In Leyte the real dangers are typhoons, floods and earthquakes. A reinforced room above flood level beats a deep underground bunker, which can flood.",
    buy: [
      { t: "Plywood or shutters for windows" },
      { t: "Roof tie-downs and fasteners", n: "Roofs are what typhoons attack first." },
      { t: "Steel door and vent pipes (for a safe room)" },
      { t: "Rebar, cement and 6-inch CHB", p: "A 4-inch CHB wall costs about ₱650–950 per m² before plaster" },
      { t: "Engineer's design and a building permit", p: "A permit is issued by your municipal engineering office" }
    ],
    steps: [
      { t: "Check your hazard maps", d: "Look up your barangay on GeoRisk PH and DOST-NOAH for flood, landslide, storm surge and ground shaking." },
      { t: "Walk through your home", d: "Look at the roof, windows, doors and walls. Note what is loose or rusted." },
      { fig: "roof_tie", t: "Secure the roof first", d: "Tie the roof down, trim trees that can fall, and fix loose sheets." },
      { t: "Protect windows and doors", d: "Shutters or plywood, and strong latches." },
      { fig: "safe_room", t: "Choose the safe room", d: "An interior, ground-floor room away from windows, or a new reinforced room above flood level." },
      { t: "Hire an engineer", d: "Get a design and permit before you build anything permanent." },
      { t: "Plan the size", d: "Safe-room guidance for 24-hour storms is about 7 to 10 sq ft (0.65–0.93 m²) per person. For {ppl}: about {n*0.65} to {n*0.93} m². Allow more if you will live there for weeks." },
      { t: "Build it right", d: "Reinforced concrete with proper rebar, two vents, a strong door and water and food storage." },
      { t: "Drill the family", d: "Everyone should know when to go, what to bring and which evacuation center to use if officials order an evacuation." }
    ],
    warn: ["If officials order evacuation, go, especially near the coast. Storm surge is deadly.", "Use a licensed engineer. A badly built shelter is dangerous."],
    sources: ["PNNL Building America safe rooms guide; FEMA; aedoconstruction.com and listd.ph (2026 construction costs)."]
  },
  {
    id: "comms", title: "Radios: set up a family radio network", icon: "comms", lad: "comms",
    time: "A weekend, plus time for the permit", cost: "About ₱1,250 and up per radio",
    intro: "When towers are down, radios are how your family keeps in touch. Radios are regulated by the NTC, so check the rules first.",
    buy: [
      { t: "Handheld radios, one per household", p: "Baofeng BF-H6 about ₱1,250 in one listing", n: "Buy from an NTC-authorized dealer so you can get the permit." },
      { t: "Spare batteries and a solar charger" },
      { t: "Speaker mic or headset" },
      { t: "Hand-crank or solar AM/FM radio", p: "About ₱1,300–3,400" },
      { t: "Optional: Meshtastic text nodes", p: "Heltec V3 about ₱3,400; T-Beam Supreme about ₱5,100", n: "Only NTC-approved devices." },
      { t: "Laminated card with channels and code words" }
    ],
    steps: [
      { t: "Decide who needs a radio", d: "Each household in your family, and your meeting place." },
      { t: "Check the NTC rules", d: "Ask an NTC regional office or an authorized dealer what permit you need. Short-range radios need a permit per unit." },
      { t: "Buy from an authorized dealer", d: "Keep the receipt and the permit paperwork." },
      { t: "Charge, label and program", d: "Number each radio. Set the family channel and write down the code words (see the Comms tab)." },
      { fig: "radio_range", t: "Test your range", d: "Walk away from home in steps, in town and in open ground. Write down where the signal drops." },
      { t: "Agree a daily check-in time", d: "Same time every day, just a few minutes, to save batteries." },
      { t: "Power the radios", d: "Charge them from your power station or solar charger." },
      { t: "Practice in a blackout", d: "Run a full day on radio-only. Note what didn't work and fix it." }
    ],
    warn: ["Follow the NTC rules and don't transmit on emergency, aircraft or official channels.", "Range claims on listings are best case. Expect much less in town and hills."],
    sources: ["Lazada.com.ph listings (prices); NTC rules as summarized in the Comms tab."]
  },
  {
    id: "med", title: "Medical: build your first-aid kit", icon: "med", lad: "med",
    time: "1 day", cost: "Usually under ₱5,000",
    intro: "A kit is only useful if you know how to use it. Take a first-aid and CPR course (Red Cross 143).",
    buy: [
      { t: "Bandages, sterile gauze, medical tape, triangular bandage" },
      { t: "Gloves, face masks, tweezers, scissors, safety pins" },
      { t: "Antiseptic and clean water for washing wounds" },
      { t: "Oral rehydration salts" },
      { t: "Pain and fever reliever, as the label directs" },
      { t: "Burn dressings" },
      { t: "Digital thermometer" },
      { t: "Each person's regular medicines", n: "For {ppl}. Ask your doctor about an extra supply." },
      { t: "Waterproof box" }
    ],
    steps: [
      { t: "Write a card for each person", d: "Allergies, regular medicines, blood type if known, doctor's number." },
      { fig: "kit", t: "Buy the contents", d: "A pharmacy can help you pick the basics." },
      { t: "Pack and label", d: "Use a waterproof box. Keep a copy of each person's card inside." },
      { t: "Put it where everyone knows", d: "Make sure every adult can find it in the dark." },
      { t: "Learn the basics", d: "Read the bleeding, burns, CPR and dehydration guides below, then take a course." },
      { t: "Check expiry every 6 months", d: "Replace anything old." },
      { t: "Know where help is", d: "Write down your nearest rural health unit or hospital and how to get there." }
    ],
    warn: ["Don't stock prescription antibiotics without a doctor's advice. Follow the label or ask a pharmacist for doses."],
    sources: ["Red Cross first-aid guidance as in the Guides tab. No doses are given here."]
  },
  {
    id: "cook", title: "Cooking: set up safe emergency cooking", icon: "cook", lad: "cook",
    time: "Half a day", cost: "Hardware store prices; ask your LPG dealer for the tank price",
    intro: "Rice needs heat. Choose a backup fuel, test it, and store it safely.",
    buy: [
      { t: "Portable butane stove and canisters" },
      { t: "LPG stove, regulator, hose and a spare 11 kg tank" },
      { t: "Rocket stove or a sturdy wood stove, and dry firewood or charcoal" },
      { t: "Pots with tight lids" },
      { t: "Matches or lighters in a waterproof box" },
      { t: "Fire extinguisher or a bucket of sand" }
    ],
    steps: [
      { t: "Pick a safe cooking spot", d: "Outdoors or under an open shelter, on a flat, non-flammable surface, away from walls and roofs." },
      { t: "Test a full day of meals", d: "Cook as usual and count the canisters or wood you use." },
      { t: "Store fuel safely", d: "Keep it shaded and well away from the stove and the house." },
      { fig: "rocket", t: "Try a rocket stove for wood", d: "A rocket stove is a small metal stove that burns thin dry sticks very efficiently. Local metalworkers can make one. Use it outdoors only." },
      { t: "Check for LPG leaks", d: "Brush soapy water on joints. Bubbles mean a leak: turn it off and fix it." },
      { t: "Save fuel", d: "Soak beans and rice first, keep lids on and use a thermal cooker (a hay box) to finish cooking." },
      { t: "Keep fire safety close", d: "Keep children away. Keep water or sand within reach." }
    ],
    warn: ["Never cook with charcoal or run a stove indoors. Carbon monoxide is deadly.", "Keep butane canisters away from heat."],
    sources: ["General safe-cooking practice."]
  },
  {
    id: "san", title: "Sanitation: toilet and handwashing", icon: "san", lad: "san",
    time: "A few hours", cost: "Under ₱500 for the basics",
    intro: "Dirty water and waste cause more sickness than injuries in most disasters. Set this up before you need it.",
    buy: [
      { t: "Bucket with a lid and heavy trash liners" },
      { t: "Wood ash or sawdust to cover waste" },
      { t: "Soap" },
      { t: "Jug with a spout, or a bottle and string for a handwashing station" },
      { t: "Disinfectant or plain bleach" },
      { t: "Shovel", n: "Needed if you dig a pit latrine." },
      { t: "Trash bags" }
    ],
    steps: [
      { t: "Set up a bucket toilet", d: "Line the bucket with a bag, cover waste with ash or sawdust after each use and keep the lid on." },
      { fig: "tippy_tap", t: "Make a handwashing station", d: "A jug or bottle hung beside the toilet with soap. Wash hands after the toilet and before food, every time." },
      { t: "Dispose of the bags", d: "Tie the liner and bury it, or bring it to a waste site, far from water." },
      { fig: "latrine_dist", t: "If you dig a latrine", d: "Place it at least 30 m from any well or spring, downhill of them and above flood level. Keep the pit covered and dry." },
      { t: "Clean daily", d: "Wipe the seat and handles with disinfectant." },
      { t: "Plan for the long run", d: "See the Sanitation ladder in Levels for a dry toilet and a septic tank." }
    ],
    warn: ["Never put a latrine upslope of a well.", "Wash hands with soap, even in a disaster."],
    sources: ["The 30 m distance is a common sanitation guideline."]
  },
  {
    id: "bag", title: "Go-bag: pack one for each person", icon: "bag",
    time: "1 hour", cost: "Depends on what you already own",
    intro: "A go-bag lets you leave in minutes if you must evacuate. Keep it by the door.",
    buy: [
      { t: "Backpack", n: "You need {n} backpacks, one for each of {ppl}." },
      { t: "Water bottle and a few days of ready-to-eat food" },
      { t: "Flashlight or headlamp and spare batteries" },
      { t: "Power bank and charging cable" },
      { t: "AM/FM radio" },
      { t: "Waterproof bag for documents" },
      { t: "Small-denomination cash" },
      { t: "Medicines and a small first-aid kit" },
      { t: "Change of clothes, rain poncho, whistle, mask and hygiene items" }
    ],
    steps: [
      { t: "Make copies of your documents", d: "Birth certificates, IDs, land titles, insurance, medical records. Keep the copies in a waterproof bag." },
      { t: "Scan them", d: "Keep a copy on a USB drive with a password, and one with a relative far away." },
      { fig: "gobag", t: "Pack by priority", d: "Water, food, light, medicine, documents, cash, clothes." },
      { t: "Keep the weight reasonable", d: "Each person should be able to carry their bag for at least an hour." },
      { t: "Store it by the door", d: "Everyone should know where the bags are." },
      { t: "Check every 6 months", d: "Replace food, water and batteries and update the documents." }
    ],
    warn: [],
    sources: ["General preparedness practice."]
  },
  {
    id: "nomad", title: "NOMAD server: install it step by step", icon: "server",
    time: "2 to 4 hours, mostly downloading", cost: "A mini PC or old laptop plus a 1–2 TB SSD",
    intro: "Project N.O.M.A.D. turns a computer into an offline knowledge server: your family connects to it over Wi-Fi with no internet. These steps follow the project's own README.",
    buy: [
      { t: "A computer to run it", n: "Minimum: 2 GHz dual-core, 4 GB RAM, 5 GB free disk. For the AI tools: Ryzen 7 or Core i7 or better, 32 GB RAM and an NVIDIA RTX 3060 or equivalent." },
      { t: "An SSD of 1–2 TB", n: "250 GB or more is recommended; the AI assistant adds roughly 25 GB. Maps and the encyclopedia take much more." },
      { t: "USB flash drive (8 GB or more) for the Ubuntu installer" },
      { t: "A Wi-Fi router that works without internet" },
      { t: "Power backup: a UPS or a power station" }
    ],
    steps: [
      { t: "Choose Debian-based Linux", d: "The README recommends Ubuntu 26.04 LTS and also supports Ubuntu 24.04 LTS and Debian 12." },
      { t: "Make the installer USB", d: "Download Ubuntu from ubuntu.com and write it to the USB with a tool such as balenaEtcher or Rufus." },
      { t: "Install Ubuntu on the computer", d: "Connect it to the internet during the install." },
      { t: "Run the quick install command", d: "Open a terminal and run this command from the project's README:", code: "sudo apt-get update && \\\nsudo apt-get install -y curl && \\\ncurl -fsSL https://raw.githubusercontent.com/Crosstalk-Solutions/project-nomad/refs/heads/main/install/install_nomad.sh \\\n  -o install_nomad.sh && \\\nsudo bash install_nomad.sh" },
      { t: "Open the Command Center", d: "On the computer, go to http://localhost:8080. From another device on your network, use http://DEVICE_IP:8080." },
      { t: "Download your content while you have internet", d: "Choose maps, the encyclopedia, medical guides and other content in the Command Center." },
      { t: "Set up the Wi-Fi router", d: "Connect the computer to the router and give it a fixed address, so phones always find it." },
      { t: "Test it offline", d: "Unplug the internet, join the Wi-Fi from a phone and open the server's address." },
      { t: "Keep it updated", d: "Update with: sudo bash /opt/project-nomad/update_nomad.sh. Installable apps are updated in the Command Center." }
    ],
    warn: ["NOMAD has no password by design. Keep it on your home network and never expose it to the internet.", "The uninstall script can't be undone."],
    sources: ["github.com/Crosstalk-Solutions/project-nomad (README: requirements, install command, update and warnings)."]
  }
];
