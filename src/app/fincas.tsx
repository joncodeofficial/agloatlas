import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";
import { Text, View } from "react-native";
import { useAuth } from "@/features/auth";
import { FincaListItem, useFincas } from "@/features/fincas";
import Layout from "@/layout/Layout";
import { createInitials } from "@/shared/lib/createInitials";
import { AsyncBoundary } from "@/shared/ui/async-boundary";
import { CustomHeader } from "@/shared/ui/custom-header";
import { DropdownMenu } from "@/shared/ui/dropdown-menu";

export default function Fincas() {
  const router = useRouter();
  const { logout, username } = useAuth();
  const {
    data: fincas,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useFincas();

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <View className="flex-1 bg-background">
      <CustomHeader
        title="Mis fincas"
        rightElement={
          <DropdownMenu
            trigger={
              <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
                <Text className="text-base font-semibold uppercase text-primary-foreground">
                  {createInitials(username ?? "")}
                </Text>
              </View>
            }
            items={[
              {
                label: "Cerrar sesión",
                icon: LogOut,
                destructive: true,
                onPress: handleLogout,
              },
            ]}
          />
        }
      />

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
                <FincaListItem
                  finca={item}
                  onPress={() => router.push(`/atlas/${item.id}`)}
                />
              )}
            />
          </AsyncBoundary>
        </View>
      </Layout>
    </View>
  );
}
