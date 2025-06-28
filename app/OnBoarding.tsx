import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import ButtonComponent from "@/assets/components/ButtonComponent";
import OnboardingItem from "@/assets/components/OnBoardingComponents/OnboardingItem";
import Pagination from "@/assets/components/OnBoardingComponents/Pagination";
import { fontFamily } from "@/fontFamily/fontFamily";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useRef, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";

const { width } = Dimensions.get("screen");

const Onboarding = () => {
  const onboardingData = [
    {
      id: 1,
      lottie: require("@/assets/Lottie/onboarding/onBoardingScreen1.json"),
      title: "🧙‍♂️ Welcome to DevLab",
      subtitle: "You’re the chosen one.",
      description:
        "Train as a full-stack dev. Complete quests. Earn XP. Break the code curse.",
      background: "#1e1b4b",
    },
    {
      id: 2,
      lottie: require("@/assets/Lottie/onboarding/onBoardingScreen2.json"),
      title: "⚔️ Master Your Arsenal",
      subtitle: "HTML. CSS. JavaScript. Databases.",
      description:
        "Each skill is a weapon. Each bug is a battle. Learn by fighting real dev challenges.",
      background: "#0f172a",
    },
    {
      id: 3,
      lottie: require("@/assets/Lottie/onboarding/onBoardingScreen3.json"),
      title: "🧩 Quests, Levels, Loot",
      subtitle: "Defeat challenges. Gain XP. Unlock achievements.",
      description: "Progress isn’t a number. It’s a badge of honor.",
      background: "#212121",
    },
    {
      id: 4,
      lottie: require("@/assets/Lottie/onboarding/onBoardingScreen4.json"),
      title: "🚪 Enter the Lab",
      subtitle: "Your first mission awaits.",
      description:
        "Code bravely, break things gloriously, and become the full-stack hero you were born to be.",
      background: "#2c0e37",
    },
  ];

  type OnboardingItemType = {
    id: number;
    lottie: any;
    title: string;
    subtitle: string;
    description: string;
    background: string;
  };
  const xVal = useSharedValue(0);
  const [currentScreen, setCurrentScreen] = useState<number>(0);

  const scrollHandlerX = useAnimatedScrollHandler({
    onScroll: (event: { contentOffset: { x: number } }) => {
      xVal.value = event.contentOffset.x;
      const index = Math.round(event.contentOffset.x / width);
      runOnJS(setCurrentScreen)(index);
    },
  });

  const flatListRef = useRef<FlatList<OnboardingItemType>>(null);

  const scrolLScreen = () => {
    if (currentScreen < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentScreen + 1 });
    } else {
      return;
    }
  };

  return (
    <View className="flex-[1] bg-accent">
      <AnimatedViewContainer>
        <Animated.FlatList
          ref={flatListRef}
          bounces={false}
          onScroll={scrollHandlerX}
          snapToInterval={width}
          snapToAlignment="start"
          decelerationRate="fast"
          data={onboardingData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <OnboardingItem item={item} xVal={xVal} index={index} />
          )}
        />

        <View
          className="absolute left-1/2 bottom-10 w-[150px] items-center "
          style={{
            transform: [{ translateX: -75 }],
          }}
        >
          <Pagination item={onboardingData} xVal={xVal} />
        </View>
        {currentScreen !== 3 ? (
          <>
            <Animated.View
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(100)}
              className="absolute left-1/2 bottom-1/4 w-[150px] items-center "
              style={{
                transform: [{ translateX: -75 }],
              }}
            >
              <ButtonComponent onPressAction={() => scrolLScreen()}>
                <LottieView
                  source={require("@/assets/Lottie/onboarding/nextButton.json")}
                  autoPlay
                  loop
                  style={{ width: 50, height: 50 }}
                ></LottieView>
              </ButtonComponent>
            </Animated.View>

            <Animated.View
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(100)}
              className="absolute top-16 right-10"
            >
              <ButtonComponent onPressAction={() => router.replace("/Login")}>
                <Text
                  className="text-white text-xl "
                  style={{ fontFamily: fontFamily.ExoBold }}
                >
                  Skip
                </Text>
              </ButtonComponent>
            </Animated.View>
          </>
        ) : (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(100)}
            className="absolute left-1/2 bottom-1/4 w-[150px] items-center  "
            style={{
              transform: [{ translateX: -75 }],
            }}
          >
            <ButtonComponent onPressAction={() => router.replace("/Login")}>
              <Text
                className="text-white text-center rounded-3xl bg-button px-14 py-2 "
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                Login
              </Text>
            </ButtonComponent>
            <ButtonComponent onPressAction={() => router.replace("/Register")}>
              <Text
                className="text-white text-center rounded-3xl bg-accent px-14 py-2 "
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                Sign up
              </Text>
            </ButtonComponent>
          </Animated.View>
        )}
      </AnimatedViewContainer>
    </View>
  );
};

export default Onboarding;
