import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
  useAuth,
  loginCredentialsSchema,
  type LoginCredentials,
} from "@/features/auth";
import Layout from "@/layout/Layout";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export default function Index() {
  const router = useRouter();
  const { login, isLoggingIn, loginError } = useAuth();

  const { control, handleSubmit, watch } = useForm<LoginCredentials>({
    resolver: zodResolver(loginCredentialsSchema),
    defaultValues: { username: "", password: "" },
  });

  const [username, password] = watch(["username", "password"]);
  const isSubmitDisabled = isLoggingIn || !username || !password;

  const onSubmit = (credentials: LoginCredentials) => {
    login(credentials, {
      onSuccess: () => router.replace("/fincas"),
    });
  };

  return (
    <Layout statusBarStyle="dark" noPadding>
      <KeyboardAwareScrollView
        bottomOffset={24}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full gap-4">
          <Image
            source={require("../assets/isotipo.webp")}
            style={{ width: 240, height: 67, alignSelf: "center" }}
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
              />
            )}
          />

          <Button
            className="mt-6"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitDisabled}
          >
            {isLoggingIn ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              "Iniciar sesión"
            )}
          </Button>

          <Text
            className={cn(
              "mt-2 h-5 text-center text-sm text-destructive",
              loginError ? "opacity-100" : "opacity-0",
            )}
          >
            {loginError instanceof Error
              ? loginError.message
              : loginError
                ? "Error al iniciar sesión"
                : " "}
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </Layout>
  );
}
