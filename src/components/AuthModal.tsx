import React, { useState } from 'react';
import { X, Tag, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'signin',
}) => {
  const [tab, setTab] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  // Sign In fields
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Sign Up fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail.trim() || !signInPassword.trim()) return;
    onLoginSuccess(signInEmail.trim());
    onClose();
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpEmail.trim()) return;
    onLoginSuccess(signUpEmail.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-[460px] w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
        {/* Top Close Button */}
        <div className="p-4 flex items-center justify-between pb-0 shrink-0">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-neutral-100 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6 pt-2 overflow-y-auto flex-1">
          {/* Main Title */}
          <h2 className="font-display text-2xl sm:text-3xl font-black text-neutral-900 mb-4 tracking-tight">
            Sign in or Sign up
          </h2>

          {/* Mint green discount promo banner */}
          <div className="bg-[#E6F7F5] border border-[#BCEEE7] rounded-xl p-3 flex items-center gap-2.5 mb-5 text-[#006A61] text-xs font-semibold">
            <Tag className="w-4 h-4 shrink-0 text-[#008375]" />
            <span>Sign in to access your credits and discounts</span>
          </div>

          {/* Segmented Pill: Sign In / Sign Up */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 bg-neutral-100 rounded-full text-xs font-bold">
              <button
                type="button"
                onClick={() => setTab('signin')}
                className={`px-6 py-2 rounded-full transition-all duration-150 cursor-pointer ${
                  tab === 'signin'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab('signup')}
                className={`px-6 py-2 rounded-full transition-all duration-150 cursor-pointer ${
                  tab === 'signup'
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {tab === 'signin' ? (
            /* Sign In Tab: Email & Password Only */
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-900 mb-1">
                  Email / Gmail Address
                </label>
                <input
                  type="email"
                  required
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full p-3 bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-xs sm:text-sm border border-neutral-300 rounded-xl focus:outline-none focus:border-[#EB1700] transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-neutral-900">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowSignInPassword((v) => !v)}
                    className="text-xs font-bold text-neutral-600 hover:text-neutral-900 cursor-pointer"
                  >
                    {showSignInPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  type={showSignInPassword ? 'text' : 'password'}
                  required
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full p-3 bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-xs sm:text-sm border border-neutral-300 rounded-xl focus:outline-none focus:border-[#EB1700] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#EB1700] hover:bg-[#D01400] text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-150 active:scale-98 shadow-sm cursor-pointer"
              >
                Sign In
              </button>

              <p className="text-[11px] text-neutral-400 text-center leading-relaxed pt-2">
                By tapping "Sign In", you agree to Foddie Express's{' '}
                <a href="#" className="underline text-neutral-600 hover:text-neutral-900">
                  Terms
                </a>{' '}
                and{' '}
                <a href="#" className="underline text-neutral-600 hover:text-neutral-900">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          ) : (
            /* Sign Up Tab */
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-900 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#EB1700]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-900 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#EB1700]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-neutral-900 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#EB1700]"
                />
              </div>

              {/* Mobile Number with Country Code */}
              <div>
                <label className="block text-xs font-bold text-neutral-900 mb-1">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="p-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#EB1700] shrink-0"
                  >
                    <option value="+91">+91 🇮🇳</option>
                    <option value="+1">+1 🇺🇸</option>
                    <option value="+44">+44 🇬🇧</option>
                    <option value="+61">+61 🇦🇺</option>
                  </select>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobile number"
                    className="flex-1 p-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#EB1700]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-neutral-900">
                    Password
                  </label>
                  <span className="text-[11px] text-neutral-400">
                    At least 10 characters
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2.5 pr-14 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#EB1700]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-700 hover:text-neutral-900 cursor-pointer"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-neutral-400 leading-relaxed pt-1">
                By tapping "Sign Up" or "Continue with...", you agree to Foddie Express's{' '}
                <a href="#" className="underline text-neutral-600 hover:text-neutral-900">
                  Terms
                </a>{' '}
                and{' '}
                <a href="#" className="underline text-neutral-600 hover:text-neutral-900">
                  Privacy Policy
                </a>
                .
              </p>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#EB1700] hover:bg-[#D01400] text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-150 active:scale-98 shadow-sm cursor-pointer"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
