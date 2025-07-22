import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { db } from "../constants/constants";
type useSearchUserFireStoreProps = {
  username: string;
  email: string;
  userLeveL: number;
  suspend: boolean;
  uid?: any;
  isAdmin: boolean;
};
const searchUserFireStore = async (debounce: string) => {
  const searchRef = query(
    collection(db, "Users"),
    orderBy("username"),
    startAt(debounce),
    endAt(debounce + "\uf8ff")
  );
  const data = await getDocs(searchRef);
  const result: useSearchUserFireStoreProps[] = data.docs.map((doc) => ({
    ...(doc.data() as useSearchUserFireStoreProps),
  }));
  return result;
};

export default searchUserFireStore;
