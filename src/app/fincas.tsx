import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";
import { ActivityIndicator, Text, View } from "react-native";
import { useAuth } from "@/features/auth";
import { FincaListItem, useFincas } from "@/features/fincas";
import Layout from "@/layout/Layout";
import { createInitials } from "@/shared/lib/createInitials";
import { Button } from "@/shared/ui/button";
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
        </View>
      </Layout>
    </View>
  );
}
