/* Mecara – web aplikacija. Sav kod radi u pregledniku, nema servera ni kolačića. */
(function(){
"use strict";

// Broj za narudžbe. Dok je ovdje primjer, narudžbe se ne šalju (radna verzija).
const WA_NUMBER = "385000000000";
const ORDERS_LIVE = /^385\d{8,9}$/.test(WA_NUMBER) && WA_NUMBER !== "385000000000";

const T = {
 hr:{gEye:"Posjeti nas",gH:"Kralja Tomislava 7, u DOC-u",gP:"Uđi, pogledaj komoru i pitaj mesara. Sat parkinga na parkingu centra DOC i Tommyja je na nama.",gMap:"Otvori kartu",wip:"RADNA VERZIJA",proto:"Stranica je u izradi. Cijene, komadi u komori i datumi tečajeva su primjeri, a narudžbe još ne idu Mecari.",
  nav1:"Komora",nav2:"Ponuda",nav3:"Roštilj planer",nav4:"Villa & Yacht",nav5:"Tečajevi",cart:"Narudžba",
  heroEye:"Mesnica u DOC-u · od 7 do 19",
  heroH:'Naruči svoj komad večer prije. <em class="copper-text">Pokupi ga bez čekanja.</em>',
  heroP:"Domaće meso iz male klaonice u Dalmatinskoj zagori, odležani steakovi iz naše komore, pršut, sirevi i gotova jela. Izaberi online, mi narežemo i spakiramo, a ti dođeš u termin koji ti paše.",
  cta1:"Pogledaj što je u komori",cta2:"Koliko mesa za roštilj?",
  fNow:"Sada",fAddr:"Adresa",fHours:"Radno vrijeme",fHoursV:"Pon–Sub 7:00–19:00 · Ned zatvoreno",fPark:"Parking",fParkV:"1 sat besplatno na parkingu centra DOC i Tommyja",fPick:"Prvi termin",
  open:"Otvoreno do 19:00",closed:"Zatvoreno · otvaramo u 7:00",
  kEye:"Dry-age komora · uživo",kH:"Svaki steak ima svoje ime i svoj broj dana",
  kP:"Ovo nema nijedna mesnica u Dubrovniku: vidiš točno koji komad visi u komori, koliko je težak i koliko je dana odležao. Rezerviraš baš taj komad, a mi ga čuvamo za tebe.",
  days:"dana",ready:"Spreman",inDays:"Spreman za {n} d.",reserve:"Rezerviraj ovaj komad",reserved:"Rezerviran",
  pEye:"Ponuda",pH:"Sve što ima u vitrini, i ono iza nje",pP:"Dodaj u narudžbu, upiši kako želiš da narežemo, i izaberi termin preuzimanja.",
  all:"Sve",gf:"Samo bez glutena",gfPill:"bez glutena",add:"Dodaj",added:"Dodano",
  rEye:"Roštilj planer",rH:"Koliko mesa treba za vaše društvo?",rP:"Upiši broj ljudi i koliko su gladni. Planer izračuna kilograme po vrsti mesa i jednim klikom sve stavi u narudžbu.",
  rGuests:"Broj osoba",rHunger:"Koliko su gladni?",rStyle:"Kakav roštilj?",rPlan:"Vaš plan",rTotal:"Ukupno okvirno",rAdd:"Stavi sve u narudžbu",
  h1:"Lagano",h2:"Normalno",h3:"Jako gladni",s1:"Klasika",s2:"Premium",s3:"Dalmatinski",
  tEye:"Tečajevi o mesu",tH:"Dođi naučiti od mesara",tP:"Male grupe, za pultom u Mecari. Prijava ide preko narudžbe, mjesto je potvrđeno porukom.",
  seats:"mjesta",signup:"Prijavi se",
  o1h:"Jedan proizvođač, samo za Mecaru",o1p:"Junetina, teletina, janjci i odojci iz male klaonice u Dalmatinskoj zagori.",
  o2h:"Domaći OPG-ovi",o2p:"Drniški i sinjski pršut, suho meso od mangulice, sir iz mješine, kajmak, rakije iz Konavala.",
  o3h:"Bez glutena, ozbiljno",o3p:"Pohani pileći i juneći odresci bez glutena. Uključi filter i vidiš samo ono što je sigurno.",
  cDay:"Dan preuzimanja",cTime:"Vrijeme",cName:"Ime",cTel:"Mobitel",cNote:"Napomena mesaru",cNotePh:"npr. ramstek narezati na 3 cm, vakumirati, ćevape posebno",
  cEst:"Okvirno ukupno",cEstNote:"Konačna cijena ovisi o točnoj težini nakon rezanja. Plaćaš pri preuzimanju.",send:"Pošalji narudžbu",
  rdy:"Poruka je spremna",copy:"Kopiraj poruku",waNote:"Ako se WhatsApp ne otvori, kopiraj poruku i pošalji je na broj Mecare.",
  empty:"Narudžba je prazna. Dodaj nešto iz komore ili ponude.",remove:"makni",
  needItems:"Prvo dodaj nešto u narudžbu.",needName:"Upiši ime i broj mobitela.",copied:"Poruka kopirana",
  today:"Danas",tomorrow:"Sutra",addedT:"Dodano u narudžbu",
  msgHead:"Nova narudžba – Mecara",msgPick:"Preuzimanje",msgName:"Ime",msgTel:"Mob",msgNote:"Napomena",msgEst:"Okvirno"},
 en:{gEye:"Visit us",gH:"Kralja Tomislava 7, inside DOC",gP:"Come in, see the ageing room and ask the butcher. The first hour at the DOC and Tommy car park is on us.",gMap:"Open map",wip:"WORK IN PROGRESS",proto:"This site is being built. Prices, aged cuts and class dates are examples, and orders do not reach Mecara yet.",
  nav1:"Ageing room",nav2:"Shop",nav3:"BBQ planner",nav4:"Villa & Yacht",nav5:"Classes",cart:"Order",
  heroEye:"Butcher shop in DOC · 7am to 7pm",
  heroH:'Order your cut the night before. <em class="copper-text">Pick it up with no queue.</em>',
  heroP:"Croatian meat from a small slaughterhouse in the Dalmatian hinterland, dry-aged steaks from our own ageing room, prosciutto, cheeses and ready meals. Choose online, we cut and pack, you come at the time that suits you.",
  cta1:"See what's in the ageing room",cta2:"How much meat for a BBQ?",
  fNow:"Now",fAddr:"Address",fHours:"Hours",fHoursV:"Mon–Sat 7:00–19:00 · Sun closed",fPark:"Parking",fParkV:"1 hour free at the DOC and Tommy car park",fPick:"First pickup",
  open:"Open until 19:00",closed:"Closed · opens at 7:00",
  kEye:"Dry-age room · live",kH:"Every steak has a name and a day count",
  kP:"No other butcher in Dubrovnik shows this: the exact piece hanging in the room, its weight and how many days it has aged. Reserve that piece and we keep it for you.",
  days:"days",ready:"Ready",inDays:"Ready in {n} d",reserve:"Reserve this piece",reserved:"Reserved",
  pEye:"Shop",pH:"Everything in the counter, and what's behind it",pP:"Add to your order, tell us how to cut it, and pick a collection time.",
  all:"All",gf:"Gluten free only",gfPill:"gluten free",add:"Add",added:"Added",
  rEye:"BBQ planner",rH:"How much meat does your group need?",rP:"Enter the number of people and how hungry they are. The planner works out kilos per meat and adds it all to your order in one click.",
  rGuests:"People",rHunger:"How hungry?",rStyle:"What kind of BBQ?",rPlan:"Your plan",rTotal:"Estimated total",rAdd:"Add all to order",
  h1:"Light",h2:"Normal",h3:"Very hungry",s1:"Classic",s2:"Premium",s3:"Dalmatian",
  tEye:"Meat classes",tH:"Learn from the butcher",tP:"Small groups at the Mecara counter. Sign up through the order, your seat is confirmed by message.",
  seats:"seats",signup:"Sign up",
  o1h:"One producer, only for Mecara",o1p:"Beef, veal, lamb and suckling pig from a small slaughterhouse in the Dalmatian hinterland.",
  o2h:"Local family farms",o2p:"Drniš and Sinj prosciutto, Mangalica cured meat, cheese aged in sheepskin, kajmak, Konavle brandies.",
  o3h:"Gluten free, properly",o3p:"Gluten-free breaded chicken and beef cutlets. Turn on the filter and see only what is safe.",
  cDay:"Pickup day",cTime:"Time",cName:"Name",cTel:"Mobile",cNote:"Note for the butcher",cNotePh:"e.g. cut the striploin 3 cm thick, vacuum pack",
  cEst:"Estimated total",cEstNote:"Final price depends on exact weight after cutting. Pay at pickup.",send:"Send order",
  rdy:"Your message is ready",copy:"Copy message",waNote:"If WhatsApp doesn't open, copy the message and send it to Mecara's number.",
  empty:"Your order is empty. Add something from the ageing room or the shop.",remove:"remove",
  needItems:"Add something to your order first.",needName:"Enter your name and mobile number.",copied:"Message copied",
  today:"Today",tomorrow:"Tomorrow",addedT:"Added to order",
  msgHead:"New order – Mecara",msgPick:"Pickup",msgName:"Name",msgTel:"Mob",msgNote:"Note",msgEst:"Estimate"}
};
const T2 = {
 hr:{skip:"Preskoči na sadržaj",cartAria:"Otvori narudžbu, broj stavki:",close:"Zatvori",less:"Manje",more:"Više",qtyOf:"Količina",
  needTel:"Upiši ispravan broj mobitela (npr. 091 234 5678).",wipOrder:"Radna verzija: narudžbe se još ne šalju Mecari. Poruku možeš kopirati, ali je zasad nemoj slati.",
  copyOnly:"Kopiraj narudžbu",holiday:"Zatvoreno · blagdan",privacy:"Privatnost: stranica ne koristi kolačiće ni praćenje. Košarica se čuva samo u tvom pregledniku. Ime i broj koje upišeš idu isključivo u poruku koju sam šalješ Mecari.",
  vNeed:"Please fill in date, guests, name and address.",reserveAgain:"Ovaj komad je već u tvojoj narudžbi."},
 en:{skip:"Skip to content",cartAria:"Open order, items:",close:"Close",less:"Less",more:"More",qtyOf:"Quantity",
  needTel:"Enter a valid mobile number (e.g. +44 7700 900123).",wipOrder:"Work in progress: orders are not sent to Mecara yet. You can copy the message, but please don't send it for now.",
  copyOnly:"Copy order",holiday:"Closed · public holiday",privacy:"Privacy: this site uses no cookies or tracking. Your basket is kept only in your browser. The name and number you enter go only into the message you send to Mecara yourself.",
  vNeed:"Please fill in date, guests, name and address.",reserveAgain:"This piece is already in your order."}
};
Object.keys(T2).forEach(l=>Object.assign(T[l],T2[l]));
let lang = "hr";
try{ const s = localStorage.getItem("mecara-lang"); if(s==="hr"||s==="en") lang=s; }catch(e){}
const t = k => (T[lang][k] ?? T.hr[k] ?? k);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const $ = id => document.getElementById(id);
const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- data (primjeri) ---------- */
const CUTS = [
 {id:"c1",hr:"Côte de boeuf",en:"Côte de boeuf",sub:{hr:"rebro s kosti",en:"bone-in rib"},kg:1.12,day:35,target:35,eur:62},
 {id:"c2",hr:"T-bone",en:"T-bone",sub:{hr:"junetina, Zagora",en:"young beef"},kg:0.92,day:28,target:28,eur:56},
 {id:"c3",hr:"Ramstek",en:"Striploin",sub:{hr:"komad za 2 osobe",en:"serves 2"},kg:0.48,day:21,target:21,eur:49},
 {id:"c4",hr:"Tomahawk",en:"Tomahawk",sub:{hr:"za posebnu večer",en:"for a big night"},kg:1.34,day:39,target:45,eur:68},
 {id:"c5",hr:"Porterhouse",en:"Porterhouse",sub:{hr:"biftek + ramstek",en:"fillet + strip"},kg:1.02,day:24,target:28,eur:58},
 {id:"c6",hr:"Rib-eye",en:"Rib-eye",sub:{hr:"bez kosti",en:"boneless"},kg:0.36,day:30,target:30,eur:59}
];
const CATS = [
 ["junetina",{hr:"Junetina",en:"Beef"}],["teletina",{hr:"Teletina",en:"Veal"}],["janjetina",{hr:"Janjetina",en:"Lamb"}],
 ["svinjetina",{hr:"Svinjetina i odojak",en:"Pork"}],["piletina",{hr:"Piletina",en:"Chicken"}],["rostilj",{hr:"Za roštilj",en:"For the grill"}],
 ["suho",{hr:"Suhomesnato",en:"Cured meats"}],["sir",{hr:"Sirevi",en:"Cheese"}],["gotovo",{hr:"Gotova jela",en:"Ready meals"}],["spenza",{hr:"Spenza, vino i rakija",en:"Pantry, wine & rakija"}]
];
// unit: kg (step .25), g100 (100 g), kom (piece)
const P = [
 ["p1","junetina","Juneći biftek","Beef tenderloin","kg",59,"Dalmatinska zagora"],
 ["p2","junetina","Juneći ramstek","Beef striploin","kg",32,"Dalmatinska zagora"],
 ["p3","junetina","Juneći but za gulaš","Beef for goulash","kg",16.9,"Dalmatinska zagora"],
 ["p4","junetina","Mljevena junetina","Minced beef","kg",13.9,"Dalmatinska zagora"],
 ["p5","junetina","Juneća rebra","Beef short ribs","kg",14.5,"Dalmatinska zagora"],
 ["p6","teletina","Teleći odrezak","Veal escalope","kg",29,"Dalmatinska zagora"],
 ["p7","teletina","Teleća koljenica za peku","Veal shank for peka","kg",15.5,"Dalmatinska zagora"],
 ["p8","janjetina","Janjetina za peku","Lamb for peka","kg",19.9,"Dalmatinska zagora"],
 ["p9","janjetina","Janjeći kotleti","Lamb chops","kg",34,"Dalmatinska zagora"],
 ["p10","svinjetina","Svinjski vrat","Pork neck","kg",10.9,"Dalmatinska zagora"],
 ["p11","svinjetina","Svinjska rebarca","Pork ribs","kg",9.9,"Dalmatinska zagora"],
 ["p12","svinjetina","Odojak (po narudžbi)","Suckling pig (to order)","kg",16.5,"Dalmatinska zagora"],
 ["p13","piletina","Marinirani pileći batak","Marinated chicken legs","kg",8.9,"Hrvatska"],
 ["p14","piletina","Pileći file","Chicken breast","kg",12.5,"Hrvatska"],
 ["p15","rostilj","Domaći ćevapi","House ćevapi","kg",14.9,"Mecara"],
 ["p16","rostilj","Domaće kobasice za roštilj","Grill sausages","kg",12.9,"Mecara"],
 ["p17","rostilj","Pljeskavica","Pljeskavica patties","kg",13.9,"Mecara"],
 ["p18","piletina","Pohani pileći file bez glutena","Gluten-free breaded chicken","kom",3.9,"Mecara",1],
 ["p19","junetina","Pohani juneći odrezak bez glutena","Gluten-free breaded beef","kom",5.5,"Mecara",1],
 ["p20","suho","Drniški pršut, narezan","Drniš prosciutto, sliced","g100",4.9,"OPG"],
 ["p21","suho","Sinjski pršut, narezan","Sinj prosciutto, sliced","g100",4.9,"OPG"],
 ["p22","suho","Talijanski lardo","Italian lardo","g100",3.9,"Italija"],
 ["p23","suho","Rolana panceta u papru","Rolled pepper pancetta","g100",3.5,"Italija"],
 ["p24","suho","Suho meso od mangulice","Mangalica cured meat","g100",5.2,"OPG"],
 ["p25","suho","Domaća suha kobasica","Dry-cured sausage","g100",2.9,"OPG"],
 ["p26","sir","Sir iz mješine","Cheese aged in sheepskin","g100",3.6,"OPG"],
 ["p27","sir","Torotan","Torotan cheese","g100",3.8,"OPG"],
 ["p28","sir","Mladi kajmak","Young kajmak","g100",2.4,"OPG"],
 ["p29","sir","Mladi hercegovački sir","Young Herzegovina cheese","g100",1.9,"OPG"],
 ["p30","gotovo","Sarma","Sarma (cabbage rolls)","kom",2.8,"Mecara"],
 ["p31","gotovo","Punjene paprike","Stuffed peppers","kom",2.9,"Mecara"],
 ["p32","gotovo","Arancini","Arancini","kom",1.9,"Mecara"],
 ["p33","spenza","Pinđur","Pinđur relish","kom",6.5,"OPG"],
 ["p34","spenza","Krema od bijelog tartufa","White truffle cream","kom",9.9,"Italija"],
 ["p35","spenza","Bruštulani mjenduli","Candied almonds","kom",5.5,"Dubrovnik"],
 ["p36","spenza","Rakija iz Konavala, 0,5 l","Konavle rakija, 0.5 l","kom",18,"Konavle"],
 ["p37","spenza","Crno vino s dubrovačkog područja","Red wine, Dubrovnik area","kom",16,"Dubrovnik"]
].map(r=>({id:r[0],cat:r[1],hr:r[2],en:r[3],unit:r[4],eur:r[5],origin:r[6],gf:!!r[7]}));
const byId = Object.fromEntries(P.map(p=>[p.id,p]));

const BOXES = [
 {id:"b1",name:"Terrace BBQ Box",desc:"Ćevapi, pork neck, chicken, grill sausages, ajvar & pinđur. About 400 g per guest.",from:"from €19 / guest"},
 {id:"b2",name:"Dry-Aged Steak Box",desc:"Côte de boeuf or T-bone from the ageing room, Drniš prosciutto and cheese board to start.",from:"from €45 / guest"},
 {id:"b3",name:"Peka for the Villa Chef",desc:"Lamb and veal shank cut for peka, with potatoes, herbs and a bottle of local red.",from:"from €28 / guest"},
 {id:"b4",name:"Yacht Charcuterie Board",desc:"Prosciutto, lardo, Mangalica, three cheeses, candied almonds and dried figs. Vacuum packed for the cool box.",from:"from €15 / guest"}
];
const COURSES = [
 {d:"21.11.",dw:{hr:"Subota 18:00",en:"Saturday 18:00"},hr:"Savršen steak kod kuće",en:"The perfect steak at home",phr:"Kako odabrati komad iz komore, odmor mesa, tava ili roštilj.",pen:"Choosing a dry-aged cut, resting, pan or grill.",eur:35,seats:8},
 {d:"04.12.",dw:{hr:"Petak 18:30",en:"Friday 18:30"},hr:"Pršut, sir i vino",en:"Prosciutto, cheese & wine",phr:"Degustacija drniškog i sinjskog pršuta, sira iz mješine i dubrovačkih vina.",pen:"Tasting Drniš and Sinj prosciutto, sheepskin cheese and Dubrovnik wines.",eur:29,seats:12},
 {d:"12.12.",dw:{hr:"Subota 10:00",en:"Saturday 10:00"},hr:"Božićna janjetina i odojak",en:"Christmas lamb & suckling pig",phr:"Rezanje, priprema za peku i ražanj, narudžbe za blagdane.",pen:"Butchery and prep for peka and spit roast, holiday orders.",eur:35,seats:8}
];
const byCut = Object.fromEntries(CUTS.map(c=>[c.id,c]));

/* ---------- vrijeme po Dubrovniku (ne po satu posjetitelja) ---------- */
const TZ = "Europe/Zagreb";
const DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
function zNow(){
  const o={};
  new Intl.DateTimeFormat("en-GB",{timeZone:TZ,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",weekday:"short",hourCycle:"h23"})
    .formatToParts(new Date()).forEach(p=>o[p.type]=p.value);
  return {y:+o.year,m:+o.month,d:+o.day,mins:(+o.hour)*60+(+o.minute),dow:DOW.indexOf(o.weekday)};
}
// datum kao UTC podne, da dan u tjednu ne ovisi o zoni posjetitelja
const zDate = (y,m,d) => new Date(Date.UTC(y,m-1,d,12));
const key = d => d.toISOString().slice(0,10);
function easter(y){ const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31),da=((h+l-7*m+114)%31)+1; return zDate(y,mo,da); }
const holCache={};
function holidays(y){ // državni blagdani RH
  if(holCache[y]) return holCache[y];
  const s=new Set(["01-01","01-06","05-01","05-30","06-22","08-05","08-15","11-01","11-18","12-25","12-26"].map(x=>y+"-"+x));
  const e=easter(y); [0,1,60].forEach(n=>{ const x=new Date(e); x.setUTCDate(e.getUTCDate()+n); s.add(key(x)); });
  return holCache[y]=s;
}
const isClosedDay = d => d.getUTCDay()===0 || holidays(d.getUTCFullYear()).has(key(d));
const OPEN=7*60, CLOSE=19*60, FIRST=8*60, LAST=18*60+30, LEAD=120;

/* ---------- košarica (podaci iz preglednika se provjeravaju) ---------- */
function loadCart(){
  let raw={}; try{ raw=JSON.parse(localStorage.getItem("mecara-cart")||"{}"); }catch(e){ raw={}; }
  const out={}; if(!raw||typeof raw!=="object"||Array.isArray(raw)) return out;
  for(const [k,c] of Object.entries(raw)){
    if(!c||typeof c!=="object") continue;
    const q=Number(c.qty);
    if(c.type==="p" && byId[c.id] && q>0 && q<=100) out["p-"+c.id]={type:"p",id:c.id,qty:Math.round(q*100)/100};
    else if(c.type==="cut" && byCut[c.id]) out["cut-"+c.id]={type:"cut",id:c.id,qty:1};
    else if(c.type==="course" && Number.isInteger(c.id) && COURSES[c.id] && q>=1 && q<=COURSES[c.id].seats) out["course-"+c.id]={type:"course",id:c.id,qty:Math.floor(q)};
  }
  return out;
}
let cart = loadCart();
const save = ()=>{ try{ localStorage.setItem("mecara-cart",JSON.stringify(cart)); }catch(e){} };
const loc = () => lang==="hr"?"hr-HR":"en-GB";
const fmt = n => n.toLocaleString(loc(),{minimumFractionDigits:2,maximumFractionDigits:2})+" €";
const fmtKg = n => n.toLocaleString(loc(),{maximumFractionDigits:2})+" kg";
function qtyLabel(p,q){ if(p.unit==="kg") return fmtKg(q); if(p.unit==="g100") return (q*100)+" g"; return q+" "+(lang==="hr"?"kom":"pcs"); }
function unitPrice(p){ return p.unit==="kg"?"€/kg":p.unit==="g100"?"€/100 g":"€/"+(lang==="hr"?"kom":"pc"); }
function lineInfo(k){
  const c = cart[k];
  if(c.type==="p"){ const p=byId[c.id]; return {name:p[lang],q:qtyLabel(p,c.qty),eur:p.eur*c.qty}; }
  if(c.type==="cut"){ const x=byCut[c.id]; return {name:(lang==="hr"?"Komora: ":"Ageing room: ")+x[lang]+" · "+x.day+" "+t("days"),q:fmtKg(x.kg),eur:x.eur*x.kg}; }
  const co=COURSES[c.id]; return {name:(lang==="hr"?"Tečaj: ":"Class: ")+co[lang]+" ("+co.d+")",q:c.qty+"×",eur:co.eur*c.qty};
}
function addToCart(k,obj){
  if(cart[k] && obj.type==="p"){ cart[k].qty=Math.min(100,Math.round((cart[k].qty+obj.qty)*100)/100); }
  else cart[k]=obj;
  save(); hideResult(); renderCart();
}
function toast(m){ const el=$("toast"); el.textContent=m; el.classList.add("show"); clearTimeout(toast._t); toast._t=setTimeout(()=>el.classList.remove("show"),2200); }

/* ---------- mramorirano meso (canvas) ---------- */
function rng(seed){ let s=seed; return ()=>{ s=(s*16807)%2147483647; return (s-1)/2147483646; }; }
function marble(cv,seed){
  const dpr=Math.min(2,window.devicePixelRatio||1), w=cv.clientWidth||300, h=140;
  cv.width=Math.round(w*dpr); cv.height=Math.round(h*dpr); const g=cv.getContext("2d"); if(!g) return; g.scale(dpr,dpr);
  const r=rng(seed*997+13);
  const base=g.createLinearGradient(0,0,w,h);
  base.addColorStop(0,"#5a1c17"); base.addColorStop(.6,"#4a1612"); base.addColorStop(1,"#2e0e0c");
  g.fillStyle=base; g.fillRect(0,0,w,h);
  for(let i=0;i<70;i++){
    g.beginPath(); let x=r()*w, y=r()*h; g.moveTo(x,y);
    for(let j=0;j<4;j++){ x+=(r()-.3)*60; y+=(r()-.5)*26; g.quadraticCurveTo(x-(r()*20),y+(r()-.5)*14,x,y); }
    g.strokeStyle=`rgba(244,226,205,${.08+r()*.32})`; g.lineWidth=.6+r()*2.6; g.lineCap="round"; g.stroke();
  }
  g.fillStyle="rgba(240,220,196,.85)"; g.fillRect(0,h-16,w,16);
  const v=g.createRadialGradient(w/2,h/2,10,w/2,h/2,w*.7); v.addColorStop(0,"rgba(0,0,0,0)"); v.addColorStop(1,"rgba(0,0,0,.45)");
  g.fillStyle=v; g.fillRect(0,0,w,h);
}

/* ---------- komora ---------- */
function renderKomora(){
  const el=$("komora-grid"); el.textContent="";
  CUTS.forEach((c,i)=>{
    const isRes=!!cart["cut-"+c.id], ready=c.day>=c.target;
    const card=document.createElement("article"); card.className="cut"+(isRes?" reserved":"");
    const tag=isRes?`<span class="tag res">${esc(t("reserved"))}</span>`:ready?`<span class="tag ready">${esc(t("ready"))}</span>`:`<span class="tag aging">${esc(t("inDays").replace("{n}",c.target-c.day))}</span>`;
    card.innerHTML=`<canvas aria-hidden="true"></canvas>
     <div class="body">
      <div class="row"><h3>${esc(c[lang])}</h3>${tag}</div>
      <div class="row muted meta-row"><span>${esc(c.sub[lang])}</span><span class="num">${esc(fmtKg(c.kg))}</span></div>
      <div><div class="row mono muted days-row"><span>${c.day} / ${c.target} ${esc(t("days"))}</span><span aria-hidden="true">#${String(i+1).padStart(2,"0")}</span></div>
      <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${c.target}" aria-valuenow="${c.day}" aria-label="${esc(c[lang])}: ${c.day} / ${c.target} ${esc(t("days"))}"><i></i></div></div>
      <div class="row"><span class="price num">${c.eur} €/kg</span><b class="num">≈ ${esc(fmt(c.eur*c.kg))}</b></div>
      <button class="btn small" type="button"></button>
     </div>`;
    card.querySelector(".bar i").style.width=Math.min(100,c.day/c.target*100)+"%";
    const b=card.querySelector("button"); b.textContent=isRes?t("reserved"):t("reserve"); b.disabled=isRes;
    b.addEventListener("click",()=>{ if(cart["cut-"+c.id]){ toast(t("reserveAgain")); return; } addToCart("cut-"+c.id,{type:"cut",id:c.id,qty:1}); renderKomora(); toast(t("addedT")); });
    el.appendChild(card);
    requestAnimationFrame(()=>marble(card.querySelector("canvas"),i+1));
  });
}

/* ---------- ponuda ---------- */
let activeCat="all", gfOnly=false;
const qtys={};
const stepOf = p => p.unit==="kg"?.25:1;
const defQty = p => p.unit==="kg"?(p.eur>40?.5:1):2;
function renderFilters(){
  const f=$("filters"); f.textContent="";
  f.setAttribute("role","group"); f.setAttribute("aria-label",t("pEye"));
  const mk=(id,label)=>{ const b=document.createElement("button"); b.type="button"; b.className="chip"; b.textContent=label; b.setAttribute("aria-pressed",String(activeCat===id)); b.addEventListener("click",()=>{activeCat=id; renderFilters(); renderGrid();}); f.appendChild(b); };
  mk("all",t("all")); CATS.forEach(([id,l])=>mk(id,l[lang]));
  const lab=document.createElement("label"); lab.className="gf-toggle";
  const cb=document.createElement("input"); cb.type="checkbox"; cb.id="gf"; cb.checked=gfOnly;
  cb.addEventListener("change",e=>{gfOnly=e.target.checked; renderGrid();});
  lab.append(cb," "+t("gf")); f.appendChild(lab);
}
function renderGrid(){
  const g=$("grid"); g.textContent="";
  P.filter(p=>(activeCat==="all"||p.cat===activeCat)&&(!gfOnly||p.gf)).forEach(p=>{
    if(qtys[p.id]==null) qtys[p.id]=defQty(p);
    const d=document.createElement("article"); d.className="item";
    const other=lang==="hr"?p.en:p.hr;
    const price=p.eur.toLocaleString(loc(),{minimumFractionDigits:2,maximumFractionDigits:2});
    d.innerHTML=`<h3>${esc(p[lang])}</h3><div class="en" lang="${lang==="hr"?"en":"hr"}">${esc(other)}</div>
     <div class="meta"><span class="pill">${esc(p.origin)}</span>${p.gf?`<span class="pill gf">${esc(t("gfPill"))}</span>`:""}<span class="pill num">${esc(price)} ${esc(unitPrice(p))}</span></div>
     <div class="foot"><div class="stepper" role="group" aria-label="${esc(t("qtyOf"))}: ${esc(p[lang])}"><button type="button" aria-label="${esc(t("less"))}">−</button><output class="num" aria-live="polite"></output><button type="button" aria-label="${esc(t("more"))}">+</button></div>
     <button class="add" type="button">${esc(t("add"))}</button></div>`;
    const out=d.querySelector("output"), [minus,plus]=d.querySelectorAll(".stepper button");
    const upd=()=>{ out.textContent=qtyLabel(p,qtys[p.id]); minus.disabled=qtys[p.id]<=stepOf(p); };
    minus.addEventListener("click",()=>{ qtys[p.id]=Math.max(stepOf(p),Math.round((qtys[p.id]-stepOf(p))*100)/100); upd(); });
    plus.addEventListener("click",()=>{ qtys[p.id]=Math.min(50,Math.round((qtys[p.id]+stepOf(p))*100)/100); upd(); });
    const addb=d.querySelector(".add");
    addb.addEventListener("click",()=>{ addToCart("p-"+p.id,{type:"p",id:p.id,qty:qtys[p.id]}); addb.textContent=t("added"); addb.classList.add("done"); toast(t("addedT")); setTimeout(()=>{addb.textContent=t("add");addb.classList.remove("done");},1200); });
    upd(); g.appendChild(d);
  });
}

/* ---------- roštilj planer ---------- */
let hunger=1, style=0;
const HUNGER=[250,350,500]; // grama sirovog mesa po osobi
const STYLES=[
  [["p15",.3],["p10",.3],["p16",.2],["p13",.2]],
  [["p2",.4],["p9",.3],["p14",.3]],
  [["p8",.45],["p7",.35],["p16",.2]]
];
function seg(id,keys,get,set){
  const el=$(id); el.textContent="";
  keys.forEach((k,i)=>{ const b=document.createElement("button"); b.type="button"; b.className="chip"; b.textContent=t(k); b.setAttribute("aria-pressed",String(get()===i)); b.addEventListener("click",()=>{set(i); seg(id,keys,get,set); renderPlan();}); el.appendChild(b); });
}
function planItems(){
  const n=Math.min(40,Math.max(2,+$("guests").value||8)), total=n*HUNGER[hunger]/1000;
  return STYLES[style].map(([id,share])=>({p:byId[id],kg:Math.max(.25,Math.round(total*share*4)/4)}));
}
function renderPlan(){
  $("guests-out").textContent=$("guests").value;
  const ul=$("plan"); ul.textContent=""; let sum=0,kgs=0;
  planItems().forEach(({p,kg})=>{ sum+=p.eur*kg; kgs+=kg; const li=document.createElement("li"); li.innerHTML=`<span>${esc(p[lang])}</span><span class="num muted">${esc(fmtKg(kg))}</span><b class="num">${esc(fmt(p.eur*kg))}</b>`; ul.appendChild(li); });
  $("plan-total").textContent=fmtKg(kgs)+" · "+fmt(sum);
}

/* ---------- villa ---------- */
function renderBoxes(){
  const el=$("boxes"); el.textContent="";
  BOXES.forEach((b,i)=>{ const l=document.createElement("label"); l.className="box"; l.innerHTML=`<input type="radio" name="box" value="${esc(b.id)}" ${i===0?"checked":""}><div><h3>${esc(b.name)}</h3><p>${esc(b.desc)}</p></div><span class="mono muted">${esc(b.from)}</span>`; el.appendChild(l); });
}

/* ---------- tečajevi ---------- */
function renderCourses(){
  const el=$("courses"); el.textContent="";
  COURSES.forEach((c,i)=>{ const d=document.createElement("div"); d.className="course";
    const taken=!!cart["course-"+i];
    d.innerHTML=`<div class="date">${esc(c.d)}<small>${esc(c.dw[lang])}</small></div><div><h3>${esc(c[lang])}</h3><p>${esc(lang==="hr"?c.phr:c.pen)}</p></div><span class="mono muted">${c.eur} € · ${c.seats} ${esc(t("seats"))}</span><button class="btn small ${taken?"":"ghost"}" type="button"></button>`;
    const b=d.querySelector("button"); b.textContent=taken?"✓ "+t("added"):t("signup"); b.disabled=taken;
    b.addEventListener("click",()=>{ addToCart("course-"+i,{type:"course",id:i,qty:1}); renderCourses(); toast(t("addedT")); });
    el.appendChild(d); });
}

/* ---------- termini preuzimanja (po dubrovačkom vremenu) ---------- */
let selDay=null, selTime=null;
const hhmm = m => String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0");
function slotsFor(d,isToday,nowMins){ const r=[]; for(let m=FIRST;m<=LAST;m+=30){ if(!isToday||m>=nowMins+LEAD) r.push(m); } return r; }
function dayList(){
  const n=zNow(), today=zDate(n.y,n.m,n.d), out=[];
  for(let i=0;out.length<6&&i<21;i++){
    const d=new Date(today); d.setUTCDate(today.getUTCDate()+i);
    if(isClosedDay(d)) continue;
    const s=slotsFor(d,i===0,n.mins); if(!s.length) continue;
    out.push({d,i,slots:s});
  }
  return out;
}
function dayLabel(x){
  if(x.i===0) return t("today"); if(x.i===1) return t("tomorrow");
  return x.d.toLocaleDateString(loc(),{timeZone:"UTC",weekday:"short",day:"numeric",month:"numeric"});
}
function renderSlots(){
  const days=dayList(); if(!days.length) return;
  let cur=days.find(x=>key(x.d)===selDay); if(!cur){ cur=days[0]; selDay=key(cur.d); }
  if(!cur.slots.includes(selTime)) selTime=cur.slots[0];
  const de=$("days"); de.textContent="";
  days.forEach(x=>{ const b=document.createElement("button"); b.type="button"; b.className="chip"; b.textContent=dayLabel(x); b.setAttribute("aria-pressed",String(x===cur)); b.addEventListener("click",()=>{selDay=key(x.d); selTime=null; renderSlots(); hideResult();}); de.appendChild(b); });
  const te=$("times"); te.textContent="";
  cur.slots.forEach(m=>{ const b=document.createElement("button"); b.type="button"; b.className="chip num"; b.textContent=hhmm(m); b.setAttribute("aria-pressed",String(m===selTime)); b.addEventListener("click",()=>{selTime=m; renderSlots(); hideResult();}); te.appendChild(b); });
  $("first-slot").textContent=dayLabel(days[0])+" · "+hhmm(days[0].slots[0]);
  renderSlots.cur=cur;
}

/* ---------- košarica ---------- */
function renderCart(){
  const keys=Object.keys(cart); let sum=0;
  const L=$("lines"); L.textContent="";
  if(!keys.length){ const p=document.createElement("p"); p.className="empty"; p.textContent=t("empty"); L.appendChild(p); }
  keys.forEach(k=>{ const li=lineInfo(k); sum+=li.eur;
    const d=document.createElement("div"); d.className="line";
    d.innerHTML=`<div><div class="nm">${esc(li.name)}</div><div class="q">${esc(li.q)}</div></div><b class="num">${esc(fmt(li.eur))}</b><button class="rm" type="button">${esc(t("remove"))}</button>`;
    d.querySelector(".rm").addEventListener("click",()=>{ delete cart[k]; save(); hideResult(); renderCart(); renderKomora(); renderCourses(); });
    L.appendChild(d); });
  $("cart-n").textContent=keys.length;
  $("open-cart").setAttribute("aria-label",t("cartAria")+" "+keys.length);
  $("sum").textContent=fmt(sum);
  return sum;
}
const clean = s => s.replace(/[\u0000-\u001f\u007f]/g," ").replace(/\s+/g," ").trim();
const validTel = s => { const d=s.replace(/[^\d]/g,""); return /^[+\d][\d\s\/().-]*$/.test(s) && d.length>=8 && d.length<=15; };
function buildMsg(){
  const sum=renderCart(); const lines=Object.keys(cart).map(k=>{ const li=lineInfo(k); return "• "+li.name+" – "+li.q; });
  const name=clean($("c-name").value), tel=clean($("c-tel").value), note=clean($("c-note").value);
  return [t("msgHead"),"",...lines,"",t("msgPick")+": "+dayLabel(renderSlots.cur)+" "+hhmm(selTime),t("msgName")+": "+name,t("msgTel")+": "+tel,note?t("msgNote")+": "+note:"",t("msgEst")+": "+fmt(sum)].filter(x=>x!=="").join("\n");
}
function showResult(box,msg){
  box.querySelector("pre").textContent=msg;
  const wa=box.querySelector(".wa");
  if(ORDERS_LIVE){ wa.hidden=false; wa.href="https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(msg); }
  else wa.hidden=true;
  box.querySelector(".wip-note").hidden=ORDERS_LIVE;
  box.classList.add("show");
  box.scrollIntoView({behavior:reduceMotion?"auto":"smooth",block:"nearest"});
}
function hideResult(){ $("result").classList.remove("show"); }
async function copyFrom(box){
  const txt=box.querySelector("pre").textContent;
  try{ await navigator.clipboard.writeText(txt); toast(t("copied")); }
  catch(e){ const r=document.createRange(); r.selectNodeContents(box.querySelector("pre")); const s=getSelection(); s.removeAllRanges(); s.addRange(r); toast(lang==="hr"?"Tekst je označen, kopiraj ga":"Text selected, copy it"); }
}

/* ---------- otvoreno / zatvoreno ---------- */
function renderOpen(){
  const n=zNow(), d=zDate(n.y,n.m,n.d), hol=d.getUTCDay()!==0&&holidays(n.y).has(key(d));
  const open=!isClosedDay(d)&&n.mins>=OPEN&&n.mins<CLOSE;
  $("open-dot").className="dot"+(open?"":" off");
  $("open-txt").textContent=open?t("open"):hol?t("holiday"):t("closed");
}

/* ---------- jezik ---------- */
function applyLang(){
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>el.textContent=t(el.dataset.i18n));
  document.querySelectorAll("[data-i18n-html]").forEach(el=>el.innerHTML=t(el.dataset.i18nHtml)); // samo naši vlastiti, fiksni tekstovi
  document.querySelectorAll("[data-i18n-ph]").forEach(el=>el.placeholder=t(el.dataset.i18nPh));
  document.querySelectorAll("[data-i18n-aria]").forEach(el=>el.setAttribute("aria-label",t(el.dataset.i18nAria)));
  $("lang-hr").setAttribute("aria-pressed",String(lang==="hr"));
  $("lang-en").setAttribute("aria-pressed",String(lang==="en"));
  $("send").textContent=ORDERS_LIVE?t("send"):t("copyOnly");
  renderOpen(); renderKomora(); renderFilters(); renderGrid();
  seg("hunger",["h1","h2","h3"],()=>hunger,v=>hunger=v); seg("style",["s1","s2","s3"],()=>style,v=>style=v); renderPlan();
  renderCourses(); renderSlots(); renderCart();
}
function setLang(l){ if(l!=="hr"&&l!=="en") return; lang=l; try{localStorage.setItem("mecara-lang",l);}catch(e){} hideResult(); applyLang(); }

/* ---------- ladica narudžbe: fokus i tipkovnica ---------- */
let lastFocus=null;
const mainEls=()=>[document.querySelector("main"),document.querySelector("header.top"),document.querySelector("footer"),document.querySelector(".proto")];
function openCart(){
  lastFocus=document.activeElement; renderSlots(); renderCart();
  document.body.classList.add("cart-open"); mainEls().forEach(e=>e&&(e.inert=true));
  $("drawer").setAttribute("aria-hidden","false");
  setTimeout(()=>$("close-cart").focus(),50);
}
function closeCart(){
  document.body.classList.remove("cart-open"); mainEls().forEach(e=>e&&(e.inert=false));
  $("drawer").setAttribute("aria-hidden","true");
  if(lastFocus&&lastFocus.focus) lastFocus.focus();
}

/* ---------- događaji ---------- */
$("lang-hr").addEventListener("click",()=>setLang("hr"));
$("lang-en").addEventListener("click",()=>setLang("en"));
$("guests").addEventListener("input",renderPlan);
$("plan-add").addEventListener("click",()=>{ planItems().forEach(({p,kg})=>addToCart("p-"+p.id,{type:"p",id:p.id,qty:kg})); toast(t("addedT")); });
$("open-cart").addEventListener("click",openCart);
$("close-cart").addEventListener("click",closeCart);
$("scrim").addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&document.body.classList.contains("cart-open")) closeCart(); });
$("send").addEventListener("click",()=>{
  const err=$("c-err"); err.textContent="";
  if(!Object.keys(cart).length){ err.textContent=t("needItems"); return; }
  if(!clean($("c-name").value)){ err.textContent=t("needName"); $("c-name").focus(); return; }
  if(!validTel($("c-tel").value.trim())){ err.textContent=t("needTel"); $("c-tel").focus(); return; }
  renderSlots(); showResult($("result"),buildMsg());
});
$("copy").addEventListener("click",()=>copyFrom($("result")));
$("v-copy").addEventListener("click",()=>copyFrom($("v-result")));
$("villa-form").addEventListener("submit",e=>{
  e.preventDefault();
  const v=id=>clean($(id).value);
  const err=$("v-err"); err.textContent="";
  const g=+$("v-guests").value;
  if(!v("v-date")||!v("v-name")||!v("v-where")||!(g>=2&&g<=60)){ err.textContent=t("vNeed"); return; }
  const box=BOXES.find(b=>b.id===(document.querySelector('input[name="box"]:checked')||{}).value)||BOXES[0];
  const m=["Villa & Yacht request – Mecara","","Box: "+box.name,"Delivery to: "+v("v-type"),"Where: "+v("v-where"),"Date: "+v("v-date"),"Guests: "+g,"Name: "+v("v-name"),v("v-note")?"Notes: "+v("v-note"):""].filter(Boolean).join("\n");
  showResult($("v-result"),m);
});
(function(){ const n=zNow(), d=zDate(n.y,n.m,n.d); d.setUTCDate(d.getUTCDate()+1); const k=key(d); const el=$("v-date"); el.min=k; el.value=k; const mx=new Date(d); mx.setUTCFullYear(mx.getUTCFullYear()+1); el.max=key(mx); })();
let rz; window.addEventListener("resize",()=>{ clearTimeout(rz); rz=setTimeout(renderKomora,200); });
setInterval(()=>{ renderOpen(); if(!document.body.classList.contains("cart-open")) renderSlots(); },60000);

renderBoxes();
applyLang();
})();
