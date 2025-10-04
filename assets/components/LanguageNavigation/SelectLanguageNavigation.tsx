import React from "react";
import { Pressable, Text, View } from "react-native";

type SelectLanguageNavigationProps = {
  subject: string;
  sendToWebView: (val: string) => void;
};

const SelectLanguageNavigation = ({
  sendToWebView,

  subject,
}: SelectLanguageNavigationProps) => {
  let visibleButton: string[] = [];

  switch (subject) {
    case "Html":
      visibleButton = ["Html"];
      break;
    case "Css":
      visibleButton = ["Html", "Css"];
      break;
    case "JavaScript":
      visibleButton = ["Html", "Css", "Js"];
      break;
    default:
      visibleButton = ["Html", "Css", "Js"]; // or whatever you want for Database/Playground
  }

  return (
    <View className="flex-row">
      {visibleButton.map((val: string, index: number) => (
        <Pressable key={index} onPress={() => sendToWebView(val.toLowerCase())}>
          <Text className="py-2 px-4 mx-2 rounded-2xl bg-shopAccent text-white font-exoBold">
            {val.toUpperCase()}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
export default SelectLanguageNavigation;
