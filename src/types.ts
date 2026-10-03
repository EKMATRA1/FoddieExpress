export interface MenuOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuOptionGroup {
  id: string;
  title: string;
  required: boolean;
  minSelect?: number;
  maxSelect?: number;
  options: MenuOption[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  tags?: string[];
  options?: MenuOptionGroup[];
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  coverImage: string;
  logoImage?: string;
  rating: number;
  reviewCount: number;
  deliveryTimeMinutes: { min: number; max: number };
  deliveryFee: number;
  minOrder: number;
  distanceMiles: number;
  priceLevel: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
  cuisines: string[];
  isExpressPass: boolean;
  offerBadge?: string;
  address: string;
  hours: string;
  isPromoted?: boolean;
  phone?: string;
}

export interface SelectedOptionChoice {
  groupTitle: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  menuItemId: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
  basePrice: number;
  unitPrice: number;
  quantity: number;
  image: string;
  selectedOptions?: SelectedOptionChoice[];
  specialInstructions?: string;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  taxAndFees: number;
  tip: number;
  discount: number;
  total: number;
  createdAt: string;
  status: 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';
  estimatedMinutes: number;
  deliveryAddress: string;
  deliveryMode: 'delivery' | 'pickup';
  dasherName: string;
  dasherVehicle: string;
  dasherRating: number;
}

export interface Address {
  id: string;
  label: 'Home' | 'Work' | 'Apartment' | 'Other';
  street: string;
  cityStateZip: string;
  dropoffOption: 'hand_to_me' | 'leave_at_door';
  instructions?: string;
  isDefault: boolean;
}

export type SortOption = 'recommended' | 'rating' | 'fastest' | 'price_low';
