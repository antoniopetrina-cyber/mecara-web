// Sadržaj weba Mecara (HR/EN). Izvor: "MECARA — hrvatski i engleski tekstovi te SEO paket", 2. 11. 2026.
// Pravilo: ništa u uglatim zagradama ne ide na web. Nepotvrđene usluge su iza prekidača u SITE.

export const SITE = {
  host: "https://www.mecara.app",
  wip: true,              // radna verzija: noindex + traka na vrhu
  enquiryLive: false,     // true tek kad je WHATSAPP pravi broj i osoblje obrađuje upite
  whatsapp: "",           // npr. "385911234567" (bez +, bez razmaka)
  phone: "",              // npr. "+385 20 123 456" – prikazuje se tek kad je upisan
  email: "",
  legalName: "",          // pravni naziv trgovca
  oib: "",
  instagram: "https://www.instagram.com/_mecaradubrovnik/",
  maps: "https://www.google.com/maps/search/?api=1&query=Mecara+Kralja+Tomislava+7+Dubrovnik",
  // Radno vrijeme (potvrditi s vlasnikom). Nedjelja i državni blagdani zatvoreno.
  hours: { open: "07:00", close: "19:00", days: [1,2,3,4,5,6] },
};

export const ROUTES = {
  home:    { hr: "/",                    en: "/en/" },
  ponuda:  { hr: "/ponuda/",             en: "/en/meat-and-deli/" },
  komora:  { hr: "/odlezani-steakovi/#uzivo", en: "/en/dry-aged-steaks/#uzivo", alias: true },
  steak:   { hr: "/odlezani-steakovi/",  en: "/en/dry-aged-steaks/" },
  bbq:     { hr: "/meso-za-rostilj/",    en: "/en/bbq-meat/" },
  planner: { hr: "/meso-za-rostilj/#planner", en: "/en/bbq-meat/#planner", alias: true },
  villa:   { hr: "/vile-i-jahte/",       en: "/en/villa-yacht-meat-supply/" },
  workshops:{ hr: "/radionice/",         en: "/en/workshops/" },
  blog:    { hr: "/blog/",               en: "/en/blog/" },
  about:   { hr: "/o-nama/",             en: "/en/about/" },
  contact: { hr: "/kontakt/",            en: "/en/contact/" },
};

