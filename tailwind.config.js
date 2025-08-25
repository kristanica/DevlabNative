/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./assets/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0D1117",
        accent: "#25293B",
        accentContainer: "#111827",
        button: "#7F5AF0",
        offwhite: "#FFFFFE",
        shopAccent: "#111827",
      },
      fontFamily: {
        exoBlack: ["ExoBlack"],
        exoBold: ["ExoBold"],
        exoExtraBold: ["ExoExtraBold"],
        exoLight: ["ExoLight"],
        exoMedium: ["ExoMedium"],
        exoRegular: ["ExoRegular"],
        exoSemiBold: ["ExoSemiBold"],
      },
      screens: {
        xs: "320px", // extra small phones
        sm: "640px", // small devices
        md: "768px", // tablets
        lg: "1024px", // large tablets
        xl: "1280px", // desktops
      },
    },
  },
  plugins: [],
};
