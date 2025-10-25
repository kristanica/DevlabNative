import { categoryIcon } from "@/assets/constants/constants";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
type JumpBackInPayload = {
  lastOpenedLevel: any;
};
const JumpBackIn = ({ lastOpenedLevel }: JumpBackInPayload) => {
  const handleJumpBackIn = useCallback(
    (category: string) => {
      if (!lastOpenedLevel[category]) return;
      router.push({
        pathname: "/(user)/home/stage/[stageId]",
        params: {
          stageId: lastOpenedLevel[category].stageId,
          category: lastOpenedLevel[category].subject,
          lessonId: lastOpenedLevel[category].lessonId,
          levelId: lastOpenedLevel[category].levelId,
        },
      });
    },
    [lastOpenedLevel]
  );
  const subject = ["Html", "Css", "JavaScript", "Database"];

  return (
    <>
      <Text className="text-white ml-3  xs:text-lg font-exoBold tracking-wide">
        JUMP BACK IN
      </Text>
      {Object.keys(lastOpenedLevel).length > 0 ? (
        <>
          <FlashList
            data={subject || []}
            renderItem={({ item }) =>
              lastOpenedLevel[item] ? ( // <-- check if the category exists
                <Pressable
                  onPress={() => handleJumpBackIn(item)}
                  className="mx-3 my-2"
                >
                  <View className="flex-row items-center py-6 bg-accentContainer rounded-2xl overflow-hidden shadow-md p-3">
                    <Image
                      source={categoryIcon[lastOpenedLevel[item].subject]}
                      className="w-14 h-14 rounded-lg"
                    />
                    <View className="flex-1 ml-3">
                      <Text className="text-white xs:text-sm font-exoBold">
                        {lastOpenedLevel[item].title}
                      </Text>
                      <Text
                        className="text-gray-400 xs:text-xs font-exoLight mt-1"
                        numberOfLines={2}
                      >
                        {lastOpenedLevel[item].description}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ) : null
            }
            estimatedItemSize={100}
          ></FlashList>
        </>
      ) : (
        <View className="bg-accentContainer w-[95%] py-7 mx-auto rounded-xl px-2 my-2">
          <Text className="text-white font-exoBold text-xs xs:text-[10px] opacity-40 px-2 ">
            You havent started learning yet!
          </Text>
        </View>
      )}
    </>
  );
};

export default React.memo(JumpBackIn);

const styles = StyleSheet.create({});
