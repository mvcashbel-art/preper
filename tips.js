/* Andam v17: tip of the day, monthly check, season reminders.
   Each text has English (en) and Bisaya (ceb). `g` is an optional step-by-step guide id (opens in Guides). */

const TIPS = [
  { en: "Keep at least 4 liters of drinking water per person for each day you want to cover. A 19-liter jug lasts one person about 5 days.", ceb: "Tipigi og dili moubos sa 4 ka litro nga tubig kada tawo matag adlaw. Ang 19-litro nga galon molungtad sa usa ka tawo og mga 5 ka adlaw.", g: "water" },
  { en: "A typhoon is coming? Fill clean containers with water before the pipes or the power stop.", ceb: "Moabot ang bagyo? Pun-a og tubig ang limpyong sudlanan sa dili pa mohunong ang tubo o kuryente.", g: "water" },
  { en: "When a typhoon warning comes out, charge your phones, power banks and flashlights right away.", ceb: "Kung naay pahibalo sa bagyo, i-charge dayon ang mga telepono, power bank ug flashlight.", g: "solar2" },
  { en: "Use the oldest cans and packs first, and put new ones at the back. Then nothing sits on the shelf until it expires.", ceb: "Gamita una ang labing karaan nga de-lata ug pakete, ug ibutang sa luyo ang bag-o. Sa ingon walay mahurot nga naglingkod ra sa estante.", g: "food" },
  { en: "Put IDs, birth certificates, land papers and insurance in a plastic bag or waterproof pouch. Keep copies in a second place.", ceb: "Ibutang ang ID, birth certificate, papeles sa yuta ug insurance sa plastik o waterproof nga pouch. Tipigi ang kopya sa laing lugar.", g: "bag" },
  { en: "Pick a place to meet if home is not safe, and a second place outside your area. Write both in the Family tab.", ceb: "Pili og lugar nga imong tagboan kung dili luwas ang balay, ug usa pa gawas sa inyong lugar. Isulat ang duha sa Pamilya.", g: "comms" },
  { en: "Write the important phone numbers on paper. A dead phone cannot show them.", ceb: "Isulat sa papel ang importanteng numero sa telepono. Ang patay nga telepono dili makapakita niini." },
  { en: "A text message often goes through when a call does not. Send a short “I am OK” to your family.", ceb: "Ang text kasagaran moagi bisan dili ang tawag. Magpadala og mubo nga “okay ra ko” sa imong pamilya.", g: "comms" },
  { en: "Never walk or drive through moving floodwater. It knocks people down and carries vehicles away. Turn around.", ceb: "Ayaw og lakaw o drayb sa nagadagayday nga tubig-baha. Mapukan ang tawo ug madala ang sakyanan. Mobalik na lang." },
  { en: "Earthquake: drop to the floor, get under a sturdy table, and hold on until the shaking stops.", ceb: "Linog: dumapa sa salog, mag-ilawom sa lig-on nga lamesa, ug kupti kini hangtud mohunong ang linog." },
  { en: "After a quake, if you smell gas, close the LPG valve, open windows and go outside. Do not switch anything on or strike a flame.", ceb: "Human sa linog, kung naay baho sa gas, sirad-i ang balbula sa LPG, ablihi ang bintana ug gawas. Ayaw og ablihi ang suga o mag-ukit og kalayo.", g: "cook" },
  { en: "Never run a generator, charcoal stove or gas heater indoors or in a closed room. The fumes (carbon monoxide) can kill you quietly.", ceb: "Ayaw og gamit sa generator, uling nga kalan o gas heater sulod sa balay o sirado nga lawak. Ang aso (carbon monoxide) makapatay nga hilom ra.", g: "gen" },
  { en: "Keep generator fuel outside the living area, in proper containers, away from fire. Use the oldest fuel first.", ceb: "Tipigi ang gasolina sa generator sa gawas sa puy-anan, sa maayong sudlanan, layo sa kalayo. Gamita una ang labing karaan.", g: "gen" },
  { en: "Wash your hands with soap for 20 seconds before eating or cooking and after the toilet. It prevents most stomach sickness.", ceb: "Hugasi ang kamot gamit ang sabon sulod sa 20 segundo sa dili pa mokaon o magluto ug human sa kasilyas. Makapugong kini sa kadaghanang sakit sa tiyan.", g: "san" },
  { en: "Ask your doctor about keeping a few weeks of your regular medicines in stock, and check their dates.", ceb: "Pangutan-a ang imong doktor bahin sa pagtipig og pipila ka semana nga regular nga tambal, ug susiha ang petsa niini." },
  { en: "Every 6 months, empty the go-bag, replace water and food, and check that the clothes still fit.", ceb: "Matag 6 ka bulan, kuhaa ang sulod sa go-bag, ilisi ang tubig ug pagkaon, ug tan-awa kung motaman pa ang sinina.", g: "bag" },
  { en: "Keep some cash in small bills. Shops may have no change and ATMs may be down.", ceb: "Tipigi ang gamay nga kuwarta sa gagmay nga bills. Basin walay sukli ang tindahan ug dili mugana ang ATM." },
  { en: "Before a typhoon, fill the tank of your motorbike or car to at least half.", ceb: "Sa dili pa ang bagyo, pun-a ang tangke sa motorsiklo o sakyanan bisan tunga man lang." },
  { en: "Check the roof, trim branches that hang over the house, and tie down loose roofing before typhoon season.", ceb: "Susiha ang atop, putli ang mga sanga nga nagbitay sa balay, ug higpita ang luag nga yero sa dili pa ang tag-bagyo.", g: "shelter" },
  { en: "Store or tie down loose things that can fly in strong wind: drums, sheets of iron, chairs.", ceb: "Tipigi o higpita ang luag nga butang nga mahimong ilabay sa kusog nga hangin: drum, yero, lingkuranan.", g: "shelter" },
  { en: "Know where your evacuation center is and walk the route once, so you do not have to find it in the dark.", ceb: "Hibaloi kung asa ang inyong evacuation center ug sulayi ang dalan kausa, aron dili ka magpangita sa kangitngit." },
  { en: "A battery or hand-crank radio keeps working when the phone signal does not. Keep spare batteries.", ceb: "Ang radyo nga baterya o gipihit mugana pa bisan walay signal sa telepono. Tipigi ang dugang baterya.", g: "comms" },
  { en: "Keep rice in sealed containers, dry and off the floor. It stops moisture and weevils.", ceb: "Tipigi ang bugas sa sirado nga sudlanan, uga ug dili sa salog. Mapugngan niini ang basa ug ang gukod.", g: "food" },
  { en: "Fast food to grow: kangkong, pechay, sweet potato (kamote) and malunggay. Start one pot today.", ceb: "Dali tamnon: kangkong, pechay, kamote ug malunggay. Sugdi karon ang usa ka kaldero.", g: "grow" },
  { en: "No way to boil water? Plain unscented bleach, about 2 drops per liter of clear water, wait 30 minutes.", ceb: "Walay pamaagi sa pagpabukal? Plain nga walay-baho nga bleach, mga 2 ka tulo kada litro sa klaro nga tubig, hulata og 30 minutos.", g: "water" },
  { en: "Check on your elderly and sick neighbors first. Neighbors help each other before anyone else can arrive.", ceb: "Tan-awa una ang tigulang ug masakiton nga silingan. Ang silingan mag-ayuda sa usag usa sa dili pa moabot ang uban." },
  { en: "Take photos of your home and valuables once a year. They help with records and claims.", ceb: "Pagkuha og hulagway sa balay ug bililhon nga gamit kausa sa usa ka tuig. Makatabang kini sa rekord ug claim." },
  { en: "Teach children their full name, parents’ names and one phone number, and practice saying it.", ceb: "Tudloi ang mga bata sa ilang bug-os nga ngalan, ngalan sa ginikanan ug usa ka numero sa telepono, ug pasulayi sa pagsulti." },
  { en: "Keep a flashlight and a pair of shoes by the bed. After a quake there may be broken glass on the floor.", ceb: "Butangi og flashlight ug sapatos ang kilid sa higdaanan. Human sa linog basin naay bungkag nga bildo sa salog." },
  { en: "Use LED lamps instead of candles at night when you can. Candles cause house fires in blackouts.", ceb: "Gamita ang LED nga suga puli sa kandila sa gabii kung kaya. Ang kandila hinungdan sa sunog sa panahon sa brownout.", g: "solar2" },
  { en: "Check your first-aid kit every few months and replace what is used or expired.", ceb: "Susiha ang first-aid kit kada pipila ka bulan ug ilisi ang nagamit o nahurot na.", g: "med" },
  { en: "Recharge a stored power bank every 3 months. Unused batteries slowly lose charge.", ceb: "I-charge ang gitipigan nga power bank matag 3 ka bulan. Ang dili gamiton nga baterya hinay-hinay mawad-an og charge.", g: "solar2" },
  { en: "Save copies of your documents on your phone too. Photos of IDs and certificates are better than nothing.", ceb: "Tipigi usab ang kopya sa dokumento sa imong telepono. Ang hulagway sa ID ug sertipiko mas maayo kaysa walay kopya." },
  { en: "When the power is out, eat fresh fish, meat and vegetables first. An unopened fridge stays cold for about 4 hours.", ceb: "Kung walay kuryente, kan-a una ang presko nga isda, karne ug utanon. Ang wala maablihi nga ref mabugnaw pa og mga 4 ka oras.", g: "food" },
  { en: "Keep a manual can opener with your canned food. It is easy to forget.", ceb: "Butangi og manwal nga abre-lata ang imong de-latang pagkaon. Dali ra kini nga makalimtan.", g: "food" },
  { en: "To save phone battery: lower the brightness, close apps, and use airplane mode when there is no signal.", ceb: "Aron makatipid sa baterya sa telepono: ubos-a ang kahayag sa screen, sirad-i ang apps, ug gamita ang airplane mode kung walay signal.", g: "solar2" },
  { en: "A bucket toilet with a trash bag, a little ash or sawdust, and a lid works when the water stops.", ceb: "Ang timba nga kasilyas nga naay plastik, gamay nga abo o lagot, ug takup mugana kung mohunong ang tubig.", g: "san" },
  { en: "After a flood, throw away any food that touched floodwater, even if it looks fine. Cans must be washed and disinfected.", ceb: "Human sa baha, ilabay ang pagkaon nga nahikap sa tubig-baha bisan murag maayo pa. Ang de-lata kinahanglan hugasan ug i-disinfect.", g: "food" },
  { en: "In hot months drink water often, rest in the shade at midday, and never leave a child or a pet in a closed vehicle.", ceb: "Sa init nga mga bulan, inom og tubig kanunay, pahulay sa landong sa udto, ug ayaw biyai ang bata o binuhi sa sirado nga sakyanan." }
];

