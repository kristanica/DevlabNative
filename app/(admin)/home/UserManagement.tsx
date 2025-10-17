import { fetchUsers } from "@/assets/API/fireBase/admin/userManagement/fetchUsers";
import { searchUser } from "@/assets/API/fireBase/admin/userManagement/searchUser";
import { activeLevelCounter } from "@/assets/API/fireBase/user/activeLevelCounter";
import AdminUserContainer from "@/assets/components/AdminComponents/AdminUserContainer";
import AdminProtectedRoutes from "@/assets/components/AdminProtectedRoutes";
import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import { useDeleteAccount } from "@/assets/Hooks/query/mutation/deleteAccount";
import { useSuspendAccount } from "@/assets/Hooks/query/mutation/suspendAccount";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

const UserManagement = () => {
  const [searchUserName, setSearchUser] = useState<string>("");

  const { data: users } = useQuery({
    queryKey: ["allUser"],
    queryFn: fetchUsers,
    staleTime: 5 * (60 * 1000),
  });

  const { mutate: search, data: searchedUser } = useMutation({
    mutationFn: searchUser,
  });
  const { data: activeLevel } = useQuery({
    queryKey: ["Active level admin"],
    queryFn: activeLevelCounter,
    staleTime: 5 * 60 * 1000,
  });

  const isSearching = Boolean(searchUserName.trim());

  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const suspendAccount = useSuspendAccount({
    onMutate: ({ id }: any) => setLoadingUserId(id),
    onSettled: () => setLoadingUserId(null),
  });
  const deleteAccount = useDeleteAccount();

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
                renderItem={({ item, index }) => {
                  return (
                    <AdminUserContainer
                      allUsersInformation={item}
                      activeLevel={activeLevel.active}
                      mutation={() =>
                        suspendAccount.mutate({
                          id: item.id,
                          toggleDisable: item.isAccountSuspended,
                        })
                      }
                      deleteAccount={() => deleteAccount.mutate(item.id)}
                      loading={loadingUserId === item.id}
                      index={index}
                    ></AdminUserContainer>
                  );
                }}
              />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                bounces={false}
                data={searchedUser}
                renderItem={({ item, index }) => (
                  <AdminUserContainer
                    deleteAccount={() => deleteAccount.mutate(item.id)}
                    activeLevel={activeLevel.active}
                    index={index}
                    allUsersInformation={item}
                    mutation={() =>
                      suspendAccount.mutate({
                        id: item.id,
                        toggleDisable: item.isAccountSuspended,
                      })
                    }
                    loading={loadingUserId === item.id}
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
