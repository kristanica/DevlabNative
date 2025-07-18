import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import ButtonComponent from "@/assets/components/ButtonComponent";
import OnboardingItem from "@/assets/components/OnBoardingComponents/OnboardingItem";
import Pagination from "@/assets/components/OnBoardingComponents/Pagination";
import { onboardingData, path, width } from "@/assets/constants/constants";
import usePresstoScroll from "@/assets/Hooks/usePresstoScroll";

import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Text, View } from "react-native";
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
        {currentScreen !== 3 ? (
          // Will render Skip and Next button if not on the last screen
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
              <ButtonComponent onPressAction={() => router.replace(path.LOGIN)}>
                <Text className="text-white text-xl font-exoBold">Skip</Text>
              </ButtonComponent>
            </Animated.View>
          </>
        ) : (
          // Wiil render if user is at the last page
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(100)}
            className="absolute left-1/2 bottom-1/4 w-[150px] items-center  "
            style={{
              transform: [{ translateX: -75 }],
            }}
          >
            <ButtonComponent
              onPressAction={() => router.replace({ pathname: path.LOGIN })}
            >
              <Text className="text-white text-center rounded-3xl bg-button px-14 py-2 font-exoBold">
                Login
              </Text>
            </ButtonComponent>
            <ButtonComponent
              onPressAction={() => router.replace({ pathname: path.REGISTER })}
            >
              <Text className="text-white text-center rounded-3xl bg-accent px-14 py-2 font-exoBold">
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
