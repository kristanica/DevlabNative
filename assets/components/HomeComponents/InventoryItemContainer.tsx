import { itemIcon } from "@/assets/constants/constants";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const InventoryItemContainer = ({
  Icon,
  quantity,
  title,
}: UserInventoryItemsPayload) => {
  const iconNameTrimmed = Icon ? Icon.replace(".png", "") : "";

  return (
    <View className="bg-accentContainer w-[90%] mx-auto my-2 rounded-2xl p-3 flex-row items-center shadow-md">
      <Image
        source={itemIcon[iconNameTrimmed]}
        style={{
          height: 50,
          width: 50,
          marginRight: 20,
          resizeMode: "contain",
        }}
      />

      <View className="flex-row items-center">
        <Text className="text-white font-exoBold text-sm">{quantity} x</Text>
        <Text className="text-white font-exoMedium text-sm ml-2">{title}</Text>
      </View>
    </View>
  );
};

export default React.memo(InventoryItemContainer);

const styles = StyleSheet.create({});
