import purchaseItem from "@/assets/API/fireBase/user/purchaseItem";
import { playSound } from "@/assets/Hooks/function/soundHandler";
import toastHandler from "@/assets/zustand/toastHandler";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
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
      itemIcon,
      itemName,
    }: {
      id: string;
      cost: number;
      itemIcon: string;
      itemName: string;
    }) => {
      return purchaseItem({
        id: id,
        cost: cost,
        itemIcon: itemIcon,
        itemName: itemName,
      });
    },
    onSuccess: async (data) => {
      useGetUserInfo
        .getState()
        .setUserData({ ...userData!, coins: data?.newCoins });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      playSound("purchase");
      setToastVisibility("success", "You've bought an item!");
    },
    onError: () => {
      setToastVisibility("error", "Not enough coins!");
    },
  });

  const handlePurchase = useCallback(
    ({ id, cost, icon, title }: any) => {
      mutation.mutate({
        id: String(id),
        cost: Number(cost),
        itemIcon: icon.replace(".png", ""),
        itemName: title,
      });
    },
    [mutation]
  );

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
              if (!item.id || !item.cost || !item.Icon || !item.title) return;

              handlePurchase({
                id: item.id,
                cost: item.cost,
                icon: item.Icon,
                title: item.title,
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
