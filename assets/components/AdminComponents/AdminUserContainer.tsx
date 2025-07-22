import useSequentialAppearAnim from "@/assets/Hooks/useSequentialAppearAnim";
import { useIsFocused } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
type AdminUserContainerProps = {
  item: {
    username: string;
    email: string;
    userLeveL: number;
    suspend: boolean;
    uid?: any;
    isAdmin: boolean;
  };
  mutation: () => void;
  index: number;
};
const AdminUserContainer = ({
  item,
  mutation,
  index,
}: AdminUserContainerProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const { onScale } = useSequentialAppearAnim({
    indicator: isFocused,
    id: index,
  });
  return (
    <>
      <Animated.View
        style={onScale}
        className="bg-background flex-row h-[200px] my-2 mx-3 rounded-2xl border-[#56EBFF] border-[1px] relative "
      >
        <View className="flex-[1] justify-center items-center ">
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 40,
            }}
            source={require("@/assets/images/profile.png")}
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
              <View className="w-[50px] h-[50px] bg-slate-300 rounded-lg"></View>
              <View className="w-[50px] h-[50px] bg-slate-300 rounded-lg"></View>
              <View className="w-[50px] h-[50px] bg-slate-300 rounded-lg"></View>
              <View className="w-[50px] h-[50px] bg-slate-300 rounded-lg"></View>
            </View>

            <TouchableOpacity
              className=" mx-auto"
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text className="text-white bg-green-500 py-2 px-3 self-start rounded-2xl justify-center items-center">
                Progress
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            className="flex-[2] p-2 "
            //border left does not work on native wind idk why
            style={[
              {
                borderColor: "#C1ADAD",
                borderLeftWidth: 2,
                marginVertical: 10,
              },
            ]}
          >
            <Text className="text-white font-exoBold">
              USERNAME:
              <Text className="text-white font-exoLight"> {item.username}</Text>
            </Text>
            <Text className="my-3 text-white font-exoBold">
              EMAIL:
              <Text className="font-exoLight"> {item.email}</Text>
            </Text>

            <Text className="text-white font-exoBold">
              STATUS:
              <Text
                className="font-exoLight "
                style={{ color: item.suspend ? "red" : "green" }}
              >
                {"  "}
                {item.suspend ? "Suspended" : "Active"}
              </Text>
            </Text>
            <View className="flex-row justify-evenly items-center flex-[1]">
              <TouchableOpacity
                disabled={item.suspend}
                onPress={() => mutation()}
              >
                <Text className="text-white bg-button py-2 px-3 self-start rounded-2xl">
                  Suspend
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!item.suspend}
                onPress={() => mutation()}
              >
                <Text className="text-white bg-button py-2 px-3 self-start rounded-2xl">
                  Activate
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                }}
              >
                <Text className="text-white bg-green-500 py-2 px-3 self-start rounded-2xl">
                  Progress
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Animated.View>
    </>
  );
};

export default AdminUserContainer;
