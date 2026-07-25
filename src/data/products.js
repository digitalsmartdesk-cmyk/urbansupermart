// Wholesale FMCG catalogue data + discount-tier math. Plain ES module, no deps.

export const CATEGORIES = ["Staples", "Beverages", "Snacks & Confectionery", "Personal Care", "Home & Cleaning"];

export const TIERS = [
  { max: 10, pct: 0 },
  { max: 20, pct: 0.5 },
  { max: 40, pct: 1.0 },
  { max: 101, pct: 1.5 },
];

export const PRODUCTS = [
  // ---- Established (30) ----
  { id: "e1", brandType: "established", brand: "Suryodaya", name: "Sunflower Oil 1L", category: "Staples", unit: "bottle", price: 142, moq: 24, desc: "Refined sunflower oil, cold-pressed for retail cooking oil racks. Standard 1L PET bottle, shrink-wrapped in cartons of 12." },
  { id: "e2", brandType: "established", brand: "Kisan Gold", name: "Basmati Rice 5kg", category: "Staples", unit: "bag", price: 410, moq: 12, desc: "Aged basmati rice, extra-long grain. Bulk 5kg woven bags, palletized in lots of 40." },
  { id: "e3", brandType: "established", brand: "Real Harvest", name: "Whole Wheat Atta 10kg", category: "Staples", unit: "bag", price: 385, moq: 10, desc: "Stone-ground whole wheat flour. High-fibre, fortified with iron and folic acid." },
  { id: "e4", brandType: "established", brand: "Golden Grain", name: "Toor Dal 1kg", category: "Staples", unit: "pack", price: 128, moq: 30, desc: "Cleaned and polished split pigeon peas, vacuum-sealed 1kg retail packs." },
  { id: "e5", brandType: "established", brand: "Suryodaya", name: "Refined Groundnut Oil 5L", category: "Staples", unit: "can", price: 690, moq: 8, desc: "Heavy-duty catering pack for restaurants and canteens. Reusable tin can." },
  { id: "e6", brandType: "established", brand: "Nutriline", name: "Iodised Salt 1kg", category: "Staples", unit: "pack", price: 22, moq: 60, desc: "Free-flow iodised crystal salt, moisture-resistant multilayer pouch." },
  { id: "e7", brandType: "established", brand: "Kisan Gold", name: "Sona Masoori Rice 25kg", category: "Staples", unit: "bag", price: 1180, moq: 6, desc: "Bulk institutional rice bag for hotels, messes and large kitchens." },
  { id: "e8", brandType: "established", brand: "Golden Grain", name: "Chana Dal 1kg", category: "Staples", unit: "pack", price: 118, moq: 30, desc: "Split Bengal gram, sorted and machine-cleaned, sealed retail pouch." },
  { id: "e9", brandType: "established", brand: "Amrit Dairy", name: "Ghee 1L Tin", category: "Beverages", unit: "tin", price: 610, moq: 12, desc: "Pure cow ghee, slow-churned. Tamper-evident tin, long shelf life." },
  { id: "e10", brandType: "established", brand: "Chai Point Home", name: "CTC Tea 1kg", category: "Beverages", unit: "pack", price: 340, moq: 20, desc: "Strong-brew CTC leaf tea for retail and HoReCa. Foil-lined kraft pack." },
  { id: "e11", brandType: "established", brand: "PureLeaf", name: "Green Tea Bags (100ct)", category: "Beverages", unit: "box", price: 265, moq: 24, desc: "Individually wrapped green tea bags, 100 per box, tagged and enveloped." },
  { id: "e12", brandType: "established", brand: "Amrit Dairy", name: "UHT Toned Milk 1L", category: "Beverages", unit: "carton", price: 68, moq: 40, desc: "Long-life tetra-pack milk, ambient storage, 6-month shelf life." },
  { id: "e13", brandType: "established", brand: "Chai Point Home", name: "Instant Coffee 200g Jar", category: "Beverages", unit: "jar", price: 285, moq: 18, desc: "Freeze-dried instant coffee granules, glass jar with resealable lid." },
  { id: "e14", brandType: "established", brand: "PureLeaf", name: "Masala Chai Premix 1kg", category: "Beverages", unit: "pack", price: 395, moq: 15, desc: "Vending-grade 3-in-1 masala chai premix for office and canteen dispensers." },
  { id: "e15", brandType: "established", brand: "CrispKing", name: "Classic Salted Chips 52g (48ct)", category: "Snacks & Confectionery", unit: "case", price: 720, moq: 10, desc: "Multipack case of 48 single-serve chip packets for counter display." },
  { id: "e16", brandType: "established", brand: "Munch Mate", name: "Cream Biscuits 200g (24ct)", category: "Snacks & Confectionery", unit: "case", price: 480, moq: 12, desc: "Assorted cream biscuit case, shelf-ready tray packaging." },
  { id: "e17", brandType: "established", brand: "CrispKing", name: "Roasted Namkeen Mix 400g", category: "Snacks & Confectionery", unit: "pack", price: 96, moq: 40, desc: "Regional namkeen mix, nitrogen-flushed pouch for extended crispness." },
  { id: "e18", brandType: "established", brand: "Munch Mate", name: "Chocolate Wafer Bars (36ct)", category: "Snacks & Confectionery", unit: "box", price: 540, moq: 15, desc: "Individually wrapped wafer bars, counter-top display box of 36." },
  { id: "e19", brandType: "established", brand: "GoldenGrain", name: "Digestive Crackers 300g (20ct)", category: "Snacks & Confectionery", unit: "case", price: 610, moq: 10, desc: "High-fibre cracker case for cafés and modern-trade shelves." },
  { id: "e20", brandType: "established", brand: "CrispKing", name: "Toffee Jar 500pc", category: "Snacks & Confectionery", unit: "jar", price: 340, moq: 20, desc: "Bulk toffee jar for checkout-counter impulse racks." },
  { id: "e21", brandType: "established", brand: "GlowCare", name: "Herbal Soap 100g (48ct)", category: "Personal Care", unit: "case", price: 960, moq: 8, desc: "Cold-processed herbal soap bars, case-packed for retail resale." },
  { id: "e22", brandType: "established", brand: "SoftTouch", name: "Talcum Powder 400g", category: "Personal Care", unit: "bottle", price: 165, moq: 30, desc: "Prickly-heat talc, sifter-cap bottle, standard retail SKU." },
  { id: "e23", brandType: "established", brand: "GlowCare", name: "Shampoo 1L Refill", category: "Personal Care", unit: "pouch", price: 310, moq: 24, desc: "Anti-dandruff shampoo, salon-size refill pouch for sachet re-filling counters." },
  { id: "e24", brandType: "established", brand: "SoftTouch", name: "Toothpaste 200g (36ct)", category: "Personal Care", unit: "case", price: 1080, moq: 10, desc: "Fluoride toothpaste case, standard modern-trade shelf pack." },
  { id: "e25", brandType: "established", brand: "GlowCare", name: "Face Wash 150ml (24ct)", category: "Personal Care", unit: "case", price: 890, moq: 12, desc: "Oil-control face wash, dispensing-cap bottles, counter display case." },
  { id: "e26", brandType: "established", brand: "SoftTouch", name: "Hair Oil 200ml", category: "Personal Care", unit: "bottle", price: 88, moq: 48, desc: "Coconut-base hair oil, tamper-seal cap, high-turnover general trade SKU." },
  { id: "e27", brandType: "established", brand: "FreshWash", name: "Dishwash Bar 700g (24ct)", category: "Home & Cleaning", unit: "case", price: 540, moq: 15, desc: "Grease-cutting dishwash bar, wrapped case for kirana resale." },
  { id: "e28", brandType: "established", brand: "ShineHome", name: "Floor Cleaner 1L", category: "Home & Cleaning", unit: "bottle", price: 118, moq: 36, desc: "Disinfectant floor cleaner, pine fragrance, standard retail bottle." },
  { id: "e29", brandType: "established", brand: "FreshWash", name: "Laundry Detergent 4kg", category: "Home & Cleaning", unit: "bag", price: 460, moq: 12, desc: "Front & top-load detergent powder, bulk retail bag." },
  { id: "e30", brandType: "established", brand: "ShineHome", name: "Glass Cleaner 500ml (24ct)", category: "Home & Cleaning", unit: "case", price: 620, moq: 10, desc: "Streak-free glass cleaner, trigger-spray bottles, counter case." },

  // ---- Upcoming (20) ----
  { id: "u1", brandType: "upcoming", brand: "Millet Mill", name: "Foxtail Millet 1kg", category: "Staples", unit: "pack", price: 168, moq: 20, desc: "Direct-from-farm foxtail millet, positioned for the health-foods aisle." },
  { id: "u2", brandType: "upcoming", brand: "Farmstead Direct", name: "Cold-Pressed Mustard Oil 1L", category: "Staples", unit: "bottle", price: 210, moq: 18, desc: "Small-batch cold-pressed mustard oil from a new regional cooperative." },
  { id: "u3", brandType: "upcoming", brand: "GrainWise", name: "Multigrain Atta 5kg", category: "Staples", unit: "bag", price: 320, moq: 15, desc: "7-grain blend flour targeting the premium-health shelf segment." },
  { id: "u4", brandType: "upcoming", brand: "Wholegood", name: "Sprouted Moong Dal 1kg", category: "Staples", unit: "pack", price: 156, moq: 20, desc: "Pre-sprouted, dehydrated moong dal — a discovery item for modern trade." },
  { id: "u5", brandType: "upcoming", brand: "Nimbu Fizz", name: "Sparkling Nimbu Soda 250ml (24ct)", category: "Beverages", unit: "case", price: 480, moq: 10, desc: "Craft carbonated lime soda, glass-bottle case, new-entrant beverage brand." },
  { id: "u6", brandType: "upcoming", brand: "Brewhouse Kombucha", name: "Ginger Kombucha 330ml (12ct)", category: "Beverages", unit: "case", price: 720, moq: 8, desc: "Live-culture kombucha, refrigerated case, positioned for discovery end-caps." },
  { id: "u7", brandType: "upcoming", brand: "Sprig", name: "Cold Brew Coffee Concentrate 500ml", category: "Beverages", unit: "bottle", price: 245, moq: 24, desc: "Small-batch cold brew concentrate for cafés testing new SKUs." },
  { id: "u8", brandType: "upcoming", brand: "Basil & Bay", name: "Herbal Iced Tea Mix 300g", category: "Beverages", unit: "pack", price: 190, moq: 20, desc: "Botanical iced-tea blend, new-brand pilot listing." },
  { id: "u9", brandType: "upcoming", brand: "Snackology", name: "Baked Lentil Chips 60g (36ct)", category: "Snacks & Confectionery", unit: "case", price: 660, moq: 10, desc: "Air-baked lentil chips, low-oil positioning for the discovery shelf." },
  { id: "u10", brandType: "upcoming", brand: "PureOats Co.", name: "Oat & Jaggery Bars (24ct)", category: "Snacks & Confectionery", unit: "box", price: 540, moq: 12, desc: "No-refined-sugar oat bars, new-entrant impulse-aisle candidate." },
  { id: "u11", brandType: "upcoming", brand: "Millet Mill", name: "Ragi Cookies 200g (20ct)", category: "Snacks & Confectionery", unit: "case", price: 480, moq: 15, desc: "Finger-millet cookies, discovery-tier snack listing." },
  { id: "u12", brandType: "upcoming", brand: "Snackology", name: "Roasted Makhana 100g (30ct)", category: "Snacks & Confectionery", unit: "case", price: 900, moq: 10, desc: "Seasoned fox-nut snack packs, premium discovery segment." },
  { id: "u13", brandType: "upcoming", brand: "Dermalis", name: "Ayurvedic Bar Soap 100g (36ct)", category: "Personal Care", unit: "case", price: 780, moq: 10, desc: "Handmade ayurvedic soap, small-batch new-brand listing." },
  { id: "u14", brandType: "upcoming", brand: "Skinly", name: "Vitamin C Face Serum 30ml (18ct)", category: "Personal Care", unit: "case", price: 1440, moq: 6, desc: "D2C-origin serum brand entering wholesale distribution, discovery SKU." },
  { id: "u15", brandType: "upcoming", brand: "Dermalis", name: "Aloe Body Lotion 200ml", category: "Personal Care", unit: "bottle", price: 145, moq: 24, desc: "Lightweight aloe lotion, new-brand pilot for personal-care aisle." },
  { id: "u16", brandType: "upcoming", brand: "Skinly", name: "Charcoal Face Wash 100ml (24ct)", category: "Personal Care", unit: "case", price: 720, moq: 10, desc: "Deep-cleanse charcoal face wash, discovery-tier listing." },
  { id: "u17", brandType: "upcoming", brand: "Verde Home", name: "Plant-Based Dish Liquid 750ml", category: "Home & Cleaning", unit: "bottle", price: 175, moq: 20, desc: "Biodegradable dish liquid, new sustainable-cleaning brand." },
  { id: "u18", brandType: "upcoming", brand: "EcoClean", name: "Enzyme Floor Cleaner 1L", category: "Home & Cleaning", unit: "bottle", price: 195, moq: 18, desc: "Enzyme-based floor cleaner, discovery listing for eco-conscious retailers." },
  { id: "u19", brandType: "upcoming", brand: "Verde Home", name: "Compostable Trash Bags (30ct)", category: "Home & Cleaning", unit: "pack", price: 210, moq: 20, desc: "Compostable bin liners, new-entrant household SKU." },
  { id: "u20", brandType: "upcoming", brand: "EcoClean", name: "Laundry Detergent Sheets (60ct)", category: "Home & Cleaning", unit: "pack", price: 380, moq: 15, desc: "Plastic-free detergent sheets, discovery-tier laundry SKU." },
];

