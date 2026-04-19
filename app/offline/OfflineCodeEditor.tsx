import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import CodeLanguageSelector from "@/assets/components/Offline/CodeLanguageSelector";

import LocalViteCodeEditor from "@/assets/components/Offline/LocalViteCodeEditor";

import useCodeEditor from "@/assets/Hooks/useCodeEditor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// Renders the offline code editor
const OfflineCodeEditor = () => {
  //Neceassry variables for code editor
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Html");
  const { logs, setLogs, terminalRef } = useCodeEditor();

  // shows/hide terminal
  const handleExpandTerminal = useCallback(() => {
    terminalRef.current?.expand();
  }, []);

  return (
    <View className="bg-background flex-[1] rounded-[10px] z-0">
      <CustomGeneralContainer>
        <View className="justify-between flex-row my-5 items-center">
          <Pressable
            onPress={() => router.push({ pathname: "/offline/OfflineScreen" })}
          >
            <Text className="text-white ml-3 text-2xl font-exoExtraBold">
              DEVLAB
            </Text>
          </Pressable>
          <Pressable onPress={handleExpandTerminal}>
            <Ionicons name="terminal" size={20} color="white" />
          </Pressable>
          <CodeLanguageSelector
            subject={""}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          ></CodeLanguageSelector>
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flex: 1,
          }}
          enableOnAndroid
          extraScrollHeight={20}
          keyboardShouldPersistTaps="handled"
        >
          <LocalViteCodeEditor
            logs={logs}
            setLogs={setLogs}
            terminalRef={terminalRef}
            selectedLanguage={selectedLanguage}
          ></LocalViteCodeEditor>
        </KeyboardAwareScrollView>
      </CustomGeneralContainer>
    </View>
  );
};

export default OfflineCodeEditor;
