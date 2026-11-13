# MECARA BLOG — dokument za Claude
## Za stolom s Mecarom / At the Table with Mecara

Pripremljeno 2. studenoga 2026. Hrvatski je primarni jezik. Dokument sadrži upute za implementaciju i 15 cjelovitih članaka, svaki na hrvatskom i engleskom: ukupno 30 jezičnih tekstova u pet rubrika. Fotografije treba pronaći i preuzeti tijekom implementacije prema uputama ispod; nisu uključene u ovaj dokument.

# A. Nalog za implementaciju

Claude, izradi blog unutar postojećeg weba Mecara. Koristi članke iz ovog dokumenta, bez zamjene generičkim sažecima. Ne mijenjaj druge dijelove weba osim dodavanja poveznica na blog, zajedničkog jezičnog izbornika i nužnih SEO integracija. Provjeri postojeći projekt i koristi njegov framework i komponente. Ovaj dokument nije nalog za izradu novog odvojenog weba.

## A1. Obvezni jezični izbornik u headeru

- Na desktopu i mobitelu u zaglavlju uvijek se vide **HR | EN**. Ne skrivati ga samo u hamburger izbornik. Aktivni jezik jasno označiti, uz pristupačan naziv „Hrvatski“ i „English“. Zastave nisu potrebne.
- Hrvatski je početni jezik na `/blog/` i glavnoj `/` adresi. Engleski blog je `/en/blog/`. Bez automatskog prebacivanja na EN zbog jezika uređaja ili lokacije.
- HR i EN moraju biti stvarne HTML poveznice. Na članku klik vodi na prijevod istog članka, na rubrici na istu rubriku drugog jezika, na naslovnici bloga na drugu naslovnicu bloga.
- Izravan EN URL uvijek otvara engleski sadržaj, uključujući header, footer, gumbe, kategorije, breadcrumbove, metapodatke i greške. localStorage ne smije promijeniti jezik URL-a.
- Jedan stabilan ID za svaki par članaka; različiti lokalizirani slugovi. Koristiti `lang="hr"` i `lang="en"`, self-canonical, uzajamni hreflang hr/en. `x-default` može pokazivati na hrvatsku inačicu odgovarajuće stranice.

## A2. Rubrike i struktura

| ID | Hrvatska rubrika | English category | HR putanja | EN putanja |
|---|---|---|---|---|
| danas | Što danas kuhati? | What to Cook Today | /blog/rubrika/sto-danas-kuhati/ | /en/blog/category/what-to-cook-today/ |
| mesar | Pitaj mesara | Ask the Butcher | /blog/rubrika/pitaj-mesara/ | /en/blog/category/ask-the-butcher/ |
| rostilj | Roštilj i steakovi | BBQ & Steaks | /blog/rubrika/rostilj-i-steakovi/ | /en/blog/category/bbq-and-steaks/ |
| kuhinja | Iz dubrovačke kuhinje | From the Dubrovnik Table | /blog/rubrika/iz-dubrovacke-kuhinje/ | /en/blog/category/from-the-dubrovnik-table/ |
| gosti | Za goste Dubrovnika | For Visitors to Dubrovnik | /blog/rubrika/za-goste-dubrovnika/ | /en/blog/category/for-visitors-to-dubrovnik/ |

Članci žive na `/blog/{hr-slug}/` i `/en/blog/{en-slug}/`. Rubrike imaju tri članka, uvodni tekst i vlastite metapodatke. Članak pripada jednoj primarnoj rubrici; tagovi su za filtriranje, ne stvarati desetke praznih indeksabilnih arhiva.

## A3. Izgled i korisnička putanja

Zadržati tamni ugljen i bakrene detalje Mecare, uz toplu svijetlu površinu za čitanje duljih tekstova. Fotografije su velike i prirodne, tekst pregledan, bez agresivnih animacija.

Naslovnica bloga: naziv i kratki uvod → istaknuti blok **Što danas kuhati?** s tri recepta → vidljive kategorije → mreža ostalih članaka. Tri kartice u redu na desktopu, dvije na tabletu, jedna na mobitelu. Kartica ima fotografiju 3:2, kategoriju, naslov, izvadak i vrijeme čitanja. Vrijeme čitanja izračunati iz stvarnog teksta, ne hardkodirati.

Članak: breadcrumb → rubrika → jedan H1 → uvod → hero fotografija → tijelo širine oko 65–75 znakova → jedna relevantna CTA kartica → tri povezana članka. Na receptu posebno prikazati broj porcija, okvirno vrijeme, sastojke i numerirane korake. Omogućiti ispis recepta bez navigacije i reklamnih blokova. Po želji omogućiti promjenu broja porcija, uz proporcionalno skaliranje sastojaka; ne skalirati linearno temperaturu, vrijeme pečenja ili veličinu posude.

Za „Što danas kuhati?“ dodati jednostavne filtere **Piletina / Junetina / Mljeveno meso** i **Do 45 min / Do 60 min / Bez žurbe**. Za početna tri recepta nema potrebe za lažnim dnevnim generiranjem ili obećanjem novog recepta svaki dan.

## A4. Fotografije — konkretan zadatak za Claude

Za svaki članak pronađi jednu različitu glavnu fotografiju, prema briefu uz članak. Gdje usporedba rezova dobiva na jasnoći, možeš dodati drugu fotografiju. Prednost imaju stvarne Mecarine fotografije koje vlasnik smije koristiti, zatim fotografije s jasnom licencom za web i komercijalnu uporabu.

Pretraži Pexels i besplatnu zbirku Unsplash; po potrebi Wikimedia Commons uz provjeru licence pojedinačne datoteke i uvjeta atribucije. Google Images služi samo za pronalaženje izvornika, nije licenca. Ne preuzimaj fotografije drugih mesnica, restorana, novinskih portala ili tuđih recepata bez prava uporabe. Unsplash+ nije isto što i besplatna zbirka. Ne kupuj fotografije bez posebnog odobrenja.

Za svaku odabranu fotografiju spremi evidenciju: ID članka, izvorna stranica fotografije, autor, URL licence, datum provjere, lokalna putanja, potrebna atribucija i HR/EN alt. Točna fotografija mora odgovarati mesu: biftek nije rib-eye, sirova junetina nije teletina, teletina ispod peke nije bilo koje pečenje. Ako nema pravilne i dopuštene fotografije, upotrijebi uredan brendirani privremeni blok i evidentiraj nedostatak, bez lažnog prikaza reza.

Fotografija iz stock zbirke ne prikazuje Mecarinu trgovinu, osoblje, proizvod na stanju ili jelo pripremljeno po našem receptu. Za generičke fotografije gotovih jela dodaj diskretno **„Ilustracija posluživanja“ / “Serving illustration”**. Slike sirovih rezova mogu imati **„Ilustracija reza“ / “Cut illustration”**. Ako je prikaz fotografiran baš prema receptu, tu oznaku prilagodi stvarnim okolnostima.

Preuzmi odobrene datoteke u projekt i izradi responzivne WebP/AVIF izvedenice; ne koristiti nasumične image endpointe, rotirajuće slike ili tuđi hotlink bez pravila odgovarajuće usluge. Ako koristiš API, primijeni i njegove zasebne uvjete. Cilj za hero je oko 1600 px širine uz razumnu kompresiju; kartice manje. Postavi width/height, srcset, sizes; slike ispod prvog ekrana lazy-load. Ne lijepiti ključne riječi u alt bez veze sa sadržajem slike.

## A5. SEO i objavljivanje

Svi članci imaju naslov, meta opis, slug, ključni pojam, sekundarne pojmove, izvadak, strukturu i poveznice. Ključni pojmovi su urednički odabrani, bez tvrdnje o izmjerenom volumenu. Ne prikazivati ih kao popis posjetiteljima i ne dodavati meta keywords. Naslov članka može biti duži od title oznake; oba su navedena.

Sadržaj renderirati u početnom HTML-u. Blog indeks, rubrike i članke uključiti u sitemap tek kad su objavljeni. Ne stvarati zasebne URL-ove za svaki filter. Poveznice prema prodajnim stranicama uključiti samo ako te rute postoje; inače odgovarajuća sekcija naslovnice ili kontakt. Zadržati status staginga/noindex dok poslovna produkcija nije spremna.

Dodati `BlogPosting` i `BreadcrumbList` koji odgovaraju vidljivom sadržaju. Receptima T01–T03 može se dodati `Recipe` nakon uredničke provjere, sa stvarnom slikom, sastojcima, koracima, porcijama i vremenima. Bez izmišljenih ocjena, kalorija, autora-chefa ili datuma. `datePublished` je stvarni datum objave, `dateModified` stvarna izmjena. Ne koristiti „provjereni recept“ ili „recept našeg mesara“ bez stvarnog testiranja i odobrenja. Početni recepti su originalni urednički prijedlozi, nisu fizički testirani u kuhinji.

Autor može biti organizacija Mecara ako vlasnik odobri uredničko autorstvo. Ne izmišljati osobu ni stručnu recenziju. Kuharske upute i sigurnosne činjenice oslonjene su na izvore u dodatku. Vremena kuhanja su okvirna, gotovost mesa provjerava se termometrom, a ne isključivo satom.

# B. Uvodni tekstovi bloga i rubrika

**HR H1:** Za stolom s Mecarom  
**HR uvod:** Ideje za današnji ručak, odgovori na pitanja o mesu i mali savjeti za bolji roštilj. Od izbora komada do posluživanja — pronađite nešto što vam se danas kuha.  
**HR title:** Savjeti o mesu i ideje za ručak — Mecara blog  
**HR description:** Što danas kuhati, koje meso odabrati i kako isplanirati roštilj? Pronađite recepte i praktične vodiče na Mecarinu blogu.

**EN H1:** At the Table with Mecara  
**EN introduction:** Ideas for tonight's dinner, answers to your meat questions and practical help with your next barbecue. Find a cut, a recipe or a little inspiration for the table.  
**EN title:** Meat Guides & Everyday Recipes — Mecara Blog  
**EN description:** Find dinner ideas, advice on choosing meat and practical BBQ guides. Explore Mecara's recipes and tips for cooking in Dubrovnik and at home.

| Rubrika | HR uvod / meta opis | EN introduction / meta description |
|---|---|---|
| Što danas kuhati? | Piletina iz pećnice, mesne okruglice ili ručak iz jedne tave: praktični recepti s popisom sastojaka i jasnim koracima. | Chicken from the oven, meatballs or a one-pan dinner: practical recipes with ingredient lists and clear steps. |
| Pitaj mesara | Koji rez uzeti, kako odabrati meso za gulaš i što pitati pri kupnji mljevenog mesa? Krenite od jela koje želite pripremiti. | Which cut should you choose, what works in a stew and what should you ask about mince? Start with the meal you want to cook. |
| Roštilj i steakovi | Isplanirajte količine, pripremite steak na tavi i izbjegnite pogreške zbog kojih roštilj postaje nepotrebno kompliciran. | Plan your quantities, cook a steak in a pan and avoid common mistakes that make a barbecue harder than it needs to be. |
| Iz dubrovačke kuhinje | Peka, pršut, sir i nedjeljni stol: ideje nadahnute načinom na koji se jede i okuplja na jugu. | Peka, prosciutto, cheese and Sunday gatherings: ideas inspired by the way people cook and share food in southern Croatia. |
| Za goste Dubrovnika | Kuhate u apartmanu ili vili? Saznajte što pitati u mesnici, kako planirati kupnju i što znače nazivi lokalnih jela. | Cooking in a Dubrovnik apartment or villa? Learn what to ask at the butcher, how to plan your shopping and what local food names mean. |

Naslovi rubrika za title: `[naziv rubrike] — Mecara blog`, s lokaliziranim EN nazivom. Uvodi iz tablice mogu služiti i kao meta opisi. Naslove ne zatrpavati riječju Dubrovnik gdje nije potrebna za namjeru članka.

# C. PITAJ MESARA / ASK THE BUTCHER

## M01 — Rib-eye, ramstek ili biftek?

**HR slug:** rib-eye-ramstek-ili-biftek  
**EN slug:** ribeye-striploin-or-fillet  
**HR title:** Rib-eye, ramstek ili biftek: koji steak odabrati?  
**EN title:** Ribeye, Striploin or Fillet: Which Steak to Choose?  
**HR meta:** Usporedite rib-eye, ramstek i biftek prema masnoći, teksturi i načinu pripreme. Odaberite steak koji odgovara vašem ukusu i večeri.  
**EN meta:** Compare ribeye, striploin and fillet by fat, texture and cooking style. Choose a steak that fits your taste, equipment and dinner plans.  
**HR ključni pojam:** rib-eye ramstek biftek razlika; dodatno: koji steak odabrati, rezovi junetine.  
**EN keyword:** ribeye vs striploin vs fillet; secondary: choosing steak, beef cuts.  
**Izvadak HR:** Najskuplji komad u vitrini nije automatski i najbolji za vašu večeru. Krenite od onoga što zapravo volite jesti.  
**Excerpt EN:** The priciest cut in the counter isn't automatically the right one for your dinner. Start with what you actually like to eat.  
**Slika:** pretraga `raw ribeye striploin tenderloin steaks`; točno identificirani rezovi, bez izmišljene usporedbe na generičkoj slici.  
**Alt HR/EN:** Rib-eye odrezak s vidljivim prošaranjem masnoćom / Ribeye steak with visible fat marbling. Prilagoditi odabranoj fotografiji.  
**Poveznice:** R02 steak na tavi; /odlezani-steakovi/ i /en/dry-aged-steaks/.  
**Činjenični izvori:** S2, S3, S4.

