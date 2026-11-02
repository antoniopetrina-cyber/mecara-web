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
  steak:   { hr: "/odlezani-steakovi/",  en: "/en/dry-aged-steaks/" },
  bbq:     { hr: "/meso-za-rostilj/",    en: "/en/bbq-meat/" },
  about:   { hr: "/o-nama/",             en: "/en/about/" },
  contact: { hr: "/kontakt/",            en: "/en/contact/" },
};

export const UI = {
  hr: {
    langName: "Hrvatski", other: "English", otherShort: "EN",
    nav: [["ponuda","Ponuda"],["steak","Odležani steakovi"],["bbq","Za roštilj"],["about","O nama"],["contact","Kontakt"]],
    enquiryBtn: "Vaš upit", navLabel: "Glavna navigacija", skip: "Preskoči na sadržaj",
    wip: "RADNA VERZIJA", wipText: "Stranica je u izradi. Cijene, komadi u komori i dostupnost su primjeri, a upiti se zasad ne šalju Mecari.",
    home: "Naslovnica", crumbs: "Putanja",
    addr: "Kralja Tomislava 7 · Lapad, Dubrovnik",
    hoursText: "Pon–Sub 7:00–19:00 · Nedjeljom i blagdanima zatvoreno",
    labels: { now: "Sada", address: "Adresa", hours: "Radno vrijeme", parking: "Parking" },
    parking: "Kupcima je dostupan jedan sat besplatnog parkiranja na parkiralištu centra DOC i Tommyja.",
    statusLoading: "Radno vrijeme: Pon–Sub 7–19",
    footTitle: "Mecara — mesnica u Lapadu, Dubrovnik",
    footAddr: "Kralja Tomislava 7, 20000 Dubrovnik, Hrvatska",
    privacy: "Privatnost: stranica ne koristi kolačiće za praćenje ni analitiku. Popis za upit sprema se samo u vašem pregledniku. Ako poruku pošaljete putem WhatsAppa, šalje se preko te usluge. Poveznice na Instagram i Google karte otvaraju te servise.",
    directions: "Upute za dolazak", call: "Nazovite nas",
    unit: { kg: "Prodaje se na kg", g100: "Prodaje se na 100 g", kom: "Prodaje se po komadu" },
    qty: "Željena količina", add: "Dodaj u upit", added: "Dodano u upit", less: "Manje", more: "Više",
    askAvail: "Pitajte za dostupnost", cutAdd: "Rezerviraj ovaj komad", reserved: "Rezerviran", ready: "Spreman", inDays: "Spreman za {n} d.", days: "dana",
    faqTitle: "Pitanja i odgovori",
    // ladica upita
    d: {
      title: "Vaš upit", close: "Zatvori upit", empty: "Vaš je popis prazan. Dodajte proizvod iz ponude.",
      remove: "Ukloni proizvod", date: "Željeni datum preuzimanja", time: "Željeno vrijeme",
      name: "Ime i prezime", tel: "Broj mobitela", note: "Napomena za mesara",
      notePh: "Primjer: odresci debljine 3 cm, pakirati odvojeno.",
      notConfirmed: "Termin i proizvodi potvrđuju se porukom.",
      weigh: "Konačan iznos za robu na vagu ovisi o stvarnoj težini i potvrđenoj cijeni.",
      prepare: "Pripremi WhatsApp poruku", prepareWip: "Pripremi poruku",
      ready: "Poruka je spremna. Još je trebate poslati.",
      openWa: "Otvori WhatsApp i pošalji upit",
      afterOpen: "Provjerite je li poruka poslana u WhatsAppu. Pričekajte potvrdu Mecare.",
      copy: "Kopiraj poruku", copied: "Poruka je kopirana.", copyFail: "Kopiranje nije uspjelo. Označite tekst i kopirajte ga ručno.",
      wipNote: "Radna verzija: upiti se još ne šalju Mecari. Poruku možete kopirati, ali je zasad nemojte slati.",
      noItems: "Dodajte barem jedan proizvod.", noName: "Unesite svoje ime.", badTel: "Provjerite broj mobitela i pozivni broj države.",
      noSlots: "Trenutačno nema ponuđenih termina. Javite nam se za dogovor.",
      today: "Danas", tomorrow: "Sutra", piece: "komad po dogovoru", pcs: "kom", est: "Okvirni iznos", room: "Komora", reservedT: "Ovaj komad je već u vašem upitu.",
      openNow: "Otvoreno do 19:00", closedNow: "Zatvoreno · otvaramo u 7:00", closedSun: "Zatvoreno · otvaramo u ponedjeljak u 7:00", holiday: "Zatvoreno · blagdan",
      cartAria: "Otvori upit, broj stavki:", toastAdded: "Dodano u upit",
      msg: { head: "Upit za Mecaru", name: "Ime", contact: "Kontakt", when: "Željeni datum i vrijeme", products: "Proizvodi", est: "Okvirni iznos", note: "Napomena za mesara", end: "Molim potvrdu dostupnosti, cijene odnosno načina obračuna i termina." },
    },
    notFound: { title: "Ovu stranicu nismo pronašli.", btn: "Povratak na naslovnicu" },
  },
  en: {
    langName: "English", other: "Hrvatski", otherShort: "HR",
    nav: [["ponuda","Meat & Deli"],["steak","Dry-Aged Steaks"],["bbq","BBQ Meat"],["about","About"],["contact","Contact"]],
    enquiryBtn: "Your enquiry", navLabel: "Main navigation", skip: "Skip to content",
    wip: "WORK IN PROGRESS", wipText: "This site is being built. Prices, aged cuts and availability are examples, and enquiries are not sent to Mecara yet.",
    home: "Home", crumbs: "Breadcrumb",
    addr: "Kralja Tomislava 7 · Lapad, Dubrovnik",
    hoursText: "Mon–Sat 7:00–19:00 · Closed on Sundays and public holidays",
    labels: { now: "Now", address: "Address", hours: "Opening hours", parking: "Parking" },
    parking: "Customers get one hour of free parking at the DOC and Tommy car park.",
    statusLoading: "Opening hours: Mon–Sat 7–19",
    footTitle: "Mecara — butcher shop in Lapad, Dubrovnik",
    footAddr: "Kralja Tomislava 7, 20000 Dubrovnik, Croatia",
    privacy: "Privacy: this site uses no tracking cookies or analytics. Your enquiry list is stored only in your browser. If you send your message through WhatsApp, it is sent via that service. Links to Instagram and Google Maps open those services.",
    directions: "Get directions", call: "Call us",
    unit: { kg: "Sold per kg", g100: "Sold per 100 g", kom: "Sold per piece" },
    qty: "Requested quantity", add: "Add to enquiry", added: "Added to enquiry", less: "Less", more: "More",
    askAvail: "Ask about availability", cutAdd: "Reserve this piece", reserved: "Reserved", ready: "Ready", inDays: "Ready in {n} d", days: "days",
    faqTitle: "Questions and answers",
    d: {
      title: "Your enquiry", close: "Close enquiry", empty: "Your list is empty. Add an item from our selection.",
      remove: "Remove item", date: "Preferred collection date", time: "Preferred time",
      name: "Full name", tel: "Mobile number", note: "Note for the butcher",
      notePh: "Example: steaks 3 cm thick, packed separately.",
      notConfirmed: "Products and timing are confirmed by message.",
      weigh: "The final amount for goods sold by weight depends on actual weight and the confirmed price.",
      prepare: "Prepare WhatsApp message", prepareWip: "Prepare message",
      ready: "Your message is ready. You still need to send it.",
      openWa: "Open WhatsApp to send your enquiry",
      afterOpen: "Check that your message was sent in WhatsApp. Wait for Mecara's confirmation.",
      copy: "Copy message", copied: "Message copied.", copyFail: "Copying failed. Select the text and copy it manually.",
      wipNote: "Work in progress: enquiries are not sent to Mecara yet. You can copy the message, but please don't send it for now.",
      noItems: "Add at least one item.", noName: "Enter your name.", badTel: "Check your mobile number and country code.",
      noSlots: "No collection times are currently listed. Contact us to arrange one.",
      today: "Today", tomorrow: "Tomorrow", piece: "piece as agreed", pcs: "pcs", est: "Estimated amount", room: "Ageing room", reservedT: "This piece is already in your enquiry.",
      openNow: "Open until 19:00", closedNow: "Closed · opens at 7:00", closedSun: "Closed · opens Monday at 7:00", holiday: "Closed · public holiday",
      cartAria: "Open enquiry, items:", toastAdded: "Added to enquiry",
      msg: { head: "Enquiry for Mecara", name: "Name", contact: "Contact", when: "Preferred date and time", products: "Products", est: "Estimated amount", note: "Note for the butcher", end: "Please confirm availability, pricing or weight-based calculation, and timing." },
    },
    notFound: { title: "We could not find this page.", btn: "Back to the homepage" },
  },
};

