/* Handa: Bisaya (Cebuano) for the rest of the app: Plan, Levels, Family, Comms, Drill, Settings.
   How it works: after every screen is drawn, translateDom() swaps each English line that has an entry
   below (X = exact lines, RX = lines with numbers in them). Lines with no entry stay English.
   Written by Claude, not by a native speaker: please have a Bisaya speaker read it. Fix a line by editing it here. */

const X = {};
const addX = (pairs) => pairs.forEach(([a, b]) => { X[a] = b; });

/* ---- shell, settings, Plan ---- */
addX([
  ["Prep for survival", "Pag-andam para sa kaluwasan"],
  ["Andam", "Andam"],
  ["Close", "Isira"],
  ["Family", "Pamilya"],
  ["Remove", "Tangtanga"],
  ["Can't save for offline here: this address is not https. Use the https web address, or the one-file copy.", "Dili ma-save para sa offline dinhi: dili https kini nga address. Gamita ang https nga web address, o ang usa ka file nga kopya."],
  ["Offline saving failed: a file is missing on the web host. Upload every file in the folder, including icons and fonts.", "Napakyas ang pag-save para sa offline: naay file nga kulang sa web host. I-upload ang tanang file sa folder, apil ang icons ug fonts."],
  ["Offline mode could not start. This browser or page may block it.", "Wala masugdan ang offline mode. Posibleng gibabagan kini sa browser o panid."],
  ["Not saved for offline yet. Reload once with internet. If this stays, the files are not on an https address, or this browser blocks saving.", "Wala pa ma-save para sa offline. I-reload kausa nga naay internet. Kung magpabilin kini, ang mga file wala sa https nga address, o gibabagan sa browser ang pag-save."],
  ["This single file works without internet", "Kini nga usa ka file mugana bisan walay internet"],
  ["Offline mode could not start.", "Wala masugdan ang offline mode."],
  ["Settings", "Mga setting"],
  ["Settings and backup", "Mga setting ug backup"],
  ["Look", "Hitsura"],
  ["Theme", "Tema"],
  ["Match my phone", "Sundon ang telepono"],
  ["Light", "Hayag"],
  ["Dark", "Ngitngit"],
  ["Text size", "Gidak-on sa letra"],
  ["Normal", "Normal"],
  ["Large", "Dako"],
  ["Extra large", "Dako kaayo"],
  ["Language / Pinulongan", "Pinulongan / Language"],
  ["English", "English"],
  ["Bisaya", "Bisaya"],
  ["Animations", "Mga animation"],
  ["On (follow my phone's setting)", "Naka-on (sundon ang setting sa telepono)"],
  ["Off (saves battery)", "Naka-off (makatipid og baterya)"],
  ["Install on this phone", "I-install sa kini nga telepono"],
  ["Checking…", "Gisusi…"],
  ["Ready: works without internet", "Andam na: mugana bisan walay internet"],
  ["Android (Chrome): menu ⋮, then “Install app” or “Add to Home screen”. iPhone (Safari): Share button, then “Add to Home Screen”. Open the app once with internet so it can save itself for offline use.",
   "Android (Chrome): menu ⋮, dayon “Install app” o “Add to Home screen”. iPhone (Safari): Share button, dayon “Add to Home Screen”. Ablihi ang app kausa nga naay internet aron makatipig kini sa iyang kaugalingon para magamit nga walay internet."],
  ["Install Andam", "I-install ang Andam"],
  ["Send this app to another phone", "Ipadala kini nga app sa lain nga telepono"],
  ["Works with no internet and no power grid. It packs the whole app into one file (Andam.html). Pick Bluetooth or Nearby Share in the menu that opens. The other person opens the file in Chrome.",
   "Mugana bisan walay internet ug walay kuryente. Gihimo niini ang tibuok app nga usa ra ka file (Andam.html). Pili og Bluetooth o Nearby Share sa menu nga mabuksan. Ablihon sa kaila ang file sa Chrome."],
  ["Send this app", "Ipadala kini nga app"],
  ["Getting the app ready…", "Gihimo pa ang app…"],
  ["Couldn't prepare the file. Open the app once with internet, then try again.", "Wala mahimo ang file. Ablihi ang app kausa nga naay internet, dayon sulayi pag-usab."],
  ["Saved as Andam.html in your Downloads. Send it with Bluetooth, Nearby Share or a USB stick.", "Na-save isip Andam.html sa Downloads. Ipadala pinaagi sa Bluetooth, Nearby Share o USB stick."],
  ["Back up your entries", "I-backup ang imong gisulat"],
  ["Everything you type is saved only on this phone. If you change phones, copy this backup and paste it into the new one. Photos you add to a guide stay on this phone and are not in the backup.",
   "Ang tanan nimong gisulat naa ra niining telepono. Kung mulisod ka og telepono, kopyaha kining backup ug i-paste sa bag-o. Ang mga hulagway nga imong gidugang sa giya naa ra niining telepono ug wala sa backup."],
  ["Copy backup", "Kopyaha ang backup"],
  ["Download file", "I-download ang file"],
  ["Restore from a backup", "Ibalik gikan sa backup"],
  ["Restore", "Ibalik"],
  ["Print", "I-print"],
  ["Prints the page you are on, with every section open. Save as PDF to keep a copy.",
   "Ipa-print ang panid nga imong gibuksan, nga bukas ang tanang bahin. I-save isip PDF aron naay kopya."],
  ["Print this page", "I-print kini nga panid"],
  ["Start over", "Sugdi pag-usab"],
  ["Erase everything on this phone", "Papasa ang tanan niining telepono"],
  ["About", "Mahitungod"],
  ["Andam means “ready” in Bisaya. Nothing you enter leaves this phone. Peso figures come from Philippine shop listings seen in November 2026 and will change. Radio and satellite rules come from NTC circulars and news reports: confirm with the NTC or an authorized dealer before you buy.",
   "Ang Andam mao ang pulong sa Bisaya para sa “ready”. Walay imong gisulat nga mawagtang gikan niining telepono. Ang mga presyo sa piso gikan sa mga listahan sa tindahan sa Pilipinas nga nakita sa Nobyembre 2026 ug mausab. Ang mga lagda sa radyo ug satellite gikan sa mga sirkular sa NTC ug balita: pagpamatuod sa NTC o sa awtorisadong dealer sa dili pa mopalit."],
  ["Paste a backup here", "I-paste dinhi ang backup"],
  ["Backup text", "Teksto sa backup"],
  ["Choose a backup file", "Pili og backup nga file"],
  ["Main", "Panguna"],
  ["Budget", "Badyet"],
  ["Filters", "Mga filter"],
  ["Goal", "Tumong"],
  ["When", "Kanus-a"],

  /* Plan */
  ["Readiness plan", "Plano sa pag-andam"],
  ["Check things off as you get them. Start with the yellow “Start now” items: they are the cheapest and matter most.",
   "Markahi ang mga butang kung naa na mo niini. Sugdi sa dilaw nga mga “Sugdi karon”: sila ang pinakabaratohon ug pinakaimportante."],
  ["Start now", "Sugdi karon"],
  ["Next", "Sunod"],
  ["Later", "Unya"],
  ["All", "Tanan"],
  ["Next up", "Sunod nga buhaton"],
  ["Everything is checked", "Natsek na ang tanan"],
  ["Run a drill and see what still fails.", "Mag-praktis ug tan-awa kung unsay napakyas gihapon."],
  ["Prices you entered", "Mga presyo nga imong gibutang"],
  ["Already bought", "Napalit na"],
  ["Still to buy", "Pamalitonon pa"],
  ["Open Details on an item and type the price you found, then the monthly amount shows here.",
   "Ablihi ang Detalye sa usa ka butang ug isulat ang presyo nga imong nakita, dayon makita dinhi ang kantidad kada bulan."],
  ["Details", "Detalye"],
  ["Hide", "Tagoa"],
  ["Examples", "Mga pananglitan"],
  ["Where to buy", "Asa mopalit"],
  ["Price seen (Nov 2026)", "Presyo nga nakita (Nob 2026)"],
  ["Tip", "Tambag"],
  ["Price you found or paid (₱)", "Presyo nga imong nakita o gibayad (₱)"],
  ["Your note", "Imong nota"],
  ["Where you bought it, how many, brand", "Asa gipalit, pila, brand"],
  ["Add your own item", "Idugang ang imong kaugalingong butang"],
  ["Rice, canned sardines, medicine", "Bugas, sardinas nga lata, tambal"],
  ["Add", "Idugang"],
  ["Remove this item", "Tangtanga kini nga butang"],
  ["Nothing matches this filter. Try “All”.", "Walay mohaom niini nga filter. Sulayi ang “Tanan”."],
  ["The cost tag is the rough price of one item. Peso figures in Details come from Philippine shop listings seen in November 2026. Prices change, so check before you buy.",
   "Ang tag sa gasto mao ang kasagarang presyo sa usa ka butang. Ang mga presyo sa piso sa Detalye gikan sa mga listahan sa tindahan sa Pilipinas nga nakita sa Nobyembre 2026. Mausab ang presyo, busa susiha una sa dili pa mopalit. Ang mga detalye sa matag butang naa pa sa English."],
  ["Free", "Libre"],
  ["Under ₱500", "Ubos sa ₱500"],
  ["₱500–5,000", "₱500–5,000"],
  ["Over ₱5,000", "Sobra sa ₱5,000"],
  ["Estimate", "Banabana"],
  ["Not started", "Wala pa nasugdan"],
  ["Add an item", "Dugang og butang"],

  /* Family */
  ["Everything here stays on this phone. Fill it in with your family and keep a paper copy too.",
   "Ang tanan dinhi naa ra niining telepono. Pun-a uban sa imong pamilya ug magtipig usab og kopya sa papel."],
  ["Where we meet", "Asa kita magkitaay"],
  ["First choice: near home", "Unang pili: duol sa balay"],
  ["Second choice: outside the neighborhood", "Ikaduhang pili: gawas sa kasilinganan"],
  ["Out-of-town place, if we can't come home", "Lugar sa gawas sa lungsod, kung dili kita makauli"],
  ["Contact outside the area", "Kontak sa gawas sa lugar"],
  ["One relative or friend far away whom everyone calls or texts when local lines are jammed.",
   "Usa ka paryente o higala nga layo nga tawgan o tekstan sa tanan kung busy ang lokal nga linya."],
  ["Name", "Ngalan"],
  ["Phone", "Telepono"],
  ["Call", "Tawag"],
  ["Text", "Teksto"],
  ["People", "Mga tawo"],
  ["Health and needs (allergies, medicines, blood type)", "Panglawas ug panginahanglan (alerhiya, tambal, blood type)"],
  ["Go bag is packed", "Naka-empake na ang go bag"],
  ["Add a person", "Dugang og tawo"],
  ["Emergency numbers", "Mga numero sa emerhensya"],
  ["Who", "Kinsa"],
  ["Number", "Numero"],
  ["Add your barangay, rural health unit, municipal DRRM office, and the nearest hospital.",
   "Idugang ang inyong barangay, rural health unit, municipal DRRM office, ug ang pinakaduol nga ospital."],
  ["Add a number", "Dugang og numero"],
  ["For example, the church yard or the barangay hall", "Pananglitan, ang tugkaran sa simbahan o ang barangay hall"],
  ["High ground", "Taas nga dapit"],
  ["National emergency hotline", "Nasyonal nga hotline sa emerhensya"],
  ["Philippine Red Cross", "Philippine Red Cross"],
  ["Philippine National Police", "Philippine National Police"],
  ["NDRRMC operations center", "NDRRMC operations center"],

  /* Comms */
  ["Communication plan", "Plano sa komunikasyon"],
  ["Phones will fail first. Work down this list from short range to long range, and test each layer before you need it.",
   "Ang mga telepono ang unang mapakyas. Sunda kining lista gikan sa duol ngadto sa layo, ug sulayi ang matag lebel sa dili pa kini kinahanglanon."],
  ["Check-in", "Check-in"],
  ["Daily check-in time", "Oras sa adlaw-adlaw nga check-in"],
  ["Radio channel or frequency", "Channel o frequency sa radyo"],
  ["Code words (safe, need help, moving to the meeting place)", "Mga code word (luwas, kinahanglan og tabang, mobalhin sa lugar nga magkitaay)"],
  ["We have this working", "Mugana na kini namo"],
  ["Notes", "Mga nota"],
  ["Radios and satellite devices are regulated by the NTC. Buy from authorized dealers and check the rules first. The gear is listed under “Phones and communication” in the plan.",
   "Ang mga radyo ug satellite device gi-regulate sa NTC. Palit sa awtorisadong dealer ug susiha una ang mga lagda. Ang mga gamit naa sa “Mga telepono ug komunikasyon” sa plano."],
  ["For example, 6:00 PM every day", "Pananglitan, 6:00 sa gabii matag adlaw"],
  ["Who has it, channel, settings", "Kinsay naa niini, channel, setting"],

  /* Drill */
  ["24-hour drill", "24-oras nga praktis"],
  ["A drill shows what really fails. Do one every six months and fix the biggest gap first.",
   "Ang praktis nagpakita kung unsay tinuod nga napakyas. Buhata kini matag unom ka bulan ug ayoha una ang pinakadako nga kulang."],
  ["What happened", "Unsay nahitabo"],
  ["Date of the last drill", "Petsa sa katapusang praktis"],
  ["What failed or was missing", "Unsay napakyas o nawala"],
  ["Clear the steps for the next drill", "Papasa ang mga lakang para sa sunod nga praktis"],
  ["For example, no can opener, router wouldn't power on, radio batteries dead",
   "Pananglitan, walay can opener, wala misiga ang router, patay ang baterya sa radyo"],

  /* Levels */
  ["Levels", "Lebel"],
  ["Pick how long you want to last. Every area is a ladder from small to big. Tick each step when your family has it.",
   "Pili kung hangtod kanus-a nimo gusto molahutay. Ang matag area usa ka hagdan gikan sa gamay ngadto sa dako. I-tsek ang matag lakang kung naa na kini sa inyong pamilya."],
  ["How many people are you planning for?", "Pila ka tawo ang imong giplanohan?"],
  ["Your goal", "Imong tumong"],
  ["Next steps toward your goal", "Sunod nga mga lakang padulong sa imong tumong"],
  ["Goal reached in every area", "Naabot ang tumong sa tanang area"],
  ["Raise your goal to the next level.", "Itaas ang imong tumong sa sunod nga lebel."],
  ["Step-by-step guides", "Lakang-lakang nga mga giya"],
  ["Open this area.", "Ablihi kini nga area."],
  ["Peso figures are Philippine listings seen in November 2026. “Estimate” means my rule of thumb, not a quoted price. Check locally before you buy or build.",
   "Ang mga presyo sa piso gikan sa mga listahan sa Pilipinas nga nakita sa Nobyembre 2026. Ang “Banabana” nagpasabot nga akong lagda-lagda, dili kini kinutlo nga presyo. Susiha sa inyong dapit sa dili pa mopalit o magtukod. Ang mga detalye sa sulod sa matag lakang naa pa sa English."],
  ["Days", "Mga adlaw"], ["Weeks", "Mga semana"], ["Months", "Mga bulan"], ["Years", "Mga tuig"],
  ["up to 2 weeks", "hangtod 2 ka semana"], ["2 to 8 weeks", "2 hangtod 8 ka semana"],
  ["2 to 12 months", "2 hangtod 12 ka bulan"], ["a year or more", "usa ka tuig o labaw pa"],
  ["Tiny", "Gamayng-gamay"], ["Small", "Gamay"], ["Medium", "Tunga-tunga"], ["Large", "Dako"], ["Farm", "Umahan"],
  ["Source", "Tinubdan"], ["Short", "Duol"], ["Long", "Layo"], ["Global", "Tibuok kalibutan"], ["Skills", "Kahibalo"]
]);

