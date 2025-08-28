import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import ButtonComponent from "@/assets/components/ButtonComponent";
import OnboardingItem from "@/assets/components/OnBoardingComponents/OnboardingItem";
import Pagination from "@/assets/components/OnBoardingComponents/Pagination";
import { onboardingData, path, width } from "@/assets/constants/constants";
import usePresstoScroll from "@/assets/Hooks/usePresstoScroll";

import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const Onboarding = () => {
  //Custom hook
  const { scrollHandlerX, scrolLScreen, flatListRef, xVal, currentScreen } =
    usePresstoScroll();

  return (
    <View className="flex-[1] bg-accent">
      {/* List all onboarding screens */}
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

        {/* Implements pagination at the bottom of screen */}
        <View
          className="absolute left-1/2 bottom-10 w-[150px] items-center "
          style={{
            transform: [{ translateX: -75 }],
          }}
        >
          <Pagination item={onboardingData} xVal={xVal} />
        </View>
        <View className="flex-[1]">
          {currentScreen !== 3 ? (
            // Will render Skip and Next button if not on the last screen
            <>
              <Animated.View
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(100)}
                className="absolute left-1/2 bottom-24 w-[150px] items-center "
                style={{
                  transform: [{ translateX: -75 }],
                }}
              >
                <Pressable onPress={() => scrolLScreen()}>
                  <LottieView
                    source={require("@/assets/Lottie/onboarding/nextButton.json")}
                    autoPlay
                    loop
                    style={{ width: 60, aspectRatio: 1 }}
                  ></LottieView>
                </Pressable>
              </Animated.View>

              <Animated.View
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(100)}
                className="absolute top-16 right-10"
              >
                <ButtonComponent
                  onPressAction={() => router.replace(path.LOGIN)}
                >
                  <Text className="text-[#ffffff43] xs:text-xs font-exoLight">
                    Skip
                  </Text>
                </ButtonComponent>
              </Animated.View>
            </>
          ) : (
            // Wiil render if user is at the last page
            <Animated.View
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(100)}
              className="absolute left-1/2 bottom-[100] w-[150px]  items-center  "
              style={{
                transform: [{ translateX: -75 }],
              }}
            >
              <Pressable
                onPress={() => router.replace({ pathname: path.LOGIN })}
              >
                <Text className="text-white text-center rounded-2xl bg-button px-7 py-2 xs:text-xs font-exoBold">
                  Login
                </Text>
              </Pressable>
              <Pressable
                onPress={() => router.replace({ pathname: path.REGISTER })}
              >
                <Text className="text-white text-center rounded-2xl bg-accent px-7 xs:text-xs py-2 mt-2 font-exoBold">
                  Sign up
                </Text>
              </Pressable>
            </Animated.View>
          )}
        </View>
      </AnimatedViewContainer>
    </View>
  );
};

export default Onboarding;
