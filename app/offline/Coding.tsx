import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import SelectLanguageNavigation from "@/assets/components/LanguageNavigation/SelectLanguageNavigation";
import useCodeEditor from "@/assets/Hooks/useCodeEditor";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CodingPlaygroundEditor from "../../assets/deprecated/CodingPlaygroundEditor";

const Coding = () => {
  const { webRef, sendToWebView, receivedCode, setReceivedCode } =
    useCodeEditor();
  return (
    <View className="bg-background flex-[1]">
      <CustomGeneralContainer>
        <View className="flex-row justify-between">
          <Pressable onPress={() => router.replace("/home/Home")}>
            <Text className="text-white ml-3 text-2xl font-exoExtraBold">
              DEVLAB
            </Text>
          </Pressable>
          <Pressable className="justify-center">
            <Text className="text-white mr-3 text-sm font-exoExtraBold">
              Database playground
            </Text>
          </Pressable>
        </View>
        <View className="justify-center items-center">
          <SelectLanguageNavigation
            sendToWebView={sendToWebView}
            subject=""
          ></SelectLanguageNavigation>
        </View>
        <CodingPlaygroundEditor
          webRef={webRef}
          receivedCode={receivedCode}
          setReceivedCode={setReceivedCode}
        ></CodingPlaygroundEditor>
      </CustomGeneralContainer>
    </View>
  );
};

export default Coding;

const styles = StyleSheet.create({});
