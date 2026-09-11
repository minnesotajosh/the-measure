// Generates a real, fully-rendered static HTML page per style archetype at
// styles/<key>/index.html, plus a styles/index.html listing all of them and
// a sitemap.xml. This is what actually makes each archetype independently
// indexable and link-previewable -- a client-rendered SPA route would not:
// crawlers and social-card bots need real markup, a real <title>, and a
// real og:image without executing JS first.
//
// The interactive quiz stays exactly as it is at the site root (index.html)
// -- these are additional, standalone pages, cross-linked from it.
//
// Run after any change to data/styles.json:
//   node scripts/build-pages.js

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const STYLES_PATH = path.join(ROOT, 'data', 'styles.json');
const OUT_STYLES_DIR = path.join(ROOT, 'styles');

// Update this if the repo is ever renamed or moved to a custom domain --
// used only for absolute URLs required by Open Graph / Twitter card tags
// and the sitemap, which don't work reliably with relative paths.
const SITE_URL = 'https://minnesotajosh.github.io/the-measure';

const styles = JSON.parse(fs.readFileSync(STYLES_PATH, 'utf8'));

function escapeHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// -- the same brand-homepage dictionary used in app.js, kept in sync by hand
// (small and stable enough that a shared-module refactor isn't worth the
// risk of touching the working interactive site under time pressure).
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
function brandsHTML(list){
  return list.map(function(b){
    var url = brandUrl(b);
    return url
      ? '<a href="'+escapeHtml(url)+'" target="_blank" rel="noopener"><b>'+escapeHtml(b)+'</b></a>'
      : '<b>'+escapeHtml(b)+'</b>';
  }).join('  •  ');
}
function shopSearchUrl(pick){
  return 'https://www.google.com/search?q=' + encodeURIComponent(pick + ' buy');
}
function photoCreditHTML(photo){
  if(!photo) return '';
  if(photo.generated) return '<div class="photo-credit">AI-generated image</div>';
  return '<div class="photo-credit">Photo by <a href="'+escapeHtml(photo.profile)+'" target="_blank" rel="noopener">'+escapeHtml(photo.credit)+'</a> on <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a></div>';
}

var LIFE_LABELS = {
  travel: "Where They'd Go", reading: "What They'd Read", music: "What They'd Listen To",
  home: "How They'd Furnish a Room", pastimes: "How They'd Spend a Saturday"
};
var LIFE_ORDER = ['travel','reading','music','home','pastimes'];
var VARIANT_LABELS = {
  hot: "In Hot Weather", cold: "In Cold Weather", rain: "In the Rain",
  snow: "In the Snow", dressedUp: "Dressing It Up"
};
var VARIANT_ORDER = ['hot','cold','rain','snow','dressedUp'];

function variantsGridHTML(obj, labels, order){
  return order.map(function(k){
    return '<div class="life-item"><div class="life-label">'+escapeHtml(labels[k])+'</div><p>'+escapeHtml(obj[k])+'</p></div>';
  }).join('');
}

// Mirrors app.js's LIFE_LINKS / lifeHTML exactly -- each non-travel section
// links out to a real search on whichever service fits it, built from a
// short query rather than a hand-curated URL per style.
var LIFE_LINKS = {
  reading: { label: 'Find it on Amazon', build: function(q){ return 'https://www.amazon.com/s?k=' + encodeURIComponent(q); } },
  music: { label: 'Listen on YouTube', build: function(q){ return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q); } },
  home: { label: 'See more on Pinterest', build: function(q){ return 'https://www.pinterest.com/search/pins/?q=' + encodeURIComponent(q); } },
  pastimes: { label: 'Learn more', build: function(q){ return 'https://www.google.com/search?q=' + encodeURIComponent(q); } }
};

