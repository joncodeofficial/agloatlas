import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Star } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import type { Finca } from "../schemas/finca.schema";

interface FincaListItemProps {
  finca: Finca;
  onPress: () => void;
}

export function FincaListItem({ finca, onPress }: FincaListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between rounded-lg border border-border bg-card p-4 active:opacity-80"
    >
      <View className="flex-1 gap-1">
        <Text className="text-base font-medium text-card-foreground">{finca.name}</Text>
        <Text className="text-sm text-muted-foreground">
          {format(new Date(finca.createdDate), "d 'de' MMMM 'de' yyyy", { locale: es })}
        </Text>
      </View>

      <Star
        size={20}
        color={finca.favourite ? "#f5a524" : "#9ca3af"}
        fill={finca.favourite ? "#f5a524" : "transparent"}
      />
    </Pressable>
  );
}
