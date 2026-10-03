import React from 'react';
import { Star, Heart, Clock, Sparkles } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  isExpressPassActive: boolean;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  isFavorite,
  onToggleFavorite,
  onSelectRestaurant,
  isExpressPassActive,
}) => {
  return (
    <article
      onClick={() => onSelectRestaurant(restaurant)}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Visual Media Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
        />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(restaurant.id, e)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-sm flex items-center justify-center transition-transform active:scale-90"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-[#EB1700] text-[#EB1700]' : 'text-neutral-700'
            }`}
          />
        </button>

        {/* Promotional / Offer Badge */}
        {restaurant.offerBadge && (
          <div className="absolute bottom-3 left-3 bg-neutral-900/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
            {restaurant.offerBadge}
          </div>
        )}
      </div>

      {/* Restaurant Content Information */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Header Row: Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base font-bold text-neutral-900 group-hover:text-[#EB1700] transition-colors leading-snug truncate">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0 text-xs font-bold text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{restaurant.rating.toFixed(1)}</span>
              <span className="text-neutral-400 font-normal">({restaurant.reviewCount > 1000 ? `${(restaurant.reviewCount / 1000).toFixed(1)}k` : restaurant.reviewCount})</span>
            </div>
          </div>

          {/* Delivery Time, Distance, and Price */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1">
            <span className="font-semibold text-neutral-800 flex items-center gap-1">
              <Clock className="w-3 h-3 text-neutral-400" />
              {restaurant.deliveryTimeMinutes.min}–{restaurant.deliveryTimeMinutes.max} min
            </span>
            <span aria-hidden="true">·</span>
            <span>{restaurant.distanceMiles} mi</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-neutral-700">{restaurant.priceLevel}</span>
          </div>

          {/* Cuisine Categories */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1 truncate">
            {restaurant.cuisines.map((c, i) => (
              <React.Fragment key={c}>
                <span>{c}</span>
                {i < restaurant.cuisines.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Footer Row: Delivery Fee & ExpressPass Perk */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-neutral-600">
            {restaurant.deliveryFee === 0 || isExpressPassActive ? (
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#EB1700]" />
                ₹0 Delivery Fee
              </span>
            ) : (
              <span>₹{restaurant.deliveryFee} delivery fee</span>
            )}
          </div>
          {restaurant.isExpressPass && (
            <span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded">
              ExpressPass
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