function lifestyleGridHTML(lifestyle, name){
  return LIFE_ORDER.map(function(k){
    var section = lifestyle[k];
    var paragraphs = (section.paragraphs || [section]).map(function(p){ return '<p>'+escapeHtml(p)+'</p>'; }).join('');
    var photoSrc = section.photo && (section.photo.generated ? '../../' + section.photo.url : section.photo.url + '&w=1200&h=900&q=80&auto=format&fit=crop');
    var photo = (k === 'travel' && photoSrc)
      ? '<div class="life-photo"><img src="'+escapeHtml(photoSrc)+'" alt="'+escapeHtml(name)+' — '+escapeHtml(LIFE_LABELS[k])+'" loading="lazy">'+photoCreditHTML(section.photo)+'</div>'
      : '';
    var link = (LIFE_LINKS[k] && section.query)
      ? '<a class="life-link" href="'+escapeHtml(LIFE_LINKS[k].build(section.query))+'" target="_blank" rel="noopener">'+LIFE_LINKS[k].label+' →</a>'
      : '';
    return '<div class="life-item"><div class="life-label">'+escapeHtml(LIFE_LABELS[k])+'</div>'+photo+paragraphs+link+'</div>';
  }).join('');
}

function guidanceGridHTML(guidance){
  var side = function(slug, label, paragraphs){
    return '<div class="guidance-side guidance-'+slug+'"><div class="guidance-label">'+label+'</div>' +
      paragraphs.map(function(p){ return '<p>'+escapeHtml(p)+'</p>'; }).join('') +
    '</div>';
  };
  return side('do', 'Do', guidance.dos) + side('dont', "Don't", guidance.donts);
}

function tierCardHTML(label, tier){
  if(!tier) return '';
  return '' +
    '<div class="tier-card">' +
      '<div class="tier-label">'+escapeHtml(label)+'</div>' +
      '<div class="tier-pick">'+escapeHtml(tier.pick)+'</div>' +
      '<div class="tier-price">'+escapeHtml(tier.price)+'</div>' +
      '<p class="tier-note">'+escapeHtml(tier.note)+'</p>' +
      '<a class="tier-shop" href="'+shopSearchUrl(tier.pick)+'" target="_blank" rel="noopener">Shop this →</a>' +
    '</div>';
}

function capsuleHTML(capsule){
  return capsule.map(function(item){
    return '' +
      '<div class="capsule-item">' +
        (item.photo ? '<div class="capsule-photo"><img src="'+escapeHtml('../../' + item.photo.url)+'" alt="'+escapeHtml(item.category)+'" loading="lazy">'+photoCreditHTML(item.photo)+'</div>' : '') +
        '<h4>'+escapeHtml(item.category)+'</h4>' +
        '<p class="cap-bg">'+escapeHtml(item.background)+'</p>' +
        '<div class="capsule-meta">' +
          '<div><div class="cap-label">Look For</div><p>'+escapeHtml(item.lookFor)+'</p></div>' +
          '<div><div class="cap-label">How To Wear It</div><p>'+escapeHtml(item.pairing)+'</p></div>' +
        '</div>' +
        '<div class="tier-grid">' +
          tierCardHTML('Low', item.tiers.low) + tierCardHTML('Mid', item.tiers.mid) + tierCardHTML('High', item.tiers.high) +
        '</div>' +
      '</div>';
  }).join('');
}

function otherStylesHTML(current, all){
  // A handful of internal links to other archetypes -- real crawlable
  // <a> links between pages are most of what makes a page graph "SEO."
  var others = all.filter(function(s){ return s.key !== current.key; });
  // deterministic but varied: pick 6 spread across the list rather than
  // always the same neighbors
  var picks = [];
  for(var i=0;i<6;i++){ picks.push(others[(others.indexOf(current) + i*4 + 3) % others.length] || others[i]); }
  var seen = {}; picks = picks.filter(function(s){ if(!s || seen[s.key]) return false; seen[s.key]=1; return true; });
  return picks.map(function(s){
    return '<a class="other-style" href="../'+s.key+'/">'+escapeHtml(s.name)+'</a>';
  }).join('');
}