// ---------- Katalog (urednički opisi; dostupnost i cijene potvrđuje Mecara) ----------
export const CATS = [
  { id: "junetina", hr: ["Junetina","Od komada za sporo kuhanje do odrezaka za tavu i roštilj. Izaberite prema jelu i zatražite željeno rezanje."], en: ["Beef","Explore cuts for slow cooking, pan cooking and grilling. Choose around your recipe and ask for the cut you need."] },
  { id: "teletina", hr: ["Teletina","Za odreske, pečenje i peku. Dostupne komade i količine provjerite s mesarom."], en: ["Veal","Ask about available cuts for escalopes, roasting and peka."] },
  { id: "janjetina", hr: ["Janjetina","Za pečenje, peku ili kotlete. Navedite koliko osoba dolazi i kako planirate pripremu."], en: ["Lamb","Choose around your roast, peka or grilled chops. Tell us your guest count and cooking plans."] },
  { id: "svinjetina", hr: ["Svinjetina i odojak","Rezovi za roštilj, pečenje i posebne narudžbe. Veće količine provjerite unaprijed."], en: ["Pork & Suckling Pig","Cuts for grilling, roasting and special orders. Check larger quantities in advance."] },
  { id: "piletina", hr: ["Piletina","Jednostavan izbor za ručak ili roštilj. Kod mariniranih proizvoda provjerite sastojke."], en: ["Chicken","Options for everyday meals and barbecues. Check the ingredients of marinated products."] },
  { id: "rostilj", hr: ["Za roštilj","Složite kombinaciju za svoje društvo i prilagodite količinu prilozima."], en: ["BBQ Meat","Build a selection for your group and allow for the sides you plan to serve."] },
  { id: "suho", hr: ["Suhomesnati proizvodi","Za predjelo, sendvič ili platu. Pitajte za dostupne proizvode i način rezanja."], en: ["Cured Meats","For starters, sandwiches and sharing boards. Ask about the current selection and slicing options."] },
  { id: "sir", hr: ["Sirevi i kajmak","Odaberite dodatak plati ili glavnom jelu prema aktualnoj ponudi."], en: ["Cheese & Kajmak","Choose accompaniments for a sharing board or your main meal."] },
  { id: "gotovo", hr: ["Pripremljena jela","Provjerite dnevnu ponudu i je li proizvod spreman za jelo, podgrijavanje ili kuhanje."], en: ["Prepared Dishes","Check today's selection and whether each item is ready to eat, reheat or cook."] },
  { id: "spenza", hr: ["Spenza, vino i rakija","Dodaci za kuhinju i stol. Provjerite proizvođača i pakiranje uz svaki proizvod."], en: ["Pantry, Wine & Rakija","Extras for your kitchen and table. Check each item's producer and pack size."] },
];

