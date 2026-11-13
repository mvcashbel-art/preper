# Andam (Prep for survival): family readiness app

Handa works on phones and keeps working without internet after the first visit.
Everything you type stays on your own phone.

## Put it online (GitHub Pages, free)
1. On github.com, create a new repository (for example "Handa").
2. Upload everything in this folder, keeping the folders `fonts` and `icons`.
3. Go to Settings > Pages. Under "Build and deployment", choose "Deploy from a branch", branch `main`, folder `/ (root)`, then Save.
4. After a minute your address appears at the top of that page. It looks like `https://YOUR-NAME.github.io/Handa/`.

## Put it on each phone
1. Open the address once, with internet.
2. Android (Chrome): menu ⋮, then "Install app" or "Add to Home screen".
   iPhone (Safari): Share button, then "Add to Home Screen".
3. Open Handa from the home screen. It now works with no internet.

## Good to know
- The page can be opened by anyone who has the link, but it only contains the generic checklist and guides. Names, phone numbers, notes, and prices you type never leave your phone.
- Each phone keeps its own checklist. Use Settings > Back up to copy your entries to another phone.
- If you change any file later, open `sw.js` and change `VERSION = "handa-v1"` to `"handa-v2"` so phones pick up the update.
- Prices come from Philippine shop listings seen in November 2026. Check current prices before you buy.
- Radios and satellite devices are regulated by the NTC. Ask an authorized dealer first.

## What is new in v2
- Levels tab: every area (food, water, solar, generators, growing, shelter, radios, medical, cooking fuel, sanitation) as a ladder from days to years, scaled to your household size.
- Animated icons play only while a section is open or a tile is pressed. Settings > Animations > Off saves battery.
- If a phone still shows the old version, close the app fully and reopen it once with internet.

## What is new in v3 (Guides)
- **Guides tab** now has 23 step-by-step guides in 7 groups: Start here, Power, Water and food, Growing, Shelter and safety, Radios/health/sanitation, and the offline library (NOMAD).
- Every guide has: what to buy (tick list with Philippine prices), what to do (numbered steps you can tick), a picture for key steps, a warning box, and sources.
- **Start here** is for people who know nothing about technology: the first 5 things, how to use this app, and a plain-language glossary.
- **Solar 1** has a live calculator: enter your appliances and it shows panel, battery and inverter size.
- **NOMAD for everyone** explains the offline library in plain words, with fields to write down your Wi-Fi name and helper's phone (no passwords are stored).
- Levels now links to the matching guides ("Step-by-step guides" buttons).
- Prices are Nov 2026 listings and "Estimate" items are rules of thumb. Solar wiring needs a licensed electrician. Underground bunkers need an engineer.
- Update: replace the old folder and reopen once online; the app refreshes itself (cache handa-v3).

## What is new in v4
- **8 more guides:** tsunami/landslide/fire/volcanic ash; babies, older people and anyone who needs extra help; pets and farm animals; money, papers and phones that stop working; staying calm; getting around (fuel, vehicles, walking out); food from the land and sea (with red tide warnings for Leyte); hygiene for women and girls.
- **Bisaya (Cebuano):** Settings, then Language. Translated: the tab names, "Start here", "Using this app", the glossary, the quick guides (water, bleeding, CPR, burns, dehydration, typhoon, earthquake, flood) and the printed sheet. Other guides stay in English and say so. Please have a Bisaya speaker check the wording.
- **Dates: food and medicine** (Plan tab): add items with a use-by date. The list shows Expired and Soon (30 days) in colour.
- **Months to finish buying** (Plan tab): turns the price you entered for items still to buy into a monthly amount.
- **Important places** (Family tab): high ground, evacuation center, clinic, water. "Use my location" saves coordinates that work with no internet and can open a maps app.
- **Share with family** (Family tab): sends your people, numbers, meeting places and important places as a text. A sister or parent pastes it under "Add to this phone". It adds without erasing and never duplicates. Dates and ticks are not shared.
- **My photo** on every "what to buy" line: take or choose a photo of the item you bought. Photos stay on this phone only and are not in the backup.
- **Fridge sheet** (top of Guides): one printable page with meeting places, numbers, places, typhoon/earthquake/flood/tsunami steps and the go-bag. English or Bisaya.
- Update: replace the old folder and open the app once online (cache handa-v4).

