import { fetchShopItems } from "@/assets/API/fireBase/user/shop/fetchShopItems";
import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import FillScreenLoading from "@/assets/components/global/FillScreenLoading";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import ShopHeader from "@/assets/components/screen/SHOP/ShopHeader";
import ShopList from "@/assets/components/screen/SHOP/ShopList";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { useIsMutating, useQuery } from "@tanstack/react-query";
import React from "react";

import { View } from "react-native";

const Shop = () => {
  const { data: shopItems } = useQuery({
    queryKey: ["shopItems"],
    queryFn: fetchShopItems,
    staleTime: 10 * 60 * 1000,
  });
  const userData = useGetUserInfo((state) => state.userData);

  const isMutating = useIsMutating();
  const arrayShopItem = Array.isArray(shopItems) ? shopItems : [];
  return (
    <ProtectedRoutes>
      <View className="bg-accent flex-1 ">
        {isMutating > 0 && (
          <FillScreenLoading text="Purachasing an item..."></FillScreenLoading>
        )}
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <ShopHeader coins={userData?.coins}></ShopHeader>
            <ShopList shopItem={arrayShopItem}></ShopList>
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default Shop;
