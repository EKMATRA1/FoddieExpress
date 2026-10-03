import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  MapPin,
} from 'lucide-react';
import { CartItem, Address } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  currentAddress: Address;
  isExpressPassActive: boolean;
  onOpenExpressPassModal: () => void;
  onPlaceOrder: (orderSummary: {
    subtotal: number;
    deliveryFee: number;
    taxAndFees: number;
    tip: number;
    discount: number;
    total: number;
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentAddress,
  isExpressPassActive,
  onOpenExpressPassModal,
  onPlaceOrder,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [tipPercent, setTipPercent] = useState<number | 'custom'>(20);
  const [customTip, setCustomTip] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  // Delivery fee logic
  const baseDeliveryFee = cartItems.length > 0 ? 49 : 0;
  const deliveryFee = isExpressPassActive || subtotal > 299 ? 0 : baseDeliveryFee;

  // Taxes & estimated service fees (approx 5%)
  const taxAndFees = Math.round(subtotal * 0.05);

  // Tip calculation
  let calculatedTip = 0;
  if (tipPercent === 'custom') {
    calculatedTip = Math.max(0, parseInt(customTip, 10) || 0);
  } else {
    calculatedTip = Math.round(subtotal * (tipPercent / 100));
  }

  // Promo code
  const discount = appliedPromo ? appliedPromo.discount : 0;

  // Total
  const total = Math.max(0, subtotal + deliveryFee + taxAndFees + calculatedTip - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'FOODIE50' || code === 'WELCOME50' || code === 'FOODIE10') {
      setAppliedPromo({ code, discount: 50 });
      setPromoInput('');
    } else if (code === 'EXPRESS100' || code === 'SAVE100') {
      setAppliedPromo({ code, discount: 100 });
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code. Try "FOODIE50" or "SAVE100".');
    }
  };

  const handleCheckout = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onPlaceOrder({
        subtotal,
        deliveryFee,
        taxAndFees,
        tip: calculatedTip,
        discount,
        total,
      });
      onClose();
    }, 600);
  };

  const restaurantName = cartItems.length > 0 ? cartItems[0].restaurantName : '';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#EB1700]" />
            <div>
              <h2 className="font-display text-base font-bold text-neutral-900 leading-tight">
                Your Order
              </h2>
              {restaurantName && (
                <p className="text-xs text-neutral-500 font-medium truncate max-w-[200px]">
                  from {restaurantName}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">
              Your cart is empty
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs mb-6">
              Explore mouthwatering dishes from top local restaurants and start adding items!
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#EB1700] hover:bg-[#D01400] text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
            >
              Explore Restaurants
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {/* Delivery Address Banner */}
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center gap-2.5 text-xs text-neutral-700">
                <MapPin className="w-4 h-4 text-[#EB1700] shrink-0" />
                <div className="truncate">
                  <span className="font-bold text-neutral-900">Deliver to: </span>
                  <span>{currentAddress.street}</span>
                </div>
              </div>

              {/* ExpressPass Savings Banner */}
              {!isExpressPassActive ? (
                <div
                  onClick={onOpenExpressPassModal}
                  className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between cursor-pointer hover:bg-amber-100/70 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs text-amber-900">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Get <strong>₹0 delivery fee</strong> with ExpressPass</span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-900 underline">
                    Try Free
                  </span>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-900 font-semibold">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ExpressPass active: ₹0 Delivery Fee applied!</span>
                </div>
              )}

              {/* Items */}
              <div className="divide-y divide-neutral-100">
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="py-3 flex items-start gap-3">
                    {/* Item Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-lg object-cover bg-neutral-100 shrink-0"
                    />

                    {/* Item details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                          {item.name}
                        </h4>
                        <span className="text-xs font-bold text-neutral-900 tabular-nums">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                      </div>

                      {/* Options breakdown */}
                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <div className="text-[11px] text-neutral-500 mt-0.5 space-y-0.5">
                          {item.selectedOptions.map((opt, i) => (
                            <div key={i} className="truncate">
                              + {opt.optionName} {opt.price > 0 && `(+₹${opt.price})`}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Special instructions */}
                      {item.specialInstructions && (
                        <p className="text-[11px] text-neutral-400 italic mt-0.5 truncate">
                          Note: {item.specialInstructions}
                        </p>
                      )}

                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-neutral-100 rounded-full p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-600 hover:bg-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-600 hover:bg-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Form */}
              <div className="pt-3 border-t border-neutral-100">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. FOODIE50)"
                      className="w-full pl-8 pr-3 py-1.5 bg-neutral-100 text-xs rounded-xl border border-transparent focus:bg-white focus:border-neutral-300 focus:outline-none uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {promoError && (
                  <p className="text-[11px] text-red-600 mt-1">{promoError}</p>
                )}

                {appliedPromo && (
                  <div className="mt-2 flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg">
                    <span>Code <strong>{appliedPromo.code}</strong> applied (-₹{appliedPromo.discount})</span>
                    <button
                      onClick={() => setAppliedPromo(null)}
                      className="text-neutral-500 hover:text-neutral-800 font-bold ml-2 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Dasher Tip Selection */}
              <div className="pt-3 border-t border-neutral-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-800">
                    Dasher Tip (100% goes to driver)
                  </span>
                  <span className="text-xs font-bold text-neutral-900 tabular-nums">
                    ₹{calculatedTip}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 15, 20].map((percent) => (
                    <button
                      key={percent}
                      onClick={() => {
                        setTipPercent(percent);
                        setCustomTip('');
                      }}
                      className={`py-1.5 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                        tipPercent === percent
                          ? 'bg-[#EB1700] text-white border-[#EB1700]'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {percent}%
                    </button>
                  ))}
                  <button
                    onClick={() => setTipPercent('custom')}
                    className={`py-1.5 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                      tipPercent === 'custom'
                        ? 'bg-[#EB1700] text-white border-[#EB1700]'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    Custom
                  </button>
                </div>

                {tipPercent === 'custom' && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-500">₹</span>
                    <input
                      type="number"
                      step="5"
                      min="0"
                      value={customTip}
                      onChange={(e) => setCustomTip(e.target.value)}
                      placeholder="Tip amount in ₹"
                      className="w-full p-1.5 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:border-[#EB1700]"
                    />
                  </div>
                )}
              </div>

              {/* Cost Summary Breakdown */}
              <div className="pt-4 border-t border-neutral-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery Fee</span>
                  <span className="tabular-nums font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">₹0 Free</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Estimated Taxes & Fees</span>
                  <span className="tabular-nums font-semibold">₹{taxAndFees}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Dasher Tip</span>
                  <span className="tabular-nums font-semibold">₹{calculatedTip}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Promotion ({appliedPromo.code})</span>
                    <span className="tabular-nums">-₹{discount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm sm:text-base font-extrabold text-neutral-900">
                  <span>Total</span>
                  <span className="tabular-nums text-[#EB1700]">₹{total}</span>
                </div>
              </div>
            </div>

            {/* Bottom Checkout Action */}
            <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-200 shrink-0">
              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-[#EB1700] hover:bg-[#D01400] disabled:bg-neutral-400 text-white font-bold text-sm rounded-full transition-all duration-150 active:scale-98 flex items-center justify-between shadow-md cursor-pointer"
              >
                <span>{isSubmitting ? 'Placing Order...' : 'Checkout'}</span>
                <span className="flex items-center gap-1 tabular-nums">
                  ₹{total}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                <span>Protected by Foddie Express Contactless Guarantee</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
