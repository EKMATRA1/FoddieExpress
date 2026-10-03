import { Restaurant, MenuItem, Address } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_food_delivery_1790955140656.jpg';
export const CRAVE_FEAST_IMAGE = '/src/assets/images/foddie_crave_feast_1791041801361.jpg';
export const FODDIE_LOGO_HERO_16_9 = '/src/assets/images/foddie_cloche_hero_16_9.svg';
export const BURGER_IMAGE = '/src/assets/images/store_burger_craft_1790955160562.jpg';
export const SUSHI_IMAGE = '/src/assets/images/store_sushi_platter_1790955180997.jpg';
export const PIZZA_IMAGE = '/src/assets/images/store_artisan_pizza_1790955194180.jpg';

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    label: 'Home',
    street: '14/2 Park Street, Flat 4B',
    cityStateZip: 'Kolkata, WB 700016',
    dropoffOption: 'leave_at_door',
    instructions: 'Leave at front door porch, please do not ring doorbell.',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Work',
    street: 'Indiranagar 100ft Road, Tech Hub 3rd Floor',
    cityStateZip: 'Bengaluru, KA 560038',
    dropoffOption: 'hand_to_me',
    instructions: 'Call upon arrival, security desk check-in required.',
    isDefault: false,
  },
  {
    id: 'addr-3',
    label: 'Apartment',
    street: 'Bandra West, Hill Road, Bldg 7',
    cityStateZip: 'Mumbai, MH 400050',
    dropoffOption: 'leave_at_door',
    instructions: 'Buzzer #302 on callbox.',
    isDefault: false,
  }
];

