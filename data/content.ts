
import { Article, Journey, FaqCategory } from '../types';

// --- IMAGES ---
export const IMG_HERO = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2676&auto=format&fit=crop"; 
export const IMG_CHONGQING_HERO = "https://images.unsplash.com/photo-1542114759-cd974465bf95?q=80&w=2564&auto=format&fit=crop"; 
export const IMG_YUNNAN = "https://images.unsplash.com/photo-1469793910609-0d85ec50e21a?q=80&w=2670&auto=format&fit=crop"; 
export const IMG_SILKROAD = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop"; 
export const IMG_TEMPLE = "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=2670&auto=format&fit=crop"; 
export const IMG_TEA = "https://images.unsplash.com/photo-1563911892437-1feda9d58341?q=80&w=2600&auto=format&fit=crop"; 

// --- COUNTRY DATA ---
export const COUNTRY_DATA = [
  { name: "United States", code: "US", dial: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dial: "+44", flag: "🇬🇧" },
  { name: "China", code: "CN", dial: "+86", flag: "🇨🇳" },
  { name: "Australia", code: "AU", dial: "+61", flag: "🇦🇺" },
  { name: "Canada", code: "CA", dial: "+1", flag: "🇨🇦" },
  { name: "France", code: "FR", dial: "+33", flag: "🇫🇷" },
  { name: "Germany", code: "DE", dial: "+49", flag: "🇩🇪" },
  { name: "Hong Kong", code: "HK", dial: "+852", flag: "🇭🇰" },
  { name: "Singapore", code: "SG", dial: "+65", flag: "🇸🇬" },
  { name: "Japan", code: "JP", dial: "+81", flag: "🇯🇵" },
  { name: "New Zealand", code: "NZ", dial: "+64", flag: "🇳🇿" },
  { name: "Switzerland", code: "CH", dial: "+41", flag: "🇨🇭" },
  { name: "United Arab Emirates", code: "AE", dial: "+971", flag: "🇦🇪" },
  { name: "Italy", code: "IT", dial: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "ES", dial: "+34", flag: "🇪🇸" },
  { name: "Netherlands", code: "NL", dial: "+31", flag: "🇳🇱" },
  { name: "Sweden", code: "SE", dial: "+46", flag: "🇸🇪" },
  { name: "Malaysia", code: "MY", dial: "+60", flag: "🇲🇾" },
  { name: "South Korea", code: "KR", dial: "+82", flag: "🇰🇷" },
  { name: "Taiwan", code: "TW", dial: "+886", flag: "🇹🇼" },
  { name: "Thailand", code: "TH", dial: "+66", flag: "🇹🇭" },
  { name: "India", code: "IN", dial: "+91", flag: "🇮🇳" },
  { name: "Indonesia", code: "ID", dial: "+62", flag: "🇮🇩" },
  { name: "Vietnam", code: "VN", dial: "+84", flag: "🇻🇳" },
  { name: "Brazil", code: "BR", dial: "+55", flag: "🇧🇷" },
  { name: "Mexico", code: "MX", dial: "+52", flag: "🇲🇽" },
  { name: "South Africa", code: "ZA", dial: "+27", flag: "🇿🇦" }
];

