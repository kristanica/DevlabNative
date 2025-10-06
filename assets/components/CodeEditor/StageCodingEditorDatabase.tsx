import { unlockAchievement } from "@/assets/Hooks/function/unlockAchievement";
import { sqlRegex } from "@/assets/Hooks/regexChecker/sqlRegex";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

const StageCodingEditorDatabase = ({
  queryRecievedCode,
  setQueryRecievedCode,
  query,
  setQuery,
  tableStyle,
}: CodeMirrorDatabasePayload) => {
  useEffect(() => {
    if (!queryRecievedCode) return;
    const unlockSqlAchievement = sqlRegex(queryRecievedCode);

    if (unlockSqlAchievement.length > 0) {
      unlockAchievement("Database", "tagsUsed", {
        unlockSqlAchievement,
        isCorrect: true,
      });
    }
  }, [queryRecievedCode]);
  return (
    <View className="bg-background flex-[1]">
      <View className="flex-[1] bg-accent rounded-[10px]">
        <ScrollView
          className=" flex-[1] m-3 rounded-[10px]"
          horizontal={true}
          pagingEnabled
          decelerationRate="fast"
          bounces={false}
          showsHorizontalScrollIndicator={false}
          alwaysBounceVertical={false}
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
          {queryRecievedCode ? (
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
   ${queryRecievedCode}
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
            source={require("@/fontFamily/editor/database/index.html")}
            onMessage={(e) => {
              try {
                const result = e.nativeEvent.data;
                if (!query) {
                  setQuery(result);
                  return;
                }
                setQueryRecievedCode(result);
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default StageCodingEditorDatabase;

const styles = StyleSheet.create({});
