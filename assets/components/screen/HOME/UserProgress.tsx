import { categoryIcon } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";
import * as Progress from "react-native-progress";

const UserProgress = ({ lessons, activeLevel, userProgress }: any) => {
  return (
    <>
      <Text className="text-white ml-3 xs:text-lg font-exoBold tracking-wide">
        VIEW YOUR PROGRESS
      </Text>

      <View className="flex-col mt-2 space-y-3 px-3">
        {lessons.map((item: any, index: number) => {
          const progressValue = userProgress[item.name] || 0;
          const totalLevels = activeLevel[item.name]?.levelCounter || 1;
          const progressPercent = Math.min(progressValue / totalLevels, 1);

          return (
            <View
              className="bg-accentContainer my-2 p-3 rounded-2xl shadow-md flex-row border-[#2a3141] border-[1px] "
              key={index}
            >
              <View>
                <Image
                  source={categoryIcon[item.name]}
                  className="w-14 h-14 mr-2"
                />
              </View>

              <View className="flex-1">
                <Text className="text-white font-exoBold  text-xs">
                  {item.name.toUpperCase()}
                </Text>
                <View className="mt-3">
                  <Progress.Bar
                    progress={progressPercent}
                    width={null}
                    height={10}
                    color={item.color || "#2CB67D"}
                    unfilledColor="#2A2A35"
                    borderWidth={0}
                    borderRadius={10}
                  />
                  <Text className="text-white font-exoSemi text-xs">
                    {Math.round(progressPercent * 100)}%
                  </Text>
                  <Text className="text-[10px] text-white  text-right">
                    {progressValue} / {totalLevels} levels completed
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default React.memo(UserProgress);
