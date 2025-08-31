import { auth } from "@/assets/constants/constants";
import { useQuery } from "@tanstack/react-query";

const fetchUserData = () => {
  const { data: userData, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return null;
      }
      const token = await currentUser.getIdToken(true);
      const uid = currentUser.uid;

      try {
        const res = await fetch(
          `https://8be28062e186.ngrok-free.app/fireBase/getSpecificUser/${uid}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          console.log(res.status);
          return null;
        }

        const data = await res.json();

        return {
          ...data,
          uid,
        };
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });
  return { userData, refetch };
};

export default fetchUserData;
