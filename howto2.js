/* More guides: a beginner start, plain-language NOMAD, deeper shelter / food / growing guides, and a glossary.
   Written for people who don't know technology. Short sentences, no jargon (or the word is explained). */

const HOWTO2 = [
  {
    id: "start", title: "Start here: the first 5 things to do", icon: "bag",
    time: "About 1 hour", cost: "Under ₱3,000 for a family (estimate)",
    intro: "You don't need to buy everything today. These five things protect you in the first few days of any emergency: a typhoon, a flood, a long blackout.",
    buy: [
      { t: "Water jugs (the blue 5-gallon type from a refilling station)", n: "Plan about 4 liters per person per day. For {ppl}, 3 days is {n*12} liters, about {n*12/19} jugs." },
      { t: "Canned fish or meat, biscuits, rice you can cook, peanut butter" },
      { t: "A flashlight and spare batteries" },
      { t: "A power bank for your phone", n: "Keep it charged all the time." },
      { t: "A first-aid box with your family's medicines" },
      { t: "A notebook and pen" }
    ],
    steps: [
      { fig: "start_five", t: "1. Water", d: "Fill clean jugs. Aim for 3 days: 12 liters for each person. For {ppl} that is {n*12} liters, about {n*12/19} jugs. Keep them closed, in the shade." },
      { t: "2. Food", d: "Put aside 3 days of food that needs little or no cooking. Keep it in one place." },
      { t: "3. Light and phone power", d: "Charge your power bank. Put a flashlight where you can find it in the dark." },
      { t: "4. Medicine and first aid", d: "Put medicines, bandages and a thermometer in one box. Write each person's allergies on a card." },
      { t: "5. Family plan", d: "On paper, write where you will meet and who to call if you can't reach each other. Use the Family tab in this app too." },
      { t: "Then keep going", d: "Open the Plan tab and tick things off a little at a time. Use the Levels tab to grow from days to weeks to months." }
    ],
    warn: [],
    sources: ["Water amount matches the water guide in this app."]
  },
  {
    id: "app", title: "Using this app: a simple guide", icon: "calc",
    time: "5 minutes", cost: "Free",
    intro: "Handa is an app that works on your phone, even with no internet. Your ticks and notes stay on your phone only.",
    buy: [],
    steps: [
      { fig: "phone_tabs", t: "Open the address you were given", d: "Your helper will send you a web address. Open it on your phone." },
      { t: "Put it on your home screen", d: "Android (Chrome): tap the 3 dots, then “Install app” or “Add to Home screen”. iPhone (Safari): tap the Share button, then “Add to Home Screen”." },
      { t: "Open it once with internet", d: "This lets the app save itself, so it works later with no internet." },
      { t: "Learn the 6 tabs", d: "Plan is the shopping checklist. Levels shows how long you can last. Family has phone numbers and meeting places. Comms shows ways to reach each other. Guides has step-by-step help. Drill is a practice run." },
      { t: "Tick boxes as you finish things", d: "Tap the box next to an item. The app remembers." },
      { t: "Make the text bigger if you need to", d: "Tap the gear at the top, then “Text size”." },
      { t: "Back up your notes", d: "Tap the gear, then “Copy backup”, and send it to yourself in a message. If you change phones, paste it back in." }
    ],
    warn: [],
    sources: []
  },
  {
    id: "nomad1", title: "NOMAD for everyone: your family's offline library", icon: "server", fill: true,
    time: "10 minutes", cost: "Free to use",
    intro: "NOMAD is a small computer in your home that holds a library: an encyclopedia, maps, first-aid and medical guides, and how-to books. Your phone can open it over Wi-Fi even when the internet and the phone towers are down. Your helper sets it up. You only need to connect to it.",
    buy: [],
    steps: [
      { t: "Make sure NOMAD is on", d: "Find the small computer and the Wi-Fi box. Their lights should be on. If not, ask your helper." },
      { fig: "nomad_net", t: "Join the NOMAD Wi-Fi", d: "On your phone, open Settings, then Wi-Fi. Tap the NOMAD Wi-Fi name that your helper gave you. Type the password (keep that on paper)." },
      { t: "Open the address", d: "Open your phone's web browser (Chrome or Safari). Type the address exactly as written below, with the numbers and the colon, then press Go." },
      { t: "Look around", d: "Choose what you need: first aid, maps, health, cooking, building, farming and more." },
      { t: "Save it to your home screen", d: "Android: 3 dots, then “Add to Home screen”. iPhone: Share, then “Add to Home Screen”." },
      { t: "If it does not open", d: "Check the Wi-Fi is the NOMAD one. Check you typed the address exactly. Try again. If it still fails, call your helper." },
      { t: "Don't unplug it", d: "NOMAD stays on a power backup. If the power goes out, tell your helper." }
    ],
    warn: ["Don't share the Wi-Fi password with strangers. NOMAD has no password inside by design, so anyone on the Wi-Fi can use it."],
    sources: ["github.com/Crosstalk-Solutions/project-nomad (default address is http://DEVICE_IP:8080)."]
  },
  {
    id: "nomad2", title: "NOMAD setup: for the helper who builds it", icon: "server",
    time: "2 to 4 hours, mostly downloading", cost: "A mini PC or old laptop plus a 1–2 TB SSD",
    intro: "This is for the person who builds the NOMAD computer for the family. The steps follow the project's own README. When you finish, hand the family the “NOMAD for everyone” guide with the Wi-Fi name and address filled in.",
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
      { t: "Make a card for the family", d: "Print or write the Wi-Fi name, the address, and your phone number. Give it with the “NOMAD for everyone” guide." },
      { t: "Keep it updated", d: "Update with: sudo bash /opt/project-nomad/update_nomad.sh. Installable apps are updated in the Command Center." }
    ],
    warn: ["NOMAD has no password by design. Keep it on your home network and never expose it to the internet.", "The uninstall script can't be undone."],
    sources: ["github.com/Crosstalk-Solutions/project-nomad (README: requirements, install command, update and warnings)."]
  },
  {
    id: "shelter2", title: "Shelter 2: Build a reinforced shelter above ground", icon: "shelter", lad: "shelter",
    time: "Weeks to months", cost: "Plan ₱20,000–38,000 per m² (estimate), plus about 20–30% for storm hardening",
    intro: "A small, strong building for your family: reinforced concrete (concrete with steel bars inside), on high ground, with the floor above flood level. In typhoon country this is the safest and most affordable kind of “bunker”.",
    buy: [
      { t: "Cement, sand and gravel" },
      { t: "Steel bars (rebar) and tie wire" },
      { t: "6-inch hollow concrete blocks (CHB)", p: "A 4-inch CHB wall costs about ₱650–950 per m² before plaster; 6-inch costs 7–10% more" },
      { t: "Formwork: lumber and plywood for the roof slab" },
      { t: "Steel door and frame" },
      { t: "Two vent pipes with screens" },
      { t: "Waterproof paint or sealant" },
      { t: "Engineer's design and a building permit", n: "Ask your municipal engineering office what is needed." }
    ],
    steps: [
      { t: "Pick high, stable ground", d: "Look up your barangay on GeoRisk PH and DOST-NOAH for flood, landslide, storm surge and ground shaking. Stay away from slopes, riverbanks and big trees." },
      { t: "Decide the size", d: "Plan about 3 to 5 m² per person for weeks of living (estimate). For {ppl}: about {n*3} to {n*5} m²." },
      { t: "Hire an engineer", d: "Get a design and a permit. This is where the shelter's strength comes from." },
      { fig: "shelter_section", t: "Build up the floor above past floods", d: "Ask older neighbors how high the water has ever come, and build the floor higher than that." },
      { t: "Build walls with steel and concrete", d: "Concrete columns and beams, with hollow blocks filled with concrete and steel bars as the engineer designs." },
      { t: "Pour the roof slab and keep it wet", d: "Cover the new concrete and keep it damp for about a week so it cures properly. Skipping curing weakens it." },
      { t: "Add few, small openings and a steel door", d: "Fewer windows mean a stronger room. A second way out is safer." },
      { t: "Add two vents", d: "One low and one high, with screens. A common rule of thumb is about 4 square inches of vent opening per person. For {ppl}: about {n*4} square inches in total." },
      { t: "Add water, light and a toilet", d: "A covered water tank, solar lights, and a bucket toilet with a lid." },
      { t: "Fit it out", d: "Bunks, shelves, a storage box for documents, a first-aid kit." },
      { t: "Stock it and test it", d: "Bring supplies and stay one day and night as a family. Fix what is uncomfortable." }
    ],
    warn: ["Use a licensed engineer. Poor concrete or too little steel can fail when you need it most.", "Never burn charcoal or run an engine inside a closed shelter.", "Don't store fuel inside."],
    sources: ["aedoconstruction.com and listd.ph (2026 cost per m²); PNNL and FEMA safe-room guidance; Philippine area-per-person figures beyond FEMA's are my estimate."]
  },
  {
    id: "shelter3", title: "Shelter 3: Underground bunker (read the risks first)", icon: "shelter", lad: "shelter",
    time: "Months", cost: "More than an above-ground shelter. No local price found; get quotes.",
    intro: "Many people picture an underground bunker. In a rainy place like Leyte, with floods, a high water table and earthquakes, it can be more dangerous than a room above ground. Read this before you dig.",
    buy: [
      { t: "An engineer's soil assessment and design" },
      { t: "Excavation (hired machine and operator)" },
      { t: "Trench support (shoring) for the digging" },
      { t: "Reinforced concrete for floor, walls and roof", p: "Reinforced concrete structure costs about ₱22,000–32,000 per m² in warehouse rates (estimate for a bunker), plus digging, waterproofing and pumps" },
      { t: "Waterproof membrane and drainage pipe around the walls" },
      { t: "Sump pump with a battery or solar backup" },
      { t: "Two ventilation pipes, a hand or solar fan, and a carbon monoxide alarm" },
      { t: "Hatch and ladder for the way out" }
    ],
    steps: [
      { t: "Ask why you want it underground", d: "For typhoons, a strong room above flood level is safer. Underground only makes sense on high, dry, stable ground." },
      { fig: "bunker_section", t: "Test your ground", d: "Dig a small test hole at the end of the rainy season. If water appears, the water table is high. Ask neighbors with wells. Check liquefaction and landslide maps on GeoRisk PH." },
      { t: "Consider half-buried instead", d: "A shelter built into a mound of earth drains by gravity and floods less than a deep pit." },
      { t: "Get an engineer's design", d: "It must handle soil and water pressure, earthquakes, drainage and waterproofing. Get a permit." },
      { t: "Dig safely", d: "Trench walls collapse without warning. A trench deeper than about 1.5 m needs support. Never work alone in a deep hole." },
      { t: "Build and waterproof", d: "Reinforced concrete floor, walls and roof. Waterproof membrane on the outside and drainage pipe around the base." },
      { t: "Install a sump and pump", d: "A pit at the lowest point with a pump that sends water to the surface. Add a backup power source." },
      { t: "Install ventilation", d: "Two pipes, one for air in and one for air out, ending above flood level with screens. Add a fan and a carbon monoxide alarm." },
      { t: "Plan two exits", d: "A ladder and a hatch that can open even if debris falls on top." },
      { t: "Add light, water and a toilet", d: "Same as the above-ground shelter. Keep humidity low to avoid mold." },
      { t: "Test it before you rely on it", d: "After heavy rain, look for seepage. Stay a night to check the air and the humidity." }
    ],
    warn: ["Trench collapse kills. Don't dig a deep hole without support.", "Never run a generator, stove or charcoal in a closed space.", "Flooding can trap people underground. Get an engineer and a permit before you start."],
    sources: ["aedoconstruction.com (reinforced concrete cost per m²); general trench-safety practice; GeoRisk PH and DOST-NOAH for hazard maps."]
  },
  {
    id: "foodkeep", title: "Food 2: Preserve food for months", icon: "food", lad: "food",
    time: "A few days per batch", cost: "Salt, jars and a drying rack",
    intro: "Preserving lets you keep protein and vegetables when you have a surplus, without a fridge. Use trusted local methods, and when in doubt, throw it out.",
    buy: [
      { t: "Coarse salt" },
      { t: "Drying racks or clean bamboo trays, and a net or cover" },
      { t: "Glass jars with tight lids, or clean food containers" },
      { t: "Vinegar and sugar for pickling" },
      { t: "Optional: oxygen absorbers and mylar bags for dry staples" },
      { t: "Optional: a pressure canner", n: "Needed for canning low-acid foods such as meat and vegetables. Ask dealers for the price." }
    ],
    steps: [
      { fig: "drying", t: "Dry fish", d: "Clean and split the fish, salt it, and hang it on a rack in the sun under a net. Dry until stiff and hard. Seal in a dry container." },
      { t: "Salt meat and fish", d: "Heavy salting keeps food safe only when done right. Ask the municipal agriculture office or BFAR for a trusted local method." },
      { t: "Dry fruit and vegetables", d: "Slice thin, dry in the sun on a net-covered rack until fully dry, then seal in jars." },
      { t: "Pickle in vinegar", d: "Pack clean vegetables in jars with vinegar, salt and a little sugar. Keep refrigerated or follow a tested recipe." },
      { t: "Seal rice and beans", d: "Use clean, dry rice and beans in airtight containers. Oxygen absorbers help. Keep in a cool, dry place." },
      { t: "Be careful with home canning", d: "Low-acid foods like meat and vegetables must be canned in a pressure canner. Boiling-water canning is only safe for high-acid foods. Improper canning can cause botulism." },
      { t: "Label and store", d: "Write the date on every jar. Store cool, dry and dark." },
      { t: "Check often, discard doubts", d: "Throw away anything that smells bad, bulges or shows mold." }
    ],
    warn: ["Improper canning can cause botulism, a deadly illness.", "When in doubt, throw it out."],
    sources: ["General food-safety practice. Follow local guidance from the municipal agriculture office or BFAR."]
  },
  {
    id: "foodraise", title: "Food 3: Raise chickens and fish", icon: "food", lad: "food",
    time: "A weekend to build, weeks to start", cost: "Mostly materials and feed",
    intro: "Eggs, meat and fish are the best long-term protein. Start small, and ask your municipal agriculture office for advice and healthy stock.",
    buy: [
      { t: "6 to 10 native chickens or chicks", n: "Hardy native chickens find much of their own food. Buy from a trusted source." },
      { t: "Wire, bamboo and a roof for a coop" },
      { t: "Feeders and water containers" },
      { t: "Feed, or grain and kitchen scraps" },
      { t: "Tilapia fingerlings", n: "Ask BFAR or a local hatchery." },
      { t: "A pond or a lined tank for fish" }
    ],
    steps: [
      { t: "Decide how many", d: "Start with 6 to 10 hens. Add more as you learn." },
      { t: "Build a coop", d: "Raise it off the ground, with a roof and good airflow. Keep out dogs, rats and snakes. Place it above flood level." },
      { t: "Get healthy birds", d: "Buy from a trusted source. Keep new birds apart for 2 weeks." },
      { t: "Feed and water daily", d: "Give clean water every day. Feed grain and kitchen scraps, with some commercial feed if you can." },
      { t: "Ask about vaccines", d: "Ask the municipal agriculture or veterinary office which vaccines your area needs." },
      { t: "Collect eggs daily", d: "Collect in the morning and keep them cool." },
      { t: "Add a fish pond or tank", d: "Start with a small pond or a lined tank. Stock tilapia fingerlings and feed them daily." },
      { t: "Protect from typhoons", d: "Tie the coop down and raise the pond edges so fish don't wash out." }
    ],
    warn: ["Wash your hands after touching birds, eggs or fish.", "Report sick or dying birds to the municipal agriculture office."],
    sources: ["General small-scale farming practice; ask your municipal agriculture office and BFAR."]
  },
  {
    id: "growin", title: "Growing 2: Grow food indoors or in a shelter", icon: "grow", lad: "grow",
    time: "A weekend to set up", cost: "Lights, trays and seeds. Needs a steady power supply.",
    intro: "No yard, or sheltering underground? You can still grow sprouts, microgreens and mushrooms indoors. It needs light and fresh air.",
    buy: [
      { t: "LED light bars" },
      { t: "Shallow trays" },
      { t: "Coconut coir or clean soil" },
      { t: "Seeds for microgreens", n: "Mongo, mustasa, pechay or radish seeds." },
      { t: "Oyster mushroom spawn or a mushroom kit", n: "Ask the agriculture office or buy online." },
      { t: "Spray bottle, timer and a small fan" }
    ],
    steps: [
      { fig: "shelf_grow", t: "Pick a spot with power", d: "A shelf in a room with good airflow. Everything runs on your solar or generator." },
      { t: "Set up shelves and lights", d: "Hang the LED bars 20 to 30 cm above the trays. Put them on a timer for 12 to 16 hours a day (rule of thumb)." },
      { t: "Grow microgreens", d: "Spread seeds thickly on damp coir, cover for 2 to 3 days, then give light. Harvest in about 7 to 14 days (estimate)." },
      { t: "Keep sprouting in jars", d: "See the sprouts steps in “Growing: from jars to pots to beds”." },
      { t: "Try oyster mushrooms", d: "They grow on straw or sawdust bags, with moisture and little light. Keep humid with a spray bottle." },
      { t: "Keep air moving", d: "A small fan stops mold. Open vents when you can." },
      { t: "Count the power", d: "Each light bar uses about 20 to 40 watts (check the label). Use the solar calculator to add it to your daily total." }
    ],
    warn: ["Mold can make you sick. Keep trays clean and dry on top.", "Never grow in a closed space with no fresh air."],
    sources: ["General indoor-growing practice. Light hours and harvest times are rules of thumb."]
  },
  {
    id: "glossary", title: "Simple words: what they mean", icon: "calc",
    time: "Read anytime", cost: "Free",
    intro: "Plain meanings for words you will see in this app.",
    buy: [], steps: [],
    terms: [
      ["Watt (W)", "How much power a thing uses at one moment. A phone charger is about 10 W. A fan is about 50 W."],
      ["Watt-hour (Wh)", "Power used over time. A 50 W fan running 2 hours uses 100 Wh."],
      ["Kilowatt-hour (kWh)", "1,000 watt-hours. It's how electricity bills are measured."],
      ["Solar panel", "A flat board that turns sunlight into electricity."],
      ["Battery", "Stores electricity for later, like a tank stores water."],
      ["Inverter", "A box that changes battery power into the 220 V power your outlets use."],
      ["Hybrid inverter", "An inverter that also manages the panels, the battery and the grid together."],
      ["Power station", "A battery and an inverter in one box with plugs. The easiest way to start with solar."],
      ["Generator", "An engine that makes electricity from fuel. It's loud and makes dangerous fumes."],
      ["Transfer switch", "A safe switch that connects a generator to your house wiring."],
      ["LPG", "The gas in the 11 kg cooking tanks."],
      ["Butane", "The gas in small canisters for portable stoves."],
      ["Reinforced concrete (RC)", "Concrete with steel bars inside, so it is much stronger."],
      ["Rebar", "The steel bars inside reinforced concrete."],
      ["CHB", "Concrete hollow blocks, the usual wall blocks in the Philippines."],
      ["Water table", "How deep the underground water sits. In rainy places it can be close to the surface."],
      ["Sump pump", "A pump in a low pit that removes water that seeps in."],
      ["First flush", "The first dirty rain off a roof. You throw it away before collecting clean water."],
      ["ORS", "Oral rehydration salts: a powder you mix with water to treat dehydration."],
      ["NTC", "The government office that regulates radios and satellite devices."],
      ["Repeater", "A radio on a high place that passes your signal much farther."],
      ["Mulch", "A cover of dry leaves or straw over soil to keep it moist."],
      ["Compost", "Rotted kitchen and garden waste that feeds plants."],
      ["Evacuate", "Leave a dangerous area for a safer place when officials tell you to."]
    ],
    warn: [], sources: []
  }
];

const HOWTO_GROUPS = [
  ["Start here", ["start", "app", "glossary"]],
  ["Power", ["solar1", "solar2", "solar3", "gen"]],
  ["Water and food", ["water", "food", "foodkeep", "foodraise", "cook"]],
  ["Growing", ["grow", "growin"]],
  ["Shelter and safety", ["shelter", "shelter2", "shelter3", "bag"]],
  ["Radios, health and sanitation", ["comms", "med", "san"]],
  ["Offline library (NOMAD)", ["nomad1", "nomad2"]]
];

(() => {
  const byId = {};
  HOWTO.concat(HOWTO2).forEach((g) => { byId[g.id] = g; });
  HOWTO.length = 0;
  HOWTO_GROUPS.forEach(([, ids]) => ids.forEach((id) => { if (byId[id]) HOWTO.push(byId[id]); }));
})();
