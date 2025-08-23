import { db } from "@/assets/constants/constants";
import { collection, getDocs } from "firebase/firestore";

const addNewLesson = async (category: string) => {
  const lessonsRef = collection(db, category);

  const snapshot = await getDocs(lessonsRef);
};

export default addNewLesson;
