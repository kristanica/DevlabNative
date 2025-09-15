import React from "react";
import { View } from "react-native";
import SmallLoading from "./SmallLoading";

const FillScreenLoading = () => {
  return (
    <View className="absolute flex-1 bg-black/20 w-full h-full justify-center items-center z-50">
      <SmallLoading></SmallLoading>
    </View>
  );
};

export default FillScreenLoading;
