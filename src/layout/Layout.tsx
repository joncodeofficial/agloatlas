import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface LayoutProps {
  children: ReactNode;
  backgroundColor?: string;
  statusBarStyle?: "auto" | "light" | "dark";
  noPadding?: boolean;
  edges?: ("top" | "bottom" | "left" | "right")[];
  hasHeader?: boolean;
}

export default function Layout({
  children,
  backgroundColor = "bg-background",
  statusBarStyle,
  noPadding = false,
  edges = ["top", "bottom"],
  hasHeader = false,
}: LayoutProps) {
  const insets = useSafeAreaInsets();
  const finalStatusBarStyle = statusBarStyle || (hasHeader ? "light" : "auto");

  const paddingTop = edges.includes("top") ? insets.top : 0;
  const paddingBottom = edges.includes("bottom") ? insets.bottom : 0;
  const paddingLeft = edges.includes("left") ? insets.left : 0;
  const paddingRight = edges.includes("right") ? insets.right : 0;

  return (
    <View
      className={`flex-1 ${backgroundColor}`}
      style={{
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
      }}
    >
      <View className={`flex-1 ${noPadding ? "" : "px-3"}`}>{children}</View>
      <StatusBar style={finalStatusBarStyle} />
    </View>
  );
}
