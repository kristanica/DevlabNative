import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import {
  css as beautifyCSS,
  html as beautifyHTML,
  js as beautifyJs,
} from "js-beautify";
import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CodeHighlighter from "react-native-code-highlighter";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
type AccordionPayload = {
  header: string;
  contents: string;
};

const Accordion = ({ header, contents }: AccordionPayload) => {
  const headerTemp = header;
  const [isOpened, setIsOpened] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  console.log(contentHeight);
  const accordionStyle = useAnimatedStyle(() => ({
    height: withTiming(isOpened ? contentHeight : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    }),
    opacity: withTiming(isOpened ? 1 : 0, { duration: 200 }),
    overflow: "hidden",
  }));

  if (!["js", "css", "html"].includes(header)) header = "plaintext";
  if (header === "js") header = "javascript";
  const formattedContents = useMemo(() => {
    let formatted = contents;
    if (header === "html")
      formatted = beautifyHTML(contents, { indent_size: 2 });
    if (header === "css") formatted = beautifyCSS(contents, { indent_size: 2 });
    if (header === "js") {
      formatted = beautifyJs(contents, { indent_size: 2 });
    }

    return formatted.replace(/\\n/g, "\n");
  }, [header, contents]);

  return (
    <View className="bg-accent px-6 py-2 rounded-lg mx-2 my-3">
      <View className="flex flex-row justify-between">
        <Text className="text-blue-400 font-exoBold text-lg xs:text-[13px]">
          {headerTemp.toLocaleUpperCase()}
        </Text>
        <Pressable
          onPress={() => setIsOpened((prev) => !prev)}
          className="my-auto"
        >
          <Ionicons
            name={isOpened ? "chevron-up" : "chevron-down"}
            color={"white"}
            size={15}
          ></Ionicons>
        </Pressable>
      </View>

      <Animated.View style={accordionStyle} className="relative">
        <View
          onLayout={(event) =>
            setContentHeight(event.nativeEvent.layout.height)
          }
          style={{
            position: "absolute",
          }}
        >
          <CodeHighlighter
            hljsStyle={dracula}
            containerStyle={styles.codeContainer}
            textStyle={styles.text}
            language={"html"}
          >
            {formattedContents}
          </CodeHighlighter>
        </View>

        <Pressable
          className="absolute right-0 bottom-2"
          onPress={async () => {
            await Clipboard.setStringAsync(formattedContents);
          }}
        >
          <Ionicons name={"clipboard"} color={"white"} size={13}></Ionicons>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default React.memo(Accordion);
const styles = StyleSheet.create({
  codeContainer: {
    padding: 16,
    backgroundColor: "#282c34",
    width: "100%", // matching atomOneDarkReasonable background
  },
  text: {
    fontSize: 10,
  },
});
