import React from "react";
import { StyleSheet, View } from "react-native";
import SmallLoading from "./SmallLoading";

type FillScreenLoadingProps = {
  text?: string;
};
const FillScreenLoading = ({ text }: FillScreenLoadingProps) => {
  // const [bootText, setBootText] = useState<string>(
  //   "Setting up the workplace..."
  // );
  // useEffect(() => {
  //   let i: number = 0;

  //   const interval = setInterval(() => {
  //     if (i < evaluatingCodeLines.length) {
  //       setBootText(evaluatingCodeLines[i]);
  //       return i++;
  //     } else {
  //       clearInterval(interval);
  //       return i;
  //     }
  //   }, 8000);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <View
      style={[StyleSheet.absoluteFillObject]}
      className="absolute flex-1 bg-black/20 w-full h-full justify-center items-center z-50"
    >
      <SmallLoading text={text}></SmallLoading>
      {/* <Text className="text-white  text-sm xs:text-xs font-exoBold">
        {bootText}
      </Text> */}
    </View>
  );
};

export default FillScreenLoading;
