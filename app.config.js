module.exports = {
  expo: {
    name: "AgroAtlas",
    slug: "AgroAtlas",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    userInterfaceStyle: "light",
    scheme: "agroatlas",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.granj215.AgroAtlas",
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./src/assets/android-icon-foreground.png",
        backgroundImage: "./src/assets/android-icon-background.png",
        monochromeImage: "./src/assets/android-icon-monochrome.png",
      },
      predictiveBackGestureEnabled: false,
      package: "com.granj215.AgroAtlas",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      },
    },
    web: {
      favicon: "./src/assets/favicon.png",
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
  },
};
