import React from "react";
import { Image, Text, View } from "react-native";
type ShopHeader = {
  coins: number | undefined;
};
const ShopHeader = ({ coins }: ShopHeader) => {
  return (
    <>
      <View className="flex-row  items-center justify-between  ">
        <View className="flex-row">
          <Text className="xs:text-2xl text-white font-exoExtraBold px-3">
            DEVSHOP
          </Text>
          <Image
            source={require("@/assets/images/navBarIcons/Shop.png")}
            className="h-[30px] w-[30px]"
          ></Image>
        </View>

        <View className="flex-row items-center mr-7 ">
          <Text className="text-white xs:text-xs text-justify font-exoRegular mr-2 px-3">
            {coins}
          </Text>
          <Image
            source={require("@/assets/images/iconItems/DevCoins.png")}
            className="h-[20px] w-[20px]"
          ></Image>
        </View>
      </View>

      <View className="mx-3 my-3 p-3 bg-accentContainer rounded-xl shadow-md">
        <Text className="text-white xs:text-xs text-justify font- px-3 my-2 opacity-65">
          Welcome to the DevLab Shop, where learning meets gamification! Earn
          rewards as you code, learn, and complete challenges, then spend them
          on awesome upgrades to enhance your experience.
        </Text>
      </View>
    </>
  );
};

export default React.memo(ShopHeader);
