import { databasePlayground } from "@/assets/API/openAi/databasePlayground";
import useModal from "@/assets/Hooks/useModal";
import { useIsMutating, useMutation } from "@tanstack/react-query";
import LottieView from "lottie-react-native";
import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WebView from "react-native-webview";
import PlaygroundDatabaseEvaluationModal from "../CodeEditor/PlaygroundDatabaseEvaluationModal";
import FillScreenLoading from "../global/FillScreenLoading";

type ViteDatabaseCodeEditorProps = {
  queryRecievedCode: any;
  setQueryRecievedCode: any;
  query: string | undefined;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
  tableStyle: string;
};

const ViteDatabaseCodeEditor = ({
  queryRecievedCode,
  setQueryRecievedCode,
  query,
  setQuery,
  tableStyle,
}: ViteDatabaseCodeEditorProps) => {
  const [displayHTML, setDisplayHTML] = useState<any>("");
  const webRef = useRef<WebView>(null);
  const evaluationModal = useModal();
  const evaluateMutation = useMutation({
    mutationFn: async ({ receivedCode }: any) => {
      return databasePlayground({ receivedCode });
    },
    onSuccess: () => {
      evaluationModal.setVisibility(true);
    },
  });

  const isMutating = useIsMutating();
  return (
    <View className="bg-background flex-[1]">
      {isMutating > 0 && (
        <FillScreenLoading text={"Evalutaing..."}></FillScreenLoading>
      )}
      <View className="flex-[1] bg-accent rounded-[10px]">
        {evaluationModal.visibility && (
          <PlaygroundDatabaseEvaluationModal
            {...evaluationModal}
            evaluationRes={evaluateMutation.data}
          ></PlaygroundDatabaseEvaluationModal>
        )}
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
          <TouchableOpacity
            onPress={() => {
              evaluateMutation.mutate({
                receivedCode: queryRecievedCode.query,
              });
              console.log(queryRecievedCode.query);
            }}
            className="absolute  z-50  bottom-32 left-5 "
          >
            <Text className="text-white px-8 py-2 bg-button text-xs rounded-xl font-exoBold">
              Evaluate
            </Text>
          </TouchableOpacity>
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

                if (!query) {
                  setQuery(data.defaultQuery);
                  return;
                }

                setQueryRecievedCode({
                  query: data.query,
                  result: data.result,
                });

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

export default ViteDatabaseCodeEditor;

const styles = StyleSheet.create({});
