module.exports = {
  expo: {
    name: 'AgroAtlas',
    slug: 'AgroAtlas',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/logo.png',
    userInterfaceStyle: 'light',
    scheme: 'agroatlas',
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.granj215.AgroAtlas',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/logo.png',
        monochromeImage: './src/assets/logo-transparent.png',
      },
      predictiveBackGestureEnabled: false,
      package: 'com.granj215.AgroAtlas',
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      },
    },
    web: {
      favicon: './src/assets/logo.png',
    },
    plugins: [
      'expo-router',
      'expo-font',
      [
        'expo-splash-screen',
        {
          image: './src/assets/logo-transparent.png',
          imageWidth: 140,
          resizeMode: 'contain',
          backgroundColor: '#293370',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
