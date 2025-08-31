import { useIsFocused } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { db } from "../constants/constants";
import fetchUserData from "../Hooks/query/fetchUserData";
import useSequentialAppearAnim from "../Hooks/useSequentialAppearAnim";

type ShopItemProps = {
  id: string;
  Icon: string;
  cost: number;
  desc: string;
  title: string;
  index: number;
};

// Shop item component for (Tabs)/Shop.tsx
const ShopItem = ({ id, Icon, desc, title, cost, index }: ShopItemProps) => {
  const isFocused = useIsFocused();
  const { onScale } = useSequentialAppearAnim({
    indicator: isFocused,
    id: index,
  });
  const iconNameTrimmed = Icon ? Icon.replace(".png", "") : "";

  const test: Record<string, ImageSourcePropType> = {
    CodePatch_Icon: require("../images/iconItems/CodePatch_Icon.png"),
    CodeWhisper_Icon: require("../images/iconItems/CodeWhisper_Icon.png"),
    CoinSurge_Icon: require("../images/iconItems/CoinSurge_Icon.png"),
    BrainFilter_Icon: require("../images/iconItems/BrainFilter_Icon.png"),
    ErrorShield_Icon: require("../images/iconItems/ErrorShield_Icon.png"),
    TimeFreeze_Icon: require("../images/iconItems/TimeFreeze_Icon.png"),
  };

  const { userData, refetch } = fetchUserData();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      if (!userData) {
        return null;
      }

      try {
        if (userData?.coins < cost) {
          console.log("Not enough coins");

          return null;
        }

        const userRef = doc(db, "Users", userData.uid);
        await updateDoc(userRef, {
          coins: userData.coins - cost,
        });

        const inventoryRef = doc(db, "Users", userData.uid, "Inventory", id);
        const inventorySnap = await getDoc(inventoryRef);

        if (inventorySnap.exists()) {
          await updateDoc(inventoryRef, {
            quantity: increment(1),
          });
        } else {
          await setDoc(inventoryRef, {
            quantity: 1,
          });
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["userData"] }),
  });

  return (
    <Animated.View
      style={[onScale]}
      className="w-[80%] sm:w-3/4 md:w-2/3 lg:w-1/2 min-h-[200px] my-2 items-center justify-center mx-auto"
    >
      <View className="bg-shopAccent rounded-xl flex-row flex-[1]  ">
        <View className="flex-col justify-evenly items-center flex-1 p-3">
          <Image
            source={test[iconNameTrimmed]}
            style={{ width: "100%", height: 100, resizeMode: "contain" }}
          ></Image>
          <Text className="text-white xs:text-sm font-exoExtraBold my-2">
            {title}
          </Text>

          <Text className="text-[#00FFBF] xs:text-xs  text-center my-4">
            {desc}
          </Text>

          <TouchableOpacity onPress={() => mutation.mutate()}>
            <Text className="text-white xs:text-[8px] bg-[#1ABC9C]  px-7 font-exoRegular py-2 rounded-2xl">
              ${cost}
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
