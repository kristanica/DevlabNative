import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const CustomDrawer = () => {
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label={"Settings"}
        onPress={() => router.push({ pathname: "/home/Settings" })}
      ></DrawerItem>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
