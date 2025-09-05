import CustomTabsButton from "@/assets/components/TabBarComponents/CustomTabsButton";
import { width } from "@/assets/constants/constants";
import useModal from "@/assets/Hooks/useModal";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";
import { usePathname } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import LessonModal from "../LessonModal";

type Props = BottomTabBarProps & {
  tabIcon: readonly string[];
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
  tabIcon,
}: Props) {
  const lessonModal = useModal();
  const pathname = usePathname();
  console.log(pathname);

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

        return (
          <CustomTabsButton
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            icon={tabIcon[index]}
            isFocused={isFocused}
            name={label.toString()}
          />
        );
      })}

      <TouchableOpacity onPress={() => lessonModal.setVisibility(true)}>
        <Ionicons name="add" size={20} color={"white"}></Ionicons>
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
    backgroundColor: "#1E1E2E",
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 15,

    paddingBottom: 30,
  },
});
