import React from 'react';
import { Restaurant } from '../types';
import { RestaurantCard } from './RestaurantCard';
import { Utensils } from 'lucide-react';

interface RestaurantGridProps {
  restaurants: Restaurant[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  isExpressPassActive: boolean;
  onResetFilters: () => void;
}

export const RestaurantGrid: React.FC<RestaurantGridProps> = ({
  restaurants,
  favorites,
  onToggleFavorite,
  onSelectRestaurant,
  isExpressPassActive,
  onResetFilters,
}) => {
  if (restaurants.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
          <Utensils className="w-8 h-8" />
        </div>
        <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
          No restaurants match your filters
        </h3>
        <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
          Try clearing some filters or searching for another cuisine or dish.
        </p>
        <button
          onClick={onResetFilters}
          className="px-5 py-2.5 bg-[#EB1700] hover:bg-[#D01400] text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            isFavorite={favorites.includes(restaurant.id)}
            onToggleFavorite={onToggleFavorite}
            onSelectRestaurant={onSelectRestaurant}
            isExpressPassActive={isExpressPassActive}
          />
        ))}
      </div>
    </div>
  );
};
