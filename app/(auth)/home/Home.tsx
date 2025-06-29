import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import ButtonComponent from "@/assets/components/ButtonComponent";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import HomeLesson from "@/assets/components/HomeLesson";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { lessons } from "@/assets/constants/constants";
import { useBackground } from "@/assets/Provider/BackgroundProvider";
import { useProfile } from "@/assets/Provider/ProfileProvider";
import { boxShadow } from "@/assets/styles/ContainerStyles";
import { fontFamily } from "@/fontFamily/fontFamily";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";

export default function Home() {
  // Recieves background and profile images
  const { backgroundVal } = useBackground();
  const { profileVal } = useProfile();

  return (
    <ProtectedRoutes>
      <View className="flex-[1] bg-accent">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <ImageBackground
              source={
                // backgroundVal context usage
                backgroundVal
                  ? { uri: backgroundVal }
                  : // Default val if backgroundVal is false
                    require("@/assets/images/profile.png")
              }
              className="flex-row flex-1 bg-accent  rounded-[10px] overflow-hidden"
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
                    className="w-[100px] h-[100px] rounded-full overflow-hidden border-black border-[1px]"
                  />
                )}

                <Text
                  className="text-xs text-white"
                  style={[
                    { fontFamily: fontFamily.ExoLight },
                    boxShadow.textShadowLight,
                  ]}
                >
                  This is an awesome bio
                </Text>
              </View>
              {/* Renders right side user information */}
              <View className="flex-[3] justify-center items-star ">
                <Text
                  className="text-white"
                  style={[
                    { fontFamily: fontFamily.ExoBold },
                    boxShadow.textShadowLight,
                  ]}
                >
                  Good to see you!
                </Text>
                <Text
                  className="text-white text-4xl "
                  style={[
                    { fontFamily: fontFamily.ExoExtraBold },
                    boxShadow.textShadow,
                  ]}
                >
                  LAIN LAIN
                </Text>
                <Text
                  className="text-white"
                  style={[
                    { fontFamily: fontFamily.ExoBold },
                    boxShadow.textShadowLight,
                  ]}
                >
                  LEVEL 91
                </Text>
                {/* EXP bar */}
                <View
                  style={boxShadow.shadow}
                  className="w-[95%] h-4 rounded-xl bg-[#D9D9D9] overflow-hidden my-2 drop-shadow-xs "
                >
                  <View
                    style={boxShadow.shadow}
                    className="w-[80%] bg-[#32FF99] h-4 rounded-xl"
                  ></View>
                </View>
                <Text
                  className="text-white text-shadow-lg/30"
                  style={[
                    { fontFamily: fontFamily.ExoRegular },
                    boxShadow.textShadowLight,
                  ]}
                >
                  100/200 XP
                </Text>
              </View>
            </ImageBackground>

            {/* Renders rest  */}
            <ScrollView
              bounces={true}
              showsVerticalScrollIndicator={false}
              className="flex-[3]  "
            >
              <Text
                className="text-white ml-2 text-xl mt-3"
                style={[
                  { fontFamily: fontFamily.ExoBold },
                  boxShadow.textShadowLight,
                ]}
              >
                JUMP BACK IN
              </Text>

              {/* Routes to last  lesson viewed */}
              <ButtonComponent backgroundColor={""}>
                <View className="bg-accentContainer mx-3 my-2 flex-row rounded-2xl overflow-hidden">
                  <View className="flex-[.5] justify-center items-center bg-[#070606] rounded-2xl">
                    <Ionicons name="logo-html5" size={50} color={"white"} />
                  </View>

                  <View className="flex-1 overflow-hidden p-2 ">
                    <Text
                      className="text-white text-sm text-justify"
                      style={{ fontFamily: fontFamily.ExoBold }}
                    >
                      HTML Explorer - The Foundation
                    </Text>

                    <Text
                      className="text-[#94A1B2] text-xs text-justify"
                      style={{ fontFamily: fontFamily.ExoLight }}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dignissimos, voluptates laudantium sint error deleniti
                      aliquid quasi maiores suscipit a maxime voluptatibus nemo
                      laborum dicta harum totam explicabo temporibus ut facilis?
                    </Text>
                  </View>
                </View>
              </ButtonComponent>
              <Text
                className="text-white ml-2 text-xl "
                style={[
                  { fontFamily: fontFamily.ExoBold },
                  boxShadow.textShadowLight,
                ]}
              >
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
