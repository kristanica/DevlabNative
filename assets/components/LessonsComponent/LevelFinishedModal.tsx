import { activeBuffsLocal } from "@/assets/Hooks/function/activeBuffsLocal";
import { coinSurge } from "@/assets/Hooks/mainGameModeFunctions/globalItems/coinSurge";
import { levelRewardStore } from "@/assets/zustand/levelRewardStore";
import unlockNextLevel from "@/assets/zustand/unlockNextLevel";
import userHp from "@/assets/zustand/userHp";
import { auth, db } from "@/constants";
import { router } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import Accordion from "../global/Accordion";
import SmallLoading from "../global/SmallLoading";

type LevelFinishedModalPayload = ScaleModalPayload & {
  isRewardClaimed: boolean;
  evaluationData: any;
  feedbackArray: any;
};

const LevelFinishedModal = ({
  visibility,
  scaleStyle,
  onConfirm,
  isRewardClaimed,
  evaluationData,
  feedbackArray,
}: LevelFinishedModalPayload) => {
  const userHealth = userHp((state) => state.userHp);
  const levelCoinsReward = levelRewardStore((state) => state.coinsReward);
  const levelExpReward = levelRewardStore((state) => state.expReward);
  const { coinSurgeItem } = coinSurge();
  const activeBuffs = activeBuffsLocal((state) => state.activeBuff);
  const [originalRewards] = React.useState({
    coins: levelCoinsReward,
    exp: levelExpReward,
  });
  // Apply doubleCoins buff if active
  useEffect(() => {
    if (!activeBuffs.includes("doubleCoins")) return;
    coinSurgeItem();
    activeBuffsLocal.getState().clearActiveBuff();
  }, [activeBuffs]);

  // Give reward if not claimed
  useEffect(() => {
    if (isRewardClaimed) return;

    const giveReward = async () => {
      const uid = auth?.currentUser?.uid;
      if (!uid) return;

      const userRef = doc(db, "Users", uid);
      const userSnapShot = (await getDoc(userRef)).data();

      await updateDoc(userRef, {
        exp: (userSnapShot?.exp || 0) + levelExpReward,
        coins: (userSnapShot?.coins || 0) + levelCoinsReward,
      });
    };

    userHp.getState().resetUserHp();
    giveReward();
  }, [isRewardClaimed, levelCoinsReward, levelExpReward]);

  const nextLevelPayload = unlockNextLevel((state) => state.nextLevelPayload);
  const nextLessonPayload = unlockNextLevel((state) => state.nextLessonPayload);
  const finishedTopics = unlockNextLevel((state) => state.finishedTopics);
  const shouldShowContinue =
    (nextLevelPayload || nextLessonPayload) &&
    !finishedTopics[
      nextLevelPayload?.category || nextLessonPayload?.category || ""
    ];

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
          style={[scaleStyle, { maxHeight: "85%" }]} // maxHeight prevents overflow
          className="w-3/4 m-auto rounded-[10px] bg-modal border-[#2a3141] border-[1px]"
        >
          <Text className="text-center text-[#f5ff42] font-exoExtraBold text-3xl mt-2">
            LEVEL COMPLETED
          </Text>

          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="mt-2 border-t border-[#2a3141]">
              <Text className="text-white text-center font-exoBold xs:text-xl mt-2">
                PERFORMANCE SUMMARY
              </Text>

              <View className="mt-3">
                {isRewardClaimed ? (
                  <Text className="text-white text-center font-exoBold xs:text-xs">
                    You've already claimed the reward for this level!
                  </Text>
                ) : !evaluationData ? (
                  <SmallLoading text="Getting your performance summary" />
                ) : (
                  <View>
                    {/* Reward summary */}
                    <View className="bg-[#080c15] m-3 py-3 rounded-lg">
                      <Text className="text-white text-center font-exoBold xs:text-xs">
                        Lives Remaining:{" "}
                        <Text className="text-[#ad3532]">
                          {userHealth - 1}x
                        </Text>
                      </Text>
                      <Text className="text-white text-center font-exoBold xs:text-xs">
                        DevCoins:{" "}
                        <Text className="text-[#e3be00]">
                          +{originalRewards.coins} → {levelCoinsReward}
                        </Text>
                      </Text>
                      <Text className="text-white text-center font-exoBold xs:text-xs">
                        Experience gained:{" "}
                        <Text className="text-[#21b3cf]">
                          + {originalRewards.exp} → {levelExpReward}
                        </Text>
                      </Text>
                    </View>

                    {/* Feedback */}
                    {feedbackArray && (
                      <View className="bg-[#080c15] mx-3 py-3 rounded-lg">
                        <Text className="text-white text-center font-exoBold xs:text-xs px-2">
                          Last Stage Feedback
                        </Text>
                        <Text className="text-white text-justify font-exoLight xs:text-[8px] px-2 opacity-65 mt-1">
                          {feedbackArray.feedback}
                        </Text>
                      </View>
                    )}

                    {/* Encouragement */}
                    <View className="bg-[#080c15] mx-3 py-3 rounded-lg mt-2">
                      <Text className="text-white text-center font-exoBold xs:text-xs px-2">
                        {evaluationData.encouragement}
                      </Text>
                    </View>

                    {/* Accordion for detailed evaluation */}
                    {Object.entries(evaluationData).map(
                      ([key, value]: [string, any]) => {
                        if (!value || key === "encouragement") return null;
                        return (
                          <Accordion header={key} contents={value} key={key} />
                        );
                      }
                    )}
                  </View>
                )}
              </View>
            </View>
          </ScrollView>

          {/* Buttons */}
          <View className="flex-row justify-evenly items-center mb-4 mt-2">
            <TouchableOpacity onPress={onConfirm}>
              <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px] bg-[#7F5AF0] rounded-2xl">
                Back to Main
              </Text>
            </TouchableOpacity>

            {shouldShowContinue && (
              <TouchableOpacity
                onPress={() => {
                  const target = nextLevelPayload ?? nextLessonPayload;
                  if (!target)
                    return console.log("Next lesson/level not found!");
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
                <Text className="text-white py-2 px-7 font-exoBold self-start xs:text-[8px] bg-yellow-500 rounded-2xl">
                  Continue
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default LevelFinishedModal;

const styles = StyleSheet.create({});
