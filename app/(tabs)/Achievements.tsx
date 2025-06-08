import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const achivements = () => {
  return (
    <ProtectedRoutes>
      <SafeAreaView className="bg-background flex-1">
        <Text>achivements</Text>
      </SafeAreaView>
    </ProtectedRoutes>
  );
};

export default achivements;

const styles = StyleSheet.create({});
