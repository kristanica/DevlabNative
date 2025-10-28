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
  CodeRush: ["blocks", "copyCode", "choices", "isHidden", "hint", "type"],
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
  // console.log("Checking state:", state);

  return Object.entries(state).some(([key, value]) => {
    if (exemptions[type]?.includes(key)) {
      // console.log(`${key} is EXEMPT - skipping`);
      return false;
    }

    // Check nested objects like blocks, choices, AND codingInterface
    if (
      (key === "blocks" || key === "choices" || key === "codingInterface") &&
      value &&
      typeof value === "object"
    ) {
      const isEmpty = hasEmptyInObject(value);
      // console.log(`${key} (object) is ${isEmpty ? "EMPTY" : "VALID"}`);
      return isEmpty;
    }

    const isEmpty = isEmptyValue(value);
    // console.log(`${key} = "${value}" is ${isEmpty ? "EMPTY" : "VALID"}`);
    return isEmpty;
  });
};

export default CheckEmptyFields;
