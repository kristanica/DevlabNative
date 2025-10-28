import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type SelectLanguageNavigationProps = {
  subject: string;
  sendToWebView: (val: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const SelectLanguageNavigation = ({
  sendToWebView,
  selectedLanguage,
  setSelectedLanguage,
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
      {visibleButton.map((val: string, index: number) => {
        const isSelected = val === selectedLanguage;
        return (
          <TouchableOpacity
            key={index}
            // The actual switching of the language
            onPress={() => {
              setSelectedLanguage(val);
              console.log(val);
              sendToWebView(val.toLowerCase());
            }}
            disabled={isSelected}
          >
            <Text
              className={`
              
              ${
                isSelected
                  ? "bg-[#2563EB] text-white"
                  : "bg-[#1F2937] text-gray-300"
              }
                py-2 px-4 mx-2 rounded-2xl ${
                  isSelected ? "scale-100" : "scale-90"
                }  text-white font-exoBold`}
            >
              {val.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default SelectLanguageNavigation;
