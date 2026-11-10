/* Handa v4: Bisaya (Cebuano) text. English stays the default.
   Anything not translated here shows in English. Please have a Bisaya speaker read it
   and tell me any word that sounds wrong. */

const CEB = {
  ui: {
    "Plan": "Plano", "Levels": "Lebel", "Family": "Pamilya", "Comms": "Komunikasyon", "Guides": "Giya", "Drill": "Praktis",
    "Guides_title": "Mga Giya",
    "Step by step: what to buy and what to do, with pictures. Tick things as you go. New to this? Open “Start here” first.":
      "Lakang-lakang: unsay paliton ug unsay buhaton, uban ang mga hulagway. I-tsek ang matag nahuman. Bag-o ra ka? Ablihi una ang “Sugdi dinhi”.",
    "What to buy": "Unsay paliton", "What to do": "Unsay buhaton", "Be careful": "Pag-amping",
    "Time:": "Oras:", "Cost:": "Gasto:", "Sources:": "Tinubdan:", "Write it here": "Isulat dinhi",
    "steps done": "lakang nahuman", "bought": "napalit", "words": "ka pulong", "of": "sa", "English only": "English lang",
    "My photo": "Akong hulagway", "Remove photo": "Tangtanga ang hulagway",
    "Start here": "Sugdi dinhi", "Power": "Kuryente", "Water and food": "Tubig ug pagkaon", "Growing": "Pagtanom",
    "Shelter and safety": "Puy-anan ug kaluwasan", "Radios, health and sanitation": "Radyo, panglawas ug kalimpyo",
    "Offline library (NOMAD)": "Librarya nga walay internet (NOMAD)", "Family, money and moving around": "Pamilya, kuwarta ug pagbiyahe",
    "Quick guides (first aid, typhoon, earthquake)": "Dali nga mga giya (first aid, bagyo, linog)",
    "Short reminders that work offline. They don't replace training: take a first aid and CPR course.":
      "Mubo nga mga pahinumdom nga mugana bisan walay internet. Dili kini puli sa pagbansay: mokuha og first aid ug CPR nga kurso.",
    "Fridge sheets": "Papel para sa ref",
    "One page with your family's meeting places, numbers and what to do in a typhoon, flood, earthquake and tsunami. Print it or save as PDF and put it on the fridge.":
      "Usa ka panid nga naay lugar nga magkitaay, mga numero ug unsay buhaton sa bagyo, baha, linog ug tsunami. I-print o i-save as PDF ug ibutang sa ref.",
    "Print the family sheet": "I-print ang papel sa pamilya",
    "Dates: food and medicine": "Petsa: pagkaon ug tambal",
    "Write what you store and when it expires. Eat or replace the oldest first.": "Isulat unsay imong gitipigan ug kanus-a mahurot ang petsa. Gamita o ilisan una ang pinakadugay.",
    "What": "Unsa", "How many": "Pila", "Use by": "Gamita sa dili pa", "Add an item": "Dugang og butang", "Remove": "Tangtanga",
    "Expired": "Nahurot na ang petsa", "Soon": "Dili madugay", "OK": "Maayo pa",
    "Months to finish buying": "Pila ka bulan sa pagpalit sa tanan",
    "Important places": "Importanteng mga lugar",
    "Add the high ground, evacuation center, clinic and water source. Tap “Use my location” while standing there. The numbers work without internet.":
      "Idugang ang taas nga dapit, evacuation center, klinika ug tinubdan sa tubig. I-tap ang “Gamita ang akong lugar” kung naa ka didto. Mugana ang mga numero bisan walay internet.",
    "Place": "Lugar", "Note": "Nota", "Use my location": "Gamita ang akong lugar", "Open in maps": "Ablihi sa mapa", "Add a place": "Dugang og lugar",
    "Share with family": "Ipaambit sa pamilya",
    "Send your family page (people, numbers, meeting places and important places) to a sister or parent. They add it to their phone. Nothing else is shared.":
      "Ipadala ang imong family page (mga tawo, numero, lugar nga magkitaay ug importanteng lugar) sa igsoon o ginikanan. Idugang nila kini sa ilang telepono. Walay lain nga ipaambit.",
    "Send my family page": "Ipadala ang akong family page", "Paste a family page here": "I-paste dinhi ang family page", "Add to this phone": "Idugang sa kini nga telepono",
    "Language": "Pinulongan"
  },

  figs: {
    start_five: "Lima ka butang nga buhaton una. Dayon padayon.",
    phone_tabs: "Ang unom ka tab sa ubos sa app."
  },

  guides: {
    start: {
      title: "Sugdi dinhi: ang unang 5 ka buhaton",
      time: "Mga 1 ka oras", cost: "Ubos sa ₱3,000 alang sa pamilya (banabana)",
      intro: "Dili nimo kinahanglan palita ang tanan karon. Kining lima nagapanalipod kanimo sa unang pipila ka adlaw sa bisan unsang emerhensya: bagyo, baha, taas nga brownout.",
      buy: [
        { t: "Mga garon sa tubig (ang asul nga 5-galon gikan sa refilling station)", n: "Plana og mga 4 ka litro matag tawo kada adlaw. Alang sa {ppl}, ang 3 ka adlaw mao ang {n*12} ka litro, mga {n*12/19} ka garon." },
        { t: "De-lata nga isda o karne, biskwit, bugas nga mahimo nimong lutuon, peanut butter" },
        { t: "Flashlight ug dugang nga baterya" },
        { t: "Power bank alang sa imong telepono", n: "Pabilin nga puno ang charge." },
        { t: "First-aid box nga naay mga tambal sa imong pamilya" },
        { t: "Notebook ug bolpen" }
      ],
      steps: [
        { t: "1. Tubig", d: "Pun-a ang limpyo nga mga garon. Tumong: 3 ka adlaw, 12 ka litro matag tawo. Alang sa {ppl}, mao kini ang {n*12} ka litro, mga {n*12/19} ka garon. Tabuni ug ibutang sa landong." },
        { t: "2. Pagkaon", d: "Tagoa ang pagkaon para sa 3 ka adlaw nga wala o gamay ra og luto. Ibutang tanan sa usa ka lugar." },
        { t: "3. Suga ug kuryente sa telepono", d: "I-charge ang power bank. Ibutang ang flashlight diin makit-an nimo sa kangitngit." },
        { t: "4. Tambal ug first aid", d: "Ibutang ang mga tambal, bendahe ug thermometer sa usa ka kahon. Isulat sa kard ang allergy sa matag tawo." },
        { t: "5. Plano sa pamilya", d: "Sa papel, isulat asa mo magkita ug kinsa ang tawagan kung dili mo mag-abot sa usag usa. Gamita usab ang Pamilya nga tab niini nga app." },
        { t: "Unya padayon", d: "Ablihi ang Plano nga tab ug i-tsek ang mga butang paduol-duol. Gamita ang Lebel nga tab aron motubo gikan sa mga adlaw ngadto sa semana ug bulan." }
      ],
      warn: [], sources: ["Ang gidaghanon sa tubig mohaum sa giya sa tubig niini nga app."]
    },
    app: {
      title: "Paggamit niini nga app: simple nga giya",
      time: "5 minutos", cost: "Libre",
      intro: "Ang Handa usa ka app nga mugana sa imong telepono bisan walay internet. Ang imong mga tsek ug nota magpabilin sa imong telepono ra.",
      steps: [
        { t: "Ablihi ang address nga gihatag kanimo", d: "Ang imong katabang mopadala og web address. Ablihi kini sa imong telepono." },
        { t: "Ibutang sa home screen", d: "Android (Chrome): i-tap ang 3 ka tuldok, unya “Install app” o “Add to Home screen”. iPhone (Safari): i-tap ang Share button, unya “Add to Home Screen”." },
        { t: "Ablihi kausa nga naay internet", d: "Kini nagtugot sa app nga magtipig sa kaugalingon, aron mugana pa kini sa ulahi bisan walay internet." },
        { t: "Ilha ang 6 ka tab", d: "Ang Plano mao ang listahan sa palitonon. Ang Lebel nagpakita kung hangtod kanus-a ka molahutay. Ang Pamilya naay mga numero sa telepono ug lugar nga magkitaay. Ang Komunikasyon nagpakita og mga paagi sa pagkontak. Ang Giya naay lakang-lakang nga tabang. Ang Praktis mao ang pagsulay." },
        { t: "I-tsek ang kahon kung nahuman na", d: "I-tap ang kahon sunod sa butang. Mahinumdoman kini sa app." },
        { t: "Padak-a ang letra kung kinahanglan", d: "I-tap ang gear sa ibabaw, unya “Text size”." },
        { t: "I-back up ang imong mga nota", d: "I-tap ang gear, unya “Copy backup”, ug ipadala kini sa imong kaugalingon sa mensahe. Kung mausab ang imong telepono, i-paste kini balik." }
      ],
      warn: [], sources: []
    },
    glossary: {
      title: "Yano nga mga pulong: unsay buot ipasabot", intro: "Yano nga kahulogan sa mga pulong nga imong makita niini nga app.",
      terms: [
        ["Watt (W)", "Pila ka kuryente ang gigamit sa usa ka butang sa usa ka higayon. Ang charger sa telepono mga 10 W. Ang bentilador mga 50 W."],
        ["Watt-hour (Wh)", "Kuryente nga nagamit sa paglabay sa oras. Ang 50 W nga bentilador nga nagdagan sulod sa 2 ka oras nakagamit og 100 Wh."],
        ["Kilowatt-hour (kWh)", "1,000 ka watt-hour. Mao kini ang sukod sa bayronon sa kuryente."],
        ["Solar panel", "Patag nga tabla nga mohimo sa kahayag sa adlaw nga kuryente."],
        ["Battery", "Nagtipig og kuryente alang sa ulahi, sama sa tangke nga nagtipig og tubig."],
        ["Inverter", "Kahon nga mag-usab sa kuryente sa baterya ngadto sa 220 V nga gigamit sa imong saksakan."],
        ["Hybrid inverter", "Inverter nga naghikay usab sa panel, baterya ug linya sa kuryente nga magkauban."],
        ["Power station", "Baterya ug inverter sa usa ka kahon nga naay saksakan. Ang pinakadali nga sugod sa solar."],
        ["Generator", "Makina nga naghimo og kuryente gikan sa gasolina. Kusog ug naay delikado nga aso."],
        ["Transfer switch", "Luwas nga switch nga mokonektar sa generator sa kable sa imong balay."],
        ["LPG", "Ang gas sa 11 kg nga tangke sa pagluto."],
        ["Butane", "Ang gas sa gagmayng lata para sa portable nga kalan."],
        ["Reinforced concrete (RC)", "Semento nga naay puthaw sa sulod, mao nga mas kusgan."],
        ["Rebar", "Ang puthaw sulod sa reinforced concrete."],
        ["CHB", "Concrete hollow blocks, ang naandan nga bloke sa dingding sa Pilipinas."],
        ["Water table", "Giunsa kalalim ang tubig ilalom sa yuta. Sa ulanon nga lugar mahimo kini nga duol sa ibabaw."],
        ["Sump pump", "Bomba sa ubos nga lungag nga mokuha sa tubig nga mosulod."],
        ["First flush", "Ang unang hugaw nga ulan gikan sa atop. Ilabay una kini sa dili pa pagkolekta og limpyo nga tubig."],
        ["ORS", "Oral rehydration salts: pulbos nga ibutang sa tubig aron pagtambal sa kakulangon sa tubig sa lawas."],
        ["NTC", "Ang opisina sa gobyerno nga nagkontrol sa mga radyo ug satellite device."],
        ["Repeater", "Radyo sa taas nga lugar nga mopasa sa imong signal nga mas layo."],
        ["Mulch", "Tabon sa uga nga dahon o dagami sa ibabaw sa yuta aron magpabilin nga basa."],
        ["Compost", "Nabulok nga tinabunan sa kusina ug tanaman nga pagkaon sa tanum."],
        ["Evacuate", "Mobiya sa peligroso nga lugar paingon sa mas luwas kung gisugo sa opisyal."]
      ],
      warn: [], sources: []
    }
  },

  quick: {
    gd1: { title: "Himoa nga luwas ang tubig", html: `
      <p>Ayaw og inom sa tubig-baha. Gamita ang klaro nga tubig kung makaya.</p>
      <ol><li>Pahulaga ang labod nga tubig, unya ibubo agi sa limpyo nga panapton.</li>
      <li>Pabukala sa lawom nga pagbukal sulod sa 1 ka minuto.</li>
      <li>Palabyi ang kabugnaw sa limpyo, natabunan nga sudlanan.</li></ol>
      <p><b>Kung dili ka makapabukal:</b> gamita ang plain nga walay-baho nga household bleach nga naay 5–9% sodium hypochlorite (basaha ang label). Butangi og mga 2 ka tulo kada litro sa klaro nga tubig, ukra, ug paghulat og 30 minutos. Doblehon ang tulo kung labod ang tubig. Kinahanglan gamay ra ang baho nga sama sa chlorine human niini.</p>
      <p class="hint">Ang mga filter sama sa Sawyer o LifeStraw nagtangtang sa mikrobyo apan dili sa kemikal.</p>` },
    gd2: { title: "Grabe nga pagdugo", html: `
      <ol><li>Pidyoga og lig-on ang samad gamit ang limpyo nga panapton o gauze. Gamita ang imong kamot kung kana ra ang anaa.</li>
      <li>Ayaw kuhaa ang panapton aron tan-awon. Kung mosulod ang dugo, dugangi og panapton sa ibabaw ug padayon sa pagpidyot.</li>
      <li>Itaas ang nasamdan nga bukton o tiil kung kaya.</li>
      <li>Padayon sa pagpidyot labing menos 10 ka minuto, unya bendahi og lig-on.</li>
      <li>Pangita og medikal nga tabang kung lawom ang samad, padayon ang dugo, o gikan sa daot nga puthaw o tulob sa hayop.</li></ol>` },
    gd3: { title: "CPR alang sa hamtong nga dili motubag", html: `
      <ol><li>Singgit og tabang ug tawag sa 911 o pasugoa ang usa. Tan-awa nga luwas ang dapit.</li>
      <li>Kung dili motubag ang tawo ug dili normal ang ginhawa, ihigda sa lig-on nga higdaanan.</li>
      <li>Ibutang ang ubos nga bahin sa imong palad sa tunga sa dughan, ug ang laing kamot sa ibabaw.</li>
      <li>Pidyoga og kusog ug dali: mga 5–6 cm ang lalom, 100–120 ka higayon kada minuto. Pasagdi nga mobangon ang dughan tali sa pidyot.</li>
      <li>Kung nabansay ka, hatagi og 2 ka rescue breath human sa matag 30 ka pidyot. Kung dili, padayon sa pidyot lang.</li>
      <li>Ayaw undang hangtod mokuha ang tabang, mobalhin o mo-ginhawa ang tawo, o dili ka na makapadayon.</li></ol>
      <p class="callout">Pahimangno kini, dili pagbansay. Mokuha og first aid ug CPR nga kurso.</p>` },
    gd4: { title: "Paso", html: `
      <ol><li>Palabyi ang paso ilalom sa limpyo nga agos sa tubig sulod sa 20 ka minuto.</li>
      <li>Tangtanga ang singsing ug hugot nga butang sa dili pa mosubsob.</li>
      <li>Tabuni og luag sa limpyo nga plastic wrap o non-stick nga dressing.</li>
      <li>Ayaw buak-a ang plasa. Ayaw gamit og yelo, toothpaste, mantikilya o lana.</li></ol>
      <p>Pangita og medikal nga tabang kung ang paso naa sa nawong, kamot, o sekswal nga bahin, mas dako kaysa palad sa tawo, o lawom.</p>` },
    gd5: { title: "Kakulang sa tubig sa lawas ug kalibanga", html: `
      <p><b>Ilimnon sa balay alang sa rehydration:</b> sagola ang 1 ka litro nga limpyo (gibukalan ug gipabugnaw) nga tubig, 6 ka level nga kutsarita nga asukar ug tunga sa level nga kutsarita nga asin. Hinay-hinay nga inom sa gagmay nga lagok kanunay. Gamita ang Hydrite nga packet kung naa.</p>
      <p>Pangita og tabang dayon kung naay dugo sa tae, taas nga hilanat, padayon nga pagsuka, lunop kaayo ang mata, hapit walay ihi, o hilom kaayo ug tulog-tulog ang tawo. Ang mga bata ug tigulang dali mograbe.</p>` },
    gd6: { title: "Bagyo", html: `
      <ul><li><b>Sa dili pa:</b> sunda ang PAGASA bulletin sa imong radyo. I-charge ang telepono ug power bank. Tipigi ang tubig. Hugti ang atop ug mga hin-os nga butang. Mobiya sayo kung duol ka sa baybayon o suba.</li>
      <li><b>Atol:</b> pabilin sa sulod sa pinakaluwas nga kwarto, layo sa bintana. Kung gisugo ang evacuation, lakaw. Ayaw paghulat sa pinakagrabe.</li>
      <li><b>Ang malinawon nga “mata”:</b> mobalik ang bagyo gikan sa pikas bahin. Pabilin sa sulod.</li>
      <li><b>Human:</b> likayi ang natumba nga linya sa kuryente ug tubig-baha. Susiha ang atop ug dingding sa dili pa magpahulay. Pabukala ang tanang inomon nga tubig.</li></ul>
      <p class="callout">Ang storm surge mahimong moabot nga gamay ra ang pahibalo. Kung gisugo sa opisyal ang mga pamilya sa baybayon nga mo-evacuate, lakaw.</p>` },
    gd7: { title: "Linog", html: `
      <ul><li><b>Sulod sa balay:</b> drop, tabuni ang ulo ug liog, ug kupot ilalom sa lig-on nga lamesa. Layo sa bintana ug bug-at nga estante.</li>
      <li><b>Gawas:</b> pahilayo sa building, poste ug kahoy.</li>
      <li><b>Sa baybayon:</b> kung kusog o taas ang pag-uyog, dangat sa taas nga dapit dayon. Ayaw paghulat og pahibalo.</li>
      <li><b>Human:</b> asahi ang aftershock. Susiha kung naay nasamdan. Kung makahumot og gas, ablihi ang bintana ug biya. Susiha ang building sa dili pa mosulod pag-usab.</li></ul>` },
    gd8: { title: "Baha", html: `
      <ul><li>Lakaw sa mas taas nga dapit sayo. Ayaw og lakaw o drive agi sa nagadagan nga tubig. Bisan gamay nga lalom makapukaw sa hamtong.</li>
      <li>Patya ang main nga kuryente kung nagtaas ang tubig ug luwas kini buhaton.</li>
      <li>Likayi ang tubig-baha. Kung nakalubog ka niini, hugasi og maayo ug sultihi ang health center. Ang leptospirosis peligro, ug mahimong ihatag ang preventive nga tambal.</li></ul>` }
  }
};