### HR — Rib-eye, ramstek ili biftek: koji steak odabrati?

Ljudi često stanu pred vitrinu i zapnu na imenima. Rib-eye, ramstek i biftek mogu svi biti dobra večera, samo je svaki dobar na svoj način. Zato vas prvo ne pitamo za cijenu, nego volite li mekši i nemasniji komad ili vam je draži jači okus i malo više masnoće.

#### Rib-eye

Dolazi iz rebrenog dijela i obično ima masnoću vidljivu unutar samog mišića. Tko voli steak punijeg okusa, ovdje je na dobrom mjestu.

Prošaranost se razlikuje od odreska do odreska. Pogledajte komad koji kupujete, ime na etiketi vam to neće reći.

Prilog neka bude jednostavan: pečeni krumpir, zelena salata ili malo povrća s grila. Meso ionako vodi glavnu riječ.

#### Ramstek

Kad u ponudi piše ramstek, najčešće se misli na striploin. Čvršće je građe od bifteka i obično ima jasno vidljiv rub masnoće. Lijepo se reže na kriške pa je dobar izbor kad ga želite poslužiti uz neki jednostavan umak.

Nazivi rezova nisu isti na svakom tržištu. Ako kuhate po stranom receptu, pokažite mesaru naziv ili fotografiju pa ćemo zajedno provjeriti je li to taj komad.

#### Biftek

Biftek je ono što ćete u stranim receptima naći kao tenderloin ili fillet. Mekan je i nemasniji od ostala dva, a dobro se slaže u manje, uredne porcije.

Samo ga nemojte uzeti zato što zvuči svečano. Ako vam je kod steaka najbolji onaj masniji dio, vjerojatno će vam se drugi rez više svidjeti.

#### Prije nego platite

Recite nam pečete li na tavi ili na roštilju i kolika vam je tava. Debljina odreska mijenja način pečenja, pa se ni dva komada iste težine ne moraju peći jednako. Ako se steak dijeli za stolom, recite i koliko priloga planirate.

**Birate steak u Dubrovniku? Bacite oko na Mecarine odležane steakove i provjerite koji su rezovi trenutačno na raspolaganju.**

### EN — Ribeye, striploin or fillet: which steak should you choose?

At the butcher's counter the names tend to make this feel harder than it is. Any of the three can give you a good dinner. What you really need to know is what you like on the plate: something leaner and softer, or a richer steak with more fat through it.

#### If you like marbling, go for ribeye

Ribeye is cut from the rib section, and you can usually see the fat running inside the muscle. That's where the fuller flavour comes from.

No two pieces are marbled quite the same, though. Look at the actual steak in front of you rather than buying on the name.

Don't overdo the sides. Roast potatoes, a green salad or some grilled vegetables, and let the steak take centre stage.

#### Striploin, firmer and with a fat edge

Here in Croatia you'll often see striploin sold as ramstek. It has a firmer texture than fillet and usually a clear strip of fat along one edge. Good for slicing and serving with a simple sauce.

Cut names don't always match from one country to the next. If you're cooking from a recipe back home, show us the name or a photo and we'll check we're talking about the same cut.

#### Fillet, for tenderness

Fillet goes by tenderloin too, and locally by biftek. It's delicate, lower in fat, and suits small, neat individual portions.

It isn't everyone's favourite just because it sounds special. If the fatty bits are the best part of a steak for you, another cut will probably make you happier.

#### Pan or barbecue?

Tell the butcher which you'll be using and how much room you've got. Thickness changes how a steak cooks, and two pieces of the same weight can need quite different handling. Sharing one steak between a few people? Count the side dishes in as well.

**Looking for a steak in Dubrovnik? Have a look at Mecara's dry-aged range and see which cuts we have in right now.**

## M02 — Koje meso za gulaš?

**HR slug:** koje-meso-za-gulas  
**EN slug:** best-beef-cuts-for-stew  
**HR title:** Koje meso za gulaš? Odabir komada i rezanje  
**EN title:** Which Beef Cuts Work Best in a Stew?  
**HR meta:** Za dobar gulaš važni su pravi komad junetine, jednako rezanje i strpljivo kuhanje. Saznajte što pitati mesara prije kupnje.  
**EN meta:** Choose beef for stew with the cut, cube size and cooking time in mind. Learn what to ask your butcher before starting a slow-cooked dinner.  
**HR pojmovi:** meso za gulaš; junetina za gulaš, juneća lopatica.  
**EN keywords:** beef for stew; stewing beef, beef chuck.  
**Izvadak HR:** Meso za gulaš birajte prema tome kako će se kuhati, a cijenu steaka ostavite po strani.  
**Excerpt EN:** Buy for how it will be cooked, not for what a steak costs. A decent stew starts with the right cut.  
**Slika:** `raw diced beef chuck stew`; alt HR/EN: Junetina narezana na kocke za gulaš / Beef cut into cubes for a stew.  
**Poveznice:** T03 juneće trakice za kontrast brze pripreme; ponuda mesa HR/EN.  
**Izvori:** S5, S6.

### HR — Koje meso odabrati za gulaš?

Gulaš se kuha onaj dan kad lonac smije mirno stajati na vatri. Komad koji je odličan na tavi tu vam ne mora biti od velike koristi. Tražite junetinu koja podnosi dugo pirjanje i recite mesaru koliko vremena imate.

#### Lopatica je dobar početak

Kad netko traži meso za gulaš, razgovor najčešće krene od juneće lopatice. Ipak, više od imena na etiketi govori sam komad, kako je građen. Mesar vam može predložiti i neki drugi dio koji odgovara, reći koliko ga treba očistiti i kako ga narezati.

Jako nemasan komad i onaj s više vezivnog tkiva u loncu se ponašaju različito. Najskuplje meso vam ovdje ne treba. Treba vam ono koje voli sporo kuhanje.

#### Kocke otprilike iste veličine

Ako u istom loncu imate sitne komadiće i velike kocke, neće biti gotovi u isto vrijeme. Zamolite da vam meso narežu ravnomjerno, recimo na kocke od oko tri centimetra, pa to prilagodite svom receptu. Tri centimetra su praktična mjera, nikakvo pravilo.

Meso zapecite prije nego dodate tekućinu, i to u nekoliko manjih tura. Kad je lonac pretrpan, meso brzo pusti sok i umjesto da se zapeče, kuha se. Onda dodajte ostalo po receptu i smanjite vatru.

#### Vilica, ne sat

Gulaš koji jako ključa nije zbog toga prije gotov. Bolje mu je dati laganu vatru i vremena nego stalno pojačavati plamen. Koliko će točno trajati, ovisi o rezu i veličini kocaka.

Gotov je kad vilica lako uđe u meso.

Ako imate samo pola sata, nemojte tjerati veliki lonac gulaša. Tada su bolje juneće trakice od reza za brzu pripremu.

**U Mecari pitajte za junetinu za gulaš, recite za koliko osoba kuhate i želite li da vam je narežemo. Prije dolaska provjerite ima li je.**

### EN — Which beef should you choose for a stew?

Stew is for a day when the pot can be left alone to get on with it. A cut that's brilliant seared in a pan isn't necessarily what you want here. Ask for beef that suits slow cooking, and let the butcher know how much time you've got.

#### Chuck, or another braising cut

Chuck comes from the shoulder, and it's a sensible place to start. Still, the piece itself tells you more than the label does. Your butcher might point you to a different cut that works just as well, and tell you how much trimming it needs.

Very lean beef and beef with more connective tissue behave differently in a pot. You don't need the most expensive meat for this. You need a cut that matches slow, moist cooking.

#### Similar-sized cubes

Mix tiny bits with big chunks and they won't cook evenly. Ask for a fairly even dice, about three centimetres is a good place to begin, then adjust for your recipe. Treat that as a rough guide, not a rule.

Brown the beef in small batches before any liquid goes in. A crowded pan makes it hard to get a proper brown crust. After that, add everything else as your recipe says and turn the heat down.

#### Use a fork, not the clock

Hard boiling won't give you a better stew. A gentle simmer and enough time will do more than cranking up the heat every so often. How long it takes depends on the cut and the size of the pieces, so test it: a cube should give way easily to a fork.

Only got half an hour for dinner? Cook something else. Thin strips of beef from a quick-cooking cut make far more sense than trying to hurry a big stew.

**Ask us at Mecara for stewing beef, tell us how many you're feeding and whether you'd like it diced. Please check it's available before you come in.**

## M03 — Mljeveno meso prema jelu

**HR slug:** mljeveno-meso-za-umak-burgere-okruglice  
**EN slug:** choosing-mince-for-sauce-burgers-meatballs  
**HR title:** Mljeveno meso za umak, burgere i okruglice  
**EN title:** Choosing Mince for Sauce, Burgers and Meatballs  
**HR meta:** Što pitati pri kupnji mljevenog mesa? Usporedite izbor za umak, burgere i mesne okruglice te planirajte količinu prema receptu.  
**EN meta:** Buying mince for a sauce, burgers or meatballs? Ask about the meat blend, fat content and ingredients, and choose for the dish you want to cook.  
**HR pojmovi:** mljeveno meso; meso za burgere, mesne okruglice.  
**EN keywords:** choosing minced meat; mince for burgers, meatball mince.  
**Izvadak HR:** Iza jedne stavke na popisu za kupnju krije se nekoliko pitanja koja vrijedi postaviti.  
**Excerpt EN:** One line on your shopping list can hide a few questions worth asking.  
**Slika:** `fresh minced beef bowl`; alt: Mljevena junetina u posudi prije pripreme / Minced beef in a bowl before cooking.  
**Poveznice:** T02 okruglice; R03 pogreške na roštilju.  
**Izvor sigurnosne napomene:** S1.

### HR — Kako odabrati mljeveno meso za umak, burgere i okruglice

„Pola kile mljevenog“ brzo se kaže, ali nam ne govori ništa o tome što kuhate. Za umak, burgere i okruglice možda ćete htjeti različito meso. Zato nam prvo recite jelo, a onda pitajte što je u mješavini.

#### Umak

U umaku s rajčicom i povrćem meso je samo jedan od sastojaka. Količinu odredite prema broju porcija, tjestenini i svemu ostalom što ide u lonac. S uljem polako: prvo pogledajte koliko ga već ima u receptu i koliko masnoće pusti samo meso.

Mljevena junetina i miješano mljeveno meso nisu isto. Što ćete uzeti, ovisi o tome što ukućani vole i jedu. Po boji nemojte nagađati sastav.

#### Burgeri

Pitajte od kojeg je mesa smjesa, koliko je masna i je li već začinjena. Ako jest, nemojte je još jednom dobro posoliti.

Uzimate li gotove, oblikovane burgere, pogledajte i koliki su, da vam ne budu manji ili veći od peciva.

Jedan omjer koji vrijedi za svaki recept ne postoji. Recite nam kakav burger želite i kako ćete ga peći.

#### Okruglice

Jaje, krušne mrvice, luk i ostalo što stavite u smjesu mijenjaju i teksturu i količinu koju ćete na kraju dobiti. Držite se recepta. Smjesa je na početku obično mekana, pa to nije razlog da odmah dosipate mrvice. Ako je pustite kratko da odstoji u hladnjaku, lakše ćete oblikovati okruglice.

Kad su u pitanju alergeni, gleda se cijelo jelo, a ne samo meso. U mrvicama može biti glutena, a pripazite i na jaje i mliječne dodatke.

#### Čuvanje i pečenje

Mljeveno meso čuvajte onako kako piše na deklaraciji i uvijek ga do kraja termički obradite. Burger nije cijeli steak. Ono što vrijedi za steak ružičast u sredini za burger ne vrijedi.

**Isprobajte naše mesne okruglice u umaku od rajčice ili pitajte u Mecari koje mljeveno meso odgovara vašem jelu.**

### EN — Choosing mince for sauce, burgers and meatballs

"Half a kilo of mince" is quick to ask for, but it tells the butcher very little about what's for dinner. A meat sauce, a burger and a batch of meatballs might each want something different. So tell us the dish first, then ask what goes into the blend.

#### Sauce

In a tomato and vegetable sauce the meat is just one ingredient among several. Work out how much you need from your portions, the pasta and everything else going in. Hold back on the oil until you've seen what the recipe and the meat are already bringing.

Beef mince and mixed mince are two different things. Which you pick may come down to taste or to how your household eats. You can't tell the blend by its colour, so ask.

#### Burgers

Find out which meats are in the mixture, how much fat it has and whether it's seasoned already. If it is, go easy on the salt.

Buying ready-shaped patties? Check they're the right size for your buns.

Nobody has one ideal ratio that works for every recipe. Tell us what kind of burger you're after and how you'll cook it, and we'll go from there.

#### Meatballs

Egg, breadcrumbs, onion and whatever else you add will change the texture and how much mixture you end up with. Stick to your recipe. A mix often feels soft at first, which is no reason to keep tipping in breadcrumbs. Give it a short rest in the fridge and the meatballs are easier to roll.

