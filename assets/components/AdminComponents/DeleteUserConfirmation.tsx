import toastHandler from "@/assets/zustand/toastHandler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFetching } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import SmallLoading from "../global/SmallLoading";

type DeleteUserConfirmationPayload = ScaleModalPayload & {
  deleteAccount: any;
  uid: string | undefined;
  fireBaseUserName: string | undefined;
  fireBaseEmail: string | undefined;
};

const DeleteUserConfirmation = ({
  visibility,
  scaleStyle,
  closeModal,
  deleteAccount,
  uid,
  fireBaseUserName,
  fireBaseEmail,
}: DeleteUserConfirmationPayload) => {
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isAnyUserQueryFetching = useIsFetching({ queryKey: ["allUser"] });
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);
  return (
    <Modal visible={visibility} transparent={true} animationType="fade">
      <Pressable
        className="flex-1 justify-center items-center bg-black/50"
        onPress={closeModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="w-[80%]"
        >
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              Keyboard.dismiss();
            }}
            className="bg-modal rounded-xl p-3 border-[#2a3141] border-[1px]  "
          >
            <Animated.View style={scaleStyle}>
              {isSuccess ? (
                <View className="items-center justify-center py-8">
                  <View>
                    <Ionicons
                      name="checkmark-circle"
                      size={80}
                      color="#22c55e"
                    />
                  </View>
                  <Text className="text-white font-exoBold text-lg mt-4">
                    Successfully Deleted!
                  </Text>
                  <Text className="text-white/60 text-center font-exoRegular text-xs mt-2">
                    User has been permanently removed
                  </Text>

                  <TouchableOpacity
                    onPress={closeModal}
                    className="mt-5 bg-red-500 p-3 rounded-[10px] items-center "
                  >
                    <Text className="text-white font-exoBold">CLOSE</Text>
                  </TouchableOpacity>
                </View>
              ) : isDeleting || isAnyUserQueryFetching > 0 ? (
                <SmallLoading></SmallLoading>
              ) : (
                <>
                  <Text className="text-white font-exoBold text-xs xs:text-[14px] text-center mb-4">
                    TYPE THEIR CREDENTIALS
                  </Text>
                  <Text className="text-white/60 text-center font-exoRegular text-xs mb-6">
                    This change is irreversible and will permanently delete the
                    user from the applicaiton
                  </Text>
                  <View className="mb-4 bg-[#2a3141] p-3 rounded-lg">
                    <Text className="text-white/70 text-xs mb-1">
                      Username to confirm:
                    </Text>
                    <Text className="text-white font-exoBold text-sm">
                      {fireBaseUserName}
                    </Text>
                    <Text className="text-white/70 text-xs mt-2 mb-1">
                      Email to confirm:
                    </Text>
                    <Text className="text-white font-exoBold text-sm">
                      {fireBaseEmail}
                    </Text>
                  </View>
                  <View className="space-y-3">
                    <TextInput
                      value={userName}
                      onChangeText={setUsername}
                      placeholder="Username"
                      className="text-[#ffffff9e] bg-[#1E212F] xs:text-xs p-4 rounded-[10px]   "
                      placeholderTextColor="rgba(128, 128, 128, 0.5)"
                    />
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Email"
                      className="text-[#ffffff9e] bg-[#1E212F]  xs:text-xs p-4 rounded-[10px]  mt-5"
                      placeholderTextColor="rgba(128, 128, 128, 0.5)"
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      if (
                        (fireBaseUserName ?? "").trim().toLowerCase() ===
                          userName.trim().toLowerCase() &&
                        (fireBaseEmail ?? "").trim().toLowerCase() ===
                          email.trim().toLowerCase()
                      ) {
                        setIsDeleting(true);
                        deleteAccount.mutate(uid, {
                          onSuccess: () => {
                            setIsDeleting(false);
                            setIsSuccess(true);
                            setUsername("");
                            setEmail("");
                          },
                        });
                        return;
                      }

                      setToastVisibility("error", "Does not match!");
                    }}
                    className="mt-5 bg-red-500 p-3 rounded-[10px] items-center "
                  >
                    <Text className="text-white font-exoBold">DELETE</Text>
                  </TouchableOpacity>
                </>
              )}
            </Animated.View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

export default DeleteUserConfirmation;
