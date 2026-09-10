// Scans images/generated/<key>/ for each style and, wherever a file exists,
// points that style's `photo` (the outfit shot) or `flatlay` (the combined
// "shop the look" flat-lay) at it. Safe to re-run any time -- only touches
// entries whose generated file actually exists, so partial batches wire in
// cleanly without clobbering the Unsplash fallback for styles that haven't
// been generated yet.

const fs = require('fs');
const path = require('path');

const STYLES_PATH = path.join(__dirname, '..', 'data', 'styles.json');
const GEN_ROOT = path.join(__dirname, '..', 'images', 'generated');

const styles = JSON.parse(fs.readFileSync(STYLES_PATH, 'utf8'));
let wiredOutfits = 0, wiredFlatlays = 0;

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

  // clean up the superseded per-item image field from the earlier approach
  style.capsule.forEach(item => { delete item.image; });
});

fs.writeFileSync(STYLES_PATH, JSON.stringify(styles, null, 2) + '\n', 'utf8');
console.log('Wired ' + wiredOutfits + ' outfit shot(s) and ' + wiredFlatlays + ' flat-lay(s).');
