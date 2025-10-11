import Ionicons from "@expo/vector-icons/Ionicons";
import { Video } from "expo-av";
import * as Clipboard from "expo-clipboard";
import React, { useRef } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type StageLessonprops = {
  currentStageData: stageDataPayload;
};

const StageLesson = ({ currentStageData }: any) => {
  const videoRef = useRef<Video>(null);
  const { width: screenWidth } = useWindowDimensions();
  return (
    <>
      {currentStageData.blocks &&
        currentStageData.blocks.map((item: any) => {
          switch (item.type) {
            case "Header": {
              return (
                <Text
                  key={item.id}
                  className="text-white text-xl font-exoExtraBold"
                >
                  {item.value}
                </Text>
              );
            }
            case "Paragraph": {
              return (
                <Text
                  key={item.id}
                  className=" text-justify text-white font-exoLight my-5 text-xs xs:text-[10xs]"
                >
                  {item.value}
                </Text>
              );
            }
            case "Divider": {
              return (
                <View
                  key={item.id}
                  className=" border-[#464242a4] border-[1px]  my-3 mx-1"
                ></View>
              );
            }
            case "Image": {
              console.log("Image value:", item.value);
              console.log("Image value type:", typeof item.value);
              return (
                <Image
                  key={item.id}
                  source={{ uri: item.value }}
                  style={{
                    width: "100%",
                    height: 200,
                    borderRadius: 10,
                    marginVertical: 10,
                  }}
                  resizeMode="cover"
                />
              );
            }
            default: {
              return (
                <Text key={item.id} className="text-black">
                  {item.value}
                </Text>
              );
            }
          }
        })}
      {currentStageData?.videoPresentation && (
        <Video
          ref={videoRef}
          source={{ uri: currentStageData.videoPresentation }}
          style={styles.video}
          useNativeControls
          isLooping
        />
      )}
      <View className="bg-accentContainer p-3  my-3">
        <Text className="font-exoBold text-xl text-white">Instructions</Text>
        <Text className="text-white font-exoRegular xs:text-xs text-justify my-3">
          {currentStageData?.instruction}
        </Text>
        <View className="bg-background  my-3 flex-row justify-between">
          <ScrollView
            className=" flex-[1] m-3 "
            horizontal={true}
            pagingEnabled
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            alwaysBounceVertical={false}
          >
            <View className=" h-[200px] w-[290px]">
              <TouchableOpacity
                className="absolute right-0 bottom-0"
                onPress={async () => {
                  await Clipboard.setStringAsync(
                    currentStageData?.codingInterface.html! ||
                      "HTML code  is not provided"
                  );
                }}
              >
                <Ionicons
                  name="clipboard-outline"
                  size={20}
                  color={"white"}
                ></Ionicons>
              </TouchableOpacity>
              <Text className="text-white font-exoRegular xs:text-xs text-justify">
                {currentStageData?.codingInterface?.html}
              </Text>
            </View>
            <View className="bg-background h-[200px] w-[320px]">
              <TouchableOpacity
                className="absolute right-0 bottom-0"
                onPress={async () => {
                  await Clipboard.setStringAsync(
                    currentStageData?.codingInterface.css!
                  );
                }}
              >
                <Ionicons
                  name="clipboard-outline"
                  size={20}
                  color={"white"}
                ></Ionicons>
              </TouchableOpacity>
              <Text className="text-white font-exoRegular xs:text-xs text-justify">
                {currentStageData?.codingInterface?.css ||
                  "Css code is not provided"}
              </Text>
            </View>
            <View className="bg-background h-[200px] w-[290px] relative">
              <TouchableOpacity
                className="absolute right-0 bottom-0"
                onPress={async () => {
                  await Clipboard.setStringAsync(
                    currentStageData?.codingInterface.js! ||
                      "JavaScript code  is not provided"
                  );
                }}
              >
                <Ionicons
                  name="clipboard-outline"
                  size={20}
                  color={"white"}
                ></Ionicons>
              </TouchableOpacity>
              <Text className="text-white font-exoRegular xs:text-xs text-justify">
                {currentStageData?.codingInterface?.js}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default React.memo(StageLesson);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  video: { width: "100%", height: 200 },
});
