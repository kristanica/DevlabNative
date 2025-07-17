import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

const Database = () => {
  const [recievedCode, setRecievedCode] = useState<string>();
  const [query, setQuery] = useState<string>();
  const tableStyle = `
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    margin: 0;
  }

  table {
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid black;
    padding: 5px;
    text-align: center;
  }
`;

  return (
    <ProtectedRoutes>
      <View className="bg-background flex-[1]">
        <CustomGeneralContainer>
          <View className="flex-row justify-between">
            <Pressable onPress={() => router.replace("/home/Lesson")}>
              <Text className="text-white ml-3 text-2xl font-exoExtraBold">
                DEVLAB
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.replace("/(auth)/playground/Coding")}
              className="justify-center"
            >
              <Text className="text-white mr-3 text-sm font-exoExtraBold">
                Coding playground
              </Text>
            </Pressable>
          </View>
          <View className="flex-[1] bg-accent rounded-[10px]">
            <ScrollView
              className=" flex-[1] m-3 rounded-[10px]"
              horizontal={true}
              snapToInterval={380}
              decelerationRate="fast"
              bounces={false}
              showsHorizontalScrollIndicator={false}
            >
              <WebView
                style={{
                  width: 380,
                  backgroundColor: "#D9D9D9",
                  justifyContent: "center",
                  alignItems: "center",
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
${tableStyle}
  </style>
  </head>
  <body>
   ${query}
  </body>
</html>`,
                }}
              ></WebView>
              {/* 2nd Sreen */}
              {recievedCode ? (
                <WebView
                  style={{ width: 380, backgroundColor: "#D9D9D9" }}
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
${tableStyle}
  </style>
  </head>
  <body>
   ${recievedCode}
  </body>
</html>`,
                  }}
                ></WebView>
              ) : (
                <View className=" w-[380px] bg-[#D9D9D9] items-center">
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

              {/* 2nd Screen */}
            </ScrollView>
            <View className="bg-shopAccent flex-[2] m-3 rounded-[10px] ">
              <WebView
                scrollEnabled={false}
                style={{
                  flex: 1,
                  backgroundColor: "#1E1E2E",
                  margin: 8,
                  borderRadius: 10,
                }}
                source={require("@/fontFamily/editor/codeMirrorDatabase.html")}
                onMessage={(e) => {
                  try {
                    const result = e.nativeEvent.data;
                    if (!query) {
                      setQuery(result);
                      return;
                    }
                    setRecievedCode(result);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              />
            </View>
          </View>
        </CustomGeneralContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default Database;

const styles = StyleSheet.create({});