## What is new in v5 (animated picture-guides)
- Every Quick guide now opens with an animated picture: water, heavy bleeding, CPR, burns, dehydration (ORS), typhoon, earthquake, flood, food safety and signalling for help.
- The panels light up one after another (1, 2, 3) while the guide is open, and the main action loops: water pouring, boiling, hands pressing the chest at 100-120 a minute, the earthquake shake, wind and rain, the flood rising.
- Animations only run while a guide is open. They stop with Settings, Animations, Off, and with your phone's reduced-motion setting.
- The words inside the pictures follow the language setting (English or Bisaya).
- Update: replace the old folder and open the app once online (cache handa-v5).

## v6 (language, people count, offline)

- **Bisaya now covers the whole app**: header, tabs, Plan (including the 100 checklist items), Levels, Family, Comms, Drill and Settings. Lines with no Bisaya entry stay English (the long detail text inside each Levels step, item details, and the guides that have no translation). Edit or add lines in `i18n2.js` (`X` for whole lines, `RX` for lines with numbers). The Bisaya was written by Claude: ask a Bisaya speaker to read it.
- **People count**: the number you set in Levels ("How many people") now changes the amounts in the guides and on the Plan list (water, rice, cans, jugs, space, bags). In guide text, `{n}` is the people count, `{ppl}` is "5 people", `{n*12}` is 12 per person, `{n*12/19}` rounds up.
- **Tap a section** in Plan, Levels or Guides: it opens, the one you had open closes, and the page scrolls so it sits at the top.
- **Offline**:
  1. Put the `andam` folder on any HTTPS host (GitHub Pages, Netlify, Cloudflare Pages).
  2. On each phone, open the address once with internet. The app saves every file itself (the service worker, `sw.js`). Settings should then say "Ready: works without internet".
  3. Install it ("Add to Home screen"). After that it opens with no internet, and updates itself when you are next online (change `VERSION` in `sw.js` when you change files).
  4. `andam-offline.html` is the same app in one file. It needs no hosting: save it in the phone's Files, on a USB stick, or send it in a chat, then open it in Chrome. Caveat: on some phones a file opened this way may not keep what you type. If the app warns that saving is blocked, use the hosted copy instead.

## v7: "Send this app"

- Settings has a new "Send this app to another phone" button. It packs the whole app into one file (`Andam.html`) from the saved copy, with no internet, and opens the phone's share menu (Bluetooth, Nearby Share). If the phone can't share files it saves the file to Downloads instead.
- Where to put the files: GitHub Pages is fine and is free. Put the `andam` folder contents in a repository, turn on Pages, and open the address once on every phone. Keep `andam-offline.html` in the same repository too (people can download it), and a copy on a USB stick and on the NOMAD server.

## v8: guide sections

- In Guides, each heading (Start here, Power, Water and food, ...) is now a tappable section. Tapping it opens its guides below it, closes the other sections and scrolls it to the top. Opening a guide from Levels opens the right section.

## v9: honest offline status

- Settings now says what is really happening: "Ready: works without internet (22 files saved)", or why saving failed (not https, a file missing on the host, or a browser that blocks it). "Checking…" no longer stays forever.

## v10

- If offline saving fails because files are missing on the web host, Settings now lists the missing file names (for example `icons/maskable-512.png`). Upload them with the same folder names. GitHub Pages is case-sensitive: `Fonts/` and `fonts/` are different folders.

## v11: renamed to Andam (Prep for survival)

- The app is now called **Andam – Prep for survival** (header, install name, share file `Andam.html`, backups `andam-backup-…`). Entries already saved on phones are kept: the internal storage names (`handa.v1`, backups and family codes marked `handa`) were left as they were on purpose.
- The first time a phone opens v11 it saves a fresh copy under the new cache name `andam-v11` and removes the old one.

