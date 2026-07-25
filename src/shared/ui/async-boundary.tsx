import type { ReactNode } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Button } from "./button";

interface AsyncBoundaryProps {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  onRetry: () => void;
  children: ReactNode;
}

export function AsyncBoundary({
  isLoading,
  isError,
  errorMessage,
  onRetry,
  children,
}: AsyncBoundaryProps) {
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center gap-8">
        <Text className="text-center text-lg text-destructive">{errorMessage}</Text>
        <Button variant="outline" onPress={onRetry}>
          Reintentar
        </Button>
      </View>
    );
  }

  return <>{children}</>;
}
