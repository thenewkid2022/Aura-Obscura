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

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onFavoritePress?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  isFavorite?: boolean;
  showDecantBadge?: boolean;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 columns with padding

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onFavoritePress,
  onAddToCart,
  isFavorite = false,
  showDecantBadge = true,
}) => {
  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} €`;
  };

  const renderBadges = () => (
    <View style={styles.badgesContainer}>
      {product.isNew && (
        <View style={[styles.badge, styles.newBadge]}>
          <Text style={styles.badgeText}>Neu</Text>
        </View>
      )}
      {product.isLimited && (
        <View style={[styles.badge, styles.limitedBadge]}>
          <Text style={styles.badgeText}>Limit.</Text>
        </View>
      )}
      {product.isExclusive && (
        <View style={[styles.badge, styles.exclusiveBadge]}>
          <Text style={styles.badgeText}>Exkl.</Text>
        </View>
      )}
      {product.type === 'decant' && showDecantBadge && (
        <View style={[styles.badge, styles.decantBadge]}>
          <Text style={styles.badgeText}>Decant</Text>
        </View>
      )}
    </View>
  );

  const renderAvailability = () => {
    if (product.availability <= 0) {
      return (
        <Text style={[styles.availability, styles.outOfStock]}>
          Ausverkauft
        </Text>
      );
    }
    if (product.availability <= 5) {
      return (
        <Text style={[styles.availability, styles.lowStock]}>
          Nur {product.availability} verfügbar
        </Text>
      );
    }
    return null;
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(product)}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageOverlay}
        />
        
        {renderBadges()}
        
        {onFavoritePress && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => onFavoritePress(product)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={20}
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
        
        <View style={styles.priceContainer}>
          {product.originalPrice && product.originalPrice > product.price ? (
            <View style={styles.priceRow}>
              <Text style={styles.originalPrice}>
                {formatPrice(product.originalPrice)}
              </Text>
              <Text style={styles.price}>
                {formatPrice(product.price)}
              </Text>
            </View>
          ) : (
            <Text style={styles.price}>
              {formatPrice(product.price)}
            </Text>
          )}
        </View>

        {renderAvailability()}

        {product.rating > 0 && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color={Colors.secondary} />
            <Text style={styles.rating}>
              {product.rating.toFixed(1)} ({product.reviewCount})
            </Text>
          </View>
        )}

        {onAddToCart && product.availability > 0 && (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="add" size={16} color={Colors.white} />
            <Text style={styles.addToCartText}>In den Warenkorb</Text>
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
    elevation: 4,
    shadowColor: Colors.black,
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
    borderRadius: 4,
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
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    marginBottom: 8,
    lineHeight: 18,
  },
  
  priceContainer: {
    marginBottom: 4,
  },
  
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  price: {
    ...Typography.price,
    color: Colors.secondary,
    fontSize: 16,
  },
  
  originalPrice: {
    ...Typography.bodySmall,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  
  availability: {
    ...Typography.caption,
    marginBottom: 4,
  },
  
  outOfStock: {
    color: Colors.error,
  },
  
  lowStock: {
    color: Colors.warning,
  },
  
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  
  rating: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  
  addToCartText: {
    ...Typography.caption,
    color: Colors.black,
    fontWeight: '600',
  },
}); 