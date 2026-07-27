import { useRouter } from 'expo-router';
import { LogOut } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { useAuth } from '@/features/auth';
import { createInitials } from '@/shared/lib/createInitials';
import { CustomHeader } from '@/shared/ui/custom-header';
import { DropdownMenu } from '@/shared/ui/dropdown-menu';

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export function AppHeader({ title, showBackButton }: AppHeaderProps) {
  const router = useRouter();
  const { logout, username } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <CustomHeader
      title={title}
      showBackButton={showBackButton}
      rightElement={
        <DropdownMenu
          trigger={
            <View className='h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20'>
              <Text className='text-base font-semibold uppercase text-primary-foreground'>
                {createInitials(username ?? '')}
              </Text>
            </View>
          }
          items={[
            {
              label: 'Cerrar sesión',
              icon: LogOut,
              destructive: true,
              onPress: handleLogout,
            },
          ]}
        />
      }
    />
  );
}
