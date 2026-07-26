import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { FincaListItem, useFincas, type Finca } from "@/features/fincas";
import { AppHeader } from "@/layout/AppHeader";
import Layout from "@/layout/Layout";
import { AsyncBoundary } from "@/shared/ui/async-boundary";

export default function Fincas() {
  const router = useRouter();
  const {
    data: fincas,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useFincas();

  const handleFincaPress = (finca: Finca) => {
    router.push({
      pathname: "/atlas/[fincaId]",
      params: { fincaId: String(finca.id), fincaName: finca.name },
    });
  };

  return (
    <View className="flex-1 bg-background">
      <AppHeader title="Mis fincas" />

      <Layout statusBarStyle="light" edges={["bottom"]}>
        <View className="flex-1 pt-4">
          <AsyncBoundary
            isLoading={isLoading}
            isError={isError}
            errorMessage="No se pudieron cargar tus fincas."
            onRetry={refetch}
          >
            <FlashList
              data={fincas}
              keyExtractor={(finca) => String(finca.id)}
              ItemSeparatorComponent={() => <View className="h-3" />}
              refreshing={isRefetching}
              onRefresh={refetch}
              renderItem={({ item }) => (
                <FincaListItem finca={item} onPress={() => handleFincaPress(item)} />
              )}
            />
          </AsyncBoundary>
        </View>
      </Layout>
    </View>
  );
}
