import { create } from "zustand";

type gamePayload = {
  subject: string;
  lessonId: string;
  levelId: string;
  topicId: string;
};
type gamemIdentifierProps = {
  data: gamePayload | null;
  setGameIdentifer: (val: gamePayload) => void;
};

const gameIdentifier = create<gamemIdentifierProps>((set) => ({
  data: null,
  setGameIdentifer: (val: gamePayload) => set({ data: val }),
}));

export default gameIdentifier;
