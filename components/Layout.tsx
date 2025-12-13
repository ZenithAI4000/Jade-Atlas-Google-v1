import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Instagram, Facebook, Youtube, MessageSquare } from 'lucide-react';
import { Currency, PricePoint } from '../types';

// --- Shared State Context for Currency ---
export const CurrencyContext = React.createContext<{
  currency: Currency;
  setCurrency: (c: Currency) => void;
}>({ currency: Currency.USD, setCurrency: () => {} });

// --- Helper Components ---

// OFFICIAL WHATSAPP ICON
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// OFFICIAL WECHAT ICON
export const WeChatIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8.2 2.9c-4.5 0-8.2 3.2-8.2 7.2 0 2.2 1.2 4.2 3 5.6-.2.7-.8 1.9-1 2.2 0 0-.2.2 0 .3.2.1.4 0 .5-.1 1.7-.8 3.3-1.8 3.3-1.8.8.2 1.6.3 2.4.3.1-4 3.7-7.2 8.1-7.2h.2c-.8-3.6-4.6-6.5-8.3-6.5zm-2.5 4.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm5.3 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"/>
    <path d="M16.4 10.2c-4.1 0-7.3 2.9-7.3 6.4 0 1.9.9 3.6 2.4 4.8 0 0-1.2 1.9-1.3 2.2 0 0-.1.2.1.2.2 0 .3 0 .4-.1 1.6-.9 3.2-2.1 3.2-2.1.7.2 1.5.3 2.3.3 4.1 0 7.3-2.9 7.3-6.4s-3.2-5.3-7.1-5.3zm-2.7 3.3c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7zm5.2 0c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z"/>
  </svg>
);

// --- BUTTON COMPONENT (Luxury & Outline Support) ---
export const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'outline-dark';
  onClick?: () => void;
  to?: string;
  className?: string;
  disabled?: boolean;
}> = ({ children, variant = 'primary', onClick, to, className = '', disabled }) => {
  
  const baseStyle = "inline-flex items-center justify-center px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-500 ease-out font-sans font-bold disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-jade-900 text-white border border-jade-900 hover:bg-gold-500 hover:border-gold-500 hover:text-jade-900",
    secondary: "bg-gold-500 text-jade-900 border border-gold-500 hover:bg-white hover:border-white hover:text-jade-900",
    outline: "bg-transparent text-mist-50 border border-mist-50 hover:bg-white hover:text-jade-900 hover:border-white",
    "outline-dark": "bg-transparent text-jade-900 border border-jade-900 hover:bg-jade-900 hover:text-white",
    text: "px-0 py-2 border-b border-gold-500 text-jade-900 hover:text-gold-600 hover:border-jade-900 bg-transparent"
  };

  const combinedClasses = `${baseStyle} ${variants[variant]} ${className}`;

  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} disabled={disabled} className={combinedClasses}>
      {children}
    </button>
  );
};

// --- Counter Component for Travelers ---
export const TravelerCounter: React.FC<{
  count: number;
  onChange: (newCount: number) => void;
  min?: number;
  max?: number;
}> = ({ count, onChange, min = 1, max = 10 }) => {
  return (
    <div className="flex items-center gap-4 bg-white border border-jade-200 rounded-sm px-3 py-2 shadow-sm">
      <button 
        onClick={(e) => { e.preventDefault(); count > min && onChange(count - 1); }}
        disabled={count <= min}
        className="w-6 h-6 flex items-center justify-center text-jade-900 hover:text-gold-600 disabled:opacity-30 transition-colors text-lg font-serif"
      >
        -
      </button>
      <span className="font-sans text-sm font-bold text-jade-900 w-4 text-center">{count}</span>
      <button 
        onClick={(e) => { e.preventDefault(); count < max && onChange(count + 1); }}
        disabled={count >= max}
        className="w-6 h-6 flex items-center justify-center text-jade-900 hover:text-gold-600 disabled:opacity-30 transition-colors text-lg font-serif"
      >
        +
      </button>
    </div>
  );
};

