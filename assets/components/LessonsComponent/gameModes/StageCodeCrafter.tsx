import useModal from "@/assets/Hooks/useModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import WebView from "react-native-webview";
import RenderCounter from "../../global/RenderCounter";
import CodeCrafterModal from "../Modals/CodeCrafterModal";

const StageCodeCrafter = ({ currentStageData }: CurrentStageDataPayload) => {
  const [webViewHeight, setWebViewHeight] = useState(0);
  const codeCrafter = useModal();
  RenderCounter("CodeCrafter");

  return (
    <>
      <Pressable
        className="absolute right-5 z-50"
        onPress={() => codeCrafter.setVisibility((prev) => !prev)}
      >
        <Ionicons
          name={"information-circle"}
          size={20}
          color={"white"}
        ></Ionicons>
      </Pressable>
      {codeCrafter.visibility && (
        <CodeCrafterModal {...codeCrafter}></CodeCrafterModal>
      )}
      <Text className="font-exoBold xs:text-xl text-justify text-red-500">
        {currentStageData?.title}
      </Text>
      <Text className="text-white font-exoRegular xs:text-xs my-3 text-justify">
        {currentStageData?.description}
      </Text>
      <View className="bg-accentContainer p-3 rounded-3xl my-3">
        <Text className="font-exoBold text-xl text-white">Instructions</Text>
        <Text className="text-white font-exoRegular xs:text-xs text-justify my-3">
          {currentStageData?.instruction}
        </Text>

        {currentStageData.replicationFile && (
          <View style={{ height: 300, marginVertical: 10 }}>
            <WebView
              injectedJavaScript={`
      setTimeout(() => {
        window.ReactNativeWebView.postMessage(document.body.scrollHeight);
      }, 500);
      true;
    `}
              onMessage={(event) =>
                setWebViewHeight(Number(event.nativeEvent.data))
              }
              javaScriptEnabled={true}
              scrollEnabled={true}
              style={{ height: webViewHeight, width: "100%" }}
              source={{ uri: currentStageData.replicationFile }}
            />
          </View>
        )}

        <View className="bg-background p-3 rounded-3xl my-3">
          <Text className="text-white font-exoRegular xs:text-xs text-justify">
            {currentStageData?.copyCode}
          </Text>
        </View>
      </View>
    </>
  );
};

export default React.memo(StageCodeCrafter);
