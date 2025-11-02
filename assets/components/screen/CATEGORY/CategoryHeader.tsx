import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
type CategoryHeaderPayload = {
  meta: any;
  id: any;
};
const CategoryHeader = ({ meta, id }: CategoryHeaderPayload) => {
  return (
    <>
      <LinearGradient
        colors={[meta.gradient.color1, meta.gradient.color2]}
        locations={[0.1, 0.8]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={{
          height: 180,
          flexDirection: "row",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
      >
        <View className="flex-1 justify-center">
          <Text className="text-white text-xl font-exoBold shadow">
            {meta.title}
          </Text>
          <Text className="text-white text-xs xs:text-[8px] font-exoLight mt-1 text-justify">
            {meta.description}
          </Text>
        </View>
        <View className="justify-center items-center">
          <Image
            source={meta.icon}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

      <View className="mx-3 my-3 p-3 bg-accentContainer rounded-xl shadow-md">
        <Text className="text-white text-xl xs:text-lg font-exoBold text-center">
          About{" "}
          <Text style={{ color: meta.gradient.color1 }}>
            {id.toUpperCase()}
          </Text>
        </Text>
        <Text className="text-white text-xs xs:text-[10px] font-exoRegular mt-2 text-justify opacity-65">
          {meta.about}
        </Text>
      </View>
    </>
  );
};

export default CategoryHeader;

const styles = StyleSheet.create({});
