import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";

const useCustomFonts = () => {
  const [readyFont, setReadyFont] = useState<boolean>(false);
  const [loaded] = useFonts({
    ExoBlack: require("@/assets/fonts/Exo2-Black.ttf"),
    ExoBold: require("@/assets/fonts/Exo2-Bold.ttf"),
    ExoExtraBold: require("@/assets/fonts/Exo2-ExtraBold.ttf"),
    ExoLight: require("@/assets/fonts/Exo2-Light.ttf"),
    ExoMedium: require("@/assets/fonts/Exo2-Medium.ttf"),
    ExoRegular: require("@/assets/fonts/Exo2-Regular.ttf"),
    ExoSemiBold: require("@/assets/fonts/Exo2-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      setReadyFont(loaded);
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return readyFont;
};
export default useCustomFonts;
