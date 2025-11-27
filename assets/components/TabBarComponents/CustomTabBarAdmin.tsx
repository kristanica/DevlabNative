import CustomTabsButton from "@/assets/components/TabBarComponents/CustomTabsButton";
import useModal from "@/assets/Hooks/useModal";
import { auth, navIconAdmin, width } from "@/constants";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
            navIcon={navIconAdmin[index]}
            isFocused={isFocused}
            name={label.toString()}
          />
        );
      })}

      <TouchableOpacity
        onPress={() => logOutModal.setVisibility((prev) => !prev)}
      >
        <View className="w-[20px] h-[30px] m-auto">
          <Image
            source={require(`@/assets/images/navBarIcons/singOut.png`)}
            className="h-[20px] w-[20px]"
          ></Image>
        </View>
        <Text className="text-white xs:text-[8px]">Signout</Text>
      </TouchableOpacity>

      {logOutModal.visibility && (
        <SignOutModal
          {...logOutModal}
          onConfirm={async () => {
            await AsyncStorage.removeItem("isLoggin");
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
