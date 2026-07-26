import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomHeaderProps {
  title: string;
  rightElement?: ReactNode;
  showBackButton?: boolean;
}

export function CustomHeader({
  title,
  rightElement,
  showBackButton = false,
}: CustomHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#364496", "#293370", "#141938"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-row items-center justify-between px-4 pb-4"
      style={{ paddingTop: insets.top + 12 }}
    >
      <View className="flex-1 flex-row items-center gap-2">
        {showBackButton && (
          <Pressable
            onPress={() => router.back()}
            className="h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/15 active:bg-primary-foreground/25"
          >
            <ChevronLeft size={20} color="#ffffff" />
          </Pressable>
        )}
        <Text
          className="flex-1 text-lg font-semibold text-primary-foreground"
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
      {rightElement}
    </LinearGradient>
  );
}