Allergens apply to the whole dish, not only the meat. Breadcrumbs may contain gluten, and egg and dairy need checking as well.

#### Storing and cooking mince

Keep mince as the product label tells you, and cook it all the way through. A burger isn't a whole steak. What's fine for a steak served pink doesn't carry over to a burger.

**Have a go at our meatballs in tomato sauce, or ask us at Mecara which mince will work for what you're cooking.**

# D. ROŠTILJ I STEAKOVI / BBQ & STEAKS

## R01 — Roštilj za deset osoba

**HR slug:** koliko-mesa-za-rostilj-10-osoba  
**EN slug:** how-much-bbq-meat-for-10-people  
**HR title:** Koliko mesa za roštilj za 10 osoba?  
**EN title:** How Much BBQ Meat Do You Need for 10 People?  
**HR meta:** Isplanirajte roštilj za deset osoba uz primjer količina mesa, priloge i nekoliko jednostavnih prilagodbi za apetit i meso s kosti.  
**EN meta:** Plan a barbecue for ten with a practical meat shopping example. Adjust quantities for side dishes, appetites and bone-in cuts.  
**HR pojmovi:** koliko mesa za roštilj za 10 osoba; meso po osobi, količina za roštilj.  
**EN keywords:** how much BBQ meat for 10 people; barbecue quantities, meat per person.  
**Izvadak HR:** Prvo pogledajte tko dolazi i što još ide na stol. Kilograme računamo poslije.  
**Excerpt EN:** Work out who is coming and what else is on the table first. The kilograms come after that.  
**Slika:** `mixed barbecue meat platter sausages chicken`; alt: Različite vrste pečenog mesa za zajednički roštilj / A selection of cooked meats for a shared barbecue.  
**Poveznice:** R03 pogreške; M03 mljeveno; planer ako je aktivan.  
**Napomena uredniku:** količine su naš ilustrativni plan kupnje, ne nutritivna ili službena porcija.

### HR — Koliko mesa kupiti za roštilj za 10 osoba?

Ako dolazi deset odraslih i uz meso imate kruh, salatu i jedan ozbiljniji prilog, računajte otprilike 3 do 3,5 kilograma sirovog mesa bez kosti. Toliko ide na umjereno obilan roštilj. Za svako društvo to ipak ne vrijedi. Uz veliko predjelo trebat će vam manje, a ako je meso gotovo cijeli obrok, računica ide drukčije.

#### Primjer iz prakse

Evo kako bi izgledalo 3,2 kilograma:

- 1,2 kg ćevapa;
- 0,8 kg pilećeg mesa bez kosti;
- 0,7 kg svinjskog vrata bez kosti;
- 0,5 kg kobasica za roštilj.

Dođe 320 grama sirovog mesa po odrasloj osobi, prije pečenja.

Kombinaciju mijenjajte kako vam odgovara. Samo jedno upozorenje: ako netko u društvu ne jede svinjetinu, nemojte vrat automatski zamijeniti kobasicama. Prvo provjerite od čega su.

#### Prilozi su dio obroka

Krumpir, povrće, kruh i pošteno velika salata jedu se jednako kao meso, pa ih zapišite na popis prije nego krenete u kupnju. Ako za početak ide i plata, ne morate svakom gostu računati punu porciju od svake vrste mesa.

Djeca i oni koji jedu kao ptičice ne broje se kao odrasli gladni muškarac nakon mora. Bolje je znati tko točno dolazi nego svakoga brojati kao istu porciju.

#### Kilogram rebara nije kilogram filea

Rebarca, batci i ostali komadi s kosti važu se zajedno s kosti, a nju nitko neće pojesti. Zato gornji primjer ne vrijedi za takvu kupnju. Recite mesaru što želite peći, pa ćemo zajedno procijeniti koliko vam treba.

#### Kupite onoliko koliko roštilj može podnijeti

Mali roštilj i četiri vrste mesa znaju biti gora kombinacija od dvije dobro odabrane. Unaprijed odredite što ide prvo i pecite u nekoliko tura.

Sve odjednom na rešetku neće stati.

**Pošaljite Mecari broj gostiju i okvirni jelovnik, a mi ćemo vam javiti koje količine imamo. Ako ste koristili roštilj planer, njegov izračun shvatite kao prvi prijedlog, a ne kao potvrđenu narudžbu.**

### EN — How much meat should you buy for a BBQ for 10 people?

Ten adults, with bread, salad and one proper side dish alongside the meat? Plan on roughly 3 to 3.5 kilograms of raw boneless meat. That gives you a fairly generous barbecue, but it is an example, not a rule that fits every group. Serve a big starter and you will need less. If the meat is more or less the whole meal, you will need to plan differently.

#### What 3.2 kilograms could look like

Here is one way to split it:

- 1.2 kg ćevapi;
- 0.8 kg boneless chicken;
- 0.7 kg boneless pork neck;
- 0.5 kg grill sausages.

That comes to 320 grams of raw meat per adult, weighed before cooking.

Swap things around to suit your guests. If someone does not eat pork, though, check what the sausages are made of before you count them as the pork-free option.

#### Sides count

Potatoes, vegetables, bread and a big salad all fill people up. Write them down before you write down the meat. And if a charcuterie board is going out first, nobody needs a full helping of every single meat.

Children and lighter eaters are best planned one by one. Knowing who is actually coming beats treating ten guests as ten identical portions.

#### Bone-in cuts are a different sum

When you buy ribs or chicken drumsticks, part of what you pay for by weight is bone. So the boneless example above will not work for them. Tell us which pieces you want and we will help you estimate the amount.

#### Match the meat to your grill

A small grill with four kinds of meat on the menu can be more stress than a small grill with two. Decide what goes on first and cook in a few batches. It will not all fit at once, however hard you try.

**Send Mecara your guest count and a rough menu and we will check what quantities we have. If you have used the BBQ planner, take its figure as a starting point, not a confirmed order.**

## R02 — Steak na tavi

**HR slug:** kako-pripremiti-steak-na-tavi  
**EN slug:** how-to-cook-steak-in-a-pan  
**HR title:** Kako pripremiti steak na tavi: praktičan vodič  
**EN title:** How to Cook Steak in a Pan: A Practical Guide  
**HR meta:** Dobra tava, suha površina i kontrola topline olakšavaju pripremu steaka. Saznajte kako planirati pečenje bez oslanjanja samo na minute.  
**EN meta:** A suitable pan, a dry surface and controlled heat make steak cooking easier. Learn how to plan the sear without relying only on minutes.  
**HR pojmovi:** steak na tavi; priprema steaka, kako ispeći steak.  
**EN keywords:** cook steak in a pan; pan seared steak, steak cooking tips.  
**Izvadak HR:** Roštilj vam za steak ne treba. Treba vam tava u kojoj meso ima mjesta.  
**Excerpt EN:** Steak does not need a barbecue. It needs a pan with enough room in it.  
**Slika:** `steak cast iron skillet rosemary`; alt: Steak koji se peče u teškoj tavi / Steak cooking in a heavy frying pan.  
**Poveznice:** M01 rezovi; ponuda steakova.  
**Izvori:** S1, S7. Ovo je vodič metode, ne kompletan recept za Recipe oznaku.

### HR — Kako pripremiti steak na tavi bez nepotrebnog kompliciranja

Za steak vam treba jedna dobra tava i malo reda. Prije nego upalite ploču, znajte koji komad imate, koliko je debeo i hoćete li ga poslužiti cijelog ili narezanog na kriške za cijeli stol.

#### Tava u koju meso stane

Najbolje radi teža tava koja ravnomjerno drži toplinu. Pečete li dva velika odreska, između njih mora ostati prostora. Ako ga nema, pecite jedan pa drugi. Meso se u tavi ne slaže jedno preko drugoga.

Prilog neka bude gotov prije. Kad je odrezak već u tavi, kasno je za guljenje krumpira.

#### Suho meso, vruća tava

Površinu mesa posušite papirnatim ručnikom i začinite po svom ukusu. Zagrijte tavu pa dodajte malo ulja koje podnosi pečenje. Tava treba biti vruća, ali ne toliko da se kuhinja napuni dimom. U maloj kuhinji to ćete brzo osjetiti.

Pustite da se donja strana lijepo zapeče, onda okrenite. Ako je komad deblji, nakon prvog zapecanja smanjite vatru. Tako sredina stigne, a vanjski sloj ne izgori.

#### Sat nije termometar

Koliko će trajati ovisi o debljini, o tome koliko je meso bilo hladno kad je ušlo u tavu i o vašoj ploči. Recept koji obećava „tri minute sa svake strane“ to ne zna. Termometar zna.

Ako želite jednostavan i oprezan cilj za cijeli goveđi odrezak, USDA navodi najmanje 63 °C u sredini i zatim najmanje tri minute odmora. Ta smjernica ne vrijedi za mljeveno meso ni za piletinu.

Maslac i začinsko bilje, ako ih volite, idu pri kraju. Tada smanjite vatru da maslac ne zagori.

#### Odmor, pa nož

Prije rezanja ostavite odrezak kratko na čistom tanjuru ili dasci. Za posluživanje na kriške režite poprečno na vlakna. Malo soli, prilog i sok koji pusti meso obično su sasvim dovoljni.

**Još niste odabrali komad? Pročitajte našu usporedbu rib-eyea, ramsteka i bifteka, a onda pogledajte što Mecara trenutno ima u ponudi.**

### EN — How to cook steak in a pan without overcomplicating dinner

One decent pan is enough for a steak dinner. Before you start, know which cut you have, how thick it is, and whether it is going on the plate whole or sliced for everyone to share.

#### Give it space

A heavy pan that holds its heat evenly does the job well. Cooking two big steaks? Make sure there is a gap between them. If there is not, do one at a time instead of squeezing them in together.

Sort out the sides before anything else. Peeling potatoes while the steak is already sizzling is not a plan.

#### Dry, season, heat

Pat the steak dry with kitchen paper and season it however you like. Get the pan hot, then add a little oil that is fine for frying. Hot is good. Billowing smoke is not, particularly in a small kitchen.

Leave the first side to brown, then turn it over. With a thicker steak, turn the heat down once that first sear is done, so the middle has time to cook before the outside burns.

#### Minutes are only a guess

How long it takes depends on the thickness, how cold the meat was when it went in and how strong your hob is. That is why a thermometer beats any promise of three minutes a side.

For a simple, cautious target on a whole beef steak, USDA guidance says at least 63°C in the centre, then at least three minutes of rest. Mince and chicken follow different guidance, so do not apply this to them.

Adding butter and herbs? Do it near the end, with the heat lowered so the butter does not burn.

#### Rest, then slice

Let the steak sit briefly on a clean plate or board before you cut it. If you are slicing it to share, cut across the muscle fibres. Salt, a side dish and the juices from the meat are usually all it needs.

**Not sure which cut to buy yet? Have a look at our ribeye, striploin and fillet comparison, then see what Mecara has in today.**

## R03 — Pet pogrešaka na roštilju

**HR slug:** pet-pogresaka-na-rostilju  
**EN slug:** five-common-bbq-mistakes  
**HR title:** Pet pogrešaka na roštilju koje je lako izbjeći  
**EN title:** Five Common BBQ Mistakes You Can Avoid  
**HR meta:** Pretrpana rešetka, prejaka vatra i loš redoslijed pečenja mogu pokvariti roštilj. Organizirajte pripremu i provjeravajte gotovost mesa.  
**EN meta:** Crowded grills, excessive heat and poor timing can spoil a barbecue. Organise your cooking and check doneness instead of guessing.  
**HR pojmovi:** pogreške na roštilju; kako peći meso na roštilju.  
**EN keywords:** common BBQ mistakes; grilling meat tips.  
**Izvadak HR:** Roštilj češće spasi dobar redoslijed pečenja nego nova marinada.  
**Excerpt EN:** Most barbecues are saved by sensible timing. A new marinade rarely does it.  
**Slika:** `barbecue grill chicken sausages tongs`; alt: Meso na rešetki roštilja s prostorom između komada / Meat spaced out on a barbecue grill.  
**Poveznice:** R01 količine; G03 villa BBQ.  
**Izvor sigurnosnih navoda:** S1 i S14.

### HR — Pet pogrešaka na roštilju koje je lako izbjeći

Meso je kupljeno, prilozi su gotovi, društvo je stiglo. I onda kod roštilja odjednom nastane gužva. Rijetko je kriva tehnika. Obično je stvar u par sitnih odluka koje su se trebale donijeti prije nego što je ugljen uopće planuo.

#### 1. Sve na rešetku odjednom

Debeli komad piletine i tanki odrezak ne peku se jednako. Odredite što ide prvo, što poslije, i računajte na nekoliko tura. Gosti ionako jedu postupno, pa ne mora sve meso biti gotovo u istoj minuti.

#### 2. Svugdje ista vatra

Ako vam roštilj to dopušta, napravite jednu jaču i jednu blažu zonu. Kad neki komad izvana brzo potamni, a u sredini još nije gotov, maknete ga na blaži dio. Plamen koji stalno liže meso ne znači da dobro pečete.

#### 3. Pretrpana rešetka

Svaki komad treba mjesta da ga okrenete i pogledate. Ako morate pomaknuti tri da biste došli do četvrtog, tura je prevelika. Meso koje čeka svoj red neka bude pravilno ohlađeno. Cijela kupnja ne treba stajati pokraj vatre.

