import { activeBuffsLocal } from "@/assets/Hooks/function/activeBuffsLocal";
import { playSound } from "@/assets/Hooks/function/soundHandler";
import { unlockAchievement } from "@/assets/Hooks/function/unlockAchievement";
import { ActiveItemIcon } from "@/assets/zustand/ActiveItemIcon";
import toastHandler from "@/assets/zustand/toastHandler";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import userHp from "@/assets/zustand/userHp";
import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import { auth, db } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import React, { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import UserInventoryItems from "../StageComponents/UserInventoryItems";

const ItemList = ({ category }: any) => {
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);
  const activeBuffs = activeBuffsLocal((state) => state.activeBuff);
  const inventory = useGetUserInfo((state) => state.inventory);
  const activeItem = ActiveItemIcon((state) => state.activeIcon);
  const setActiveItem = ActiveItemIcon((state) => state.setActiveIcon);

  const addActiveBuff = activeBuffsLocal((state) => state.addActiveBuff);
  const location = WhereIsUser((state) => state.location);

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

  //Item usage

  // Use for codePatch++, will increment user Hp
  const incrementUserHp = userHp((state) => state.incrementUserHp);
  const currentHealthPoints = userHp((state) => state.userHp);

  const useItemActions: Record<string, (userItem: string) => void> = {
    CoinSurge: async (itemId) => {
      if (activeItem.CoinSurge) {
        setToastVisibility("error", "You've already used this!");
        return;
      }

      setActiveItem({
        CoinSurge: true,
      });

      setToastVisibility("success", `You've used Coin Surge!`);
      await playSound("success");
      useItem(itemId, "doubleCoins");
      console.log("AYES");
    },
    CodeWhisper: async (itemId) => {
      if (location === "Lesson" || location === "BrainBytes") {
        setToastVisibility(
          "error",
          `You cannot use CodeWhisper in ${location}`
        );
        return;
      }
      await playSound("success");
      setToastVisibility("success", `You've used Code Whisper!`);
      await useItem(itemId, "revealHint");
    },
    CodePatch: async (itemId) => {
      // if (location !== "Lesson") {
      //   setToastVisibility(
      //     "error",
      //     `You cannot use that, you're in ${location}!`
      //   );

      //   return;
      // }
      // If already max, show error
      if (currentHealthPoints >= 5) {
        setToastVisibility("error", "Max HP reached!");
        return;
      }

      await playSound("success");
      setToastVisibility("success", `You've used Code Patch++!`);
      incrementUserHp();
    },
    TimeFreeze: async (itemId) => {
      if (location !== "CodeRush") {
        // await playSound("wrongAnswer");
        setToastVisibility("error", `You cannot use TimeFreeze in ${location}`);

        return;
      }
      await playSound("success");
      setToastVisibility("success", `You've used Time freeze!`);
      useItem(itemId, "timeFreeze");
    },
    ErrorShield: async (itemId) => {
      if (location === "Lesson") {
        // await playSound("wrongAnswer");
        setToastVisibility(
          "error",
          `You cannot use ErrorShield in ${location}`
        );

        console.log("You cannot use items in here");
        return;
      }
      if (activeItem.ErrorShield) {
        setToastVisibility("error", `Error Shield is already in effect!`);
        return;
      }
      await playSound("success");
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
          `You cannot use BrainFilter in ${location}`
        );

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
      await playSound("success");
      useItem(itemId, "brainFilter");
    },
  };

  const [toggleInventory, setToggleInventory] = useState<boolean>(false);
  const showInventory = useCallback(() => {
    if (!toggleInventory) {
    } else {
    }
    setToggleInventory((prev) => !prev);
  }, [toggleInventory]);
  return (
    <>
      <View className="  bg-modal border-[#2a3141] p-4" pointerEvents="auto">
        <View>
          <Text className="text-white text-xs xs:text-[9px] text-center font-exoBold">
            Active Items
          </Text>
          {/* Shows the icon of the currently active buffs */}
          {activeBuffs.includes("errorShield") && (
            <>
              <Ionicons
                name="shield"
                size={24}
                color="green"
                className="my-5"
              />
            </>
          )}
          {activeBuffs.includes("doubleCoins") && (
            <>
              <Ionicons name="cash" size={24} color="yellow" className="my-2" />
            </>
          )}
          {activeBuffs.includes("brainFilter") && (
            <>
              <Ionicons name="book" size={24} color="yellow" className="my-2" />
            </>
          )}
        </View>

        <Text className="text-white font-exoBold text-lg">Your Inventory</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          horizontal
        >
          <View className="flex-row ">
            {inventory?.map((userInvItems: any) => {
              return (
                <TouchableOpacity
                  key={userInvItems.id}
                  onPress={() => {
                    console.log("Location:", location);
                    console.log("Item title:", userInvItems.Icon);
                    const action = useItemActions[userInvItems.title];
                    console.log("Action found:", !!action);
                    action?.(userInvItems.id);
                    unlockAchievement(category, "itemUse", {
                      itemName: userInvItems.title,
                    });
                  }}
                >
                  <UserInventoryItems {...userInvItems} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default React.memo(ItemList);
