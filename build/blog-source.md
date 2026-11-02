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
**Izvadak HR:** Najskuplji komad nije automatski najbolji izbor za vašu večeru. Krenite od onoga što volite jesti.  
**Excerpt EN:** The most expensive cut is not automatically the best choice for dinner. Start with what you enjoy eating.  
**Slika:** pretraga `raw ribeye striploin tenderloin steaks`; točno identificirani rezovi, bez izmišljene usporedbe na generičkoj slici.  
**Alt HR/EN:** Rib-eye odrezak s vidljivim prošaranjem masnoćom / Ribeye steak with visible fat marbling. Prilagoditi odabranoj fotografiji.  
**Poveznice:** R02 steak na tavi; /odlezani-steakovi/ i /en/dry-aged-steaks/.  
**Činjenični izvori:** S2, S3, S4.

### HR — Rib-eye, ramstek ili biftek: koji steak odabrati?

Pred vitrinom je lako zapeti na imenima. Rib-eye, ramstek i biftek svi mogu biti dobar izbor, ali nude različit doživljaj. Prije pitanja o cijeni korisnije je odgovoriti na drugo: želite li mekši, nemasniji komad ili vam je važniji bogatiji okus i nešto više masnoće?

#### Rib-eye za ljubitelje prošaranog mesa

Rib-eye dolazi iz rebrenog dijela i često ima vidljivu masnoću unutar mišića. Ako volite steak punijeg okusa, vrijedi ga razmotriti. Prošaranost nije ista na svakom odresku, pa pogledajte konkretan komad umjesto da se oslonite samo na naziv.

Uz njega ne trebate složen prilog. Pečeni krumpir, zelena salata ili povrće s grila ostavljaju mesu dovoljno prostora na tanjuru.

#### Ramstek kao sredina između teksture i masnoće

Pod nazivom ramstek u ponudi se često podrazumijeva striploin. Ima izraženiju strukturu od bifteka i obično prepoznatljiv rub masnoće. Dobar je kandidat kada želite steak koji se lijepo reže na kriške i poslužuje uz jednostavan umak.

Nazivi rezova mogu se razlikovati među tržištima. Ako pratite strani recept, pokažite naziv ili fotografiju mesaru kako biste provjerili kupujete li odgovarajući komad.

#### Biftek kada prednost dajete mekoći

Biftek, odnosno tenderloin ili fillet, poznat je po nježnijoj teksturi i manjoj masnoći. Prikladan je za manje, uredno oblikovane porcije. Ne treba ga birati samo zato što zvuči svečano: ako volite izraženije masne dijelove steaka, možda ćete više uživati u drugom rezu.

#### Još dva pitanja prije kupnje

Recite pripremate li meso na tavi ili roštilju i kolika vam je posuda. Debljina odreska utječe na način pripreme; dva komada jednake težine ne moraju se jednako peći. Za zajedničko posluživanje navedite i koliko će biti priloga.

**Birate steak u Dubrovniku? Pogledajte Mecarinu ponudu odležanih steakova i provjerite koji su rezovi trenutačno dostupni.**

### EN — Ribeye, striploin or fillet: which steak should you choose?

Standing at a butcher's counter, the names can make the decision feel more complicated than it is. Ribeye, striploin and fillet can all make a good dinner. The useful question is what you enjoy: a leaner, softer piece, or a richer steak with more fat running through it?

#### Ribeye for a more marbled cut

Ribeye comes from the rib section and often shows visible fat within the muscle. It is worth considering if you enjoy a fuller-flavoured steak. Marbling varies from one piece to another, so look at the actual cut rather than buying by name alone.

Keep the rest of the plate straightforward. Roast potatoes, a green salad or grilled vegetables give the steak room to be the centre of the meal.

#### Striploin for texture and a fat edge

In a Croatian butcher's shop, the name ramstek often refers to striploin. It has a firmer texture than fillet and usually a recognisable edge of fat. It is a useful choice for a steak you plan to slice and serve with a simple sauce.

Cut names do not always line up perfectly between countries. If you are following a recipe from home, show the butcher the name or a picture and check that you mean the same cut.

#### Fillet when tenderness matters most

Fillet, also called tenderloin or biftek, is known for its delicate texture and lower fat content. It works well for smaller individual portions. That does not make it everyone's favourite: if you enjoy the fattier parts of a steak, another cut may suit you better.

#### Ask about thickness and equipment

Tell the butcher whether you will be using a frying pan or a barbecue, and how much space you have. Thickness affects cooking; two steaks of the same weight can need different handling. If the steak will be shared, allow for the side dishes too.

**Choosing a steak in Dubrovnik? Explore Mecara's dry-aged selection and check which cuts are currently available.**

## M02 — Koje meso za gulaš?

**HR slug:** koje-meso-za-gulas  
**EN slug:** best-beef-cuts-for-stew  
**HR title:** Koje meso za gulaš? Odabir komada i rezanje  
**EN title:** Which Beef Cuts Work Best in a Stew?  
**HR meta:** Za dobar gulaš važni su pravi komad junetine, jednako rezanje i strpljivo kuhanje. Saznajte što pitati mesara prije kupnje.  
**EN meta:** Choose beef for stew with the cut, cube size and cooking time in mind. Learn what to ask your butcher before starting a slow-cooked dinner.  
**HR pojmovi:** meso za gulaš; junetina za gulaš, juneća lopatica.  
**EN keywords:** beef for stew; stewing beef, beef chuck.  
**Izvadak HR:** Za gulaš birajte meso prema načinu kuhanja, a ne prema cijeni steaka.  
**Excerpt EN:** Buy for the cooking method, not the price of a steak. A good stew begins with the right cut.  
**Slika:** `raw diced beef chuck stew`; alt HR/EN: Junetina narezana na kocke za gulaš / Beef cut into cubes for a stew.  
**Poveznice:** T03 juneće trakice za kontrast brze pripreme; ponuda mesa HR/EN.  
**Izvori:** S5, S6.

### HR — Koje meso odabrati za gulaš?

Gulaš je jelo za dan kada lonac može mirno raditi svoje. Zato komad koji se brzo peče na tavi nije nužno najbolji izbor. Za sporo kuhanje tražite junetinu prikladnu za dugo pirjanje, a pri kupnji recite koliko vremena imate.

#### Krenite od lopatice ili drugog komada za pirjanje

Juneća lopatica često je dobar početak razgovora. Važna je građa konkretnog komada, a ne samo naziv na etiketi. Mesar može predložiti i drugi odgovarajući dio te objasniti koliko ga treba očistiti i kako narezati.

Vrlo nemasan komad i komad s više vezivnog tkiva neće se jednako ponašati u loncu. Cilj nije kupiti najskuplje meso, nego ono koje odgovara sporoj pripremi.

#### Neka kocke budu približno jednake

Sitni komadi i velike kocke u istom loncu mogu završiti različito. Zatražite ravnomjerno rezanje, primjerice kocke od približno tri centimetra, i prilagodite ih svom receptu. To je praktična mjera, ne univerzalno pravilo.

Prije dodavanja tekućine zapecite meso u nekoliko manjih tura. Pretrpan lonac brzo se napuni tekućinom, pa je teže dobiti zapečenu površinu. Zatim dodajte ostale sastojke prema receptu i smanjite vatru.

#### Mekoću provjeravajte, nemojte je pretpostaviti

Gulaš koji snažno ključa nije nužno brže gotov. Lagano kuhanje i dovoljno vremena korisniji su od stalnog pojačavanja vatre. Točno trajanje ovisi o rezu i veličini komada; meso treba biti mekano kada ga isprobate vilicom.

Ako imate samo pola sata, bolje je odabrati drugačije jelo nego pokušati ubrzati veliki lonac gulaša. Juneće trakice iz prikladnog reza za brzu pripremu mogu biti bolji plan za taj dan.

**U Mecari pitajte za junetinu za gulaš i navedite koliko osoba kuhate te želite li meso već narezano. Dostupnost provjerite prije dolaska.**

### EN — Which beef should you choose for a stew?

A beef stew suits a day when the pot can take its time. A cut designed for a quick sear is not automatically the right choice. Ask for beef suited to slow cooking and tell the butcher how much time you have.

#### Start with chuck or another braising cut

Chuck, from the shoulder area, is a useful starting point. What matters is the structure of the particular piece, not just its label. Your butcher may recommend another suitable cut and explain how much trimming it needs.

A very lean piece and a piece with more connective tissue will behave differently in the pot. The aim is not to buy the most expensive meat. It is to match the cut to a slow, moist cooking method.

#### Keep the cubes a similar size

Small pieces and very large chunks can cook unevenly. Ask for a fairly consistent dice, perhaps around three centimetres, and adapt it to your recipe. That size is a practical starting point rather than a fixed rule.

Brown the beef in smaller batches before adding liquid. Crowding the pan makes it harder to develop a browned surface. Add the remaining ingredients according to your recipe, then turn down the heat.

#### Check tenderness instead of relying on the clock

