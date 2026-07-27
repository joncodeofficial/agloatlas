import { useEffect } from "react";
import { BackHandler, ToastAndroid } from "react-native";

const EXIT_CONFIRMATION_WINDOW_MS = 2000;

export function useHardwareBack() {
  useEffect(() => {
    let lastPressedAt = 0;

    const handler = BackHandler.addEventListener("hardwareBackPress", () => {
      const now = Date.now();

      if (now - lastPressedAt < EXIT_CONFIRMATION_WINDOW_MS) {
        BackHandler.exitApp();
        return true;
      }

      lastPressedAt = now;
      ToastAndroid.show("Presiona de nuevo para salir", ToastAndroid.SHORT);
      return true;
    });

    return () => handler.remove();
  }, []);
}
