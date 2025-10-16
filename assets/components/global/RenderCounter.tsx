import { useRef } from "react";
import { StyleSheet } from "react-native";

const RenderCounter = (componentName: string) => {
  const renderCount = useRef<number>(0);
  renderCount.current += 1;
  console.log(`${componentName} Render count: ${renderCount.current}`);
};

export default RenderCounter;

const styles = StyleSheet.create({});
