// assets/constants/toastConfig.ts
import { Text, View } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

export const toastConfig = {
  woah: (props: BaseToastProps) => (
    <View className="h-[50px] w-52 mx-2 z-50 bg-[#1ABC9C] border-[#ffffffaf] border-[2px] rounded-xl justify-center items-center absolute">
      <Text className="text-white text-xs font-exoExtraBold">
        Achievement Unlocked! {props.text1}
      </Text>
    </View>
  ),
  success: () => (
    <View className="h-[50px] w-52 mx-2 z-50 bg-[#1ABC9C] border-[#ffffffaf] border-[2px] rounded-xl justify-center items-center absolute">
      <Text className="text-white text-xs font-exoExtraBold">
        🎉 You got that right!
      </Text>
    </View>
  ),
  error: () => (
    <View className="h-[50px] w-52 mx-2 z-50 bg-[#E63946] border-[#ffffffaf] border-[2px] rounded-xl justify-center items-center absolute">
      <Text className="text-white text-xs font-exoExtraBold">
        ⚠️ Oops! Something’s wrong!
      </Text>
    </View>
  ),
  rewardClaimed: () => (
    <View className="h-[50px] w-52 mx-2 z-50 bg-slate-500 border-[#ffffffaf] border-[2px] rounded-xl justify-center items-center absolute">
      <Text className="text-white text-xs font-exoExtraBold">
        You've already completed this level! No rewards here.
      </Text>
    </View>
  ),
  previousButton: () => (
    <View className="h-[50px] w-52 mx-2 z-50 bg-red-500 border-[#ffffffaf] border-[2px] rounded-xl justify-center items-center absolute">
      <Text className="text-white text-xs font-exoExtraBold">
        You cannot go back further!
      </Text>
    </View>
  ),
};
