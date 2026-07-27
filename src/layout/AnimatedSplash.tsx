import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const LOGO_SIZE = 140;
const HOLD_MS = 350;
const EXIT_DURATION_MS = 420;

interface AnimatedSplashProps {
  ready: boolean;
}

export function AnimatedSplash({ ready }: AnimatedSplashProps) {
  const [visible, setVisible] = useState(true);
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.85);
  const overlayOpacity = useSharedValue(1);
  const overlayScale = useSharedValue(1);

  useEffect(() => {
    if (!ready) return;

    SplashScreen.hideAsync();

    logoOpacity.value = withTiming(1, { duration: 280, easing: Easing.out(Easing.quad) });
    logoScale.value = withSequence(
      withTiming(1.08, { duration: 320, easing: Easing.out(Easing.quad) }),
      withTiming(1, { duration: 180, easing: Easing.inOut(Easing.quad) })
    );

    overlayOpacity.value = withDelay(
      HOLD_MS,
      withTiming(0, { duration: EXIT_DURATION_MS, easing: Easing.in(Easing.quad) }, (finished) => {
        if (finished) runOnJS(setVisible)(false);
      })
    );
    overlayScale.value = withDelay(
      HOLD_MS,
      withTiming(1.1, { duration: EXIT_DURATION_MS, easing: Easing.in(Easing.quad) })
    );
  }, [logoOpacity, logoScale, overlayOpacity, overlayScale, ready]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
    transform: [{ scale: overlayScale.value }],
  }));

  if (!visible) return null;

  return (
    <Animated.View
      className='items-center justify-center bg-primary'
      style={[StyleSheet.absoluteFill, overlayStyle]}
      pointerEvents='none'
    >
      <Animated.View style={logoStyle}>
        <Image source={require('../assets/logo-transparent.png')} style={styles.logo} resizeMode='contain' />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
});
