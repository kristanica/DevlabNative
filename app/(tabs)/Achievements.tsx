import AchievementsProgressBar from "@/assets/components/AchievementsProgressBar";
import { fontFamily } from "@/fontFamily/fontFamily";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
const Achievements = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="bg-slate-300 flex-[1] m-3 rounded-[10px] ">
        <View className="flex-[1] justify-center items-center ">
          <Image
            source={require("@/assets/images/profile.png")}
            style={{ height: 100, width: 100 }}
          />
        </View>

        <View className="justify-center items-center flex-[.5] ">
          <Text>LAIN</Text>
          <Text>Hall of Achievements</Text>
        </View>

        <View className="flex-[1]  flex-row justify-center items-center">
          <AchievementsProgressBar />
          <AchievementsProgressBar />
          <AchievementsProgressBar />
          <AchievementsProgressBar />
        </View>
      </View>

      <View className="bg-accent flex-[2] m-3 mt-0">
        <View className="flex-[.1] bg-red-300 flex-row justify-evenly">
          <Text>HTML</Text>
          <Text>HTML</Text>
          <Text>HTML</Text>
          <Text>HTML</Text>
        </View>

        <ScrollView
          className="flex-[1] m-3"
          showsVerticalScrollIndicator={false}
        >
          <View className="justify-center items-center bg-red-700 ">
            <Text>HTML ACHIEVEMENTS</Text>
          </View>

          <View className="flex-[1] flex-row flex-wrap justify-between">
            <LinearGradient
              colors={["#00FFE0", "#8C52FF"]}
              locations={[0.1, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.container}
            >
              <View className="bg-[#111827] rounded-3xl m-[1px] flex-col flex-1">
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
                    Markup Master
                  </Text>
                </View>

                <View className="flex-[.5] justify-center items-center">
                  <Text
                    className="text-[#94A1B2] text-center"
                    style={{ fontFamily: fontFamily.ExoLight }}
                  >
                    Master the basics of HTML elements and tags
                  </Text>
                </View>

                <View className="flex-[.5] justify-center items-center bg-[#36DB4F] mx-10 my-2 rounded-3xl">
                  <Text className="text-white text-center">Completed</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Achievements;
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: 180,
    height: 250,
    marginBottom: 10,
  },
});
