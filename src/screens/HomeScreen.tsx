import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  RefreshControl,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography, Fonts, FontSizes, FontWeights } from '../constants/Typography';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ui/ProductCard';
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher';
import { Product } from '../types';
import { testProducts } from '../constants/TestProducts';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

const { height } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [refreshing, setRefreshing] = useState(false);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [limitedProducts, setLimitedProducts] = useState<Product[]>([]);
  const [exclusiveProducts, setExclusiveProducts] = useState<Product[]>([]);

  // Mock-Daten für Demo-Zwecke
  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Testprodukte mit echten Bildern aus dem Assets-Ordner
    setNewProducts(testProducts.filter(p => p.isNew));
    setLimitedProducts(testProducts.filter(p => p.isLimited));
    setExclusiveProducts(testProducts.filter(p => p.isExclusive));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    loadMockData();
    setRefreshing(false);
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const handleDiscoverPress = () => {
    navigation.navigate('Shop');
  };

  const renderHeroSection = () => (
    <View style={styles.heroContainer}>
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientEnd]}
        style={styles.heroGradient}
      >
        <View style={styles.languageSwitcherContainer}>
          <LanguageSwitcher />
        </View>
        <View style={styles.heroContent}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.heroLogo}
            resizeMode="contain"
          />
          <Text style={styles.heroTitle}>
            {t.heroTitle}
          </Text>
          <Text style={styles.heroSubtitle}>
            {t.heroSubtitle}
          </Text>
          <Button
            title={t.discoverButton}
            onPress={handleDiscoverPress}
            variant="secondary"
            size="large"
            style={styles.heroButton}
          />
        </View>
      </LinearGradient>
    </View>
  );

  const renderSectionHeader = (title: string, subtitle: string, onPress?: () => void) => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>
      {onPress && (
        <Button
          title={t.viewAll}
          onPress={onPress}
          variant="ghost"
          size="small"
        />
      )}
    </View>
  );

  const renderProductSection = (products: Product[], title: string, subtitle: string) => (
    <View style={styles.section}>
      {renderSectionHeader(title, subtitle)}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productRow}
      >
        {products.map((product) => (
          <View key={product.id} style={styles.productCardContainer}>
            <ProductCard
              product={product}
              onPress={handleProductPress}
              onFavoritePress={(product) => {
                // TODO: Implement favorite functionality
              }}
              onAddToCart={(product) => addToCart(product, 1)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.secondary}
        />
      }
    >
      {renderHeroSection()}
      
      {newProducts.length > 0 && renderProductSection(
        newProducts,
        t.newInShop,
        t.newInShopSubtitle
      )}
      
      {limitedProducts.length > 0 && renderProductSection(
        limitedProducts,
        t.limitedAvailability,
        t.limitedAvailabilitySubtitle
      )}
      
      {exclusiveProducts.length > 0 && renderProductSection(
        exclusiveProducts,
        t.exclusiveDrops,
        t.exclusiveDropsSubtitle
      )}
      
      <View style={styles.newsletterSection}>
        <LinearGradient
          colors={[Colors.primary, Colors.darkPurple]}
          style={styles.newsletterContainer}
        >
          <Ionicons name="mail-outline" size={32} color={Colors.secondary} />
          <Text style={styles.newsletterTitle}>
            {t.newsletterTitle}
          </Text>
          <Text style={styles.newsletterSubtitle}>
            {t.newsletterSubtitle}
          </Text>
          <Button
            title={t.newsletterButton}
            onPress={() => {
              // TODO: Implement newsletter signup
            }}
            variant="secondary"
            size="medium"
            style={styles.newsletterButton}
          />
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  
  heroContainer: {
    height: height * 0.6,
    marginBottom: 20,
  },
  
  heroGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  languageSwitcherContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  
  heroContent: {
    alignItems: 'center',
    maxWidth: 350,
  },
  
  heroLogo: {
    width: 100,
    height: 100,
    marginBottom: 32,
    borderRadius: 50,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  heroTitle: {
    fontFamily: Fonts.headlineBold,
    fontSize: FontSizes['4xl'],
    lineHeight: FontSizes['4xl'] * 1.1,
    fontWeight: FontWeights.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
    textShadowColor: Colors.glow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  
  heroSubtitle: {
    ...Typography.mobileSubtitle,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  
  heroButton: {
    minWidth: 180,
  },
  
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  sectionTitleContainer: {
    flex: 1,
  },
  
  sectionTitle: {
    ...Typography.h4,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  
  sectionSubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  
  productRow: {
    paddingRight: 16,
  },
  
  productCardContainer: {
    marginRight: 12,
  },
  
  newsletterSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  
  newsletterContainer: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  
  newsletterTitle: {
    ...Typography.h4,
    color: Colors.white,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 6,
  },
  
  newsletterSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  
  newsletterButton: {
    minWidth: 180,
  },
}); 