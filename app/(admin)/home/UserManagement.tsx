import { fetchUsers } from "@/assets/API/fireBase/admin/userManagement/fetchUsers";
import { searchUser } from "@/assets/API/fireBase/admin/userManagement/searchUser";
import { suspendUser } from "@/assets/API/fireBase/admin/userManagement/suspendUser";
import AdminUserContainer from "@/assets/components/AdminComponents/AdminUserContainer";
import AdminProtectedRoutes from "@/assets/components/AdminProtectedRoutes";
import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

const UserManagement = () => {
  const [searchUserName, setSearchUser] = useState<string>("");

  const queryClient = useQueryClient();
  const { data: users } = useQuery({
    queryKey: ["allUser"],
    queryFn: fetchUsers,
    staleTime: 5 * (60 * 1000),
  });

  const {
    mutate: search,
    data: searchedUser,
    isIdle: searchUserLoading,
  } = useMutation({
    mutationFn: searchUser,
  });

  const mutation = useMutation({
    mutationFn: suspendUser,
    onMutate: ({ id, isSuspended }: suspendUserPayload) => {
      queryClient.cancelQueries({ queryKey: ["allUser"] });

      const previousData = queryClient.getQueryData(["allUser"]);

      queryClient.setQueryData(["allUser"], (old: any) => {
        return old?.map((user: any) => {
          return user.id === id ? { ...user, isSuspended: !isSuspended } : user; // ✅ Added return
        });
      });
      return { previousData };
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["allUser"] });
    },
  });
  const isSearching = Boolean(searchUserName.trim());
  return (
    <AdminProtectedRoutes>
      <View className="flex-[1] bg-accent">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <View className=" items-center flex-row  mx-4">
              <Text className="text-white font-exoExtraBold text-3xl">
                User Management
              </Text>
            </View>
            <View className="flex-row">
              <TextInput
                className=" px-7 py-2 my-2 ml-7 rounded-3xl border-[2px] border-black text-white font-exoLight w-[80%]"
                placeholder="Search a user"
                onChangeText={(text) => {
                  setSearchUser(text);
                }}
              />

              <Pressable
                className="flex justify-center items-center  mx-auto"
                onPress={() => {
                  const term = searchUserName.trim();
                  if (!term) return;
                  search(term);
                }}
              >
                <Ionicons name="search" size={20}></Ionicons>
              </Pressable>
            </View>
            {!isSearching ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                bounces={false}
                data={users}
                renderItem={({ item, index }) => (
                  <AdminUserContainer
                    allUsersInformation={item}
                    mutation={() =>
                      mutation.mutate({
                        id: item.id,
                        isSuspended: item.isSuspended,
                      })
                    }
                    index={index}
                  ></AdminUserContainer>
                )}
              />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                bounces={false}
                data={searchedUser}
                renderItem={({ item, index }) => (
                  <AdminUserContainer
                    index={index}
                    allUsersInformation={item}
                    mutation={() =>
                      mutation.mutate({
                        id: String(item!.id),
                        isSuspended: item.isSuspended,
                      })
                    }
                  ></AdminUserContainer>
                )}
              />
            )}
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </AdminProtectedRoutes>
  );
};

export default UserManagement;
