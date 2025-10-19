import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";
import HomeLesson from "../../HomeLesson";

const UserProgress = ({ lessons, activeLevel, userProgress }: any) => {
  console.log(userProgress["Html"] + "Progress on Html");
  return (
    <>
      <Text className="text-white ml-3  xs:text-lg font-exoBold tracking-wide">
        VIEW YOUR PROGRESS
      </Text>

      <View className="flex-col mt-2 space-y-3">
        {lessons.map((item: any, index: number) => (
          <HomeLesson
            key={item.id}
            name={item.name}
            color={item.color}
            icon={item.icon}
            index={index}
          >
            <View className="flex-row items-center justify-between  bg-accentContainer rounded-2xl shadow-md">
              <AnimatedProgressWheel
                progress={userProgress[item.name] || 0}
                showProgressLabel={true}
                rotation="-90deg"
                subtitle={` / ${activeLevel[item.name]?.levelCounter || 0}`}
                subtitleStyle={{ fontSize: 6, color: "white" }}
                labelStyle={{ fontSize: 6, color: "white" }}
                color={item.color || "#2CB67D"}
                backgroundColor="#2A2A35"
                size={50}
                width={5}
                rounded
              />
            </View>
          </HomeLesson>
        ))}
      </View>
    </>
  );
};

export default React.memo(UserProgress);

const styles = StyleSheet.create({});
