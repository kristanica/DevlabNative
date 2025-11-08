import React, { JSX } from "react";

import BrainBytes from "@/assets/components/AdminComponents/GameModes/BrainBytes";
import BugBust from "@/assets/components/AdminComponents/GameModes/BugBust";
import CodeCrafter from "@/assets/components/AdminComponents/GameModes/CodeCrafter";
import CodeRush from "@/assets/components/AdminComponents/GameModes/CodeRush";
import Lesson from "@/assets/components/AdminComponents/GameModes/Lesson";

const GameComponent = ({
  type,
  dispatch,
  state,
  stageData,
  setVideoPresentation,
  setReplicateFile,
  videoPresentation,
}: gameComponentPayload) => {
  const gameComponentsMenu: Record<string, JSX.Element> = {
    Lesson: (
      <Lesson
        videoPresentation={videoPresentation}
        dispatch={dispatch}
        state={state}
        stageData={stageData}
        setVideoPresentation={setVideoPresentation}
      />
    ),
    BugBust: <BugBust dispatch={dispatch} state={state} />,
    CodeRush: <CodeRush dispatch={dispatch} state={state}></CodeRush>,
    BrainBytes: <BrainBytes dispatch={dispatch} state={state}></BrainBytes>,

    CodeCrafter: (
      <CodeCrafter
        setReplicateFile={setReplicateFile}
        dispatch={dispatch}
        state={state}
      ></CodeCrafter>
    ),
  };

  return gameComponentsMenu[type] ?? null;
};

export default GameComponent;