export const UI = {
  hr: {
    langName: "Hrvatski", other: "English", otherShort: "EN",
    nav: [["ponuda","Ponuda"],["steak","Komora"],["bbq","Roštilj"],["villa","Vile i jahte"],["workshops","Radionice"],["blog","Blog"],["about","O nama"],["contact","Kontakt"]],
    enquiryBtn: "Vaš upit", navLabel: "Glavna navigacija", skip: "Preskoči na sadržaj",
    wip: "RADNA VERZIJA", wipText: "Ovo je radna verzija stranice. Cijene, komadi u komori i dostupnost zasad su samo primjeri, a upiti još ne stižu do Mecare.",
    home: "Naslovnica", crumbs: "Putanja",
    addr: "Kralja Tomislava 7 · Lapad, Dubrovnik",
    hoursText: "Pon–Sub 7:00–19:00 · Nedjeljom i blagdanima zatvoreno",
    labels: { now: "Sada", address: "Adresa", hours: "Radno vrijeme", parking: "Parking" },
    parking: "Kupci imaju sat vremena besplatnog parkiranja na parkiralištu centra DOC i Tommyja.",
    statusLoading: "Radno vrijeme: Pon–Sub 7–19",
    footTitle: "Mecara, mesnica u Lapadu, Dubrovnik",
    footAddr: "Kralja Tomislava 7, 20000 Dubrovnik, Hrvatska",
    privacy: "Privatnost: ne koristimo kolačiće za praćenje ni analitiku. Vaš popis za upit ostaje samo u vašem pregledniku. Pošaljete li poruku WhatsAppom, ona ide preko te usluge. Poveznice na Instagram i Google karte vode na njihove stranice.",
    directions: "Upute za dolazak", call: "Nazovite nas",
    unit: { kg: "Prodaje se na kg", g100: "Prodaje se na 100 g", kom: "Prodaje se po komadu" },
    qty: "Željena količina", add: "Dodaj u upit", added: "Dodano u upit", less: "Manje", more: "Više",
    askAvail: "Pitajte za dostupnost", cutAdd: "Rezerviraj ovaj komad", reserved: "Rezerviran", ready: "Spreman", inDays: "Spreman za {n} d.", days: "dana",
    faqTitle: "Pitanja i odgovori",
    // ladica upita
    d: {
      title: "Vaš upit", close: "Zatvori upit", empty: "Popis je zasad prazan. Izaberite nešto iz ponude.",
      remove: "Ukloni proizvod", date: "Datum preuzimanja", time: "Vrijeme preuzimanja",
      name: "Ime i prezime", tel: "Broj mobitela", note: "Napomena za mesara",
      notePh: "Npr. odresci od 3 cm, svaki pakiran zasebno.",
      notConfirmed: "Proizvode i termin potvrđujemo porukom.",
      weigh: "Kod robe na vagu konačan iznos ovisi o tome koliko komad stvarno teži i o potvrđenoj cijeni.",
      prepare: "Pošalji upit", prepareWip: "Pošalji upit",
      ready: "Poruka je spremna, ali još nije poslana.",
      openWa: "Otvori WhatsApp i pošalji upit",
      afterOpen: "U WhatsAppu provjerite je li poruka otišla, pa pričekajte da vam Mecara potvrdi.",
      copy: "Kopiraj poruku", copied: "Poruka je kopirana.", copyFail: "Kopiranje nije uspjelo. Označite tekst i kopirajte ga sami.",
      wipNote: "Radna verzija: upit se sprema u Mecarin sustav, ali ga Mecara još ne prati redovito. Ako vam je hitno, javite se u trgovinu.", received: "Upit br. {id} je stigao. Mecara će vam odgovoriti porukom.", sending: "Šaljem upit…", netFail: "Upit nije spremljen zbog problema s vezom. Poruku možete kopirati.", full: "Popunjeno", seatsLeft: "slobodnih mjesta",
      noItems: "Dodajte barem jedan proizvod.", noName: "Upišite svoje ime.", badTel: "Provjerite broj mobitela i pozivni broj države.",
      noSlots: "Trenutačno nema ponuđenih termina. Javite nam se pa ćemo dogovoriti.",
      today: "Danas", tomorrow: "Sutra", piece: "komad po dogovoru", pcs: "kom", est: "Okvirni iznos", room: "Komora", reservedT: "Ovaj komad već je u vašem upitu.",
      openNow: "Otvoreno do 19:00", closedNow: "Zatvoreno · otvaramo u 7:00", closedSun: "Zatvoreno · otvaramo u ponedjeljak u 7:00", holiday: "Zatvoreno · blagdan",
      cartAria: "Otvori upit, broj stavki:", toastAdded: "Dodano u upit",
      msg: { head: "Upit za Mecaru", name: "Ime", contact: "Kontakt", when: "Željeni datum i vrijeme", products: "Proizvodi", est: "Okvirni iznos", note: "Napomena za mesara", end: "Molim potvrdu dostupnosti, cijene ili načina obračuna na vagu te termina." },
    },
    notFound: { title: "Ove stranice kod nas nema.", btn: "Povratak na naslovnicu" },
  },
  en: {
    langName: "English", other: "Hrvatski", otherShort: "HR",
    nav: [["ponuda","Meat & Deli"],["steak","Ageing Room"],["bbq","BBQ"],["villa","Villas & Yachts"],["workshops","Workshops"],["blog","Blog"],["about","About"],["contact","Contact"]],
    enquiryBtn: "Your enquiry", navLabel: "Main navigation", skip: "Skip to content",
    wip: "WORK IN PROGRESS", wipText: "We're still building this site. Prices, the cuts in the ageing room and availability are only examples, and enquiries don't reach Mecara yet.",
    home: "Home", crumbs: "Breadcrumb",
    addr: "Kralja Tomislava 7 · Lapad, Dubrovnik",
    hoursText: "Mon–Sat 7:00–19:00 · Closed on Sundays and public holidays",
    labels: { now: "Now", address: "Address", hours: "Opening hours", parking: "Parking" },
    parking: "Shopping with us? You get an hour's free parking at the DOC and Tommy car park.",
    statusLoading: "Opening hours: Mon–Sat 7–19",
    footTitle: "Mecara, a butcher's in Lapad, Dubrovnik",
    footAddr: "Kralja Tomislava 7, 20000 Dubrovnik, Croatia",
    privacy: "Privacy: no tracking cookies, no analytics. Your enquiry list stays in your own browser. If you send the message on WhatsApp, it goes through WhatsApp. The Instagram and Google Maps links take you to those services.",
    directions: "Get directions", call: "Call us",
    unit: { kg: "Sold per kg", g100: "Sold per 100 g", kom: "Sold per piece" },
    qty: "Requested quantity", add: "Add to enquiry", added: "Added to enquiry", less: "Less", more: "More",
    askAvail: "Ask about availability", cutAdd: "Reserve this piece", reserved: "Reserved", ready: "Ready", inDays: "Ready in {n} d", days: "days",
    faqTitle: "Questions and answers",
    d: {
      title: "Your enquiry", close: "Close enquiry", empty: "Nothing here yet. Pick something from our selection.",
      remove: "Remove item", date: "Collection date", time: "Collection time",
      name: "Full name", tel: "Mobile number", note: "Note for the butcher",
      notePh: "e.g. steaks 3 cm thick, each packed separately.",
      notConfirmed: "We'll confirm products and timing by message.",
      weigh: "For anything sold by weight, the final amount depends on what it actually weighs and the confirmed price.",
      prepare: "Send enquiry", prepareWip: "Send enquiry",
      ready: "Your message is ready, but it hasn't been sent yet.",
      openWa: "Open WhatsApp to send your enquiry",
      afterOpen: "Make sure the message actually went in WhatsApp, then wait for Mecara to confirm.",
      copy: "Copy message", copied: "Message copied.", copyFail: "Couldn't copy. Select the text and copy it yourself.",
      wipNote: "Work in progress: your enquiry is saved in Mecara's system, but nobody is checking it regularly yet. If it's urgent, contact the shop.", received: "Enquiry no. {id} received. Mecara will get back to you by message.", sending: "Sending enquiry…", netFail: "Connection problem, so the enquiry wasn't saved. You can copy the message instead.", full: "Full", seatsLeft: "places left",
      noItems: "Add at least one item.", noName: "Please enter your name.", badTel: "Check your mobile number and country code.",
      noSlots: "No collection times listed right now. Get in touch and we'll arrange one.",
      today: "Today", tomorrow: "Tomorrow", piece: "piece as agreed", pcs: "pcs", est: "Estimated amount", room: "Ageing room", reservedT: "This piece is already in your enquiry.",
      openNow: "Open until 19:00", closedNow: "Closed · opens at 7:00", closedSun: "Closed · opens Monday at 7:00", holiday: "Closed · public holiday",
      cartAria: "Open enquiry, items:", toastAdded: "Added to enquiry",
      msg: { head: "Enquiry for Mecara", name: "Name", contact: "Contact", when: "Preferred date and time", products: "Products", est: "Estimated amount", note: "Note for the butcher", end: "Please confirm availability, the price or how it's charged by weight, and the time." },
    },
    notFound: { title: "Nothing on this shelf. We couldn't find that page.", btn: "Back to the homepage" },
  },
};

