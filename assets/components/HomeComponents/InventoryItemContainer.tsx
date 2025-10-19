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
    <View className="bg-background my-2    w-[80%] mx-auto  rounded-2xl p-3 flex-row  border-[1px] ">
      <Image
        source={itemIcon[iconNameTrimmed]}
        style={{
          height: 50,
          width: 50,
          marginRight: 25,
          resizeMode: "contain",
        }}
      ></Image>

      <View className="items-center justify-center flex-row">
        <Text className="text-white font-exoBold text-[12px]">
          {quantity} x
        </Text>
        <Text className="text-white font-exoMedium text-xs">
          {"   "}
          {title}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(InventoryItemContainer);

const styles = StyleSheet.create({});
