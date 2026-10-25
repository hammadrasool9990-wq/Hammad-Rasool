import { Product } from '../types';

import ridgedLoaferImg from '../assets/images/product_ridged_loafer_1792431608407.jpg';
import oxfordImg from '../assets/images/product_heritage_oxford_1792431608378.jpg';
import sneakerImg from '../assets/images/product_everyday_sneaker_1792431609217.jpg';
import suedeLoaferImg from '../assets/images/product_suede_loafer_1792431609758.jpg';
import heroModelImg from '../assets/images/hero_brand_editorial_1792431607134.jpg';

export { heroModelImg };

export const products: Product[] = [
  {
    id: 'hr-001',
    slug: 'lug-sole-penny-loafer-dark-charcoal',
    name: 'Lug Sole Penny Loafer',
    category: 'Loafers',
    price: 12850,
    originalPrice: 14500, // Verified promotional release
    images: [ridgedLoaferImg],
    availableSizes: ['40', '41', '42', '43', '44', '45'],
    availableColors: ['Dark Charcoal Brown', 'Classic Black'],
    featured: true,
    tag: 'Signature Style',
    description: "A contemporary reinterpretation of the quintessential penny loafer. Crafted from textured full-grain leather and set upon an ivory-cream ridged lug sole engineered for all-day comfort and traction across urban Pakistani terrain.",
    specifications: [
      { label: 'Upper', value: 'Full-grain textured calf leather' },
      { label: 'Outsole', value: 'Lightweight ridged EVA lug sole' },
      { label: 'Insole', value: 'Padded leather-lined anatomical footbed' },
      { label: 'Lining', value: 'Supple sheepskin interior' },
      { label: 'Origin', value: 'Handcrafted in Pakistan' },
      { label: 'Fit Advice', value: 'True to standard European footwear sizing' }
    ],
    details: [
      'Contrasting light-cream ridged sole for modern urban aesthetic',
      'Padded collar to prevent heel slippage',
      'Hand-stitched apron apron front',
      'Designed for smart-casual wear, denim, and semi-formal trousers'
    ]
  },
  {
    id: 'hr-002',
    slug: 'burnished-wholecut-oxford-deep-brown',
    name: 'Burnished Wholecut Oxford',
    category: 'Formal Shoes',
    price: 15500,
    images: [oxfordImg],
    availableSizes: ['40', '41', '42', '43', '44'],
    availableColors: ['Deep Brown', 'Espresso Patina'],
    featured: true,
    tag: 'Formal Essential',
    description: 'Precision-cut from a single flawless section of premium calfskin, hand-burnished to achieve deep color gradations. Built with clean minimalist lines for formal weddings, corporate meetings, and upscale gatherings.',
    specifications: [
      { label: 'Upper', value: 'Hand-burnished full-grain box calfskin' },
      { label: 'Outsole', value: 'Vegetable-tanned leather sole with rubber heel insert' },
      { label: 'Construction', value: 'Blake stitched sole construction' },
      { label: 'Closure', value: 'Five-eyelet closed lacing' },
      { label: 'Origin', value: 'Handcrafted in Pakistan' },
      { label: 'Fit Advice', value: 'Snug formal fit; size up if in-between sizes' }
    ],
    details: [
      'Seamless wholecut silhouette without side seams',
      'High-gloss toe burnishing done by hand',
      'Full leather lining for natural moisture absorption',
      'Pairs seamlessly with tailored suits and formal evening wear'
    ]
  },
  {
    id: 'hr-003',
    slug: 'braided-suede-tassel-loafer',
    name: 'Braided Suede Tassel Loafer',
    category: 'Loafers',
    price: 13200,
    images: [suedeLoaferImg],
    availableSizes: ['40', '41', '42', '43', '44', '45'],
    availableColors: ['Espresso Suede', 'Warm Mocha'],
    featured: true,
    tag: 'Casual Elegance',
    description: 'Velvety water-resistant suede accented with hand-braided trim along the collar and classic double tassels. An effortless staple that bridges traditional cultural occasions and modern cosmopolitan style.',
    specifications: [
      { label: 'Upper', value: 'Premium treated split suede leather' },
      { label: 'Outsole', value: 'Stacked leather heel with protective rubber tread' },
      { label: 'Insole', value: 'Cushioned leather insole with arch support' },
      { label: 'Trim', value: 'Hand-woven leather braid' },
      { label: 'Origin', value: 'Handcrafted in Pakistan' },
      { label: 'Fit Advice', value: 'Relaxed slip-on fit; accommodates broader feet' }
    ],
    details: [
      'Hand-woven braided collar detail',
      'Flexible forefoot for natural stride flex',
      'Soft unlined interior zones for breathability in warm climates',
      'Ideal with raw selvedge denim, linen trousers, or festive kurtas'
    ]
  },
  {
    id: 'hr-004',
    slug: 'minimalist-leather-everyday-sneaker',
    name: 'Everyday Leather Low-Top',
    category: 'Everyday Styles',
    price: 10950,
    images: [sneakerImg],
    availableSizes: ['41', '42', '43', '44', '45'],
    availableColors: ['Rich Brown', 'Tan Chestnut'],
    featured: true,
    tag: 'Daily Staple',
    description: 'A versatile low-profile sneaker crafted in rich textured brown leather with an off-white cupsole. Engineered to maintain a polished silhouette while providing sneaker-level all-day cushioning.',
    specifications: [
      { label: 'Upper', value: 'Supple milled natural grain leather' },
      { label: 'Outsole', value: 'Non-marking vulcanized rubber cupsole' },
      { label: 'Insole', value: 'Removable high-density memory foam footbed' },
      { label: 'Laces', value: 'Waxed tonal cotton flat laces' },
      { label: 'Origin', value: 'Handcrafted in Pakistan' },
      { label: 'Fit Advice', value: 'Standard sneaker fit; order your usual size' }
    ],
    details: [
      'Reinforced heel counter for structural longevity',
      'Breathable leather tongue and inner lining',
      'Neutral off-white sole for understated styling',
      'Versatile aesthetic for office smart-casual or weekend travel'
    ]
  },
  {
    id: 'hr-005',
    slug: 'urban-cupsole-sneaker-tan',
    name: 'Urban Heritage Cupsole',
    category: 'Everyday Styles',
    price: 11400,
    images: [sneakerImg],
    availableSizes: ['40', '41', '42', '43', '44'],
    availableColors: ['Tan Chestnut', 'Warm Brown'],
    featured: false,
    tag: 'Comfort Focus',
    description: 'Designed for commuting and city walking across Karachi and Lahore. Features reinforced heel support, supple drum-dyed leather, and a clean tonal eyelet row.',
    specifications: [
      { label: 'Upper', value: 'Drum-dyed bovine leather' },
      { label: 'Outsole', value: 'Flexible rubber compound cupsole' },
      { label: 'Insole', value: 'Orthopedic molded arch cushion' },
      { label: 'Origin', value: 'Handcrafted in Pakistan' },
      { label: 'Fit Advice', value: 'True to size' }
    ],
    details: [
      'Subtle stitched sidewalls',
      'Reinforced toe bumper',
      'Comfort-padded tongue and collar'
    ]
  },
  {
    id: 'hr-006',
    slug: 'executive-classic-derby',
    name: 'Executive Classic Derby',
    category: 'Formal Shoes',
    price: 14800,
    images: [oxfordImg],
    availableSizes: ['40', '41', '42', '43', '44', '45'],
    availableColors: ['Espresso', 'Deep Tan'],
    featured: false,
    tag: 'Workwear Classic',
    description: 'An open-lacing derby that accommodates higher insteps without sacrificing clean formal proportions. Built for long workdays and formal corporate settings.',
    specifications: [
      { label: 'Upper', value: 'Calfskin with polished protective finish' },
      { label: 'Outsole', value: 'Dual-density leather and rubber sole' },
      { label: 'Construction', value: 'Goodyear welted look with Blake stitch' },
      { label: 'Origin', value: 'Handcrafted in Pakistan' },
      { label: 'Fit Advice', value: 'Generous instep tolerance' }
    ],
    details: [
      'Open-laced quarters for easy adjustability',
      'Reinforced eyelet facings',
      'Breathable calf leather lining'
    ]
  },
  {
    id: 'hr-007',
    slug: 'structured-driving-moccasin',
    name: 'Structured Driving Moccasin',
    category: 'Casual Shoes',
    price: 9800,
    images: [suedeLoaferImg],
    availableSizes: ['41', '42', '43', '44', '45'],
    availableColors: ['Espresso Suede', 'Earth Brown'],
    featured: false,
    tag: 'Lightweight Travel',
    description: 'Ultra-flexible casual driving moccasin with rubber traction pods extending up the heel. Unlined softness ensures instant comfort without break-in time.',
    specifications: [
      { label: 'Upper', value: 'Soft split suede' },
      { label: 'Outsole', value: 'Segmented rubber driver grip pods' },
      { label: 'Insole', value: 'Full-length cushioned footbed' },
      { label: 'Origin', value: 'Handcrafted in Pakistan' },
      { label: 'Fit Advice', value: 'Supple fit; adapts to foot shape within 2-3 wears' }
    ],
    details: [
      'Protective heel driving wrap',
      'Hand-tied lace detail',
      'Featherweight construction for warm weather'
    ]
  },
  {
    id: 'hr-008',
    slug: 'textured-penny-loafer-ebony',
    name: 'Textured Lug Loafer in Ebony',
    category: 'Loafers',
    price: 12850,
    images: [ridgedLoaferImg],
    availableSizes: ['40', '41', '42', '43', '44'],
    availableColors: ['Classic Black', 'Dark Charcoal Brown'],
    featured: false,
    tag: 'Modern Classic',
    description: 'The darker variation of our signature lug-sole loafer. Pairs deep charcoal tones with an off-white sole for striking visual contrast and versatile styling.',
    specifications: [
      { label: 'Upper', value: 'Full-grain textured leather' },
      { label: 'Outsole', value: 'Ridged EVA lug sole' },
      { label: 'Insole', value: 'Anatomical leather footbed' },
      { label: 'Origin', value: 'Handcrafted in Pakistan' },
      { label: 'Fit Advice', value: 'True to size' }
    ],
    details: [
      'Textured pebble grain finish resists scuffs',
      'Stitch-reinforced welt',
      'Effortless slip-on entry'
    ]
  }
];

export const productCategories: { name: Product['category']; description: string }[] = [
  { name: 'Loafers', description: 'Contemporary lug-sole and classic tassel slip-ons.' },
  { name: 'Formal Shoes', description: 'Wholecut oxfords and derbies for formal occasions.' },
  { name: 'Everyday Styles', description: 'Minimalist leather sneakers built for daily motion.' },
  { name: 'Casual Shoes', description: 'Flexible moccasins and unstructured suede footwear.' }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function getRelatedProducts(currentProductId: string, category: Product['category']): Product[] {
  return products
    .filter(p => p.id !== currentProductId && p.category === category)
    .slice(0, 3);
}

export function formatPricePKR(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}
