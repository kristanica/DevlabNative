import { useIsFocused } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { auth, itemIcon } from "../constants/constants";
import useSequentialAppearAnim from "../Hooks/useSequentialAppearAnim";
import { useGetUserInfo } from "../zustand/useGetUserInfo";

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

  const userData = useGetUserInfo((state) => state.userData);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return null;
      }
      const token = await currentUser?.getIdToken(true);

      const res = await fetch(
        "https://beef492a0efe.ngrok-free.app/fireBase/purchaseItem",
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemid: id,
            itemCost: cost,
          }),
        }
      );

      if (!res.ok) {
        console.log("Cannot purchase an item" + res.status);
        return;
      }
      const data = await res.json();
      console.log(res.status);
      return data;
    },
    onSuccess: (data) => {
      useGetUserInfo
        .getState()
        .setUserData({ ...userData!, coins: data?.newCoins });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });

  return (
    <Animated.View
      style={[onScale]}
      className="w-[80%] sm:w-3/4 md:w-2/3 lg:w-1/2 min-h-[200px] my-2 items-center justify-center mx-auto"
    >
      <View className="bg-shopAccent rounded-xl flex-row flex-[1]  ">
        <View className="flex-col justify-evenly items-center flex-1 p-3">
          <Image
            source={itemIcon[iconNameTrimmed]}
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
//  if (!userData) {
//       return null;
//     }

//     try {
//       if (userData?.coins < cost) {
//         console.log("Not enough coins");

//         return null;
//       }

//       const userRef = doc(db, "Users", userData.uid);
//       await updateDoc(userRef, {
//         coins: userData.coins - cost,
//       });

//       const inventoryRef = doc(db, "Users", userData.uid, "Inventory", id);
//       const inventorySnap = await getDoc(inventoryRef);

//       console.log(userData.uid, id);
//       if (inventorySnap.exists()) {
//         await updateDoc(inventoryRef, {
//           quantity: increment(1),
//         });
//       } else {
//         await setDoc(inventoryRef, {
//           quantity: 1,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
