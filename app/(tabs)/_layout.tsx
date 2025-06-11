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
          backgroundColor: "#1c1b2d",

          borderColor: "#1c1b2d",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
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
      <Tabs.Screen
        name="Shop"
        options={{
          headerTitle: "Shop",
          title: "Shop",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "pricetag" : "pricetag-outline"}
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          headerTitle: "Settings",
          title: "Settings",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Lessons"
        options={{
          headerTitle: "Lessons",
          title: "Lessons",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Achievements"
        options={{
          headerTitle: "Achievements",
          title: "Achievements",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "trophy" : "trophy-outline"}
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
