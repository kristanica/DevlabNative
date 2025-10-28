import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ViteDatabaseCodeEditor from "@/assets/components/LanguageNavigation/ViteDatabaseCodeEditor";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { useCodeEditorDatabase } from "@/assets/Hooks/useCodeEditorDatabase";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Renders the online code editor for devlab
const DatabasePlayground = () => {
  //Neceassry variables for database
  const databaseQueryingFunctions = useCodeEditorDatabase();
  return (
    <ProtectedRoutes>
      <View className="bg-background flex-[1]">
        <CustomGeneralContainer>
          <View className="justify-between flex-row my-5 items-center">
            <Pressable onPress={() => router.replace("/home/Home")}>
              <Text className="text-white ml-3 text-2xl font-exoExtraBold">
                DEVLAB
              </Text>
            </Pressable>
          </View>

          <KeyboardAwareScrollView
            contentContainerStyle={{
              flex: 1,
            }}
            enableOnAndroid
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
          >
            {/* Renders the codeeditor itself */}
            <ViteDatabaseCodeEditor
              isOffline={false}
              {...databaseQueryingFunctions}
            ></ViteDatabaseCodeEditor>
          </KeyboardAwareScrollView>
        </CustomGeneralContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default DatabasePlayground;
