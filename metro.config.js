const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Vereinfachte Asset-Konfiguration
config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif', 'svg', 'ttf', 'otf');

// Deaktiviere Asset-Bundling für Vercel
if (process.env.VERCEL) {
  config.transformer.minifierConfig = {
    keep_fnames: true,
    mangle: {
      keep_fnames: true,
    },
  };
}

module.exports = config; 