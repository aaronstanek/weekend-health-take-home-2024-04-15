const vectorizeWord = (word: string): Map<string, number> => {
  const characterCounts: Map<string, number> = new Map();
  for (const character of word) {
    const count = characterCounts.get(character) ?? 0;
    characterCounts.set(character, count + 1);
  }
  return characterCounts;
};

const isSubset = (a: Map<string, number>, b: Map<string, number>): boolean => {
  for (const entry of b.entries()) {
    const aCount = a.get(entry[0]) ?? 0;
    if (entry[1] > aCount) return false;
  }
  return true;
};

export const findWords = (
  inputString: string,
  dictionary: string[],
): string[] => {
  const inputVector = vectorizeWord(inputString);
  return dictionary.filter((word) =>
    isSubset(inputVector, vectorizeWord(word)),
  );
};
