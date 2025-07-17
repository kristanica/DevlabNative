import ButtonAnimated from "@/assets/components/ButtonComponent";
import CodingPlaygroundEditor from "@/assets/components/CodeEditor/CodingPlaygroundEditor";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import SelectLanguageNavigation from "@/assets/components/LanguageNavigation/SelectLanguageNavigation";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import useCodeEditor from "@/assets/Hooks/useCodeEditor";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EditorView = () => {
  const { webRef, sendToWebView } = useCodeEditor();

  return (
    <ProtectedRoutes>
      <View className="flex-[1] bg-accent">
        <CustomGeneralContainer>
          <View className="flex-row justify-between items-center">
            <ButtonAnimated onPressAction={() => router.back()}>
              <Text className="font-exoBold text-white px-5 py-2 mx-3 bg-shopAccent rounded-3xl">
                Back
              </Text>
            </ButtonAnimated>
            <SelectLanguageNavigation
              isJs={false}
              isCss={false}
              isHtml={true}
              sendToWebView={sendToWebView}
            />
          </View>

          <CodingPlaygroundEditor webRef={webRef}></CodingPlaygroundEditor>
        </CustomGeneralContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default EditorView;

const styles = StyleSheet.create({});
