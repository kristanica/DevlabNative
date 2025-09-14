import StageBrainBytes from "@/assets/components/LessonsComponent/gameModes/StageBrainBytes";
import StageBugBust from "@/assets/components/LessonsComponent/gameModes/StageBugBust";
import StageCodeCrafter from "@/assets/components/LessonsComponent/gameModes/StageCodeCrafter";
import StageCodeRush from "@/assets/components/LessonsComponent/gameModes/StageCodeRush";
import StageLesson from "@/assets/components/LessonsComponent/gameModes/StageLesson";
import React, { JSX } from "react";
import { StyleSheet } from "react-native";

type StageGameComponentProps = {
  currentStageData: any;
  type: string;
};

const StageGameComponent = ({
  currentStageData,
  type,
}: StageGameComponentProps) => {
  const stageGameIdentier: Record<string, JSX.Element> = {
    Lesson: <StageLesson currentStageData={currentStageData}></StageLesson>,
    CodeCrafter: (
      <StageCodeCrafter currentStageData={currentStageData}></StageCodeCrafter>
    ),
    BrainBytes: (
      <StageBrainBytes currentStageData={currentStageData}></StageBrainBytes>
    ),
    CodeRush: (
      <StageCodeRush currentStageData={currentStageData}></StageCodeRush>
    ),
    BugBust: <StageBugBust currentStageData={currentStageData}></StageBugBust>,
  };
  return stageGameIdentier[type] ?? null;
};

export default StageGameComponent;

const styles = StyleSheet.create({});
