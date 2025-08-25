import stages from "@/assets/zustand/stages";
import LottieView from "lottie-react-native";
import type { RefObject } from "react";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";

type CodingPlaygroundEditorProps = {
  webRef: RefObject<WebView | null>;
};

type CodeEditorPayload = {
  html?: string;
  css?: string;
  js?: string;
};
const CodingPlaygroundEditor = ({ webRef }: CodingPlaygroundEditorProps) => {
  const specificStagePayload = stages((state) => state.specificStagePayload);
  //   const client = new OpenAI({
  //     apiKey: process.env.OPENAI,
  //     dangerouslyAllowBrowser: true,
  //   });

  //   // useEffect(() => {
  //   //   const sample = async () => {

  //   //   };

  //   //   sample();
  //   // }, []);

  //   const mutation = useMutation({
  //     mutationFn: async () => {
  //       const response = await client.chat.completions.create({
  //         model: "gpt-4o-mini",
  //         messages: [
  //           {
  //             role: "system",
  //             content:
  //               "You are an experience developer and will act as a code evaluator for devlab",
  //           },
  //           {
  //             role: "user",
  //             content: `
  //             Description: ${specificStagePayload.description}
  //             Instruction: ${specificStagePayload.instruction}
  //           UserCode HTML:<!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta
  //     name="viewport"
  //     content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  //   />
  //   <meta charset="UTF-8" />

  //   </head>
  //   <body>
  //       ${recievedCode?.html}

  //   </body>
  // </html>
  // userCode CSS: ${recievedCode?.css}
  // userCode JavaScript: ${recievedCode?.js}

  // evaluate this, some areas might be left as blank such as css and javascript. Keep it short but lively
  //           `,
  //           },
  //         ],
  //       });
  //       console.log(response.choices[0].message.content);
  //     },
  //   });

  const [recievedCode, setRecievedCode] = useState<
    CodeEditorPayload | undefined
  >(undefined);
  // useEffect(() => {
  //   mutation.mutate();
  // }, [recievedCode]);
  return (
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
