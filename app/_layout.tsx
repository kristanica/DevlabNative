import { AuthChecker } from "@/assets/components/AuthChecker";
import { fontFamily } from "@/fontFamily/fontFamily";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";
export default function RootLayout() {
  const [loaded] = useFonts({
    [fontFamily.ExoBlack]: require("../assets/fonts/Exo2-Black.ttf"),
    [fontFamily.ExoBold]: require("../assets/fonts/Exo2-Bold.ttf"),
    [fontFamily.ExoExtraBold]: require("../assets/fonts/Exo2-ExtraBold.ttf"),
    [fontFamily.ExoLight]: require("../assets/fonts/Exo2-Light.ttf"),
    [fontFamily.ExoMedium]: require("../assets/fonts/Exo2-Medium.ttf"),
    [fontFamily.ExoRegular]: require("../assets/fonts/Exo2-Regular.ttf"),
    [fontFamily.ExoSemiBold]: require("../assets/fonts/Exo2-SemiBold.ttf"),
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
    <AuthChecker>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </AuthChecker>
  );
}