export const CHONGQING_JOURNEY: Journey = {
  id: 'chongqing-cyberpunk',
  slug: 'chongqing',
  title: 'Chongqing: The Mountain City',
  shortDescription: 'A cinematic immersion into the fog, the rivers, and the vertical architecture of China’s most dramatic metropolis.',
  longDescription: `Chongqing is not merely a city. It is a vertical labyrinth carved by the Yangtze and Jialing rivers, a place where the laws of urban planning seem to bend to the will of the mountains. Our journey navigates the misty thresholds between ancient Ba culture and future forward urbanism. 

We invite you to witness a landscape where light rails vanish into apartment blocks and hotpot steam rises like dragon breath against neon skylines. This is a study in contrasts, designed for the traveler who seeks atmospheric depth over superficial sightseeing. We peel back the chaotic layers to reveal a city of profound resilience and poetry.`,
  duration: '8 Days / 7 Nights',
  basePrice: { USD: 8500, EUR: 7800, CNY: 60000 },
  image: IMG_CHONGQING_HERO,
  status: 'available',
  inclusions: [
    "Luxury accommodation in river view suites",
    "Private chauffeur and logistics vehicle",
    "Expert historian and culinary guides",
    "All internal transfers and high speed rail",
    "Daily breakfast and curated dining experiences"
  ],
  itinerary: [
    { 
      day: 1, 
      title: 'Arrival in the Fog', 
      description: 'Your private transfer whisks you from Jiangbei International Airport to a sanctuary high above the Yuzhong Peninsula. The city reveals itself slowly through the mist. Settle into your river view suite before an intimate welcome dinner featuring mild local delicacies, introducing your palate gently to the region’s famous heat without overwhelming the senses.' 
    },
    { 
      day: 2, 
      title: 'The Vertical Labyrinth', 
      description: 'We begin with a private architectural walking tour of the peninsula’s hidden stairways and skybridges. We witness the surreal Liziba station where trains pass through residential buildings, a testament to engineering necessity. The afternoon is spent in a private tea ceremony in an exquisitely restored Republic era villa, finding silence amidst the vertical density.' 
    },
    { 
      day: 3, 
      title: 'River Ancients', 
      description: 'Board a private charter to sail the confluence of the Yangtze and Jialing. The perspective from the water reveals the sheer scale of the cliffside foundations. We dock at Ciqikou for an after hours access tour, avoiding the daytime crowds to walk the cobblestones in silence, accompanied by a master historian who brings the port’s trading past to life.' 
    },
    { 
      day: 4, 
      title: 'Dazu Rock Carvings', 
      description: 'A luxury transfer takes us to the UNESCO World Heritage site of Dazu. Unlike standard tours that rush the main sites, we access the restricted preservation areas (subject to permit) to view the thousands of rock carvings dating back to the 7th century. We contemplate the fusion of Buddhist, Taoist, and Confucian thought in quiet isolation.' 
    },
    { 
      day: 5, 
      title: 'Wulong Karst Geology', 
      description: 'We venture into the Wulong Karst National Geology Park. Experience the Three Natural Bridges with a private geologist guide. The scale of nature here dwarfs humanity, offering a profound sense of perspective and calm. We dine in a converted farmhouse, tasting ingredients grown in the mineral rich valley soil.' 
    },
    { 
      day: 6, 
      title: 'The Taste of Fire', 
      description: 'A masterclass in Sichuanese cuisine that goes beyond the chili. We visit a local spice market with a Michelin starred chef, selecting the finest peppercorns and star anise. We return to a private kitchen to learn the delicate art of balancing numbing heat with fragrance, understanding that Sichuan food is a symphony, not a singular note.' 
    },
    { 
      day: 7, 
      title: 'Modern Zen', 
      description: 'A free morning is provided for spa treatments or rest, honoring the need for white space in a journey. In the afternoon, we visit the futuristic Raffles City complex for a private viewing at the exploration deck. We conclude with a farewell banquet overlooking the glittering night skyline, reflecting on the layers of history we have traversed.' 
    },
    { 
      day: 8, 
      title: 'Departure', 
      description: 'After a leisurely breakfast, your private chauffeur ensures a seamless transfer to the airport or high speed rail station. You depart not just with photos, but with a nuanced understanding of one of the world’s most complex cities.' 
    }
  ]
};

export const COLLECTIONS: Journey[] = [
  CHONGQING_JOURNEY,
  {
    id: 'yunnan-mists',
    slug: 'yunnan',
    title: 'Yunnan: South of the Clouds',
    shortDescription: 'Traverse the ancient Tea Horse Road through mist-shrouded valleys and diverse ethnic hamlets.',
    longDescription: 'From the snow-capped peaks of Shangri-La to the tropical lushness of Xishuangbanna, Yunnan is a continent within a province. Our journey focuses on the preservation of heritage, visiting tea forests that have stood for centuries and weaving villages that maintain traditions older than empires.',
    duration: '10 Days / 9 Nights',
    basePrice: { USD: 9200, EUR: 8500, CNY: 65000 },
    image: IMG_YUNNAN,
    status: 'coming_soon',
    launchDate: 'Late 2025'
  },
  {
    id: 'silk-road-echoes',
    slug: 'silk-road',
    title: 'Dunhuang: Echoes of the Silk Road',
    shortDescription: 'A desert odyssey exploring the Mogao Caves and the singing sands of the Gobi.',
    longDescription: 'Silence is the ultimate luxury. In the Gobi desert, we find a profound stillness. This journey centers on Dunhuang, the gateway to the Silk Road, offering private access to the Mogao Caves and luxury camping amidst the singing sand dunes.',
    duration: '7 Days / 6 Nights',
    basePrice: { USD: 7800, EUR: 7200, CNY: 55000 },
    image: IMG_SILKROAD,
    status: 'coming_soon',
    launchDate: 'Spring 2026'
  }
];

