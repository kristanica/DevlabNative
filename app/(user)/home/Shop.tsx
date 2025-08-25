import AnimatedViewContainer from "@/assets/components/AnimatedViewContainer";
import CustomGeneralContainer from "@/assets/components/CustomGeneralContainer";
import ProtectedRoutes from "@/assets/components/ProtectedRoutes";
import ShopItem from "@/assets/components/ShopItem";
import { mockUpShopItem } from "@/assets/constants/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const shop = () => {
  return (
    <ProtectedRoutes>
      <View className="bg-accent flex-1">
        <AnimatedViewContainer>
          <CustomGeneralContainer>
            <View className="flex-1 p-3">
              <View className="flex-row  items-center">
                <Text className="xs:text-2xl text-white font-exoExtraBold">
                  DEVLAB
                </Text>
                <Ionicons name="cart" size={20} color={"#FFFFFF"} />
              </View>
              {/* Renders shop description */}
              <View>
                <Text className="text-white xs:text-xs text-justify font-exoRegular">
                  Welcome to the DevLab Shop, where learning meets gamification!
                  Earn rewards as you code, learn, and complete challenges, then
                  spend them on awesome upgrades to enhance your experience.
                </Text>
              </View>

              {/* Renders shop item */}
              <ScrollView
                bounces={true}
                showsVerticalScrollIndicator={false}
                className="flex-[5] border-[#36334B] border-2 rounded-[10px] p-3"
              >
                {mockUpShopItem.map((item) => (
                  <ShopItem
                    id={item.id}
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    functionality={item.functionality}
                    price={item.price}
                  />
                ))}
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
