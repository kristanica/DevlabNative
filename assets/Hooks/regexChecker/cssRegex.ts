export const cssRegex = (cssCode: any) => {
  const achievements = [];
  // class usage
  if (/\.[a-zA-Z0-9_-]+/.test(cssCode)) {
    achievements.push("styleStrategist");
  }
  // ID usage
  if (/#\w+/.test(cssCode)) {
    achievements.push("selectorStrategist");
  }
  //  color property
  if (/(color|background-color)\s*:\s*[^;]+;/.test(cssCode)) {
    achievements.push("colorCrafter");
  }
  //  flex or grid layout
  if (/display\s*:\s*(flex|grid)/.test(cssCode)) {
    achievements.push("layoutLegend");
  }
  //  box model usage
  if (/(margin|padding|border)\s*:\s*[^;]+;/.test(cssCode)) {
    achievements.push("boxBuilder");
  }
  // font styling
  if (/(font-size|font-family|font-weight)\s*:\s*[^;]+;/.test(cssCode)) {
    achievements.push("fontFanatic");
  }
  return achievements;
};