// ---------- Katalog (urednički opisi; dostupnost i cijene potvrđuje Mecara) ----------
export const CATS = [
  { id: "junetina", hr: ["Junetina","Ima komada za dugo kuhanje, ima za tavu i roštilj. Recite što kuhate pa ćemo narezati kako treba."], en: ["Beef","Some cuts want hours in a pot, others a few minutes on the grill. Tell us what you're cooking and ask for the cut you need."] },
  { id: "teletina", hr: ["Teletina","Za odreske, pečenje i peku. Što danas imamo i koliko, pitajte mesara."], en: ["Veal","Escalopes, roasts, peka. Ask us which cuts are in."] },
  { id: "janjetina", hr: ["Janjetina","Pečenje, peka ili kotleti. Recite nam koliko vas je i kako ćete je spremati."], en: ["Lamb","Roast, peka or chops on the grill. Tell us how many are eating and how you plan to cook it."] },
  { id: "svinjetina", hr: ["Svinjetina i odojak","Za roštilj, pečenje i posebne narudžbe. Treba li vam više, javite se ranije."], en: ["Pork & Suckling Pig","For the grill, the oven and special orders. Need a lot? Check with us in advance."] },
  { id: "piletina", hr: ["Piletina","Za ručak preko tjedna ili za roštilj. Kod mariniranog pogledajte sastojke."], en: ["Chicken","Weekday lunches and barbecues. With the marinated ones, have a look at the ingredients."] },
  { id: "rostilj", hr: ["Za roštilj","Složite izbor za svoje društvo. Količinu odredite i prema prilozima: što više salate i kruha, to manje mesa."], en: ["BBQ Meat","Put together a mix for your group and allow for the sides. More salad, less meat. Usually."] },
  { id: "suho", hr: ["Suhomesnati proizvodi","Za predjelo, sendvič ili platu. Pitajte što trenutačno imamo i kako vam to narezati."], en: ["Cured Meats","Starters, sandwiches, a board for the table. Ask what we've got at the moment and how you'd like it sliced."] },
  { id: "sir", hr: ["Sirevi i kajmak","Uz platu ili uz glavno jelo, ovisno o tome što je trenutačno u ponudi."], en: ["Cheese & Kajmak","Something for the board or alongside the main course, depending on what's in."] },
  { id: "gotovo", hr: ["Pripremljena jela","Pogledajte što je danas u ponudi i provjerite jede li se odmah, podgrijava ili još treba kuhati."], en: ["Prepared Dishes","See what's on today, and check whether each dish is ready to eat, needs reheating or still needs cooking."] },
  { id: "spenza", hr: ["Spenza, vino i rakija","Sitnice za kuhinju i stol. Kod svakog proizvoda provjerite proizvođača i pakiranje."], en: ["Pantry, Wine & Rakija","Bits for the kitchen and the table. Check the producer and pack size on each one."] },
];

// DEMO cijene (radna verzija) – zamijeniti pravim cjenikom
export const PRICES = {"p1": 59, "p2": 32, "p3": 16.9, "p4": 13.9, "p5": 14.5, "p6": 29, "p7": 15.5, "p8": 19.9, "p9": 34, "p10": 10.9, "p11": 9.9, "p12": 16.5, "p13": 8.9, "p14": 12.5, "p15": 14.9, "p16": 12.9, "p17": 13.9, "p18": 3.9, "p19": 5.5, "p20": 4.9, "p21": 4.9, "p22": 3.9, "p23": 3.5, "p24": 5.2, "p25": 2.9, "p26": 3.6, "p27": 3.8, "p28": 2.4, "p29": 1.9, "p30": 2.8, "p31": 2.9, "p32": 1.9, "p33": 6.5, "p34": 9.9, "p35": 5.5, "p36": 18, "p37": 16};

