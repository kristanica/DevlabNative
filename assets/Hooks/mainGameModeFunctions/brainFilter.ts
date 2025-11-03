const brainFilter = (choices: {
  a: string;
  b: string;
  c: string;
  d: string;
  correctAnswer: string;
}) => {
  const arrayChoices: any = Object.entries(choices)
    .filter(([key]) => key !== "correctAnswer")
    .map(([_, values]: any) => values);
  // const removeActiveBuff = activeBuffsLocal.getState().removeActiveBuff;

  let optionsArray = Object.entries(choices)
    .filter(([key]) => key !== "correctAnswer")
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB));

  const brainFilterItem = () => {
    const wrongOptions = optionsArray.filter(
      ([key]) => key !== choices.correctAnswer.trim()
    );
    if (wrongOptions.length === 0) return optionsArray;
    const randomIndex = Math.floor(Math.random() * wrongOptions.length);
    const optionToRemove = wrongOptions[randomIndex][0];
    const filteredOptions = optionsArray.filter(
      ([key]) => key !== optionToRemove
    );

    return filteredOptions;
  };

  return { arrayChoices, brainFilterItem, optionsArray };
};

export default brainFilter;
