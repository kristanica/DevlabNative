import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type SelectLanguageNavigationProps = {
  subject: string;
  sendToWebView: (val: string) => void;
};

const SelectLanguageNavigation = ({
  sendToWebView,

  subject,
}: SelectLanguageNavigationProps) => {
  let visibleButton: string[] = [];

  // Buttons to be displayed (for switching languages) depending on the subject
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
      visibleButton = ["Html", "Css", "Js"];
  }

  return (
    <View className="flex-row">
      {visibleButton.map((val: string, index: number) => (
        <TouchableOpacity
          key={index}
          // The actual switching of the language
          onPress={() => sendToWebView(val.toLowerCase())}
        >
          <Text className="py-2 px-4 mx-2 rounded-2xl bg-shopAccent text-white font-exoBold">
            {val.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default SelectLanguageNavigation;
