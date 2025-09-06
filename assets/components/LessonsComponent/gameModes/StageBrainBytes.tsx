import brainBytes from "@/assets/Hooks/mainGameModeFunctions/brainBytes";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const StageBrainBytes = ({ currentStageData }: any) => {
  const { compareUserAnswer, arrayChoices, brainFilter } = brainBytes(
    currentStageData?.choices
  );
  const [displayChoices, setDisplayChoices] = useState<any>(arrayChoices || []);
  const { activeBuffs } = useGetUserInfo();

  useEffect(() => {
    const itemUse = async () => {
      if (!activeBuffs.includes("brainFilter")) return;
      const filtered = await brainFilter();
      setDisplayChoices(filtered);
    };
    itemUse();
  }, [activeBuffs]);

  return (
    <>
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
              <TouchableOpacity
                key={index}
                onPress={() => compareUserAnswer(choice)}
              >
                <Text className="py-2 text-white font-exoRegular xs:text-lg text-justify ">
                  {choice}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </>
  );
};

export default React.memo(StageBrainBytes);
