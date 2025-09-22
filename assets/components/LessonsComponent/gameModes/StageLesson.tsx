import { WhereIsUser } from "@/assets/zustand/WhereIsUser";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Video } from "expo-av";
// import * as Clipboard from "expo-clipboard";
import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
type StageLessonprops = {
  currentStageData: any;
};

const StageLesson = ({ currentStageData }: StageLessonprops) => {
  const location = WhereIsUser((state) => state.location);
  console.log(location);
  const videoRef = useRef<Video>(null);
  console.log(currentStageData?.blocks);
  return (
    <>
      <Text className="text-white font-exoBold xs:text-xl text-justify">
        {currentStageData?.title}
      </Text>
      <Text className="text-white font-exoRegular xs:text-xs my-3 text-justify">
        {currentStageData?.description}
      </Text>

      {currentStageData?.videoPresentation && (
        <Video
          ref={videoRef}
          source={{ uri: currentStageData.videoPresentation }}
          style={styles.video}
          useNativeControls
          isLooping
        />
      )}

      {currentStageData.blocks &&
        currentStageData.blocks.map((item: any) => {
          switch (item.type) {
            case "Header": {
              return (
                <Text
                  key={item.id}
                  className="text-white text-xl font-exoExtraBold"
                >
                  {item.value} header
                </Text>
              );
            }
            case "Paragraph": {
              return (
                <Text
                  key={item.id}
                  className=" text-justify text-white font-exoLight my-5"
                >
                  {item.value}
                </Text>
              );
            }
            case "Divider": {
              return (
                <View
                  key={item.id}
                  className=" border-[#464242a4] border-[1px] border-dashed my-3 mx-5"
                ></View>
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
      <View className="bg-accentContainer p-3 rounded-3xl my-3">
        <Text className="font-exoBold text-xl text-white">Instructions</Text>
        <Text className="text-white font-exoRegular xs:text-xs text-justify my-3">
          {currentStageData?.instruction}
        </Text>
        <View className="bg-background p-3 rounded-3xl my-3 flex-row justify-between">
          <Text className="text-white font-exoRegular xs:text-xs text-justify">
            {currentStageData?.codingInterface}
          </Text>
          <TouchableOpacity>
            <Ionicons
              name="clipboard-outline"
              size={20}
              color={"white"}
            ></Ionicons>
          </TouchableOpacity>
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
