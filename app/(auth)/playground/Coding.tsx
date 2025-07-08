import CodingPlaygroundEditor from "@/assets/components/CodeEditor/CodingPlaygroundEditor";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import SelectLanguageNavigation from "@/assets/components/LanguageNavigation/SelectLanguageNavigation";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const Coding = () => {
  const [recievedCode, setRecievedCode] = useState<{
    html?: string;
    css?: string;
    js?: string;
  }>();

  const webRef = useRef<WebView>(null);

  const sendToWebView = (lang: string) => {
    webRef.current?.postMessage(lang);
    console.log(lang);
  };

  return (
    <ProtectedRoutes>
      <View className="bg-background flex-[1]">
        <CustomGeneralContainer>
          <View className="flex-row justify-between">
            <Pressable onPress={() => router.replace("/(auth)/home/Home")}>
              <Text className="text-white ml-3 text-2xl font-exoExtraBold">
                DEVLAB
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.replace("/(auth)/playground/Database")}
              className="justify-center"
            >
              <Text className="text-white mr-3 text-sm font-exoExtraBold">
                Database playground
              </Text>
            </Pressable>
          </View>
          <View className="justify-center items-center">
            <SelectLanguageNavigation
              sendToWebView={sendToWebView}
              isCss={true}
              isJs={true}
              isHtml={true}
            ></SelectLanguageNavigation>
          </View>
          <CodingPlaygroundEditor webRef={webRef}></CodingPlaygroundEditor>
        </CustomGeneralContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default Coding;

const styles = StyleSheet.create({});
