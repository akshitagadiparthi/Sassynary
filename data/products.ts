
import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- MYSTERY BOX ---
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
    isNew: true
  },
  // --- GREETING CARDS - Sassier Names & Standardized Details ---
  {
    id: 101,
    name: "The Cardiac Arrest",
    category: "greeting-cards",
    price: 10.00,
    description: "You make my heart skip a beat. Literally. Please stop.",
    image: "https://i.imgur.com/BrgDOIQ.png",
    images: ["https://i.imgur.com/BrgDOIQ.png", "https://i.imgur.com/eahMott.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"]
  },
  {
    id: 102,
    name: "Main Squeeze",
    category: "greeting-cards",
    price: 10.00,
    description: "You're simply the zest. No squeeze about it.",
    image: "https://i.imgur.com/2J5EqGI.png",
    images: ["https://i.imgur.com/2J5EqGI.png", "https://i.imgur.com/WTOXmM4.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"]
  },
  {
    id: 103,
    name: "Future Cat Lady",
    category: "greeting-cards",
    price: 10.00,
    description: "Another year closer to becoming a crazy cat lady. Embrace it.",
    image: "https://i.imgur.com/prgHhPD.png",
    images: ["https://i.imgur.com/prgHhPD.png", "https://i.imgur.com/Tn2SDOM.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"]
  },
  {
    id: 104,
    name: "Spilling The Tea",
    category: "greeting-cards",
    price: 10.00,
    description: "You're tea-riffic. Steeped in greatness.",
    image: "https://i.imgur.com/TPC3r3G.png",
    images: ["https://i.imgur.com/TPC3r3G.png", "https://i.imgur.com/hGUIXOK.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"]
  },
  {
    id: 105,
    name: "Face Obsessed",
    category: "greeting-cards",
    price: 10.00,
    description: "I like your face. It's a good one.",
    image: "https://i.imgur.com/NnkYW0m.png",
    images: ["https://i.imgur.com/NnkYW0m.png", "https://i.imgur.com/kbe2Auv.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"]
  },
  {
    id: 106,
    name: "Melon Millionaire",
    category: "greeting-cards",
    price: 10.00,
    description: "You're one in a melon. Truly seedless potential.",
    image: "https://i.imgur.com/CE6KrRo.png",
    images: ["https://i.imgur.com/CE6KrRo.png", "https://i.imgur.com/K1Bt8Yt.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"]
  },
  {
    id: 107,
    name: "Desert Attitude",
    category: "greeting-cards",
    price: 10.00,
    description: "Don't be a prick. Unless you're a cute cactus.",
    image: "https://i.imgur.com/x8YgfHi.png",
    images: ["https://i.imgur.com/x8YgfHi.png", "https://i.imgur.com/vTR0zaY.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"]
  },
  {
    id: 108,
    name: "Butter Together",
    category: "greeting-cards",
    price: 10.00,
    description: "You're my butter half. We're on a roll.",
    image: "https://i.imgur.com/MFElr3D.png",
    images: ["https://i.imgur.com/MFElr3D.png", "https://i.imgur.com/gLZscEA.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"]
  },
  {
    id: 109,
    name: "Spark Session",
    category: "greeting-cards",
    price: 10.00,
    description: "We're a perfect match. Sparks flying.",
    image: "https://i.imgur.com/vhETIzM.png",
    images: ["https://i.imgur.com/vhETIzM.png", "https://i.imgur.com/92i3v2u.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"]
  },
  {
    id: 110,
    name: "Latte Attitude",
    category: "greeting-cards",
    price: 10.00,
    description: "I love you a latte. Espresso-ly you.",
    image: "https://i.imgur.com/ZJS67QP.png",
    images: ["https://i.imgur.com/ZJS67QP.png", "https://i.imgur.com/NAjUrBy.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"]
  },
  {
    id: 111,
    name: "Good Egg Energy",
    category: "greeting-cards",
    price: 10.00,
    description: "Have an egg-cellent day. Sunny side up only.",
    image: "https://i.imgur.com/G5iKUy6.png",
    images: ["https://i.imgur.com/G5iKUy6.png", "https://i.imgur.com/5dyVLvm.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"]
  },
  {
    id: 112,
    name: "Kitten Around",
    category: "greeting-cards",
    price: 10.00,
    description: "You're punderful. I'm not kitten around.",
    image: "https://i.imgur.com/sdFGFI7.png",
    images: ["https://i.imgur.com/sdFGFI7.png", "https://i.imgur.com/2FR5Y8P.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"]
  },
  {
    id: 113,
    name: "Melon Grateful",
    category: "greeting-cards",
    price: 10.00,
    description: "Thanks a melon! You're the best of the patch.",
    image: "https://i.imgur.com/0gkT9Dn.png",
    images: ["https://i.imgur.com/0gkT9Dn.png", "https://i.imgur.com/K1Bt8Yt.png"],
    details: ["Premium 300gsm Cardstock", "A6 size"]
  },
  // --- NOTEBOOKS (PINNED) - Rule: 160 Pages, Price 125 ---
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
    isNew: true
  },
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
    isNew: true
  },
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
    isNew: false
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
    isNew: false
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
    isNew: false
  },
  {
    id: 24,
    name: "Daydream",
    category: "notebooks",
    subCategory: "pinned",
    price: 125.00,
    description: "Soft hues for your boldest ideas.",
    image: "https://i.imgur.com/NxvLWK6.png",
    images: [
      "https://i.imgur.com/NxvLWK6.png",
      "https://i.imgur.com/1LZg19l.png"
    ],
    details: [
        "160 Pages",
        "Ruled / Lined",
        "100gsm Acid-Free Paper",
        "A5 Size (148 x 210 mm)",
        "Lay-flat Pinned Binding"
    ],
    isNew: false
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
    isNew: false
  },
  {
    id: 28,
    name: "Clean Slate",
    category: "notebooks",
    subCategory: "pinned",
    price: 125.00,
    description: "Clean, crisp, and ready for your chaos.",
    image: "https://i.imgur.com/y2Jnqd8.png",
    images: [
      "https://i.imgur.com/y2Jnqd8.png",
      "https://i.imgur.com/00YqPdF.png"
    ],
    details: [
        "160 Pages",
        "Dotted / Grid",
        "100gsm Acid-Free Paper",
        "A5 Size (148 x 210 mm)",
        "Lay-flat Pinned Binding"
    ],
    isNew: true
  },

  // --- NOTEBOOKS (SPIRAL) - Rule: 160 Pages, Price 135 ---
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
    isNew: true
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
        "https://i.imgur.com/uuIwsBI.jpeg",  // Back
        "https://i.imgur.com/BIVzwWl.png",   // Inside
    ],
    details: [
        "160 Pages",
        "Dotted / Grid",
        "100gsm Premium Paper",
        "A5 Size (148 x 210 mm)",
        "Gold Spiral Binding"
    ],
    isNew: false
  },
  {
    id: 25,
    name: "Lilac Haze",
    category: "notebooks",
    subCategory: "spiral",
    price: 135.00,
    description: "Keep it cool, keep it spiral.",
    image: "https://i.imgur.com/Cb4mfrK.png",
    details: [
        "160 Pages",
        "Dotted / Grid",
        "100gsm Premium Paper",
        "A5 Size (148 x 210 mm)",
        "Gold Spiral Binding"
    ],
    isNew: true
  },
  {
    id: 26,
    name: "Desi Drama",
    category: "notebooks",
    subCategory: "spiral",
    price: 135.00,
    description: "Traditional roots with a modern attitude.",
    image: "https://i.imgur.com/AmJk1a5.png",
    images: [
      "https://i.imgur.com/AmJk1a5.png",
      "https://i.imgur.com/sVdzTfT.png"
    ],
    details: [
        "160 Pages",
        "Dotted / Grid",
        "100gsm Premium Paper",
        "A5 Size (148 x 210 mm)",
        "Gold Spiral Binding"
    ],
    isNew: false
  },

  // --- PLANNERS / NOTEPADS - Rule: A6 Small 75rs, A5 Large 145rs ---
  {
    id: 31,
    name: "Weekly Planner",
    category: "planners",
    subCategory: "notepad",
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
    isNew: true
  },
  {
    id: 32,
    name: "Daily Journal Grid",
    category: "planners",
    subCategory: "notepad",
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
    isNew: true
  },
  {
    id: 18,
    name: "Lemon Zest",
    category: "planners", 
    subCategory: "notepad",
    price: 75.00,
    description: "When life gets sour, write it all down. This small but mighty notepad is perfect for quick thoughts and juicy ideas.",
    image: "https://i.imgur.com/FIy2Y1j.png",
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
    isNew: false
  },
  {
    id: 20,
    name: "The Script",
    category: "planners",
    subCategory: "notepad",
    price: 145.00,
    description: "Minimalist design, maximum space.",
    image: "https://i.imgur.com/ldbwmWJ.png",
    images: [
      "https://i.imgur.com/ldbwmWJ.png",
      "https://i.imgur.com/NCkYkO0.png"
    ],
    details: [
        "120 Pages",
        "Unruled / Plain",
        "100gsm Premium Paper",
        "A5 Size (148 x 210 mm)",
        "Tear-out Notepad"
    ],
    isNew: true
  },
  {
    id: 21,
    name: "Quick Note",
    category: "planners",
    subCategory: "notepad",
    price: 75.00,
    description: "No drama, just paper.",
    image: "https://i.imgur.com/Js6SOLE.png",
    images: [
      "https://i.imgur.com/Js6SOLE.png",
      "https://i.imgur.com/CCoJw3Y.png"
    ],
    details: [
        "120 Pages",
        "Unruled / Plain",
        "100gsm Premium Paper",
        "A6 Size (105 x 148 mm)",
        "Tear-out Notepad"
    ],
    isNew: false
  },
  // --- BIGGER PLANNERS ---
  {
    id: 22,
    name: "Masterplan",
    category: "planners",
    subCategory: "planner",
    price: 145.00,
    description: "Big enough for all your chaos.",
    image: "https://i.imgur.com/zzDn6TT.png",
    images: [
      "https://i.imgur.com/zzDn6TT.png",
      "https://i.imgur.com/Mairvwu.png"
    ],
    details: [
        "100 Pages",
        "Undated Daily Planner",
        "100gsm Premium Paper",
        "A5 Size (148 x 210 mm)",
        "Tear-out Sheets"
    ],
    isNew: false
  },
  {
    id: 23,
    name: "Blueprint",
    category: "planners",
    subCategory: "notepad",
    price: 75.00,
    description: "Compact space for big ideas.",
    image: "https://i.imgur.com/CCoJw3Y.png",
    details: [
        "100 Pages",
        "Unruled / Plain",
        "100gsm Premium Paper",
        "A6 Size (105 x 148 mm)",
        "Tear-out Sheets"
    ],
    isNew: false
  }
];
