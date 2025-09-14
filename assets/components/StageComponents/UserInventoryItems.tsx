import { itemIcon } from "@/assets/constants/constants";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type UserInventoryItems = {
  item: any;
};

const UserInventoryItems = ({ item }: UserInventoryItems) => {
  const iconNameTrimmed = item.Icon ? item.Icon.replace(".png", "") : "";
  if (item.quantity === 0) {
    return;
  }
  return (
    <View className="bg-background my-2 w-[100px] h-32 mx-2 rounded-2xl p-3 border-[#2a3141] border-[1px]">
      <Image
        source={itemIcon[iconNameTrimmed]}
        style={{
          width: "35%",
          height: 50,
          resizeMode: "contain",
          marginHorizontal: "auto",
        }}
      ></Image>
      <View className="justify-center items-center mt-3">
        <Text className="text-white font-exoBold text-xs">
          {item.quantity} X
        </Text>
        <Text className="text-white font-exoExtraBold text-xs">
          {item.title}
        </Text>
      </View>
    </View>
  );
};

export default UserInventoryItems;

const styles = StyleSheet.create({});
