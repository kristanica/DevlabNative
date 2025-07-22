import { db } from "@/assets/constants/constants";
import { collection, getDocs } from "firebase/firestore";
type userDataProps = {
  username: string;
  email: string;
  userLeveL: number;
  suspend: boolean;
  uid?: any;
  isAdmin: boolean;
};
const useFetchUsers = async () => {
  try {
    const userRef = collection(db, "Users");
    const temp = await getDocs(userRef);
    const data: userDataProps[] = temp.docs.map((temp) => {
      return {
        uid: temp.id,
        ...(temp.data() as userDataProps),
      };
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

// const useFetchUsers = async () => {
//   try {
//     const userRef = collection(db, "Users");
//     const temp = await getDocs(userRef);
//     const data: userDataProps[] = temp.docs.map((temp) => {
//       return {
//         uid: temp.id,
//         ...(temp.data() as userDataProps),
//       };
//     });
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

export default useFetchUsers;
