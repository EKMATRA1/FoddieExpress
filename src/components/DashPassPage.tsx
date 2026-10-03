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
  Sparkles,
  Percent,
  Car,
  Tag,
  MapPin,
} from 'lucide-react';
import { Address } from '../types';
import { Footer } from './Footer';
import { FoddieLogo } from './FoddieLogo';

interface DashPassPageProps {
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

export const DashPassPage: React.FC<DashPassPageProps> = ({
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
  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [addressSearchInput, setAddressSearchInput] = useState('');
  const addressDropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen bg-white text-[#191919] flex flex-col font-sans">
      {/* 1. Top Navigation Bar (Identical to Screenshots 1635 & 1636) */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200/80 px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div
          onClick={onGoHome}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <FoddieLogo className="w-8 h-8 sm:w-9 sm:h-9" variant="badge" />
          <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#EB1700]">
            FODDIE EXPRESS
          </span>
        </div>

        {/* Right: Address + Bell + Cart + Sign In + Sign Up */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Address Pill with Popover Dropdown (Matching uploaded image.png) */}
          <div className="relative" ref={addressDropdownRef}>
            <button
              onClick={() => {
                setIsAddressDropdownOpen((prev) => !prev);
                setIsNotificationOpen(false);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-xs sm:text-sm font-bold text-neutral-900 transition-colors cursor-pointer select-none"
            >
              <Plus className="w-3.5 h-3.5 text-neutral-800 stroke-[2.5]" />
              <span>Your Address</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-neutral-600 transition-transform duration-150 ${
                  isAddressDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Address Popover matching image.png */}
            {isAddressDropdownOpen && (
              <div className="absolute top-full right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-neutral-200/90 p-5 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
                {/* Triangular top pointer arrow */}
                <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-t border-l border-neutral-200 rotate-45" />

                <h3 className="font-bold text-base text-neutral-950 mb-3.5 relative z-10">
                  Enter Your Address
                </h3>

                {/* Gray Address Input Box */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (addressSearchInput.trim()) {
                      if (onSelectAddress) {
                        onSelectAddress({
                          id: `addr-${Date.now()}`,
                          label: 'Other',
                          street: addressSearchInput.trim(),
                          cityStateZip: 'Kolkata, WB',
                          dropoffOption: 'hand_to_me',
                          instructions: '',
                          isDefault: true,
                        });
                      }
                      setIsAddressDropdownOpen(false);
                    }
                  }}
                  className="relative z-10 mb-3.5"
                >
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

                {/* Sign in for saved address Pill */}
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

          {/* Notification Bell with Dropdown Popover */}
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

            {/* Notification Dropdown */}
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
                      <p className="text-xs font-bold text-neutral-900">₹0 Delivery Fee Offer</p>
                      <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">
                        Enjoy ₹0 delivery fees on your first order. Order from top restaurants now!
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
        {/* 2. Left Persistent Navigation Sidebar (Screenshot 1635 & image.png) */}
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

              {/* Grocery */}
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
        <div className="flex-1 flex flex-col min-w-0">
          {/* 3. Center Main Card Content (Screenshot 1635) */}
          <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#FAFAFA]">
            <div className="w-full max-w-lg bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-8 sm:p-10 text-center animate-in fade-in duration-200">
              {/* DashPass Emblem */}
              <div className="inline-flex items-center justify-center gap-2.5 mb-3">
                <FoddieLogo className="w-8 h-8 rounded-full bg-[#5C42EC] p-1.5 shadow-2xs" variant="white" />
                <span className="font-display text-2xl font-black tracking-tight text-neutral-900">
                  ExpressPass
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-tight max-w-md mx-auto">
                Get ₹0 delivery fees plus exclusive benefits
              </h1>

              {/* 4 Benefit Rows (Screenshot 1635) */}
              <div className="mt-8 space-y-6 text-left">
                {/* Benefit 1: ₹0 Delivery fees */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#EB1700] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-sm sm:text-base">
                      ₹0 delivery fees
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mt-0.5">
                      And lower service fees. On eligible orders.
                    </p>
                  </div>
                </div>

                {/* Benefit 2: Member-exclusive deals */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100/70 text-[#EB1700] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Percent className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-sm sm:text-base">
                      Member-exclusive deals
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mt-0.5">
                      Save on restaurants, groceries, and more
                    </p>
                  </div>
                </div>

                {/* Benefit 3: 5-10% off Lyft rides */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#FF00BF] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Car className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-sm sm:text-base">
                      5-10% off Lyft rides
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mt-0.5">
                      Up to 4 discounted rides/mo. Terms apply.
                    </p>
                  </div>
                </div>

                {/* Benefit 4: 5% back on eligible pickup orders */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Sparkles className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-sm sm:text-base">
                      5% back on eligible pickup orders
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mt-0.5">
                      Earn 5% DoorDash credits on eligible orders
                    </p>
                  </div>
                </div>
              </div>

              {/* Red Wide Sign in Button */}
              <div className="mt-8">
                <button
                  onClick={onOpenSignIn}
                  className="w-full py-3.5 bg-[#EB1700] hover:bg-[#D01400] text-white font-bold text-sm sm:text-base rounded-full shadow-md transition-all duration-150 active:scale-98 cursor-pointer"
                >
                  Sign in
                </button>
              </div>
            </div>
          </main>

          {/* 4. White Footer inside right body */}
          <Footer theme="light" showAppBadges={false} showBusinessColumn={false} />
        </div>
      </div>
    </div>
  );
};
