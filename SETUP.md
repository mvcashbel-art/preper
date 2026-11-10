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
