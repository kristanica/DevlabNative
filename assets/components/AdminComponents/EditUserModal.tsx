import { useEditUser } from "@/assets/Hooks/reducers/useEditUser";
import toastHandler from "@/assets/zustand/toastHandler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import ProgressBar from "./ProgressBar";

type EditUserModalPayload = ScaleModalPayload & {
  uid: string;
  activeLevel: any;
  deleteProgress: any;
  deleteAllProgress: any;
  editUser: any;
};

const EditUserModal = ({
  visibility,
  closeModal,
  scaleStyle,
  uid,
  activeLevel,
  deleteProgress,
  deleteAllProgress,
  editUser,
}: EditUserModalPayload) => {
  const queryClient = useQueryClient();
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);
  const test: any[] | undefined = queryClient.getQueryData(["allUser"]);
  const userInfo = useMemo(() => {
    return test!.find((item) => item.id === uid);
  }, [test, uid]);
  const profile = userInfo?.profileImage
    ? { uri: userInfo.profileImage }
    : require("@/assets/images/profile.png");
  const background = userInfo?.backgroundImage
    ? { uri: userInfo.backgroundImage }
    : require("@/assets/images/profile.png");
  const { state, dispatch } = useEditUser();
  useEffect(() => {
    if (!userInfo || !uid) return;
    dispatch({
      type: "UPDATE_ALL_FIELDS",
      payload: {
        profile: profile,
        background: background,
        username: userInfo.username,
        bio: userInfo.bio,
        coins: userInfo.coins,
        exp: userInfo.exp,
        userLevel: userInfo.userLevel,
        inventory: userInfo.inventory,
      },
    });
  }, [userInfo, uid]);
  const [toggleView, setToggleView] = useState<boolean>(false);
  const progressValue = useSharedValue(0);

  useEffect(() => {
    progressValue.value = withTiming(userInfo.levelCount["Html"], {
      duration: 1000,
    });
  }, []);

  const categories = ["Html", "Css", "JavaScript", "Database"];

  return (
    <Modal
      visible={visibility}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true} // Required for proper keyboard behavi  r
    >
      <Pressable
        className="flex-1 justify-center items-center bg-black/50"
        onPress={closeModal}
      >
        <View className="w-[80%]">
          <KeyboardAwareScrollView
            enableOnAndroid={true} // Required for Android
            keyboardShouldPersistTaps="handled" // Allows taps on buttons
            showsVerticalScrollIndicator={false}
            extraScrollHeight={20} // Extra padding above keyboard
            enableResetScrollToCoords={false} // Prevents auto-scroll when keyboard closes
          >
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                Keyboard.dismiss();
              }}
              className="bg-modal rounded-xl p-3 border-[#2a3141] border-[1px]  "
            >
              <Animated.View style={scaleStyle}>
                <ImageBackground
                  source={background}
                  className="h-28 w-full justify-center items-center relative"
                >
                  <Image
                    source={profile}
                    className="h-20 w-20 rounded-xl"
                  ></Image>

                  <TouchableOpacity
                    onPress={() => setToggleView((prev) => !prev)}
                    className="absolute  right-5"
                  >
                    <Ionicons name="reload-circle" size={20} color={"yellow"} />
                  </TouchableOpacity>
                </ImageBackground>

                {toggleView ? (
                  <>
                    {categories.map((category, index) => (
                      <React.Fragment key={index}>
                        <ProgressBar
                          activeLevel={activeLevel[category].levelCounter}
                          category={category}
                          userProgress={userInfo.levelCount[category]}
                          onDeleteSpecific={() => {
                            deleteProgress.mutate({
                              uid: uid,
                              subject: category,
                            });
                            setToastVisibility(
                              "success",
                              `Progress on ${category} for ${userInfo.username} reset succesfully`
                            );
                          }}
                        ></ProgressBar>
                      </React.Fragment>
                    ))}
                    <TouchableOpacity
                      onPress={() => {
                        deleteAllProgress.mutate({ uid });
                        setToastVisibility(
                          "success",
                          `Progress on all for ${userInfo.username}reset succesfully`
                        );
                      }}
                      className="mt-5 bg-red-500 p-3 rounded-[10px] items-center "
                    >
                      <Text className="text-white font-exoBold">
                        DELETE ALL PROGRESS
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View className="mb-2 bg-[#2a3141] p-3 rounded-lg  mt-2">
                      <Text className="text-white/70 text-xs ">USER EMAIL</Text>
                      <Text className="text-white font-exoBold">
                        {userInfo.email}
                      </Text>
                    </View>
                    <Text className="text-white font-exoBold text-xs xs: text-[10px] my-2">
                      USERNAME
                    </Text>
                    <TextInput
                      value={state.username}
                      onChangeText={(text) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          field: "username",
                          value: text,
                        })
                      }
                      className="text-[#ffffff9e] bg-[#1E212F] xs:text-xs p-4 rounded-[10px]  "
                      placeholderTextColor="rgba(128, 128, 128, 0.5)"
                    />
                    <Text className="text-white font-exoBold text-xs xs: text-[10px] my-2">
                      BIO
                    </Text>
                    <TextInput
                      value={state.bio}
                      onChangeText={(text) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          field: "bio",
                          value: text,
                        })
                      }
                      className="text-[#ffffff9e] bg-[#1E212F] xs:text-xs p-4 rounded-[10px]  "
                      placeholderTextColor="rgba(128, 128, 128, 0.5)"
                    />
                    <Text className="text-white font-exoBold text-xs xs: text-[10px] my-2">
                      COINS
                    </Text>
                    <TextInput
                      value={String(state.coins)}
                      onChangeText={(text) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          field: "coins",
                          value: text,
                        })
                      }
                      className="text-[#ffffff9e] bg-[#1E212F] xs:text-xs p-4 rounded-[10px]  "
                      placeholderTextColor="rgba(128, 128, 128, 0.5)"
                    />
                    <Text className="text-white font-exoBold text-xs xs: text-[10px] my-2">
                      EXPERIENCE POINTS:
                    </Text>
                    <TextInput
                      value={String(state.exp)}
                      onChangeText={(text) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          field: "exp",
                          value: text,
                        })
                      }
                      className="text-[#ffffff9e] bg-[#1E212F] xs:text-xs p-4 rounded-[10px]  "
                      placeholderTextColor="rgba(128, 128, 128, 0.5)"
                    />
                    <Text className="text-white font-exoBold text-xs xs: text-[10px] my-2">
                      USER LEVEL
                    </Text>
                    <TextInput
                      value={String(state.userLevel)}
                      onChangeText={(text) =>
                        dispatch({
                          type: "UPDATE_FIELD",
                          field: "userLevel",
                          value: text,
                        })
                      }
                      className="text-[#ffffff9e] bg-[#1E212F] xs:text-xs p-4 rounded-[10px]  "
                      placeholderTextColor="rgba(128, 128, 128, 0.5)"
                    />
                    <TouchableOpacity
                      className="mt-5 bg-green-500 p-3 rounded-[10px] items-center "
                      onPress={() => {
                        editUser.mutate({ uid: uid, state: state });
                        setToastVisibility(
                          "success",
                          `User ${userInfo.username} updated succesfully`
                        );
                      }}
                    >
                      <Text className="text-white font-exoBold">SAVE</Text>
                    </TouchableOpacity>
                  </>
                )}
              </Animated.View>
            </Pressable>
          </KeyboardAwareScrollView>
        </View>
      </Pressable>
    </Modal>
  );
};

export default EditUserModal;

const styles = StyleSheet.create({});