A pot that boils fiercely is not necessarily producing a better stew. Gentle cooking and enough time are more useful than repeatedly turning up the heat. The exact duration depends on the cut and cube size; check that a piece yields easily to a fork.

If dinner needs to be ready in half an hour, choose another dish. Thin beef strips from a cut intended for quick cooking may be a better answer than trying to rush a large stew.

**Ask Mecara about beef for slow cooking, your guest count and whether you would like it diced. Check availability before visiting.**

## M03 — Mljeveno meso prema jelu

**HR slug:** mljeveno-meso-za-umak-burgere-okruglice  
**EN slug:** choosing-mince-for-sauce-burgers-meatballs  
**HR title:** Mljeveno meso za umak, burgere i okruglice  
**EN title:** Choosing Mince for Sauce, Burgers and Meatballs  
**HR meta:** Što pitati pri kupnji mljevenog mesa? Usporedite izbor za umak, burgere i mesne okruglice te planirajte količinu prema receptu.  
**EN meta:** Buying mince for a sauce, burgers or meatballs? Ask about the meat blend, fat content and ingredients, and choose for the dish you want to cook.  
**HR pojmovi:** mljeveno meso; meso za burgere, mesne okruglice.  
**EN keywords:** choosing minced meat; mince for burgers, meatball mince.  
**Izvadak HR:** Jedna riječ na popisu za kupnju skriva nekoliko važnih pitanja.  
**Excerpt EN:** One item on your shopping list can hide several useful questions.  
**Slika:** `fresh minced beef bowl`; alt: Mljevena junetina u posudi prije pripreme / Minced beef in a bowl before cooking.  
**Poveznice:** T02 okruglice; R03 pogreške na roštilju.  
**Izvor sigurnosne napomene:** S1.

### HR — Kako odabrati mljeveno meso za umak, burgere i okruglice

„Pola kile mljevenog“ brz je zahtjev, ali malo govori o večeri koju planirate. Za mesni umak, burger i okruglice možete imati različite želje. Zato je korisno prvo spomenuti jelo, a zatim pitati što se nalazi u odabranoj mješavini.

#### Za umak gledajte cijeli recept

Ako radite umak s rajčicom i povrćem, meso je jedan dio cjeline. Količinu prilagodite broju porcija, tjestenini i ostalim sastojcima. Nema potrebe dodavati novu veliku količinu ulja prije nego vidite koliko ga već ima u receptu i mesu.

Junetina i miješano mljeveno meso nisu isto. Odabir ovisi o ukusu i prehrambenim navikama ukućana, zato ne pretpostavljajte sastav samo prema boji.

#### Za burgere provjerite sastav

Pitajte od kojih je vrsta mesa smjesa napravljena, kakav je udio masnoće i je li već začinjena. Tako ćete izbjeći da pripremljenu smjesu ponovno jako posolite. Ako kupujete oblikovane burgere, provjerite i veličinu kako bi odgovarali pecivima.

Ne morate tražiti jedan „savršeni“ omjer za sve recepte. Recite što želite postići i kakvu pripremu planirate.

#### Za okruglice računajte i dodatke

Jaje, krušne mrvice, luk i ostali sastojci utječu na teksturu i konačnu količinu. Slijedite recept i ne dodajte mrvice samo zato što smjesa u početku djeluje mekano. Kratak odmor smjese u hladnjaku može olakšati oblikovanje.

Za alergene je važan cijeli recept, ne samo meso: mrvice mogu sadržavati gluten, a jaje i mliječni dodaci također traže pozornost.

Mljeveno meso čuvajte prema deklaraciji i potpuno termički obradite. Burger nije isto što i cijeli steak, pa pravila za ružičastu sredinu steaka ne prenosite na njega.

**Isprobajte recept za mesne okruglice u rajčici ili pitajte Mecaru za odgovarajuće mljeveno meso.**

### EN — Choosing mince for sauce, burgers and meatballs

“Half a kilo of mince” is a quick request, but it says little about the dinner you are making. A meat sauce, burger and meatball recipe can call for different choices. Start by naming the dish, then ask what is in the blend.

#### For a sauce, think about the whole recipe

In a tomato and vegetable sauce, meat is one part of the dish. Plan the quantity around your portions, pasta and other ingredients. Before adding a generous amount of oil, consider what the recipe and the meat already contribute.

Beef mince and mixed mince are different products. Your preference may depend on taste or household dietary choices, so do not guess the blend from its colour.

#### For burgers, check the mixture

Ask which meats it contains, about the fat content and whether it has already been seasoned. This helps you avoid heavily salting a ready-seasoned mixture. If you buy shaped patties, check their size against the buns you plan to use.

There is no need to insist on one supposedly perfect ratio for every recipe. Explain the result you want and how you will cook it.

#### For meatballs, remember the other ingredients

Egg, breadcrumbs, onion and other additions change the texture and finished quantity. Follow your recipe rather than adding extra breadcrumbs as soon as the mixture feels soft. A short rest in the fridge can make shaping easier.

Allergens belong to the whole dish, not just the meat. Breadcrumbs may contain gluten, while egg and dairy additions also need checking.

Store mince according to the product instructions and cook it thoroughly. A burger is not a whole steak, so advice about serving a steak pink should not be applied to it.

**Try our meatballs in tomato sauce, or ask Mecara which mince suits the meal you are planning.**

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
**Izvadak HR:** Krenite od jelovnika i gostiju, a tek onda od kilograma.  
**Excerpt EN:** Start with your guests and menu, then work out the kilograms.  
**Slika:** `mixed barbecue meat platter sausages chicken`; alt: Različite vrste pečenog mesa za zajednički roštilj / A selection of cooked meats for a shared barbecue.  
**Poveznice:** R03 pogreške; M03 mljeveno; planer ako je aktivan.  
**Napomena uredniku:** količine su naš ilustrativni plan kupnje, ne nutritivna ili službena porcija.

### HR — Koliko mesa kupiti za roštilj za 10 osoba?

Za deset odraslih osoba koje uz meso imaju kruh, salatu i jedan konkretniji prilog, možete početi planirati s približno 3 do 3,5 kilograma sirovog mesa bez kosti. To je primjer umjereno obilnog roštilja, a ne pravilo za svako društvo. Ako imate veliko predjelo, treba vam manje; ako je meso gotovo cijeli obrok, plan će biti drugačiji.

#### Jednostavan primjer kupnje

Za ukupno 3,2 kilograma možete složiti:

- 1,2 kg ćevapa;
- 0,8 kg pilećeg mesa bez kosti;
- 0,7 kg svinjskog vrata bez kosti;
- 0,5 kg kobasica za roštilj.

To je 320 grama sirovog mesa po odrasloj osobi prije pečenja. Kombinaciju slobodno promijenite: ako društvo ne jede svinjetinu, ne zamjenjujte je naslijepo kobasicama, nego prvo provjerite njihov sastav.

#### Prilozi mijenjaju računicu

Krumpir, povrće, kruh i veća salata nisu samo ukras. Zapišite ih prije odlaska u kupnju. Ako uz roštilj poslužujete i platu za početak, nema potrebe svakom gostu računati punu porciju svake vrste mesa.

Za djecu i goste manjeg apetita prilagodite plan pojedinačno. Bolje je znati tko dolazi nego automatski brojati svaku osobu kao jednaku porciju.

#### Kilogram rebara nije kilogram filea

Kada birate rebarca, batke ili druge komade s kosti, ukupna težina uključuje i ono što se neće pojesti. Zato navedeni primjer bez kosti ne prepisujte na takvu kupnju. Zatražite pomoć mesara za konkretne komade.

#### Kupite izbor koji možete ispeći

Četiri vrste mesa na malom roštilju mogu biti zahtjevnije od dvije dobro odabrane. Planirajte redoslijed i nekoliko tura, umjesto da sve pokušate staviti odjednom.

**Pošaljite Mecari broj gostiju i okvirni jelovnik pa provjerite raspoložive količine. Ako koristite roštilj planer, rezultat uzmite kao početni prijedlog, ne potvrđenu narudžbu.**

### EN — How much meat should you buy for a BBQ for 10 people?

For ten adults eating bread, salad and a substantial side dish with their meat, around 3 to 3.5 kilograms of raw boneless meat is a useful planning example. It makes a reasonably generous barbecue, not a universal serving rule. A large starter reduces what you need; a meal built almost entirely around meat changes the plan.

#### A simple shopping example

For a total of 3.2 kilograms, you could choose:

- 1.2 kg ćevapi;
- 0.8 kg boneless chicken;
- 0.7 kg boneless pork neck;
- 0.5 kg grill sausages.

That works out at 320 grams of raw meat per adult before cooking. Change the mix to suit your guests. If someone avoids pork, do not assume sausages are a suitable replacement without checking their ingredients.

#### Write down the sides first

Potatoes, vegetables, bread and a generous salad are part of the meal. Put them on the list before buying meat. If you are also serving a charcuterie board, you do not need to allocate every guest a full helping of every meat.

Adjust for children and smaller appetites individually. Knowing who is coming is more useful than treating every guest as an identical portion.

