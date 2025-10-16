import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedProgressWheel from "react-native-progress-wheel";
import HomeLesson from "../../HomeLesson";

const UserProgress = ({ lessons, activeLevel, userProgress }: any) => {
  console.log(
    Math.min(
      1,
      userProgress["Database"] / activeLevel["Database"]["levelCounter"]
    )
  );
  return (
    <>
      <Text className="text-white ml-2 xs:text-lg  font-exoBold">
        VIEW YOUR PROGRESS
      </Text>
      {/* Renders HomeLesson component */}
      <View className="flex-row flex-wrap justify-center">
        {lessons.map((item: any, index: number) => (
          <HomeLesson
            key={item.id}
            name={item.name}
            color={item.color}
            index={index}
          >
            <AnimatedProgressWheel
              progress={userProgress[item.name]}
              max={activeLevel[item.name]["levelCounter"]}
              showProgressLabel={true}
              rotation={"-90deg"}
              subtitle={` out of ${activeLevel[item.name]["levelCounter"]}`}
              subtitleStyle={{ fontSize: 10 }}
              labelStyle={{ fontSize: 10 }}
              color={"green"}
              backgroundColor={"gray"}
              size={100}
              width={10}
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
