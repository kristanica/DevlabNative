import { create } from "zustand";

type ToastProps = {
  isToastVisible: boolean;
  toastMessage: string;
  toastType: string | null;
  setToastVisibility: (toastType: string, toastMessage: string) => void;
  hideToast: () => void;
};

const toastHandler = create<ToastProps>((set) => ({
  isToastVisible: false,
  toastType: null,
  toastMessage: "",

  setToastVisibility: (toastType, toastMessage) =>
    set({
      isToastVisible: true,
      toastType,
      toastMessage,
    }),

  hideToast: () =>
    set({
      isToastVisible: false,
      toastType: null,
      toastMessage: "",
    }),
}));

export default toastHandler;
