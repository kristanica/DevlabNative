import { useCallback, useRef, useState } from "react";
import WebView from "react-native-webview";

type CodeEditorPayload = {
  html?: string;
  css?: string;
  js?: string;
};
const useCodeEditor = () => {
  const webRef = useRef<WebView>(null);

  const sendToWebView = useCallback((lang: string) => {
    webRef.current?.postMessage(lang);
  }, []);
  const [receivedCode, setReceivedCode] = useState<
    CodeEditorPayload | undefined
  >(undefined);
  return { webRef, sendToWebView, receivedCode, setReceivedCode };
};

export default useCodeEditor;
