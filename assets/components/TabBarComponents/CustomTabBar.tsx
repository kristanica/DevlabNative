import CustomTabsButton from "@/assets/components/TabBarComponents/CustomTabsButton";
import { width } from "@/assets/constants/constants";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type Props = BottomTabBarProps & {
  tabIcon: readonly string[];
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
  tabIcon,
}: Props) {
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
    </Animated.View>
  );
}

const tabBarStyle = StyleSheet.create({
  tabBarStyle: {
    borderColor: "white",
    borderWidth: 0.3,
    backgroundColor: "#1E1E2E",
    position: "absolute",
    flexDirection: "row",
    bottom: 25,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: 10,
  },
});
