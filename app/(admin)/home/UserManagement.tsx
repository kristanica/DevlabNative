import AdminProtectedRoutes from "@/assets/components/AdminProtectedRoutes";
import React from "react";
import { Text, View } from "react-native";

const UserManagement = () => {
  return (
    <AdminProtectedRoutes>
      <View className="flex-[1] bg-red-300">
        <Text>UserManagement</Text>
      </View>
    </AdminProtectedRoutes>
  );
};

export default UserManagement;
