import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import { css as beautifyCSS, html as beautifyHTML } from "js-beautify";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
type AccordionPayload = {
  header: string;
  contents: string;
};

export const Accordion = ({ header, contents }: AccordionPayload) => {
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
  console.log(header);
  if (header === "html") {
    contents = beautifyHTML(contents, { indent_size: 2 });
  }
  if (header === "css") {
    contents = beautifyCSS(contents, { indent_size: 2 });
  }

  return (
    <View className="bg-accent px-6 py-2 rounded-lg mx-2 my-3">
      <View className="flex flex-row justify-between">
        <Text className="text-blue-400 font-exoBold text-lg xs:text-[13px]">
          {header.toLocaleUpperCase()}
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
          <Text className="text-white font-exoRegular text-[10px] text-justify mt-1">
            {contents}
          </Text>
        </View>

        <Pressable
          className="absolute right-0 bottom-2"
          onPress={async () => {
            await Clipboard.setStringAsync(contents);
          }}
        >
          <Ionicons name={"clipboard"} color={"white"} size={13}></Ionicons>
        </Pressable>
      </Animated.View>
    </View>
  );
};
