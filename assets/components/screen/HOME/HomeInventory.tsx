import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InventoryItemContainer from "../../HomeComponents/InventoryItemContainer";

const HomeInventory = ({ inventory }: any) => {
  return (
    <>
      <Text className="text-white ml-2 xs:text-lg  font-exoBold">
        YOUR INVENTORY
      </Text>

      <View className="flex-row flex-wrap justify-center">
        {inventory.map((item: any) => (
          <InventoryItemContainer
            key={item.id}
            {...item}
          ></InventoryItemContainer>
        ))}
      </View>
    </>
  );
};

export default React.memo(HomeInventory);

const styles = StyleSheet.create({});
