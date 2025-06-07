import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
SplashScreen.preventAutoHideAsync();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    InstrumentSerif: require("../assets/fonts/InstrumentSerif-Regular.ttf"),
    InstrumentSerifItalic: require("../assets/fonts/InstrumentSerif-Italic.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: true,
            headerTitle: "",
          }}
        >
          {children}
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
