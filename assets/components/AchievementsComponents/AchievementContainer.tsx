import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const AchievementContainer = ({
  data,

  isUnlocked,

  isClaimed,
  claimMutation,
}: AchievementContainerPayload) => {
  return (
    <View
      // style={[onScale]}
      className="w-[50%] aspect-[3/5] mx-auto  rounded-[10px] my-2"
    >
      <View
        className=" h-full w-full absolute rounded-xl"
        style={{
          backgroundColor: isUnlocked ? undefined : "black",
        }}
      >
        <View
          className="bg-[#111827]  m-[1px] flex-col flex-1 border-[#2a3141] border-[1px] rounded-xl"
          style={[{ opacity: isUnlocked ? 1 : 0.5 }]}
        >
          <View className="flex-[2] justify-center items-center">
            <Image
              source={require("@/assets/images/success.png")}
              style={{ height: 70, width: 70 }}
            />
          </View>

          <View className="flex-[.5] justify-center items-center border-t-2 b-black mx-5">
            <Text className="text-white font-exoExtraBold text-sm xs:text-xs  text-center">
              {data?.title}
            </Text>
          </View>
          {/* Render the Description of Achievement */}
          <View className="flex-[.5] justify-center items-center">
            <Text className="text-[#94A1B2] text-center font-exoLight text-xs xs:text-[8px] px-2">
              {data?.description ?? "No description"}
            </Text>
          </View>

          <View className="flex-[.5] justify-center items-center mx-10 my-2 rounded-3xl">
            {!isUnlocked ? (
              <Text className="text-white text-center text-xs xs:text-[9px] px-2 rounded-xl py-2  bg-[#F87171] font-exoBold">
                In Progress
              </Text>
            ) : isClaimed ? (
              <Text className="text-white bg-[#22C55E]  px-2 rounded-xl py-2  text-center text-xs xs:text-[9px] font-exoBold">
                Completed
              </Text>
            ) : (
              <TouchableOpacity onPress={claimMutation}>
                <Text className="text-white bg-[#EC4899] px-2 rounded-xl py-2  text-center text-xs xs:text-[9px] font-exoBold">
                  Claim
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(AchievementContainer);
// Style for linear Gradient
