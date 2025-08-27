const exemptions: Record<string, string[]> = {
  Lesson: [
    "codingInterface",
    "hint",
    "isHidden",
    "timer",
    "choices",
    "copyCode",
    "type",
  ],
  BugBust: ["codingInterface", "hint", "isHidden", "timer", "copyCode", "type"],
  CodeRush: [
    "codingInterface",
    "hint",
    "isHidden",
    "choices",
    "copyCode",
    "type",
  ],
  BrainBytes: [
    "codingInterface",
    "hint",
    "isHidden",
    "timer",
    "copyCode",
    "type",
  ],
  CodeCrafter: [
    "codingInterface",
    "hint",
    "isHidden",
    "timer",
    "choices",
    "type",
  ],
  Level: [],
  Register: [],
};

const CheckEmptyFields = (state: any, type: string) => {
  const hasEmpty = Object.entries(state).some(([key, value]) => {
    if (exemptions[type]?.includes(key)) return false;

    if (key === "choices" && value && typeof value === "object") {
      return Object.values(value).some(
        (choice) => choice === "" || choice === null || choice === undefined
      );
    }

    return value === "" || value === null || value === undefined || value === 0;
  });
  return hasEmpty;
};

export default CheckEmptyFields;
