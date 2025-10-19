import { activeBuffsLocal } from "@/assets/Hooks/function/activeBuffsLocal";
import codePatchTimeFreeze from "@/assets/Hooks/mainGameModeFunctions/codePatchTimeFreeze";
import useModal from "@/assets/Hooks/useModal";
import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import React, { useCallback, useEffect } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CodeRushModal from "../Modals/CodeRushModal";

const StageCodeRush = ({
  currentStageData,
  setCurrentStageIndex,
  lessonId,
  category,
  stageId,
  levelId,
}: any) => {
  const { timer, codePatch, timeFreeze } = codePatchTimeFreeze(
    currentStageData?.timer!,
    setCurrentStageIndex,
    lessonId,
    category,
    stageId,
    levelId
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
          {currentStageData?.codingInterface && (
            <ScrollView
              className=" flex-[1] m-3 "
              horizontal={true}
              pagingEnabled
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              alwaysBounceVertical={false}
            >
              <View className=" h-[200px] w-[290px]">
                <TouchableOpacity
                  className="absolute right-0 bottom-0"
                  onPress={async () => {
                    await Clipboard.setStringAsync(
                      currentStageData?.codingInterface.html! ||
                        "HTML code  is not provided"
                    );
                  }}
                >
                  <Ionicons
                    name="clipboard-outline"
                    size={20}
                    color={"white"}
                  ></Ionicons>
                </TouchableOpacity>
                <Text className="text-white font-exoRegular xs:text-xs text-justify">
                  {currentStageData?.codingInterface?.html}
                </Text>
              </View>
              <View className="bg-background h-[200px] w-[320px]">
                <TouchableOpacity
                  className="absolute right-0 bottom-0"
                  onPress={async () => {
                    await Clipboard.setStringAsync(
                      currentStageData?.codingInterface.css!
                    );
                  }}
                >
                  <Ionicons
                    name="clipboard-outline"
                    size={20}
                    color={"white"}
                  ></Ionicons>
                </TouchableOpacity>
                <Text className="text-white font-exoRegular xs:text-xs text-justify">
                  {currentStageData?.codingInterface?.css ||
                    "Css code is not provided"}
                </Text>
              </View>
              <View className="bg-background h-[200px] w-[290px] relative">
                <TouchableOpacity
                  className="absolute right-0 bottom-0"
                  onPress={async () => {
                    await Clipboard.setStringAsync(
                      currentStageData?.codingInterface.js! ||
                        "JavaScript code  is not provided"
                    );
                  }}
                >
                  <Ionicons
                    name="clipboard-outline"
                    size={20}
                    color={"white"}
                  ></Ionicons>
                </TouchableOpacity>
                <Text className="text-white font-exoRegular xs:text-xs text-justify">
                  {currentStageData?.codingInterface?.js}
                </Text>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
};

export default React.memo(StageCodeRush);
