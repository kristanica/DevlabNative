import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type CustomGeneralContainerProps = {
  children: React.ReactNode;
};

const CustomGeneralContainer = ({ children }: CustomGeneralContainerProps) => {
  let tabHeight = 0;
  try {
    tabHeight = useBottomTabBarHeight() + 5;
  } catch {
    tabHeight = 0;
  }

  const actionCenterHeight = useSafeAreaInsets();
  return (
    <View
      className="flex-1"
      style={{
        marginBottom: tabHeight ? tabHeight : 0,
        marginTop: actionCenterHeight.top,
      }}
    >
      {children}
    </View>
  );
};

export default CustomGeneralContainer;
