import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import SelectLanguageNavigation from "@/assets/components/LanguageNavigation/SelectLanguageNavigation";
import ViteCodeEditor from "@/assets/components/LanguageNavigation/ViteCodeEditor";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import useCodeEditor from "@/assets/Hooks/useCodeEditor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Renders the online code editor
const CodingPlayground = () => {
  //Neceassry variables for code editor
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Html");
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
      <View
        className="bg-background flex-[1] rounded-[10px]"
        style={{ position: "relative", zIndex: 1 }}
      >
        <CustomGeneralContainer>
          <View className="justify-between flex-row my-5 items-center">
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
            {/* Language selector Html/Css/Js */}
            <SelectLanguageNavigation
              setSelectedLanguage={setSelectedLanguage}
              selectedLanguage={selectedLanguage}
              subject=""
              sendToWebView={sendToWebView}
            ></SelectLanguageNavigation>
          </View>
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flex: 1,
            }}
            enableOnAndroid
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
          >
            <ViteCodeEditor
              isOffline={false}
              terminalRef={terminalRef}
              logs={logs}
              setLogs={setLogs}
              webRef={webRef}
              receivedCode={receivedCode}
              setReceivedCode={setReceivedCode}
            ></ViteCodeEditor>
          </KeyboardAwareScrollView>
        </CustomGeneralContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default CodingPlayground;
