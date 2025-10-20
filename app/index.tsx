import RenderCounter from "@/assets/components/global/RenderCounter";
import Footer from "@/assets/components/screen/INDEX/Footer";
import { auth } from "@/assets/constants/constants";

import { router } from "expo-router";
import { signOut } from "firebase/auth";
import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";
// import CodeHighlighter from "react-native-code-highlighter";
// import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
const index = () => {
  RenderCounter("index");
  const handleLogin = async () => {
    const currentuser = auth.currentUser;
    if (currentuser) {
      console.log("There is a current user!");
      await signOut(auth);
    }
    router.replace({ pathname: "/Login" });
  };

  return (
    <View className="bg-background flex-[1] justify-center items-center ">
      <View className="flex-[1] ">
        <View className="flex-[2] justify-center items-center">
          <LottieView
            source={require("@/assets/Lottie/devlab-lottie-final.json")}
            autoPlay
            loop={false}
            style={{ width: "100%", aspectRatio: 1 }}
          ></LottieView>
        </View>
        <View className="absolute">
          {/* <CodeHighlighter
            hljsStyle={atomOneDarkReasonable}
            containerStyle={styles.codeContainer}
            textStyle={styles.text}
            language="javascript"
          >
            {codeString}
          </CodeHighlighter> */}
        </View>

        <Footer handleLogin={handleLogin}></Footer>
      </View>
    </View>
  );
};

export default index;
// const styles = StyleSheet.create({
//   codeContainer: {
//     padding: 16,
//     backgroundColor: "#282c34", // matching atomOneDarkReasonable background
//   },
//   text: {
//     fontSize: 10,
//   },
// });