export const JOURNAL_ARTICLES: Article[] = [
  {
    slug: 'articleone',
    title: 'The Art of Slow Travel in a Fast Nation',
    category: 'Philosophy',
    readTime: '5 min read',
    excerpt: 'In a country known for high speed rail and rapid development, finding stillness is the ultimate luxury. We explore how to pace a journey through China.',
    image: IMG_TEMPLE,
    content: `
      <p>China moves at a velocity that can feel overwhelming. The high speed trains slice through provinces in hours. Skyscrapers rise in months. Yet, the true luxury of travel here lies not in speed, but in slowness.</p>
      <p>At Jade Atlas Journeys, we curate moments of pause. It is the lingering tea ceremony in Hangzhou while rain falls on the West Lake. It is the slow boat through the Qutang Gorge. We believe that to understand the modern dragon, one must sit still enough to watch it breathe.</p>
      <p>Our itineraries are built with "white space". This is unstructured time designed for reflection. This is where the memory solidifies. Not in the rush from monument to monument, but in the quiet hour spent watching an artisan paint a fan, or the silence of a temple courtyard at dawn.</p>
      <p>When we rush, we consume destinations. When we slow down, we allow them to change us. This is the philosophy that guides every transfer, every booking, and every meal in our collections.</p>
    `
  },
  {
    slug: 'articletwo',
    title: 'Imperial Green: The History of Jade',
    category: 'Culture',
    readTime: '4 min read',
    excerpt: 'More valuable than gold, jade represents the soul of Chinese aesthetics. Understanding its grades and significance transforms how one sees the culture.',
    image: IMG_CHONGQING_HERO, 
    content: `
      <p>Gold has a price, but jade is priceless. This ancient proverb underscores the reverence China holds for the stone of heaven. It is not merely a mineral. It is a moral compass. Confucius compared the virtues of a gentleman to the qualities of jade. Hard yet smooth. Translucent yet dense.</p>
      <p>In our visual identity, we draw from Imperial Jade. This deep, translucent emerald hue was once reserved for the Emperor alone. It represents power, but also benevolence. It is cool to the touch, calming to the spirit.</p>
      <p>When you travel with us, we offer exclusive access to private jade collections in Shanghai and Beijing, allowing you to hold history in your hand. You learn to distinguish the 'A grade' untreated stone from the chemical imitations, a metaphor for seeking the authentic experience in all things.</p>
    `
  },
  {
    slug: 'articlethree',
    title: 'Beyond the Spicy: Complexity in Sichuan Cuisine',
    category: 'Gastronomy',
    readTime: '6 min read',
    excerpt: 'Chongqing and Chengdu are famous for heat, but the true mark of the cuisine is the complex layering of twenty four distinct flavor profiles.',
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2729&auto=format&fit=crop", 
    content: `
      <p>The misconception is that Sichuan food is simply hot. The reality is a symphony. "Ma La" (numbing and spicy) is but one note. There is "Yu Xiang" (fish fragrance), "Guai Wei" (strange flavor), and "Tang Cu" (sweet and sour).</p>
      <p>On our Chongqing collection, we peel back the red layer of chili oil to reveal the delicate broth work and precise knife skills that define high-end Sichuanese banquet cooking. It is a culinary journey that challenges and delights the sophisticated palate.</p>
      <p>We dine not just in restaurants, but in private homes and hidden courtyards, where the recipes have been guarded for generations. We learn that heat is not a weapon, but a vehicle for flavor, opening the senses to the subtle notes of ginger, star anise, and cassia bark.</p>
    `
  },
  {
    slug: 'articlefour',
    title: 'Architecture of the Vertical City',
    category: 'Design',
    readTime: '3 min read',
    excerpt: 'How Chongqing defies gravity and urban planning norms to create a cyberpunk reality that exists nowhere else on earth.',
    image: IMG_CHONGQING_HERO,
    content: `
      <p>Topography is destiny. In Chongqing, the mountains prevented traditional grid expansion, forcing the city upwards. The result is a multi-dimensional urban fabric where the ground floor of one building is the twenty-second floor of another.</p>
      <p>We guide you through this architectural marvel, exploring how ancient stilt houses have evolved into the complex mega-structures of today. It is a visual feast for the design-minded traveler.</p>
      <p>Bridges here do not just cross water; they cross the sky. Trains pass through apartments. Elevators are public transport. It is a city that feels like a dreamscape, a vision of a future where humanity clings to the cliffs and reaches for the clouds.</p>
    `
  },
  {
    slug: 'articlefive',
    title: 'Silence in the Gobi',
    category: 'Destinations',
    readTime: '5 min read',
    excerpt: 'The profound solitude of the Silk Road and the luxury of isolation in the dunes of Dunhuang.',
    image: IMG_SILKROAD,
    content: `
      <p>There is a silence in the desert that cleanses the spirit. Dunhuang, the gateway to the Silk Road, offers a landscape of stark beauty. Here, luxury is not just thread count, but the exclusivity of space.</p>
      <p>Imagine a private dinner set amidst the singing sands, with only the stars for illumination. This is the echo of the Silk Road, brought to life with modern comfort and ancient reverence.</p>
      <p>We visit the Crescent Moon Lake at dawn, before the tourists arrive. We stand in the Mogao Caves with a flashlight and a scholar, reading the stories painted on the walls a thousand years ago. In the vastness of the Gobi, we find our own center.</p>
    `
  },
  {
    slug: 'articlesix',
    title: 'Packing for the Seasons',
    category: 'Travel Notes',
    readTime: '4 min read',
    excerpt: 'A curated guide on layering for the diverse climates of the Middle Kingdom, from the humid south to the arid north.',
    image: "https://images.unsplash.com/photo-1520939817895-060bdaf4dec1?q=80&w=2574&auto=format&fit=crop",
    content: `
      <p>China is a continent disguised as a country. Packing for a journey that spans the humid sub-tropics of the south and the arid plains of the north requires strategy, not just a suitcase. We advocate for the philosophy of layers—elegant, breathable fabrics that adapt to the changing environments.</p>
      <p>For Spring in the Yangtze Delta, think light wool and waterproof shells. For Autumn in Beijing, crisp linens paired with cashmere for the evening chill. We provide every guest with a bespoke packing dossier tailored to their specific itinerary and the season of travel.</p>
      <p>Travel light. Leave room for the unexpected. The most valuable thing you bring back will not be what you packed, but what you experienced.</p>
    `
  }
];

