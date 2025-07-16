import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
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

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

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
    <AnimatedLinearGradient
      colors={["#00C6FF", "#009CFF", "#6A1B9A"]}
      locations={[0, 0.1, 0.8]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.container, onScale]}
    >
      <View className="bg-shopAccent rounded-xl flex-row flex-[1]   ">
        <View className="flex-1 flex-row items-center justify-center p-3">
          <Ionicons name="pricetag" size={50} color={"#FFFFFF"} />
        </View>
        <View className="flex-col justify-evenly items-center flex-[3]">
          {/* Render's Item name */}
          <Text className="text-white text-xl font-exoExtraBold">{name}</Text>
          {/* Render's Item Description */}
          <Text className="text-white text-center font-exoRegular">
            {description}
          </Text>
          {/* Render's Item functionality */}
          <Text className="text-[#00FFBF]">{functionality}</Text>
          {/* Purchase button */}
          <TouchableOpacity>
            <View className="w-[100px] justify-center items-center bg-[#1ABC9C] px-4 py-1 rounded-xl">
              <Text className="text-white">{price}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedLinearGradient>
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
