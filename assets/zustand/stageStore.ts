import { create } from "zustand";

type stage = {
  id: string;
  title?: string;
  description: string;
  instruction: string;
  codingInterface?: string;
  isHidden: boolean;
  order: number;
};
type Payload = {
  stageData: stage[];
  setstageData: (val: any) => void;
};

const stageStore = create<Payload>((set) => ({
  stageData: [],
  setstageData: (val: stage[]) => set({ stageData: val }),
}));

export default stageStore;
