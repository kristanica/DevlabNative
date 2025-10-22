import React from "react";
import { StyleSheet, View } from "react-native";
import SmallLoading from "./SmallLoading";

const StageDataReadyLoading = () => {
  return (
    <View
      style={[StyleSheet.absoluteFillObject]}
      className="absolute flex-1 w-full h-full justify-center items-center z-50"
    >
      <SmallLoading text={"Preparing game data...."}></SmallLoading>
    </View>
  );
};

export default StageDataReadyLoading;

const styles = StyleSheet.create({});
