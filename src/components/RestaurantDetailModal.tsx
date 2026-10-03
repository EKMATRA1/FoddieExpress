import React, { useState, useMemo } from 'react';
import {
  X,
  Star,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  Search,
  Plus,
  ArrowLeft,
} from 'lucide-react';
import { Restaurant, MenuItem, SelectedOptionChoice } from '../types';
import { MENU_ITEMS, DEFAULT_MENU } from '../data/mockData';
import { DishCustomizationModal } from './DishCustomizationModal';

interface RestaurantDetailModalProps {
  restaurant: Restaurant;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    selectedOptions: SelectedOptionChoice[],
    specialInstructions: string
  ) => void;
  isExpressPassActive: boolean;
}

export const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({
  restaurant,
  onClose,
  onAddToCart,
  isExpressPassActive,
}) => {
  const [menuSearch, setMenuSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  const menu = useMemo(() => {
    return MENU_ITEMS[restaurant.id] || DEFAULT_MENU;
  }, [restaurant.id]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    menu.forEach((item) => set.add(item.category));
    return ['All', ...Array.from(set)];
  }, [menu]);

  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      const matchCat =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchSearch =
        !menuSearch.trim() ||
        item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(menuSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [menu, selectedCategory, menuSearch]);

  const handleDishClick = (item: MenuItem) => {
    // If the dish has options, open customization modal; otherwise also open modal so user can choose quantity/instructions
    setCustomizingItem(item);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center">
      <div className="bg-white min-h-screen w-full max-w-5xl shadow-2xl flex flex-col relative animate-in fade-in duration-150">
        {/* Sticky top action header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-4 sm:px-8 py-3 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-800 hover:text-[#EB1700] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Restaurants</span>
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cover Photo Banner */}
        <div className="relative h-60 sm:h-72 w-full bg-neutral-100 overflow-hidden">
          <img
            src={restaurant.coverImage}
            alt={restaurant.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Restaurant Title Info overlaid on photo */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              {restaurant.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-200 max-w-2xl font-medium">
              {restaurant.tagline}
            </p>
          </div>
        </div>

        {/* Store Metadata Card */}
        <div className="px-4 sm:px-8 py-6 border-b border-neutral-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-neutral-600">
                {/* Rating */}
                <div className="flex items-center gap-1 font-bold text-neutral-900 bg-neutral-100 px-2 py-1 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{restaurant.rating.toFixed(1)}</span>
                  <span className="text-neutral-500 font-normal">
                    ({restaurant.reviewCount} ratings)
                  </span>
                </div>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 font-medium text-neutral-700">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  {restaurant.deliveryTimeMinutes.min}–{restaurant.deliveryTimeMinutes.max} min
                </span>
                <span aria-hidden="true">·</span>
                <span>{restaurant.distanceMiles} miles away</span>
                <span aria-hidden="true">·</span>
                <span>{restaurant.priceLevel}</span>
              </div>

              {/* Address and Hours */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#EB1700]" />
                  {restaurant.address}
                </span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span>Hours: {restaurant.hours}</span>
                {restaurant.phone && (
                  <>
                    <span className="hidden sm:inline" aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-neutral-400" />
                      {restaurant.phone}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Delivery fee & ExpressPass notice */}
            <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3 sm:p-4 text-xs space-y-1">
              <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#EB1700]" />
                {restaurant.deliveryFee === 0 || isExpressPassActive ? (
                  <span className="text-emerald-700 font-bold">₹0 Delivery Fee Active</span>
                ) : (
                  <span>₹{restaurant.deliveryFee} Delivery Fee</span>
                )}
              </div>
              <p className="text-neutral-500 text-[11px]">
                Orders over ₹{restaurant.minOrder} qualify for ExpressPass discounts
              </p>
            </div>
          </div>

          {/* Offer Banner */}
          {restaurant.offerBadge && (
            <div className="mt-4 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{restaurant.offerBadge}</span>
            </div>
          )}
        </div>

        {/* Menu Navigation & Search */}
        <div className="sticky top-14 z-20 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Categories Tab list */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search inside menu */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              placeholder="Search store menu..."
              className="w-full pl-8 pr-3 py-1.5 bg-neutral-100 text-xs rounded-full border border-transparent focus:bg-white focus:border-neutral-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="px-4 sm:px-8 py-8 flex-1">
          {filteredMenu.length === 0 ? (
            <div className="text-center py-16 text-neutral-400 text-sm">
              No dishes found matching your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMenu.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleDishClick(item)}
                  className="group flex items-start justify-between gap-4 p-4 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-sm bg-white transition-all cursor-pointer"
                >
                  <div className="flex-1 flex flex-col justify-between min-h-[100px]">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-[#EB1700] transition-colors">
                          {item.name}
                        </h4>
                        {item.popular && (
                          <span className="text-[10px] font-bold text-[#EB1700] bg-[#EB1700]/10 px-1.5 py-0.5 rounded">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-bold text-sm text-neutral-900 tabular-nums">
                        ₹{item.price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDishClick(item);
                        }}
                        className="flex items-center gap-1 text-xs font-bold text-neutral-800 group-hover:text-white bg-neutral-100 group-hover:bg-[#EB1700] px-3 py-1.5 rounded-full transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Customization Modal */}
        {customizingItem && (
          <DishCustomizationModal
            item={customizingItem}
            restaurantName={restaurant.name}
            onClose={() => setCustomizingItem(null)}
            onAddToCart={onAddToCart}
          />
        )}
      </div>
    </div>
  );
};
