import { StyleSheet } from "react-native";

export const boxShadow = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    elevation: 10,
  },
  shadow2: {
    shadowColor: "black",
    elevation: 5,
  },
  textShadow: {
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  textShadowLight: {
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
});
