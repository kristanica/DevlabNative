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
    <Modal visible={visibility} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/40">
        <Pressable className="absolute inset-0" onPress={closeModal} />
        <View className="w-[85%] h-[75%]">
          <Animated.View
            className="bg-accent border-2 border-white/20 rounded-2xl h-full overflow-hidden"
            style={[scaleStyle]}
          >
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 18,
                paddingVertical: 22,
              }}
              showsVerticalScrollIndicator={true}
            >
              {/* Title */}
              <Text className="text-white font-exoExtraBold text-2xl text-center mb-2">
                Stage Editor Guide
              </Text>
              <Text className="text-white font-exoRegular text-xs text-center mb-4">
                Everything you customize here is what players will see inside
                the game— so tweak wisely!
              </Text>

              {/* Reordering */}
              <Text className="font-exoBold text-md text-blue-500 mt-2">
                🔁 Reordering Stages
              </Text>
              <Text className="text-white font-exoRegular text-xs text-justify mt-1">
                Press and hold a stage, then drag it up or down to reorder. ⚠️
                The first stage cannot be moved or deleted, as it serves as the
                entry point.
              </Text>

              {/* Editing */}
              <Text className="font-exoBold text-md text-pink-400 mt-3">
                ✏️ Editing Content
              </Text>
              <Text className="text-white font-exoRegular text-xs text-justify mt-1">
                Tap a stage container to edit its details. Visibility is managed
                automatically, so no manual toggles are required.
              </Text>
              <Text className="text-white font-exoRegular text-xs text-justify">
                Ensure accuracy—players will directly interact with your final
                version.
              </Text>

              {/* Adding */}
              <Text className="font-exoBold text-md text-green-400 mt-3">
                ➕ Adding a Stage
              </Text>
              <Text className="text-white font-exoRegular text-xs text-justify mt-1">
                Scroll to the bottom of the list and tap the + icon to create a
                new stage.
              </Text>

              {/* Saving */}
              <Text className="font-exoBold text-md text-yellow-400 mt-3">
                💾 Saving Changes
              </Text>
              <Text className="text-white font-exoRegular text-xs text-justify mt-1">
                Always hit "Save" after editing. Unsaved progress will not be
                applied.
              </Text>

              {/* Deleting */}
              <Text className="font-exoBold text-md text-red-400 mt-3">
                🗑️ Deleting a Stage
              </Text>
              <Text className="text-white font-exoRegular text-xs text-justify mt-1">
                Tap a stage, scroll, and press the delete button to remove it.
              </Text>
              <Text className="text-white font-exoRegular text-sm text-justify">
                (⚠️ This action is permanent and cannot be undone.)
              </Text>

              {/* Validation */}
              <Text className="font-exoBold text-base text-purple-400 mt-4">
                ✅ Validation
              </Text>
              <Text className="text-white font-exoRegular text-xs text-justify mt-1">
                All required fields must be filled out correctly, or the stage
                will not be saved.
              </Text>

              {/* Outro */}
              <Text className="text-white font-exoRegular text-xs text-center mt-4">
                🎮 You’re all set! Start building engaging learning journeys and
                let your creativity take the stage.
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
