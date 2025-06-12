import HomeLesson from "@/assets/components/HomeLesson";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { fontFamily } from "@/fontFamily/fontFamily";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signOut } from "firebase/auth";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Home() {
  const auth = FIREBASE_AUTH;

  const out = async () => {
    try {
      await signOut(auth);
      alert("Log out!");
    } catch {
      alert("Something went wrong....");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background ">
      <View className="flex-row flex-1 bg-accent m-3 rounded-[10px]">
        <View className="flex-[2]  justify-center items-center">
          <Ionicons name="person-circle" size={50} color={"#314A70"} />
          <Text
            className="text-xs text-white"
            style={{ fontFamily: fontFamily.ExoLight }}
          >
            This is an awesome bio
          </Text>
        </View>

        <View className="flex-[3] justify-center items-star ">
          <Text
            className="text-white"
            style={{ fontFamily: fontFamily.ExoBold }}
          >
            Good to see you!
          </Text>
          <Text
            className="text-white text-4xl "
            style={{ fontFamily: fontFamily.ExoExtraBold }}
          >
            LAIN LAIN
          </Text>
          <Text
            className="text-white"
            style={{ fontFamily: fontFamily.ExoRegular }}
          >
            LEVEL 91
          </Text>

          <View className="w-[95%] h-4 rounded-xl bg-[#D9D9D9] overflow-hidden my-2 drop-shadow-xs ">
            <View className="w-[80%] bg-[#32FF99] h-4 rounded-xl"></View>
          </View>
          <Text
            className="text-white text-shadow-lg/30"
            style={{ fontFamily: fontFamily.ExoRegular }}
          >
            100/200 XP
          </Text>
        </View>
      </View>

      <ScrollView
        bounces={true}
        showsVerticalScrollIndicator={false}
        className="flex-[3] rounded-[10px] bg-accent m-3 mt-0 "
      >
        <Text
          className="text-white ml-2 text-xl mt-3"
          style={{ fontFamily: fontFamily.ExoBold }}
        >
          JUMP BACK IN
        </Text>

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
              Dignissimos, voluptates laudantium sint error deleniti aliquid
              quasi maiores suscipit a maxime voluptatibus nemo laborum dicta
              harum totam explicabo temporibus ut facilis?
            </Text>
          </View>
        </View>
        <Text
          className="text-white ml-2 text-xl mt-3"
          style={{ fontFamily: fontFamily.ExoBold }}
        >
          VIEW YOUR PROGRESS
        </Text>

        <View className="flex-row flex-wrap justify-center">
          <HomeLesson name="HTML" color="#FFC300" icon="logo-html5" />
          <HomeLesson name="CSS" color="#00BFFF" icon="logo-css3" />
          <HomeLesson
            name="JavaScript"
            color="#FF8C00"
            icon="logo-javascript"
          />
          <HomeLesson name="Database" color="#388E3C" icon="albums" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
