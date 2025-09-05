import { auth, db, height } from "@/assets/constants/constants";
import itemThatShouldRender from "@/assets/Hooks/function/itemThatShouldRender";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import { arrayUnion, doc, increment, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import UserInventoryItems from "../StageComponents/UserInventoryItems";

const ItemList = () => {
  const { inventory } = useGetUserInfo();
  const moveToRight = useSharedValue(-50);
  const opacity = useSharedValue(1);

  const inventoryX = useSharedValue(300);
  const location = WhereIsUser((state) => state.location);

  const temp = itemThatShouldRender(location!, inventory);

  const [disable, setDisable] = useState<boolean>(true);
  const [toggleInventory, setToggleInventory] = useState<boolean>(false);

  const moveToRightStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: moveToRight.value }],
    opacity: opacity.value,
  }));

  const moveToLeftInventoryStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: inventoryX.value }],
  }));

  useEffect(() => {
    moveToRight.value = withSequence(
      withTiming(-50, { duration: 1000 }),
      withTiming(100, { duration: 1000 })
    );
    const unsub = setTimeout(() => {
      setDisable(false);
    }, 2000);

    return () => clearTimeout(unsub);
  }, []);

  const useItem = async (itemId: string, itemName: string) => {
    const id = auth.currentUser?.uid;
    const userInventoryRef = doc(db, "Users", String(id), "Inventory", itemId);
    await updateDoc(userInventoryRef, {
      quantity: increment(-1),
    });
    await updateDoc(doc(db, "Users", String(id)), {
      activeBuffs: arrayUnion(itemName),
    });
  };

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const showInventory = () => {
    if (!toggleInventory) {
      inventoryX.value = withTiming(0, { duration: 1000 });
      opacity.value = withTiming(0);
    } else {
      inventoryX.value = withTiming(400, { duration: 1000 });
      opacity.value = withTiming(1);
    }
    setToggleInventory((prev) => !prev);
  };
  return (
    <>
      <AnimatedPressable
        onPress={showInventory}
        disabled={disable}
        style={moveToRightStyle}
        className="h-10 w-[30%] bg-slate-400 rounded-tl-2xl rounded-bl-2xl absolute bottom-[50%] right-0 z-40 items-center justify-center"
      >
        <Text className="text-center">Your items are in here</Text>
      </AnimatedPressable>
      <Animated.View
        style={[moveToLeftInventoryStyle, { top: height / 3 }]}
        className="h-80 w-[70%] top-14 absolute right-0 bg-accent shadow-2xl z-50 p-4"
        pointerEvents="auto"
      >
        <TouchableOpacity
          onPress={() => {
            showInventory();
          }}
        >
          <Text className="m-auto text-white font-exoBold">Close</Text>
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View className="flex-row flex-wrap justify-center">
            {location === "Lesson" ? (
              <Text className="text-white font-exoBold ">
                Items cannot be used on lessons
              </Text>
            ) : (
              temp?.map((item: any) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => useItem(item.id, item.title!)}
                  >
                    <UserInventoryItems item={item} />
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </ScrollView>
      </Animated.View>
    </>
  );
};

export default ItemList;
