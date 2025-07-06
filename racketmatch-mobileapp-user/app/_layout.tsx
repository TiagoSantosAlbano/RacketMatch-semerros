// app/_layout.tsx
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider } from '../context/AuthContext';

// Impede o splash desaparecer automaticamente até a app estar pronta
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Oculta splash quando o layout está carregado
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            gestureEnabled: true,
          }}
        >
          {/* Se usares pastas, Stack lê tudo automaticamente, não precisas repetir todos os screens aqui. 
              Deixa vazio ou só adiciona modals especiais. */}
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
