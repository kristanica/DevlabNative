import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import SelectLanguageNavigation from "@/assets/components/LanguageNavigation/SelectLanguageNavigation";
import ViteCodeEditor from "@/assets/components/LanguageNavigation/ViteCodeEditor";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import useCodeEditor from "@/assets/Hooks/useCodeEditor";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const sample = () => {
  const {
    webRef,
    sendToWebView,
    receivedCode,
    setReceivedCode,
    logs,
    setLogs,
  } = useCodeEditor();
  return (
    <ProtectedRoutes>
      <View className="bg-accent flex-[1] rounded-[10px] z-0">
        <CustomGeneralContainer>
          <View className="justify-between flex-row">
            <Pressable onPress={() => router.replace("/home/Home")}>
              <Text className="text-white ml-3 text-2xl font-exoExtraBold">
                DEVLAB
              </Text>
            </Pressable>
            <SelectLanguageNavigation
              isCss={true}
              isHtml={true}
              isJs={true}
              sendToWebView={sendToWebView}
            ></SelectLanguageNavigation>
          </View>

          <ViteCodeEditor
            logs={logs}
            setLogs={setLogs}
            webRef={webRef}
            receivedCode={receivedCode}
            setReceivedCode={setReceivedCode}
          ></ViteCodeEditor>
        </CustomGeneralContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default sample;

const styles = StyleSheet.create({});
