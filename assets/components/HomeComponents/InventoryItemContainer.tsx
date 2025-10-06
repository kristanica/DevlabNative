import { itemIcon } from "@/assets/constants/constants";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type InventoryItemProps = {
  item: any;
};

const InventoryItemContainer = ({ item }: InventoryItemProps) => {
  const iconNameTrimmed = item.Icon ? item.Icon.replace(".png", "") : "";

  return (
    <View className="bg-background my-2 w-2/5 h-36 mx-2 rounded-2xl p-3 justify-between border-[#6c37a5] border-[1px] ">
      <Image
        source={itemIcon[iconNameTrimmed]}
        style={{
          width: "50%",
          height: 50,
          resizeMode: "contain",
          marginHorizontal: "auto",
        }}
      ></Image>
      <View className="justify-center items-center mt-3">
        <Text className="text-white font-exoBold text-[12px]">
          {item.quantity} x
        </Text>
        <Text className="text-white font-exoMedium text-xs">
          {iconNameTrimmed.replace("_Icon", "")}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(InventoryItemContainer);

const styles = StyleSheet.create({});
