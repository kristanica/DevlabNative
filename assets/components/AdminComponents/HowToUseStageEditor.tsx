import { ScaleModalProps } from "@/assets/constants/type";
import React from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

const HowToUseStageEditor = ({
  visibility,
  scaleStyle,
  closeModal,
  onConfirm,
}: ScaleModalProps) => {
  return (
    <Modal visible={visibility} transparent>
      <Pressable
        className="flex-1 justify-center items-center bg-black/30"
        onPress={closeModal}
      >
        <Pressable className="w-[80%] h-[70%]">
          <Animated.View
            className="bg-accent border-[2px] h-full border-[#ffffff43] rounded-xl"
            style={[scaleStyle]}
          >
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 20,
              }}
            >
              <Text className="text-white font-exoExtraBold text-xl text-center ">
                Welcome to the Stage Editor!
              </Text>
              <Text className="text-white font-exoRegular text-center text-sm my-2">
                Here you can edit and organize stages. Everything you change
                here is what players will see inside the app, so edit carefully!
              </Text>

              <Text className="text-white font-exoBold text-base mt-4">
                Reordering Stages:
              </Text>
              <Text className="text-white font-exoRegular text-sm">
                Press and hold a stage container, and drag it up and down to
                rearrange the order
              </Text>

              <Text className="text-white font-exoBold text-base mt-4">
                Editing contents
              </Text>
              <Text className="text-white font-exoRegular text-sm text-justify">
                Press one of the following containers to edit them. Remember:
                stage visibility is handled automatically, so you don{"'"}t need
                to worry about toggling it on/off.
              </Text>
              <Text className="text-white font-exoRegular text-sm text-justify">
                Careful what you are editing as these contents are what will be
                seen by the users!
              </Text>

              <Text className="text-white font-exoBold text-base mt-4">
                Adding Lesson
              </Text>
              <Text className="text-white font-exoRegular text-sm text-justify">
                Simply scroll down to the bottom of the list and tap the +
                icon...
              </Text>

              <Text className="text-white font-exoBold text-base mt-4">
                Saving
              </Text>
              <Text className="text-white font-exoRegular text-sm text-justify">
                Make sure to save the changes when you edit a lesson...
              </Text>

              <Text className="text-white font-exoBold text-base mt-4">
                Deleting
              </Text>
              <Text className="text-white font-exoRegular text-sm text-justify">
                If you need to remove a stage, simply press one of the
                containers and scroll down to find the delete button.
              </Text>
              <Text className="text-white font-exoRegular text-sm text-justify">
                (⚠️ Be careful — this action cannot be undone.)
              </Text>

              <Text className="text-white font-exoBold text-base mt-4">
                Validation
              </Text>
              <Text className="text-white font-exoRegular text-sm text-justify">
                Make sure that all fields are satisfied or the stage won’t be
                saved.
              </Text>
              <Text className="text-white font-exoRegular text-sm text-justify mt-2">
                That’s it! 🎮 Go ahead and start customizing your stages. Have
                fun building an awesome learning experience!
              </Text>
            </ScrollView>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default HowToUseStageEditor;

const styles = StyleSheet.create({});
