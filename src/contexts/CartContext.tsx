import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cart, CartItem, Product } from '../types';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getCartItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = '@aura_obscura_cart';

const calculateCartTotals = (items: CartItem[]): { total: number; itemCount: number } => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
};

const isWeb = typeof window !== 'undefined' && !!window.localStorage;

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Lade gespeicherten Warenkorb beim Start
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  // Speichere Warenkorb bei jeder Änderung
  useEffect(() => {
    if (!isLoading) {
      saveCartToStorage();
    }
  }, [cart, isLoading]);

  const loadCartFromStorage = async () => {
    try {
      let savedCart;
      if (isWeb) {
        savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      } else {
        savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
      }
      
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Stelle sicher, dass die Daten korrekt sind
        if (parsedCart && Array.isArray(parsedCart.items)) {
          setCart(parsedCart);
        } else {
          console.warn('Ungültige Cart-Daten gefunden, setze zurück');
          setCart({ items: [], total: 0, itemCount: 0 });
        }
      }
    } catch (error) {
      console.error('Fehler beim Laden des Warenkorbs:', error);
      setCart({ items: [], total: 0, itemCount: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  const saveCartToStorage = async () => {
    try {
      const cartString = JSON.stringify(cart);
      if (isWeb) {
        window.localStorage.setItem(CART_STORAGE_KEY, cartString);
      } else {
        await AsyncStorage.setItem(CART_STORAGE_KEY, cartString);
      }
    } catch (error) {
      console.error('Fehler beim Speichern des Warenkorbs:', error);
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        item => item.product.id === product.id
      );

      let updatedItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Produkt bereits im Warenkorb - Menge erhöhen
        updatedItems = prevCart.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Neues Produkt hinzufügen
        updatedItems = [...prevCart.items, { product, quantity }];
      }

      const { total, itemCount } = calculateCartTotals(updatedItems);

      return {
        items: updatedItems,
        total,
        itemCount,
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(
        item => item.product.id !== productId
      );
      
      const { total, itemCount } = calculateCartTotals(updatedItems);

      return {
        items: updatedItems,
        total,
        itemCount,
      };
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
      const { total, itemCount } = calculateCartTotals(updatedItems);

      return {
        items: updatedItems,
        total,
        itemCount,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0,
    });
  };

  const isInCart = (productId: string): boolean => {
    return cart.items.some(item => item.product.id === productId);
  };

  const getCartItemQuantity = (productId: string): number => {
    const item = cart.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 