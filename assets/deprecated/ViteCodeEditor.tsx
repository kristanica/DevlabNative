import LottieView from "lottie-react-native";
import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import SelectLanguageNavigation from "../components/LanguageNavigation/SelectLanguageNavigation";
type CodeEditorPayload = {
  html?: string;
  css?: string;
  js?: string;
};
// type CodingPlaygroundEditorProps = {
//   webRef: RefObject<WebView | null>;
//   receivedCode: CodeEditorPayload | undefined;
//   setReceivedCode: React.Dispatch<
//     React.SetStateAction<CodeEditorPayload | undefined>
//   >;
// };

const ViteCodeEditor = () => {
  const webRef = useRef<WebView>(null);

  const sendToWebView = useCallback((lang: string) => {
    webRef.current?.postMessage(lang);
  }, []);
  const [receivedCode, setReceivedCode] = useState<
    CodeEditorPayload | undefined
  >(undefined);

  return (
    // Renders user's code
    <View className="bg-accent flex-[1] rounded-[10px] z-0">
      <SelectLanguageNavigation
        isCss={true}
        isJs={true}
        isHtml={true}
        sendToWebView={sendToWebView}
      ></SelectLanguageNavigation>
      <View className="flex-1 bg-[#D9D9D9] m-2 rounded-xl">
        {receivedCode ? (
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
     ${receivedCode?.css}
    </style>
  </head>
  <body>
      ${receivedCode?.html}
          <script>${receivedCode?.js}</script>
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
              YOUR CODE RESULT WILL APPEAR HERE WHEN YOU RUN YOUR PROJECTasd
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

              setReceivedCode(val);
            } catch (error) {
              alert(error);
            }
          }}
        />
      </View>
    </View>
  );
};

export default ViteCodeEditor;

const styles = StyleSheet.create({});
