import { Stack } from "expo-router";
import React, { useEffect } from "react";

import { BackgroundProvider } from "@/assets/zustand/BackgroundProvider";
// import { InformationProvider } from "@/assets/Provider/InformationProvider";
import useMounted from "@/assets/Hooks/useMounted";
import { ProfileProvider } from "@/assets/zustand/ProfileProvider";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";

const TabsLayout = () => {
  const getValidUser = useGetUserInfo((state) => state.getUser);

  const isMounted = useMounted();
  useEffect(() => {
    if (!isMounted.current) return;

    const user = getValidUser();
    console.log(JSON.stringify(user));
  }, []);

  return (
    <ProfileProvider>
      <BackgroundProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </BackgroundProvider>
    </ProfileProvider>
  );
};

export default TabsLayout;