#### Bone-in cuts need a different calculation

A kilogram of ribs or chicken drumsticks includes bone. The boneless shopping example above should not be copied directly for those cuts. Ask the butcher to help estimate quantities for the pieces you actually want.

#### Buy what your barbecue can handle

Four meats on a small grill can be harder to manage than two well-chosen options. Plan a cooking order and a few batches rather than trying to fit everything on at once.

**Send Mecara your guest count and rough menu to check available quantities. If you use the BBQ planner, treat its result as a starting suggestion rather than a confirmed order.**

## R02 — Steak na tavi

**HR slug:** kako-pripremiti-steak-na-tavi  
**EN slug:** how-to-cook-steak-in-a-pan  
**HR title:** Kako pripremiti steak na tavi: praktičan vodič  
**EN title:** How to Cook Steak in a Pan: A Practical Guide  
**HR meta:** Dobra tava, suha površina i kontrola topline olakšavaju pripremu steaka. Saznajte kako planirati pečenje bez oslanjanja samo na minute.  
**EN meta:** A suitable pan, a dry surface and controlled heat make steak cooking easier. Learn how to plan the sear without relying only on minutes.  
**HR pojmovi:** steak na tavi; priprema steaka, kako ispeći steak.  
**EN keywords:** cook steak in a pan; pan seared steak, steak cooking tips.  
**Izvadak HR:** Za dobar steak ne treba roštilj, ali treba malo prostora u tavi.  
**Excerpt EN:** You do not need a barbecue for steak, but you do need room in the pan.  
**Slika:** `steak cast iron skillet rosemary`; alt: Steak koji se peče u teškoj tavi / Steak cooking in a heavy frying pan.  
**Poveznice:** M01 rezovi; ponuda steakova.  
**Izvori:** S1, S7. Ovo je vodič metode, ne kompletan recept za Recipe oznaku.

### HR — Kako pripremiti steak na tavi bez nepotrebnog kompliciranja

Večera sa steakom može početi i završiti u jednoj dobroj tavi. Najviše pomaže da unaprijed znate koji komad imate, koliko je debeo i želite li ga poslužiti cijelog ili narezanog za dijeljenje.

#### Odaberite tavu u koju odrezak stvarno stane

Teža tava koja ravnomjerno drži toplinu praktična je za ovu pripremu. Ako pečete dva velika komada, provjerite ostaje li između njih prostora. Ako ne ostaje, radite u turama. Meso ne bi smjelo biti složeno jedno preko drugoga.

Prilog pripremite ranije. Kada odrezak ide u tavu, nije dobar trenutak za početak guljenja krumpira.

#### Osušite površinu i pripremite začine

Papirnatim ručnikom posušite površinu mesa, zatim začinite prema ukusu. Zagrijte tavu i dodajte malu količinu ulja prikladnog za pečenje. Izbjegavajte pregrijavanje do nekontroliranog dimljenja, osobito u maloj kuhinji.

Pustite da se površina zapeče, a zatim okrenite odrezak. Kod debljeg komada nakon početnog zapecanja smanjite toplinu kako biste mogli kontrolirati sredinu bez spaljivanja vanjskog sloja.

#### Minute nisu jedina mjera

Debljina, početna temperatura mesa i snaga ploče mijenjaju trajanje. Termometar je korisniji od univerzalnog obećanja „tri minute sa svake strane“. Za jednostavan konzervativan cilj kod cijelog goveđeg odreska USDA navodi najmanje 63 °C u sredini i najmanje tri minute odmora. Ta se smjernica ne prenosi na mljeveno meso ili piletinu.

Maslac i začinsko bilje, ako ih koristite, dodajte pri kraju i smanjite vatru da maslac ne zagori.

#### Odmorite pa narežite

Odrezak kratko odmorite na čistom tanjuru ili dasci prije rezanja. Za posluživanje na kriške režite poprečno na smjer vlakana. Malo soli, prilog i vlastiti sokovi iz mesa često su dovoljni.

**Ako tek birate komad, prvo pročitajte usporedbu rib-eyea, ramsteka i bifteka, a zatim provjerite aktualnu ponudu Mecare.**

### EN — How to cook steak in a pan without overcomplicating dinner

A steak dinner can begin and end in one good pan. It helps to know which cut you have, how thick it is and whether you plan to serve it whole or slice it for sharing.

#### Use a pan with enough room

A heavier pan that holds heat evenly is useful here. If you are cooking two large steaks, check that there is space between them. Otherwise, cook in batches rather than squeezing the meat together.

Get the side dishes ready first. Once the steak is in the pan, it is not the moment to start peeling potatoes.

#### Dry the surface and prepare your seasoning

Pat the meat's surface dry with kitchen paper, then season to taste. Heat the pan and add a little oil suitable for frying. Avoid letting the pan smoke uncontrollably, especially in a small kitchen.

Allow the surface to brown, then turn the steak. For a thicker piece, reduce the heat after the initial sear so you can control the centre without burning the outside.

#### Do not judge only by minutes

Thickness, the meat's starting temperature and your hob all affect cooking time. A thermometer is more useful than a universal promise of three minutes on each side. For a straightforward conservative target for a whole beef steak, USDA guidance gives at least 63°C in the centre followed by at least three minutes of rest. This is not the same guidance used for mince or chicken.

If you want butter and herbs, add them towards the end and lower the heat so the butter does not burn.

#### Rest before slicing

Give the steak a short rest on a clean plate or board before cutting it. For a sharing plate, slice across the direction of the muscle fibres. A little salt, a side dish and the meat's own juices may be all you need.

**Still choosing your cut? Read our ribeye, striploin and fillet comparison, then check Mecara's current selection.**

## R03 — Pet pogrešaka na roštilju

**HR slug:** pet-pogresaka-na-rostilju  
**EN slug:** five-common-bbq-mistakes  
**HR title:** Pet pogrešaka na roštilju koje je lako izbjeći  
**EN title:** Five Common BBQ Mistakes You Can Avoid  
**HR meta:** Pretrpana rešetka, prejaka vatra i loš redoslijed pečenja mogu pokvariti roštilj. Organizirajte pripremu i provjeravajte gotovost mesa.  
**EN meta:** Crowded grills, excessive heat and poor timing can spoil a barbecue. Organise your cooking and check doneness instead of guessing.  
**HR pojmovi:** pogreške na roštilju; kako peći meso na roštilju.  
**EN keywords:** common BBQ mistakes; grilling meat tips.  
**Izvadak HR:** Bolji roštilj često počinje boljim redoslijedom, a ne novom marinadom.  
**Excerpt EN:** A better barbecue often starts with better timing, not a new marinade.  
**Slika:** `barbecue grill chicken sausages tongs`; alt: Meso na rešetki roštilja s prostorom između komada / Meat spaced out on a barbecue grill.  
**Poveznice:** R01 količine; G03 villa BBQ.  
**Izvor sigurnosnih navoda:** S1 i S14.

### HR — Pet pogrešaka na roštilju koje je lako izbjeći

Kupili ste dobro meso, pripremili priloge i pozvali društvo. Ipak, na rešetki sve odjednom postane užurbano. Najčešće nije problem u kompliciranoj tehnici, nego u nekoliko sitnih odluka prije pečenja.

#### 1. Sve ide na rešetku u isto vrijeme

Deblji komadi piletine i tanki odresci ne trebaju jednak tretman. Napravite jednostavan redoslijed i ostavite prostor za nekoliko tura. Ako gosti jedu postupno, nema potrebe da svaka vrsta mesa završi u istoj minuti.

#### 2. Cijela površina je jednako vruća

Gdje oprema to dopušta, ostavite jače zagrijan i mirniji dio. Tako možete premjestiti komad koji izvana brzo tamni, a još nije gotov u sredini. Plamen koji stalno zahvaća meso nije cilj pripreme.

#### 3. Rešetka je pretrpana

Meso treba prostor za okretanje i kontrolu. Ako jednim potezom pomičete tri komada samo da biste došli do četvrtog, bolje je smanjiti turu. Hrana koja čeka neka ostane pravilno ohlađena, umjesto da cijela kupnja stoji uz vatru.

#### 4. Boja izvana znači da je gotovo

Zapečena površina ne govori dovoljno o sredini. Piletinu i proizvode od mljevenog mesa treba potpuno termički obraditi. Za provjeru koristite čist termometar i odgovarajuću uputu za proizvod, osobito kod debljih komada.

#### 5. Gotovo meso vraća se na tanjur za sirovo

Pripremite čisti tanjur i pribor prije početka. Posuda u kojoj je stajalo sirovo meso ne ide ponovno na stol za gotove porcije bez pranja. Odvojite i pribor koji dolazi u dodir sa sirovom hranom.

Na kraju ostavite sebi vremena sjesti za stol. Jednostavniji izbor i nekoliko dobro organiziranih tura često su ugodniji od pokušaja da pripremite sve što postoji u vitrini.

**Za početak složite količine uz naš vodič za roštilj za deset osoba i provjerite Mecarinu aktualnu ponudu.**

