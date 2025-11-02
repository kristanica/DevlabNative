import { unlockAchievement } from "@/assets/Hooks/function/unlockAchievement";
import { cssRegex } from "@/assets/Hooks/regexChecker/cssRegex";
import { htmlRegex } from "@/assets/Hooks/regexChecker/htmlRegex";
import { jsRegex } from "@/assets/Hooks/regexChecker/jsRegex";
import BottomSheet from "@gorhom/bottom-sheet";
import { Asset } from "expo-asset";
import LottieView from "lottie-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Linking, ScrollView, Text, View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";

const StageCodingEditor = ({
  webRef,
  receivedCode,
  setReceivedCode,
  logs,
  setLogs,
  terminalRef,
}: CodeMirrorPayload) => {
  const snapPoints = useMemo(() => ["5%", "50%"], []);
  const editorHtml = Asset.fromModule(
    require("@/fontFamily/editor/index.html")
  ).uri;

  useEffect(() => {
    if (!receivedCode) return;
    const { html, css, js } = receivedCode;
    if (html) {
      const usedTags = htmlRegex(html);
      console.log("HTml ran");
      if (usedTags.length > 0) {
        unlockAchievement("Html", "tagUsed", { usedTags, isCorrect: true });
        console.log("Woah, ran");
      }
    }
    if (css) {
      const unlockCssAchievement: any = cssRegex(css);

      if (unlockCssAchievement.length > 0) {
        unlockCssAchievement.forEach((title: string) => {
          unlockAchievement("Css", "cssAction", { achievementTitle: title });
        });
      }
      if (js) {
        const unlockJsAchievement: any = jsRegex(js);
        if (unlockJsAchievement.length > 0) {
          unlockAchievement("JavaScript", "tagUsed", {
            unlockJsAchievement,
            isCorrect: true,
          });
        }
      }
    }
  }, [receivedCode]);
  const [htmlUri, setHtmlUri] = useState<string | null>(null);
  useEffect(() => {
    const loadHtml = async () => {
      const asset = Asset.fromModule(
        require("@/fontFamily/editor/codeMirror.html")
      );
      await asset.downloadAsync(); // ensures it’s available locally
      setHtmlUri(asset.localUri);
    };

    loadHtml();
  }, []);

  if (!htmlUri) {
    return <Text>Loading editor...</Text>; // show loader until asset is ready
  }

  return (
    <View className="bg-accent flex-[1] rounded-[10px] z-0">
      <View className="flex-1 bg-[#D9D9D9] m-2 rounded-xl mt-[20px]">
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
   
   <style>
     ${receivedCode?.css}
    </style>
  </head> 
  <body>
      ${receivedCode?.html}
          <script>(function(){
        const oldLog = console.log;
        console.log = function(...args) {
          oldLog.apply(console, args);
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: "log", data: args }));
        };
        const oldErr = console.error;
        console.error = function(...args) {
          oldErr.apply(console, args);
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: "error", data: args }));
        };
      })();
      try {
        ${receivedCode?.js || ""}
      } catch(e) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: "error", data: [e.message] }));
      }</script>
  </body>
</html>`,
            }}
            onShouldStartLoadWithRequest={(event) => {
              if (
                event.url !== "about:blank" &&
                !event.url.startsWith("file://") &&
                !event.url.startsWith("data:text/html")
              ) {
                Linking.openURL(event.url);
                return false;
              }
              return true;
            }}
            onMessage={(e: WebViewMessageEvent) => {
              try {
                const msg = JSON.parse(e.nativeEvent.data);
                setLogs((prev: any) => [...prev, msg]); // ✅ append logs
              } catch (err) {
                console.error("Parse error:", err);
              }
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
          source={{ uri: htmlUri }}
          allowFileAccess
          allowUniversalAccessFromFileURLs
          allowFileAccessFromFileURLs
          onMessage={(e: WebViewMessageEvent) => {
            try {
              const val: CodeEditorPayload = JSON.parse(e.nativeEvent.data);
              console.log(val);
              setReceivedCode(val);
            } catch (error) {
              console.log(error);
              alert(error);
            }
          }}
        />
      </View>

      <BottomSheet
        ref={terminalRef}
        index={-1}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: "#111828" }}
      >
        <View className="flex-1 bg-modal rounded-xl p-2">
          <Text className="text-green-400 font-mono mb-2">Terminal Output</Text>
          <ScrollView>
            {logs.length === 0 ? (
              <Text className="text-gray-400 font-mono">No logs yet...</Text>
            ) : (
              logs.map((log: any, i: any) => (
                <Text
                  key={i}
                  className={`font-mono text-xs ${
                    log.type === "error" ? "text-red-400" : "text-green-300"
                  }`}
                >
                  {log.data.join(" ")}
                </Text>
              ))
            )}
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};

export default React.memo(StageCodingEditor);
