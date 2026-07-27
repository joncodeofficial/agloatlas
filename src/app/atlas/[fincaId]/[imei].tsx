import { useLocalSearchParams } from "expo-router";
import { RadioTower } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AtlasTooltip, useAtlasDetail } from "@/features/atlas";
import { AppHeader } from "@/layout/AppHeader";
import Layout from "@/layout/Layout";
import { AsyncBoundary } from "@/shared/ui/async-boundary";

export default function AtlasDetailScreen() {
  const { fincaId, imei } = useLocalSearchParams<{
    fincaId: string;
    imei: string;
  }>();

  const {
    data: atlas,
    isLoading,
    isError,
    refetch,
  } = useAtlasDetail(Number(fincaId), imei);

  const [showTooltip, setShowTooltip] = useState(false);
  const [tracksViewChanges, setTracksViewChanges] = useState(true);

  const handleMapReady = () => {
    setTimeout(() => setTracksViewChanges(false), 500);
  };

  return (
    <View className="flex-1 bg-background">
      <AppHeader title={atlas?.name ?? "Atlas"} showBackButton />

      <Layout statusBarStyle="light" edges={["bottom"]} noPadding>
        <AsyncBoundary
          isLoading={isLoading}
          isError={isError}
          errorMessage="No se pudo cargar el detalle de este Atlas."
          onRetry={refetch}
        >
          {atlas && (
            <MapView
              style={{ flex: 1 }}
              mapType="satellite"
              initialRegion={{
                latitude: Number(atlas.latitude),
                longitude: Number(atlas.longitude),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              onPress={() => setShowTooltip(false)}
              onMapReady={handleMapReady}
            >
              <Marker
                coordinate={{
                  latitude: Number(atlas.latitude),
                  longitude: Number(atlas.longitude),
                }}
                tracksViewChanges={tracksViewChanges}
                onPress={(event) => {
                  event.stopPropagation();
                  setShowTooltip((prev) => !prev);
                }}
              >
                <View className="h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary shadow-lg">
                  <RadioTower size={18} color="#ffffff" />
                </View>
              </Marker>

              <Marker
                coordinate={{
                  latitude: Number(atlas.latitude),
                  longitude: Number(atlas.longitude),
                }}
                anchor={{ x: 0.5, y: 1 }}
                opacity={showTooltip ? 1 : 0}
                tracksViewChanges={tracksViewChanges}
                tappable={false}
              >
                <View style={{ marginBottom: 40 }}>
                  <AtlasTooltip atlas={atlas} />
                </View>
              </Marker>
            </MapView>
          )}
        </AsyncBoundary>
      </Layout>
    </View>
  );
}
