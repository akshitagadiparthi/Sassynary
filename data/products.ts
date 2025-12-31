
import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- TRENDING MIX (Top 10-12) ---
  
  // 1. Mystery Box
  {
    id: 99,
    name: "Surprise Me! Mystery Box",
    category: "accessories",
    price: 250.00,
    description: "Can't decide? Let us pick. A curated bundle of our best sass for a steal. Perfect for gifting or hoarding.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop",
    details: [
        "1 x Premium Notebook (Random Style)",
        "1 x Planner / Notepad",
        "2 x Witty Greeting Cards",
        "Total Value: ₹400+",
        "Comes in a cute package"
    ],
    isNew: true,
    tags: ["gift", "bundle", "surprise", "set", "mystery", "value"]
  },
  // 2. Card: 2026
  {
    id: 113,
    name: "2026 card",
    category: "greeting-cards",
    price: 10.00,
    description: "Cheers to the new year together! ",
    image: "https://i.imgur.com/0gkT9Dn.png",
    images: ["https://i.imgur.com/0gkT9Dn.png", "https://i.imgur.com/K1Bt8Yt.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"],
    tags: ["new year", "2026", "holiday", "celebration", "party"]
  },
  // 3. Notebook: Gotham
  {
    id: 33,
    name: "Gotham Log",
    category: "notebooks",
    subCategory: "pinned",
    price: 125.00,
    description: "Sleek, dark, and ready for your nightly musings. A sophisticated choice for the modern vigilante of productivity.",
    image: "https://i.imgur.com/A3PYNix.png",
    images: [
        "https://i.imgur.com/A3PYNix.png",
        "https://i.imgur.com/79rUyUj.png",
        "https://i.imgur.com/XzwBjkl.png"
    ],
    details: [
        "160 Pages",
        "Ruled / Lined",
        "100gsm Acid-Free Paper",
        "A5 Size (148 x 210 mm)",
        "Lay-flat Pinned Binding"
    ],
    isNew: true,
    tags: ["black", "dark", "hero", "minimal", "men", "pinned", "journal", "ruled", "lined"]
  },
  // 4. Planner: Weekly
  {
    id: 31,
    name: "Weekly Planner",
    category: "planners",
    subCategory: "large",
    price: 145.00,
    description: "Crush your goals one week at a time. Minimalist design for maximum productivity.",
    image: "https://i.imgur.com/HE1ZdFi.png",
    images: [
        "https://i.imgur.com/HE1ZdFi.png",
        "https://i.imgur.com/4qFx68n.png"
    ],
    details: [
        "120 Pages",
        "Undated Weekly Layout",
        "100gsm Premium Paper",
        "A5 Size (148 x 210 mm)",
        "Tear-out Notepad"
    ],
    isNew: true,
    tags: ["weekly", "organizer", "schedule", "productivity", "undated", "planner"]
  },
  // 5. Card: New Year!!
  {
    id: 102,
    name: "New Year!!",
    category: "greeting-cards",
    price: 10.00,
    description: "Wish your near and dear a happy 2026",
    image: "https://i.imgur.com/2J5EqGI.png",
    images: ["https://i.imgur.com/2J5EqGI.png", "https://i.imgur.com/WTOXmM4.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"],
    tags: ["new year", "2026", "holiday", "celebration", "family"]
  },
  // 6. Notebook: Crimson
  {
    id: 29,
    name: "Crimson Notes",
    category: "notebooks",
    subCategory: "spiral",
    price: 135.00,
    description: "Bold notes for bold people. This crimson beauty is ready for your fire ideas.",
    image: "https://i.imgur.com/zhSNMyX.jpeg",
    images: [
        "https://i.imgur.com/zhSNMyX.jpeg",
        "https://i.imgur.com/YLZ6tkE.png",
        "https://i.imgur.com/dqJOyQc.png"

    ],
    details: [
        "160 Pages",
        "Ruled / Lined",
        "100gsm Premium Paper",
        "A5 Size (148 x 210 mm)",
        "Gold Spiral Binding"
    ],
    isNew: true,
    tags: ["red", "spiral", "wirebound", "bold", "journal", "lined", "ruled"]
  },
  // 7. Planner: Daily Grid
  {
    id: 32,
    name: "Daily Journal Grid",
    category: "planners",
    subCategory: "large",
    price: 145.00,
    description: "For the planners who love a good grid. Structured chaos at its finest.",
    image: "https://i.imgur.com/PMOwK6Z.png",
    images: [
        "https://i.imgur.com/PMOwK6Z.png",
        "https://i.imgur.com/kVgxUBz.png",
        "https://i.imgur.com/FoMD16t.png",
        "https://i.imgur.com/jgeLJfY.png"
    ],
    details: [
        "120 Pages",
        "Dot Grid / Structured Layout",
        "100gsm Premium Paper",
        "A5 Size (148 x 210 mm)",
        "Tear-out Notepad"
    ],
    isNew: true,
    tags: ["daily", "grid", "dot grid", "journal", "structured", "planner", "dotted"]
  },
  // 8. Card: Dark Theme
  {
    id: 101,
    name: "Happy New Year- Dark theme",
    category: "greeting-cards",
    price: 10.00,
    description: "You make my heart skip a beat. Literally. Please stop.",
    image: "https://i.imgur.com/BrgDOIQ.png",
    images: ["https://i.imgur.com/BrgDOIQ.png", "https://i.imgur.com/eahMott.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"],
    tags: ["new year", "dark", "funny", "sarcastic", "2026", "black"]
  },
  // 9. Notebook: Celestial
  {
    id: 30,
    name: "Celestial Book",
    category: "notebooks",
    subCategory: "pinned",
    price: 125.00,
    description: "Write your destiny among the stars. A cosmic companion for your late-night realizations.",
    image: "https://i.imgur.com/HU3Otwt.png",
    images: [
        "https://i.imgur.com/HU3Otwt.png",
        "https://i.imgur.com/sI5Bqly.png"
    ],
    details: [
        "160 Pages",
        "Ruled / Lined",
        "100gsm Acid-Free Paper",
        "A5 Size (148 x 210 mm)",
        "Lay-flat Pinned Binding"
    ],
    isNew: true,
    tags: ["space", "stars", "blue", "cosmic", "pinned", "journal", "ruled", "lined"]
  },
  // 10. Notebook: Clean Slate
  {
    id: 28,
    name: "Clean Slate",
    category: "notebooks",
    subCategory: "pinned",
    price: 125.00,
    description: "Clean, crisp, and ready for your chaos.",
    image: "https://i.imgur.com/wdc3UbQ.png",
    images: [
      "https://i.imgur.com/y2Jnqd8.png",
      "https://i.imgur.com/00YqPdF.png",
      "https://i.imgur.com/wdc3UbQ.png"
    ],
    details: [
        "160 Pages",
        "Dotted / Grid",
        "100gsm Acid-Free Paper",
        "A5 Size (148 x 210 mm)",
        "Lay-flat Pinned Binding"
    ],
    isNew: true,
    tags: ["white", "minimal", "simple", "pinned", "grid", "journal", "dotted", "dot grid"]
  },

  // --- REST OF CATALOG ---
  
  // Notebooks
  {
    id: 1,
    name: "Extra Spicy",
    category: "notebooks",
    subCategory: "pinned",
    price: 125.00,
    description: "Spicy red cover for your hottest takes.",
    image: "https://i.imgur.com/6owuTZ2.png",
    images: [
        "https://i.imgur.com/LY3g4mT.png", 
        "https://i.imgur.com/6owuTZ2.png",
        "https://i.imgur.com/AIEzO6E.jpeg"
    ],
    details: [
        "160 Pages",
        "Ruled / Lined",
        "100gsm Acid-Free Paper",
        "A5 Size (148 x 210 mm)",
        "Lay-flat Pinned Binding"
    ],
    isNew: false,
    tags: ["red", "spicy", "bold", "pinned", "journal", "lined", "ruled"]
  },
  {
    id: 16,
    name: "Espresso",
    category: "notebooks",
    subCategory: "pinned",
    price: 125.00,
    description: "Pour your heart out (and maybe some coffee).",
    image: "https://i.imgur.com/4dAlmws.png",
    images: [
        "https://i.imgur.com/4dAlmws.png",
        "https://i.imgur.com/FGlvHo7.png",
        "https://i.imgur.com/BIVzwWl.png",
        "https://i.imgur.com/AIEzO6E.jpeg"
    ],
    details: [
        "160 Pages",
        "Ruled / Lined",
        "100gsm Paper",
        "A5 Size (148 x 210 mm)",
        "Coffee-Colored Accents"
    ],
    isNew: false,
    tags: ["brown", "coffee", "pinned", "journal", "lined", "warm", "ruled"]
  },
  {
    id: 17,
    name: "Coquette",
    category: "notebooks",
    subCategory: "pinned",
    price: 125.00,
    description: "Wrapped in bows, because your thoughts are a gift.",
    image: "https://i.imgur.com/HfPAYIZ.png",
    images: [
      "https://i.imgur.com/HfPAYIZ.png",
      "https://i.imgur.com/Q9lBLXC.png",
      "https://i.imgur.com/UqjYj8R.png",
      "https://i.imgur.com/XXPA54x.png"
    ],
    details: [
        "160 Pages",
        "Plain / Blank",
        "100gsm Paper",
        "A5 Size",
        "Coquette Aesthetic"
    ],
    isNew: false,
    tags: ["pink", "bows", "cute", "aesthetic", "pinned", "journal", "blank", "plain"]
  },
  {
    id: 24,
    name: "Daydream",
    category: "notebooks",
    subCategory: "pinned",
    price: 125.00,
    description: "Soft hues for your boldest ideas.",
    image: "https://i.imgur.com/fn9A9MR.png",
    images: [
      "https://i.imgur.com/NxvLWK6.png",
      "https://i.imgur.com/1LZg19l.png",
      "https://i.imgur.com/fn9A9MR.png"
    ],
    details: [
        "160 Pages",
        "Ruled / Lined",
        "100gsm Acid-Free Paper",
        "A5 Size (148 x 210 mm)",
        "Lay-flat Pinned Binding"
    ],
    isNew: false,
    tags: ["pastel", "gradient", "soft", "pinned", "journal", "lined", "ruled"]
  },
  {
    id: 27,
    name: "Grand Prix",
    category: "notebooks",
    subCategory: "pinned",
    price: 125.00,
    description: "Lights out and away we go! A tribute to speed.",
    image: "https://i.imgur.com/Qdo6I7k.png",
    images: [
        "https://i.imgur.com/Qdo6I7k.png",
        "https://i.imgur.com/99zWYKG.jpeg"
    ],
    details: [
        "160 Pages",
        "Ruled / Lined",
        "100gsm Acid-Free Paper",
        "A5 Size (148 x 210 mm)",
        "Lay-flat Pinned Binding"
    ],
    isNew: false,
    tags: ["race", "car", "checkered", "red", "pinned", "journal", "sport", "ruled", "lined"]
  },
  {
    id: 19,
    name: "Checkmate",
    category: "notebooks",
    subCategory: "spiral",
    price: 135.00,
    description: "Black, white, and always right.",
    image: "https://i.imgur.com/WvDFpxK.png",
    images: [
        "https://i.imgur.com/WvDFpxK.png", // Front
        "https://i.imgur.com/uuIwsBI.jpeg"  // Back
    ],
    details: [
        "160 Pages",
        "Dotted / Grid",
        "100gsm Premium Paper",
        "A5 Size (148 x 210 mm)",
        "Silver Spiral Binding"
    ],
    isNew: false,
    tags: ["black", "white", "checkerboard", "spiral", "wirebound", "grid", "journal", "dotted", "dot grid"]
  },
  {
    id: 25,
    name: "Lilac Haze",
    category: "notebooks",
    subCategory: "spiral",
    price: 135.00,
    description: "Keep it cool, keep it spiral.",
    image: "https://i.imgur.com/Cb4mfrK.png",
    images: [
        "https://i.imgur.com/4FgS8mB.png", //inside
        "https://i.imgur.com/jDdnvYc.png",
        "https://i.imgur.com/gr6li6l.png" // zoom
    ],
    details: [
        "160 Pages",
        "Dotted / Grid",
        "100gsm Premium Paper",
        "A5 Size (148 x 210 mm)",
        "Silver Spiral Binding"
    ],
    isNew: true,
    tags: ["purple", "lilac", "spiral", "wirebound", "grid", "journal", "pastel", "dotted", "dot grid"]
  },
  {
    id: 26,
    name: "Desi Drama",
    category: "notebooks",
    subCategory: "spiral",
    price: 135.00,
    description: "Traditional roots with a modern attitude.",
    image: "https://i.imgur.com/yqYyYBz.png",
    images: [
      "https://i.imgur.com/AmJk1a5.png",
      "https://i.imgur.com/sVdzTfT.png",
      "https://i.imgur.com/yqYyYBz.png"
    ],
    details: [
        "160 Pages",
        "Dotted / Grid",
        "100gsm Premium Paper",
        "A5 Size (148 x 210 mm)",
        "Silver Spiral Binding"
    ],
    isNew: false,
    tags: ["indian", "pattern", "desi", "spiral", "wirebound", "grid", "journal", "dotted", "dot grid"]
  },

  // Planners
  {
    id: 18,
    name: "Lemon Zest",
    category: "planners", 
    subCategory: "small",
    price: 75.00,
    description: "When life gets sour, write it all down. This small but mighty notepad is perfect for quick thoughts and juicy ideas.",
    image: "https://i.imgur.com/33Cu0lx.png",
    images: [
        "https://i.imgur.com/FIy2Y1j.png",
        "https://i.imgur.com/YOkclqL.png",
        "https://i.imgur.com/2HKhdyw.png"
    ],
    details: [
        "120 Pages",
        "Unruled / Plain",
        "100gsm Premium Paper", 
        "A6 Size (105 x 148 mm)",
        "Tear-out Notepad"
    ],
    isNew: false,
    tags: ["yellow", "lemon", "notepad", "small", "pocket", "fruit", "plain", "unruled", "blank"]
  },
  {
    id: 20,
    name: "The Script",
    category: "planners",
    subCategory: "large",
    price: 145.00,
    description: "Minimalist design, maximum space.",
    image: "https://i.imgur.com/9cpu1As.png",
    images: [
      "https://i.imgur.com/ldbwmWJ.png",
      "https://i.imgur.com/9cpu1As.png",
      "https://i.imgur.com/NCkYkO0.png"
    ],
    details: [
        "120 Pages",
        "Unruled / Plain",
        "100gsm Premium Paper",
        "A5 Size (148 x 210 mm)",
        "Tear-out Notepad"
    ],
    isNew: true,
    tags: ["text", "typography", "beige", "notepad", "large", "minimal", "plain", "unruled", "blank"]
  },
  {
    id: 21,
    name: "Quick Note",
    category: "planners",
    subCategory: "small",
    price: 75.00,
    description: "No drama, just paper.",
    image: "https://i.imgur.com/gub1Gl6.png",
    images: [
      "https://i.imgur.com/Js6SOLE.png",
      "https://i.imgur.com/gub1Gl6.png",
      "https://i.imgur.com/CCoJw3Y.png"
    ],
    details: [
        "120 Pages",
        "Unruled / Plain",
        "100gsm Premium Paper",
        "A6 Size (105 x 148 mm)",
        "Tear-out Notepad"
    ],
    isNew: false,
    tags: ["blue", "notepad", "small", "pocket", "simple", "plain", "unruled", "blank"]
  },
  {
    id: 22,
    name: "Masterplan",
    category: "planners",
    subCategory: "large",
    price: 145.00,
    description: "Big enough for all your chaos.",
    image: "https://i.imgur.com/gPyctks.png",
    images: [
      "https://i.imgur.com/gPyctks.png",
      "https://i.imgur.com/VGKkhNT.png",
      "https://i.imgur.com/h73q09g.png",
      "https://i.imgur.com/nTWtll5.png"
    ],
    details: [
        "100 Pages",
        "Undated Daily Planner",
        "100gsm Premium Paper",
        "A5 Size (148 x 210 mm)",
        "Tear-out Sheets"
    ],
    isNew: false,
    tags: ["green", "planner", "daily", "large", "undated", "organizer"]
  },
  {
    id: 23,
    name: "Trophical",
    category: "planners",
    subCategory: "small",
    price: 75.00,
    description: "Compact space for big ideas.",
    image: "https://i.imgur.com/aZxAIZr.png",
        images: [
      "https://i.imgur.com/NlB7e5i.png",
      "https://i.imgur.com/aZxAIZr.png"
    ],
    details: [
        "100 Pages",
        "Unruled / Plain",
        "100gsm Premium Paper",
        "A6 Size (105 x 148 mm)",
        "Tear-out Sheets"
    ],
    isNew: false,
    tags: ["green", "palm", "tropical", "notepad", "small", "pocket", "plain", "unruled", "blank"]
  },
  {
    id: 34,
    name: "Blueprint",
    category: "planners",
    subCategory: "small",
    price: 75.00,
    description: "Blank canvas for your imploding brain",
    image: "https://i.imgur.com/eGQNuYF.png",
        images: [
      "https://i.imgur.com/eGQNuYF.png",
      "https://i.imgur.com/WTtl0zc.png"
    ],
    details: [
        "100 Pages",
        "Unruled / Plain",
        "100gsm Premium Paper",
        "A6 Size (105 x 148 mm)",
        "Tear-out Sheets"
    ],
    isNew: false,
    tags: ["blue", "grid", "technical", "notepad", "small", "architect", "plain", "unruled", "blank"]
  },

  // Other Greeting Cards
  {
    id: 103,
    name: "You make me..",
    category: "greeting-cards",
    price: 10.00,
    description: "Speak through our cards",
    image: "https://i.imgur.com/prgHhPD.png",
    images: ["https://i.imgur.com/prgHhPD.png", "https://i.imgur.com/Tn2SDOM.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"],
    tags: ["love", "romance", "funny", "pun", "pink"]
  },
  {
    id: 104,
    name: "Birthday cake",
    category: "greeting-cards",
    price: 10.00,
    description: "Send cake for their birthday, minus the calories.",
    image: "https://i.imgur.com/TPC3r3G.png",
    images: ["https://i.imgur.com/TPC3r3G.png", "https://i.imgur.com/hGUIXOK.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"],
    tags: ["birthday", "cake", "food", "funny", "celebration"]
  },
  {
    id: 105,
    name: "Watercolor birthday",
    category: "greeting-cards",
    price: 10.00,
    description: "Happy birthday. Simple, cute. ",
    image: "https://i.imgur.com/NnkYW0m.png",
    images: ["https://i.imgur.com/NnkYW0m.png", "https://i.imgur.com/kbe2Auv.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"],
    tags: ["birthday", "art", "watercolor", "cute", "simple"]
  },
  {
    id: 106,
    name: "Wish away!",
    category: "greeting-cards",
    price: 10.00,
    description: "Wish them birthday with candles because they light up everywhere they go.",
    image: "https://i.imgur.com/CE6KrRo.png",
    images: ["https://i.imgur.com/CE6KrRo.png", "https://i.imgur.com/K1Bt8Yt.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"],
    tags: ["birthday", "candles", "wishes", "cake", "party"]
  },
  {
    id: 107,
    name: "Toasty",
    category: "greeting-cards",
    price: 10.00,
    description: "Give them a toast on their special day.",
    image: "https://i.imgur.com/x8YgfHi.png",
    images: ["https://i.imgur.com/x8YgfHi.png", "https://i.imgur.com/vTR0zaY.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"],
    tags: ["birthday", "toast", "food", "pun", "funny"]
  },
  {
    id: 108,
    name: "Congratualations",
    category: "greeting-cards",
    price: 10.00,
    description: "Tell them they are doing great with the cards, because every milestone counts.",
    image: "https://i.imgur.com/MFElr3D.png",
    images: ["https://i.imgur.com/MFElr3D.png", "https://i.imgur.com/gLZscEA.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"],
    tags: ["congrats", "celebration", "achievement", "milestone", "success"]
  },
  {
    id: 109,
    name: "Spark Session",
    category: "greeting-cards",
    price: 10.00,
    description: "We're a perfect match. Sparks flying.",
    image: "https://i.imgur.com/vhETIzM.png",
    images: ["https://i.imgur.com/vhETIzM.png", "https://i.imgur.com/92i3v2u.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"],
    tags: ["love", "romance", "match", "sparks", "dating"]
  },
  {
    id: 110,
    name: "Birthday Candles",
    category: "greeting-cards",
    price: 10.00,
    description: "Wish em happy birthday. ",
    image: "https://i.imgur.com/ZJS67QP.png",
    images: ["https://i.imgur.com/ZJS67QP.png", "https://i.imgur.com/NAjUrBy.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"],
    tags: ["birthday", "candles", "classic", "simple"]
  },
  {
    id: 111,
    name: "Thank you ",
    category: "greeting-cards",
    price: 10.00,
    description: "Thank you Cards because sometimes you need to put the gratitude on paper.",
    image: "https://i.imgur.com/G5iKUy6.png",
    images: ["https://i.imgur.com/G5iKUy6.png", "https://i.imgur.com/5dyVLvm.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"],
    tags: ["thank you", "gratitude", "thanks", "simple"]
  },
  {
    id: 112,
    name: "Enjoying Animals",
    category: "greeting-cards",
    price: 10.00,
    description: "You're punderful. Send a fun birthday card to the funny ones!",
    image: "https://i.imgur.com/sdFGFI7.png",
    images: ["https://i.imgur.com/sdFGFI7.png", "https://i.imgur.com/2FR5Y8P.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"],
    tags: ["birthday", "animals", "funny", "cute", "pun"]
  }
];
