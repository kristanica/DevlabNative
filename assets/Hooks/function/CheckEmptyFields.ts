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

type ExemptionType = keyof typeof exemptions;

const isEmptyValue = (val: unknown): boolean =>
  val === "" || val === null || val === undefined;

const hasEmptyInObject = (obj: Record<string, unknown>): boolean =>
  Object.values(obj).some(isEmptyValue);

const CheckEmptyFields = (
  state: Record<string, any>,
  type: ExemptionType
): boolean => {
  return Object.entries(state).some(([key, value]) => {
    if (exemptions[type]?.includes(key)) return false;

    if (
      (key === "blocks" || key === "choices") &&
      value &&
      typeof value === "object"
    ) {
      return hasEmptyInObject(value);
    }

    return isEmptyValue(value);
  });
};

export default CheckEmptyFields;
