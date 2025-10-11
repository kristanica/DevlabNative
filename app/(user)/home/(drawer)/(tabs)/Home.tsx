import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ExperienceBar from "@/assets/components/HomeComponents/ExperienceBar";
import InventoryItemContainer from "@/assets/components/HomeComponents/InventoryItemContainer";
import HomeLesson from "@/assets/components/HomeLesson";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import { auth, lessons, URL } from "@/assets/constants/constants";
import tryCatch from "@/assets/Hooks/function/tryCatch";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Progress from "react-native-progress";
export default function Home() {
  const setUserProgress = useGetUserInfo((state) => state.setUserProgress);
  const userProgressData = useGetUserInfo((state) => state.allProgressStages);
  // const { data: userProgressData } = useQuery({
  //   queryKey: ["userProgress"],
  //   queryFn: userProgress,
  // });

  // useEffect(() => {
  //   setUserProgress({
  //     allProgressLevels: userProgressData.allProgress,
  //     allProgressStages: userProgressData.allStages,
  //     completedLevels: userProgressData.completedLevels,
  //     completedStages: userProgressData.completedStages,
  //   });
  // }, [userProgressData, setUserProgress]);

  const { userData, inventory } = useGetUserInfo();

  const getUserProg = useMutation({
    mutationFn: async () => {
      const token = await auth.currentUser?.getIdToken(true);
      const [data, error] = await tryCatch(
        axios.get(`${URL}/fireBase/userProgres/Html`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
      if (error) {
        console.log(error);
        return;
      }

      console.log(data.data.allStages);
    },
  });

  return (
    <ProtectedRoutes>
      <View className="flex-[1] bg-accent">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <View className="flex-[2] py-3 ">
              <ImageBackground
                source={
                  userData?.backgroundImage
                    ? { uri: userData?.backgroundImage }
                    : require("@/assets/images/profile.png")
                }
                className="flex-row flex-[1]  overflow-hidden border-[#adb2be]  border-b-[2px]"
              >
                {/* Renders left side user information */}
                <View className="flex-[2]  justify-center items-center">
                  {userData?.profileImage && (
                    <Image
                      // profileVal context usage
                      source={
                        userData?.profileImage
                          ? { uri: userData?.profileImage }
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

                  <ExperienceBar
                    userExp={userData!.exp!}
                    userLevel={userData!.userLevel}
                    treshold={100}
                  ></ExperienceBar>
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
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: `/home/category/[categoryId]`,
                    params: {
                      categoryId: String(userData?.lastOpenedLevel?.subject),
                    },
                  });
                }}
              >
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
              <TouchableOpacity
                onPress={async () => {
                  getUserProg.mutate();
                }}
              >
                <Text className="text-white ml-2 xs:text-lg  font-exoBold">
                  YOUR INVENTORY
                </Text>
              </TouchableOpacity>

              <View className="flex-row flex-wrap justify-center">
                {inventory.map((item) => (
                  <InventoryItemContainer
                    key={item.id}
                    {...item}
                  ></InventoryItemContainer>
                ))}
              </View>
            </ScrollView>
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </ProtectedRoutes>
  );
}
