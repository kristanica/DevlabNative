let activeBuff: any = [];

export const activeBuffsLocal = () => {
  return {
    activeBuff,
  };
};

export const addActiveBuff = (itemName: string) => {
  if (!activeBuff.includes(itemName)) {
    activeBuff.push(itemName);
    return;
  }
};

export const removeActiveBuff = (itemName: string) => {
  if (activeBuff.includes(itemName)) {
    activeBuff = activeBuff.filter(
      (activeItems: string) => activeItems !== itemName
    );
  }
};
