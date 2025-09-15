import { itemIcon } from "@/assets/constants/constants";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type InventoryItemProps = {
  item: any;
};

const InventoryItemContainer = ({ item }: InventoryItemProps) => {
  const iconNameTrimmed = item.Icon ? item.Icon.replace(".png", "") : "";

  return (
    <View className="bg-background my-2 w-2/5 h-36 mx-2 rounded-2xl p-3">
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
        <Text className="text-white font-exoBold">{item.quantity} X</Text>
        <Text className="text-white font-exoExtraBold">{item.title}</Text>
      </View>
    </View>
  );
};

export default React.memo(InventoryItemContainer);

const styles = StyleSheet.create({});
