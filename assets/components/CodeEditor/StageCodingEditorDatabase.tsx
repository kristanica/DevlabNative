import { unlockAchievement } from "@/assets/Hooks/function/unlockAchievement";
import { sqlRegex } from "@/assets/Hooks/regexChecker/sqlRegex";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WebView from "react-native-webview";

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
    console.log("This triggered");
    const unlockSqlAchievement = sqlRegex(queryRecievedCode.query);

    if (unlockSqlAchievement.length > 0) {
      unlockAchievement("Database", "tagUsed", {
        usedTags: unlockSqlAchievement,
        isCorrect: true,
      });
    }
  }, [queryRecievedCode]);

  return (
    <View className="bg-background flex-[1]">
      <View className="flex-[1] bg-accent rounded-[10px]">
        <TouchableOpacity onPress={() => console.log(queryRecievedCode)}>
          <Text>asdsad</Text>
        </TouchableOpacity>
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
              style={{ width: 380, backgroundColor: "#D9D9D9" }}
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

          {/* 2nd Screen */}
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
            source={require("@/fontFamily/editor/database/index.html")}
            onMessage={(e) => {
              try {
                const data = JSON.parse(e.nativeEvent.data);
                console.log("test");
                console.log(data);
                if (!query) {
                  setQuery(data.defaultQuery);
                  return;
                }

                if (data.query && data.result) {
                  console.log("set!");
                  setQueryRecievedCode({
                    query: data.query,
                    result: data.result,
                  });

                  return;
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
                console.log(error);
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
