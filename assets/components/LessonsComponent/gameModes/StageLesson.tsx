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
  return (
    <>
      <Text className="text-white font-exoBold xs:text-xl text-justify">
        {currentStageData?.title}
      </Text>
      <Text className="text-white font-exoRegular xs:text-xs my-3 text-justify">
        {currentStageData?.description}
      </Text>
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

      {currentStageData?.videoPresentation && (
        <Video
          ref={videoRef}
          source={{ uri: currentStageData.videoPresentation }}
          style={styles.video}
          useNativeControls
          isLooping
        />
      )}
    </>
  );
};

export default React.memo(StageLesson);
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  video: { width: "100%", height: 200 },
});
