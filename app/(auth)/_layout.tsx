import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import { AuthProvider } from "@/assets/Provider/AuthProvider";
import { BackgroundProvider } from "@/assets/Provider/BackgroundProvider";
import { ProfileProvider } from "@/assets/Provider/ProfileProvider";

const TabsLayout = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <BackgroundProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </BackgroundProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
