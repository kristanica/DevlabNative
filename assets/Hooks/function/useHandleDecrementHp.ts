import userHp from "@/assets/zustand/userHp";
import Toast from "react-native-toast-message";
import errorShield from "../mainGameModeFunctions/globalItems/errorShield";

export const useHandleDecrementHp = () => {
  const decrementUserHp = userHp?.getState().decrementUserHp;
  const { hasShield, consumeErrorShield } = errorShield();
  const handleDecrementHp = async () => {
    if (hasShield) {
      const isShiledUsed = await consumeErrorShield();
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Error shield Consumed!",
        });
      }, 0);
      if (isShiledUsed) {
        return;
      }
    }

    decrementUserHp();
  };
  return { handleDecrementHp };
};
