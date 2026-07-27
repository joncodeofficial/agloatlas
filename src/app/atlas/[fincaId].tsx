import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { RadioTower } from 'lucide-react-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { AtlasListItem, useAtlas, type Atlas } from '@/features/atlas';
import { AppHeader } from '@/layout/AppHeader';
import Layout from '@/layout/Layout';
import { AsyncBoundary } from '@/shared/ui/async-boundary';
import { Loader } from '@/shared/ui/loader';
import { Pagination } from '@/shared/ui/pagination';

export default function AtlasList() {
  const router = useRouter();
  const { fincaId, fincaName } = useLocalSearchParams<{
    fincaId: string;
    fincaName: string;
  }>();
  const [page, setPage] = useState(1);

  const {
    data: atlasPage,
    isLoading,
    isError,
    refetch,
    isRefetching,
    isPlaceholderData,
  } = useAtlas(Number(fincaId), page);

  const handleAtlasPress = (atlas: Atlas) => {
    router.navigate({
      pathname: '/atlas/[fincaId]/[imei]',
      params: { fincaId, imei: atlas.imei },
    });
  };

  return (
    <View className='flex-1 bg-background'>
      <AppHeader title={fincaName} showBackButton />

      <Layout statusBarStyle='light' edges={['bottom']}>
        <View className='flex-1 pt-4'>
          <AsyncBoundary
            isLoading={isLoading}
            isError={isError}
            errorMessage='No se pudieron cargar los Atlas de esta finca.'
            onRetry={refetch}
          >
            {atlasPage?.totalCount === 0 ? (
              <EmptyAtlasState />
            ) : (
              <View className='flex-1'>
                <View className='flex-1'>
                  <FlashList
                    data={atlasPage?.items}
                    keyExtractor={(atlas) => atlas.imei}
                    ItemSeparatorComponent={() => <View className='h-3' />}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    refreshing={isRefetching && !isPlaceholderData}
                    onRefresh={refetch}
                    renderItem={({ item }) => <AtlasListItem atlas={item} onPress={() => handleAtlasPress(item)} />}
                  />

                  {isPlaceholderData && (
                    <View className='absolute inset-0 items-center justify-center bg-background/70'>
                      <Loader size={40} />
                    </View>
                  )}
                </View>

                {atlasPage && atlasPage.totalPages > 1 && (
                  <Pagination page={page} totalPages={atlasPage.totalPages} onPageChange={setPage} />
                )}
              </View>
            )}
          </AsyncBoundary>
        </View>
      </Layout>
    </View>
  );
}

function EmptyAtlasState() {
  return (
    <View className='flex-1 items-center justify-center gap-6 px-8'>
      <View className='h-20 w-20 items-center justify-center rounded-full bg-muted'>
        <RadioTower size={40} color='#9ca3af' />
      </View>

      <View className='max-w-[260px] gap-1.5'>
        <Text className='text-center text-lg font-semibold text-foreground'>Sin Atlas instalados</Text>
        <Text className='text-center text-sm text-muted-foreground'>
          Todavía no se instaló ningún Atlas en esta finca.
        </Text>
      </View>
    </View>
  );
}
