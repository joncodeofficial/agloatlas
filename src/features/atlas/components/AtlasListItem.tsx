import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Battery, Signal } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import type { Atlas } from "../schemas/atlas.schema";

interface AtlasListItemProps {
  atlas: Atlas;
  onPress: () => void;
}

export function AtlasListItem({ atlas, onPress }: AtlasListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="gap-3 rounded-lg border border-border bg-card p-4 shadow-sm active:opacity-80"
    >
      <View className="gap-1">
        <Text className="text-base font-medium text-card-foreground">
          {atlas.name}
        </Text>
        <Text className="text-sm text-muted-foreground">{atlas.imei}</Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-muted-foreground">
          Expira el{" "}
          {format(new Date(atlas.expiredDate), "d 'de' MMMM 'de' yyyy", {
            locale: es,
          })}
        </Text>

        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-1">
            <Battery size={16} color="#6b7280" />
            <Text className="text-sm text-muted-foreground">
              {atlas.batteryPercentage}%
            </Text>
          </View>

          <View className="flex-row items-center gap-1">
            <Signal size={16} color="#6b7280" />
            <Text className="text-sm text-muted-foreground">
              {atlas.signalPercentage}%
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
