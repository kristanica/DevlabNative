import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
type ShopHeader = {
  coins: number | undefined;
};
const ShopHeader = ({ coins }: ShopHeader) => {
  return (
    <>
      <View className="flex-row  items-center justify-between  ">
        <View className="flex-row">
          <Text className="xs:text-2xl text-white font-exoExtraBold px-3">
            DEVLAB
          </Text>
          <Ionicons name="cart" size={20} color={"#FFFFFF"} />
        </View>

        <View className="flex-row items-center mr-7 ">
          <Text className="text-white xs:text-xs text-justify font-exoRegular mr-2 px-3">
            {coins}
          </Text>
          <Ionicons name="cash" size={20} color={"#FFFFFF"} />
        </View>
      </View>

      <View>
        <Text className="text-white xs:text-xs text-justify font- px-3 my-2">
          Welcome to the DevLab Shop, where learning meets gamification! Earn
          rewards as you code, learn, and complete challenges, then spend them
          on awesome upgrades to enhance your experience.
        </Text>
      </View>
    </>
  );
};

export default ShopHeader;

const styles = StyleSheet.create({});
