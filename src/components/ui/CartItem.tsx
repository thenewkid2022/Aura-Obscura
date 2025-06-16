import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { CartItem as CartItemType } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const { t } = useLanguage();
  
  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} €`;
  };

  const handleRemoveClick = () => {
    onRemove(item.product.id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(item.product.id, newQuantity);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={typeof item.product.images[0] === 'string' 
          ? { uri: item.product.images[0] } 
          : item.product.images[0]}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.brand}>{item.product.brand}</Text>
          <TouchableOpacity
            onPress={handleRemoveClick}
            style={styles.removeButton}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.name} numberOfLines={2}>
          {item.product.name}
        </Text>
        
        {item.product.type === 'decant' && (
          <Text style={styles.decantInfo}>
            {t.decantInfo}
          </Text>
        )}
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {formatPrice(item.product.price)}
          </Text>
          <Text style={styles.totalPrice}>
            {formatPrice(item.product.price * item.quantity)}
          </Text>
        </View>
      </View>
      
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.quantity - 1)}
        >
          <Ionicons name="remove" size={16} color={Colors.secondary} />
        </TouchableOpacity>
        
        <Text style={styles.quantity}>{item.quantity}</Text>
        
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.quantity + 1)}
        >
          <Ionicons name="add" size={16} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  
  brand: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  
  removeButton: {
    padding: 8,
    borderRadius: 4,
  },
  
  name: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    marginBottom: 4,
    lineHeight: 18,
  },
  
  decantInfo: {
    ...Typography.caption,
    color: Colors.primary,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  price: {
    ...Typography.bodySmall,
    color: Colors.textMuted,
  },
  
  totalPrice: {
    ...Typography.price,
    color: Colors.textAccent,
    fontSize: 16,
  },
  
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderGold,
  },
  
  quantity: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
}); 