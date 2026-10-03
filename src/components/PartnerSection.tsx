import React, { useState } from 'react';
import { ArrowRight, Bike, Store, Smartphone, Check, X } from 'lucide-react';

export const PartnerSection: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'dasher' | 'merchant' | 'app' | null>(null);
  const [partnerEmail, setPartnerEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setActiveModal(null);
      setPartnerEmail('');
    }, 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-neutral-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Become a Dasher */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-5">
              <Bike className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
              Become a Dasher
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-6">
              As a delivery driver, you'll make reliable money—working anytime, anywhere on your own schedule. Keep 100% of your tips.
            </p>
          </div>
          <button
            onClick={() => setActiveModal('dasher')}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#EB1700] hover:text-[#D01400] group cursor-pointer"
          >
            <span>Start earning</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Card 2: Partner with Foddie Express */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#EB1700] flex items-center justify-center mb-5">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
              Grow with Foddie Express
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-6">
              Grow your local restaurant sales and reach new hungry customers across your city with our logistics and ordering platform.
            </p>
          </div>
          <button
            onClick={() => setActiveModal('merchant')}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#EB1700] hover:text-[#D01400] group cursor-pointer"
          >
            <span>Sign up your store</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Card 3: Mobile App */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
              Try the Foddie App
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-6">
              Experience the fastest food delivery with live GPS pin tracking, real-time kitchen updates, and exclusive app discounts.
            </p>
          </div>
          <button
            onClick={() => setActiveModal('app')}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#EB1700] hover:text-[#D01400] group cursor-pointer"
          >
            <span>Get the app</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Partner Registration / App modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">
                  Thank you!
                </h3>
                <p className="text-xs text-neutral-500">
                  We sent the next steps directly to your email.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">
                  {activeModal === 'dasher'
                    ? 'Start Driving with Foddie Express'
                    : activeModal === 'merchant'
                    ? 'Partner Your Restaurant'
                    : 'Download Foddie Express App'}
                </h3>
                <p className="text-xs text-neutral-500 mb-5">
                  {activeModal === 'dasher'
                    ? 'Enter your email to receive the fast onboarding link and background check guidelines.'
                    : activeModal === 'merchant'
                    ? 'Reach thousands of diners in your neighborhood. Start with 0% commission for 30 days.'
                    : 'Scan the QR code or send an SMS link to download for iOS & Android.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full p-2.5 text-xs sm:text-sm border border-neutral-200 rounded-xl focus:outline-none focus:border-[#EB1700]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#EB1700] hover:bg-[#D01400] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Continue
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
