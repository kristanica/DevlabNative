import CustomDrawer from "@/assets/components/TabBarComponents/CustomDrawer";
import { useProfile } from "@/assets/zustand/ProfileProvider";
import { DrawerActions } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
const queryClient = new QueryClient();
const drawerLayout = () => {
  const { profileVal } = useProfile();
  return (
    <QueryClientProvider client={queryClient}>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props}></CustomDrawer>}
        screenOptions={{
          headerTransparent: true,
          drawerActiveTintColor: "#4caf50",
          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              >
                <Image
                  source={
                    profileVal
                      ? { uri: profileVal }
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
    </QueryClientProvider>
  );
};

export default drawerLayout;

const styles = StyleSheet.create({});
