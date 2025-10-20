import StageCodingEditor from "@/assets/components/CodeEditor/StageCodingEditor";
import StageCodingEditorDatabase from "@/assets/components/CodeEditor/StageCodingEditorDatabase";
import { Dispatch, RefObject } from "react";

type RenderStageEditorPayload = {
  terminalRef: RefObject<any>;
  webRef: RefObject<any>;
  receivedCode: CodeEditorPayload;
  setReceivedCode: Dispatch<
    React.SetStateAction<CodeEditorPayload | undefined>
  >;
  setLogs: any;
  logs: any;
  category: string;
  databaseQueryingFunctions: any;
};

export const RenderStageEditor = ({
  terminalRef,
  webRef,
  category,
  receivedCode,
  setReceivedCode,
  setLogs,
  logs,
  databaseQueryingFunctions,
}: RenderStageEditorPayload) => {
  if (category === "Database") {
    return (
      <StageCodingEditorDatabase
        isOffline={false}
        {...databaseQueryingFunctions}
      ></StageCodingEditorDatabase>
    );
  }
  return (
    <StageCodingEditor
      terminalRef={terminalRef}
      webRef={webRef}
      receivedCode={receivedCode}
      setReceivedCode={setReceivedCode}
      setLogs={setLogs}
      logs={logs}
    ></StageCodingEditor>
  );
};
