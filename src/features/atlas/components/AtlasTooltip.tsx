import { Battery, Fingerprint, RadioTower, Signal, type LucideIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';
import type { AtlasDetail } from '../schemas/atlas.schema';

interface AtlasTooltipProps {
  atlas: AtlasDetail;
}

export function AtlasTooltip({ atlas }: AtlasTooltipProps) {
  return (
    <View className='w-56 gap-2 rounded-lg border border-border bg-card p-3 shadow-xl'>
      <View className='flex-row items-center gap-2'>
        <View className='h-6 w-6 items-center justify-center rounded-full bg-primary'>
          <RadioTower size={13} color='#ffffff' />
        </View>
        <Text className='flex-1 text-sm font-semibold text-card-foreground' numberOfLines={1}>
          {atlas.name}
        </Text>
      </View>

      <View className='h-px bg-border' />

      <View className='gap-1.5'>
        <TooltipRow icon={Fingerprint} value={atlas.imei} />
        <TooltipRow icon={Battery} value={`${atlas.batteryPercentage}%`} />
        <TooltipRow icon={Signal} value={`${atlas.signalPercentage}%`} />
      </View>
    </View>
  );
}

function TooltipRow({ icon: Icon, value }: { icon: LucideIcon; value: string }) {
  return (
    <View className='flex-row items-center gap-2'>
      <Icon size={13} color='#6b7280' />
      <Text className='flex-1 text-right text-xs font-medium text-muted-foreground' numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}
