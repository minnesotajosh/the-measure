// Plain data helpers shared by the EJS templates in templates/ -- URL
// lookups and small constants, not markup. The markup itself lives in the
// templates now, not in string-concatenating JS functions.

// The same brand-homepage dictionary used in app.js, kept in sync by hand
// (small and stable enough that a shared-module refactor isn't worth the
// risk of touching the working interactive SPA under time pressure).
const BRAND_URLS = {
  "Brooks Brothers":"https://www.brooksbrothers.com","J. Press":"https://jpressonline.com",
  "Ralph Lauren":"https://www.ralphlauren.com","O'Connell's":"https://www.oconnellsclothing.com",
  "Alden":"https://www.aldenshoe.com","G.H. Bass Weejuns":"https://www.ghbass.com",
  "Rowing Blazers":"https://rowingblazers.com","Rubinacci":"https://www.rubinacci.it",
  "Kiton":"https://www.kiton.it","Cesare Attolini":"https://www.cesareattolini.com",
  "Isaia":"https://www.isaia.it","Boglioli":"https://www.boglioli.it",
  "Anglo-Italian":"https://anglo-italian.com","Anderson & Sheppard":"https://www.anderson-sheppard.co.uk",
  "Henry Poole & Co.":"https://www.henrypoole.com","Huntsman":"https://www.huntsmansavilerow.com",
  "Gieves & Hawkes":"https://www.gievesandhawkes.com","Turnbull & Asser":"https://www.turnbullandasser.com",
  "Drake's":"https://www.drakes.com","Crockett & Jones":"https://www.crockettandjones.com",
  "Carhartt":"https://www.carhartt.com","Filson":"https://www.filson.com",
  "Levi's":"https://www.levi.com","Levi's Vintage Clothing":"https://www.levi.com",
  "Red Wing":"https://www.redwingshoes.com","Red Wing Shoes":"https://www.redwingshoes.com",
  "Iron Heart":"https://ironheart.co.uk","Pointer Brand":"https://pointerbrand.com",
  "Freenote Cloth":"https://freenotecloth.com","COS":"https://www.cos.com",
  "Norse Projects":"https://www.norseprojects.com","Our Legacy":"https://www.ourlegacy.com",
  "A Kind of Guise":"https://www.akindofguise.com","Acne Studios":"https://www.acnestudios.com",
  "Sunspel":"https://www.sunspel.com","Arket":"https://www.arket.com",
  "A.P.C.":"https://www.apc-us.com","Officine Générale":"https://officinegenerale.com",
  "Arpenteur":"https://www.arpenteur.fr","Husbands Paris":"https://husbandsparis.com",
  "Margaret Howell":"https://www.margarethowell.co.uk","Le Mont Saint Michel":"https://www.lemontsaintmichel.fr",
  "Gucci":"https://www.gucci.com","Etro":"https://www.etro.com",
  "Duncan Quinn":"https://duncanquinn.com","Ozwald Boateng":"https://ozwaldboateng.co.uk",
  "Paul Smith":"https://www.paulsmith.com","Barbour":"https://www.barbour.com",
  "Barbour International":"https://www.barbour.com","Cordings":"https://www.cordings.co.uk",
  "Purdey":"https://www.purdey.com","Alan Paine":"https://www.alanpaine.co.uk",
  "L.L. Bean":"https://www.llbean.com","Orvis":"https://www.orvis.com",
  "Private White V.C.":"https://www.privatewhitevc.com","Yohji Yamamoto":"https://www.yohjiyamamoto.co.jp",
  "Comme des Garçons":"https://www.comme-des-garcons.com","Rick Owens":"https://rickowens.eu",
  "Acronym":"https://acrnm.com","Arc'teryx Veilance":"https://www.arcteryx.com/veilance",
  "Arc'teryx":"https://www.arcteryx.com","Boris Bidjan Saberi":"https://www.borisbidjansaberi.com",
  "Sacai":"https://www.sacai.jp","Kith":"https://kith.com","Aimé Leon Dore":"https://aimeleondore.com",
  "Fear of God":"https://fearofgod.com","Noah":"https://noahny.com","Kapital":"https://kapital.jp",
  "Rockmount Ranch Wear":"https://www.rockmount.com","Wrangler":"https://www.wrangler.com",
  "Tecovas":"https://tecovas.com","Stetson":"https://www.stetson.com",
  "Pendleton":"https://pendleton-usa.com","Ariat":"https://www.ariat.com",
  "Kemo Sabe":"https://kemosabe.com","Schott NYC":"https://schottnyc.com",
  "Lewis Leathers":"https://lewisleathers.com","Vans":"https://www.vans.com",
  "Stüssy":"https://www.stussy.com","Katin":"https://www.katin.com",
  "Rhythm":"https://rhythmlivin.com","Patagonia":"https://www.patagonia.com",
  "Vissla":"https://www.vissla.com","Brioni":"https://www.brioni.com",
  "Ermenegildo Zegna":"https://www.zegna.com","Charvet":"https://www.charvet.com",
  "Versace":"https://www.versace.com","Fendi":"https://www.fendi.com",
  "Dolce & Gabbana":"https://www.dolcegabbana.com","Amiri":"https://amiri.com",
  "Balenciaga":"https://www.balenciaga.com","Loro Piana":"https://www.loropiana.com",
  "120% Lino":"https://www.120lino.com","Orlebar Brown":"https://www.orlebarbrown.com",
  "Aspesi":"https://www.aspesi.com","Fred Perry":"https://www.fredperry.com",
  "Ben Sherman":"https://www.bensherman.com","Baracuta":"https://www.baracuta.com",
  "Merc London":"https://merclondon.com","John Smedley":"https://www.johnsmedley.com",
  "Gloverall":"https://gloverall.com","Alex Mill":"https://alexmill.com",
  "Universal Works":"https://www.universalworks.co.uk","Belstaff":"https://www.belstaff.com",
  "Aigle":"https://www.aigle.com","Story Mfg.":"https://www.story-mfg.com",
  "YMC":"https://youmustcreate.com","De Bonne Facture":"https://www.debonnefacture.fr",
  "Saint Laurent":"https://www.ysl.com","Chrome Hearts":"https://chromehearts.com",
  "John Varvatos":"https://www.johnvarvatos.com","Vineyard Vines":"https://www.vineyardvines.com",
  "Sperry":"https://www.sperry.com","Saint James":"https://www.saint-james.fr",
  "Armor Lux":"https://www.armorlux.com","J.Crew":"https://www.jcrew.com",
  "Cottweiler":"https://cottweiler.com","1017 ALYX 9SM":"https://alyxstudio.com",
  "Heliot Emil":"https://heliotemil.com","Diesel":"https://www.diesel.com",
  "Alpha Industries":"https://www.alphaindustries.com","Nigel Cabourn":"https://www.nigelcabourn.com",
  "Dickies":"https://www.dickies.com","Dr. Martens":"https://www.drmartens.com",
  "Champion":"https://www.champion.com","Mitchell & Ness":"https://www.mitchellandness.com",
  "New Balance":"https://www.newbalance.com","Nike":"https://www.nike.com",
  "Adidas Originals":"https://www.adidas.com","Starter":"https://www.starter.com",
  "Snow Peak":"https://www.snowpeak.com","Salomon":"https://www.salomon.com",
  "Norrøna":"https://www.norrona.com","And Wander":"https://www.and-wander.com",
  "Hermès":"https://www.hermes.com","Church's":"https://www.church-footwear.com",
  "Anine Bing":"https://www.aninebing.com"
};
function brandUrl(name){
  return BRAND_URLS[name.replace(/\s*\([^)]*\)\s*$/, '').trim()] || null;
}