### EN — Five common BBQ mistakes you can avoid

You have bought the meat, prepared the sides and invited your friends. Then everything suddenly feels rushed at the grill. Often the problem is not a difficult technique, but a few small decisions made before cooking.

#### 1. Putting everything on together

Thicker chicken pieces and thin steaks need different handling. Make a simple cooking order and allow for several batches. If your guests are happy to eat gradually, every meat does not have to finish in the same minute.

#### 2. Keeping the whole grill equally hot

Where your equipment allows it, create a hotter area and a gentler one. You can then move a piece that is colouring quickly before its centre is cooked. Constant flames licking the meat are not the aim.

#### 3. Crowding the cooking surface

Leave enough room to turn and check each piece. If you must move three things to reach a fourth, cook a smaller batch. Keep the uncooked food waiting under appropriate refrigeration rather than leaving the entire shopping bag beside the fire.

#### 4. Judging only by the outside colour

A browned surface tells you too little about the centre. Chicken and minced-meat products need thorough cooking. Use a clean food thermometer and the appropriate product instructions, especially with thicker pieces.

#### 5. Reusing the raw-meat plate

Have a clean serving plate and utensils ready before starting. A dish that held raw meat should not be used for cooked portions without washing. Keep utensils that touch raw food separate too.

Leave yourself enough time to sit down with everyone else. A simpler menu and a few organised batches are often more enjoyable than trying to cook everything at the butcher's counter.

**Start with our meat quantities guide for ten people, then check Mecara's current BBQ selection.**

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
**Izvadak HR:** Dobra peka počinje dogovorom o mesu, veličini posude i broju ljudi.  
**Excerpt EN:** A good peka starts with the meat, the size of the dish and the number of guests.  
**Slika:** `Croatian peka veal lamb potatoes bell`; treba prikazivati stvarnu peku. Alt: Meso i krumpir u posudi za pripremu ispod peke / Meat and potatoes in a dish for cooking under a peka bell.  
**Poveznice:** G02 nazivi jela; ponuda.  
**Izvor konteksta:** S8. Tekst nije detaljna uputa za rad sa žarom.

### HR — Koje meso odabrati za peku: teletinu ili janjetinu?

Peka nije samo naziv jednog jela. To je način pripreme pod poklopcem, uz žar, pri kojem se meso i povrće zajedno peku u posudi. Za stolom obično znači još nešto: ručak kojem se ne žuri i dovoljno vremena da se svi okupe.

Prije kupnje mesa dogovorite tko priprema peku i kolika je posuda. Velika narudžba ne pomaže ako u njoj nema prostora za meso i krumpir.

#### Teletina za blaži okus

Ako društvo voli blaži okus, teletina je dobar kandidat. Pitajte za komade prikladne za takvu pripremu i navedite želite li koljenicu ili drugi rez. Važno je da su veličina i rezanje usklađeni s načinom na koji će se jelo peći.

Nemojte automatski tražiti najmanje moguće komade. Razgovarajte s osobom koja priprema peku kako bi meso i povrće mogli završiti zajedno.

#### Janjetina za izraženiji karakter

Janjetina je izbor za stol za kojim se njezin okus već voli. Prije kupnje provjerite žele li je svi gosti i koji su komadi raspoloživi. Komadi s kosti utječu na računanje količine, pa broj kilograma nije jednak količini mesa koja završava na tanjuru.

Ako kombinirate teletinu i janjetinu, odabir i veličinu uskladite s kuharom. Nije dovoljno samo prepoloviti narudžbu.

#### Tri podatka koja olakšavaju kupnju

Mesaru recite broj odraslih i djece, veličinu peke te planirate li obilno predjelo. Navedite i želite li meso preuzeti narezano. Tako razgovor odmah postaje konkretniji.

Nemate ognjište i opremu? Poklopljeno pečenje u pećnici može dati lijep obiteljski ručak, ali nije ista tehnika kao priprema pod žarom. Ne treba ga tako ni predstavljati.

**Za peku na dubrovačkom području provjerite Mecarinu ponudu teletine i janjetine te unaprijed pitajte za željene komade.**

### EN — Choosing meat for peka: veal or lamb?

Peka is not simply the name of one dish. It is a method of cooking under a lid with embers, allowing meat and vegetables to cook together in a pan. Around the table, it usually means something else as well: a meal that is not rushed and time for everyone to gather.

Before buying the meat, agree who is cooking and how large the peka pan is. A large order is not useful if there is no room for the meat and potatoes.

#### Veal for a milder flavour

If your group prefers a gentler flavour, consider veal. Ask about cuts suited to this preparation and explain whether you want shank or another piece. Size and cutting should match the way the cook intends to handle the meal.

Do not automatically request the smallest possible pieces. Talk to the person preparing the peka so the meat and vegetables can cook on a compatible schedule.

#### Lamb for a more distinctive choice

Lamb suits a group that already enjoys its flavour. Check your guests' preferences and the available cuts before buying. Bone-in pieces affect the quantity calculation: their total weight is not the same as the amount of edible meat served.

If you want to combine lamb and veal, agree the cuts and sizes with the cook. It is not simply a matter of splitting an order in half.

#### Bring three useful details to the butcher

Explain how many adults and children are eating, the size of the cooking dish and whether you are serving a substantial starter. Add whether you need the meat cut before collection.

Without a suitable hearth and equipment, a covered oven roast can still make a lovely shared meal. It is a different cooking method, though, and should not be described as the same experience as cooking beneath embers.

**For a peka in the Dubrovnik area, check Mecara's veal and lamb selection and ask about your preferred cuts in advance.**

## K02 — Plata pršuta i sira

**HR slug:** kako-sloziti-platu-prsuta-i-sira  
**EN slug:** how-to-build-prosciutto-cheese-board  
**HR title:** Kako složiti platu pršuta i sira za društvo  
**EN title:** How to Build a Prosciutto and Cheese Board  
**HR meta:** Složite jednostavnu platu pršuta i sira uz kruh, povrće i nekoliko dodataka. Planirajte posluženje prema tome slijedi li glavno jelo.  
**EN meta:** Build a simple prosciutto and cheese board with bread, vegetables and a few accompaniments. Plan it around the meal that follows.  
**HR pojmovi:** plata pršuta i sira; kako složiti platu.  
**EN keywords:** prosciutto and cheese board; Croatian charcuterie board.  
**Izvadak HR:** Manje različitih proizvoda može dati bolju platu ako svaki ima svoje mjesto.  
**Excerpt EN:** A smaller selection can make a better board when each item has a purpose.  
**Slika:** `prosciutto cheese olives board`; alt: Plata pršuta i sira s maslinama i kruhom / Prosciutto and cheese board with olives and bread.  
**Poveznice:** G02 lokalni nazivi; ponuda delikatesa.  
**Napomena:** primjer slaganja i količina urednički je prijedlog, ne deklaracija Mecarina paketa.

### HR — Kako složiti platu pršuta i sira za društvo

Dobra plata ne mora biti puna dvadeset različitih proizvoda. Pršut, dva sira, kruh i nekoliko dodataka mogu biti dovoljno lijep početak druženja. Najprije odlučite je li plata predjelo ili gotovo cijela večera.

#### Odaberite nekoliko jasnih okusa

Krenite s jednim pršutom ili drugim suhomesnatim proizvodom koji želite istaknuti. Dodajte jedan blaži sir i jedan izraženiji, prema onome što gosti vole. Nema potrebe da svaki proizvod bude snažan i slan; malo razlike čini posluživanje zanimljivijim.

Ako je na stolu i glavno jelo, početna kupnja za četiri odrasle osobe može biti oko 200 g pršuta i 200 g sira ukupno, uz kruh i dodatke. To je ilustrativan plan predjela, ne fiksna porcija. Za platu kao večeru treba drukčije planirati.

#### Dodajte nešto svježe i nešto hrskavo

Narezano povrće, nekoliko maslina i komad kruha mogu biti dovoljni. Suhe smokve ili bademi imaju smisla ako ih društvo voli; nisu obvezna dekoracija koju na kraju nitko ne pojede.

Provjerite alergene kod sireva, kruha, orašastih plodova i namaza. Ako netko ima posebne prehrambene zahtjeve, odvojeno posluživanje može biti praktičnije od zajedničke velike daske.

#### Složite tako da se lako uzima

Pršut ne treba sabiti u visoku hrpu. Rasporedite ga u manje skupine, sireve narežite u oblike koji se lako uzimaju, a namaze stavite u zasebne posudice. Ostavite prostora za pribor.

#### Iznesite koliko se upravo jede

Za duže druženje dio ponude zadržite pravilno ohlađen i nadopunjavajte platu prema potrebi. Velika daska koja satima stoji na toploj terasi nije najbolji plan posluživanja.

**U Mecari provjerite aktualni izbor pršuta, sireva i dodataka te pitajte za rezanje i pakiranje prema broju gostiju.**

### EN — How to build a prosciutto and cheese board

