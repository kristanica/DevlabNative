import { router } from "expo-router";
import { SharedValue, withTiming } from "react-native-reanimated";
import { path } from "../constants/constants";

const useNavigate = (opacityVal: SharedValue<number>) => {
  setTimeout(() => {
    router.replace(path.LOGIN);
  }, 2000);

  opacityVal.value = withTiming(0, { duration: 500 });
};

export default useNavigate;
