import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, Text } from "react-native";
import InventoryItemContainer from "../../HomeComponents/InventoryItemContainer";

const HomeInventory = ({ inventory }: any) => {
  return (
    <>
      <Text className="text-white ml-2 xs:text-lg  font-exoBold">
        YOUR INVENTORY
      </Text>

      <FlashList
        data={inventory}
        numColumns={2}
        estimatedItemSize={139}
        renderItem={(item: any) => {
          console.log("ASDAS");
          console.log(item.item);
          return (
            <InventoryItemContainer
              Icon={item.item.Icon}
              key={item.item.id}
              quantity={item.item.quantity}
              title={item.item.title}
            ></InventoryItemContainer>
          );
        }}
      ></FlashList>
    </>
  );
};

export default React.memo(HomeInventory);

const styles = StyleSheet.create({});
