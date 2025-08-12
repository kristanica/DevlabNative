import { db } from "@/assets/constants/constants";
import { collection, getDocs } from "firebase/firestore";

const fetchLessonAdmin = async (category: string) => {
  try {
    const subjectRef = collection(db, category);
    const subjDocs = await getDocs(subjectRef);

    const data = await Promise.all(
      subjDocs.docs.map(async (lessonDoc) => {
        const levelsRef = collection(db, category, lessonDoc.id, "Levels");
        const levelsDocs = await getDocs(levelsRef);

        const levels = levelsDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return {
          id: lessonDoc.id,
          levelsData: levels,
          ...lessonDoc.data(),
        };
      })
    );

    return data;
  } catch {}
};

export default fetchLessonAdmin;
