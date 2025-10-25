import CustomTabsButton from "@/assets/components/TabBarComponents/CustomTabsButton";
import useModal from "@/assets/Hooks/useModal";
import { navIcon, width } from "@/constants";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import LessonModal from "../LessonModal";

type Props = BottomTabBarProps & {
  tabIcon: readonly string[];
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: Props) {
  const lessonModal = useModal();

  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(200)}
      style={[tabBarStyle.tabBarStyle, { width: width }]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        if (label === "Lessons") {
          return null;
        }
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        console.log(index + "nav");
        return (
          <CustomTabsButton
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            name={label.toString()}
            navIcon={navIcon[index]}
          />
        );
      })}

      <TouchableOpacity onPress={() => lessonModal.setVisibility(true)}>
        <Image
          source={require("@/assets/images/navBarIcons/Lesson.png")}
          className="h-[20px] w-[20px] m-auto mt-2"
        ></Image>
        <Text className="text-white xs:text-[8px] pt-2">Lessons</Text>
      </TouchableOpacity>

      {lessonModal.visibility && (
        <LessonModal
          onConfirm={() => console.log("hello")}
          {...lessonModal}
        ></LessonModal>
      )}
    </Animated.View>
  );
}

const tabBarStyle = StyleSheet.create({
  tabBarStyle: {
    borderTopColor: "#FFFFFF",
    borderWidth: 0.5,
    backgroundColor: "#111828",
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 15,

    paddingBottom: 30,
  },
});
