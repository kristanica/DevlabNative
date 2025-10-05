import FillScreenLoading from "@/assets/components/global/FillScreenLoading";
import { useIsMutating } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";

const AdminRootLayout = () => {
  const isMutating = useIsMutating();
  // const getValidAdmin = adminAuthentication((state) => state.getAdmin);
  // useEffect(() => {
  //   getValidAdmin();
  // }, [getValidAdmin]);
  return (
    <>
      {isMutating > 0 && <FillScreenLoading></FillScreenLoading>}

      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
    </>
  );
};

export default AdminRootLayout;
