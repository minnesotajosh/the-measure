// Scans images/generated/<key>/ for each style and, wherever a file exists,
// points that style's `photo` (the outfit shot) or a capsule item's `image`
// (its product photo) at it. Safe to re-run any time -- only touches
// entries whose generated file actually exists, so partial batches (a few
// styles generated, most not yet) wire in cleanly without clobbering the
// Unsplash fallback for styles that haven't been generated yet.

const fs = require('fs');
const path = require('path');

const STYLES_PATH = path.join(__dirname, '..', 'data', 'styles.json');
const GEN_ROOT = path.join(__dirname, '..', 'images', 'generated');

function slugify(s){
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const styles = JSON.parse(fs.readFileSync(STYLES_PATH, 'utf8'));
let wiredOutfits = 0, wiredItems = 0;

styles.forEach(style => {
  const dir = path.join(GEN_ROOT, style.key);
  if(!fs.existsSync(dir)) return;

  const outfitPath = path.join(dir, 'outfit.jpg');
  if(fs.existsSync(outfitPath)){
    style.photo = { url: 'images/generated/' + style.key + '/outfit.jpg', generated: true };
    wiredOutfits++;
  }

  style.capsule.forEach(item => {
    const itemPath = path.join(dir, 'item-' + slugify(item.category) + '.jpg');
    if(fs.existsSync(itemPath)){
      item.image = { url: 'images/generated/' + style.key + '/item-' + slugify(item.category) + '.jpg', generated: true };
      wiredItems++;
    }
  });
});

fs.writeFileSync(STYLES_PATH, JSON.stringify(styles, null, 2) + '\n', 'utf8');
console.log('Wired ' + wiredOutfits + ' outfit shot(s) and ' + wiredItems + ' item photo(s).');
