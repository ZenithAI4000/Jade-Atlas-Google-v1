import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useParams, Navigate, useLocation } from 'react-router-dom';
import { Layout, Button, PricingCard, CurrencyContext, TravelerCounter } from './components/Layout';
import { Concierge } from './components/Concierge';
import { Currency } from './types';
// NOTE: JOURNAL_ARTICLES removed from import because we define it locally below
import { CHONGQING_JOURNEY, COLLECTIONS, TESTIMONIALS, FAQ_DATA, COUNTRY_DATA, IMG_TEA, IMG_TEMPLE } from './data/content';
import { ChevronDown, Calendar, Users, MapPin, ArrowRight, CheckCircle, Shield, Clock, Heart, Search, X, Camera, Sun, FileText, MessageSquare, ChevronUp, Plus, Minus, Compass, Facebook, Link as LinkIcon, Star, Globe } from 'lucide-react';
import { AlertTriangle } from "lucide-react";


// --- CONSTANTS & DATA ---
const PREMIUM_CHECKBOX_CLASSES = "appearance-none w-4 h-4 border border-jade-300 rounded-sm bg-white checked:bg-jade-900 checked:border-jade-900 checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22white%22%3E%3Cpath%20d%3D%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%209.086l4.293-4.293a1%201%200%20011.414%200z%22%2F%3E%3C%2Fsvg%3E')] checked:bg-center checked:bg-no-repeat hover:bg-jade-50 transition-all cursor-pointer mt-0.5 shrink-0 focus:outline-none focus:ring-1 focus:ring-jade-500";

// --- RICH JOURNAL DATA (7 Articles: Destinations, Culture, Culinary, Travel Guidance) ---
const JOURNAL_ARTICLES = [
  // --- DESTINATIONS ---
  {
    slug: 'chongqing-travel-guide-first-time',
    title: 'Chongqing Travel Guide For First Time Visitors',
    category: 'Destinations',
    readTime: '6 Min Read',
    date: 'October 12, 2024',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80',
    excerpt: 'Planning your first trip to Chongqing? This calm, practical guide covers when to go, where to stay, and how to enjoy the city without feeling overwhelmed.',
    content: `
      <h2>Introduction</h2>
      <p>If you have ever seen a photograph of a city suspended in mist with neon trains sliding through towers above a dark river, there is a good chance you were looking at Chongqing. For many first time visitors to China, the city feels mysterious. It is not as famous as Beijing or Shanghai, yet it appears again and again in films, social media, and stories from friends who say the same thing.</p>
      <p>This Chongqing travel guide is written for travelers who want to understand the city before they arrive. You will learn when to go, where to stay, what to see, and how to navigate the city in a way that feels calm and intentional.</p>

      <h2>What you should know before visiting Chongqing</h2>
      <p>Chongqing is a mountain city built at the meeting point of the Yangtze and Jialing rivers. Streets climb and fall. Buildings appear to sit on top of each other. What looks like the tenth floor from one angle becomes the second floor from another. It is intense, alive, and surprisingly welcoming.</p>

      <h2>When to visit Chongqing and how long to stay</h2>
      <h3>Best seasons for comfort</h3>
      <p>Chongqing is famous for two things: Hotpot and humid heat. Summer can be heavy and hot, especially from June to August. Many visitors find spring and autumn more comfortable.</p>
      <ul>
        <li><strong>Spring (March to May):</strong> Feels fresh and mild.</li>
        <li><strong>Autumn (Late Sept to Nov):</strong> Brings clearer skies and cooler evenings.</li>
        <li><strong>Winter:</strong> Can be foggy and atmospheric, which suits some travelers who enjoy layers and moody river views.</li>
      </ul>

      <h2>A suggested three day Chongqing itinerary</h2>
      <h3>Day one: Arrival and first impressions</h3>
      <p>Arrive and settle into your hotel. Take a gentle walk around Jiefangbei to understand the city centre. Ride the Chongqing Cableway across the Yangtze at sunset or early evening. Enjoy dinner at a local restaurant or a mild hotpot if you are already curious.</p>

      <h3>Day two: Old streets and river nights</h3>
      <p>Morning visit to Ciqikou Ancient Town before the heavier crowds arrive. Taste local snacks such as cold noodles or grilled skewers. Walk down toward the river or explore smaller side alleys away from shops. Evening walk along Hongya Cave and the riverfront to see the lights.</p>

      <h3>Day three: Viewpoints and flavours</h3>
      <p>Explore a viewpoint that shows the mountain city layers, such as Eling Park. Walk through a residential neighbourhood to watch dancing or tai chi. Enjoy a focused hotpot meal with guidance on spice level.</p>

      <h2>Why Chongqing suits deep travel</h2>
      <p>Chongqing’s drama comes from contrast. Fog and neon. Elevated tracks and hidden alleys. For travelers who are curious and patient, it offers a chance to feel a side of China that is both modern and deeply local.</p>
    `
  },
  {
    slug: 'chongqing-first-china-itinerary',
    title: 'Why Chongqing Belongs On Your First China Itinerary',
    category: 'Destinations',
    readTime: '5 Min Read',
    date: 'October 05, 2024',
    image: 'https://images.unsplash.com/photo-1623136897258-29705dc78028?auto=format&fit=crop&q=80',
    excerpt: 'Wondering if Chongqing is worth adding to your first China itinerary? Discover how this mountain city of rivers, lights, and hotpot adds depth to a classic route.',
    content: `
      <h2>Introduction</h2>
      <p>When people plan a first trip to China, the same trio appears again and again: Beijing, Shanghai, Xi’an. These cities are iconic for good reason. Yet many travelers return home with a quiet feeling that they only touched the surface. Chongqing is the city that changes that story.</p>

      <h2>What Chongqing adds that other cities do not</h2>
      <p>Beijing gives you imperial history. Shanghai offers international glamour. Xi’an shows you ancient walls. Chongqing brings something different:</p>
      <ul>
        <li>A mountain city skyline rather than a coastal or northern plain.</li>
        <li>Layered streets that feel almost unreal until you walk them.</li>
        <li>A powerful food culture that centres on shared tables.</li>
        <li>Rivers that shape your sense of direction and frame the city at night.</li>
      </ul>

      <h2>Where Chongqing fits into a classic China route</h2>
      <p>One simple way to structure a first time route is to begin with Beijing for history, travel to Xi’an for the terracotta army, move to Chongqing for mountain city atmosphere, and close with either Chengdu or Shanghai.</p>
      <p>High speed trains and flights link Chongqing easily with Xi’an to the north and Chengdu to the west, making it a flexible pivot point rather than a difficult detour.</p>

      <h2>Is Chongqing too intense for a first trip?</h2>
      <p>Many travelers see photos and worry: Will it be too crowded, too confusing, too spicy? The reality is softer than it looks. Yes, it is busy, but you can choose quieter times. Yes, some dishes are spicy, but there are milder options. With the right support, Chongqing becomes exciting rather than stressful.</p>
    `
  },

  // --- CULTURE ---
  {
    slug: 'chinese-dining-etiquette-foreigners',
    title: 'Chinese Dining Etiquette For Foreigners',
    category: 'Culture',
    readTime: '7 Min Read',
    date: 'September 28, 2024',
    image: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&q=80',
    excerpt: 'Nervous about eating in China? This guide explains seating, shared dishes, toasting customs, and how to relax and enjoy the meal.',
    content: `
      <h2>Introduction</h2>
      <p>You have finally been invited to dinner in China. The table is round, the dishes are many, and someone is already rotating the lazy Susan. You want to be respectful, but you are not sure when to start eating. This guide is designed to remove the anxiety and leave you free to enjoy the food and company.</p>

      <h2>Seating and the shape of the table</h2>
      <p>Many meals in China take place at round tables. This shape symbolises equality and togetherness. The seat facing the door is often reserved for the main guest or senior person. If you are unsure, wait for a subtle gesture or invitation before sitting.</p>

      <h2>Shared dishes and chopstick etiquette</h2>
      <p>In many Chinese meals, dishes are placed in the centre and everyone shares. You usually take small portions at a time onto your own plate. It is polite to leave a little food rather than completely clearing a shared dish. If there are serving spoons, use them.</p>

      <h2>Toasting customs</h2>
      <p>Toasting is an important part of Chinese dining culture. The host will often make the first toast. When you clink glasses with someone older or more senior, it is polite to tilt your glass slightly lower than theirs as a sign of respect. A simple thank you is a perfect speech.</p>

      <h2>What if I do not drink alcohol?</h2>
      <p>If you prefer not to drink alcohol, you can still participate using tea, juice, or water. Let your host know quietly at the beginning. Most hosts will respect your choice once they understand you are still engaged.</p>
    `
  },
  {
    slug: 'everyday-life-chongqing',
    title: 'Experiencing Everyday Life In Chongqing Beyond The Sights',
    category: 'Culture',
    readTime: '5 Min Read',
    date: 'September 15, 2024',
    image: 'https://images.unsplash.com/photo-1526541603-6252994e6370?auto=format&fit=crop&q=80',
    excerpt: 'Look beyond famous viewpoints. This guide shows how to experience everyday life in Chongqing through parks, teahouses, and slow walks.',
    content: `
      <h2>Introduction</h2>
      <p>Photos of Chongqing often focus on its extremes: trains passing through towers, neon reflected on the river. But between the landmarks, a quieter Chongqing exists. It lives in parks at sunrise and teahouses in old neighbourhoods.</p>

      <h2>Morning in Chongqing</h2>
      <p>If you wake early and step outside, you will see a different side of the city. In local parks, people practice tai chi or dance. Along river paths, walkers move through the mist. You do not need to join in; simply observing with respect is enough.</p>

      <h2>Teahouses and the art of pausing</h2>
      <p>Chongqing has a long tradition of teahouses. People come to pause, talk, and watch the world move. Ordering tea and sitting for an hour offers a chance to process your impressions and watch card games from a distance. The point is to feel the texture of ordinary life.</p>

      <h2>How to participate without intruding</h2>
      <p>It is natural to want to record what you see, but maintain respect. Keep your camera at chest level. Ask with a gesture if you want to photograph someone closely. Sometimes the best memory is the one you keep only in your mind.</p>
    `
  },

  // --- CULINARY ---
  {
    slug: 'beginner-guide-chongqing-hotpot',
    title: 'Beginner Guide To Chongqing Hotpot',
    category: 'Culinary',
    readTime: '6 Min Read',
    date: 'August 22, 2024',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3a8c9?auto=format&fit=crop&q=80',
    excerpt: 'Curious about Chongqing hotpot but nervous about the spice? This beginner friendly guide explains how to order and enjoy it at your own pace.',
    content: `
      <h2>Introduction</h2>
      <p>For many travelers, the first real memory of Chongqing is a table. A pot divided into fiery red and gentle clear broth, steam rising with the scents of chili and peppercorn. Chongqing hotpot can look intimidating if you have never tried it, but it is a deeply welcoming experience.</p>

      <h2>What is Chongqing hotpot?</h2>
      <p>It is a style of communal dining where raw ingredients are cooked at the table in a simmering pot of broth. Unlike a fixed course meal, hotpot is interactive. You choose ingredients, cook them together, and build your own flavours.</p>

      <h2>How to order as a beginner</h2>
      <h3>Step one: Choose your broth</h3>
      <p>Full spicy red broth is for those who love heat. For first time visitors, a <strong>split pot</strong> (one spicy side, one mild mushroom side) is the most comfortable starting point.</p>

      <h3>Step two: Choose your ingredients</h3>
      <p>Common choices include thinly sliced beef, lotus root, leafy greens, mushrooms, and noodles. You do not need to order everything. A balanced mix of meat and vegetables is perfect.</p>

      <h3>Tips for handling spice</h3>
      <p>Start with the milder broth. Use your dipping sauce (usually sesame oil) to soften the heat. Keep a drink nearby, like tea or a cold soy milk, which helps balance the spice better than water.</p>
    `
  },

  // --- TRAVEL GUIDANCE ---
  {
    slug: 'first-time-china-expectations',
    title: 'First Time In China: What To Really Expect',
    category: 'Travel Guidance',
    readTime: '8 Min Read',
    date: 'August 10, 2024',
    image: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&q=80',
    excerpt: 'Visiting China for the first time? This calm guide explains what to expect with language, money, transport, and how to feel prepared.',
    content: `
      <h2>Introduction</h2>
      <p>Planning a first trip to China often comes with a mix of excitement and quiet worry. Will I be able to communicate? Is it safe? This guide is written to answer those questions in a straightforward way.</p>

      <h2>Is China safe and welcoming?</h2>
      <p>For most travelers, the answer is yes. Major Chinese cities are generally safe, with low rates of street crime. You may attract curiosity in some areas, but this is usually simple interest. A calm, respectful attitude goes a long way.</p>

      <h2>Language and communication</h2>
      <p>In large cities and hotels, you will find English speakers. In smaller shops or taxis, it will be rare. This is not a barrier if you prepare. Install a translation app, carry a card with your hotel address in Chinese, and learn a few simple phrases like hello (ni hao) and thank you (xie xie).</p>

      <h2>Money and payments</h2>
      <p>China is a digital payment society (WeChat Pay, Alipay). However, international bank cards are increasingly accepted in major hubs. For a first trip, bring a bank card, set up a travel payment app if possible, and carry some cash for small purchases.</p>

      <h2>Final thoughts</h2>
      <p>China will likely challenge some assumptions and confirm others. With preparation and an open mind, your first trip can be the beginning of a longer relationship with a country that is far more textured than any single story suggests.</p>
    `
  },
  {
    slug: 'best-time-visit-china-weather-crowds',
    title: 'Best Time To Visit China For Comfortable Weather',
    category: 'Travel Guidance',
    readTime: '5 Min Read',
    date: 'July 25, 2024',
    image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&q=80',
    excerpt: 'Wondering when to travel to China? This guide explains the best time to visit for comfortable weather and fewer crowds.',
    content: `
      <h2>Introduction</h2>
      <p>One of the first questions people ask is: When is the best time to go? The answer depends on what you want to feel. This guide focuses on a calm, practical goal: Comfortable weather and manageable visitor numbers.</p>

      <h2>Quick answer</h2>
      <p>For most travelers, the best windows are <strong>Spring (March to May)</strong> and <strong>Autumn (Late September to November)</strong>. These avoid the intense heat of summer and the coldest winter days.</p>

      <h2>Understanding the seasons</h2>
      <h3>Spring</h3>
      <p>Mild temperatures and blooming flowers. Good for city walks and river views, though rain is possible.</p>
      <h3>Autumn</h3>
      <p>Often considered the most beautiful time. Clearer skies, comfortable temperatures, and autumn colours. It is popular, so booking ahead is wise.</p>
      <h3>Winter</h3>
      <p>Varies by region. Cold in the north (Beijing), but milder in the south. Good for fewer crowds and moody, atmospheric photography.</p>

      <h2>Public Holidays to Note</h2>
      <p>Chinese New Year (Jan/Feb) and Golden Week (early Oct) see massive domestic travel. While travel is possible, it requires careful planning to navigate the crowds.</p>
    `
  }
];