// [id, kategorija, jedinica, HR naziv, HR opis, EN naziv, EN opis]
export const PRODUCTS = [
  ["p1","junetina","kg","Juneći biftek","Režemo ga u odreske ili ostavljamo u komadu. Napišite koliko debelo i za koliko porcija.","Beef fillet","Cut into steaks or left whole, your call. Tell us the thickness and how many portions."],
  ["p2","junetina","kg","Juneći ramstek","Ide na tavu ili na roštilj. Recite koliko vam treba i koliko debelo da ga narežemo.","Beef striploin","Pan or grill, it handles both. Let us know how much you need and how thick."],
  ["p3","junetina","kg","Junetina za gulaš","Meso koje voli dugo kuhanje. Ako želite, narežemo ga na kocke.","Stewing beef","Beef that wants a long, slow simmer. We can dice it if you like."],
  ["p4","junetina","kg","Mljevena junetina","Za umake, punjenja i sve između. Pitajte koliko je imamo i od čega je samljevena.","Minced beef","Sauces, fillings, whatever you're making. Ask how much we have and what goes into it."],
  ["p5","junetina","kg","Juneća rebra","Prije nego odlučite, pitajte koji je rez, kolike su porcije i koliko je kosti u komadu.","Beef ribs","Ask about the cut, the portion size and how much of it is bone, then decide what suits your recipe."],
  ["p6","teletina","kg","Teleći odrezak","Narežemo ga onako kako vam treba za jelo. Debljinu i količinu samo dogovorimo.","Veal escalope","Tell us how thick and how much, and we'll cut it for your dish."],
  ["p7","teletina","kg","Teleća koljenica za peku","Za peku ili pečenje. Koliko i kako narezati, dogovorite s mesarom.","Veal shank for peka","For peka or a roast. Sort out the quantity and cutting with the butcher."],
  ["p8","janjetina","kg","Janjetina za peku","Recite koliko vas je i koje komade želite, pa provjerimo što imamo.","Lamb for peka","How many are eating, and which pieces? Tell us and we'll check what we've got."],
  ["p9","janjetina","kg","Janjeći kotleti","Male porcije s kosti. Pitajte koliko su debeli i koliko ih ima na vagi.","Lamb chops","Small bone-in portions. Ask about thickness and how much weight we have."],
  ["p10","svinjetina","kg","Svinjski vrat","U komadu ili narezan, kako se dogovorimo. Samo recite ide li u pećnicu ili na roštilj.","Pork neck","Whole or sliced, as agreed. Just say whether it's going in the oven or on the grill."],
  ["p11","svinjetina","kg","Svinjska rebarca","Pečena ili s roštilja, po vašem receptu. Pitajte koliki su komadi.","Pork ribs","Roast them or grill them, your recipe. Ask how big the pieces are."],
  ["p12","svinjetina","kg","Odojak po narudžbi","Samo po narudžbi. Dostupnost, težinu i kad će biti gotov dogovaramo unaprijed.","Suckling pig to order","Order ahead. Availability, weight and when it'll be ready are all arranged in advance."],
  ["p13","piletina","kg","Marinirani pileći batak","Pogledajte što je u marinadi i ide li uz batak i zabatak.","Marinated chicken drumstick","Have a look at what's in the marinade, and whether the thigh comes with it."],
  ["p14","piletina","kg","Pileći file","Cijeli ili narezan kako vam treba.","Chicken breast fillet","Whole, or cut the way you need it."],
  ["p15","rostilj","kg","Ćevapi","Za roštilj, naravno. Od kojeg su mesa i što je još unutra, provjerite kod aktualnog proizvoda.","Ćevapi","Little seasoned minced-meat rolls for the grill. Check the meat blend and ingredients of the current batch."],
  ["p16","rostilj","kg","Kobasice za roštilj","Idu uz ostatak roštilja. Prije narudžbe pitajte za sastav i ima li ih.","Grill sausages","They round out a BBQ. Before you order, check what's in them and whether we have them."],
  ["p17","rostilj","kg","Pljeskavica","Od mljevenog mesa, za roštilj ili tavu. Pitajte od čega je i koliko je velika.","Pljeskavica patty","A minced-meat patty for the grill or the pan. Ask what's in it and how big it is."],
  ["p18","piletina","kom","Pohani pileći file","Prije kupnje pogledajte sastojke, alergene i kako se priprema.","Breaded chicken fillet","Look at the ingredients, allergens and cooking instructions first."],
  ["p19","junetina","kom","Pohani juneći odrezak","Pogledajte deklaraciju i kako s proizvodom treba rukovati.","Breaded beef escalope","Read the product information and how it should be handled."],
  ["p20","suho","g100","Drniški pršut","Za platu ili uz sir. Kako ćemo ga narezati i zapakirati, ovisi o tome što trenutačno imamo.","Drniš prosciutto","One for the board, or next to some cheese. Ask about slicing and pack sizes."],
  ["p21","suho","g100","Sinjski pršut","Za predjelo ili platu. Pitajte tko ga proizvodi i u kojem je pakiranju.","Sinj prosciutto","Starters and boards. Check who makes it and what pack sizes we have."],
  ["p22","suho","g100","Talijanski lardo","Sušena svinjska leđna slanina. Reže se tanko, a poslužuje kako vam je drago.","Italian lardo","Cured pork back fat. Slice it thin and serve it however you like."],
  ["p23","suho","g100","Rolana panceta u papru","Na platu ili u lonac. Kako je pripremiti, piše na deklaraciji.","Rolled pancetta with pepper","On a board or in the pan. The label tells you how to prepare it."],
  ["p24","suho","g100","Suhomesnati proizvod od mangulice","Pitajte koji je to točno rez, tko ga radi i kako ga poslužiti.","Mangalica cured meat","Ask which cut it is exactly, who makes it and how to serve it."],
  ["p25","suho","g100","Suha kobasica","Režete i poslužujete. Sastojke i proizvođača provjerite na proizvodu.","Dry-cured sausage","Slice and serve. The ingredients and producer are on the product."],
  ["p26","sir","g100","Sir iz mješine","Sir za platu. Od kojeg je mlijeka, piše na deklaraciji.","Cheese matured in an animal-skin sack","A traditional cheese for the board. The label says which milk it's made from."],
  ["p27","sir","g100","Torotan","Pitajte tko ga proizvodi, od čega je i kako ga poslužiti.","Torotan cheese","Ask us about the producer, the ingredients and how best to serve it."],
  ["p28","sir","g100","Mladi kajmak","Ide uz meso ili predjelo. Provjerite sastav, pakiranje i kako ga čuvati.","Fresh kajmak","A dairy spread that goes with meat or starters. Check ingredients, pack size and how to store it."],
  ["p29","sir","g100","Mladi hercegovački sir","Za doručak, platu ili uz jelo. Odakle je i od kojeg mlijeka, provjerite na proizvodu.","Fresh Herzegovinian cheese","Breakfast, a board, or on the side of a meal. Check where it's from and the milk type."],
  ["p30","gotovo","kom","Sarma","Pitajte ima li je danas. Provjerite i čime je punjena te treba li je kuhati ili samo podgrijati.","Sarma cabbage rolls","Ask if it's on today. Check the filling, and whether it needs cooking or just reheating."],
  ["p31","gotovo","kom","Punjene paprike","Prije kupnje provjerite nadjev, veličinu porcije i kako ih pripremiti.","Stuffed peppers","Before you buy, check the filling, portion size and how to prepare them."],
  ["p32","gotovo","kom","Arancini","Nisu svaki dan. Pitajte za dnevnu ponudu i kako ih pripremiti.","Arancini","Ask whether they're in today and how to prepare them."],
  ["p33","spenza","kom","Pinđur","Povrtni dodatak uz roštilj i ostala jela. Provjerite recepturu i pakiranje.","Pinđur vegetable relish","A vegetable relish for grilled meat and plenty else. Check the recipe and jar size."],
  ["p34","spenza","kom","Krema od bijelog tartufa","Dodatak jelima. Provjerite sastav i koliko je tartufa zapravo unutra.","White truffle cream","Stir it into a dish. Check the ingredient list and how much truffle is actually in it."],
  ["p35","spenza","kom","Bruštulani mjenduli","Ušećereni bademi za stol ili kao mali poklon. Na pakiranju provjerite sastojke i težinu.","Candied almonds","For the table or a small gift. Check the ingredients and pack weight."],
  ["p36","spenza","kom","Rakija iz Konavala","Pitajte tko ju je pekao, koja je vrsta, koliko je jaka i koliko je ima u boci.","Konavle rakija","Ask who made it, what kind it is, how strong it is and how big the bottle is."],
  ["p37","spenza","kom","Crno vino s dubrovačkog područja","Birajte po etiketi: vinarija, sorta, berba i volumen.","Red wine from the Dubrovnik area","Go by the actual label: winery, grape variety, vintage and bottle size."],
].map(r => ({ id: r[0], cat: r[1], unit: r[2], eur: PRICES[r[0]], hr: { name: r[3], desc: r[4] }, en: { name: r[5], desc: r[6] } }));