#### 4. „Lijepo je pocrnilo, znači gotovo je“

Zapečena kora malo govori o tome što je unutra. Piletina i sve od mljevenog mesa moraju biti potpuno pečeni. Provjerite čistim termometrom i držite se upute za taj proizvod, posebno kad su komadi deblji.

#### 5. Pečeno meso na tanjuru od sirovog

Čisti tanjur i pribor pripremite prije nego počnete. Posuda u kojoj je stajalo sirovo meso ne vraća se na stol s pečenim dok se ne opere. I pribor kojim dirate sirovo meso držite odvojeno.

Ostavite i sebi vremena da sjednete. Jednostavniji izbor i nekoliko dobro složenih tura bolje prolaze od pokušaja da ispečete sve što ste vidjeli u vitrini.

**Količine za početak izračunajte uz naš vodič za roštilj za deset osoba, a onda provjerite što Mecara trenutno ima.**

### EN — Five common BBQ mistakes you can avoid

The meat is bought, the sides are done, your friends have turned up. Then, somehow, the grill turns into chaos. Technique is rarely the culprit. More often it comes down to a few small choices you could have made before lighting it.

#### 1. Putting everything on together

A thick piece of chicken and a thin steak are not cooked the same way. Work out a simple order and plan on several batches. People are happy to eat as things come off the grill, so there is no need for every meat to be ready at the same moment.

#### 2. Keeping the whole grill equally hot

If your barbecue allows it, set up one hotter zone and one gentler one. When something is colouring fast on the outside but the middle is not there yet, move it across. Flames constantly licking the meat are not a sign you are doing well.

#### 3. Crowding the cooking surface

You need room to turn each piece and check on it. Having to shift three things to reach a fourth means the batch is too big. Whatever is waiting its turn should stay properly chilled, not sit in the shopping bag next to the fire.

#### 4. Judging only by the outside colour

A nicely browned outside says very little about the centre. Chicken and anything made from mince need to be cooked right through. Use a clean food thermometer and follow the instructions for that product, especially with thicker pieces.

#### 5. Reusing the raw-meat plate

Get a clean plate and clean utensils ready before you start. Anything that held raw meat gets washed before cooked food goes anywhere near it. The same goes for tongs and forks that have touched raw meat. Keep them separate.

And give yourself time to actually sit down and eat. A shorter menu cooked in a few tidy batches is far more pleasant than attempting the entire butcher's counter in one evening.

**Work out your quantities first with our guide to barbecue meat for ten people, then see what Mecara has for the grill right now.**

# E. IZ DUBROVAČKE KUHINJE / FROM THE DUBROVNIK TABLE

Ova rubrika uključuje šire dalmatinske običaje koji su poznati i na dubrovačkom području. Ne tvrditi da su peka ili plata izvorno i isključivo dubrovačka jela.

## K01 — Meso za peku

**HR slug:** koje-meso-za-peku  
**EN slug:** choosing-meat-for-croatian-peka  
**HR title:** Koje meso za peku: teletina ili janjetina?  
**EN title:** Choosing Meat for Peka: Veal or Lamb?  
**HR meta:** Planirate peku? Odaberite teletinu ili janjetinu prema društvu, komadima i opremi te dogovorite rezanje prije kupnje.  
**EN meta:** Planning a Croatian peka? Choose veal or lamb around your guests, available cuts and cooking equipment, and agree the cutting before buying.  
**HR pojmovi:** meso za peku; teletina ispod peke, janjetina ispod peke.  
**EN keywords:** meat for peka; Croatian peka, veal or lamb peka.  
**Izvadak HR:** Peka počinje dogovorom: koliko vas je, kolika je posuda i koje meso ide unutra.  
**Excerpt EN:** Before you buy meat for a peka, work out how many are eating and how big the dish is.  
**Slika:** `Croatian peka veal lamb potatoes bell`; treba prikazivati stvarnu peku. Alt: Meso i krumpir u posudi za pripremu ispod peke / Meat and potatoes in a dish for cooking under a peka bell.  
**Poveznice:** G02 nazivi jela; ponuda.  
**Izvor konteksta:** S8. Tekst nije detaljna uputa za rad sa žarom.

### HR — Koje meso odabrati za peku: teletinu ili janjetinu?

Kad netko kaže "peka", misli više na način pečenja nego na jedno određeno jelo. Meso i povrće idu zajedno u posudu, pokrije se poklopcem i zatrpa žarom. A za stolom to obično znači ručak kojem se nitko ne žuri i dovoljno vremena da se svi skupe.

Prije nego dođete po meso, dogovorite se tko peče i kolika je posuda. Možete kupiti pola mesnice, ali ako u peku ne stane i krumpir, ništa niste dobili.

#### Teletina, kad društvo voli blaže

Teletina je sigurniji izbor za stol koji ne voli jak okus. Pitajte nas za komade koji podnose ovakvo pečenje i recite želite li koljenicu ili neki drugi rez. Veličina komada i način rezanja moraju pratiti to kako će se peka peći.

I nemojte odmah tražiti što sitnije komade. Prvo pitajte onoga tko peče, da meso i povrće budu gotovi u isto vrijeme.

#### Janjetina, za one koji je već vole

Janjetinu kupujte kad znate da je društvo voli. Provjerite jesu li svi za nju i pitajte koji su komadi trenutačno tu. Ima kosti, a kost se važe. Zato kilogrami na vagi nisu isto što i meso na tanjuru.

Mislite staviti i teletinu i janjetinu? Odabir i veličinu komada dogovorite s kuharom. Prepoloviti narudžbu nije plan.

#### S čim doći na pult

Koliko je odraslih, a koliko djece. Kolika je peka. Ide li prije toga obilno predjelo. I hoćete li meso preuzeti već narezano. S tim podacima odmah znamo o čemu razgovaramo.

Nemate ognjište i opremu? Meso poklopljeno u pećnici može biti lijep obiteljski ručak, ali to nije ista tehnika kao pečenje pod žarom i ne treba ga gostima prodavati kao peku.

**Spremate peku negdje oko Dubrovnika? Pogledajte što Mecara ima od teletine i janjetine i javite nam na vrijeme koje komade želite.**

### EN — Choosing meat for peka: veal or lamb?

Peka is less a dish than a way of cooking. Meat and vegetables go into a heavy pan, a bell-shaped lid goes on top, and hot embers are heaped over it. Locals will tell you it also means a long lunch where nobody is in a hurry and everyone has time to turn up.

So before you buy anything, find out two things: who is doing the cooking, and how big their peka pan is. There is no point ordering a mountain of meat if the potatoes won't fit alongside it.

#### Veal, if your group likes it mild

Veal has the gentler flavour of the two. Ask us which cuts work for this kind of cooking, and say whether you'd like shank or something else. The size and cut of the pieces should suit the way your cook plans to handle the peka.

Don't just ask for the smallest pieces we can manage. Have a word with whoever is cooking first, so the meat and vegetables finish together.

#### Lamb, if they already love it

Lamb is for people who know they like it. Check that everyone at the table is happy with lamb, and ask which cuts we have in. Cuts on the bone change the maths: the weight you pay for is not the weight of meat that ends up on plates.

Fancy a mix of veal and lamb? Sort out the cuts and sizes with your cook. Splitting the order down the middle won't do it.

#### Bring these details to the counter

Tell us how many adults and children are eating, how big the pan is, and whether there's a proper starter beforehand. Also let us know if you want the meat cut before you collect it.

If you don't have a hearth and the kit, a covered roast in the oven still makes a good shared meal. It's a different method, though, and honestly it shouldn't be passed off as cooking under embers.

**Planning a peka around Dubrovnik? Have a look at what veal and lamb Mecara has, and tell us in good time which cuts you're after.**

## K02 — Plata pršuta i sira

**HR slug:** kako-sloziti-platu-prsuta-i-sira  
**EN slug:** how-to-build-prosciutto-cheese-board  
**HR title:** Kako složiti platu pršuta i sira za društvo  
**EN title:** How to Build a Prosciutto and Cheese Board  
**HR meta:** Složite jednostavnu platu pršuta i sira uz kruh, povrće i nekoliko dodataka. Planirajte posluženje prema tome slijedi li glavno jelo.  
**EN meta:** Build a simple prosciutto and cheese board with bread, vegetables and a few accompaniments. Plan it around the meal that follows.  
**HR pojmovi:** plata pršuta i sira; kako složiti platu.  
**EN keywords:** prosciutto and cheese board; Croatian charcuterie board.  
**Izvadak HR:** Za dobru platu ne treba puno vrsta, treba znati zašto je koja na dasci.  
**Excerpt EN:** A board with fewer things on it is often the better one, as long as each item earns its place.  
**Slika:** `prosciutto cheese olives board`; alt: Plata pršuta i sira s maslinama i kruhom / Prosciutto and cheese board with olives and bread.  
**Poveznice:** G02 lokalni nazivi; ponuda delikatesa.  
**Napomena:** primjer slaganja i količina urednički je prijedlog, ne deklaracija Mecarina paketa.

### HR — Kako složiti platu pršuta i sira za društvo

Na platu ne morate nagurati dvadeset stvari. Pršut, dva sira, kruh i par dodataka sasvim su dovoljni da večer lijepo počne. Prvo samo odlučite je li to predjelo ili ćete se njome i najesti.

#### Malo vrsta, ali jasnih

Uzmite jedan pršut ili neko drugo suho meso koje želite staviti u prvi plan. Uz njega jedan blaži sir i jedan jači, ovisno o tome što vaši gosti vole. Ne mora sve biti jako i slano. Kad se okusi malo razlikuju, platu je zanimljivije jesti.

Koliko kupiti? Ako poslije dolazi glavno jelo, za četvero odraslih možete krenuti od otprilike 200 g pršuta i 200 g sira ukupno, plus kruh i dodaci. To je primjer za predjelo, a ne pravilo o porcijama. Ako je plata cijela večera, računa se drukčije.

#### Nešto svježe, nešto hrskavo

Narezano povrće, šaka maslina i kruh često su dovoljni. Suhe smokve i bademi imaju smisla ako ih društvo jede. Ako ih stavljate samo radi slike, vratit ćete ih u spenzu netaknute.

Provjerite alergene u sirevima, kruhu, orašastim plodovima i namazima. Ima li netko posebnu prehranu, njemu je lakše složiti zaseban tanjur nego svima jednu veliku dasku.

#### Neka se lako uzima

Pršut ne slažite u visoku hrpu. Raširite ga u manje snopove, sir narežite na komade koji se uzmu prstima, a namaze stavite u posebne posudice. Ostavite mjesta i za pribor.

Na dugom druženju iznesite samo onoliko koliko se upravo jede. Ostatak neka čeka u hladnjaku, pa nadopunjavajte. Daska koja tri sata stoji na suncu na terasi loš je plan, koliko god lijepo izgledala.

**Svratite u Mecaru vidjeti koji su pršuti, sirevi i dodaci trenutačno na pultu i pitajte nas za rezanje i pakiranje prema broju gostiju.**

### EN — How to build a prosciutto and cheese board

You don't need twenty things on a board. Some pršut (Dalmatian dry-cured ham, much like prosciutto), two cheeses, bread and a few extras are plenty to get an evening going. The one thing to decide first is whether this is a starter or most of dinner.

#### Pick a few flavours that stand out

Choose one prosciutto or cured meat to be the star. Then add a mild cheese and a stronger one, depending on your guests. Not everything has to be punchy and salty. A bit of contrast is what keeps people reaching back.

As a rough shopping guide, if a main course follows, four adults could start with about 200 g of prosciutto and 200 g of cheese in total, plus bread and extras. That's an example for a starter, not a standard portion. If the board is the dinner, you'll need to work it out differently.

#### Add something fresh and something crisp

Sliced vegetables, a few olives and some bread often do the job. Dried figs or almonds are worth adding if your lot actually eats them. Otherwise they're just decoration you'll be clearing away later.

Check the allergens in the cheese, bread, nuts and any spreads. If someone has particular dietary needs, a separate plate for them is usually easier than one big shared board.

#### Make it easy to pick from

Don't pile all the prosciutto in one dense heap. Lay it out in small loose bunches, cut the cheese into pieces people can actually pick up, and give spreads their own little bowls. Leave room for knives and forks.

For a long evening, put out what's being eaten and keep the rest properly chilled until you top up. A big board sitting on a warm terrace for hours is not a good idea, however nice the view.

**Pop into Mecara to see which cured meats and cheeses we have in at the moment, and ask us about slicing and packing for the size of your group.**

## K03 — Nedjeljno pečenje

**HR slug:** meso-za-nedjeljno-pecenje  
**EN slug:** planning-a-sunday-meat-roast  
**HR title:** Meso za nedjeljno pečenje: kako isplanirati ručak  
**EN title:** Planning a Sunday Roast: Meat, Sides and Timing  
**HR meta:** Planirajte nedjeljno pečenje prema broju gostiju, posudi i vremenu koje imate. Odaberite komad mesa i priloge koji mogu zajedno na stol.  
**EN meta:** Plan a Sunday roast around your guests, oven and available time. Choose a suitable cut and organise sides so the meal comes together.  
**HR pojmovi:** meso za nedjeljno pečenje; obiteljski ručak, meso za pećnicu.  
**EN keywords:** planning a Sunday roast; meat for roasting, family roast dinner.  
**Izvadak HR:** Mirnu nedjelju često spasi kratak plan napisan na papiru.  
**Excerpt EN:** A short plan on paper may do more for a relaxed Sunday lunch than any ingredient.  
**Slika:** `roast meat potatoes family table`; alt prilagoditi vrsti mesa, npr. Pečenje s krumpirom na pladnju za posluživanje / Roast meat and potatoes on a serving platter.  
**Poveznice:** K01 peka; T01 piletina; kontakt.  
**Tip:** vodič planiranja, bez Recipe markupa.

