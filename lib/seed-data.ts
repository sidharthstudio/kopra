/**
 * Seed content. Products, ingredients and the workshop price come from
 * KOPRA's published menu coverage (The Hindu, 16 Oct 2026), its Instagram
 * bio and a documented tasting session. No dish, drink or price is invented:
 * where KOPRA has not published a price it is stored as NULL and rendered
 * as "on request".
 *
 * Photography is licensed placeholder imagery (Unsplash) standing in for
 * KOPRA's own shoot — replace via the admin panel or /data/uploads.
 */

export const seedCategories = [
  {
    slug: "signature-pours",
    name: "Signature Pours",
    description:
      "The drinks KOPRA is known for. Built from scratch with house ferments, fresh produce and no alcohol.",
    sortOrder: 1,
  },
  {
    slug: "house-ferments",
    name: "House Ferments",
    description:
      "Kombucha, milk kefir, water kefir and tepache — cultured in-house and poured with intention.",
    sortOrder: 2,
  },
  {
    slug: "morning-table",
    name: "Morning Table",
    description: "KOPRA opens at 7 AM. Coffee, cultured drinks and a slow start.",
    sortOrder: 3,
  },
  {
    slug: "small-plates",
    name: "Small Plates",
    description: "Bar food built around Kerala's own pantry, including dosas from the griddle.",
    sortOrder: 4,
  },
  {
    slug: "sweet-finish",
    name: "Sweet Finish",
    description: "Desserts from the KOPRA kitchen. Ask your server for today's selection.",
    sortOrder: 5,
  },
];

export const seedProducts = [
  {
    categorySlug: "signature-pours",
    name: "First Night",
    tagline: "Floral, delicate, quietly celebratory",
    description:
      "Jasmine flower, fresh apple juice and sandalwood. The opening drink of the evening — soft, perfumed and clean, with sandalwood lending a warm, resinous tail.",
    ingredients: "Jasmine flower · Fresh apple juice · Sandalwood",
    priceInr: null,
    imageUrl:
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1200&q=80",
    notes: "Signature",
    isSignature: 1,
    sortOrder: 1,
  },
  {
    categorySlug: "signature-pours",
    name: "Paadam",
    tagline: "Pazhamkanji, reimagined as a cocktail",
    description:
      "Named for the paddy field. Kanji vellam (rice water) fermented with milk kefir grains, with curry leaf, green chilli and shallots — a savoury, cultured drink that tastes like a Kerala breakfast, finished with tangy raw mango and ginger.",
    ingredients:
      "Kanji vellam fermented with milk kefir · Curry leaf · Green chilli · Shallots · Raw mango · Ginger",
    priceInr: null,
    imageUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
    notes: "Signature · Contains dairy (milk kefir)",
    isSignature: 1,
    sortOrder: 2,
  },
  {
    categorySlug: "signature-pours",
    name: "Panakam",
    tagline: "Kombucha, long pepper, honey, oregano",
    description:
      "A cultured take on the temple-town cooler. House kombucha meets long pepper for heat, honey for roundness and Indian oregano for a herbal, almost medicinal lift.",
    ingredients: "House kombucha · Long pepper · Honey · Indian oregano",
    priceInr: null,
    imageUrl:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=80",
    notes: "Signature · Contains honey (not vegan)",
    isSignature: 1,
    sortOrder: 3,
  },
  {
    categorySlug: "signature-pours",
    name: "Green Chutney (Ka)",
    tagline: "Herbal, green, unexpectedly savoury",
    description:
      "Green chutney, kaffir lime leaf and water kefir. Bright and herbal with a citrus edge — the drink that convinces people a cocktail does not need spirits.",
    ingredients: "Green chutney · Kaffir lime leaf · Water kefir",
    priceInr: null,
    imageUrl:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=1200&q=80",
    notes: "Signature",
    isSignature: 1,
    sortOrder: 4,
  },
  {
    categorySlug: "signature-pours",
    name: "After Meal",
    tagline: "A digestive, served cold",
    description:
      "Tepache with cumin, nannari, ashwagandha, licorice and hibiscus. Built as a digestif — tart, spiced and gently bitter, with the sarsaparilla notes of nannari running through it.",
    ingredients: "Tepache · Cumin · Nannari · Ashwagandha · Licorice · Hibiscus",
    priceInr: null,
    imageUrl:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1200&q=80",
    notes: "Signature",
    isSignature: 1,
    sortOrder: 5,
  },
  {
    categorySlug: "morning-table",
    name: "The Breakfast",
    tagline: "Pineapple, coconut milk, Palayagodan coffee",
    description:
      "Pineapple, fresh coconut milk and Palayagodan coffee — a morning pick-me-up in cocktail form, tropical and rounded with a local coffee finish.",
    ingredients: "Pineapple · Fresh coconut milk · Palayagodan coffee",
    priceInr: null,
    imageUrl:
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=1200&q=80",
    notes: "Signature · Contains dairy (coconut milk)",
    isSignature: 1,
    sortOrder: 6,
  },
  {
    categorySlug: "house-ferments",
    name: "Kombucha of the Day",
    tagline: "Cultured in-house, poured fresh",
    description:
      "KOPRA's house kombucha, fermented on site and served as it is or built into a cocktail. Ask the bar team what is on tap today.",
    ingredients: "House kombucha · Seasonal fruit",
    priceInr: null,
    imageUrl:
      "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=1200&q=80",
    notes: "Ask for today's ferment",
    isSignature: 0,
    sortOrder: 1,
  },
  {
    categorySlug: "house-ferments",
    name: "Tepache",
    tagline: "Pineapple, spice, time",
    description:
      "Pineapple fermented with spice — the base of After Meal and a drink in its own right. Fizzy, funky and low in sweetness.",
    ingredients: "Pineapple · Spice · Cane sugar (fermented out)",
    priceInr: null,
    imageUrl:
      "https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=1200&q=80",
    notes: "Fermented in-house",
    isSignature: 0,
    sortOrder: 2,
  },
  {
    categorySlug: "morning-table",
    name: "Palayagodan Coffee",
    tagline: "Local beans, brewed to order",
    description:
      "Coffee from Palayagodan, served through the morning alongside the cultured drinks and the breakfast menu.",
    ingredients: "Palayagodan coffee",
    priceInr: null,
    imageUrl:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
    notes: null,
    isSignature: 0,
    sortOrder: 1,
  },
  {
    categorySlug: "small-plates",
    name: "Benne Dosa",
    tagline: "Butter, crisp, from the griddle",
    description:
      "The benne dosa KOPRA's early guests keep coming back for — served as bar food alongside the cocktails.",
    ingredients: "Rice batter · Butter",
    priceInr: null,
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    notes: null,
    isSignature: 0,
    sortOrder: 1,
  },
  {
    categorySlug: "small-plates",
    name: "Mangalore Chicken Ghee Roast Dosa",
    tagline: "Ghee roast, folded into a dosa",
    description:
      "Mangalore-style chicken ghee roast served in a dosa — the dish KOPRA's opening menu was written around.",
    ingredients: "Chicken · Ghee roast masala · Dosa batter",
    priceInr: null,
    imageUrl:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80",
    notes: "Contains chicken",
    isSignature: 0,
    sortOrder: 2,
  },
];

