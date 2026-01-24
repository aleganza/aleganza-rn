import '@/components/drawer/registry';
import 'react-native-reanimated';

import { QueryProvider } from '@/lib/query/provider';
import { FONT_PATHS } from '@/lib/theme/families';
import { useTheme } from '@/lib/theme/useTheme';
import { ToastProvider } from '@/lib/toaster/provider';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(FONT_PATHS);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { activeThemeName, reactNavigationTheme } = useTheme();

  return (
    <ThemeProvider value={reactNavigationTheme}>
      <QueryProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ToastProvider>
            <SheetProvider>
              <StatusBar
                style={activeThemeName === "dark" ? "light" : "dark"}
              />
              <Slot />
            </SheetProvider>
          </ToastProvider>
        </GestureHandlerRootView>
      </QueryProvider>
    </ThemeProvider>
  );
}