/* Monthly check: tick everything once a month. Resets on the 1st. `tab` opens a tab for that item. */
const MONTHLY = [
  { id: "m1", en: "Test the flashlights and the radio. Replace weak batteries.", ceb: "Sulayi ang flashlight ug radyo. Ilisi ang huyang nga baterya." },
  { id: "m2", en: "Charge the power banks and phones. Top up the solar or battery power station.", ceb: "I-charge ang power bank ug telepono. Pun-a ang solar o baterya sa power station." },
  { id: "m3", en: "Look in the go-bag: clothes, medicines, documents, water.", ceb: "Tan-awa ang go-bag: sinina, tambal, dokumento, tubig." },
  { id: "m4", en: "Open Storage and use or replace what is close to expiring.", ceb: "Abli ang Tipiganan ug gamita o ilisi ang hapit na mahurot.", tab: "storage" },
  { id: "m5", en: "Check that the stored drinking water is clean and the containers are covered.", ceb: "Susiha kung limpyo ang gitipigan nga tubig ug natabunan ang sudlanan." },
  { id: "m6", en: "Check the first-aid kit and refill what was used.", ceb: "Susiha ang first-aid kit ug pun-a ang nagamit." },
  { id: "m7", en: "Check that phone numbers and the meeting place are still right.", ceb: "Susiha kung husto pa ang numero sa telepono ug ang tagboanan.", tab: "family" },
  { id: "m8", en: "Check the LPG and fuel: no smell, valves closed, enough stored.", ceb: "Susiha ang LPG ug gasolina: walay baho, sirado ang balbula, igo ang tinipigan." },
  { id: "m9", en: "Save a backup of your Andam entries (Settings).", ceb: "I-save ang backup sa imong mga isinulat sa Andam (Settings).", act: "settings" }
];

