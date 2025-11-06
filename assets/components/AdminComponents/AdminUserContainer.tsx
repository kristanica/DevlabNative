import useModal from "@/assets/Hooks/useModal";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import SmallLoading from "../global/SmallLoading";
import DeleteUserConfirmation from "./DeleteUserConfirmation";

const AdminUserContainer = ({
  allUsersInformation,
  mutation,

  loading,
  deleteAccount,
  more,
}: AdminUserContainerPayload) => {
  const toUse = allUsersInformation?.profileImage
    ? { uri: allUsersInformation.profileImage }
    : require("@/assets/images/profile.png");

  const deleteUserModal = useModal();

  return (
    <>
      <View className="bg-[#1e2a3a] flex-row h-[150px] my-2 mx-3 rounded-2xl border-[#2a3141] border-[2px]  relative ">
        <View className="flex-[1] justify-center items-center ">
          {deleteUserModal.visibility && (
            <DeleteUserConfirmation
              {...deleteUserModal}
              deleteAccount={deleteAccount}
              uid={allUsersInformation.id}
              fireBaseUserName={allUsersInformation.username}
              fireBaseEmail={allUsersInformation.email}
            ></DeleteUserConfirmation>
          )}
          <Image
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
            }}
            source={toUse}
          ></Image>
          {/* <TouchableOpacity onPress={() => deleteUserModal.setVisibility(true)}>
            <Text className="text-white font-exoBold text-xs xs:text-[10px] bg-red-500 px-7 py-2 rounded-xl mt-1 ">
              Delete
            </Text>
          </TouchableOpacity> */}
        </View>

        <View
          className="flex-[2] p-2 "
          style={[
            {
              borderColor: "#C1ADAD",
              borderLeftWidth: 1,
              marginVertical: 10,
            },
          ]}
        >
          <Text className="text-white font-exoBold text-xs xs:text-[10px] ">
            USERNAME:{" "}
            <Text className="text-white font-exoLight">
              {allUsersInformation.username}
            </Text>
          </Text>
          <Text className="my-3 text-white font-exoBold text-xs xs:text-[10px]">
            EMAIL:{" "}
            <Text className="font-exoLight">{allUsersInformation.email}</Text>
          </Text>

          <Text className="text-white font-exoBold text-xs xs:text-[10px]">
            STATUS:
            <Text
              className="font-exoLight text-xs xs:text-[10px]"
              style={{
                color: allUsersInformation.isAccountSuspended ? "red" : "green",
              }}
            >
              {" "}
              {allUsersInformation.isAccountSuspended ? "Suspended" : "Active"}
            </Text>
          </Text>
          <View className="flex-row justify-evenly items-center flex-[1] mt-3">
            {loading ? (
              <SmallLoading></SmallLoading>
            ) : (
              <>
                <TouchableOpacity
                  disabled={allUsersInformation.isAccountSuspended}
                  onPress={mutation}
                  className={`${
                    allUsersInformation.isAccountSuspended
                      ? `opacity-50`
                      : `opacity-100`
                  }`}
                >
                  <Text className="font-exoRegular text-white bg-[#f34b00] py-2 px-3 self-start rounded-2xl text-xs xs:text-[10px]">
                    Suspend
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={!allUsersInformation.isAccountSuspended}
                  onPress={mutation}
                  className={`${
                    allUsersInformation.isAccountSuspended
                      ? `opacity-100`
                      : `opacity-50`
                  }`}
                >
                  <Text className="font-exoRegular text-white bg-[#f34b00] py-2 px-3 self-start rounded-2xl text-xs xs:text-[10px]">
                    Activate
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  // onPress={() => {
                  //   setVisible(true);
                  // }}
                  onPress={more}
                >
                  <Text className="font-exoRegular text-white bg-[#1c5afb] py-2 px-3 self-start rounded-2xl text-xs xs:text-[10px]">
                    MORE
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default AdminUserContainer;
