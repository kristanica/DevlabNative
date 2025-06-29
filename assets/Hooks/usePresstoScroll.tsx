import { useRef, useState } from "react";
import { FlatList } from "react-native";
import {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { onboardingData, width } from "../constants/constants";

const usePresstoScroll = () => {
  const xVal = useSharedValue(0);
  const [currentScreen, setCurrentScreen] = useState<number>(0);

  const scrollHandlerX = useAnimatedScrollHandler({
    onScroll: (event: { contentOffset: { x: number } }) => {
      xVal.value = event.contentOffset.x;
      const index = Math.round(event.contentOffset.x / width);
      runOnJS(setCurrentScreen)(index);
    },
  });

  const flatListRef = useRef<FlatList>(null);

  const scrolLScreen = () => {
    if (currentScreen < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentScreen + 1 });
    } else {
      return;
    }
  };
  return { scrollHandlerX, scrolLScreen, flatListRef, xVal, currentScreen };
};

export default usePresstoScroll;
