import React, { useState, useRef, useEffect } from 'react';
import {
  Home,
  ShoppingBag,
  Store,
  Compass,
  User,
  Plus,
  Bell,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  MapPin,
  ArrowRight,
  Search,
  CheckCircle2,
  ShieldCheck,
  Headphones,
  Truck,
  Sparkles,
  Tag,
} from 'lucide-react';
import { Address } from '../types';
import { Footer } from './Footer';
import { FoddieLogo } from './FoddieLogo';

interface GroceryDeliveryPageProps {
  onGoHome: () => void;
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
  onExploreFeed: (category?: string) => void;
  onOpenAddressModal: () => void;
  onSelectAddress?: (addr: Address) => void;
  onOpenCart: () => void;
  currentAddress?: Address;
  totalCartItems?: number;
}

export const GroceryDeliveryPage: React.FC<GroceryDeliveryPageProps> = ({
  onGoHome,
  onOpenSignIn,
  onOpenSignUp,
  onExploreFeed,
  onOpenAddressModal,
  onSelectAddress,
  onOpenCart,
  currentAddress,
  totalCartItems = 0,
}) => {
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const [addressSearchInput, setAddressSearchInput] = useState('');
  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [heroAddressInput, setHeroAddressInput] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const addressDropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 280);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        addressDropdownRef.current &&
        !addressDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAddressDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = heroAddressInput.trim() || addressSearchInput.trim();
    if (query && onSelectAddress) {
      onSelectAddress({
        id: `addr-${Date.now()}`,
        label: 'Other',
        street: query,
        cityStateZip: 'Kolkata, WB',
        dropoffOption: 'hand_to_me',
        instructions: '',
        isDefault: true,
      });
      onExploreFeed('grocery');
    } else {
      onExploreFeed('grocery');
    }
  };

  const categories = [
    'Produce',
    'Dairy & Eggs',
    'Meat & Poultry',
    'Bakery',
    'Drinks',
    'Frozen',
    'Pantry',
    'Snacks',
    'Seafood',
    'Fresh Food',
    'Health',
    'Personal Care',
    'Candy',
  ];

  const faqs = [
    {
      question: 'How long does a delivery take?',
      answer:
        "You'll receive your order within 1-2 hours of placing your order. Prefer to plan ahead? Schedule your order for a specific time.",
    },
    {
      question: 'What happens if an item is out of stock, unavailable or a different price?',
      answer:
        'If any items are out of stock, your shopper will contact you while shopping to pick a substitute. If your substitute is also unavailable or you do not choose one, you will receive a refund for the item(s) not in stock. If a substitute is a different price from the original item selected, the difference will be applied to your final receipt.',
    },
    {
      question: 'What is the Quality Guarantee for groceries on DoorDash?',
      answer:
        'Quality Guarantee: Customers are eligible to receive a refund or Foddie Express credit for an item that qualifies for the Quality Guarantee if they report a qualifying issue (such as damaged items, poor quality produce, missing items, unapproved substitutions, or spoiled perishable goods) within 24 hours of delivery.',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept all major credit and debit cards (Visa, MasterCard, American Express, RuPay), UPI (Google Pay, PhonePe, Paytm), Net Banking, and Foddie Express gift cards.',
    },
    {
      question: 'How can I save on fees?',
      answer:
        'Sign up for DashPass to get ₹0 delivery fees and reduced service fees. DashPass is a subscription service that offers unlimited deliveries from thousands of eligible grocery and restaurant merchants with ₹0 delivery fee on eligible orders over ₹299.',
    },
    {
      question: 'What groceries items can I shop on DoorDash?',
      answer:
        'We have over 10,000 grocery stores available, from superstores to your local neighborhood farmers market. Get anything from produce, meat, dairy, snacks, drinks, and stock up on your pantry supplies.',
    },
    {
      question: 'Which grocery stores can I shop from on DoorDash?',
      answer:
        "Shop our great selection of national and local merchants including but not limited to Nature's Basket, Reliance Fresh, More Supermarket, Spencer's, BigBasket partner hubs, local organic farmer markets, and specialty stores.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#191919] flex flex-col font-sans">
      {/* 1. Header (Matching Video at 00:00 - 00:04) */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200/80 px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div
          onClick={onGoHome}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
        >
          <FoddieLogo className="w-8 h-8 sm:w-9 sm:h-9" variant="badge" />
          <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#EB1700]">
            FODDIE EXPRESS
          </span>
        </div>

        {/* Center: Search Bar in Header (expanded to occupy all space between left and right) */}
        <div className="hidden md:flex items-center flex-1 mx-4 sm:mx-8 min-w-0">
          <div className="w-full relative flex items-center bg-neutral-100 hover:bg-neutral-200/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#EB1700]/30 rounded-full px-4 py-2 transition-all">
            <Search className="w-4 h-4 text-neutral-500 shrink-0 mr-2.5" />
            <input
              type="text"
              placeholder="Search Foddie Express"
              className="w-full bg-transparent text-sm font-medium text-neutral-800 placeholder:text-neutral-500 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onExploreFeed('grocery');
                }
              }}
            />
          </div>
        </div>

        {/* Right Controls: Address + Delivery/Pickup + Cart + Auth */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Address Pill with Popover Dropdown */}
          <div className="relative" ref={addressDropdownRef}>
            <button
              onClick={() => {
                setIsAddressDropdownOpen((prev) => !prev);
                setIsNotificationOpen(false);
              }}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-xs sm:text-sm font-bold text-neutral-900 transition-colors cursor-pointer select-none"
            >
              <Plus className="w-3.5 h-3.5 text-neutral-800 stroke-[2.5]" />
              <span>Your Address</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-neutral-600 transition-transform duration-150 ${
                  isAddressDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Address Popover matching image */}
            {isAddressDropdownOpen && (
              <div className="absolute top-full right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-neutral-200/90 p-5 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
                <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-t border-l border-neutral-200 rotate-45" />

                <h3 className="font-bold text-base text-neutral-950 mb-3.5 relative z-10">
                  Enter Your Address
                </h3>

                <form onSubmit={handleAddressSubmit} className="relative z-10 mb-3.5">
                  <div className="flex items-center gap-2.5 bg-neutral-100 hover:bg-neutral-100/90 focus-within:bg-neutral-100 rounded-2xl px-4 py-3 transition-colors">
                    <MapPin className="w-5 h-5 text-neutral-600 shrink-0 stroke-[2]" />
                    <input
                      type="text"
                      value={addressSearchInput}
                      onChange={(e) => setAddressSearchInput(e.target.value)}
                      placeholder="Address"
                      className="w-full bg-transparent text-sm font-medium text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
                      autoFocus
                    />
                  </div>
                </form>

                <div className="relative z-10">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddressDropdownOpen(false);
                      onOpenSignIn();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-full text-xs font-bold transition-all cursor-pointer"
                  >
                    <User className="w-4 h-4 text-neutral-700 stroke-[2.2]" />
                    <span>Sign in for saved address</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Delivery | Pickup Segmented Toggle */}
          <div className="hidden lg:flex items-center bg-neutral-100 p-1 rounded-full text-xs font-bold">
            <button
              onClick={() => setDeliveryMode('delivery')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                deliveryMode === 'delivery'
                  ? 'bg-white text-neutral-950 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Delivery
            </button>
            <button
              onClick={() => setDeliveryMode('pickup')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                deliveryMode === 'pickup'
                  ? 'bg-white text-neutral-950 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Pickup
            </button>
          </div>

          {/* Notification Bell */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => {
                setIsNotificationOpen((prev) => !prev);
                setIsAddressDropdownOpen(false);
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EB1700]" />

            {isNotificationOpen && (
              <div className="absolute top-full right-0 mt-3 w-80 sm:w-88 bg-white rounded-2xl shadow-xl border border-neutral-200 p-4 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#EB1700]" />
                    <h4 className="font-bold text-sm text-neutral-900">Notifications</h4>
                  </div>
                  <span className="text-[11px] font-bold text-[#EB1700] bg-red-50 px-2 py-0.5 rounded-full">
                    1 New
                  </span>
                </div>
                <div className="py-2 space-y-2">
                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100/80 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#EB1700]/10 text-[#EB1700] flex items-center justify-center shrink-0 font-bold text-xs">
                      ₹0
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900">₹0 Delivery Fee on Groceries</p>
                      <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">
                        Enjoy fresh groceries delivered to your door with ₹0 delivery fee on your first order.
                      </p>
                      <span className="text-[10px] text-neutral-400 mt-1 block">Just now</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Red Cart Pill Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#EB1700] hover:bg-[#D01400] text-white rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{totalCartItems}</span>
          </button>

          {/* Sign In */}
          <button
            onClick={onOpenSignIn}
            className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-bold text-neutral-800 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Sign In
          </button>

          {/* Sign Up */}
          <button
            onClick={onOpenSignUp}
            className="px-3.5 sm:px-4 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs sm:text-sm font-bold rounded-full transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Layout: Left Fixed Sidebar + Right Body (Main + Footer) */}
      <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        {/* Left Persistent Navigation Sidebar */}
        <aside className="w-full md:w-56 lg:w-64 border-b md:border-b-0 md:border-r border-neutral-200/80 bg-white p-4 sm:p-5 flex md:flex-col justify-start shrink-0 md:sticky md:top-16 md:self-start md:h-[calc(100vh-4rem)] md:overflow-y-auto z-20">
          <div className="w-full">
            <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              {/* Home */}
              <button
                onClick={onGoHome}
                className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-bold text-sm text-neutral-800 hover:bg-neutral-100 transition-colors text-left cursor-pointer shrink-0"
              >
                <Home className="w-5 h-5 text-neutral-700 stroke-[2.2]" />
                <span>Home</span>
              </button>

              {/* Grocery - Unselected / neutral */}
              <button
                onClick={() => onExploreFeed('grocery')}
                className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-bold text-sm text-neutral-800 hover:bg-neutral-100 transition-colors text-left cursor-pointer shrink-0"
              >
                <Store className="w-5 h-5 text-neutral-700 stroke-[2.2]" />
                <span>Grocery</span>
              </button>

              {/* Retail */}
              <button
                onClick={() => onExploreFeed('retail')}
                className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-bold text-sm text-neutral-800 hover:bg-neutral-100 transition-colors text-left cursor-pointer shrink-0"
              >
                <ShoppingBag className="w-5 h-5 text-neutral-700 stroke-[2.2]" />
                <span>Retail</span>
              </button>

              {/* Convenience */}
              <button
                onClick={() => onExploreFeed('convenience')}
                className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-bold text-sm text-neutral-800 hover:bg-neutral-100 transition-colors text-left cursor-pointer shrink-0"
              >
                <Tag className="w-5 h-5 text-neutral-700 stroke-[2.2]" />
                <span>Convenience</span>
              </button>

              {/* Browse All */}
              <button
                onClick={() => onExploreFeed()}
                className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-bold text-sm text-neutral-800 hover:bg-neutral-100 transition-colors text-left cursor-pointer shrink-0"
              >
                <Compass className="w-5 h-5 text-neutral-700 stroke-[2.2]" />
                <span>Browse All</span>
              </button>

              {/* Sign up or Login - moved directly below Browse All */}
              <button
                onClick={onOpenSignIn}
                className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-bold text-sm text-neutral-800 hover:bg-neutral-100 transition-colors text-left cursor-pointer shrink-0"
              >
                <User className="w-5 h-5 text-neutral-700 stroke-[2.2]" />
                <span>Sign up or Login</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Right Body: Main Content + Footer scrolling together (matching image.png) */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Floating / Sticky Bar on scroll - positioned strictly inside right body so aside is untouched */}
          {isScrolled && (
            <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200 py-2.5 px-4 sm:px-6 shadow-sm animate-in fade-in slide-in-from-top duration-200">
              <div className="max-w-4xl mx-auto flex items-center justify-center relative">
                {/* Sign in for saved address to the LEFT */}
                <div className="hidden sm:block absolute left-0">
                  <button
                    onClick={onOpenSignIn}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-xs font-bold text-neutral-900 cursor-pointer transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-neutral-700" />
                    <span>Sign in for saved address</span>
                  </button>
                </div>

                {/* Centralized Searchbar */}
                <form onSubmit={handleAddressSubmit} className="w-full max-w-md mx-auto">
                  <div className="flex items-center bg-neutral-100 hover:bg-neutral-200/80 rounded-full pl-4 pr-1.5 py-1 border border-neutral-200/90 shadow-2xs">
                    <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mr-2" />
                    <input
                      type="text"
                      value={heroAddressInput}
                      onChange={(e) => setHeroAddressInput(e.target.value)}
                      placeholder="Enter delivery address"
                      className="w-full bg-transparent text-xs sm:text-sm font-medium text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-8 h-8 rounded-full bg-[#EB1700] hover:bg-[#D01400] text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer active:scale-95"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Center / Right Content */}
          <main className="flex-1 bg-white">
          {/* 2. Hero Section with Grocery Arc (Matching Video at 00:00 - 00:06) */}
          <section className="relative overflow-hidden bg-[#FAF6F0] py-14 sm:py-20 px-4 sm:px-8 border-b border-neutral-200/60">
            {/* Curved Grocery Arc Garland Visual */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-90">
              <svg
                className="w-full h-full"
                viewBox="0 0 1200 480"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
              >
                <path
                  d="M -50,380 Q 600,520 1250,380"
                  stroke="#F2E8DC"
                  strokeWidth="80"
                  fill="none"
                />
              </svg>
            </div>

            {/* Realistic Grocery Items Curved Banner Illustration / Badges */}
            <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
              {/* Grocery Garland Items */}
              <div className="w-full flex items-center justify-between px-2 sm:px-6 mb-4 max-w-4xl text-2xl sm:text-4xl opacity-90 select-none">
                <span className="transform -rotate-12 hover:scale-110 transition-transform">🥦</span>
                <span className="transform -rotate-6 hover:scale-110 transition-transform">🍞</span>
                <span className="transform -rotate-3 hover:scale-110 transition-transform">🥛</span>
                <span className="transform rotate-0 hover:scale-110 transition-transform">🍓</span>
                <span className="transform rotate-6 hover:scale-110 transition-transform">🥑</span>
                <span className="transform rotate-12 hover:scale-110 transition-transform">🧀</span>
                <span className="transform rotate-16 hover:scale-110 transition-transform">🍅</span>
                <span className="transform rotate-8 hover:scale-110 transition-transform">🍇</span>
              </div>

              {/* Title & Subheadline */}
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.1] max-w-2xl mx-auto">
                Grocery delivery,
                <br />
                exactly how you want it.
              </h1>
              <p className="text-neutral-600 text-sm sm:text-base font-semibold mt-3 max-w-xl">
                Up to your quality standards, guaranteed.*
              </p>

              {/* Centered Address Search Bar (Matching Video 00:01) */}
              <div className="w-full max-w-xl mt-8">
                <form
                  onSubmit={handleAddressSubmit}
                  className="bg-white rounded-full p-2 pl-5 sm:pl-6 shadow-xl border border-neutral-200/90 flex items-center justify-between transition-all focus-within:ring-2 focus-within:ring-[#EB1700]/30"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <MapPin className="w-5 h-5 text-neutral-500 shrink-0 stroke-[2]" />
                    <input
                      type="text"
                      value={heroAddressInput}
                      onChange={(e) => setHeroAddressInput(e.target.value)}
                      placeholder="Enter delivery address"
                      className="w-full bg-transparent text-sm sm:text-base font-medium text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-11 h-11 rounded-full bg-[#EB1700] hover:bg-[#D01400] text-white flex items-center justify-center shrink-0 shadow-md transition-all active:scale-95 cursor-pointer ml-2"
                    aria-label="Submit address"
                  >
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </form>

                {/* Sign in for saved address pill */}
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={onOpenSignIn}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200/90 text-neutral-900 rounded-full text-xs sm:text-sm font-bold shadow-2xs transition-all cursor-pointer"
                  >
                    <User className="w-4 h-4 text-neutral-700 stroke-[2.2]" />
                    <span>Sign in for saved address</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Three Value Proposition Feature Cards (Matching Video 00:07 - 00:11) */}
          <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto border-b border-neutral-200/80">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
              {/* Feature 1: On-demand delivery */}
              <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-neutral-50/60 hover:bg-neutral-50 transition-colors">
                <div className="w-20 h-20 rounded-2xl bg-red-100/70 text-[#EB1700] flex items-center justify-center mb-6 shadow-xs">
                  <Truck className="w-10 h-10 stroke-[1.8]" />
                </div>
                <h3 className="font-display font-black text-xl text-neutral-900 mb-2.5">
                  On-demand delivery
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed max-w-xs">
                  Fill your pantry for the week ahead, or re-up on what's running out on the spot.
                </p>
              </div>

              {/* Feature 2: Best-in-class support */}
              <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-neutral-50/60 hover:bg-neutral-50 transition-colors">
                <div className="w-20 h-20 rounded-2xl bg-amber-100/70 text-amber-700 flex items-center justify-center mb-6 shadow-xs">
                  <Headphones className="w-10 h-10 stroke-[1.8]" />
                </div>
                <h3 className="font-display font-black text-xl text-neutral-900 mb-2.5">
                  Best-in-class support
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed max-w-xs">
                  Choose your own substitutions or get a refund when something's out of stock.
                </p>
              </div>

              {/* Feature 3: DashPass savings */}
              <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-neutral-50/60 hover:bg-neutral-50 transition-colors">
                <div className="w-20 h-20 rounded-2xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center mb-6 shadow-xs">
                  <Sparkles className="w-10 h-10 stroke-[1.8]" />
                </div>
                <h3 className="font-display font-black text-xl text-neutral-900 mb-2.5">
                  DashPass savings
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed max-w-xs">
                  Get more value with DashPass, including a ₹0.00 delivery fee on eligible orders and other exclusive perks.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Shop Categories (Matching Video 00:09 - 00:13) */}
          <section className="py-12 px-4 sm:px-8 max-w-6xl mx-auto border-b border-neutral-200/80">
            <h2 className="font-display font-black text-2xl text-neutral-900 mb-6">
              Shop categories
            </h2>
            <div className="flex flex-wrap items-center gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onExploreFeed('grocery')}
                  className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300 transition-colors cursor-pointer shadow-2xs active:scale-95"
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-8 text-xs text-neutral-500">
              Quality guarantee details:{' '}
              <a
                href="#faq"
                className="underline text-neutral-700 hover:text-neutral-900 font-medium"
              >
                https://help.foddieexpress.com/consumers/s/quality-guarantee-terms-conditions
              </a>
            </div>
          </section>

          {/* 5. Interactive Accordion / FAQ Section (Matching Video 00:13 - 00:36) */}
          <section id="faq" className="py-14 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-neutral-200/90 rounded-2xl overflow-hidden transition-all bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-neutral-50/80 transition-colors cursor-pointer gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <ChevronRight
                          className={`w-4 h-4 text-neutral-700 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-90 text-[#EB1700]' : ''
                          }`}
                        />
                        <span className="font-bold text-sm sm:text-base text-neutral-900">
                          {faq.question}
                        </span>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 pt-1 pl-12 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/40 animate-in fade-in duration-150">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </main>

        {/* 6. Clean White Footer inside right body */}
        <Footer theme="light" showAppBadges={false} showBusinessColumn={false} />
      </div>
    </div>
  </div>
);
};
