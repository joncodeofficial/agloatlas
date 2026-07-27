import { AlertCircle, RefreshCw } from "lucide-react-native";
import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { Button } from "./button";
import { Loader } from "./loader";

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
        <Loader />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center gap-4 px-8">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle size={28} color="#ef4444" />
        </View>

        <View className="gap-1">
          <Text className="text-center text-base font-semibold text-foreground">
            No se pudo cargar la información
          </Text>
          <Text className="text-center text-sm text-muted-foreground">
            {errorMessage}
          </Text>
        </View>

        <Button
          variant="outline"
          onPress={onRetry}
          className="mt-2 flex-row gap-2 px-6"
        >
          <RefreshCw size={16} color="#141938" />
          <Text className="text-base font-medium text-foreground">
            Reintentar
          </Text>
        </Button>
      </View>
    );
  }

  return <>{children}</>;
}
