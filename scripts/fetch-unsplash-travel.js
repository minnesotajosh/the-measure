// Fetches one real, properly-licensed, properly-credited Unsplash photo per
// style for the "Where They'd Go" travel section -- a generic location shot
// needs none of the trademark/palette engineering the clothing images do,
// and burning paid Gemini credit on a landscape photo would be wasteful
// when a real (and often better) one is freely available.
//
// Requires an UNSPLASH_ACCESS_KEY in .env (free, no billing -- create an
// app at https://unsplash.com/oauth/applications and copy its Access Key).
//
// Usage:
//   node scripts/fetch-unsplash-travel.js ivy          (one style)
//   node scripts/fetch-unsplash-travel.js --all         (every style missing a travel photo)

const fs = require('fs');
const path = require('path');

function loadEnv(){
  const envPath = path.join(__dirname, '..', '.env');
  if(!fs.existsSync(envPath)) return {};
  const out = {};
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if(m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
  });
  return out;
}

const env = loadEnv();
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || env.UNSPLASH_ACCESS_KEY;
if(!ACCESS_KEY){
  console.error('No UNSPLASH_ACCESS_KEY found in process.env or .env. Aborting -- nothing was called.');
  process.exit(1);
}

const STYLES_PATH = path.join(__dirname, '..', 'data', 'styles.json');

// The image-generation prompt (written for Gemini) makes a decent Unsplash
// search query once its photographic-direction boilerplate is stripped --
// e.g. "A New England college town in autumn -- brick academic buildings..."
// becomes "New England college town in autumn".
function deriveQuery(prompt){
  return prompt
    .split(/\s+Editorial travel photography/)[0]
    .split(' -- ')[0]
    .replace(/^(A|An|The)\s+/, '')
    .replace(/[.,]$/, '')
    .trim();
}

async function search(query){
  const url = 'https://api.unsplash.com/search/photos?per_page=1&orientation=landscape&query=' + encodeURIComponent(query);
  const res = await fetch(url, { headers: { Authorization: 'Client-ID ' + ACCESS_KEY } });
  if(!res.ok) throw new Error('Unsplash API error ' + res.status + ': ' + (await res.text()).slice(0, 300));
  const data = await res.json();
  return data.results && data.results[0];
}

async function fetchOne(style){
  const prompt = style.lifestyle && style.lifestyle.travel && style.lifestyle.travel.prompt;
  if(!prompt){ console.error('   SKIPPED ' + style.key + ': no lifestyle.travel.prompt'); return null; }
  let query = deriveQuery(prompt);
  let photo = await search(query);
  // A long, compound "X or Y" query (several location ideas joined for the
  // image-generation prompt) sometimes returns nothing on Unsplash's real
  // photo index -- fall back to just the first clause, which is usually a
  // single concrete place/scene on its own.
  if(!photo && /,| or /.test(query)){
    const shorter = query.split(/,| or /)[0].trim();
    if(shorter && shorter !== query){
      photo = await search(shorter);
      if(photo) query = shorter;
    }
  }
  if(!photo){ console.error('   NO RESULTS for "' + query + '" (' + style.key + ')'); return null; }
  console.log('   ' + style.key + ': "' + query + '" -> photo by ' + photo.user.name);
  return {
    url: photo.urls.raw,
    credit: photo.user.name,
    profile: photo.user.links.html + '?utm_source=the-measure&utm_medium=referral'
  };
}

async function main(){
  const args = process.argv.slice(2);
  const styles = JSON.parse(fs.readFileSync(STYLES_PATH, 'utf8'));

  let targets;
  if(args.includes('--all')){
    targets = styles.filter(s => !(s.lifestyle.travel.photo));
  } else if(args.length){
    const keys = new Set(args);
    targets = styles.filter(s => keys.has(s.key));
  } else {
    console.error('Usage: node scripts/fetch-unsplash-travel.js <key> [<key>...] | --all');
    process.exit(1);
  }

  console.log('Fetching travel photos for ' + targets.length + ' style(s)...');
  for(const style of targets){
    try{
      const photo = await fetchOne(style);
      if(photo) style.lifestyle.travel.photo = photo;
    }catch(err){
      console.error('   FAILED ' + style.key + ': ' + err.message);
    }
    // Unsplash's free tier is rate-limited (50 req/hr) -- a small pause
    // keeps a full 27-style run comfortably under it without needing to
    // catch a 429 mid-batch.
    await new Promise(r => setTimeout(r, 400));
  }

  fs.writeFileSync(STYLES_PATH, JSON.stringify(styles, null, 2) + '\n', 'utf8');
  console.log('Done. Run `node scripts/build-pages.js` to bake these into the static pages.');
}

main();
