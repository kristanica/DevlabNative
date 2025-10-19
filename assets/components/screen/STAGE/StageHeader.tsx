import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import SelectLanguageNavigation from "../../LanguageNavigation/SelectLanguageNavigation";
type StageHeaderProps = {
  handleBackPress: () => void;
  handleExpandTerminal: () => void;
  category: string;
  sendToWebView: (lang: string) => void;
};
export const StageHeader = ({
  handleBackPress,
  handleExpandTerminal,
  category,
  sendToWebView,
}: StageHeaderProps) => {
  return (
    <View className="flex-row justify-between items-center mb-5">
      <Pressable onPress={handleBackPress}>
        <Text className="font-exoBold text-white px-5 py-2 mx-3 bg-shopAccent rounded-3xl">
          Back
        </Text>
      </Pressable>

      {category !== "Database" && category === "JavaScript" && (
        <>
          <Pressable onPress={handleExpandTerminal}>
            <Ionicons name="terminal" size={20} color="white" />
          </Pressable>
          <SelectLanguageNavigation
            subject={String(category)}
            sendToWebView={sendToWebView}
          />
        </>
      )}
    </View>
  );
};
