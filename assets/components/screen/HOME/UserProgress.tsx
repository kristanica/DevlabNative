import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";
import HomeLesson from "../../HomeLesson";

const UserProgress = ({ lessons, activeLevel, userProgress }: any) => {
  console.log(userProgress["Html"] + "Progress on Html");
  return (
    <>
      <Text className="text-white ml-2 xs:text-lg  font-exoBold">
        VIEW YOUR PROGRESS
      </Text>
      {/* Renders HomeLesson component */}
      <View className="flex-col justify-center">
        {lessons.map((item: any, index: number) => (
          <HomeLesson
            key={item.id}
            name={item.name}
            color={item.color}
            icon={item.icon}
            index={index}
          >
            <AnimatedProgressWheel
              progress={userProgress[item.name]}
              showProgressLabel={true}
              rotation={"-90deg"}
              subtitle={` / ${activeLevel[item.name]["levelCounter"]}`}
              subtitleStyle={{ fontSize: 5, color: "white" }}
              labelStyle={{ fontSize: 5, color: "white" }}
              color={"#2CB67D"}
              backgroundColor={"#242629"}
              size={50}
              width={5}
              rounded
            />
          </HomeLesson>
        ))}
      </View>
    </>
  );
};

export default React.memo(UserProgress);

const styles = StyleSheet.create({});
