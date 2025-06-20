import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { fontFamily } from "@/fontFamily/fontFamily";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useRef, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const Coding = () => {
  const webRef = useRef<WebView>(null);
  const [recievedCode, setRecievedCode] = useState<{
    html?: string;
    css?: string;
    js?: string;
  }>();

  return (
    <ProtectedRoutes>
      <SafeAreaView className="bg-background flex-[1]">
        <View className="flex-row justify-between">
          <Pressable onPress={() => router.replace("/Lessons")}>
            <Text
              className="text-white ml-3 text-2xl"
              style={{ fontFamily: fontFamily.ExoExtraBold }}
            >
              DEVLAB
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace("/Home")}
            className="justify-center"
          >
            <Text
              className="text-white mr-3 text-sm"
              style={{ fontFamily: fontFamily.ExoExtraBold }}
            >
              Database playground
            </Text>
          </Pressable>
        </View>

        <View className="bg-accent flex-[1] m-3 rounded-[10px]">
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
                <Text
                  className="text-black text-center w-[300px] "
                  style={{ fontFamily: fontFamily.ExoExtraBold }}
                >
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
              onMessage={(e) => {
                try {
                  const val = JSON.parse(e.nativeEvent.data);

                  setRecievedCode(val);
                } catch (error) {
                  alert(error);
                }
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </ProtectedRoutes>
  );
};

export default Coding;

const styles = StyleSheet.create({});