A good sharing board does not need twenty different products. Prosciutto, two cheeses, bread and a few accompaniments can be a lovely beginning to an evening. First decide whether it is a starter or most of the meal.

#### Choose a few clear flavours

Start with one prosciutto or cured meat you want to feature. Add a milder cheese and a stronger one, based on what your guests enjoy. Every item does not need to be intense and salty; a little contrast makes the board more interesting.

If a main course follows, a starting shopping example for four adults is roughly 200 g of prosciutto and 200 g of cheese in total, plus bread and accompaniments. This is an illustrative starter plan, not a fixed serving standard. A board served as dinner needs a different calculation.

#### Add something fresh and something crisp

Cut vegetables, a few olives and some bread may be enough. Dried figs or almonds make sense if people enjoy them, rather than as decorations left behind at the end.

Check allergens in cheese, bread, nuts and spreads. For guests with specific dietary requirements, separate serving dishes may be more practical than one large mixed board.

#### Make it easy to serve

Avoid stacking all the prosciutto in one dense pile. Arrange smaller groups, cut cheese into manageable pieces and put spreads in their own little bowls. Leave room for serving utensils.

#### Bring out what people are eating

For a longer gathering, keep part of the selection appropriately chilled and replenish the board as needed. Leaving one large board on a warm terrace for hours is not a good serving plan.

**Ask Mecara about the current cured meat and cheese selection, and discuss slicing and packing for your group.**

## K03 — Nedjeljno pečenje

**HR slug:** meso-za-nedjeljno-pecenje  
**EN slug:** planning-a-sunday-meat-roast  
**HR title:** Meso za nedjeljno pečenje: kako isplanirati ručak  
**EN title:** Planning a Sunday Roast: Meat, Sides and Timing  
**HR meta:** Planirajte nedjeljno pečenje prema broju gostiju, posudi i vremenu koje imate. Odaberite komad mesa i priloge koji mogu zajedno na stol.  
**EN meta:** Plan a Sunday roast around your guests, oven and available time. Choose a suitable cut and organise sides so the meal comes together.  
**HR pojmovi:** meso za nedjeljno pečenje; obiteljski ručak, meso za pećnicu.  
**EN keywords:** planning a Sunday roast; meat for roasting, family roast dinner.  
**Izvadak HR:** Najkorisniji dodatak nedjeljnom ručku često je mali plan na papiru.  
**Excerpt EN:** The most useful ingredient in a relaxed Sunday lunch may be a short plan on paper.  
**Slika:** `roast meat potatoes family table`; alt prilagoditi vrsti mesa, npr. Pečenje s krumpirom na pladnju za posluživanje / Roast meat and potatoes on a serving platter.  
**Poveznice:** K01 peka; T01 piletina; kontakt.  
**Tip:** vodič planiranja, bez Recipe markupa.

### HR — Meso za nedjeljno pečenje: kako isplanirati ručak

Nedjeljni ručak ne mora značiti da cijelo jutro trčite između pećnice i trgovine. Kada unaprijed odaberete komad mesa, priloge i vrijeme posluživanja, priprema postaje mnogo mirnija.

#### Prvo pogledajte posudu, zatim birajte meso

Veliki komad koji ne stane u posudu ili gotovo dodiruje gornji grijač nije praktična kupnja. Provjerite dimenzije, imate li poklopac i treba li meso biti s kosti ili bez nje. Fotografija blagdanskog pečenja nije zamjena za provjeru vlastite pećnice.

Mesaru recite kakvu pripremu želite: dulje poklopljeno pečenje, manje komade ili odreske koji se pripremaju brže. Za svaku od tih večera izbor može biti drukčiji.

#### Računajte cijeli jelovnik

Ako prije mesa dolaze juha i obilno predjelo, glavne porcije mogu biti manje. Kada je pečenje gotovo cijeli ručak, potreban je drugačiji plan. U broj gostiju uključite djecu i njihove navike, ne samo broj stolica.

Dogovorite i tko donosi priloge. Dvije velike zdjele krumpira uz isti ručak često znače da se nitko nije čuo na vrijeme.

#### Složite raspored unatrag

Pođite od sata kada želite sjesti za stol. Ostavite vrijeme za pripremu, okvirno pečenje, provjeru gotovosti i potreban odmor mesa. Deblji komad ne treba planirati kao tanki odrezak samo zato što oboje ide u pećnicu.

Ako krumpir dijeli posudu s mesom, pratite oboje. Jedna namirnica može biti gotova prije druge, pa imajte spremnu dodatnu posudu.

#### Ne dodajte novo jelo u posljednjoj minuti

Jedan dobro odabran prilog i salata obično su praktičniji od tri napola završena dodatka. Za konkretan recept možete početi našom piletinom s krumpirom i limunom.

**Za veći komad mesa ili poseban datum javite se Mecari unaprijed i provjerite dostupnost te željeno rezanje.**

### EN — Planning a Sunday roast: meat, sides and timing

A Sunday lunch does not have to mean spending the whole morning rushing between the oven and the shops. Choose the meat, sides and serving time in advance, and the cooking becomes easier to organise.

#### Look at the roasting dish before buying the meat

A joint that does not fit the pan or sits almost against the oven's upper element is not a practical purchase. Check dimensions, whether you have a lid and whether you want bone-in or boneless meat. An attractive roast in a photograph is not a substitute for checking your own oven.

Tell the butcher how you want to cook: a longer covered roast, smaller pieces or cuts that cook more quickly. Each plan may call for something different.

#### Count the whole menu

If soup and a substantial starter come first, the main portions may be smaller. A lunch built almost entirely around the roast needs a different plan. Count children and their preferences rather than simply counting chairs.

Agree who is bringing the sides as well. Two large bowls of potatoes often mean nobody checked with anyone else.

#### Work backwards from serving time

Start with the time you want everyone at the table. Allow for preparation, approximate cooking, checking doneness and any necessary resting period. A thick joint cannot be scheduled like a thin steak simply because both go into an oven.

If potatoes share the roasting dish, watch both components. One may finish before the other, so keep another dish available.

#### Resist an extra last-minute dish

One well-chosen side and a salad are often more practical than three unfinished extras. For a complete recipe to start with, try our chicken with potatoes and lemon.

**Contact Mecara in advance for a larger piece of meat or a special date, and check availability and cutting requirements.**

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
**Izvadak HR:** Prije kupnje za večeru pogledajte što stvarno imate u kuhinji apartmana.  
**Excerpt EN:** Before shopping for dinner, check what your holiday kitchen actually contains.  
**Slika:** `cooking apartment kitchen fresh ingredients`; alt: Namirnice pripremljene za kuhanje u manjoj kuhinji / Ingredients ready for cooking in a small kitchen.  
**Poveznice:** G02 nazivi; T03 brzi ručak; kontakt. Bez tvrdnje da je stock kuhinja u Dubrovniku.

### HR — Kupnja mesa u Dubrovniku kada kuhate u apartmanu

Večera u apartmanu može biti ugodan predah od izlazaka. Za dobar obrok ne treba velika kuhinja, ali prije kupnje vrijedi provjeriti imate li tavu, pećnicu, oštar nož i dovoljno prostora u hladnjaku.

#### Kupujte prema opremi koju imate

Ako na raspolaganju imate malu tavu i dvije ploče, jednostavno jelo od trakica mesa može biti praktičnije od velikog pečenja. Roštilj na fotografiji smještaja također prvo provjerite s domaćinom: smije li se koristiti, čime radi i imate li potreban pribor?

Kada znate opremu, lakše ćete objasniti mesaru što trebate. Navedite i broj ljudi, posebno ako želite odreske približno jednake veličine.

#### Razjasnite rez i jedinicu prodaje

U mesnici cijena može biti navedena po kilogramu, a tražena količina manja od kilograma. Provjerite kupujete li cijeli komad, porciju ili proizvod na vagu. Kod mesa s kosti težina uključuje i kost.

Ako strani naziv reza nije jasan, pokažite recept ili fotografiju. Dvije slične riječi na različitim jezicima ne moraju označavati isti dio mesa.

#### Za gotov ručak pitajte izravno

Marinirano i pripremljeno za pečenje ne znači spremno za jelo. Provjerite treba li proizvod tek kuhati, peći ili samo podgrijati. Za začinjene proizvode raspitajte se i o sastojcima, osobito ako netko izbjegava određene namirnice.

#### Ostavite kupnju mesa za kraj

Planirajte povratak u smještaj nakon kupnje, a ne još nekoliko sati razgledavanja. Rashladna torba može pomoći tijekom prijevoza, ali ne zamjenjuje hladnjak. Hranu spremite prema uputama na proizvodu.

**Mecara se nalazi u centru DOC u Lapadu, na Kralja Tomislava 7. Prije odlaska provjerite aktualno radno vrijeme i dostupnost željenog mesa.**

### EN — Buying meat in Dubrovnik for a self-catering stay

Dinner at your holiday apartment can be a welcome break from eating out. You do not need a large kitchen, but check that you have a frying pan, oven, useful knife and enough fridge space before shopping.

