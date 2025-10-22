import useModal from "@/assets/Hooks/useModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ResizeMode, Video } from "expo-av";
import React, { Suspense, useRef } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Accordion from "../../global/Accordion";
import RenderCounter from "../../global/RenderCounter";
import SmallLoading from "../../global/SmallLoading";
const LessonModal = React.lazy(() => import("../Modals/LessonModal"));

type StageLessonprops = {
  currentStageData: stageDataPayload;
};

const StageLesson = ({ currentStageData }: any) => {
  const videoRef = useRef<Video>(null);
  const lesson = useModal();
  RenderCounter("StageLesson");
  return (
    <>
      <Pressable
        className="absolute right-5 z-50"
        onPress={() => lesson.setVisibility((prev) => !prev)}
      >
        <Ionicons
          name={"information-circle"}
          size={20}
          color={"white"}
        ></Ionicons>
      </Pressable>

      {lesson.visibility && (
        <Suspense fallback={<SmallLoading></SmallLoading>}>
          <LessonModal {...lesson} />
        </Suspense>
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
        <View className="bg-accentContainer p-2">
          <Video
            ref={videoRef}
            source={{ uri: currentStageData.videoPresentation }}
            style={styles.video}
            useNativeControls
            isLooping
            resizeMode={ResizeMode.CONTAIN}
          />
        </View>
      )}
      <View className="bg-accentContainer p-3  my-3">
        <Text className="font-exoBold text-xl text-white">Instructions</Text>
        <Text className="text-white font-exoRegular xs:text-xs text-justify my-3">
          {currentStageData?.instruction}
        </Text>
        <View className="bg-background my-3 flex-col">
          {currentStageData?.codingInterface &&
            Object.entries(currentStageData.codingInterface).map(
              ([key, value]: any) => {
                if (!value) return;
                return <Accordion header={key} contents={value!} key={key} />;
              }
            )}
        </View>
      </View>
    </>
  );
};

export default React.memo(StageLesson);
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  video: { width: "100%", height: 200 },
});