/* ---- the 100 plan items and 11 categories ---- */
addX([
  ["Water", "Tubig"],
  ["Plan on 4 liters per person per day for drinking and basic washing. Three days is the minimum.", "Plana og 4 ka litro matag tawo kada adlaw para sa pag-inom ug sukaranang paghugas. Ang 3 ka adlaw mao ang pinakagamay."],
  ["Store drinking water: 4 liters per person per day, at least 3 days", "Tipigi ang tubig nga imnon: 4 ka litro matag tawo kada adlaw, labing menos 3 ka adlaw"],
  ["Clean containers with tight lids (jugs, jerry cans, covered drums)", "Limpyo nga sudlanan nga hugot ang taklob (garon, jerry can, drum nga naay taklob)"],
  ["Learn to make water safe: boil for 1 minute, or use plain unscented bleach", "Pagkat-on unsaon pagpaluwas sa tubig: pabukala sulod sa 1 ka minuto, o gamita ang plain nga bleach nga walay baho"],
  ["Know your backup water source (well, spring, neighbor's pump) and how to carry water", "Ilha ang imong backup nga tinubdan sa tubig (atabay, bukal, bomba sa silingan) ug unsaon pagbitbit sa tubig"],
  ["Portable water filter for each household", "Portable nga water filter matag panimalay"],
  ["Catch rainwater: clean drum with cover, plus a tarp or gutter", "Salaga ang tubig-ulan: limpyo nga drum nga naay taklob, dugang trapal o alulod"],
  ["Extend your water store to 7 days or more", "Dugangi ang inyong tinipigang tubig ngadto sa 7 ka adlaw o labaw pa"],

  ["Food and cooking", "Pagkaon ug pagluto"],
  ["Store what your family already eats, and rotate it. Start with 2 weeks, then build up.", "Tipigi ang pagkaon nga gikaon na sa inyong pamilya, ug usba-usba kini. Sugdi sa 2 ka semana, dayon dugangi."],
  ["Rice: one or two sacks, in sealed bins off the floor", "Bugas: usa o duha ka sako, sa sirado nga sudlanan ug dili sa salog"],
  ["Protein that keeps without a fridge: canned fish or meat, or mongo, beans, peanut butter, soy chunks", "Protina nga dili madunot bisan walay ref: lata nga isda o karne, o mongo, beans, peanut butter, soy chunks"],
  ["Dried fish, salt, sugar, cooking oil, vinegar, soy sauce", "Pinikas nga isda, asin, asukar, lana sa pagluto, suka, toyo"],
  ["Instant noodles, oatmeal, crackers, and biscuits", "Instant noodles, oatmeal, crackers, ug biskwit"],
  ["Airtight bins for rice and dry goods (rodent- and moisture-proof)", "Hugot nga sudlanan para sa bugas ug uga nga pagkaon (dili maabot sa ilaga ug alaiyon)"],
  ["Manual can opener", "Manwal nga can opener"],
  ["Portable butane stove and spare butane canisters", "Portable nga butane stove ug dugang butane canister"],
  ["Matches and lighters in a waterproof container", "Posporo ug lighter sa sudlanan nga dili mabasa"],
  ["Start a food garden: kangkong, kamote, malunggay, pechay, banana, cassava", "Pagsugod og tanaman sa pagkaon: kangkong, kamote, malunggay, pechay, saging, kamoteng kahoy"],
  ["Save seeds and cuttings in sealed, dry jars", "Tipigi ang liso ug pinutol nga tanom sa sirado ug uga nga garapon"],
  ["Plant a typhoon-tough row outside: kamote, cassava, gabi, banana", "Tanom og laray sa gawas nga kusgan batok sa bagyo: kamote, kamoteng kahoy, gabi, saging"],
  ["Try sprouting mongo beans indoors: ready in 3–5 days with no soil or sun", "Sulayi ang pagpatubo og mongo sa sulod sa balay: andam sulod sa 3–5 ka adlaw nga walay yuta o adlaw"],
  ["Powdered milk, 3-in-1 coffee, and a few comfort foods", "Gatas nga pulbos, 3-in-1 nga kape, ug pipila ka paborito nga pagkaon"],
  ["Build up to 4 weeks of stored food", "Dugangi hangtod 4 ka semana nga tinipigang pagkaon"],

  ["Medical and hygiene", "Medikal ug kalimpyo"],
  ["Check labels and expiry dates. For prescription medicine, ask your doctor or the rural health unit.", "Basaha ang label ug petsa sa pagkahurot. Alang sa tambal nga reseta, pangutana sa imong doktor o sa rural health unit."],
  ["First-aid kit: bandages, gauze, tape, scissors, tweezers, gloves", "First-aid kit: bendahe, gauze, tape, gunting, sipit, gwantes"],
  ["Wound care: povidone-iodine (Betadine), 70% alcohol, saline solution", "Pag-atiman sa samad: povidone-iodine (Betadine), 70% nga alkohol, saline solution"],
  ["Pain and fever medicine: paracetamol (Biogesic), ibuprofen (Medicol, Advil)", "Tambal sa sakit ug hilanat: paracetamol (Biogesic), ibuprofen (Medicol, Advil)"],
  ["Oral rehydration salts (Hydrite) and loperamide (Diatabs)", "Oral rehydration salts (Hydrite) ug loperamide (Diatabs)"],
  ["Allergy and cold medicine: cetirizine, Neozep or similar", "Tambal sa alerhiya ug sip-on: cetirizine, Neozep o susama"],
  ["One-month reserve of any regular prescription medicines", "Usa ka bulan nga reserba sa bisan unsang regular nga tambal nga reseta"],
  ["Mosquito net (kulambo) and insect repellent, for dengue", "Kulambo ug tambal batok sa lamok, para sa dengue"],
  ["Hygiene: soap, alcohol, toothbrushes, sanitary napkins, toilet paper, garbage bags", "Kalimpyo: sabon, alkohol, sipilyo, napkin, toilet paper, plastik sa basura"],
  ["A medical info card for each person: blood type, allergies, medicines, doctor", "Medical info card matag tawo: blood type, alerhiya, tambal, doktor"],
  ["Thermometer, blood pressure monitor, N95 masks, gloves", "Thermometer, blood pressure monitor, N95 nga maskara, gwantes"],
  ["Take a first aid and CPR course", "Moapil og kurso sa first aid ug CPR"],
  ["Ask your doctor or health center about leptospirosis prevention before flood season", "Pangutana sa imong doktor o health center bahin sa pagpugong sa leptospirosis sa dili pa ang panahon sa baha"],
  ["Spare eyeglasses and hearing aid batteries, if needed", "Dugang nga eyeglass ug baterya sa hearing aid, kung kinahanglan"],

  ["Power and light", "Kuryente ug suga"],
  ["Start with lights, radio, and power banks. Add solar and a power station as your budget allows.", "Sugdi sa suga, radyo, ug power bank. Dugangi og solar ug power station kung kaya sa badyet."],
  ["A flashlight or headlamp for each person, plus spare batteries", "Flashlight o headlamp matag tawo, dugang ang ekstrang baterya"],
  ["Hand-crank or solar AM/FM radio for weather bulletins and news", "AM/FM nga radyo nga hand-crank o solar para sa bulletin sa panahon ug balita"],
  ["Power banks: one 20,000 mAh per person, kept charged", "Power bank: usa ka 20,000 mAh matag tawo, panalipdi nga puno ang charge"],
  ["Solar lights and rechargeable LED lanterns", "Solar nga suga ug rechargeable nga LED lantern"],
  ["Charging cables for every phone type, plus a car charger", "Charging cable para sa matag klase sa telepono, dugang car charger"],
  ["Rechargeable AA and AAA batteries with a charger", "Rechargeable nga AA ug AAA nga baterya uban ang charger"],
  ["Small power station (about 100–320 Wh) for phones, radio, router, and lights", "Gamay nga power station (mga 100–320 Wh) para sa telepono, radyo, router, ug suga"],
  ["Foldable 100 W solar panel to recharge it", "Mapilo nga 100 W nga solar panel aron i-recharge kini"],
  ["Larger power station (500–1,000 Wh) to run the NOMAD server, router, and a fan", "Mas dako nga power station (500–1,000 Wh) para sa NOMAD server, router, ug bentilador"],
  ["More solar capacity (200–400 W) and a safe way to mount it", "Dugang solar (200–400 W) ug luwas nga paagi sa pagkabit niini"],
  ["Surge protector or AVR for the NOMAD server and router", "Surge protector o AVR para sa NOMAD server ug router"],
  ["Fuel stored safely, if you own a generator or gas stove", "Luwas nga tinipigang gasolina, kung naay generator o gas stove"],

  ["Shelter and safety", "Puy-anan ug kaluwasan"],
  ["Know where to go before you need to. Typhoons, floods, and earthquakes each need a different plan.", "Ilha kung asa moadto sa dili pa kini kinahanglanon. Ang bagyo, baha, ug linog nanginahanglan og lain-laing plano."],
  ["Know your safest room, two exit routes, and the nearest evacuation center", "Ilha ang pinakaluwas nga kwarto, duha ka agianan sa gawas, ug ang pinakaduol nga evacuation center"],
  ["A whistle for each person", "Pito matag tawo"],
  ["Tarpaulin (trapal), rope, nylon cord, duct tape, and cable ties", "Trapal, pisi, nylon cord, duct tape, ug cable tie"],
  ["Raincoat, rubber boots, and work gloves for each adult", "Kapote, botas nga goma, ug gwantes sa trabaho matag hamtong"],
  ["Waterproof dry bag or sealed container for documents and electronics", "Dry bag nga dili mabasa o sirado nga sudlanan para sa dokumento ug electronics"],
  ["Basic tools: hammer, nails, handsaw, bolo, pliers, screwdrivers", "Sukaranang himan: martilyo, lansang, lagari, bolo, plais, distornilyador"],
  ["Sleeping mats (banig) and blankets for each person", "Banig ug habol matag tawo"],
  ["Fire extinguisher (ABC type) and a smoke alarm", "Fire extinguisher (ABC) ug smoke alarm"],
  ["Secure the roof and trim big branches before typhoon season", "Siguroha ang atop ug putla ang dagko nga sanga sa dili pa ang panahon sa bagyo"],

  ["Go bags (one per person)", "Go bag (usa matag tawo)"],
  ["Pack enough for 3 days in a waterproof bag you can carry. Keep it near the door and refresh it every 3 months.", "Empaki ang igo para sa 3 ka adlaw sa bag nga dili mabasa ug mabitbit nimo. Ibutang duol sa pultahan ug usba matag 3 ka bulan."],
  ["Water (1–2 liters) and a way to purify more", "Tubig (1–2 ka litro) ug paagi sa pagpanglimpyo og dugang"],
  ["Ready-to-eat food for 3 days: biscuits, canned food, energy bars", "Andam nga kaonon para sa 3 ka adlaw: biskwit, de-lata, energy bar"],
  ["Flashlight, whistle, power bank, and a small radio", "Flashlight, pito, power bank, ug gamay nga radyo"],
  ["Small first-aid kit and 3 days of personal medicine", "Gamay nga first-aid kit ug tambal para sa 3 ka adlaw"],
  ["Change of clothes, towel, raincoat, and slippers", "Bayhon nga bisti, tualya, kapote, ug tsinelas"],
  ["Copies of IDs in sealed plastic, plus cash", "Kopya sa mga ID sa sirado nga plastik, dugang kuwarta"],
  ["Mask, alcohol, soap, and sanitary items", "Maskara, alkohol, sabon, ug gamit sa kalimpyo"],
  ["Check and refresh every go bag every 3 months", "Susiha ug usba ang matag go bag kada 3 ka bulan"],

  ["Documents and money", "Dokumento ug kuwarta"],
  ["When power and signal fail, paper and cash still work.", "Kung mapakyas ang kuryente ug signal, mugana gihapon ang papel ug kuwarta."],
  ["Copies of IDs, PSA birth and marriage certificates, land title or tax declaration, and school and medical records", "Kopya sa mga ID, PSA birth ug marriage certificate, titulo sa yuta o tax declaration, ug rekord sa eskwelahan ug medikal"],
  ["Write down account numbers: PhilHealth, SSS or GSIS, insurance. Never write PINs or passwords.", "Isulat ang mga account number: PhilHealth, SSS o GSIS, insurance. Ayaw isulat ang PIN o password."],
  ["Cash in small bills (₱20, ₱50, ₱100, ₱500), enough for at least a week", "Kuwarta sa gagmay nga papel (₱20, ₱50, ₱100, ₱500), igo para sa labing menos usa ka semana"],
  ["Digital copies of documents on a USB drive and on the NOMAD server", "Digital nga kopya sa dokumento sa USB drive ug sa NOMAD server"],
  ["A paper list of emergency numbers and addresses", "Papel nga lista sa mga numero ug address sa emerhensya"],

  ["Phones and communication", "Mga telepono ug komunikasyon"],
  ["Layer your options: your phones first, then local radios, then long-range. See the Comms tab for the plan.", "Pagpatong-patonga ang imong mga kapilian: telepono una, dayon lokal nga radyo, dayon layo nga abot. Tan-awa ang Komunikasyon nga tab para sa plano."],
  ["A paper contact list with every family member's numbers and addresses", "Papel nga lista sa kontak nga naa ang numero ug address sa matag miyembro sa pamilya"],
  ["Agree on meeting places and a daily check-in time (see the Comms tab)", "Pagkauyon sa lugar nga magkitaay ug oras sa adlaw-adlaw nga check-in (tan-awa ang Komunikasyon nga tab)"],
  ["SIMs from two networks (Globe and Smart or DITO) so one outage doesn't cut you off", "SIM gikan sa duha ka network (Globe ug Smart o DITO) aron kung maguba ang usa, dili ka maputlan"],
  ["Globe SIM in an Android phone supported by Starlink satellite-to-phone service", "Globe SIM sa Android nga telepono nga gisuportahan sa satellite-to-phone nga serbisyo sa Starlink"],
  ["A basic keypad phone with a long-lasting battery, kept charged as a backup", "Sukaranang keypad nga telepono nga dugay ang baterya, panalipdi nga puno ang charge isip backup"],
  ["Install an offline phone-to-phone messaging app (such as Briar) on family phones, and test it", "Mag-install og offline nga phone-to-phone messaging app (sama sa Briar) sa mga telepono sa pamilya, ug sulayi kini"],
  ["Handheld two-way radios, bought only from an NTC-authorized radio dealer", "Handheld nga two-way radio, palita ra sa NTC-authorized nga dealer sa radyo"],
  ["Meshtastic text nodes for talking across your barangay", "Meshtastic text node para sa pag-estorya sa tibuok barangay"],
  ["Satellite messenger (Garmin inReach or ZOLEO) with a monthly plan, if sold and allowed here", "Satellite messenger (Garmin inReach o ZOLEO) nga naay binulan nga plano, kung gibaligya ug gitugotan dinhi"],
  ["Satellite phone from an authorized provider", "Satellite phone gikan sa awtorisadong provider"],
  ["Study for the NTC amateur radio license and join a local ham club (PARA)", "Pag-eskwela para sa NTC amateur radio license ug moapil sa lokal nga ham club (PARA)"],

  ["Maps and information", "Mapa ug impormasyon"],
  ["Download first, while you still have internet.", "I-download una, samtang naay internet pa."],
  ["Download offline maps of Leyte and the Philippines on every phone", "I-download ang offline nga mapa sa Leyte ug Pilipinas sa matag telepono"],
  ["Check hazard maps for your barangay (flood, landslide, earthquake, storm surge) and save screenshots", "Susiha ang hazard map sa inyong barangay (baha, pagdahili sa yuta, linog, storm surge) ug i-save ang screenshot"],
  ["Get a printed map of your municipality with evacuation routes", "Pagkuha og giprint nga mapa sa inyong munisipyo nga naay agianan sa evacuation"],
  ["Print the key guides from the Guides tab (water, first aid, typhoon, earthquake)", "I-print ang mga importanteng giya gikan sa Giya nga tab (tubig, first aid, bagyo, linog)"],
  ["Save official sources for offline reading: PAGASA, PHIVOLCS, NDRRMC, Philippine Red Cross", "I-save ang opisyal nga tinubdan para mabasa nga walay internet: PAGASA, PHIVOLCS, NDRRMC, Philippine Red Cross"],

  ["Project NOMAD server", "Project NOMAD server"],
  ["Your offline library: Wikipedia, maps, medical references, and an AI assistant. Needs at least 5 GB free, and about 25 GB with the AI.", "Imong librarya nga walay internet: Wikipedia, mapa, medikal nga reperensya, ug AI assistant. Nanginahanglan og labing menos 5 GB nga bakante, ug mga 25 GB kung naa ang AI."],
  ["Computer for the server: a low-power mini PC or used laptop with 8–16 GB RAM", "Kompyuter para sa server: gamay ug dili tag-as og kuryente nga mini PC o gamit na nga laptop nga naay 8–16 GB RAM"],
  ["SSD of 1–2 TB for the server", "SSD nga 1–2 TB para sa server"],
  ["Install Ubuntu, then Project N.O.M.A.D. (steps are in your chat notes)", "I-install ang Ubuntu, dayon ang Project N.O.M.A.D. (ang mga lakang naa sa imong chat notes)"],
  ["Download Wikipedia, Philippine maps, medical references, and courses", "I-download ang Wikipedia, mapa sa Pilipinas, medikal nga reperensya, ug mga kurso"],
  ["Add your own files: typhoon and earthquake guides, farming guides, family documents, church materials", "Idugang ang imong mga file: giya sa bagyo ug linog, giya sa pagpanguma, dokumento sa pamilya, materyales sa simbahan"],
  ["A Wi-Fi router so phones can reach the server without internet", "Wi-Fi router aron maabot sa mga telepono ang server bisan walay internet"],
  ["Backup drive with a second copy, stored in a different place", "Backup drive nga naay ikaduhang kopya, gitipigan sa lahi nga lugar"],
  ["Test: switch off the internet and use NOMAD from a phone", "Pagsulay: ipalong ang internet ug gamita ang NOMAD gikan sa telepono"],
  ["Run the server from your power station and measure how long it lasts", "Padagana ang server gikan sa imong power station ug sukda kung unsa kadugay kini molahutay"],

  ["Skills and community", "Kahibalo ug komunidad"],
  ["In a long emergency, neighbors and skills matter more than stored supplies.", "Sa taas nga emerhensya, mas importante ang silingan ug kahibalo kaysa tinipigang gamit."],
  ["Meet your barangay officials and ask about the evacuation plan and drills", "Kitaa ang mga opisyal sa inyong barangay ug pangutana bahin sa plano sa evacuation ug mga praktis"],
  ["Share your plan with your church group and neighbors, and agree who helps whom", "Ipaambit ang imong plano sa grupo sa simbahan ug silingan, ug magkauyon kung kinsay motabang kang kinsa"],
  ["Practice cooking on a stove or fire without electricity", "Pagpraktis sa pagluto sa estufa o kalayo nga walay kuryente"],
  ["Practice treating water, setting up a tarp shelter, and tying basic knots", "Pagpraktis sa pagpaluwas sa tubig, pagtukod og trapal nga puy-anan, ug sukaranang higot"],
  ["Keep tradeable essentials: salt, soap, medicine, batteries, tools", "Tipigi ang mga kinahanglanon nga mabaylo: asin, sabon, tambal, baterya, himan"],
  ["Share seeds and start a community garden with neighbors", "Ipaambit ang liso ug pagsugod og komunidad nga tanaman uban sa silingan"],
  ["Learn basic repairs: roof, plumbing, motorcycle or bicycle", "Pagkat-on og sukaranang pag-ayo: atop, tubo, motorsiklo o bisikleta"]
]);