### HR — Meso za nedjeljno pečenje: kako isplanirati ručak

Nedjeljni ručak ne mora značiti jutro u trku od pećnice do dućana i natrag. Odlučite unaprijed koji komad mesa kupujete, što ide uz njega i kad sjedate za stol, pa će i kuhanje ići mirnije.

#### Najprije posuda, onda meso

Komad koji ne stane u posudu ili skoro dira gornji grijač nije dobra kupnja, ma koliko lijepo izgledao na pultu. Izmjerite posudu. Pogledajte imate li poklopac. Odlučite želite li meso s kosti ili bez. Slika blagdanskog pečenja s interneta ne govori ništa o vašoj pećnici.

Kad dođete po meso, recite nam kako ga mislite peći. Dugo i poklopljeno, u manjim komadima ili kao odreske koji su brže gotovi? Za svaki od tih ručkova izbor mesa može biti drukčiji.

#### Računajte cijeli stol, ne samo meso

Ako prije pečenja ide juha i obilno predjelo, porcije mesa mogu biti manje. Ako je pečenje cijeli ručak, plan je drukčiji. I brojite djecu i ono što stvarno jedu, a ne samo stolice oko stola.

Dogovorite se i tko nosi priloge. Kad se na stolu nađu dvije velike zdjele krumpira, znači da se netko nekome nije javio.

#### Krenite od sata kad sjedate

Uzmite vrijeme ručka i računajte unatrag. Treba vam vrijeme za pripremu, okvirno vrijeme pečenja, provjera je li meso gotovo i odmor mesa prije rezanja. Debeli komad ne peče se kao tanki odrezak samo zato što oboje ide u pećnicu.

Peče li se krumpir u istoj posudi s mesom, pazite na oboje. Jedno će možda biti gotovo prije drugoga, pa neka vam pri ruci bude još jedna posuda.

Zadnji savjet je najlakši. Nemojte u zadnji čas smišljati još jedno jelo. Jedan dobar prilog i salata bolji su od tri napola gotova. Ako tražite konkretan recept za početak, probajte našu piletinu s krumpirom i limunom.

**Trebate veći komad mesa ili meso za određeni dan? Javite se Mecari na vrijeme da provjerimo dostupnost i dogovorimo rezanje.**

### EN — Planning a Sunday roast: meat, sides and timing

Sunday lunch doesn't have to mean a morning spent dashing between the oven and the shops. Decide on the meat, the sides and what time you're eating before the day, and the whole thing gets much easier to manage.

#### Check your roasting dish first

Before you fall for a big joint, make sure it fits. If it won't go in your dish, or it's practically touching the top element of the oven, it isn't a sensible buy. Measure the dish, see whether it has a lid, and decide if you want the meat on the bone or off. A lovely roast in a photo tells you nothing about your own oven.

When you come in, tell us how you plan to cook it: a long, slow covered roast, smaller pieces, or quicker-cooking cuts. Each of those may need different meat.

#### Think about the whole menu

If there's soup and a decent starter first, the portions of meat can be smaller. If the roast is basically the whole lunch, plan for that instead. Count the children and what they'll actually eat, not just the chairs.

Also agree who's bringing which side. Two huge bowls of potatoes on one table usually means somebody didn't ring somebody.

#### Work backwards from lunchtime

Start with the time you want everyone seated. Then leave room for prep, a rough roasting time, checking the meat is done, and letting it rest. A thick joint can't be timed like a thin steak just because both go in the oven.

If the potatoes are roasting in the same dish as the meat, keep an eye on both. One may be ready before the other, so have a spare dish to hand.

#### Don't add a dish at the last minute

One good side and a salad beat three extras that are only half done. If you'd like a full recipe to start with, try our chicken with potatoes and lemon.

**After a larger piece of meat, or meat for a particular day? Get in touch with Mecara early so we can check availability and agree the cutting.**

# F. ZA GOSTE DUBROVNIKA / FOR VISITORS TO DUBROVNIK

## G01 — Kupnja mesa za apartman

**HR slug:** kupnja-mesa-dubrovnik-apartman  
**EN slug:** buying-meat-dubrovnik-self-catering  
**HR title:** Kupnja mesa u Dubrovniku za kuhanje u apartmanu  
**EN title:** Buying Meat in Dubrovnik for a Self-Catering Stay  
**HR meta:** Kuhate u apartmanu u Dubrovniku? Provjerite opremu, planirajte porcije i saznajte što pitati pri kupnji mesa u mesnici.  
**EN meta:** Cooking in your Dubrovnik holiday apartment? Check your kitchen equipment, plan portions and learn what to ask when buying meat at a butcher.  
**HR pojmovi:** kupnja mesa Dubrovnik; mesnica Lapad, kuhanje u apartmanu.  
**EN keywords:** buying meat in Dubrovnik; butcher Lapad, self catering Dubrovnik.  
**Izvadak HR:** Prije nego krenete po meso za večeru, otvorite ladice u kuhinji apartmana i pogledajte što zapravo imate.  
**Excerpt EN:** Before you go shopping for dinner, have a proper look at what your holiday kitchen actually has in it.  
**Slika:** `cooking apartment kitchen fresh ingredients`; alt: Namirnice pripremljene za kuhanje u manjoj kuhinji / Ingredients ready for cooking in a small kitchen.  
**Poveznice:** G02 nazivi; T03 brzi ručak; kontakt. Bez tvrdnje da je stock kuhinja u Dubrovniku.

### HR — Kupnja mesa u Dubrovniku kada kuhate u apartmanu

Nakon nekoliko večeri po restoranima mnogima dobro dođe večera u apartmanu. Velika kuhinja za to ne treba. Ali prije nego dođete u mesnicu, pogledajte imate li tavu, pećnicu, oštar nož i mjesta u hladnjaku. Iznenadit ćete se koliko apartmana ima jedan tupi nož i tavu za dva jaja.

#### Kupujte za kuhinju koju imate

Dvije ploče i mala tava? Onda su trakice mesa koje se brzo poprže pametniji izbor od velikog komada za pečenje.

Ako je na fotografijama smještaja bio roštilj, pitajte domaćina smijete li ga koristiti, na što radi i ima li pribora. Fotografija nije dozvola.

Kad znate s čim radite, mesaru je lakše objasniti što vam treba. Recite i koliko vas je, osobito ako želite odreske otprilike iste veličine, da se nitko za stolom ne osjeti zakinutim.

#### Rez i način prodaje

Cijena je u mesnici često istaknuta po kilogramu, iako vi uzimate manje od kile. Zato pitajte kupujete li cijeli komad, porciju ili nešto što se važe. Kod mesa s kosti u težinu ulazi i kost.

Strani nazivi rezova znaju zbuniti obje strane pulta. Pokažite recept ili fotografiju na mobitelu. Dvije riječi koje zvuče slično u dva jezika ne moraju biti isti dio mesa.

#### Je li to spremno za jelo?

Marinirano meso ili meso pripremljeno za pečenje nije gotovo jelo. Pitajte treba li ga kuhati, peći ili samo podgrijati. Kod začinjenih proizvoda raspitajte se i što je unutra, pogotovo ako netko u društvu ne jede određene namirnice.

#### Meso kupite zadnje

Iz mesnice idite ravno u smještaj, a ne u još tri sata razgledavanja po vrućini. Rashladna torba pomaže u prijevozu, ali hladnjak ne zamjenjuje. Doma meso spremite onako kako piše na proizvodu.

**Mecaru ćete naći u centru DOC u Lapadu, na adresi Kralja Tomislava 7. Prije nego krenete, provjerite radno vrijeme i imamo li meso koje tražite.**

### EN — Buying meat in Dubrovnik for a self-catering stay

A night in at your apartment makes a nice change from restaurants. You don't need a big kitchen for a decent dinner, but do open a few cupboards before you come shopping. Is there a frying pan? An oven? A knife that actually cuts? Room in the fridge?

#### Shop for the kitchen you've got

Holiday kitchens are often a small pan and two hobs. If that's yours, quick-fried strips of beef will serve you far better than a big roast.

Saw a barbecue in the rental photos? Ask your host before you plan around it: are guests allowed to use it, what does it run on, and are there any utensils?

Once you know what you're working with, tell us at the counter. Say how many you're cooking for too, especially if you'd like steaks of roughly the same size.

#### Cuts, weights and prices

Prices at the counter are usually per kilogram, even if you only want a few hundred grams. Check whether you're buying a whole piece, a portion or something weighed out for you. With bone-in meat, the bone counts towards the weight.

If we don't recognise the name of a cut from home, just show us the recipe or a photo. Words that sound alike in two languages often aren't the same piece of meat.

#### Ready to eat, or not yet?

Marinated or oven-ready doesn't mean ready to eat. Ask whether something needs cooking, roasting or just reheating. For seasoned products, ask what's in them, particularly if someone in your group avoids certain foods.

#### Buy the meat last

Get the meat at the end of your outing and head back to the apartment, not off for another few hours of sightseeing in the heat. A cool bag helps on the way, but it isn't a fridge. Once you're back, store everything as the label says.

**You'll find Mecara inside the DOC shopping centre in Lapad, at Kralja Tomislava 7. Check our current opening hours, and whether we have the cut you want, before you set off.**

## G02 — Mali rječnik mesnice

**HR slug:** cevapi-pljeskavica-peka-prsut-vodic  
**EN slug:** cevapi-pljeskavica-peka-prsut-guide  
**HR title:** Ćevapi, pljeskavica, peka i pršut: mali vodič  
**EN title:** Ćevapi, Pljeskavica, Peka and Pršut Explained  
**HR meta:** Mali vodič kroz nazive koje susrećete u mesnici i na stolu: ćevapi, pljeskavica, peka i pršut, uz pitanja koja vrijedi postaviti.  
**EN meta:** What are ćevapi, pljeskavica, peka and pršut? Understand these familiar Croatian food names and what to ask before buying or cooking.  
**HR pojmovi:** ćevapi pljeskavica razlika; što je peka, pršut.  
**EN keywords:** what are cevapi; pljeskavica, what is peka, Croatian prsut.  
**Izvadak HR:** Četiri naziva koja svi znamo, a svaki znači nešto drugo, i proizvod i način pripreme.  
**Excerpt EN:** Four names you'll hear all over Croatia, and they mean different foods and even different ways of cooking.  
**Slika:** `cevapi grilled plate`; alt: Pečeni ćevapi posluženi uz luk i kruh / Grilled ćevapi served with onion and bread.  
**Poveznice:** K01 peka; K02 plata; M03 mljeveno. Izvor konteksta peke: S8.

### HR — Ćevapi, pljeskavica, peka i pršut: mali vodič za stol

Nama su to obične riječi. Gostu iz inozemstva nisu, i kad kupujete ili kuhate za njega, kratko objašnjenje često vrijedi više od još jednog jela na stolu. Treba samo znati da sve četiri riječi ne označavaju gotovo jelo.

#### Ćevapi

Oblikovani komadići začinjenog mljevenog mesa. Sastav nije isti kod svakog proizvođača, pa iz samog imena ne zaključujte od kojeg su mesa. U mesnici ih kupujete sirove i pečete sami, u restoranu stižu gotovi na tanjur.

Gostu je dovoljno reći što ste kupili i kako ćete ih pripremiti. Sastojke i alergene provjerite na konkretnom proizvodu.

#### Pljeskavica

Isto mljeveno meso, ali oblikovano u širi, plosnatiji komad. Može biti obična, začinjena na razne načine ili punjena. Ime ne otkriva ima li unutra sira ili čega drugog, pa pitajte.

Stranci će je odmah prozvati hamburgerom. Oblikom donekle i jest, ali lepinja i takvo posluživanje ne idu uz svaku pljeskavicu.

#### Peka

Peka je poklopac i način pečenja ispod njega, pod žarom. Ispod peke peče se svašta. Kad u mesnici piše „meso za peku”, to je meso koje ćete tek tako pripremiti, a ne gotov ručak.

#### Pršut

Obično se reže na tanko i stavlja na platu, najčešće uz sir i kruh. Podrijetlo i proizvođača pročitajte na deklaraciji. Na pultu recite želite li ga narezanog ili u komadu.

Jedno pitanje rješava pola nesporazuma: **Je li ovo spremno za jelo ili se tek priprema?** Odmah iza njega pitajte za sastojke, osobito ako netko za stolom nešto ne smije ili ne jede.

**U Mecari pitajte što trenutno imamo i za što je koji proizvod namijenjen. Ako slažete platu, pogledajte i naš vodič za platu pršuta i sira.**

### EN — Ćevapi, pljeskavica, peka and pršut explained

Cooking in Croatia, you'll find that knowing what a word means is worth more than a long shopping list. These four turn up at the butcher's counter and around the table all the time. Not all of them are ready-made dishes, though.

