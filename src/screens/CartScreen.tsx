import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Button } from '../components/ui/Button';
import { CartItem } from '../components/ui/CartItem';
import { Cart, CartItem as CartItemType, Product } from '../types';

interface CartScreenProps {
  navigation: any;
}

export const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0,
  });

  // Mock-Daten für Demo
  useEffect(() => {
    loadMockCart();
  }, []);

  const loadMockCart = () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Reflection Man',
        brand: 'Amouage',
        description: 'Ein unisex-Luxusduft mit Moschus & Sandelholz',
        shortDescription: 'Unisex-Luxusduft mit Moschus & Sandelholz',
        price: 28,
        currency: 'EUR',
        images: ['https://via.placeholder.com/300x400/2E133F/FFFFFF?text=Amouage+Reflection'],
        category: 'eau-de-parfum',
        type: 'decant',
        gender: 'unisex',
        notes: [
          { id: '1', name: 'Moschus', type: 'base', category: 'animalisch' },
          { id: '2', name: 'Sandelholz', type: 'base', category: 'holz' },
        ],
        concentration: 'Eau de Parfum',
        volume: '10ml',
        availability: 5,
        isLimited: true,
        isExclusive: false,
        isNew: true,
        isOnSale: false,
        rating: 4.8,
        reviewCount: 23,
        decantInfo: {
          originalBottle: 'Amouage Reflection Man 100ml',
          decantDate: new Date(),
          batchNumber: 'AO-2024-001',
          authenticity: true,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Tobacco Vanille',
        brand: 'Tom Ford',
        description: 'Ein warmer, süßer Duft mit Tabak und Vanille',
        shortDescription: 'Warmer, süßer Duft mit Tabak und Vanille',
        price: 32,
        currency: 'EUR',
        images: ['https://via.placeholder.com/300x400/2E133F/FFFFFF?text=Tom+Ford+Tobacco'],
        category: 'eau-de-parfum',
        type: 'decant',
        gender: 'unisex',
        notes: [
          { id: '3', name: 'Tabak', type: 'heart', category: 'tabak' },
          { id: '4', name: 'Vanille', type: 'base', category: 'gourmand' },
        ],
        concentration: 'Eau de Parfum',
        volume: '10ml',
        availability: 3,
        isLimited: true,
        isExclusive: true,
        isNew: false,
        isOnSale: false,
        rating: 4.9,
        reviewCount: 45,
        decantInfo: {
          originalBottle: 'Tom Ford Tobacco Vanille 50ml',
          decantDate: new Date(),
          batchNumber: 'AO-2024-002',
          authenticity: true,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const mockCartItems: CartItemType[] = [
      { product: mockProducts[0], quantity: 2 },
      { product: mockProducts[1], quantity: 1 },
    ];

    const total = mockCartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = mockCartItems.reduce((sum, item) => sum + item.quantity, 0);

    setCart({
      items: mockCartItems,
      total,
      itemCount,
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );

      const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items: updatedItems,
        total,
        itemCount,
      };
    });
  };

  const removeItem = (productId: string) => {
    Alert.alert(
      'Produkt entfernen',
      'Möchten Sie dieses Produkt aus dem Warenkorb entfernen?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Entfernen',
          style: 'destructive',
          onPress: () => {
            setCart(prevCart => {
              const updatedItems = prevCart.items.filter(item => item.product.id !== productId);
              const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
              const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

              return {
                items: updatedItems,
                total,
                itemCount,
              };
            });
          },
        },
      ]
    );
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      Alert.alert('Warenkorb leer', 'Ihr Warenkorb ist leer.');
      return;
    }
    navigation.navigate('Checkout');
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} €`;
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart-outline" size={64} color={Colors.textMuted} />
      <Text style={styles.emptyTitle}>Ihr Warenkorb ist leer</Text>
      <Text style={styles.emptySubtitle}>
        Entdecken Sie unsere exklusiven Düfte und fügen Sie sie zu Ihrem Warenkorb hinzu.
      </Text>
      <Button
        title="Zum Shop"
        onPress={() => navigation.navigate('Shop')}
        variant="primary"
        size="large"
        style={styles.emptyButton}
      />
    </View>
  );

  const renderCartItems = () => (
    <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
      {cart.items.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
          onUpdateQuantity={updateQuantity}
          onRemove={removeItem}
        />
      ))}
    </ScrollView>
  );

  const renderSummary = () => (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Zwischensumme</Text>
        <Text style={styles.summaryValue}>{formatPrice(cart.total)}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Versand</Text>
        <Text style={styles.summaryValue}>
          {cart.total > 50 ? 'Kostenlos' : '4,99 €'}
        </Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.summaryRow}>
        <Text style={styles.totalLabel}>Gesamt</Text>
        <Text style={styles.totalValue}>
          {formatPrice(cart.total > 50 ? cart.total : cart.total + 4.99)}
        </Text>
      </View>
      
      {cart.total < 50 && (
        <Text style={styles.freeShippingInfo}>
          Noch {formatPrice(50 - cart.total)} für kostenlosen Versand
        </Text>
      )}
      
      <Button
        title={`Zur Kasse (${formatPrice(cart.total > 50 ? cart.total : cart.total + 4.99)})`}
        onPress={handleCheckout}
        variant="primary"
        size="large"
        style={styles.checkoutButton}
        disabled={cart.items.length === 0}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Warenkorb</Text>
        <Text style={styles.itemCount}>
          {cart.itemCount} {cart.itemCount === 1 ? 'Artikel' : 'Artikel'}
        </Text>
      </View>

      {cart.items.length === 0 ? renderEmptyCart() : (
        <>
          {renderCartItems()}
          {renderSummary()}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  title: {
    ...Typography.h2,
    color: Colors.white,
    marginBottom: 4,
  },
  
  itemCount: {
    ...Typography.bodySmall,
    color: Colors.textMuted,
  },
  
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  
  emptyTitle: {
    ...Typography.h3,
    color: Colors.white,
    marginTop: 16,
    marginBottom: 8,
  },
  
  emptySubtitle: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  
  emptyButton: {
    minWidth: 200,
  },
  
  itemsContainer: {
    flex: 1,
    padding: 16,
  },
  
  summaryContainer: {
    backgroundColor: Colors.backgroundCard,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  summaryLabel: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  
  summaryValue: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  
  totalLabel: {
    ...Typography.h4,
    color: Colors.white,
  },
  
  totalValue: {
    ...Typography.h4,
    color: Colors.secondary,
  },
  
  freeShippingInfo: {
    ...Typography.caption,
    color: Colors.success,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  
  checkoutButton: {
    marginTop: 8,
  },
}); 