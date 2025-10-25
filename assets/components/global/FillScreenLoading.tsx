import { devlabEvalLines } from "@/constants";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SmallLoading from "./SmallLoading";

type FillScreenLoadingProps = {
  text?: string;
  showBoot?: boolean;
};
const FillScreenLoading = ({ text, showBoot }: FillScreenLoadingProps) => {
  const [bootText, setBootText] = useState<string>("Setting up the Model...");
  useEffect(() => {
    if (!showBoot) return;
    let i: number = 0;

    const interval = setInterval(() => {
      if (i < devlabEvalLines.length) {
        setBootText(devlabEvalLines[i]);
        return i++;
      } else {
        clearInterval(interval);
        return i;
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <View
      style={[StyleSheet.absoluteFillObject]}
      className="absolute flex-1 bg-black/20 w-full h-full justify-center items-center z-50"
    >
      <SmallLoading text={text}></SmallLoading>
      {showBoot && (
        <Text className="text-white  text-lg xs:text-[10px] font-exoBold">
          {bootText}
        </Text>
      )}
    </View>
  );
};

export default FillScreenLoading;
