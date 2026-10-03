import React, { useState } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { FoddieLogo } from './FoddieLogo';

interface FooterProps {
  showAppBadges?: boolean;
  theme?: 'light' | 'dark';
  showBusinessColumn?: boolean;
}

const LANGUAGES = [
  { code: 'en-US', label: 'English (US)' },
  { code: 'es', label: 'Español' },
  { code: 'fr-CA', label: 'Français (Canada)' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ja', label: '日本語' },
  { code: 'pt-BR', label: 'Português (Brasil)' },
];

export const Footer: React.FC<FooterProps> = ({
  showAppBadges = false,
  theme = 'dark',
  showBusinessColumn = false,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const isLight = theme === 'light';

  return (
    <footer
      className={`${
        isLight ? 'bg-white text-neutral-900 border-neutral-200' : 'bg-[#494949] text-white border-neutral-700'
      } pt-16 pb-12 px-4 sm:px-8 border-t w-full`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top Columns Links */}
        <div
          className={`grid grid-cols-1 ${
            showBusinessColumn && showAppBadges
              ? 'sm:grid-cols-2 md:grid-cols-4'
              : showBusinessColumn || showAppBadges
              ? 'sm:grid-cols-2 md:grid-cols-3'
              : 'sm:grid-cols-2'
          } gap-8 lg:gap-12 pb-16`}
        >
          {/* Column 1: Get to Know Us */}
          <div>
            <h3 className={`font-bold text-sm sm:text-base mb-4 ${isLight ? 'text-neutral-900' : 'text-white'}`}>
              Get to Know Us
            </h3>
            <ul className={`space-y-2.5 text-xs sm:text-sm ${isLight ? 'text-neutral-600' : 'text-neutral-300'}`}>
              <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>About Us</a></li>
              <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Careers</a></li>
              <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Investors</a></li>
              <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Company Blog</a></li>
              <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Engineering Blog</a></li>
              <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Merchant Blog</a></li>
              <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Gift Cards</a></li>
              <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Promotions</a></li>
              <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>LinkedIn</a></li>
              <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Glassdoor</a></li>
              <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Accessibility</a></li>
              <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Newsroom</a></li>
            </ul>
          </div>

          {/* Column 2: Let Us Help You */}
          <div>
            <h3 className={`font-bold text-sm sm:text-base mb-4 ${isLight ? 'text-neutral-900' : 'text-white'}`}>
              Let Us Help You
            </h3>
            <ul className={`space-y-2.5 text-xs sm:text-sm ${isLight ? 'text-neutral-600' : 'text-neutral-300'}`}>
              <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Account Details</a></li>
              <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Order History</a></li>
              <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Help</a></li>
            </ul>
          </div>

          {/* Column 3: Doing Business (as in image.png) */}
          {showBusinessColumn && (
            <div>
              <h3 className={`font-bold text-sm sm:text-base mb-4 ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                Doing Business
              </h3>
              <ul className={`space-y-2.5 text-xs sm:text-sm ${isLight ? 'text-neutral-600' : 'text-neutral-300'}`}>
                <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Become a Dasher</a></li>
                <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>DoorDash Merchant</a></li>
                <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Get Dashers for Deliveries</a></li>
                <li><a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Get DoorDash for Business</a></li>
              </ul>
            </div>
          )}

          {/* Column 4: App Store & Google Play Badges (as in image.png) */}
          {showAppBadges && (
            <div className="flex flex-col items-start gap-3">
              {/* App Store Badge */}
              <button
                type="button"
                className="flex items-center gap-2.5 px-4 py-2 bg-[#494949] hover:bg-neutral-800 text-white rounded-xl transition-all cursor-pointer shadow-xs shrink-0 w-44"
              >
                <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.7-11.71-13.98-5.77-8.91-10.4-18.79-13.88-29.65-3.48-10.86-5.22-21.2-5.22-31.03 0-14.88 3.8-27.18 11.41-36.9 7.6-9.72 17.18-14.67 28.74-14.88 5.11 0 10.76 1.41 16.94 4.23 6.18 2.82 10.11 4.29 11.79 4.41 1.45 0 5.63-1.52 12.52-4.58 6.89-3.05 12.87-4.47 17.95-4.23 13.7.83 24.37 5.76 32.01 14.8-11.96 7.29-17.78 17.28-17.47 29.98.31 9.9 4.19 18.23 11.64 25 3.49 3.16 7.37 5.6 11.64 7.31-2.45 7.18-5.38 14.07-8.79 20.67zM119.22 33.15c0-7.39 2.66-14.28 7.98-20.67 5.32-6.39 12-10.65 20.04-12.78-.11 1.08-.22 2.06-.33 2.93-1.09 7.5-3.8 14.45-8.15 20.86-4.35 6.41-10.76 10.76-19.23 13.04-.11-.97-.31-2.1-.31-3.38z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-neutral-300">Available on the</div>
                  <div className="text-xs sm:text-sm font-bold text-white">App Store</div>
                </div>
              </button>

              {/* Google Play Badge */}
              <button
                type="button"
                className="flex items-center gap-2.5 px-4 py-2 bg-[#494949] hover:bg-neutral-800 text-white rounded-xl transition-all cursor-pointer shadow-xs shrink-0 w-44"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M3.6 1.8l11.2 11.2-2.8 2.8L2.4 3.7c-.5.5-.4 1.1 1.2-1.9z" />
                  <path fill="#FBBC04" d="M19.1 10.3l-4.3-2.5-3 3 3 3 4.3-2.5c.7-.4.7-1 0-1.4z" />
                  <path fill="#4285F4" d="M3.6 22.2c-1.6-3-1.7-2.4-1.2-1.9l9.6-12.1 2.8 2.8-11.2 11.2z" />
                  <path fill="#34A853" d="M14.8 7.8L3.6 1.8C3.1 1.5 2.7 1.7 2.4 2l12.4 12.4z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[9px] uppercase tracking-wide text-neutral-300">Android app on</div>
                  <div className="text-xs sm:text-sm font-bold text-white">Google Play</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Legal Links & Socials (matching image.png) */}
        <div
          className={`border-t ${
            isLight ? 'border-neutral-200 text-neutral-600' : 'border-neutral-600/60 text-neutral-300'
          } pt-8 flex flex-col xl:flex-row items-center justify-between gap-6 text-xs`}
        >
          {/* Left: Logo + Legal Links + Copyright */}
          <div className="flex flex-wrap items-center justify-center xl:justify-start gap-x-5 gap-y-2">
            <FoddieLogo className="w-7 h-7" variant="badge" />
            <a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Terms of Service</a>
            <a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Privacy</a>
            <a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Delivery Locations</a>
            <a href="#" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>Do Not Sell or Share My Personal Information</a>
            <span>© 2026 Foddie Express Inc.</span>
          </div>

          {/* Right: Language Selector Pill + Social Media Icons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* Language Selector Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangMenuOpen((v) => !v)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 ${
                  isLight ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800' : 'bg-[#E6E6E6] hover:bg-white text-neutral-800'
                } rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs select-none`}
              >
                <Globe className="w-3.5 h-3.5 text-neutral-700" />
                <span>{selectedLanguage}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-neutral-600 transition-transform duration-150 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Dropdown Menu */}
              {isLangMenuOpen && (
                <div className="absolute bottom-full mb-2 right-0 w-48 bg-white text-neutral-900 rounded-2xl shadow-xl border border-neutral-200 py-1.5 z-50 animate-in fade-in slide-in-from-bottom-2">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-100">
                    Select Language
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.label);
                        setIsLangMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold hover:bg-neutral-100 transition-colors text-left cursor-pointer"
                    >
                      <span className={selectedLanguage === lang.label ? 'text-[#EB1700] font-bold' : 'text-neutral-800'}>
                        {lang.label}
                      </span>
                      {selectedLanguage === lang.label && (
                        <Check className="w-3.5 h-3.5 text-[#EB1700]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Social Media Icons */}
            <div className={`flex items-center gap-5 ${isLight ? 'text-neutral-600' : 'text-neutral-300'}`}>
              <a href="#" aria-label="Facebook" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                </svg>
              </a>
              <a href="#" aria-label="X" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className={`hover:${isLight ? 'text-neutral-900' : 'text-white'} transition-colors`}>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
};
