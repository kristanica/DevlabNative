import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

const test = () => {
  const webRef = useRef<WebView>(null);
  const [recievedCode, setRecievedCode] = useState<{
    html?: string;
    css?: string;
    js?: string;
  }>();

  return (
    <ProtectedRoutes>
      <SafeAreaView className="bg-background flex-[1]">
        <View className="bg-accent flex-[1] m-3 rounded-[10px]">
          <View className="flex-1 bg-shopAccent m-2">
            <WebView
              style={{ flex: 1, backgroundColor: "#111827", margin: 10 }}
              source={{
                html: recievedCode
                  ? `<!DOCTYPE html>
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
</html>`
                  : `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  />
  <meta charset="UTF-8" />
 
  </head>
  <body>
     <h1 style = 'color:white;'>PUKINANGINAMO SAGLET </h1>
  </body>
</html>`,
              }}
            />
          </View>
          <View className="flex-[2]">
            <WebView
              ref={webRef}
              style={{ flex: 1, backgroundColor: "#111827", margin: 10 }}
              source={require("@/fontFamily/editor/codeMirror.html")}
              onMessage={(e) => {
                const val = JSON.parse(e.nativeEvent.data);
                setRecievedCode(val);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </ProtectedRoutes>
  );
};

export default test;

const styles = StyleSheet.create({});
