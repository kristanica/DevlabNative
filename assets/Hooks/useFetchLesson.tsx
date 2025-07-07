import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../constants/constants";
import useMounted from "./useMounted";

type useFetchLessonProps = {
  levelid: string;
  title: string;
  lessonid: string;
};
const useFetchLesson = ({ levelid, title, lessonid }: useFetchLessonProps) => {
  const [lesson, setLesson] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const isMounted = useMounted();

  useEffect(() => {
    const fetchLesson = async () => {
      if (!isMounted.current) return;
      try {
        const lessonRef = doc(db, title, lessonid, "Levels", levelid);
        const data = await getDoc(lessonRef);
        const lessonData = data.data();

        if (isMounted.current) {
          setLesson(lessonData);
        }
      } catch (error) {
        if (isMounted.current) {
          console.log(error);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };
    fetchLesson();
  }, [levelid, title, lessonid]);
  return { lesson, loading };
};

export default useFetchLesson;
