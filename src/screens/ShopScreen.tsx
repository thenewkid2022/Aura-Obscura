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
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ui/ProductCard';
import { Product, ProductFilters } from '../types';
import { testProducts } from '../constants/TestProducts';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

const { width } = Dimensions.get('window');
const isTablet = width > 768; // Tablet/Desktop breakpoint

interface ShopScreenProps {
  navigation: any;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({ navigation }) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
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

  // Mock-Daten laden
  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, searchQuery, filters, sortBy]);

  const loadProducts = () => {
    // Testprodukte mit echten Bildern aus dem Assets-Ordner
    setProducts(testProducts);
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
      
      return comparison;
    });

    setFilteredProducts(filtered);
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const handleFavoritePress = (product: Product) => {
    // TODO: Implement favorite functionality
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    // Optional: Zeige eine Bestätigung an
    // Alert.alert('Produkt hinzugefügt', `${product.name} wurde zum Warenkorb hinzugefügt.`);
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

  const renderHeader = () => {
    // Anzahl der aktiven Filter berechnen
    const activeFiltersCount = 
      filters.brands.length + 
      filters.categories.length + 
      filters.types.length + 
      filters.genders.length + 
      (filters.availability !== 'all' ? 1 : 0) +
      (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 500 ? 1 : 0);

    return (
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder={t.searchPlaceholder}
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
            <Text style={styles.filterButtonText}>
              {t.filter}
              {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
            </Text>
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
              {sortBy === 'newest' && t.sortNewest}
              {sortBy === 'popular' && t.sortPopular}
              {sortBy === 'price' && t.sortPrice}
              {sortBy === 'rating' && t.sortRating}
              {sortBy === 'name' && t.sortName}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={handleProductPress}
      onFavoritePress={handleFavoritePress}
      onAddToCart={handleAddToCart}
    />
  );

  const renderFilterModal = () => {
    // Verfügbare Optionen aus den Produkten extrahieren
    const availableBrands = [...new Set(products.map(p => p.brand))];
    const availableCategories = [...new Set(products.map(p => p.category))];
    const availableTypes = [...new Set(products.map(p => p.type))];
    const availableGenders = [...new Set(products.map(p => p.gender))];

    const toggleBrand = (brand: string) => {
      setFilters(prev => ({
        ...prev,
        brands: prev.brands.includes(brand)
          ? prev.brands.filter(b => b !== brand)
          : [...prev.brands, brand]
      }));
    };

    const toggleCategory = (category: string) => {
      setFilters(prev => ({
        ...prev,
        categories: prev.categories.includes(category)
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category]
      }));
    };

    const toggleType = (type: string) => {
      setFilters(prev => ({
        ...prev,
        types: prev.types.includes(type)
          ? prev.types.filter(t => t !== type)
          : [...prev.types, type]
      }));
    };

    const toggleGender = (gender: string) => {
      setFilters(prev => ({
        ...prev,
        genders: prev.genders.includes(gender)
          ? prev.genders.filter(g => g !== gender)
          : [...prev.genders, gender]
      }));
    };

    const updatePriceRange = (min: number, max: number) => {
      setFilters(prev => ({
        ...prev,
        priceRange: [min, max]
      }));
    };

    const updateAvailability = (availability: 'all' | 'in-stock' | 'limited') => {
      setFilters(prev => ({
        ...prev,
        availability
      }));
    };

    return (
      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{t.filter}</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Ionicons name="close" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Marken */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Marken</Text>
              <View style={styles.filterOptions}>
                {availableBrands.map(brand => (
                  <TouchableOpacity
                    key={brand}
                    style={[
                      styles.filterOption,
                      filters.brands.includes(brand) && styles.filterOptionSelected
                    ]}
                    onPress={() => toggleBrand(brand)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      filters.brands.includes(brand) && styles.filterOptionTextSelected
                    ]}>
                      {brand}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Kategorien */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Kategorien</Text>
              <View style={styles.filterOptions}>
                {availableCategories.map(category => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.filterOption,
                      filters.categories.includes(category) && styles.filterOptionSelected
                    ]}
                    onPress={() => toggleCategory(category)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      filters.categories.includes(category) && styles.filterOptionTextSelected
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Typen */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Typen</Text>
              <View style={styles.filterOptions}>
                {availableTypes.map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.filterOption,
                      filters.types.includes(type) && styles.filterOptionSelected
                    ]}
                    onPress={() => toggleType(type)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      filters.types.includes(type) && styles.filterOptionTextSelected
                    ]}>
                      {type === 'decant' ? 'Decant' : 'Original'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Geschlechter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Geschlechter</Text>
              <View style={styles.filterOptions}>
                {availableGenders.map(gender => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.filterOption,
                      filters.genders.includes(gender) && styles.filterOptionSelected
                    ]}
                    onPress={() => toggleGender(gender)}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      filters.genders.includes(gender) && styles.filterOptionTextSelected
                    ]}>
                      {gender === 'masculine' ? 'Männlich' : 
                       gender === 'feminine' ? 'Weiblich' : 'Unisex'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Preisbereich */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Preisbereich</Text>
              <View style={styles.priceRangeContainer}>
                <Text style={styles.priceRangeText}>
                  {filters.priceRange[0]}€ - {filters.priceRange[1]}€
                </Text>
                <View style={styles.priceRangeButtons}>
                  <TouchableOpacity
                    style={styles.priceRangeButton}
                    onPress={() => updatePriceRange(0, 50)}
                  >
                    <Text style={styles.priceRangeButtonText}>0-50€</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.priceRangeButton}
                    onPress={() => updatePriceRange(50, 100)}
                  >
                    <Text style={styles.priceRangeButtonText}>50-100€</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.priceRangeButton}
                    onPress={() => updatePriceRange(100, 500)}
                  >
                    <Text style={styles.priceRangeButtonText}>100€+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Verfügbarkeit */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Verfügbarkeit</Text>
              <View style={styles.filterOptions}>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    filters.availability === 'all' && styles.filterOptionSelected
                  ]}
                  onPress={() => updateAvailability('all')}
                >
                  <Text style={[
                    styles.filterOptionText,
                    filters.availability === 'all' && styles.filterOptionTextSelected
                  ]}>
                    Alle
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    filters.availability === 'in-stock' && styles.filterOptionSelected
                  ]}
                  onPress={() => updateAvailability('in-stock')}
                >
                  <Text style={[
                    styles.filterOptionText,
                    filters.availability === 'in-stock' && styles.filterOptionTextSelected
                  ]}>
                    Auf Lager
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    filters.availability === 'limited' && styles.filterOptionSelected
                  ]}
                  onPress={() => updateAvailability('limited')}
                >
                  <Text style={[
                    styles.filterOptionText,
                    filters.availability === 'limited' && styles.filterOptionTextSelected
                  ]}>
                    Limitiert
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={isTablet ? 4 : 2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color={Colors.textMuted} />
            <Text style={styles.emptyStateTitle}>{t.noProductsFound}</Text>
            <Text style={styles.emptyStateSubtitle}>
              {t.noProductsFoundSubtitle}
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
  
  filterSection: {
    marginBottom: 24,
  },
  
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  filterOption: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  
  filterOptionSelected: {
    backgroundColor: Colors.secondary,
  },
  
  filterOptionText: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
  },
  
  filterOptionTextSelected: {
    ...Typography.bodySmall,
    color: Colors.white,
  },
  
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  priceRangeText: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    marginRight: 16,
  },
  
  priceRangeButtons: {
    flexDirection: 'row',
  },
  
  priceRangeButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    marginRight: 8,
  },
  
  priceRangeButtonText: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
  },
}); 