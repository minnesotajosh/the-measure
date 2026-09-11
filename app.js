(function(){
'use strict';

var loadState = document.getElementById('loadState');
var appEl = document.getElementById('app');

/* ---------------- theme toggle ----------------
   Wired outside boot() so it works immediately, before (or even if) the
   question/style data ever loads. The inline script in <head> already set
   data-theme before paint; this just keeps the button and localStorage
   in sync with it. Default is light, always — the toggle is the only way
   to reach dark, regardless of the OS setting. */
(function initThemeToggle(){
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');

  function label(theme){
    return theme === 'dark' ? '☀ Light Mode' : '☾ Dark Mode';
  }
  function apply(theme){
    root.setAttribute('data-theme', theme);
    btn.textContent = label(theme);
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    try{ localStorage.setItem('measure:theme', theme); }catch(e){}
  }

  apply(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  btn.addEventListener('click', function(){
    apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
})();

/* ---------------- boot: fetch data, then wire up the app ---------------- */
Promise.all([
  fetch('data/questions.json').then(function(r){ if(!r.ok) throw new Error('questions.json ' + r.status); return r.json(); }),
  fetch('data/styles.json').then(function(r){ if(!r.ok) throw new Error('styles.json ' + r.status); return r.json(); })
]).then(function(results){
  boot(results[0], results[1]);
}).catch(function(err){
  loadState.classList.add('is-error');
  loadState.textContent =
    "Couldn't load the questionnaire (" + err.message + ").\n\n" +
    "If you opened index.html directly from disk, the browser blocks a local page from fetching " +
    "its own JSON files (a file:// security rule, not a bug). Serve the folder instead, e.g.:\n\n" +
    "npx serve .\n\n" +
    "or\n\n" +
    "python -m http.server 8000\n\n" +
    "then open the localhost address it prints.";
});

function boot(questionData, styleData){

var AXES = Object.keys(questionData.axes);
var AXIS_META = questionData.axes; // { A: {label, poles:[low,high]}, ... }
var BANK = questionData.bank;
var STYLES = styleData;

/* interleave axes round-robin so the topic changes every question */
var QPA = Math.min.apply(null, AXES.map(function(ax){ return BANK[ax].length; }));
var questions = [];
for (var i=0;i<QPA;i++){
  AXES.forEach(function(ax){
    var item = BANK[ax][i];
    questions.push({axis:ax, a:item.a, b:item.b});
  });
}
var TOTAL = questions.length;
var MAX_DIST = Math.sqrt(AXES.length * 100); // worst-case distance across all axes (0-10 each)

/* ---------------- one-time page fill ---------------- */
document.getElementById('coverQCount').textContent = TOTAL;
document.getElementById('statQ').textContent = TOTAL;
document.getElementById('statS').textContent = STYLES.length;
document.getElementById('statA').textContent = AXES.length;

loadState.hidden = true;
appEl.hidden = false;

/* ---------------- state ---------------- */
var scores = {};
AXES.forEach(function(ax){ scores[ax] = 0; });
var history = []; // {axis, dir}
var idx = 0;

var rail = document.getElementById('rail');

/* ---------------- screens ----------------
   Just the three in-app states now -- browsing every style lives on its
   own real page (styles/index.html) rather than a fourth in-app screen,
   since that page already exists for SEO and there's no reason to
   maintain the same listing twice. */
var SCREENS = {
  cover: document.getElementById('cover'),
  quiz: document.getElementById('quiz'),
  results: document.getElementById('results')
};
var currentScreen = 'cover';

function showScreen(name){
  Object.keys(SCREENS).forEach(function(k){ SCREENS[k].hidden = (k !== name); });
  var el = SCREENS[name];
  el.classList.remove('screen-in');
  void el.offsetWidth;
  el.classList.add('screen-in');
  currentScreen = name;
  window.scrollTo({top:0, behavior:'instant'});
}

/* ---------------- local persistence ----------------
   Everything below lives only in this browser's localStorage — nothing is
   ever sent anywhere. A schema tag is stored alongside the data so a saved
   run from a previous version of the question bank is never misread. */
var LS_PROGRESS = 'measure:progress';
var LS_RESULT = 'measure:result';
var SCHEMA = TOTAL + '|' + AXES.join('');

function lsGet(key){
  try{ var v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
  catch(e){ return null; }
}
function lsSet(key, val){
  try{ localStorage.setItem(key, JSON.stringify(val)); } catch(e){ /* private mode, quota, etc. */ }
}
function lsRemove(key){
  try{ localStorage.removeItem(key); } catch(e){}
}
function saveProgress(){
  lsSet(LS_PROGRESS, { schema: SCHEMA, idx: idx, scores: scores, history: history });
}
function saveResult(user){
  lsSet(LS_RESULT, { schema: SCHEMA, user: user });
}
function clearSaved(){
  lsRemove(LS_PROGRESS);
  lsRemove(LS_RESULT);
}

document.getElementById('beginBtn').addEventListener('click', function(){
  showScreen('quiz');
  renderQuestion();
});

document.getElementById('backBtn').addEventListener('click', function(){
  if(history.length === 0) return;
  var last = history.pop();
  scores[last.axis] -= last.dir;
  idx--;
  renderQuestion();
});

document.getElementById('retakeBtn').addEventListener('click', function(){
  AXES.forEach(function(ax){ scores[ax] = 0; });
  history = [];
  idx = 0;
  clearSaved();
  rail.style.width = '0%';
  hideResumeBanner();
  showScreen('cover');
});

function pad(n){ return n<10 ? '0'+n : ''+n; }
function escapeHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ---------------- resume banner ---------------- */
function hideResumeBanner(){
  document.getElementById('resumeBanner').hidden = true;
}
(function initResumeBanner(){
  var savedResult = lsGet(LS_RESULT);
  var savedProgress = lsGet(LS_PROGRESS);
  var banner = document.getElementById('resumeBanner');
  var text = document.getElementById('resumeText');
  var resumeBtn = document.getElementById('resumeBtn');
  var dismissBtn = document.getElementById('dismissResumeBtn');

  if(savedResult && savedResult.schema === SCHEMA){
    var ranked = rankStyles(savedResult.user);
    text.textContent = 'Last time, you came out as ' + ranked[0].style.name + '.';
    resumeBtn.textContent = 'View That Result Again';
    resumeBtn.onclick = function(){
      renderResults(savedResult.user);
      showScreen('results');
    };
    banner.hidden = false;
  } else if(savedProgress && savedProgress.schema === SCHEMA && savedProgress.idx > 0 && savedProgress.idx < TOTAL){
    text.textContent = 'You left off at question ' + (savedProgress.idx+1) + ' of ' + TOTAL + '.';
    resumeBtn.textContent = 'Resume';
    resumeBtn.onclick = function(){
      idx = savedProgress.idx;
      scores = savedProgress.scores;
      history = savedProgress.history || [];
      showScreen('quiz');
      renderQuestion();
    };
    banner.hidden = false;
  } else {
    if((savedResult && savedResult.schema !== SCHEMA) || (savedProgress && savedProgress.schema !== SCHEMA)) clearSaved();
    banner.hidden = true;
  }

  dismissBtn.addEventListener('click', function(){
    clearSaved();
    hideResumeBanner();
  });
})();

/* ---------------- quiz flow ---------------- */
function renderQuestion(){
  var q = questions[idx];
  rail.style.width = (idx/TOTAL*100) + '%';
  document.getElementById('qCounter').textContent = 'No. ' + pad(idx+1) + ' — of ' + TOTAL;
  document.getElementById('qKicker').textContent = 'Question ' + pad(idx+1);

  var qt = document.getElementById('qText');
  qt.classList.remove('q-swap');
  void qt.offsetWidth;
  qt.classList.add('q-swap');

  var photoEl = document.getElementById('qPhoto');
  if(q.type === 'personality'){
    var img = AXIS_META[q.axis].image;
    photoEl.innerHTML = '<img src="'+escapeHtml(img.url)+'?w=800&h=400&q=75&auto=format&fit=crop" alt="" loading="lazy">' + photoCreditHTML(img);
    photoEl.hidden = false;
    photoEl.classList.remove('fade-in'); void photoEl.offsetWidth; photoEl.classList.add('fade-in');
  } else {
    photoEl.hidden = true;
    photoEl.innerHTML = '';
  }

  var choicesEl = document.getElementById('choices');
  choicesEl.innerHTML = '';
  choicesEl.appendChild(makeChoice('A', q.a, function(){ answer(q.axis, 1); }));
  choicesEl.appendChild(makeChoice('B', q.b, function(){ answer(q.axis, -1); }));

  document.getElementById('backBtn').disabled = (idx===0);
  document.getElementById('qProgressText').textContent = Math.round(idx/TOTAL*100) + '% through';
}

function makeChoice(letter, text, onClick){
  var div = document.createElement('div');
  div.className = 'choice';
  div.setAttribute('tabindex','0');
  div.setAttribute('role','button');
  var lab = document.createElement('span');
  lab.className = 'lab';
  lab.textContent = letter + '.';
  var body = document.createElement('span');
  body.textContent = text;
  div.appendChild(lab);
  div.appendChild(body);
  div.addEventListener('click', onClick);
  div.addEventListener('keydown', function(e){
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onClick(); }
  });
  return div;
}

function answer(axis, dir){
  scores[axis] += dir;
  history.push({axis:axis, dir:dir});
  idx++;
  if(idx >= TOTAL){
    finishQuiz();
  } else {
    saveProgress();
    renderQuestion();
  }
}

/* ---------------- scoring ---------------- */
function normalized(){
  var out = {};
  AXES.forEach(function(ax){
    var v = 5 + 5*(scores[ax]/BANK[ax].length);
    out[ax] = Math.max(0, Math.min(10, v));
  });
  return out;
}

function distance(user, vec){
  var sum = 0;
  AXES.forEach(function(ax){
    var d = user[ax] - vec[ax];
    sum += d*d;
  });
  return Math.sqrt(sum);
}

function pctMatch(d){
  return Math.max(0, Math.min(100, Math.round(100 * (1 - d/MAX_DIST))));
}

/* ---------------- style visual ----------------
   Each style has a real, sourced photo (style.photo: {url, credit, profile})
   plus a 3-color "palette" + monogram as a fallback if a photo is ever
   missing. Every photo is a free Unsplash image, credited inline per
   Unsplash's guidelines — see photoCreditHTML(). */
// Unsplash photos are served through their resize API (?w=&h=&fit=crop);
// our own generated JPEGs are already sized and cropped at generation time,
// so they're just used as-is.
function photoSrc(photo, w, h){
  if(photo.generated) return escapeHtml(photo.url);
  return escapeHtml(photo.url) + '?w=' + w + '&h=' + h + '&q=80&auto=format&fit=crop';
}

function renderPlate(style, size, mode){
  size = size || 260;
  if(style.photo && mode === 'hero'){
    return '' +
      '<div class="hero-photo">' +
        '<img src="'+photoSrc(style.photo, 2000, 1000)+'" ' +
             'alt="'+escapeHtml(style.name)+'" loading="eager">' +
        '<div class="hero-scrim"></div>' +
        photoCreditHTML(style.photo) +
      '</div>';
  }
  if(style.photo && mode === 'wide'){
    var ww = Math.round(size * 1.6), wh = Math.round(ww * 9/16);
    return '' +
      '<img class="plate" src="'+photoSrc(style.photo, ww, wh)+'" ' +
           'alt="Mood photograph for '+escapeHtml(style.name)+'" loading="lazy">' +
      photoCreditHTML(style.photo);
  }
  if(style.photo){
    var w = Math.round(size * 2.4);
    var h = Math.round(w * 380/300); // matches the fallback plate's portrait ratio
    return '' +
      '<img class="plate" src="'+photoSrc(style.photo, w, h)+'" ' +
           'alt="Mood photograph for '+escapeHtml(style.name)+'" width="'+size+'" loading="lazy">' +
      photoCreditHTML(style.photo);
  }
  var pal = style.palette;
  return '' +
    '<svg class="plate" viewBox="0 0 300 380" width="'+size+'" role="img" aria-label="Mood plate for '+escapeHtml(style.name)+'">' +
      '<rect width="300" height="380" fill="'+pal[2]+'"/>' +
      '<polygon points="0,380 0,170 300,0 300,380" fill="'+pal[0]+'"/>' +
      '<polygon points="300,0 170,0 300,140" fill="'+pal[1]+'"/>' +
      '<rect x="10" y="10" width="280" height="360" fill="none" stroke="rgba(255,255,255,0.32)" stroke-width="1"/>' +
      '<text x="150" y="318" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-style="italic" font-weight="600" font-size="86" fill="'+pal[2]+'">'+escapeHtml(style.monogram)+'</text>' +
    '</svg>';
}

function photoCreditHTML(photo){
  if(photo.generated){
    return '<div class="photo-credit">AI-generated image</div>';
  }
  return '<div class="photo-credit">Photo by <a href="'+escapeHtml(photo.profile)+'" target="_blank" rel="noopener">'+escapeHtml(photo.credit)+'</a> on <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a></div>';
}

function flatlayHTML(style){
  if(!style.flatlay){
    return '<p class="capsule-empty">A shop-the-look flat-lay for '+escapeHtml(style.name)+' hasn\'t been generated yet.</p>';
  }
  return '<img src="'+escapeHtml(style.flatlay.url)+'" alt="The '+escapeHtml(style.name)+' capsule wardrobe, flat-laid" loading="lazy">' +
    photoCreditHTML(style.flatlay);
}

function essayHTML(style){
  return style.essay.map(function(p,i){
    return '<p'+(i===0?' class="dropcap"':'')+'>'+escapeHtml(p)+'</p>';
  }).join('');
}
function trademarksListItems(style){
  return style.trademarks.map(function(t){
    return '<li>'+escapeHtml(t)+'</li>';
  }).join('');
}
/* ---------------- shopping links ----------------
   "The Wardrobe" names ~160 distinct brands across all styles — where a
   brand's real homepage is confidently known, its name links there. This
   is a plain text hyperlink, which needs no image license (unlike embedding
   a retailer's product photography, which does — see the note to the user
   about why this app doesn't do that).
   Capsule-wardrobe tier picks are messier free text ("Alden Leisure
   Handsewn or Rancourt"), so rather than guess at a specific brand's
   homepage from parsed fragments, each tier gets a plain web-search link
   for that exact pick — always correct, never a fragile guess. */
var BRAND_URLS = {
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

function brandUrl(rawName){
  var base = rawName.replace(/\s*\([^)]*\)\s*$/, '').trim();
  return BRAND_URLS[base] || null;
}

function brandsHTML(style, limit){
  var list = limit ? style.brands.slice(0,limit) : style.brands;
  return list.map(function(b){
    var url = brandUrl(b);
    return url
      ? '<a href="'+escapeHtml(url)+'" target="_blank" rel="noopener"><b>'+escapeHtml(b)+'</b></a>'
      : '<b>'+escapeHtml(b)+'</b>';
  }).join('  •  ');
}

function shopSearchUrl(pickText){
  return 'https://www.google.com/search?q=' + encodeURIComponent(pickText + ' buy');
}

function tierCard(label, tier){
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

function capsuleHTML(style){
  if(!style.capsule || !style.capsule.length){
    return '<p class="capsule-empty">A full capsule wardrobe for '+escapeHtml(style.name)+' hasn\'t been written yet.</p>';
  }
  return style.capsule.map(function(item){
    return '' +
      '<div class="capsule-item">' +
        (item.photo ? '<div class="capsule-photo"><img src="'+escapeHtml(item.photo.url)+'" alt="'+escapeHtml(item.category)+'" loading="lazy">'+photoCreditHTML(item.photo)+'</div>' : '') +
        '<h4>'+escapeHtml(item.category)+'</h4>' +
        '<p class="cap-bg">'+escapeHtml(item.background)+'</p>' +
        '<div class="capsule-meta">' +
          '<div><div class="cap-label">Look For</div><p>'+escapeHtml(item.lookFor)+'</p></div>' +
          '<div><div class="cap-label">How To Wear It</div><p>'+escapeHtml(item.pairing)+'</p></div>' +
        '</div>' +
        '<div class="tier-grid">' +
          tierCard('Low', item.tiers.low) +
          tierCard('Mid', item.tiers.mid) +
          tierCard('High', item.tiers.high) +
        '</div>' +
      '</div>';
  }).join('');
}

var LIFE_LABELS = {
  travel: "Where They'd Go", reading: "What They'd Read", music: "What They'd Listen To",
  home: "How They'd Furnish a Room", pastimes: "How They'd Spend a Saturday"
};
var LIFE_ORDER = ['travel','reading','music','home','pastimes'];

// Each non-travel section links out to whichever real service actually fits
// what it's linking to, built from a short search query rather than a
// hand-curated URL (27 styles x 4 sections is too many real links to keep
// correct by hand, and a search always resolves to something relevant).
var LIFE_LINKS = {
  reading: { label: 'Find it on Amazon', build: function(q){ return 'https://www.amazon.com/s?k=' + encodeURIComponent(q); } },
  music: { label: 'Listen on YouTube', build: function(q){ return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q); } },
  home: { label: 'See more on Pinterest', build: function(q){ return 'https://www.pinterest.com/search/pins/?q=' + encodeURIComponent(q); } },
  pastimes: { label: 'Learn more', build: function(q){ return 'https://www.google.com/search?q=' + encodeURIComponent(q); } }
};

function lifeHTML(style){
  if(!style.lifestyle) return '<p class="capsule-empty">This dimension hasn\'t been written for '+escapeHtml(style.name)+' yet.</p>';
  return LIFE_ORDER.map(function(k){
    var section = style.lifestyle[k];
    var paragraphs = (section.paragraphs || [section]).map(function(p){ return '<p>'+escapeHtml(p)+'</p>'; }).join('');
    var photoSrc = section.photo && (section.photo.generated ? section.photo.url : section.photo.url + '&w=1200&h=900&q=80&auto=format&fit=crop');
    var photo = (k === 'travel' && photoSrc)
      ? '<div class="life-photo"><img src="'+escapeHtml(photoSrc)+'" alt="'+escapeHtml(style.name)+' — '+escapeHtml(LIFE_LABELS[k])+'" loading="lazy">'+photoCreditHTML(section.photo)+'</div>'
      : '';
    var link = (LIFE_LINKS[k] && section.query)
      ? '<a class="life-link" href="'+escapeHtml(LIFE_LINKS[k].build(section.query))+'" target="_blank" rel="noopener">'+LIFE_LINKS[k].label+' →</a>'
      : '';
    return '' +
      '<div class="life-item">' +
        '<div class="life-label">'+escapeHtml(LIFE_LABELS[k])+'</div>' +
        photo +
        paragraphs +
        link +
      '</div>';
  }).join('');
}

function guidanceHTML(style){
  if(!style.guidance) return '<p class="capsule-empty">Do\'s and don\'ts haven\'t been written for '+escapeHtml(style.name)+' yet.</p>';
  var side = function(slug, label, paragraphs){
    return '<div class="guidance-side guidance-'+slug+'">' +
      '<div class="guidance-label">'+label+'</div>' +
      paragraphs.map(function(p){ return '<p>'+escapeHtml(p)+'</p>'; }).join('') +
    '</div>';
  };
  return side("do", "Do", style.guidance.dos) + side("dont", "Don't", style.guidance.donts);
}

var VARIANT_LABELS = {
  hot: "In Hot Weather", cold: "In Cold Weather", rain: "In the Rain",
  snow: "In the Snow", dressedUp: "Dressing It Up"
};
var VARIANT_ORDER = ['hot','cold','rain','snow','dressedUp'];

function variantsHTML(style){
  if(!style.variants) return '<p class="capsule-empty">Weather variants haven\'t been written for '+escapeHtml(style.name)+' yet.</p>';
  return VARIANT_ORDER.map(function(k){
    return '' +
      '<div class="life-item">' +
        '<div class="life-label">'+escapeHtml(VARIANT_LABELS[k])+'</div>' +
        '<p>'+escapeHtml(style.variants[k])+'</p>' +
      '</div>';
  }).join('');
}

/* ---------------- results ---------------- */
function rankStyles(user){
  return STYLES.map(function(s){
    return {style:s, d: distance(user, s.vector)};
  }).sort(function(a,b){ return a.d - b.d; });
}

function finishQuiz(){
  rail.style.width = '100%';
  var user = normalized();
  saveResult(user);
  renderResults(user);
  showScreen('results');
}

function renderResults(user){
  var ranked = rankStyles(user);
  var primary = ranked[0].style;
  var secondary = ranked[1].style;

  document.getElementById('rName').textContent = primary.name;
  document.getElementById('rSharePage').href = 'styles/' + primary.key + '/';
  document.getElementById('rDek').textContent = primary.dek;
  document.getElementById('rPlate').innerHTML = renderPlate(primary, 300, 'hero');
  document.getElementById('rFlatlay').innerHTML = flatlayHTML(primary);
  document.getElementById('rEssay').innerHTML = essayHTML(primary);
  document.getElementById('rTrademarks').innerHTML = trademarksListItems(primary);
  document.getElementById('rBrands').innerHTML = brandsHTML(primary);
  document.getElementById('rCapsule').innerHTML = capsuleHTML(primary);
  document.getElementById('rGuidance').innerHTML = guidanceHTML(primary);
  document.getElementById('rVariants').innerHTML = variantsHTML(primary);
  document.getElementById('rLife').innerHTML = lifeHTML(primary);

  var mEl = document.getElementById('rMeters');
  mEl.innerHTML = '';
  AXES.forEach(function(ax){
    var meta = AXIS_META[ax];
    var wrap = document.createElement('div');
    wrap.className = 'meter';
    var labels = document.createElement('div');
    labels.className = 'plabels';
    labels.innerHTML = '<span>'+escapeHtml(meta.poles[0])+'</span><b>'+escapeHtml(meta.label)+'</b><span>'+escapeHtml(meta.poles[1])+'</span>';
    var track = document.createElement('div');
    track.className = 'track';
    var dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.left = '50%'; // start centered, then glide to the real value below
    track.appendChild(dot);
    wrap.appendChild(labels);
    wrap.appendChild(track);
    mEl.appendChild(wrap);
    requestAnimationFrame(function(){ dot.style.left = (user[ax]/10*100) + '%'; });
  });

  document.getElementById('sPlate').innerHTML = renderPlate(secondary, 160);
  document.getElementById('sName').textContent = secondary.name;
  document.getElementById('sBrief').textContent = secondary.brief;
  document.getElementById('sBrands').innerHTML = brandsHTML(secondary, 5);

  renderCompareList(ranked);
  setupScrollEffects(primary);
}

/* ---------------- scroll effects: side nav + swapping background ----------------
   Every major section carries a data-bg attribute naming which of the
   style's images belongs behind it ("photo", "flatlay", "travel", or
   "none"). One IntersectionObserver drives two things at once as the
   reader scrolls: which background layer is faded in behind the sticky
   hero (the hero itself just gets covered by the content column scrolling
   over it -- pure CSS, no JS needed for that part), and which side-nav
   link is highlighted. Re-run on every renderResults() call so a retake
   doesn't leave stale observers watching a previous style's images. */
var scrollObservers = [];
function teardownScrollEffects(){
  scrollObservers.forEach(function(o){ o.disconnect(); });
  scrollObservers = [];
}

function setupScrollEffects(style){
  teardownScrollEffects();
  if(typeof IntersectionObserver === 'undefined') return;

  var visual = document.getElementById('scrollVisual');
  var travelPhoto = style.lifestyle && style.lifestyle.travel && style.lifestyle.travel.photo;
  var images = {
    photo: style.photo && style.photo.url,
    flatlay: style.flatlay && style.flatlay.url,
    travel: travelPhoto && (travelPhoto.generated ? travelPhoto.url : travelPhoto.url + '&w=1600&h=1200&q=80&auto=format&fit=crop')
  };
  visual.innerHTML = Object.keys(images).filter(function(k){ return images[k]; }).map(function(k){
    return '<div class="scroll-visual-layer" data-layer="'+k+'" style="background-image:url(\''+escapeHtml(images[k])+'\')"></div>';
  }).join('');
  var layers = visual.querySelectorAll('.scroll-visual-layer');
  function activateLayer(key){
    layers.forEach(function(l){ l.classList.toggle('active', l.dataset.layer === key); });
  }
  activateLayer('photo');

  var bgTargets = document.querySelectorAll('#results [data-bg]');
  var bgObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var key = entry.target.dataset.bg;
      if(key && key !== 'none' && images[key]) activateLayer(key);
    });
  }, { rootMargin: '-40% 0px -40% 0px' }); // fires as a section crosses the vertical center of the viewport
  bgTargets.forEach(function(t){ bgObserver.observe(t); });
  scrollObservers.push(bgObserver);

  var navLinks = document.querySelectorAll('#sideNav a');
  var navTargets = Array.prototype.slice.call(navLinks).map(function(a){
    return document.getElementById(a.dataset.target);
  }).filter(Boolean);
  var navObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      navLinks.forEach(function(a){ a.classList.toggle('active', a.dataset.target === entry.target.id); });
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  navTargets.forEach(function(t){ navObserver.observe(t); });
  scrollObservers.push(navObserver);
}

// Each row links straight to that style's real page (styles/<key>/) rather
// than duplicating the full essay/capsule/etc. inline -- that content now
// lives in exactly one place, which is also the page search engines index.
function renderCompareList(ranked){
  var el = document.getElementById('compareList');
  el.innerHTML = ranked.map(function(entry, i){
    var style = entry.style;
    var pct = pctMatch(entry.d);
    var tag = i===0 ? '<span class="compare-tag">Primary</span>' : (i===1 ? '<span class="compare-tag">Secondary</span>' : '');
    return '' +
      '<a class="compare-row" href="styles/'+style.key+'/">' +
        '<span class="compare-rank">'+pad(i+1)+'</span>' +
        '<span class="compare-main">' +
          '<span class="compare-name">'+escapeHtml(style.name)+'</span>' + tag +
          '<span class="compare-bar-track"><span class="compare-bar-fill" style="width:'+pct+'%"></span></span>' +
        '</span>' +
        '<span class="compare-pct">'+pct+'%</span>' +
        '<span class="compare-arrow" aria-hidden="true">→</span>' +
      '</a>';
  }).join('');
}

}
})();
