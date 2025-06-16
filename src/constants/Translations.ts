export type Language = 'de' | 'en';

export interface Translations {
  // Navigation
  home: string;
  shop: string;
  cart: string;
  favorites: string;
  profile: string;
  contact: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  discoverButton: string;
  
  // Product Sections
  newInShop: string;
  newInShopSubtitle: string;
  limitedAvailability: string;
  limitedAvailabilitySubtitle: string;
  exclusiveDrops: string;
  exclusiveDropsSubtitle: string;
  viewAll: string;
  
  // Newsletter
  newsletterTitle: string;
  newsletterSubtitle: string;
  newsletterButton: string;
  
  // Shop
  searchPlaceholder: string;
  filter: string;
  sort: string;
  sortNewest: string;
  sortPopular: string;
  sortPrice: string;
  sortRating: string;
  sortName: string;
  noProductsFound: string;
  noProductsFoundSubtitle: string;
  
  // Product Cards
  addToCart: string;
  outOfStock: string;
  onlyLeft: string;
  new: string;
  limited: string;
  exclusive: string;
  decant: string;
  decantInfo: string;
  
  // Cart
  cartTitle: string;
  items: string;
  item: string;
  emptyCartTitle: string;
  emptyCartSubtitle: string;
  goToShop: string;
  subtotal: string;
  shipping: string;
  free: string;
  total: string;
  checkout: string;
  freeShippingInfo: string;
  forFreeShipping: string;
  removeProduct: string;
  removeProductConfirm: string;
  cancel: string;
  remove: string;
  emptyCart: string;
  emptyCartMessage: string;
  
  // Checkout
  shippingAddress: string;
  billingAddress: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  sameAddress: string;
  orderSummary: string;
  processing: string;
  buyNow: string;
  missingFields: string;
  missingFieldsMessage: string;
  
  // Payment Methods
  paymentMethods: {
    creditCard: string;
  };
  
  // Order Confirmation
  orderSuccess: string;
  orderSuccessSubtitle: string;
  orderNumber: string;
  nextSteps: string;
  orderConfirmed: string;
  orderConfirmedDesc: string;
  handpickedFilling: string;
  handpickedFillingDesc: string;
  shippingStep: string;
  shippingStepDesc: string;
  tracking: string;
  trackingDesc: string;
  yourOrder: string;
  shippingCost: string;
  questions: string;
  contactText: string;
  continueShopping: string;
  viewOrders: string;
  
  // Profile
  myAccount: string;
  profileDescription: string;
  
  // Favorites
  favoritesTitle: string;
  favoritesDescription: string;
  
  // Contact
  contactTitle: string;
  contactDescription: string;
  
  // Language Switcher
  language: string;
  german: string;
  english: string;
}

