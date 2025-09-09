import { auth, db, storage } from "@/assets/constants/constants";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { doc, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytes,
} from "firebase/storage";
export const pickImage = () => {
  return useMutation({
    mutationFn: async ({ type }: { type: string }) => {
      const uid: string | undefined = auth.currentUser?.uid;
      if (!uid) throw new Error("No user logged in.");

      try {
        const result: ImagePicker.ImagePickerResult =
          await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
          });
        if (result.canceled) return;

        const imageUri: string = result.assets[0].uri;
        const response: Response = await fetch(imageUri);
        const blob: Blob = await response.blob();
        const fileRef: StorageReference = ref(
          storage,
          `userProfiles/${uid}/${type}.jpg`
        );

        await uploadBytes(fileRef, blob);
        const downloadURL: string = await getDownloadURL(fileRef);
        await setDoc(
          doc(db, "Users", uid),
          { [`${type}Image`]: downloadURL },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
    },
  });
};
