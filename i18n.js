/* Handa v4: Bisaya (Cebuano) text. English stays the default.
   Anything not translated here shows in English. Please have a Bisaya speaker read it
   and tell me any word that sounds wrong. */

const CEB = {
  ui: {
    "Plan": "Plano", "Levels": "Lebel", "Family": "Pamilya", "Comms": "Komunikasyon", "Guides": "Giya", "Drill": "Praktis", "Storage": "Tipiganan",
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
      intro: "Ang Andam usa ka app nga mugana sa imong telepono bisan walay internet. Ang imong mga tsek ug nota magpabilin sa imong telepono ra.",
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
      <li>Likayi ang tubig-baha. Kung nakalubog ka niini, hugasi og maayo ug sultihi ang health center. Ang leptospirosis peligro, ug mahimong ihatag ang preventive nga tambal.</li></ul>` },
    gd9: { title: "Luwas nga pagkaon kung walay ref", html: `
      <ul><li>Kan-a una ang presko ug luto nga pagkaon. Sunod ang frozen. Ang lutong pagkaon dili angay mapabilin sa gawas sulod sa sobra sa duha ka oras sa init.</li>
      <li>Ilabay ang de-lata nga namanggas, nagtulo, o lawom ang lubag.</li>
      <li>Hugasi ang kamot gamit ang sabon ug limpyong tubig sa dili pa mokaon o magluto.</li>
      <li>Kung naduha-duha ka, ilabay na.</li></ul>` },
    gd10: { title: "Pagsenyas og tabang", html: `
      <ul><li>Ang tulo sa bisan unsa maoy senyas sa panginahanglan: tulo ka huyop sa pito, tulo ka silaw sa suga, tulo ka kalayo, tulo ka singgit.</li>
      <li>Gamita ang hayag nga panapton, salamin, o flashlight sa abli nga dapit, ug isulat ang HELP sa dako nga letra sa yuta o atop.</li>
      <li>Pabilin sa dapit human makasenyas, gawas kung dili kini luwas.</li></ul>` },
    gd14: { title: "Hugasi ang kamot", html: `
      <ol><li>Basaha ang kamot gamit ang limpyong tubig ug butangi og sabon.</li>
      <li>Kuskusa sulod sa 20 segundo: palad, likod sa kamot, tunga sa mga tudlo, ilawom sa kuko.</li>
      <li>Hunawa gamit ang limpyong tubig ug pauga-a gamit ang limpyong tela o hangin.</li></ol>
      <p>Maghugas sa dili pa mokaon o magluto, human sa kasilyas, human maghinlo sa bata, ug human mag-atiman sa masakiton.</p>
      <p class="hint">Walay sabon? Ang limpyong abo sa kahoy nga ikuskos sa basa nga kamot mas maayo kaysa tubig lang. Ibubo ang tubig gikan sa banga aron dili mahikap sa kamot ang gripo o sudlanan.</p>` },
    gd15: { title: "Luwas nga pagluto kung walay kuryente", html: `
      <ol><li>Pagluto sa gawas, o sa abli kaayo nga dapit nga naay atop. Dili sa sulod sa balay, ug dili sa sirado nga lawak.</li>
      <li>Ibutang ang kalan, uling o kalayo labing menos 1 metro gikan sa dingding, atop, kurtina ug uga nga dahon.</li>
      <li>Ayaw biyai ang kalayo. Ilikay ang bata ug binuhi. Butangi og timba nga tubig o balas sa kilid.</li>
      <li>Kung tapos na, ibubo ang tubig sa baga ug siguroha nga bugnaw na sa dili ka mobiya.</li></ol>
      <p class="callout">Ang aso gikan sa uling, gas, gaas ug generator makapatay, bisan wala nimo madungog ang baho. Naay sakit sa ulo, nahilo o nagkagrabe ang pamati? Gawas dayon sa presko nga hangin ug pangita og tabang.</p>` },
    gd16: { title: "Sa dili pa mobiya sa balay", html: `
      <ol><li>Patya ang main nga kuryente. Sirad-i ang balbula sa LPG.</li>
      <li>Dad-a ang go-bag, tambal, telepono nga naay power bank, ug imnon nga tubig.</li>
      <li>Dad-a ang imong mga dokumento sa plastik nga bag.</li>
      <li>Kandadoi ang balay. Sultihi ang pamilya ug usa ka silingan kung asa ka paingon.</li>
      <li>Adto sa evacuation center agi sa luwas nga dalan. Ayaw og lakaw o drive agi sa tubig-baha.</li></ol>` },
    gd17: { title: "Pagkasakal", html: `
      <p>Molihok kung ang tawo dili makasulti, makaubo o makaginhawa, o gigunitan ang iyang tutunlan. Kung makaubo pa siya, pasagdi siya nga mag-ubo.</p>
      <p><b>Hamtong o bata nga labaw sa 1 ka tuig:</b></p>
      <ol><li>Singgit og tabang. Barog sa luyo sa tawo.</li>
      <li>Hatagi og 5 ka kusog nga antak sa likod, sa tunga sa abaga, gamit ang tumoy sa imong palad.</li>
      <li>Dayon hatagi og hangtud 5 ka pug-ot sa tiyan: higot ang kamao sa ibabaw sa pusod, gunita sa laing kamot, ug pug-ta og kusog paingon sa sulod ug taas.</li>
      <li>Balika ang 5 ka antak ug 5 ka pug-ot hangtud mogawas ang nakasangko o mahagba ang tawo.</li></ol>
      <p><b>Masuso nga ubos sa 1 ka tuig:</b> ihaylo ang masuso nga nakadapa sa imong butkon, mas ubos ang ulo kaysa lawas. Hatagi og 5 ka antak sa likod, dayon balihon ug hatagi og 5 ka pug-ot sa dughan gamit ang duha ka tudlo sa tunga sa dughan. Balika.</p>
      <p>Kung dili na motubag ang tawo, mohangyo og tabang ug sugdi ang CPR. Ang bisan kinsa nga nasakal ipa-check sa doktor human niini.</p>
      <p class="hint">Buntis o hilabihan ka dako nga tawo: dughan ang pug-ta imbes tiyan.</p>` },
    gd18: { title: "Bali nga bukog o pilay", html: `
      <p>Timailhan: kusog nga sakit, hubag, baliko o lahi nga porma, dili na maglihok o dili na makabarog.</p>
      <ol><li>Pahulaya ang tawo nga dili maglihok. Ayaw sulayi nga ituwid ang baliko nga bukton o tiil.</li>
      <li>Pahunong una ang dugo (pugngi gamit ang limpyo nga tela). Taplaki ang bukas nga samad.</li>
      <li>Sa splint ipalig-on ang bahin: tul-id nga sungkod, rolyo nga diyaryo o gipilo nga karton sa duha ka kilid, higta gamit ang tela sa ibabaw ug ubos sa samad. Ayaw pag-higot og hugot kaayo: ang tudlo kinahanglan nga mahabilin nga rosas ug mainit.</li>
      <li>Ipataas kini kaysa kasingkasing kung mahimo. Cold nga tela sa hubag sulod sa 20 ka minuto sa matag higayon, ayaw ibutang ang yelo direkta sa panit.</li>
      <li>Adto sa doktor o ospital. Gamita ang stretcher o pas-ana ang tawo kung ang tiil, hips, likod o liog ang nasamdan.</li></ol>
      <p class="hint">Samad sa liog o likod, o ang bukog migawas sa panit: ayaw ibalhin ang tawo gawas kung naay peligro (sunog, pagkahugno). Mohangyo og tabang.</p>` },
    gd19: { title: "Heat stroke (pagkaluya sa kainit)", html: `
      <p>Timailhan: init kaayo nga panit, kalibog, paghikap, paspas nga pulso, sakit sa ulo, kombulsyon. Mahimong mohunong ang tawo sa pagpawis. Emergency kini.</p>
      <ol><li>Ibalhin ang tawo sa landong o bugnaw nga dapit. Mohangyo og tabang (911) o dad-a sa ospital.</li>
      <li>Hukasa ang sobra nga sinina. Palabyon dayon ang lawas: basa nga tela o espongha sa liog, ilok ug singit, palaypayi ang tawo, ug ibubo ang bugnaw (dili yelo) nga tubig sa panit.</li>
      <li>Kung bug-os nga mata ug makalulun, hatagi og gamay nga tulo-tulo nga bugnaw nga tubig. Ayaw pugsa ang tawo nga naay kalibog o inantok.</li>
      <li>Padayon sa pagpabugnaw hangtud moabot ang tabang. Kung mohunong ang tawo sa pagtubag o paghinga, sugdi ang CPR.</li></ol>
      <p class="hint">Paglikay: inom og tubig kanunay, pahulay sa landong sa udto, ug ayaw biyai ang bata o tigulang sa sirado nga sakyanan o init nga lawak.</p>` },
    gd20: { title: "Pangaon sa man-og ug iro", html: `
      <p><b>Pangaon sa man-og</b></p>
      <ol><li>Dumili sa man-og. Pakalmaha ang tawo ug pabilina nga dili maglihok: ang paglihok nagpadali sa pagkaylap sa hilo.</li>
      <li>Pabilina ang gipangaon nga bukton o tiil nga dili maglihok ug gamay nga mas ubos kaysa kasingkasing. Hukasa ang singsing ug relo sa dili pa mohubag.</li>
      <li>Adto dayon sa ospital. Pas-ana ang tawo kung mahimo. Kung luwas, hinumdomi kung unsa ang hitsura sa man-og. Ayaw ihaw o dakpa kini.</li></ol>
      <p><b>Ayaw</b> pagtigi sa samad, ayaw suyopa, ayaw sunoga, ayaw gamita ang hugot nga higot, ug ayaw butangi og tambal nga dahon o yelo.</p>
      <p><b>Pangaon sa iro, iring o ubang hayop</b></p>
      <ol><li>Hugasi dayon ang samad gamit ang sabon ug mahinagayon nga tubig sulod sa 15 ka minuto.</li>
      <li>Adto sa animal bite center o health center sa samang adlaw alang sa bakuna kontra rabies, bisan kung himsog tan-awon ang hayop. Kung mahimo, bantayi ang hayop.</li></ol>
      <p class="hint">Ang rabies halos kanunay makamatay kung nagsugod na ang sintomas, apan ang bakuna nga gihatag sayo makapugong niini.</p>` },
    gd21: { title: "Human sa baha: hugaw nga tubig ug leptospirosis", html: `
      <p>Ang tubig-baha ug lapok mahimong magdala og mikrobyo gikan sa ihi sa hayop, hugaw ug samad. Usa niini ang leptospirosis.</p>
      <ol><li>Likayi ang tubig-baha kung mahimo. Kung kinahanglan nga molakaw, magsul-ob og taas nga botas ug taplaki ang samad. Ayaw paligo, ug ayaw pasagdi nga magduwa ang bata niini.</li>
      <li>Maghugas gamit ang sabon ug limpyong tubig human niini, ug uga-a ang tiil. Hinloi ang bisan unsang samad ug pabilina nga natabonan.</li>
      <li>Ayaw inom sa tubig-baha o gamita sa paghugas og pagkaon o plato. Pagpabukal og tubig sulod sa 1 ka minuto una, o gamita ang imong tablet sa pagpanglimpyo sa tubig o bleach.</li>
      <li>Ilabay ang pagkaon nga nahikap sa tubig-baha, gawas sa selyado nga lata nga mahimo nimong hugasan ug uga-on una.</li></ol>
      <p><b>Adto sa health center sulod sa 1 ngadto sa 2 ka adlaw</b> kung naglakaw ka sa tubig-baha, labi na kung naay samad. Mahimo kang hatagan og tambal alang sa paglikay. Adto dayon kung makabaton og hilanat, pula nga mata, hilabihang sakit sa kaunoran (labi na sa bitiis), dilaw nga panit o mata, o mikunhod ang ihi sa misunod nga mga semana.</p>
      <p class="hint">Ayaw hurot og tambal nga ikaw ra. Ang health worker ang mohukom.</p>` },
    gd22: { title: "Pagkakuryente ug nahulog nga alambre", html: `
      <ol><li>Ayaw hikapa ang tawo o ang alambre. Mahimong moagi kanimo ang kuryente.</li>
      <li>Patya ang kuryente sa main switch o breaker kung luwas nimo kini maabot, o pahangyoa ang usa ka tawo nga tawagan ang kompanya sa kuryente.</li>
      <li>Kung dili nimo mapatay, isalibay ang tawo o alambre gamit ang uga nga butang nga dili mokonduktor, sama sa uga nga sungkod nga kahoy o uga nga silya nga plastik. Barog sa uga nga butang.</li>
      <li>Mohangyo og tabang (911). Kung luwas na, susiha ang paghinga. Kung dili na mo-hinga, sugdi ang CPR.</li>
      <li>Ang paso gikan sa kuryente mahimong lawom. Tabuni kini sa limpyo nga tela ug dad-a ang tawo sa doktor, bisan kung maayo ang iyang gibati.</li></ol>
      <p><b>Nahulog nga alambre sa gawas:</b> pabilin labing menos 10 metros ang gilay-on (mga duha ka dugayon sa jeepney), pasidaan ang uban, ug ilhon ang matag alambre nga naay kuryente. Kung ang alambre mohikap sa imong sakyanan, pabilin sa sulod ug hulata ang tabang gawas kung naay sunog.</p>
      <p class="hint">Human sa baha o bagyo, ayaw hikapa ang switch o appliance nga basa ang kamot o nagtindog sa tubig.</p>` },
    gd23: { title: "Timailhan sa stroke ug atake sa kasingkasing", html: `
      <p><b>Stroke: hinumdomi ang FAST</b></p>
      <ul><li><b>F</b>ace (nawong): ang usa ka kilid nanglubay kung mongisi.</li>
      <li><b>A</b>rms (bukton): ang usa ka bukton mahuyang o mokunhod kung gipataas ang duha.</li>
      <li><b>S</b>peech (pagsulti): mabantok, katingad-an, o dili makasulti.</li>
      <li><b>T</b>ime (oras): tawag sa 911 ug adto dayon sa ospital. Hinumdomi kung kanus-a nagsugod.</li></ul>
      <p>Kalit nga grabeng sakit sa ulo, pagkawala sa panan-aw, o kalisud sa paglakaw mahimo usab nga stroke. Ayaw hatagi og pagkaon o inumon.</p>
      <p><b>Atake sa kasingkasing</b></p>
      <ul><li>Pabug-at, pugos o sakit sa dughan, mokaylap sa bukton, apapangig, liog o likod. Pagpawis, pagkahilo, kakulang sa gininhawa. Ang mga babaye ug tigulang mahimong mobati lang og kakapoy, kasakit o kakulang sa gininhawa.</li>
      <li>Mohangyo dayon og tabang. Paglingkura ang tawo, luagi ang hugot nga sinina, ug pabilina nga kalmado ug dili maglihok.</li>
      <li>Kung mohunong siya sa pagtubag ug dili normal ang paghinga, sugdi ang CPR.</li></ul>
      <p class="hint">Ayaw paghulat nga mawala ra. Importante ang minuto. Ayaw pasagdi nga maglakaw o magmaneho siya nga mag-inusara.</p>` },
    gd24: { title: "Tagas sa gas (LPG)", html: `
      <p>Naamoy nimo ang gas (murag bulok nga itlog o repolyo), nadunggan ang sitsit, o nagtagas ang tangke.</p>
      <ol><li>Walay siga. Walay posporo, lighter o kandila. Ayaw i-on o i-off ang suga, bentilador o telepono, ug ayaw bunsa ang plug: ang kislap mahimong makasiga sa gas.</li>
      <li>Kung luwas ug paspas, sirad-i ang balbula sa tangke (lingia paingon sa tuo).</li>
      <li>Abri ang mga pultahan ug bintana. Paggawa ang tanan sa gawas, layo sa balay, ug pabilina ang bata ug mga binuhi nga kauban nimo.</li>
      <li>Gikan sa luwas nga gilay-on, tawga ang estasyon sa bomba (BFP) o ang imong barangay. Ayaw na pag-balik sa sulod.</li>
      <li>Biyai ang tangke sa gawas sa abli nga dapit hangtud nga masusi sa propesyonal. Ayaw pagsulay og tagas gamit ang siga. Hagoti og tubig nga sabon ang mga dugtong: ang mga bula nagpakita og tagas.</li></ol>
      <p class="hint">Ibutang ang tangke nga nagbarog, sa gawas o abli nga dapit, layo sa init. Ilisan ang daan nga hose ug regulator.</p>` },
    gd25: { title: "Hilanat ug dengue", html: `
      <p>Ang dengue mokaylap pinaagi sa lamok nga mopaak sa adlaw. Kuwestiyona kini kung kalit ug taas nga hilanat sulod sa 2 ngadto sa 7 ka adlaw, grabeng sakit sa ulo, sakit sa luyo sa mata, sakit sa lawas ug lutahan, o pantal.</p>
      <ol><li>Pahulay ug inom og daghang tubig (tubig, oral rehydration solution, sabaw).</li>
      <li>Alang sa hilanat o sakit, paracetamol lang. <b>Ayaw</b> inom og aspirin o ibuprofen: mahimo kining makapakusog sa pagdugo.</li>
      <li>Magpakonsulta sa doktor sayo. Ayaw paghulat nga mograbe.</li></ol>
      <p><b>Adto dayon sa ospital</b> kung mikunhod ang hilanat apan mograbe ang tawo: grabeng sakit sa tiyan, dili mohunong nga pagsuka, pagdugo (gilagid, ilong, itom nga tae), bugnaw o basa nga panit, hilabihang ka-antukon o kakulba, o lisod mamata.</p>
      <p><b>Paglikay (4S):</b> Pangitaa ug laglagon ang mga dapit nga nagtigom og tubig (lata, goma, kaldero, alulod); Panalipod sa kaugalingon gamit ang taas nga sinina ug repellent; Sayo nga pagpakonsulta; Suportahi ang pag-spray kung naay outbreak. Tabuni ang sudlanan sa tubig ug ilisi kada semana ang tubig sa plorera.</p>
      <p class="hint">Ang bisan unsang hilanat sa masuso nga ubos sa 3 ka bulan, o hilanat nga molapas sa 3 ka adlaw sa bisan kinsa, kinahanglan og doktor.</p>` }
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
  q_signal: "Pagsenyas og tabang: tulo sa bisan unsa (pito, suga, kalayo, singgit), hayag nga panapton o salamin, ug HELP nga dako sa yuta. Pabilin kung nakasenyas na.",
  q_hands: "Hugasi ang kamot: basaha ug gamitan og sabon, kuskusa sulod sa 20 segundo (palad, likod, tunga sa tudlo, ilawom sa kuko), unya hunawa ug pauga-a gamit ang limpyo nga tela.",
  q_fire: "Pagluto nga luwas: sa gawas lang, labing menos 1 metro gikan sa dingding ug masunog nga butang, dili biyaan, ug naay tubig o balas sa kilid. Kung tapos na, tunawi og tubig ang baga.",
  q_leave: "Sa dili pa mobiya: patya ang main nga kuryente ug sirad-i ang LPG, dad-a ang go-bag, tambal, telepono ug papeles, unya adto sa evacuation center agi sa luwas nga dalan."
});
