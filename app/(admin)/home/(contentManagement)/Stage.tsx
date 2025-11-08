import { AddStage } from "@/assets/components/AdminComponents/AddStage";
import EditStageModal from "@/assets/components/AdminComponents/EditStageModal";
import HowToUseStageEditor from "@/assets/components/AdminComponents/HowToUseStageEditor";
import StageContainer from "@/assets/components/AdminComponents/StageContainer";
import AdminProtectedRoutes from "@/assets/components/AdminProtectedRoutes";
import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import FillScreenLoading from "@/assets/components/global/FillScreenLoading";
import SmallLoading from "@/assets/components/global/SmallLoading";
import useListStage from "@/assets/Hooks/useListStage";
import useModal from "@/assets/Hooks/useModal";
import { cancelVideoCompression } from "@/assets/zustand/cancelVideoCompression";
import tracker from "@/assets/zustand/tracker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlashList } from "@shopify/flash-list";
import { useIsMutating } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

const Stage = () => {
  const setCancelCompression = cancelVideoCompression(
    (state) => state.setCancelCompression
  );
  const stageTracker = tracker((state) => state.setStage);
  const levelPayload = tracker((state) => state.levelPayload);

  const { stagesData, isLoading, addNewStageMutation, updateOrderMutation } =
    useListStage();
  const tutorial = useModal();
  const { visibility, setVisibility, scaleStyle, closeModal } = useModal();

  const isMutating = useIsMutating();

  const testStage = useModal();
  return (
    <AdminProtectedRoutes>
      {isMutating > 0 && <FillScreenLoading></FillScreenLoading>}
      <View className="flex-[1] bg-accent">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <View className="flex-[1]">
              <View className="  h-[10%] flex-row  items-center justify-center px-3">
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons
                    name="arrow-back-circle"
                    size={30}
                    color="white"
                  ></Ionicons>
                </TouchableOpacity>
                <Text className="text-white font-exoBold font-lg m-auto">
                  Currently viewing {levelPayload?.lessonId}{" "}
                  {levelPayload?.levelId}
                </Text>
                <Pressable onPress={() => tutorial.setVisibility(true)}>
                  <Ionicons
                    name="alert-circle"
                    size={30}
                    color="white"
                  ></Ionicons>
                </Pressable>
              </View>
              <View className=" h-[90%]">
                {isLoading ? (
                  <SmallLoading></SmallLoading>
                ) : (
                  <>
                    <FlashList
                      estimatedItemSize={149}
                      data={stagesData ?? []}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item: any) => item.id}
                      renderItem={({ item }) => {
                        return (
                          <>
                            <TouchableOpacity
                              onPress={() => {
                                stageTracker(item.id);
                                setVisibility(true);
                                setCancelCompression(true);
                              }}
                            >
                              <StageContainer
                                stageInformation={item}
                              ></StageContainer>
                            </TouchableOpacity>
                          </>
                        );
                      }}
                      ListFooterComponent={() => (
                        <TouchableOpacity
                          className="mx-auto mt-1"
                          onPress={() => {
                            // addNewStageMutation.mutate();
                            testStage.setVisibility(true);
                          }}
                        >
                          <Text className="text-white font-exoExtraBold text-3xl bg-green-400 self-start py-2 px-7 rounded-3xl ">
                            +
                          </Text>
                        </TouchableOpacity>
                      )}
                    ></FlashList>
                  </>
                )}
              </View>

              {testStage.visibility && <AddStage {...testStage}></AddStage>}

              {tutorial.visibility && (
                <HowToUseStageEditor {...tutorial}></HowToUseStageEditor>
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
{
  /* <DraggableFlatList
                      onDragEnd={({ data }) => onDragEnd(data)}
                      data={draggableStages ?? []}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item: any) => item.id}
                      ListHeaderComponent={
                        firstStage ? (
                          <Pressable
                            onPress={() => {
                              stageTracker(firstStage.id);
                              setVisibility(true);
                              setCancelCompression(true);
                            }}
                          >
                            <StageContainer
                              stageInformation={firstStage}
                              index={0}
                            ></StageContainer>
                          </Pressable>
                        ) : null
                      }
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
                                stageInformation={item}
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
                    ></DraggableFlatList> */
}