export const CUISINE_CATEGORIES = [
  { id: 'all', name: 'All', icon: 'Utensils' },
  { id: 'burgers', name: 'Burgers', icon: 'Flame' },
  { id: 'pizza', name: 'Pizza', icon: 'Pizza' },
  { id: 'sushi', name: 'Sushi', icon: 'Fish' },
  { id: 'asian', name: 'Asian', icon: 'Soup' },
  { id: 'mexican', name: 'Mexican', icon: 'Zap' },
  { id: 'healthy', name: 'Healthy', icon: 'Salad' },
  { id: 'desserts', name: 'Desserts & Ice Cream', icon: 'Cake' },
  { id: 'breakfast', name: 'Breakfast', icon: 'Coffee' },
  { id: 'grocery', name: 'Grocery & Essentials', icon: 'ShoppingBag' },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Craft Burger Co.',
    tagline: 'Smash burgers, artisan brioche & seasoned truffle fries',
    coverImage: BURGER_IMAGE,
    rating: 4.9,
    reviewCount: 2480,
    deliveryTimeMinutes: { min: 20, max: 30 },
    deliveryFee: 0,
    minOrder: 199,
    distanceMiles: 1.2,
    priceLevel: '₹₹',
    cuisines: ['Burgers', 'American', 'Fast Food'],
    isExpressPass: true,
    offerBadge: '₹0 Delivery Fee over ₹199',
    address: '420 Oak Street, Downtown',
    hours: '11:00 AM - 11:30 PM',
    isPromoted: true,
    phone: '+91 98765 43210',
  },
  {
    id: 'rest-2',
    name: 'Napoli Wood-Fired Pizzeria',
    tagline: 'Certified Neapolitan sourdough crust, imported San Marzano tomatoes',
    coverImage: PIZZA_IMAGE,
    rating: 4.8,
    reviewCount: 1840,
    deliveryTimeMinutes: { min: 25, max: 40 },
    deliveryFee: 39,
    minOrder: 249,
    distanceMiles: 1.8,
    priceLevel: '₹₹',
    cuisines: ['Pizza', 'Italian', 'Vegetarian'],
    isExpressPass: true,
    offerBadge: '20% off orders ₹499+',
    address: '88 Little Italy Way',
    hours: '12:00 PM - 10:00 PM',
    isPromoted: true,
    phone: '+91 98765 43211',
  },
  {
    id: 'rest-3',
    name: 'Oishii Sushi & Omakase',
    tagline: 'Fresh bluefin tuna, king salmon nigiri and chef special rolls',
    coverImage: SUSHI_IMAGE,
    rating: 4.9,
    reviewCount: 3120,
    deliveryTimeMinutes: { min: 30, max: 45 },
    deliveryFee: 49,
    minOrder: 399,
    distanceMiles: 2.4,
    priceLevel: '₹₹₹',
    cuisines: ['Sushi', 'Asian', 'Japanese'],
    isExpressPass: true,
    offerBadge: 'Free Roll on ₹699+',
    address: '154 Sakura Ave, West End',
    hours: '11:30 AM - 10:30 PM',
    isPromoted: false,
    phone: '+91 98765 43212',
  },
  {
    id: 'rest-4',
    name: 'Taqueria El Fuego',
    tagline: 'Birria tacos with rich consommé, handmade corn tortillas',
    coverImage: HERO_IMAGE,
    rating: 4.7,
    reviewCount: 1450,
    deliveryTimeMinutes: { min: 15, max: 25 },
    deliveryFee: 0,
    minOrder: 149,
    distanceMiles: 0.9,
    priceLevel: '₹',
    cuisines: ['Mexican', 'Fast Food'],
    isExpressPass: true,
    offerBadge: 'ExpressPass ₹0 Delivery',
    address: '310 Mission Blvd',
    hours: '10:00 AM - Midnight',
    isPromoted: false,
    phone: '+91 98765 43213',
  },
  {
    id: 'rest-5',
    name: 'Green Goddess Bowl Lab',
    tagline: 'Organic wild greens, grilled paneer/salmon, avocado quinoa crunch',
    coverImage: HERO_IMAGE,
    rating: 4.8,
    reviewCount: 940,
    deliveryTimeMinutes: { min: 20, max: 35 },
    deliveryFee: 29,
    minOrder: 199,
    distanceMiles: 1.5,
    priceLevel: '₹₹',
    cuisines: ['Healthy', 'Salads', 'Vegetarian'],
    isExpressPass: true,
    offerBadge: '₹50 off when you spend ₹299',
    address: '77 Wellness Row',
    hours: '8:00 AM - 9:00 PM',
    isPromoted: false,
    phone: '+91 98765 43214',
  },
  {
    id: 'rest-6',
    name: 'Sweet Tooth Artisan Gelato & Cookies',
    tagline: 'Warm chocolate lava cookies, Sicilian pistacchio gelato',
    coverImage: BURGER_IMAGE,
    rating: 4.9,
    reviewCount: 1100,
    deliveryTimeMinutes: { min: 15, max: 30 },
    deliveryFee: 0,
    minOrder: 149,
    distanceMiles: 1.1,
    priceLevel: '₹',
    cuisines: ['Desserts', 'Bakery'],
    isExpressPass: true,
    offerBadge: 'Buy 1 cookie box, get 1 free',
    address: '215 Sugarberry Lane',
    hours: '12:00 PM - 11:00 PM',
    isPromoted: false,
    phone: '+91 98765 43215',
  },
  {
    id: 'rest-7',
    name: 'Golden Dragon Dim Sum & Wok',
    tagline: 'Steamed soup dumplings, crispy duck, Cantonese chow mein',
    coverImage: SUSHI_IMAGE,
    rating: 4.6,
    reviewCount: 1680,
    deliveryTimeMinutes: { min: 25, max: 40 },
    deliveryFee: 39,
    minOrder: 249,
    distanceMiles: 2.1,
    priceLevel: '₹₹',
    cuisines: ['Asian', 'Chinese'],
    isExpressPass: false,
    offerBadge: '₹75 off on ₹499',
    address: '600 Chinatown Gateway',
    hours: '11:00 AM - 10:00 PM',
    isPromoted: false,
    phone: '+91 98765 43216',
  },
  {
    id: 'rest-8',
    name: 'Morning Roast & Bakery',
    tagline: 'Specialty espresso, flaky French croissants & breakfast bagels',
    coverImage: PIZZA_IMAGE,
    rating: 4.9,
    reviewCount: 2200,
    deliveryTimeMinutes: { min: 10, max: 20 },
    deliveryFee: 0,
    minOrder: 120,
    distanceMiles: 0.7,
    priceLevel: '₹',
    cuisines: ['Breakfast', 'Coffee', 'Bakery'],
    isExpressPass: true,
    offerBadge: 'Free beverage on ₹299+',
    address: '12 Sunrise Alley',
    hours: '6:30 AM - 4:00 PM',
    isPromoted: false,
    phone: '+91 98765 43217',
  }
];

