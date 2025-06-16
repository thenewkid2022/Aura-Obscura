import React from 'react';
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
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

interface CartScreenProps {
  navigation: any;
}

export const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const { t } = useLanguage();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    Alert.alert(t.emptyCart, t.emptyCartMessage, [
      { text: t.cancel, style: 'cancel' },
      {
        text: t.remove,
        style: 'destructive',
        onPress: clearCart,
      },
    ]);
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      Alert.alert(t.emptyCart, t.emptyCartMessage);
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
      <Text style={styles.emptyTitle}>{t.emptyCartTitle}</Text>
      <Text style={styles.emptySubtitle}>
        {t.emptyCartSubtitle}
      </Text>
      <Button
        title={t.goToShop}
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
          onRemove={handleRemoveItem}
        />
      ))}
    </ScrollView>
  );

  const renderSummary = () => (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{t.subtotal}</Text>
        <Text style={styles.summaryValue}>{formatPrice(cart.total)}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{t.shipping}</Text>
        <Text style={styles.summaryValue}>
          {cart.total > 50 ? t.free : '4,99 €'}
        </Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.summaryRow}>
        <Text style={styles.totalLabel}>{t.total}</Text>
        <Text style={styles.totalValue}>
          {formatPrice(cart.total > 50 ? cart.total : cart.total + 4.99)}
        </Text>
      </View>
      
      {cart.total < 50 && (
        <Text style={styles.freeShippingInfo}>
          {t.freeShippingInfo} {formatPrice(50 - cart.total)} {t.forFreeShipping}
        </Text>
      )}
      
      <Button
        title={`${t.checkout} (${formatPrice(cart.total > 50 ? cart.total : cart.total + 4.99)})`}
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
        <Text style={styles.title}>{t.cartTitle}</Text>
        <Text style={styles.itemCount}>
          {cart.itemCount} {cart.itemCount === 1 ? t.item : t.items}
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
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    marginBottom: 16,
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
    color: Colors.textPrimary,
  },
  
  totalValue: {
    ...Typography.h4,
    color: Colors.textAccent,
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