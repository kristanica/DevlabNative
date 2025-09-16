import { Stack } from "expo-router";
import React, { useEffect } from "react";

import { BackgroundProvider } from "@/assets/zustand/BackgroundProvider";
// import { InformationProvider } from "@/assets/Provider/InformationProvider";
import FillScreenLoading from "@/assets/components/global/FillScreenLoading";
import useMounted from "@/assets/Hooks/useMounted";
import { ProfileProvider } from "@/assets/zustand/ProfileProvider";
import { useGetUserInfo } from "@/assets/zustand/useGetUserInfo";
import { useIsMutating } from "@tanstack/react-query";

const TabsLayout = () => {
  const getValidUser = useGetUserInfo((state) => state.getUser);
  const getUserProgress = useGetUserInfo((state) => state.getAllProgress);
  const isMutating = useIsMutating();

  const isMounted = useMounted();
  useEffect(() => {
    if (!isMounted.current) return;
    getValidUser();
    getUserProgress();
  }, []);

  return (
    <ProfileProvider>
      <BackgroundProvider>
        {isMutating > 0 && <FillScreenLoading></FillScreenLoading>}
        <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      </BackgroundProvider>
    </ProfileProvider>
  );
};

export default TabsLayout;