// DEMO cijene (radna verzija) – zamijeniti pravim cjenikom
export const PRICES = {"p1": 59, "p2": 32, "p3": 16.9, "p4": 13.9, "p5": 14.5, "p6": 29, "p7": 15.5, "p8": 19.9, "p9": 34, "p10": 10.9, "p11": 9.9, "p12": 16.5, "p13": 8.9, "p14": 12.5, "p15": 14.9, "p16": 12.9, "p17": 13.9, "p18": 3.9, "p19": 5.5, "p20": 4.9, "p21": 4.9, "p22": 3.9, "p23": 3.5, "p24": 5.2, "p25": 2.9, "p26": 3.6, "p27": 3.8, "p28": 2.4, "p29": 1.9, "p30": 2.8, "p31": 2.9, "p32": 1.9, "p33": 6.5, "p34": 9.9, "p35": 5.5, "p36": 18, "p37": 16};

// [id, kategorija, jedinica, HR naziv, HR opis, EN naziv, EN opis]
export const PRODUCTS = [
  ["p1","junetina","kg","Juneći biftek","Za odreske ili pripremu u komadu. U upitu navedite željenu debljinu i broj porcija.","Beef fillet","For individual steaks or cooking as a whole piece. Specify your preferred thickness and number of portions."],
  ["p2","junetina","kg","Juneći ramstek","Odaberite količinu i rezanje prema pripremi na tavi ili roštilju.","Beef striploin","Choose your quantity and steak thickness for pan cooking or grilling."],
  ["p3","junetina","kg","Junetina za gulaš","Komadi za sporo kuhanje. Navedite želite li meso narezano na kocke.","Stewing beef","Beef for slow-cooked dishes. Let us know if you would like it diced."],
  ["p4","junetina","kg","Mljevena junetina","Za umake, punjenja i druge recepte. Pitajte za raspoloživu količinu i sastav.","Minced beef","For sauces, fillings and other recipes. Ask about the available quantity and composition."],
  ["p5","junetina","kg","Juneća rebra","Za pripremu prema vašem receptu. Provjerite vrstu reza i udio kosti.","Beef ribs","Ask about the rib cut, portion size and bone content before choosing for your recipe."],
  ["p6","teletina","kg","Teleći odrezak","Narezano prema dogovoru za jelo koje pripremate.","Veal escalope","Ask for the thickness and quantity that suit your dish."],
  ["p7","teletina","kg","Teleća koljenica za peku","Za planiranje peke ili pečenja. Količinu i rezanje dogovorite s mesarom.","Veal shank for peka","For your peka or roasting plans. Agree the quantity and cutting requirements with the butcher."],
  ["p8","janjetina","kg","Janjetina za peku","Navedite broj osoba i željene komade kako bismo provjerili ponudu.","Lamb for peka","Tell us your guest count and preferred cuts so we can check availability."],
  ["p9","janjetina","kg","Janjeći kotleti","Za manje porcije s kosti. Provjerite debljinu i raspoloživu težinu.","Lamb chops","Bone-in portions; ask about thickness and available weight."],
  ["p10","svinjetina","kg","Svinjski vrat","U komadu ili narezan prema dogovoru. Navedite pripremate li pečenje ili roštilj.","Pork neck","Whole or sliced by arrangement. Tell us whether you are roasting or grilling."],
  ["p11","svinjetina","kg","Svinjska rebarca","Za pečenje ili roštilj prema vašem receptu. Provjerite veličinu komada.","Pork ribs","For roasting or grilling to your recipe. Check the size of the available pieces."],
  ["p12","svinjetina","kg","Odojak po narudžbi","Dostupnost, težinu i rok pripreme dogovorite unaprijed.","Suckling pig to order","Arrange availability, weight and preparation timing in advance."],
  ["p13","piletina","kg","Marinirani pileći batak","Provjerite sastav marinade i uključuje li komad zabatak.","Marinated chicken drumstick","Check the marinade ingredients and whether the portion includes the thigh."],
  ["p14","piletina","kg","Pileći file","Za pripremu u komadu ili rezanje prema dogovoru.","Chicken breast fillet","For cooking whole or cutting to your requirements."],
  ["p15","rostilj","kg","Ćevapi","Izbor za roštilj. Sastav mesa i sastojke provjerite uz aktualni proizvod.","Ćevapi","Seasoned minced-meat pieces for grilling. Check the meat blend and ingredients of the current product."],
  ["p16","rostilj","kg","Kobasice za roštilj","Dodajte ih svom izboru za roštilj; sastav i dostupnost provjerite prije naručivanja.","Grill sausages","Add to your BBQ selection and check ingredients and availability before ordering."],
  ["p17","rostilj","kg","Pljeskavica","Mesni odrezak od mljevenog mesa za roštilj ili tavu. Pitajte za sastav i veličinu.","Pljeskavica patty","A minced-meat patty for grilling or pan cooking. Ask about its ingredients and size."],
  ["p18","piletina","kom","Pohani pileći file","Provjerite sastojke, alergene i upute za pripremu.","Breaded chicken fillet","Check ingredients, allergens and cooking instructions."],
  ["p19","junetina","kom","Pohani juneći odrezak","Provjerite deklaraciju i način rukovanja proizvodom.","Breaded beef escalope","Check the product information and handling arrangements."],
  ["p20","suho","g100","Drniški pršut","Za posluženje na plati ili uz sir. Način rezanja i pakiranje prema dostupnoj ponudi.","Drniš prosciutto","For a sharing board or serving with cheese. Ask about slicing and pack sizes."],
  ["p21","suho","g100","Sinjski pršut","Suhomesnati dodatak predjelu ili plati. Provjerite proizvođača i raspoloživo pakiranje.","Sinj prosciutto","For starters and sharing boards. Check the producer and available pack sizes."],
  ["p22","suho","g100","Talijanski lardo","Sušena svinjska leđna slanina za tanko rezanje i posluženje prema ukusu.","Italian lardo","Cured pork back fat for thin slicing and serving as part of your chosen dish."],
  ["p23","suho","g100","Rolana panceta u papru","Za platu ili kuhanje prema deklaraciji proizvoda.","Rolled pancetta with pepper","For a board or cooking, according to the product's preparation guidance."],
  ["p24","suho","g100","Suhomesnati proizvod od mangulice","Provjerite konkretan rez, proizvođača i način posluživanja.","Mangalica cured meat","Check the specific cut, producer and serving instructions."],
  ["p25","suho","g100","Suha kobasica","Za rezanje i posluženje. Sastojke i proizvođača provjerite uz proizvod.","Dry-cured sausage","For slicing and serving. Check the ingredients and producer."],
  ["p26","sir","g100","Sir iz mješine","Sir za platu i posluženje prema ukusu. Vrstu mlijeka provjerite na deklaraciji.","Cheese matured in an animal-skin sack","A traditional cheese for a sharing board. Check the label for the milk used."],
  ["p27","sir","g100","Torotan","Provjerite proizvođača, sastav i preporučeni način posluživanja ovog sira.","Torotan cheese","Ask about the producer, ingredients and suggested serving method."],
  ["p28","sir","g100","Mladi kajmak","Mliječni dodatak mesu ili predjelu. Provjerite sastav, pakiranje i uvjete čuvanja.","Fresh kajmak","A dairy accompaniment for meat or starters. Check ingredients, pack size and storage instructions."],
  ["p29","sir","g100","Mladi hercegovački sir","Za doručak, platu ili dodatak jelu. Podrijetlo i vrstu mlijeka provjerite uz proizvod.","Fresh Herzegovinian cheese","For breakfast, sharing boards or serving with a meal. Check origin and milk type."],
  ["p30","gotovo","kom","Sarma","Provjerite današnju ponudu, sastav punjenja i treba li proizvod kuhati ili podgrijati.","Sarma cabbage rolls","Check availability, filling ingredients and whether the product needs cooking or reheating."],
  ["p31","gotovo","kom","Punjene paprike","Sastav, veličinu porcije i upute za pripremu provjerite prije kupnje.","Stuffed peppers","Check filling ingredients, portion size and preparation instructions before buying."],
  ["p32","gotovo","kom","Arancini","Provjerite dnevnu ponudu i način pripreme.","Arancini","Check today's selection and how to prepare them."],
  ["p33","spenza","kom","Pinđur","Povrtni dodatak roštilju ili drugim jelima. Provjerite recepturu i pakiranje.","Pinđur vegetable relish","An accompaniment to grilled meat and other dishes. Check the recipe and jar size."],
  ["p34","spenza","kom","Krema od bijelog tartufa","Dodatak jelima prema deklaraciji. Provjerite sastav i udio tartufa.","White truffle cream","A cooking accompaniment; check the ingredient list and truffle content."],
  ["p35","spenza","kom","Bruštulani mjenduli","Ušećereni bademi za posluženje ili mali poklon. Provjerite sastojke i težinu pakiranja.","Candied almonds","For serving or a small gift. Check ingredients and pack weight."],
  ["p36","spenza","kom","Rakija iz Konavala","Provjerite proizvođača, vrstu, alkoholnu jakost i volumen boce.","Konavle rakija","Check the producer, spirit type, alcohol content and bottle size."],
  ["p37","spenza","kom","Crno vino s dubrovačkog područja","Odaberite prema stvarnoj etiketi: vinarija, sorta, berba i volumen.","Red wine from the Dubrovnik area","Check the actual winery, grape variety, vintage and bottle size."],
].map(r => ({ id: r[0], cat: r[1], unit: r[2], eur: PRICES[r[0]], hr: { name: r[3], desc: r[4] }, en: { name: r[5], desc: r[6] } }));

