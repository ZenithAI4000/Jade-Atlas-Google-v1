export enum Currency {
  USD = 'USD', // United States
  EUR = 'EUR', // Eurozone
  GBP = 'GBP', // United Kingdom
  AUD = 'AUD', // Australia
  CAD = 'CAD', // Canada
  SGD = 'SGD', // Singapore
  HKD = 'HKD', // Hong Kong
  JPY = 'JPY', // Japan
  CNY = 'CNY', // China
  NZD = 'NZD', // New Zealand
  CHF = 'CHF', // Switzerland
  AED = 'AED', // UAE
  SEK = 'SEK', // Sweden
  MYR = 'MYR', // Malaysia
  KRW = 'KRW', // South Korea
  TWD = 'TWD', // Taiwan
  THB = 'THB', // Thailand
  INR = 'INR', // India
  IDR = 'IDR', // Indonesia
  VND = 'VND', // Vietnam
  BRL = 'BRL', // Brazil
  MXN = 'MXN', // Mexico
  ZAR = 'ZAR'  // South Africa
}

export interface PricePoint {
  [Currency.USD]: number;
  [Currency.EUR]: number;
  [Currency.GBP]: number;
  [Currency.AUD]: number;
  [Currency.CAD]: number;
  [Currency.SGD]: number;
  [Currency.HKD]: number;
  [Currency.JPY]: number;
  [Currency.CNY]: number;
  [Currency.NZD]: number;
  [Currency.CHF]: number;
  [Currency.AED]: number;
  [Currency.SEK]: number;
  [Currency.MYR]: number;
  [Currency.KRW]: number;
  [Currency.TWD]: number;
  [Currency.THB]: number;
  [Currency.INR]: number;
  [Currency.IDR]: number;
  [Currency.VND]: number;
  [Currency.BRL]: number;
  [Currency.MXN]: number;
  [Currency.ZAR]: number;
}

// These interfaces ensure the rest of your app doesn't break
export interface DayPlan {
  day: number;
  title: string;
  description: string;
}

export interface Journey {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  duration: string;
  basePrice: PricePoint;
  image: string;
  status: 'available' | 'coming_soon';
  launchDate?: string;
  itinerary?: DayPlan[];
  highlights?: string[];
  inclusions?: string[];
  singleSupplement?: boolean; 
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date?: string;
  excerpt: string;
  content: string;
  image: string;
}

export interface Testimonial {
  text: string;
  author: string;
  location?: string;
}

export interface Country {
  name: string;
  code: string;
  dial: string;
  flag: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  category: string;
  items: FaqItem[];
}

export interface UserBooking {
  id: string;
  journeyTitle: string;
  date: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  image: string;
}