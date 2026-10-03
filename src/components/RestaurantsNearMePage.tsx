import React, { useState } from 'react';
import {
  Menu,
  X,
  Home,
  HelpCircle,
  User,
  ChevronDown,
  Globe,
} from 'lucide-react';
import { Restaurant } from '../types';
import { Footer } from './Footer';
import { FoddieLogo } from './FoddieLogo';

interface RestaurantsNearMePageProps {
  onGoHome: () => void;
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
  onExploreRestaurants: () => void;
  onSelectRestaurant?: (restaurant: Restaurant) => void;
  restaurants?: Restaurant[];
}

export const RestaurantsNearMePage: React.FC<RestaurantsNearMePageProps> = ({
  onGoHome,
  onOpenSignIn,
  onOpenSignUp,
  onExploreRestaurants,
  onSelectRestaurant,
  restaurants,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isSeeMoreExpanded, setIsSeeMoreExpanded] = useState(false);

  const faqs = [
    {
      question: 'How does Foddie Express work?',
      answer:
        'Foddie Express connects you with the best local and national restaurants and stores in your area. Simply browse menus, select your favorite dishes, and place your order for super-fast delivery or pickup. You can track your Dasher live with real-time GPS tracking all the way to your door.',
    },
    {
      question: 'Can I schedule a delivery in advance?',
      answer:
        'Yes! You can schedule deliveries up to a week in advance and choose whatever delivery time window suits your daily routine or dinner party best.',
    },
    {
      question: 'How fast will I get my food?',
      answer:
        'Delivery times vary depending on distance and restaurant prep time, but most orders arrive in 25 to 40 minutes. You can see real-time estimates for each restaurant before ordering.',
    },
    {
      question: 'What is a group order and how can I create one?',
      answer:
        'Group orders allow you and your friends, family, or coworkers to add items to a shared cart from their own devices. Simply click "Group Order" on any restaurant page and share the link.',
    },
    {
      question: 'What is ExpressPass?',
      answer:
        'ExpressPass is our membership program offering unlimited ₹0 delivery fees and reduced service fees on eligible restaurant and grocery orders, plus 5% back on pickup orders.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-[#191919] flex flex-col">
      {/* 1. Top Navigation Bar (Identical to Screenshots 1629 & 1630) */}
      <header className="sticky top-0 z-30 bg-white border-b border-neutral-200/80 px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Left: Hamburger button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-neutral-100 text-neutral-800 transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Center: Red Brand Logo */}
        <div
          onClick={onGoHome}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <FoddieLogo className="w-8 h-8 sm:w-9 sm:h-9" variant="badge" />
          <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-[#EB1700]">
            Foddie Express
          </span>
        </div>

        {/* Right: Sign In & Sign Up */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSignIn}
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-neutral-800 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={onOpenSignUp}
            className="px-4 sm:px-5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs sm:text-sm font-bold rounded-full transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* 2. Slide-out Left Sidebar Drawer (Screenshot 1630) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity animate-in fade-in"
          />

          {/* Drawer content */}
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-left duration-200">
            <div>
              {/* Circular Close Button */}
              <div className="mb-6">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-10 h-10 rounded-full border border-neutral-300 hover:bg-neutral-100 flex items-center justify-center text-neutral-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Main Nav Items */}
              <nav className="space-y-1 pb-6 border-b border-neutral-200">
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    onGoHome();
                  }}
                  className="w-full flex items-center gap-4 px-3 py-3 text-neutral-900 hover:bg-neutral-100 rounded-xl font-bold text-base transition-colors text-left cursor-pointer"
                >
                  <Home className="w-5 h-5 text-neutral-700" />
                  <span>Home</span>
                </button>

                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-3 py-3 text-neutral-900 hover:bg-neutral-100 rounded-xl font-bold text-base transition-colors text-left cursor-pointer"
                >
                  <HelpCircle className="w-5 h-5 text-neutral-700" />
                  <span>Help</span>
                </button>

                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    onOpenSignIn();
                  }}
                  className="w-full flex items-center gap-4 px-3 py-3 text-neutral-900 hover:bg-neutral-100 rounded-xl font-bold text-base transition-colors text-left cursor-pointer"
                >
                  <User className="w-5 h-5 text-neutral-700" />
                  <span>Sign Up or Sign In</span>
                </button>
              </nav>

              {/* Language Selector */}
              <div className="py-5 border-b border-neutral-200">
                <div className="inline-flex items-center gap-2 px-3 py-2 bg-neutral-100 rounded-full text-xs font-bold text-neutral-800 cursor-pointer hover:bg-neutral-200 transition-colors">
                  <Globe className="w-4 h-4 text-neutral-600" />
                  <span>English (US)</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                </div>
              </div>

              {/* Secondary Links (Screenshot 1630) */}
              <ul className="py-5 space-y-3.5 text-xs sm:text-sm font-semibold text-neutral-700">
                <li>
                  <a href="#" className="hover:text-neutral-900 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neutral-900 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neutral-900 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neutral-900 transition-colors">
                    Engineering Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neutral-900 transition-colors">
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumbs: Home / Restaurants (Screenshot 1629) */}
        <div className="text-xs sm:text-sm text-neutral-500 mb-8">
          <button
            onClick={onGoHome}
            className="hover:underline font-medium text-neutral-700 cursor-pointer"
          >
            Home
          </button>
          <span className="mx-2">/</span>
          <span className="text-neutral-500">Restaurants</span>
        </div>

        {/* Hero Section (Screenshot 1629) */}
        <div className="text-center max-w-3xl mx-auto py-6 sm:py-10">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Discover the Best Restaurants Near Me - Foddie Express
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Order online for super-fast delivery or pick-up, powered by Foddie Express.
          </p>

          {/* Red primary button: Sign in to order */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              onClick={onOpenSignIn}
              className="w-full sm:w-[420px] py-3.5 px-8 bg-[#EB1700] hover:bg-[#D01400] text-white font-bold text-sm sm:text-base rounded-full shadow-md transition-all duration-150 active:scale-98 cursor-pointer"
            >
              Sign in to order
            </button>

            {/* Secondary link: Search nearby */}
            <button
              onClick={onExploreRestaurants}
              className="text-neutral-900 font-bold text-sm sm:text-base underline hover:text-[#EB1700] transition-colors cursor-pointer"
            >
              Search nearby
            </button>
          </div>
        </div>

        {/* Frequently Asked Questions (Screenshot 1629) */}
        <section className="mt-16 sm:mt-24 pt-12 border-t border-neutral-200">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-8">
            Frequently asked questions
          </h2>

          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="py-4 sm:py-5">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-neutral-900 cursor-pointer group"
                  >
                    <span className="group-hover:text-[#EB1700] transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-500 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#EB1700]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed pr-8 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Top Cuisines and Top Cities on Foddie Express (Screenshot 1632) */}
        <section className="mt-16 sm:mt-24 pt-10 border-t border-neutral-200">
          {/* Top Cuisines */}
          <div className="mb-12">
            <h2 className="font-display text-xl sm:text-2xl font-black text-neutral-900 mb-6">
              Top Cuisines on Foddie Express
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3.5 gap-x-6 text-xs sm:text-sm text-neutral-800">
              {/* Column 1 */}
              <div className="space-y-3.5">
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Pizza</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Thai Food</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Dessert</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Vegan Food</p>
                {isSeeMoreExpanded && (
                  <>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Mexican Food</p>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Japanese Food</p>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">BBQ</p>
                  </>
                )}
              </div>

              {/* Column 2 */}
              <div className="space-y-3.5">
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Chinese Food</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Lunch</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Burgers</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Sandwiches</p>
                {isSeeMoreExpanded && (
                  <>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Fast Food</p>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Wings</p>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Breakfast</p>
                  </>
                )}
              </div>

              {/* Column 3 */}
              <div className="space-y-3.5">
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Sushi</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Seafood</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Asian Food</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Restaurants</p>
                {isSeeMoreExpanded && (
                  <>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Noodles</p>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Bakery</p>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Salad</p>
                  </>
                )}
              </div>

              {/* Column 4 */}
              <div className="space-y-3.5">
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Cafe</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Indian Food</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Italian Food</p>
                {isSeeMoreExpanded && (
                  <>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Mediterranean</p>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Ice Cream</p>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Korean Food</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Top Cities */}
          <div className="mb-8">
            <h2 className="font-display text-xl sm:text-2xl font-black text-neutral-900 mb-6">
              Top Cities on Foddie Express
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3.5 gap-x-6 text-xs sm:text-sm text-neutral-800">
              {/* Column 1 */}
              <div className="space-y-3.5">
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">New York</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Houston</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">San Francisco</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Vancouver, BC</p>
                {isSeeMoreExpanded && (
                  <>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Boston</p>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Austin</p>
                  </>
                )}
              </div>

              {/* Column 2 */}
              <div className="space-y-3.5">
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Los Angeles</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Brooklyn</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Seattle</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Miami</p>
                {isSeeMoreExpanded && (
                  <>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Dallas</p>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Philadelphia</p>
                  </>
                )}
              </div>

              {/* Column 3 */}
              <div className="space-y-3.5">
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Toronto</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">San Diego</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Atlanta</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">San Antonio</p>
                {isSeeMoreExpanded && (
                  <>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Washington DC</p>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Denver</p>
                  </>
                )}
              </div>

              {/* Column 4 */}
              <div className="space-y-3.5">
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Chicago</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Las Vegas</p>
                <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Queens</p>
                {isSeeMoreExpanded && (
                  <>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Phoenix</p>
                    <p className="hover:text-[#EB1700] hover:underline cursor-pointer">Portland</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* See more ⌵ button (Screenshot 1632) */}
          <div className="pt-2 pb-6">
            <button
              onClick={() => setIsSeeMoreExpanded((v) => !v)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs sm:text-sm font-bold rounded-full transition-colors cursor-pointer"
            >
              <span>{isSeeMoreExpanded ? 'See less' : 'See more'}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isSeeMoreExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </section>
      </main>

      {/* Dark Footer with language selector between copyright and social icons */}
      <Footer showAppBadges={false} />
    </div>
  );
};