// --- Pricing Card (Refined Typography) ---
export const PricingCard: React.FC<{
  title: string;
  price: PricePoint;
  subtitle?: string;
  variant?: 'light' | 'dark' | 'glass' | 'minimal';
  status?: 'available' | 'coming_soon';
  launchDate?: string;
  className?: string;
  showTravelerControl?: boolean;
}> = ({ title, price, subtitle, variant = 'light', status = 'available', launchDate, className = '', showTravelerControl = true }) => {
  const { currency } = React.useContext(CurrencyContext);
  const [travelers, setTravelers] = useState(2);
  
  const isSingle = travelers === 1;
  const basePerPerson = price ? price[currency] : 0;
  const singleSupplement = isSingle ? basePerPerson * 0.30 : 0;
  const finalPerPerson = basePerPerson + singleSupplement;
  const total = finalPerPerson * travelers;

  const formatPrice = (val: number, curr: Currency) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: curr, maximumFractionDigits: 0 }).format(val);
  };

  const variantStyles = {
    light: "bg-white border border-jade-100 shadow-lg text-jade-900",
    dark: "bg-jade-950 border border-jade-900 text-mist-50 shadow-2xl",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl",
    minimal: "bg-transparent border-l-2 border-gold-500 pl-6 text-jade-900"
  };

  const textColors = {
    light: { title: "text-jade-900", sub: "text-jade-600", label: "text-jade-400", price: "text-gold-600", divider: "border-jade-50" },
    dark: { title: "text-mist-50", sub: "text-jade-300", label: "text-jade-500", price: "text-gold-400", divider: "border-jade-800" },
    glass: { title: "text-white", sub: "text-mist-100", label: "text-mist-200", price: "text-white", divider: "border-white/20" },
    minimal: { title: "text-jade-900", sub: "text-jade-600", label: "text-jade-400", price: "text-gold-600", divider: "border-jade-100" }
  };
  
  const c = textColors[variant];
  const isMinimal = variant === 'minimal';
  const isAvailable = status === 'available';

  return (
    <div className={`${variantStyles[variant]} ${isMinimal ? 'p-0' : 'p-8 md:p-10'} relative overflow-hidden transition-all duration-700 group flex flex-col h-full ${className} ${!isAvailable ? 'opacity-90' : ''}`}>
      {!isMinimal && isAvailable && (
        <div className="absolute top-0 left-0 w-1 h-full bg-gold-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
      )}
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
           <div className="flex justify-between items-start gap-4">
             <h3 className={`font-serif text-3xl ${c.title} mb-2 leading-tight`}>{title}</h3>
             {!isAvailable && (
               <span className="shrink-0 text-[10px] uppercase tracking-widest bg-mist-100 text-jade-600 px-2 py-1 rounded font-bold">In Curation</span>
             )}
           </div>
          {subtitle && <p className={`text-sm font-sans leading-relaxed ${c.sub} mt-2`}>{subtitle}</p>}
        </div>
        
        <div className="mt-auto flex-grow flex flex-col justify-end">
          {isAvailable ? (
            <>
              {showTravelerControl && !isMinimal && (
                <div className="mb-6 flex justify-between items-center">
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${c.label}`}>Travelers</span>
                  <TravelerCounter count={travelers} onChange={setTravelers} />
                </div>
              )}

              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <span className={`text-[10px] uppercase tracking-widest font-bold ${c.label} self-center`}>Total Estimate</span>
                <span className={`text-3xl md:text-4xl font-serif ${c.price}`}>
                  {price ? formatPrice(total, currency) : 'TBD'}
                </span>
              </div>
              
              {isSingle && showTravelerControl && !isMinimal && (
                <p className="text-[10px] text-gold-600 italic mb-2">
                  * Includes Single Supplement
                </p>
              )}

              {!isMinimal && (
                <div className={`text-[10px] font-sans border-t pt-4 leading-relaxed opacity-80 ${c.divider} ${c.sub}`}>
                  Based on {travelers} guest{travelers > 1 ? 's' : ''}.<br/>Excluding international airfare.
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col justify-end h-full">
               <div className="mb-2">
                 <span className={`text-[10px] uppercase tracking-widest font-bold ${c.label}`}>Launch</span>
               </div>
               <span className={`text-2xl md:text-3xl font-serif italic ${c.price}`}>
                  {launchDate || 'Coming Soon'}
               </span>
               {!isMinimal && (
                <div className={`text-[10px] font-sans border-t pt-4 mt-4 leading-relaxed opacity-80 ${c.divider} ${c.sub}`}>
                  Pricing and itinerary details will be released to waitlist members first.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Navigation (Polished & Smooth) ---
const Navigation: React.FC<{ isScrolled: boolean, isMobileMenuOpen: boolean, setIsMobileMenuOpen: (v: boolean) => void }> = ({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { currency, setCurrency } = React.useContext(CurrencyContext);
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  const isTransparent = isHome && !isScrolled && !isMobileMenuOpen;
  
  const navClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
    isTransparent ? 'bg-transparent py-8' : 'bg-jade-950/95 backdrop-blur-md py-4 shadow-xl'
  }`;

  const linkClasses = `text-xs uppercase tracking-[0.15em] font-bold hover:text-gold-500 transition-colors ${
    isTransparent ? 'text-mist-50' : 'text-mist-50'
  }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className={`font-serif text-2xl tracking-[0.05em] font-semibold shrink-0 pr-8 z-50 relative transition-colors ${isTransparent ? 'text-white' : 'text-mist-50'}`}>
          JADE ATLAS JOURNEYS
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link to="/collections" className={linkClasses}>Collections</Link>
          <Link to="/journal" className={linkClasses}>Journal</Link>
          <Link to="/about" className={linkClasses}>About</Link>
          <Link to="/contact" className={linkClasses}>Contact</Link>
          
          <div className="h-4 w-px bg-white/30 mx-2"></div>
          
          <button 
            onClick={() => setCurrency(currency === Currency.USD ? Currency.CNY : Currency.USD)} 
            className={`flex items-center gap-2 text-xs uppercase tracking-widest hover:text-gold-500 transition-colors font-bold ${isTransparent ? 'text-white' : 'text-mist-50'}`}
          >
            <Globe className="w-3 h-3" />
            {currency}
          </button>
          
          <Button 
            to="/book" 
            variant={isTransparent ? "outline" : "secondary"} 
            className={isTransparent ? "" : "!py-3 !px-6"}
          >
            Reserve
          </Button>
        </div>

        <button className="md:hidden z-50 text-gold-500 focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className={`fixed inset-0 bg-jade-950/98 backdrop-blur-lg z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
           <Link to="/collections" className="font-serif text-4xl text-mist-50 hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
           <Link to="/journal" className="font-serif text-4xl text-mist-50 hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Journal</Link>
           <Link to="/about" className="font-serif text-4xl text-mist-50 hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
           <Link to="/contact" className="font-serif text-4xl text-mist-50 hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
           <div className="pt-8">
              <Button to="/book" variant="secondary" onClick={() => setIsMobileMenuOpen(false)}>Reserve Journey</Button>
           </div>
        </div>
      </div>
    </nav>
  );
};

// --- Footer (Refined Layout) ---
const Footer: React.FC = () => {
  const [showWeChat, setShowWeChat] = useState(false);

  return (
    <footer className="bg-jade-950 text-jade-300 pt-20 border-t border-jade-900 relative">
      {/* WeChat Modal Overlay */}
      {showWeChat && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-jade-950/80 backdrop-blur-md animate-fade-in" onClick={() => setShowWeChat(false)}>
           <div className="bg-white p-6 md:p-8 rounded-sm shadow-2xl max-w-sm w-full relative border border-jade-100 animate-fade-in-up" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setShowWeChat(false)} 
                className="absolute top-3 right-3 text-jade-400 hover:text-jade-900 transition-colors"
              >
                 <X className="w-5 h-5" />
              </button>
              <div className="text-center">
                 <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600">Official WeChat</span>
                 </div>
                 <h3 className="font-serif text-2xl text-jade-900 mb-2">Connect with Us</h3>
                 <p className="text-jade-600 text-xs mb-6 leading-relaxed px-4">Scan to chat directly with our concierge team in Shanghai.</p>
                 
                 <div className="bg-jade-50 p-3 inline-block border border-jade-100 rounded-sm mb-4">
                    {/* Placeholder for QR Code */}
                    <div className="w-48 h-48 bg-white flex items-center justify-center text-jade-200 border border-jade-100">
                       <MessageSquare className="w-12 h-12 opacity-20" />
                    </div>
                 </div>
                 
                 <p className="text-[10px] text-jade-400 uppercase tracking-widest font-bold">ID: JADE_ATLAS_JOURNEYS</p>
              </div>
           </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 items-start">

          {/* COLUMN 1: BRAND + SOCIALS */}
          <div className="flex flex-col space-y-8">
            {/* Brand Text */}
            <div>
                <Link 
                  to="/" 
                  className="font-serif text-2xl tracking-[0.05em] text-mist-50 mb-4 whitespace-nowrap block"
                >
                  JADE ATLAS JOURNEYS
                </Link>
                <p className="text-xs leading-loose text-jade-500 font-sans max-w-xs">
                  Curated cinematic journeys through the heart of modern and ancient China.
                </p>
            </div>

            {/* Socials & WeChat */}
            <div className="flex flex-col gap-6 w-fit">
              
              {/* Social Icons Row */}
              <div className="flex gap-5 items-center">
                <a href="#" className="text-jade-400 hover:text-gold-500 transition-colors" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-jade-400 hover:text-gold-500 transition-colors" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12.5 2h3.1c.1 1.3.7 2.6 1.6 3.6 1 1 2.3 1.6 3.6 1.7v3c-1.5 0-3-.4-4.3-1.2v7.4c0 3.6-2.8 6.5-6.3 6.5S4 20.1 4 16.5 6.8 10 10.3 10c.8 0 1.6.2 2.2.5V2zm-2.2 10.2c-1.7 0-3.2 1.5-3.2 3.3s1.4 3.3 3.2 3.3 3.2-1.5 3.2-3.3v-4c-.5-.3-1.1-.5-1.7-.5z"/>
                  </svg>
                </a>
                <a href="#" className="text-jade-400 hover:text-gold-500 transition-colors" aria-label="YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="text-jade-400 hover:text-gold-500 transition-colors" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <WhatsAppIcon className="w-5 h-5 text-jade-400 hover:text-gold-500 transition-colors cursor-pointer" />
              </div>

              {/* WeChat Button */}
              <button 
                onClick={() => setShowWeChat(true)}
                className="bg-jade-900 border border-jade-800 p-3 rounded-sm flex items-center gap-3 w-full hover:bg-jade-800 hover:border-gold-500/30 transition-all group text-left shadow-sm"
              >
                <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm group-hover:opacity-90 transition-opacity shrink-0">
                   {/* FIX: Replaced div-hack with official SVG component */}
                   <WeChatIcon className="w-5 h-5 text-jade-900" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[10px] text-gold-500 font-bold uppercase tracking-widest mb-0.5">
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse"></span> WeChat
                  </div>
                  <div className="text-[10px] text-jade-400 group-hover:text-jade-200 transition-colors">Tap to Connect</div>
                </div>
              </button>
            </div>
          </div>

          {/* COLUMN 2: EXPLORE */}
          <div className="pt-2">
            <h4 className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-8">Explore</h4>
            <div className="flex flex-col space-y-4 text-sm font-medium">
              <Link to="/collections" className="hover:text-gold-500 transition-colors hover:translate-x-1 duration-300 inline-block">Collections</Link>
              <Link to="/journal" className="hover:text-gold-500 transition-colors hover:translate-x-1 duration-300 inline-block">Journal</Link>
              <Link to="/about" className="hover:text-gold-500 transition-colors hover:translate-x-1 duration-300 inline-block">About Us</Link>
            </div>
          </div>

          {/* COLUMN 3: SUPPORT */}
          <div className="pt-2">
            <h4 className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-8">Support</h4>
            <div className="flex flex-col space-y-4 text-sm font-medium">
              <Link to="/faq" className="hover:text-gold-500 transition-colors hover:translate-x-1 duration-300 inline-block">FAQ</Link>
              <Link to="/contact" className="hover:text-gold-500 transition-colors hover:translate-x-1 duration-300 inline-block">Contact</Link>
              <Link to="/account" className="hover:text-gold-500 transition-colors hover:translate-x-1 duration-300 inline-block">Guest Account</Link>
            </div>
          </div>

          {/* COLUMN 4: LEGAL */}
          <div className="pt-2">
            <h4 className="text-gold-600 uppercase tracking-widest text-xs font-bold mb-8">Legal</h4>
            <div className="flex flex-col space-y-4 text-sm font-medium">
              <Link to="/terms" className="hover:text-gold-500 transition-colors hover:translate-x-1 duration-300 inline-block">Terms of Service</Link>
              <Link to="/bookingconditions" className="hover:text-gold-500 transition-colors hover:translate-x-1 duration-300 inline-block">Booking Conditions</Link>
              <Link to="/privacy" className="hover:text-gold-500 transition-colors hover:translate-x-1 duration-300 inline-block">Privacy Policy</Link>
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="mt-20 pt-8 border-t border-jade-900 flex flex-col md:flex-row justify-between items-center pb-8 gap-4">
          <p className="text-[10px] text-jade-600 uppercase tracking-widest">
            © 2025 Jade Atlas Journeys.
          </p>
          <p className="text-[10px] text-jade-600 uppercase tracking-widest">
             Designed with Imperial Precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-jade-900 bg-mist-50 min-h-screen flex flex-col">
      <Navigation isScrolled={isScrolled} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};