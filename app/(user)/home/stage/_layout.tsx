import { Stack } from "expo-router";

import React from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const StageLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, position: "relative" }}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "none",
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default StageLayout;
