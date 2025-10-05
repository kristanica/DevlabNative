import CustomTabsButton from "@/assets/components/TabBarComponents/CustomTabsButton";
import { auth, width } from "@/assets/constants/constants";
import useModal from "@/assets/Hooks/useModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import SignOutModal from "../SettingsComponents/SignOutModal";

type Props = BottomTabBarProps & {
  tabIcon: readonly string[];
};

export default function CustomTabBarAdmin({
  state,
  descriptors,
  navigation,
  tabIcon,
}: Props) {
  const logOutModal = useModal();

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

      <Pressable onPress={() => logOutModal.setVisibility((prev) => !prev)}>
        <View className="w-[20px] h-[30px] m-auto">
          <Ionicons
            name={"log-out-outline"}
            color={"white"}
            size={20}
          ></Ionicons>
        </View>
        <Text className="text-white xs:text-[8px]">Signout</Text>
      </Pressable>

      {logOutModal.visibility && (
        <SignOutModal
          {...logOutModal}
          onConfirm={async () => {
            await signOut(auth);
            router.replace("/");
          }}
        ></SignOutModal>
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
