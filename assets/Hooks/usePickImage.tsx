import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from "../constants/constants";
import { useBackground } from "../zustand/BackgroundProvider";
import { useProfile } from "../zustand/ProfileProvider";

import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const usePickImage = () => {
  const { setBackground } = useBackground();
  const { setProfile } = useProfile();
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("No user logged in.");
  const pickImageBackground = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });
      if (result.canceled) {
        console.log("canceled");
        return;
      }

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const fileRef = ref(storage, `userProfiles/${uid}/background.jpg`);

        await uploadBytes(fileRef, blob);
        const downloadURL = await getDownloadURL(fileRef);
        await setDoc(
          doc(db, "Users", uid),
          { backgroundImage: downloadURL },
          { merge: true }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //pick user profile
  const pickImageProfile = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [2, 3],
        quality: 1,
      });
      if (result.canceled) {
        console.log("canceled");
      }

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const fileRef = ref(storage, `userProfiles/${uid}/profileImage.jpg`);

        await uploadBytes(fileRef, blob);
        const downloadURL = await getDownloadURL(fileRef);
        await setDoc(
          doc(db, "Users", uid),
          { profileImage: downloadURL },
          { merge: true }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { pickImageBackground, pickImageProfile };
};

export default usePickImage;
