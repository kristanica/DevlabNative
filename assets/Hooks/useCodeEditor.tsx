import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";
import WebView from "react-native-webview";

type CodeEditorPayload = {
  html?: string;
  css?: string;
  js?: string;
};
type logsProps = {
  logs: {
    type: string;
    data: any[];
  };
};

const useCodeEditor = () => {
  const [query, setQuery] = useState<string>();
  const terminalRef = useRef<BottomSheet>(null);
  const webRef = useRef<WebView>(null);
  // Terminal logs
  const [logs, setLogs] = useState<logsProps[]>([]);
  // Switches betweem Html/Css/Js
  const sendToWebView = useCallback((lang: string) => {
    webRef.current?.postMessage(lang);
  }, []);
  const [receivedCode, setReceivedCode] = useState<
    CodeEditorPayload | undefined
  >(undefined);
  return {
    webRef,
    sendToWebView,
    receivedCode,
    setReceivedCode,
    logs,
    setLogs,
    terminalRef,
    setQuery,
    query,
  };
};

export default useCodeEditor;
