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

      <View className="flex-[1] justify-center items-center  px-3">
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
        <TouchableOpacity className=" w-full" onPress={handleAdminLogin}>
          <Text className="text-white font-exoBold  text-center bg-button px-7 py-2 xs: text-sm xs:text-[12px] md:lg my-5 rounded-2xl">
            LOGIN
          </Text>
        </TouchableOpacity>

        <Text className=" color-white font-exoRegular text-sm xs:text-[11px] ">
          {"Not an administrator?"}
        </Text>
        <Pressable
          onPress={() => {
            router.replace({ pathname: "/Login" });
          }}
        >
          <Text className=" color-[#4F80C5] -2 font-exoRegular text-sm xs:text-[10px] ">
            Back to user login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AdminLoginForm;
