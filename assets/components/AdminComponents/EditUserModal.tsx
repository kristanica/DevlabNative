import { useEditUser } from "@/assets/Hooks/reducers/useEditUser";
import useModal from "@/assets/Hooks/useModal";
import toastHandler from "@/assets/zustand/toastHandler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQueryClient } from "@tanstack/react-query";
import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import DeleteAchievementProgressModal from "./DeleteAchievementProgressModal";
import ProgressBar from "./ProgressBar";

type EditUserModalPayload = ScaleModalPayload & {
  uid: string;
  activeLevel: any;
  deleteProgress: any;
  deleteAllProgress: any;
  editUser: any;
  deleteAchievement: any;
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
  deleteAchievement,
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

  const progressValue = useSharedValue(0);

  useEffect(() => {
    progressValue.value = withTiming(userInfo.levelCount["Html"], {
      duration: 1000,
    });
  }, []);

  //USed for looping
  const categories = useMemo(
    () => ["Html", "Css", "JavaScript", "Database"],
    []
  );

  const deleteConfirmation = useModal();
  const functionToPerfrom = useRef<any>(null);
  const hasProgress = useMemo(() => {
    if (!userInfo?.levelCount) return false;

    return Object.values(userInfo.levelCount).some((count: any) => count > 0);
  }, [userInfo]);

  const optionNav = ["About", "Achievement", "Progress"];
  const [navigation, setNavigation] = useState<string>("About");
  const nav: Record<string, JSX.Element> = {
    About: (
      <>
        <View className="pb-2 mb-2 border-b-[2px] border-[#2a3340]">
          <Text className="text-sm text-cyan-400 font-exoBold">
            User Information
          </Text>
        </View>
        <View className="gap-3">
          <View>
            <Text className="text-white font-exoLight mb-1 text-xs xs: text-[10px] ">
              EMAIL
            </Text>
            <Text className="w-full p-2.5 rounded-lg bg-gray-800 text-white border border-gray-700 text-sm">
              {userInfo.email}
            </Text>
          </View>
          <View>
            <Text className="text-white font-exoLight mb-1 text-xs xs: text-[10px] ">
              USERNAME
            </Text>
            <Text className="w-full p-2.5 rounded-lg bg-gray-800 text-white border border-gray-700 text-sm">
              {userInfo.username}
            </Text>
          </View>
          <View>
            <Text className="text-white font-exoLight mb-1 text-xs xs: text-[10px] ">
              COINS
            </Text>
            <Text className="w-full p-2.5 rounded-lg bg-gray-800 text-white border border-gray-700 text-sm">
              {userInfo.coins}
            </Text>
          </View>

          <View>
            <Text className="text-white font-exoLight mb-1 text-xs xs: text-[10px] ">
              EXP
            </Text>
            <Text className="w-full p-2.5 rounded-lg bg-gray-800 text-white border border-gray-700 text-sm">
              {userInfo.exp} {"EXP"}
            </Text>
          </View>

          <View>
            <Text className="text-white font-exoLight mb-1 text-xs xs: text-[10px] ">
              LEVEL
            </Text>
            <Text className="w-full p-2.5 rounded-lg bg-gray-800 text-white border border-gray-700 text-sm">
              {userInfo.userLevel}
            </Text>
          </View>
        </View>
      </>
    ),
    Progress: (
      <>
        <View className="pb-2 mb-2 border-b-[2px] border-[#2a3340]">
          <Text className="text-sm text-cyan-400 font-exoBold">
            User Progress
          </Text>
        </View>

        {categories.map((category, index) => (
          <React.Fragment key={index}>
            <ProgressBar
              activeLevel={10}
              category={category}
              userProgress={userInfo.achievements[category]["quantity"]}
              onDeleteSpecific={() => {
                deleteConfirmation.setVisibility(true);
                functionToPerfrom.current = () => {
                  deleteAchievement.mutate({
                    category: category,
                    uid: uid,
                  });
                };
              }}
            ></ProgressBar>
          </React.Fragment>
        ))}
      </>
    ),

    Achievement: (
      <>
        <View className="pb-2 mb-2 border-b-[2px] border-[#2a3340]">
          <Text className="text-sm text-cyan-400 font-exoBold">
            User Achievement progress
          </Text>
        </View>
        {categories.map((category, index) => (
          <React.Fragment key={index}>
            <ProgressBar
              activeLevel={activeLevel[category].levelCounter}
              category={category}
              userProgress={userInfo.levelCount[category]}
              onDeleteSpecific={() => {
                deleteConfirmation.setVisibility(true);
                functionToPerfrom.current = () =>
                  deleteProgress.mutate({
                    uid: uid,
                    subject: category,
                  });
              }}
            ></ProgressBar>
          </React.Fragment>
        ))}
        {/* <TouchableOpacity
          disabled={!hasProgress}
          onPress={() => {
            deleteConfirmation.setVisibility(true);
            functionToPerfrom.current = () => deleteAllProgress.mutate({ uid });
          }}
          className={`mt-5 p-3 rounded-[10px] items-center ${
            hasProgress ? "bg-red-500" : "bg-gray-600 opacity-50"
          }`}
        >
          <Text className="text-white font-exoBold">DELETE ALL PROGRESS</Text>
        </TouchableOpacity> */}
      </>
    ),
  };

  return (
    <Modal
      visible={visibility}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true} // Required for proper keyboard behavi  r
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        {deleteConfirmation.visibility && (
          <DeleteAchievementProgressModal
            onConfirm={functionToPerfrom.current}
            {...deleteConfirmation}
          ></DeleteAchievementProgressModal>
        )}
        <View className="w-[80%]">
          <Animated.View style={scaleStyle}>
            <View className="bg-[#1a2334] rounded-xl p-3 border-[#2a3141] border-[1px]  ">
              <View className="pb-2 flex-row justify-between">
                <Text className="text-sm text-blue-500 font-exoBold">
                  {state.username}'s Profile
                </Text>

                <TouchableOpacity onPress={closeModal}>
                  <Ionicons name="close" size={20} color={"gray"}></Ionicons>
                </TouchableOpacity>
              </View>
              <ImageBackground
                source={background}
                className="h-28 w-full justify-center items-center relative"
              >
                <Image
                  source={profile}
                  className="h-20 w-20 rounded-xl"
                ></Image>
              </ImageBackground>

              <View className="flex-row justify-evenly mb-2 mt-2 border-b-[2px] border-[#2a3340]">
                {optionNav.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setNavigation(item)}
                    className="items-center flex-1"
                  >
                    <Text
                      className={`font-exoBold text-sm ${
                        navigation === item ? "text-cyan-400" : "text-gray-400"
                      }`}
                    >
                      {item}
                    </Text>

                    {/* Underline indicator */}
                    <View
                      className={`h-[2px] w-3/4 mt-1 rounded-full ${
                        navigation === item ? "bg-cyan-400" : "bg-transparent"
                      }`}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <View>{nav[navigation]}</View>
            </View>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

export default EditUserModal;

{
  /*<> <View className="mb-2 bg-[#2a3141] p-3 rounded-lg  mt-2">
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
                      disableFullscreenUI
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

                    </> */
}
