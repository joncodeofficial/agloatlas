import { Leaf } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { Button } from '@/shared/ui/button';
import Layout from '@/layout/Layout';

export function HomeScreen() {
  return (
    <Layout>
      <View className="flex-1 items-center justify-center gap-3">
        <Leaf size={32} color="#16803c" />
        <Text className="text-lg font-semibold text-foreground">AgroAtlas</Text>
        <Button onPress={() => {}}>Button de reusables</Button>
        <Button variant="outline" onPress={() => {}}>
          Variante outline
        </Button>
      </View>
    </Layout>
  );
}
