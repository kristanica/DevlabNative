import { db } from "@/assets/constants/constants";
import { collection, getDocs } from "firebase/firestore";

type fetchLessonAdminProps = {
  subject: string;
};

const fetchLessonAdmin = async ({ subject }: fetchLessonAdminProps) => {
  try {
    const subjectRef = collection(db, subject);
    const subjDocs = await getDocs(subjectRef);

    const lessonData = await Promise.all(
      subjDocs.docs.map(async (lessonDoc) => {
        const levelsRef = collection(db, subject, lessonDoc.id, "Levels");
        const levelsDocs = await getDocs(levelsRef);

        const levels = await Promise.all(
          levelsDocs.docs.map(async (levelDoc) => {
            const topicsRef = collection(
              db,
              subject,
              lessonDoc.id,
              "Levels",
              levelDoc.id,
              "Topics"
            );
            const topicsSnap = await getDocs(topicsRef);

            const topics = topicsSnap.docs.map((topicDoc) => ({
              id: topicDoc.id,
              ...topicDoc.data(),
            }));

            return {
              id: levelDoc.id,
              ...levelDoc.data(),
              topics,
            };
          })
        );

        return {
          id: lessonDoc.id,
          title: lessonDoc.data().title,
          levels,
        };
      })
    );

    return lessonData;
  } catch (error) {
    console.error("Error fetching lessons:", error);
  }
};

export default fetchLessonAdmin;
