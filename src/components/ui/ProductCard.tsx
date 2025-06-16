import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { Product } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onFavoritePress?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  isFavorite?: boolean;
  showDecantBadge?: boolean;
}

const { width } = Dimensions.get('window');
const isTablet = width > 768; // Tablet/Desktop breakpoint
const cardWidth = isTablet ? (width - 72) / 4 : (width - 48) / 2; // 4 columns on tablet/desktop, 2 on mobile

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onFavoritePress,
  onAddToCart,
  isFavorite = false,
  showDecantBadge = true,
}) => {
  const { t } = useLanguage();
  
  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} €`;
  };

  const handlePress = () => {
    onPress(product);
  };

  const handleFavoritePress = () => {
    onFavoritePress?.(product);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  const renderBadges = () => (
    <View style={styles.badgesContainer}>
      {product.isNew && (
        <View style={[styles.badge, styles.newBadge]}>
          <Text style={styles.badgeText}>{t.new}</Text>
        </View>
      )}
      {product.isLimited && (
        <View style={[styles.badge, styles.limitedBadge]}>
          <Text style={styles.badgeText}>{t.limited}</Text>
        </View>
      )}
      {product.isExclusive && (
        <View style={[styles.badge, styles.exclusiveBadge]}>
          <Text style={styles.badgeText}>{t.exclusive}</Text>
        </View>
      )}
      {showDecantBadge && product.type === 'decant' && (
        <View style={[styles.badge, styles.decantBadge]}>
          <Text style={styles.badgeText}>{t.decant}</Text>
        </View>
      )}
    </View>
  );

  const renderAvailability = () => {
    if (product.availability <= 0) {
      return (
        <View style={[styles.availabilityBadge, styles.outOfStockBadge]}>
          <Text style={styles.availabilityText}>{t.outOfStock}</Text>
        </View>
      );
    }
    
    if (product.availability <= 3) {
      return (
        <View style={[styles.availabilityBadge, styles.lowStockBadge]}>
          <Text style={styles.availabilityText}>{t.onlyLeft} {product.availability}</Text>
        </View>
      );
    }
    
    return null;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`${product.brand} ${product.name} - ${formatPrice(product.price)}`}
    >
      <View style={styles.imageContainer}>
        <Image
          source={typeof product.images[0] === 'string' 
            ? { uri: product.images[0] } 
            : product.images[0]}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageOverlay}
        />
        
        {renderBadges()}
        
        {renderAvailability()}
        
        {onFavoritePress && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? Colors.error : Colors.white}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.brand} numberOfLines={1}>
          {product.brand}
        </Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        
        <View style={styles.details}>
          <Text style={styles.volume}>{product.volume}</Text>
          <Text style={styles.concentration}>{product.concentration}</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>
              {formatPrice(product.originalPrice)}
            </Text>
          )}
        </View>

        {onAddToCart && product.availability > 0 && (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
          >
            <Ionicons name="add" size={20} color={Colors.white} />
            <Text style={styles.addToCartText}>{t.addToCart}</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  
  imageContainer: {
    position: 'relative',
    height: cardWidth * 1.2,
  },
  
  image: {
    width: '100%',
    height: '100%',
  },
  
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  
  badgesContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  
  newBadge: {
    backgroundColor: Colors.success,
  },
  
  limitedBadge: {
    backgroundColor: Colors.warning,
  },
  
  exclusiveBadge: {
    backgroundColor: Colors.secondary,
  },
  
  decantBadge: {
    backgroundColor: Colors.primary,
  },
  
  badgeText: {
    ...Typography.caption,
    color: Colors.white,
    fontSize: 10,
  },
  
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 6,
  },
  
  content: {
    padding: 12,
  },
  
  brand: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  
  name: {
    ...Typography.mobileSubtitle,
    color: Colors.textPrimary,
    marginBottom: 6,
    lineHeight: 18,
  },
  
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  volume: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  
  concentration: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  price: {
    ...Typography.price,
    color: Colors.textPrimary,
    marginRight: 8,
  },
  
  originalPrice: {
    ...Typography.caption,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  
  availabilityBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  
  outOfStockBadge: {
    backgroundColor: Colors.error,
  },
  
  lowStockBadge: {
    backgroundColor: Colors.warning,
  },
  
  availabilityText: {
    ...Typography.caption,
    color: Colors.white,
    fontSize: 10,
  },
  
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 4,
  },
  
  addToCartText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '600',
  },
}); 