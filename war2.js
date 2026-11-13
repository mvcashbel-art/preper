/* Andam v31: War and nuclear, part 2. Preparation, family plan, food and water, power and cash,
   attack dangers, first aid, evacuation, fear and rumors. Registers the group "War and nuclear".
   Facts: Ready.gov, CDC, WHO, ICRC, Sphere Handbook, Philippine agencies. No invented local numbers. */

const HOWTO_WAR2 = [
  {
    id: "war7", title: "Supply kit and preparation checklist for nuclear fallout", icon: "bag",
    time: "A weekend to start, then a little each month", cost: "About ₱5,000–20,000 over several months (estimate), mostly food and water you will eat anyway",
    intro: "This is the full list of what to prepare so your family can stay inside for up to two weeks after fallout, and cope with a longer disruption. Most of it is food, water, light, a radio, medicine and a plan. Build it in three layers so you are never starting from zero: first 3 days, then 14 days, then 3 months. Tick items off on the Plan tab, category 'War supply kit'.",
    buy: [
      { t: "WATER: {n*56} liters for 14 days for {ppl}", n: "4 liters per person per day: about 2 to drink and the rest for cooking, washing hands and the toilet. That is about {n*56/19} refilling-station gallons. Store in clean containers with tight lids, away from sun. Replace every 6 months." },
      { t: "FOOD that needs no cooking for 14 days", n: "Canned fish and meat, biscuits and crackers, peanut butter, dried fruit and nuts, instant oats, condensed milk, canned fruit, sweets for children. Include comfort foods. Choose sealed packages. Eat and replace what you store." },
      { t: "FOOD that does need cooking, for 3 months", n: "Rice, noodles, dried fish (tuyo, daing), mung beans, cooking oil, salt, sugar, coffee or tea, powdered milk. Rice keeps about 1 year if dry and sealed." },
      { t: "Water treatment: unscented liquid chlorine bleach (5%) or purification tablets", n: "For germs, not for radiation. See the Make water safe guide." },
      { t: "Battery or hand-crank radio, AM/FM (shortwave a bonus), with spare batteries", p: "About ₱800–2,500 (estimate)", n: "Your main source of official instructions." },
      { t: "Flashlights or headlamps, one per person, and spare batteries; power banks charged" },
      { t: "Medicines for 30 days, first-aid kit, ORS, thermometer, pain and fever medicine, mask supply", n: "Ask your doctor to write a 30-day supply of regular medicine. Keep a list with doses." },
      { t: "N95 or KN95 masks: at least {n*5} for {ppl}", n: "Dust masks. Cloth masks are a last choice." },
      { t: "Heavy plastic sheeting, duct tape, scissors, strong garbage bags, buckets with lids", n: "To cover openings, for the toilet, and for bagging clothes." },
      { t: "Soap, shampoo, toothbrushes, wet wipes, toilet paper, sanitary pads, diapers, formula and baby foods if needed" },
      { t: "Clean spare clothes and shoes for everyone, sealed in a bag or drawer", n: "Used for changing after being outside." },
      { t: "Blankets, mats, a whistle, a battery clock, paper and pens, books and games for children" },
      { t: "Cash in small bills, a copy of important papers in a waterproof bag, a charged phone with an offline copy of this app" },
      { t: "Potassium iodide (KI): only from the health office or a licensed pharmacist, only if officials plan to use it", n: "See the Radiation sickness and iodine pills guide. This is optional and secondary to everything above." },
      { t: "Pet food and water for 14 days, and a carrier or leash for each pet" }
    ],
    steps: [
      { t: "Layer 1: this week (3 days of supplies)", d: "Store 3 days of water ({n*12} liters for {ppl}) and food that needs no cooking. Put a radio with batteries, flashlights, first-aid supplies, your medicines and papers into one bag. Write your family plan on the Family tab. Choose your safe room and your nearest strong building. This layer also protects you in a typhoon." },
      { t: "Layer 2: this month (14 days)", d: "Raise water to {n*56} liters. Add 14 days of no-cook food, 30 days of medicines, masks, plastic sheeting, tape, a lidded bucket and hygiene items. Practice getting to the safe room. Ready.gov advises about 2 weeks of supplies for a nuclear threat, because you may need to stay in a long time." },
      { t: "Layer 3: over 3 months (long disruption)", d: "Add rice, noodles, dried fish, oil, salt and sugar, a way to cook safely (see Power, fuel and cash), a seed pack for a garden and spare batteries. Buy a little extra each week instead of all at once, so that prices stay fair for your neighbors too." },
      { t: "Make a simple 14-day food plan", d: "Per adult per day, aim for about 2,000 calories: for example 300 g of dry rice or noodles (about 3 cups cooked rice), 1 to 2 cans of fish or meat, a handful of nuts or peanut butter, biscuits, and fruit. Children need less food but more care. Pregnant and breastfeeding women, older people and sick people need extra. Choose foods your family already likes." },
      { t: "Water, the most important item", d: "Count liters, not bottles. 4 liters per person per day is a good plan; hot weather, illness, breastfeeding and heavy work need more. Keep extra sealed bottles in the safe room. Also know the water you could use if stored water ran out: a rain barrel, a well and a way to boil or treat it (see the Make water safe guide). Radioactive dust does not make sealed stored water unsafe." },
      { t: "Medical preparation", d: "Keep each person's medicine for 30 days, plus the list of doses. Keep glasses, a spare pair if possible. For babies keep formula or breast milk plans, diapers and a thermometer. Keep ORS for diarrhea. Check expiry dates every 6 months. For KI, ask your municipal health office what its emergency plan is." },
      { t: "Home preparation", d: "Choose the safe room (see the Fallout shelter at home guide). Know where the main switches are. Clear the room of loose heavy things. Have water jugs or sacks ready to stack as extra walls. Practice sealing the room with plastic and tape and make sure everyone knows who does what." },
      { t: "People and skills", d: "Take a first-aid and CPR course from the Philippine Red Cross. Learn how to use your radio. Know your neighbors, especially older people, people with disabilities and young children, and agree who helps whom. Learn the basics in this app: water, food, first aid, shelter." },
      { t: "Documents and money", d: "Make copies of IDs, birth and marriage certificates, land and insurance papers, medical records and a list of phone numbers. Store in a waterproof bag, and photograph them. Keep some cash in small bills: ATMs and card machines may stop working." },
      { t: "Check and refresh every 6 months", d: "On the same dates each year, check expiry dates, rotate food (eat the oldest first), replace water, test the radio and flashlights, recharge power banks, update the family plan and review these guides. Use the expiry reminders on the Plan tab." },
      { t: "Do not panic-buy, hoard or go into debt", d: "Prepare calmly. A supply kit built over time costs less than a rush purchase. Share extra with neighbors. Keep supplies where they are safe from flood, rats and heat." }
    ],
    warn: [
      "Do not buy radiation gadgets, 'anti-radiation' pills, powders or suits. They do not protect you.",
      "Do not buy potassium iodide from online sellers you cannot check.",
      "Store food and water off the floor, sealed, and away from fuel and chemicals.",
      "Never run a generator, charcoal or gas stove inside a closed room: carbon monoxide kills."
    ],
    sources: ["Ready.gov: Build a kit, nuclear explosion and radiation emergencies", "CDC: Radiation emergencies, preparing", "Philippine Red Cross: first aid and disaster preparedness training", "Sphere Handbook: minimum water and food standards in emergencies"]
  },
  {
    id: "war8", title: "Family plan for war or a nuclear emergency", icon: "comms",
    time: "1 hour for the plan, 30 minutes to practice", cost: "Free",
    intro: "In a real emergency, phones may be jammed, roads blocked, and you may not be able to find each other. A written plan decided in advance lets everyone act calmly. Put the main points on the Family tab, share them with the Invite feature, and print the wallet cards.",
    buy: [],
    steps: [
      { t: "Decide the first move for each place", d: "At home: go to the safe room. At work: stay in the building or go to the nearest strong building. At school: children stay at the school and follow its plan. In a vehicle: stop safely, take cover, then go into the nearest strong building. In the market or church: stay inside. Write one line for each place." },
      { t: "Do not all rush to meet", d: "In a nuclear emergency, the safest place is inside a strong building, not on the road. Parents who rush to school can be caught in the open and clog roads. Schools shelter and keep children until it is safe. Agree that nobody leaves shelter to look for family during the first hours." },
      { t: "Choose a contact outside the area", d: "Pick one relative or friend far away, for example in another region or abroad, whom everyone texts when they are safe. Write their number on every wallet card. Short text messages usually get through when calls fail. Send: your name, 'safe', and where you are." },
      { t: "Choose two meeting places", d: "One close to home (a church or school gate) and one outside your town or barangay. Write them on the Family tab under Important places and agree on when you will go: only after officials say it is safe." },
      { t: "Write the numbers", d: "Fill in the Family tab: your contact outside the area, the barangay and municipal DRRM office, police, fire, hospital, and each person's medical needs. Print the wallet cards for everyone, children included. Put a card in each school bag." },
      { t: "Plan for people who need extra help", d: "Infants, older people, people with disabilities, pregnant women and sick people need a named helper. Decide who carries or helps them, and who keeps their medicines, glasses, hearing aids, wheelchairs and formula. For a bedridden person, plan to shelter in a lower floor room, not to move them far." },
      { t: "Pets and animals", d: "Bring pets inside. Keep food, water, a carrier and a leash ready. Do not let pets go out and bring dust back in. Wipe their paws and coat gently (see After fallout). Livestock: keep them in shelter and feed stored feed." },
      { t: "Plan for work and money", d: "Know how your employer will contact you. Keep cash, and have a way to carry the family's money and papers. If you lose income, see the Money guide. Tell your family which relative can help with food or shelter." },
      { t: "Practice it", d: "Do a 15-minute drill every 6 months: sound an alarm, everyone goes to the safe room, someone turns on the radio, someone checks supplies, and you talk about how it went. Use the Drill tab. Practice also helps children feel they can do something." },
      { t: "If you get separated", d: "Stay where you are if you are in a strong building. Send your outside contact a text. Do not travel through fallout or rubble to search. Later, register on the Red Cross 'Restoring Family Links' service (see the guide on finding family) and check evacuation centers." }
    ],
    warn: [
      "Do not leave a shelter to look for family during fallout.",
      "Do not spread names and photos of missing people unless the family asks you to.",
      "Make sure every family member can read the plan, and children can recite one phone number."
    ],
    sources: ["Ready.gov: Make a plan, nuclear explosion and radiation emergencies", "ICRC and Philippine Red Cross: Restoring Family Links", "Sphere Handbook: protection and family unity"]
  },
  {
    id: "war9", title: "Food and water for up to 3 months: how much and how", icon: "food",
    time: "1 hour to plan, then buy over weeks", cost: "Mostly food you already eat. About ₱6,000–15,000 for 4 people for 14 days (estimate); more for 3 months.",
    intro: "The most useful preparation is food and water. This guide turns the checklist into quantities, shopping and storing, and what to do if supplies run out. Use the Calculator tab for your exact family numbers. All numbers are planning estimates.",
    buy: [
      { t: "Water: {n*56} liters for 14 days for {ppl}; for 3 months, plan a way to get and treat water", n: "4 liters per person per day. {n*56/19} refilling-station gallons for 14 days." },
      { t: "Rice or noodles: about {n*4.2} kg dry for 14 days for {ppl}", n: "About 300 g per adult per day. Keep dry in sealed containers off the floor." },
      { t: "Canned fish, meat and beans: about {n*14} cans for 14 days for {ppl}", n: "1 can per person per day is a good start. Choose pull-tab cans so you do not need a can opener." },
      { t: "Protein and fat: peanut butter, nuts, dried fish, cooking oil, milk powder, eggs from your own chickens if you have them" },
      { t: "Ready-to-eat: biscuits, crackers, instant oats, dried fruit, canned fruit, sweets", n: "These are the no-cook food for the safe room." },
      { t: "Salt, sugar, coffee or tea, spices, vitamin C and multivitamins", n: "Vitamins help when fresh food is not available." },
      { t: "Baby and special foods: formula, baby cereal, diet foods, with water and clean bottles", n: "Ready-to-feed formula needs no water." },
      { t: "A manual can opener, spoons, plates, cups, a pot, a lighter and matches in a waterproof container" }
    ],
    steps: [
      { t: "How much food", d: "An adult needs about 2,000 calories a day. Plan 1,500 to 1,800 for young children. For 14 days, count about 300 g of dry rice or noodles per adult per day, plus protein from cans, fish, beans and peanut butter. Add some fats and sugar for energy, and add fruit or vitamins. Use the Calculator tab to get the numbers for your family." },
      { t: "Food for the safe room: no cooking", d: "For the first days after an explosion you may not want to light a fire, burn fuel indoors or go outside. Keep 3 to 14 days of food that you can eat as it is. Cooking fires indoors cause carbon monoxide and fires. Bring food and water into the safe room before anything happens." },
      { t: "How to store", d: "Keep food dry, cool, off the floor, in sealed containers, away from chemicals and fuel. Use pest-proof tins and jars. Write the date on each package. Eat the oldest first and replace it (first in, first out). Canned food lasts years; rice about a year; check for bulging cans, rust or bad smells and throw those away." },
      { t: "Water storage and treatment", d: "Clean food-grade containers with tight lids; fill them with safe water; label with the date; keep away from sunlight and heat. Treat extra water with unscented bleach (follow the Make water safe guide) or boil it for one minute. Keep water containers covered because mosquitoes breed in open ones." },
      { t: "Cooking without power or gas", d: "Use a gas or kerosene stove only in a well ventilated place, never in the shelter room. After the first days, cook outdoors on a small wood or charcoal stove if officials say outside is safe. See the Cook without power guide. Keep a fire extinguisher or bucket of water and sand nearby." },
      { t: "If you are stuck inside for 14 days", d: "Ration fairly. Children, pregnant women, the sick and older people eat first, but all adults should eat. Plan small meals and drink water regularly. Plan one hot meal a day if safe. Keep morale up with regular meal times. A habit of drinking water prevents headaches and tiredness." },
      { t: "If supplies run low", d: "Ask the barangay and municipal DRRM office about relief goods. Share and trade with neighbors. Do not forage, hunt or fish in contaminated areas: wait until officials test food. Do not drink water from open sources or rain until tested. Do not eat from your garden until officials say it is safe, but wash and peel vegetables from after the all-clear." },
      { t: "Food safety after fallout", d: "Sealed and stored food is safe, and fridge or freezer food is safe if it is still cold. Wipe the outside of packages that were outside. Do not eat food left open outside, and do not eat plants, fruit, eggs, fish or milk from the affected area until officials say so. Do not feed contaminated feed to animals." },
      { t: "Prices and fairness", d: "In a crisis, prices rise and shelves empty. Buy extra over time, avoid panic buying and share with neighbors. Report price gouging to the barangay, DTI or the local government." }
    ],
    warn: [
      "Do not cook on charcoal, gas or kerosene in the closed safe room.",
      "Throw away bulging, leaking or rusty cans.",
      "Do not eat food or drink water that was left open outside during fallout.",
      "Do not give honey to babies under 1 year."
    ],
    sources: ["Ready.gov: Build a kit (food and water)", "CDC: Food and water after a radiation emergency", "Sphere Handbook: minimum food and water standards", "WHO: Safe water storage"]
  },
  {
    id: "war10", title: "Power, fuel, phones and cash when everything stops", icon: "gen",
    time: "30 minutes to read", cost: "Free to ₱10,000 (estimate) depending on solar and fuel storage",
    intro: "War and nuclear emergencies can cut the grid, fuel, phones, internet and card payments. In March 2026 the Philippines even declared a national energy emergency over fuel supply, a reminder that fuel and power can fail without any attack. This guide covers the basics for light, communication, cooking, heating, money and information.",
    buy: [
      { t: "AM/FM and shortwave hand-crank radio, spare batteries" },
      { t: "Power banks (20,000 mAh) for each adult, and a small solar panel or power station if possible" },
      { t: "Flashlights and headlamps, and lanterns", n: "Use flashlights and not candles in the shelter room: fire risk." },
      { t: "Cash in small bills, enough for about 1 to 2 weeks of essentials" },
      { t: "A small amount of safe fuel storage, only if you can store it properly", n: "Fuel is dangerous to store at home. Ask your local fire office about safe amounts." },
      { t: "Paper maps and a list of phone numbers", n: "A paper map of your town and region with the evacuation routes and evacuation centers." }
    ],
    steps: [
      { t: "Light", d: "Use flashlights or headlamps, and battery lanterns. Avoid candles and kerosene in the safe room. Keep spare batteries for each device. Charge power banks monthly. Solar lanterns can recharge during the day, but be careful about going outside during fallout." },
      { t: "Radio is your lifeline", d: "In a crisis, mobile data and TV may stop, but AM/FM radio often keeps working. Keep a hand-crank or battery radio and spare batteries in the safe room. Listen on a schedule, for example 10 minutes every hour, to save battery. Write down what you hear and the time. Official frequencies are announced by local government." },
      { t: "Phones and messages", d: "Mobile networks jam when everyone calls at once. Use short text messages instead of calls, save battery with airplane mode between checks, and use your outside contact. This app works offline: install it on every phone. Keep a paper list of numbers." },
      { t: "Cooking and heat safely", d: "Never burn charcoal, gas, kerosene or wood in a closed room: carbon monoxide kills without warning. Cook only in a very well ventilated place or outdoors when it is safe. Generators must be outside, far from windows and doors, on dry ground and with a cover. See the Generators guide." },
      { t: "Water without power", d: "The pump or the town supply may stop. Keep stored water. For extra water, see the Make water safe guide. A bucket flush with used water saves drinking water." },
      { t: "Fuel", d: "Fuel shortages are common in wartime. Fill the vehicle tank when you hear about a threat. Do not store large amounts of fuel at home. Prefer walking, bicycles and sharing rides. Plan trips and combine them. Prices may rise sharply." },
      { t: "Money and shopping", d: "Banks and ATMs may stop. Keep cash in small bills, a few days to 2 weeks of essentials. Keep a note of who owes you what. Do not carry all your money in one place. Do not keep large amounts of cash on show. In a long crisis, barter (food, services, repairs) becomes common." },
      { t: "Work, school and transport", d: "Schools and offices may close. Keep working from home if possible, and keep children in a routine. Public transport may stop. Stay home when told. Do not drive through damaged or flooded roads." },
      { t: "Information and rumors", d: "Official information comes from NDRRMC, DOH, your LGU, and government radio. Check two sources before sharing. See the Fear, children, rumors and community guide." },
      { t: "Cyberattacks and scams", d: "In a crisis, scammers send fake relief links and fake bank messages. Do not click links or give OTPs. Keep devices updated and use strong passwords. Keep important papers on paper, too." }
    ],
    warn: [
      "Never use a generator or burn charcoal, gas or kerosene in a closed room.",
      "Do not store large amounts of fuel at home.",
      "Do not trust unknown messages or links asking for money or passwords during a crisis."
    ],
    sources: ["Ready.gov: Power outages, communication in emergencies", "Philippine government declaration of a national energy emergency, March 2026 (news reports)", "WHO and CDC: Carbon monoxide poisoning prevention"]
  },
  {
    id: "war11", title: "Air raids, shelling, gunfire and unexploded bombs", icon: "shelter",
    time: "25 minutes to read", cost: "Free",
    intro: "Wars hurt civilians mostly through explosions, flying glass, collapsing buildings, fire and gunfire, and through the explosives left behind afterward. The Philippines has long experience with conflict in some regions and with old war shells from World War II that still turn up. This guide covers the basic protective actions for civilians.",
    buy: [],
    steps: [
      { t: "Know the warnings", d: "Warnings may be sirens, radio, church bells, loudspeakers or messages from the barangay. Learn what your LGU uses. If you hear explosions, do not go outside to look. Go to the safest place inside at once." },
      { t: "In a building: where to go", d: "Go to the lowest floor, to an inner room or corridor away from windows, with walls on several sides. Stay away from glass, which is a major cause of injury. Lie down, cover your head and neck, and open your mouth slightly to reduce pressure on the ears. Do not shelter near gas, fuel or electrical equipment. Do not use an elevator." },
      { t: "If you are outside", d: "Go into the nearest strong building. If none, lie flat in a ditch or low ground, away from vehicles, trees, poles and walls that can fall, and cover your head and neck. Do not hide under a bridge or overpass." },
      { t: "Gunfire", d: "Get down and move out of the line of fire, behind solid cover such as concrete or earth (not thin walls, which bullets pass through). Crawl or crouch and move away when it is safe. Keep children low and quiet. Stay inside, away from windows. Do not wave a phone or light out of windows." },
      { t: "Drones and aircraft", d: "Move indoors and away from windows. Do not film, and do not gather in the open. Turn off lights at night if instructed." },
      { t: "After an explosion", d: "Wait inside until it is quiet, because a second blast often follows. Check for injuries and for fire, gas smell and structural damage. Switch off gas and power if safe. Leave a damaged building carefully and move away from the damaged area by a safe route. Listen to the radio." },
      { fig: "uxo_rule", t: "Unexploded bombs, shells and grenades (UXO)", d: "Old and new explosives lie in fields, rivers, roads and rubble and can explode even decades later. Do not touch, move, kick, throw or pick up any metal object that could be a shell, bomb, grenade, mine, fuse or rocket. Walk back the way you came, stepping in your own footprints. Warn others, mark the place from far away, and tell the barangay, the police or 911. Never let children play with or collect metal scrap." },
      { t: "Landmines", d: "Landmines may be hidden along paths and in fields. Stay on roads and paths used by many people. Do not enter fenced or marked areas or areas locals avoid. If you think you are in a minefield, stop, do not move, and call for help, or retrace your own footprints very slowly." },
      { t: "Fire and collapse", d: "Get low under smoke, cover your nose and mouth with wet cloth, and crawl to a way out. Do not return to a burning building. Do not enter a damaged building until it is cleared. Watch for falling debris and live wires." },
      { t: "Stay or leave?", d: "Stay in a strong building if you are not in the combat zone and have supplies. Leave when officials tell you or when fighting reaches your area, with go-bag, medicines, documents, water, and by the route announced. Move in daylight if possible, with other people, and tell someone where you are going." },
      { t: "Checkpoints and armed groups", d: "Stay calm, keep your hands visible, move slowly, and do what you are told. Carry ID. Do not argue and do not carry anything that looks like a weapon. Do not photograph soldiers or the checkpoint. Civilians, hospitals, schools and humanitarian workers are protected under the rules of war." },
      { t: "Protection of women, children and others", d: "In conflict, women, girls, children and others face higher risks of violence and exploitation. Stay in groups, avoid isolated places and keep children close. Ask the barangay, police, DSWD, Philippine Red Cross, or women and children protection desks for help. Say 'I need protection' to a humanitarian worker if you are in danger." }
    ],
    warn: [
      "Never touch or pick up an unexploded shell, bomb, grenade or strange metal object.",
      "Do not go outside to look at explosions.",
      "Do not shelter next to glass, fuel or gas.",
      "Never take a short-cut through an unmarked field or a fenced-off area in a conflict zone."
    ],
    sources: ["ICRC: Safer behaviour around explosive ordnance and weapon contamination", "Ready.gov: Explosions and shelter", "UN Mine Action Service (UNMAS): explosive ordnance risk education", "Sphere Handbook: protection principles"]
  },
  {
    id: "war12", title: "First aid for blast, burns, crush injuries and many injured at once", icon: "med",
    time: "30 minutes to read, a course is better", cost: "Free to ₱2,000 for supplies (estimate)",
    intro: "In a war or nuclear emergency, hospitals can be overwhelmed or out of reach, so family and neighbors give first aid. This guide covers the injuries most likely after explosions, fires and collapses. It does not replace a first-aid course, which the Philippine Red Cross offers. Use it together with the Quick guides in this app, and get a doctor for anything serious as soon as it is safe.",
    buy: [
      { t: "A first-aid kit: gauze, bandages, triangular bandages, elastic bandage, tape, scissors, tweezers, gloves" },
      { t: "Tourniquets (1 or 2) and a learner's course on how to use them", n: "Only if you have been taught. Otherwise use firm direct pressure." },
      { t: "Saline or clean water for rinsing, a clean sheet for burns, aluminum foil blanket" },
      { t: "Pain and fever medicine, ORS, a thermometer, and your regular medicines" },
      { t: "Goggles or glasses, work gloves, boots for rubble" }
    ],
    steps: [
      { t: "Safety first, then check the person", d: "Make sure the area is safe: fire, gas, falling walls, more blasts, and, after a nuclear event, fallout. Wear gloves. Check: is the person awake? breathing? bleeding badly? Call or send for help. Do not move a person with a possible neck or back injury unless there is immediate danger." },
      { t: "Heavy bleeding comes first", d: "Press firmly on the wound with a clean cloth for at least 10 minutes without lifting. Add more cloth on top if it soaks through. Raise the limb if you can. For a life-threatening bleed from an arm or leg that does not stop, a tourniquet placed 5 to 8 cm above the wound, tightened until the bleeding stops, can save a life. Write the time on the person. Do not loosen it. See the Heavy bleeding quick guide." },
      { t: "Burns", d: "Move away from the source. Remove rings and tight clothes near the burn, but do not pull off clothes stuck to the skin. Cool the burn under clean running water for 20 minutes. Do not use ice, butter, toothpaste or oils. Cover loosely with a clean, non-fluffy cloth or cling film. Do not break blisters. Large, deep, face, hand or genital burns need a doctor. Give small sips of water or ORS." },
      { t: "Blast injuries", d: "Blast can injure ears, lungs and gut, even without visible wounds. Watch for trouble breathing, chest pain, coughing blood, belly pain, vomiting, or deafness and bleeding from the ear. Keep the person lying quietly, warm and calm, and get medical help. Cover open chest wounds loosely and keep the person sitting or in the position that helps breathing." },
      { t: "Flash and eye injuries", d: "Flash from a nuclear explosion can cause temporary blindness. It usually fades in minutes. Do not rub the eyes. For debris in the eye, rinse with clean water and cover both eyes lightly. Do not remove an object stuck in the eye. Get medical help." },
      { t: "Broken bones and wounds", d: "Keep the limb still. Splint it in the position found with padded sticks or a rolled newspaper, and tie above and below the break. Rinse wounds with clean water, cover with a clean cloth, and keep dirty wounds under watch for infection (redness, heat, pus, fever). Tetanus is a risk: seek a tetanus shot." },
      { t: "Crush injuries", d: "A person who was trapped under heavy weight for more than about 1 hour can become dangerously ill when freed, because chemicals from damaged muscles flood the body. Give plenty of water or ORS if they can swallow, keep them warm, and get a doctor urgently, even if they look well. See also the Someone is trapped quick guide." },
      { t: "Shock", d: "Signs: pale, cold, sweaty skin, fast weak pulse, fast breathing, confusion. Lay the person down, raise the legs if there is no head, neck or leg injury, keep them warm with a blanket, loosen tight clothes, and give nothing to eat. Give sips of water only if awake and there is no belly injury. Keep talking to them." },
      { t: "Many injured at once (triage)", d: "When many people are hurt and help is limited, tend first to those who are not breathing normally or bleeding heavily and can be helped quickly, then to the person who cannot walk, then to those who can walk. Do not spend all your time on one person. Mark each person with their condition and the time. Ask the most medically trained person to lead." },
      { t: "After a nuclear explosion: injured and contaminated", d: "Life-saving first aid comes first: bleeding and breathing. Dust on clothes and skin is not an immediate danger to rescuers: do first aid, then remove outer clothes and wash if possible. Cover wounds before washing the skin around them. Do not leave the shelter to rescue people during heavy fallout unless officials say it is safe." },
      { t: "Do not give up on the basics", d: "Water, rest, warmth, regular medicine and cleanliness save more lives than anything else when care is delayed. Keep a record of every injured person: name, injury, treatment and time, to give to health workers." }
    ],
    warn: [
      "Do not give an injured person with belly injuries or heavy burns large drinks. Give sips only.",
      "Never put ice, butter, toothpaste or oil on burns.",
      "Do not remove an object stuck in the body or eye. Pad around it.",
      "A tourniquet is only for life-threatening bleeding from a limb that does not stop with firm pressure."
    ],
    sources: ["Philippine Red Cross: first aid", "ICRC: First aid in armed conflict and other situations of violence", "Stop the Bleed (American College of Surgeons): bleeding control", "Ready.gov and CDC: blast injuries and burns"]
  },
  {
    id: "war13", title: "Leaving home, evacuation centers and finding family", icon: "bag",
    time: "25 minutes to read", cost: "Free",
    intro: "You may have to leave your home because of fighting, a radiological release or a typhoon during a crisis. Planning ahead makes leaving safer and keeps the family together. Follow official evacuation orders, and do not leave in panic if officials tell you to stay inside.",
    buy: [
      { t: "A go-bag for each person: water, food, radio, flashlight, power bank, first-aid, medicines, masks, clean clothes, whistle, papers and cash" },
      { t: "A waterproof folder with copies of IDs, birth certificates, medical records and a list of numbers" },
      { t: "Sturdy shoes, hats, long sleeves and raincoats for everyone" },
      { t: "A wristband or card with each child's name, parents' names and phone number", n: "The Print wallet cards feature does this." }
    ],
    steps: [
      { t: "When to go and when to stay", d: "Stay inside a strong building when officials say to shelter, for example after fallout. Leave when officials give an evacuation order, when fighting is near, or when your home is damaged or unsafe. Never leave because of a forwarded message. Check with your barangay, LGU and radio." },
      { t: "Know your routes and centers", d: "Ask the municipal DRRM office for evacuation centers and routes, and save them on the Family tab. Identify two routes (one on foot) and walk them. Note high ground and places to avoid: bridges, rivers, low land." },
      { t: "Pack and go", d: "Take the go-bag, medicines, papers, charged phone, radio, water and cash. Wear long clothes, a hat and shoes, and cover your nose and mouth with a mask or cloth. Lock the house, switch off the electricity and gas, close water. Leave a note of where you went. Take pets if you can." },
      { t: "On the road", d: "Travel in daylight and with other people. Stay on main routes announced by officials, and avoid rivers, bridges and low areas in heavy rain. Keep children in sight and holding hands. Keep headlights on in a vehicle and keep windows closed in dust. Do not pick up objects. Watch for unexploded ordnance." },
      { t: "At an evacuation center", d: "Register with the staff and give your family's names. Keep your family together. Staff may check for radiation and clean you before you enter. Follow rules on water, food, sleeping and sanitation. Report illness early. Keep medicines on schedule. Protect children: do not leave them with strangers. Ask for women and children's spaces." },
      { t: "Hygiene and health in a crowd", d: "Wash hands often with soap, use the toilets, drink safe water and watch for diarrhea, coughs and fever. Report them. Keep sleeping areas clean and dry. Take care of older people and babies. See the Hygiene and sanitation guides." },
      { t: "Finding family", d: "Contact your outside relative by text. Register with the Philippine Red Cross and the ICRC 'Restoring Family Links' service, which helps families find each other in conflicts and disasters. Ask evacuation center staff for lists of people. Put your name and contact on a list you can see. Be careful with online posts: share only what is needed." },
      { t: "Children who are alone", d: "Tell the barangay, DSWD, police or Red Cross immediately if you find a lost child. Do not take a child away yourself. Write down their name, age, description and where they were found. Keep them with a safe adult, and protect them from strangers." },
      { t: "Scams and trafficking", d: "In crises, criminals offer fake jobs, rides abroad and quick help to families. Do not hand over children or papers or money to people you do not know. Use official evacuation centers, officials with ID and the Red Cross. Report suspicious offers to the police or DSWD." },
      { t: "Returning home", d: "Return only when officials say it is safe. Check for damage, gas and structural damage. Dust and clean with damp cloths and gloves. Keep food and water safe until tested. Write a list of lost or damaged things for aid and insurance. Take time to rest and accept help for the emotional toll." }
    ],
    warn: [
      "Do not leave in panic because of a message you cannot check.",
      "Do not give your children or documents to strangers who offer 'help'.",
      "Never pick up strange metal objects on the road.",
      "Do not go back to look at the damage during fighting or fallout."
    ],
    sources: ["Ready.gov: Evacuation", "ICRC and Philippine Red Cross: Restoring Family Links", "Sphere Handbook: shelter, settlement and protection", "Philippine DSWD and NDRRMC: evacuation center management"]
  },
  {
    id: "war14", title: "Fear, children, rumors and helping each other", icon: "comms",
    time: "20 minutes to read", cost: "Free",
    intro: "Fear is a normal reaction to war and nuclear news. Calm, simple routines protect both minds and bodies. This guide covers how to support children and older people, how to deal with rumors and how neighbors can help each other. If someone is in distress, take it seriously and do not leave them alone.",
    buy: [],
    steps: [
      { t: "Expect strong feelings", d: "Fear, anger, sadness, guilt, trouble sleeping, headaches, stomach upset and difficulty concentrating are common and usually ease with rest, routine and support. You are not weak. Talk about it with someone you trust. If feelings are too strong to cope, or last for weeks, or you think about harming yourself, ask for help from the health center, a doctor, a counselor or the NCMH crisis line (check the current number, see the Calm guide)." },
      { t: "Children: tell the truth, simply and calmly", d: "Use simple words: 'There is danger, but we have a plan, and grown-ups are working to keep us safe.' Do not hide the facts, and do not give frightening details. Ask what they have heard and what they feel. Let them cry and ask questions. Limit exposure to news and rumors." },
      { t: "Routine and play", d: "Keep regular meals, sleep and play, even in the shelter. Offer drawing, stories, songs and simple tasks like helping with the radio log or watering. Let children keep a favorite toy or blanket. Praise them for helping. Young children may become clingy, wet the bed or have nightmares, and this passes." },
      { t: "Older people and people with disabilities", d: "Keep them informed, comfortable and included. Keep medicines, glasses, hearing aids and mobility aids. Do not leave them alone for long. Speak slowly and clearly. Older people may refuse to leave home; listen, and involve family and health workers." },
      { t: "Rumors and fake news", d: "In a crisis, rumors spread fast: fake warnings, fake cures, fake images. Before you believe or share a message, ask who said it, whether NDRRMC, DOH, the LGU or the radio say the same, and whether it asks you to panic, buy something or click a link. If you cannot check, do not share. Tell people to listen to official radio." },
      { t: "Limit news", d: "Constant news increases anxiety. Listen to the radio at set times, such as 10 minutes every hour, and then rest. Switch off graphic videos, especially for children." },
      { t: "Neighbors and community", d: "Make a list of neighbors: older people, people with disabilities, babies, pregnant women and the sick. Agree who checks on whom. Share information, tools and extra supplies. Organize a barangay or purok group for first aid, water, food and communications. A community is safer than a single home." },
      { t: "Helpers need rest too", d: "Take turns. Sleep, eat and drink. Do not take on all the work. Watch for signs of exhaustion in yourself and others. Share the tasks and ask for help." },
      { t: "Grief and loss", d: "If someone dies, allow time to mourn. Small rituals help: a prayer, a candle, saying a name. Children need honest, gentle words. Ask your priest, pastor, imam or health worker for support. Grief is normal; the body and heart need time." },
      { t: "Hope and purpose", d: "Having a job, such as organizing the shelter, helping neighbors or teaching the children, helps people cope. Make a plan for tomorrow and the week. Remember that most emergencies end and that most people survive with preparation and cooperation." }
    ],
    warn: [
      "Do not leave someone who talks about suicide alone. Stay with them and get help at once from a doctor, the barangay health worker or the crisis line.",
      "Do not share unverified messages.",
      "Do not tell children lies, such as 'nothing is happening', but do not frighten them with details."
    ],
    sources: ["WHO: Psychological first aid (Look, Listen, Link)", "IASC: Guidelines on mental health and psychosocial support in emergencies", "Sphere Handbook: mental health and psychosocial support", "NCMH Philippines crisis hotline (verify the current numbers before relying on them)"]
  }
];

/* register: add the group and rebuild the guide list in group order */
(() => {
  const ids = ["war1", "war7", "war2", "war3", "war4", "war5", "war6", "war8", "war9", "war10", "war11", "war12", "war13", "war14"];
  const at = HOWTO_GROUPS.findIndex((x) => x[0] === "Offline library (NOMAD)");
  HOWTO_GROUPS.splice(at < 0 ? HOWTO_GROUPS.length : at, 0, ["War and nuclear", ids]);
  const byId = {};
  HOWTO.concat(HOWTO_WAR1, HOWTO_WAR2).forEach((x) => { byId[x.id] = x; });
  HOWTO.length = 0;
  HOWTO_GROUPS.forEach(([, gi]) => gi.forEach((id) => { if (byId[id]) HOWTO.push(byId[id]); }));
})();