#### Ćevapi

Small shaped pieces of seasoned minced meat, meant for cooking. The blend varies from producer to producer, so the name alone doesn't tell you which meats went in. Buy them at a butcher's and they're raw, for you to cook. Order them in a restaurant and they arrive cooked, on a plate.

Don't assume every version follows the same recipe. Ask about the ingredients and allergens of the product in front of you.

#### Pljeskavica

Think of a bigger, flatter patty of minced meat. It can be plain, seasoned in all sorts of ways, or stuffed. You can't tell from the name whether there's cheese or anything else inside.

"Burger" is a fair way to describe the shape. But a bun and burger-style serving don't come with every pljeskavica.

#### Peka

This one isn't a food at all. Peka is a lid, and the way of cooking under it, covered in embers. All kinds of ingredients go under a peka. So if a butcher sells "meat for peka", that's meat meant for the method, not a roast lunch you can take away.

#### Pršut

Dry-cured ham, usually sliced thin and shared with cheese and bread. The product information will tell you where it's from and who made it. At the counter, say whether you want it sliced or as a piece.

If you ask only one thing, make it this: **Is this ready to eat, or does it still need cooking?** Then ask about ingredients if anyone you're feeding has dietary requirements.

**Ask us at Mecara what's in today and how each product is meant to be used. And if you fancy a simple spread, have a look at our prosciutto and cheese board guide.**

## G03 — Roštilj u vili

**HR slug:** rostilj-u-vili-dubrovnik-planiranje  
**EN slug:** planning-villa-bbq-dubrovnik  
**HR title:** Roštilj u vili u Dubrovniku: plan kupnje i pripreme  
**EN title:** Planning a Villa BBQ in Dubrovnik  
**HR meta:** Organizirajte roštilj u vili ili apartmanu: provjerite opremu, broj gostiju, izbor mesa i vrijeme kupnje prije nego zapalite roštilj.  
**EN meta:** Plan a villa BBQ in Dubrovnik with a simple checklist for equipment, guest preferences, meat quantities and shopping arrangements.  
**HR pojmovi:** roštilj u vili Dubrovnik; meso za roštilj Dubrovnik.  
**EN keywords:** villa BBQ Dubrovnik; barbecue meat Dubrovnik, villa cooking.  
**Izvadak HR:** Mali plan za roštilj na odmoru, od provjere opreme do popisa za kupnju.  
**Excerpt EN:** A simple plan for a holiday barbecue, from checking the grill to writing one shopping list.  
**Slika:** `villa terrace barbecue dinner table`; alt: Stol pripremljen za večeru na terasi / Table set for dinner on a terrace. Ne tvrditi da je generička vila u Dubrovniku.  
**Poveznice:** R01 količine; R03 pogreške; kontakt. Ne obećavati dostavu.

### HR — Kako organizirati roštilj u vili u Dubrovniku

Dobar roštilj na odmoru je onaj za koji nitko nije morao pet puta u dućan. Zato prvo s domaćinom provjerite opremu, a onda sjednite i napišite jedan popis za kupnju, zajednički za cijelo društvo.

#### Što se smije, a što ne

Pitajte domaćina je li roštilj uopće za goste, kako se koristi te ima li kuća svoja pravila ili trenutačno vrijede ograničenja za loženje vatre. Ugljen, plin i električna ploča ne pripremaju se isto. Ako se domaćin ili lokalna pravila ne slažu s nečim što ste pročitali na blogu, uključujući ovaj, vrijedi ono što kažu domaćin i pravila.

Pogledajte imate li hvataljke, čiste pladnjeve, nož i pravo gorivo.

Roštilj na ugljen ide samo vani. Nikad u zatvoren prostor.

#### Jelovnik prema ljudima, ne prema želji

Prebrojite odrasle i djecu i pitajte tko što ne jede. Onda uzmite dvije ili tri vrste mesa, jedan pošteniji prilog i salatu. Manje izbora znači lakšu kupnju i mirniju večer uz roštilj.

Koliko mesa treba za deset odraslih s prilozima, pokazali smo u posebnom primjeru količina. Ako uzimate meso s kosti, nemojte samo prepisati izračun za file ili ćevape. Pitajte mesara da ga prilagodi.

#### Kupnju dogovorite unaprijed

Posebne rezove i veće količine provjerite unaprijed. U poruci napišite datum, broj gostiju, što želite i kako da se meso nareže. Večeru ne gradite oko fotografije proizvoda koju nitko nije potvrdio.

Ako vam treba dostava, pitajte je li moguća na vašu adresu. Dok se ne dogovore mogućnost, cijena i termin, ne računajte na nju.

#### Tko što radi

Jedan pazi na meso, drugi slaže stol i priloge. Sirovo meso držite odvojeno od pečenog i ostavite si dovoljno mjesta za rad. Pet ljudi oko jedne rešetke ne peče brže, samo više savjetuje.

**Za meso u Lapadu pogledajte što Mecara trenutno nudi, a prije veće kupnje javite nam se da se dogovorimo.**

### EN — Planning a villa BBQ in Dubrovnik

The best holiday barbecues are the ones where nobody has to run to the shop five times. So before you think about steaks, check the equipment with your host and write one shopping list for the whole group.

#### Find out what you're allowed to use

Ask your host whether guests can use the barbecue at all, how it works, and whether there are house rules or fire restrictions in place right now. Charcoal, gas and electric grills each need different preparation. If your host or the local rules say something different from a blog post (this one included), go with them.

Look for tongs, clean plates for serving, a knife and the right fuel.

Charcoal barbecues are for outdoors only. Never use one in an enclosed space.

#### Plan the menu around who's coming

Count the adults and the children, and ask everyone what they don't eat. Then keep it to two or three meats, one filling side and a salad. Less to buy, less to juggle at the grill.

We've put together a sample quantity plan for ten adults with sides. If you're buying bone-in cuts, don't just copy the figures meant for boneless meat; ask us to adjust them.

#### Sort the shopping out early

For particular steaks or a bigger order, check with us in advance that we can do it. Send your date, the number of guests, what you'd like and how you want it cut. And please don't plan the whole evening around a product photo nobody has confirmed.

Need delivery? Ask whether it's possible for your address, and don't assume it's part of the deal. Agree whether it can be done, what it costs and when it arrives before your evening depends on it.

#### Split the jobs

One person looks after the meat. Someone else sorts the table and the sides. Keep raw meat away from cooked food and give yourselves room to work. A crowd around the grill rarely speeds things up.

**Shopping for meat in Lapad? Have a look at what Mecara has on offer, and get in touch before a bigger order so we can sort it out together.**

# G. ŠTO DANAS KUHATI? / WHAT TO COOK TODAY

Ova se rubrika vizualno prikazuje prva. Recepti su originalni urednički prijedlozi. Količine i vrijeme provjeriti kuhinjskim testom prije tvrdnje da je recept testiran. Upute o gotovosti mesa ostaju vidljive na članku i u print verziji. Temperature pećnice ispod odnose se na klasično pečenje bez ventilatora.

## T01 — Piletina s krumpirom i limunom

**HR slug:** piletina-krumpir-limun-iz-pecnice  
**EN slug:** lemon-chicken-potato-traybake  
**HR title:** Piletina s krumpirom i limunom iz pećnice  
**EN title:** Lemon Chicken and Potato Traybake  
**HR meta:** Ideja za današnji ručak: pileći zabatci s krumpirom, limunom i ružmarinom. Recept za četiri osobe s jasnim koracima pripreme.  
**EN meta:** Cook lemon chicken thighs with potatoes and rosemary in one roasting tray. A straightforward recipe for four with clear preparation steps.  
**HR pojmovi:** piletina s krumpirom iz pećnice; što danas kuhati, pileći zabatci.  
**EN keywords:** lemon chicken potato traybake; chicken thighs and potatoes, easy dinner.  
**Izvadak HR:** Piletina, krumpir, limun i malo ružmarina u jednoj posudi. Ostalo odradi pećnica.  
**Excerpt EN:** Chicken thighs, potatoes and lemon in one tray, and the oven does the rest.  
**Slika:** `lemon chicken thighs potatoes rosemary tray bake`; mora prikazivati zabatke, ne samo pileći file. Alt: Pečeni pileći zabatci s krumpirom, limunom i ružmarinom / Roasted chicken thighs with potatoes, lemon and rosemary.  
**Poveznice:** K03 nedjeljno pečenje; G01 kupnja; ponuda piletine ako postoji.  
**Izvor sigurnosne provjere:** S7; rukovanje piletinom S13.

### HR — Piletina s krumpirom i limunom iz pećnice

Ovo je ručak za dane kad vam se ne da prati pet lonaca. Piletina i krumpir idu u istu posudu, uz limun i grančicu ružmarina, a pećnica odradi većinu posla. Uzimamo zabatke s kosti i kožom. Pileći file ovdje ne možete samo ubaciti umjesto njih jer mu treba drugačije vrijeme.

**Porcije:** 4  
**Priprema:** oko 15 minuta  
**Pečenje:** okvirno 40–50 minuta, prema veličini komada  
**Ukupno:** oko 55–65 minuta  
**Oprema:** velika posuda za pečenje, termometar za hranu.

#### Sastojci

- 4 veća pileća zabatka s kosti i kožom, ukupno oko 1–1,2 kg;
- 800 g krumpira;
- 1 limun;
- 4 režnja češnjaka;
- 2 žlice maslinova ulja;
- 2 manje grančice ružmarina;
- 80 ml vode;
- oko 1 žličica soli, prilagoditi ukusu;
- svježe mljeveni papar.

#### Priprema

1. Upalite pećnicu na 200 °C. Krumpir operite ili ogulite pa ga narežite na komade od otprilike 2–3 cm. Uzmite posudu dovoljno veliku da se sve ne slaže u debeo sloj, jedno preko drugoga.
2. Krumpir promiješajte sa žlicom ulja, malo soli i paprom pa ga rasporedite po posudi. Dodajte zgnječeni češnjak i ružmarin, a vodu ulijte uz rub.
3. Piletinu posušite papirnatim ručnikom. Sirovu piletinu ne perite. Natrljajte je ostatkom ulja, posolite, popaprite i složite između krumpira, kožom prema gore.
4. Pola limuna narežite na kriške i stavite uz meso. Drugu polovicu čuvajte za stol, pa ćete sami odlučiti koliko kiselo želite.
5. Pecite okvirno 40–50 minuta. Negdje nakon pola sata promiješajte krumpir, ali piletinu ne okrećite. Koža ostaje gore. Ako se posuda osuši, dolijte malo vode uz rub.
6. Termometar zabodite u najdeblji dio piletine, tako da ne dira kost. Mora pokazati najmanje 74 °C. Probajte i krumpir. Ako je jedno gotovo prije drugoga, izvadite ga čistim priborom, a ostatak neka se peče dalje.

#### Na stol

Limunov sok dodajte tek na tanjuru, koliko tko voli. Uz ovo ne treba puno, zelena salata ili zdjela svježih rajčica sasvim je dovoljna. Ako ružmarin nije za vas, stavite malo timijana.

Kuhate li za više ljudi, uzmite dvije posude i nemojte slagati sve jedno na drugo. Vrijeme pečenja tada se može promijeniti. Termometru vjerujte više nego satu.

**Zabatke s kosti pitajte u Mecari i pogledajte što danas imamo od piletine.**

### EN — Lemon chicken and potato traybake

Some evenings you just don't want to wash up five pans. This one goes into a single roasting tray, chicken and potatoes with lemon and a bit of rosemary, and the oven does most of the work. We use bone-in, skin-on thighs. Breast won't behave the same way, it needs different timing, so don't simply swap it in.

**Serves:** 4  
**Preparation:** about 15 minutes  
**Cooking:** approximately 40–50 minutes, depending on size  
**Total:** about 55–65 minutes  
**Equipment:** large roasting tray and food thermometer.

#### Ingredients

- 4 large bone-in, skin-on chicken thighs, about 1–1.2 kg in total;
- 800 g potatoes;
- 1 lemon;
- 4 garlic cloves;
- 2 tablespoons olive oil;
- 2 small rosemary sprigs;
- 80 ml water;
- about 1 teaspoon salt, adjusted to taste;
- freshly ground black pepper.

#### Method

1. Heat a conventional oven to 200°C. Wash or peel the potatoes and cut them into chunks of roughly 2–3 cm. Use a tray big enough that nothing ends up piled in a deep layer.
2. Toss the potatoes with a tablespoon of the oil, some of the salt and a little pepper, then spread them out in the tray. Add the crushed garlic and the rosemary and pour the water in around the edge.
3. Pat the chicken dry with kitchen paper. Don't wash raw chicken. Rub it with the rest of the oil, season it and sit it skin-side up among the potatoes.
4. Slice half the lemon and tuck the slices round the meat. Save the other half for the table, so you decide how sharp it gets.
5. Roast for approximately 40–50 minutes. Around the half-hour mark, give the potatoes a stir but leave the chicken skin-side up. If the tray looks dry, add a splash of water at the edge.
6. Push the thermometer into the thickest part of the chicken, clear of the bone. You want at least 74°C. Check the potatoes are tender as well. If one is done before the other, lift it out with clean utensils and let the rest carry on.

#### To serve

