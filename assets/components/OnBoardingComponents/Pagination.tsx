import React from "react";
import { StyleSheet, View } from "react-native";
import PaginationDot from "./PaginationDot";

const OnBoardingDot = ({ item, xVal }: OnBoardingDotPayload) => {
  return (
    <View className=" rounded-full flex-row  justify-between w-[100px]">
      {item.map((item, index) => (
        //FIXME: why pass the item?
        <PaginationDot key={item.id} index={index} xVal={xVal} />
      ))}
    </View>
  );
};

export default OnBoardingDot;

const styles = StyleSheet.create({});