export const TESTIMONIALS = [
  {
    text: "I have traveled with the world's finest agencies, but Jade Atlas Journeys operates on a different frequency. The calm, the precision, and the access were simply unparalleled.",
    author: "Eleanor V., London"
  },
  {
    text: "Chongqing was a revelation. I expected chaos, but found a curated narrative of light and stone. The private access to the rock carvings was a highlight of my life.",
    author: "James C., New York"
  }
];

export const FAQ_DATA: FaqCategory[] = [
  {
    category: "The Experience",
    items: [
      {
        q: "What’s the maximum group size?",
        a: "We aim for a minimum of 4 and a maximum of 10 travelers per group. This ensures a relaxed pace, personalized attention, and a more enjoyable small-group experience."
      },
      {
        q: "What languages do your guides speak?",
        a: "Our tours include a dedicated English-speaking tour escort who accompanies you throughout the journey, assisting with transfers, check-ins, tickets, and daily coordination. At certain scenic or cultural sites, government-licensed local guides may join the group to provide detailed explanations and insights about each location. All guides are fluent, experienced communicators who regularly work with international travelers and ensure smooth, engaging experiences in English. Specialized local guides are optional and can be arranged upon request for an additional fee, for travelers who would like a more in-depth understanding of the scenic spot."
      },
      {
        q: "How physically demanding are your tours?",
        a: "Our tours involve moderate walking, including stairs, uneven surfaces, and some inclines. Travelers should be reasonably fit and able to walk short distances without difficulty. Please notify us before booking if you have mobility concerns so we can advise on accessibility or arrange private transport where possible."
      },
      {
        q: "What type of accommodation is provided?",
        a: "You’ll stay in premium international hotels or 5-star Chinese hotels, depending on availability in each destination. All properties are selected for their comfort, service quality, and location."
      },
      {
        q: "Are children allowed on the tours?",
        a: "Our group tours are designed for adult travelers (18+). Families with younger travelers can contact us to discuss private or customized itineraries."
      },
      {
        q: "Do you offer private or custom tours?",
        a: "Yes. We offer fully private tours for couples, families, and small groups seeking a personalized experience. Please contact us for a custom quote."
      }
    ]
  },
  {
    category: "Logistics",
    items: [
      {
        q: "Do I need to book my own international flights?",
        a: "Yes. You will need to book your own international flights to and from China. Your tour officially begins once you arrive in the starting city, where our team will meet you."
      },
      {
        q: "What’s included in the tour price?",
        a: "Your tour price includes accommodation, daily breakfasts, selected lunches and dinners, all ground transportation within the itinerary, entry tickets to listed attractions, and an English-speaking tour escort. Exclusions include international flights, visa fees, optional activities, and personal expenses."
      },
      {
        q: "Are airport transfers included?",
        a: "Yes. Private airport pickup and drop-off are included at the start and end of your tour. If you arrive earlier or depart later than the scheduled tour dates, transfers can be arranged for an additional fee."
      },
      {
        q: "Can I extend or customize my trip?",
        a: "Yes. We can arrange extensions or add-ons at an additional cost. Please let us know in advance, and our team will help plan your custom options after the standard tour concludes."
      },
      {
        q: "What if my flight is delayed or canceled?",
        a: "If your international flight is delayed or canceled, please contact us immediately. Our local team will adjust your airport pickup and itinerary wherever feasible, though missed activities may not be refundable due to third-party bookings."
      }
    ]
  },
  {
    category: "Essentials",
    items: [
      {
        q: "Do I need a visa to visit China?",
        a: "Visa requirements depend on your nationality and the purpose of travel. As of mid-2025, many countries in Europe, Oceania, and Asia are eligible for 30-day visa-free entry. Additionally, 144-hour visa-free transit is available for citizens of 55 countries at designated ports including Shanghai and Beijing. ⚠️ We do not provide visa guidance or processing assistance. Travelers must check the latest entry requirements directly with their nearest Chinese embassy or consulate before travel."
      },
      {
        q: "What’s included in the meals?",
        a: "All breakfasts are included in your tour, along with selected lunches and dinners. Please let us know in advance if you have any allergies or dietary requirements, and we’ll do our best to cater for you based on local availability."
      },
      {
        q: "When’s the best time to visit China?",
        a: "China is beautiful year-round. The most comfortable months are March – May (spring) and September – November (autumn). Avoid major holidays such as Chinese New Year and Golden Week (early October) if you prefer smaller crowds."
      },
      {
        q: "What should I pack?",
        a: "We provide a packing guide based on your travel season. In general, bring comfortable walking shoes, light layers, a rain jacket, and modest clothing suitable for temples and cultural sites."
      }
    ]
  },
  {
    category: "Policies",
    items: [
      {
        q: "What’s your refund and cancellation policy?",
        a: "Full payment is required at the time of booking. Refund Schedule: 61+ days before departure: Full refund minus $99 fee. 31–60 days: 50% refund. Within 30 days: Non-refundable. Payment-processing fees are non-refundable."
      },
      {
        q: "What happens if the tour doesn’t reach the minimum number of travelers?",
        a: "Each tour requires a minimum of 4 travelers to operate. If the minimum number isn’t reached, you’ll be offered the choice of rescheduling to another departure date or receiving a full refund (excluding processing fees)."
      },
      {
        q: "Is travel insurance required?",
        a: "Travel insurance is not included in our tours and must be arranged independently by each traveler before departure. You are responsible for ensuring your chosen policy provides adequate coverage for medical emergencies, cancellations, delays, and other travel-related risks."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, and PayPal. All payments are processed securely through Stripe in your selected currency at checkout. Processing fees are included in the total price."
      },
      {
        q: "Are your tours suitable for solo travelers?",
        a: "Yes. Solo travelers are welcome. Pricing is based on double occupancy (two people per room). If you prefer not to share, a single-occupancy supplement applies. When possible, solo guests are paired only with another traveler of the same gender."
      },
      {
        q: "What currency are prices listed in?",
        a: "All prices are displayed in U.S. dollars for consistency, with automatic currency conversion available for international travelers. Payments are securely processed in your selected currency at checkout through Stripe."
      }
    ]
  }
];
