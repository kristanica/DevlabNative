import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ViteDatabaseCodeEditor from "@/assets/components/LanguageNavigation/ViteDatabaseCodeEditor";
import { useCodeEditorDatabase } from "@/assets/Hooks/useCodeEditorDatabase";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Renders the offline code editor for devlab
const OfflineDatabaseCodeEditor = () => {
  //Neceassry variables for database
  const databaseQueryingFunctions = useCodeEditorDatabase();
  return (
    <View className="bg-background flex-[1]">
      <CustomGeneralContainer>
        <Pressable
          onPress={() => router.push({ pathname: "/offline/OfflineScreen" })}
        >
          <Text className="text-white ml-3 text-2xl font-exoExtraBold">
            DEVLAB
          </Text>
        </Pressable>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flex: 1,
          }}
          enableOnAndroid
          extraScrollHeight={20}
          keyboardShouldPersistTaps="handled"
        >
          <ViteDatabaseCodeEditor
            isOffline={true}
            {...databaseQueryingFunctions}
          ></ViteDatabaseCodeEditor>
        </KeyboardAwareScrollView>
      </CustomGeneralContainer>
    </View>
  );
};

export default OfflineDatabaseCodeEditor;
