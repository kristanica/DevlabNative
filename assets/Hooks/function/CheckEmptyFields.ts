// const exemptions: Record<string, string[]> = {
//   Lesson: ["hint", "codingInterface", "isHidden", "timer", "choices", "type"],
//   BugBust: [
//     "isHidden",
//     "codingInterface",
//     "timer",
//     "type",
//     "choices",
//     "blocks",
//   ],
//   CodeRush: [
//     "blocks",
//     "codingInterface",
//     "choices",
//     "isHidden",
//     "hint",
//     "type",
//   ],
//   BrainBytes: [
//     "hint",
//     "codingInterface",
//     "isHidden",
//     "timer",
//     "type",
//     "blocks",
//   ],
//   CodeCrafter: [
//     "hint",
//     "codingInterface",
//     "isHidden",
//     "timer",
//     "choices",
//     "type",
//     "blocks",
//   ],
//   Level: [],
//   Register: [],
// };

// type ExemptionType = keyof typeof exemptions;

// const isEmptyValue = (val: unknown): boolean =>
//   val === "" ||
//   val === null ||
//   val === undefined ||
//   (typeof val === "string" && val.trim() === "");

// const hasEmptyInObject = (obj: any): boolean => {
//   if (isEmptyValue(obj)) return true;

//   if (Array.isArray(obj)) {
//     if (obj.length === 0) return true;
//     return obj.some(hasEmptyInObject);
//   }

//   if (obj && typeof obj === "object") {
//     return Object.entries(obj).some(([key, val]) => {
//       // Skip codingInterface
//       if (key === "codingInterface") return false;

//       // For choices specifically, check each field individually
//       if (key === "choices" && val && typeof val === "object") {
//         return Object.entries(val).some(([choiceKey, choiceVal]) => {
//           const empty = isEmptyValue(choiceVal);
//           console.log(
//             `Choice ${choiceKey} = "${choiceVal}" is ${
//               empty ? "EMPTY" : "VALID"
//             }`
//           );
//           return empty;
//         });
//       }

//       return hasEmptyInObject(val);
//     });
//   }

//   return false;
// };

// const CheckEmptyFields = (
//   state: Record<string, any>,
//   type: ExemptionType
// ): boolean => {
//   // console.log("Checking state:", state);

//   return Object.entries(state).some(([key, value]) => {
//     if (exemptions[type]?.includes(key)) {
//       console.log(`${key} is EXEMPT - skipping`);
//       return false;
//     }

//     if (key === "codingInterface") return false;
//     // Check nested objects like blocks, choices, AND codingInterface
//     if (
//       (key === "blocks" || key === "choices") &&
//       value &&
//       typeof value === "object"
//     ) {
//       const isEmpty = hasEmptyInObject(value);
//       console.log(value);
//       console.log(`${key} (object) is ${isEmpty ? "EMPTY" : "VALID"}`);
//       return isEmpty;
//     }

//     const isEmpty = isEmptyValue(value);
//     console.log(`${key} = "${value}" is ${isEmpty ? "EMPTY" : "VALID"}`);
//     return isEmpty;
//   });
// };

// export default CheckEmptyFields;
const exemptions: Record<string, string[]> = {
  Lesson: ["hint", "codingInterface", "isHidden", "timer", "choices", "type"],
  BugBust: [
    "isHidden",
    "codingInterface",
    "timer",
    "type",
    "choices",
    "blocks",
  ],
  CodeRush: [
    "blocks",
    "codingInterface",
    "choices",
    "isHidden",
    "hint",
    "type",
  ],
  BrainBytes: [
    "hint",
    "codingInterface",
    "isHidden",
    "timer",
    "type",
    "blocks",
  ],
  CodeCrafter: [
    "hint",
    "codingInterface",
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
  val === "" ||
  val === null ||
  val === undefined ||
  (typeof val === "string" && val.trim() === "");

// Trim empty codingInterface fields
// Remove empty codingInterface fields
export const cleanCodingInterface = (
  codingInterface: Record<string, string>
) => {
  const cleaned: Record<string, string> = {};
  if (!codingInterface) return cleaned;

  Object.entries(codingInterface).forEach(([key, value]) => {
    if (value && value.trim() !== "") {
      cleaned[key] = value;
    }
  });

  return cleaned;
};

// Check if nested objects (blocks, choices) have empty values
const hasEmptyInObject = (obj: any): boolean => {
  if (isEmptyValue(obj)) return true;

  if (Array.isArray(obj)) {
    if (obj.length === 0) return true;
    return obj.some(hasEmptyInObject);
  }

  if (obj && typeof obj === "object") {
    return Object.entries(obj).some(([key, val]) => {
      // Skip codingInterface (we clean it separately)
      if (key === "codingInterface") return false;

      // For choices, check each individual field
      if (key === "choices" && val && typeof val === "object") {
        return Object.entries(val).some(([choiceKey, choiceVal]) => {
          const empty = isEmptyValue(choiceVal);
          console.log(
            `Choice ${choiceKey} = "${choiceVal}" is ${
              empty ? "EMPTY" : "VALID"
            }`
          );
          return empty;
        });
      }

      return hasEmptyInObject(val);
    });
  }

  return false;
};

// Main function: trims codingInterface and checks empty fields
const CheckEmptyFields = (
  state: Record<string, any>,
  type: ExemptionType
): boolean => {
  // Clean codingInterface first
  if (state.codingInterface && typeof state.codingInterface === "object") {
    state.codingInterface = cleanCodingInterface(state.codingInterface);
  }

  // Check all other fields for emptiness
  return Object.entries(state).some(([key, value]) => {
    if (exemptions[type]?.includes(key)) {
      console.log(`${key} is EXEMPT - skipping`);
      return false;
    }

    if (key === "codingInterface") return false;

    if (
      (key === "blocks" || key === "choices") &&
      value &&
      typeof value === "object"
    ) {
      const isEmpty = hasEmptyInObject(value);
      console.log(value);
      console.log(`${key} (object) is ${isEmpty ? "EMPTY" : "VALID"}`);
      return isEmpty;
    }

    const isEmpty = isEmptyValue(value);
    console.log(`${key} = "${value}" is ${isEmpty ? "EMPTY" : "VALID"}`);
    return isEmpty;
  });
};

export default CheckEmptyFields;
