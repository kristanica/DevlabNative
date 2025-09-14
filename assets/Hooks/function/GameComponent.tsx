import React, { JSX } from "react";

import BrainBytes from "@/assets/components/AdminComponents/GameModes/BrainBytes";
import BugBust from "@/assets/components/AdminComponents/GameModes/BugBust";
import CodeCrafter from "@/assets/components/AdminComponents/GameModes/CodeCrafter";
import CodeRush from "@/assets/components/AdminComponents/GameModes/CodeRush";
import Lesson from "@/assets/components/AdminComponents/GameModes/Lesson";

type gameComponentsProps = {
  type: any;
  dispatch: any;
  state: any;
  stageData: any;
  setVideoPresentation: any;
  setReplicateImage: any;
};

const GameComponent = ({
  type,
  dispatch,
  state,
  stageData,
  setVideoPresentation,
  setReplicateImage,
}: gameComponentsProps) => {
  const gameComponentsMenu: Record<string, JSX.Element> = {
    Lesson: (
      <Lesson
        dispatch={dispatch}
        state={state}
        stageData={stageData}
        setVideoPresentation={setVideoPresentation}
      />
    ),
    BugBust: (
      <BugBust dispatch={dispatch} state={state} stageData={stageData} />
    ),
    CodeRush: (
      <CodeRush
        dispatch={dispatch}
        state={state}
        stageData={stageData}
      ></CodeRush>
    ),
    BrainBytes: (
      <BrainBytes
        dispatch={dispatch}
        state={state}
        stageData={stageData}
      ></BrainBytes>
    ),

    CodeCrafter: (
      <CodeCrafter
        setReplicateImage={setReplicateImage}
        dispatch={dispatch}
        state={state}
        stageData={stageData}
      ></CodeCrafter>
    ),
  };

  return gameComponentsMenu[type] ?? null;
};

export default GameComponent;
