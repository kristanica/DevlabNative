import userHp from "@/assets/zustand/userHp";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View } from "react-native";

// WIll render the heart system on [stageid]
const Hearts = () => {
  const healthPoints = userHp((state) => state.userHp);
  return (
    <View className="flex-row">
      {Array.from({ length: healthPoints }).map((_, index) => (
        <Ionicons name="heart" size={20} color={"red"} key={index}></Ionicons>
      ))}
    </View>
  );
};

export default Hearts;