export const MENU_ITEMS: Record<string, MenuItem[]> = {
  'rest-1': [
    {
      id: 'item-b1',
      restaurantId: 'rest-1',
      name: 'Double Truffle Smashburger',
      description: 'Two grass-fed smashed patties, black truffle garlic aioli, aged sharp cheddar, caramelized onions, toasted potato brioche bun.',
      price: 349,
      image: BURGER_IMAGE,
      category: 'Burgers & Sandwiches',
      popular: true,
      tags: ['Bestseller', 'Chef Special'],
      options: [
        {
          id: 'opt-temp',
          title: 'Patty Doneness',
          required: true,
          options: [
            { id: 'med-well', name: 'Medium Well (Juicy & Crispy Edge)', price: 0 },
            { id: 'well', name: 'Well Done', price: 0 }
          ]
        },
        {
          id: 'opt-addons',
          title: 'Upgrade Your Burger',
          required: false,
          maxSelect: 3,
          options: [
            { id: 'extra-bacon', name: 'Crispy Smoked Bacon / Strips', price: 60 },
            { id: 'extra-cheese', name: 'Extra Melted Cheddar', price: 40 },
            { id: 'avocado', name: 'Fresh Hass Avocado Slices', price: 50 }
          ]
        }
      ]
    },
    {
      id: 'item-b2',
      restaurantId: 'rest-1',
      name: 'Classic Smash Cheeseburger',
      description: 'Single smashed beef/veg patty, melted cheddar, crinkle-cut pickles, diced red onion, signature Foddie secret spread.',
      price: 249,
      image: BURGER_IMAGE,
      category: 'Burgers & Sandwiches',
      popular: true,
      options: [
        {
          id: 'opt-b2-bacon',
          title: 'Add Crispy Bacon',
          required: false,
          options: [
            { id: 'bacon-add', name: 'Add Crispy Bacon / Strips', price: 50 }
          ]
        }
      ]
    },
    {
      id: 'item-b3',
      restaurantId: 'rest-1',
      name: 'Crispy Nashville Hot Chicken / Paneer',
      description: 'Buttermilk fried chicken breast / spiced paneer drenched in Nashville cayenne glaze, creamy slaw, dill pickles on brioche.',
      price: 299,
      image: BURGER_IMAGE,
      category: 'Burgers & Sandwiches',
      popular: true,
      options: [
        {
          id: 'opt-spice',
          title: 'Spice Level',
          required: true,
          options: [
            { id: 'spice-mild', name: 'Mild (Southern style)', price: 0 },
            { id: 'spice-med', name: 'Medium (Noticeable kick)', price: 0 },
            { id: 'spice-hot', name: 'Hot (Nashville Authentic)', price: 0 }
          ]
        }
      ]
    },
    {
      id: 'item-b4',
      restaurantId: 'rest-1',
      name: 'Parmesan Truffle Fries',
      description: 'Hand-cut russet potatoes tossed in white truffle oil, shaved 24-month Parmigiano-Reggiano, and chopped rosemary.',
      price: 149,
      image: BURGER_IMAGE,
      category: 'Sides & Dips',
      popular: true,
    },
    {
      id: 'item-b5',
      restaurantId: 'rest-1',
      name: 'Beer-Battered Onion Rings',
      description: 'Thick cut sweet colossal onions in craft batter, served with spicy campfire dip.',
      price: 129,
      image: BURGER_IMAGE,
      category: 'Sides & Dips',
    },
    {
      id: 'item-b6',
      restaurantId: 'rest-1',
      name: 'Salted Caramel Milkshake',
      description: 'Hand-spun vanilla bean ice cream, fleur de sel caramel swirl, whipped cream, butter waffle crisp.',
      price: 159,
      image: BURGER_IMAGE,
      category: 'Beverages & Shakes',
    }
  ],
  'rest-2': [
    {
      id: 'item-p1',
      restaurantId: 'rest-2',
      name: 'Margherita D.O.P.',
      description: 'San Marzano D.O.P. tomatoes, fresh buffalo mozzarella, fragrant Genovese basil, cold-pressed olive oil.',
      price: 399,
      image: PIZZA_IMAGE,
      category: 'Wood-Fired Pizzas',
      popular: true,
      options: [
        {
          id: 'opt-crust',
          title: 'Crust Style',
          required: true,
          options: [
            { id: 'trad', name: 'Traditional Neapolitan (Puffy blistered crust)', price: 0 },
            { id: 'crispy', name: 'Well-Done Extra Crisp', price: 0 }
          ]
        },
        {
          id: 'opt-toppings',
          title: 'Extra Add-ons',
          required: false,
          options: [
            { id: 'prosciutto', name: 'Prosciutto di Parma / Smoked Topping', price: 90 },
            { id: 'hot-honey', name: 'Calabrian Chili Hot Honey Drizzle', price: 40 }
          ]
        }
      ]
    },
    {
      id: 'item-p2',
      restaurantId: 'rest-2',
      name: 'Diavola Spicy Soppressata',
      description: 'Spicy artisanal soppressata/pepperoni, chili flakes, whole milk mozzarella, wild oregano, roasted garlic oil.',
      price: 449,
      image: PIZZA_IMAGE,
      category: 'Wood-Fired Pizzas',
      popular: true,
    },
    {
      id: 'item-p3',
      restaurantId: 'rest-2',
      name: 'Truffle & Wild Mushroom Bianca',
      description: 'Fontina, taleggio, roasted cremini and shiitake mushrooms, thyme, white truffle crema drizzle.',
      price: 479,
      image: PIZZA_IMAGE,
      category: 'Wood-Fired Pizzas',
    },
    {
      id: 'item-p4',
      restaurantId: 'rest-2',
      name: 'Burrata Caprese Salad',
      description: 'Creamy Pugliese burrata ball, heirloom teardrop tomatoes, 12-year balsamic reduction, basil oil.',
      price: 299,
      image: PIZZA_IMAGE,
      category: 'Antipasti & Salads',
    },
    {
      id: 'item-p5',
      restaurantId: 'rest-2',
      name: 'Classic Tiramisu al Mascarpone',
      description: 'Espresso-soaked Savoiardi ladyfingers, velvety mascarpone cream, dark Valrhona cocoa dust.',
      price: 199,
      image: PIZZA_IMAGE,
      category: 'Desserts',
    }
  ],
  'rest-3': [
    {
      id: 'item-s1',
      restaurantId: 'rest-3',
      name: 'Tokyo Signature Nigiri Set (8 pcs)',
      description: 'Bluefin otoro, king salmon, yellowtail hamachi, Hokkaido scallop, and unagi prepared with warm sushi rice.',
      price: 699,
      image: SUSHI_IMAGE,
      category: 'Nigiri & Sashimi',
      popular: true,
    },
    {
      id: 'item-s2',
      restaurantId: 'rest-3',
      name: 'Flaming Dragon Specialty Roll',
      description: 'Shrimp tempura, crisp cucumber topped with barbecue eel, avocado slices, tobiko, and sweet unagi glaze.',
      price: 449,
      image: SUSHI_IMAGE,
      category: 'Specialty Rolls',
      popular: true,
      options: [
        {
          id: 'opt-spicy',
          title: 'Spice Options',
          required: false,
          options: [
            { id: 'extra-wasabi', name: 'Real Fresh Ground Wasabi', price: 40 },
            { id: 'spicy-mayo', name: 'House Sriracha Kewpie Mayo', price: 25 }
          ]
        }
      ]
    },
    {
      id: 'item-s3',
      restaurantId: 'rest-3',
      name: 'Spicy Crunchy Tuna Roll',
      description: 'Fresh minced yellowfin tuna, spicy chili sesame sauce, cucumber, topped with crunchy tempura crisps.',
      price: 329,
      image: SUSHI_IMAGE,
      category: 'Specialty Rolls',
      popular: true,
    },
    {
      id: 'item-s4',
      restaurantId: 'rest-3',
      name: 'Steamed Edamame with Maldon Sea Salt',
      description: 'Tender young soybeans in the pod with flaky Maldon smoked sea salt.',
      price: 149,
      image: SUSHI_IMAGE,
      category: 'Starters',
    }
  ],
  'rest-4': [
    {
      id: 'item-t1',
      restaurantId: 'rest-4',
      name: 'Quesabirria Tacos Plate (3 pcs + Consommé)',
      description: 'Slow-braised beef/mushroom chuck, melted Oaxaca cheese, crispy grilled corn tortillas, served with rich dipping broth, cilantro and lime.',
      price: 349,
      image: HERO_IMAGE,
      category: 'Tacos & Platters',
      popular: true,
      options: [
        {
          id: 'opt-salsa',
          title: 'Salsa Selection',
          required: true,
          options: [
            { id: 'salsa-verde', name: 'Roasted Tomatillo Salsa Verde', price: 0 },
            { id: 'salsa-roja', name: 'Fire-Roasted Chipotle Roja', price: 0 },
            { id: 'habanero', name: 'Extra Hot Habanero Lime', price: 0 }
          ]
        }
      ]
    },
    {
      id: 'item-t2',
      restaurantId: 'rest-4',
      name: 'Al Pastor Tacos (3 pcs)',
      description: 'Marinated roasted filling on vertical spit with pineapple, diced white onions, fresh cilantro.',
      price: 299,
      image: HERO_IMAGE,
      category: 'Tacos & Platters',
      popular: true,
    },
    {
      id: 'item-t3',
      restaurantId: 'rest-4',
      name: 'Fresh Guacamole & Warm Totopos',
      description: 'Hass avocados mashed tableside with diced jalapeños, cilantro, red onion, lime juice, crispy corn chips.',
      price: 179,
      image: HERO_IMAGE,
      category: 'Sides & Dips',
    }
  ]
};

export const DEFAULT_MENU: MenuItem[] = [
  {
    id: 'def-1',
    restaurantId: 'default',
    name: 'Chef Specialty Signature Platter',
    description: 'Fresh seasonal ingredients prepared daily by executive chef. Served with house side salad and artisan sauce.',
    price: 349,
    image: HERO_IMAGE,
    category: 'Signatures',
    popular: true,
  },
  {
    id: 'def-2',
    restaurantId: 'default',
    name: 'House Crispy Bowl / Combo Meal',
    description: 'Balanced protein, wholesome grains, charred greens, and savory house dressing.',
    price: 279,
    image: HERO_IMAGE,
    category: 'Signatures',
    popular: true,
  },
  {
    id: 'def-3',
    restaurantId: 'default',
    name: 'Artisan Side & Dipping Sauce',
    description: 'Golden seasoned side snack with signature house dips.',
    price: 119,
    image: HERO_IMAGE,
    category: 'Sides',
  },
  {
    id: 'def-4',
    restaurantId: 'default',
    name: 'Craft Refreshment Drink',
    description: 'Chilled sparkling beverage brewed with botanical extracts and cane sugar.',
    price: 79,
    image: HERO_IMAGE,
    category: 'Beverages',
  }
];
