import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Layout from '@/layout/Layout';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useAuth } from '../hooks/useAuth';
import { loginCredentialsSchema, type LoginCredentials } from '../schemas/login.schema';

export function LoginScreen() {
  const router = useRouter();
  const { login, isLoggingIn, loginError } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginCredentialsSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = (credentials: LoginCredentials) => {
    login(credentials, {
      onSuccess: () => router.replace('/fincas'),
    });
  };

  return (
    <Layout statusBarStyle="dark" noPadding>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full gap-4">
          <Image
            source={require('../../../assets/isotipo.webp')}
            style={{ width: 240, height: 67, alignSelf: 'center' }}
            resizeMode="contain"
            className="mb-4"
          />

          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Usuario"
                placeholder="Ingresa tu usuario"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                error={errors.username?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                error={errors.password?.message}
              />
            )}
          />

          <Button className="mt-2" onPress={handleSubmit(onSubmit)} disabled={isLoggingIn}>
            {isLoggingIn ? <ActivityIndicator size="small" color="#ffffff" /> : 'Iniciar sesión'}
          </Button>

          {loginError ? (
            <Text className="mt-2 text-center text-sm text-destructive">
              {loginError instanceof Error ? loginError.message : 'Error al iniciar sesión'}
            </Text>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
    </Layout>
  );
}
