import purchaseItem from "@/assets/API/fireBase/user/purchaseItem";
import toastHandler from "@/assets/zustand/toastHandler";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import ShopItem from "../../ShopItem";
type ShopListProps = {
  shopItem: any;
};
const ShopList = ({ shopItem }: ShopListProps) => {
  const queryClient = useQueryClient();
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);
  const userData = useGetUserInfo((state) => state.userData);
  const mutation = useMutation({
    mutationFn: async ({
      id,
      cost,
      itemName,
    }: {
      id: string;
      cost: number;
      itemName: string;
    }) => {
      return purchaseItem({ id: id, cost: cost, itemName: itemName });
    },
    onSuccess: async (data) => {
      useGetUserInfo
        .getState()
        .setUserData({ ...userData!, coins: data?.newCoins });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      setToastVisibility("success", "You've brought an item!");
    },
    onError: () => {
      setToastVisibility("error", "Not enough coins!");
    },
  });
  return (
    <>
      <FlashList
        bounces
        showsVerticalScrollIndicator={false}
        data={shopItem}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <ShopItem
            {...item}
            index={index}
            key={item.id}
            handlePurchase={() => {
              console.log("purcahse");
              mutation.mutate({
                id: String(item.id),
                cost: item.cost,
                itemName: item.Icon.replace(".png", ""),
              });
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        className="flex-[5] border-[#36334B] border-2 rounded-[10px]"
        contentContainerStyle={{ paddingBottom: 8 }}
        estimatedItemSize={255}
      />
    </>
  );
};

export default React.memo(ShopList);
