import { itemIcon } from "@/constants";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

type ShopItemProps = {
  Icon: string;
  cost: number;
  desc: string;
  title: string;
  index: number;
  userCoins: number;
  handlePurchase: any;
};

const ShopItem = ({
  Icon,
  desc,
  title,
  cost,
  index,
  handlePurchase,
}: ShopItemProps) => {
  // const isFocused = useIsFocused();
  // const { onScale } = useSequentialAppearAnim({
  //   indicator: isFocused,
  //   id: index,
  // });
  const iconNameTrimmed = Icon ? Icon.replace(".png", "") : "";
  return (
    <Animated.View
      // style={[onScale]}
      className="w-[90%]  mx-auto sm:w-[30%] md:w-2/3 lg:w-1/2  my-2 items-center justify-center "
    >
      <View className="bg-shopAccent rounded-xl flex-row flex-[1] border-[#2a3141] border-[1px]">
        <View className="flex-col justify-evenly items-center flex-1 py-6 px-5">
          <Image
            source={itemIcon[iconNameTrimmed]}
            style={{ width: "100%", height: 100, resizeMode: "contain" }}
          ></Image>
          <Text className="text-white xs:text-sm font-exoExtraBold my-2">
            {title}
          </Text>

          <Text className="text-white xs:text-[11px]  text-center my-4 :text-xs  font- px-3 opacity-65">
            {desc}
          </Text>

          <TouchableOpacity onPress={handlePurchase} className="w-full">
            <Text className="text-white xs:text-[12px] bg-[#1ABC9C]  text-center px-7 font-exoRegular py-2 rounded-2xl">
              ${cost}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default React.memo(ShopItem);