export const translations: Record<Language, Translations> = {
  de: {
    // Navigation
    home: 'Home',
    shop: 'Shop',
    cart: 'Warenkorb',
    favorites: 'Favoriten',
    profile: 'Konto',
    contact: 'Kontakt',
    
    // Hero Section
    heroTitle: 'Seltene Düfte.\nDunkle Aura.\nPure Exzellenz.',
    heroSubtitle: 'Entdecken Sie exklusive Parfums und handverlesene Decants aus den feinsten Luxusmarken der Welt.',
    discoverButton: 'Jetzt entdecken',
    
    // Product Sections
    newInShop: 'Neu im Shop',
    newInShopSubtitle: 'Frische Düfte, die Sie begeistern werden',
    limitedAvailability: 'Nur heute verfügbar',
    limitedAvailabilitySubtitle: 'Exklusive Angebote mit begrenzter Verfügbarkeit',
    exclusiveDrops: 'Exklusive Drops',
    exclusiveDropsSubtitle: 'Handverlesene Raritäten für Kenner',
    viewAll: 'Alle anzeigen',
    
    // Newsletter
    newsletterTitle: 'Erhalten Sie Zugang zu exklusiven Drops',
    newsletterSubtitle: 'Als Newsletter-Abonnent erhalten Sie als Erster Zugang zu neuen Produkten und exklusiven Angeboten.',
    newsletterButton: 'Newsletter abonnieren',
    
    // Shop
    searchPlaceholder: 'Nach Düften, Marken oder Noten suchen...',
    filter: 'Filter',
    sort: 'Sortieren',
    sortNewest: 'Neueste',
    sortPopular: 'Beliebt',
    sortPrice: 'Preis',
    sortRating: 'Bewertung',
    sortName: 'Name',
    noProductsFound: 'Keine Produkte gefunden',
    noProductsFoundSubtitle: 'Versuchen Sie andere Suchbegriffe oder Filter',
    
    // Product Cards
    addToCart: 'Zum Warenkorb',
    outOfStock: 'Ausverkauft',
    onlyLeft: 'Nur noch',
    new: 'Neu',
    limited: 'Limitiert',
    exclusive: 'Exklusiv',
    decant: 'Decant',
    decantInfo: 'Abgefüllt aus Originalflakon',
    
    // Cart
    cartTitle: 'Warenkorb',
    items: 'Artikel',
    item: 'Artikel',
    emptyCartTitle: 'Ihr Warenkorb ist leer',
    emptyCartSubtitle: 'Entdecken Sie unsere exklusiven Düfte und fügen Sie sie zu Ihrem Warenkorb hinzu.',
    goToShop: 'Zum Shop',
    subtotal: 'Zwischensumme',
    shipping: 'Versand',
    free: 'Kostenlos',
    total: 'Gesamt',
    checkout: 'Zur Kasse',
    freeShippingInfo: 'Noch',
    forFreeShipping: 'für kostenlosen Versand',
    removeProduct: 'Produkt entfernen',
    removeProductConfirm: 'Möchten Sie dieses Produkt wirklich entfernen?',
    cancel: 'Abbrechen',
    remove: 'Entfernen',
    emptyCart: 'Ihr Warenkorb ist leer',
    emptyCartMessage: 'Entdecken Sie unsere exklusiven Düfte und fügen Sie sie zu Ihrem Warenkorb hinzu.',
    
    // Checkout
    shippingAddress: 'Lieferadresse',
    billingAddress: 'Rechnungsadresse',
    firstName: 'Vorname',
    lastName: 'Nachname',
    street: 'Straße & Hausnummer',
    city: 'Stadt',
    postalCode: 'PLZ',
    country: 'Land',
    phone: 'Telefon',
    sameAddress: 'Rechnungsadresse ist identisch mit Lieferadresse',
    orderSummary: 'Bestellübersicht',
    processing: 'Wird verarbeitet...',
    buyNow: 'Jetzt kaufen',
    missingFields: 'Fehlende Felder',
    missingFieldsMessage: 'Bitte füllen Sie alle erforderlichen Felder aus.',
    
    // Payment Methods
    paymentMethods: {
      creditCard: 'Kreditkarte',
    },
    
    // Order Confirmation
    orderSuccess: 'Bestellung erfolgreich!',
    orderSuccessSubtitle: 'Vielen Dank für Ihren Kauf. Ihre Bestellung wird sorgfältig verpackt und versendet.',
    orderNumber: 'Bestellnummer',
    nextSteps: 'Was passiert als Nächstes?',
    orderConfirmed: 'Bestellung bestätigt',
    orderConfirmedDesc: 'Sie erhalten eine Bestätigungs-E-Mail mit allen Details.',
    handpickedFilling: 'Handverlesene Abfüllung',
    handpickedFillingDesc: 'Unsere Experten füllen Ihre Decants sorgfältig aus Originalflakons ab.',
    shippingStep: 'Versand',
    shippingStepDesc: 'Ihr Paket wird sicher verpackt und innerhalb von 1-2 Werktagen versendet.',
    tracking: 'Tracking',
    trackingDesc: 'Sie erhalten eine E-Mail mit dem Tracking-Link, sobald das Paket versendet wurde.',
    yourOrder: 'Ihre Bestellung',
    shippingCost: 'Versand',
    questions: 'Haben Sie Fragen?',
    contactText: 'Unser Kundenservice ist für Sie da. Kontaktieren Sie uns gerne per E-Mail oder über das Kontaktformular.',
    continueShopping: 'Weiter einkaufen',
    viewOrders: 'Meine Bestellungen anzeigen',
    
    // Profile
    myAccount: 'Mein Konto',
    profileDescription: 'Hier verwalten Sie Ihr Profil und Ihre Bestellungen.',
    
    // Favorites
    favoritesTitle: 'Favoriten',
    favoritesDescription: 'Hier erscheinen Ihre Lieblingsdüfte.',
    
    // Contact
    contactTitle: 'Kontakt',
    contactDescription: 'Schreiben Sie uns bei Fragen oder Anregungen.',
    
    // Language Switcher
    language: 'Sprache',
    german: 'Deutsch',
    english: 'English',
  },
  
  en: {
    // Navigation
    home: 'Home',
    shop: 'Shop',
    cart: 'Cart',
    favorites: 'Favorites',
    profile: 'Account',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Rare Fragrances.\nDark Aura.\nPure Excellence.',
    heroSubtitle: 'Discover exclusive perfumes and hand-picked decants from the finest luxury brands in the world.',
    discoverButton: 'Discover Now',
    
    // Product Sections
    newInShop: 'New in Shop',
    newInShopSubtitle: 'Fresh fragrances that will captivate you',
    limitedAvailability: 'Limited Time Only',
    limitedAvailabilitySubtitle: 'Exclusive offers with limited availability',
    exclusiveDrops: 'Exclusive Drops',
    exclusiveDropsSubtitle: 'Hand-picked rarities for connoisseurs',
    viewAll: 'View All',
    
    // Newsletter
    newsletterTitle: 'Get Access to Exclusive Drops',
    newsletterSubtitle: 'As a newsletter subscriber, you\'ll be the first to access new products and exclusive offers.',
    newsletterButton: 'Subscribe to Newsletter',
    
    // Shop
    searchPlaceholder: 'Search for fragrances, brands or notes...',
    filter: 'Filter',
    sort: 'Sort',
    sortNewest: 'Newest',
    sortPopular: 'Popular',
    sortPrice: 'Price',
    sortRating: 'Rating',
    sortName: 'Name',
    noProductsFound: 'No products found',
    noProductsFoundSubtitle: 'Try different search terms or filters',
    
    // Product Cards
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    onlyLeft: 'Only',
    new: 'New',
    limited: 'Limited',
    exclusive: 'Exclusive',
    decant: 'Decant',
    decantInfo: 'Filled from original bottle',
    
    // Cart
    cartTitle: 'Cart',
    items: 'items',
    item: 'item',
    emptyCartTitle: 'Your cart is empty',
    emptyCartSubtitle: 'Discover our exclusive fragrances and add them to your cart.',
    goToShop: 'Go to Shop',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    total: 'Total',
    checkout: 'Checkout',
    freeShippingInfo: 'More for free shipping',
    forFreeShipping: 'for free shipping',
    removeProduct: 'Remove Product',
    removeProductConfirm: 'Are you sure you want to remove this product?',
    cancel: 'Cancel',
    remove: 'Remove',
    emptyCart: 'Your cart is empty',
    emptyCartMessage: 'Discover our exclusive fragrances and add them to your cart.',
    
    // Checkout
    shippingAddress: 'Shipping Address',
    billingAddress: 'Billing Address',
    firstName: 'First Name',
    lastName: 'Last Name',
    street: 'Street & Number',
    city: 'City',
    postalCode: 'Postal Code',
    country: 'Country',
    phone: 'Phone',
    sameAddress: 'Billing address is same as shipping address',
    orderSummary: 'Order Summary',
    processing: 'Processing...',
    buyNow: 'Buy Now',
    missingFields: 'Missing Fields',
    missingFieldsMessage: 'Please fill out all required fields.',
    
    // Payment Methods
    paymentMethods: {
      creditCard: 'Credit Card',
    },
    
    // Order Confirmation
    orderSuccess: 'Order Successful!',
    orderSuccessSubtitle: 'Thank you for your purchase. Your order will be carefully packaged and shipped.',
    orderNumber: 'Order Number',
    nextSteps: 'What Happens Next?',
    orderConfirmed: 'Order Confirmed',
    orderConfirmedDesc: 'You will receive a confirmation email with all details.',
    handpickedFilling: 'Hand-picked Filling',
    handpickedFillingDesc: 'Our experts carefully fill your decants from original bottles.',
    shippingStep: 'Shipping',
    shippingStepDesc: 'Your package will be safely packaged and shipped within 1-2 business days.',
    tracking: 'Tracking',
    trackingDesc: 'You will receive an email with the tracking link once the package has been shipped.',
    yourOrder: 'Your Order',
    shippingCost: 'Shipping',
    questions: 'Have Questions?',
    contactText: 'Our customer service is here for you. Feel free to contact us by email or through the contact form.',
    continueShopping: 'Continue Shopping',
    viewOrders: 'View My Orders',
    
    // Profile
    myAccount: 'My Account',
    profileDescription: 'Here you can manage your profile and orders.',
    
    // Favorites
    favoritesTitle: 'Favorites',
    favoritesDescription: 'Your favorite fragrances will appear here.',
    
    // Contact
    contactTitle: 'Contact',
    contactDescription: 'Write to us with questions or suggestions.',
    
    // Language Switcher
    language: 'Language',
    german: 'Deutsch',
    english: 'English',
  },
}; 