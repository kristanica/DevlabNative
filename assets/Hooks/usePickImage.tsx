import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useBackground } from "../zustand/BackgroundProvider";
import { useProfile } from "../zustand/ProfileProvider";

const usePickImage = () => {
  const { setBackground } = useBackground();
  const { setProfile } = useProfile();

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
      }

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setBackground(uri);
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
        const uri = result.assets[0].uri;
        await AsyncStorage.setItem("profileUri", uri);
        setProfile(uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { pickImageBackground, pickImageProfile };
};

export default usePickImage;
