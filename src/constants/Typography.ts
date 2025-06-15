import { Platform } from 'react-native';

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

// Font Sizes
export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
} as const;

// Line Heights
export const LineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
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

// Typography Styles
export const Typography = {
  // Headlines
  h1: {
    fontFamily: Fonts.headlineBold,
    fontSize: FontSizes['5xl'],
    lineHeight: FontSizes['5xl'] * LineHeights.tight,
    fontWeight: FontWeights.bold,
  },
  h2: {
    fontFamily: Fonts.headlineBold,
    fontSize: FontSizes['4xl'],
    lineHeight: FontSizes['4xl'] * LineHeights.tight,
    fontWeight: FontWeights.bold,
  },
  h3: {
    fontFamily: Fonts.headlineBold,
    fontSize: FontSizes['3xl'],
    lineHeight: FontSizes['3xl'] * LineHeights.tight,
    fontWeight: FontWeights.semibold,
  },
  h4: {
    fontFamily: Fonts.headlineBold,
    fontSize: FontSizes['2xl'],
    lineHeight: FontSizes['2xl'] * LineHeights.tight,
    fontWeight: FontWeights.semibold,
  },
  
  // Body Text
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
  
  // Special Text
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
    fontSize: FontSizes['2xl'],
    lineHeight: FontSizes['2xl'] * LineHeights.tight,
    fontWeight: FontWeights.bold,
  },
} as const; 