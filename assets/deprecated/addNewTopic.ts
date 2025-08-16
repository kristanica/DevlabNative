import { db } from "@/assets/constants/constants";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

const addNewTopic = async (subject: string, lessonId: any, levelId: any) => {
  try {
    const topicsRef = collection(
      db,
      subject,
      lessonId,
      "Levels",
      levelId,
      "Topics"
    );
    const snapshot = await getDocs(topicsRef);

    // Get highest numbered Topic
    const topicNumbers = snapshot.docs.map((doc) => {
      const match = doc.id.match(/Topic(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });

    const nextNumber =
      (topicNumbers.length > 0 ? Math.max(...topicNumbers) : 0) + 1;
    const newTopicId = `Topic${nextNumber}`;

    await setDoc(doc(topicsRef, newTopicId), {
      title: newTopicId,
      createdAt: new Date(),
    });
    console.log("hello");
  } catch (error) {
    throw new Error("error");
  }
};

export default addNewTopic;
