// Generates, per style: one isolated product-style photo for each of its 5
// capsule-wardrobe items, plus one "outfit shot" showing the full combined
// look worn -- cropped below the neck/shoulders, no invented face, no
// specific named person. All pure text-to-image (no copyrighted reference
// photo fed in), so there's nothing to credit beyond the generator itself.
//
// Usage:
//   node scripts/generate-images.js ivy            (one style, for review)
//   node scripts/generate-images.js ivy row dandy   (a few)
//   node scripts/generate-images.js --all           (every style in data/styles.json)
//
// Requires a GOOGLE_API_KEY (from aistudio.google.com, with billing enabled)
// in a local .env file (gitignored).

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

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
const API_KEY = process.env.GOOGLE_API_KEY || env.GOOGLE_API_KEY
  || process.env.GEMINI_API_KEY || env.GEMINI_API_KEY;
if(!API_KEY){
  console.error('No GOOGLE_API_KEY (or GEMINI_API_KEY) found in process.env or .env. Aborting -- nothing was called.');
  process.exit(1);
}

// Google renames/versions these periodically -- if this model 404s, check
// https://ai.google.dev/gemini-api/docs/image-generation for the current name.
const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';

const STYLES_PATH = path.join(__dirname, '..', 'data', 'styles.json');
const OUT_ROOT = path.join(__dirname, '..', 'images', 'generated');

const HOUSE_STYLE = "Editorial photography for a high-end menswear style guide. Warm " +
  "oxblood-and-cream color grade, dramatic directional natural light, shallow depth of field, " +
  "shot on film with visible grain, the restrained sophisticated look of a 1970s New Yorker " +
  "style feature. No text, no logos, no watermark, no visible brand names.";

const NO_FACE = "Do not depict any human face -- no portraits, no models posed for the camera, " +
  "no head visible at all. If a person appears, show only the body from the shoulders or neck " +
  "down, or hands.";

function slugify(s){
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function findInlineImage(candidate){
  const parts = candidate && candidate.content && candidate.content.parts || [];
  for(const part of parts){
    const inline = part.inlineData || part.inline_data;
    if(inline && inline.data) return inline;
  }
  return null;
}

async function callGemini(prompt, aspectRatio){
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ['IMAGE'],
      imageConfig: { aspectRatio: aspectRatio }
    }
  };
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + MODEL +
    ':generateContent?key=' + API_KEY;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const raw = await res.text();
  if(!res.ok) throw new Error('Gemini API error ' + res.status + ': ' + raw.slice(0, 800));

  let data;
  try{ data = JSON.parse(raw); }
  catch(e){ throw new Error('Non-JSON response: ' + raw.slice(0, 500)); }

  const candidate = data.candidates && data.candidates[0];
  const inline = candidate && findInlineImage(candidate);
  if(!inline) throw new Error('No image in response. Raw: ' + raw.slice(0, 800));
  return inline;
}

// Gemini returns large PNGs (~2MB each); re-encoded as quality-85 JPEG,
// capped at 1600px on the long edge, they land around 150-350KB -- the
// difference between a ~50MB site and a ~300MB one across 27 styles.
async function saveInline(inline, outPath){
  fs.mkdirSync(path.dirname(outPath), {recursive:true});
  const finalPath = outPath.replace(/\.\w+$/, '') + '.jpg';
  const raw = Buffer.from(inline.data, 'base64');
  await sharp(raw)
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(finalPath);
  return finalPath;
}

async function generateItemPhoto(style, item){
  const prompt = HOUSE_STYLE + ' ' + NO_FACE + ' Isolated editorial product photograph of a ' +
    'single garment: ' + item.category + '. ' + item.lookFor + ' Either laid flat with careful ' +
    'styling on a textured neutral surface, or hung/displayed against a simple uncluttered ' +
    'background -- no person wearing it, no mannequin. The garment itself is the entire subject. ' +
    'IMPORTANT: keep the garment\'s own fabric in its true, traditional color for this kind of ' +
    'piece (for example a dress shirt in white or blue, chinos in khaki or tan, denim in indigo) ' +
    '-- apply the warm color grade only to the ambient light, shadows, and background, never as ' +
    'a tint over the garment\'s actual color.';
  const inline = await callGemini(prompt, '4:3');
  const outPath = path.join(OUT_ROOT, style.key, 'item-' + slugify(item.category) + '.png');
  const saved = await saveInline(inline, outPath);
  console.log('   item saved: ' + path.relative(process.cwd(), saved));
  return saved;
}

async function generateOutfitShot(style){
  const pieces = style.capsule.map(i => i.category).join(', ');
  const prompt = HOUSE_STYLE + ' ' + NO_FACE + ' A wide editorial lifestyle photograph of a man ' +
    'wearing a complete outfit built from these pieces: ' + pieces + '. Full outfit visible from ' +
    'the shoulders or neck down to the shoes, positioned to one side of the frame with the ' +
    'setting filling the rest -- ' + style.dek + ' The setting and mood should reflect that. ' +
    'Real, lived-in styling, not a studio backdrop.';
  const inline = await callGemini(prompt, '16:9');
  const outPath = path.join(OUT_ROOT, style.key, 'outfit.png');
  const saved = await saveInline(inline, outPath);
  console.log('   outfit saved: ' + path.relative(process.cwd(), saved));
  return saved;
}

async function generateForStyle(style){
  console.log('-> ' + style.key + ' (' + style.name + ')');
  try{
    await generateOutfitShot(style);
  }catch(err){
    console.error('   FAILED outfit shot for ' + style.key + ': ' + err.message);
  }
  for(const item of style.capsule){
    try{
      await generateItemPhoto(style, item);
    }catch(err){
      console.error('   FAILED item "' + item.category + '" for ' + style.key + ': ' + err.message);
    }
  }
}

async function main(){
  const args = process.argv.slice(2);
  const styles = JSON.parse(fs.readFileSync(STYLES_PATH, 'utf8'));

  // --only-items <key> <item-slug> [<item-slug>...] : regenerate specific
  // item photos for one style, e.g. to fix a single bad result without
  // redoing the whole set. Slugs match the "item-<slug>.png" filenames.
  if(args[0] === '--only-items'){
    const key = args[1];
    const slugs = new Set(args.slice(2));
    const style = styles.find(s => s.key === key);
    if(!style){ console.error('Unknown style key: ' + key); process.exit(1); }
    console.log('Model: ' + MODEL);
    for(const item of style.capsule){
      if(slugs.has(slugify(item.category))){
        try{ await generateItemPhoto(style, item); }
        catch(err){ console.error('   FAILED item "' + item.category + '": ' + err.message); }
      }
    }
    console.log('Done.');
    return;
  }

  let targets;
  if(args.includes('--all')){
    targets = styles;
  } else if(args.length){
    const keys = new Set(args);
    targets = styles.filter(s => keys.has(s.key));
    const missing = args.filter(a => !styles.some(s => s.key === a));
    if(missing.length){ console.error('Unknown style key(s): ' + missing.join(', ')); process.exit(1); }
  } else {
    console.error('Usage: node scripts/generate-images.js <key> [<key>...] | --all | --only-items <key> <slug>...');
    process.exit(1);
  }

  console.log('Model: ' + MODEL);
  console.log('Generating for ' + targets.length + ' style(s), 6 images each (1 outfit + 5 items)...');
  for(const style of targets){
    await generateForStyle(style);
  }
  console.log('Done.');
}

main();
