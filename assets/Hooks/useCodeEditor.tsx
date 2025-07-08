import { useCallback, useRef } from "react";
import WebView from "react-native-webview";

const useCodeEditor = () => {
  const webRef = useRef<WebView>(null);

  const sendToWebView = useCallback((lang: string) => {
    webRef.current?.postMessage(lang);
  }, []);

  return { webRef, sendToWebView };
};

export default useCodeEditor;