export const CUTS = [
  { id: "c1", kg: 1.12, day: 35, target: 35, eur: 62, sub: { hr: "rebro s kosti", en: "bone-in rib" }, hr: ["Côte de boeuf","Juneći odrezak s kosti. Za konkretan komad provjerite težinu, odležavanje i cijenu po kilogramu."], en: ["Côte de boeuf","Bone-in beef rib steak. Check the weight, ageing details and price per kilogram of the available piece."] },
  { id: "c2", kg: 0.92, day: 28, target: 28, eur: 56, sub: { hr: "junetina", en: "young beef" }, hr: ["T-bone","Odrezak s karakterističnom kosti. Navedite željenu debljinu i provjerite raspoložive komade."], en: ["T-bone","A steak with its distinctive T-shaped bone. Specify your preferred thickness and check available cuts."] },
  { id: "c3", kg: 0.48, day: 21, target: 21, eur: 49, sub: { hr: "komad za 2 osobe", en: "serves 2" }, hr: ["Ramstek","Odrezak prema željenoj debljini. Količinu dogovorite prema broju osoba i prilozima."], en: ["Striploin","A striploin steak cut to an agreed thickness. Plan quantities around your guests and side dishes."] },
  { id: "c4", kg: 1.34, day: 39, target: 45, eur: 68, sub: { hr: "za posebnu večer", en: "for a big night" }, hr: ["Tomahawk","Odrezak s dugom rebrenom kosti. Pitajte za veličinu komada i odgovara li vašoj opremi za pripremu."], en: ["Tomahawk","A steak with a long rib bone. Check its size and whether it suits your cooking equipment."] },
  { id: "c5", kg: 1.02, day: 24, target: 28, eur: 58, sub: { hr: "biftek + ramstek", en: "fillet + strip" }, hr: ["Porterhouse","Odrezak s kosti koji obuhvaća biftek i ramstek. Specifikaciju konkretnog reza potvrdite s mesarom."], en: ["Porterhouse","A bone-in cut combining fillet and striploin. Confirm the specification of the available steak with the butcher."] },
  { id: "c6", kg: 0.36, day: 30, target: 30, eur: 59, sub: { hr: "bez kosti", en: "boneless" }, hr: ["Rib-eye","Odrezak za tavu ili roštilj. Provjerite debljinu, težinu i je li dostupan s kosti ili bez nje."], en: ["Rib-eye","A steak for pan cooking or grilling. Check thickness, weight and whether the available cut is bone-in or boneless."] },
];

