module.exports = function(api) {
  api.cache(true);
  
  // Vercel-spezifische Konfiguration
  const isVercel = process.env.VERCEL === '1';
  
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // Für Animationen
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@utils': './src/utils',
            '@constants': './src/constants',
            '@types': './src/types',
          },
        },
      ],
      // Asset-Plugin für Vercel
      ...(isVercel ? [
        [
          'transform-assets',
          {
            extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg'],
            name: 'static/media/[name].[hash:8].[ext]',
          },
        ],
      ] : []),
    ],
  };
}; 