function pageHTML(style, all){
  // style.photo.url / style.flatlay.url are stored root-relative (used as-is
  // by the SPA at the site root) -- this page lives two levels deeper, at
  // styles/<key>/index.html, so image src attributes need "../../" prepended.
  // og:image stays a full absolute URL, which needed no such adjustment.
  var photoPath = '../../' + style.photo.url;
  var heroSrc = style.photo.generated ? photoPath : photoPath + '&w=2000&h=1000&q=80&auto=format&fit=crop';
  var ogImage = SITE_URL + '/' + style.photo.url;
  var canonical = SITE_URL + '/styles/' + style.key + '/';
  var title = style.name + ' — Full Style Profile | The Measure';
  var description = style.dek;

  return '<!doctype html>\n<html lang="en">\n<head>\n' +
'<meta charset="utf-8">\n' +
'<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
'<title>' + escapeHtml(title) + '</title>\n' +
'<meta name="description" content="' + escapeHtml(description) + '">\n' +
'<link rel="canonical" href="' + canonical + '">\n' +
'<meta property="og:type" content="article">\n' +
'<meta property="og:title" content="' + escapeHtml(style.name) + ' — The Measure">\n' +
'<meta property="og:description" content="' + escapeHtml(description) + '">\n' +
'<meta property="og:image" content="' + ogImage + '">\n' +
'<meta property="og:url" content="' + canonical + '">\n' +
'<meta name="twitter:card" content="summary_large_image">\n' +
'<script>(function(){try{var t=localStorage.getItem("measure:theme");document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light");}catch(e){document.documentElement.setAttribute("data-theme","light");}})();' +
'if(/\\/index\\.html$/.test(location.pathname)){history.replaceState(null,"",location.pathname.replace(/index\\.html$/,"")+location.search+location.hash);}</script>\n' +
'<link rel="stylesheet" href="../../style.css">\n' +
'</head>\n<body>\n' +
'<div class="scroll-visual" id="scrollVisual" aria-hidden="true"></div>\n' +
'<div class="page">\n' +
'  <nav class="side-nav" aria-label="Jump to section">\n' +
'    <a href="#sec-essay" data-target="sec-essay">The Argument</a>\n' +
'    <a href="#sec-trademarks" data-target="sec-trademarks">Trademarks</a>\n' +
'    <a href="#sec-wardrobe" data-target="sec-wardrobe">The Wardrobe</a>\n' +
'    <a href="#sec-capsule" data-target="sec-capsule">Capsule</a>\n' +
'    <a href="#sec-guidance" data-target="sec-guidance">Do\'s &amp; Don\'ts</a>\n' +
'    <a href="#sec-dressing" data-target="sec-dressing">Dressing For It</a>\n' +
'    <a href="#sec-lifestyle" data-target="sec-lifestyle">Beyond The Closet</a>\n' +
'  </nav>\n' +
'  <div class="masthead"><div class="masthead-inner">\n' +
'    <a class="brand" href="../../index.html" style="text-decoration:none;color:inherit;">The Measure</a>\n' +
'    <span class="meta"><a href="../index.html" style="color:inherit;">All Styles</a></span>\n' +
'  </div></div>\n' +
'  <div id="rPlate"><div class="hero-photo"><img src="' + escapeHtml(heroSrc) + '" alt="' + escapeHtml(style.name) + '" loading="eager"><div class="hero-scrim"></div>' + photoCreditHTML(style.photo) + '</div></div>\n' +
(style.flatlay ? '  <div class="shop-look"><div class="shop-look-label">Shop The Look</div><img src="' + escapeHtml('../../' + style.flatlay.url) + '" alt="The ' + escapeHtml(style.name) + ' capsule wardrobe, flat-laid">' + photoCreditHTML(style.flatlay) + '</div>\n' : '') +
'  <section class="content-block" id="sec-essay" data-bg="photo">\n' +
'    <div class="r-eyebrow eyebrow">A Style Profile</div>\n' +
'    <h1 class="r-name">' + escapeHtml(style.name) + '</h1>\n' +
'    <div class="r-dek">' + escapeHtml(style.dek) + '</div>\n' +
'    <div class="essay">' + style.essay.map(function(p,i){ return '<p'+(i===0?' class="dropcap"':'')+'>'+escapeHtml(p)+'</p>'; }).join('') + '</div>\n' +
'  </section>\n' +
'  <section class="content-block" id="sec-trademarks" data-bg="item-0">\n' +
'    <div class="section-title">Trademark Features</div>\n' +
'    <ul class="trademarks">' + style.trademarks.map(function(t){ return '<li>'+escapeHtml(t)+'</li>'; }).join('') + '</ul>\n' +
'  </section>\n' +
'  <section class="content-block" id="sec-wardrobe" data-bg="item-1">\n' +
'    <div class="section-title">The Wardrobe</div>\n' +
'    <div class="brandline">' + brandsHTML(style.brands) + '</div>\n' +
'  </section>\n' +
'  <section class="content-block" id="sec-capsule" data-bg="flatlay">\n' +
'    <div class="section-title">The Capsule Wardrobe</div>\n' +
'    <div class="section-note">Five pieces that define the style, each with a low, mid, and high budget entry point.</div>\n' +
'    <div class="capsule-list">' + capsuleHTML(style.capsule) + '</div>\n' +
'  </section>\n' +
(style.guidance ? '  <section class="content-block" id="sec-guidance" data-bg="item-2">\n' +
'    <div class="section-title">Do\'s and Don\'ts</div>\n' +
'    <div class="section-note">Every style has a right context and a wrong one, and one similar-looking garment easily mistaken for another.</div>\n' +
'    <div class="guidance-grid">' + guidanceGridHTML(style.guidance) + '</div>\n' +
'  </section>\n' : '') +
'  <section class="content-block" id="sec-dressing" data-bg="item-3">\n' +
'    <div class="section-title">Dressing For It</div>\n' +
'    <div class="section-note">The same wardrobe, adjusted for what the day actually throws at it.</div>\n' +
'    <div class="life-grid">' + variantsGridHTML(style.variants, VARIANT_LABELS, VARIANT_ORDER) + '</div>\n' +
'  </section>\n' +
'  <section class="content-block" id="sec-lifestyle" data-bg="travel">\n' +
'    <div class="section-title">Beyond the Closet</div>\n' +
'    <div class="section-note">A personal style was never just the clothes.</div>\n' +
'    <div class="life-grid">' + lifestyleGridHTML(style.lifestyle, style.name) + '</div>\n' +
'  </section>\n' +
'  <section class="content-block" data-bg="item-4">\n' +
'    <div class="section-title">Other Styles</div>\n' +
'    <div class="other-styles">' + otherStylesHTML(style, all) + '</div>\n' +
'    <div class="btn-row" style="margin-top:40px;"><a class="btn" href="../../index.html">Take The Full Interview</a></div>\n' +
'  </section>\n' +
'  <footer class="site-footer"><div class="site-footer-inner">\n' +
'    <div class="colophon">The Measure — a style diagnostic, drafted for one reader at a time. This page is one of 27 style profiles; <a href="../index.html">see them all</a> or <a href="../../index.html">take the quiz</a> to find your own.</div>\n' +
'  </div></footer>\n' +
'</div>\n' +
scrollEffectsScript(style) +
'</body>\n</html>\n';
}

