// Scans images/generated/<key>/ for each style and, wherever a file exists,
// points that style's `photo` (the outfit shot), `flatlay` (the combined
// "shop the look" flat-lay), or a capsule item's `photo` (one product shot
// per garment, item-<index>.jpg matching capsule array order) at it. Safe
// to re-run any time -- only touches entries whose generated file actually
// exists, so partial batches wire in cleanly without clobbering the
// Unsplash fallback for styles that haven't been generated yet.

const fs = require('fs');
const path = require('path');

const STYLES_PATH = path.join(__dirname, '..', 'data', 'styles.json');
const GEN_ROOT = path.join(__dirname, '..', 'images', 'generated');

const styles = JSON.parse(fs.readFileSync(STYLES_PATH, 'utf8'));
let wiredOutfits = 0, wiredFlatlays = 0, wiredItems = 0, wiredTravel = 0;

styles.forEach(style => {
  const dir = path.join(GEN_ROOT, style.key);
  if(!fs.existsSync(dir)) return;

  const outfitPath = path.join(dir, 'outfit.jpg');
  if(fs.existsSync(outfitPath)){
    style.photo = { url: 'images/generated/' + style.key + '/outfit.jpg', generated: true };
    wiredOutfits++;
  }

  const flatlayPath = path.join(dir, 'flatlay.jpg');
  if(fs.existsSync(flatlayPath)){
    style.flatlay = { url: 'images/generated/' + style.key + '/flatlay.jpg', generated: true };
    wiredFlatlays++;
  }

  const travelPath = path.join(dir, 'travel.jpg');
  if(fs.existsSync(travelPath) && style.lifestyle && style.lifestyle.travel){
    style.lifestyle.travel.photo = { url: 'images/generated/' + style.key + '/travel.jpg', generated: true };
    wiredTravel++;
  }

  // clean up the superseded per-item image field from the earlier, abandoned approach
  style.capsule.forEach(item => { delete item.image; });

  style.capsule.forEach((item, i) => {
    const itemPath = path.join(dir, 'item-' + i + '.jpg');
    if(fs.existsSync(itemPath)){
      item.photo = { url: 'images/generated/' + style.key + '/item-' + i + '.jpg', generated: true };
      wiredItems++;
    }
  });
});

fs.writeFileSync(STYLES_PATH, JSON.stringify(styles, null, 2) + '\n', 'utf8');
console.log('Wired ' + wiredOutfits + ' outfit shot(s), ' + wiredFlatlays + ' flat-lay(s), ' + wiredItems + ' capsule item photo(s), and ' + wiredTravel + ' travel photo(s).');
