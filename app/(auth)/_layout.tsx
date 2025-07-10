import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import { AuthProvider } from "@/assets/Provider/AuthProvider";
import { BackgroundProvider } from "@/assets/Provider/BackgroundProvider";
import { InformationProvider } from "@/assets/Provider/InformationProvider";
import { ProfileProvider } from "@/assets/Provider/ProfileProvider";

const TabsLayout = () => {
  return (
    <AuthProvider>
      <InformationProvider>
        <ProfileProvider>
          <BackgroundProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </BackgroundProvider>
        </ProfileProvider>
      </InformationProvider>
    </AuthProvider>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
