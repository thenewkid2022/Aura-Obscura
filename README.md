# Aura Obscura - Exklusive Parfums

Eine luxuriöse mobile Shopping-App für seltene, exklusive Parfums und handverlesene Decants.

## 🎨 Design

- **Farbpalette**: Dunkles Bordeaux (#4C1F1F) mit goldener Schrift (#C4A25A)
- **Stil**: Mystisch-edles, minimalistisches Design
- **Typografie**: Playfair Display/Cinzel für Headlines, Lato/Libre Baskerville für Body

## 🚀 Deployment auf Vercel

### Voraussetzungen

1. **GitHub Repository**: `Aura-Obscura`
2. **Vercel Account**: [vercel.com](https://vercel.com)
3. **Domain**: `aura-obscura.com`

### Deployment-Schritte

#### 1. GitHub Repository vorbereiten

```bash
# Alle Änderungen committen
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

#### 2. Vercel Deployment

1. **Vercel Dashboard öffnen**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **"New Project" klicken**
3. **GitHub Repository importieren**: `Aura-Obscura`
4. **Build-Konfiguration**:
   - **Framework Preset**: `Other`
   - **Build Command**: `npm run build:web`
   - **Output Directory**: `web-build`
   - **Install Command**: `npm install`

#### 3. Umgebungsvariablen (optional)

Falls später Backend-Integration hinzugefügt wird:

```env
REACT_APP_API_URL=your-api-url
REACT_APP_STRIPE_PUBLIC_KEY=your-stripe-key
```

#### 4. Domain konfigurieren

1. **Vercel Dashboard** → **Settings** → **Domains**
2. **Domain hinzufügen**: `aura-obscura.com`
3. **DNS-Einstellungen** bei Ihrem Domain-Provider konfigurieren

### Lokale Entwicklung

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm start

# Web-Version starten
npm run web

# Web-Build erstellen
npm run build:web
```

## 📱 Features

- **Startseite**: Hero-Bild mit Logo und Produktsektionen
- **Shop**: Filtermöglichkeiten und Produktsuche
- **Warenkorb**: Vollständiger Checkout-Flow
- **Konto**: Login-System (vorbereitet)
- **Navigation**: Bottom Tabs (Home, Shop, Favoriten, Konto, Kontakt)

## 🛠 Technologie-Stack

- **Frontend**: React Native mit Expo
- **Navigation**: React Navigation
- **Styling**: React Native StyleSheet
- **Deployment**: Vercel
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
├── package.json         # Dependencies
├── vercel.json          # Vercel-Konfiguration
└── README.md            # Diese Datei
```

## 🔧 Nächste Schritte

1. **Backend-Integration**: Shopify oder Firebase
2. **Authentifizierung**: Google, Apple, E-Mail Login
3. **Zahlungsintegration**: Stripe, Apple Pay, PayPal, Klarna
4. **Push Notifications**: Expo Notifications
5. **Community-Feed**: Social Features
6. **Newsletter**: E-Mail-Integration

## 📞 Support

Bei Fragen oder Problemen wenden Sie sich an das Entwicklungsteam.

---

**Aura Obscura** - Seltene Düfte. Dunkle Aura. Pure Exzellenz. 