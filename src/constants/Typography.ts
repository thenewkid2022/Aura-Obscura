import { Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Responsive Font Sizes basierend auf Bildschirmgröße
const getResponsiveFontSize = (baseSize: number) => {
  const scale = Math.min(width / 375, height / 812); // iPhone X als Referenz
  return Math.round(baseSize * scale);
};

// Font Families
export const Fonts = {
  // Headlines - Playfair Display oder Cinzel
  headline: Platform.select({
    ios: 'Playfair Display',
    android: 'PlayfairDisplay-Regular',
    default: 'serif',
  }),
  headlineBold: Platform.select({
    ios: 'Playfair Display',
    android: 'PlayfairDisplay-Bold',
    default: 'serif',
  }),
  
  // Body Text - Lato oder Libre Baskerville
  body: Platform.select({
    ios: 'Lato',
    android: 'Lato-Regular',
    default: 'sans-serif',
  }),
  bodyBold: Platform.select({
    ios: 'Lato',
    android: 'Lato-Bold',
    default: 'sans-serif',
  }),
  
  // Alternative Body Font
  bodyAlt: Platform.select({
    ios: 'Libre Baskerville',
    android: 'LibreBaskerville-Regular',
    default: 'serif',
  }),
} as const;

// Responsive Font Sizes
export const FontSizes = {
  xs: getResponsiveFontSize(12),
  sm: getResponsiveFontSize(14),
  base: getResponsiveFontSize(16),
  lg: getResponsiveFontSize(18),
  xl: getResponsiveFontSize(20),
  '2xl': getResponsiveFontSize(24),
  '3xl': getResponsiveFontSize(30),
  '4xl': getResponsiveFontSize(36),
  '5xl': getResponsiveFontSize(48),
  '6xl': getResponsiveFontSize(60),
} as const;

// Mobile-optimierte Line Heights
export const LineHeights = {
  tight: 1.2,
  normal: 1.4, // Reduziert für mobile Lesbarkeit
  relaxed: 1.6, // Reduziert für mobile Lesbarkeit
} as const;

// Font Weights
export const FontWeights = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

// Mobile-optimierte Typography Styles
export const Typography = {
  // Headlines - Mobile-optimiert
  h1: {
    fontFamily: Fonts.headlineBold,
    fontSize: FontSizes['4xl'], // Reduziert für mobile
    lineHeight: FontSizes['4xl'] * LineHeights.tight,
    fontWeight: FontWeights.bold,
  },
  h2: {
    fontFamily: Fonts.headlineBold,
    fontSize: FontSizes['3xl'], // Reduziert für mobile
    lineHeight: FontSizes['3xl'] * LineHeights.tight,
    fontWeight: FontWeights.bold,
  },
  h3: {
    fontFamily: Fonts.headlineBold,
    fontSize: FontSizes['2xl'],
    lineHeight: FontSizes['2xl'] * LineHeights.tight,
    fontWeight: FontWeights.semibold,
  },
  h4: {
    fontFamily: Fonts.headlineBold,
    fontSize: FontSizes.xl,
    lineHeight: FontSizes.xl * LineHeights.tight,
    fontWeight: FontWeights.semibold,
  },
  
  // Body Text - Mobile-optimiert
  bodyLarge: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.lg,
    lineHeight: FontSizes.lg * LineHeights.normal,
    fontWeight: FontWeights.normal,
  },
  body: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.base,
    lineHeight: FontSizes.base * LineHeights.normal,
    fontWeight: FontWeights.normal,
  },
  bodySmall: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.sm * LineHeights.normal,
    fontWeight: FontWeights.normal,
  },
  
  // Special Text - Mobile-optimiert
  caption: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.xs,
    lineHeight: FontSizes.xs * LineHeights.normal,
    fontWeight: FontWeights.light,
  },
  button: {
    fontFamily: Fonts.bodyBold,
    fontSize: FontSizes.base,
    lineHeight: FontSizes.base * LineHeights.tight,
    fontWeight: FontWeights.semibold,
  },
  price: {
    fontFamily: Fonts.headlineBold,
    fontSize: FontSizes.xl, // Reduziert für mobile
    lineHeight: FontSizes.xl * LineHeights.tight,
    fontWeight: FontWeights.bold,
  },
  
  // Mobile-spezifische Typography
  mobileTitle: {
    fontFamily: Fonts.headlineBold,
    fontSize: FontSizes['2xl'],
    lineHeight: FontSizes['2xl'] * LineHeights.tight,
    fontWeight: FontWeights.bold,
  },
  mobileSubtitle: {
    fontFamily: Fonts.body,
    fontSize: FontSizes.base,
    lineHeight: FontSizes.base * LineHeights.normal,
    fontWeight: FontWeights.normal,
  },
  mobileButton: {
    fontFamily: Fonts.bodyBold,
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.sm * LineHeights.tight,
    fontWeight: FontWeights.semibold,
  },
} as const; 