import AdminProtectedRoutes from "@/assets/components/AdminProtectedRoutes";
import React from "react";
import { Text, View } from "react-native";

const ContentManagement = () => {
  return (
    <AdminProtectedRoutes>
      <View className="flex-[1] bg-red-300">
        <Text>ContentManagement</Text>
      </View>
    </AdminProtectedRoutes>
  );
};

export default ContentManagement;
