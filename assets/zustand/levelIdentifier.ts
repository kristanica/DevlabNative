import { create } from "zustand";

type levelIdentifierPayload = {
  category: string;
  lessonId: string;
  levelId: string;
};

type levelIdentiferProps = {
  levelIdentifier: levelIdentifierPayload | null;
  setLevelIdentifier: (item: levelIdentifierPayload) => void;
};

const levelIdentifier = create<levelIdentiferProps>((set) => ({
  levelIdentifier: null,
  setLevelIdentifier: (item: levelIdentifierPayload) =>
    set({ levelIdentifier: item }),
}));

export default levelIdentifier;