export const CUTS = [
  { id: "c1", kg: 1.12, day: 35, target: 35, eur: 62, sub: { hr: "rebro s kosti", en: "rib on the bone" }, hr: ["Côte de boeuf","Juneći odrezak s kosti. Za komad koji je u komori provjerite težinu, odležavanje i cijenu po kilogramu."], en: ["Côte de boeuf","Beef rib steak on the bone. For the piece in the room, check the weight, ageing and price per kilo."] },
  { id: "c2", kg: 0.92, day: 28, target: 28, eur: 56, sub: { hr: "junetina", en: "young beef" }, hr: ["T-bone","Odrezak s onom prepoznatljivom kosti. Recite koliko debelo i pitajte koje komade imamo."], en: ["T-bone","The one with the T-shaped bone. Tell us the thickness and check which pieces we have."] },
  { id: "c3", kg: 0.48, day: 21, target: 21, eur: 49, sub: { hr: "komad za dvoje", en: "serves 2" }, hr: ["Ramstek","Narežemo ga koliko debelo želite. Količinu odredite prema broju ljudi i prilozima."], en: ["Striploin","Cut to the thickness we agree. Work out how much from your guest count and sides."] },
  { id: "c4", kg: 1.34, day: 39, target: 45, eur: 68, sub: { hr: "za posebnu večer", en: "for a big night" }, hr: ["Tomahawk","Odrezak s dugom rebrenom kosti. Pitajte koliko je velik i hoće li stati na vaš roštilj ili u tavu."], en: ["Tomahawk","A steak with a long rib bone. Check the size, and whether your grill or pan can take it."] },
  { id: "c5", kg: 1.02, day: 24, target: 28, eur: 58, sub: { hr: "biftek + ramstek", en: "fillet + strip" }, hr: ["Porterhouse","S kosti, a s jedne strane biftek, s druge ramstek. Kakav je točno komad, potvrdite s mesarom."], en: ["Porterhouse","Bone-in, with fillet on one side and striploin on the other. Confirm the exact spec of the piece with the butcher."] },
  { id: "c6", kg: 0.36, day: 30, target: 30, eur: 59, sub: { hr: "bez kosti", en: "boneless" }, hr: ["Rib-eye","Za tavu ili roštilj. Provjerite debljinu, težinu i je li komad s kosti ili bez."], en: ["Rib-eye","Pan or grill. Check thickness, weight, and whether this one's on the bone or off it."] },
];

