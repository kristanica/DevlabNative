import { router } from "expo-router";
import { SharedValue, withTiming } from "react-native-reanimated";

const useNavigate = (opacityVal: SharedValue<number>) => {
  setTimeout(() => {
    router.replace("/Login");
  }, 2000);

  opacityVal.value = withTiming(0, { duration: 500 });
};

export default useNavigate;
