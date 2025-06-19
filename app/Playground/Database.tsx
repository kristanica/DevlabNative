import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Database = () => {
  return (
    <ProtectedRoutes>
      <View>
        <Text>Coding</Text>
      </View>
    </ProtectedRoutes>
  );
};

export default Database;

const styles = StyleSheet.create({});
