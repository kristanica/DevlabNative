import BottomSheet from "@gorhom/bottom-sheet";
import LottieView from "lottie-react-native";
import React, { RefObject, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";

import CodeEditor from "@rivascva/react-native-code-editor";
type CodeEditorPayload = {
  html?: string;
  css?: string;
  js?: string;
};
type LocalViteCodeEditorProps = {
  logs: any;
  setLogs: any;
  terminalRef: RefObject<BottomSheet | null>;
  selectedLanguage: string;
};

const LocalViteCodeEditor = ({
  selectedLanguage,
  logs,
  setLogs,
  terminalRef,
}: LocalViteCodeEditorProps) => {
  const snapPoints = useMemo(() => ["5%", "50%"], []);

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [executedCode, setExecutedCode] = useState<
    CodeEditorPayload | undefined
  >(undefined);

  // ✅ 1. State to force WebView re-render
  const webViewKeyRef = useRef<number>(0);

  const handleRunCode = () => {
    webViewKeyRef.current += 1;
    setExecutedCode({ html, css, js });
  };

  return (
    <View className="bg-accent flex-[1] rounded-[10px] z-0">
      <View className="flex-1 bg-[#D9D9D9] m-2 rounded-xl mt-[20px]">
        {executedCode ? (
          <WebView
            key={webViewKeyRef.current}
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
   
    ${executedCode?.css || ""}
  </style>
</head>
<body>
  ${executedCode?.html || ""}
  <script>
    (function(){
      const oldLog = console.log;
      console.log = function(...args){
        oldLog.apply(console, args);
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'log', data: args }));
      };
      const oldErr = console.error;
      console.error = function(...args){
        oldErr.apply(console, args);
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', data: args }));
      };
    })();
    try {
      ${executedCode?.js || ""}
    } catch(e) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', data: [e.message] }));
    }
  </script>
</body>
</html>`,
            }}
            onMessage={(e: WebViewMessageEvent) => {
              try {
                const msg = JSON.parse(e.nativeEvent.data);
                setLogs((prev: any) => [...prev, msg]);
              } catch (err) {
                console.error("Parse error:", err);
              }
            }}
          />
        ) : (
          <View className="flex-1 bg-[#D9D9D9] rounded-xl  items-center">
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

      {/* --- 2. SYNTAX HIGHLIGHTING EDITOR --- */}

      <View className="flex-[2] bg-[#1E1E2E] m-2 rounded-xl p-1 relative">
        <TouchableOpacity onPress={handleRunCode}>
          <Text className="text-white bg-button absolute z-50">Run Code</Text>
        </TouchableOpacity>
        {selectedLanguage === "Html" && (
          <CodeEditor
            showLineNumbers
            onChange={(text) => setHtml(text)}
            language="xml"
            style={{
              fontSize: 14,
              fontFamily: "monospace",
              padding: 10,
            }}
            initialValue={html}
          />
        )}

        {selectedLanguage === "Css" && (
          <CodeEditor
            showLineNumbers
            onChange={(text) => setCss(text)}
            language="css"
            style={{
              fontSize: 14,
              fontFamily: "monospace",
              padding: 10,
            }}
            initialValue={css}
          />
        )}

        {selectedLanguage === "Js" && (
          <CodeEditor
            showLineNumbers
            onChange={(text) => setJs(text)}
            language="javascript"
            style={{
              fontSize: 14,
              fontFamily: "monospace",
              padding: 10,
            }}
            initialValue={js}
          />
        )}
      </View>

      <TouchableOpacity
        onPress={() => {
          handleRunCode();
          console.log(executedCode);
        }}
        className="absolute bottom-10 right-5 p-4 rounded-full z-10" // Adjust padding and size as needed
      >
        <Text className="bg-button p-4 rounded-full font-exoBold text-white">
          ▶run
        </Text>
      </TouchableOpacity>
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

export default LocalViteCodeEditor;

const styles = StyleSheet.create({});
