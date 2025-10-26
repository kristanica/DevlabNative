import { fetchUsers } from "@/assets/API/fireBase/admin/userManagement/fetchUsers";
import { searchUser } from "@/assets/API/fireBase/admin/userManagement/searchUser";
import { activeLevelCounter } from "@/assets/API/fireBase/user/activeLevelCounter";
import AdminUserContainer from "@/assets/components/AdminComponents/AdminUserContainer";
import EditUserModal from "@/assets/components/AdminComponents/EditUserModal";
import AdminProtectedRoutes from "@/assets/components/AdminProtectedRoutes";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import SmallLoading from "@/assets/components/global/SmallLoading";
import { useDeleteAccount } from "@/assets/Hooks/query/mutation/deleteAccount";
import { useSuspendAccount } from "@/assets/Hooks/query/mutation/suspendAccount";
import { useDeleteAllProgress } from "@/assets/Hooks/query/mutation/useDeleteAllProgress";
import { useDeleteProgress } from "@/assets/Hooks/query/mutation/useDeleteProgress";
import { useDeleteSpecificAchievement } from "@/assets/Hooks/query/mutation/useDeleteSpecificAchievement";
import { useEditUser } from "@/assets/Hooks/query/mutation/useEditUser";
import useDebounce from "@/assets/Hooks/useDebounce";
import useModal from "@/assets/Hooks/useModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

const UserManagement = () => {
  const [searchUserName, setSearchUser] = useState<string>("");
  const debouncedSearch = useDebounce(500, searchUserName); // 500ms delay

  // Fetch all users
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["allUser"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch active levels
  const { data: activeLevel } = useQuery({
    queryKey: ["Active level admin"],
    queryFn: activeLevelCounter,
    staleTime: 5 * 60 * 1000,
  });

  // Search mutation
  const {
    mutate: search,
    data: searchedUser,
    isPending: isFetchingUser,
    reset,
  } = useMutation({
    mutationFn: searchUser,
  });

  const isSearching = Boolean(searchUserName.trim());

  useEffect(() => {
    const term = debouncedSearch.trim();
    if (term) {
      search(term);
    } else {
      reset?.();
    }
  }, [debouncedSearch]);

  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const suspendAccount = useSuspendAccount({
    onMutate: ({ id }: any) => setLoadingUserId(id),
    onSettled: () => setLoadingUserId(null),
  });
  const deleteAccount = useDeleteAccount();
  const displayedUsers = isSearching ? searchedUser : users;

  const editUserModal = useModal();
  const uidRef = useRef<string>("");

  const deleteProgress = useDeleteProgress();
  const deleteAllProgress = useDeleteAllProgress();
  const editUser = useEditUser();
  const deleteAchievement = useDeleteSpecificAchievement();

  return (
    <AdminProtectedRoutes>
      <View className="flex-1 bg-accent">
        <CustomGeneralContainer>
          <View className="items-center flex-row mx-4 my-2">
            <Text className="text-white font-exoExtraBold text-3xl">
              User Management
            </Text>
          </View>

          <View className="flex-row items-center my-2 mx-4">
            <TextInput
              className="px-7 py-2 rounded-3xl border-[2px] border-black text-white font-exoLight flex-1"
              placeholder="Search a user"
              placeholderTextColor="#ccc"
              value={searchUserName}
              onChangeText={setSearchUser}
            />
          </View>

          {isLoadingUsers || isFetchingUser ? (
            <SmallLoading />
          ) : displayedUsers && displayedUsers.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              bounces={false}
              data={displayedUsers}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <AdminUserContainer
                  more={() => {
                    uidRef.current = item.id;
                    console.log(uidRef.current);
                    setTimeout(() => {
                      editUserModal.setVisibility(true);
                    }, 200);
                  }}
                  allUsersInformation={item}
                  activeLevel={activeLevel?.active || 0}
                  mutation={() =>
                    suspendAccount.mutate({
                      id: item.id,
                      toggleDisable: item.isAccountSuspended,
                    })
                  }
                  deleteAccount={deleteAccount}
                  loading={loadingUserId === item.id}
                  index={index}
                />
              )}
            />
          ) : isSearching && !isFetchingUser ? (
            <Text className="text-white text-center my-4">
              No users found for this search.
            </Text>
          ) : (
            <Text className="text-white text-center my-4">
              No users available.
            </Text>
          )}
        </CustomGeneralContainer>

        {editUserModal.visibility && (
          <EditUserModal
            {...editUserModal}
            uid={uidRef.current}
            activeLevel={activeLevel.active}
            deleteProgress={deleteProgress}
            deleteAllProgress={deleteAllProgress}
            editUser={editUser}
            deleteAchievement={deleteAchievement}
          ></EditUserModal>
        )}
      </View>
    </AdminProtectedRoutes>
  );
};

export default UserManagement;
