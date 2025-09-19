
import { Stack, useGlobalSearchParams } from 'expo-router';
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaProvider, useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { setupErrorLogging } from '../utils/errorLogger';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '../contexts/AuthContext';

const STORAGE_KEY = 'natively_emulate_device';

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const [emulate, setEmulate] = useState<string | null>(null);
  const { emulate: emulateParam } = useGlobalSearchParams();

  useEffect(() => {
    if (emulateParam) {
      setEmulate(emulateParam as string);
    }
  }, [emulateParam]);

  useEffect(() => {
    setupErrorLogging();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