// Mirrors app.js's setupScrollEffects() -- same two IntersectionObservers
// (swap the background layer behind the reading column, highlight the
// current side-nav link) -- but for a static page whose content already
// exists in the DOM at load, rather than content just inserted by a
// render function, so it runs directly instead of being triggered by one.
function scrollEffectsScript(style){
  var travelPhoto = style.lifestyle && style.lifestyle.travel && style.lifestyle.travel.photo;
  var images = {
    photo: style.photo && ('../../' + style.photo.url),
    flatlay: style.flatlay && ('../../' + style.flatlay.url),
    travel: travelPhoto && (travelPhoto.generated ? '../../' + travelPhoto.url : travelPhoto.url + '&w=1600&h=1200&q=80&auto=format&fit=crop')
  };
  (style.capsule || []).forEach(function(item, i){
    if(item.photo) images['item-' + i] = '../../' + item.photo.url;
  });
  var layerDivs = Object.keys(images).filter(function(k){ return images[k]; }).map(function(k){
    return '<div class="scroll-visual-layer" data-layer="' + k + '" style="background-image:url(\'' + escapeHtml(images[k]) + '\')"></div>';
  }).join('');
  return '<script>(function(){\n' +
'  document.getElementById("scrollVisual").innerHTML = ' + JSON.stringify(layerDivs) + ';\n' +
'  if(typeof IntersectionObserver === "undefined") return;\n' +
'  var hasImage = ' + JSON.stringify(Object.keys(images).reduce(function(o,k){ if(images[k]) o[k]=true; return o; }, {})) + ';\n' +
'  var layers = document.querySelectorAll(".scroll-visual-layer");\n' +
'  function activateLayer(key){ layers.forEach(function(l){ l.classList.toggle("active", l.dataset.layer === key); }); }\n' +
'  activateLayer("photo");\n' +
'  var bgObserver = new IntersectionObserver(function(entries){\n' +
'    entries.forEach(function(entry){\n' +
'      if(!entry.isIntersecting) return;\n' +
'      var key = entry.target.dataset.bg;\n' +
'      if(key && key !== "none" && hasImage[key]) activateLayer(key);\n' +
'    });\n' +
'  }, { rootMargin: "-40% 0px -40% 0px" });\n' +
'  document.querySelectorAll("[data-bg]").forEach(function(t){ bgObserver.observe(t); });\n' +
'  var navLinks = document.querySelectorAll(".side-nav a");\n' +
'  var navObserver = new IntersectionObserver(function(entries){\n' +
'    entries.forEach(function(entry){\n' +
'      if(!entry.isIntersecting) return;\n' +
'      navLinks.forEach(function(a){ a.classList.toggle("active", a.dataset.target === entry.target.id); });\n' +
'    });\n' +
'  }, { rootMargin: "-20% 0px -70% 0px" });\n' +
'  Array.prototype.slice.call(navLinks).map(function(a){ return document.getElementById(a.dataset.target); }).filter(Boolean).forEach(function(t){ navObserver.observe(t); });\n' +
'})();</script>\n';
}

