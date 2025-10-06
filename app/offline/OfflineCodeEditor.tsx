import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import SelectLanguageNavigation from "@/assets/components/LanguageNavigation/SelectLanguageNavigation";
import ViteCodeEditor from "@/assets/components/LanguageNavigation/ViteCodeEditor";

import useCodeEditor from "@/assets/Hooks/useCodeEditor";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const OfflineCodeEditor = () => {
  const {
    webRef,
    sendToWebView,
    receivedCode,
    setReceivedCode,
    logs,
    setLogs,
    terminalRef,
  } = useCodeEditor();
  return (
    <View className="bg-accent flex-[1] rounded-[10px] z-0">
      <CustomGeneralContainer>
        <View className="justify-between flex-row">
          <Pressable
            onPress={() => router.push({ pathname: "/offline/OfflineScreen" })}
          >
            <Text className="text-white ml-3 text-2xl font-exoExtraBold">
              DEVLAB
            </Text>
          </Pressable>
          <SelectLanguageNavigation
            subject=""
            sendToWebView={sendToWebView}
          ></SelectLanguageNavigation>
        </View>

        <ViteCodeEditor
          terminalRef={terminalRef}
          webRef={webRef}
          receivedCode={receivedCode}
          setReceivedCode={setReceivedCode}
          logs={logs}
          setLogs={setLogs}
        ></ViteCodeEditor>
      </CustomGeneralContainer>
    </View>
  );
};

export default OfflineCodeEditor;

const styles = StyleSheet.create({});
