import Ionicons from "@expo/vector-icons/Ionicons";
import React, { ReactNode, useCallback, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type SwipeLessonContainerProps = {
  children: ReactNode;
  gameType: string;
};
const SwipeLessonContainer = ({
  children,
  gameType,
}: SwipeLessonContainerProps) => {
  const { height } = Dimensions.get("screen");
  const [isShown, setIsShown] = useState<boolean>(true);

  const heightVal = useSharedValue(height - 100);

  const swipeStyle = useAnimatedStyle(() => ({
    height: heightVal.value,
  }));

  const toggleContainer = useCallback(() => {
    if (!isShown) {
      heightVal.value = withSpring(height - 100, {
        damping: 50,
        stiffness: 50,
      });
      setIsShown(true);
      return;
    } else {
      heightVal.value = withSpring(50, { damping: 50, stiffness: 50 });
      setIsShown(false);
    }
  }, [isShown, height, heightVal]);

  return (
    <Animated.View
      style={[swipeStyle]}
      className="w-full bg-background px-2 absolute bottom-0 border-[2px]  border-[#2a3141] border-[1px]border-b-0 pt-[20px] rounded-tl-[10px] rounded-tr-[10px]"
    >
      {gameType !== "BrainBytes" && (
        <TouchableOpacity
          onPress={toggleContainer}
          className="absolute  z-50"
          style={{
            top: 18,
            right: 60,
          }}
        >
          <Ionicons
            name={`${isShown ? `arrow-down-circle` : `arrow-up-circle`}`}
            color={"yellow"}
            size={25}
          ></Ionicons>
        </TouchableOpacity>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {children}
      </ScrollView>
    </Animated.View>
  );
};

export default React.memo(SwipeLessonContainer);

const styles = StyleSheet.create({});
