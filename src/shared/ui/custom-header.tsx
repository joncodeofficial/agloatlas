import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomHeaderProps {
  title: string;
  rightElement?: ReactNode;
}

export function CustomHeader({ title, rightElement }: CustomHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#364496", "#293370", "#141938"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-row items-center justify-between px-4 pb-4"
      style={{ paddingTop: insets.top + 12 }}
    >
      <Text className="text-lg font-semibold text-primary-foreground">{title}</Text>
      {rightElement}
    </LinearGradient>
  );
}
