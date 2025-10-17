import useSequentialAppearAnim from "@/assets/Hooks/useSequentialAppearAnim";
import { useIsFocused } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";
import Animated from "react-native-reanimated";
import SmallLoading from "../global/SmallLoading";

const AdminUserContainer = ({
  allUsersInformation,
  mutation,
  index,
  activeLevel,
  loading,
}: AdminUserContainerPayload) => {
  console.log(loading + "loading");
  const [visible, setVisible] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const { onScale } = useSequentialAppearAnim({
    indicator: isFocused,
    id: index,
  });

  const toUse = allUsersInformation?.profileImage
    ? { uri: allUsersInformation.profileImage }
    : require("@/assets/images/profile.png");

  return (
    <>
      <Animated.View
        style={onScale}
        className="bg-background flex-row h-[200px] my-2 mx-3 rounded-2xl border-[#56EBFF] border-[1px] relative "
      >
        <View className="flex-[1] justify-center items-center ">
          <Image
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
            }}
            source={toUse}
          ></Image>
        </View>
        {visible ? (
          <View
            className="flex-col justify-evenly  flex-[2] p-2 "
            style={[
              {
                borderColor: "#C1ADAD",
                borderLeftWidth: 2,
                marginVertical: 10,
              },
            ]}
          >
            {/* Suppose to be progress across lessons */}
            <View className="flex-row justify-evenly  items-center">
              <View className="w-[50px] h-[100px] bg-modal  rounded-lg justify-center items-center">
                <AnimatedProgressWheel
                  progress={allUsersInformation.levelCount["Html"]}
                  showProgressLabel={true}
                  rotation={"-90deg"}
                  subtitle={` / ${activeLevel["Html"]["levelCounter"]}`}
                  subtitleStyle={{ fontSize: 5, color: "white" }}
                  labelStyle={{ fontSize: 5, color: "white" }}
                  color={"#2CB67D"}
                  backgroundColor={"#242629"}
                  size={40}
                  width={5}
                  rounded
                />
                <Text className="text-white text-xs xs:text-[9px]">Html</Text>
              </View>
              <View className="w-[50px] h-[100px] bg-modal  rounded-lg justify-center items-center">
                <AnimatedProgressWheel
                  progress={allUsersInformation.levelCount["Css"]}
                  showProgressLabel={true}
                  rotation={"-90deg"}
                  subtitle={` / ${activeLevel["Css"]["levelCounter"]}`}
                  subtitleStyle={{ fontSize: 5, color: "white" }}
                  labelStyle={{ fontSize: 5, color: "white" }}
                  color={"#2CB67D"}
                  backgroundColor={"#242629"}
                  size={40}
                  width={5}
                  rounded
                />
                <Text className="text-white text-xs xs:text-[9px]">Css</Text>
              </View>
              <View className="w-[50px] h-[100px] bg-modal  rounded-lg justify-center items-center">
                <AnimatedProgressWheel
                  progress={allUsersInformation.levelCount["JavaScript"]}
                  showProgressLabel={true}
                  rotation={"-90deg"}
                  subtitle={` / ${activeLevel["JavaScript"]["levelCounter"]}`}
                  subtitleStyle={{ fontSize: 5, color: "white" }}
                  labelStyle={{ fontSize: 5, color: "white" }}
                  color={"#2CB67D"}
                  backgroundColor={"#242629"}
                  size={40}
                  width={5}
                  rounded
                />
                <Text className="text-white text-xs xs:text-[9px]">
                  JavaScript
                </Text>
              </View>
              <View className="w-[50px] h-[100px] bg-modal  rounded-lg justify-center items-center">
                <AnimatedProgressWheel
                  progress={allUsersInformation.levelCount["Database"]}
                  showProgressLabel={true}
                  rotation={"-90deg"}
                  subtitle={` / ${activeLevel["Database"]["levelCounter"]}`}
                  subtitleStyle={{ fontSize: 5, color: "white" }}
                  labelStyle={{ fontSize: 5, color: "white" }}
                  color={"#2CB67D"}
                  backgroundColor={"#242629"}
                  size={40}
                  width={5}
                  rounded
                />
                <Text className="text-white text-xs xs:text-[9px]">
                  Database
                </Text>
              </View>
            </View>

            <TouchableOpacity
              className=" mx-auto"
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text className="text-white bg-green-500 py-2 px-3 self-start rounded-2xl justify-center items-center  text-xs xs:text-[10px]">
                Progress
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            className="flex-[2] p-2 "
            style={[
              {
                borderColor: "#C1ADAD",
                borderLeftWidth: 2,
                marginVertical: 10,
              },
            ]}
          >
            <Text className="text-white font-exoBold text-xs xs:text-[10px]">
              USERNAME:
              <Text className="text-white font-exoLight">
                {allUsersInformation.username}
              </Text>
            </Text>
            <Text className="my-3 text-white font-exoBold text-xs xs:text-[10px]">
              EMAIL:
              <Text className="font-exoLight">{allUsersInformation.email}</Text>
            </Text>

            <Text className="text-white font-exoBold text-xs xs:text-[10px]">
              STATUS:
              <Text
                className="font-exoLight text-xs xs:text-[10px]"
                style={{
                  color: allUsersInformation.isAccountSuspended
                    ? "red"
                    : "green",
                }}
              >
                {allUsersInformation.isAccountSuspended
                  ? "Suspended"
                  : "Active"}
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
                    <Text className="text-white bg-button py-2 px-3 self-start rounded-2xl text-xs xs:text-[10px]">
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
                    <Text className="text-white bg-button py-2 px-3 self-start rounded-2xl text-xs xs:text-[10px]">
                      Activate
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setVisible(true);
                    }}
                  >
                    <Text className="text-white bg-green-500 py-2 px-3 self-start rounded-2xl text-xs xs:text-[10px]">
                      Progress
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
      </Animated.View>
    </>
  );
};

export default AdminUserContainer;
