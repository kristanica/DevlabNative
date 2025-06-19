import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import React from "react";
import { StyleSheet, View } from "react-native";

const Coding = () => {
  return (
    <ProtectedRoutes>
      <View className="bg-background"></View>
    </ProtectedRoutes>
  );
};

export default Coding;

const styles = StyleSheet.create({});
