import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import HomeLesson from "@/assets/components/HomeLesson";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { lessons } from "@/assets/constants/constants";

import { useBackground } from "@/assets/zustand/BackgroundProvider";
import { useProfile } from "@/assets/zustand/ProfileProvider";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
export default function Home() {
  // Recieves background and profile images
  const { backgroundVal } = useBackground();
  const { profileVal } = useProfile();
  const { userData } = useGetUserInfo();

  return (
    <ProtectedRoutes>
      <View className="flex-[1] bg-accent">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <View className="flex-[2] py-3 ">
              <ImageBackground
                source={
                  // backgroundVal context usage
                  backgroundVal
                    ? { uri: backgroundVal }
                    : // Default val if backgroundVal is false
                      require("@/assets/images/profile.png")
                }
                className="flex-row flex-[1]  overflow-hidden "
              >
                {/* Renders left side user information */}
                <View className="flex-[2]  justify-center items-center">
                  {profileVal && (
                    <Image
                      // profileVal context usage
                      source={
                        profileVal
                          ? { uri: profileVal }
                          : // Default val if profileVal is false
                            require("@/assets/images/profile.png")
                      }
                      className=" rounded-full xs:w-28 xs:h-28 "
                    />
                  )}

                  <Text className="xs:text-xs text-white font-exoLight">
                    {userData?.bio}
                  </Text>
                </View>
                {/* Renders right side user information */}
                <View className="flex-[3] justify-center items-star ">
                  <Text className="text-white font-exoBold xs:text-xl">
                    Good to see you!
                  </Text>
                  <Text className="text-white xs:text-lg font-exoExtraBold">
                    {userData?.username}
                  </Text>
                  <Text className="text-white font-exoBold xs:text-xs">
                    {"Level"} {userData?.userLevel}
                  </Text>
                  {/* EXP bar */}
                  <View className="w-[95%] h-4 rounded-xl bg-[#D9D9D9] overflow-hidden my-2">
                    <View className="w-[80%] bg-[#32FF99] h-4 rounded-xl "></View>
                  </View>
                  <Text className="text-whitefont-exoRegula xs:text-xs">
                    {userData?.exp} {"EXP"}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            {/* Renders rest  */}
            <ScrollView
              bounces={true}
              showsVerticalScrollIndicator={false}
              className="flex-[3]  "
            >
              <Text className="text-white ml-2  xs:text-lg mt-3 font-exoBold">
                JUMP BACK IN
              </Text>

              {/* Routes to last  lesson viewed */}
              <Pressable>
                <View className="bg-accentContainer mx-3 my-2 flex-row rounded-2xl overflow-hidden">
                  <View className="flex-[.5] justify-center items-center bg-[#070606] rounded-2xl">
                    <Ionicons name="logo-html5" size={50} color={"white"} />
                  </View>

                  <View className="flex-1 overflow-hidden p-2 ">
                    <Text className="text-white xs:text-sm font-exoBold">
                      HTML Explorer - The Foundation
                    </Text>

                    <Text
                      className="text-[#94A1B2] text-xs text-justify font-exoLight"
                      numberOfLines={3}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dignissimos, voluptates laudantium sint error deleniti
                      aliquid quasi maiores suscipit a maxime voluptatibus nemo
                      laborum dicta harum totam explicabo temporibus ut facilis?
                    </Text>
                  </View>
                </View>
              </Pressable>
              <Text className="text-white ml-2 xs:text-lg  font-exoBold">
                VIEW YOUR PROGRESS
              </Text>
              {/* Renders HomeLesson component */}
              <View className="flex-row flex-wrap justify-center">
                {lessons.map((item, index) => (
                  <HomeLesson
                    key={item.id}
                    name={item.name}
                    color={item.color}
                    icon={item.icon as keyof typeof Ionicons.glyphMap}
                    index={index}
                  />
                ))}
              </View>
            </ScrollView>
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </ProtectedRoutes>
  );
}
