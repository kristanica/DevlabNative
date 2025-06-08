import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import { AuthChecker } from "@/assets/components/AuthChecker";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabsLayout = () => {
  return (
    <AuthChecker>
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
          name="Home"
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
        <Tabs.Screen
          name="Shop"
          options={{
            headerShown: false,
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
            headerShown: false,
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
          name="LessonTabs"
          options={{
            headerShown: false,
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
            headerShown: false,
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
    </AuthChecker>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
