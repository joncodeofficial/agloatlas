import * as React from 'react';
import { Modal, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { cn } from '@/shared/lib/utils';

export interface DropdownMenuItem {
  label: string;
  icon?: LucideIcon;
  destructive?: boolean;
  onPress: () => void;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
}

const MENU_GAP = 8;
const SCREEN_EDGE_PADDING = 8;

export function DropdownMenu({ trigger, items }: DropdownMenuProps) {
  const triggerRef = React.useRef<React.ElementRef<typeof Pressable>>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, right: 0 });
  const { width: windowWidth } = useWindowDimensions();

  const openMenu = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({
        top: y + height + MENU_GAP,
        right: Math.max(SCREEN_EDGE_PADDING, windowWidth - (x + width)),
      });
      setIsOpen(true);
    });
  };

  const handleItemPress = (item: DropdownMenuItem) => {
    setIsOpen(false);
    item.onPress();
  };

  return (
    <View>
      <Pressable ref={triggerRef} onPress={openMenu}>
        {trigger}
      </Pressable>

      <Modal visible={isOpen} transparent animationType='fade' presentationStyle='overFullScreen' onRequestClose={() => setIsOpen(false)}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setIsOpen(false)}>
          <View
            className='absolute min-w-50 overflow-hidden rounded-md border border-border bg-popover shadow-lg'
            style={{ top: position.top, right: position.right }}
          >
            {items.map((item, index) => (
              <Pressable
                key={item.label}
                onPress={() => handleItemPress(item)}
                className={cn(
                  'flex-row items-center gap-3 px-4 py-3 active:bg-muted',
                  index < items.length - 1 && 'border-b border-border'
                )}
              >
                {item.icon && <item.icon size={18} color={item.destructive ? '#ef4444' : '#6b7280'} />}
                <Text className={cn('text-base', item.destructive ? 'text-destructive' : 'text-popover-foreground')}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
