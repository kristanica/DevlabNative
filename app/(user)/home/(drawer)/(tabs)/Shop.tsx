import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import ShopItem from "@/assets/components/ShopItem";
import useFetchShopItems from "@/assets/Hooks/query/useFetchShopItems";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const shop = () => {
  const { shopItems } = useFetchShopItems();
  const userData = useGetUserInfo((state) => state.userData);
  return (
    <ProtectedRoutes>
      <View className="bg-accent flex-1">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <View className="flex-1 p-3">
              <View className="flex-row  items-center">
                <Text className="xs:text-2xl text-white font-exoExtraBold">
                  DEVLAB
                </Text>
                <Ionicons name="cart" size={20} color={"#FFFFFF"} />
              </View>

              {/* Renders shop description */}
              <View>
                <Text className="text-white xs:text-xs text-justify font-exoRegular">
                  Welcome to the DevLab Shop, where learning meets gamification!
                  Earn rewards as you code, learn, and complete challenges, then
                  spend them on awesome upgrades to enhance your experience.
                </Text>
                <Text className="text-white xs:text-xs text-justify font-exoRegular">
                  {userData?.coins}
                </Text>
              </View>

              {/* Renders shop item */}
              <ScrollView
                bounces={true}
                showsVerticalScrollIndicator={false}
                className="flex-[5] border-[#36334B] border-2 rounded-[10px] p-3"
              >
                {Array.isArray(shopItems) &&
                  shopItems!.map((item, index) => (
                    <ShopItem {...item} index={index} key={item.id} />
                  ))}
              </ScrollView>
            </View>
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default shop;

const styles = StyleSheet.create({});