/* ---- drill steps and radio layers ---- */
addX([
  ["Pick a day and tell the whole family what you are testing", "Pili og adlaw ug sultihi ang tibuok pamilya kung unsay inyong sulayan"],
  ["Keep one phone on for real emergencies. Switch off the main power and put the other phones on airplane mode.", "Pabilin nga bukas ang usa ka telepono para sa tinuod nga emerhensya. Ipalong ang main nga kuryente ug ibutang sa airplane mode ang ubang telepono."],
  ["Use only stored water and food for 24 hours", "Gamita ra ang tinipigang tubig ug pagkaon sulod sa 24 ka oras"],
  ["Cook one meal without electricity, outdoors or with good ventilation", "Magluto og usa ka pagkaon nga walay kuryente, sa gawas o naay maayong hangin"],
  ["Try to reach each other using your Comms plan, then go to your meeting place", "Sulayi ang pag-abot sa usag usa gamit ang inyong plano sa Komunikasyon, dayon adto sa inyong lugar nga magkitaay"],
  ["Connect a phone to the NOMAD server over the router, without internet", "Ikonekta ang telepono sa NOMAD server pinaagi sa router, nga walay internet"],
  ["Open each go bag, check expiry dates, and note what is missing", "Ablihi ang matag go bag, susiha ang petsa sa pagkahurot, ug sulati unsay kulang"],
  ["Run the router and a phone charger from the power station and note how long it lasts", "Padagana ang router ug charger sa telepono gikan sa power station ug sulati kung unsa kadugay kini molahutay"],
  ["Write down everything that failed, then fix the biggest gap first", "Isulat ang tanan nga napakyas, dayon ayoha una ang pinakadako nga kulang"],

  ["Inside your home: NOMAD Wi-Fi", "Sulod sa inyong balay: NOMAD Wi-Fi"],
  ["A router with no internet lets every phone reach the server and, with the right apps, each other.", "Ang router nga walay internet nagtugot sa matag telepono nga makaabot sa server ug, uban sa saktong apps, sa usag usa."],
  ["Your house and yard", "Inyong balay ug tugkaran"],
  ["Phone networks on two SIMs", "Network sa telepono sa duha ka SIM"],
  ["Keep a Globe and a Smart or DITO SIM. If Globe has Starlink satellite-to-phone service for your phone, it works for text when towers are down.", "Pagbaton og Globe ug Smart o DITO nga SIM. Kung ang Globe naay Starlink satellite-to-phone nga serbisyo para sa imong telepono, mugana kini para sa teksto kung nahugno ang mga tore."],
  ["Wherever a network works", "Bisan asa naay network"],
  ["Phone-to-phone messaging", "Phone-to-phone nga mensahe"],
  ["Apps such as Briar link phones directly by Bluetooth or Wi-Fi. Install and test them now.", "Ang mga app sama sa Briar nagdugtong sa mga telepono direkta pinaagi sa Bluetooth o Wi-Fi. I-install ug sulayi kini karon."],
  ["Tens of meters", "Napulo ka metro"],
  ["Handheld radios", "Handheld nga radyo"],
  ["Voice between family members nearby. Buy from an NTC-authorized dealer so each unit carries a permit number.", "Tingog taliwala sa mga miyembro sa pamilya nga duol. Palit sa NTC-authorized nga dealer aron ang matag unit naay numero sa permit."],
  ["Several hundred meters to a few km", "Pipila ka gatos ka metro hangtod pipila ka km"],
  ["Meshtastic text nodes", "Meshtastic text node"],
  ["Small LoRa radios that relay text between phones across a barangay or town. Check NTC approval before relying on them.", "Gagmay nga LoRa radio nga nagpasa og teksto taliwala sa mga telepono sa tibuok barangay o lungsod. Susiha ang aprobal sa NTC sa dili pa pagsalig niini."],
  ["A few km, more with relays", "Pipila ka km, mas layo kung naay relay"],
  ["Satellite messenger or satellite phone", "Satellite messenger o satellite phone"],
  ["Reaches family abroad or 1,000 km away. The person on the other end needs a phone number, email, or their own device.", "Moabot sa pamilya sa langyaw o 1,000 km ang gilay-on. Ang tawo sa pikas nanginahanglan og numero sa telepono, email, o kaugalingong device."],
  ["Anywhere with a view of the sky", "Bisan asa nga makita ang langit"],
  ["Amateur (ham) radio", "Amateur (ham) nga radyo"],
  ["The only option with no company or network behind it. Needs an NTC license, a radio, an antenna, and power.", "Ang bugtong kapilian nga walay kompanya o network sa luyo. Nanginahanglan og NTC license, radyo, antenna, ug kuryente."],
  ["Hundreds to thousands of km", "Gatos hangtod libo ka km"],
  ["AM/FM radio (listen only)", "AM/FM nga radyo (patalinghog ra)"],
  ["For PAGASA bulletins, NDRRMC advisories, and local news. Keep a hand-crank or solar radio.", "Para sa bulletin sa PAGASA, advisory sa NDRRMC, ug lokal nga balita. Pagbaton og hand-crank o solar nga radyo."],
  ["Receive only", "Modawat ra"]
]);

