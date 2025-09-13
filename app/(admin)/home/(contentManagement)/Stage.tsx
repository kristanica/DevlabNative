import EditStageModal from "@/assets/components/AdminComponents/EditStageModal";
import HowToUseStageEditor from "@/assets/components/AdminComponents/HowToUseStageEditor";
import StageContainer from "@/assets/components/AdminComponents/StageContainer";
import AdminProtectedRoutes from "@/assets/components/AdminProtectedRoutes";
import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import useListStage from "@/assets/Hooks/useListStage";
import useModal from "@/assets/Hooks/useModal";
import { cancelVideoCompression } from "@/assets/zustand/cancelVideoCompression";
import tracker from "@/assets/zustand/tracker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

const Stage = () => {
  const setCancelCompression = cancelVideoCompression(
    (state) => state.setCancelCompression
  );
  const stageTracker = tracker((state) => state.setStage);
  const levelPayload = tracker((state) => state.levelPayload);

  const { stagesData, addNewStageMutation, updateOrderMutation } =
    useListStage();
  const tutorial = useModal();
  const { visibility, setVisibility, scaleStyle, closeModal } = useModal();
  return (
    <AdminProtectedRoutes>
      <View className="flex-[1] bg-accent">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <View className="flex-[1]">
              <View className="  h-[20%] flex-row  items-center justify-center px-3">
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons
                    name="arrow-back-circle"
                    size={50}
                    color="#4CAF50"
                  ></Ionicons>
                </TouchableOpacity>
                <Text className="text-white font-exoBold font-lg m-auto">
                  Currently viewing {levelPayload?.lessonId}{" "}
                  {levelPayload?.levelId}
                </Text>
                <Pressable onPress={() => tutorial.setVisibility(true)}>
                  <Ionicons
                    name="alert-circle"
                    size={50}
                    color="#4CAF50"
                  ></Ionicons>
                </Pressable>
              </View>
              <View className=" h-[80%]">
                <DraggableFlatList
                  onDragEnd={({ data }) => {
                    const newOrderedData = data.map((item, index) => {
                      return {
                        ...item,
                        order: index + 1,
                      };
                    });
                    updateOrderMutation.mutate({ newOrder: newOrderedData });
                  }}
                  data={stagesData ?? []}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item: any) => item.id}
                  renderItem={({ item, getIndex, drag, isActive }) => {
                    const index = getIndex();
                    if (index === undefined) {
                      return;
                    }
                    return (
                      <>
                        <TouchableOpacity
                          onLongPress={drag}
                          onPress={() => {
                            stageTracker(item.id);
                            setVisibility(true);
                            setCancelCompression(true);
                          }}
                          disabled={isActive}
                        >
                          <StageContainer
                            item={item}
                            index={index ?? 0}
                          ></StageContainer>
                        </TouchableOpacity>
                      </>
                    );
                  }}
                  ListFooterComponent={() => (
                    <TouchableOpacity
                      className="mx-auto mt-1"
                      onPress={() => addNewStageMutation.mutate()}
                    >
                      <Text className="text-white font-exoExtraBold text-3xl bg-green-400 self-start py-2 px-7 rounded-3xl ">
                        +
                      </Text>
                    </TouchableOpacity>
                  )}
                ></DraggableFlatList>
              </View>
              {tutorial.visibility && (
                <HowToUseStageEditor
                  onConfirm={() => console.log("test")}
                  {...tutorial}
                ></HowToUseStageEditor>
              )}
              {visibility && (
                <EditStageModal
                  visibility={visibility}
                  scaleStyle={scaleStyle}
                  closeModal={closeModal}
                ></EditStageModal>
              )}
            </View>
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </AdminProtectedRoutes>
  );
};

export default Stage;

const styles = StyleSheet.create({});
