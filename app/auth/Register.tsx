import InputBox from "@/assets/components/InputBox";
import { fontFamily } from "@/fontFamily/fontFamily";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

import Loading from "@/assets/components/Loading";
import { FIREBASE_AUTH, FIREBASE_STORE } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  // Firebase
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_STORE;

  // useStates
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle account registration
  const handleRegister = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: username,
          age: age,
        });
        setLoading(false);
        alert("Test");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background justify-center items-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Title Container */}
      <View>
        <Text
          className="color-white  mb-5 text-3xl font-[500]"
          style={{ fontFamily: fontFamily.ExoExtraBold }}
        >
          DEVLAB
        </Text>
      </View>
      {/* Dismisses keyboard */}
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        {/* Container itself */}
        <View className="h-[590px] rounded-3xl  w-[25rem]  bg-accent flex-col">
          {/* Icon for the user profile */}
          <View className="flex-[1] justify-center items-center">
            <Ionicons
              name="person-circle"
              size={120}
              color={"#314A70"}
              className="mx-auto my-2"
            />
          </View>
          {/* Input fields for registration */}
          <View className="flex-[2] justify-center items-center">
            {/*Input field for email */}

            <InputBox
              placeHolder={"Email"}
              value={email}
              setValue={setEmail}
              icon={"mail"}
            />
            {/* Input field for password */}
            <InputBox
              placeHolder={"Password"}
              value={password}
              setValue={setPassword}
              icon={"lock-closed"}
              isPassword={true}
            />
            {/* Input field for confirm password */}
            <InputBox
              placeHolder={"ConfirmPassword"}
              value={confirmPassword}
              setValue={setConfirmPassword}
              icon={"lock-closed"}
              isPassword={true}
            />
            {/* Input field for username */}
            <InputBox
              placeHolder={"Username"}
              value={username}
              setValue={setUsername}
              icon={"person"}
            />
            <InputBox
              placeHolder={"Age"}
              value={age}
              setValue={setAge}
              icon={"calendar-outline"}
            />
          </View>
          {/* Button to register */}
          <View className="flex-[.5]  justify-center items-center ">
            <TouchableOpacity
              className="bg-button flex-[1] w-[8rem] justify-center items-center my-2 rounded-full "
              onPress={handleRegister}
            >
              <Text
                className="color-white text-lg "
                style={{ fontFamily: fontFamily.ExoBold }}
              >
                REGISTER
              </Text>
            </TouchableOpacity>
          </View>
          {/* Text to navigate to login page */}
          <View className="flex-[1]  justify-center items-center">
            <Text
              className="mt-7 color-[#FFFFFE]"
              style={{ fontFamily: fontFamily.ExoRegular }}
            >
              Already have an Account?
            </Text>
            {/* Routes user to login (index) */}
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text
                className="color-[#4F80C5] mt-2"
                style={{ fontFamily: fontFamily.ExoRegular }}
              >
                Login here
              </Text>
            </TouchableOpacity>
          </View>
          {loading && <Loading />}
        </View>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;

// // State to manage the visibility of the DateTimePicker
// const [dateVisible, isDateVisible] = useState(false);

// //Toucablewithoutfeedback function to close modal
// const setDateVisibility = () => {
//   isDateVisible(false);
// };
// const onChange = (
//   event: DateTimePickerEvent,
//   selectedDate: Date | undefined
// ) => {
//   if (selectedDate) {
//     setDate(selectedDate);
//   }
// };

//  {/* Input field for date of birth */}
//       <View className="flex-row  border-2 border-solid  p-2 rounded-3xl mt-2">
//         <Ionicons
//           name="calendar-outline"
//           size={20}
//           className="mx-3 border-r-2 pr-2 border-black"
//           color={"#FFFFFE"}
//         />

//         {/* Pressable to open the DateTimePicker */}
//         <Pressable
//           onPress={() => isDateVisible(true)}
//           className=" flex-row items-center justify-between"
//         >
//           <TextInput
//             editable={false}
//             placeholder="00/00/0000"
//             value={date.toLocaleDateString("en-GB")}
//             className="text-offwhite w-[240px]"
//             onPressIn={() => isDateVisible(true)}
//             style={{ fontFamily: fontFamily.ExoLight }}
//           />
//         </Pressable>

//         {/* Modal to display the DateTimePicker */}
//         {dateVisible && (
//           <Modal animationType="slide" visible={true} transparent={true}>
//             {/* Close date modal when press outside */}
//             <TouchableWithoutFeedback onPress={setDateVisibility}>
//               <View className="justify-end items-end flex-1 rounded-t-2xl">
//                 <View className="bg-background  w-full h-[320px] justify-center items-center text-white order-white rounded-2xl">
//                   <Pressable
//                     onPress={() => isDateVisible(false)}
//                     className="absolute top-2 right-2 mt-2"
//                   >
//                     <Ionicons
//                       name="close-outline"
//                       color={"#FFFFFE"}
//                       size={30}
//                     />
//                   </Pressable>
//                   <DateTimePicker
//                     mode="date"
//                     display="spinner"
//                     textColor="white"
//                     value={date}
//                     onChange={onChange}
//                     maximumDate={new Date()}
//                   />
//                 </View>
//               </View>
//             </TouchableWithoutFeedback>
//           </Modal>
//         )}
//       </View>