function indexPageHTML(all){
  var rows = all.map(function(s){
    return '' +
      '<a class="style-index-row" href="' + s.key + '/">' +
        '<span class="style-index-name">' + escapeHtml(s.name) + '</span>' +
        '<span class="style-index-dek">' + escapeHtml(s.dek) + '</span>' +
      '</a>';
  }).join('');

  return '<!doctype html>\n<html lang="en">\n<head>\n' +
'<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
'<title>Every Style Profile | The Measure</title>\n' +
'<meta name="description" content="All 27 menswear style archetypes from The Measure, each with a full profile: history, capsule wardrobe, and more.">\n' +
'<link rel="canonical" href="' + SITE_URL + '/styles/">\n' +
'<script>(function(){try{var t=localStorage.getItem("measure:theme");document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light");}catch(e){document.documentElement.setAttribute("data-theme","light");}})();' +
'if(/\\/index\\.html$/.test(location.pathname)){history.replaceState(null,"",location.pathname.replace(/index\\.html$/,"")+location.search+location.hash);}</script>\n' +
'<link rel="stylesheet" href="../style.css">\n' +
'</head>\n<body>\n' +
'<div class="page">\n' +
'  <div class="masthead"><a class="brand" href="../index.html" style="text-decoration:none;color:inherit;">The Measure</a></div>\n' +
'  <h1 class="r-name" style="font-size:clamp(32px,6vw,46px);">Every Style Profile</h1>\n' +
'  <div class="r-dek">All 27 archetypes, each with its own page.</div>\n' +
'  <div class="style-index-list">' + rows + '</div>\n' +
'  <div class="btn-row" style="margin-top:40px;"><a class="btn" href="../index.html">Take The Interview Instead</a></div>\n' +
'</div>\n</body>\n</html>\n';
}

function buildSitemap(all){
  var urls = [SITE_URL + '/', SITE_URL + '/styles/'].concat(
    all.map(function(s){ return SITE_URL + '/styles/' + s.key + '/'; })
  );
  var body = urls.map(function(u){ return '  <url><loc>' + u + '</loc></url>'; }).join('\n');
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + body + '\n</urlset>\n';
}

// -- write everything --
fs.mkdirSync(OUT_STYLES_DIR, {recursive:true});
var built = 0;
styles.forEach(function(style){
  if(!style.photo || !style.essay || !style.capsule || !style.variants || !style.lifestyle){
    console.log('SKIPPED (incomplete data): ' + style.key);
    return;
  }
  var dir = path.join(OUT_STYLES_DIR, style.key);
  fs.mkdirSync(dir, {recursive:true});
  fs.writeFileSync(path.join(dir, 'index.html'), pageHTML(style, styles), 'utf8');
  built++;
});
fs.writeFileSync(path.join(OUT_STYLES_DIR, 'index.html'), indexPageHTML(styles), 'utf8');
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), buildSitemap(styles), 'utf8');
console.log('Built ' + built + ' style page(s), the styles index, and sitemap.xml.');
