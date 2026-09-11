// Merges data/expansion-content.js (guidance + expanded lifestyle sections,
// authored by hand a batch of styles at a time) into data/styles.json.
// Safe to re-run -- only overwrites the styles present in the content file,
// and a style's lifestyle section only gets replaced once its expansion
// entry actually exists, so a partially-filled content file merges in
// cleanly without breaking the styles that haven't been rewritten yet.
//
// Run after every edit to data/expansion-content.js:
//   node scripts/apply-expansion-content.js

const fs = require('fs');
const path = require('path');

const STYLES_PATH = path.join(__dirname, '..', 'data', 'styles.json');
const content = require('../data/expansion-content.js');

const styles = JSON.parse(fs.readFileSync(STYLES_PATH, 'utf8'));
let applied = 0;

styles.forEach(style => {
  const extra = content[style.key];
  if(!extra) return;

  if(extra.guidance) style.guidance = extra.guidance;

  if(extra.lifestyle){
    Object.keys(extra.lifestyle).forEach(section => {
      const existing = style.lifestyle[section];
      // Preserve a photo already wired in by wire-images.js (travel) --
      // this script only owns paragraphs/query/prompt, not the image path.
      const photo = existing && typeof existing === 'object' ? existing.photo : undefined;
      style.lifestyle[section] = Object.assign({}, extra.lifestyle[section], photo ? { photo } : {});
    });
  }

  applied++;
});

fs.writeFileSync(STYLES_PATH, JSON.stringify(styles, null, 2) + '\n', 'utf8');
console.log('Applied expansion content to ' + applied + ' style(s).');
