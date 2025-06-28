import React from "react";
import { StyleSheet, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import PaginationDot from "./PaginationDot";

type onBoardingProps = {
  item: {
    id: number;
    lottie: string;
    title: string;
    subtitle: string;
    description: string;

    background: string;
  }[];

  xVal: SharedValue<number>;
};

const OnBoardingDot = ({ item, xVal }: onBoardingProps) => {
  return (
    <View className=" rounded-full flex-row  justify-between w-[100px]">
      {item.map((item, index) => (
        <PaginationDot key={item.id} index={index} xVal={xVal} />
      ))}
    </View>
  );
};

export default OnBoardingDot;

const styles = StyleSheet.create({});
