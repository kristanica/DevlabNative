import { activeBuffsLocal } from "@/assets/Hooks/function/activeBuffsLocal";
import brainFilter from "@/assets/Hooks/mainGameModeFunctions/brainFilter";
import { useIsMutating } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FillScreenLoading from "../../global/FillScreenLoading";

const StageBrainBytes = ({
  currentStageData,
  lessonId,
  category,
  levelId,
  stageId,
  setCurrentStageIndex,
}: any) => {
  console.log(lessonId, stageId, lessonId, category, levelId);
  const { compareUserAnswer, arrayChoices, brainFilterItem } = brainFilter(
    currentStageData?.choices!,
    setCurrentStageIndex,
    lessonId,
    category,
    stageId,
    levelId
  );
  const [answer, setAnswer] = useState<string>("");
  const [displayChoices, setDisplayChoices] = useState<any>(arrayChoices || []);
  const activeBuff = activeBuffsLocal((state) => state.activeBuff);

  useEffect(() => {
    const itemUse = async () => {
      if (!activeBuff.includes("brainFilter")) return;
      const filtered = await brainFilterItem();
      setDisplayChoices(filtered);
    };
    itemUse();
  }, [activeBuff]);
  const isMutating = useIsMutating();
  return (
    <>
      {isMutating > 0 && (
        <FillScreenLoading text="Checking your answer..."></FillScreenLoading>
      )}
      <TouchableOpacity>
        <Text className="font-exoBold xs:text-xl text-justify text-red-500">
          {currentStageData?.title}
        </Text>
      </TouchableOpacity>

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
            displayChoices.map((choice: string, index: number) => (
              <View className="">
                {answer === choice && (
                  <View
                    key={index + 4}
                    style={{
                      marginVertical: "auto",
                      marginRight: 100,
                      height: 8,
                      width: 8,
                      borderRadius: 5,
                      backgroundColor: "#555",
                    }}
                  />
                )}
                <TouchableOpacity key={index} onPress={() => setAnswer(choice)}>
                  <Text className="py-2 text-white font-exoRegular text-xs xs:text-[9px] text-justify ">
                    {choice}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </View>
    </>
  );
};

export default React.memo(StageBrainBytes);