/* ---- Levels: area names, intros, step titles ---- */
addX([
  ["Food", "Pagkaon"],
  ["Solar and batteries", "Solar ug baterya"],
  ["Generators and fuel", "Generator ug gasolina"],
  ["Growing food", "Pagtanom og pagkaon"],
  ["Shelter and bunker", "Puy-anan ug bunker"],
  ["Radios and comms", "Radyo ug komunikasyon"],
  ["Medical", "Medikal"],
  ["Cooking fuel", "Sugnod sa pagluto"],
  ["Sanitation", "Kalimpyo"],

  ["Short term you store food. Long term you can't store enough, so you must grow it. Each step builds on the one before.", "Sa mubo nga panahon, magtipig ka og pagkaon. Sa taas nga panahon dili igo ang matipigan, busa kinahanglan nimo kining tanumon. Ang matag lakang nagsukad sa nauna."],
  ["Plan on 4 liters per person per day for drinking and basic washing. Storing it is the easy part; a source you can renew is the long-term answer.", "Plana og 4 ka litro matag tawo kada adlaw para sa pag-inom ug sukaranang paghugas. Ang pagtipig sayon ra; ang tinubdan nga mabag-o mao ang tubag sa taas nga panahon."],
  ["Solar is the only power that keeps working when fuel runs out. Start with a tiny kit, grow to a home system. A 1 kW panel array makes about 3.8 kWh a day in the Philippines (4.5 sun-hours × 0.85 loss).", "Ang solar ra ang kuryente nga mugana gihapon kung maubos ang gasolina. Sugdi sa gamayng kit, ug dayon padakua ngadto sa sistema sa balay. Ang 1 kW nga solar panel naghimo og mga 3.8 kWh kada adlaw sa Pilipinas (4.5 oras nga adlaw × 0.85 nga mawala)."],
  ["A generator is a bridge, not a plan. Fuel is the hard part: months of running need hundreds of liters, so pair it with solar. Connect to house wiring only through a proper transfer switch.", "Ang generator tulay lang, dili plano. Ang gasolina ang lisod: ang pila ka bulan nga pagpadagan nanginahanglan og gatosan ka litro, busa ipares sa solar. Ikonekta sa wiring sa balay pinaagi ra sa saktong transfer switch."],
  ["From a jar on the shelf to a farm. Start small now: the skill and the seeds matter more than the space. Indoor, bunker and outdoor growing are all covered.", "Gikan sa garapon sa estante hangtod sa umahan. Sugdi sa gamay karon: ang kahibalo ug liso mas importante kaysa luna. Gilakip ang pagtanom sulod sa balay, bunker, ug sa gawas."],
  ["In Leyte the real threats are typhoons, floods and earthquakes. A strong room above flood level beats a deep underground bunker, which can flood. Check your barangay hazard maps (GeoRisk PH, DOST-NOAH) and use a licensed engineer.", "Sa Leyte ang tinuod nga hulga mao ang bagyo, baha ug linog. Ang kusgan nga kwarto nga mas taas sa lebel sa baha mas maayo kaysa lawom nga bunker sa ilalom sa yuta, nga mahimong bahaon. Susiha ang hazard map sa inyong barangay (GeoRisk PH, DOST-NOAH) ug mogamit og lisensyado nga enhinyero."],
  ["From a phone to a long-range radio. Radios and satellite devices are regulated by the NTC: buy from an authorized dealer and check the permit before you buy.", "Gikan sa telepono hangtod sa layo nga radyo. Ang radyo ug satellite device gi-regulate sa NTC: palit sa awtorisadong dealer ug susiha ang permit sa dili pa mopalit."],
  ["A kit helps only if you know how to use it. Do not stock prescription antibiotics without a doctor's advice, and rotate anything that expires.", "Makatabang ra ang kit kung mahibalo ka mogamit niini. Ayaw pagtipig og antibiotic nga reseta nga walay tambag sa doktor, ug usba ang bisan unsa nga mahurot ang petsa."],
  ["Rice needs heat. Match the fuel to how long you plan to cook without the grid. Cook outdoors or in a well-ventilated area, never with charcoal indoors.", "Ang bugas nanginahanglan og kainit. Itugma ang sugnod sa kadugayon sa pagluto nimo nga walay kuryente. Magluto sa gawas o sa dapit nga maayo ang hangin, ayaw gayod gamit og uling sa sulod sa balay."],
  ["Waste and dirty water cause more sickness than injuries do in most disasters. Plan the toilet and handwashing before you need them.", "Ang hugaw ug hugaw nga tubig mosangpot og mas daghang sakit kaysa kadaot sa kasagarang katalagman. Planoha ang kasilyas ug paghugas sa kamot sa dili pa kini kinahanglanon."],

  ["A week of food that needs little or no cooking", "Usa ka semana nga pagkaon nga gamay o walay lutuon"],
  ["A month of staples and a pantry that you rotate", "Usa ka bulan nga pangunang pagkaon ug pantry nga imong gi-usab-usab"],
  ["Three months or more of bulk staples, sealed against pests and heat", "Tulo ka bulan o labaw pa nga daghang pangunang pagkaon, gitak-opan batok sa peste ug kainit"],
  ["Grow, raise and preserve your own food", "Pagtanom, pagpadako ug pagpreserba sa kaugalingong pagkaon"],
  ["Water jugs for a week", "Garon sa tubig para sa usa ka semana"],
  ["Drums, a filter and a rain-catch tarp", "Drum, filter ug trapal nga pangsalo sa ulan"],
  ["A roof-fed tank with a first-flush diverter", "Tangke nga gipakaon sa atop nga naay first-flush diverter"],
  ["Your own source: a well or spring, plus rain storage", "Kaugalingong tinubdan: atabay o bukal, dugang tipiganan sa ulan"],
  ["Power banks, lanterns and a small station", "Power bank, lantern ug gamay nga station"],
  ["A 300 to 1,000 Wh power station with 1 to 3 panels", "300 hangtod 1,000 Wh nga power station nga naay 1 hangtod 3 ka panel"],
  ["A 3 to 5 kW hybrid home system with a lithium battery", "3 hangtod 5 kW nga hybrid nga sistema sa balay nga naay lithium nga baterya"],
  ["An 8 to 16 kW system with 15 to 30 kWh of storage", "8 hangtod 16 kW nga sistema nga naay 15 hangtod 30 kWh nga tipiganan"],
  ["A 1 to 2 kW inverter generator", "1 hangtod 2 kW nga inverter generator"],
  ["A 3.5 to 5.5 kW gasoline generator", "3.5 hangtod 5.5 kW nga gasoline generator"],
  ["A 6 to 10 kVA diesel generator", "6 hangtod 10 kVA nga diesel generator"],
  ["A silent standby set of 10 to 20 kVA or more", "Hilom nga standby set nga 10 hangtod 20 kVA o labaw pa"],
  ["Sprouts and kitchen scraps", "Tubo ug tinabyan sa kusina"],
  ["Pots, buckets and sacks, 1 to 3 m²", "Paso, timba ug sako, 1 hangtod 3 m²"],
  ["Backyard beds, 20 to 100 m²", "Tanaman sa likod sa balay, 20 hangtod 100 m²"],
  ["A small farm, 0.5 to 1 ha or more", "Gamay nga umahan, 0.5 hangtod 1 ha o labaw pa"],
  ["A safe corner in your strongest room", "Luwas nga suok sa inyong pinakakusgan nga kwarto"],
  ["A reinforced safe room, 10 to 15 m²", "Gipalig-on nga luwas nga kwarto, 10 hangtod 15 m²"],
  ["A fortified shelter, 25 to 40 m²", "Gipalig-on nga puy-anan, 25 hangtod 40 m²"],
  ["A compound with several buildings", "Compound nga daghang building"],
  ["Phones, power banks and an AM/FM radio", "Telepono, power bank ug AM/FM nga radyo"],
  ["Licensed handheld radios, about 1 to 5 km", "Lisensyado nga handheld nga radyo, mga 1 hangtod 5 km"],
  ["A base station, mast antenna and a repeater, about 10 to 50 km", "Base station, mast antenna ug repeater, mga 10 hangtod 50 km"],
  ["HF radio and satellite, hundreds to thousands of km", "HF nga radyo ug satellite, gatos hangtod libo ka km"],
  ["A first-aid kit and a week of personal medicines", "First-aid kit ug tambal para sa usa ka semana"],
  ["A 30-day supply of regular medicines, and wound care", "30 ka adlaw nga suplay sa regular nga tambal, ug pag-atiman sa samad"],
  ["A clinic shelf: a 90-day supply and basic tools", "Estante sa klinika: 90 ka adlaw nga suplay ug sukaranang himan"],
  ["Prevention, training and a medicine garden", "Pagpugong, pagbansay ug tanaman sa tambal"],
  ["A butane stove and canisters", "Butane stove ug canister"],
  ["An LPG stove and a spare 11 kg tank", "LPG stove ug ekstrang 11 kg nga tangke"],
  ["A wood or charcoal rocket stove", "Rocket stove nga kahoy o uling"],
  ["Fuel you grow", "Sugnod nga imong gitanom"],
  ["A bucket toilet with liners, and soap", "Kasilyas nga timba nga naay liner, ug sabon"],
  ["A pit latrine away from your water", "Hukay nga kasilyas nga layo sa imong tubig"],
  ["A dry toilet and a greywater plan", "Uga nga kasilyas ug plano sa greywater"],
  ["A septic tank and a closed-loop compost system", "Septic tank ug sirado nga sistema sa compost"],

  /* calc lines with no numbers */
  ["Small units are for short loads; they are not made to run all day for weeks.", "Ang gagmay nga unit para sa mubo nga karga; wala kini hinimo nga modagan sa tibuok adlaw sulod sa mga semana."],
  ["Stored fuel doesn't last for years. Rotate it and test old fuel before using it (rule of thumb, ask your fuel supplier).", "Ang tinipigang gasolina dili molahutay sulod sa mga tuig. Usba-usba kini ug sulayi ang daan nga gasolina sa dili pa gamiton (lagda-lagda, pangutana sa tagahatag sa gasolina)."],
  ["Ask the barangay or a local well driller what the water table is like on your land.", "Pangutana sa barangay o lokal nga tigbutang og atabay kung unsa ang lebel sa tubig sa inyong yuta."],
  ["One 100 Wh unit charges a phone about 5 to 6 times (estimate).", "Ang usa ka 100 Wh nga unit makacharge og telepono mga 5 hangtod 6 ka higayon (banabana)."],
  ["A 1 kWh station runs lights, a fan and a router for a day or two; a small fridge about a day (estimate).", "Ang 1 kWh nga station makapadagan og suga, bentilador ug router sulod sa usa o duha ka adlaw; gamay nga ref mga usa ka adlaw (banabana)."],
  ["No firm price found. Get 2 or 3 written quotes.", "Walay sigurado nga presyo nga nakita. Pagkuha og 2 o 3 ka sinulat nga kinutlo nga presyo."],
  ["Cost: almost nothing. Good first practice.", "Gasto: halos walay gasto. Maayong unang praktis."],
  ["Start with 5 containers. Add more as you learn.", "Sugdi sa 5 ka sudlanan. Dugangi samtang nagkat-on ka."],
  ["Range: whatever the cell tower covers.", "Abot: kung hangtod asa ang abot sa cell tower."],
  ["Agree a channel, a check-in time and code words (see the Comms tab).", "Pagkauyon sa channel, oras sa check-in ug code word (tan-awa ang Komunikasyon nga tab)."],
  ["A repeater on a hill is what turns 3 km into 30 km.", "Ang repeater sa bungtod mao ang naghimo sa 3 km nga 30 km."],
  ["No PH price confirmed. Ask an authorized dealer.", "Walay nakumpirma nga presyo sa PH. Pangutana sa awtorisadong dealer."],
  ["Check expiry dates every 6 months.", "Susiha ang petsa sa pagkahurot matag 6 ka bulan."],
  ["Rotate stock: use the oldest first.", "Usba-usba ang stock: gamita una ang pinakadaan."],
  ["Training matters more than gear.", "Mas importante ang pagbansay kaysa gamit."],
  ["Test it: cook a normal day of meals and count the canisters you use. Multiply by your days.", "Sulayi: magluto og usa ka normal nga adlaw nga pagkaon ug ihap ang canister nga imong nagamit. Padaghanon sa inyong mga adlaw."],
  ["A full spare tank can double how long you can cook.", "Ang usa ka puno nga ekstrang tangke makadoble sa kadugayon sa inyong pagluto."],
  ["Dry wood burns cleaner. Keep it off the ground and under a roof.", "Mas limpyo nga masunog ang uga nga kahoy. Ibutang dili sa yuta ug ubos sa atop."],
  ["Plant fuelwood trees early: they take a few years to give wood.", "Tanom og kahoy nga sugnod sayo: pipila ka tuig ang gikinahanglan aron makahatag og kahoy."],
  ["Wash hands after the toilet and before food, every time.", "Maghugas og kamot human sa kasilyas ug sa dili pa mokaon, kanunay."],
  ["Never place a latrine upslope of a well.", "Ayaw gayod butang og kasilyas sa mas taas nga bahin sa atabay."],
  ["Keep greywater away from wells and the kitchen garden's edible leaves.", "Ilayo ang greywater gikan sa atabay ug sa makaon nga dahon sa tanaman sa kusina."],
  ["Pump out a septic tank when it fills; ask a local contractor how often.", "Iguba ang sulod sa septic tank kung mapuno; pangutana sa lokal nga kontraktor kung kanus-a."]
]);

