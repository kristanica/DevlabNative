import { ActiveItemIcon } from "@/assets/zustand/ActiveItemIcon";
import toastHandler from "@/assets/zustand/toastHandler";
import userHp from "@/assets/zustand/userHp";
import errorShield from "../mainGameModeFunctions/globalItems/errorShield";
import { playSound } from "./soundHandler";

export const useHandleDecrementHp = () => {
  const decrementUserHp = userHp?.getState().decrementUserHp;
  const setActiveItem = ActiveItemIcon.getState().setActiveIcon;
  const setToastVisibility = toastHandler((state) => state.setToastVisibility);

  const { hasShield, consumeErrorShield } = errorShield();
  const handleDecrementHp = async () => {
    if (hasShield) {
      const isShiledUsed = await consumeErrorShield();
      setTimeout(() => {
        setToastVisibility("success", "Error shiled consumed!");
      }, 300);
      await playSound("levelUp");
      setActiveItem({ ErrorShield: false });
      if (isShiledUsed) {
        return;
      }
    }

    setToastVisibility("wrongAnswer", "You got that one wrong!");
    decrementUserHp();
    await playSound("wrongAnswer");
  };
  return { handleDecrementHp };
};
