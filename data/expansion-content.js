// Additional per-style content layered onto data/styles.json by
// scripts/apply-expansion-content.js: "Do's and Don'ts" guidance, and the
// "Beyond the Closet" lifestyle sections expanded from one paragraph each
// into two, plus a search query (for a real outbound link) or an image
// prompt (for the travel photo) per section. Authored in JS rather than
// JSON so quotes/apostrophes don't need escaping.
//
// Not every style has an entry yet -- the merge script only touches styles
// present here, so this file can be filled in over several passes.

module.exports = {
  ivy: {
    guidance: {
      dos: [
        "Buy the sack jacket a half-size roomier than instinct suggests — the silhouette depends on a soft, uncollapsed shoulder, and a jacket cut tight through the chest fights the whole point of it. The same goes for trousers: a slight break, never a crease sharp enough to stand on its own, is what separates this look from a banker's suit trying to relax on the weekend.",
        "Let color carry the argument instead of pattern density — one well-chosen madras or repp tie against solid oxford and chino does more than three competing patterns stacked at once. Buy the loafer in a color dark enough to survive a decade of scuffing; this is a shoe meant to be resoled, not replaced."
      ],
      donts: [
        "The most common mistake is treating the sack jacket like a slim modern blazer and having it tailored to match — take in the waist and you've built a different, more contemporary garment that happens to share a fabric. A tweed odd jacket bought for a country weekend and a navy blazer bought for a client dinner aren't interchangeable either, despite both technically being \"jackets\": the tweed reads as leisure anywhere near a desk, and the blazer reads as trying too hard anywhere near a barn.",
        "Don't chase the collegiate references too literally — a crest blazer with an actual coat of arms, or a tie in a pattern that belongs to a real institution you didn't attend, tips the whole thing from educated into costume. The style works because it's understated; anything that announces itself defeats the purpose."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "New England in October — the Cape, coastal Maine, a college-town Saturday with a football game attached, the leaves turning on cue as if the calendar had been consulted. The appeal isn't novelty; it's the same handful of places, returned to across decades, until the town itself starts to feel like an heirloom.",
          "Further afield, Bermuda in the pastel-shorts months, or a grand tour of England's older universities taken the summer after graduation and referenced fondly for the rest of a career. The itinerary rarely changes much from what an uncle or a grandfather would have chosen; that continuity is the whole point."
        ],
        prompt: "A New England college town in autumn -- brick academic buildings, a quiet quad, changing leaves, or a coastal Maine harbor at golden hour. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "John Cheever and John O'Hara for the fiction — suburban discontent rendered in a prose style far more elegant than the subject matter deserves — and George Frazier's essays for the reference material on how any of this is supposed to look.",
          "The New Yorker read cover to cover, in print, and a battered Fitzgerald novel kept around less to reread than to have visibly on the shelf. A recent biography of whichever midcentury WASP novelist is having a moment gets added without much scrutiny of whether it will actually be finished."
        ],
        query: "John Cheever John O'Hara Fitzgerald novels"
      },
      music: {
        paragraphs: [
          "Dave Brubeck and the Modern Jazz Quartet on the record player — cool, unhurried, vaguely collegiate jazz that asks for attention without demanding it — with a soft spot for the Kingston Trio's scrubbed-clean folk revival.",
          "Whatever the a cappella group down the hall was rehearsing gets absorbed by osmosis and never quite leaves. Sinatra at a wedding, without apology, and a standing argument about which Christmas album is the correct one."
        ],
        query: "Dave Brubeck Modern Jazz Quartet"
      },
      home: {
        paragraphs: [
          "A wood-paneled study with more books than shelf space, a worn leather club chair inherited rather than bought, and a brass reading lamp that's needed rewiring for years but gets forgiven for it.",
          "A crew oar or two mounted on the wall, family photographs in mismatched frames going back further than seems statistically likely, and exactly one loud piece of art someone brought back from a semester abroad and refuses to explain."
        ],
        query: "wood paneled study Ivy League interior decor"
      },
      pastimes: {
        paragraphs: [
          "Sailing, squash, and a standing golf game that's as much a social calendar as a sport. A genuine interest in college football rivalries that predate his own enrollment, tracked with more emotional investment than the pro leagues ever earn.",
          "Tends the same garden his parents did, badly at first and then, eventually, without thinking about it. A August week spent teaching a nephew to sail counts as both a vacation and an obligation, and he wouldn't have it structured any other way."
        ],
        query: "learn sailing squash lessons"
      }
    }
  },

  neapolitan: {
    guidance: {
      dos: [
        "Buy the jacket unlined, or at most half-lined, even in a cooler climate — a sweater underneath solves for warmth without sacrificing the soft shoulder that makes the whole silhouette work. Let the jacket show its construction a little: a visible pucker at the sleevehead is a mark of quality here, not a flaw to have pressed out.",
        "Lean into color and texture where English or American tailoring would stay conservative — a brown suede jacket, an unstructured linen blazer with real wrinkles in it by 3pm, a pocket square that doesn't quite match anything else. The confidence is the point; worn like it's precious rather than lived-in, the jacket has missed the assignment."
      ],
      donts: [
        "The jacket that makes this style work in a trattoria will look underdressed and slightly sloppy in a boardroom — this is fundamentally leisure tailoring, built for warm weather and long lunches, not for a client pitch that calls for structure and a stronger shoulder. A soft-shouldered, unlined jacket worn somewhere that calls for the discipline of a proper suit coat reads as not having one, not as having chosen this one on purpose — the same country-versus-city confusion that trips up English tailoring, just with the roles reversed.",
        "Don't iron out the texture that's supposed to be there — a crisply pressed, wrinkle-free version of this silhouette isn't more polished, it's a different style wearing this one's clothes. Avoid pairing the closer, shorter Neapolitan cut with the wider-legged trousers that belong to English tailoring; the whole point is a leaner, more continuous line from shoulder to shoe."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Naples itself, unglamorized, plus Capri for a long lunch and the Amalfi coast off-season, when the crowds and the prices both thin out. Trips get planned around a specific trattoria as often as a view, and a detour is always justified if the reason is food.",
          "Puglia for the olive oil and the quiet, and a standing argument with anyone who suggests Rome is a substitute for any of this. The south is treated as a different country from the north, and visited with the loyalty of someone defending a hometown."
        ],
        prompt: "The Amalfi coast or a Naples street scene at golden hour -- sun-faded buildings, the sea, laundry lines strung between balconies. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Elena Ferrante for the city as much as the story, and Curzio Malaparte's The Skin for a darker, stranger version of the same place. Any biography of a Neapolitan tailor that happens to exist gets read cover to cover, footnotes included.",
          "Reads at a cafe table, not a desk, and rarely finishes a book in one sitting — the interruptions from people he knows are considered part of the experience, not an annoyance to it."
        ],
        query: "Elena Ferrante Naples novels"
      },
      music: {
        paragraphs: [
          "Classic Neapolitan song — 'O Sole Mio unironically, the way it was always meant to be heard — alongside Pino Daniele's bluesy, more modern reinvention of the same tradition.",
          "Opera, attended live whenever the chance arises rather than streamed, with a strong and often contrarian opinion about which regional company does it better than San Carlo."
        ],
        query: "Pino Daniele Neapolitan classics"
      },
      home: {
        paragraphs: [
          "Sun-faded plaster walls left that way on purpose, and a table built for long lunches rather than efficient ones — big enough for people to arrive and leave throughout the afternoon without anyone getting up.",
          "Mismatched but beautiful ceramics collected over years rather than bought as a set, and windows kept open regardless of season, on the theory that a house should breathe the same air as the street."
        ],
        query: "sun faded Mediterranean interior decor"
      },
      pastimes: {
        paragraphs: [
          "Long lunches treated as the day's main event rather than an interruption to it, and a standing card game that's been running with the same four players for longer than anyone will admit.",
          "An interest in food that borders on the scholarly — knowing exactly which market stall has the best of anything, and being willing to walk considerably further than necessary to prove it."
        ],
        query: "Italian home cooking classes"
      }
    }
  },

  row: {
    guidance: {
      dos: [
        "Invest the real money in the structured suit jacket itself — the padded shoulder and nipped waist depend entirely on construction quality a lower price point simply can't fake, and a half-canvassed compromise collapses within a year where a full canvas holds its shape for decades. Have it properly fitted to your actual shoulders rather than bought off the rack and hoped into place; this silhouette has no forgiveness for a jacket that doesn't fit at the shoulder seam.",
        "Reserve the tweed and odd jackets for genuinely rural or country contexts — a shooting weekend, a walk through actual mud — and let them look slightly worn in a way the town suit never should. The contrast between disciplined city tailoring and relaxed country tweed is the whole logic of an English wardrobe; it only works if both halves stay in their own lane."
      ],
      donts: [
        "This is the tweed-versus-suit-coat distinction in its purest form: a country tweed jacket is cut roomier, in a heavier cloth, meant to move under a gun or over a jumper in the rain — worn into the City for a meeting, it reads as a man who got dressed in the dark, not as versatile layering. A structured city suit coat, meanwhile, looks absurd on a grouse moor; the sharp shoulder and fine cloth that impress in a boardroom just get in the way outdoors and get ruined by the first bit of weather. Neither jacket is formal or casual in isolation — they're formal or casual for a specific place, and swapping them is the single most common way this wardrobe gets misread.",
        "Don't let the accessories compete with the tailoring — a busy tie, a boutonniere, or a pocket square doing too much work undercuts a silhouette that's supposed to communicate through cut and cloth alone. Avoid buying this jacket in a fashion-slim contemporary fit; the structured shoulder and nipped waist are a specific, traditional proportion, not a template to be updated each season."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "The Scottish Highlands for the shooting season, a London club for everything else, and Venice exactly once, taken seriously rather than as a honeymoon cliche. A place with a proper concierge is preferred to one with a view, on the theory that service outlasts scenery.",
          "The itinerary rarely strays far from a short, well-worn list — the same hotel, the same tailor's fitting worked into the trip, the same restaurant that's kept a table for the family for three generations."
        ],
        prompt: "The Scottish Highlands during shooting season, misty moorland, or a grand London street with period architecture in soft overcast light. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Anthony Trollope and Evelyn Waugh, read less for plot than for the precise social comedy of people behaving exactly as their class expects them to. A well-thumbed Debrett's kept more as reference than aspiration.",
          "The Financial Times read in full at breakfast, paper edition only, in an order that never varies — front section, then the pink pages, obituaries checked out of habit rather than morbidity."
        ],
        query: "Anthony Trollope Evelyn Waugh novels"
      },
      music: {
        paragraphs: [
          "Elgar and Vaughan Williams on principle, and an opera subscription taken as seriously as club membership — missed only for genuine emergencies, and complained about extensively when the tenor disappoints.",
          "Exactly the right amount of enthusiasm for a military brass band at the right occasion, and a private, slightly guilty fondness for a big band record that gets played only when no one else is home."
        ],
        query: "Elgar Vaughan Williams English orchestral"
      },
      home: {
        paragraphs: [
          "A London townhouse with a proper library, leather-bound sets acquired rather than curated, and family portraits nobody quite remembers commissioning but everyone would notice if removed.",
          "A drinks trolley that has never once been empty, a fireplace that's genuinely used rather than decorative, and furniture old enough that reupholstering it is treated as restoration rather than shopping."
        ],
        query: "London townhouse library interior decor"
      },
      pastimes: {
        paragraphs: [
          "Shooting, taken up young and never really abandoned, and a standing tailor's appointment approached with the gravity of a doctor's visit — missed reluctantly, and rescheduled immediately.",
          "Chess played slowly, over weeks, by correspondence if necessary, against the same handful of opponents. A genuine, lifelong subscription to a specific London club that outlived several of its most notable members."
        ],
        query: "clay pigeon shooting lessons"
      }
    }
  },

  journeyman: {
    guidance: {
      dos: [
        "Buy the raw denim unwashed and let it fade from your own wear — the creases at the knee and fade at the pocket are supposed to map your actual life, and a pre-distressed pair fakes a story that isn't there. The same logic applies to the boots: resole them rather than replace them, since a scuffed, re-heeled boot reads as more credible than a pristine one.",
        "Let the chore coat and chambray shirt show real wear at the cuffs and collar — this wardrobe is built around functional garments actually being used for something, and a spotless version of any of it undercuts the whole premise. Spend on quality at the stress points — bar-tacks, rivets, real leather rather than bonded — since these are the pieces meant to outlast a decade of actual use."
      ],
      donts: [
        "Don't buy this wardrobe pre-distressed or 'vintage-washed' from a fast-fashion label — the whole point is authentic wear accumulated through actual use, and a manufactured fade or a fake grease stain reads as costume the moment anyone looks closely. This is the rare style where trying too hard to look effortless is worse than looking slightly too new.",
        "Resist pairing genuinely heavy-duty workwear with anything precious or delicate — a fine silk pocket square or a dress shoe undercuts the coherence of a wardrobe that's supposed to read as one continuous, practical logic from collar to boot. If the clothes never actually get dirty, the whole thing reads as affectation rather than habit."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "A cross-country drive over a coastal flight every time, and national parks over resorts — the destination matters less than having somewhere to actually stop the car and look at something.",
          "Small industrial towns get visited specifically to see how something is still made there — a mill, a tannery, a foundry — with the same reverence other people reserve for museums."
        ],
        prompt: "An American national park landscape or a small industrial town with a working mill or tannery, dramatic natural light. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Cormac McCarthy and John Steinbeck, read for the landscape as much as the plot, and biographies of tradesmen and inventors who built something with their hands before anyone thought to write about them.",
          "Any well-illustrated history of American manufacturing gets picked up secondhand and actually read, not just displayed. Reads at night, after the work is actually done, and falls asleep doing it more often than not."
        ],
        query: "Cormac McCarthy John Steinbeck novels"
      },
      music: {
        paragraphs: [
          "Woody Guthrie and early Johnny Cash, plus Springsteen's blue-collar records specifically — the ones about the job and the town, not the arena tours.",
          "A genuine, unpretentious love of country radio on a long drive, station chosen by whatever comes in clearest rather than any particular loyalty."
        ],
        query: "Woody Guthrie Johnny Cash classic"
      },
      home: {
        paragraphs: [
          "A workbench that gets more attention than the living room, tools organized with real reverence — each one with a place, and a specific opinion about who's allowed to borrow which.",
          "Furniture built rather than bought where possible, imperfect in ways that are pointed out with pride rather than apology, and nothing precious enough in the house to actually worry about."
        ],
        query: "garage workshop organization ideas"
      },
      pastimes: {
        paragraphs: [
          "Woodworking, and a habit of fixing whatever's broken before seriously considering replacing it — the fix doesn't always outlast the original, but the attempt is non-negotiable.",
          "Fishing that's more about the quiet than the catch, and a garage project that's been 'almost done' for a year, worked on in twenty-minute increments whenever the mood strikes."
        ],
        query: "beginner woodworking classes"
      }
    }
  },

  minimalist: {
    guidance: {
      dos: [
        "Spend the real money on fabric and construction rather than a recognizable logo — this wardrobe has almost nothing else to signal quality with, so a cheap textile or a sloppy seam is instantly visible in a way it wouldn't be under a busier design. Let proportion do the work that pattern or color would do elsewhere: a slightly longer coat hem, a slightly boxier shoulder, is how this style actually expresses itself.",
        "Keep the palette genuinely disciplined — black, grey, navy, off-white — rather than letting one 'interesting' color piece sneak in and undercut the whole logic. Buy fewer, better pieces specifically in this world; a minimalist wardrobe with twenty mediocre basics has missed the point as badly as a maximalist one with three good ones."
      ],
      donts: [
        "Don't confuse minimal with cheap or plain — a bare, unconsidered outfit in flat colors reads as having not tried, while true minimalism is a considerable amount of quality and precision working hard to look effortless. The tell is always in the details a lazier version skips: the drape of the fabric, the exact length of a hem, the way a seam actually sits.",
        "Avoid technical or sporty fabrics that read as athleisure rather than tailoring — a minimalist wardrobe is still a considered, adult wardrobe, not a resting uniform. Don't let the absence of branding become its own kind of branding; head-to-toe monochrome from a single of-the-moment label is a uniform, not the personal restraint this style is actually about."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Copenhagen, Kyoto, and a week off-grid at a design-forward cabin with no cell service — the common thread is architecture that respects negative space rather than filling it.",
          "Packs one bag, always, and treats the ability to do so as a point of quiet pride rather than a constraint. The itinerary tends to include at least one museum chosen specifically for the building rather than the collection inside it."
        ],
        prompt: "A minimalist piece of modern architecture in Copenhagen or Kyoto -- clean lines, negative space, quiet natural light. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Marie Kondo taken more seriously than she's usually credited for, and Kenya Hara's writing on emptiness and design read closer to scripture than self-help.",
          "Scandinavian crime fiction, read for the atmosphere as much as the plot — the bleak weather and the sparse prose feel like a natural extension of everything else in the apartment."
        ],
        query: "Kenya Hara Marie Kondo design books"
      },
      music: {
        paragraphs: [
          "Nils Frahm and Olafur Arnalds, plus ambient records meant to function as background rather than foreground — music chosen the way everything else is, for what it doesn't do as much as what it does.",
          "A single, well-maintained pair of headphones rather than a speaker system, and a genuine indifference to anything with lyrics loud enough to compete with a thought."
        ],
        query: "Nils Frahm Olafur Arnalds ambient"
      },
      home: {
        paragraphs: [
          "White walls, one exceptional chair rather than five good ones, and no visible cords anywhere — a level of tidiness that looks effortless because it's actually enforced daily.",
          "A single plant, well cared for, standing in for what would otherwise be shelves of decoration. Storage is treated as a design problem to be solved, not a closet to be filled."
        ],
        query: "minimalist Scandinavian interior design"
      },
      pastimes: {
        paragraphs: [
          "Running, alone, at a consistent time that isn't negotiated with anyone. A considered coffee ritual performed the same way every single morning, treated less as a beverage than a small daily discipline.",
          "A habit of getting rid of one thing every time something new comes in, applied with a rigor that occasionally alarms houseguests."
        ],
        query: "beginner running clubs"
      }
    }
  },

  rivegauche: {
    guidance: {
      dos: [
        "Keep the wardrobe genuinely small and let every piece earn its place through repetition — the trench, the raw denim, the navy sweater should all be good enough and versatile enough to wear on rotation without anyone noticing you're doing it. Buy the trench in a true neutral rather than a fashion color, since it's meant to function as a blank canvas worn almost daily, not an event piece.",
        "Let a small amount of visible wear into the wardrobe on purpose — slightly broken-in denim, a scarf tied the same casual way each time — since the whole aesthetic depends on looking established rather than newly assembled. Spend on fit over logo; this style reads as expensive through silhouette and fabric, never through a visible brand mark."
      ],
      donts: [
        "Don't let the trench coat become a costume piece — worn open, over jeans and a plain sweater, it's a neutral; buttoned to the neck with a belt cinched for effect, it starts to read as a Halloween detective rather than someone dressing for an ordinary Tuesday. The beret-and-baguette version of this style some people reach for is the same mistake: the actual look has almost no props, which is exactly what makes it read as considered rather than performed.",
        "Avoid mixing in any single statement piece — a bold pattern, a bright color, a logo — since the entire wardrobe operates on a tight, repeating palette of navy, white, camel, and black, and one loud item breaks the whole quiet effect. This is a style built on restraint; the moment it starts trying to be noticed, it stops working."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Paris, obviously, but specifically the same six blocks of it, revisited rather than explored — a new arrondissement is treated with more suspicion than curiosity.",
          "Otherwise, a small French coastal town in the off-season, empty of other tourists, where the appeal is precisely that nothing is scheduled and no one is impressed by anything."
        ],
        prompt: "A quiet Parisian street on the Left Bank -- wet cobblestones, cafe awnings, warm streetlamp light in the evening. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Camus and Sartre, less for the philosophy than the posture, and Patrick Modiano for the melancholy, read in the original when the French is manageable and in translation without embarrassment when it isn't.",
          "Le Monde read at a cafe rather than a desk, folded a specific way, with opinions about the op-ed page voiced to no one in particular."
        ],
        query: "Camus Sartre Modiano novels"
      },
      music: {
        paragraphs: [
          "Serge Gainsbourg and Francoise Hardy on rotation, plus jazz — specifically the American expatriates who played Paris in the 1950s and '60s, treated as more authentically French than most French music.",
          "A vinyl collection that's more about the ritual of choosing a record than any deep expertise, played at a volume just loud enough to justify not talking for a while."
        ],
        query: "Serge Gainsbourg Francoise Hardy"
      },
      home: {
        paragraphs: [
          "A small apartment with excellent bones — high ceilings, tall windows, a fireplace that may or may not still function — furnished sparsely enough that the architecture stays the point.",
          "A few genuinely good books rather than many mediocre ones, and a record player that's used, not displayed, sitting slightly askew on a shelf that's never quite been leveled."
        ],
        query: "small Parisian apartment interior design"
      },
      pastimes: {
        paragraphs: [
          "Long, aimless walks with a destination pretended for anyone who asks, and a firm, frequently restated opinion about which cafe makes the best espresso within reasonable walking distance.",
          "Cinema — the kind with subtitles, seen alone, on a weeknight — followed by exactly enough analysis over one more drink to feel like the evening had a point."
        ],
        query: "espresso brewing classes"
      }
    }
  },

  dandy: {
    guidance: {
      dos: [
        "Commit fully to whichever pattern or color is doing the most work in a given outfit, and let everything else support it — one loud jacket against solid trousers and a plain shirt reads as considered; two competing patterns fighting for attention reads as an accident. Buy the signet ring and the pocket square in materials good enough to actually last, since these small pieces get handled and noticed far more than their size would suggest.",
        "Let the accessories build in number gradually rather than all at once — a ring, then a pin, then a proper pocket square, each added once the last one feels natural rather than costume. The whole look depends on total conviction; hesitation reads more than any single garment does."
      ],
      donts: [
        "Don't mistake pattern-mixing for pattern-piling — checks against stripes works because the two patterns differ enough in scale to read as separate; three or four patterns of similar size just look chaotic rather than confident. There's a real difference between a considered clash and a closet that simply ran out of solid-colored options.",
        "This wardrobe reads very differently depending on context, and ignoring that is the most common mistake: a full pattern-mixed, jewel-toned outfit built for a gallery opening or a wedding will overwhelm an ordinary Tuesday at the office, while a toned-down version saved for the big event undersells it. Save the most maximal pieces for occasions that can actually hold them."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Venice during Carnevale, where the entire city is temporarily dressed for the occasion and a bold outfit is finally the baseline rather than the exception. Marrakech for the color — the souks and the riads offer a palette this wardrobe has been quietly borrowing from for years.",
          "A costume party thrown by someone else gets attended as though it were the whole point of the trip, with a look planned weeks in advance and packed separately from everything else."
        ],
        prompt: "A Venice canal during Carnevale season, ornate architecture, rich colors, atmospheric evening light. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Oscar Wilde, obviously, read as much for the epigrams as the plays, plus biographies of anyone who ever caused a genuine stir by what they wore — Beau Brummell, the Sitwells, early Bowie.",
          "A well-illustrated history of a specific decorative art movement — Aestheticism, or the Ballets Russes costume designs — gets kept on the coffee table and actually opened, not just displayed."
        ],
        query: "Oscar Wilde Beau Brummell biography"
      },
      music: {
        paragraphs: [
          "Glam-adjacent, theatrical pop — Bowie, Roxy Music, Prince at his most maximal — chosen for records that treated an album as a costume change as much as a collection of songs.",
          "A fondness for cabaret that borders on the literal, and a soundtrack collection from film musicals played more often than seems strictly cool."
        ],
        query: "Bowie Roxy Music glam rock"
      },
      home: {
        paragraphs: [
          "Wallpaper with real pattern, chosen the way the wardrobe is — with total conviction — and a velvet sofa nobody's allowed to be too casual on.",
          "At least one genuinely strange object bought purely because it made a good story, displayed prominently enough that the story gets told to every new guest whether they ask or not."
        ],
        query: "maximalist eclectic interior decor"
      },
      pastimes: {
        paragraphs: [
          "Costume parties taken far more seriously than the invitation implied, with a look planned to outlast the actual party in conversation value.",
          "Collecting vintage accessories — cufflinks, canes, an opera cape that's been worn exactly twice but justifies its closet space regardless — and an audience, ideally, for most activities."
        ],
        query: "vintage menswear accessories collecting"
      }
    }
  },

  countryman: {
    guidance: {
      dos: [
        "Buy the waxed jacket expecting to re-wax it every year or two rather than replace it — the finish is meant to be maintained, and a re-waxed jacket with a decade on it looks better, not worse, than a fresh one. Let the tweed be genuinely heavy and rough; a lightweight, city-appropriate tweed misses the entire point of a fabric bred for actual weather.",
        "Choose boots and a flat cap you're actually willing to get muddy — this wardrobe only works when it looks used for its stated purpose, not staged for it. Let the palette pull entirely from the landscape it's meant for: olive, rust, oatmeal, loden, nothing that would stand out against a hedgerow."
      ],
      donts: [
        "The country-versus-city distinction is the whole game here: a heavy tweed jacket or a waxed coat built to shed rain on a moor reads as costume in an office, the same way a fitted city suit looks absurd and gets ruined on an actual farm. This wardrobe is calibrated entirely to a rural context, and wearing its heaviest pieces somewhere urban is the most common misstep — not because the clothes are wrong, but because they're answering a question nobody in the room asked.",
        "Don't buy the wellington or the flat cap as a fashion accessory kept spotless — both are working garments first, and a pristine version of either reads as a costume shop's idea of the countryman rather than the real thing. The wear is the point."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "The Scottish Highlands, the Lake District, and any coastline with real weather — the appeal is inversely proportional to how many other people want to be there too.",
          "Prefers a walking holiday to a beach one, and packs for rain regardless of the forecast, on the theory that the forecast is more of a suggestion than a promise."
        ],
        prompt: "The Scottish Highlands or the Lake District -- rolling green hills, dramatic weather, a stone farmhouse in the distance. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "James Herriot for the vet stories, a well-worn field guide to birds or fly-fishing kept by the door rather than on a shelf, and Country Life read for the property listings as much as the articles.",
          "A stack of back issues never quite gets thrown out, on the theory that a piece about hedge-laying or a particular gundog breed might be needed again someday."
        ],
        query: "James Herriot country life books"
      },
      music: {
        paragraphs: [
          "Folk that hasn't been electrified much — Nic Jones, early Fairport Convention — played on a system that's older than most of the furniture.",
          "Brass band recordings at Christmas without fail, and a genuine, unironic fondness for a hymn sung properly at a village church."
        ],
        query: "Fairport Convention English folk"
      },
      home: {
        paragraphs: [
          "A boot room that sees more daily use than the front hall, a wood-burning stove that's rarely unlit between October and April, and dogs allowed on the furniture without much debate.",
          "Mud is treated as a fact of life rather than a problem to be solved, and the good rug was chosen specifically because it hides it."
        ],
        query: "English country cottage interior"
      },
      pastimes: {
        paragraphs: [
          "Shooting and fishing, both taken up young and never really questioned since. Long dog walks regardless of weather, timed more by the dog's patience than the owner's.",
          "A genuine, hands-on relationship with a garden or a bit of land — not landscaped so much as maintained, in a way that would be unrecognizable to a professional designer but makes complete sense to the person doing it."
        ],
        query: "fly fishing lessons beginners"
      }
    }
  },

  iconoclast: {
    guidance: {
      dos: [
        "Let the proportions do the talking — an oversized, draped silhouette needs room to actually drape, so buy a full size up rather than the size that would fit a normal jacket, and resist the urge to have anything taken in. Commit to the near-monochrome palette fully; one conventional colorful piece undoes the effect of everything else.",
        "Treat the hardware — straps, toggles, exposed zips — as the actual design, not an accident of function, and let it show rather than tucking it away. Buy fewer, more considered pieces; this wardrobe telegraphs intention, and intention doesn't survive being diluted by a closet full of near-misses."
      ],
      donts: [
        "Don't mistake deconstructed for ill-fitting — the draping and asymmetry are a deliberate design decision with their own internal logic, not the same thing as clothes that simply don't fit. A garment that looks accidentally too big is sloppy; one that looks deliberately oversized, with the seams and proportions to prove it was designed that way, is the actual style.",
        "This wardrobe reads as considered in a gallery or a design-forward city and reads as costume almost everywhere else — a heavily deconstructed, all-black, technical-fabric outfit worn to a family dinner or a conventional office says something the room isn't prepared to hear. Know the room before committing to the most extreme version of the silhouette."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Tokyo and Antwerp for the design, Berlin for the nightlife, and post-industrial cities more generally — the more derelict the architecture, the more interesting the trip.",
          "A gallery district gets mapped out before the hotel is even booked, and a genuinely obscure concept store, found through a single cryptic Instagram post, counts as a destination in itself."
        ],
        prompt: "A post-industrial cityscape or a stark modern concrete building at dusk, Berlin or Tokyo, moody atmospheric light. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Susan Sontag, Rei Kawakubo interviews wherever they can be found, and architecture and design monographs read as closely as novels.",
          "A heavily annotated copy of something genuinely difficult gets carried around for weeks, less to finish it than to keep thinking about it in public."
        ],
        query: "Susan Sontag Rei Kawakubo design"
      },
      music: {
        paragraphs: [
          "Aphex Twin, industrial and noise records, and whatever's currently being played at the one club that still matters in whichever city he's in.",
          "A playlist that would be genuinely unlistenable to most people, curated with the same rigor as the wardrobe, and defended without apology."
        ],
        query: "Aphex Twin industrial experimental"
      },
      home: {
        paragraphs: [
          "Concrete, exposed structure, and furniture chosen for form over comfort — a chair that looks better than it sits, on purpose.",
          "A near-total absence of color, broken by exactly one deliberately jarring object, positioned somewhere it can't be avoided."
        ],
        query: "brutalist concrete interior design"
      },
      pastimes: {
        paragraphs: [
          "Gallery openings, attended as much for the crowd as the work, and a genuine interest in architecture as a spectator sport — buildings get discussed the way other people discuss athletes.",
          "A habit of rearranging the furniture just to see if a room can say something different, sometimes at hours that alarm anyone else living there."
        ],
        query: "contemporary art gallery openings"
      }
    }
  },

  remix: {
    guidance: {
      dos: [
        "Pick one half of each pairing to be genuinely sharp and let the other stay genuinely casual — a well-cut blazer over a plain hoodie works because the blazer is real tailoring, not because both pieces are trying equally hard. The tension between the two registers is the whole point; softening either side into a compromise collapses the joke.",
        "Spend real money on the sneaker and the chain — in a wardrobe built on deliberate contrast, the casual half has to be visibly good, not just casual, or the whole outfit reads as simply underdressed rather than intentionally remixed."
      ],
      donts: [
        "Don't let the mix become a muddle — pairing a tailored blazer with sneakers works because each piece stays legible on its own; swap in a slightly-too-casual jacket and a slightly-too-formal shoe and the eye can't find the joke anymore, since neither half is doing its job clearly. The contrast needs both ends to be confident, not diluted toward the middle.",
        "This is a going-out and content-forward wardrobe more than an everyday-errand one — worn to a genuinely formal event, the sneakers read as underdressed rather than knowing; worn to actual manual work, the tailoring reads as impractical rather than interesting. It performs best in exactly the settings built to notice the contrast."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Tokyo, Seoul, and wherever the next sneaker collaboration is dropping — travel planned around culture and release calendars in roughly equal measure.",
          "A trip is considered incomplete without at least one purchase that has to be carried home carefully, in its original box, in a separate bag."
        ],
        prompt: "A neon-lit street in Tokyo or Seoul at night, contemporary streetwear shopfronts, vibrant urban energy. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Streetwear and culture archives read the way older generations read the sports page, plus biographies of genre-crossing designers who moved between sport, art, and fashion without apologizing for any of it.",
          "Graphic novels taken as seriously as literary fiction, with a specific, strong opinion about which ones actually hold up."
        ],
        query: "streetwear culture design books"
      },
      music: {
        paragraphs: [
          "Genre-agnostic by design — hip-hop, hyperpop, and whatever's algorithmically adjacent — played loud, switched constantly, never on one station long enough to get bored.",
          "A playlist that updates weekly and gets shared as a kind of social currency, more mixtape than personal archive."
        ],
        query: "new hip hop hyperpop playlist"
      },
      home: {
        paragraphs: [
          "A sneaker wall treated with more curatorial care than the art on the other walls, lit properly, rotated seasonally.",
          "A mix of genuine vintage furniture and something clearly 3D-printed or otherwise brand-new, in a setup built for content as much as comfort."
        ],
        query: "sneaker collection display shelf"
      },
      pastimes: {
        paragraphs: [
          "Sneaker collecting as a genuine hobby rather than a purchase habit, tracked with spreadsheets and strong opinions about resale ethics.",
          "Basketball, played more for the culture around it than competitive ambition, and a running group chat dedicated entirely to what just dropped."
        ],
        query: "sneaker collecting community"
      }
    }
  },

  rancher: {
    guidance: {
      dos: [
        "Buy boots with a real angled heel built for a stirrup, even if you've never been near a horse — the silhouette depends on it, and a flat-heeled 'western-style' boot from a fashion label reads as costume next to the real thing. Let the belt buckle be genuinely sized to be seen; a small, modest buckle undersells the whole point of wearing one.",
        "Let the denim actually fade and wear from real use — this wardrobe was built for work, and jeans that still look retail-fresh contradict everything else in the outfit. Buy the pearl-snap shirt in a print or color you're not afraid to sweat through."
      ],
      donts: [
        "Don't confuse this with rodeo-costume western wear — fringe, oversized silver, and anything clearly built for a stage rather than a saddle reads as performance rather than the working wardrobe this actually is. The real version is plainer and tougher than the version sold at a costume shop, and the difference is obvious to anyone who's spent real time on a ranch.",
        "This wardrobe is calibrated to actual outdoor, physical work, and it reads oddly out of that context — a full western outfit worn to an urban office says something very different than intended, the same mismatch as wearing a construction uniform to a dinner party. Save the boldest pieces, the bolo tie especially, for settings that can actually place them."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Wyoming, Montana, and the actual working ranches of West Texas rather than the dude-ranch version marketed to tourists. A rodeo circuit gets followed the way other people follow a sports league, with strong opinions about specific riders.",
          "A trip is judged successful mostly by how far it was from anywhere else — the appeal is space, not scenery for its own sake."
        ],
        prompt: "A working cattle ranch in Wyoming or Montana -- open plains, a barn, mountains in the distance, golden hour light. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Louis L'Amour and Larry McMurtry's Lonesome Dove, read and reread the way other people rewatch a favorite film. A well-worn almanac gets consulted more than any app ever could replace it.",
          "Reads outside, when there's time, which isn't often — a book gets picked up in short bursts across a season rather than finished in a sitting."
        ],
        query: "Louis L'Amour Larry McMurtry western novels"
      },
      music: {
        paragraphs: [
          "George Strait and Merle Haggard, plus western swing — Bob Wills specifically — played loud enough to hear over a truck engine.",
          "A genuine, lifelong loyalty to country radio that predates the genre's more recent crossover moment, and a mild suspicion of anything too polished."
        ],
        query: "George Strait Merle Haggard classic country"
      },
      home: {
        paragraphs: [
          "A big front porch built for sitting, used daily regardless of season, and mounted antlers with an actual story behind them rather than a decorator's approximation of one.",
          "Furniture sturdy enough to survive boots and dogs both, chosen for durability first and appearance a distant second."
        ],
        query: "western ranch house interior decor"
      },
      pastimes: {
        paragraphs: [
          "Actual ranch work treated as recreation as much as labor — mending fence or moving cattle counts as a good weekend, not a chore to escape from.",
          "Team roping and a standing bet at the county fair that's been running long enough nobody remembers the original terms."
        ],
        query: "team roping rodeo events"
      }
    }
  },

  rebel: {
    guidance: {
      dos: [
        "Buy the leather jacket in genuine leather, sized close through the body — it's meant to look slightly tough to move in, not roomy, and a boxy fit undercuts the whole silhouette. Let the white T-shirt be genuinely plain and well-fitted; it's doing more structural work in this outfit than it looks like, and a logo or graphic on it undermines the point.",
        "Cuff the jeans high enough to actually show the boot — the proportion is deliberate, not an accident of a too-short hem — and let the leather jacket and boots earn a real patina rather than staying pristine."
      ],
      donts: [
        "Don't buy the version of this wardrobe that's been pre-distressed and branded within an inch of its life — a leather jacket with a large logo, or jeans with fashion-rip placement rather than honest wear, reads as costume rather than the genuinely lived-in uniform this is supposed to be. The whole look depends on looking like it predates the wearer noticing it's a 'look' at all.",
        "This is a deliberately unceremonious wardrobe, and dressing it up defeats the purpose — a black-tie event or a corporate office is the one setting this outfit can't answer; the point of the style is precisely that its wearer wouldn't RSVP to either."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Route 66 taken seriously, not ironically, and Sturgis for the rally — an annual pilgrimage more than a vacation.",
          "Small-town diners chosen over any chain, anywhere, on the theory that the coffee is worse but the story is better."
        ],
        prompt: "An open desert highway, Route 66 style, a vintage motorcycle or diner in the distance, warm late-afternoon light. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Jack Kerouac and Hunter S. Thompson, read young and never entirely outgrown, plus motorcycle maintenance manuals read cover to cover more than once — genuinely, not for effect.",
          "A dog-eared paperback lives in the jacket pocket more often than it lives on a shelf."
        ],
        query: "Jack Kerouac Hunter S Thompson novels"
      },
      music: {
        paragraphs: [
          "Elvis's early Sun Records output and rockabilly more broadly, played on something with actual speakers rather than earbuds.",
          "Whatever's loudest on the jukebox in a bar that still has one, chosen by putting in the coins rather than checking a phone first."
        ],
        query: "Sun Records rockabilly Elvis"
      },
      home: {
        paragraphs: [
          "A garage that's cleaner than the living room, organized around a bike that's always mid-project in some small way.",
          "Band posters that predate the internet, and a record collection organized by memory rather than alphabet — ask for a specific record and it appears in seconds anyway."
        ],
        query: "motorcycle garage man cave decor"
      },
      pastimes: {
        paragraphs: [
          "Motorcycle maintenance as genuine meditation — the kind of task that doesn't require thinking so much as it makes room for it.",
          "Pool played for money, small stakes but real ones, and a standing Friday night ritual that hasn't changed in years and isn't looking to."
        ],
        query: "motorcycle maintenance basics"
      }
    }
  },

  waverider: {
    guidance: {
      dos: [
        "Buy board shorts and slip-ons that are actually built to get wet and dry fast — the practical requirement is real, not a style affectation, and gear that can't handle it will look wrong within a week of actual use. Let color fade naturally through sun and salt rather than buying pre-faded versions; the bleaching is a timestamp, and a fake one is easy to spot.",
        "Let the flannel and the graphic tee actually soften with wear — this wardrobe is judged by how broken-in it looks, and a stiff, retail-new version of any piece in it stands out immediately next to the rest of the outfit."
      ],
      donts: [
        "Don't buy this wardrobe pre-distressed from a mall brand — a manufactured sun-fade or a fake salt stain is easy to spot next to the real thing, and this is a style with almost nowhere to hide a shortcut. The whole look is basically a record of actual time spent outside; there's no substitute for that.",
        "This is a beach-and-boardwalk wardrobe, and it reads as underdressed almost anywhere else — worn to an office or anything requiring real formality, the board shorts and slip-ons don't scan as relaxed so much as unprepared. Keep it where the ocean is at least visible."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Bali, the North Shore of Oahu, and any coastline with a reliable swell — the itinerary is basically a surf forecast with flights attached, planned around conditions rather than dates.",
          "A trip gets extended on the spot if the waves are good, and cut short without much regret if they aren't. Accommodation is chosen for proximity to the break, not amenities."
        ],
        prompt: "A tropical surf beach at golden hour -- rolling waves, palm trees, surfboards leaning against a beach shack. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Kem Nunn's surf noir and biographies of big-wave surfers, read in the kind of long, unhurried stretches that only a flat, waveless afternoon allows.",
          "Whatever paperback got left at the last Airbnb gets picked up without much discrimination and usually finished before the next one, out of a kind of traveler's obligation."
        ],
        query: "Kem Nunn surf noir books"
      },
      music: {
        paragraphs: [
          "Surf-rock revivalists and reggae, plus whatever's playing at the beach bar — never chosen carefully, always somehow fine.",
          "A playlist that hasn't been updated in years because it hasn't needed to be; the same twenty songs work for every sunset in rotation."
        ],
        query: "surf rock reggae playlist"
      },
      home: {
        paragraphs: [
          "A garage full of boards in various states of repair, at least one of them a genuine project that's been 'almost fixed' for a season.",
          "Sand permanently in the entryway, treated as an inevitability rather than a problem, and furniture nobody worries too much about ruining."
        ],
        query: "surf shack coastal interior decor"
      },
      pastimes: {
        paragraphs: [
          "Surfing before anything else gets scheduled — the rest of the day is built around conditions, not the other way around.",
          "Skateboarding as a rainy-day backup when the swell's flat, and a nap treated as a legitimate, unapologetic afternoon activity."
        ],
        query: "beginner surfing lessons"
      }
    }
  },

  financier: {
    guidance: {
      dos: [
        "Have the suit properly structured through the shoulder — this silhouette is meant to fill a room, and a soft, unpadded shoulder undercuts the entire effect the cut is going for. Buy the boldest pinstripe you can commit to, and let the shirt-and-tie contrast be genuinely high; subtlety isn't the goal here, presence is.",
        "Spend real money on cufflinks and the watch — in a wardrobe built around small, deliberate displays of means, these details get noticed far more than the suit's cut ever will up close, across a table."
      ],
      donts: [
        "Don't soften this into a normal business suit — the wide shoulder, the bold stripe, the large tie knot are all doing a specific job, projecting authority before a word is spoken, and trimming any of them down for modesty just produces an ordinary suit that's slightly too big. This wardrobe either commits to the statement or it doesn't work at all.",
        "This is a boardroom-and-restaurant wardrobe, and it overwhelms almost any casual context — the same suit that commands a negotiating table reads as absurd at a weekend barbecue. Know when the room actually calls for it."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "The Hamptons in summer, Aspen in winter, and a business trip to London extended by exactly one extra day for personal reasons that never quite make it onto the expense report.",
          "A hotel is judged primarily by its concierge's ability to get a reservation somewhere fully booked, and that judgment gets discussed at length afterward."
        ],
        prompt: "A luxury coastal estate in the Hamptons or an aspen mountain resort in winter, dramatic golden light. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "The Wall Street Journal cover to cover, every morning, in an order that never changes, plus biographies of takeover artists read partly as instruction manuals.",
          "Liar's Poker gets reread every few years like a class reunion — less for new insight than for the comfort of a world that still, somehow, checks out."
        ],
        query: "Liar's Poker Wall Street books"
      },
      music: {
        paragraphs: [
          "Classic rock played loud in a car that costs more than most people's first home, chosen for volume and nostalgia over anything more current.",
          "A season subscription to whatever's considered the serious orchestra in town, attended as much for who else is there as for the program."
        ],
        query: "classic rock greatest hits"
      },
      home: {
        paragraphs: [
          "A corner office's worth of ambition applied to a living room — a real wet bar, stocked and used, and art bought partly as investment, partly as conversation piece.",
          "A view treated as a line item worth paying for specifically, discussed with the same seriousness as any other asset on the balance sheet."
        ],
        query: "luxury penthouse interior design"
      },
      pastimes: {
        paragraphs: [
          "Golf as a genuine second job — deals get discussed on the back nine as often as in an office — and squash before the market opens, timed precisely around it.",
          "A fantasy football league taken with real competitive intensity, run with the same rigor as an actual portfolio."
        ],
        query: "golf lessons beginners"
      }
    }
  },

  gearhead: {
    guidance: {
      dos: [
        "Buy pieces that are genuinely well-made under the branding — the boldest logo in the world still looks cheap on a poorly constructed garment, and this wardrobe is judged as closely on quality as any quieter one, just by a different audience. Let the palette be genuinely bold; a muted, cautious version of this style just looks like an expensive mistake.",
        "Spend on the details that get photographed up close — the chain, the sneaker, the exact colorway — since this wardrobe is built to reward scrutiny, not to be glanced at from across a room."
      ],
      donts: [
        "Don't mix in deliberately quiet, minimal pieces expecting them to 'balance' the look — this wardrobe works through accumulation and confidence, and one restrained item doesn't read as taste, it reads as a budget running out mid-outfit.",
        "This is a going-out and being-seen wardrobe, and it reads as excessive almost anywhere that isn't built for exactly that — a full head-to-toe monogrammed outfit at a quiet family gathering or a conservative office says something the room isn't set up to receive well. Save it for rooms built to notice it."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Dubai, Miami, and wherever the next major sneaker or fashion drop is happening in person rather than online — the trip is often built entirely around a single release date.",
          "A hotel is chosen partly for how well it photographs, which is not treated as a shallow consideration but as a legitimate line item."
        ],
        prompt: "A glamorous nighttime city skyline, Dubai or Miami, bold neon and skyscraper lights reflecting on water. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Rap biographies, especially the self-made ones, read partly as inspiration and partly as a business education that never got taught in school.",
          "Magazines get read more for the ads than the articles — a full-page campaign for a coveted release is studied the way other people study a stock chart."
        ],
        query: "hip hop rap biographies"
      },
      music: {
        paragraphs: [
          "Whatever's currently at the top of the charts, played loud, without much concern for whether it will still matter in six months.",
          "A genuine, encyclopedic knowledge of hip-hop's back catalog sits underneath the current playlist, brought out to settle arguments about who actually did something first."
        ],
        query: "current hip hop top charts"
      },
      home: {
        paragraphs: [
          "A closet bigger than most people's bedroom, organized like a boutique, with lighting considered as carefully as any retail display.",
          "A media setup that costs more than the car parked outside, which itself cost more than most houses."
        ],
        query: "luxury closet sneaker room design"
      },
      pastimes: {
        paragraphs: [
          "Shopping treated as a competitive sport — knowing about a release before it's announced counts as a genuine skill, not a coincidence.",
          "A genuine passion for sneaker and streetwear history, and a car that gets more grooming and attention than most people give their pets."
        ],
        query: "sneaker resale market drops"
      }
    }
  },

  riviera: {
    guidance: {
      dos: [
        "Buy the suit genuinely unstructured — little to no shoulder padding, a soft canvas or none at all — since the whole point is a jacket that moves like a shirt and packs like one too. Let the trousers be cut to actually go barefoot or into espadrilles; a trouser break meant for a proper dress shoe fights the rest of the outfit's logic.",
        "Keep the palette genuinely light — ecru, sky blue, coral — and let the camp collar stay open; a buttoned-to-the-top version of this shirt undoes the whole relaxed effect it's built around."
      ],
      donts: [
        "Don't add structure back in out of habit — a shoulder pad, a fused canvas, a proper dress shoe all fight against a silhouette that's supposed to read as having just come off a boat. If it could survive a business meeting unchanged, it's not actually this style.",
        "This is a warm-weather, resort wardrobe specifically, and it reads as underdressed and slightly odd anywhere cold or formal — the same linen suit that looks effortless on a terrace in August looks like a mistake in a heated office in November. Keep it where the climate agrees with it."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "The Amalfi Coast, the French Riviera, and a boat, chartered rather than owned, for the month of August specifically — ownership is considered more trouble than the month is worth.",
          "An itinerary rarely survives contact with a good lunch; plans get rearranged around wherever the afternoon happens to be going well."
        ],
        prompt: "The French Riviera or Amalfi coastline -- turquoise water, white boats, pastel buildings on a cliffside, bright midday sun. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Patricia Highsmith's Ripley novels, obviously, read partly for the plot and partly for the travelogue disguised inside it.",
          "Whatever paperback thriller matches the vacation's mood exactly gets bought at the airport and abandoned, half-finished, on a shelf at the villa for the next guest."
        ],
        query: "Patricia Highsmith Ripley novels"
      },
      music: {
        paragraphs: [
          "Bossa nova and French ye-ye pop, played at a volume that assumes conversation will continue over it rather than stop for it.",
          "Whatever the beach club's DJ is playing at golden hour gets adopted for the rest of the trip without ever being identified by name."
        ],
        query: "bossa nova ye-ye pop"
      },
      home: {
        paragraphs: [
          "A summer house that only gets used three months a year, furnished entirely in white and rattan, closed up carefully each September.",
          "Sand tracked in is treated as a feature, not a flaw, and a rinse-off shower by the door gets more daily use than any bathroom inside."
        ],
        query: "Mediterranean summer house interior"
      },
      pastimes: {
        paragraphs: [
          "Long lunches that become long afternoons without much resistance, and a genuine tan maintained with real, almost scheduled discipline.",
          "Tennis played more for the outfit and the club bar afterward than the score, with the match itself treated as a pleasant formality."
        ],
        query: "Mediterranean beach club membership"
      }
    }
  },

  mod: {
    guidance: {
      dos: [
        "Have the suit cut genuinely slim and close through the body — this silhouette depends on a real tailor's fit, not an off-the-rack suit worn a size down, and the difference shows up immediately at the shoulder and the sleeve. Let the parka be purely functional outerwear, worn over the suit and shed the moment you arrive; it's transport gear, not part of the outfit itself.",
        "Keep the shoes sharp and low-profile — a Chelsea boot or a bowling shoe polished and cared for — since this is a wardrobe judged on precision throughout, right down to a detail as small as the shine on a toe cap."
      ],
      donts: [
        "Don't let the suit get roomy for comfort — a looser cut isn't a relaxed version of this style, it's a different style wearing this one's colors. The whole silhouette depends on closeness through the body.",
        "This is a specific, considered wardrobe with a real subculture and history behind it, and reaching for the most literal signifiers — a target logo worn as the entire point, rather than one detail among many — tips it from 'informed' into 'costume.' Wear the references quietly enough that they read as instinct rather than research."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "London, obviously, plus any city with a genuine scooter club and a decent record shop within walking distance of each other.",
          "A trip gets planned loosely around a specific gig or record fair, with everything else filled in afterward rather than the other way around."
        ],
        prompt: "A London street scene with classic architecture, or a row of vintage scooters parked along a curb, moody overcast light. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Nik Cohn's Awopbopaloobop Alopbamboom and biographies of the Small Faces and the Jam, read as much for the scene's social history as the music itself.",
          "Mod-scene fanzines, vintage or otherwise, get collected and cross-referenced with an intensity that borders on academic."
        ],
        query: "Nik Cohn mod scene books"
      },
      music: {
        paragraphs: [
          "The Who and the Jam on regular rotation, but the real currency is Northern Soul deep cuts, sought out specifically for their obscurity.",
          "A 7-inch found at a record fair for less than it's worth gets more genuine excitement than most people reserve for actual good news."
        ],
        query: "Northern Soul Northern Soul deep cuts"
      },
      home: {
        paragraphs: [
          "A small, immaculate flat, tidier than the wardrobe would suggest, with a scooter parked as close to the door as physically possible.",
          "A record collection more impressive than the furniture, alphabetized and defended against anyone who touches it carelessly."
        ],
        query: "vintage mod apartment interior"
      },
      pastimes: {
        paragraphs: [
          "Scooter rallies, attended rain or shine, and a genuine, ongoing hunt for the perfect vintage record that's less about finding it than about the hunt itself.",
          "Dancing taken more seriously than most people take exercise, practiced with real technique rather than left to instinct."
        ],
        query: "scooter club rally events"
      }
    }
  },

  professor: {
    guidance: {
      dos: [
        "Buy the tweed jacket with elbow patches already there, or have them added early — they're a sign of real, expected wear, not an affectation, and this wardrobe is meant to look like it's been through a few winters already. Let the corduroy trousers wear in and go slightly shapeless at the knee; a crisp crease here looks like a costume, not a habit.",
        "Let the cardigan function as a genuine second jacket, worn indoors and out, rather than as an undergarment hidden beneath something else — it's doing real structural work in this wardrobe."
      ],
      donts: [
        "Don't buy this wardrobe pressed and matching — the whole point is a slightly distracted indifference to coordination, and a too-perfect outfit undercuts the character entirely. A knit tie loosened by mid-afternoon is correct; one still crisply knotted at 5pm looks like it's trying.",
        "This is a lecture-hall and study wardrobe, and it can look under-considered somewhere that calls for real polish — a job interview outside academia, for instance, may read the tweed and patches as careless rather than lived-in. Know which rooms will grant the benefit of the doubt."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Oxford, a New England college town in autumn, and a research trip to an archive somewhere that quietly doubles as a vacation, expenses permitting.",
          "A trip is judged successful largely by whether a particular manuscript or first edition was actually locatable, with the surrounding city treated as a pleasant bonus."
        ],
        prompt: "An old university town in autumn -- gothic academic buildings, a quiet courtyard, golden leaves, soft overcast light. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Everything, constantly, across several books at once, stacked in an order that makes sense to no one else. If pressed, George Eliot, and whatever journal in his own field just published something worth arguing about.",
          "A library card gets more genuine use than most people's gym membership, and an overdue notice is treated as a minor personal failing."
        ],
        query: "George Eliot classic literature"
      },
      music: {
        paragraphs: [
          "Bach on a Sunday morning, and choral recordings played at a volume that assumes the room is otherwise quiet.",
          "A genuine, decades-long loyalty to whatever radio station still plays classical, defended even as the signal gets worse every year."
        ],
        query: "Bach choral classical recordings"
      },
      home: {
        paragraphs: [
          "Floor-to-ceiling bookshelves that ran out of room years ago, with a second, informal system of stacks colonizing the floor.",
          "A good reading lamp, non-negotiable, and a desk that's more organized than it looks to anyone who hasn't tried to use it themselves."
        ],
        query: "academic study library bookshelves"
      },
      pastimes: {
        paragraphs: [
          "Crossword puzzles done in ink, without much tolerance for anyone who suggests pencil, and gardening treated as a legitimate form of thinking rather than a chore.",
          "Office hours that run long because the conversation got genuinely interesting, at the expense of whatever was scheduled next."
        ],
        query: "cryptic crossword puzzles"
      }
    }
  },

  correspondent: {
    guidance: {
      dos: [
        "Buy the safari jacket for the pockets first — four working bellows pockets are meant to actually hold notebooks, film, or a passport, and a decorative version with sewn-shut flaps misses the entire point of the garment. Let the khaki-and-olive palette actually show dust and travel wear; a spotless version reads as a costume bought for a trip rather than gear that's survived several.",
        "Choose boots and a field bag genuinely built to be checked as luggage and to take real abuse — scuffs and a broken-in strap are the actual credentials here, not a flaw to hide."
      ],
      donts: [
        "Don't buy this wardrobe pressed and matching from a single collection — the look is assembled from gear that's actually been used across different trips, and a too-coordinated version reads as a costume department's idea of a foreign correspondent rather than the real thing.",
        "This is a wardrobe built for movement and uncertainty, and it reads oddly in a stable, formal context — a belted safari jacket at a black-tie dinner or a conventional office says 'costume,' not 'well-traveled.' Save it for settings where the practicality actually makes sense."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Wherever the story is — historically a warzone or a revolution, currently anywhere with a good airport and an uncertain outcome. The destination is chosen by circumstance more than preference.",
          "A go-bag stays packed at all times, not as an affectation but out of genuine necessity; the gap between deciding to leave and actually leaving is measured in minutes, not days."
        ],
        prompt: "A bustling foreign airport terminal or a dusty overland border crossing, dramatic travel atmosphere, cinematic light. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Hemingway's dispatches and Ryszard Kapuscinski, read as much for craft as content — the discipline of saying a great deal in very little space.",
          "Whatever local paper he can get his hands on, in whatever language, worked through slowly with a dictionary when necessary, on the theory that the real story is rarely in the English-language press."
        ],
        query: "Ryszard Kapuscinski Hemingway dispatches"
      },
      music: {
        paragraphs: [
          "Whatever's playing in the hotel bar in whatever city he's currently filing from — genuinely no strong preference, by design; too much attachment to a specific sound doesn't travel well.",
          "A handful of songs become permanently associated with specific assignments, replayed years later and immediately transporting."
        ],
        query: "world music hotel bar lounge"
      },
      home: {
        paragraphs: [
          "A home base that's more storage unit than showcase, visited between assignments rather than lived in continuously.",
          "A wall map with pins in it tracking everywhere he's actually been, and a go-bag that's always, genuinely, packed by the door."
        ],
        query: "world map travel wall decor"
      },
      pastimes: {
        paragraphs: [
          "Learning just enough of a language to order a drink and ask one real question — fluency was never really the goal, connection was.",
          "Chess with strangers in whatever square or cafe has a board set up, and a running list of places he'll go back to properly, someday, once there isn't a deadline attached."
        ],
        query: "language learning basics travel"
      }
    }
  },

  nightcrawler: {
    guidance: {
      dos: [
        "Commit fully to whatever the boldest element of the outfit is — the platform boot, the unbuttoned shirt, the eyeliner — and let it be the actual focal point rather than one of several competing ideas. This wardrobe rewards a single strong statement far more than several moderate ones.",
        "Buy the trousers in a fabric that actually catches light — real leather or satin, not a matte substitute — since the whole silhouette depends on movement and shine reading clearly under artificial light."
      ],
      donts: [
        "Don't tone it down for daylight thinking it will read as a subtler version of the same look — this is a nightlife wardrobe built specifically for artificial light and a particular kind of room, and worn at noon it just reads as costume rather than daring.",
        "Avoid halfway commitment — a little eyeliner with an otherwise conservative outfit looks like an accident, not a choice. The style depends on total conviction; a single tentative element without the rest of the look around it just looks out of place."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Berlin, London in the 1970s if time travel were an option, and wherever the after-party actually is — the real destination is rarely the one on the ticket.",
          "A city gets judged almost entirely by its nightlife; the museums and daytime attractions are treated as a way to pass the hours until the evening actually starts."
        ],
        prompt: "A neon-lit nightclub street scene or glam rock concert venue at night, dramatic stage lighting, moody atmosphere. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Bowie biographies and glam-era music journalism, read for the reinvention as much as the music — a genuine study guide disguised as entertainment.",
          "Whatever's scandalous enough to read on a train specifically to be noticed doing so; the reaction is at least half the point."
        ],
        query: "David Bowie glam rock biography"
      },
      music: {
        paragraphs: [
          "Bowie, T. Rex, Roxy Music — the whole glam canon — played loud enough that the neighbors develop opinions about it.",
          "A soundtrack chosen for its theatrical quality above all else; if it wouldn't work as an entrance, it doesn't make the playlist."
        ],
        query: "glam rock Bowie T Rex"
      },
      home: {
        paragraphs: [
          "Mirrors, more mirrors, and a lighting setup better than most photo studios — getting ready is treated as an event in itself, not a preamble to one.",
          "At least one piece of furniture that looks like it belongs on a stage, acquired specifically because it did, once, somewhere."
        ],
        query: "glam vanity mirror lighting decor"
      },
      pastimes: {
        paragraphs: [
          "Karaoke treated as legitimate performance, rehearsed rather than winged, and a standing invitation to whatever's happening after midnight.",
          "A genuine talent for making an entrance, practiced enough that it no longer feels like effort from the outside."
        ],
        query: "karaoke bars nightlife"
      }
    }
  },

  bohemian: {
    guidance: {
      dos: [
        "Buy linen and cotton pieces expecting them to wrinkle and soften considerably — that's the fabric doing exactly what it's supposed to, and a stiff, pressed version of this wardrobe misses the entire point of choosing these materials in the first place. Let layers happen intuitively rather than being planned in advance; a shirt thrown over a shirt because it got cold is more convincing than one styled to look that way.",
        "Choose color the way the trademarks describe it — pulled from raw pigment rather than a swatch book — and let a satchel or a pair of boots get genuinely rough with use; this wardrobe is valued more the more lived-in it becomes."
      ],
      donts: [
        "Don't buy this wardrobe pre-rumpled from a boutique at full retail price — the softness and the wrinkles are supposed to be evidence of real time spent living in the clothes, and a manufactured version of that texture is easy to spot next to the genuine article.",
        "Resist over-coordinating the layers — a scarf that matches the shirt that matches the trouser reads as styled rather than intuitive, and intuitive is the entire premise. A slightly wrong combination, arrived at without much thought, is closer to correct than a perfectly planned one."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Montmartre, a Greek island in the off-season, and anywhere with cheap rent and good light — the criteria are consistent even when the destination changes completely.",
          "A trip gets extended indefinitely if the right cafe and the right light are both still working; there's rarely a firm return date built into the plan to begin with."
        ],
        prompt: "A Greek island village in soft golden light -- whitewashed buildings, bougainvillea, a quiet cafe terrace. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Rilke and Anais Nin, read slowly and often aloud to whoever's around, plus whatever's dog-eared and borrowed from a friend rather than bought new.",
          "A book gets passed along again as soon as it's finished, with margin notes left in for the next reader as a kind of ongoing conversation."
        ],
        query: "Rilke Anais Nin poetry"
      },
      music: {
        paragraphs: [
          "Nick Drake and Joni Mitchell, played at a volume that assumes the room is otherwise quiet, and whatever's spinning on vinyl at the one bar that still has a turntable.",
          "A guitar within reach in most rooms, played somewhat well and often, more for the company than any audience."
        ],
        query: "Nick Drake Joni Mitchell folk"
      },
      home: {
        paragraphs: [
          "Plants in every window, thriving with an amount of attention that looks effortless but very much isn't, and art made by people he actually knows rather than bought from a gallery.",
          "Furniture that arrived via a sidewalk more often than a store, refinished or left exactly as found depending on the mood that week."
        ],
        query: "bohemian eclectic apartment decor"
      },
      pastimes: {
        paragraphs: [
          "Life drawing classes, attended semi-regularly, and long conversations that run well past a cafe's closing time without either party quite noticing.",
          "A journal that's more full than any calendar, kept less as a record of events than as a place to think out loud."
        ],
        query: "life drawing classes beginners"
      }
    }
  },

  undone: {
    guidance: {
      dos: [
        "Let the flannel and denim actually wear out from real use — the rips and fading are supposed to document genuine time, and a pair of jeans distressed at a factory looks noticeably different from a pair that earned it. Buy boots or sneakers you're willing to wear well past the point most people would replace them.",
        "Let color-matching happen by accident or not at all — a flannel that doesn't quite go with the T-shirt underneath is more correct here than a coordinated outfit would be. The whole point is a wardrobe assembled with genuine indifference, not staged indifference."
      ],
      donts: [
        "Don't buy factory-distressed denim or a pre-faded band tee from a mall brand — a manufactured rip looks distinctly different from a real one, placed exactly where knees and pockets actually wear through rather than where a designer decided looked good. This wardrobe has almost no tolerance for a shortcut; it's too plain in its execution to hide one.",
        "This is a deliberately low-effort wardrobe, and dressing it up defeats the entire purpose — pairing it with anything polished or occasion-appropriate just reads as mismatched rather than eclectic. It works because nothing about it is trying, and adding one thing that visibly is undoes the whole outfit."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Seattle, Portland, and wherever the next show is — van travel preferred to flying, on the theory that the trip itself is part of the point, not just a delay before arriving.",
          "A tour stop gets remembered by the venue and the bar afterward, rarely by any conventional tourist attraction in between."
        ],
        prompt: "A rainy Pacific Northwest city street at dusk, Seattle or Portland, moody overcast light, indie music venue marquee glow. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Whatever's been passed around the van, zines more than books, and liner notes read as closely as literature — often more closely.",
          "A book's condition rarely survives the trip intact, and that's treated as a feature of having actually been read rather than a problem."
        ],
        query: "punk zine culture books"
      },
      music: {
        paragraphs: [
          "Nirvana, Mudhoney, and whatever local band is playing the basement show nobody advertised — discovered by accident, defended fiercely afterward.",
          "A cassette tape or a scratched CD still gets played out of loyalty, well past the point streaming made either necessary."
        ],
        query: "Nirvana Mudhoney grunge"
      },
      home: {
        paragraphs: [
          "A mattress on the floor, records in milk crates, and absolutely nothing anyone's worried about damaging further than it already is.",
          "A door covered in show flyers going back years, functioning as both decoration and a kind of informal diary."
        ],
        query: "grunge apartment DIY decor"
      },
      pastimes: {
        paragraphs: [
          "Thrifting as a genuine skill, honed over years of knowing exactly which bins to check first, and a garage band that's more about the practice than the gigs.",
          "Skateboarding as a low-key daily ritual, more habit than hobby at this point, done alone as often as with anyone else."
        ],
        query: "thrift store shopping tips"
      }
    }
  },

  yachtsman: {
    guidance: {
      dos: [
        "Buy the blazer with real brass buttons and let it be genuinely double-breasted — a single-breasted substitute misses the specific naval reference the whole silhouette depends on. Wear the deck shoes without socks and without lacing them all the way, since both are functional habits from an actual boat, not a styling choice invented for land.",
        "Keep the palette disciplined to navy, white, and red — pulled straight from signal flags — and let the white trousers get worn well past any actual sailing season; the confidence of wearing them out of context is part of the style."
      ],
      donts: [
        "Don't buy deck shoes and never actually lace or unlace them — the slightly undone lacing is a specific, deliberate detail, not carelessness, and getting it right matters more than it seems like it should.",
        "This is a coastal, warm-weather wardrobe, and it can look slightly absurd fully committed to somewhere landlocked or overcast — a double-breasted blazer and white trousers make more sense within sight of actual water. The style survives some distance from the coast, but not complete removal from the idea of it."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Newport, Nantucket, and the coast of Maine — always somewhere a boat can actually go, even if the boat itself is more concept than plan for the week.",
          "A harbor gets assessed within minutes of arriving, purely out of habit, regardless of whether there's any actual sailing on the agenda."
        ],
        prompt: "A New England harbor with sailboats at anchor, Newport or Nantucket, crisp blue sky, coastal summer light. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Patrick O'Brian's naval novels, worked through in order more than once, and sailing memoirs read partly for practical tips and partly for the romance of it.",
          "The yacht club newsletter, read cover to cover the day it arrives, mostly for the regatta results and who's selling what boat."
        ],
        query: "Patrick O'Brian naval novels"
      },
      music: {
        paragraphs: [
          "Jimmy Buffett and sea shanties revived without irony, played at a volume appropriate to a porch rather than a party.",
          "Whatever's playing at the club's Friday happy hour becomes the unofficial soundtrack of the entire summer, without much deliberate choice involved."
        ],
        query: "Jimmy Buffett sea shanties"
      },
      home: {
        paragraphs: [
          "Navy and white everywhere, applied with the same discipline as the wardrobe, and ship's models on the mantel that took considerably longer to build than displayed.",
          "A porch built specifically for watching the water, furnished sparsely enough not to distract from the actual view."
        ],
        query: "coastal nautical interior design"
      },
      pastimes: {
        paragraphs: [
          "Sailing, obviously, treated with real seriousness rather than as a prop, plus a standing tennis game scheduled around the tides more than the clock.",
          "A genuine, competitive interest in the club's annual regatta, tracked and discussed with an intensity that surprises anyone unfamiliar with the club."
        ],
        query: "learn to sail lessons"
      }
    }
  },

  voltage: {
    guidance: {
      dos: [
        "Commit fully to the single neon accent against the near-all-black palette — the contrast is the entire design idea, and a second or third bright color competing for attention dilutes the effect the outfit is built around. Push the silhouette to a genuine extreme, very slim or very loose; a moderate, in-between proportion reads as indecisive rather than deliberate.",
        "Buy reflective and technical fabrics that actually perform under artificial and strobe light — a matte substitute that looks similar in daylight will read as flat and lifeless in the setting this wardrobe is actually built for."
      ],
      donts: [
        "Don't let the palette drift toward several bright colors at once — the whole design logic depends on near-total black broken by exactly one unmissable color, and adding a second undoes the contrast that makes the first one work.",
        "This is a nightlife-and-warehouse wardrobe built for artificial light and a specific kind of crowd, and it reads as costume in daylight or in an ordinary office — the reflective fabric that looks striking under a strobe just looks strange under fluorescent light. Save it for rooms built for exactly this."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Berlin, Tokyo's Shibuya district at night, and wherever the next warehouse party is being whispered about rather than advertised.",
          "A city's appeal is measured almost entirely by its nightlife infrastructure — the daytime hours are mostly recovery time before the actual reason for the trip starts."
        ],
        prompt: "A neon-lit warehouse rave or a futuristic city district at night, Berlin or Tokyo, strobe lights and reflective surfaces. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Cyberpunk fiction — Gibson, obviously — read partly as aesthetic reference and partly as genuine prediction, and rave-culture oral histories that treat the scene with real historical seriousness.",
          "Whatever's trending in three different feeds at once gets skimmed constantly, less for information than for staying ahead of what everyone else will be talking about next week."
        ],
        query: "William Gibson cyberpunk novels"
      },
      music: {
        paragraphs: [
          "Techno and hyperpop, plus whatever's dropping on a label nobody's heard of yet but everyone will in six months — being early is treated as a genuine skill.",
          "A set gets judged on build and transition as much as any individual track, discussed afterward with real technical detail."
        ],
        query: "techno hyperpop new releases"
      },
      home: {
        paragraphs: [
          "LED strip lighting throughout, reprogrammed more often than most people rearrange furniture, and a setup built around a sound system rather than a sofa.",
          "Reflective surfaces everywhere, chosen as much for how they catch changing light as for any conventional decorating logic."
        ],
        query: "LED strip lighting room setup"
      },
      pastimes: {
        paragraphs: [
          "Raves that start after most people's bedtime and run well past it, and a genuine interest in emerging producers followed with the dedication other people reserve for sports.",
          "A wardrobe that gets more curatorial attention than the furniture, planned days in advance for a single night out."
        ],
        query: "warehouse rave events"
      }
    }
  },

  officer: {
    guidance: {
      dos: [
        "Buy cargo pockets that are actually sized for something specific — a phone, a notebook, a magazine — and let them hold real weight; decorative pockets that don't function undercut a wardrobe built entirely around purpose. Choose field jackets and trousers with reinforced stitching that visibly exceeds normal civilian tolerances, since that over-built quality is the actual point.",
        "Keep the palette a genuine concealment range — olive drab, khaki, field grey — worn indoors exactly as it would be worn in the field, without softening it for an urban context."
      ],
      donts: [
        "Don't buy this wardrobe with any actual rank insignia, unit patches, or medals that weren't earned — the epaulettes and reinforced hardware are meant to reference military construction generally, and adding real, specific insignia crosses from aesthetic into stolen valor territory.",
        "This is a highly functional, purpose-first wardrobe, and dressing it up defeats its own logic — pairing a field jacket with anything delicate or occasion-specific undercuts the coherence of a wardrobe that's supposed to justify every single piece by what it does."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Wherever he was stationed, revisited with real purpose rather than casual nostalgia. Otherwise, historical battlefields and military museums, toured with the kind of attention most people reserve for their own family history.",
          "A trip gets planned around a specific date or unit anniversary as often as around a season, and a stop is rarely skipped once it's on the list."
        ],
        prompt: "A historical battlefield memorial or a military museum exterior, solemn overcast light, weathered stone monuments. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Military history almost exclusively, plus memoirs of specific campaigns read with the kind of close attention other people give a mystery novel.",
          "Field manuals get read for the writing as much as the content — the plain, exact language is admired on its own terms, independent of the subject."
        ],
        query: "military history memoirs"
      },
      music: {
        paragraphs: [
          "Military band recordings, and otherwise not much — the radio stays off more often than it's on, and silence is rarely treated as something to fill.",
          "A specific march or anthem gets played once a year, on a specific date, and means considerably more than its three minutes would suggest."
        ],
        query: "military band march recordings"
      },
      home: {
        paragraphs: [
          "Everything has a place and stays in it, maintained with a level of order that borders on inspection-ready even when no inspection is coming.",
          "A display case for medals or memorabilia, dusted regularly, positioned somewhere it gets seen daily rather than tucked away."
        ],
        query: "military memorabilia display case"
      },
      pastimes: {
        paragraphs: [
          "A genuine, self-imposed fitness routine that hasn't lapsed in years, run with the same discipline as everything else.",
          "Model-building with real precision, and an annual reunion that's never missed, planned around months in advance."
        ],
        query: "military scale model building"
      }
    }
  },

  alpinist: {
    guidance: {
      dos: [
        "Buy genuinely seam-taped, waterproof technical shells even for everyday wear — the performance is the entire premise of this wardrobe, and a fashion imitation without real waterproofing defeats the point the moment it actually rains. Let the high-visibility color choices be as bold as the gear actually comes in; muting them down for subtlety undercuts the honest, function-first logic of the whole look.",
        "Wear boots and technical footwear built for uneven terrain even on flat pavement — the slightly exaggerated tread and support are meant to read as genuinely capable, not merely stylized."
      ],
      donts: [
        "Don't buy technical-looking gear that isn't actually technical — a shell with taped seams and real waterproofing reads completely differently, in hand and in wear, from a fashion imitation, and anyone who's actually been on a mountain can tell the difference immediately.",
        "This is expedition-grade gear worn to an office, and it can read as overkill in a genuinely formal or delicate setting — a full technical shell and mountaineering boots at a black-tie event overshoot the room by a significant margin. Save the most aggressive pieces for contexts that can at least imagine the mountain."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Patagonia, the Dolomites, and any range with a peak still on the list — vacation and expedition are, for practical purposes, the same word.",
          "A trip gets planned around a specific summit attempt, with everything else in the itinerary treated as logistics rather than leisure."
        ],
        prompt: "A dramatic mountain range at sunrise, snow-capped peaks, dramatic alpine light, no visible trail markers. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Jon Krakauer and mountaineering memoirs, read partly for inspiration and partly as genuine risk research before the next trip.",
          "Gear reviews get read with the seriousness other people reserve for stock picks — a new shell's seam construction gets debated at real length."
        ],
        query: "Jon Krakauer mountaineering memoirs"
      },
      music: {
        paragraphs: [
          "Whatever's on the playlist for a long approach — often nothing at all, in favor of just the wind and the sound of actual footsteps.",
          "A single song becomes permanently associated with a specific summit, replayed afterward and immediately transporting back to it."
        ],
        query: "instrumental hiking playlist"
      },
      home: {
        paragraphs: [
          "Gear drying everywhere, a semi-permanent feature of the apartment rather than an occasional inconvenience, and a wall of topographic maps marked up with old routes.",
          "Furniture comes a distant second to the equipment closet in both size and care — the gear gets the better storage, without much debate about it."
        ],
        query: "outdoor gear storage room"
      },
      pastimes: {
        paragraphs: [
          "Actual mountaineering, planned months ahead, and trail running used specifically as cross-training rather than as its own pursuit.",
          "A gear-maintenance ritual performed with real reverence — boots reproofed, ropes inspected, nothing left to find out the hard way."
        ],
        query: "beginner mountaineering courses"
      }
    }
  },

  athlete: {
    guidance: {
      dos: [
        "Buy the varsity jacket and team gear from an era or team that actually means something personally — a real connection to the team is what separates this wardrobe from costume, and it shows in the details people ask about. Let sneakers get chosen and maintained with genuine expertise; the care is the actual skill on display here, not just the shoe itself.",
        "Wear sweatshirts and warm-up gear as legitimate daily wear rather than only for actual exercise — this wardrobe treats athletic gear as real clothing, and half-committing to that undercuts the whole premise."
      ],
      donts: [
        "Don't wear a team's colors and logo without any real connection to or knowledge of that team — this wardrobe reads as authentic allegiance, and it falls apart under even light questioning if the loyalty turns out to be purely aesthetic.",
        "This is an emphatically casual wardrobe, and it reads as a genuine mismatch in a formal context — a varsity jacket and mesh shorts at anything requiring real dress-up just look like a wrong turn, not an intentional contrast. Keep it where the informality is expected."
      ]
    },
    lifestyle: {
      travel: {
        paragraphs: [
          "Wherever the tournament or the team's away game is, scheduled around the season with a devotion most people reserve for holidays.",
          "A genuine pilgrimage to at least one hall of fame gets planned and treated with real reverence, photographed extensively, discussed for years after."
        ],
        prompt: "A large stadium exterior at golden hour, or a hall of fame museum entrance, dramatic sports architecture. Editorial travel photography, no people, no text."
      },
      reading: {
        paragraphs: [
          "Sports biographies almost exclusively, and box scores read the way other people read the news — first thing, every day, without fail.",
          "Not much else, by choice; a novel gets picked up occasionally but rarely finishes ahead of whatever game is on that night."
        ],
        query: "sports biographies athletes"
      },
      music: {
        paragraphs: [
          "Whatever's on the pregame playlist — hip-hop and hype tracks, chosen for energy over nuance, loud enough to actually feel it.",
          "A specific song becomes permanently associated with a specific win, and gets requested at parties for years afterward for exactly that reason."
        ],
        query: "pregame hype hip hop playlist"
      },
      home: {
        paragraphs: [
          "A den built around a big screen and team memorabilia, with trophies actually displayed rather than boxed away in storage.",
          "A fridge stocked for game day specifically, restocked the same way every single week without much variation."
        ],
        query: "sports man cave decor"
      },
      pastimes: {
        paragraphs: [
          "Pickup games that never really stopped since high school, showing up weekly with the same rotating group for longer than anyone's tracked.",
          "Fantasy leagues taken seriously, run with real research, and sneaker maintenance treated as a genuine, almost meditative ritual."
        ],
        query: "pickup basketball leagues"
      }
    }
  }
};