/* the printable fridge sheet, in both languages */
const SHEET = {
  en: {
    title: "Family emergency sheet", meet: "We meet at", m1: "First choice (near home)", m2: "Second choice (outside the area)", m3: "Out-of-town place",
    out: "Contact outside the area", people: "People", nums: "Emergency numbers", places: "Important places", bag: "Go-bag",
    bagItems: ["Water and food", "Light and radio", "Medicine and first aid", "Papers and cash", "Clothes and raincoat", "Hygiene items and whistle"],
    blocks: [
      ["Typhoon", ["Before: listen to PAGASA on the radio. Charge phones. Store water. Secure the roof. Leave early if you live near the sea or a river.", "During: stay in the safest room, away from windows. If told to evacuate, go.", "After: stay away from fallen wires and floodwater. Boil drinking water."]],
      ["Earthquake", ["Drop, cover your head and neck, hold on under a sturdy table.", "On the coast, if shaking is strong or long, go to high ground at once.", "After: expect aftershocks. If you smell gas, open windows and leave."]],
      ["Flood", ["Go to higher ground early. Never walk or drive through moving water.", "Switch off the main power if it is safe.", "After wading in floodwater, wash well and tell the health center."]],
      ["Tsunami: shake, drop, roar", ["Strong shaking, the sea pulling back or rising, or a loud roar: go up or far inland at once.", "Do not wait for a siren. Do not stop for photos."]]
    ],
    emergency: "Emergency: 911", foot: "Print again after you change names, numbers or places.", none: "(not filled in)"
  },
  ceb: {
    title: "Papel sa emerhensya sa pamilya", meet: "Magkita mi sa", m1: "Una nga kapilian (duol sa balay)", m2: "Ikaduha nga kapilian (gawas sa lugar)", m3: "Lugar sa laing lungsod",
    out: "Kontak sa gawas sa lugar", people: "Mga tawo", nums: "Mga numero sa emerhensya", places: "Importanteng mga lugar", bag: "Go-bag",
    bagItems: ["Tubig ug pagkaon", "Suga ug radyo", "Tambal ug first aid", "Papeles ug kuwarta", "Sinina ug kapote", "Hygiene ug pito (whistle)"],
    blocks: [
      ["Bagyo", ["Sa dili pa: patalinghog sa PAGASA sa radyo. I-charge ang telepono. Tipigi ang tubig. Hugti ang atop. Biya sayo kung duol ka sa dagat o suba.", "Atol: pabilin sa pinakaluwas nga kwarto, layo sa bintana. Kung gisugo mo-evacuate, lakaw.", "Human: likayi ang natumba nga kable ug tubig-baha. Pabukali ang inomon nga tubig."]],
      ["Linog", ["Drop, tabuni ang ulo ug liog, kupot ilalom sa lig-on nga lamesa.", "Sa baybayon, kung kusog o taas ang uyog, dangat sa taas dayon.", "Human: asahi ang aftershock. Kung makahumot og gas, ablihi ang bintana ug biya."]],
      ["Baha", ["Lakaw sa mas taas nga dapit sayo. Ayaw tabok o drive sa nagadagan nga tubig.", "Patya ang main nga kuryente kung luwas.", "Human nga nakalubog sa tubig-baha, hugasi og maayo ug sultihi ang health center."]],
      ["Tsunami: shake, drop, roar", ["Kusog nga uyog, pagkunhod o pagtaas sa dagat, o kusog nga dalogdog: dangat sa taas o layo sa yuta dayon.", "Ayaw paghulat og sirena. Ayaw undang para sa litrato."]]
    ],
    emergency: "Emerhensya: 911", foot: "I-print pag-usab kung mausab ang ngalan, numero o lugar.", none: "(wala pa mapuno)"
  }
};