#### Buy for the equipment you actually have

With a small pan and two cooking rings, a straightforward beef-strip dish may be easier than a large roast. If your rental shows a barbecue in its photos, ask the host whether you may use it, how it is fuelled and which utensils are provided.

Once you know the equipment, explain your plans to the butcher. Give the number of people too, especially if you want individual steaks of a similar size.

#### Check the cut and the pricing unit

At the counter, a price may be shown per kilogram even when you buy a smaller amount. Check whether you are choosing a whole piece, a portion or a product sold by weight. Bone-in meat includes the weight of the bone.

If a cut name is unfamiliar, show your recipe or a picture. Similar words in different countries do not always describe the same piece.

#### Ask whether a product needs cooking

Marinated or prepared for cooking does not mean ready to eat. Check whether an item needs cooking, roasting or reheating. Ask about the ingredients of seasoned products, especially if someone in your group avoids particular foods.

#### Make meat your last shopping stop

Plan to return to your accommodation after buying chilled food rather than continuing sightseeing for several hours. An insulated bag can help during transport, but it does not replace refrigeration. Follow the product's storage instructions.

**Find Mecara inside the DOC shopping centre in Lapad, at Kralja Tomislava 7. Check current opening hours and the availability of your preferred cut before visiting.**

## G02 — Mali rječnik mesnice

**HR slug:** cevapi-pljeskavica-peka-prsut-vodic  
**EN slug:** cevapi-pljeskavica-peka-prsut-guide  
**HR title:** Ćevapi, pljeskavica, peka i pršut: mali vodič  
**EN title:** Ćevapi, Pljeskavica, Peka and Pršut Explained  
**HR meta:** Mali vodič kroz nazive koje susrećete u mesnici i na stolu: ćevapi, pljeskavica, peka i pršut, uz pitanja koja vrijedi postaviti.  
**EN meta:** What are ćevapi, pljeskavica, peka and pršut? Understand these familiar Croatian food names and what to ask before buying or cooking.  
**HR pojmovi:** ćevapi pljeskavica razlika; što je peka, pršut.  
**EN keywords:** what are cevapi; pljeskavica, what is peka, Croatian prsut.  
**Izvadak HR:** Četiri poznata naziva ne označavaju istu vrstu proizvoda ni isti način pripreme.  
**Excerpt EN:** These four familiar names describe different foods and even different cooking methods.  
**Slika:** `cevapi grilled plate`; alt: Pečeni ćevapi posluženi uz luk i kruh / Grilled ćevapi served with onion and bread.  
**Poveznice:** K01 peka; K02 plata; M03 mljeveno. Izvor konteksta peke: S8.

### HR — Ćevapi, pljeskavica, peka i pršut: mali vodič za stol

Kada kupujete za goste iz inozemstva, često se pokaže da je najkorisniji dodatak jelovniku kratko objašnjenje naziva. Ove četiri riječi redovito se pojavljuju u razgovoru o hrani, ali ne označavaju sve gotova jela.

#### Ćevapi: mali komadi mljevenog mesa za pečenje

Ćevapi su oblikovani komadi začinjenog mljevenog mesa. Točan sastav nije isti kod svakog proizvođača, zato se vrsta mesa ne pretpostavlja prema imenu. U mesnici ih možete kupiti sirove za pripremu, a u restoranu kao gotovo jelo.

Za goste je dovoljno objasniti što kupujete i kako će se pripremati. Za sastojke i alergene provjerite konkretan proizvod.

#### Pljeskavica: širi oblik, više mogućih izvedbi

Pljeskavica je oblikovana od mljevenog mesa u plosnatiji, širi komad. Može biti jednostavna, začinjena na različite načine ili punjena. Naziv sam po sebi ne govori sadrži li sir ili druge dodatke.

Ne treba je uvijek prevoditi samo kao hamburger: pecivo i način posluživanja nisu sastavni dio svakog proizvoda.

#### Peka: način pripreme

Peka označava poklopac i način pečenja pod njim, uz žar. Ispod peke mogu se pripremati različite namirnice. „Meso za peku“ u mesnici zato ne znači da je ručak već pečen, nego da kupujete meso za takvu pripremu.

#### Pršut: suhomesnati dio plate

Pršut se obično poslužuje tanko narezan, često uz sir i kruh. Za podrijetlo i proizvođača pogledajte deklaraciju, a pri kupnji navedite želite li narezan proizvod ili komad.

Najjednostavnije pitanje koje rješava mnogo nesporazuma glasi: **Je li ovo spremno za jelo ili se tek priprema?** Sljedeće je pitanje o sastojcima, osobito ako za stolom postoje prehrambena ograničenja.

**U Mecari pitajte za aktualne proizvode i njihovu namjenu, a ideju za posluživanje potražite u našem vodiču za platu pršuta i sira.**

### EN — Ćevapi, pljeskavica, peka and pršut explained

When you cook in Croatia, a short explanation of a food name can be more useful than a long shopping list. These four words often come up at the butcher or around the table, but they do not all mean ready-made dishes.

#### Ćevapi: small seasoned minced-meat pieces

Ćevapi are shaped pieces of seasoned minced meat for cooking. The blend varies between producers, so the name does not guarantee which meats are included. At a butcher's shop, you may buy them raw; at a restaurant, they arrive as a cooked meal.

Ask about the particular product's ingredients and allergens rather than assuming every version uses the same recipe.

#### Pljeskavica: a larger, flatter patty

Pljeskavica is shaped from minced meat into a broader, flatter piece. It may be plain, seasoned in different ways or stuffed. The name alone does not tell you whether it contains cheese or other additions.

Calling it a burger can help explain its shape, but a bun and burger-style serving are not part of every version.

#### Peka: a cooking method

Peka refers to a lid and the method of cooking beneath it with embers. Different ingredients can be prepared this way. If a butcher sells meat for peka, that means meat intended for the method, not a finished roasted lunch.

#### Pršut: cured ham for sharing

Pršut is dry-cured ham, commonly served in thin slices with cheese and bread. Check the product information for its origin and producer, and specify whether you would like it sliced or as a piece.

One question prevents many misunderstandings: **Is this ready to eat, or does it still need cooking?** Follow it with a question about ingredients if anyone in your group has dietary requirements.

**Ask Mecara about the current products and how they are intended to be used. For a simple serving idea, read our prosciutto and cheese board guide.**

## G03 — Roštilj u vili

**HR slug:** rostilj-u-vili-dubrovnik-planiranje  
**EN slug:** planning-villa-bbq-dubrovnik  
**HR title:** Roštilj u vili u Dubrovniku: plan kupnje i pripreme  
**EN title:** Planning a Villa BBQ in Dubrovnik  
**HR meta:** Organizirajte roštilj u vili ili apartmanu: provjerite opremu, broj gostiju, izbor mesa i vrijeme kupnje prije nego zapalite roštilj.  
**EN meta:** Plan a villa BBQ in Dubrovnik with a simple checklist for equipment, guest preferences, meat quantities and shopping arrangements.  
**HR pojmovi:** roštilj u vili Dubrovnik; meso za roštilj Dubrovnik.  
**EN keywords:** villa BBQ Dubrovnik; barbecue meat Dubrovnik, villa cooking.  
**Izvadak HR:** Od provjere roštilja do popisa za kupnju: mali plan za večeru na odmoru.  
**Excerpt EN:** From checking the barbecue to writing the shopping list: a simple plan for dinner on holiday.  
**Slika:** `villa terrace barbecue dinner table`; alt: Stol pripremljen za večeru na terasi / Table set for dinner on a terrace. Ne tvrditi da je generička vila u Dubrovniku.  
**Poveznice:** R01 količine; R03 pogreške; kontakt. Ne obećavati dostavu.

### HR — Kako organizirati roštilj u vili u Dubrovniku

Roštilj na odmoru najugodniji je kada nitko ne mora pet puta u trgovinu. Prije dogovora o mesu provjerite opremu s domaćinom i napravite jedan zajednički popis za kupnju.

#### Provjerite što smijete koristiti

Pitajte je li roštilj namijenjen gostima, kako se koristi i postoje li pravila objekta ili aktualna ograničenja za vatru. Drveni ugljen, plinski roštilj i električna ploča traže različitu pripremu. Upute domaćina i važeća lokalna pravila imaju prednost pred općenitim savjetom s bloga.

Provjerite imate li hvataljke, čiste pladnjeve, nož i odgovarajuće gorivo. Roštilj na ugljen koristi se isključivo na otvorenom, nikada u zatvorenom prostoru.

#### Složite jelovnik za konkretno društvo

Prebrojite odrasle i djecu te pitajte što ne jedu. Odaberite dvije ili tri vrste mesa, jedan konkretniji prilog i salatu. Tako je lakše upravljati i kupnjom i pečenjem.

Za deset odraslih s prilozima pogledajte naš primjer količina. Ako kupujete meso s kosti, tražite prilagodbu umjesto da kopirate izračun za file ili ćevape.

#### Dogovorite kupnju prije dana roštilja

