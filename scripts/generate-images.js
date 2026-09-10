// Generates, per style: one "outfit shot" (a full look worn, cropped below
// the neck/shoulders -- no invented face, no specific named person) and one
// combined "flat-lay" showing all 5 capsule-wardrobe items arranged together
// on a neutral surface, "shop the look" style. All pure text-to-image (no
// copyrighted reference photo fed in), so there's nothing to credit beyond
// the generator itself.
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

// Deliberately NOT a color mandate -- this describes the *photographic*
// treatment only (light quality, grain, restraint). An earlier version of
// this prompt said "warm oxblood-and-cream color grade" here, which the
// model took as license to tint every garment burgundy regardless of the
// style -- Minimalist's grey/black/navy came out looking like Ivy. Garment
// color now comes exclusively from paletteNote() below, per style.
const HOUSE_STYLE = "Editorial photography for a high-end menswear style guide -- the " +
  "restrained, sophisticated look of a 1970s New Yorker style feature: dramatic directional " +
  "natural light, shallow depth of field, shot on film with visible grain. Absolutely no visible " +
  "text, words, letters, or writing anywhere in the image. Do not depict or reference any real " +
  "brand's actual logo, monogram, or trademarked pattern (no interlocking letters, no repeating " +
  "monogram canvas, no real designer hardware) -- if a garment would realistically carry a maker's " +
  "mark, invent a plain, generic one, or leave it unmarked entirely. This applies even to styles " +
  "that are culturally associated with visible luxury branding: convey that through silhouette, " +
  "fabric, and styling, never by reproducing an actual trademark. If any denim/jeans appear, the " +
  "back pockets must be either bare or stitched with a simple straight or single-line pattern only " +
  "-- never the double-arc \"seagull wing\" stitch of a well-known jeans brand -- and the waistband " +
  "must carry no leather or fabric patch and no colored tab of any kind on the side seam.";

