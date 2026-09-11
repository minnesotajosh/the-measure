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
// The actual markup lives in templates/*.ejs (EJS), not in this file --
// this script's job is just to compute each style's view-model (image
// paths adjusted for how deep the page sits, the scroll-effects image map,
// the "other styles" picks) and render it through those templates.
//
// Run after any change to data/styles.json:
//   node scripts/build-pages.js

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const helpers = require('./lib/render-helpers');

const ROOT = path.join(__dirname, '..');
const STYLES_PATH = path.join(ROOT, 'data', 'styles.json');
const OUT_STYLES_DIR = path.join(ROOT, 'styles');
const TEMPLATES_DIR = path.join(ROOT, 'templates');

// Update this if the repo is ever renamed or moved to a custom domain --
// used only for absolute URLs required by Open Graph / Twitter card tags
// and the sitemap, which don't work reliably with relative paths.
const SITE_URL = 'https://minnesotajosh.github.io/the-measure';

const styles = JSON.parse(fs.readFileSync(STYLES_PATH, 'utf8'));

function compileTemplate(name){
  const file = path.join(TEMPLATES_DIR, name);
  return ejs.compile(fs.readFileSync(file, 'utf8'), { filename: file });
}
const stylePageTemplate = compileTemplate('style-page.ejs');
const stylesIndexTemplate = compileTemplate('styles-index.ejs');

// A handful of internal links to other archetypes -- real crawlable <a>
// links between pages are most of what makes a page graph "SEO." Picks 6
// spread across the list, deterministic but varied, rather than always the
// same neighbors.
function otherStylePicks(current, all){
  const others = all.filter(s => s.key !== current.key);
  const picks = [];
  for(let i = 0; i < 6; i++){
    picks.push(others[(others.indexOf(current) + i * 4 + 3) % others.length] || others[i]);
  }
  const seen = {};
  return picks.filter(s => {
    if(!s || seen[s.key]) return false;
    seen[s.key] = 1;
    return true;
  });
}

// The image map driving scroll-effects.js: one entry per data-bg value that
// actually has a real image, paths already adjusted for this page's depth
// (two levels under the site root).
function buildScrollImages(style){
  const prefix = '../../';
  const travelPhoto = style.lifestyle && style.lifestyle.travel && style.lifestyle.travel.photo;
  const images = {
    photo: helpers.photoSrc(style.photo, prefix),
    flatlay: helpers.photoSrc(style.flatlay, prefix),
    travel: helpers.photoSrc(travelPhoto, prefix, 'w=1600&h=1200&q=80&auto=format&fit=crop')
  };
  (style.capsule || []).forEach((item, i) => {
    if(item.photo) images['item-' + i] = helpers.photoSrc(item.photo, prefix);
  });
  Object.keys(images).forEach(k => { if(!images[k]) delete images[k]; });
  return images;
}

function pageHTML(style, all){
  const ogImage = SITE_URL + '/' + style.photo.url;
  const canonical = SITE_URL + '/styles/' + style.key + '/';

  return stylePageTemplate({
    style, all,
    title: style.name + ' — Full Style Profile | The Measure',
    description: style.dek,
    canonical, ogImage,
    prefix: '../../',
    otherStylePicks: otherStylePicks(style, all),
    scrollImages: buildScrollImages(style),
    ...helpers
  });
}

function buildSitemap(all){
  const urls = [SITE_URL + '/', SITE_URL + '/styles/'].concat(
    all.map(s => SITE_URL + '/styles/' + s.key + '/')
  );
  const body = urls.map(u => '  <url><loc>' + u + '</loc></url>').join('\n');
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + body + '\n</urlset>\n';
}

// -- write everything --
fs.mkdirSync(OUT_STYLES_DIR, { recursive: true });
let built = 0;
styles.forEach(style => {
  if(!style.photo || !style.essay || !style.capsule || !style.variants || !style.lifestyle){
    console.log('SKIPPED (incomplete data): ' + style.key);
    return;
  }
  const dir = path.join(OUT_STYLES_DIR, style.key);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), pageHTML(style, styles), 'utf8');
  built++;
});
fs.writeFileSync(path.join(OUT_STYLES_DIR, 'index.html'), stylesIndexTemplate({ all: styles, siteUrl: SITE_URL }), 'utf8');
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), buildSitemap(styles), 'utf8');
console.log('Built ' + built + ' style page(s), the styles index, and sitemap.xml.');
