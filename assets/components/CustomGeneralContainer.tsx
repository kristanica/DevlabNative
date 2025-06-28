import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CustomGeneralContainerProps = {
  children: React.ReactNode;
};

const CustomGeneralContainer = ({ children }: CustomGeneralContainerProps) => {
  const tabHeight = useBottomTabBarHeight() + 5;
  const actionCenterHeight = useSafeAreaInsets();
  return (
    <View
      className="flex-1 m-3"
      style={{ marginBottom: tabHeight, marginTop: actionCenterHeight.top }}
    >
      {children}
    </View>
  );
};

export default CustomGeneralContainer;

const styles = StyleSheet.create({});
