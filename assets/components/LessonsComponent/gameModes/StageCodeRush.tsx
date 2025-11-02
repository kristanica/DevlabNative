import { activeBuffsLocal } from "@/assets/Hooks/function/activeBuffsLocal";
import codePatchTimeFreeze from "@/assets/Hooks/mainGameModeFunctions/codePatchTimeFreeze";
import useModal from "@/assets/Hooks/useModal";
import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Accordion from "../../global/Accordion";
import CodeRushModal from "../Modals/CodeRushModal";

const StageCodeRush = ({
  currentStageData,
  setCurrentStageIndex,
  lessonId,
  category,
  stageId,
  levelId,
}: any) => {
  const [isFreezed, setIsFreezed] = useState<boolean>(false);
  const { timer, codePatch, timeFreeze } = codePatchTimeFreeze(
    currentStageData?.timer!,
    setCurrentStageIndex,
    lessonId,
    category,
    stageId,
    levelId,
    isFreezed,
    setIsFreezed
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
  }, [activeBuffs]);
  const codeRush = useModal();

  return (
    <>
      <Pressable
        className="absolute right-5 z-50"
        onPress={() => codeRush.setVisibility((prev) => !prev)}
      >
        <Ionicons
          name={"information-circle"}
          size={20}
          color={"white"}
        ></Ionicons>
      </Pressable>
      {codeRush.visibility && <CodeRushModal {...codeRush}></CodeRushModal>}
      <View className="flex-row items-center  pr-10">
        <Text className="font-exoBold xs:text-xl  text-red-500">
          {currentStageData?.title}
        </Text>

        <Text
          className={`${
            isFreezed
              ? "text-blue-600 font-exoExtraBold"
              : "text-white font-exoRegular"
          } xs:text-xl my-3 text-justify absolute right-0`}
        >
          {formatTimer(Number(timer))}
        </Text>
      </View>

      <Text className="text-white font-exoRegular xs:text-xs my-3 text-justify">
        {currentStageData?.description}
      </Text>

      <View className="bg-accentContainer p-3 rounded-xl my-3 ">
        <Text className="font-exoBold text-xl text-white">Instructions</Text>
        <Text className="text-white font-exoRegular xs:text-xs text-justify my-3">
          {currentStageData?.instruction}
        </Text>
        <View className="p-3 rounded-3xl my-3">
          {currentStageData?.codingInterface &&
            Object.entries(currentStageData.codingInterface).map(
              ([key, value]: any) => {
                if (!value) return;
                return <Accordion header={key} contents={value!} key={key} />;
              }
            )}
        </View>
      </View>
    </>
  );
};

export default React.memo(StageCodeRush);
