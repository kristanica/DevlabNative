import { activeBuffsLocal } from "@/assets/Hooks/function/activeBuffsLocal";
import codePatchTimeFreeze from "@/assets/Hooks/mainGameModeFunctions/codePatchTimeFreeze";
import { WhereIsUser } from "@/assets/zustand/WhereIsUser";

import React, { useCallback, useEffect } from "react";
import { Text, View } from "react-native";

const StageCodeRush = ({ currentStageData }: any) => {
  const { timer, codePatch, timeFreeze } = codePatchTimeFreeze(
    currentStageData?.timer
  );

  const removeActiveBuff = activeBuffsLocal((state) => state.removeActiveBuff);
  const activeBuffs = activeBuffsLocal((state) => state.activeBuff);

  const formatTimer = useCallback(
    (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
        2,
        "0"
      )}`;
    },
    [currentStageData]
  );
  const location = WhereIsUser((state) => state.location);
  console.log(location);
  useEffect(() => {
    const run = async () => {
      const useItem = async (itemName: string, useThisItem: () => any) => {
        useThisItem();
        removeActiveBuff(itemName);
      };
      if (activeBuffs.includes("timeFreeze")) {
        await useItem("timeFreeze", timeFreeze);
      }
      if (activeBuffs.includes("extraTime")) {
        await useItem("extraTime", codePatch);
      }
    };
    run();
    console.log("ASDSAHGDASDGJH");
  }, [activeBuffs]);

  return (
    <>
      <View className="flex-row items-center justify-between pr-10">
        <Text className="font-exoBold xs:text-xl text-justify text-red-500">
          {currentStageData?.title}
        </Text>

        <Text className="text-white font-exoRegular xs:text-xl my-3 text-justify">
          {formatTimer(Number(timer))}
        </Text>
      </View>

      <Text className="text-white font-exoRegular xs:text-xs my-3 text-justify">
        {currentStageData?.description}
      </Text>

      <View className="bg-accentContainer p-3 rounded-3xl my-3">
        <Text className="font-exoBold text-xl text-white">Instructions</Text>
        <Text className="text-white font-exoRegular xs:text-xs text-justify my-3">
          {currentStageData?.instruction}
        </Text>
        <View className="bg-background p-3 rounded-3xl my-3">
          <Text className="text-white font-exoRegular xs:text-xs text-justify">
            {currentStageData?.codingInterface}
          </Text>
        </View>
      </View>
    </>
  );
};

export default React.memo(StageCodeRush);
