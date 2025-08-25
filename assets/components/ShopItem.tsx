import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import useSequentialAppearAnim from "../Hooks/useSequentialAppearAnim";

type ShopItemProps = {
  name: string;
  description: string;
  functionality: string;
  price: string;
  id: number;
};

// Shop item component for (Tabs)/Shop.tsx
const ShopItem = ({
  id,
  name,
  description,
  functionality,
  price,
}: ShopItemProps) => {
  const isFocused = useIsFocused();
  const { onScale } = useSequentialAppearAnim({ indicator: isFocused, id: id });
  return (
    //Gradient animation is NOT final
    <Animated.View
      style={[onScale]}
      className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 aspect-square my-2 items-center justify-center mx-auto"
    >
      <View className="bg-shopAccent rounded-xl flex-row flex-[1]  ">
        <View className="flex-col justify-evenly items-center flex-1 p-3">
          <Ionicons name="pricetag" size={40} color={"#FFFFFF"} />
          <Text className="text-white xs:text-sm font-exoExtraBold my-2">
            {name}
          </Text>

          <Text className="text-white  xs:text-xs text-center font-exoRegular my-2">
            {description}
          </Text>
          <Text className="text-[#00FFBF] xs:text-xs  text-center">
            {functionality}
          </Text>

          <TouchableOpacity>
            <Text className="text-white xs:text-[8px] bg-[#1ABC9C]  px-7 font-exoRegular py-2 rounded-2xl">
              {price}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default React.memo(ShopItem);
// Gradient border
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 1,
    height: 200,
    marginVertical: 10,
  },
});
