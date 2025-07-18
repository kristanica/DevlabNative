import { db } from "@/assets/constants/constants";
import { collection, getDocs } from "firebase/firestore";

type userDataProps = {
  username: string;
  email: string;
  userLeveL: number;
  suspend: boolean;
};

const useFetchUsers = async () => {
  try {
    const userRef = collection(db, "Users");
    const data = await getDocs(userRef);
    const userData: userDataProps[] = await Promise.all(
      data.docs.map(async (doc: any) => {
        return {
          ...doc.data(),
        };
      })
    );

    return userData;
  } catch (err) {
    console.log(err);
  }
};

export default useFetchUsers;
