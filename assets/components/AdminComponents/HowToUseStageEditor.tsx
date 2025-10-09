import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
const HowToUseStageEditor = ({
  visibility,
  scaleStyle,
  closeModal,
}: ScaleModalPayload) => {
  return (
    <Modal visible={visibility} transparent>
      <View className="flex-1 justify-center items-center bg-black/30">
        <Pressable className="absolute inset-0" onPress={closeModal} />
        <View className="w-[80%] h-[70%]">
          <Animated.View
            className="bg-accent border-[2px] h-full border-[#ffffff43] rounded-xl"
            style={[scaleStyle]}
          >
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingVertical: 20,
              }}
              showsVerticalScrollIndicator={true}
            >
              <Text className="text-white font-exoExtraBold text-xl text-center ">
                Welcome to the Stage Editor!
              </Text>
              <Text className="text-white font-exoRegular text-center text-xs my-2">
                Here you can edit and organize stages. Everything you change
                here is what players will see inside the app, so edit carefully!
              </Text>

              <Text className="text-white font-exoBold text-base mt-4">
                Reordering Stages:
              </Text>
              <Text className="text-white font-exoRegular text-xs">
                Press and hold a stage container, and drag it up and down to
                rearrange the order. NOTE: The first stage CANNOT be reordered
                and deleted as this will serve as the entry point for the user
              </Text>

              <Text className="text-white font-exoBold text-base mt-4">
                Editing contents
              </Text>
              <Text className="text-white font-exoRegular text-xs text-justify">
                Press one of the following containers to edit them. Remember:
                stage visibility is handled automatically, so you don{"'"}t need
                to worry about toggling it on/off.
              </Text>
              <Text className="text-white font-exoRegular text-xs text-justify">
                Careful what you are editing as these contents are what will be
                seen by the users!
              </Text>

              <Text className="text-white font-exoBold text-base mt-4">
                Adding Lesson
              </Text>
              <Text className="text-white font-exoRegular text-xs text-justify">
                Simply scroll down to the bottom of the list and tap the +
                icon...
              </Text>

              <Text className="text-white font-exoBold text-base mt-4">
                Saving
              </Text>
              <Text className="text-white font-exoRegular text-xs text-justify">
                Make sure to save the changes when you edit a lesson...
              </Text>

              <Text className="text-white font-exoBold tex t-basemt-4">
                Deleting
              </Text>
              <Text className="text-white font-exoRegular text-xs text-justify">
                If you need to remove a stage, simply press one of the
                containers and scroll down to find the delete button.
              </Text>
              <Text className="text-white font-exoRegular text-sm text-justify">
                (⚠️ Be careful — this action cannot be undone.)
              </Text>

              <Text className="text-white font-exoBold text-base mt-4">
                Validation
              </Text>
              <Text className="text-white font-exoRegular text-xs text-justify">
                Make sure that all fields are satisfied or the stage {"won't"}{" "}
                be saved.
              </Text>
              <Text className="text-white font-exoRegular text-xs text-justify mt-2">
                {"That's it! "}🎮 Go ahead and start customizing your stages.
                Have fun building an awesome learning experience!
              </Text>
            </ScrollView>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

export default HowToUseStageEditor;

const styles = StyleSheet.create({});
