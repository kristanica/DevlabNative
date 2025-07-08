import useCustomFonts from "@/assets/Hooks/useCustomFonts";
import { AuthProvider } from "@/assets/Provider/AuthProvider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
export default function RootLayout() {
  const readyFont = useCustomFonts();

  if (!readyFont) return null;

  // const [loaded] = useFonts({
  //   [fontFamily.ExoBlack]: require("../assets/fonts/Exo2-Black.ttf"),
  //   [fontFamily.ExoBold]: require("../assets/fonts/Exo2-Bold.ttf"),
  //   [fontFamily.ExoExtraBold]: require("../assets/fonts/Exo2-ExtraBold.ttf"),
  //   [fontFamily.ExoLight]: require("../assets/fonts/Exo2-Light.ttf"),
  //   [fontFamily.ExoMedium]: require("../assets/fonts/Exo2-Medium.ttf"),
  //   [fontFamily.ExoRegular]: require("../assets/fonts/Exo2-Regular.ttf"),
  //   [fontFamily.ExoSemiBold]: require("../assets/fonts/Exo2-SemiBold.ttf"),
  // });

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
    </AuthProvider>
  );
}
