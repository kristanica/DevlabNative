import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFFFFF",

        headerShown: false,

        tabBarStyle: {
          overflow: "hidden",
          position: "absolute",
          bottom: 20,
          backgroundColor: "#1c1b2d",
          borderRadius: 30,
          height: 70,
          paddingTop: 2,
          marginLeft: 5,
          marginRight: 5,
          borderColor: "#1c1b2d",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          headerTitle: "Home",
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={20}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
