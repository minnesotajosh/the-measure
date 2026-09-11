// One-off patch adding 2 real magazines (with real links) to each style's
// lifestyle.reading -- one general-interest menswear/fashion title plus one
// that fits the specific archetype. Written directly to styles.json rather
// than through data/expansion-content.js since it's a small, targeted
// addition; apply-expansion-content.js preserves this field on re-runs the
// same way it already preserves a wired-in travel photo.
//
// Run once:
//   node scripts/add-magazines.js

const fs = require('fs');
const path = require('path');
const STYLES_PATH = path.join(__dirname, '..', 'data', 'styles.json');

const MAGAZINES = {
  ivy: [{name:"The New Yorker", url:"https://www.newyorker.com"}, {name:"GQ", url:"https://www.gq.com"}],
  neapolitan: [{name:"Monocle", url:"https://monocle.com"}, {name:"GQ", url:"https://www.gq.com"}],
  row: [{name:"The Rake", url:"https://therake.com"}, {name:"Country Life", url:"https://www.countrylife.co.uk"}],
  journeyman: [{name:"Fine Woodworking", url:"https://www.finewoodworking.com"}, {name:"GQ", url:"https://www.gq.com"}],
  minimalist: [{name:"Kinfolk", url:"https://www.kinfolk.com"}, {name:"Wallpaper*", url:"https://www.wallpaper.com"}],
  rivegauche: [{name:"Vogue", url:"https://www.vogue.com"}, {name:"Monocle", url:"https://monocle.com"}],
  dandy: [{name:"The Chap", url:"https://thechap.co.uk"}, {name:"GQ", url:"https://www.gq.com"}],
  countryman: [{name:"Country Life", url:"https://www.countrylife.co.uk"}, {name:"The Field", url:"https://www.thefield.co.uk"}],
  iconoclast: [{name:"Dazed", url:"https://www.dazeddigital.com"}, {name:"i-D", url:"https://i-d.co"}],
  remix: [{name:"Highsnobiety", url:"https://www.highsnobiety.com"}, {name:"Complex", url:"https://www.complex.com"}],
  rancher: [{name:"Cowboys & Indians", url:"https://www.cowboysindians.com"}, {name:"Garden & Gun", url:"https://gardenandgun.com"}],
  rebel: [{name:"Rolling Stone", url:"https://www.rollingstone.com"}, {name:"GQ", url:"https://www.gq.com"}],
  waverider: [{name:"The Surfer's Journal", url:"https://surfersjournal.com"}, {name:"GQ", url:"https://www.gq.com"}],
  financier: [{name:"Robb Report", url:"https://robbreport.com"}, {name:"WSJ Magazine", url:"https://www.wsj.com/magazine"}],
  gearhead: [{name:"XXL", url:"https://www.xxlmag.com"}, {name:"Robb Report", url:"https://robbreport.com"}],
  riviera: [{name:"Monocle", url:"https://monocle.com"}, {name:"GQ", url:"https://www.gq.com"}],
  mod: [{name:"GQ", url:"https://www.gq.com"}, {name:"Esquire", url:"https://www.esquire.com"}],
  professor: [{name:"The New Yorker", url:"https://www.newyorker.com"}, {name:"The Atlantic", url:"https://www.theatlantic.com"}],
  correspondent: [{name:"Foreign Affairs", url:"https://www.foreignaffairs.com"}, {name:"National Geographic", url:"https://www.nationalgeographic.com"}],
  nightcrawler: [{name:"Dazed", url:"https://www.dazeddigital.com"}, {name:"Mixmag", url:"https://mixmag.net"}],
  bohemian: [{name:"Kinfolk", url:"https://www.kinfolk.com"}, {name:"Monocle", url:"https://monocle.com"}],
  undone: [{name:"Thrasher", url:"https://www.thrashermagazine.com"}, {name:"Rolling Stone", url:"https://www.rollingstone.com"}],
  yachtsman: [{name:"Yachting", url:"https://www.yachtingmagazine.com"}, {name:"Sail", url:"https://www.sailmagazine.com"}],
  voltage: [{name:"Mixmag", url:"https://mixmag.net"}, {name:"Dazed", url:"https://www.dazeddigital.com"}],
  officer: [{name:"Military Times", url:"https://www.militarytimes.com"}, {name:"Recoil", url:"https://www.recoilweb.com"}],
  alpinist: [{name:"Alpinist", url:"https://alpinist.com"}, {name:"Climbing", url:"https://www.climbing.com"}],
  athlete: [{name:"Sports Illustrated", url:"https://www.si.com"}, {name:"SLAM", url:"https://www.slamonline.com"}]
};

const styles = JSON.parse(fs.readFileSync(STYLES_PATH, 'utf8'));
let applied = 0;
styles.forEach(style => {
  const mags = MAGAZINES[style.key];
  if(!mags) return;
  style.lifestyle.reading.magazines = mags;
  applied++;
});

fs.writeFileSync(STYLES_PATH, JSON.stringify(styles, null, 2) + '\n', 'utf8');
console.log('Added magazines to ' + applied + ' style(s).');
