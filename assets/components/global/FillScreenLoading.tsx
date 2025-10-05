import React from "react";
import { StyleSheet, View } from "react-native";
import SmallLoading from "./SmallLoading";

type FillScreenLoadingProps = {
  text?: string;
};
const FillScreenLoading = ({ text }: FillScreenLoadingProps) => {
  return (
    <View
      style={[StyleSheet.absoluteFillObject]}
      className="absolute flex-1 bg-black/20 w-full h-full justify-center items-center z-50"
    >
      <SmallLoading text={text}></SmallLoading>
    </View>
  );
};

export default FillScreenLoading;
