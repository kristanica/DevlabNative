import { auth, db, height } from "@/assets/constants/constants";
import { activeBuffsLocal } from "@/assets/Hooks/function/activeBuffsLocal";
import { ActiveItemIcon } from "@/assets/zustand/ActiveItemIcon";
import toastHandler from "@/assets/zustand/toastHandler";
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
import React, { useCallback, useEffect, useState } from "react";
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
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);

  const inventory = useGetUserInfo((state) => state.inventory);
  const activeItem = ActiveItemIcon((state) => state.activeIcon);
  const setActiveItem = ActiveItemIcon((state) => state.setActiveIcon);
  const moveToRight = useSharedValue(100);
  const opacity = useSharedValue(1);
  const addActiveBuff = activeBuffsLocal((state) => state.addActiveBuff);
  const location = WhereIsUser((state) => state.location);
  console.log(location + "LCATIONNNN");
  const inventoryX = useSharedValue(300);
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

  const useItem = useCallback(
    async (itemId: string, itemName: string) => {
      console.log(itemId, itemName);
      const id = auth.currentUser?.uid;
      const userInventoryRef = doc(
        db,
        "Users",
        String(id),
        "Inventory",
        itemId
      );
      await updateDoc(userInventoryRef, {
        quantity: increment(-1),
      });

      const snapshot = await getDoc(userInventoryRef);
      const updatedData = snapshot.data();

      if (itemName) {
        console.log(itemName);
        addActiveBuff(itemName);
      }

      if (updatedData?.quantity <= 0) {
        await deleteDoc(userInventoryRef);
        return;
      }
    },
    [addActiveBuff]
  );

  const useItemActions: Record<string, (userItem: string) => void> = {
    CoinSurge: async (itemId) => {
      if (activeItem.CoinSurge) {
        console.log("Youve already used this!");
        setToastVisibility("error", "You've already used this!");
        return;
      }

      setActiveItem({
        CoinSurge: true,
      });

      setToastVisibility("success", `You've used Coin Surge!`);

      useItem(itemId, "doubleCoins");
      console.log("AYES");
    },
    CodeWhisper: async (itemId) => {
      if (location === "Lesson") {
        // await playSound("wrongAnswer");
        console.log(location + "woahwoahwoha");
        setToastVisibility(
          "error",
          `You cannot use Code whisper in ${location}`
        );
        return;
      }
      // await playSound("success");
      setToastVisibility("success", `You've used Code Whisper!`);
      await useItem(itemId, "revealHint");
    },
    CodePatch: async (itemId) => {
      if (location !== "CodeRush") {
        // await playSound("wrongAnswer");
        setToastVisibility(
          "error",
          `You cannot use that, you're in ${location}!`
        );
        console.log("youre not in code rush");
        return;
      }
      // await playSound("success");
      setToastVisibility("success", `You've used Code Path!`);
      useItem(itemId, "extraTime");
    },
    TimeFreeze: async (itemId) => {
      if (location !== "CodeRush") {
        // await playSound("wrongAnswer");
        setToastVisibility(
          "error",
          `You cannot use that, you're in ${location}!`
        );

        console.log("youre not in code rush");
        return;
      }
      // await playSound("success");
      setToastVisibility("success", `You've used Time freeze!`);
      useItem(itemId, "timeFreeze");
    },
    ErrorShield: async (itemId) => {
      if (location === "Lesson") {
        // await playSound("wrongAnswer");
        setToastVisibility(
          "error",
          `You cannot use that, you're in ${location}!`
        );

        console.log("You cannot use items in here");
        return;
      }
      if (activeItem.ErrorShield) {
        console.log("Errros shiled already in effect");
        setToastVisibility("error", `You've already used this!`);
        return;
      }
      // await playSound("success");
      setActiveItem({
        ErrorShield: true,
      });
      setToastVisibility("success", `You've used error shield!`);

      await useItem(itemId, "errorShield");
    },
    BrainFilter: async (itemId) => {
      if (location !== "BrainBytes") {
        // await playSound("wrongAnswer");
        setToastVisibility(
          "error",
          `You cannot use that, you're in ${location}!`
        );

        console.log("youre not in Brain Bytes");
        return;
      }
      if (activeItem.BrainFilter) {
        setToastVisibility("error", `You've already used brain filter!`);
        return;
      }
      setActiveItem({
        BrainFilter: true,
      });
      setToastVisibility("success", `You've used brain filter!`);

      useItem(itemId, "brainFilter");
    },
  };

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const showInventory = useCallback(() => {
    if (!toggleInventory) {
      inventoryX.value = withTiming(0, { duration: 1000 });
      opacity.value = withTiming(0);
    } else {
      inventoryX.value = withTiming(400, { duration: 1000 });
      opacity.value = withTiming(1);
    }
    setToggleInventory((prev) => !prev);
  }, [toggleInventory, inventoryX, opacity]);
  return (
    <>
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
        className="h-80 w-[50%] top-14 absolute right-0 bg-modal border-[#2a3141] border-[1px] border-r-0 shadow-2xl z-50 p-4"
        pointerEvents="auto"
      >
        <View>
          <Text className="text-white text-xs xs:text-[9px] text-center font-exoBold">
            Active Items
          </Text>
          {activeItem.ErrorShield && (
            <>
              <Ionicons
                name="shield"
                size={24}
                color="green"
                className="my-5"
              />
            </>
          )}
          {activeItem.CoinSurge && (
            <>
              <Ionicons name="cash" size={24} color="yellow" className="my-2" />
            </>
          )}
          {activeItem.BrainFilter && (
            <>
              <Ionicons name="book" size={24} color="yellow" className="my-2" />
            </>
          )}
        </View>
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
                  onPress={() => {
                    console.log("Location:", location);
                    console.log("Item title:", userInvItems.title);
                    const action = useItemActions[userInvItems.title];
                    console.log("Action found:", !!action);
                    action?.(userInvItems.id);
                  }}
                >
                  <UserInventoryItems {...userInvItems} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </Animated.View>
    </>
  );
};

export default React.memo(ItemList);
