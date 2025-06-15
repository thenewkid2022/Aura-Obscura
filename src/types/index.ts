// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  favoriteBrands: string[];
  favoriteNotes: string[];
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  drops: boolean;
  sales: boolean;
  newProducts: boolean;
  orderUpdates: boolean;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  category: ProductCategory;
  type: ProductType;
  gender: ProductGender;
  notes: FragranceNote[];
  concentration: string;
  volume: string;
  availability: number;
  isLimited: boolean;
  isExclusive: boolean;
  isNew: boolean;
  isOnSale: boolean;
  rating: number;
  reviewCount: number;
  decantInfo?: DecantInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface DecantInfo {
  originalBottle: string;
  decantDate: Date;
  batchNumber: string;
  authenticity: boolean;
}

export type ProductCategory = 
  | 'parfum'
  | 'eau-de-parfum'
  | 'eau-de-toilette'
  | 'cologne'
  | 'body-spray'
  | 'oil';

export type ProductType = 'decant' | 'original';

export type ProductGender = 'masculine' | 'feminine' | 'unisex';

export interface FragranceNote {
  id: string;
  name: string;
  type: 'top' | 'heart' | 'base';
  category: string;
}

// Cart & Order Types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 
  | 'stripe'
  | 'apple-pay'
  | 'paypal'
  | 'klarna';

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
}

// Navigation Types
export type RootStackParamList = {
  Main: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
  Checkout: undefined;
  OrderConfirmation: { orderId: string };
  Profile: undefined;
  Favorites: undefined;
  Orders: undefined;
  Settings: undefined;
  Auth: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Shop: undefined;
  Favorites: undefined;
  Profile: undefined;
};

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Filter & Search Types
export interface ProductFilters {
  brands: string[];
  categories: ProductCategory[];
  types: ProductType[];
  genders: ProductGender[];
  priceRange: [number, number];
  notes: string[];
  availability: 'in-stock' | 'limited' | 'all';
}

export interface SearchParams {
  query: string;
  filters: ProductFilters;
  sortBy: 'name' | 'price' | 'rating' | 'newest' | 'popular';
  sortOrder: 'asc' | 'desc';
}

// Notification Types
export interface PushNotification {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  type: 'drop' | 'sale' | 'product' | 'order' | 'general';
  read: boolean;
  createdAt: Date;
}

// Content Types
export interface ContentPost {
  id: string;
  title: string;
  content: string;
  images: string[];
  author: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
}

// App Configuration
export interface AppConfig {
  version: string;
  buildNumber: string;
  apiUrl: string;
  stripePublishableKey: string;
  firebaseConfig: FirebaseConfig;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
} 