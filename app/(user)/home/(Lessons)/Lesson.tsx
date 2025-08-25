import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import LessonsContainer from "@/assets/components/LessonsContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const mock = ["Html", "Css", "JavaScript", "Database"];

const Lessons = () => {
  return (
    <ProtectedRoutes>
      <View className="flex-1 bg-accent">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <View className="flex-1 ">
              <View className="flex-col justify-center items-center">
                <View className="flex-row justify-center items-center">
                  <Ionicons name={"book"} color={"#32B8FF"} size={20} />
                  <Text className="text-white xs:text-xl ml-3 font-exoExtraBold">
                    LESSONS
                  </Text>
                </View>
                <Text className="text-white font-exoMedium xs:text-xs">
                  Delve into the realm of web development
                </Text>
              </View>
              <View className="flex-row justify-between  items-center mx-2 flex-[1] ">
                <Pressable
                  onPress={() =>
                    router.replace({ pathname: "/(user)/playground/Coding" })
                  }
                  className="w-40 xs:w-40  md:w-40 aspect-square"
                >
                  <LinearGradient
                    colors={["#32B8FF", "#007BFF"]}
                    locations={[0.3, 0.9]}
                    start={{ x: 0.3, y: 0.5 }}
                    style={styles.container}
                  >
                    <Ionicons name={"logo-css3"} size={50} color={"white"} />
                    <Text className="text-white font-exoBold xs:text-sm">
                      Coding Playground
                    </Text>
                    <Text className="text-[#CFEFFF]  font-exoRegular xs:text-xs">
                      Try HTML/CSS/JS
                    </Text>
                  </LinearGradient>
                </Pressable>
                <Pressable
                  className="w-40 xs:w-40  md:w-40 aspect-square"
                  onPress={() =>
                    router.replace({ pathname: "/(user)/playground/Database" })
                  }
                >
                  <LinearGradient
                    style={styles.container}
                    colors={["#4DC066", "#0E8A4E"]}
                    locations={[0.3, 0.9]}
                    start={{ x: 0.1, y: 0.5 }}
                  >
                    <Ionicons name={"cube"} size={50} color={"white"} />
                    <Text className="text-white font-exoBold xs:text-sm text-center">
                      Database Playground
                    </Text>
                    <Text className="text-[#CFFFE0] font-exoRegular text-sm">
                      Try HTML/CSS/JS
                    </Text>
                  </LinearGradient>
                </Pressable>
              </View>
              <View className="flex-[2] justify-center items-center ">
                <FlatList
                  pagingEnabled
                  horizontal
                  data={mock}
                  renderItem={({ item }) => <LessonsContainer name={item} />}
                  keyExtractor={(item) => item}
                  decelerationRate={"fast"}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default Lessons;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
