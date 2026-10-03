import React from 'react';
import { Search, ShoppingBag, MapPin, ChevronDown, Sparkles, User } from 'lucide-react';
import { Address } from '../types';
import { FoddieLogo } from './FoddieLogo';

interface HeaderProps {
  currentAddress: Address;
  deliveryMode: 'delivery' | 'pickup';
  onToggleDeliveryMode: (mode: 'delivery' | 'pickup') => void;
  onOpenAddressModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCartItems: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  onOpenExpressPassModal: () => void;
  isExpressPassActive: boolean;
  onOpenAuthModal: () => void;
  userEmail: string | null;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentAddress,
  deliveryMode,
  onToggleDeliveryMode,
  onOpenAddressModal,
  searchQuery,
  onSearchChange,
  totalCartItems,
  cartSubtotal,
  onOpenCart,
  onOpenExpressPassModal,
  isExpressPassActive,
  onOpenAuthModal,
  userEmail,
  onSignOut,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left Zone: Logo & Delivery/Pickup Toggle */}
        <div className="flex items-center gap-6 shrink-0">
          <a href="#" className="flex items-center gap-2 group">
            <FoddieLogo className="w-10 h-10 group-hover:scale-105 transition-transform duration-150" variant="badge" />
            <div className="flex flex-col">
              <span className="font-display text-2xl font-black tracking-tight text-[#EB1700] leading-none">
                Foddie Express
              </span>
            </div>
          </a>

          {/* Delivery / Pickup Segmented Control */}
          <div className="hidden md:flex items-center p-1 bg-neutral-100 rounded-full text-xs font-semibold">
            <button
              onClick={() => onToggleDeliveryMode('delivery')}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-150 whitespace-nowrap ${
                deliveryMode === 'delivery'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Delivery
            </button>
            <button
              onClick={() => onToggleDeliveryMode('pickup')}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-150 whitespace-nowrap ${
                deliveryMode === 'pickup'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Pickup
            </button>
          </div>

          {/* Address Dropdown Trigger */}
          <button
            onClick={onOpenAddressModal}
            className="hidden lg:flex items-center gap-1.5 text-xs text-neutral-700 hover:text-neutral-900 font-medium px-2 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
            title="Change Delivery Address"
          >
            <MapPin className="w-4 h-4 text-[#EB1700] shrink-0" />
            <span className="max-w-[180px] truncate text-neutral-900 font-semibold">
              {currentAddress.street}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>
        </div>

        {/* Center Zone: Search Bar */}
        <div className="flex-1 max-w-lg hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search cuisine, restaurants, or dishes..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 hover:bg-neutral-100/80 focus:bg-white text-sm rounded-full border border-transparent focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#EB1700]/15 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Zone: ExpressPass, Account & Cart Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* ExpressPass Button */}
          <button
            onClick={onOpenExpressPassModal}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              isExpressPassActive
                ? 'bg-amber-100 text-amber-900 border border-amber-300/80'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#EB1700]" />
            <span>{isExpressPassActive ? 'ExpressPass Active' : 'Get ExpressPass'}</span>
          </button>

          {/* User Sign In / Profile */}
          {userEmail ? (
            <div className="flex items-center gap-2">
              <span className="hidden xl:inline text-xs font-medium text-neutral-600 truncate max-w-[120px]">
                {userEmail}
              </span>
              <button
                onClick={onSignOut}
                className="px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:text-[#EB1700] hover:bg-neutral-100 rounded-full transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-neutral-800 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            aria-label="View Cart"
            className="flex items-center gap-2 px-4 py-2 bg-[#EB1700] hover:bg-[#D01400] text-white rounded-full font-bold text-xs tracking-tight transition-all duration-150 active:scale-95 shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-extrabold">{totalCartItems}</span>
            {totalCartItems > 0 && (
              <span className="hidden sm:inline border-l border-white/30 pl-2 tabular-nums">
                ₹{cartSubtotal.toFixed(0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search bar on small screens */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search food, groceries, dishes..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-100 text-sm rounded-full border border-transparent focus:bg-white focus:border-neutral-300 focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
};
