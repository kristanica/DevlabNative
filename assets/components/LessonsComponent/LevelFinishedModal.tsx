import { auth, db } from "@/assets/constants/constants";
import { activeBuffsLocal } from "@/assets/Hooks/function/activeBuffsLocal";
import { coinSurge } from "@/assets/Hooks/mainGameModeFunctions/globalItems/coinSurge";
import { setCoinsandExp } from "@/assets/zustand/setCoinsandExp";
import unlockNextLevel from "@/assets/zustand/unlockNextLevel";
import { userHealthPoints } from "@/assets/zustand/userHealthPoints";
import { router } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import Accordion from "../global/Accordion";
import SmallLoading from "../global/SmallLoading";
type levelFinishedModalPayload = ScaleModalPayload & {
  isRewardClaimed: boolean;
  evaluationData: any;
};
const LevelFinishedModal = ({
  visibility,
  scaleStyle,
  onConfirm,
  isRewardClaimed,
  evaluationData,
}: levelFinishedModalPayload) => {
  const coinsAndExp = setCoinsandExp((state) => state.coinsAndExp);
  const userHealth = userHealthPoints((state) => state.health);
  const { coinSurgeItem } = coinSurge();
  const activeBuffs = activeBuffsLocal((state) => state.activeBuff);
  // const removeActiveBuffs = activeBuffsLocal((state) => state.removeActiveBuff);

  // Checks whether the user has used doubleCoins

  // FIXME:STILL UNTESTED, will remove all active buffs once level is finished
  useEffect(() => {
    if (!activeBuffs.includes("doubleCoins")) return;
    // If yes, doubles the user coins
    coinSurgeItem();
    // removeActiveBuffs("doubleCoins");
    activeBuffsLocal.getState().clearActiveBuff();
  }, [activeBuffs]);

  //Checks whether the user has already claimed the reward on the level
  useEffect(() => {
    // If yes, returns immdtly
    if (isRewardClaimed) return;

    const giveReward = async () => {
      const uid = auth?.currentUser?.uid;
      const userRef = doc(db, "Users", String(uid));
      const userSnapShot = (await getDoc(userRef)).data();

      // Updates the user's exp and coins
      await updateDoc(userRef, {
        exp: (userSnapShot?.exp || 0) + coinsAndExp?.exp,
        coins: (userSnapShot?.coins || 0) + coinsAndExp?.coins,
      });
      console.log(coinsAndExp);
    };
    giveReward();
  }, [coinsAndExp]);
  const nextLevelPayload = unlockNextLevel((state) => state.nextLevelPayload);
  const nextLessonPayload = unlockNextLevel((state) => state.nextLessonPayload);
  return (
    <Modal visible={visibility} animationType="none" transparent={true}>
      <Pressable className="flex-1 bg-black/50">
        <LottieView
          source={require("@/assets/Lottie/Confetti.json")}
          loop={false}
          autoPlay
          style={[StyleSheet.absoluteFillObject]}
        />
        <Animated.View
          style={[scaleStyle]}
          className={`  ${
            isRewardClaimed ? `h-[30%]` : `h-[70%]`
          } ] w-3/4 m-auto  rounded-[10px]`}
        >
          <View className=" flex-[1] bg-modal rounded-xl border-[##6c37a5] border-[1px]">
            <Text className=" text-center text-[#f5ff42] font-exoExtraBold text-3xl mt-2">
              LEVEL COMPLETED
            </Text>

            <View className="flex-[1]  mt-2 border-[#2a3141] border-0 border-t-[1px]">
              <Text className="text-white text-center font-exoBold xs:text-xl mt-2">
                PERFORMANCE SUMMARY
              </Text>
              <View className="mt-3">
                {isRewardClaimed ? (
                  <Text className="text-white text-center font-exoBold xs:text-xs">
                    You've already claimed the reward for this level!
                  </Text>
                ) : !evaluationData ? (
                  <SmallLoading text="getting your performance summary"></SmallLoading>
                ) : (
                  <View>
                    <View className="bg-[#080c15]  m-3 py-3 rounded-lg">
                      <Text className="text-white text-center font-exoBold xs:text-xs">
                        Lives Remaining:
                        <Text className="text-[#ad3532]"> {userHealth}x</Text>
                      </Text>
                      <Text className="text-white text-center font-exoBold xs:text-xs">
                        DevCoins: +
                        <Text className="text-[#e3be00]">
                          {coinsAndExp?.coins}
                        </Text>
                      </Text>
                      <Text className="text-white text-center font-exoBold xs:text-xs">
                        Experience gained: +
                        <Text className="text-[#21b3cf]">
                          {coinsAndExp?.exp}
                        </Text>
                      </Text>
                    </View>
                    <View className="bg-[#080c15]  mx-3 py-3 rounded-lg">
                      <Text className="text-white text-center font-exoBold xs:text-xs px-2">
                        {evaluationData.encouragement}
                      </Text>
                    </View>
                    {Object.entries(evaluationData).map(
                      ([key, value]: [string, any]) => {
                        if (!value) return;
                        if (key === "encouragement") return null;
                        return (
                          <Accordion
                            header={key}
                            contents={value}
                            key={key}
                          ></Accordion>
                        );
                      }
                    )}
                  </View>
                )}
              </View>
            </View>

            <View
              className={`${
                isRewardClaimed ? `flex-[1]` : ``
              } justify-center items-center`}
            >
              <Pressable onPress={onConfirm}>
                <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px] bg-[#7F5AF0] rounded-2xl">
                  Back to Main
                </Text>
              </Pressable>
              {(nextLevelPayload || nextLessonPayload) && (
                <TouchableOpacity
                  onPress={() => {
                    // FIXME: STILL UNTESTED
                    const target = nextLevelPayload ?? nextLessonPayload;
                    if (!target) {
                      console.log("Next lesson/level cannot be found!");
                      return;
                    }
                    router.replace({
                      pathname: "/(user)/home/stage/[stageId]",
                      params: {
                        stageId: target.stageId,
                        category: target.category,
                        lessonId: target.lessonId,
                        levelId: target.nextLevelId,
                      },
                    });
                  }}
                >
                  <Text className="text-white">HELLO</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default LevelFinishedModal;

const styles = StyleSheet.create({});