// A few styles are explicitly *about* logomania (Gearhead is the clear
// case) -- their own trademarks text literally says "monogram" and names
// real houses (Gucci, Nike, etc.), which pushed the model to reproduce
// actual trademarks (a real GG pattern, an actual Nike swoosh) rather than
// just capturing the *idea* of visible luxury branding. This override
// replaces the trademark text fed to the image prompt for those styles
// only -- the written essay/trademarks on the site are untouched.
const IMAGE_SAFE_TRADEMARKS = {
  gearhead: [
    "A bold, entirely fictional geometric or graphic repeat pattern used across a tracksuit and puffer jacket -- invented, not a real luxury house's monogram",
    "A heavy, chunky metal chain and rings, worn as a visible display of value",
    "Sneakers in a bold two-tone or color-blocked design with completely PLAIN, BLANK side panels -- absolutely no side logo of any shape or size, no swoosh-like curved checkmark, no stripes, nothing printed or stitched on the side of the shoe at all",
    "Fur or shearling trim layered onto outerwear",
    "Head-to-toe branding conveyed through boldness of color and pattern alone, never by depicting an actual trademark"
  ],
  athlete: [
    "A varsity jacket, wool body and leather sleeves, with a plain fictional initial or number -- not a real school or team name",
    "A team jersey and mesh shorts in bold color-blocked team colors, with an invented team name/wordmark and a generic athletic crest -- not any real league's actual name, logo, or wordmark (no NBA/NFL/MLB branding)",
    "Sneakers with a bold retro color-blocked design and NO real brand markings of any kind -- no swoosh, no three stripes, no other real logo",
    "Sweatshirts and warm-up gear in solid team colors",
    "A structured cap in team colors with a plain fictional initial, not a real team's logo"
  ],
  // Mod's own trademarks name "Fred Perry" outright, which pushed the model
  // to reproduce that brand's actual laurel-wreath logo on the polo.
  mod: [
    "A slim two- or three-button suit, cut close through the body, in black or deep navy",
    "A fishtail parka worn over the suit, purely for the ride over, in olive drab",
    "Button-down shirts and knitted ties, borrowed from Ivy style",
    "A plain crew-neck knit shirt with a short button placket at the collar, in a bold solid color, entirely unbranded -- no embroidered emblem, no rider-on-horseback or animal silhouette, no wreath shape, no logo of any kind anywhere on it",
    "Chelsea boots or bowling shoes, kept sharp and low-profile, in black or oxblood"
  ]
};
// Named reference colors for turning a style's palette hex codes into words
// a text prompt can act on. Without this, the model defaults to a generic
// warm oxblood/burgundy for almost anything -- it did so even for styles
// whose actual palette is teal, true red, or navy-and-gold, silently
// overwriting them. Distance is plain Euclidean in RGB space, which is
// crude but plenty to pick the right family (navy vs. teal vs. burgundy).
const NAMED_COLORS = [
  ['black', 0x10,0x10,0x10], ['charcoal', 0x36,0x36,0x38], ['grey', 0x8c,0x8c,0x86],
  ['silver', 0xb8,0xb8,0xb0], ['white', 0xf2,0xf0,0xea], ['cream', 0xed,0xe3,0xc8],
  ['navy', 0x1b,0x2a,0x4a], ['steel blue', 0x3b,0x5a,0x78], ['dusty blue', 0x5b,0x8f,0xa8],
  ['teal', 0x2c,0x78,0x73], ['cyan', 0x19,0xd3,0xe0], ['forest green', 0x2f,0x4f,0x2f],
  ['olive', 0x55,0x6b,0x2f], ['sage green', 0x5b,0x6b,0x4a], ['burgundy/oxblood', 0x6e,0x1f,0x24],
  ['true red', 0xc4,0x1e,0x3a], ['brick red/terracotta', 0xb5,0x65,0x1d], ['coral', 0xe0,0x8e,0x6d],
  ['magenta/pink', 0xe0,0x19,0xa0], ['purple', 0x5b,0x2a,0x86], ['brown', 0x8c,0x5a,0x3c],
  ['tan/camel', 0xc9,0xa0,0x63], ['brass/gold', 0xc9,0xa2,0x27], ['orange', 0xe0,0x69,0x2e]
];
function nearestColorName(hex){
  const n = parseInt(hex.replace('#',''), 16);
  const r = (n>>16)&255, g = (n>>8)&255, b = n&255;
  let best = null, bestDist = Infinity;
  for(const [name, nr, ng, nb] of NAMED_COLORS){
    const d = (r-nr)**2 + (g-ng)**2 + (b-nb)**2;
    if(d < bestDist){ bestDist = d; best = name; }
  }
  return best;
}
function paletteNote(style){
  const trademarks = IMAGE_SAFE_TRADEMARKS[style.key] || style.trademarks;
  const colorWords = style.palette.map(nearestColorName).join(', ');
  return "The garments' own colors must faithfully match this style's actual described palette " +
    "and character: " + trademarks.join('; ') + ". The dominant colors visible across the outfit " +
    "MUST be drawn from this style's real palette -- " + colorWords + " -- and nothing else; do " +
    "not substitute a generic warm burgundy/oxblood/sepia palette unless one of those named colors " +
    "is itself burgundy, oxblood, or brown. Warm color grading, if any, belongs only to the ambient " +
    "light and the environment, never to the garments themselves.";
}

const NO_FACE = "Do not depict any human face -- no portraits, no models posed for the camera, " +
  "no head visible at all. If a person appears, show only the body from the shoulders or neck " +
  "down, or hands.";

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
// difference between a ~20MB site and a ~100MB one across 27 styles.
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

// A handful of style deks name an actual product (mod's references riding
// off on "a Vespa") -- fine as written copy, but fed straight into an image
// prompt it reliably drew Piaggio's real Vespa wordmark and shield badge.
// Swapped for a generic equivalent for image-generation purposes only; the
// site's own text is untouched.
const IMAGE_SAFE_SCENE_WORDS = [
  [/\bVespa\b/gi, 'vintage Italian scooter']
];
function sanitizeForImage(text){
  return IMAGE_SAFE_SCENE_WORDS.reduce((t, [re, repl]) => t.replace(re, repl), text);
}

// The generic anti-logo clause in HOUSE_STYLE wasn't enough on its own to
// stop the model reaching for an actual Levi's back pocket (the tan patch,
// the orange side tab, the double-arc "arcuate" stitch) any time "jeans" is
// in the piece list -- it took a second, blunt, close-to-the-word repeat to
// actually break the association (same lesson as the sneaker swoosh below).
function denimNote(pieceText){
  if(!/\bjean|\bdenim/i.test(pieceText)) return '';
  return ' If jeans/denim trousers appear, fold or position them front-side up, waistband-and-fly ' +
    'facing the camera, so the back pockets are simply not in frame at all -- this matters because ' +
    'a real jeans brand\'s back-pocket stitching pattern and side-seam tab must never be drawn, and ' +
    'showing the front avoids the question entirely. Do not show the back of the jeans.';
}

