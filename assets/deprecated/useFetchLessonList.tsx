import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../constants/constants";
import useMounted from "../Hooks/useMounted";

type useFetchLessonListProps = {
  category: string;
};

const useFetchLessonList = ({ category }: useFetchLessonListProps) => {
  const [lesson, setLesson] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isMounted = useMounted();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const Lessonref = collection(db, category);
        const data = await getDocs(Lessonref);
        const lessonData = await Promise.all(
          data.docs.map(async (lessonDoc: any) => {
            const levelRef = collection(db, category, lessonDoc.id, "Levels");
            const data = await getDocs(levelRef);

            const levelData = await Promise.all(
              data.docs.map(async (levelDoc: any) => ({
                id: levelDoc.id,
                ...levelDoc.data(),
              }))
            );
            return {
              id: lessonDoc.id,
              ...lessonDoc.data(),
              levels: levelData,
            };
          })
        );

        if (isMounted.current) {
          setLesson(lessonData);
          console.log(lessonData);
        }
      } catch (error) {
        if (isMounted.current) {
          console.log("Error when fetching lessons...." + error);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [category]);

  return { lesson, loading };
};

export default useFetchLessonList;