Za posebne rezove i veću količinu provjerite dostupnost unaprijed. U upitu navedite datum, broj gostiju, proizvode i način rezanja. Ne planirajte večeru oko neprovjerene fotografije proizvoda.

Ako vam je potrebna dostava, pitajte postoji li mogućnost za vašu adresu. Mogućnost dostave, cijenu i termin dogovorite prije nego na tome temeljite plan večere.

#### Podijelite posao

Jedna osoba prati meso, druga priprema stol i priloge. Odvojite sirovu hranu od gotove i ostavite dovoljno prostora za rad. Više ljudi oko rešetke nije uvijek i brža priprema.

**Za nabavu mesa u Lapadu provjerite Mecarinu ponudu i kontaktirajte trgovinu prije veće kupnje.**

### EN — Planning a villa BBQ in Dubrovnik

A holiday barbecue is more enjoyable when nobody has to make five separate shopping trips. Before choosing the meat, check the equipment with your host and make one shared shopping list.

#### Check what you are allowed to use

Ask whether the barbecue is available to guests, how it works and whether property rules or current fire restrictions apply. Charcoal, gas and electric cooking need different preparation. Your host's instructions and applicable local rules take priority over general blog advice.

Check for tongs, clean serving plates, a knife and the appropriate fuel. Charcoal barbecues belong outdoors, never inside an enclosed space.

#### Build the menu around your group

Count adults and children, and ask what people do not eat. Choose two or three meats, one substantial side and a salad. This keeps both shopping and cooking easier to manage.

For ten adults with side dishes, see our sample quantity plan. If you are buying bone-in cuts, ask for an adjustment rather than copying the calculation for boneless meat.

#### Arrange the shopping in advance

For specific steaks or a larger quantity, check availability ahead of time. Include your date, guest count, product list and cutting preferences. Do not build the dinner around an unconfirmed product photo.

If you need delivery, ask whether it is available for your address rather than assuming it is included. Agree availability, charges and timing before building your evening around it.

#### Share the jobs

Let one person concentrate on the meat while another organises the table and sides. Keep raw food separate from cooked food and leave enough working space. More people gathered around the grill do not necessarily make cooking faster.

**For meat shopping in Lapad, check Mecara's selection and contact the shop before placing a larger request.**

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
**Izvadak HR:** Piletina, krumpir i nekoliko mirisnih dodataka za ručak iz jedne posude.  
**Excerpt EN:** Chicken, potatoes and a few fragrant ingredients for dinner from one roasting tray.  
**Slika:** `lemon chicken thighs potatoes rosemary tray bake`; mora prikazivati zabatke, ne samo pileći file. Alt: Pečeni pileći zabatci s krumpirom, limunom i ružmarinom / Roasted chicken thighs with potatoes, lemon and rosemary.  
**Poveznice:** K03 nedjeljno pečenje; G01 kupnja; ponuda piletine ako postoji.  
**Izvor sigurnosne provjere:** S7; rukovanje piletinom S13.

### HR — Piletina s krumpirom i limunom iz pećnice

Kada vam treba ručak bez mnogo lonaca, piletina i krumpir dobar su početak. Limun daje svježinu, ružmarin miris, a posuda za pečenje odradi najveći dio posla. Ovdje koristimo zabatke s kosti i kožom; pileći file nije izravna zamjena jer traži drugačije vrijeme pripreme.

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

#### Priprema korak po korak

1. Zagrijte pećnicu na 200 °C. Krumpir operite ili ogulite i narežite na komade od približno 2–3 cm. Posuda treba biti dovoljno velika da sastojci ne budu složeni u debeli višestruki sloj.
2. Krumpir pomiješajte s jednom žlicom ulja, dijelom soli i paprom. Rasporedite ga po posudi, dodajte zgnječene režnjeve češnjaka i ružmarin te ulijte vodu uz rub.
3. Piletinu posušite papirnatim ručnikom; sirovu piletinu nemojte prati. Premažite preostalim uljem, posolite i popaprite. Stavite je kožom prema gore između krumpira.
4. Polovicu limuna narežite na kriške i rasporedite uz meso. Drugu polovicu ostavite za posluživanje, kako jelo na kraju ne bi bilo kiselije nego što želite.
5. Pecite okvirno 40–50 minuta. Nakon otprilike pola sata promiješajte krumpir, bez okretanja piletine kožom prema dolje. Ako se posuda presuši, dodajte malo vode uz rub.
6. Provjerite piletinu termometrom u najdebljem dijelu, bez dodirivanja kosti: treba dosegnuti najmanje 74 °C. Provjerite i krumpir. Ako je jedno gotovo prije drugoga, izvadite gotovi dio čistim priborom i nastavite peći ostatak.

#### Posluživanje

Dodajte limunov sok prema ukusu tek na tanjuru. Uz ovakav ručak dovoljna je zelena salata ili zdjela svježih rajčica. Ako ne volite ružmarin, zamijenite ga s malo timijana.

Kod većeg broja porcija radije koristite dvije posude nego da sve složite jednu preko druge. Vrijeme pripreme može se promijeniti, pa termometar ostaje važniji od broja minuta.

**Za današnji ručak provjerite Mecarinu ponudu piletine i zatražite zabatke s kosti.**

### EN — Lemon chicken and potato traybake

When you want dinner without a pile of pans, chicken and potatoes are a useful starting point. Lemon adds freshness, rosemary brings fragrance and the roasting tray does most of the work. This version uses bone-in, skin-on thighs; chicken breast is not a direct substitution because it needs different timing.

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

1. Heat a conventional oven to 200°C. Wash or peel the potatoes and cut them into pieces roughly 2–3 cm across. Choose a tray large enough to avoid a deep, crowded layer.
2. Toss the potatoes with one tablespoon of oil, some of the salt and pepper. Spread them in the tray, add the crushed garlic cloves and rosemary, then pour the water around the edge.
3. Pat the chicken dry with kitchen paper; do not wash raw chicken. Rub with the remaining oil and seasoning. Place skin-side up between the potatoes.
4. Slice half the lemon and tuck the slices around the meat. Keep the other half for serving so you can control the final acidity.
5. Roast for approximately 40–50 minutes. After about half an hour, turn the potatoes without turning the chicken skin-side down. Add a little water at the edge if the tray becomes dry.
6. Check the thickest part of the chicken with a thermometer, away from the bone: it should reach at least 74°C. Check that the potatoes are tender too. If one component is ready first, remove it with clean utensils and continue cooking the other.

#### To serve

Add a little lemon juice at the table if you like. A green salad or fresh tomatoes are enough alongside. If rosemary is not your favourite, use a little thyme instead.

For a larger group, use two trays rather than stacking everything. Cooking time may change, so the thermometer matters more than the clock.

**For tonight's dinner, check Mecara's chicken selection and ask about bone-in thighs.**

## T02 — Mesne okruglice u rajčici

**HR slug:** mesne-okruglice-umak-rajcica  
**EN slug:** beef-meatballs-tomato-sauce  
**HR title:** Mesne okruglice u umaku od rajčice — recept  
**EN title:** Beef Meatballs in Tomato Sauce — Recipe  
**HR meta:** Pripremite juneće mesne okruglice u umaku od rajčice za četiri osobe. Jednostavan ručak uz tjesteninu, palentu ili pire.  
**EN meta:** Make beef meatballs in tomato sauce for four. Follow the ingredient list and clear steps, then serve with pasta, polenta or mashed potatoes.  
**HR pojmovi:** mesne okruglice u umaku od rajčice; okruglice od junetine, ideja za ručak.  
**EN keywords:** beef meatballs in tomato sauce; meatball recipe, family dinner.  
**Izvadak HR:** Okruglice i umak koji se dobro slažu s onim što već imate za prilog.  
**Excerpt EN:** Tender meatballs and a tomato sauce to serve with the side dish you already have.  
**Slika:** `beef meatballs tomato sauce parsley`; alt: Mesne okruglice u umaku od rajčice s peršinom / Meatballs in tomato sauce topped with parsley.  
**Poveznice:** M03 mljeveno; T01 drugi recept; ponuda.  
**Izvor sigurnosne provjere:** S7.

### HR — Mesne okruglice u umaku od rajčice

Ovaj je ručak zahvalan jer prilog možete birati prema onome što imate kod kuće. Tjestenina, palenta ili pire dobro pristaju uz umak, a okruglice se pripremaju od jednostavne smjese bez velikog popisa začina.

**Porcije:** 4  
**Priprema:** oko 20 minuta  
**Kuhanje:** oko 25–30 minuta  
**Ukupno:** oko 45–50 minuta, bez zasebne pripreme priloga  
**Alergeni u ovoj verziji:** jaje, gluten iz krušnih mrvica; provjeriti i ostale deklaracije.

#### Sastojci za okruglice

- 600 g mljevene junetine;
- 1 jaje;
- 40 g krušnih mrvica;
- 50 ml vode;
- 1 manji luk, oko 80 g, sitno nariban;
- 1 žlica nasjeckanog peršina;
- pola žličice soli, prema ukusu;
- papar.

