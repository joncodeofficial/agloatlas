import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { cn } from '@/shared/lib/utils';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

type PageItem = number | 'ellipsis';

const MAX_VISIBLE_PAGES = 5;

function getPageItems(page: number, totalPages: number): PageItem[] {
  if (totalPages <= MAX_VISIBLE_PAGES + 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(MAX_VISIBLE_PAGES / 2);
  let start = Math.max(2, page - half);
  const end = Math.min(totalPages - 1, start + MAX_VISIBLE_PAGES - 1);
  start = Math.max(2, end - MAX_VISIBLE_PAGES + 1);

  const items: PageItem[] = [1];
  if (start > 2) items.push('ellipsis');
  for (let p = start; p <= end; p++) items.push(p);
  if (end < totalPages - 1) items.push('ellipsis');
  items.push(totalPages);

  return items;
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  return (
    <View className={cn('flex-row items-center justify-center gap-1 border-t border-border px-2 py-3', className)}>
      <Pressable
        disabled={!canGoPrevious}
        onPress={() => onPageChange(page - 1)}
        className='h-10 w-10 items-center justify-center rounded-md active:bg-muted disabled:opacity-40'
      >
        <ChevronLeft size={18} color={canGoPrevious ? '#141938' : '#9ca3af'} />
      </Pressable>

      {getPageItems(page, totalPages).map((item, index) =>
        item === 'ellipsis' ? (
          <Text key={`ellipsis-${index}`} className='px-1 text-sm text-muted-foreground'>
            …
          </Text>
        ) : (
          <Pressable
            key={item}
            onPress={() => onPageChange(item)}
            className={cn(
              'h-10 w-10 items-center justify-center rounded-md',
              item === page ? 'bg-primary' : 'active:bg-muted'
            )}
          >
            <Text className={cn('text-sm font-medium', item === page ? 'text-primary-foreground' : 'text-foreground')}>
              {item}
            </Text>
          </Pressable>
        )
      )}

      <Pressable
        disabled={!canGoNext}
        onPress={() => onPageChange(page + 1)}
        className='h-10 w-10 items-center justify-center rounded-md active:bg-muted disabled:opacity-40'
      >
        <ChevronRight size={18} color={canGoNext ? '#141938' : '#9ca3af'} />
      </Pressable>
    </View>
  );
}