export const FAQ = {
  where: { hr: ["Gdje je Mecara?","U centru DOC u Lapadu, Kralja Tomislava 7, Dubrovnik. Upute za dolazak otvaraju kartu."], en: ["Where are you?","In the DOC shopping centre in Lapad, Kralja Tomislava 7, Dubrovnik. The directions link will get you here."] },
  avail: { hr: ["Kako da znam imate li nešto?","Pošaljite naziv proizvoda, otprilike koliko vam treba i za kad. Provjerimo što imamo i javimo vam."], en: ["How do I know if you've got something?","Send us the product, roughly how much and the date you want it. We'll check and tell you what's available."] },
  confirmed: { hr: ["Je li narudžba potvrđena kad kliknem?","Nije. Gumb samo slaže upit, a šaljete ga vi. Narudžbu i termin Mecara potvrđuje posebnom porukom."], en: ["Is my order confirmed when I click?","No. The button only puts the enquiry together for you to send. Mecara confirms the order and time in a separate message."] },
  thick: { hr: ["Mogu li tražiti točnu debljinu odreska?","Napišite u upitu koliko debelo ili kako želite narezano. Javit ćemo vam može li se tako s tim komadom."], en: ["Can I ask for a specific thickness?","Put the thickness or how you want it cut in your enquiry. We'll tell you if that works for the piece you picked."] },
  estimate: { hr: ["Zašto je iznos okviran?","Roba na vagu plaća se po stvarnoj težini i potvrđenoj cijeni po kilogramu. Imate li budžet koji ne želite prijeći, napišite ga u upitu."], en: ["Why is the total only an estimate?","Anything sold by weight is charged on what it actually weighs, at the confirmed price per kilo. Got a budget limit? Say so in the enquiry."] },
  time: { hr: ["Mogu li doći po meso kad mi odgovara?","Napišite željeni termin u upitu. Vrijedi tek kad vam potvrdimo i dostupnost i vrijeme."], en: ["Can I collect when it suits me?","Give us your preferred time in the enquiry. It's only set once we've confirmed availability and timing."] },
  dryaged: { hr: ["Imate li odležane steakove?","Što je trenutačno u komori, vidi se na stranici odležanih steakova, a možete pitati i mesara. Dolazite li po određeni komad, prije dolaska potvrdite rez, dane odležavanja i težinu."], en: ["Do you have dry-aged steaks?","Have a look at the dry-aged steak page, or ask the butcher what's in. If you're after a particular piece, confirm the cut, ageing and weight before you come in."] },
  gluten: { hr: ["Imate li proizvode bez glutena?","Pitajte koji proizvodi imaju potvrđenu oznaku bez glutena. Prije kupnje pogledajte sastojke, alergene i kako se s tim proizvodom rukuje."], en: ["Anything gluten-free?","Ask which products carry a verified gluten-free label. Before you buy, check the ingredients, allergens and handling information for that item."] },
  ready: { hr: ["Može li se meso jesti odmah?","Ne. Svježe meso i sirovi proizvodi moraju se skuhati, ispeći ili ispržiti. Kod gotovih jela u opisu provjerite trebaju li kuhanje ili samo podgrijavanje."], en: ["Is the meat ready to eat?","No. Fresh meat and raw meat products need cooking. For prepared dishes, check the description to see whether they need cooking or just reheating."] },
  parking: { hr: ["Je li parking besplatan?","Prvi sat jest. Kupci imaju sat vremena besplatnog parkiranja na parkiralištu centra DOC i Tommyja."], en: ["Is parking free?","For an hour, yes. Customers park free for one hour at the DOC and Tommy car park."] },
  large: { hr: ["Mogu li rezervirati veću količinu?","Javite nam datum, broj ljudi i što biste htjeli. Količine i rokove dogovaramo prema tome što imamo."], en: ["Can I order a larger amount?","Send us the date, how many people and what you'd like. We agree quantities and timing based on what's available."] },
};

