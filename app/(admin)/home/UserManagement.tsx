import AdminUserContainer from "@/assets/components/AdminComponents/AdminUserContainer";
import AdminProtectedRoutes from "@/assets/components/AdminProtectedRoutes";
import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import LoadingAnim from "@/assets/components/LoadingAnim";
import setSuspended from "@/assets/Hooks/query/mutation/setSuspended";
import useFetchUsers from "@/assets/Hooks/query/useFetchUsers";
import useSearchUserFireStore from "@/assets/Hooks/searchUserFireStore";
import useDebounce from "@/assets/Hooks/useDebounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

const UserManagement = () => {
  const [searchUser, setSearchUser] = useState<string>("");

  const queryClient = useQueryClient();
  const { data: users } = useQuery({
    queryKey: ["allUser"],
    queryFn: useFetchUsers,
  });

  const debounce = useDebounce(1000, searchUser);
  const { data: searchedUser, isFetching: searchUserLoading } = useQuery({
    queryKey: ["searchedUser", debounce],
    queryFn: () => useSearchUserFireStore(debounce),
    staleTime: 0,

    enabled: !!debounce,
  });
  const mutation = useMutation({
    mutationFn: ({ uid, isSuspended }: { uid: any; isSuspended: boolean }) =>
      setSuspended(uid, isSuspended),
    // refetches allUser when setSuspended is success hence updating the UI from suspended > active and vice versa
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allUser"] }),
  });

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
            <TextInput
              className=" px-7 py-2 my-2 mx-7 rounded-3xl border-[2px] border-black text-white font-exoLight"
              placeholder="Search a user"
              onChangeText={(text) => {
                setSearchUser(text);
              }}
            />

            {/* UNFINISHED - When searching another user, it renders the previous searched results before rendering the new one. Might swtich to  Algolia, Typesense, or Meilisearch if remained unfixsable*/}
            {/* Might just add search button */}

            {/* Renders all list first */}
            {!searchUser ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                bounces={false}
                data={users}
                renderItem={({ item, index }) => (
                  <AdminUserContainer
                    item={item}
                    mutation={() =>
                      mutation.mutate({
                        uid: item.uid,
                        isSuspended: item.suspend,
                      })
                    }
                    index={index}
                  ></AdminUserContainer>
                )}
              />
            ) : // When the user searches something, hides all list and renders the search result
            searchUserLoading ? (
              <LoadingAnim></LoadingAnim>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                bounces={false}
                data={searchedUser}
                renderItem={({ item, index }) => (
                  <AdminUserContainer
                    index={index}
                    item={item}
                    mutation={() =>
                      mutation.mutate({
                        uid: item.uid,
                        isSuspended: item.suspend,
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
