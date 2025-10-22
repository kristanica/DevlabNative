import { codingPlayground } from "@/assets/API/openAi/codingPlayground";
import useModal from "@/assets/Hooks/useModal";
import BottomSheet from "@gorhom/bottom-sheet";
import { useIsMutating, useMutation } from "@tanstack/react-query";
import LottieView from "lottie-react-native";
import React, { RefObject, useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { PlaygroundEvaluateModal } from "../CodeEditor/PlaygroundEvaluateModal";
import FillScreenLoading from "../global/FillScreenLoading";

type CodeEditorPayload = {
  html?: string;
  css?: string;
  js?: string;
};

type CodingPlaygroundEditorProps = {
  webRef: RefObject<WebView | null>;
  receivedCode: CodeEditorPayload | undefined;
  setReceivedCode: React.Dispatch<
    React.SetStateAction<CodeEditorPayload | undefined>
  >;
  logs: any;
  setLogs: any;
  terminalRef: RefObject<BottomSheet | null>;
  isOffline?: boolean;
};
const ViteCodeEditor = ({
  webRef,
  receivedCode,
  setReceivedCode,
  logs,
  setLogs,
  terminalRef,
  isOffline,
}: CodingPlaygroundEditorProps) => {
  const snapPoints = useMemo(() => ["5%", "50%"], []);
  const evaluationModal = useModal();
  const evaluateMutation = useMutation({
    mutationFn: async ({ receivedCode }: any) => {
      return codingPlayground({ receivedCode });
    },
    onSuccess: () => {
      evaluationModal.setVisibility(true);
    },
  });

  const isMutating = useIsMutating();
  return (
    <View className="bg-accent flex-[1] rounded-[10px] z-0">
      {isMutating > 0 && (
        <FillScreenLoading text={"Evalutaing..."}></FillScreenLoading>
      )}
      <View className="flex-1 bg-[#D9D9D9] m-2 rounded-xl mt-[20px]">
        {evaluationModal.visibility && (
          <PlaygroundEvaluateModal
            {...evaluationModal}
            evaluationRes={evaluateMutation.data}
          ></PlaygroundEvaluateModal>
        )}
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
              style={{ width: "40%", aspectRatio: 1 }}
              autoPlay
              loop
            />
            <Text className="text-black text-center w-[300px] font-exoExtraBold">
              YOUR CODES RESULT WILL APPEAR HERE WHEN YOU RUN YOUR PROJECT
            </Text>
          </View>
        )}
      </View>
      {isOffline ? null : (
        <TouchableOpacity
          className="absolute  z-50  bottom-16 left-5 "
          onPress={() => evaluateMutation.mutate({ receivedCode })}
        >
          <Text className="text-white px-7 py-2 bg-button text-xs rounded-xl font-exoBold">
            Evaluate
          </Text>
        </TouchableOpacity>
      )}

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
          // source={require("@/fontFamily/editor/index.html")}
          source={{ html: "<h1>This is a static HTML source!</h1>" }}
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
          cacheEnabled={true}
          originWhitelist={["*"]}
          allowUniversalAccessFromFileURLs={true}
          allowFileAccess={true}
          allowFileAccessFromFileURLs={true} // ⚠️ often missing
          mixedContentMode="always" // helps avoid network
          onError={(syntheticEvent) => {
            console.log(
              "WebView load error (ignored offline):",
              syntheticEvent.nativeEvent
            );
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

export default ViteCodeEditor;

const styles = StyleSheet.create({});