/* ---- lines that carry numbers (people count, amounts) ---- */
const _ppl = (n) => `${n} ka tawo`;
const RX = [
  [/^(\d+) of (\d+) done$/, (m) => `${m[1]} sa ${m[2]} nahuman`],
  [/^(\d+) of (\d+)$/, (m) => `${m[1]} sa ${m[2]}`],
  [/^(\d+) of (\d+) steps done$/, (m) => `${m[1]} sa ${m[2]} lakang nahuman`],
  [/^(\d+) of (\d+) areas reach your goal$/, (m) => `${m[1]} sa ${m[2]} ka area ang naabot ang imong tumong`],
  [/^(\d+) of (\d+) areas reach your goal$/, (m) => `${m[1]} sa ${m[2]} ka area ang naabot ang imong tumong`],
  [/^Goal: (.+) \((.+)\) for (\d+) (?:person|people)$/, (m, t) => `Tumong: ${t(m[1])} (${t(m[2])}) alang sa ${_ppl(m[3])}`],
  [/^(.+): (\d+) of (\d+) done$/, (m, t) => `${t(m[1])}: ${m[2]} sa ${m[3]} nahuman`],
  [/^Add your own item to (.+)$/, (m, t) => `Dugang og imong kaugalingong butang sa ${t(m[1])}`],
  [/^(.+)\. Not started\. Open this area\.$/, (m, t) => `${t(m[1])}. Wala pa nasugdan. Ablihi kini nga area.`],
  [/^(.+)\. Reached: (.+)\. Open this area\.$/, (m, t) => `${t(m[1])}. Naabot: ${t(m[2])}. Ablihi kini nga area.`],
  [/^Reached: (.+)$/, (m, t) => `Naabot: ${t(m[1])}`],
  [/^: (Days|Weeks|Months|Years), (.+)$/, (m, t) => `: ${t(m[1])}, ${t(m[2])}`],
  [/^Offline saving failed\. These files are missing on the web host: (.+)\. Upload them, keeping the same folder names\.$/, (m) => `Napakyas ang pag-save para sa offline. Kini nga mga file kulang sa web host: ${m[1]}. I-upload kini, ug ibilin ang parehas nga ngalan sa folder.`],
  [/^Ready: works without internet \((\d+) files saved\)$/, (m) => `Andam na: mugana bisan walay internet (${m[1]} ka file ang na-save)`],
  [/^Range: (.+)$/, (m, t) => `Abot: ${t(m[1])}`],
  [/^Sources: (.+)$/, (m) => `Tinubdan: ${m[1]}`],
  [/^About ([^ ]+) a month for what is still to buy\.$/, (m) => `Mga ${m[1]} kada bulan alang sa pamalitonon pa.`],

  /* plan quantity lines */
  [/^For (\d+) (?:person|people): (.+)$/, (m, t) => `Alang sa ${_ppl(m[1])}: ${t(m[2])}`],
  [/^([\d,.]+) L for 3 days \(([\d,.]+) jugs? of 19 L\)$/, (m) => `${m[1]} L para sa 3 ka adlaw (${m[2]} ka garon nga 19 L)`],
  [/^([\d,.]+) kg for 30 days \(([\d,.]+) sacks? of 50 kg\)$/, (m) => `${m[1]} kg para sa 30 ka adlaw (${m[2]} ka sako nga 50 kg)`],
  [/^([\d,.]+) cans for 30 days$/, (m) => `${m[1]} ka lata para sa 30 ka adlaw`],
  [/^([\d,.]+) L of cooking oil a month \(estimate\)$/, (m) => `${m[1]} L nga lana sa pagluto kada bulan (banabana)`],
  [/^(\d+) cards$/, (m) => `${m[1]} ka kard`],
  [/^(\d+) flashlights or headlamps$/, (m) => `${m[1]} ka flashlight o headlamp`],
  [/^(\d+) power banks$/, (m) => `${m[1]} ka power bank`],
  [/^(\d+) whistles$/, (m) => `${m[1]} ka pito`],
  [/^(\d+) sets$/, (m) => `${m[1]} ka set`],
  [/^(\d+) mats and (\d+) blankets$/, (m) => `${m[1]} ka banig ug ${m[2]} ka habol`],
  [/^(\d+) go bags, about ([\d,.]+) L of water in total$/, (m) => `${m[1]} ka go bag, mga ${m[2]} L nga tubig tanan`],

  /* Levels calc lines */
  [/^For (\d+) (?:person|people): about ([\d,.]+) kg of rice and ([\d,.]+) cans for 7 days\.$/, (m) => `Alang sa ${_ppl(m[1])}: mga ${m[2]} kg nga bugas ug ${m[3]} ka lata sulod sa 7 ka adlaw.`],
  [/^Rice for (\d+): about ([\d,.]+) kg for 30 days, or ([\d,.]+) sacks? of 50 kg\. Cooking oil: about ([\d,.]+) L \(estimate, 1 L per person per month\)\.$/, (m) => `Bugas para sa ${m[1]}: mga ${m[2]} kg sulod sa 30 ka adlaw, o ${m[3]} ka sako nga 50 kg. Lana sa pagluto: mga ${m[4]} L (banabana, 1 L matag tawo kada bulan).`],
  [/^Rice for (\d+): about ([\d,.]+) kg for 90 days \(([\d,.]+) sacks? of 50 kg\)\.$/, (m) => `Bugas para sa ${m[1]}: mga ${m[2]} kg sulod sa 90 ka adlaw (${m[3]} ka sako nga 50 kg).`],
  [/^Rice alone for (\d+) for a year would be about ([\d,.]+) kg \(([\d,.]+) sacks?\)\. See the Growing ladder for the land this needs\.$/, (m) => `Ang bugas ra para sa ${m[1]} sulod sa usa ka tuig mga ${m[2]} kg (${m[3]} ka sako). Tan-awa ang hagdan sa Pagtanom para sa yuta nga gikinahanglan niini.`],
  [/^For (\d+): ([\d,.]+) L for 7 days, about ([\d,.]+) jugs?\.$/, (m) => `Alang sa ${m[1]}: ${m[2]} L sulod sa 7 ka adlaw, mga ${m[3]} ka garon.`],
  [/^For (\d+): ([\d,.]+) L for 30 days, about ([\d,.]+) drums? of 200 L\.$/, (m) => `Alang sa ${m[1]}: ${m[2]} L sulod sa 30 ka adlaw, mga ${m[3]} ka drum nga 200 L.`],
  [/^For (\d+): ([\d,.]+) L for 90 days of drinking only \(double it for washing\)\. Handy rule: 1 mm of rain on 1 m² of roof gives 1 L, so a 50 m² roof gives 50 L per mm\.$/, (m) => `Alang sa ${m[1]}: ${m[2]} L sulod sa 90 ka adlaw sa pag-inom ra (doblehon kung naay paghugas). Sayon nga lagda: ang 1 mm nga ulan sa 1 m² nga atop naghatag og 1 L, busa ang 50 m² nga atop naghatag og 50 L kada mm.`],
  [/^A 5 kW array makes about ([\d,.]+) kWh a day in good sun \(estimate from 4\.5 sun-hours × 0\.85\)\.$/, (m) => `Ang 5 kW nga array naghimo og mga ${m[1]} kWh kada adlaw sa maayong adlaw (banabana gikan sa 4.5 oras nga adlaw × 0.85).`],
  [/^From one maker's spec, a 3 kVA gasoline set uses about ([\d,.]+) L per hour at 70% load: 2 hours a day for 14 days is about ([\d,.]+) L\.$/, (m) => `Gikan sa spec sa usa ka maker, ang 3 kVA nga gasoline set migamit og mga ${m[1]} L kada oras sa 70% nga karga: 2 ka oras kada adlaw sulod sa 14 ka adlaw mga ${m[2]} L.`],
  [/^A 10 kVA diesel running 3 hours a day for 90 days burns about ([\d,.]+) L\. Fuel is the real cost, so use solar for the base load\.$/, (m) => `Ang 10 kVA nga diesel nga modagan 3 ka oras kada adlaw sulod sa 90 ka adlaw mogasto og mga ${m[1]} L. Ang gasolina ang tinuod nga gasto, busa gamita ang solar para sa pundasyon nga karga.`],
  [/^Vegetables alongside rice: about ([\d,.]+) to ([\d,.]+) m² for (\d+) \(estimate, 10 to 20 m² per person\)\.$/, (m) => `Utanon kauban sa bugas: mga ${m[1]} hangtod ${m[2]} m² alang sa ${m[3]} (banabana, 10 hangtod 20 m² matag tawo).`],
  [/^If root crops are the main calories: about ([\d,.]+) m² for (\d+) \(([\d,.]+) ha\)\. Estimate: 2,000 kcal a day is about 2\.3 kg of kamote, about 850 kg a year, at a modest 5 tons per hectare\.$/, (m) => `Kung ang mga tanom nga lamok ang punoang kalorya: mga ${m[1]} m² alang sa ${m[2]} (${m[3]} ha). Banabana: ang 2,000 kcal kada adlaw mga 2.3 kg nga kamote, mga 850 kg kada tuig, sa kasarangang 5 tonelada kada ektarya.`],
  [/^For (\d+): about ([\d,.]+) to ([\d,.]+) m² minimum\.$/, (m) => `Alang sa ${m[1]}: mga ${m[2]} hangtod ${m[3]} m² labing gamay.`],
  [/^For (\d+): about ([\d,.]+) m² \(estimate, (\d+) m² each\)\. Build cost about (₱[\d,.]+) to (₱[\d,.]+)(, plus 20 to 30% for storm hardening)?\.$/, (m) => `Alang sa ${m[1]}: mga ${m[2]} m² (banabana, ${m[3]} m² matag usa). Gasto sa pagtukod mga ${m[4]} hangtod ${m[5]}${m[6] ? ", dugang 20 hangtod 30% para sa pagpalig-on batok sa bagyo" : ""}.`],
  [/^Pack at least (\d+) sets? of the basics for (\d+) (?:people|person)\.$/, (m) => `Empaki labing menos ${m[1]} ka set sa sukaranan alang sa ${_ppl(m[2])}.`]
];

/* The translator. t(s): returns the Bisaya for one English line, or the same line if there is none. */
const _trLine = (s) => {
  if (X[s]) return X[s];
  for (const [re, fn] of RX) {
    const m = s.match(re);
    if (m) return fn(m, _trLine);
  }
  return null;
};
function trText(raw) {
  const lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
  const core = raw.trim();
  if (!core) return raw;
  const r = _trLine(core.replace(/\s+/g, " "));
  return r === null ? raw : lead + r + trail;
}

const _orig = new WeakMap();   // text node or element -> its English
const _origAttr = new WeakMap(); // element -> {attr: English}
const ATTRS = ["placeholder", "aria-label", "title", "alt"];

/* Swap every line under `root` into Bisaya (on = true) or put the English back (on = false). */
function translateDom(root, on) {
  if (!root) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = []; let n;
  while ((n = w.nextNode())) {
    const p = n.parentElement;
    if (!p || p.tagName === "SCRIPT" || p.tagName === "STYLE" || p.tagName === "TEXTAREA") continue;
    nodes.push(n);
  }
  nodes.forEach((t) => {
    if (!on) { if (_orig.has(t)) { t.nodeValue = _orig.get(t); _orig.delete(t); } return; }
    const en = _orig.has(t) ? _orig.get(t) : t.nodeValue;
    const out = trText(en);
    if (out !== en) { _orig.set(t, en); t.nodeValue = out; }
  });
  const els = root.querySelectorAll ? root.querySelectorAll("[placeholder],[aria-label],[title],[alt]") : [];
  [...els, ...(root.nodeType === 1 ? [root] : [])].forEach((el) => {
    ATTRS.forEach((a) => {
      const cur = el.getAttribute && el.getAttribute(a);
      if (cur == null) return;
      const saved = _origAttr.get(el) || {};
      if (!on) { if (saved[a] !== undefined) { el.setAttribute(a, saved[a]); delete saved[a]; } return; }
      const en = saved[a] !== undefined ? saved[a] : cur;
      const out = trText(en);
      if (out !== en) { saved[a] = en; _origAttr.set(el, saved); el.setAttribute(a, out); }
    });
  });
}