Squeeze over the lemon at the table, as much as you like. It doesn't need much alongside. A green salad or a bowl of fresh tomatoes will do. Not a rosemary fan? Use a little thyme.

For a bigger crowd, use two trays rather than stacking everything into one. The timing may shift, so trust the thermometer over the clock.

**Ask at Mecara for bone-in chicken thighs and see what chicken we've got in today.**

## T02 — Mesne okruglice u rajčici

**HR slug:** mesne-okruglice-umak-rajcica  
**EN slug:** beef-meatballs-tomato-sauce  
**HR title:** Mesne okruglice u umaku od rajčice — recept  
**EN title:** Beef Meatballs in Tomato Sauce — Recipe  
**HR meta:** Pripremite juneće mesne okruglice u umaku od rajčice za četiri osobe. Jednostavan ručak uz tjesteninu, palentu ili pire.  
**EN meta:** Make beef meatballs in tomato sauce for four. Follow the ingredient list and clear steps, then serve with pasta, polenta or mashed potatoes.  
**HR pojmovi:** mesne okruglice u umaku od rajčice; okruglice od junetine, ideja za ručak.  
**EN keywords:** beef meatballs in tomato sauce; meatball recipe, family dinner.  
**Izvadak HR:** Juneće okruglice u rajčici, a prilog birate prema onome što već imate u spenzi.  
**Excerpt EN:** Beef meatballs in tomato sauce, with whatever side you've already got in the kitchen.  
**Slika:** `beef meatballs tomato sauce parsley`; alt: Mesne okruglice u umaku od rajčice s peršinom / Meatballs in tomato sauce topped with parsley.  
**Poveznice:** M03 mljeveno; T01 drugi recept; ponuda.  
**Izvor sigurnosne provjere:** S7.

### HR — Mesne okruglice u umaku od rajčice

Za ovaj ručak ne morate posebno kupovati prilog. Uz umak ide tjestenina, palenta ili pire, što god vam je pri ruci. Smjesa za okruglice je jednostavna i nema dugačak popis začina.

**Porcije:** 4  
**Priprema:** oko 20 minuta  
**Kuhanje:** oko 25–30 minuta  
**Ukupno:** oko 45–50 minuta, bez zasebne pripreme priloga  
**Alergeni u ovoj verziji:** jaje, gluten iz krušnih mrvica; provjeriti i ostale deklaracije.

#### Za okruglice

- 600 g mljevene junetine;
- 1 jaje;
- 40 g krušnih mrvica;
- 50 ml vode;
- 1 manji luk, oko 80 g, sitno nariban;
- 1 žlica nasjeckanog peršina;
- pola žličice soli, prema ukusu;
- papar.

#### Za umak

- 700 ml pasirane rajčice;
- 150 ml vode;
- 2 režnja češnjaka, sitno nasjeckana;
- 1 žlica maslinova ulja;
- pola žličice suhog origana;
- sol i papar prema ukusu.

#### Priprema

1. Mrvice prelijte s 50 ml vode i pustite ih nekoliko minuta da upiju. Onda dodajte junetinu, jaje, luk, peršin, sol i papar. Miješajte samo dok se smjesa ne poveže, ne duže.
2. Napravite 16 okruglica, otprilike iste veličine. Ako je smjesa premekana, stavite je nakratko u hladnjak dok radite umak.
3. U široj posudi zagrijte ulje i ubacite češnjak. Kratko promiješajte. Češnjak ne smije potamnjeti. Ulijte rajčicu i 150 ml vode, dodajte origano i pustite da lagano zavrije.
4. Okruglice pažljivo složite u umak. Poklopite i kuhajte na laganoj vatri oko 20–25 minuta. S vremena na vrijeme nježno protresite posudu i okrenite okruglice čistim priborom. Dok su mekane, nemojte ih jako miješati.
5. Ako se umak previše zgusne, dolijte malo vode. Ako je rijedak, pred kraj ga kratko kuhajte bez poklopca. Termometrom provjerite najveće okruglice. U sredini mora biti najmanje 71 °C, a ako nije, kuhajte dalje.
6. Tek sad kušajte umak i dosolite ga ili popaprite. Poslužite uz prilog koji ste skuhali zasebno.

#### Sitnica koja pomaže

Bitnije je da su okruglice iste veličine nego da su lijepo okrugle. Velike i male u istoj posudi neće biti gotove u isto vrijeme.

Ako ih djeca žele manje, prepolovite ih nakon kuhanja. Nemojte raditi dvije veličine u istoj turi.

Recept nije bezglutenski. Ako nešto zamijenite, pročitajte deklaraciju i uvjete pripreme, sam naziv na pakiranju nije dovoljan.

**Prije kupnje bacite oko na naš vodič za mljeveno meso, pa provjerite što trenutno imamo u Mecari.**

### EN — Beef meatballs in tomato sauce

A good one for nights when the side dish is whatever's already in the kitchen. Pasta, polenta or mash, they all go with the sauce. The meatballs are simple too, no long list of spices.

**Serves:** 4  
**Preparation:** about 20 minutes  
**Cooking:** about 25–30 minutes  
**Total:** about 45–50 minutes, excluding a separately prepared side dish  
**Allergens in this version:** egg and gluten from breadcrumbs; check other ingredient labels too.

#### For the meatballs

- 600 g minced beef;
- 1 egg;
- 40 g breadcrumbs;
- 50 ml water;
- 1 small onion, about 80 g, finely grated;
- 1 tablespoon chopped parsley;
- half a teaspoon of salt, adjusted to taste;
- black pepper.

#### For the sauce

- 700 ml tomato passata;
- 150 ml water;
- 2 garlic cloves, finely chopped;
- 1 tablespoon olive oil;
- half a teaspoon dried oregano;
- salt and pepper to taste.

#### Method

1. Pour 50 ml water over the breadcrumbs and leave them a few minutes to soak. Add the beef, egg, onion, parsley, salt and pepper. Mix only until it holds together.
2. Roll 16 meatballs, all roughly the same size. If the mix feels soft, put it in the fridge for a bit while you get the sauce going.
3. Heat the oil in a wide pan and add the garlic. Stir it for a moment and don't let it brown. Pour in the passata and 150 ml water, add the oregano and bring it up to a gentle simmer.
4. Lower the meatballs into the sauce carefully. Lid on, and simmer gently for about 20–25 minutes. Every so often give the pan a gentle shake and turn the meatballs with clean utensils. They're soft at this point, so no hard stirring.
5. Sauce too thick? Add a splash of water. Too thin, leave the lid off for the last few minutes. Check the biggest meatballs with a thermometer. The centre needs at least 71°C, and if it isn't there yet, keep cooking.
6. Now taste the sauce and season it properly. Serve with the side you've cooked separately.

#### One thing that helps

Getting them the same size matters more than getting them round. Big and small ones in one pan won't be ready together. If the kids want smaller pieces, cut them in half after cooking instead of rolling two sizes in the same batch.

This recipe isn't gluten-free. If you swap anything, read the label and the preparation conditions. The name on the packet isn't enough.

**Before you shop, have a look at our guide to choosing mince, then ask what we've got at Mecara right now.**

## T03 — Juneće trakice s gljivama

**HR slug:** junece-trakice-gljive-tava  
**EN slug:** beef-strips-mushrooms-one-pan  
**HR title:** Juneće trakice s gljivama — ručak iz tave  
**EN title:** Beef Strips with Mushrooms — A One-Pan Dinner  
**HR meta:** Pripremite juneće trakice s gljivama i laganim umakom za četiri osobe. Odaberite meso za brzu pripremu i poslužite uz rižu ili pire.  
**EN meta:** Cook beef strips with mushrooms and a simple pan sauce for four. Choose a quick-cooking cut and serve with rice or mashed potatoes.  
**HR pojmovi:** juneće trakice s gljivama; brzi ručak s junetinom, što danas kuhati.  
**EN keywords:** beef strips with mushrooms; quick beef dinner, one pan beef.  
**Izvadak HR:** Za brzu junetinu trebaju vam pravi komad mesa i pečenje u manjim turama.  
**Excerpt EN:** Quick beef comes down to the right cut and not crowding the pan. Cook it in small batches.  
**Slika:** `beef strips mushrooms skillet sauce`; alt: Juneće trakice i gljive u tavi s umakom / Beef strips and mushrooms in a pan with sauce.  
**Poveznice:** M02 razlika prema gulašu; M01 rezovi; ponuda.  
**Izvori:** S1 za temeljitu termičku obradu, S3 za odabir reza. Izvorni recept, bez tvrdnje o testiranju.

### HR — Juneće trakice s gljivama za ručak iz jedne tave

Kad vam se jede junetina, a nema vremena za dugo kuhanje, sve ovisi o komadu koji ste kupili. Tražite meso koje podnosi kratko pečenje na tavi, recimo odgovarajući ramstek. Meso za gulaš ovdje ne prolazi, i to što je narezano na sitno tu ništa ne mijenja.

**Porcije:** 4  
**Priprema:** oko 15 minuta  
**Kuhanje:** oko 20–25 minuta  
**Ukupno:** oko 35–40 minuta, bez zasebne pripreme priloga  
**Oprema:** šira tava, termometar za hranu.  
**Alergeni:** provjeriti temeljac i senf; senf je sastojak ovog recepta.

#### Sastojci

- 600 g junetine za brzu pripremu, narezane na trakice debele oko 1 cm;
- 400 g šampinjona;
- 1 veći luk, oko 150 g;
- 2 režnja češnjaka;
- 2 žlice ulja;
- 200 ml goveđeg ili povrtnog temeljca;
- 1 žličica senfa;
- 1 žličica kukuruznog škroba;
- 1 žlica hladne vode;
- 1 žlica nasjeckanog peršina;
- sol i papar prema ukusu.

#### Priprema

1. Šampinjone očistite i narežite. Luk narežite na tanke ploške, a češnjak usitnite. Ako meso režete sami, režite poprečno na vlakna. Trakice posušite i lagano začinite.
2. Zagrijte žlicu ulja u tavi. Meso kratko zapecite u dvije ili tri ture, samo da dobije boju. Ne mora još biti gotovo. Prebacite ga u zasebnu posudu u kojoj čeka nastavak, a ne na pladanj s kojim ćete servirati.
3. U tavu stavite ostatak ulja i luk. Pirjajte oko 4–5 minuta pa dodajte gljive. Pecite još oko 6–8 minuta, dok ne omekšaju i dok dio tekućine ne ispari. Ubacite češnjak i kratko promiješajte.
4. Ulijte temeljac, umiješajte senf i lagano ostružite zapečeno s dna. Škrob razmutite u žlici hladne vode i ulijte u umak. Kratko prokuhajte da se malo zgusne.
5. Vratite meso u tavu, zajedno sa sokom koji je pustilo, i lagano ga dokuhajte. Ovdje su trakice potpuno kuhane, pa najdeblji komad provjerite čistom tankom sondom. Cilj je najmanje 75 °C tijekom 30 sekundi. Koliko će to trajati, ovisi o debljini i o tome koliko ste meso zapekli na početku. Samo po boji se ne ravnajte.
6. Dodajte peršin, kušajte i dosolite ako treba. Poslužite uz rižu ili pire koje ste skuhali zasebno.

#### Ako nemate pravi komad

Tvrđi komad nećete omekšati s još par minuta na jakoj vatri. Takvo meso traži sporo pirjanje i recept koji je za to napravljen.

Zato mesaru recite koliko vremena imate za ručak.

**U Mecari pitajte za junetinu koja je dobra za trakice i kratko pečenje na tavi, i provjerite možemo li vam je narezati.**

### EN — Beef strips with mushrooms for a one-pan dinner

If you fancy beef but haven't got time for anything slow, the cut decides how this turns out. Ask for something that handles quick pan cooking, a suitable piece of striploin for example. Stewing beef won't do the same job just because it's been cut small.

**Serves:** 4  
**Preparation:** about 15 minutes  
**Cooking:** about 20–25 minutes  
**Total:** about 35–40 minutes, excluding a separately prepared side dish  
**Equipment:** wide frying pan and food thermometer.  
**Allergens:** check the stock and mustard; this recipe contains mustard.

#### Ingredients

- 600 g quick-cooking beef, cut into strips about 1 cm thick;
- 400 g button mushrooms;
- 1 large onion, about 150 g;
- 2 garlic cloves;
- 2 tablespoons oil;
- 200 ml beef or vegetable stock;
- 1 teaspoon mustard;
- 1 teaspoon cornflour;
- 1 tablespoon cold water;
- 1 tablespoon chopped parsley;
- salt and pepper to taste.

#### Method

1. Clean and slice the mushrooms. Slice the onion thinly and chop the garlic. If you're cutting the beef yourself, go across the grain. Pat the strips dry and season them lightly.
2. Heat one tablespoon of oil in the pan and brown the beef quickly in two or three batches. It doesn't have to be cooked through yet. Move it to a separate dish to wait, not the plate you'll serve from.
3. Add the rest of the oil and the onion and cook for about 4–5 minutes. Then the mushrooms go in for another 6–8 minutes, until they soften and some of the liquid has cooked off. Add the garlic and stir for a moment.
4. Pour in the stock, stir in the mustard and gently scrape up the browned bits from the bottom. Mix the cornflour with the tablespoon of cold water, add it to the sauce and let it bubble briefly until it thickens a little.
5. Put the beef back in with its juices and finish cooking gently. This version is fully cooked, so check the thickest strip with a clean, fine-tip thermometer. Aim for at least 75°C for 30 seconds. How long that takes depends on thickness and how well you seared it first. Colour alone won't tell you.
6. Stir in the parsley, taste and add salt if it needs it. Serve with rice or mash cooked separately.

