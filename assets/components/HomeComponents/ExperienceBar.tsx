import { auth, db } from "@/assets/constants/constants";
import toastHandler from "@/assets/zustand/toastHandler";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type ExperienceBarProps = {
  userExp: number;
  treshold: number;
  userLevel: number;
};
const ExperienceBar = ({
  userExp,
  treshold,
  userLevel,
}: ExperienceBarProps) => {
  const progressValue = useSharedValue(0);
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);
  const progress = Math.min(userExp / treshold, 1);

  useEffect(() => {
    const levelUp = async () => {
      const extraLevels = Math.floor(userExp / treshold);
      const leftoverXP = userExp % treshold;
      const uid = auth.currentUser?.uid;
      const userRef = doc(db, "Users", String(uid));

      if (extraLevels > 0) {
        setToastVisibility("success", "You've leveled up!");
        await setDoc(
          userRef,
          {
            userLevel: (userLevel += extraLevels),
            exp: leftoverXP,
          },
          { merge: true }
        );
        progressValue.value = withTiming(1, { duration: 1000 }, () => {
          progressValue.value = withTiming(leftoverXP / treshold, {
            duration: 1000,
          });
        });
      } else {
        progressValue.value = withTiming(progress, { duration: 1000 });
      }
    };
    levelUp();
  }, [userExp]);

  const animatedProgress = useAnimatedStyle(() => ({
    width: progressValue.value * 210,
  }));
  return (
    <View className="h-[30px] ">
      <View
        className="bg-white h-full w-full rounded-lg"
        style={{
          width: 210,
        }}
      >
        <Animated.View
          style={[animatedProgress, { backgroundColor: "#A8E6CF" }]}
          className=" h-full rounded-lg"
        ></Animated.View>
      </View>

      <Text className="text-white font-exoBold text-xs">
        Level {userLevel} | {userExp} / {treshold} XP
      </Text>
    </View>
  );
};

export default ExperienceBar;
