import { db } from "@/assets/constants/constants";
import levelIdentifier from "@/assets/zustand/levelIdentifier";
import { doc, getDoc } from "firebase/firestore";

const EditLesson = async () => {
  const gameLevelIden = levelIdentifier.getState().levelIdentifier;
  if (!gameLevelIden) {
    throw new Error("Gamemode identifier is undefined");
  }
  const levelRef = doc(
    db,
    gameLevelIden.category,
    gameLevelIden.lessonId,
    "Levels",
    gameLevelIden.levelId
  );
  const data = await getDoc(levelRef);
  if (!data.exists()) {
    throw new Error("Data does not exist");
  }
  console.log(data.data());
  return data.data();
};

export default EditLesson;
