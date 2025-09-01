import { auth, db } from "@/assets/constants/constants";
import brainBytes from "@/assets/Hooks/mainGameModeFunctions/brainBytes";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
type StageLessonprops = {
  currentStageData: any;
};
const StageBrainBytes = ({ currentStageData }: any) => {
  const { compareUserAnswer, arrayChoices, brainFilter } = brainBytes(
    currentStageData?.choices
  );
  const [displayChoices, setDisplayChoices] = useState<any>(arrayChoices || []);
  const itemUse = async () => {
    const filtered = await brainFilter();
    setDisplayChoices(filtered);
    const userRef = doc(db, "Users", String(auth?.currentUser?.uid));
    await updateDoc(userRef, {
      activeBuffs: arrayRemove("brainFilter"),
    }).catch(console.error);
  };

  return (
    <>
      <TouchableOpacity onPress={() => itemUse()}>
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

export default StageBrainBytes;

const styles = StyleSheet.create({});
