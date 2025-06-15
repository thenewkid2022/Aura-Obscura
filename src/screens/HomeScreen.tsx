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
import { Typography } from '../constants/Typography';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ui/ProductCard';
import { Product } from '../types';

const { width, height } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [limitedProducts, setLimitedProducts] = useState<Product[]>([]);
  const [exclusiveProducts, setExclusiveProducts] = useState<Product[]>([]);

  // Mock-Daten für Demo-Zwecke
  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock-Produkte für Demo
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

    setNewProducts(mockProducts.filter(p => p.isNew));
    setLimitedProducts(mockProducts.filter(p => p.isLimited));
    setExclusiveProducts(mockProducts.filter(p => p.isExclusive));
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
        <View style={styles.heroContent}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.heroLogo}
            resizeMode="contain"
          />
          <Text style={styles.heroTitle}>
            Seltene Düfte.{'\n'}Dunkle Aura.{'\n'}Pure Exzellenz.
          </Text>
          <Text style={styles.heroSubtitle}>
            Entdecken Sie exklusive Parfums und handverlesene Decants aus den feinsten Luxusmarken der Welt.
          </Text>
          <Button
            title="Jetzt entdecken"
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
          title="Alle anzeigen"
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
              onFavoritePress={(product) => console.log('Favorite:', product.name)}
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
        'Neu im Shop',
        'Frische Düfte, die Sie begeistern werden'
      )}
      
      {limitedProducts.length > 0 && renderProductSection(
        limitedProducts,
        'Nur heute verfügbar',
        'Exklusive Angebote mit begrenzter Verfügbarkeit'
      )}
      
      {exclusiveProducts.length > 0 && renderProductSection(
        exclusiveProducts,
        'Exklusive Drops',
        'Handverlesene Raritäten für Kenner'
      )}
      
      <View style={styles.newsletterSection}>
        <LinearGradient
          colors={[Colors.primary, Colors.darkPurple]}
          style={styles.newsletterContainer}
        >
          <Ionicons name="mail-outline" size={32} color={Colors.secondary} />
          <Text style={styles.newsletterTitle}>
            Erhalten Sie Zugang zu exklusiven Drops
          </Text>
          <Text style={styles.newsletterSubtitle}>
            Als Newsletter-Abonnent erhalten Sie als Erster Zugang zu neuen Produkten und exklusiven Angeboten.
          </Text>
          <Button
            title="Newsletter abonnieren"
            onPress={() => console.log('Newsletter signup')}
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
    height: height * 0.7,
    marginBottom: 24,
  },
  
  heroGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  
  heroContent: {
    alignItems: 'center',
    maxWidth: 400,
  },
  
  heroLogo: {
    width: 120,
    height: 120,
    marginBottom: 24,
    borderRadius: 60,
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
    ...Typography.h1,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 56,
  },
  
  heroSubtitle: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  
  heroButton: {
    minWidth: 200,
  },
  
  section: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  sectionTitleContainer: {
    flex: 1,
  },
  
  sectionTitle: {
    ...Typography.h3,
    color: Colors.white,
    marginBottom: 4,
  },
  
  sectionSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textMuted,
  },
  
  productRow: {
    paddingRight: 16,
  },
  
  productCardContainer: {
    marginRight: 16,
  },
  
  newsletterSection: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  
  newsletterContainer: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  
  newsletterTitle: {
    ...Typography.h4,
    color: Colors.white,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  
  newsletterSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  
  newsletterButton: {
    minWidth: 200,
  },
}); 