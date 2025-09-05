const itemsToBeIncluded: Record<string, string[]> = {
  BrainBytes: ["Brain Filter", "Coin Surge", "Error Shield"],
  CodeRush: ["Time Freeze", "Code Patch++", "Coin Surge", "Error Shield"],
  CodeCrafter: ["Code Whisper", "Coin Surge", "Error Shield"],
  BugBust: ["Coin Surge", "Error Shield"],
};

type userInventory = {
  Icon: string;
  cost: number;
  desc: string;
  item: string;
  quantity: number;
  title: string;
};

const itemThatShouldRender = (
  gameType: string,
  userInventory: userInventory[]
) => {
  const includeItem = itemsToBeIncluded[gameType] || [];

  const shouldReturn = userInventory.filter((value) => {
    return includeItem.includes(value.title);
  });
  return shouldReturn;
};

export default itemThatShouldRender;
