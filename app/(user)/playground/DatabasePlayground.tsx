import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ViteDatabaseCodeEditor from "@/assets/components/LanguageNavigation/ViteDatabaseCodeEditor";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { useCodeEditorDatabase } from "@/assets/Hooks/useCodeEditorDatabase";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const DatabasePlayground = () => {
  const databaseQueryingFunctions = useCodeEditorDatabase();
  return (
    <ProtectedRoutes>
      <View className="bg-background flex-[1]">
        <CustomGeneralContainer>
          <Pressable onPress={() => router.push({ pathname: "/home/Home" })}>
            <Text className="text-white ml-3 text-2xl font-exoExtraBold">
              DEVLAB
            </Text>
          </Pressable>
          <ViteDatabaseCodeEditor
            {...databaseQueryingFunctions}
          ></ViteDatabaseCodeEditor>
        </CustomGeneralContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default DatabasePlayground;