## v12: logo

- New logo: the letter A drawn as a shelter with a lantern flame inside. Files: `icons/logo.svg` (source), `icon-192.png`, `icon-512.png`, `maskable-512.png`, `apple-touch-icon.png` (home screen icons), and the small mark in the header. The subtitle is hidden on very narrow screens (under 360 px).

## v13: round logo

- The logo is now round everywhere: the header badge, the browser tab icon and the home-screen icons (`icon-192.png`, `icon-512.png`). `maskable-512.png` and `apple-touch-icon.png` stay full squares on purpose: Android and iPhone cut them into a circle or rounded square themselves.
- Changing files only shows after the browser loads the new copy: reload twice (the first reload fetches it, the second shows it). To check what the host has, open `your-address/sw.js` and read the version line (`andam-v13`).

## v14: expiry reminders

- Plan > "Expiry dates and reminders": add an item with its type (food, medicine, water, batteries, other), how many, where it is kept and the expiry date. The list is sorted by the nearest date and colored: red (expired or within a week), amber (within your warning window), green (fine).
- A yellow "Check your dates" banner shows at the top of every tab when something is expired or inside the warning window. "See them" jumps to the list; "Hide for today" hides it until tomorrow.
- "Warn me this many days before": 7, 14, 30, 60 or 90 days (default 30).
- "Add the dates to my phone's calendar" makes one `.ics` file with an all-day event per item, with an alarm before the date (at 9 am, your warning window ahead) and on the day (9 am). The phone's calendar then reminds you even when the app is closed. The app itself cannot ring while it is closed (phones don't allow that for offline web apps), which is why the calendar file exists.

## v15
- Expiry warnings now use weeks, months and years: choose 1 week, 2 weeks, 1 month, 2 months, 3 months, 6 months, 1 year or 2 years.
- Time left shows as days, weeks, months or years (for example "3 weeks left", "1 year 3 months left").
- Calendar file (.ics) reminds you at your chosen time, 1 month, 1 week, and on the day itself.

## v16
- New **Storage** tab (box icon): everything you have stored, in one place.
- Grouped by type (easily spoiled, vegetables and fruit, canned and dry food, medicine, water, batteries, other) or by where it is kept. Search, filter chips, and an "Expiring soon" filter.
- Vegetables, fruit, meat, fish and milk are flagged 3 days before they spoil; everything else uses your chosen reminder time.
- The expiry list moved out of Plan into Storage; "See them" on the top banner opens it.

## v17
- **Tip of the day** card at the top of Plan (38 tips, English and Bisaya). "Next tip" shows another; many tips open the matching step-by-step guide.
- **Monthly check** (8 ticks, starts over on the 1st), with a "Monthly check 3/8" badge in the tip card and a calendar file that repeats every month.
- **Season reminders** for hot months, typhoon season and the cooler rainy months. The current season is on top.
- 3 new animated quick guides: Wash your hands, Cook safely when the power is out, Before you leave home. Quick guides "Food safety" and "Signal for help" now also have Bisaya text.
- New file `tips.js` must be uploaded with the rest.

## v18
- **Warnings near you** (top of Plan): rain, wind, heat, earthquakes and storms for Isabel, Leyte and any places you add (GPS "Use my location now", or search a town). Uses free Open-Meteo, USGS and NASA EONET. Needs internet; offline you see the last check. Not an official warning. Files: new `alerts.js`.
- Red banner on every tab when a Warning or Danger is found (hide for today).
- Places in Family can have a hazard or use (floods, landslide, evacuation center...); notes near a watched place show in its warnings.
- **How long your storage lasts** (Storage tab): days of water and food for the people count.
- **Quick text to the family** (Comms): "I'm safe", "I need help"... opens your messages with all numbers; optional location link.
- "New version ready - Update now" banner when an update downloads.
- Monthly check has a backup item; Settings shows the last backup date.
- "Send my shopping list" button in Plan.
- Offline status should now say 25 files saved.

