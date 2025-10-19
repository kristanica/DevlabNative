import { Tabs } from "expo-router";
import React from "react";

import CustomTabBar from "@/assets/components/TabBarComponents/CustomTabBar";
import { userIcon } from "@/assets/constants/constants";

const _layout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <CustomTabBar {...props} tabIcon={userIcon} />}
      >
        <Tabs.Screen name="Home" />
        <Tabs.Screen name="Shop" />

        <Tabs.Screen name="Achievements" options={{ title: "Trophies" }} />
        <Tabs.Screen
          name="(Lessons)"
          options={{
            title: "Lessons",
          }}
        />
      </Tabs>
    </>
  );
};

export default _layout;
