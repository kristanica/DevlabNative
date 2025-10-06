import {
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { db } from "../constants/constants";

const searchUserFireStore = async (debounce: string) => {
  const searchRef = query(
    collection(db, "Users"),
    orderBy("username"),
    startAt(debounce),
    endAt(debounce + "\uf8ff")
  );
  const data = await getDocs(searchRef);
  const result: SearchUserFireStorePayload[] = data.docs.map((doc) => ({
    ...(doc.data() as SearchUserFireStorePayload),
  }));
  return result;
};

export default searchUserFireStore;
