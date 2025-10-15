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
    <View className="bg-background my-2  w-[80%]  mx-auto rounded-2xl p-3 justify-between border-[#6c37a5] border-[1px] ">
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
          {quantity} x
        </Text>
        <Text className="text-white font-exoMedium text-xs">{title}</Text>
      </View>
    </View>
  );
};

export default React.memo(InventoryItemContainer);

const styles = StyleSheet.create({});
