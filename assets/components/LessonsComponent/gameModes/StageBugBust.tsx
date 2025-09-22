import { activeBuffsLocal } from "@/assets/Hooks/function/activeBuffsLocal";
import codeWhisper from "@/assets/Hooks/mainGameModeFunctions/globalItems/codeWhisper";
import useModal from "@/assets/Hooks/useModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import HintModal from "../Modals/HintModal";
type NavigatingStageProps = {
  currentStageData: any;
};
const StageBugBust = ({ currentStageData }: NavigatingStageProps) => {
  const hintModal = useModal();

  const activeBuffs = activeBuffsLocal((state) => state.activeBuff);
  const removeActiveBuff = activeBuffsLocal((state) => state.removeActiveBuff);

  const { codeWhisperItem } = codeWhisper(hintModal.setVisibility);
  useEffect(() => {
    const run = async () => {
      const useItem = async (itemName: string, useThisItem: () => any) => {
        useThisItem();
        removeActiveBuff(itemName);
      };
      if (activeBuffs.includes("revealHint")) {
        await useItem("revealHint", codeWhisperItem);
      }
    };
    run();
  }, [activeBuffs]);

  return (
    <>
      <HintModal
        onConfirm={() => hintModal.closeModal()}
        {...hintModal}
      ></HintModal>
      <Text className="text-red-500 font-exoBold xs:text-xl text-justify">
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
        <TouchableOpacity
          onPress={async () => {
            await Clipboard.setStringAsync(currentStageData.codingInterface);
            console.log("Copied to clipboard!");
          }}
          className="absolute right-5 top-5 w-8 h-8 justify-center items-center"
        >
          <Ionicons name="clipboard" color="white" size={20} />
        </TouchableOpacity>
        <View className="bg-background p-3  my-3 relative">
          <Text className="text-white font-exoRegular xs:text-xs text-justify">
            {currentStageData.codingInterface}
          </Text>
        </View>
      </View>
    </>
  );
};

export default React.memo(StageBugBust);
