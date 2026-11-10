/* Handa v4: eight more guides. Loaded after howto2.js and figures.js.
   Same shape as the other guides. Plain words, no medicine doses. */

FIGS.tsunami_signs = {
  cap: "Three natural warning signs of a tsunami: strong shaking, the sea suddenly pulling back (or rising), and a loud roar. Any one means: go up or far inland now.",
  svg: _svg(`
    <path class="o fa" d="M38 70V50L58 34L78 50V70z"/><path class="o" d="M25 46l-6 6l6 6M91 46l6 6l-6 6"/>
    ${_t(58, 88, "1 Shake")}${_t(58, 102, "Strong, long", "middle", "m")}
    <path class="o fw" d="M120 66q10-8 20 0t20 0t20 0V72H120z"/>${_ar(160, 34, 160, 56)}
    ${_t(160, 88, "2 Drop")}${_t(160, 102, "Sea pulls back", "middle", "m")}
    <path class="o fw" d="M232 76Q240 36 264 36Q284 36 286 58Q274 50 264 56Q280 68 302 76z"/>
    ${_t(266, 88, "3 Roar")}${_t(266, 102, "Loud rumble", "middle", "m")}
    <path class="o fa" d="M190 174Q252 120 312 174z"/><circle class="fs o" cx="236" cy="146" r="5"/>${_ar(200, 172, 230, 150)}
    ${_t(14, 130, "Do not wait for a siren.", "start", "d")}${_t(14, 148, "Do not stop to take photos.", "start")}
    ${_t(14, 166, "Go up or far inland.", "start")}`, "Shake, drop and roar: the three natural signs of a tsunami, and a hill to run to")
};

FIGS.landslide_signs = {
  cap: "Warning signs on a slope: cracks, leaning trees or poles, muddy streams. Move sideways out of the path, then uphill, not down the valley.",
  svg: _svg(`
    <path class="o soil" d="M8 150L150 52H312V176H8z"/>
    <path class="o" d="M172 70l10 10l-6 8l12 8"/>${_t(192, 104, "Cracks", "start", "m")}
    <path class="o" d="M252 70L246 44"/><circle class="o fa" cx="244" cy="38" r="9"/>${_t(230, 42, "Leaning tree", "end", "m")}
    <rect class="o fa" x="22" y="118" width="40" height="30"/><path class="o" d="M18 118L42 100L66 118"/>
    ${_ar(150, 100, 90, 128, "flow r")}
    ${_ar(150, 152, 70, 152)}${_t(160, 170, "Move sideways, away from the path", "middle", "m")}
    ${_t(160, 20, "Days of heavy rain? Be ready to leave.", "middle", "d")}`, "A slope with cracks and a leaning tree above a house, with an arrow showing to move sideways")
};