Object.assign(CEB.figs, {
  q_water: "Himoa nga luwas ang tubig: pahulaga ug salaga sa limpyong tela, pabukala sa 1 ka minuto, unya palabyi ug tabuni sa limpyo nga sudlanan.",
  q_bleed: "Grabe nga pagdugo: pidyoga og lig-on ang samad gamit ang limpyong tela, dugangi og tela kung mabasa (ayaw kuhaa), ug itaas ang bukton o tiil kung kaya.",
  q_cpr: "CPR: ibutang ang kamot sa tunga sa dughan, pidyoga og kusog ug dali, mga 5–6 cm ang lalom, 100–120 ka higayon kada minuto. Ang tuldok nagpakita sa kumpas. Pahinumdom kini, dili pagbansay.",
  q_burn: "Paso: palabyi sa limpyo nga agos sa tubig sulod sa 20 ka minuto, tangtanga ang singsing sa dili pa mosubsob, tabuni og luag sa limpyong plastic wrap. Ayaw og yelo, toothpaste, mantikilya o lana.",
  q_ors: "Ilimnon sa balay: 1 ka litro nga limpyo (gibukalan ug gipabugnaw) nga tubig, 6 ka patag nga kutsarita nga asukar, tunga sa patag nga kutsarita nga asin. Hinay-hinay nga inom kanunay.",
  q_typhoon: "Bagyo: andam sayo, pabilin sa sulod layo sa bintana, ug human niini likayi ang natumba nga kable ug tubig-baha. Kung gisugo mo-evacuate, lakaw.",
  q_quake: "Linog: DROP sa kamot ug tuhod, COVER ilalom sa lig-on nga lamesa aron mapanalipdan ang ulo ug liog, HOLD ON hangtod mohunong ang uyog. Sa baybayon, dangat sa taas kung taas ang uyog.",
  q_flood: "Baha: lakaw sa mas taas nga dapit sayo. Ang mga 15 cm nga nagadagan nga tubig makapukaw sa hamtong ug ang 30 cm makalutaw sa daghang sakyanan. Ayaw tabok o drive niini.",
  q_food: "Pagkaon nga walay ref: pangaon sa una ang presko ug luto, itaktak ang hubag, tulo o lubog nga lata, hugasi ang kamot gamit ang sabon ug limpyong tubig. Kung nagduha, ilabay.",
  q_signal: "Pagsenyas og tabang: tulo sa bisan unsa (pito, suga, kalayo, singgit), hayag nga panapton o salamin, ug HELP nga dako sa yuta. Pabilin kung nakasenyas na."
});
