import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import HomeLesson from "../../HomeLesson";
const UserProgress = ({ lessons }: any) => {
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
            <Progress.Circle
              style={{ margin: "auto" }}
              size={80}
              progress={1}
              showsText={true}
              thickness={6}
              color="green"
              textStyle={{ color: "white", fontWeight: 900 }}
            />
          </HomeLesson>
        ))}
      </View>
    </>
  );
};

export default React.memo(UserProgress);

const styles = StyleSheet.create({});