## v19
- **Map** (map icon at the top, beside Settings): your saved places (evacuation centers, safe places, flood, landslide, storm surge and fire spots), warnings from the last check, your location, and hospitals, clinics, police, fire stations, shelters and schools nearby. Tap "Add a place", then tap the map to save one. "Find help nearby" saves a list on the phone for offline.
- Map pictures need internet (OpenStreetMap). Offline you still get a list with distance and direction from you or from home, plus a link to your maps app. For full offline maps, install the free Organic Maps app.
- Optional rain radar and cloud picture (RainViewer). They switch themselves off if the service is not available.
- **Emergency ID card** (Family tab): big text screen with name, blood type, allergies, conditions, medicines and contacts. Can be printed. It is in your backup but not in the family page you share.
- **Family drill reminder** (Plan tab): appears when the last drill (Drill tab) was 6 months ago or never. "Remind me in a week" hides it. The Drill tab shows how long ago and gives a different scenario each month.
- **Photos on places** (Family tab): add a photo, for example a picture of the barangay evacuation map. The photo shows in the map popup. Photos stay on the phone and are not in the backup.
- **Listen** button on guides (English only, uses the phone's voice).
- Warnings when the app is closed: see the separate `andam-push-alerts` package and its README.
- New files to upload: `mapview.js` and the `lib` folder (`lib/leaflet.js`). Leaflet is BSD-2 licensed.
- Offline status should now say 27 files saved.

## v20
- 9 new quick guides (Guides tab, "Quick guides"), each in English and Bisaya: Choking, Broken bone or sprain, Heat stroke, Snake and dog bites, After a flood (dirty water and leptospirosis), Electric shock and fallen wires, Stroke and heart attack signs, Gas (LPG) leak, Fever and dengue.
- Upload the changed files: `data.js`, `i18n.js`, `sw.js`, and this `SETUP.md`. Settings should still say 27 files saved.
- Please have a Bisaya speaker read the new Bisaya text once. These are first-aid and safety instructions, so wording matters.

## v21: friendlier Andam
- **New Home screen** (first tab). Big buttons: "I need help now" (911, Red Cross 143, text the family, your ID card, call your people, first-aid guides) and "I'm safe" (texts your family). Below: "What's happening?" (earthquake, typhoon, flood, fire, someone hurt, fever, no power, no water, leaving home) opens the right guide in one tap. Tiles show warnings, family numbers, your stored things and the next drill. "Get ready in 3 small steps" shows until done.
- **Simple layout by default**: only 4 buttons at the bottom (Home, Guides, Family, More). Everything else is under More. Settings > Layout > Full brings back the extra buttons.
- English / Bisaya switch is on the Home screen.
- **Fridge sheet** (More > Print the family sheet) now has evacuation centers, safe places, places to avoid and a route. Add the route in Family, under the meeting places.
- **Drill alarm and timer** (Drill tab): "Start with alarm" plays a siren and vibrates, then counts up to the 10-minute goal. "Add the next drill to my calendar" makes a calendar file with reminders every 6 months. A closed web page cannot ring an alarm, so the calendar does that part.
- 4 new guides, English and Bisaya: Drowning and water rescue, Lightning, Cuts/wounds and infection, Fever in a child.
- Upload every changed file: `app.js`, `index.html`, `styles.css`, `data.js`, `i18n.js`, `i18n2.js`, `sw.js`, `SETUP.md`. No new files. Settings should still say 27 files saved.
- Please have a Bisaya speaker read the new guides and the help screen once.

## v22: after the disaster, and care checklists
- 4 new guides (English and Bisaya): After the disaster: the first day; Damage check and clean-up; Getting help and rebuilding; Stress and feelings after a disaster (it includes the NCMH Crisis Hotline 1553, 0919-057-1553 and 0917-899-8727, taken from DOH news in Dec 2025 to Jan 2026. Please check them once).
- Home "What's happening?" has two new buttons: After the disaster, and Feeling scared or very stressed.
- 3 new checklists in the Plan tab: Babies and young children, Older adults and people with illness or disability, Medicines and health records. Each has prices, details and Bisaya text.
- Upload the changed files: `data.js`, `app.js`, `i18n.js`, `i18n2.js`, `sw.js`, `SETUP.md`. No new files. Settings should still say 27 files saved.
- Please have a Bisaya speaker read the new guides and checklists, and a doctor or nurse read the baby and medicine notes.

## v23: opening screen
- A 5-second opening screen with the Andam logo and a progress bar. Tap anywhere to skip it. An "Emergency? Get help now" button on it opens the help screen straight away.
- It shows every time the app or website is opened or reloaded. Settings > Opening screen > "Skip it" turns it off.
- Upload the changed files: `index.html`, `app.js`, `styles.css`, `i18n2.js`, `sw.js`, `SETUP.md`. No new files.

## v24: six more guides
- New guides (English and Bisaya): Earthquake in a tall building, car, school and on the coast; Landslide warning signs; Storm surge and tsunami (when to move); Pregnancy and childbirth in an emergency; Living in an evacuation center; Someone is trapped.
- Home "What's happening?" now shows the 8 most common situations, and "More situations" opens the rest.
- Please have a midwife or nurse read the pregnancy and childbirth guide, and a Bisaya speaker read all six, before you share the app.
- Upload the changed files: `data.js`, `i18n.js`, `i18n2.js`, `app.js`, `styles.css`, `sw.js`, `SETUP.md`. No new files.

## v25: opening screen waits until the app is really ready
- The opening screen now shows on every open and every reload (v23 showed it only once per visit, so a reload looked like nothing happened).
- It stays at least 5 seconds. If the page, fonts or offline files are still loading after 5 seconds, it stays up (up to about 14 seconds) and says "Almost ready, still loading". Tap anywhere to skip.
- Upload the changed files: `index.html`, `app.js`, `i18n2.js`, `sw.js`, `SETUP.md`.

## v26: El Niño, and news headlines
- **El Niño.** A notice card on Home (hidden after 30 June 2027, or when you tap Hide), a new guide "El Niño: drought, water and heat" (English and Bisaya), and a new Plan checklist "El Niño: drought and heat". The notice text says "checked 13 Nov 2026" because it is written by hand. Check PAGASA's monthly El Niño advisory and tell me when to update it.
- **News headlines.** The top of the Home screen (under the two big buttons) has "News right now" with two tabs: Weather and calamities, and War and nuclear. "All headlines" opens a longer list, and More > News opens it too. Headlines load when there is internet (at most every 30 minutes, or tap Refresh) and are saved on the phone. With no internet, the last saved headlines are still shown with the time they were saved, and a warning if they are more than a day old.
- Headlines come from the free GDELT news index (api.gdeltproject.org). It sends only the title, the website and the link. Tapping a headline opens the news website. GDELT allows one request every 5 seconds, so Refresh may wait a few seconds. It sees the phone's internet address, like any website. Settings > News headlines > "Hide news" turns it off.
- Saved headlines are not included in backups.
- Upload the changed files: `data.js`, `app.js`, `i18n.js`, `i18n2.js`, `index.html`, `styles.css`, `sw.js`, `SETUP.md`. No new files.

## v27: log in so your info follows you to any phone

New files to upload: `sync.js`, `sync-config.js`. Also upload the changed `app.js`, `index.html`, `styles.css`, `i18n2.js`, `sw.js`.
The login stays hidden until you do the one-time sync server setup in `SYNC-SETUP.md` and paste its address into `sync-config.js`.
The opening screen is now 3 seconds (it waits longer only if the page is not ready).

## v29: login icon in the header
A small person icon sits next to Map and Settings. A green dot means you are logged in and saved; an orange dot means sync has a problem. The Home card shows only until someone logs in.
Files changed: `app.js`, `sync.js`, `index.html`, `styles.css`, `i18n2.js`, `sw.js`.