// --- Helper Components ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// SECTION COMPONENT
const Section: React.FC<{ className?: string; children: React.ReactNode; bg?: 'white' | 'mist' | 'dark' }> = ({ className = '', children, bg = 'white' }) => {
  const backgrounds = {
    white: 'bg-white',
    mist: 'bg-mist-50',
    dark: 'bg-jade-950 text-mist-50'
  };
  return (
    <section className={`py-16 md:py-24 px-6 ${backgrounds[bg]} ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
};

// --- Custom Phone Input ---
const PhoneInput: React.FC<{
  value: string;
  countryCode: string;
  onValueChange: (val: string) => void;
  onCountryChange: (code: string) => void;
  required?: boolean;
}> = ({ value, countryCode, onValueChange, onCountryChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCountry = COUNTRY_DATA.find(c => c.dial === countryCode) || COUNTRY_DATA[0];
  const filteredCountries = COUNTRY_DATA.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.dial.includes(search)
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-[10px] uppercase tracking-widest font-bold text-gold-600 mb-2">
        Mobile Number {required && <span className="text-red-400">*</span>}
      </label>
      <div className="flex">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-white border border-jade-200 border-r-0 rounded-l-sm px-3 py-3 text-jade-900 hover:bg-mist-50 focus:outline-none min-w-[100px] transition-colors"
        >
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="text-sm font-medium">{selectedCountry.dial}</span>
          <ChevronDown className="w-3 h-3 text-jade-400 ml-auto" />
        </button>
        <input
          type="tel"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="Phone number"
          className="flex-grow bg-white border border-jade-200 rounded-r-sm p-3 text-jade-900 focus:outline-none focus:border-gold-500 transition-colors placeholder:text-jade-300"
          required={required}
        />
      </div>
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-[300px] bg-white border border-jade-100 shadow-xl z-50 max-h-60 overflow-hidden flex flex-col rounded-sm animate-fade-in text-left">
          <div className="p-2 border-b border-jade-50 bg-mist-50 relative">
            <Search className="w-3 h-3 text-jade-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs p-2 pl-8 border border-jade-200 !bg-white !text-jade-900 rounded-sm focus:outline-none focus:border-gold-500"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto flex-grow bg-white">
            {filteredCountries.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  onCountryChange(c.dial);
                  setIsOpen(false);
                  setSearch('');
                }}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-mist-50 text-left transition-colors border-b border-jade-50 last:border-0"
              >
                <span className="text-lg">{c.flag}</span>
                <span className="text-sm text-jade-900 flex-grow truncate">{c.name}</span>
                <span className="text-xs text-jade-400 font-mono">{c.dial}</span>
              </button>
            ))}
            {filteredCountries.length === 0 && (
              <div className="p-4 text-xs text-jade-400 text-center">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Custom Calendar Component ---
const JourneyCalendar: React.FC<{ 
  onSelectDate: (date: string) => void;
  selectedDate: string | null;
}> = ({ onSelectDate, selectedDate }) => {
  const months = [
    { name: 'October 2025', days: 31, startDay: 3, available: [12, 26] },
    { name: 'November 2025', days: 30, startDay: 6, available: [5, 19] }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-4">
      {months.map((month, idx) => (
        <div key={idx} className="border border-jade-100 p-4 bg-white">
          <h4 className="text-center font-serif text-jade-900 mb-4">{month.name}</h4>
          <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
            {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-jade-300">{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
             {Array.from({ length: month.startDay }).map((_, i) => <div key={`empty-${i}`} />)}
             {Array.from({ length: month.days }).map((_, i) => {
               const day = i + 1;
               const isAvailable = month.available.includes(day);
               const dateStr = `${month.name.split(' ')[0]} ${day}, ${month.name.split(' ')[1]}`;
               const isSelected = selectedDate === dateStr;
               
               return (
                 <button
                   key={day}
                   disabled={!isAvailable}
                   onClick={(e) => { e.preventDefault(); isAvailable && onSelectDate(dateStr); }}
                   className={`
                     aspect-square flex items-center justify-center text-xs transition-all duration-300
                     ${isSelected ? 'bg-jade-900 text-gold-500 scale-110 shadow-lg' : ''}
                     ${isAvailable && !isSelected ? 'bg-jade-50 text-jade-900 hover:bg-gold-500 hover:text-white cursor-pointer font-bold' : ''}
                     ${!isAvailable ? 'text-jade-200 cursor-not-allowed' : ''}
                   `}
                 >
                   {day}
                 </button>
               );
             })}
          </div>
        </div>
      ))}
      <div className="md:col-span-2 text-center mt-2">
        <p className="text-[10px] text-jade-400 uppercase tracking-widest">
          <span className="inline-block w-2 h-2 bg-jade-50 mr-2 border border-jade-100"></span>Available
          <span className="inline-block w-2 h-2 bg-jade-900 ml-4 mr-2"></span>Selected
        </p>
      </div>
    </div>
  );
};

// --- FAQ Accordion Component ---
const FaqAccordion: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-jade-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-6 flex justify-between items-start group focus:outline-none"
      >
        <span className={`font-serif text-xl pr-8 transition-colors ${isOpen ? 'text-gold-600' : 'text-jade-900 group-hover:text-jade-700'}`}>
          {question}
        </span>
        <span className={`shrink-0 mt-1 transition-transform duration-300 text-gold-500 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5" />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
        <p className="text-jade-600 text-sm leading-loose pr-8 font-sans">
          {answer}
        </p>
      </div>
    </div>
  );
};

// Long form social proof for the homepage
const EXTENDED_TESTIMONIALS = [
  {
    author: "Emily R, Melbourne",
    text:
      "I consider myself a confident traveler but China made me hesitate. The language, the apps, the crowds and the sense that everything worked differently made me feel that I would spend half the trip trying to figure things out instead of enjoying the places I came to see. Jade Atlas Journeys changed the experience completely. From the moment I arrived I felt supported and clear about what was happening next. By the end of the journey I realised how much more I had understood and absorbed because the pressure had been removed. I felt connected rather than exhausted."
  },
  {
    author: "Daniel W, London",
    text:
      "I have taken luxury tours before but this felt more like traveling with people who genuinely understood what I needed. I expected comfortable hotels and transport because that is standard in this category. What surprised me was the level of human care. China can feel intense with its speed, noise and different systems. Every transition was handled with calm clarity and I never felt confused or out of place. There were no shopping stops or awkward sales moments. The pacing felt thoughtful and every part of the journey felt designed for a meaningful experience rather than a checklist."
  },
  {
    author: "Sarah K, New York",
    text:
      "My partner and I normally travel independently but China required a different approach. Taxis, payments and everyday navigation felt unfamiliar right from the start. Having bilingual support available whenever something became confusing changed everything. We still had the freedom to explore but we always knew help was close by. It felt like traveling with a safety net that allowed us to enjoy each day without anxiety or uncertainty. We left already talking about where in China we would visit next because the country finally felt within reach."
  },
  {
    author: "Claire L, Vancouver",
    text:
      "I used to believe that planning everything myself was the best way to travel because guides and agencies never felt necessary. China made me rethink that completely. Timings, queues, app issues and cultural misunderstandings would have eaten entire days on my own. Every day with Jade Atlas Journeys felt balanced and paced with intention. I saw more, understood more and felt far more at ease than I ever expected. There was no stress and no wasted time."
  }
];

const HomePage: React.FC = () => {
  return (
    <>
      {/* HERO */}
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-jade-900/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-jade-950/60 via-transparent to-jade-950/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2670&auto=format&fit=crop"
          alt="The Great Wall of China in soft light"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-6 max-w-4xl pt-20">
          <p className="text-gold-400 tracking-[0.3em] uppercase text-xs mb-6">
            The Middle Kingdom Reimagined
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-6 tracking-wide leading-[1.1]">
            Silence in the <span className="italic text-mist-200">Empire of Noise.</span>
          </h1>
          <p className="font-sans text-lg md:text-xl mb-8 text-mist-100 max-w-2xl mx-auto leading-relaxed">
            Hosted small group journeys through modern China for Western travellers who want depth comfort
            and clarity instead of chaos.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
            <Button to="/book">Request Your Journey</Button>
            <Button
              variant="outline"
              to="/collections"
              className="!text-mist-50 !border-mist-50 hover:!bg-mist-50 hover:!text-jade-900"
            >
              Explore Collections
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 justify-center text-[11px] uppercase tracking-[0.2em] text-mist-200/80">
            <span>Hosted from arrival to departure</span>
            <span className="hidden md:inline">•</span>
            <span>Small groups · Limited departures</span>
            <span className="hidden md:inline">•</span>
            <span>Designed for Western guests</span>
          </div>
        </div>
      </div>

      {/* TRUST STRIP */}
      <div className="bg-white border-b border-jade-100 py-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 text-xs md:text-sm">
          <p className="uppercase tracking-[0.25em] text-jade-500">
            Trusted by early guests from Australia United Kingdom United States and Canada
          </p>
          <p className="text-jade-500 text-xs md:text-sm">
            Designed for travellers who want China to feel clear calm and well supported
          </p>
        </div>
      </div>

{/* PAIN – "The Three Walls" (Tighter + Glow Interaction) */}
<Section bg="mist" className="!py-14 md:!py-16">
  <div className="max-w-6xl mx-auto px-4 md:px-6">

    {/* Header (tighter) */}
    <div className="text-center mb-10 md:mb-12">
      <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-2 block">
        The Reality
      </span>

      <h2 className="font-serif text-3xl md:text-5xl text-jade-900 mb-4">
        China is extraordinary.<br />Planning it alone is exhausting.
      </h2>

      <p className="text-jade-900 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
        Most independent travellers hit the same three walls.
      </p>

      {/* Subtle divider (tighter) */}
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-jade-300 to-transparent mx-auto mt-5" />
    </div>

    {/* Columns */}
    <div className="grid md:grid-cols-3 gap-10 md:gap-12 text-center md:text-left relative">

      {/* 01 */}
      <div
        tabIndex={0}
        className="group relative outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 rounded-2xl"
      >
        {/* number glow */}
        <span
          className="
            text-6xl font-serif text-jade-300 block mb-5 select-none
            transition-all duration-300
            group-hover:text-gold-600 group-hover:scale-[1.03]
            group-hover:[text-shadow:0_0_18px_rgba(212,175,55,0.55)]
            group-focus-visible:text-gold-600 group-focus-visible:scale-[1.03]
            group-focus-visible:[text-shadow:0_0_18px_rgba(212,175,55,0.55)]
          "
        >
          01
        </span>

        <h3 className="font-serif text-2xl text-jade-900 mb-3 md:whitespace-nowrap">
          Logistics Puzzle
        </h3>

        <p className="text-jade-900 text-base leading-relaxed font-medium transition-transform duration-300 group-hover:-translate-y-[1px]">
          What if one missed connection costs you half a day?
        </p>

        <p className="text-jade-800 text-base leading-relaxed mt-3">
          Seats sell out, entrances cap numbers, and small delays can unravel the whole route.
        </p>

        {/* subtle column underline glow */}
        <div className="mt-6 h-px w-10 bg-jade-200 mx-auto md:mx-0 transition-all duration-300 group-hover:w-16 group-hover:bg-gold-400/70" />
      </div>

      {/* Divider */}
      <div className="hidden md:block absolute top-10 bottom-0 left-1/3 w-px bg-jade-200" />

      {/* 02 */}
      <div
        tabIndex={0}
        className="group relative outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 rounded-2xl"
      >
        <span
          className="
            text-6xl font-serif text-jade-300 block mb-5 select-none
            transition-all duration-300
            group-hover:text-gold-600 group-hover:scale-[1.03]
            group-hover:[text-shadow:0_0_18px_rgba(212,175,55,0.55)]
            group-focus-visible:text-gold-600 group-focus-visible:scale-[1.03]
            group-focus-visible:[text-shadow:0_0_18px_rgba(212,175,55,0.55)]
          "
        >
          02
        </span>

        <h3 className="font-serif text-2xl text-jade-900 mb-3 md:whitespace-nowrap">
          Apps &amp; Payments
        </h3>

        <p className="text-jade-900 text-base leading-relaxed font-medium transition-transform duration-300 group-hover:-translate-y-[1px]">
          What if your card fails and the app is in Chinese?
        </p>

        <p className="text-jade-800 text-base leading-relaxed mt-3">
          Payments, taxis, tickets, even maps often rely on China-first apps under pressure.
        </p>

        <div className="mt-6 h-px w-10 bg-jade-200 mx-auto md:mx-0 transition-all duration-300 group-hover:w-16 group-hover:bg-gold-400/70" />
      </div>

      {/* Divider */}
      <div className="hidden md:block absolute top-10 bottom-0 right-1/3 w-px bg-jade-200" />

      {/* 03 */}
      <div
        tabIndex={0}
        className="group relative outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 rounded-2xl"
      >
        <span
          className="
            text-6xl font-serif text-jade-300 block mb-5 select-none
            transition-all duration-300
            group-hover:text-gold-600 group-hover:scale-[1.03]
            group-hover:[text-shadow:0_0_18px_rgba(212,175,55,0.55)]
            group-focus-visible:text-gold-600 group-focus-visible:scale-[1.03]
            group-focus-visible:[text-shadow:0_0_18px_rgba(212,175,55,0.55)]
          "
        >
          03
        </span>

        <h3 className="font-serif text-2xl text-jade-900 mb-3 md:whitespace-nowrap">
          Language &amp; “What Now”
        </h3>

        <p className="text-jade-900 text-base leading-relaxed font-medium transition-transform duration-300 group-hover:-translate-y-[1px]">
          What if you cannot explain the problem when it matters?
        </p>

        <p className="text-jade-800 text-base leading-relaxed mt-3">
          If plans change or things go wrong, you need someone reachable who can fix it fast.
        </p>

        <div className="mt-6 h-px w-10 bg-jade-200 mx-auto md:mx-0 transition-all duration-300 group-hover:w-16 group-hover:bg-gold-400/70" />
      </div>
    </div>

    {/* Footer (bigger + one-line on desktop) */}
    <div className="mt-10 md:mt-12 text-center border-t border-jade-200 pt-6 max-w-4xl mx-auto">
      <p className="text-jade-900 text-lg md:text-xl leading-snug font-medium md:whitespace-nowrap">
        Jade Atlas Journeys turns complexity into clarity, so you can travel confidently.
      </p>
    </div>

  </div>
</Section>





      {/* MECHANISM – EDITORIAL SPLIT SCREENS */}
      <Section>
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center mb-4">
            <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-3 block">
              How We Make It Effortless
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-jade-900">
              Hosted journeys built around pacing clarity and care.
            </h2>
          </div>

          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="h-64 md:h-80 overflow-hidden rounded-sm shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1512632500753-434321e256f2?q=80&w=1600&auto=format&fit=crop"
                alt="Quiet tea house view"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-jade-900 mb-3">Considered pacing</h3>
              <p className="text-jade-700 text-sm md:text-base leading-relaxed mb-3">
                Days are shaped with space to breathe. You have time to actually feel each neighbourhood instead of
                racing from stop to stop.
              </p>
              <ul className="text-jade-700 text-sm space-y-1 leading-relaxed">
                <li>• Fewer hotel changes and clearer flow from day to day.</li>
                <li>• Mornings and evenings that feel calm not rushed.</li>
                <li>• Key viewpoints repeated at different times of day when possible.</li>
              </ul>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
            <div className="order-2 md:order-1">
              <h3 className="font-serif text-2xl text-jade-900 mb-3">Logistics handled in the background</h3>
              <p className="text-jade-700 text-sm md:text-base leading-relaxed mb-3">
                The moving pieces stay invisible. Tickets transfers and timings are handled in advance so your energy
                goes into the experience not the admin.
              </p>
              <ul className="text-jade-700 text-sm space-y-1 leading-relaxed">
                <li>• Help with essential Chinese apps before you arrive.</li>
                <li>• Clear daily outline so you always know what happens next.</li>
                <li>• Support if plans need to flex on the ground.</li>
              </ul>
            </div>
            <div className="h-64 md:h-80 overflow-hidden rounded-sm shadow-sm order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=1600&auto=format&fit=crop"
                alt="Smooth city transport at night"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="h-64 md:h-80 overflow-hidden rounded-sm shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?q=80&w=1600&auto=format&fit=crop"
                alt="Warm conversation with locals"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-jade-900 mb-3">Hosts who bridge two worlds</h3>
              <p className="text-jade-700 text-sm md:text-base leading-relaxed mb-3">
                You travel with people who understand Western expectations and the rhythm of modern China so nothing
                feels confusing or out of reach.
              </p>
              <ul className="text-jade-700 text-sm space-y-1 leading-relaxed">
                <li>• Bilingual support for conversations and everyday situations.</li>
                <li>• Encounters chosen for authenticity not obligation or commission.</li>
                <li>• A familiar contact from first call to farewell dinner.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

{/* SIGNATURE SECTION */}
<Section bg="dark">
  <div className="text-center max-w-4xl mx-auto mb-16">
    <span className="text-gold-500 uppercase tracking-widest text-xs font-bold mb-4 block">
      The Jade Atlas Journeys Way
    </span>
    <h2 className="font-serif text-4xl md:text-5xl text-mist-50 mb-6">
      Not a tour. A hosted chapter of your life.
    </h2>
    <p className="text-jade-200 leading-relaxed text-base md:text-lg">
      Each journey is shaped as a clear arc. You arrive settle in with your host understand
      the rhythm of the days then immerse yourself and finish with time to reflect. The trip
      feels like one complete story not a blur of disconnected stops.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
    {[
      {
        icon: Clock,
        title: "Deliberate rhythm",
        desc:
          "Days paced so you have enough time to take in each place instead of rushing from stop to stop or collapsing at the end of the day."
      },
      {
        icon: Shield,
        title: "Hosted navigation",
        desc:
          "A host who quietly steers the plan so you always know what is happening next and can spend your energy on the experience not the logistics."
      },
      {
        icon: Heart,
        title: "Curated moments",
        desc:
          "A mix of key views and everyday scenes chosen for how they feel in the moment not just how they look later in a photo."
      }
    ].map((feature, i) => (
      <div
        key={i}
        className="group relative p-10 border border-jade-700/80 bg-jade-900/40 
                   hover:bg-jade-900 hover:border-gold-500/60 
                   transition-all duration-500 shadow-[0_0_0_1px_rgba(0,0,0,0.4)] 
                   hover:shadow-[0_18px_45px_rgba(0,0,0,0.65)]"
      >
        <div className="flex items-center gap-3 mb-4">
          <feature.icon className="w-6 h-6 text-gold-500" />
          <h3 className="font-serif text-[20px] md:text-[22px] text-mist-50">
            {feature.title}
          </h3>
        </div>

        {/* Updated text sizing for readability */}
        <p className="text-jade-200 text-[15px] md:text-base leading-relaxed">
          {feature.desc}
        </p>
      </div>
    ))}
  </div>
</Section>


{/* GUEST REFLECTIONS – MULTI QUOTE SOCIAL PROOF (IMPROVED) */}
<Section bg="white">
  <div className="max-w-5xl mx-auto">
    <div className="text-center mb-10">
      <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-3 block">
        Guest Reflections
      </span>

      <h2 className="font-serif text-3xl md:text-4xl text-jade-900 mb-2">
        How it feels to travel this way.
      </h2>

      {/* star row */}
      <div className="flex justify-center text-gold-500 text-xs mb-3">
        <span className="mx-0.5">★</span>
        <span className="mx-0.5">★</span>
        <span className="mx-0.5">★</span>
        <span className="mx-0.5">★</span>
        <span className="mx-0.5">★</span>
      </div>

      <p className="text-jade-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
        Early guests talk most about how calm clear and looked after they felt
        even in cities that usually feel intense and confusing.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {EXTENDED_TESTIMONIALS.slice(0, 3).map((t, index) => (
        <article
          key={index}
          className="relative bg-mist-50 border border-jade-100 p-8 pt-12 flex flex-col justify-between
                     transition-all duration-300 ease-out
                     hover:-translate-y-1 hover:shadow-md hover:bg-white hover:border-jade-200"
        >
          {/* BIG ANCHORED QUOTE MARK */}
          <div className="absolute -top-1 left-6 text-6xl md:text-7xl text-jade-100 font-serif leading-none select-none">
            “
          </div>

          {/* BODY TEXT – CLEARER SIZE */}
          <p className="relative z-10 text-jade-800 text-sm md:text-base leading-[1.9] mb-6">
            {t.text}
          </p>

          {/* AUTHOR – DARKER & MORE LEGIBLE */}
          <p className="relative z-10 text-jade-700 text-xs md:text-sm font-semibold uppercase tracking-[0.22em]">
            {t.author}
          </p>
        </article>
      ))}
    </div>
  </div>
</Section>


{/* VALUE STACK – Tight, Scannable, High-Contrast */}
<Section bg="mist" className="!py-12 md:!py-16">
  <div className="max-w-5xl mx-auto mb-8 text-center">
    <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-2 block">
      Included In Every Journey
    </span>
    <h2 className="font-serif text-3xl md:text-4xl text-jade-900 mb-3">
      Travel with support that feels effortless.
    </h2>
    <p className="text-jade-900 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
      From the first conversation until the flight home, we reduce effort and uncertainty so you can
      focus on the experience itself.
    </p>

    {/* Divider */}
    <div className="h-px w-20 bg-gradient-to-r from-transparent via-jade-300 to-transparent mx-auto mt-6" />
  </div>

  {/* Grid – width & gap matched to Guest Reflections */}
  <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
    {/* BEFORE YOU FLY */}
    <div className="bg-white p-6 md:p-8 border-t-4 border-jade-900 border-x border-b border-jade-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-jade-800">
      <h3 className="font-serif text-xl text-jade-900 mb-4 font-bold">Before you fly</h3>
      <ul className="text-jade-900 text-base leading-7 space-y-3">
        <li className="flex gap-3 items-start">
          <CheckCircle className="w-5 h-5 text-gold-500 mt-1 shrink-0" />
          <span>
            <strong>Private planning</strong> so dates and expectations feel clear.
          </span>
        </li>
        <li className="flex gap-3 items-start">
          <CheckCircle className="w-5 h-5 text-gold-500 mt-1 shrink-0" />
          <span>
            <strong>Concise overview</strong> of your route with timings and inclusions.
          </span>
        </li>
        <li className="flex gap-3 items-start">
          <CheckCircle className="w-5 h-5 text-gold-500 mt-1 shrink-0" />
          <span>
            <strong>App setup guide</strong> to handle payments and maps before you land.
          </span>
        </li>
      </ul>
    </div>

    {/* WHILE YOU ARE HERE */}
    <div className="bg-white p-6 md:p-8 border-t-4 border-jade-900 border-x border-b border-jade-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-jade-800">
      <h3 className="font-serif text-xl text-jade-900 mb-4 font-bold">While you are here</h3>
      <ul className="text-jade-900 text-base leading-7 space-y-3">
        <li className="flex gap-3 items-start">
          <CheckCircle className="w-5 h-5 text-gold-500 mt-1 shrink-0" />
          <span>
            <strong>Core logistics booked</strong> including trains, flights, and key entrances.
          </span>
        </li>
        <li className="flex gap-3 items-start">
          <CheckCircle className="w-5 h-5 text-gold-500 mt-1 shrink-0" />
          <span>
            <strong>Bilingual hosting</strong> to bridge the language gap with locals.
          </span>
        </li>
        <li className="flex gap-3 items-start">
          <CheckCircle className="w-5 h-5 text-gold-500 mt-1 shrink-0" />
          <span>
            <strong>Real-time support</strong> for tickets, changes, or daily questions.
          </span>
        </li>
      </ul>
    </div>
  </div>

  {/* After-journey Section – width matched too */}
  <div className="max-w-5xl mx-auto mt-5 bg-white border border-jade-200 p-6 text-center shadow-sm">
    <p className="text-jade-900 text-base font-medium leading-relaxed">
      <span className="font-serif text-xl italic text-jade-900 mr-2">After your journey,</span>
      you receive a simple summary of your route and priority access to new collection releases.
    </p>
    <div className="mt-4 pt-4 border-t border-jade-100 inline-block w-full max-w-md mx-auto">
      <p className="text-[10px] tracking-[0.2em] uppercase text-jade-500 font-bold whitespace-nowrap">
        We take the stress. You take the experience.
      </p>
    </div>
  </div>
</Section>


      {/* COLLECTIONS */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
              <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-3 block">
                Our Collections
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-jade-900 mb-3">
                Signature Journeys
              </h2>
              <p className="text-jade-600 text-sm md:text-base leading-relaxed">
                Flagship itineraries centred on one region at a time. Fewer cities more depth designed for a handful
                of guests per departure.
              </p>
              <p className="text-jade-500 text-[10px] uppercase tracking-[0.25em] mt-3">
                Small groups · Limited departures · Early interest recommended
              </p>
            </div>
            <Button to="/collections" variant="text" className="md:mb-1">
              View All Collections <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Chongqing */}
            <div className="group bg-white/90 border border-jade-100 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500 flex flex-col h-full">
              <div className="relative h-72 overflow-hidden">
                <div className="absolute top-4 right-4 bg-jade-900 text-gold-500 text-[10px] uppercase tracking-widest px-3 py-1 z-10 font-bold">
                  Signature
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop"
                  alt="Chongqing skyline at night"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <PricingCard
                className="flex-grow border-0 shadow-none"
                variant="light"
                title={CHONGQING_JOURNEY.title}
                price={CHONGQING_JOURNEY.basePrice}
                subtitle="A vertical mountain city of neon and river views experienced at a pace that lets you take it in."
                status="available"
              />
            </div>

            {/* Yunnan */}
            <div className="group bg-white/90 border border-jade-100 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500 flex flex-col h-full">
              <div className="relative h-72 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <img
                  src="https://images.unsplash.com/photo-1518674660708-6dce3f4463ab?q=80&w=1600&auto=format&fit=crop"
                  alt="Terraced fields in Yunnan"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                />
              </div>
              <PricingCard
                className="flex-grow border-0 shadow-none"
                variant="light"
                title={COLLECTIONS[1].title}
                price={COLLECTIONS[1].basePrice}
                subtitle="Landscapes tea routes and villages shaped into one hosted chapter south of the clouds."
                status="coming_soon"
                launchDate={COLLECTIONS[1].launchDate}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* PRACTICAL QUESTIONS */}
      <Section bg="mist">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-3 block">
              Practical Questions
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-jade-900">
              Simple answers before you commit to anything.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-jade-100">
              <h3 className="font-serif text-lg text-jade-900 mb-2">How complicated is booking</h3>
              <p className="text-jade-700 text-sm leading-relaxed">
                You start with a short conversation not a payment form. We then send a clear outline price and
                inclusions so you know exactly what you are agreeing to.
              </p>
            </div>
            <div className="bg-white p-8 border border-jade-100">
              <h3 className="font-serif text-lg text-jade-900 mb-2">Do I need to know Chinese</h3>
              <p className="text-jade-700 text-sm leading-relaxed">
                You do not. Your host helps with communication key apps and everyday situations so you never have to
                negotiate alone unless you want to.
              </p>
            </div>
            <div className="bg-white p-8 border border-jade-100">
              <h3 className="font-serif text-lg text-jade-900 mb-2">Is the pace flexible</h3>
              <p className="text-jade-700 text-sm leading-relaxed">
                On Signature small group journeys the rhythm is shared by the group. On private journeys the pace can be
                tailored to your preferred tempo and style of travel.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* FINAL CTA – VISUALLY SEPARATED FROM FOOTER */}
      <Section
        bg="dark"
        className="relative border-t border-jade-800 bg-gradient-to-b from-jade-950 via-jade-900 to-jade-900"
      >
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-mist-50 mb-6">
            The East is waiting.
          </h2>
          <p className="text-jade-200 text-base md:text-lg mb-6">
            One private conversation can turn the idea of seeing China one day into a clear and comfortable plan that
            feels right for you.
          </p>
          <p className="text-jade-300 text-xs md:text-sm mb-10">
            Consultations are complimentary and relaxed. There is no pressure and no hard sell. You receive honest
            guidance on whether a Jade Atlas Journey matches what you have in mind.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Button to="/contact" variant="secondary">
              Schedule a Consultation
            </Button>
            <Button
              to="/book"
              variant="outline"
              className="!text-mist-50 !border-jade-700 hover:!bg-jade-800"
            >
              Direct Reservation
            </Button>
          </div>
          <p className="text-jade-400 text-[10px] mt-6 uppercase tracking-[0.25em]">
            Small groups · Limited departures · Early interest appreciated
          </p>
        </div>
      </Section>
    </>
  );
};


