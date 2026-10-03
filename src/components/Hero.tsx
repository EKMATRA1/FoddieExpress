import React, { useState } from 'react';
import { MapPin, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

interface HeroProps {
  onAddressSearch: (address: string) => void;
  onExploreFood: () => void;
  isExpressPassActive: boolean;
  onOpenExpressPassModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onAddressSearch,
  onExploreFood,
  isExpressPassActive,
  onOpenExpressPassModal,
}) => {
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onAddressSearch(inputVal.trim());
    } else {
      onExploreFood();
    }
  };

  return (
    <section className="relative overflow-hidden bg-neutral-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-6 mb-8 shadow-sm">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Artisanal food feast delivered by Foddie Express"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-900/60" />
      </div>

      <div className="relative z-10 max-w-4xl px-6 py-12 sm:px-12 sm:py-16 md:py-20 flex flex-col justify-center">
        {/* Editorial Pill-Free Subtitle */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF5B4D] mb-3">
          <span>Fast Doorstep Delivery</span>
          <span aria-hidden="true">·</span>
          <span>Top Local Favorites</span>
          <span aria-hidden="true">·</span>
          <span>Live Tracking</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white max-w-2xl text-balance">
          Restaurants and more, delivered to your door.
        </h1>

        <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
          Order from your favorite local diners, gourmet kitchens, and everyday groceries in minutes with Foddie Express.
        </p>

        {/* Address & Quick Search Module */}
        <form onSubmit={handleSubmit} className="mt-8 max-w-xl">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white p-1.5 sm:p-2 rounded-2xl shadow-xl border border-white/20 gap-2">
            <div className="flex items-center gap-2.5 px-3 flex-1">
              <MapPin className="w-5 h-5 text-[#EB1700] shrink-0" />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter delivery address (e.g. 742 Evergreen Terr)"
                className="w-full py-2 bg-transparent text-neutral-900 placeholder-neutral-400 text-sm sm:text-base focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#EB1700] hover:bg-[#D01400] text-white font-bold text-sm sm:text-base rounded-xl transition-all duration-150 active:scale-98 shrink-0 cursor-pointer shadow-md"
            >
              <span>Find Food</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Quick Highlights / Proof badges */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-neutral-300">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#EB1700] shrink-0" />
            <span>Average delivery time <strong>24 mins</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#EB1700] shrink-0" />
            <span>On-time guarantee & sealed bags</span>
          </div>
          <div
            onClick={onOpenExpressPassModal}
            className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
          >
            <Award className="w-4 h-4 text-[#EB1700] shrink-0" />
            <span>
              {isExpressPassActive ? (
                <strong className="text-amber-400">ExpressPass Active (₹0 Delivery)</strong>
              ) : (
                <span><strong>₹0 Delivery Fee</strong> with ExpressPass</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
