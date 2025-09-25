import { auth, db, height } from "@/assets/constants/constants";

import { activeBuffsLocal } from "@/assets/Hooks/function/activeBuffsLocal";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
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
import Toast, { BaseToastProps } from "react-native-toast-message";
import UserInventoryItems from "../StageComponents/UserInventoryItems";

const ItemList = () => {
  const showToast = (type: string, gameMode: string) => {
    Toast.show({
      type: type,
      text1: `You cannot use that, you're in ${gameMode}! `,
      visibilityTime: 2000,
      position: "top",
      topOffset: 20,
    });
  };
  const { inventory } = useGetUserInfo();
  const moveToRight = useSharedValue(100);
  const opacity = useSharedValue(1);

  const inventoryX = useSharedValue(300);
  const location = WhereIsUser((state) => state.location);

  // const temp = itemThatShouldRender(location!, inventory);

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
    let timeoutClear: any;
    const hasSeen = async () => {
      try {
        const hasSeenInv = await AsyncStorage.getItem("hasSeenInvAppear");
        console.log(hasSeenInv);
        setDisable(false);
        if (!hasSeenInv) {
          moveToRight.value = withSequence(
            withTiming(-50, { duration: 1000 }),
            withTiming(100, { duration: 1000 })
          );
          timeoutClear = setTimeout(() => {
            setDisable(false);
          }, 2000);
          await AsyncStorage.setItem("hasSeenInvAppear", "true");
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };

    hasSeen();
    return () => clearTimeout(timeoutClear);
  }, []);

  const addActiveBuff = activeBuffsLocal((state) => state.addActiveBuff);
  const useItem = async (itemId: string, itemName: string) => {
    const id = auth.currentUser?.uid;
    const userInventoryRef = doc(db, "Users", String(id), "Inventory", itemId);
    await updateDoc(userInventoryRef, {
      quantity: increment(-1),
    });

    const snapshot = await getDoc(userInventoryRef);
    const updatedData = snapshot.data();

    if (itemName) {
      addActiveBuff(itemName);
    }

    if (updatedData?.quantity <= 0) {
      await deleteDoc(userInventoryRef);
      return;
    }
  };

  const useItemActions: Record<string, (userItem: string) => void> = {
    "Coin Surge": (itemId) => useItem(itemId, "doubleCoins"),
    "Code Whisper": async (itemId) => {
      if (location !== "BugBust") {
        showToast("itemError", String(location));
        console.log("You're not in bug bust lol");
        return;
      }
      await useItem(itemId, "revealHint");
    },
    "Code Patch++": (itemId) => {
      if (location !== "CodeRush") {
        showToast("itemError", String(location));
        console.log("youre not in code rush");
        return;
      }
      useItem(itemId, "extraTime");
    },
    "Time Freeze": (itemId) => {
      if (location !== "CodeRush") {
        showToast("itemError", String(location));
        console.log("youre not in code rush");
        return;
      }
      useItem(itemId, "timeFreeze");
    },
    "Error Shield": async (itemId) => {
      if (location === "Lesson") {
        showToast("itemError", String(location));
        console.log("You cannot use items in here");
        return;
      }
      await useItem(itemId, "errorShield");
    },
    "Brain Filter": (itemId) => {
      if (location !== "BrainBytes") {
        showToast("itemError", String(location));
        console.log("youre not in Brain Bytes");
        return;
      }
      useItem(itemId, "brainFilter");
    },
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
      <Toast
        config={{
          itemError: (props: BaseToastProps) => (
            <View className="h-[50px]  w-52 mx-2 z-50 bg-red-500 border-[#ffffffaf] border-[2px] rounded-xl justify-center items-center absolute ">
              <Text className="text-white xs: text-xs text-center font-exoExtraBold">
                {props.text1}
              </Text>
            </View>
          ),
        }}
      />
      <AnimatedPressable
        onPress={showInventory}
        disabled={disable}
        style={moveToRightStyle}
        className="h-10 w-[30%] bg-button rounded-tl-2xl rounded-bl-2xl absolute bottom-[50%] right-0 z-40 items-center justify-center"
      >
        <Text className="text-center font-exoBold text-xs text-white">
          Your items are in here
        </Text>
      </AnimatedPressable>
      <Animated.View
        style={[moveToLeftInventoryStyle, { top: height / 3 }]}
        className="h-80 w-[90%] top-14 absolute right-0 bg-modal border-[#2a3141] border-[1px] border-r-0 shadow-2xl z-50 p-4"
        pointerEvents="auto"
      >
        <View className="justify-center items-center flex-row mb-2">
          <TouchableOpacity
            onPress={() => {
              showInventory();
            }}
            className="absolute left-0"
          >
            <Ionicons name={"close"} size={15} color={"white"}></Ionicons>
          </TouchableOpacity>
          <Text className="text-white font-exoBold text-lg">
            Your Inventory
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View className="flex-row flex-wrap justify-center">
            {inventory?.map((userInvItems: any) => {
              return (
                <TouchableOpacity
                  key={userInvItems.id}
                  onPress={() =>
                    useItemActions[userInvItems.title]?.(userInvItems.id)
                  }
                >
                  <UserInventoryItems item={userInvItems} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </Animated.View>
    </>
  );
};

export default ItemList;