export const FAQ = {
  where: { hr: ["Gdje se nalazi Mecara?","U centru DOC u Lapadu, na adresi Kralja Tomislava 7, Dubrovnik. Otvorite upute za dolazak kako biste pronašli lokaciju."], en: ["Where is Mecara?","Inside the DOC shopping centre in Lapad, at Kralja Tomislava 7, Dubrovnik. Use the directions link to find the location."] },
  avail: { hr: ["Kako provjeriti imate li određeni proizvod?","Pošaljite naziv proizvoda, okvirnu količinu i željeni datum. Provjerit ćemo aktualnu ponudu i odgovoriti što je dostupno."], en: ["How can I check a product's availability?","Send the product name, approximate quantity and preferred date. We will check the current selection and let you know what is available."] },
  confirmed: { hr: ["Je li narudžba potvrđena nakon klika?","Ne. Gumb priprema upit koji trebate poslati. Narudžbu i termin potvrđuje Mecara zasebnom porukom."], en: ["Is my order confirmed when I click the button?","No. The button prepares an enquiry for you to send. Mecara confirms the order and timing in a separate message."] },
  thick: { hr: ["Mogu li zatražiti određenu debljinu odreska?","Navedite željenu debljinu ili način rezanja u upitu. Provjerit ćemo može li se zahtjev ispuniti za odabrani komad."], en: ["Can I request a particular steak thickness?","Include your preferred thickness or cutting instructions in the enquiry. We will check whether this is possible for the cut you have chosen."] },
  estimate: { hr: ["Zašto je iznos okviran?","Kod proizvoda koji se prodaju po težini konačan iznos ovisi o stvarno izvaganoj količini i potvrđenoj cijeni po kilogramu. Ako želite ograničiti budžet, napišite to u upitu."], en: ["Why is the total an estimate?","For products sold by weight, the final amount depends on the actual quantity weighed and the confirmed price per kilogram. Let us know if you have a budget limit."] },
  time: { hr: ["Mogu li preuzeti u odabranom terminu?","Željeni termin navedite u upitu. Preuzimanje vrijedi tek nakon naše potvrde dostupnosti i vremena."], en: ["Can I collect at my preferred time?","Include your preferred collection time. Collection is arranged only after we confirm availability and timing."] },
  dryaged: { hr: ["Imate li odležane steakove?","Aktualni izbor provjerite na stranici odležanih steakova ili izravno s mesarom. Za određeni rez, broj dana odležavanja i težinu zatražite potvrdu prije dolaska."], en: ["Do you offer dry-aged steaks?","Check the dry-aged steak page or ask the butcher about the current selection. Confirm the cut, ageing details and weight before visiting for a specific piece."] },
  gluten: { hr: ["Imate li proizvode bez glutena?","Pitajte za proizvode koji imaju potvrđenu oznaku bez glutena. Prije kupnje provjerite sastojke, alergene i informacije o rukovanju konkretnim proizvodom."], en: ["Do you offer gluten-free products?","Ask which products have verified gluten-free labelling. Before buying, check the ingredients, allergens and handling information for the specific item."] },
  ready: { hr: ["Je li meso spremno za jelo?","Provjerite opis svakog proizvoda. Svježe meso i sirovi proizvodi namijenjeni su pripremi; za gotova i pripremljena jela provjerite trebaju li kuhanje ili podgrijavanje."], en: ["Is the meat ready to eat?","Check each product's description. Fresh meat and raw meat products require cooking; check whether prepared dishes need cooking or reheating."] },
  parking: { hr: ["Je li parking besplatan?","Kupcima je dostupan jedan sat besplatnog parkiranja na parkiralištu centra DOC i Tommyja."], en: ["Is parking free?","Customers get one hour of free parking at the DOC and Tommy car park."] },
  large: { hr: ["Mogu li rezervirati veću količinu?","Da biste provjerili mogućnosti za veće druženje, javite nam se s datumom, brojem osoba i željenim izborom. Količine i rokove dogovaramo prema raspoloživosti."], en: ["Can I request a larger quantity?","To check options for a larger gathering, send your date, guest count and preferred selection. Quantities and timing are agreed according to availability."] },
};

