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
        style={{ height: "25%", flexDirection: "row" }}
      >
        <View className="flex-[1] justify-center items-center ml-3">
          <Text className="text-white shadow text-xl text-justify font-exoBold">
            {meta.title}
          </Text>
          <Text className="text-white shadow font-exoLight text-xs xs:text-[8px] text-justify">
            {meta.description}
          </Text>
        </View>
        <View className="flex-[.5] justify-center items-center">
          <Image source={meta.icon} className="w-[100px] h-[100px]"></Image>
        </View>
      </LinearGradient>

      <Text className="mt-2  text-white text-2xl xs:text-xl font-exoBold text-center">
        About{" "}
        <Text style={{ color: meta.gradient.color1 }}>
          {id.toUpperCase().toString()}
        </Text>
      </Text>

      <Text className="text-white  font-exoRegular text-justify my-2 text-xs xs: text-[10px] mx-2">
        {meta.about}
      </Text>
    </>
  );
};

export default CategoryHeader;

const styles = StyleSheet.create({});
