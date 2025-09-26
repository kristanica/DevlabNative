import React from "react";
import { Pressable, Text, View } from "react-native";

type SelectLanguageNavigationProps = {
  isCss: boolean;
  isJs: boolean;
  isHtml: boolean;

  sendToWebView: (val: string) => void;
};

const SelectLanguageNavigation = ({
  isCss,
  isJs,
  isHtml,
  sendToWebView,
}: SelectLanguageNavigationProps) => {
  const visibleButton = ["Html", "Css", "Js"].filter((lang) => {
    if (lang === "Html" && isHtml) return "Html";
    if (lang === "Css" && isCss) return "Css";
    if (lang === "Js" && isJs) return "Js";
    return false;
  });

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