export const seedEvents = [
  {
    slug: "cocktail-workshop",
    title: "The KOPRA Cocktail Workshop",
    kind: "Workshop",
    description:
      "Learn how a non-alcoholic cocktail is actually built — fermentation, carbonation, clarification and infusion — then make your own at the bar.",
    detail:
      "₹699 per person. No experience needed. Dates are released on Instagram; message us and we will hold a place for the next session.",
    startsAt: null,
    priceInr: 699,
    imageUrl:
      "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?auto=format&fit=crop&w=1400&q=80",
    ctaHref: "/private-events?type=workshop",
    isPublished: 1,
    sortOrder: 1,
  },
  {
    slug: "tasting-table",
    title: "The Tasting Table",
    kind: "Guided tasting",
    description:
      "A sit-down flight through KOPRA's signature pours, with the stories behind each drink — pazhamkanji, panakam, green chutney — told by the team who built them.",
    detail:
      "For groups of four or more. Priced on request. Book at least two days ahead so the bar can prepare the flight.",
    startsAt: null,
    priceInr: null,
    imageUrl:
      "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=1400&q=80",
    ctaHref: "/private-events?type=tasting",
    isPublished: 1,
    sortOrder: 2,
  },
  {
    slug: "private-hire",
    title: "Private Hire",
    kind: "Private gathering",
    description:
      "Take the third-floor room for a birthday, an engagement, a team offsite or a launch — with a bar programme written for your group.",
    detail:
      "Capacity, minimum spend and menu are confirmed with the team. Send an enquiry with your date and headcount.",
    startsAt: null,
    priceInr: null,
    imageUrl:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=80",
    ctaHref: "/private-events?type=private-party",
    isPublished: 1,
    sortOrder: 3,
  },
];

export const seedGallery = [
  {
    url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
    caption: "A signature pour, garnished at the bar",
    category: "Drinks",
    orientation: "portrait",
    sortOrder: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    caption: "The third-floor room in the evening",
    category: "Interior",
    orientation: "landscape",
    sortOrder: 2,
  },
  {
    url: "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?auto=format&fit=crop&w=1200&q=80",
    caption: "Building a drink from scratch",
    category: "Craft",
    orientation: "landscape",
    sortOrder: 3,
  },
  {
    url: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1200&q=80",
    caption: "House ferments, poured cold",
    category: "Drinks",
    orientation: "portrait",
    sortOrder: 4,
  },
  {
    url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
    caption: "Warm light, scarlet walls",
    category: "Interior",
    orientation: "landscape",
    sortOrder: 5,
  },
  {
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    caption: "Dosas from the griddle",
    category: "Food",
    orientation: "landscape",
    sortOrder: 6,
  },
  {
    url: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1200&q=80",
    caption: "First Night — jasmine and sandalwood",
    category: "Drinks",
    orientation: "portrait",
    sortOrder: 7,
  },
  {
    url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
    caption: "A table set for a private gathering",
    category: "Events",
    orientation: "landscape",
    sortOrder: 8,
  },
  {
    url: "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=1200&q=80",
    caption: "Last orders at the bar",
    category: "Interior",
    orientation: "portrait",
    sortOrder: 9,
  },
];