// --- UPDATED COLLECTIONS PAGE (Fixed Padding) ---
const CollectionsPage: React.FC = () => {
  return (
    <div className="pt-20 bg-mist-50">
      <Section>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-4 block">Our Portfolio</span>
          <h1 className="font-serif text-6xl text-jade-900 mb-8">The Collections</h1>
          <p className="text-jade-600 text-lg leading-relaxed">
            We have divided the vastness of China into curated chapters. Each collection focuses on a specific narrative theme, designed to be experienced deeply rather than broadly.
          </p>
        </div>
        <div className="space-y-32">
          {COLLECTIONS.map((journey, index) => {
            const isAvailable = journey.status === 'available';
            
            return (
              <div key={journey.id} className={`grid md:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                <div className={`h-[600px] w-full overflow-hidden shadow-2xl relative group ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <div className={`absolute inset-0 bg-jade-900/10 ${isAvailable ? 'group-hover:bg-transparent' : 'bg-jade-900/20'} transition-colors duration-700 z-10`} />
                  <img 
                    src={journey.image} 
                    alt={journey.title} 
                    className={`w-full h-full object-cover transition-transform duration-1000 ${isAvailable ? 'group-hover:scale-105' : 'grayscale opacity-90'}`} 
                  />
                  {!isAvailable && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <span className="bg-jade-950/80 backdrop-blur-sm text-mist-50 px-6 py-3 uppercase tracking-widest text-xs border border-jade-800">In Curation</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-4 block">0{index + 1}</span>
                  <h2 className={`font-serif text-4xl md:text-5xl text-jade-900 mb-6 ${!isAvailable ? 'opacity-70' : ''}`}>{journey.title}</h2>
                  <p className="text-jade-700 mb-10 leading-loose text-lg">{journey.longDescription || journey.shortDescription}</p>
                  
                  <div className="mb-10 grid grid-cols-2 gap-6 border-b border-jade-200 pb-8">
                     <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gold-500" />
                        <span className="text-sm text-jade-600 font-medium uppercase tracking-wider">{journey.duration}</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-gold-500" />
                        <span className="text-sm text-jade-600 font-medium uppercase tracking-wider">Private or Small Group</span>
                     </div>
                  </div>

                  <div className="mb-10">
                     <PricingCard 
                       variant="light"
                       title="Collection Access" 
                       price={journey.basePrice} 
                       status={journey.status}
                       launchDate={journey.launchDate}
                       className="max-w-md shadow-md border-jade-200"
                     />
                  </div>

                  <div className="flex flex-wrap gap-6">
                    {isAvailable ? (
                       <Button to={journey.slug === 'chongqing' ? '/collections/chongqing' : '/book'}>
                         View Itinerary
                       </Button>
                    ) : (
                       <Button to="/contact" variant="secondary">Join Waitlist</Button>
                    )}
                    
                    <Button variant="text" to="/contact">Speak to Curator</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
};

const ChongqingPage: React.FC = () => {
  const journey = CHONGQING_JOURNEY;
  
  return (
    <div>
      <div className="h-[90vh] min-h-[600px] relative overflow-hidden flex items-end pb-24 px-6">
        <img src={journey.image} alt={journey.title} className="absolute inset-0 w-full h-full object-cover animate-fade-in" />
        <div className="absolute inset-0 bg-jade-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-jade-950 via-jade-900/60 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <span className="text-gold-400 uppercase tracking-[0.2em] text-sm mb-4 block animate-fade-in-up font-bold text-shadow-sm">Signature Collection</span>
          <h1 className="font-serif text-6xl md:text-8xl text-white mb-6 cinematic-text animate-fade-in-up" style={{ animationDelay: '0.1s' }}>{journey.title}</h1>
          <p className="text-mist-100 text-xl max-w-2xl leading-relaxed animate-fade-in-up drop-shadow-md" style={{ animationDelay: '0.2s' }}>{journey.shortDescription}</p>
        </div>
      </div>

      <Section className="pt-16 pb-24 md:pt-20 md:pb-36">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <h2 className="font-serif text-4xl text-jade-900 mb-8">The Narrative</h2>
            <p className="text-jade-800 leading-loose mb-8 text-lg">{journey.longDescription}</p>
            
            <div className="bg-mist-50 p-10 border-l-4 border-gold-500 mb-16">
               <h3 className="font-serif text-xl text-jade-900 mb-4">Why this journey?</h3>
               <p className="italic text-jade-700 leading-relaxed">
                 "Travelers often avoid Chongqing due to its sheer scale and complexity. We turn that complexity into a feature, offering a guided path through the chaos that reveals the city's cyberpunk beauty without the stress of navigation. You will see what others miss in the fog."
               </p>
            </div>

            <h2 className="font-serif text-4xl text-jade-900 mb-10">Daily Itinerary</h2>
            <div className="space-y-16 border-l border-jade-200 ml-4 pl-10 relative">
              {journey.itinerary?.map((day) => (
                <div key={day.day} className="relative group">
                  <span className="absolute -left-[53px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-jade-900 text-gold-500 text-sm font-serif border-4 border-white transition-colors group-hover:bg-gold-500 group-hover:text-jade-900">
                    {day.day}
                  </span>
                  <h3 className="font-serif text-2xl text-jade-900 mb-4 group-hover:text-gold-600 transition-colors">{day.title}</h3>
                  <p className="text-jade-600 leading-loose">{day.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="sticky top-32 space-y-6">
              <PricingCard 
                variant="light"
                title="Journey Investment" 
                price={journey.basePrice} 
                status="available"
                subtitle="Includes all luxury transfers, accommodation, and private guiding." 
              />
              
              <div className="bg-jade-900 text-mist-50 p-8 border border-jade-800 shadow-xl">
                <h4 className="font-serif text-2xl mb-6 text-gold-500">Inclusions</h4>
                <ul className="text-sm space-y-4 mb-8">
                  {journey.inclusions?.map((inc, i) => (
                    <li key={i} className="flex gap-3 items-start text-jade-200">
                      <CheckCircle className="w-5 h-5 text-gold-500 shrink-0 mt-0.5"/> 
                      <span className="leading-relaxed">{inc}</span>
                    </li>
                  ))}
                </ul>
                <h4 className="font-serif text-2xl mb-6 text-gold-500">Key Facts</h4>
                 <ul className="text-sm space-y-4 mb-10 text-jade-200">
                  <li className="flex gap-3"><Users className="w-5 h-5"/> Group Size: Private (1-6)</li>
                  <li className="flex gap-3"><MapPin className="w-5 h-5"/> Activity Level: Moderate</li>
                  <li className="flex gap-3"><Calendar className="w-5 h-5"/> Season: Mar - Nov</li>
                </ul>
                <Button to="/book" variant="secondary" className="w-full">Secure Dates</Button>
              </div>

              <div className="bg-mist-50 p-8 border border-jade-200">
                 <div className="flex items-center gap-3 mb-4 text-jade-900">
                    <Sun className="w-5 h-5 text-gold-500" />
                    <h4 className="font-serif text-xl">Curator's Tip</h4>
                 </div>
                 <p className="text-jade-600 text-sm leading-relaxed mb-4">
                    "October is magical in Chongqing. The summer heat breaks, and the river fog creates the classic 'Mountain City' atmosphere perfect for photography."
                 </p>
                 <span className="text-xs uppercase tracking-widest text-jade-400 font-bold">— Peter, Founder</span>
              </div>
               <div className="bg-white p-8 border border-jade-100 shadow-sm italic text-jade-700 text-sm leading-loose">
                 "The verticality of this city is impossible to describe. Standing on the Raffles City deck at sunset was the highlight of our year."
                 <span className="block mt-4 not-italic text-xs font-bold text-gold-600 uppercase tracking-widest">— Sarah J., Toronto</span>
              </div>

            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

// --- UPDATED ABOUT PAGE (Final Polish & Consistency) ---
const AboutPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* 1. HERO SECTION */}
      <div className="h-[80vh] relative overflow-hidden flex items-center justify-center">
         <img src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2676&auto=format&fit=crop" alt="Mist covered mountains" className="absolute inset-0 w-full h-full object-cover" />
         <div className="absolute inset-0 bg-jade-950/40" />
         <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="font-serif text-5xl md:text-7xl mb-6">The Art of Deep Travel</h1>
            <p className="font-serif text-2xl md:text-3xl text-gold-400 italic mb-8">True luxury is not speed, but stillness</p>
         </div>
      </div>

      {/* 2. INTRO SECTION */}
      <Section className="text-center">
         <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
           <p className="text-jade-900 text-xl md:text-2xl leading-relaxed font-serif italic">
             "True luxury is not found in the thread count of a sheet, but in the rarity of a moment.
             In a world obsessed with velocity, we have chosen to honour the art of the pause."
           </p>
           
           <p className="text-jade-700 leading-relaxed text-lg font-light">
             Jade Atlas Journeys was born from a quiet defiance, a simple belief that the Middle Kingdom should never be skimmed like a checklist, but experienced as a living story.
           </p>
           
           <div className="h-px w-24 bg-gold-500 mx-auto opacity-50 my-6"></div> 
           
           <p className="text-jade-900 font-bold uppercase tracking-widest text-xs">This is the China we choose to reveal.</p>
         </div>
      </Section>

      {/* 3. MISSION SECTION (Tightened Spacing + Fixed Quote Font) */}
      <Section bg="mist" className="!py-10 md:!py-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative h-[500px] overflow-hidden group shadow-xl">
             <div className="absolute inset-0 bg-jade-900/10 group-hover:bg-transparent transition-colors duration-700"></div>
             <img src="https://images.unsplash.com/photo-1601633512399-52e8574765d1?q=80&w=2574&auto=format&fit=crop" alt="Monk walking" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>
          
          <div className="flex flex-col justify-center">
             <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-4 block">Our Mission</span>
             <h2 className="font-serif text-4xl md:text-5xl text-jade-900 mb-6">The Architects of Your Memory</h2>
             
             <div className="space-y-6 text-jade-700 leading-relaxed text-lg">
               <p>
                 Our mission is to guide the few, not the many, into the hidden folds of China. We act as cultural translators, bridging the perspective of the global traveler with the lived experience of modern China.
               </p>
               
               {/* FIX: Quote now matches the large Serif style of the Intro/Two Worlds sections */}
               <p className="text-jade-900 font-serif text-xl md:text-2xl italic border-l-2 border-gold-500 pl-6 py-2 bg-white/50">
                 "We are not a travel agency.
                 We are the architects of your memory."
               </p>
               
               <p>
                 We work with trusted local partners to shape journeys that feel considered rather than rushed. Guides are chosen for their ability to communicate clearly and connect cultures. Stays are selected with a focus on character, comfort, and location.
               </p>
             </div>
          </div>
        </div>
      </Section>

      {/* 4. THE SPARK SECTION (With Drop Cap) */}
      <Section>
         <div className="max-w-[700px] mx-auto text-left">
            <h2 className="font-serif text-4xl md:text-5xl text-jade-900 mb-10 text-center">The Spark</h2>
            <div className="space-y-6 text-jade-800 leading-[1.8] text-lg">
               <p className="first-letter:text-7xl first-letter:font-serif first-letter:text-gold-500 first-letter:float-left first-letter:mr-4 first-letter:mt-[-10px] first-letter:font-normal">
                 It began in Ciqikou, Chongqing.
                 A misty morning, a teahouse overlooking the Jialing River.
                 The fog had descended and erased the skyscrapers, leaving only the sound of boat horns and the quiet clink of porcelain.
               </p>
               <p>
                 A tour group passed by outside. A flag waving in the air. A guide shouting over the street noise.
                 A line of visitors marched from shop to shop, ushered quickly to stores where commissions waited to be earned.
               </p>
               <p>
                 We watched the moments slip away.
                 We realised the standard tour model had destroyed the very magic it promised to reveal.
                 There had to be another way.
               </p>
            </div>
         </div>
      </Section>

      {/* 5. TWO WORLDS SECTION (Tightened Spacing) */}
      <Section bg="mist" className="!py-10 md:!py-12">
         <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
               <h2 className="font-serif text-4xl md:text-5xl text-jade-900 mb-4">Two Worlds</h2>
               <p className="text-jade-700 text-lg">
                 Jade Atlas Journeys was created by two perspectives coming together.
               </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
               {/* Peter */}
               <div className="bg-white p-8 border-t-4 border-jade-900 shadow-sm hover:shadow-md transition-shadow">
                 <strong className="block text-jade-900 font-serif text-3xl mb-3">Peter</strong>
                 <span className="text-jade-600 leading-relaxed block text-base md:text-lg">
                   An Australian traveler with a sharp sense of clarity and global expectations. He helps shape journeys through the eyes of international guests.
                 </span>
               </div>
               
               {/* Launce */}
               <div className="bg-white p-8 border-t-4 border-gold-500 shadow-sm hover:shadow-md transition-shadow">
                 <strong className="block text-jade-900 font-serif text-3xl mb-3">Launce</strong>
                 <span className="text-jade-600 leading-relaxed block text-base md:text-lg">
                   A Chinese local from Chongqing who understands the nuance, rhythm, and unspoken codes of modern China. He makes sure every journey feels natural, fluent, and genuinely connected on the ground.
                 </span>
               </div>
            </div>
            
            <div className="text-center max-w-3xl mx-auto">
               <p className="font-serif text-xl md:text-2xl text-jade-900 italic leading-relaxed">
                 "Together we set out to build a bridge between international travelers and modern China."
               </p>
            </div>
         </div>
      </Section>

      {/* 6. THE CRAFT SECTION (Tightened Spacing) */}
      <Section>
         <div className="max-w-[800px] mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-jade-900 mb-8 text-center">The Craft</h2>
            
            <div className="text-jade-800 leading-[1.8] text-lg space-y-4 mb-8 text-center">
               <p>
                 Jade Atlas Journeys is built by a small team of travelers and local partners who care about the details.
               </p>
               <p>
                 Every hotel, guide, and transfer is chosen with intention, for clarity, comfort, and the part it plays in the story you will carry home.
               </p>
            </div>
               
            <div className="bg-mist-50 p-8 md:p-10 border border-jade-100 relative shadow-inner">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gold-500 border border-jade-100 rounded-full p-2">
                  <Compass className="w-6 h-6" />
               </div>
               
               <h3 className="font-serif text-2xl text-jade-900 mb-6 text-center mt-2">There are two simple ways to travel with us.</h3>
               
               <div className="grid md:grid-cols-2 gap-6 text-center">
                 {/* Option 1 */}
                 <div className="p-6 border border-jade-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <span className="block font-serif text-2xl text-jade-900 mb-3">Signature Journeys</span>
                    <p className="text-jade-600 leading-relaxed text-base md:text-lg">
                      Join one of our small group journeys, built around a clear story, balanced pacing, and time to truly feel each place.
                    </p>
                 </div>
                 
                 {/* Option 2 */}
                 <div className="p-6 border border-jade-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <span className="block font-serif text-2xl text-jade-900 mb-3">Tailored Journeys</span>
                    <p className="text-jade-600 leading-relaxed text-base md:text-lg">
                      If you would like something more personal, we design a private route together around your interests, pace, and timing.
                    </p>
                 </div>
               </div>
            </div>
         </div>
      </Section>

      {/* 7. OUR VALUES SECTION (Dark Mode + 3/2 Grid) */}
      <Section bg="dark" className="!py-10 md:!py-12">
         <div className="max-w-7xl mx-auto px-4">
            
            <div className="text-center mb-8">
               <span className="text-gold-500 uppercase tracking-widest text-xs font-bold mb-3 block opacity-80">Our Ethos</span>
               <h2 className="font-serif text-4xl md:text-5xl text-mist-50 mb-6">Our Values</h2>
               <div className="h-px w-24 bg-gold-500 mx-auto opacity-50"></div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
               {[
                  { 
                    icon: Sun,
                    title: "Clarity", 
                    desc: "Your itinerary is shaped with intention and openness, free from pressure or incentive-based stops. Every experience is chosen for its meaning, not for obligation." 
                  },
                  { 
                    icon: Heart,
                    title: "Care", 
                    desc: "You are welcomed as a guest, never a number. You receive steady support, patience, and attention at every step of the journey." 
                  },
                  { 
                    icon: Shield,
                    title: "Integrity", 
                    desc: "We reveal China as it truly is, through genuine stories, real exchanges, and local insight that is never manufactured or staged." 
                  },
                  { 
                    icon: Globe,
                    title: "Balance", 
                    desc: "We merge Western travel expectations with Chinese cultural understanding to create journeys that feel natural, respectful, and deeply human." 
                  },
                  { 
                    icon: Star,
                    title: "Quality", 
                    desc: "We work with trusted partners and teams who uphold a consistently high standard. Every detail is selected for reliability, comfort, and lasting value." 
                  }
               ].map((val, i) => (
                  <div 
                     key={i} 
                     /* Responsive Widths: Desktop 30%, Tablet 45%, Mobile 100% */
                     className="group flex flex-col items-start text-left w-full md:w-[45%] lg:w-[30%] p-6 border border-jade-800 bg-jade-900/30 hover:bg-jade-900 hover:border-gold-500/50 transition-all duration-500"
                  >
                     {/* HEADER */}
                     <div className="flex justify-between items-end mb-4 w-full border-b border-jade-800 pb-3 group-hover:border-gold-500/30 transition-colors">
                        <div className="flex items-baseline gap-3">
                           <span className="text-sm font-bold text-gold-500 uppercase tracking-widest">0{i+1}</span>
                           <h3 className="font-serif text-2xl md:text-3xl text-mist-50">{val.title}</h3>
                        </div>
                        
                        <val.icon 
                           className="w-5 h-5 text-jade-500 group-hover:text-gold-500 transition-colors duration-500 mb-1" 
                           strokeWidth={1.5} 
                        />
                     </div>
                     
                     {/* BODY - Left Aligned */}
                     <p className="text-jade-200 text-base md:text-lg leading-relaxed font-light">
                       {val.desc}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </Section>

      {/* 8. CTA SECTION (Founder Note Removed) */}
      <Section className="text-center pb-24">
         <h2 className="font-serif text-4xl md:text-5xl text-jade-900 mb-6">Begin Your Narrative</h2>
         <p className="text-jade-600 text-xl mb-12 max-w-md mx-auto leading-relaxed">
           The world is vast. Your time is finite.
           <br/>Let us curate a journey worthy of your curiosity.
         </p>
         
         <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            {/* Primary Action: Solid Dark Button */}
            <Button to="/collections" variant="primary" className="px-10 py-4 text-sm tracking-widest min-w-[240px]">
              View Collections
            </Button>

            {/* Secondary Action: Fixed Contrast */}
            <Button 
              to="/contact" 
              variant="outline" 
              className="px-10 py-4 text-sm tracking-widest min-w-[240px] !border-jade-900 !text-jade-900 hover:!bg-jade-900 hover:!text-white transition-all duration-300"
            >
              Design Custom Journey
            </Button>
         </div>
      </Section>
    </div>
  );
};

// --- UPDATED JOURNAL PAGE (Magazine Layout + Filters + Search + New Tagline + Updated Categories) ---
const JournalPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // UPDATED CATEGORIES: Removed "Art", Added "Destinations" and "Travel Guidance"
  const categories = ['All', 'Destinations', 'Culture', 'Culinary', 'Travel Guidance'];

  // Advanced Filter Logic (Category + Search)
  const filteredArticles = JOURNAL_ARTICLES.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles[0];
  const standardArticles = filteredArticles.slice(1);

  return (
    // FIX: Changed pt-32 to pt-20
    <div className="pt-20 bg-mist-50 min-h-screen">
      <Section className="!pb-12">
        <div className="max-w-3xl mx-auto mb-12 text-center animate-fade-in-up">
          <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-4 block">The Journal</span>
          <h1 className="font-serif text-5xl md:text-6xl text-jade-900 mb-6">Notes from the Middle Kingdom</h1>
          {/* UPDATED TAGLINE */}
          <p className="text-jade-600 text-lg leading-relaxed mb-8">
             Essays on China’s culture, history, and the art of deep travel.
          </p>

          {/* Minimalist Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-jade-400" />
            <input 
              type="text" 
              placeholder="Search for stories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-jade-300 py-2 pl-8 text-jade-900 placeholder:text-jade-300 focus:outline-none focus:border-gold-500 transition-colors font-serif italic text-lg"
            />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16 border-b border-jade-200/60 pb-6 max-w-4xl mx-auto animate-fade-in">
           {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`text-xs uppercase tracking-widest font-bold transition-all duration-300 relative pb-2 ${
                 activeCategory === cat 
                   ? 'text-gold-600' 
                   : 'text-jade-400 hover:text-jade-900'
               }`}
             >
               {/* UI Label: Use the category string (CSS can handle UPPERCASE if needed, here we use the raw string) */}
               {cat.toUpperCase()} 
               <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gold-500 transition-transform duration-300 ${activeCategory === cat ? 'scale-x-100' : 'scale-x-0'}`} />
             </button>
           ))}
        </div>

        {/* Featured Article */}
        {featuredArticle ? (
          <Link to={`/journal/${featuredArticle.slug}`} className="group relative block mb-24 animate-fade-in-up">
            <div className="grid md:grid-cols-12 gap-8 items-center">
               <div className="md:col-span-8 relative overflow-hidden shadow-2xl">
                  <div className="aspect-[16/9] w-full relative">
                     <div className="absolute inset-0 bg-jade-900/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                     <img 
                       src={featuredArticle.image} 
                       alt={featuredArticle.title} 
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                     />
                  </div>
               </div>
               
               <div className="md:col-span-4 md:-ml-12 relative z-20 bg-white p-8 md:p-12 border border-jade-100 shadow-xl">
                  <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-4 block">
                    Featured Story • {featuredArticle.readTime}
                  </span>
                  <h2 className="font-serif text-4xl text-jade-900 mb-6 leading-tight group-hover:text-gold-600 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-jade-600 text-sm leading-loose mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <span className="inline-flex items-center text-xs uppercase tracking-widest text-jade-900 border-b border-jade-900 pb-1 group-hover:text-gold-600 group-hover:border-gold-600 transition-all">
                    Read the Full Story <ArrowRight className="w-3 h-3 ml-2" />
                  </span>
               </div>
            </div>
          </Link>
        ) : (
          <div className="text-center py-20">
             <div className="text-jade-300 mb-4 text-4xl font-serif">Empty Page</div>
             <p className="text-jade-500 italic">No stories found matching "{searchQuery}".</p>
             <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                className="mt-6 text-xs uppercase tracking-widest text-gold-600 border-b border-gold-500 pb-1 hover:text-jade-900 transition-colors"
             >
                Clear Filters
             </button>
          </div>
        )}

        {/* Standard Grid */}
        {standardArticles.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 text-left border-t border-jade-200 pt-20">
            {standardArticles.map((article, idx) => (
              <Link key={article.slug} to={`/journal/${article.slug}`} className="group block animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                 <div className="aspect-[3/2] overflow-hidden mb-8 relative shadow-sm">
                   <div className="absolute inset-0 bg-jade-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                   <img 
                     src={article.image} 
                     alt={article.title} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                   />
                 </div>
                 <div>
                   <div className="flex justify-between items-center mb-4 text-[10px] uppercase tracking-widest font-bold">
                      <span className="text-gold-600">{article.category}</span>
                      <span className="text-jade-300 font-medium">{article.readTime}</span>
                   </div>
                   <h2 className="font-serif text-2xl text-jade-900 mb-4 group-hover:text-gold-600 transition-colors leading-tight">
                     {article.title}
                   </h2>
                   <p className="text-jade-600 text-sm leading-relaxed mb-6 line-clamp-3">
                     {article.excerpt}
                   </p>
                   <span className="inline-flex items-center text-[10px] uppercase tracking-widest text-jade-400 border-b border-transparent pb-1 group-hover:border-gold-500 group-hover:text-gold-600 transition-all">
                     Read Entry <ArrowRight className="w-3 h-3 ml-2" />
                   </span>
                 </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
      
      {/* NEW: White Newsletter Card (Fixes the color clash with footer) */}
      <Section className="!pt-0 !pb-32">
        <div className="max-w-5xl mx-auto bg-white p-12 md:p-20 relative overflow-hidden shadow-xl border-t-4 border-gold-600">
           {/* Background Texture (Subtle Mist Compass) */}
           <div className="absolute -right-20 -bottom-20 text-mist-100 opacity-50 pointer-events-none">
              <Compass className="w-96 h-96" strokeWidth={0.5} />
           </div>

           <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              {/* Left Side: The Pitch */}
              <div className="text-left">
                 <span className="text-gold-500 uppercase tracking-widest text-xs font-bold mb-4 block">The Dispatch</span>
                 <h3 className="font-serif text-4xl md:text-5xl mb-6 leading-tight text-jade-900">
                    Travel deeper into the narrative.
                 </h3>
                 <p className="text-jade-600 text-lg font-light leading-relaxed">
                    Join our inner circle for rare stories, early access to new collections, and notes from the road that we don't publish elsewhere.
                 </p>
              </div>

              {/* Right Side: The Action */}
              <div>
                 <form className="space-y-6">
                    <div className="relative">
                       {/* Updated Input Colors for White Background */}
                       <input 
                          type="email" 
                          placeholder="Your email address" 
                          className="w-full bg-transparent border-b border-jade-200 text-jade-900 p-4 pl-0 placeholder:text-jade-400 focus:outline-none focus:border-gold-500 transition-colors text-lg"
                       />
                    </div>
                    <div className="flex items-center justify-between">
                       <p className="text-xs text-jade-400 italic">No spam. Unsubscribe anytime.</p>
                       <button className="text-gold-600 uppercase tracking-widest text-xs font-bold hover:text-jade-900 transition-colors flex items-center gap-2 group">
                          Subscribe <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                       </button>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      </Section>
    </div>
  );
};

// --- MOCK DATA ---
// Added a real image URL here so the "Experience This" card works immediately
const CHONGQING_JOURNEY = {
  title: "Chongqing: The Cyberpunk City",
  image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop", 
  category: "Destinations"
};

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  // Assuming JOURNAL_ARTICLES is imported or defined in your full file
  const article = JOURNAL_ARTICLES.find(a => a.slug === slug);
  const [copySuccess, setCopySuccess] = useState(false);

  // Fallback journey for the sidebar
  const featuredJourney = CHONGQING_JOURNEY;

  if (!article) {
    return <Navigate to="/journal" replace />;
  }

  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(`Read "${article.title}" on Jade Atlas Journeys`);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    // FIX 1: pb-24 ensures white background extends to the very bottom to meet the footer
    <div className="bg-white min-h-screen pb-24">
       
       {/* 1. HERO SECTION */}
       <div className="relative h-[60vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-jade-950/20 z-10" />
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-jade-950/60 via-transparent to-transparent z-20" />
          
          <div className="absolute bottom-0 left-0 w-full z-30 px-6 pb-12 md:pb-20">
             <div className="max-w-7xl mx-auto">
                <span className="bg-gold-500 text-jade-950 px-3 py-1 text-[10px] uppercase tracking-widest font-bold mb-6 inline-block shadow-sm">
                  {article.category}
                </span>
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight max-w-5xl drop-shadow-md mb-6">
                  {article.title}
                </h1>
                
                {/* Metadata */}
                <div className="flex items-center gap-6 text-xs text-mist-50 uppercase tracking-widest font-medium">
                   <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold-500" />
                      <span>{article.readTime}</span>
                   </div>
                   {article.date && (
                     <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
                        <span>{article.date}</span>
                     </div>
                   )}
                </div>
             </div>
          </div>
       </div>

       {/* CONTENT CONTAINER - Removed mb-24 to fix the stripe issue */}
       <div className="max-w-7xl mx-auto px-6 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
             
             {/* 2. MAIN CONTENT (Left Column) */}
             {/* FIX 2: Added pr-12 on mobile so text doesn't hide behind the chat bubble */}
             <div className="md:col-span-8 lg:col-span-8 pr-12 md:pr-0">
                
                {/* The Article Text */}
                <div 
                   className="
                     text-jade-900 font-serif leading-loose
                     [&_p]:text-lg md:[&_p]:text-xl [&_p]:mb-8 [&_p]:leading-[1.8]
                     [&_h2]:text-3xl [&_h2]:font-sans [&_h2]:text-jade-950 [&_h2]:mt-16 [&_h2]:mb-6
                     [&_h3]:text-2xl [&_h3]:font-sans [&_h3]:text-gold-600 [&_h3]:mt-12 [&_h3]:mb-4
                     [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-8 [&_li]:text-lg [&_li]:mb-2 [&_li]:text-jade-800
                     
                     /* FIX 3: DROP CAP FIX 
                        - Removed negative margin that was causing the 'Bar' look
                        - Adjusted line-height to 0.8
                        - Reduced text size slightly on mobile for safety 
                     */
                     first-letter:text-5xl md:first-letter:text-6xl 
                     first-letter:font-bold first-letter:text-gold-500 
                     first-letter:float-left first-letter:mr-3 
                     first-letter:leading-[0.8]
                   "
                   dangerouslySetInnerHTML={{ __html: article.content }} 
                />

                {/* Footer Navigation */}
                <div className="mt-24 pt-12 border-t border-jade-100">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <Link to="/journal" className="text-xs uppercase tracking-widest font-bold text-jade-400 hover:text-gold-600 transition-colors">
                           &larr; Back to Journal
                        </Link>
                        <Button to="/collections" variant="secondary">Explore Related Journeys</Button>
                    </div>
                </div>
             </div>

             {/* 3. SIDEBAR (MOBILE OPTIMIZED) */}
             {/* Stacks at bottom on mobile, Sticky on Desktop */}
             <div className="col-span-1 md:col-span-4 lg:col-span-4 space-y-8 h-full mt-12 md:mt-0">
                
                <div className="relative md:sticky md:top-24 space-y-6 md:max-h-[85vh] md:overflow-y-auto pr-2 scrollbar-hide">
                   
                   {/* SOCIAL SHARE WIDGET */}
                   <div className="border-b border-jade-100 pb-8">
                      <span className="text-[10px] uppercase tracking-widest text-jade-400 font-bold block mb-6">Share this story</span>
                      <div className="flex gap-4">
                         
                         {/* Facebook */}
                         <a 
                           href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} 
                           target="_blank" 
                           rel="noreferrer"
                           className="w-10 h-10 border border-jade-200 flex items-center justify-center text-jade-600 hover:bg-jade-900 hover:text-gold-500 hover:border-jade-900 transition-all rounded-sm"
                         >
                            <Facebook className="w-4 h-4" />
                         </a>

                         {/* Pinterest */}
                         <a 
                           href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${article.image}&description=${shareText}`} 
                           target="_blank" 
                           rel="noreferrer"
                           className="w-10 h-10 border border-jade-200 flex items-center justify-center text-jade-600 hover:bg-jade-900 hover:text-gold-500 hover:border-jade-900 transition-all rounded-sm"
                         >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.487-.69-2.425-2.857-2.425-4.583 0-3.784 2.75-7.262 7.928-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z"/>
                            </svg>
                         </a>

                         {/* X (Twitter) */}
                         <a 
                           href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} 
                           target="_blank" 
                           rel="noreferrer"
                           className="w-10 h-10 border border-jade-200 flex items-center justify-center text-jade-600 hover:bg-jade-900 hover:text-gold-500 hover:border-jade-900 transition-all rounded-sm"
                         >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                         </a>

                         {/* Copy Link */}
                         <button 
                           onClick={handleCopyLink}
                           className="w-10 h-10 border border-jade-200 flex items-center justify-center text-jade-600 hover:bg-jade-900 hover:text-gold-500 hover:border-jade-900 transition-all rounded-sm relative"
                         >
                            {copySuccess ? <CheckCircle className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
                            {copySuccess && (
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-jade-900 text-gold-500 text-[9px] px-2 py-1 rounded shadow-lg uppercase tracking-widest whitespace-nowrap">Copied</span>
                            )}
                         </button>
                      </div>
                   </div>

                   {/* RELATED JOURNEY CARD */}
                   {/* FIX 4: Updated styles so image works */}
                   <div className="bg-mist-50 border border-jade-100 p-8 text-center shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 bg-gold-500 text-white text-[9px] uppercase tracking-widest px-3 py-1 font-bold">Recommended</div>
                      <h4 className="font-serif text-2xl text-jade-900 mb-4">Experience This</h4>
                      <p className="text-jade-600 text-sm leading-relaxed mb-6">
                         Don't just read about {article.category === 'Destinations' ? 'China' : 'this topic'}. See it for yourself.
                      </p>
                      <div className="aspect-[4/3] mb-6 overflow-hidden">
                         <img src={featuredJourney.image} alt="Journey" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <Button to="/collections/chongqing" variant="primary" className="w-full text-xs">View Journey</Button>
                   </div>

                   {/* NEWSLETTER */}
                   <div className="bg-jade-950 text-mist-50 p-8 text-center border border-jade-900">
                      <h4 className="font-serif text-xl text-gold-500 mb-2">The Dispatch</h4>
                      <p className="text-jade-300 text-xs mb-6">Rare stories and insights, delivered weekly.</p>
                      <input type="email" placeholder="Email Address" className="w-full bg-jade-900 border border-jade-700 text-white text-xs p-3 mb-4 focus:outline-none focus:border-gold-500 transition-colors rounded-sm" />
                      <button className="text-gold-500 uppercase tracking-widest text-[10px] font-bold hover:text-white transition-colors">Subscribe</button>
                   </div>

                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- UPDATED FAQ PAGE (Fixed Padding) ---
const FaqPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const displayedCategories = activeCategory === 'All' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(c => c.category === activeCategory);

  return (
    // FIX: Changed pt-32 to pt-20
    <div className="pt-20 pb-24 min-h-screen bg-mist-50">
       <Section>
          <div className="text-center mb-20">
             <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-4 block animate-fade-in">Support</span>
             <h1 className="font-serif text-5xl md:text-6xl text-jade-900 mb-6 animate-fade-in-up">Frequently Asked Questions</h1>
             <p className="text-jade-600 text-lg max-w-2xl mx-auto animate-fade-in-up">
               Everything you need to know before, during, and after your journey.
             </p>
          </div>

          <div className="grid md:grid-cols-12 gap-12 max-w-6xl mx-auto">
             <div className="md:col-span-3">
               <div className="sticky top-32">
                 <h3 className="font-serif text-xl text-jade-900 mb-6 px-4">Categories</h3>
                 <div className="flex flex-col space-y-1">
                   <button
                     onClick={() => setActiveCategory('All')}
                     className={`text-left px-4 py-3 text-sm transition-all rounded-sm flex justify-between items-center group ${
                       activeCategory === 'All' 
                         ? 'bg-jade-900 text-gold-500 font-medium shadow-md' 
                         : 'text-jade-600 hover:bg-jade-100 hover:text-jade-900'
                     }`}
                   >
                     All
                     {activeCategory === 'All' && <ChevronDown className="w-4 h-4 -rotate-90" />}
                   </button>
                   
                   {FAQ_DATA.map((cat) => (
                     <button
                       key={cat.category}
                       onClick={() => setActiveCategory(cat.category)}
                       className={`text-left px-4 py-3 text-sm transition-all rounded-sm flex justify-between items-center group ${
                         activeCategory === cat.category 
                           ? 'bg-jade-900 text-gold-500 font-medium shadow-md' 
                           : 'text-jade-600 hover:bg-jade-100 hover:text-jade-900'
                       }`}
                     >
                       {cat.category}
                       {activeCategory === cat.category && <ChevronDown className="w-4 h-4 -rotate-90" />}
                     </button>
                   ))}
                 </div>
                 <div className="mt-12 bg-white p-6 border border-jade-100 shadow-sm">
                    <p className="font-serif text-lg text-jade-900 mb-2">Need personal assistance?</p>
                    <p className="text-xs text-jade-600 mb-4">Our concierge team is available for bespoke enquiries.</p>
                    <Button to="/contact" variant="text" className="!p-0 !border-0 text-gold-600 hover:text-gold-700">Contact Concierge &rarr;</Button>
                 </div>
               </div>
             </div>

             <div className="md:col-span-9 space-y-12">
                {displayedCategories.map((cat) => (
                  <div key={cat.category} className="animate-fade-in">
                     <div className="mb-8 border-b border-jade-200 pb-4">
                        <h2 className="font-serif text-3xl text-jade-900">{cat.category}</h2>
                     </div>
                     <div className="bg-white border border-jade-100 shadow-sm p-8 md:p-12">
                        <div className="space-y-2">
                           {cat.items.map((item, idx) => (
                              <FaqAccordion key={idx} question={item.q} answer={item.a} />
                           ))}
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </Section>
    </div>
  );
};

// --- UPDATED CONTACT PAGE (Stationery Style + Fixes + Dropdown Fixes) ---
const ContactPage: React.FC = () => {
   const [submitted, setSubmitted] = useState(false);
   const [phoneNumber, setPhoneNumber] = useState('');
   const [phoneCode, setPhoneCode] = useState('+1');
   const [residence, setResidence] = useState('');
   const [marketingOptIn, setMarketingOptIn] = useState(false);

   const handleResidenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedName = e.target.value;
      setResidence(selectedName);
      
      const countryData = COUNTRY_DATA.find(c => c.name === selectedName);
      if (countryData) {
         setPhoneCode(countryData.dial);
      }
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      window.scrollTo(0,0);
   };

   // Input Style
   const inputClasses = "w-full bg-white border border-jade-200 p-4 text-jade-900 placeholder:text-jade-300 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all duration-300 rounded-sm";
   const labelClasses = "block text-[10px] uppercase tracking-widest font-bold text-gold-600 mb-2";

   return (
     <div className="pt-20 min-h-screen bg-mist-50">
        <Section className="!pt-10 md:!pt-16">
           <div className="grid md:grid-cols-12 gap-16 max-w-7xl mx-auto items-start">
              
              {/* LEFT COLUMN: The Concierge */}
              <div className="md:col-span-4 space-y-12">
                 <div>
                    <span className="text-gold-500 uppercase tracking-widest text-xs font-bold mb-6 block">The Studio</span>
                    <h1 className="font-serif text-5xl text-jade-900 mb-6">Begin the Dialogue</h1>
                    <p className="text-jade-700 leading-relaxed text-lg">
                       Every journey begins with a conversation. Whether you are ready to reserve or simply exploring possibilities, our curators are here to listen and respond with care.
                    </p>
                 </div>

                 <div className="space-y-8 border-t border-jade-200 pt-8">
                    <div className="group">
                       <div className="flex items-center gap-3 mb-2">
                          <MessageSquare className="w-5 h-5 text-gold-500" strokeWidth={1.5} />
                          <h4 className="font-serif text-xl text-jade-900">Concierge</h4>
                       </div>
                       <div className="pl-8">
                          <p className="text-jade-600 text-sm mb-1">concierge@jadeatlasjourneys.com</p>
                          <p className="text-jade-400 text-xs italic">Our team replies within 24 hours</p>
                       </div>
                    </div>

                    <div className="group">
                       <div className="flex items-center gap-3 mb-2">
                          <MapPin className="w-5 h-5 text-gold-500" strokeWidth={1.5} />
                          <h4 className="font-serif text-xl text-jade-900">Shanghai Studio</h4>
                       </div>
                       <div className="pl-8">
                          <p className="text-jade-600 text-sm leading-relaxed">
                             123 The Bund, Huangpu District<br/>Shanghai, China
                          </p>
                       </div>
                    </div>

                    <div className="group">
                       <div className="flex items-center gap-3 mb-2">
                          <Compass className="w-5 h-5 text-gold-500" strokeWidth={1.5} />
                          <h4 className="font-serif text-xl text-jade-900">Planning Assistance</h4>
                       </div>
                       <div className="pl-8">
                          <p className="text-jade-600 text-sm leading-relaxed mb-4">
                             Unsure which collection suits your pace? We can help match your dates, interests, and comfort level to the right journey.
                          </p>
                          <button 
                            onClick={(e) => { e.preventDefault(); document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }); }} 
                            className="text-xs uppercase tracking-widest text-jade-900 border-b border-gold-500 pb-1 hover:text-gold-600 transition-colors"
                          >
                             Start an Enquiry
                          </button>
                       </div>
                    </div>
                 </div>
              </div>

              {/* RIGHT COLUMN: The Form */}
              <div className="md:col-span-8">
                 <div id="contact-form" className="bg-white p-8 md:p-12 shadow-2xl border-t-4 border-gold-500 relative">
                    
                    {submitted ? (
                       <div className="text-center py-24">
                          <div className="w-20 h-20 bg-jade-50 text-gold-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-jade-100">
                             <CheckCircle className="w-10 h-10" strokeWidth={1.5}/>
                          </div>
                          <h3 className="font-serif text-4xl text-jade-900 mb-6">Request Received</h3>
                          <p className="text-jade-600 text-lg leading-relaxed max-w-lg mx-auto">
                             Thank you for contacting Jade Atlas Journeys. A curator will review your enquiry and respond personally within 24 hours.
                          </p>
                          <Button to="/" variant="secondary" className="mt-12">Return to Home</Button>
                       </div>
                    ) : (
                       <form onSubmit={handleSubmit} className="space-y-8">
                          {/* Row 1: Name */}
                          <div className="grid md:grid-cols-2 gap-8">
                             <div>
                                <label className={labelClasses}>First Name <span className="text-red-400">*</span></label>
                                <input type="text" className={inputClasses} required />
                             </div>
                             <div>
                                <label className={labelClasses}>Last Name <span className="text-red-400">*</span></label>
                                <input type="text" className={inputClasses} required />
                             </div>
                          </div>

                          {/* Row 2: Contact */}
                          <div className="grid md:grid-cols-2 gap-8">
                             <div>
                                <label className={labelClasses}>Email Address <span className="text-red-400">*</span></label>
                                <input type="email" className={inputClasses} required />
                             </div>
                             <div>
                                <PhoneInput 
                                  value={phoneNumber} 
                                  countryCode={phoneCode} 
                                  onValueChange={setPhoneNumber}
                                  onCountryChange={setPhoneCode}
                                  required
                                />
                             </div>
                          </div>
                          
                          {/* Row 3: Country & Interest */}
                          <div className="grid md:grid-cols-2 gap-8">
                             <div>
                                <label className={labelClasses}>Country of Residence <span className="text-red-400">*</span></label>
                                <select 
                                  value={residence}
                                  onChange={handleResidenceChange}
                                  className={`${inputClasses} bg-white text-jade-900`} 
                                  required
                                >
                                   <option value="" className="bg-white text-jade-300">Select Country</option>
                                   {COUNTRY_DATA.map(c => (
                                     <option key={c.code} value={c.name} className="bg-white text-jade-900">{c.name}</option>
                                   ))}
                                </select>
                             </div>
                             <div>
                                <label className={labelClasses}>Nature of Enquiry <span className="text-red-400">*</span></label>
                                <select className={`${inputClasses} bg-white text-jade-900`} required>
                                   <option value="" className="bg-white text-jade-300">Select an option...</option>
                                   <option className="bg-white text-jade-900">I wish to reserve a Signature Collection</option>
                                   <option className="bg-white text-jade-900">I wish to design a Custom Journey</option>
                                   <option className="bg-white text-jade-900">I have a question about a specific itinerary</option>
                                   <option className="bg-white text-jade-900">Press or Partnership Enquiry</option>
                                   <option className="bg-white text-jade-900">Other Assistance</option>
                                </select>
                             </div>
                          </div>

                          {/* Row 4: Message */}
                          <div>
                             <label className={labelClasses}>Your Narrative <span className="text-red-400">*</span></label>
                             <textarea 
                               rows={6} 
                               className={inputClasses} 
                               placeholder="Tell us about your travel style, interests, and what you hope this journey will feel like."
                               required
                             ></textarea>
                          </div>

                          {/* Row 5: Checkboxes */}
                          <div className="space-y-4 pt-4 border-t border-jade-50">
                             <div className="flex items-start gap-3">
                                <input type="checkbox" required className={PREMIUM_CHECKBOX_CLASSES} />
                                {/* FIX: Reverted to text-xs to match original request */}
                                <p className="text-xs text-jade-500 leading-relaxed">
                                  I have read and agree to the <Link to="/privacy" className="underline hover:text-jade-900">Privacy Policy</Link>.
                                </p>
                             </div>
                             <div className="flex items-start gap-3">
                                <input 
                                  type="checkbox" 
                                  className={PREMIUM_CHECKBOX_CLASSES}
                                  checked={marketingOptIn}
                                  onChange={(e) => setMarketingOptIn(e.target.checked)}
                                />
                                {/* FIX: Reverted to text-xs to match original request */}
                                <p className="text-xs text-jade-500 leading-relaxed">
                                  I would like to receive curated travel inspiration and news from Jade Atlas Journeys. (Optional)
                                </p>
                             </div>
                          </div>

                          <div className="pt-4">
                             <Button variant="primary" className="w-full md:w-auto px-12 py-4 shadow-lg hover:shadow-xl transition-all">
                               Begin the Conversation
                             </Button>
                          </div>
                       </form>
                    )}
                 </div>
              </div>
           </div>
        </Section>
     </div>
   );
};

// --- UPDATED BOOKING PAGE (Fixed Padding) ---
const BookingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<string | null>(null);
  const [travelers, setTravelers] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0,0);
  };

  return (
    // FIX: Changed pt-32 to pt-20
    <div className="pt-20 pb-24 min-h-screen bg-mist-50">
      <Section>
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12">
           <div className="md:col-span-8">
              <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-4 block">Secure Your Journey</span>
              <h1 className="font-serif text-4xl text-jade-900 mb-8">
                {step === 1 ? 'Step 1 of 2: Journey Details' : 'Request Received'}
              </h1>
              
              {step === 1 ? (
                <form onSubmit={handleSubmit} className="bg-white p-10 border border-jade-100 shadow-sm space-y-10">
                   <div>
                      <h3 className="text-xs uppercase tracking-widest font-bold text-jade-900 border-b border-jade-100 pb-4 mb-6">Lead Guest Information</h3>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                         <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-jade-400 mb-2">First Name</label>
                            <input type="text" className="w-full bg-mist-50 border border-jade-100 p-3 text-jade-900 focus:bg-white focus:outline-none focus:border-gold-500 transition-colors" required />
                         </div>
                         <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-jade-400 mb-2">Last Name</label>
                            <input type="text" className="w-full bg-mist-50 border border-jade-100 p-3 text-jade-900 focus:bg-white focus:outline-none focus:border-gold-500 transition-colors" required />
                         </div>
                      </div>
                      <div>
                         <label className="block text-[10px] uppercase tracking-widest font-bold text-jade-400 mb-2">Email Address</label>
                         <input type="email" className="w-full bg-mist-50 border border-jade-100 p-3 text-jade-900 focus:bg-white focus:outline-none focus:border-gold-500 transition-colors" required />
                      </div>
                   </div>

                   <div>
                      <h3 className="text-xs uppercase tracking-widest font-bold text-jade-900 border-b border-jade-100 pb-4 mb-6">Journey Preferences</h3>
                      
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-jade-400 mb-2">Travel Party Size</label>
                          <TravelerCounter count={travelers} onChange={setTravelers} min={1} max={6} />
                        </div>
                        <div>
                           <label className="block text-[10px] uppercase tracking-widest font-bold text-jade-400 mb-2">Selected Date</label>
                           <div className="p-3 bg-mist-50 border border-jade-100 text-jade-900 text-sm font-medium h-[42px] flex items-center">
                             {date || 'Select a date below'}
                           </div>
                        </div>
                      </div>

                      <div className="mb-8">
                         <label className="block text-[10px] uppercase tracking-widest font-bold text-jade-400 mb-4">Select Departure Date</label>
                         <JourneyCalendar onSelectDate={setDate} selectedDate={date} />
                      </div>

                      <div className="mb-6">
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-jade-400 mb-2">Mobility or Dietary Notes</label>
                        <textarea className="w-full bg-mist-50 border border-jade-100 p-3 text-jade-900 focus:bg-white focus:outline-none focus:border-gold-500 transition-colors" placeholder="Optional" rows={3}></textarea>
                      </div>
                   </div>

                   <div className="flex items-start gap-3 pt-6 border-t border-jade-50">
                      <input type="checkbox" required className={PREMIUM_CHECKBOX_CLASSES} />
                      <p className="text-xs text-jade-500">I confirm I have read the <Link to="/bookingconditions" className="underline hover:text-jade-900">Booking Conditions</Link>.</p>
                   </div>
                   
                   <Button variant="primary" className="w-full" disabled={!date}>Proceed to Review</Button>
                </form>
              ) : (
                <div className="bg-white p-12 border border-jade-100 text-center shadow-lg">
                   <div className="w-20 h-20 bg-jade-900 text-gold-500 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle className="w-10 h-10"/>
                   </div>
                   <h2 className="font-serif text-3xl text-jade-900 mb-6">Reservation Request Confirmed</h2>
                   <p className="text-jade-700 leading-relaxed mb-8 max-w-xl mx-auto">
                      Thank you. Your request for the Chongqing Collection has been securely received. A Journey Designer will review your preferences and contact you within 24 hours to finalize details and arrange the deposit.
                   </p>

                   <div className="bg-mist-50 p-6 inline-block text-left border border-jade-200 mb-8 min-w-[300px]">
                      <p className="text-xs uppercase tracking-widest text-jade-400 mb-1">Reference</p>
                      <p className="font-serif text-xl text-jade-900 mb-4">#JA-2025-8821</p>
                      <p className="text-xs uppercase tracking-widest text-jade-400 mb-1">Next Step</p>
                      <p className="text-sm text-jade-700">Consultation Call</p>
                   </div>
                   <div className="block">
                      <Button to="/" variant="secondary">Return to Home</Button>
                   </div>
                </div>
              )}
           </div>

           <div className="md:col-span-4">
              <div className="sticky top-32">
                 <PricingCard 
                   title={CHONGQING_JOURNEY.title} 
                   price={CHONGQING_JOURNEY.basePrice} 
                   status="available"
                   variant="light" 
                   className="shadow-xl"
                   showTravelerControl={false} // Hide control on summary card since we control it in form
                 />
                 <div className="mt-6 bg-jade-900/5 p-6 border border-jade-100 text-xs text-jade-600 leading-relaxed">
                    <p className="mb-2 font-bold text-jade-900">Secure Process</p>
                    <p>We do not capture payment immediately. This form initiates a hold on your preferred dates while we verify availability and arrange your consultation.</p>
                 </div>
              </div>
           </div>
        </div>
      </Section>
    </div>
  );
};

// --- UPDATED ACCOUNT PAGE (Fixed Padding) ---
const AccountPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
      return (
        // FIX: Changed pt-32 to pt-20
        <div className="pt-20 pb-24 min-h-screen bg-mist-50 flex items-center justify-center px-6">
           <div className="max-w-md w-full bg-white p-10 border border-jade-100 shadow-2xl">
              <div className="text-center mb-8">
                 <h1 className="font-serif text-3xl text-jade-900 mb-2">Guest Sanctuary</h1>
                 <p className="text-jade-500 text-xs uppercase tracking-widest">Sign in to view your journey</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-6">
                 <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-jade-400 mb-2">Email</label>
                    <input type="email" className="w-full bg-mist-50 border border-jade-100 p-3 text-jade-900 focus:bg-white focus:outline-none focus:border-gold-500 transition-colors" required />
                 </div>
                 <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-jade-400 mb-2">Booking Reference</label>
                    <input type="text" className="w-full bg-mist-50 border border-jade-100 p-3 text-jade-900 focus:bg-white focus:outline-none focus:border-gold-500 transition-colors" required />
                 </div>
                 <Button variant="primary" className="w-full">Access Journey</Button>
              </form>
           </div>
        </div>
      );
  }

  return (
    // FIX: Changed pt-32 to pt-20
    <div className="pt-20 pb-24 min-h-screen bg-mist-50">
       <Section>
          <div className="flex justify-between items-end mb-12 border-b border-jade-200 pb-6">
             <div>
                <h1 className="font-serif text-4xl text-jade-900 mb-2">Welcome, Eleanor</h1>
                <p className="text-jade-600">Upcoming Journey: October 2025</p>
             </div>
             <Button variant="outline" onClick={() => setIsLoggedIn(false)}>Sign Out</Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
             <div className="md:col-span-2 space-y-8">
                <div className="bg-white p-8 border border-jade-100 shadow-sm relative overflow-hidden group">
                   <div className="absolute top-0 right-0 bg-gold-500 text-white text-[10px] uppercase tracking-widest px-4 py-1 font-bold">Confirmed</div>
                   <div className="flex gap-6">
                      <img src={CHONGQING_JOURNEY.image} className="w-32 h-32 object-cover" alt="Journey thumbnail"/>
                      <div>
                         <h3 className="font-serif text-2xl text-jade-900 mb-2">{CHONGQING_JOURNEY.title}</h3>
                         <p className="text-sm text-jade-600 mb-4">Oct 12 - Oct 19, 2025 • 2 Guests</p>
                         <div className="flex gap-4">
                            <button className="text-xs uppercase tracking-widest text-jade-900 border-b border-gold-500 pb-1 hover:text-gold-600">Download Itinerary</button>
                            <button className="text-xs uppercase tracking-widest text-jade-900 border-b border-jade-200 pb-1 hover:text-gold-600">View Invoice</button>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-white p-8 border border-jade-100 shadow-sm">
                   <h3 className="font-serif text-xl text-jade-900 mb-6">Pre-Departure Checklist</h3>
                   <ul className="space-y-4">
                      {[
                         { label: "Visa Invitation Letter Issued", status: "Complete" },
                         { label: "Passenger Details Form", status: "Pending", action: true },
                         { label: "Dietary Preferences", status: "Complete" },
                         { label: "Flight Details", status: "Pending", action: true }
                      ].map((item, i) => (
                         <li key={i} className="flex justify-between items-center border-b border-jade-50 pb-4 last:border-0 last:pb-0">
                            <span className="text-jade-700 text-sm">{item.label}</span>
                            {item.action ? (
                               <button className="text-xs text-gold-600 font-bold uppercase hover:underline">Complete Now</button>
                            ) : (
                               <span className="text-xs text-jade-400 uppercase flex items-center gap-2"><CheckCircle className="w-3 h-3"/> {item.status}</span>
                            )}
                         </li>
                      ))}
                   </ul>
                </div>
             </div>
             
             <div>
                <div className="bg-jade-900 text-mist-50 p-8">
                   <h3 className="font-serif text-xl text-gold-500 mb-4">Your Concierge</h3>
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-jade-800 rounded-full flex items-center justify-center font-serif text-xl">L</div>
                      <div>
                         <p className="text-sm font-bold">Li Wei</p>
                         <p className="text-xs text-jade-400">Senior Journey Designer</p>
                      </div>
                   </div>
                   <p className="text-sm text-jade-300 leading-relaxed mb-6">
                      "I am currently finalizing your private dinner at the rock carvings. I will upload the updated voucher by Friday."
                   </p>
                   <Button variant="outline" className="w-full !border-jade-700 hover:!bg-jade-800 !text-mist-50">Message Li Wei</Button>
                </div>
             </div>
          </div>
       </Section>
    </div>
  );
};

// --- UPDATED LEGAL PAGE (Fixed Padding) ---
const LegalPage: React.FC<{ 
  type: 'terms' | 'privacy' | 'booking';
}> = ({ type }) => {
  const content = {
    terms: {
      title: "Terms of Service",
      subtitle: "The framework of our digital relationship.",
      lastUpdated: "January 15, 2025"
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "How we protect your personal narrative.",
      lastUpdated: "January 10, 2025"
    },
    booking: {
      title: "Booking Conditions",
      subtitle: "The agreement guiding your journey.",
      lastUpdated: "December 01, 2024"
    }
  };

  const { title, subtitle, lastUpdated } = content[type];

  return (
    // FIX: Changed pt-32 to pt-20
    <div className="pt-20 pb-24 min-h-screen bg-mist-50">
       <div className="max-w-4xl mx-auto px-6 mb-16 text-center">
          <span className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-4 block animate-fade-in">Legal Framework</span>
          <h1 className="font-serif text-5xl md:text-6xl text-jade-900 mb-6 animate-fade-in-up">{title}</h1>
          <p className="text-jade-600 text-lg font-serif italic animate-fade-in-up" style={{ animationDelay: '0.1s' }}>{subtitle}</p>
       </div>

       <div className="max-w-4xl mx-auto px-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white p-12 md:p-16 shadow-2xl border-t-4 border-gold-500 relative">
             <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
                <FileText className="w-32 h-32 text-jade-900" />
             </div>

             <div className="mb-12 border-b border-jade-100 pb-8 flex justify-between items-end">
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-jade-400 font-bold mb-1">Document Status</p>
                   <p className="text-jade-900 text-sm font-medium">Active & Enforceable</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] uppercase tracking-widest text-jade-400 font-bold mb-1">Last Updated</p>
                   <p className="text-jade-900 text-sm font-medium">{lastUpdated}</p>
                </div>
             </div>

             <div className="prose prose-jade prose-lg text-jade-800 max-w-none leading-loose">
                {type === 'terms' && (
                  <>
                    <h3>1. Overview</h3>
                    <p>These Terms of Service (“Terms”) explain how you may use the website and services of <strong>Jade Atlas Journeys</strong> (“Jade Atlas Journeys”, “we”, “us”, “our”).</p>
                    <p>By using our website, making an enquiry, or booking a tour with us, you agree to be bound by:</p>
                    <ul>
                      <li>these <strong>Terms of Service</strong></li>
                      <li>our <strong>Booking Conditions</strong></li>
                      <li>our <strong>Privacy Policy</strong></li>
                    </ul>
                    <p>If you do not agree, please do not use our website or services.</p>
                    <hr />
                    <h3>2. Who We Are and What We Do</h3>
                    <p>Jade Atlas Journeys is an international travel company that designs, markets, and sells small-group and custom tours in China.</p>
                  </>
                )}

                {type === 'booking' && (
                  <>
                    <h3>1. Contract Formation</h3>
                    <p>A booking is confirmed and a contract is formed when you submit a booking request and we issue a Booking Confirmation.</p>
                    <hr />
                    <h3>2. What Is Included and Excluded</h3>
                    <h4>2.1 Included in the Tour Price</h4>
                    <p>Unless otherwise stated in your specific itinerary, the tour price generally includes accommodation, daily breakfasts, selected lunches and dinners, all ground transportation, entry tickets, and a dedicated tour escort.</p>
                  </>
                )}

                {type === 'privacy' && (
                   <>
                    <h3>1. Who We Are</h3>
                    <p>Jade Atlas Journeys is the controller of your personal data for the purposes described here.</p>
                    <hr />
                    <h3>2. What Data We Collect</h3>
                    <p>We may collect identification details, travel information, and payment metadata.</p>
                   </>
                )}
             </div>

             <div className="mt-16 pt-10 border-t border-jade-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-jade-50 rounded-full flex items-center justify-center text-jade-900 font-serif font-bold text-xl">JA</div>
                   <div>
                      <p className="font-serif text-lg text-jade-900">Jade Atlas Journeys</p>
                      <p className="text-xs text-jade-500 uppercase tracking-widest">Legal Department</p>
                   </div>
                </div>
                <Button to="/" variant="text">Return to Home</Button>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- App Component ---
const App: React.FC = () => {
  const [currency, setCurrency] = useState(Currency.USD);

  return (
    <HashRouter>
      <CurrencyContext.Provider value={{ currency, setCurrency }}>
        <Layout>
          <ScrollToTop />
          <Concierge />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/chongqing" element={<ChongqingPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/journal/:slug" element={<ArticlePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/account" element={<AccountPage />} />
            
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/bookingconditions" element={<LegalPage type="booking" />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </CurrencyContext.Provider>
    </HashRouter>
  );
};

export default App;