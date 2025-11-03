import { itemIcon } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";
//Will render the items for [stageid]
const UserInventoryItems = ({
  title,
  Icon,
  quantity,
}: UserInventoryItemsPayload) => {
  const iconNameTrimmed = Icon ? Icon.replace(".png", "") : "";
  if (quantity === 0) {
    return;
  }
  return (
    <View className="bg-background my-2 w-[100px] h-32 mx-2 rounded-2xl p-3 border-[#2a3141] border-[1px] ">
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
        <Text className="text-white font-exoBold text-xs">{quantity} X</Text>
        <Text className="text-white font-exoExtraBold text-xs">{title}</Text>
      </View>
    </View>
  );
};

export default React.memo(UserInventoryItems);