#### Sastojci za umak

- 700 ml pasirane rajčice;
- 150 ml vode;
- 2 režnja češnjaka, sitno nasjeckana;
- 1 žlica maslinova ulja;
- pola žličice suhog origana;
- sol i papar prema ukusu.

#### Priprema

1. Mrvice prelijte s 50 ml vode i ostavite nekoliko minuta. Dodajte junetinu, jaje, luk, peršin i začine. Promiješajte samo koliko je potrebno da se sastojci povežu.
2. Oblikujte 16 približno jednakih okruglica. Ako je smjesa mekana, kratko je stavite u hladnjak dok počinjete umak.
3. U široj posudi zagrijte ulje. Dodajte češnjak i kratko ga promiješajte bez tamnjenja. Ulijte rajčicu i 150 ml vode te dodajte origano. Zagrijte do laganog vrenja.
4. Okruglice pažljivo rasporedite u umak. Poklopite i lagano kuhajte oko 20–25 minuta, uz povremeno nježno pomicanje posude i okretanje okruglica čistim priborom. Ne miješajte naglo dok su mekane.
5. Ako je umak pregust, dodajte malo vode. Ako je prerijedak, pred kraj kratko kuhajte otklopljeno. Najveće okruglice provjerite termometrom: sredina treba dosegnuti najmanje 71 °C. Po potrebi nastavite kuhati.
6. Kušajte umak i tek tada dovršite začinjavanje. Poslužite uz odabrani, zasebno pripremljeni prilog.

#### Mali detalj koji olakšava pripremu

Jednaka veličina okruglica važnija je od savršenog oblika. Velike i male okruglice u istoj posudi neće biti gotove u isto vrijeme. Za djecu ih možete posluživati prepolovljene nakon kuhanja, umjesto da u istoj turi radite različite veličine.

Ovo nije bezglutenski recept. Ako koristite zamjenske sastojke, provjerite njihove deklaracije i uvjete pripreme, a ne samo naziv na pakiranju.

**Za kupnju prvo pogledajte vodič o odabiru mljevenog mesa, pa provjerite što je dostupno u Mecari.**

### EN — Beef meatballs in tomato sauce

This is a useful dinner when you want to choose the side dish from whatever is already in the kitchen. Pasta, polenta and mashed potatoes all work with the sauce, while the meatballs use a straightforward mixture without a long list of seasonings.

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

1. Pour 50 ml water over the breadcrumbs and leave for a few minutes. Add the beef, egg, onion, parsley and seasoning. Mix just enough to combine.
2. Shape into 16 similar-sized meatballs. If the mixture feels soft, put it briefly in the fridge while you start the sauce.
3. Heat the oil in a wide pan. Add the garlic and stir briefly without letting it brown. Add the passata, 150 ml water and oregano, then bring to a gentle simmer.
4. Carefully place the meatballs in the sauce. Cover and simmer gently for about 20–25 minutes, occasionally moving the pan and turning the meatballs carefully with clean utensils. Avoid vigorous stirring while they are soft.
5. Add a little water if the sauce becomes too thick. If it is thin, cook uncovered briefly towards the end. Check the largest meatballs with a thermometer: the centre should reach at least 71°C. Continue cooking if needed.
6. Taste and adjust the sauce seasoning, then serve with your separately prepared side dish.

#### A detail that makes cooking easier

Similar size matters more than a perfectly round shape. Large and small meatballs in the same pan will not cook on the same schedule. If you want smaller pieces for children, halve them after cooking rather than making mixed sizes in one batch.

This recipe is not gluten-free. If you substitute ingredients, check their labels and preparation conditions rather than relying only on a product name.

**Before shopping, read our guide to choosing mince, then ask about Mecara's current selection.**

## T03 — Juneće trakice s gljivama

**HR slug:** junece-trakice-gljive-tava  
**EN slug:** beef-strips-mushrooms-one-pan  
**HR title:** Juneće trakice s gljivama — ručak iz tave  
**EN title:** Beef Strips with Mushrooms — A One-Pan Dinner  
**HR meta:** Pripremite juneće trakice s gljivama i laganim umakom za četiri osobe. Odaberite meso za brzu pripremu i poslužite uz rižu ili pire.  
**EN meta:** Cook beef strips with mushrooms and a simple pan sauce for four. Choose a quick-cooking cut and serve with rice or mashed potatoes.  
**HR pojmovi:** juneće trakice s gljivama; brzi ručak s junetinom, što danas kuhati.  
**EN keywords:** beef strips with mushrooms; quick beef dinner, one pan beef.  
**Izvadak HR:** Brzi ručak počinje pravim komadom junetine i pečenjem u manjim turama.  
**Excerpt EN:** A quick beef dinner starts with the right cut and cooking in small batches.  
**Slika:** `beef strips mushrooms skillet sauce`; alt: Juneće trakice i gljive u tavi s umakom / Beef strips and mushrooms in a pan with sauce.  
**Poveznice:** M02 razlika prema gulašu; M01 rezovi; ponuda.  
**Izvori:** S1 za temeljitu termičku obradu, S3 za odabir reza. Izvorni recept, bez tvrdnje o testiranju.

### HR — Juneće trakice s gljivama za ručak iz jedne tave

Kada želite junetinu, a nemate vremena za dugo kuhanje, izbor reza posebno je važan. Za ovaj recept tražite komad prikladan za kratku pripremu na tavi, primjerice odgovarajući ramstek. Meso za gulaš nije ravnopravna zamjena samo zato što je narezano sitnije.

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

1. Šampinjone očistite i narežite, luk narežite na tanke ploške, a češnjak usitnite. Ako meso režete sami, režite poprečno na vlakna. Trakice posušite i lagano začinite.
2. U tavi zagrijte jednu žlicu ulja. Meso kratko zapecite u dvije ili tri ture, tako da dobije boju. U ovoj fazi ne mora biti potpuno gotovo. Premjestite ga u zasebnu posudu namijenjenu nastavku pripreme, ne na završni pladanj za serviranje.
3. Dodajte preostalo ulje i luk. Pirjajte oko 4–5 minuta, zatim dodajte gljive. Pecite još oko 6–8 minuta, dok omekšaju i dio tekućine ispari. Dodajte češnjak i kratko promiješajte.
4. Ulijte temeljac, umiješajte senf i lagano ostružite zapečene tragove s dna. Škrob pomiješajte sa žlicom hladne vode i dodajte u umak. Kratko kuhajte da se blago zgusne.
5. Vratite meso i sokove u tavu. Lagano dovršite kuhanje. Za ovu verziju potpuno kuhanih trakica provjerite najdeblji komad čistom tankom sondom: cilj je najmanje 75 °C tijekom 30 sekundi. Vrijeme ovisi o debljini i početnom zapecanju; nemojte se oslanjati samo na boju.
6. Dodajte peršin, kušajte i po potrebi dosolite. Poslužite uz kuhanu rižu ili pire koje ste pripremili zasebno.

#### Ako nemate odgovarajući rez

Nemojte pokušavati tvrđi komad omekšati s još nekoliko minuta jake vatre. Za takvo meso odaberite sporije pirjanje i recept koji je tome namijenjen. Upravo zato vrijedi reći mesaru koliko vremena imate za ručak.

**U Mecari pitajte za junetinu prikladnu za trakice i kratku pripremu na tavi te provjerite mogućnost rezanja.**

### EN — Beef strips with mushrooms for a one-pan dinner

When you want beef but do not have time for slow cooking, the cut matters. Ask for meat suited to quick pan cooking, such as an appropriate striploin piece. Stewing beef is not an equivalent substitute simply because it is cut into smaller pieces.

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

1. Clean and slice the mushrooms, thinly slice the onion and chop the garlic. If cutting the beef yourself, slice across the grain. Pat the strips dry and season lightly.
2. Heat one tablespoon of oil in the pan. Brown the beef briefly in two or three batches. It does not need to be fully cooked at this stage. Transfer it to a separate holding dish for continued preparation, not the final serving platter.
3. Add the remaining oil and onion. Cook for about 4–5 minutes, then add the mushrooms. Cook for another 6–8 minutes until softened and some of the liquid has evaporated. Add the garlic and stir briefly.
4. Pour in the stock, stir in the mustard and gently loosen the browned pieces from the bottom. Mix the cornflour with the tablespoon of cold water and add it to the sauce. Simmer briefly to thicken slightly.
5. Return the beef and its juices to the pan and finish cooking gently. For this fully cooked version, check the thickest strip with a clean fine-tip thermometer: aim for at least 75°C for 30 seconds. Timing depends on thickness and the initial sear, so do not rely on colour alone.
6. Add the parsley, taste and adjust the seasoning. Serve with rice or mashed potatoes prepared separately.

#### If you have a different cut

Do not try to soften a tougher piece by adding a few more minutes over fierce heat. Choose a slow-cooked dish designed for that meat instead. This is why telling the butcher how much time you have can be so useful.

**Ask Mecara about beef suited to quick-cooking strips and whether it can be cut for you.**

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
