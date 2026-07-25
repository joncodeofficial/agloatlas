import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-2 bg-background">
      <Text className="text-lg font-semibold text-foreground">AgroAtlas</Text>
      <Text className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
        uniwind funcionando
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
