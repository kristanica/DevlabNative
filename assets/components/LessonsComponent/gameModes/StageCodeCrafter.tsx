import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import React, { useState } from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";

type NavigatingStageProps = {
  currentStageData: any;
};

const StageCodeCrafter = ({ currentStageData }: NavigatingStageProps) => {
  const location = WhereIsUser((state) => state.location);
  console.log(location);
  console.log(currentStageData.replicationFile);
  const [webViewHeight, setWebViewHeight] = useState(0);

  return (
    <>
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
