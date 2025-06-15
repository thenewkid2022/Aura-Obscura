import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ui/ProductCard';
import { Product, ProductFilters } from '../types';

interface ShopScreenProps {
  navigation: any;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [filters, setFilters] = useState<ProductFilters>({
    brands: [],
    categories: [],
    types: [],
    genders: [],
    priceRange: [0, 500],
    notes: [],
    availability: 'all',
  });
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'newest' | 'popular'>('newest');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Mock-Daten laden
  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, searchQuery, filters, sortBy, sortOrder]);

  const loadProducts = () => {
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
      {
        id: '3',
        name: 'Bleu de Chanel',
        brand: 'Chanel',
        description: 'Ein eleganter, moderner Duft für den urbanen Gentleman',
        shortDescription: 'Eleganter, moderner Duft für den urbanen Gentleman',
        price: 45,
        currency: 'EUR',
        images: ['https://via.placeholder.com/300x400/2E133F/FFFFFF?text=Chanel+Bleu'],
        category: 'eau-de-parfum',
        type: 'original',
        gender: 'masculine',
        notes: [
          { id: '5', name: 'Bergamotte', type: 'top', category: 'zitrus' },
          { id: '6', name: 'Holz', type: 'base', category: 'holz' },
        ],
        concentration: 'Eau de Parfum',
        volume: '100ml',
        availability: 12,
        isLimited: false,
        isExclusive: false,
        isNew: false,
        isOnSale: true,
        originalPrice: 55,
        rating: 4.7,
        reviewCount: 89,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    setProducts(mockProducts);
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Suchfilter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Markenfilter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product =>
        filters.brands.includes(product.brand)
      );
    }

    // Kategoriefilter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    // Typfilter
    if (filters.types.length > 0) {
      filtered = filtered.filter(product =>
        filters.types.includes(product.type)
      );
    }

    // Geschlechterfilter
    if (filters.genders.length > 0) {
      filtered = filtered.filter(product =>
        filters.genders.includes(product.gender)
      );
    }

    // Preisfilter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Verfügbarkeitsfilter
    if (filters.availability === 'in-stock') {
      filtered = filtered.filter(product => product.availability > 0);
    } else if (filters.availability === 'limited') {
      filtered = filtered.filter(product => product.availability <= 5 && product.availability > 0);
    }

    // Sortierung
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = b.rating - a.rating;
          break;
        case 'newest':
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          break;
        case 'popular':
          comparison = b.reviewCount - a.reviewCount;
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredProducts(filtered);
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const handleFavoritePress = (product: Product) => {
    console.log('Favorite:', product.name);
  };

  const handleAddToCart = (product: Product) => {
    setCartItemCount(prev => prev + 1);
    Alert.alert(
      'Produkt hinzugefügt',
      `${product.name} wurde zu Ihrem Warenkorb hinzugefügt.`,
      [
        { text: 'Weiter einkaufen', style: 'cancel' },
        { text: 'Zum Warenkorb', onPress: () => navigation.navigate('Warenkorb') },
      ]
    );
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      categories: [],
      types: [],
      genders: [],
      priceRange: [0, 500],
      notes: [],
      availability: 'all',
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Nach Düften, Marken oder Noten suchen..."
          placeholderTextColor={Colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="filter" size={20} color={Colors.secondary} />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => {
            const sortOptions = ['newest', 'popular', 'price', 'rating', 'name'];
            const currentIndex = sortOptions.indexOf(sortBy);
            const nextIndex = (currentIndex + 1) % sortOptions.length;
            setSortBy(sortOptions[nextIndex] as any);
          }}
        >
          <Ionicons name="swap-vertical" size={20} color={Colors.secondary} />
          <Text style={styles.sortButtonText}>
            {sortBy === 'newest' && 'Neueste'}
            {sortBy === 'popular' && 'Beliebt'}
            {sortBy === 'price' && 'Preis'}
            {sortBy === 'rating' && 'Bewertung'}
            {sortBy === 'name' && 'Name'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={handleProductPress}
      onFavoritePress={handleFavoritePress}
      onAddToCart={handleAddToCart}
    />
  );

  const renderFilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Filter</Text>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Ionicons name="close" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.modalContent}>
          {/* Hier würden die Filter-Optionen implementiert */}
          <Text style={styles.filterSectionTitle}>Marken</Text>
          <Text style={styles.filterSectionTitle}>Kategorien</Text>
          <Text style={styles.filterSectionTitle}>Preisbereich</Text>
          <Text style={styles.filterSectionTitle}>Verfügbarkeit</Text>
        </ScrollView>
        
        <View style={styles.modalFooter}>
          <Button
            title="Filter zurücksetzen"
            onPress={clearFilters}
            variant="outline"
            style={styles.clearButton}
          />
          <Button
            title="Anwenden"
            onPress={() => setShowFilters(false)}
            variant="primary"
            style={styles.applyButton}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color={Colors.textMuted} />
            <Text style={styles.emptyStateTitle}>Keine Produkte gefunden</Text>
            <Text style={styles.emptyStateSubtitle}>
              Versuchen Sie andere Suchbegriffe oder Filter
            </Text>
          </View>
        }
      />
      
      {renderFilterModal()}
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
    paddingBottom: 8,
  },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  
  searchInput: {
    flex: 1,
    marginLeft: 12,
    ...Typography.body,
    color: Colors.textPrimary,
  },
  
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  
  filterButtonText: {
    ...Typography.bodySmall,
    color: Colors.secondary,
    marginLeft: 8,
  },
  
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  
  sortButtonText: {
    ...Typography.bodySmall,
    color: Colors.secondary,
    marginLeft: 8,
  },
  
  productList: {
    padding: 16,
  },
  
  productRow: {
    justifyContent: 'space-between',
  },
  
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  
  emptyStateTitle: {
    ...Typography.h4,
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  
  emptyStateSubtitle: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  modalTitle: {
    ...Typography.h3,
    color: Colors.white,
  },
  
  modalContent: {
    flex: 1,
    padding: 16,
  },
  
  filterSectionTitle: {
    ...Typography.h4,
    color: Colors.white,
    marginBottom: 16,
    marginTop: 24,
  },
  
  modalFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 12,
  },
  
  clearButton: {
    flex: 1,
  },
  
  applyButton: {
    flex: 1,
  },
}); 