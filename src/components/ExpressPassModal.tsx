import React from 'react';
import { X, Sparkles, Check, ShieldCheck, HeartHandshake, Percent } from 'lucide-react';

interface ExpressPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  isActive: boolean;
  onToggleActive: () => void;
}

export const ExpressPassModal: React.FC<ExpressPassModalProps> = ({
  isOpen,
  onClose,
  isActive,
  onToggleActive,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150">
        {/* Banner with gradient */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-amber-500 via-orange-500 to-[#EB1700] text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-black tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Foddie ExpressPass</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold leading-tight">
            Unlimited ₹0 delivery fees with ExpressPass
          </h2>
          <p className="text-white/90 text-xs sm:text-sm mt-2 max-w-md">
            Save an average of ₹150–₹250 per order across thousands of local restaurants and grocery stores.
          </p>
        </div>

        {/* Benefits list */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900">
                ₹0 Delivery Fees on ₹199+ orders
              </h4>
              <p className="text-xs text-neutral-500 mt-0.5">
                Enjoy unlimited free delivery on all eligible restaurant orders above ₹199.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <Percent className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900">
                Reduced Service Fees
              </h4>
              <p className="text-xs text-neutral-500 mt-0.5">
                Lower checkout service fees on every meal, saving you money every single day.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900">
                5% Back on Pickup Orders
              </h4>
              <p className="text-xs text-neutral-500 mt-0.5">
                Earn 5% in Foddie Express credits whenever you place pickup orders.
              </p>
            </div>
          </div>

          {/* Pricing Guarantee */}
          <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl flex items-center gap-3 text-xs text-neutral-600">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>30 days free</strong>, then ₹199/mo. Cancel anytime in 1-click without penalties.
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="p-6 bg-neutral-50 border-t border-neutral-200 flex flex-col gap-2">
          <button
            onClick={() => {
              onToggleActive();
              onClose();
            }}
            className={`w-full py-3.5 px-6 font-bold text-sm rounded-full transition-all duration-150 active:scale-98 shadow-sm cursor-pointer ${
              isActive
                ? 'bg-neutral-200 hover:bg-neutral-300 text-neutral-800'
                : 'bg-[#EB1700] hover:bg-[#D01400] text-white'
            }`}
          >
            {isActive ? 'Cancel ExpressPass Membership' : 'Start 30-Day Free Trial'}
          </button>
          <p className="text-center text-[11px] text-neutral-400">
            Terms apply. Automatic renewal applies until cancelled.
          </p>
        </div>
      </div>
    </div>
  );
};
