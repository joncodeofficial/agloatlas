import * as React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { cn } from '@/shared/lib/utils';

export interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, error, secureTextEntry, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = secureTextEntry === true;

    return (
      <View className="w-full">
        {label && <Text className="mb-2 text-base font-medium text-foreground">{label}</Text>}
        <View className="relative">
          <TextInput
            ref={ref}
            className={cn(
              'h-12 rounded-md border border-input bg-background px-4 text-base text-foreground',
              error && 'border-destructive',
              isPassword && 'pr-12',
              className
            )}
            placeholderTextColor="#9ca3af"
            secureTextEntry={isPassword && !showPassword}
            {...props}
          />
          {isPassword && (
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              className="absolute right-0 top-0 h-12 w-12 items-center justify-center"
            >
              {showPassword ? (
                <Eye size={20} color="#6b7280" />
              ) : (
                <EyeOff size={20} color="#6b7280" />
              )}
            </Pressable>
          )}
        </View>
        <Text
          className={cn('mt-1 h-5 text-sm text-destructive', error ? 'opacity-100' : 'opacity-0')}
        >
          {error || ' '}
        </Text>
      </View>
    );
  }
);

Input.displayName = 'Input';

export { Input };
