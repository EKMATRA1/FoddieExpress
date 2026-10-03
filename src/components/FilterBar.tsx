import React from 'react';
import { SlidersHorizontal, Star, Clock, Zap, Sparkles, X } from 'lucide-react';
import { SortOption } from '../types';

interface FilterBarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  under30Mins: boolean;
  onToggleUnder30Mins: () => void;
  rating45Plus: boolean;
  onToggleRating45Plus: () => void;
  freeDeliveryOnly: boolean;
  onToggleFreeDelivery: () => void;
  expressPassOnly: boolean;
  onToggleExpressPassOnly: () => void;
  selectedPriceLevel: string | null;
  onSelectPriceLevel: (level: string | null) => void;
  vegetarianOnly: boolean;
  onToggleVegetarian: () => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  totalResultsCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  sortBy,
  onSortChange,
  under30Mins,
  onToggleUnder30Mins,
  rating45Plus,
  onToggleRating45Plus,
  freeDeliveryOnly,
  onToggleFreeDelivery,
  expressPassOnly,
  onToggleExpressPassOnly,
  selectedPriceLevel,
  onSelectPriceLevel,
  vegetarianOnly,
  onToggleVegetarian,
  onResetFilters,
  hasActiveFilters,
  totalResultsCount,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        {/* Left: Scrollable Interactive Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {/* Under 30 mins */}
          <button
            onClick={onToggleUnder30Mins}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
              under30Mins
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Under 30 mins</span>
          </button>

          {/* Rating 4.5+ */}
          <button
            onClick={onToggleRating45Plus}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
              rating45Plus
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Over 4.5 ★</span>
          </button>

          {/* Free Delivery */}
          <button
            onClick={onToggleFreeDelivery}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
              freeDeliveryOnly
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#EB1700]" />
            <span>₹0 Delivery</span>
          </button>

          {/* ExpressPass */}
          <button
            onClick={onToggleExpressPassOnly}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
              expressPassOnly
                ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#EB1700]" />
            <span>ExpressPass</span>
          </button>

          {/* Price selector */}
          <div className="flex items-center bg-white border border-neutral-200 rounded-full p-0.5">
            {['₹', '₹₹', '₹₹₹'].map((p) => {
              const isSelected = selectedPriceLevel === p;
              return (
                <button
                  key={p}
                  onClick={() => onSelectPriceLevel(isSelected ? null : p)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-full transition-colors ${
                    isSelected
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>

          {/* Vegetarian */}
          <button
            onClick={onToggleVegetarian}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
              vegetarianOnly
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <span>🌱 Vegetarian</span>
          </button>

          {/* Reset button if active */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-neutral-500 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right: Results Count & Sort Dropdown */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          <span className="text-xs font-medium text-neutral-500">
            <strong>{totalResultsCount}</strong> {totalResultsCount === 1 ? 'store' : 'stores'} near you
          </span>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-white border border-neutral-200 text-neutral-800 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="fastest">Sort: Fastest Delivery</option>
              <option value="price_low">Sort: Price (Low to High)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
