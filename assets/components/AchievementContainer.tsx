import { fontFamily } from "@/fontFamily/fontFamily";
import { LinearGradient } from "expo-linear-gradient";
import React, { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type AchievementContainerProps = {
  name: string;
  description: string;
  id: number;
  complete: boolean;
};

const AchievementContainer = ({
  name,
  description,
  id,
  complete,
}: AchievementContainerProps) => {
  return (
    <View key={id}>
      <LinearGradient
        colors={["#00FFE0", "#8C52FF"]}
        locations={[0.1, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <View className="bg-[#111827] rounded-3xl m-[1px] flex-col flex-1  ">
          <View className="flex-[2] justify-center items-center">
            <Image
              source={require("@/assets/images/success.png")}
              style={{ height: 75, width: 75 }}
            />
          </View>

          <View className="flex-[.5] justify-center items-center border-t-2 b-black mx-5">
            <Text
              className="text-white"
              style={{ fontFamily: fontFamily.ExoExtraBold }}
            >
              {name}
            </Text>
          </View>

          <View className="flex-[.5] justify-center items-center">
            <Text
              className="text-[#94A1B2] text-center"
              style={{ fontFamily: fontFamily.ExoLight }}
            >
              {description}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: complete ? "#1ABC9C" : "#FF6166",
            }}
            className="flex-[.5] justify-center items-center mx-10 my-2 rounded-3xl"
          >
            <Text
              className="text-white text-center"
              style={{ fontFamily: fontFamily.ExoBold }}
            >
              {complete ? "Completed" : "Inprogress"}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default memo(AchievementContainer);
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: 170,
    height: 250,
    marginBottom: 10,
    margin: 5,
  },
});
