import React, { useState, useEffect } from 'react';
import {
  MapPin,
  ArrowRight,
  User,
  Tag,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  HERO_IMAGE,
  CRAVE_FEAST_IMAGE,
  BURGER_IMAGE,
  PIZZA_IMAGE,
  SUSHI_IMAGE,
} from '../data/mockData';
import { Footer } from './Footer';
import { FoddieLogo } from './FoddieLogo';

interface LoggedOutLandingProps {
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
  onAddressSubmit: (address: string) => void;
  onStartOrdering: () => void;
  onOpenExpressPass: () => void;
  onOpenRestaurantsNearMe: () => void;
  onOpenGroceryDelivery?: () => void;
}

export const LoggedOutLanding: React.FC<LoggedOutLandingProps> = ({
  onOpenSignIn,
  onOpenSignUp,
  onAddressSubmit,
  onStartOrdering,
  onOpenExpressPass,
  onOpenRestaurantsNearMe,
  onOpenGroceryDelivery,
}) => {
  const [addressInput, setAddressInput] = useState('');
  const [neighborhoodTab, setNeighborhoodTab] = useState<'cities' | 'cuisines' | 'chains'>('cities');
  const [isNeighborhoodExpanded, setIsNeighborhoodExpanded] = useState(false);
  const [showBottomPromo, setShowBottomPromo] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput.trim()) {
      onAddressSubmit(addressInput.trim());
    } else {
      onStartOrdering();
    }
  };

  const citiesList = [
    'New Delhi', 'Mumbai', 'Bengaluru', 'Kolkata', 'Hyderabad',
    'Chennai', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Chandigarh', 'Indore', 'Kochi', 'Goa', 'Bhopal',
    'New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Austin'
  ];

  const cuisinesList = [
    'Pizza Delivery', 'Chinese Food', 'Sushi & Rolls', 'Biryani & Kebabs', 'Burgers & Fries',
    'South Indian', 'North Indian', 'Mexican & Tacos', 'Italian Pasta', 'Healthy Bowls',
    'Desserts & Shakes', 'Bakery & Pastries', 'Thai Curries', 'Dim Sum & Momos', 'Coffee & Tea'
  ];

  const chainsList = [
    'McDonald\'s', 'KFC', 'Burger King', 'Domino\'s Pizza', 'Subway',
    'Pizza Hut', 'Starbucks', 'Taco Bell', 'Baskin Robbins', 'Chai Point',
    'Haldiram\'s', 'Behrouz Biryani', 'Faasos', 'Wow! Momo', 'Barbeque Nation'
  ];

  const currentTabItems =
    neighborhoodTab === 'cities'
      ? citiesList
      : neighborhoodTab === 'cuisines'
      ? cuisinesList
      : chainsList;

  const visibleItems = isNeighborhoodExpanded ? currentTabItems : currentTabItems.slice(0, 8);

  return (
    <div className="min-h-screen bg-white text-[#191919] flex flex-col font-sans">
      {/* 1. Header (DoorDash Animated Sticky Header: Slides in as solid white bar when scrolling down, hidden at top) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white border-b border-neutral-200/90 shadow-xs translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <FoddieLogo className="w-8 h-8 sm:w-9 sm:h-9" variant="badge" />
            <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#EB1700]">
              Foddie Express
            </span>
          </div>

          {/* Right Actions: Red Sign In & Pill Sign Up */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSignIn}
              className="px-5 py-2 bg-[#EB1700] hover:bg-[#D01400] text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-150 active:scale-95 shadow-xs cursor-pointer"
            >
              Sign In
            </button>

            <button
              onClick={onOpenSignUp}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-bold rounded-full transition-all duration-150 active:scale-95 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (CSS selector 1: Fitted with 16:9 Foddie Cloche Logo Image & video-matched top buttons) */}
      <section className="relative overflow-hidden bg-[#EB1700] text-white min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 pb-16">
        {/* Top-Right Floating Sign In & Sign Up (Visible when at top of page, matching Video & Screenshot 2026-10-03 205053) */}
        <div
          className={`absolute top-5 right-5 sm:right-8 z-30 flex items-center gap-2.5 transition-opacity duration-200 ${
            isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <button
            onClick={onOpenSignIn}
            className="px-5 py-2 bg-[#EB1700] hover:bg-[#D01400] text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-150 active:scale-95 shadow-xs cursor-pointer border border-white/25"
          >
            Sign In
          </button>
          <button
            onClick={onOpenSignUp}
            className="px-5 py-2 bg-white hover:bg-neutral-100 text-neutral-900 text-xs sm:text-sm font-bold rounded-full transition-all duration-150 active:scale-95 shadow-md cursor-pointer"
          >
            Sign Up
          </button>
        </div>

        {/* Left Side Food Collages */}
        <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-80 h-[480px] pointer-events-none opacity-90 select-none z-10">
          <div className="relative w-full h-full">
            {/* Phone mockup with delivery tracker route matching Screenshot 205053 */}
            <div className="absolute left-6 top-8 w-36 h-80 rounded-3xl bg-[#191919] border-4 border-white/50 shadow-2xl p-2.5 flex flex-col justify-between rotate-[-6deg] overflow-hidden">
              <div className="flex items-center justify-center pt-1 pb-1">
                <div className="w-10 h-1 bg-white/40 rounded-full" />
              </div>
              
              {/* Route with 4 icons: Cloche -> Store -> Car -> Home */}
              <div className="flex-1 flex flex-col items-center justify-between py-2 relative">
                {/* Vertical connecting line */}
                <div className="absolute top-4 bottom-4 w-0.5 bg-white/30" />
                
                {/* Stop 1: Foddie Logo */}
                <div className="w-8 h-8 rounded-full bg-white text-[#EB1700] flex items-center justify-center shadow-md z-10 p-1">
                  <FoddieLogo className="w-5 h-5" variant="red" />
                </div>
                {/* Stop 2: Store / Kitchen */}
                <div className="w-7 h-7 rounded-full bg-white text-neutral-800 flex items-center justify-center shadow-md z-10 text-xs font-bold">
                  🏬
                </div>
                {/* Stop 3: Dasher Vehicle */}
                <div className="w-7 h-7 rounded-full bg-white text-neutral-800 flex items-center justify-center shadow-md z-10 text-xs font-bold">
                  🚗
                </div>
                {/* Stop 4: Customer Home */}
                <div className="w-7 h-7 rounded-full bg-white text-[#EB1700] flex items-center justify-center shadow-md z-10 text-xs font-bold">
                  🏠
                </div>
              </div>

              <div className="text-[9px] font-bold text-center text-white/90 pb-1">
                Delivered in 24m
              </div>
            </div>
            {/* Left Food Dish preview */}
            <div className="absolute -left-12 bottom-6 w-52 h-52 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl rotate-12">
              <img src={HERO_IMAGE} alt="Tasty meal" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Right Side Food Collages */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-80 h-[480px] pointer-events-none opacity-90 select-none z-10">
          <div className="relative w-full h-full">
            <div className="absolute -right-10 top-10 w-60 h-60 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl rotate-[-12deg]">
              <img src={BURGER_IMAGE} alt="Fresh burger and fries" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="absolute right-8 bottom-12 w-48 h-48 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl rotate-6">
              <img src={PIZZA_IMAGE} alt="Wood-fired pizza" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Hero Center Block */}
        <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center py-12">
          {/* Logo in hero */}
          <div className="flex items-center gap-2.5 text-white mb-4">
            <FoddieLogo className="w-9 h-9 rounded-full bg-white p-1 shadow-sm" variant="red" />
            <span className="font-display text-xl sm:text-2xl font-black uppercase tracking-wider">
              Foddie Express
            </span>
          </div>

          {/* Big Headline (exact DoorDash match with ₹) */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-[1.05] text-white">
            ₹0 Delivery Fee on First Order
          </h1>

          <p className="mt-2 text-white/80 text-xs sm:text-sm font-medium tracking-wide">
            Other fees apply
          </p>

          {/* White Address Search Input Pill */}
          <form onSubmit={handleSearch} className="mt-8 w-full max-w-xl">
            <div className="flex items-center bg-white rounded-full p-2 pl-5 shadow-2xl border border-white/30">
              <MapPin className="w-5 h-5 text-[#EB1700] shrink-0 mr-2" />
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                placeholder="Enter delivery address"
                className="w-full bg-transparent text-neutral-900 placeholder-neutral-400 text-sm sm:text-base focus:outline-none font-medium"
              />
              <button
                type="submit"
                aria-label="Find food at address"
                className="w-11 h-11 rounded-full bg-[#EB1700] hover:bg-[#D01400] text-white flex items-center justify-center transition-all duration-150 active:scale-95 shrink-0 shadow-md cursor-pointer ml-2"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Sign in for saved address pill */}
          <button
            onClick={onOpenSignIn}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 hover:bg-white text-neutral-900 rounded-full text-xs sm:text-sm font-bold shadow-lg transition-all duration-150 active:scale-95 cursor-pointer"
          >
            <User className="w-4 h-4 text-neutral-600" />
            <span>Sign in for saved address</span>
          </button>
        </div>
      </section>

      {/* 3. Section: Alternating Feature Showcases (Screenshots 1612 - 1615) */}
      <section className="border-t border-neutral-100 divide-y divide-neutral-100">
        {/* Showcase Row 1: Everything you crave, delivered (Screenshot 1612) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 max-w-lg">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
              Everything you crave, delivered.
            </h2>
            <h3 className="text-base sm:text-lg font-bold text-neutral-800">
              Your favorite local restaurants
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Get a slice of pizza or the whole pie delivered, or pick up house lo mein from the Chinese takeout spot you've been meaning to try.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenRestaurantsNearMe}
                className="px-6 py-3 bg-[#EB1700] hover:bg-[#D01400] text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
              >
                Find restaurants
              </button>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md bg-neutral-100">
            <img
              src={CRAVE_FEAST_IMAGE}
              alt="Artisanal gourmet feast of tacos, burgers, and salads"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-102"
            />
          </div>
        </div>

        {/* Showcase Row 2: ExpressPass is delivery for less (Screenshot 1613) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md bg-neutral-100 order-2 md:order-1">
            <img
              src={BURGER_IMAGE}
              alt="Deluxe food feast on dining table"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 max-w-lg order-1 md:order-2">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
              ExpressPass is delivery for less
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Members get a ₹0 delivery fee on ExpressPass orders, 5% back on pickup orders, and so much more. Plus, it's free for 30 days.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenExpressPass}
                className="px-6 py-3 bg-[#EB1700] hover:bg-[#D01400] text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
              >
                Get ExpressPass
              </button>
            </div>
          </div>
        </div>

        {/* Showcase Row 3: Get grocery and convenience (Screenshot 1614) */}
        <div className="relative overflow-hidden py-24 sm:py-32 px-4 text-center text-white bg-neutral-900">
          <img
            src={PIZZA_IMAGE}
            alt="Grocery spread"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-neutral-950/70" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Get grocery and convenience store essentials
            </h2>
            <p className="text-sm sm:text-base text-neutral-200 font-semibold">
              Grocery delivery, exactly how you want it.
            </p>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
              Shop from home and fill your cart with fresh produce, frozen entrees, deli delights and more.
            </p>
            <div className="pt-3">
              <button
                onClick={onOpenGroceryDelivery || onStartOrdering}
                className="px-7 py-3.5 bg-[#EB1700] hover:bg-[#D01400] text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-150 active:scale-95 cursor-pointer shadow-md"
              >
                Shop Groceries
              </button>
            </div>
          </div>
        </div>

        {/* Showcase Row 4: Convenience stores at your doorstep (Screenshot 1615) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 max-w-lg">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
              Convenience stores at your doorstep
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Stock up on snacks, household essentials, candy, or vitamins — all delivered in under an hour.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenRestaurantsNearMe}
                className="px-6 py-3 bg-[#EB1700] hover:bg-[#D01400] text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
              >
                Shop Now
              </button>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md bg-neutral-100">
            <img
              src={SUSHI_IMAGE}
              alt="Convenience tote and items"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. Section: 4 Category Pillars on Light Canvas (Screenshot 1616) */}
      <section className="bg-[#FFF8F6] py-16 sm:py-20 border-t border-neutral-200/60">
        <div className="text-center max-w-xl mx-auto mb-12 px-4">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Helping you with to-dos and gifting
          </h2>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 3: Minibar / Drinks */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">
                Restock the minibar
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                Hosting a get-together? Get cold beverages, sodas, and mocktails delivered fast.
              </p>
            </div>
            <button
              onClick={onStartOrdering}
              className="w-full py-2.5 bg-[#EB1700] hover:bg-[#D01400] text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
            >
              Shop Drinks
            </button>
          </div>

          {/* Card 4: Pet supplies */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">
                What your pets need, and want
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed mb-6">
                Shop pet food, chew toys, healthy treats, and accessories.
              </p>
            </div>
            <button
              onClick={onStartOrdering}
              className="w-full py-2.5 bg-[#EB1700] hover:bg-[#D01400] text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
            >
              Get Pet Supplies
            </button>
          </div>
        </div>
      </section>

      {/* 7. Section: Neighborhood Explorer Tabs (Screenshot 1620) */}
      <section className="bg-neutral-50 py-16 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 text-center mb-8">
            Get more from your neighborhood
          </h2>

          {/* Tabs */}
          <div className="flex justify-center border-b border-neutral-200 mb-8">
            <div className="flex gap-8">
              {(['cities', 'cuisines', 'chains'] as const).map((t) => {
                const label = t === 'cities' ? 'Top Cities' : t === 'cuisines' ? 'Top Cuisines' : 'Top Chains';
                const isActive = neighborhoodTab === t;
                return (
                  <button
                    key={t}
                    onClick={() => setNeighborhoodTab(t)}
                    className={`pb-3 text-xs sm:text-sm font-bold transition-colors cursor-pointer border-b-2 ${
                      isActive
                        ? 'border-neutral-900 text-neutral-900'
                        : 'border-transparent text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm text-neutral-600 max-w-4xl mx-auto">
            {visibleItems.map((item) => (
              <button
                key={item}
                onClick={onStartOrdering}
                className="text-left py-1 hover:text-[#EB1700] transition-colors cursor-pointer truncate"
              >
                {item}
              </button>
            ))}
          </div>

          {/* See more toggle */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsNeighborhoodExpanded((v) => !v)}
              className="inline-flex items-center gap-1 text-xs font-bold text-neutral-800 hover:text-[#EB1700] cursor-pointer"
            >
              <span>{isNeighborhoodExpanded ? 'See less' : 'See more'}</span>
              {isNeighborhoodExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </section>

      {/* 8. Full DoorDash Dark Footer (Screenshots 1621, 1622 & Screenshot 2026-10-03) */}
      <Footer showAppBadges={true} />

      {/* 9. Floating Bottom Promo Strip (Screenshot 1610, 1611 bottom) */}
      {showBottomPromo && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-2.5 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-800">
            <Tag className="w-4 h-4 text-[#EB1700] shrink-0" />
            <span>Enjoy <strong>₹0 Delivery Fee</strong> on your first order!</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onStartOrdering}
              className="font-bold text-[#EB1700] hover:underline cursor-pointer"
            >
              See all
            </button>
            <button
              onClick={() => setShowBottomPromo(false)}
              className="text-neutral-400 hover:text-neutral-700 font-bold ml-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