export const META = {
  home:    { hr: ["Mecara — Mesnica u Lapadu, Dubrovnik","Posjetite Mecaru u centru DOC u Lapadu. Meso za ručak, odležani steakovi i izbor za roštilj. Pogledajte ponudu i provjerite dostupnost."], en: ["Mecara — Butcher Shop in Lapad, Dubrovnik","Visit Mecara at DOC in Lapad, Dubrovnik. Explore fresh meat, dry-aged steaks and BBQ favourites, and ask about cuts and availability."] },
  ponuda:  { hr: ["Svježe meso i delikatese u Dubrovniku — Mecara","Pregledajte izbor mesa, suhomesnatih proizvoda i sireva u Mecari u Lapadu. Za konkretan rez, količinu i današnju dostupnost pošaljite upit."], en: ["Fresh Meat & Deli in Dubrovnik — Mecara","Explore meat, cured meats and cheese at Mecara in Lapad. Ask about available cuts, quantities and preparation for your next meal."] },
  steak:   { hr: ["Odležani steakovi u Dubrovniku — Mecara","Tražite odležani steak u Dubrovniku? Pitajte Mecaru u Lapadu za aktualne rezove, težinu, podatke o odležavanju i cijenu odabranog komada."], en: ["Dry-Aged Steaks in Dubrovnik — Mecara","Choose a dry-aged steak at Mecara in Lapad. Check available cuts, ageing details, weights and prices before planning your steak dinner."] },
  bbq:     { hr: ["Meso za roštilj u Dubrovniku — Mecara","Složite izbor mesa za obiteljski roštilj ili veće društvo. Provjerite ponudu Mecare, zatražite savjet za količine i dogovorite preuzimanje."], en: ["BBQ Meat in Dubrovnik — Mecara Butcher Shop","Planning a BBQ in Dubrovnik? Ask Mecara about ćevapi, sausages, chicken and steaks. Check quantities and arrange confirmed collection."] },
  about:   { hr: ["O Mecari — Mesnica u DOC-u, Lapad","Upoznajte Mecaru, mesnicu u centru DOC u Dubrovniku. Birajte meso prema jelu koje pripremate i pitajte mesara za rezove i aktualnu ponudu."], en: ["About Mecara — Your Butcher in Lapad","Meet Mecara, a butcher shop at DOC in Lapad, Dubrovnik. Choose meat around your meal and ask about cuts, preparation and the current selection."] },
  contact: { hr: ["Mecara kontakt, adresa i radno vrijeme — Dubrovnik","Pronađite Mecaru na Kralja Tomislava 7 u centru DOC, Lapad. Provjerite kontakt i radno vrijeme ili pošaljite upit za željeni proizvod."], en: ["Contact & Opening Hours — Mecara Dubrovnik","Find Mecara at Kralja Tomislava 7, DOC shopping centre, Lapad. Check opening hours, get directions and contact us about the current selection."] },
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