/* Season reminders (Philippines). months are 1-12. */
const SEASONS = [
  { id: "hot", months: [3, 4, 5], en: "Hot months and getting ready (March to May)", ceb: "Init nga mga bulan ug pag-andam (Marso hangtud Mayo)", items: [
    { en: "Drink water often and rest in the shade at midday.", ceb: "Inom og tubig kanunay ug pahulay sa landong sa udto." },
    { en: "Keep food cold or cook only what you will eat. Heat spoils food fast.", ceb: "Tipigi nga bugnaw ang pagkaon o lutoa lang ang kan-on. Dali madunot ang pagkaon sa init." },
    { en: "Check the roof and gutters. Fix leaks before the rains.", ceb: "Susiha ang atop ug alulod. Ayoha ang tagas sa dili pa ang ulan." },
    { en: "Trim branches near the house and tie down loose roofing.", ceb: "Putli ang sanga nga duol sa balay ug higpita ang luag nga yero." },
    { en: "Top up water, food and the go-bag. Stores are cheaper and calmer now.", ceb: "Pun-a ang tubig, pagkaon ug go-bag. Mas barato ug mas hayahay mopalit karon." }
  ] },
  { id: "ty", months: [6, 7, 8, 9, 10, 11], en: "Typhoon season (June to November)", ceb: "Tag-bagyo (Hunyo hangtud Nobyembre)", items: [
    { en: "Listen to PAGASA and the local government for warnings.", ceb: "Paminaw sa PAGASA ug lokal nga gobyerno alang sa pahibalo." },
    { en: "Keep the go-bag by the door and the phones charged.", ceb: "Ibutang ang go-bag duol sa pultahan ug i-charge ang mga telepono." },
    { en: "Know your evacuation center and the way there. Keep the fuel tank at least half full.", ceb: "Hibaloi ang evacuation center ug ang dalan padulong niini. Tipigi nga tunga ang gasolina sa tangke." },
    { en: "Before a typhoon: fill water containers, bring in loose things, switch off the main power if flooding starts.", ceb: "Sa dili pa ang bagyo: pun-a ang sudlanan sa tubig, sulod-a ang luag nga butang, patya ang main switch kung mosugod ang baha." },
    { en: "After: stay away from fallen power lines and floodwater. Boil drinking water.", ceb: "Human: likayi ang nahulog nga linya sa kuryente ug tubig-baha. Pabukala ang imnon nga tubig." }
  ] },
  { id: "rain", months: [12, 1, 2], en: "Cooler, rainy months (December to February)", ceb: "Bugnaw ug maulan nga mga bulan (Disyembre hangtud Pebrero)", items: [
    { en: "Heavy rain can cause floods and landslides in Eastern Visayas. Watch the slopes and the river.", ceb: "Ang kusog nga ulan mahimong hinungdan sa baha ug pagguba sa bakilid sa Sidlakang Bisayas. Bantayi ang bakilid ug sapa." },
    { en: "Keep dry clothes and blankets in plastic bags.", ceb: "Tipigi sa plastik nga bag ang uga nga sinina ug habol." },
    { en: "Keep the go-bag ready. Floods can come at night.", ceb: "Andama ang go-bag. Ang baha mahimong moabot sa gabii." },
    { en: "Once a year: update documents, photos and phone numbers, and replace stored water.", ceb: "Kausa sa usa ka tuig: i-update ang dokumento, hulagway ug numero sa telepono, ug ilisi ang gitipigan nga tubig." },
    { en: "Dry your shoes and wet clothes, and keep food off the floor to stop mold.", ceb: "Pauga-a ang sapatos ug basa nga sinina, ug ayaw ibutang ang pagkaon sa salog aron dili mag-amag." }
  ] }
];
