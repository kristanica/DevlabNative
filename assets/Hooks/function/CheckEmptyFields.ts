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
  BugBust: [
    "codingInterface",
    "isHidden",
    "timer",
    "copyCode",
    "type",
    "choices",
    "blocks",
  ],
  CodeRush: [
    "codingInterface",
    "hint",
    "isHidden",
    "choices",
    "copyCode",
    "type",
    "blocks",
  ],
  BrainBytes: [
    "codingInterface",
    "hint",
    "isHidden",
    "timer",
    "copyCode",
    "type",
    "blocks",
  ],
  CodeCrafter: [
    "codingInterface",
    "hint",
    "isHidden",
    "timer",
    "choices",
    "type",
    "blocks",
  ],
  Level: [],
  Register: [],
};

const CheckEmptyFields = (state: any, type: string) => {
  const hasEmpty = Object.entries(state).some(([key, value]) => {
    if (exemptions[type]?.includes(key)) return false;
    if (key === "blocks" && typeof value === "object" && value) {
      return Object.values(value).some(
        (choice) => choice === "" || choice === null || choice === undefined
      );
    }
    if (key === "choices" && value && typeof value === "object") {
      return Object.values(value).some(
        (choice) => choice === "" || choice === null || choice === undefined
      );
    }

    return value === "" || value === null || value === undefined;
  });
  return hasEmpty;
};

export default CheckEmptyFields;
