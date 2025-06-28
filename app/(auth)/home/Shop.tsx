import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import ShopItem from "@/assets/components/ShopItem";
import { fontFamily } from "@/fontFamily/fontFamily";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const shop = () => {
  return (
    <ProtectedRoutes>
      <View className="bg-accent flex-1">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <View className="flex-1">
              <View className="flex-[.5] flex-row  items-center">
                <Text
                  className="text-4xl text-white"
                  style={{ fontFamily: fontFamily.ExoExtraBold }}
                >
                  DEVLAB
                </Text>
                <Ionicons name="cart" size={50} color={"#FFFFFF"} />
              </View>
              {/* Renders shop description */}
              <View className="flex-[.7] ">
                <Text className="text-white text-justify">
                  Welcome to the DevLab Shop, where learning meets gamification!
                  Earn rewards as you code, learn, and complete challenges, then
                  spend them on awesome upgrades to enhance your experience.
                </Text>
              </View>

              {/* Renders shop item */}
              <ScrollView
                bounces={true}
                showsVerticalScrollIndicator={false}
                className="flex-[5] border-[#36334B] border-2 rounded-[10px] p-3 "
              >
                <ShopItem />

                <ShopItem />

                <ShopItem />

                <ShopItem />

                <ShopItem />

                <ShopItem />

                <ShopItem />
              </ScrollView>
            </View>
          </CustomGeneralContainer>
        </AnimatedViewContainer>
      </View>
    </ProtectedRoutes>
  );
};

export default shop;

const styles = StyleSheet.create({});