function shopSearchUrl(pick){
  return 'https://www.google.com/search?q=' + encodeURIComponent(pick + ' buy');
}

const LIFE_LABELS = {
  travel: "Where They'd Go", reading: "What They'd Read", music: "What They'd Listen To",
  home: "How They'd Furnish a Room", pastimes: "How They'd Spend a Saturday"
};
// Travel is featured on its own, with its photo, above the grid -- the
// remaining four form a plain single-column, four-row list.
const LIFE_GRID_ORDER = ['reading','music','home','pastimes'];
// Each links out to whichever real service actually fits it, built from a
// short search query. Pastimes has no outbound link.
const LIFE_LINKS = {
  reading: { label: 'Find it on Amazon', build: q => 'https://www.amazon.com/s?k=' + encodeURIComponent(q) },
  music: { label: 'Listen on YouTube', build: q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q) },
  home: { label: 'See more on Pinterest', build: q => 'https://www.pinterest.com/search/pins/?q=' + encodeURIComponent(q) }
};

const VARIANT_LABELS = {
  hot: "In Hot Weather", cold: "In Cold Weather", rain: "In the Rain",
  snow: "In the Snow", dressedUp: "Dressing It Up"
};
const VARIANT_ORDER = ['hot','cold','rain','snow','dressedUp'];

// A photo object is either {url, generated:true} (one of our own images,
// site-root-relative) or {url, credit, profile} (a real Unsplash photo,
// full external URL, resizable via query params). `prefix` adjusts a
// generated image's root-relative path for how deep the current page sits
// (e.g. "../../" for styles/<key>/index.html); `resize` appends Unsplash's
// dynamic-resize params to a real photo (joined with "&", since a raw
// Unsplash URL already carries its own "?ixid=..." query string).
function photoSrc(photo, prefix, resize){
  if(!photo) return null;
  if(photo.generated) return (prefix || '') + photo.url;
  return photo.url + (resize ? '&' + resize : '');
}

module.exports = {
  brandUrl, shopSearchUrl, photoSrc,
  LIFE_LABELS, LIFE_GRID_ORDER, LIFE_LINKS,
  VARIANT_LABELS, VARIANT_ORDER
};
