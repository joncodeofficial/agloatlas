import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";
import { FincaListItem, useFincas } from "@/features/fincas";
import Layout from "@/layout/Layout";
import { Button } from "@/shared/ui/button";

export default function Fincas() {
  const router = useRouter();
  const {
    data: fincas,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useFincas();

  return (
    <Layout statusBarStyle="dark" edges={["top"]}>
      <Text className="mb-4 text-2xl font-semibold text-foreground">
        Mis fincas
      </Text>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : isError ? (
        <View className="flex-1 items-center justify-center gap-4">
          <Text className="text-center text-destructive">
            No se pudieron cargar tus fincas.
          </Text>
          <Button variant="outline" onPress={() => refetch()}>
            Reintentar
          </Button>
        </View>
      ) : (
        <FlashList
          data={fincas}
          keyExtractor={(finca) => String(finca.id)}
          ItemSeparatorComponent={() => <View className="h-3" />}
          refreshing={isRefetching}
          onRefresh={refetch}
          renderItem={({ item }) => (
            <FincaListItem
              finca={item}
              onPress={() => router.push(`/atlas/${item.id}`)}
            />
          )}
        />
      )}
    </Layout>
  );
}
