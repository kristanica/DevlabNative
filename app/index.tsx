import { fontFamily } from "@/fontFamily/fontFamily";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text style={{ fontFamily: fontFamily.ExoLight, fontSize: 20 }}>
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
