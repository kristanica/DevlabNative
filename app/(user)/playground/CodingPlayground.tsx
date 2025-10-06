import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import SelectLanguageNavigation from "@/assets/components/LanguageNavigation/SelectLanguageNavigation";
import ViteCodeEditor from "@/assets/components/LanguageNavigation/ViteCodeEditor";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import useCodeEditor from "@/assets/Hooks/useCodeEditor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const CodingPlayground = () => {
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
    <ProtectedRoutes>
      <View className="bg-accent flex-[1] rounded-[10px] z-0">
        <CustomGeneralContainer>
          <View className="justify-between flex-row items-center">
            <Pressable onPress={() => router.replace("/home/Home")}>
              <Text className="text-white ml-3 text-2xl font-exoExtraBold">
                DEVLAB
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                terminalRef.current?.expand();
              }}
            >
              <Ionicons name="terminal" size={20} color="white" />
            </Pressable>
            <SelectLanguageNavigation
              subject=""
              sendToWebView={sendToWebView}
            ></SelectLanguageNavigation>
          </View>

          <ViteCodeEditor
            terminalRef={terminalRef}
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

export default CodingPlayground;