// Same lesson, different garment: the word "sneakers" alone reliably pulled
// in an actual Nike swoosh (or similar) even for styles with no connection
// to Nike in their own text.
function sneakerNote(pieceText){
  if(!/sneaker|trainer/i.test(pieceText)) return '';
  return ' If sneakers/trainers appear, this is critical: their side panels must be completely ' +
    'plain and blank -- no swoosh-like curved checkmark, no stripes, no jumpman silhouette, no ' +
    'other logo of any shape, size, or color anywhere on the shoe, no matter how standard that ' +
    'looks on real sneakers.';
}

async function generateOutfitShot(style){
  const pieces = (IMAGE_SAFE_TRADEMARKS[style.key] || style.capsule.map(i => i.category)).join(', ');
  const scene = sanitizeForImage(style.dek);
  const prompt = HOUSE_STYLE + ' ' + NO_FACE + ' ' + paletteNote(style) + ' A wide editorial ' +
    'lifestyle photograph of a man wearing a complete outfit built from these pieces: ' + pieces +
    '. Full outfit visible from the shoulders or neck down to the shoes, positioned to one side ' +
    'of the frame with the setting filling the rest -- ' + scene + ' The setting and mood ' +
    'should reflect that. Real, lived-in styling, not a studio backdrop. If any vehicle appears, ' +
    'it must carry no real manufacturer badge, wordmark, or emblem of any kind.' +
    denimNote(pieces) + sneakerNote(pieces);
  const inline = await callGemini(prompt, '16:9');
  const outPath = path.join(OUT_ROOT, style.key, 'outfit.png');
  const saved = await saveInline(inline, outPath);
  console.log('   outfit saved: ' + path.relative(process.cwd(), saved));
  return saved;
}

async function generateFlatlay(style){
  const pieceList = IMAGE_SAFE_TRADEMARKS[style.key]
    ? IMAGE_SAFE_TRADEMARKS[style.key].join('; ')
    : style.capsule.map(function(item){ return item.category + ' (' + item.lookFor.split('.')[0] + ')'; }).join('; ');
  const prompt = HOUSE_STYLE + ' ' + NO_FACE + ' ' + paletteNote(style) + ' A "shop the look" ' +
    'flat-lay photograph for a menswear style guide, shot from directly above (or a slight angle) ' +
    'on a plain, softly lit neutral surface -- cream, warm white, or light linen. Arrange these ' +
    'garments and accessories neatly with generous, even spacing so every single piece is fully ' +
    'visible and distinct, none overlapping: ' + pieceList + '. Soft, even lighting throughout, ' +
    'minimal harsh shadow, so the flat-lay reads as clean and genuinely shoppable.' +
    denimNote(pieceList) + sneakerNote(pieceList);
  const inline = await callGemini(prompt, '4:3');
  const outPath = path.join(OUT_ROOT, style.key, 'flatlay.png');
  const saved = await saveInline(inline, outPath);
  console.log('   flatlay saved: ' + path.relative(process.cwd(), saved));
  return saved;
}

async function generateForStyle(style){
  console.log('-> ' + style.key + ' (' + style.name + ')');
  try{
    await generateOutfitShot(style);
  }catch(err){
    console.error('   FAILED outfit shot for ' + style.key + ': ' + err.message);
  }
  try{
    await generateFlatlay(style);
  }catch(err){
    console.error('   FAILED flatlay for ' + style.key + ': ' + err.message);
  }
}

async function main(){
  const args = process.argv.slice(2);
  const styles = JSON.parse(fs.readFileSync(STYLES_PATH, 'utf8'));

  // --only <outfit|flatlay> <key> [<key>...] : regenerate just one image
  // type for one or more styles, e.g. to fix a single bad result.
  if(args[0] === '--only'){
    const which = args[1];
    const keys = args.slice(2);
    const targets = styles.filter(s => keys.includes(s.key));
    console.log('Model: ' + MODEL);
    for(const style of targets){
      console.log('-> ' + style.key);
      try{
        if(which === 'outfit') await generateOutfitShot(style);
        else if(which === 'flatlay') await generateFlatlay(style);
        else { console.error('Unknown type: ' + which + ' (use "outfit" or "flatlay")'); process.exit(1); }
      }catch(err){
        console.error('   FAILED: ' + err.message);
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
    console.error('Usage: node scripts/generate-images.js <key> [<key>...] | --all | --only <outfit|flatlay> <key>...');
    process.exit(1);
  }

  console.log('Model: ' + MODEL);
  console.log('Generating for ' + targets.length + ' style(s), 2 images each (outfit + flatlay)...');
  for(const style of targets){
    await generateForStyle(style);
  }
  console.log('Done.');
}

main();
