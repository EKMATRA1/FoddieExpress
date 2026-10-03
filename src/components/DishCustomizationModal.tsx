import React, { useState } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { MenuItem, MenuOption, SelectedOptionChoice } from '../types';

interface DishCustomizationModalProps {
  item: MenuItem;
  restaurantName: string;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    selectedOptions: SelectedOptionChoice[],
    specialInstructions: string
  ) => void;
}

export const DishCustomizationModal: React.FC<DishCustomizationModalProps> = ({
  item,
  restaurantName,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, MenuOption[]>>(() => {
    const initial: Record<string, MenuOption[]> = {};
    if (item.options) {
      item.options.forEach((group) => {
        // If required, pre-select the first option
        if (group.required && group.options.length > 0) {
          initial[group.id] = [group.options[0]];
        } else {
          initial[group.id] = [];
        }
      });
    }
    return initial;
  });
  const [instructions, setInstructions] = useState('');

  const handleSelectOption = (
    groupId: string,
    option: MenuOption,
    isRequired: boolean,
    maxSelect?: number
  ) => {
    setSelectedChoices((prev) => {
      const currentList = prev[groupId] || [];

      // If required / single selection
      if (isRequired || maxSelect === 1) {
        return { ...prev, [groupId]: [option] };
      }

      // If checkbox style multi-select
      const exists = currentList.some((opt) => opt.id === option.id);
      if (exists) {
        return {
          ...prev,
          [groupId]: currentList.filter((opt) => opt.id !== option.id),
        };
      } else {
        if (maxSelect && currentList.length >= maxSelect) {
          return prev;
        }
        return {
          ...prev,
          [groupId]: [...currentList, option],
        };
      }
    });
  };

  // Calculate unit price including options
  const optionsExtra = Object.values(selectedChoices)
    .flat()
    .reduce((sum, opt) => sum + opt.price, 0);
  const unitPrice = item.price + optionsExtra;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    const formattedOptions: SelectedOptionChoice[] = [];
    if (item.options) {
      item.options.forEach((group) => {
        const choices = selectedChoices[group.id] || [];
        choices.forEach((opt) => {
          formattedOptions.push({
            groupTitle: group.title,
            optionName: opt.name,
            price: opt.price,
          });
        });
      });
    }

    onAddToCart(item, quantity, formattedOptions, instructions.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Header with image */}
        <div className="relative aspect-[16/9] w-full bg-neutral-100 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md cursor-pointer transition-transform active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dish Title & Description */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <h2 className="font-display text-xl font-bold text-neutral-900">
              {item.name}
            </h2>
            <span className="font-bold text-lg text-neutral-900 tabular-nums">
              ₹{item.price}
            </span>
          </div>
          <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
            {item.description}
          </p>

          {/* Option Groups */}
          {item.options &&
            item.options.map((group) => {
              const selectedInGroup = selectedChoices[group.id] || [];
              return (
                <div key={group.id} className="mb-6 pt-4 border-t border-neutral-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-neutral-900">
                      {group.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-neutral-400">
                      {group.required ? 'Required · Select 1' : 'Optional'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {group.options.map((option) => {
                      const isSelected = selectedInGroup.some((opt) => opt.id === option.id);
                      return (
                        <div
                          key={option.id}
                          onClick={() =>
                            handleSelectOption(
                              group.id,
                              option,
                              group.required,
                              group.maxSelect
                            )
                          }
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                            isSelected
                              ? 'border-[#EB1700] bg-[#EB1700]/5 text-neutral-900'
                              : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                                isSelected
                                  ? 'border-[#EB1700] bg-[#EB1700] text-white'
                                  : 'border-neutral-300 bg-white'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="text-xs sm:text-sm font-medium">
                              {option.name}
                            </span>
                          </div>
                          {option.price > 0 && (
                            <span className="text-xs font-semibold text-neutral-600 tabular-nums">
                              +₹{option.price}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

          {/* Special Instructions */}
          <div className="pt-4 border-t border-neutral-100 mb-4">
            <label className="block text-xs font-bold text-neutral-800 mb-2">
              Special Instructions
            </label>
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Extra spicy, no onions, keep sauce separate..."
              className="w-full text-xs sm:text-sm p-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#EB1700] focus:border-[#EB1700]"
            />
          </div>
        </div>

        {/* Bottom Bar: Quantity & Add to Cart button */}
        <div className="p-4 sm:p-6 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-white border border-neutral-200 rounded-full p-1 shadow-2xs">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-neutral-900 tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-3.5 px-6 bg-[#EB1700] hover:bg-[#D01400] text-white font-bold text-xs sm:text-sm rounded-full transition-all duration-150 active:scale-98 flex items-center justify-between shadow-sm cursor-pointer"
          >
            <span>Add to Cart</span>
            <span className="tabular-nums">₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
