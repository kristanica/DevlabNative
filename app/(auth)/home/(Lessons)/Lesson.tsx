import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import LessonsContainer from "@/assets/components/LessonsContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Lessons = () => {
  return (
    <ProtectedRoutes>
      <View className="flex-1 bg-accent">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            {/* Renders tab information */}
            <View className="justify-evenly items-center flex-1">
              <Text className="text-white text-4xl font-exoExtraBold">
                LESSONS
              </Text>
              <Text className="text-white font-exoRegular">
                Delve into the realm of web development!{" "}
              </Text>
            </View>

            <View className="flex-row pt-3 flex-wrap justify-evenly  flex-[2]">
              <TouchableOpacity
                className=" w-[40%] h-[200px]"
                // onPress={() =>
                //   router.replace("/(auth)/(Lessons)/playground/Coding")
                // }
              >
                <View className="bg-accentContainer h-full w-full p-2 rounded-xl border-black border-2">
                  {/* Gradient background */}
                  <LinearGradient
                    colors={["#009DFF", "#4B33FF"]}
                    locations={[0.1, 0.8]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.container}
                  >
                    <Ionicons name="logo-html5" size={50} color={"white"} />
                  </LinearGradient>

                  {/* Routes to Coding playground */}

                  <View className="flex-1 justify-center items-center ">
                    <Text className="text-white font-exoBold">
                      Coding Playground
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className=" w-[40%] h-[200px]">
                <View className="bg-accentContainer h-full w-full  p-2 rounded-xl border-black border-2">
                  {/* Gradient background */}
                  <LinearGradient
                    colors={["#4CAF50", "#388E3C"]}
                    locations={[0.1, 0.8]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.container}
                  >
                    <Ionicons name="albums" size={50} color={"white"} />
                  </LinearGradient>
                  {/* Routes to Database playground */}
                  <View className="flex-1 justify-center items-center">
                    <Text className="text-white text-center font-exoBold">
                      Database Playground
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/* Renders lessonContainer component */}
            <ScrollView className="flex-[3] border-[#36334B] border-2 rounded-[10px] p-3">
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: "/(auth)/home/(Lessons)/category/[categoryId]",
                    params: { categoryId: "Html" },
                  });
                }}
              >
                <LessonsContainer color1="#FFC300" color2="#FF5733" />
              </Pressable>

              <Pressable
                onPress={() => {
                  router.push({
                    pathname: "/(auth)/home/(Lessons)/category/[categoryId]",
                    params: { categoryId: "Css" },
                  });
                }}
              >
                <LessonsContainer color1="#00BFFF" color2="#1E90FF" />
              </Pressable>
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: "/(auth)/home/(Lessons)/category/[categoryId]",
                    params: { categoryId: "JavaScript" },
                  });
                }}
              >
                <LessonsContainer color1="#F7DF1E" color2="#FF8C00" />
              </Pressable>

              <Pressable
                onPress={() => {
                  router.push({
                    pathname: "/(auth)/home/(Lessons)/category/[categoryId]",
                    params: { categoryId: "Database" },
                  });
                }}
              >
                <LessonsContainer color1="#4CAF50" color2="#388E3C" />
              </Pressable>
            </ScrollView>
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </ProtectedRoutes>
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
