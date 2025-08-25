import { create } from "zustand";

type Payload = {
  specificStagePayload: any | null;
  setSpecificStagePayload: (val: any) => void;
};

const stages = create<Payload>((set) => ({
  specificStagePayload: null,
  setSpecificStagePayload: (val: any) => set({ specificStagePayload: val }),
}));

export default stages;
