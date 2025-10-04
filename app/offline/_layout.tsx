import { Stack } from "expo-router";

const OfflineLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none" }}></Stack>
  );
};

export default OfflineLayout;
