/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Restaurant,
  MenuItem,
  CartItem,
  Order,
  Address,
  SortOption,
  SelectedOptionChoice,
} from './types';
import { RESTAURANTS, INITIAL_ADDRESSES, MENU_ITEMS } from './data/mockData';
import { LoggedOutLanding } from './components/LoggedOutLanding';
import { RestaurantsNearMePage } from './components/RestaurantsNearMePage';
import { DashPassPage } from './components/DashPassPage';
import { GroceryDeliveryPage } from './components/GroceryDeliveryPage';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryCarousel } from './components/CategoryCarousel';
import { FilterBar } from './components/FilterBar';
import { RestaurantGrid } from './components/RestaurantGrid';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ExpressPassModal } from './components/ExpressPassModal';
import { AddressModal } from './components/AddressModal';
import { AuthModal } from './components/AuthModal';
import { PartnerSection } from './components/PartnerSection';
import { Footer } from './components/Footer';

export default function App() {
  // View mode: 'landing' (DoorDash public page without login), 'restaurants-near-me', 'dashpass', 'grocery-delivery', or 'feed' (logged-in / ordering food feed)
  const [viewMode, setViewMode] = useState<'landing' | 'feed' | 'restaurants-near-me' | 'dashpass' | 'grocery-delivery'>('landing');

  // Navigation & Location
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [currentAddress, setCurrentAddress] = useState<Address>(INITIAL_ADDRESSES[0]);
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [under30Mins, setUnder30Mins] = useState(false);
  const [rating45Plus, setRating45Plus] = useState(false);
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);
  const [expressPassOnly, setExpressPassOnly] = useState(false);
  const [selectedPriceLevel, setSelectedPriceLevel] = useState<string | null>(null);
  const [vegetarianOnly, setVegetarianOnly] = useState(false);

  // User & Membership (default null: without login)
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isExpressPassActive, setIsExpressPassActive] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(['rest-1', 'rest-3']);

  // Modals & Panels
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isExpressPassModalOpen, setIsExpressPassModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialMode, setAuthModalInitialMode] = useState<'signin' | 'signup'>('signin');

  // Cart & Order State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Handlers for switching views
  const handleOpenSignIn = () => {
    setAuthModalInitialMode('signin');
    setIsAuthModalOpen(true);
  };

  const handleOpenSignUp = () => {
    setAuthModalInitialMode('signup');
    setIsAuthModalOpen(true);
  };

  const handleStartOrdering = () => {
    setViewMode('feed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLandingAddressSubmit = (addr: string) => {
    setCurrentAddress((prev) => ({
      ...prev,
      street: addr,
    }));
    setViewMode('feed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Favorite toggle
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add Item to Cart
  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    selectedOptions: SelectedOptionChoice[],
    specialInstructions: string
  ) => {
    if (cartItems.length > 0 && cartItems[0].restaurantId !== item.restaurantId) {
      const confirmSwitch = window.confirm(
        `Your cart contains items from "${cartItems[0].restaurantName}". Would you like to clear your cart and start a new order with "${item.restaurantId}"?`
      );
      if (!confirmSwitch) return;
      setCartItems([]);
    }

    const restaurant = RESTAURANTS.find((r) => r.id === item.restaurantId);
    const optionsTotal = selectedOptions.reduce((s, opt) => s + opt.price, 0);
    const unitPrice = item.price + optionsTotal;

    const newCartItem: CartItem = {
      cartItemId: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      menuItemId: item.id,
      restaurantId: item.restaurantId,
      restaurantName: restaurant ? restaurant.name : 'Restaurant',
      name: item.name,
      basePrice: item.price,
      unitPrice,
      quantity,
      image: item.image,
      selectedOptions,
      specialInstructions,
    };

    setCartItems((prev) => [...prev, newCartItem]);
    setIsCartOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Place Order & Launch Live Tracking
  const handlePlaceOrder = (summary: {
    subtotal: number;
    deliveryFee: number;
    taxAndFees: number;
    tip: number;
    discount: number;
    total: number;
  }) => {
    if (cartItems.length === 0) return;

    const firstItem = cartItems[0];
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      restaurantId: firstItem.restaurantId,
      restaurantName: firstItem.restaurantName,
      items: [...cartItems],
      subtotal: summary.subtotal,
      deliveryFee: summary.deliveryFee,
      taxAndFees: summary.taxAndFees,
      tip: summary.tip,
      discount: summary.discount,
      total: summary.total,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'confirmed',
      estimatedMinutes: 24,
      deliveryAddress: `${currentAddress.street}, ${currentAddress.cityStateZip}`,
      deliveryMode,
      dasherName: 'Rohan Verma',
      dasherVehicle: 'Honda Activa · Silver (MH 02 BG 4591)',
      dasherRating: 4.97,
    };

    setActiveOrder(newOrder);
    setCartItems([]);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setUnder30Mins(false);
    setRating45Plus(false);
    setFreeDeliveryOnly(false);
    setExpressPassOnly(false);
    setSelectedPriceLevel(null);
    setVegetarianOnly(false);
    setSortBy('recommended');
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedCategory !== 'all' ||
    under30Mins ||
    rating45Plus ||
    freeDeliveryOnly ||
    expressPassOnly ||
    selectedPriceLevel !== null ||
    vegetarianOnly;

  // Filter & Sort Logic
  const filteredRestaurants = useMemo(() => {
    let list = RESTAURANTS.filter((r) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const matchesCat = r.cuisines.some(
          (c) => c.toLowerCase() === selectedCategory.toLowerCase()
        );
        if (!matchesCat) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesCuisines = r.cuisines.some((c) => c.toLowerCase().includes(q));
        const storeMenu = MENU_ITEMS[r.id] || [];
        const matchesMenu = storeMenu.some(
          (m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesCuisines && !matchesMenu) return false;
      }

      // Fast delivery under 30 mins
      if (under30Mins && r.deliveryTimeMinutes.max > 30) {
        return false;
      }

      // Rating 4.5+
      if (rating45Plus && r.rating < 4.5) {
        return false;
      }

      // Free delivery
      if (freeDeliveryOnly && r.deliveryFee > 0 && !isExpressPassActive) {
        return false;
      }

      // ExpressPass
      if (expressPassOnly && !r.isExpressPass) {
        return false;
      }

      // Price level
      if (selectedPriceLevel && r.priceLevel !== selectedPriceLevel) {
        return false;
      }

      // Vegetarian
      if (vegetarianOnly) {
        const hasVeg =
          r.cuisines.includes('Vegetarian') ||
          r.cuisines.includes('Salads') ||
          r.cuisines.includes('Healthy');
        if (!hasVeg) return false;
      }

      return true;
    });

    // Sort
    return [...list].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'fastest') return a.deliveryTimeMinutes.min - b.deliveryTimeMinutes.min;
      if (sortBy === 'price_low') return a.priceLevel.length - b.priceLevel.length;
      return 0; // recommended
    });
  }, [
    selectedCategory,
    searchQuery,
    under30Mins,
    rating45Plus,
    freeDeliveryOnly,
    expressPassOnly,
    selectedPriceLevel,
    vegetarianOnly,
    sortBy,
    isExpressPassActive,
  ]);

  // Cart metrics
  const totalCartItems = cartItems.reduce((s, i) => s + i.quantity, 0);
  const cartSubtotal = cartItems.reduce((s, i) => s + i.unitPrice * i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#191919]">
      {/* If viewMode is 'landing' (without login public DoorDash page as in screenshots) */}
      {viewMode === 'landing' ? (
        <LoggedOutLanding
          onOpenSignIn={handleOpenSignIn}
          onOpenSignUp={handleOpenSignUp}
          onAddressSubmit={handleLandingAddressSubmit}
          onStartOrdering={handleStartOrdering}
          onOpenExpressPass={() => {
            setViewMode('dashpass');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenRestaurantsNearMe={() => {
            setViewMode('restaurants-near-me');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenGroceryDelivery={() => {
            setViewMode('grocery-delivery');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : viewMode === 'dashpass' ? (
        /* 'DashPass' Dedicated Page matching Screenshots 1635 & 1636 */
        <DashPassPage
          onGoHome={() => {
            setViewMode('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenSignIn={handleOpenSignIn}
          onOpenSignUp={handleOpenSignUp}
          onExploreFeed={(cat) => {
            if (cat) {
              setSelectedCategory(cat);
            }
            setViewMode('feed');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAddressModal={() => setIsAddressModalOpen(true)}
          onSelectAddress={setCurrentAddress}
          onOpenCart={() => setIsCartOpen(true)}
          currentAddress={currentAddress}
          totalCartItems={totalCartItems}
        />
      ) : viewMode === 'grocery-delivery' ? (
        /* 'Grocery Delivery' Page matching video */
        <GroceryDeliveryPage
          onGoHome={() => {
            setViewMode('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenSignIn={handleOpenSignIn}
          onOpenSignUp={handleOpenSignUp}
          onExploreFeed={(cat) => {
            if (cat) {
              setSelectedCategory(cat);
            }
            setViewMode('feed');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAddressModal={() => setIsAddressModalOpen(true)}
          onSelectAddress={setCurrentAddress}
          onOpenCart={() => setIsCartOpen(true)}
          currentAddress={currentAddress}
          totalCartItems={totalCartItems}
        />
      ) : viewMode === 'restaurants-near-me' ? (
        /* 'Restaurants Near Me' Page matching Screenshots 1629 & 1630 */
        <RestaurantsNearMePage
          onGoHome={() => {
            setViewMode('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenSignIn={handleOpenSignIn}
          onOpenSignUp={handleOpenSignUp}
          onExploreRestaurants={() => {
            setViewMode('feed');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectRestaurant={(rest) => setSelectedRestaurant(rest)}
          restaurants={RESTAURANTS}
        />
      ) : (
        /* If viewMode is 'feed' (active ordering app with menus, cart, tracking) */
        <>
          {/* Top persistent quick return to Landing Page pill */}
          <div className="bg-neutral-900 text-white text-[11px] font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-3">
            <span>Viewing Food Ordering Feed</span>
            <button
              onClick={() => setViewMode('landing')}
              className="text-[#FF7D70] hover:text-white underline font-bold cursor-pointer"
            >
              Switch to Public Landing Page (Without Login)
            </button>
          </div>

          {/* DoorDash Header */}
          <Header
            currentAddress={currentAddress}
            deliveryMode={deliveryMode}
            onToggleDeliveryMode={setDeliveryMode}
            onOpenAddressModal={() => setIsAddressModalOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalCartItems={totalCartItems}
            cartSubtotal={cartSubtotal}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenExpressPassModal={() => setIsExpressPassModalOpen(true)}
            isExpressPassActive={isExpressPassActive}
            onOpenAuthModal={handleOpenSignIn}
            userEmail={userEmail}
            onSignOut={() => {
              setUserEmail(null);
              setViewMode('landing');
            }}
          />

          <main className="flex-1">
            {/* DoorDash Hero Section */}
            <Hero
              onAddressSearch={(addr) => {
                setCurrentAddress((prev) => ({ ...prev, street: addr }));
                setIsAddressModalOpen(true);
              }}
              onExploreFood={() => {
                const feed = document.getElementById('food-feed');
                feed?.scrollIntoView({ behavior: 'smooth' });
              }}
              isExpressPassActive={isExpressPassActive}
              onOpenExpressPassModal={() => setIsExpressPassModalOpen(true)}
            />

            {/* Cuisine Category Carousel */}
            <CategoryCarousel
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => setSelectedCategory(catId)}
            />

            {/* Interactive Filter and Sort Bar */}
            <div id="food-feed">
              <FilterBar
                sortBy={sortBy}
                onSortChange={setSortBy}
                under30Mins={under30Mins}
                onToggleUnder30Mins={() => setUnder30Mins((v) => !v)}
                rating45Plus={rating45Plus}
                onToggleRating45Plus={() => setRating45Plus((v) => !v)}
                freeDeliveryOnly={freeDeliveryOnly}
                onToggleFreeDelivery={() => setFreeDeliveryOnly((v) => !v)}
                expressPassOnly={expressPassOnly}
                onToggleExpressPassOnly={() => setExpressPassOnly((v) => !v)}
                selectedPriceLevel={selectedPriceLevel}
                onSelectPriceLevel={setSelectedPriceLevel}
                vegetarianOnly={vegetarianOnly}
                onToggleVegetarian={() => setVegetarianOnly((v) => !v)}
                onResetFilters={handleResetFilters}
                hasActiveFilters={hasActiveFilters}
                totalResultsCount={filteredRestaurants.length}
              />
            </div>

            {/* Restaurant Grid with High-Fidelity Food Photography */}
            <RestaurantGrid
              restaurants={filteredRestaurants}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectRestaurant={(rest) => setSelectedRestaurant(rest)}
              isExpressPassActive={isExpressPassActive}
              onResetFilters={handleResetFilters}
            />

            {/* Partner & App Download Section */}
            <PartnerSection />
          </main>

          {/* DoorDash Comprehensive Footer */}
          <Footer />
        </>
      )}

      {/* Modals & Slide-out Drawers */}
      {selectedRestaurant && (
        <RestaurantDetailModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          onAddToCart={handleAddToCart}
          isExpressPassActive={isExpressPassActive}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        currentAddress={currentAddress}
        isExpressPassActive={isExpressPassActive}
        onOpenExpressPassModal={() => setIsExpressPassModalOpen(true)}
        onPlaceOrder={handlePlaceOrder}
      />

      {activeOrder && (
        <OrderTrackingModal
          order={activeOrder}
          onClose={() => setActiveOrder(null)}
        />
      )}

      <ExpressPassModal
        isOpen={isExpressPassModalOpen}
        onClose={() => setIsExpressPassModalOpen(false)}
        isActive={isExpressPassActive}
        onToggleActive={() => setIsExpressPassActive((v) => !v)}
      />

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        addresses={addresses}
        currentAddress={currentAddress}
        onSelectAddress={setCurrentAddress}
        onSaveNewAddress={(newAddr) => {
          setAddresses((prev) => [newAddr, ...prev]);
          setCurrentAddress(newAddr);
        }}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalInitialMode}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(email) => {
          setUserEmail(email);
          setViewMode('feed');
        }}
      />
    </div>
  );
}
