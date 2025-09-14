import LottieView from "lottie-react-native";
import type { RefObject } from "react";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
type CodeEditorPayload = {
  html?: string;
  css?: string;
  js?: string;
};
type CodingPlaygroundEditorProps = {
  webRef: RefObject<WebView | null>;
  recievedCode: CodeEditorPayload | undefined;
  setRecievedCode: React.Dispatch<
    React.SetStateAction<CodeEditorPayload | undefined>
  >;
};

const CodingPlaygroundEditor = ({
  webRef,
  recievedCode,
  setRecievedCode,
}: CodingPlaygroundEditorProps) => {
  return (
    // Renders user's code
    <View className="bg-accent flex-[1] rounded-[10px]">
      <View className="flex-1 bg-[#D9D9D9] m-2 rounded-xl">
        {recievedCode ? (
          <WebView
            style={{
              flex: 1,
              backgroundColor: "#D9D9D9",
              margin: 10,
            }}
            source={{
              html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  />
  <meta charset="UTF-8" />
   <style>
     ${recievedCode?.css}
    </style>
  </head>
  <body>
      ${recievedCode?.html}
          <script>${recievedCode?.js}</script>
  </body>
</html>`,
            }}
          />
        ) : (
          <View className="flex-1 bg-[#D9D9D9] rounded-xl  items-center">
            <LottieView
              source={require("@/assets/Lottie/Loading.json")}
              style={{ height: 160, width: 200 }}
              autoPlay
              loop
            />
            <Text className="text-black text-center w-[300px] font-exoExtraBold">
              YOUR CODES RESULT WILL APPEAR HERE WHEN YOU RUN YOUR PROJECT
            </Text>
          </View>
        )}
      </View>
      {/* Runs evaluation */}

      <View className="flex-[2]">
        <WebView
          scrollEnabled={false}
          ref={webRef}
          style={{
            flex: 1,
            backgroundColor: "#1E1E2E",
            margin: 8,
            borderRadius: 10,
          }}
          source={require("@/fontFamily/editor/codeMirror.html")}
          onMessage={(e: WebViewMessageEvent) => {
            try {
              const val: CodeEditorPayload = JSON.parse(e.nativeEvent.data);

              setRecievedCode(val);
            } catch (error) {
              alert(error);
            }
          }}
        />
      </View>
    </View>
  );
};

export default CodingPlaygroundEditor;

const styles = StyleSheet.create({});
