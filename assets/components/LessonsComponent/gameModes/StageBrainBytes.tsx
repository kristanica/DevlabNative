import { activeBuffsLocal } from "@/assets/Hooks/function/activeBuffsLocal";
import brainFilter from "@/assets/Hooks/mainGameModeFunctions/brainFilter";
import useModal from "@/assets/Hooks/useModal";
import { useBrainBytesStore } from "@/assets/zustand/useBrainBytesStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { Suspense, useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import RenderCounter from "../../global/RenderCounter";
import SmallLoading from "../../global/SmallLoading";

const BrainBytesModal = React.lazy(() => import("../Modals/BrainBytesModal"));
const StageBrainBytes = ({
  currentStageData,
  lessonId,
  category,
  levelId,
  stageId,
  setCurrentStageIndex,
  levelFinishedModal,
  finalAnswerModal,
}: any) => {
  const { compareUserAnswer, brainFilterItem, optionsArray } = brainFilter(
    currentStageData?.choices!,
    setCurrentStageIndex,
    lessonId,
    category,
    stageId,
    levelId,
    levelFinishedModal
  );
  const [answer, setAnswer] = useState<string>("");
  RenderCounter("StageBrainBytes");

  const [displayChoices, setDisplayChoices] = useState<any>(optionsArray || []);
  const activeBuff = activeBuffsLocal((state) => state.activeBuff);
  useEffect(() => {
    const itemUse = async () => {
      if (!activeBuff.includes("brainFilter")) return;
      const filtered = brainFilterItem();
      setDisplayChoices(filtered);
      console.log(filtered);
    };
    itemUse();
  }, [activeBuff]);

  const brainBytes = useModal();

  const setUserAnswer = useBrainBytesStore((state) => state.setUserAnswer);
  const userAnswer = useBrainBytesStore((state) => state.userAnswer);
  const setCorrectAnswer = useBrainBytesStore(
    (state) => state.setCorrectAnswer
  );
  useEffect(() => {
    if (currentStageData?.choices?.correctAnswer) {
      setCorrectAnswer(currentStageData.choices.correctAnswer);
    }
  }, [currentStageData?.choices?.correctAnswer]);

  return (
    <>
      <Pressable
        className="absolute right-5 z-50"
        onPress={() => brainBytes.setVisibility((prev) => !prev)}
      >
        <Ionicons
          name={"information-circle"}
          size={20}
          color={"white"}
        ></Ionicons>
      </Pressable>

      {brainBytes.visibility && (
        <Suspense fallback={<SmallLoading></SmallLoading>}>
          <BrainBytesModal {...brainBytes} />
        </Suspense>
      )}

      <Text className="font-exoBold xs:text-xl text-justify text-red-500">
        {currentStageData?.title}
      </Text>

      <Text className="text-white font-exoRegular xs:text-xs my-3 text-justify">
        {currentStageData?.description}
      </Text>
      <View className="bg-accentContainer p-3 rounded-3xl my-3">
        <Text className="font-exoBold text-xl text-white">Instructions</Text>
        <Text className="text-white font-exoRegular xs:text-xs text-justify my-3">
          {currentStageData?.instruction}
        </Text>
        <View className="bg-background p-3 rounded-3xl my-3">
          {displayChoices &&
            displayChoices.map(([key, choice]: any, index: any) => (
              <View key={index} className="flex flex-row relative">
                <TouchableOpacity onPress={() => setUserAnswer(key)}>
                  <Text className="py-2  text-white font-exoRegular text-xs xs:text-[9px] text-justify">
                    {key.toLocaleUpperCase()}. {choice}
                  </Text>
                </TouchableOpacity>
                {userAnswer === key && (
                  <View
                    style={{
                      marginVertical: "auto",
                      marginRight: 100,
                      height: 8,
                      width: 8,
                      position: "absolute",
                      right: 0,
                      bottom: 9,
                      borderRadius: 5,
                      backgroundColor: "green",
                    }}
                  />
                )}
              </View>
            ))}
        </View>
        <TouchableOpacity
          className="mx-auto bg-button  rounded-xl "
          onPress={() => finalAnswerModal.setVisibility(true)}
        >
          <Text className=" text-xs xs:text-[10px] py-2 px-6 font-exoBold text-white">
            Final Answer
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default React.memo(StageBrainBytes);
