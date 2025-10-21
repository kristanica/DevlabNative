import { databasePlayground } from "@/assets/API/openAi/databasePlayground";
import useModal from "@/assets/Hooks/useModal";
import { useIsMutating, useMutation } from "@tanstack/react-query";
import LottieView from "lottie-react-native";
import React, { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import PlaygroundDatabaseEvaluationModal from "../CodeEditor/PlaygroundDatabaseEvaluationModal";
import FillScreenLoading from "../global/FillScreenLoading";

type ViteDatabaseCodeEditorProps = {
  queryRecievedCode: any;
  setQueryRecievedCode: any;
  query: string | undefined;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
  tableStyle: string;
  isOffline?: boolean;
};

const ViteDatabaseCodeEditor = ({
  queryRecievedCode,
  setQueryRecievedCode,
  query,
  setQuery,
  tableStyle,
  isOffline,
}: ViteDatabaseCodeEditorProps) => {
  //State for displaying the WHOLE table
  const [displayHTML, setDisplayHTML] = useState<any>("");
  const webRef = useRef<WebView>(null);
  const evaluationModal = useModal();

  //Evaluation call
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
      {/* Loading screen when evaluate button is pressed */}
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
        {/* Horizontal scroll */}
        <ScrollView
          className=" flex-[1] m-3 rounded-[10px]"
          horizontal={true}
          pagingEnabled
          decelerationRate="fast"
          bounces={false}
          showsHorizontalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          {/* WebView for displaying ALL the table once the "Display all table" is pressed */}
          <WebView
            style={{
              width: 365,
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
  
  <div class="overflow-auto">
  ${displayHTML}
  </div>
  </body>
</html>`,
            }}
          ></WebView>
          {/* Webview for dIsplaying the QUERY result of the user */}
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
            // Will render if the user doesnt query anything yet
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
          {/* Will not render the button when offline */}
          {isOffline ? null : (
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
          )}

          {/* The code editor itself */}
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
                //Gets the data from the webview, can be {query: "", result: ""} or {allTables: ""}
                const data = JSON.parse(e.nativeEvent.data);
                if (!data) {
                  console.log("no data");
                }
                //Is not using
                if (!query) {
                  setQuery(data.defaultQuery);
                  return;
                }

                // if the user ran their query, sets it to the setter then displayed on the webview above
                // query: actual query code
                //  result: The actual table if select statement is used. will render no result if create/insert/etc is used

                if (data.query && data.result) {
                  setQueryRecievedCode({
                    query: data.query,
                    result: data.result,
                  });

                  return;
                }

                // If display all table is used, sets the table to a useState then displayed it on the webview above
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
