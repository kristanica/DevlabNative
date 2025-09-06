import { activeBuffsLocal } from "@/assets/Hooks/function/activeBuffsLocal";
import codeWhisper from "@/assets/Hooks/mainGameModeFunctions/globalItems/codeWhisper";
import useModal from "@/assets/Hooks/useModal";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
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
        <View className="bg-background p-3 rounded-3xl my-3">
          <Text className="text-white font-exoRegular xs:text-xs text-justify">
            {currentStageData?.hint}
          </Text>
        </View>
      </View>
    </>
  );
};

export default React.memo(StageBugBust);
