import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ExitPlaygroundModal from "@/assets/components/LanguageNavigation/ExitPlaygroundModal";
import ViteDatabaseCodeEditor from "@/assets/components/LanguageNavigation/ViteDatabaseCodeEditor";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { useCodeEditorDatabase } from "@/assets/Hooks/useCodeEditorDatabase";
import useModal from "@/assets/Hooks/useModal";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Renders the online code editor for devlab
const DatabasePlayground = () => {
  //Neceassry variables for database
  const databaseQueryingFunctions = useCodeEditorDatabase();
  const exitPlaygroundModal = useModal();
  return (
    <ProtectedRoutes>
      <View className="bg-background flex-[1]">
        {exitPlaygroundModal.visibility && (
          <ExitPlaygroundModal
            {...exitPlaygroundModal}
            onConfirm={() => router.replace({ pathname: "/home/Home" })}
          ></ExitPlaygroundModal>
        )}
        <CustomGeneralContainer>
          <View className="justify-between flex-row my-5 items-center">
            <Pressable
              onPress={() => exitPlaygroundModal.setVisibility((prev) => !prev)}
            >
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
