import { unlockAchievement } from "@/assets/Hooks/function/unlockAchievement";
import { sqlRegex } from "@/assets/Hooks/regexChecker/sqlRegex";
import { Asset } from "expo-asset";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";
import FillScreenLoading from "../global/FillScreenLoading";

type ViteDatabaseCodeEditorProps = {
  queryRecievedCode: any;
  setQueryRecievedCode: any;
  query: string | undefined;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
  tableStyle: string;
};
const StageCodingEditorDatabase = ({
  queryRecievedCode,
  setQueryRecievedCode,
  query,
  setQuery,
  tableStyle,
}: ViteDatabaseCodeEditorProps) => {
  const [displayHTML, setDisplayHTML] = useState<any>("");
  const webRef = useRef<WebView>(null);
  useEffect(() => {
    if (!queryRecievedCode) return;

    const unlockSqlAchievement = sqlRegex(queryRecievedCode.query);

    if (unlockSqlAchievement.length > 0) {
      unlockAchievement("Database", "tagUsed", {
        usedTags: unlockSqlAchievement,
        isCorrect: true,
      });
    }
  }, [queryRecievedCode]);

  const [htmlUri, setHtmlUri] = useState<string | null>(null);

  useEffect(() => {
    const loadHtml = async () => {
      const asset = Asset.fromModule(
        require("@/fontFamily/editor/database/DatabaseEditor.html")
      );
      await asset.downloadAsync(); // ensures it’s available locally
      setHtmlUri(asset.localUri); //URI TLGA PAG STAGES? hmmm isaidsadkhgashjdgss
    };

    loadHtml();
  }, []);

  if (!htmlUri) {
    return <FillScreenLoading text={"Loading editor...."}></FillScreenLoading>; // show loader until asset is ready
  }
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const webViewWidth = screenWidth - 40; // Account for margins (m-3 = 12px * 2, plus padding)
  const webViewHeight = screenHeight * 0.4 - 40;
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
              width: webViewWidth,
              height: webViewHeight,
              backgroundColor: "#D9D9D9",
              borderRadius: 10,
            }}
            source={{
              html: `<!DOCTYPE html>
<html lang="en">
  <head>

  <style>
${tableStyle}
  </style>
  </head>
  <body>
  ${displayHTML}
  </body>
</html>`,
            }}
          ></WebView>
          {/* 2nd Sreen */}
          {queryRecievedCode ? (
            <WebView
              style={{
                width: webViewWidth,
                height: webViewHeight,
                backgroundColor: "#D9D9D9",
                borderRadius: 10,
              }}
              source={{
                html: `<!DOCTYPE html>
<html lang="en">
  <head>
 
 <style>
${tableStyle}
  </style>
  </head>
  <body>
    ${queryRecievedCode.result}
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
        </ScrollView>
        <View className="bg-shopAccent flex-[2] m-3 rounded-[10px] ">
          <WebView
            ref={webRef}
            scrollEnabled={false}
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
            onMessage={(e) => {
              try {
                const data = JSON.parse(e.nativeEvent.data);
                if (!data) return;

                // ✅ Display predefined tables immediately on load
                if (data.defaultTables) {
                  const combinedHtml = data.defaultTables
                    .map(
                      (table: any) =>
                        `<h2 style="color: black; font-family: Arial, sans-serif">${table.name}</h2>${table.html}`
                    )
                    .join("<br/><br/>");
                  setDisplayHTML(combinedHtml);
                  return;
                }

                // Existing logic for query + results
                if (data.query && data.result) {
                  setQueryRecievedCode({
                    query: data.query,
                    result: data.result,
                  });
                }

                if (data.allTables) {
                  const combinedHtml = data.allTables
                    .map(
                      (table: any) =>
                        `<h2 style="color: black; font-family: Arial, sans-serif">${table.name}</h2>${table.html}`
                    )
                    .join("<br/><br/>");
                  setDisplayHTML(combinedHtml);
                }
              } catch (error) {
                console.log("Error parsing WebView message:", error);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(StageCodingEditorDatabase);

const styles = StyleSheet.create({});
