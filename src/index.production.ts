/// This file contains the density of comments that I would consider appropriate for production code.
/// The unit tests for `findWords` serve as documentation for that function.
/// To see more of the thought process behind this code, see index.ts

/// The values are integers representing the number of times a specific character appears in a string.
type CharacterFrequencyMap = Map<string, number>;

const buildCharacterFrequencyMap = (word: string): CharacterFrequencyMap => {
    const characterCounts: CharacterFrequencyMap = new Map();
    for (const character of word) {
        const count = characterCounts.get(character) ?? 0;
        characterCounts.set(character, count + 1);
    }
    return characterCounts;
};

/// Checks if dictionaryWord is a subset of input.
const isSubset = (
    input: CharacterFrequencyMap,
    dictionaryWord: CharacterFrequencyMap,
): boolean => {
    for (const [character, dictionaryCount] of dictionaryWord.entries()) {
        const inputCount = input.get(character) ?? 0;
        if (dictionaryCount > inputCount) return false;
    }
    return true;
};

/// Returns a subset of `dictionary` where the elements can be formed using the letters in `inputString`.
export const findWords = (
    inputString: string,
    dictionary: string[],
): string[] => {
    const inputFrequencyMap = buildCharacterFrequencyMap(inputString);
    return dictionary.filter((word) =>
        isSubset(inputFrequencyMap, buildCharacterFrequencyMap(word)),
    );
};
