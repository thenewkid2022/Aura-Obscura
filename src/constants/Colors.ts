// Aura Obscura Brand Colors - Angepasst an das Logo
export const Colors = {
  // Primary Brand Colors - Logo-inspiriert
  primary: '#4C1F1F',      // Dunkles Rot/Bordeaux (Hauptfarbe)
  secondary: '#C4A25A',    // Goldene Schrift (Akzentfarbe)
  black: '#000000',        // Reines Schwarz
  white: '#FFFFFF',        // Reines Weiß
  
  // Extended Color Palette - Luxuriöse Nuancen
  darkBordeaux: '#3A1818', // Sehr dunkles Bordeaux
  mediumBordeaux: '#5D2626', // Mittleres Bordeaux
  lightBordeaux: '#6E2D2D',  // Helleres Bordeaux
  deepGold: '#B8945A',     // Tiefes Gold
  brightGold: '#D4B876',   // Helles Gold
  champagne: '#E5C687',    // Champagner-Ton
  
  // Neutral Colors - Elegante Grautöne
  darkGray: '#1A1A1A',     // Sehr dunkelgrau
  mediumGray: '#333333',   // Mittelgrau
  lightGray: '#666666',    // Hellgrau
  veryLightGray: '#999999', // Sehr hellgrau
  
  // Status Colors - Angepasst an das Design
  success: '#4A7C59',      // Dunkelgrün
  error: '#8B2635',        // Dunkelrot
  warning: '#C4A25A',      // Gold als Warnung
  info: '#4A5D7C',         // Dunkelblau
  
  // Text Colors - Optimiert für Lesbarkeit
  textPrimary: '#FFFFFF',      // Haupttext
  textSecondary: '#C4A25A',    // Sekundärtext (Gold)
  textMuted: '#999999',        // Abgeschwächter Text
  textAccent: '#D4B876',       // Akzenttext (Helles Gold)
  
  // Background Colors - Tiefe, mystische Atmosphäre
  backgroundPrimary: '#4C1F1F',    // Haupthintergrund (Bordeaux)
  backgroundSecondary: '#3A1818',  // Sekundärer Hintergrund
  backgroundCard: '#5D2626',       // Karten-Hintergrund
  backgroundOverlay: '#6E2D2D',    // Overlay-Hintergrund
  
  // Border Colors - Subtile Trennlinien
  border: '#333333',           // Hauptrahmen
  borderLight: '#666666',      // Hellerer Rahmen
  borderGold: '#C4A25A',       // Goldener Rahmen
  
  // Gradient Colors - Elegante Übergänge
  gradientStart: '#4C1F1F',        // Bordeaux
  gradientEnd: '#3A1818',          // Dunkles Bordeaux
  goldGradientStart: '#B8945A',    // Tiefes Gold
  goldGradientEnd: '#C4A25A',      // Goldene Schrift
  bordeauxGradientStart: '#3A1818', // Sehr dunkles Bordeaux
  bordeauxGradientEnd: '#5D2626',   // Mittleres Bordeaux
  
  // Special Effects
  shadow: 'rgba(76, 31, 31, 0.8)',    // Bordeaux Schatten
  glow: 'rgba(196, 162, 90, 0.3)',    // Goldener Glow
  overlay: 'rgba(58, 24, 24, 0.9)',   // Bordeaux Overlay
} as const;

export type ColorType = keyof typeof Colors; 