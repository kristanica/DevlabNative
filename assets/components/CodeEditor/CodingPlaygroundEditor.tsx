import { auth, URL } from "@/assets/constants/constants";
import useModal from "@/assets/Hooks/useModal";
import { useMutation } from "@tanstack/react-query";
import LottieView from "lottie-react-native";
import type { RefObject } from "react";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import EvaluateModal from "./EvaluateModal";

type CodingPlaygroundEditorProps = {
  webRef: RefObject<WebView | null>;
};

type CodeEditorPayload = {
  html?: string;
  css?: string;
  js?: string;
};
const CodingPlaygroundEditor = ({ webRef }: CodingPlaygroundEditorProps) => {
  const [recievedCode, setRecievedCode] = useState<
    CodeEditorPayload | undefined
  >(undefined);

  const { mutate: Evaluate, data: gptResponse } = useMutation({
    mutationFn: async () => {
      if (!recievedCode) return null;
      const currentUser = auth.currentUser;

      const token = await currentUser?.getIdToken(true);
      const res = await fetch(`${URL}/OpenAI/evaluate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          prompt: `
HTML:
${recievedCode.html || ""}

CSS:
${recievedCode.css || ""}

JS:
${recievedCode.js || ""}
`,
        }),
      });

      if (!res.ok) {
        console.log("Failed to evaluate code");
      }
      const data = await res.json();

      return data.response;
    },
  });

  const evaluateModal = useModal();
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
      <Pressable
        onPress={() => {
          Evaluate();
          setTimeout(() => {
            evaluateModal.setVisibility(true);
          }, 2000);
        }}
      >
        <Text className="font-exoBold self-start mx-auto  my-2 text-white text-xs bg-button px-7 py-2 rounded-2xl">
          Evaluate
        </Text>
      </Pressable>
      {evaluateModal.visibility && (
        <EvaluateModal
          onConfirm={() => evaluateModal.closeModal}
          gptResponse={gptResponse}
          {...evaluateModal}
        ></EvaluateModal>
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