#### If your cut is a tougher one

A few extra minutes on high heat won't make a tough piece tender. That kind of meat wants slow cooking and a recipe built for it. So tell the butcher how much time you've got.

**Ask at Mecara for beef that suits quick-cooked strips, and check whether we can cut it for you.**

# H. Povezivanje članaka i implementacijski podaci

## H1. Katalog svih prijevoda

| ID | HR slug | EN slug | Povezani članci |
|---|---|---|---|
| M01 | rib-eye-ramstek-ili-biftek | ribeye-striploin-or-fillet | R02, M02, T03 |
| M02 | koje-meso-za-gulas | best-beef-cuts-for-stew | T03, M01, K03 |
| M03 | mljeveno-meso-za-umak-burgere-okruglice | choosing-mince-for-sauce-burgers-meatballs | T02, R03, G02 |
| R01 | koliko-mesa-za-rostilj-10-osoba | how-much-bbq-meat-for-10-people | R03, G03, M03 |
| R02 | kako-pripremiti-steak-na-tavi | how-to-cook-steak-in-a-pan | M01, T03, G01 |
| R03 | pet-pogresaka-na-rostilju | five-common-bbq-mistakes | R01, G03, M03 |
| K01 | koje-meso-za-peku | choosing-meat-for-croatian-peka | G02, K03, M02 |
| K02 | kako-sloziti-platu-prsuta-i-sira | how-to-build-prosciutto-cheese-board | G02, K03, G03 |
| K03 | meso-za-nedjeljno-pecenje | planning-a-sunday-meat-roast | T01, K01, K02 |
| G01 | kupnja-mesa-dubrovnik-apartman | buying-meat-dubrovnik-self-catering | G02, T03, G03 |
| G02 | cevapi-pljeskavica-peka-prsut-vodic | cevapi-pljeskavica-peka-prsut-guide | K01, K02, M03 |
| G03 | rostilj-u-vili-dubrovnik-planiranje | planning-villa-bbq-dubrovnik | R01, R03, G01 |
| T01 | piletina-krumpir-limun-iz-pecnice | lemon-chicken-potato-traybake | T02, K03, G01 |
| T02 | mesne-okruglice-umak-rajcica | beef-meatballs-tomato-sauce | M03, T01, T03 |
| T03 | junece-trakice-gljive-tava | beef-strips-mushrooms-one-pan | M02, M01, T02 |

Tri „povezana članka“ prikazati na istom jeziku kao otvoreni članak. U tijelu koristiti jednu do tri prirodne poveznice na relevantna objašnjenja, ne povezivati svako spominjanje istog pojma.

## H2. Mikrocopy

| HR | EN |
|---|---|
| Blog | Blog |
| Za stolom s Mecarom | At the Table with Mecara |
| Što danas kuhati? | What to Cook Today |
| Svi članci | All articles |
| Pročitajte članak | Read the article |
| Pogledajte recept | View recipe |
| Sastojci | Ingredients |
| Priprema | Method |
| Broj porcija | Servings |
| Okvirno vrijeme | Approximate time |
| Ispišite recept | Print recipe |
| Povezani članci | Related articles |
| Provjerite ponudu | Explore the selection |
| Pitajte za dostupnost | Ask about availability |
| Ilustracija posluživanja | Serving illustration |
| Ilustracija reza | Cut illustration |
| Fotografija | Photo |
| Objavljeno | Published |
| Ažurirano | Updated |
| min čitanja | min read |
| Nema članaka za odabrani filter. | No articles match this filter. |
| Prikaži sve | Show all |
| Preskoči na sadržaj | Skip to content |
| Hrvatski | Croatian |
| Engleski | English |

## H3. Primjer head oznaka za članak M01

```html
<title>Rib-eye, ramstek ili biftek: koji steak odabrati?</title>
<meta name="description" content="Usporedite rib-eye, ramstek i biftek prema masnoći, teksturi i načinu pripreme. Odaberite steak koji odgovara vašem ukusu i večeri.">
<link rel="canonical" href="https://www.mecara.app/blog/rib-eye-ramstek-ili-biftek/">
<link rel="alternate" hreflang="hr" href="https://www.mecara.app/blog/rib-eye-ramstek-ili-biftek/">
<link rel="alternate" hreflang="en" href="https://www.mecara.app/en/blog/ribeye-striploin-or-fillet/">
<link rel="alternate" hreflang="x-default" href="https://www.mecara.app/blog/rib-eye-ramstek-ili-biftek/">
```

Na EN inačici zamijeniti title, description i canonical engleskim vrijednostima, a hreflang skup ostaje uzajaman. Primjer pretpostavlja www kao glavni host; uskladiti s odlukom za cijeli projekt. OG naslov, opis, URL i alt slike lokalizirati. Sam asset može biti isti na oba jezika.

## H4. Predloženi model sadržaja

Ne zaključavati projekt na određeni CMS. Koristiti postojeći sustav, uz ekvivalentna polja:

```text
id
categoryId
locales.hr: slug, title, seoTitle, metaDescription, excerpt, body
locales.en: slug, title, seoTitle, metaDescription, excerpt, body
image: src, width, height, alt.hr, alt.en, caption.hr, caption.en
imageRights: sourcePage, photographer, licenseUrl, checkedAt, attribution
relatedIds[]
publishedAt, updatedAt, status
author (samo odobreni stvarni autor ili organizacija)
recipe (samo T01–T03): servings, prepTime, cookTimeRange,
  ingredients, steps, allergens, equipment
sources[]
```

U structured data vremenu koristiti jednu opravdanu okvirnu vrijednost iz raspona, usklađenu s vidljivim objašnjenjem; ne kodirati nevaljan ISO raspon. `prepTime` i `cookTime` ne smiju sugerirati laboratorijski provjerena vremena. Za T01 može se prikazati „oko 65 min ukupno“, T02 „oko 50 min“, T03 „oko 40 min“. Postoji li odstupanje nakon kuhinjskog testa, ažurirati vidljivi tekst i podatke zajedno.

# I. Urednička provjera prije objave

1. Provjeriti stvarne Mecarine podatke i postojeće putanje. Članci ne obećavaju stalnu zalihu, dostavu, online rezervaciju, popuste ili besplatni parking.
2. Mesar treba potvrditi nazive rezova i prijevode u lokalnoj ponudi. Ne mijenjati ramstek u neki drugi međunarodni rez samo prema automatskom prijevodu.
3. Tri recepta po mogućnosti skuhati i fotografirati. Do tada ih tretirati kao uredničke recepte s okvirnim vremenima, bez oznake „testirano“.
4. HR i EN recepti imaju iste gramaže, temperature, porcije i postupke. Jezik prilagođavati prirodno, brojke ne mijenjati bez razloga.
5. Ključne riječi već su prirodno raspoređene. Ne umetati „mesnica Dubrovnik“ u svaki podnaslov i alt.
6. Ostaviti člancima različite namjere: M01 objašnjava rezove; R02 metodu pečenja; R01 količine; G03 organizaciju roštilja na odmoru; T01–T03 konkretan ručak.
7. Ne tvrditi da lokalna jela pripadaju samo Dubrovniku; razlikovati širu dalmatinsku tradiciju od lokalne lokacije trgovine.
8. Stock fotografije ne predstavljati kao Mecarine proizvode ili vlastite rezultate recepata.
9. Uredničke rubrike „slug“, „pojmovi“, „slika“, „izvori“ i napomene Claudeu ne prikazivati kao tijelo članka. Vidljivi članak počinje označenim HR/EN naslovom, a završava njegovim CTA-om. Izvore dodati diskretno ispod relevantnih članaka kao „Izvori i dodatne informacije“ / “Sources and further reading”.
10. Tekstove ne skraćivati u tri generičke rečenice. Ako raspored traži kraći kartični tekst, koristiti priloženi izvadak.

# J. Testovi prihvata

- Postoji pet rubrika i po tri članka u svakoj, svaki sa stvarnim HR i EN URL-om: 30 članačkih stranica.
- HR je primaran. Oba jezična izbora vidljiva su u headeru na desktopu i mobitelu, bez otvaranja dodatnog menija.
- HR → EN → HR na bilo kojem članku vraća na isti par članaka, bez slanja na naslovnicu.
- Sadržaj EN URL-a ostaje engleski čak i ako je u localStorage spremljen HR.
- Sve kartice, breadcrumbovi, CTA-ovi i povezani članci vode na valjanu rutu istog jezika.
- Naslovi, opisi, canonicali i hreflangovi su jedinstveni i uzajamni. Stvarni sadržaj postoji u početnom HTML-u.
- Nepostojeći blog URL vraća 404. Nema blog-ruta koje samo ponavljaju naslovnicu sa statusom 200.
- Sve slike su pregledane; rez i jelo odgovaraju članku. Licence su evidentirane i obvezne atribucije prikazane.
- Nema slučajnih udaljenih slika koje se mijenjaju na osvježavanje; nema neispravnih URL-ova slika.
- Recepti se čitaju i ispisuju s količinama, koracima i napomenom o gotovosti. Ne skalirati temperaturu i vrijeme sa servings kontrolom.
- Mobilni tekst nema horizontalni scroll, jezični izbornik se može koristiti tipkovnicom, fokus je vidljiv.
- Datumi objave, autor i ocjene nisu izmišljeni. Schema je validirana, bez obećanja posebnog Google prikaza.
- Nakon implementacije prijaviti što je završeno, koje fotografije i licence su korištene te eventualne nedostatke. Ne tvrditi da je SEO rangiranje ostvareno samom objavom.

# K. Izvori i istraživačke napomene

Izvori su provjereni 2. studenoga 2026. Tekstovi su novi urednički sastav, a ne prijevod ili prepisivanje recepata sa stranih portala. Kulinarske količine i kombinacije u ovom dokumentu naši su prijedlozi. Ne predstavljaju stvarni cjenik, paket ili recepturu Mecare. Službene sigurnosne smjernice navode se kao praktičan izvor za kuhanje, ne kao tvrdnja o hrvatskom zakonskom temperaturnom minimumu.

- **S1 — Food Standards Agency, Cooking your food:** https://www.food.gov.uk/safety-hygiene/cooking-your-food — provjera potpune termičke obrade i kombinacija 75 °C/30 sekundi; razlika cijelih i mljevenih komada.
- **S2 — Beef. It's What's For Dinner, Ribeye Steak:** https://www.beefitswhatsfordinner.com/cuts/cut/2832/ribeye-steak — obilježja reza; strukovni izvor, ne neovisna procjena kvalitete Mecarina proizvoda.
- **S3 — Strip Steak, Boneless:** https://www.beefitswhatsfordinner.com/cuts/cut/2882/strip-steak-boneless — naziv i anatomski položaj striploina.
- **S4 — Tenderloin Steak:** https://www.beefitswhatsfordinner.com/cuts/cut/2470/tenderloin-steak-filet-mignon — obilježja tenderloina/bifteka.
- **S5 — Stewing Basics:** https://www.beefitswhatsfordinner.com/cooking/stewing-basics?content=prepared_cuts — razlika sporog kuhanja u tekućini.
- **S6 — Chuck Steak:** https://www.beefitswhatsfordinner.com/cuts/cut/44490/chuck-steak — rameni dio i izbor za sporu pripremu.
- **S7 — FoodSafety.gov, Safe Minimum Internal Temperatures:** https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures — goveđi steak 63 °C uz 3 minute odmora, mljevena junetina 71 °C, piletina 74 °C. U receptima primijenjena odgovarajuća kategorija.
- **S8 — Turistička zajednica Splitsko-dalmatinske županije, Peka:** https://www.dalmatia.hr/hr/activities/peka/ i https://www.dalmatia.hr/activities/peka/ — kontekst tradicionalne pripreme ispod poklopca.
- **S9 — Pexels License:** https://www.pexels.com/license/ — provjeriti i konkretnu fotografiju te potrebna prava izvan samog autorskog prava.
- **S10 — Unsplash License:** https://unsplash.com/license — koristiti dopuštenu zbirku i provjeriti uvjete; Unsplash+ i API imaju zasebne uvjete.
- **S11 — Google, localized versions:** https://developers.google.com/search/docs/specialty/international/localized-versions — jezični parovi i hreflang.
- **S12 — Google, managing multilingual sites:** https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites — odvojeni jezični URL-ovi.

- **S13 — Food Standards Agency, savjeti za rukovanje piletinom:** https://www.food.gov.uk/news-alerts/news/latest-levels-of-amr-bacteria-in-chicken-published — ne prati sirovu piletinu; sprječavanje križne kontaminacije.
- **S14 — Food Standards Agency, BBQ checklist:** https://www.food.gov.uk/news-alerts/news/bank-holiday-barbecue-checklist — odvajanje sirovog i gotovog mesa i čisti pribor.

**Predaja:** ovaj dokument može se izravno dati Claudeu u projektu Mecara. Izrada weba, dohvat fotografija i objava nisu izvršeni ovim dokumentom; sadržaj i upute za taj posao jesu pripremljeni.
