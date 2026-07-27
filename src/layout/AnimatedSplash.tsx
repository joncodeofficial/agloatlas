import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const LOGO_SIZE = 140;

const DROP_FALL_DELAY_MS = 60;
const DROP_FALL_DURATION_MS = 550;
const OVERLAY_FADE_DELAY_AFTER_FALL_MS = 60;
const OVERLAY_FADE_DURATION_MS = 350;

interface AnimatedSplashProps {
  ready: boolean;
}

export function AnimatedSplash({ ready }: AnimatedSplashProps) {
  const { height: screenHeight } = useWindowDimensions();
  const fallDistance = screenHeight;

  const [visible, setVisible] = useState(true);

  const dropTranslateY = useSharedValue(0);
  const overlayOpacity = useSharedValue(1);

  useEffect(() => {
    if (!ready) return;

    SplashScreen.hideAsync();

    dropTranslateY.value = withDelay(
      DROP_FALL_DELAY_MS,
      withTiming(fallDistance, { duration: DROP_FALL_DURATION_MS, easing: Easing.in(Easing.quad) })
    );

    const fallEndDelay = DROP_FALL_DELAY_MS + DROP_FALL_DURATION_MS;

    overlayOpacity.value = withDelay(
      fallEndDelay + OVERLAY_FADE_DELAY_AFTER_FALL_MS,
      withTiming(0, { duration: OVERLAY_FADE_DURATION_MS, easing: Easing.in(Easing.quad) }, (finished) => {
        if (finished) runOnJS(setVisible)(false);
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, fallDistance]);

  const dropStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: dropTranslateY.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View className='bg-primary' style={[StyleSheet.absoluteFill, overlayStyle]} pointerEvents='none'>
      <View style={styles.centerFill}>
        <Image source={require('../assets/logo-arch.png')} style={styles.logo} resizeMode='contain' />
      </View>
      <View style={[styles.centerFill, styles.clip]}>
        <Animated.View style={dropStyle}>
          <Image source={require('../assets/logo-drop.png')} style={styles.logo} resizeMode='contain' />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  centerFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clip: {
    overflow: 'hidden',
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
});
