import { db } from "@/assets/constants/constants";
import { doc, getDoc } from "firebase/firestore";
type useFetchLessonProps = {
  levelid: string;
  title: string;
  lessonid: string;
};
export const useFetchLessons = async ({
  levelid,
  title,
  lessonid,
}: useFetchLessonProps) => {
  try {
    const lessonRef = doc(db, title, lessonid, "Levels", levelid);
    const data = await getDoc(lessonRef);
    const lessonData = data.data();

    return lessonData;
  } catch (error) {
    console.log(error);
  }
};
