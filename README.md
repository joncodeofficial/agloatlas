# AgroAtlas

Aplicación móvil (React Native + Expo) desarrollada como prueba técnica para **Spherag**. Permite autenticarse contra el backend, listar las fincas del usuario, ver los dispositivos Atlas (IoT) instalados en cada finca y consultar el detalle de un Atlas, incluyendo su ubicación en un mapa.

## Pantallas

1. **Login** — autenticación contra la API, obtiene el `accessToken` usado como Bearer en el resto de las peticiones.
2. **Listado de fincas** — nombre, indicador visual de favorita y fecha de creación en formato legible.
3. **Listado de Atlas** (paginado) — nombre, imei, fecha de expiración, batería y señal.
4. **Detalle de Atlas** — nombre, imei, batería, señal y ubicación en un mapa (satélite) con marcador y tooltip informativo.

Navegación: `Login → Fincas → Atlas → Detalle de Atlas`.

## Stack técnico

- [Expo](https://expo.dev) (SDK 57) + [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing, typed routes)
- [React Query](https://tanstack.com/query) para fetching, caché y manejo de estados de carga/error
- [Zod](https://zod.dev) para validar las respuestas de la API
- [React Hook Form](https://react-hook-form.com) para el formulario de login
- [Uniwind](https://github.com/uniwind-labs/uniwind) (Tailwind CSS para React Native) con theming vía variables CSS (light/dark)
- [react-native-maps](https://github.com/react-native-maps/react-native-maps) para el mapa del detalle de Atlas
- [lucide-react-native](https://lucide.dev) para iconografía
- Fuente [Poppins](https://fonts.google.com/specimen/Poppins) vía `@expo-google-fonts/poppins`
- ESLint (`eslint-config-expo`) + Prettier para calidad y formato de código

## Estructura del proyecto

Organización por features (estilo Feature-Sliced Design), separando lo presentacional de la lógica de negocio:

```
src/
  app/                  # rutas de Expo Router (pantallas)
  features/
    auth/                 # login: schemas, services, hooks
    fincas/               # listado de fincas
    atlas/                # listado y detalle de Atlas
      schemas/            # validación con zod
      services/           # llamadas HTTP
      hooks/               # React Query
      components/          # componentes propios de la feature (ej. tooltip del mapa)
  layout/                # wrappers que combinan UI + lógica (ej. AppHeader = header + logout)
  shared/
    ui/                  # componentes presentacionales puros y reutilizables
    hooks/                # hooks transversales (ej. useHardwareBack)
    config/               # cliente HTTP, config de API
    lib/                  # utilidades (queryClient, formatters, etc.)
```

`shared/ui` no conoce lógica de negocio; la composición con estado/auth/navegación vive en `layout/` o dentro de cada `features/*`.

## Requisitos previos

- Node 20+ y Yarn
- Un dispositivo Android/iOS físico o un emulador/simulador
- Android Studio (para compilar Android) y/o Xcode (para iOS, solo en macOS)

> ⚠️ El proyecto usa `react-native-maps`, que requiere código nativo. **No funciona en la app de Expo Go** — hay que compilar un dev build con `expo run:android` / `expo run:ios` (ver más abajo).

## Variables de entorno

Copiar `.env.example` a `.env` y completar:

```
EXPO_PUBLIC_AUTH_BASE_URL=<URL del servicio de autenticación>
EXPO_PUBLIC_CORE_BASE_URL=<URL de la API core (fincas / atlas)>
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=<API key de Google Maps>
```

- `EXPO_PUBLIC_AUTH_BASE_URL` / `EXPO_PUBLIC_CORE_BASE_URL`: bases de la API de Spherag provistas en la prueba técnica.
- `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`: solo se usa en Android (`app.config.js` la inyecta en `android.config.googleMaps.apiKey`). En iOS el mapa usa Apple Maps por defecto, no requiere key.

## Instalación y ejecución

```bash
yarn install
cp .env.example .env   # y completar las variables

# Android (requiere Android Studio / un dispositivo con USB debugging)
yarn android

# iOS (solo macOS, requiere Xcode)
yarn ios
```

Ambos comandos generan los proyectos nativos (`android/` e `ios/`, ignorados por git) automáticamente antes de compilar.

## Scripts disponibles

| Script              | Descripción                                |
| ------------------- | ------------------------------------------ |
| `yarn start`        | Inicia el servidor de Metro                |
| `yarn android`      | Compila y corre la app en Android          |
| `yarn ios`          | Compila y corre la app en iOS              |
| `yarn lint`         | Corre ESLint                               |
| `yarn format`       | Formatea el proyecto con Prettier          |
| `yarn format:check` | Verifica el formato sin modificar archivos |

## Notas de arquitectura y UX

- **Estados de carga/error/vacío** manejados en todas las pantallas que consumen datos (`AsyncBoundary` para loading/error, estados vacíos dedicados como el de "Sin Atlas instalados").
- **Paginación** del listado de Atlas con ventana fija de números de página y loader centrado sobre la lista mientras se carga la nueva página (usando `keepPreviousData` de React Query).
- **Salida accidental** de la app prevenida en la pantalla de Fincas: el botón de back físico (Android) pide una segunda confirmación antes de cerrar la app.
- **Mapa**: marcador + tooltip custom (en vez de `Callout`, que en Android ignora los estilos) con manejo cuidadoso de `tracksViewChanges` para evitar snapshots rotos en la carga inicial.
