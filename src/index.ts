const vectorize = (word: string): Map<string, number> => {
    const characterCounts: Map<string, number> = new Map();
    for (const character of word) {
        const count = characterCounts.get(character) ?? 0;
        characterCounts.set(character, count + 1);
    }
    return characterCounts;
};

const isSubset = (a: Map<string, number>, b: Map<string, number>): boolean => {
    for (const entry of b.entries()) {
        const character = entry[0];
        const bCount = entry[1];
        const aCount = a.get(character) ?? 0;
        if (bCount > aCount) return false;
    }
    return true;
};

export const findWords = (
    inputString: string,
    dictionary: string[],
): string[] => {
    const inputVector = vectorize(inputString);
    return dictionary.filter((word) => isSubset(inputVector, vectorize(word)));
};
