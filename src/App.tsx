import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { AppNavigation } from './navigation';

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <StatusBar style="light" />
        <AppNavigation />
      </CartProvider>
    </LanguageProvider>
  );
} 