export function formatINR(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function getTierForPct(pct) {
  for (const t of TIERS) if (pct < t.max) return t;
  return TIERS[TIERS.length - 1];
}

// Amount of `product` (at its per-unit price) that must be added to push
// upcoming-value share of cart up to `targetPct` (0-1 fraction).
export function amountToReachPct(upcomingValue, totalValue, targetPct) {
  const denom = 1 - targetPct;
  if (denom <= 0) return Infinity;
  const x = (targetPct * totalValue - upcomingValue) / denom;
  return x;
}

export function nextTierInfo(upcomingValue, totalValue) {
  const pct = totalValue > 0 ? (upcomingValue / totalValue) * 100 : 0;
  const idx = TIERS.findIndex((t) => pct < t.max);
  if (idx === -1 || idx === TIERS.length - 1) return null; // already at max tier
  const nextTier = TIERS[idx + 1] || null;
  const currentCeiling = TIERS[idx].max;
  if (!nextTier) return null;
  const amount = amountToReachPct(upcomingValue, totalValue, currentCeiling / 100);
  return { thresholdPct: currentCeiling, nextDiscountPct: nextTier.pct, amountNeeded: Math.max(0, amount) };
}

export function maxSetsFor(p) {
  if (p.price < 100) return 15;
  if (p.price < 300) return 10;
  if (p.price < 700) return 8;
  return 6;
}

export function badgeInfo(brandType) {
  return brandType === "established"
    ? { bg: "#e3f1ee", color: "#0d3f3a", label: "Established" }
    : { bg: "#fbe7d3", color: "#8a4a10", label: "Upcoming Brand" };
}

export function stripeColors(brandType) {
  return brandType === "established"
    ? { a: "#eef6f4", b: "#e3f1ee" }
    : { a: "#fdf1e4", b: "#fbe7d3" };
}