export const META = {
  home:    { hr: ["Mecara | Mesnica u Lapadu, Dubrovnik","Mesnica Mecara u centru DOC u Lapadu. Meso za ručak, odležani steakovi iz komore i sve za roštilj. Pogledajte ponudu i pitajte što je danas tu."], en: ["Mecara | Butcher Shop in Lapad, Dubrovnik","Mecara is a butcher's at DOC in Lapad, Dubrovnik. Fresh meat, dry-aged steaks and everything for the grill. Ask us about cuts and what's in today."] },
  ponuda:  { hr: ["Svježe meso i delikatese u Dubrovniku | Mecara","Meso, suhomesnato i sirevi u Mecari u Lapadu. Za određeni rez, količinu i ono što je danas u vitrini, pošaljite nam upit i javimo vam se."], en: ["Fresh Meat & Deli in Dubrovnik | Mecara","Meat, cured meats and cheese at Mecara in Lapad. Ask us which cuts are in, how much we have and how to prepare them for your next meal."] },
  komora:  { hr: ["Dry-age komora uživo, odležani steakovi | Mecara","Pogledajte koji komadi upravo odležavaju u Mecarinoj komori, s težinom, danima i cijenom. Rezervirajte svoj steak i saznajte kako ga ispeći."], en: ["Live Dry-Age Room: Aged Steaks | Mecara Dubrovnik","See which steaks are ageing in Mecara's dry-age room right now, with weight, days aged and price. Reserve yours and find out how to cook it."] },
  steak:   { hr: ["Odležani steakovi u Dubrovniku | Mecara","Mecarina dry-age komora uživo: svaki steak koji odležava u Lapadu, s težinom, danima odležavanja i cijenom. Izaberite i rezervirajte svoj komad."], en: ["Dry-Aged Steaks in Dubrovnik | Mecara","Mecara's dry-age room in Lapad, live: every steak with its weight, days aged and price. Pick one, reserve it and learn how to cook it."] },
  bbq:     { hr: ["Meso za roštilj u Dubrovniku i planer | Mecara","Koliko mesa za roštilj? Izračunajte za svoje društvo, složite ćevape, kobasice, piletinu i odreske pa pošaljite upit Mecari."], en: ["BBQ Meat in Dubrovnik & Quantity Planner | Mecara","How much meat for a BBQ? Work it out for your group, pick ćevapi, sausages, chicken and steaks, then send Mecara your enquiry."] },
  planner: { hr: ["Koliko mesa za roštilj? Planer | Mecara","Izračunajte otprilike koliko mesa treba vašem društvu. Prilagodite izbor gostima i prilozima, a Mecari pošaljite upit za dostupnost."], en: ["BBQ Meat Planner: How Much Meat Do You Need?","Work out how much meat you need for a BBQ. Adjust it for your guests and the sides, then ask Mecara to check what's available."] },
  villa:   { hr: ["Meso za vile i jahte u Dubrovniku | Mecara","Meso i delikatese za vilu ili jahtu na dubrovačkom području. Pošaljite upit, a sadržaj, cijenu i dostavu potvrđujemo za svaku narudžbu posebno."], en: ["Villa & Yacht Meat Supply, Dubrovnik | Mecara","Meat and deli for a villa or yacht around Dubrovnik. Send us an enquiry; we confirm availability, price and delivery options case by case."] },
  workshops:{ hr: ["Radionice o mesu i steakovima | Mecara Dubrovnik","Najave Mecarinih radionica u Dubrovniku. Prije prijave pogledajte temu, termin, jezik, cijenu i što je točno u programu svake radionice."], en: ["Meat & Steak Workshops in Dubrovnik | Mecara","Upcoming Mecara workshops in Dubrovnik. Before you ask for a place, check the topic, date, language and price of each session."] },
  about:   { hr: ["O Mecari | Mesnica u DOC-u, Lapad","Mecara je mesnica u centru DOC u Dubrovniku. Recite mesaru što kuhate pa birajte meso, a za rezove i današnju ponudu slobodno pitajte."], en: ["About Mecara | Your Butcher in Lapad","Mecara is a butcher shop at DOC in Lapad, Dubrovnik. Tell us what you're cooking, and ask about cuts, preparation and what's in right now."] },
  contact: { hr: ["Mecara kontakt, adresa i radno vrijeme | Dubrovnik","Mecara je na Kralja Tomislava 7, u centru DOC u Lapadu. Ovdje su kontakt i radno vrijeme, a upit za proizvod možete poslati odmah."], en: ["Contact & Opening Hours | Mecara Dubrovnik","Find Mecara at Kralja Tomislava 7, in the DOC shopping centre, Lapad. Opening hours, directions and how to ask us about the current selection."] },
};

