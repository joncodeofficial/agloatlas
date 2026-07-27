import { useFocusEffect } from 'expo-router';
import { useCallback, useRef } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';

const EXIT_CONFIRMATION_WINDOW_MS = 2000;

export function useHardwareBack() {
  const lastPressedAt = useRef(0);

  useFocusEffect(
    useCallback(() => {
      const handler = BackHandler.addEventListener('hardwareBackPress', () => {
        const now = Date.now();

        if (now - lastPressedAt.current < EXIT_CONFIRMATION_WINDOW_MS) {
          BackHandler.exitApp();
          return true;
        }

        lastPressedAt.current = now;
        ToastAndroid.show('Presiona de nuevo para salir', ToastAndroid.SHORT);
        return true;
      });

      return () => handler.remove();
    }, [])
  );
}
