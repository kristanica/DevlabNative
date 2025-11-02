import CustomDrawer from "@/assets/components/TabBarComponents/CustomDrawer";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Image, TouchableOpacity } from "react-native";

const DrawerLayout = () => {
  const userData = useGetUserInfo((state) => state.userData);

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props}></CustomDrawer>}
      screenOptions={{
        headerTransparent: true,
        drawerActiveTintColor: "#4caf50",

        headerLeft: () => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const navigation = useNavigation();

          const routename = usePathname();

          if (routename === "/home/Shop") {
            return;
          }
          return (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Image
                source={
                  userData?.profileImage
                    ? { uri: userData?.profileImage }
                    : // Default val if profileVal is false
                      require("@/assets/images/profile.png")
                } // your image
                style={{ width: 30, height: 30, borderRadius: 15 }}
              />
            </TouchableOpacity>
          );
        },
      }}
    >
      <Drawer.Screen name="(tabs)" options={{ title: "" }}></Drawer.Screen>
      <Drawer.Screen
        name="Settings"
        options={{
          title: "Settings",
          headerStyle: {
            backgroundColor: "#0D1117",
          },
          headerTintColor: "#FFFFFF",
        }}
      ></Drawer.Screen>
    </Drawer>
  );
};

export default DrawerLayout;
