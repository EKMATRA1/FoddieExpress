import React from 'react';
import {
  Utensils,
  Flame,
  Pizza,
  Fish,
  Soup,
  Zap,
  Salad,
  Cake,
  Coffee,
  ShoppingBag,
} from 'lucide-react';
import { CUISINE_CATEGORIES } from '../data/mockData';

interface CategoryCarouselProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Flame':
      return <Flame className="w-5 h-5 text-orange-500" />;
    case 'Pizza':
      return <Pizza className="w-5 h-5 text-red-500" />;
    case 'Fish':
      return <Fish className="w-5 h-5 text-blue-500" />;
    case 'Soup':
      return <Soup className="w-5 h-5 text-amber-600" />;
    case 'Zap':
      return <Zap className="w-5 h-5 text-yellow-500" />;
    case 'Salad':
      return <Salad className="w-5 h-5 text-emerald-500" />;
    case 'Cake':
      return <Cake className="w-5 h-5 text-pink-500" />;
    case 'Coffee':
      return <Coffee className="w-5 h-5 text-amber-700" />;
    case 'ShoppingBag':
      return <ShoppingBag className="w-5 h-5 text-purple-600" />;
    case 'Utensils':
    default:
      return <Utensils className="w-5 h-5 text-[#EB1700]" />;
  }
};

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
        {CUISINE_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/70'
              }`}
            >
              <span className={`p-1 rounded-full ${isSelected ? 'bg-white/10' : 'bg-neutral-100'}`}>
                {getCategoryIcon(cat.icon)}
              </span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
