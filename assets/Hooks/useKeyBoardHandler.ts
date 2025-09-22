import { useEffect } from "react";
import { Keyboard } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const useKeyBoardHandler = () => {
  const keyBoardValue = useSharedValue(0);
  useEffect(() => {
    const keyBoardShow = Keyboard.addListener("keyboardDidShow", (e) => {
      keyBoardValue.value = withTiming(-e.endCoordinates.height + 300, {
        duration: 100,
      });
    });

    const keyBoardHide = Keyboard.addListener("keyboardDidHide", () => {
      keyBoardValue.value = withTiming(0, { duration: 100 });
    });

    return () => {
      keyBoardShow.remove();
      keyBoardHide.remove();
    };
  }, []);

  const keyBoardHandlingStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: keyBoardValue.value,
        },
      ],
    };
  });

  return { keyBoardHandlingStyle };
};

export default useKeyBoardHandler;
