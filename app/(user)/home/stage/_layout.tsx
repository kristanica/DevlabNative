import { Stack } from "expo-router";

import React from "react";
import { View } from "react-native";

const StageLayout = () => {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      />
    </View>
  );
};

export default StageLayout;