const HOWTO3 = [
  {
    id: "hazards", title: "Tsunami, landslide, fire and volcanic ash", icon: "shelter",
    time: "1 hour to plan, then a family walk", cost: "Under ₱2,000 for masks, goggles and whistles (estimate)",
    intro: "Typhoon, flood and earthquake have quick guides in this app. These four also happen in the Philippines. Learn the warning signs and decide where you would go now, while you are calm.",
    buy: [
      { t: "N95 or KN95 masks", n: "For ash and smoke. A damp cloth over nose and mouth is the last resort." },
      { t: "Goggles without side vents, one for each person ({n} for {ppl})", n: "Wear glasses instead of contact lenses in ash." },
      { t: "A whistle for each person ({n} for {ppl})", n: "Carries farther than a shout and doesn't tire you." },
      { t: "Battery smoke alarm", n: "Fit near the bedrooms. Test it every month." },
      { t: "Small fire extinguisher (ABC type)", p: "Check the price at a hardware store", n: "Keep it near the kitchen, not beside the stove." },
      { t: "Sturdy shoes and a flashlight by every bed" }
    ],
    steps: [
      { t: "Find out your hazards", d: "Ask your barangay or municipal DRRM office if your home is in a tsunami, landslide, flood or volcano hazard area. The government hazard maps are free at hazardhunter.georisk.gov.ph. Look up your address while you have internet and write the answer on paper." },
      { fig: "tsunami_signs", t: "Tsunami: shake, drop, roar", d: "If you live near the sea and feel strong or long shaking, see the sea pull back or rise suddenly, or hear a loud roar, go to high ground or far inland at once. PHIVOLCS says a tsunami from a nearby earthquake can arrive within minutes. Do not wait for a siren. Waves can keep coming for hours, so stay away until officials say it is safe." },
      { fig: "landslide_signs", t: "Landslide: leave early", d: "Warning signs are days of heavy rain, new cracks in the ground or walls, leaning trees or poles, muddy water in streams, and a rumbling sound. Leave early. Move sideways out of the slide path, then to higher, stable ground. Do not shelter at the bottom of a slope or in a valley. Tell your neighbors." },
      { t: "Fire: two ways out", d: "Know two ways out of every room. Stay low under smoke. If your clothes catch fire: stop, drop, roll. Use the extinguisher only on a small fire and only with your back to the exit: pull the pin, aim at the base, squeeze, sweep. If it is bigger than a wastebasket, get out, stay out and call 911. Put a lid on a pan fire. Never put water on an oil or electrical fire. Turn off the LPG tank at night." },
      { t: "Volcanic ash: stay in, cover up", d: "Stay indoors with windows and doors closed and fans off. Outside, wear an N95 mask, goggles, long sleeves and long pants. Keep pets inside and wash ash off their paws. Do not drive in heavy ash. Disconnect rain tank pipes so ash does not wash into your drinking water. Ash is heavy, and wet ash can collapse a roof: once it stops falling, carefully sweep it off, working from the top. The roof is slippery." },
      { t: "Practice the walk", d: "Walk your route to high ground or to your meeting place with the slowest person in the family. Time it. Write the place on the Family tab under Important places." }
    ],
    warn: [
      "Do not go back to the shore after the first wave. More waves can follow for hours.",
      "If officials tell you to evacuate, go. Your life matters more than your things.",
      "Never go back into a burning building.",
      "Do not clean ash off a roof in the dark or while it is still falling."
    ],
    sources: ["PHIVOLCS shake-drop-roar guidance (Philstar, Temblor)", "CDC, PAHO and New Zealand Health volcanic ash guidance", "hazardhunter.georisk.gov.ph for hazard maps"]
  },
  {
    id: "vulnerable", title: "Babies, older people and anyone who needs extra help", icon: "med",
    time: "1 afternoon", cost: "Depends on needs; start with a 1-week supply",
    intro: "Babies, older people, pregnant women and people with a disability run out of what they need first. Plan for them before you plan for yourself.",
    buy: [
      { t: "Regular medicines: a spare supply", n: "Ask the doctor or pharmacist how to keep an extra week or more. Never stop medicines without asking." },
      { t: "For a baby: diapers, wipes, spare clothes, a cup and spoon", n: "A clean cup is safer than a bottle when washing is hard." },
      { t: "Baby formula, if your baby uses it", n: "Keep at least a week. Check the date." },
      { t: "Spare eyeglasses and hearing aid batteries" },
      { t: "Walking aid, wheelchair repair items, or a sturdy chair you can carry" },
      { t: "An ID band or card: name, contact person, allergies" },
      { t: "Adult diapers or underpads, if needed" }
    ],
    steps: [
      { t: "Write each person's needs", d: "On the Family tab, fill in Health and needs for everyone: medicines, allergies, devices, and who helps them. Keep a paper copy in the go-bag." },
      { t: "Keep medicine supply", d: "Pack at least 3 to 5 days of each regular medicine in the go-bag, and talk to your doctor about keeping more at home. Keep them cool and dry, and use the oldest first. Never share prescription medicine, and never change a dose on your own." },
      { t: "Feeding a baby", d: "Breastfeeding is the safest and simplest way to feed a baby in an emergency: keep the mother and baby together, and give the mother food and water. If the baby uses formula: wash your hands, clean the cup, boil safe water and let it cool for no more than 30 minutes so it stays at or above 70 °C, then mix exactly as the label says. Use it within 2 hours." },
      { t: "Plan who helps whom", d: "Decide who carries or guides each person who has trouble walking, and practice the route to your meeting place, including steps and mud. Have the person sleep on the ground floor or near the exit." },
      { t: "Machines that need power", d: "If anyone uses oxygen, a nebulizer or CPAP, ask their doctor and your electric cooperative what to do in a blackout. A power station can run small devices. Use the calculator in Solar 1 to size it." },
      { t: "Heat and fluids", d: "Older people and babies get dehydrated and overheated fast. Keep them in shade, offer clean water often, and check on them every few hours." },
      { t: "Check on neighbors", d: "Make a short list of older neighbors or people who live alone. Check on them after any storm." }
    ],
    warn: [
      "Never water down formula to make it last. It can make a baby very sick.",
      "A baby with fever, who won't feed, or who has diarrhea needs a health worker the same day.",
      "Do not give adult medicine to children. Ask a pharmacist."
    ],
    sources: ["WHO and FAO: Safe preparation of powdered infant formula (water no less than 70 °C)", "ENN: Supporting infants who are formula-fed in emergencies", "Ready.gov: Older adults and people with disabilities"]
  },
  {
    id: "pets", title: "Pets, chickens, pigs and carabao", icon: "grow",
    time: "1 hour", cost: "Low: mostly food, water and rope",
    intro: "Animals are family and income. Plan for them too. Many evacuation centers do not take animals, so ask your barangay before a storm, not during it.",
    buy: [
      { t: "Pet food for at least 1 week, in an airtight container", n: "Two weeks is better if you have room." },
      { t: "Water bowl and enough water", n: "A large dog needs about 4 liters a day." },
      { t: "Collar with a tag, plus a leash or carrier" },
      { t: "Strong rope or halter for each large animal" },
      { t: "Feed in sacks off the floor", n: "Keep it dry. Wet feed spoils." },
      { t: "Paper copy of vaccination records, and a recent photo of you with each pet" }
    ],
    steps: [
      { t: "Make two kits", d: "A bigger kit if you stay home, and a light one you can grab if you leave. Put food, water, medicine, a bowl and the papers in each." },
      { t: "Keep vaccines up to date", d: "Keep rabies shots current. Ask your municipal veterinarian. Put a tag on your pet with your phone number." },
      { t: "Bring pets in early", d: "At the first typhoon warning, bring dogs and cats inside. Give them a calm, covered place away from windows." },
      { t: "Large animals: decide early", d: "If you cannot move livestock, decide before the storm: to higher ground, to a strong shelter, or turned loose where they can move away from floodwater. Never leave an animal tied up in a place that floods. Mark them so you can find them again." },
      { t: "Chickens and small animals", d: "Move them to a high, covered, dry place. Give extra dry feed and clean water before the storm." },
      { t: "After the flood", d: "Do not let animals drink floodwater. Keep your distance from stray or injured animals. Wash your hands. Bury dead animals away from wells." },
      { t: "Volcanic ash", d: "Keep animals inside and give clean water. Wash ash off their paws and skin so they do not swallow it." }
    ],
    warn: [
      "Never tie an animal in a place that floods.",
      "A scared animal can bite. Keep children away until it calms down."
    ],
    sources: ["Ready.gov: Prepare your pets for disasters", "FLASH: Disaster supply kit (water for dogs)", "New Zealand Health: volcanic ash and animals"]
  },
  {
    id: "money", title: "Money, papers and phones that stop working", icon: "calc",
    time: "1 hour", cost: "Cash for one week, and a few plastic pouches",
    intro: "In a blackout ATMs, card machines and apps like GCash or Maya may not work. Cash and paper still do.",
    buy: [
      { t: "A week of cash in small bills and coins", n: "₱20, ₱50 and ₱100 bills. Shops can't change a ₱1,000 bill when their tills are down." },
      { t: "Waterproof pouches or strong zip bags" },
      { t: "A small lockable box" },
      { t: "A notebook and pen" }
    ],
    steps: [
      { t: "Keep cash in more than one place", d: "Put some in the go-bag, some at home in the lockable box, and some with a relative. Never keep it all in one place." },
      { t: "Copy your important papers", d: "Make 2 paper copies of IDs, birth and marriage certificates, land title or tax declaration, vehicle papers, insurance, school records and prescriptions. Put one set in a waterproof pouch in the go-bag and one with a relative. Take photos on your phone too." },
      { t: "Know your accounts, but not on paper with passwords", d: "Write which banks and apps you use, not the passwords or PINs. Memorize PINs. Do not store them in this app." },
      { t: "Set the emergency info on your phone", d: "Put your name, blood type if you know it, and one contact on the lock screen's emergency card." },
      { t: "Keep a paper contact list", d: "Print the Family tab, or copy numbers into the notebook. Phones die." },
      { t: "Do not show your cash", d: "Pay small amounts. Do not talk about how much you keep at home." }
    ],
    warn: [
      "Never share OTPs or passwords. Scammers often pretend to offer disaster help.",
      "Never keep all cash and papers in one bag. Losing it would be a disaster."
    ],
    sources: ["Ready.gov: emergency kit (cash, because ATMs and online services may be unavailable)"]
  },
  {
    id: "calm", title: "Staying calm, keeping routines, looking after each other", icon: "comms",
    time: "Ongoing", cost: "Free",
    intro: "A long emergency is hard on the mind. A steady routine and people around you protect you more than most things you can buy.",
    buy: [
      { t: "Cards, a board game, books, paper and crayons", n: "For children, and for long waiting hours." },
      { t: "A Bible, hymnal or other devotional book" },
      { t: "Ear plugs", n: "For sleeping in a loud, crowded shelter." },
      { t: "A notebook for a family diary" }
    ],
    steps: [
      { t: "Keep a routine", d: "Wake up, eat, work and sleep at about the same times every day. Routine tells the body things are under control." },
      { t: "Give everyone a job", d: "Children too: carry water, keep the flashlight, fold blankets. A job helps people feel useful." },
      { t: "Make time for worship or quiet time together", d: "Pray, sing, read or sit quietly as a family each day. Many people find it steadies them." },
      { t: "Talk about how you feel", d: "Take turns. With children, tell the truth in simple words, stay close, and limit upsetting news." },
      { t: "Protect sleep, water and food", d: "Tired, hungry and thirsty people make bad decisions. Eat and sleep even when you don't feel like it." },
      { t: "Look after neighbors", d: "Check on older neighbors, pregnant women and people alone. Share news and tools. Neighbors help each other first, long before outside help arrives." },
      { t: "Be careful and orderly", d: "Do not show off your supplies. Travel in groups. Check news with the barangay, PAGASA or PHIVOLCS before you share it. Rumors cause panic." },
      { t: "If someone says they cannot go on", d: "If a person says they want to die or hurt themselves, stay with them, do not leave them alone, and get help today from the nearest hospital, the rural health unit, or a trusted church leader or doctor. In an emergency call 911." }
    ],
    warn: [
      "Do not use alcohol to cope. It makes thinking and sleep worse.",
      "Check before you share a rumor."
    ],
    sources: ["WHO Psychological First Aid: look, listen, link", "Ready.gov: help children cope"]
  },
  {
    id: "transport", title: "Getting around: fuel, vehicles and walking out", icon: "gen",
    time: "1 afternoon", cost: "About ₱1,500 to ₱4,000 for a basic kit (estimate)",
    intro: "Roads may be cut, fuel stations closed, and tires flat. A little planning keeps you able to leave, or to stay put safely.",
    buy: [
      { t: "One or two approved fuel containers", n: "10 to 20 liters is plenty at home. Keep outside, in shade." },
      { t: "Tire repair kit, hand pump and jumper cables" },
      { t: "Basic tools, tape and rope" },
      { t: "Raincoat and sturdy shoes for each person ({n} sets for {ppl})" },
      { t: "A paper map of your area", n: "Mark your meeting places and two routes on foot." },
      { t: "Bicycle repair kit, if you ride" }
    ],
    steps: [
      { t: "Keep the tank at least half full", d: "When a typhoon is forecast, fill up. Gas stations close or run out when the power is out. Carry some cash." },
      { t: "Store fuel safely", d: "Keep only small amounts, in approved containers, outside living areas, in shade, away from flames, pilot lights and generators. Never refuel a hot or running generator." },
      { t: "Put a small kit in the vehicle", d: "Water, flashlight, first-aid items, rope, tape, raincoat, snacks, paper map and a power bank." },
      { t: "Never drive or walk through moving floodwater", d: "About 15 cm of moving water can knock an adult over, and about 30 cm can float many cars. Turn around." },
      { t: "Plan two routes on foot", d: "Walk them once in good weather. If you must go on foot, leave early, wear sturdy shoes, carry water, and tell someone your route." },
      { t: "Park higher before a storm", d: "Move vehicles to higher ground, away from trees and power lines. Take the key and any papers." }
    ],
    warn: [
      "Never store big amounts of fuel inside the house.",
      "Do not siphon fuel by mouth. Use a hand pump."
    ],
    sources: ["Ready.gov: car emergency kit", "US National Weather Service: Turn Around Don't Drown guidance"]
  },
  {
    id: "nature", title: "Food from the land and sea, safely", icon: "food",
    time: "Learn now, use later", cost: "Low: a hook, a net, a knife and salt",
    intro: "Leyte has plenty of sea, farms and coconut trees. If shops close, knowing what is safe to eat from nature can feed a family. The danger is eating the wrong thing, so learn it now, from local people.",
    buy: [
      { t: "Fishing line, hooks and a hand net or cast net" },
      { t: "A sharp knife and a chopping board" },
      { t: "Coarse salt in a sealed bin", n: "For drying and preserving fish." },
      { t: "Jars or containers with lids" },
      { t: "Cuttings and seed: kamote, gabi, saging, cassava", n: "See the Grow guides for planting." },
      { t: "A local guide book from the municipal agriculture office" }
    ],
    steps: [
      { t: "Learn from local people first", d: "Ask your municipal agriculture office and older neighbors which wild plants are safe in your area. Write them down." },
      { t: "Plant starches you can trust", d: "Kamote, gabi, saging and coconut grow well here and survive storms. Cassava (kamoteng kahoy) is hardy, but the bitter kind must be grated, soaked or pressed, then cooked well. Never eat it raw." },
      { t: "Fishing", d: "Fish fresh, and clean it as soon as you catch it. Remove the gills and guts and cook it thoroughly." },
      { t: "Check for red tide before shellfish", d: "Red tide happens often in Leyte and Samar waters, including Carigara Bay and Ormoc Bay. When BFAR announces a shellfish ban, do not gather, sell or eat any shellfish or alamang from those waters. Cooking does not remove the toxin, and it can affect the nerves within 30 minutes. Fish, squid, crab and shrimp are generally safe if they are fresh and the gills and guts are removed and washed." },
      { t: "Preserve a good catch", d: "Split, salt and dry fish in the sun under a net. Store it dry and sealed." },
      { t: "The rule for the unknown", d: "If you are not 100% sure, do not eat it. This includes mushrooms, berries and seeds." }
    ],
    warn: [
      "Do not eat shellfish or alamang during a BFAR red tide ban.",
      "Never eat unknown mushrooms or berries. Some are deadly and cooking does not help.",
      "Never eat raw bitter cassava.",
      "Do not drink seawater."
    ],
    sources: ["BFAR red tide and shellfish advisories (Inquirer, SunStar, GMA Regional TV)", "BFAR: fish, squid, crab and shrimp safe if fresh, with gills and guts removed and washed"]
  },
  {
    id: "hygiene", title: "Hygiene for women and girls: periods, privacy, safety", icon: "san",
    time: "1 hour", cost: "Low; reusable pads save money",
    intro: "Periods don't stop in a disaster, and privacy and safety matter. Planning ahead protects health and dignity.",
    buy: [
      { t: "Pads for 3 months", n: "Pack some in the go-bag." },
      { t: "Reusable cloth pads, 2 or 3 sets for each person", n: "Thick clean cotton works." },
      { t: "Spare underwear and a sarong or large cloth" },
      { t: "Soap and a small bucket with a lid" },
      { t: "Sealable bags for used pads" },
      { t: "A whistle", n: "For safety at night." }
    ],
    steps: [
      { t: "Stock and pack", d: "Keep 3 months of pads at home and a week in the go-bag, with spare underwear and a bag for used items." },
      { t: "Wash reusable pads well", d: "Rinse in cold water, wash with soap in clean water, and dry fully in sunlight. Store only when dry." },
      { t: "Plan for privacy", d: "Choose a private place to change and wash. A tarp or sarong can make a screen. In an evacuation center, ask for separate toilets and washing areas with locks and lights." },
      { t: "Stay safe", d: "Do not go to the toilet or wash alone at night. Carry a whistle and go in pairs or groups. Report harassment to the barangay or the police Women and Children Protection Desk." },
      { t: "Dispose of waste properly", d: "Wrap used pads and put them in the trash or a pit. Do not put them in toilets or latrines." },
      { t: "Know when to see a health worker", d: "Go to the health center for fever, foul-smelling discharge, very heavy bleeding or severe pain." },
      { t: "If someone is pregnant", d: "Keep the due date and prenatal records in the go-bag. Know which facility to go to, and go early if a storm is coming." }
    ],
    warn: [
      "Never share reusable pads.",
      "Do not wait for severe symptoms. See a health worker early."
    ],
    sources: ["Sphere Handbook: hygiene promotion and menstrual health in emergencies"]
  }
];

/* group the new guides, then rebuild HOWTO in group order */
(() => {
  const g = (name) => HOWTO_GROUPS.find((x) => x[0] === name);
  g("Water and food")[1].push("nature");
  const sh = g("Shelter and safety")[1];
  sh.splice(sh.indexOf("bag"), 0, "hazards");
  HOWTO_GROUPS.push(["Family, money and moving around", ["vulnerable", "pets", "money", "calm", "hygiene", "transport"]]);
  const byId = {};
  HOWTO.concat(HOWTO3).forEach((x) => { byId[x.id] = x; });
  HOWTO.length = 0;
  HOWTO_GROUPS.forEach(([, ids]) => ids.forEach((id) => { if (byId[id]) HOWTO.push(byId[id]); }));
})();
