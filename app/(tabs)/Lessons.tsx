import LessonsContainer from "@/assets/components/LessonsContainer";
import { fontFamily } from "@/fontFamily/fontFamily";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const Lessons = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 bg-accent m-3  p-5 rounded-[10px]">
        <View className="justify-evenly items-center flex-1">
          <Text
            className="text-white text-4xl"
            style={{ fontFamily: fontFamily.ExoExtraBold }}
          >
            LESSONS
          </Text>
          <Text
            className="text-white"
            style={{ fontFamily: fontFamily.ExoRegular }}
          >
            Delve into the realm of web development!{" "}
          </Text>
        </View>

        <View className="flex-row pt-3 flex-wrap justify-evenly  flex-[2]">
          <View className="bg-accentContainer  w-[40%] h-[200px] p-2 rounded-xl border-black border-2">
            <LinearGradient
              colors={["#009DFF", "#4B33FF"]}
              locations={[0.1, 0.8]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.container}
            >
              <Ionicons name="logo-html5" size={50} color={"white"} />
            </LinearGradient>

            <View className="flex-1 justify-center items-center ">
              <Text
                className="text-white"
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                Coding Playground
              </Text>
            </View>
          </View>
          <View className="bg-accentContainer  w-[40%] h-[200px] p-2 rounded-xl border-black border-2">
            <LinearGradient
              colors={["#4CAF50", "#388E3C"]}
              locations={[0.1, 0.8]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.container}
            >
              <Ionicons name="albums" size={50} color={"white"} />
            </LinearGradient>

            <View className="flex-1 justify-center items-center">
              <Text
                className="text-white text-center"
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                Database Playground
              </Text>
            </View>
          </View>
        </View>

        <ScrollView className="flex-[3] border-[#36334B] border-2 rounded-[10px] p-3">
          <LessonsContainer color1="#FFC300" color2="#FF5733" />
          <LessonsContainer color1="#00BFFF" color2="#1E90FF" />
          <LessonsContainer color1="#F7DF1E" color2="#FF8C00" />
          <LessonsContainer color1="#4CAF50" color2="#388E3C" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Lessons;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,

    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