export const ALT = {
  entrance: { hr: "Ulaz u mesnicu Mecara u centru DOC u Lapadu", en: "Entrance to Mecara butcher shop at DOC in Lapad" },
  cutting:  { hr: "Mesar reže odrezak u Mecari", en: "Butcher cutting a steak at Mecara" },
  ageing:   { hr: "Komora za odležavanje mesa u Mecari", en: "Meat ageing cabinet at Mecara" },
  counter:  { hr: "Izbor svježeg mesa u vitrini", en: "Selection of fresh meat in the display counter" },
  interior: { hr: "Interijer Mecare s vitrinama i bikom na zidu", en: "Inside Mecara with display counters and the bull mural" },
  marinated:{ hr: "Marinirano meso i proizvodi za roštilj u vitrini", en: "Marinated meat and BBQ products in the counter" },
  jars:     { hr: "Staklenke s dodacima za stol na polici", en: "Jars of table accompaniments on a shelf" },
  pantry:   { hr: "Tjestenina i proizvodi iz spenze", en: "Pasta and pantry products" },
  shop:     { hr: "Vitrine i police u Mecari", en: "Display counters and shelves at Mecara" },
};

// DEMO radionice (radna verzija) – datumi i cijene su primjeri
export const WORKSHOPS = [
  { id: "w1", date: "21.11.", when: { hr: "Subota u 18:00 · 2 sata · na hrvatskom", en: "Saturday, 18:00 · 2 hours · in Croatian" }, eur: 35, seats: 8,
    hr: ["Odaberite i pripremite svoj steak","Kako izabrati komad iz komore, koliko ga pustiti da odmori i kad ide na tavu, a kad na roštilj."], en: ["Choosing and cooking your steak","Picking a piece from the ageing room, how long to rest it, and when it belongs in a pan rather than on the grill."] },
  { id: "w2", date: "04.12.", when: { hr: "Petak u 18:30 · 2 sata · na hrvatskom i engleskom", en: "Friday, 18:30 · 2 hours · in Croatian and English" }, eur: 29, seats: 12,
    hr: ["Pršut i sir: kako složiti platu","Kušamo drniški i sinjski pršut, sir iz mješine i domaće dodatke. Usput pokazujemo kako rezati i kako sve složiti na platu."], en: ["Prosciutto and cheese: building a sharing board","We taste Drniš and Sinj prosciutto, cheese matured in a sheepskin sack and local extras, and show you how to slice it all and lay out a board."] },
  { id: "w3", date: "12.12.", when: { hr: "Subota u 10:00 · 2,5 sata · na hrvatskom", en: "Saturday, 10:00 · 2.5 hours · in Croatian" }, eur: 35, seats: 8,
    hr: ["Meso za blagdanski stol","Janjetina, teletina i odojak. Koji komad za peku, koji za ražanj, a koji za pečenje, i kako ga naručiti na vrijeme."], en: ["Choosing meat for a festive meal","Lamb, veal and suckling pig: which cut for peka, the spit or the oven, and how to order early enough to get it."] },
];
// DEMO paketi za vile i jahte (radna verzija)
export const BOXES = [
  { id: "b1", price: "od 19 € / gostu", priceEn: "from €19 / guest", hr: ["Paket za roštilj na terasi","Meso za roštilj i dodaci, prema broju gostiju. Što će točno biti unutra i koliko, dogovaramo prije potvrde."], en: ["Terrace BBQ Selection","Grilling meat and extras, sized to your group. We agree what goes in and how much before anything is confirmed."] },
  { id: "b2", price: "od 45 € / gostu", priceEn: "from €45 / guest", hr: ["Paket za steak večeru","Odležani komadi iz komore, ovisno o tome što imamo. Može se dodati suhomesnato i sir."], en: ["Dry-Aged Steak Selection","Dry-aged cuts from the ageing room, depending on what's available. Cured meats and cheese can be added."] },
  { id: "b3", price: "od 28 € / gostu", priceEn: "from €28 / guest", hr: ["Meso za peku","Meso pripremljeno za vašeg kuhara. Napišite koje meso, za koliko gostiju i koliko vam treba."], en: ["Meat for Peka","Meat prepped for your chef to cook under a peka, the traditional bell-shaped lid. Tell us which meat and how many guests."] },
  { id: "b4", price: "od 15 € / gostu", priceEn: "from €15 / guest", hr: ["Izbor za platu","Suhomesnato i sirevi za posluženje u vili ili na brodu. Sadržaj i pakiranje dogovaramo s vama."], en: ["Charcuterie & Cheese Selection","Cured meats and cheese to serve at the villa or on board. Contents and packaging are agreed with you."] },
];
