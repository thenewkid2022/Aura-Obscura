# Aura Obscura - Exklusive Parfums

Eine luxuriöse mobile Shopping-App für seltene, exklusive Parfums und handverlesene Decants.

## 🎨 Design

- **Farbpalette**: Dunkles Bordeaux (#4C1F1F) mit goldener Schrift (#C4A25A)
- **Stil**: Mystisch-edles, minimalistisches Design
- **Typografie**: Playfair Display/Cinzel für Headlines, Lato/Libre Baskerville für Body

## 📱 Mobile Optimierungen

### Neue Features
- **Haptic Feedback**: Vibration bei Interaktionen für bessere UX
- **Responsive Design**: Automatische Anpassung an verschiedene Bildschirmgrößen
- **Touch-Optimierung**: Größere Touch-Targets und bessere Accessibility
- **Performance**: Optimierte Bilder und Animationen
- **Push Notifications**: Benachrichtigungen für neue Drops und Angebote

### Mobile-spezifische Verbesserungen
- Reduzierte Schriftgrößen für mobile Lesbarkeit
- Optimierte Abstände und Padding
- Verbesserte Navigation und Gesten
- Mobile-optimierte Produktkarten
- Haptic Feedback bei allen Interaktionen

## 🚀 Deployment

### Web Deployment auf Vercel

#### Voraussetzungen

1. **GitHub Repository**: `Aura-Obscura`
2. **Vercel Account**: [vercel.com](https://vercel.com)
3. **Domain**: `aura-obscura.com`

#### Deployment-Schritte

```bash
# Alle Änderungen committen
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

1. **Vercel Dashboard öffnen**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **"New Project" klicken**
3. **GitHub Repository importieren**: `Aura-Obscura`
4. **Build-Konfiguration**:
   - **Framework Preset**: `Other`
   - **Build Command**: `npm run build:web`
   - **Output Directory**: `web-build`
   - **Install Command**: `npm install`

### Mobile App Deployment

#### iOS App Store
```bash
# iOS Build erstellen
npm run build:ios

# App Store Deployment
eas submit --platform ios
```

#### Google Play Store
```bash
# Android Build erstellen
npm run build:android

# Play Store Deployment
eas submit --platform android
```

## 🛠 Entwicklung

### Voraussetzungen
- Node.js 18+
- Expo CLI
- iOS Simulator (für iOS Entwicklung)
- Android Studio (für Android Entwicklung)

### Installation
```bash
# Dependencies installieren
npm install

# Expo CLI installieren (falls nicht vorhanden)
npm install -g @expo/cli
```

### Entwicklungsserver starten
```bash
# Web-Version
npm run web

# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Expo Go App (alle Plattformen)
npm start
```

### Mobile-spezifische Befehle
```bash
# iOS Preview mit Tunnel
npm run preview:ios

# Android Preview mit Tunnel
npm run preview:android

# Mobile Builds
npm run build:ios
npm run build:android
npm run build:all
```

### Testing
```bash
# Tests ausführen
npm test

# Tests im Watch-Modus
npm run test:watch

# Code-Qualität prüfen
npm run lint
npm run lint:fix
npm run type-check
```

## 📱 Features

- **Startseite**: Hero-Bild mit Logo und Produktsektionen
- **Shop**: Filtermöglichkeiten und Produktsuche
- **Warenkorb**: Vollständiger Checkout-Flow
- **Konto**: Login-System (vorbereitet)
- **Navigation**: Bottom Tabs (Home, Shop, Favoriten, Konto, Kontakt)
- **Mobile Features**: Haptic Feedback, Push Notifications, Responsive Design

## 🛠 Technologie-Stack

- **Frontend**: React Native mit Expo
- **Navigation**: React Navigation
- **Styling**: React Native StyleSheet
- **Animationen**: React Native Reanimated
- **Bilder**: React Native Fast Image
- **Haptic Feedback**: Expo Haptics
- **Push Notifications**: Expo Notifications
- **Deployment**: Vercel (Web), EAS Build (Mobile)
- **Domain**: aura-obscura.com

## 📦 Projektstruktur

```
Aura Obscura/
├── src/
│   ├── components/ui/     # UI-Komponenten
│   ├── constants/         # Farben & Typografie
│   ├── navigation/        # Navigation-Konfiguration
│   ├── screens/          # App-Screens
│   └── types/            # TypeScript-Definitionen
├── assets/               # Bilder & Assets
├── app.json             # Expo-Konfiguration
├── eas.json             # EAS Build-Konfiguration
├── package.json         # Dependencies
├── vercel.json          # Vercel-Konfiguration
├── .eslintrc.js         # ESLint-Konfiguration
├── .prettierrc          # Prettier-Konfiguration
├── jest.config.js       # Jest-Konfiguration
└── README.md            # Diese Datei
```

## 🔧 Nächste Schritte

1. **Backend-Integration**: Shopify oder Firebase
2. **Authentifizierung**: Google, Apple, E-Mail Login
3. **Zahlungsintegration**: Stripe, Apple Pay, PayPal, Klarna
4. **Push Notifications**: Expo Notifications
5. **Community-Feed**: Social Features
6. **Newsletter**: E-Mail-Integration
7. **Analytics**: Firebase Analytics
8. **Crash Reporting**: Sentry Integration

## 📞 Support

Bei Fragen oder Problemen wenden Sie sich an das Entwicklungsteam.

---

**Aura Obscura** - Seltene Düfte. Dunkle Aura. Pure Exzellenz. 