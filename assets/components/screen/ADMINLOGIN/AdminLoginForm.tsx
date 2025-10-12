import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import InputBox from "../../InputBox";
type AdminLoginForm = {
  state: {
    email: string;
    password: string;
  };
  dispatch: React.ActionDispatch<any>;
  handleAdminLogin: () => Promise<void>;
};
const AdminLoginForm = ({
  state,
  dispatch,
  handleAdminLogin,
}: AdminLoginForm) => {
  return (
    <View className=" rounded-3xl  bg-accent flex-col w-3/4  aspect-[1/2] ">
      <View className=" flex-[1]  justify-center items-center">
        <Ionicons name="person-circle" size={140} color={"#314A70"} />
      </View>

      <View className=" flex-[1] justify-center items-center  px-3">
        <InputBox
          icon={"person"}
          placeHolder={"Email"}
          value={state.email}
          setValue={(text) =>
            dispatch({
              type: "UPDATE_FIELD_ADMIN",
              field: "email",
              value: text,
            })
          }
        />
        <InputBox
          icon={"lock-closed"}
          placeHolder={"Password"}
          value={state.password}
          setValue={(text) =>
            dispatch({
              type: "UPDATE_FIELD_ADMIN",
              field: "password",
              value: text,
            })
          }
          isPassword={true}
        />
        <TouchableOpacity
          className="bg-button  justify-center items-center my-16 py-2 px-7 rounded-full "
          onPress={handleAdminLogin}
        >
          <Text className="color-white text-sm font-exoBold">LOGIN</Text>
        </TouchableOpacity>
        <Text className="color-[#FFFFFE] font-exoRegular xs: text-xs">
          {"Not an administrator?"}
        </Text>
        <Pressable
          onPress={() => {
            router.replace({ pathname: "/Login" });
          }}
        >
          <Text className=" color-[#4F80C5] -2 font-exoRegula xs:text-xs ">
            Back to user login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AdminLoginForm;
