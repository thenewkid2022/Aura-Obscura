// Aura Obscura Brand Colors - Optimiert für Lesbarkeit und Abgrenzung
export const Colors = {
  // Primary Brand Colors
  primary: '#4C1F1F',      // Dunkles Rot/Bordeaux (Hauptfarbe)
  secondary: '#C4A25A',    // Goldene Schrift (Akzentfarbe)
  black: '#000000',        // Reines Schwarz
  white: '#FFFDF8',        // Helles Weiß für Text

  // Extended Color Palette
  darkBordeaux: '#3A1818', // Sehr dunkles Bordeaux
  mediumBordeaux: '#5D2626', // Mittleres Bordeaux
  lightBordeaux: '#6E2D2D',  // Helleres Bordeaux (Karten)
  deepGold: '#B8945A',     // Tiefes Gold
  brightGold: '#E5C687',   // Helles Gold (Sekundärtext)
  champagne: '#F5E6B3',    // Champagner-Ton

  // Neutral Colors
  darkGray: '#1A1A1A',     // Sehr dunkelgrau
  mediumGray: '#333333',   // Mittelgrau
  lightGray: '#666666',    // Hellgrau
  veryLightGray: '#BFAFAF', // Sehr hellgrau (Muted)

  // Status Colors
  success: '#4A7C59',      // Dunkelgrün
  error: '#8B2635',        // Dunkelrot
  warning: '#C4A25A',      // Gold als Warnung
  info: '#4A5D7C',         // Dunkelblau

  // Text Colors
  textPrimary: '#FFFDF8',      // Haupttext
  textSecondary: '#E5C687',    // Sekundärtext (helles Gold)
  textMuted: '#BFAFAF',        // Abgeschwächter Text
  textAccent: '#C4A25A',       // Akzenttext (Gold)

  // Background Colors
  backgroundPrimary: '#4C1F1F',    // Haupthintergrund (Bordeaux)
  backgroundSecondary: '#3A1818',  // Sekundärer Hintergrund
  backgroundCard: '#6E2D2D',       // Karten-Hintergrund
  backgroundOverlay: '#5D2626',    // Overlay-Hintergrund

  // Border Colors
  border: '#8C5C5C',           // Deutlichere Rahmen
  borderLight: '#BFAFAF',      // Hellerer Rahmen
  borderGold: '#C4A25A',       // Goldener Rahmen

  // TabBar
  tabBarBackground: '#3A1818',
  tabBarActive: '#C4A25A',
  tabBarInactive: '#BFAFAF',

  // Inputs
  inputBackground: '#5D2626',
  inputBorder: '#C4A25A',

  // Button
  buttonTextOnGold: '#4C1F1F',
  buttonTextOnBordeaux: '#C4A25A',

  // Gradient Colors
  gradientStart: '#4C1F1F',        // Bordeaux
  gradientEnd: '#3A1818',          // Dunkles Bordeaux
  goldGradientStart: '#B8945A',    // Tiefes Gold
  goldGradientEnd: '#C4A25A',      // Goldene Schrift
  bordeauxGradientStart: '#3A1818', // Sehr dunkles Bordeaux
  bordeauxGradientEnd: '#5D2626',   // Mittleres Bordeaux

  // Special Effects
  shadow: 'rgba(0,0,0,0.25)',    // Stärkerer Schatten
  glow: 'rgba(196, 162, 90, 0.3)',    // Goldener Glow
  overlay: 'rgba(58, 24, 24, 0.9)',   // Bordeaux Overlay
} as const;

export type ColorType = keyof typeof Colors; 