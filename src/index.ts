/// A Map to store the frequency of each character in a string.
/// The values are integers representing the number of times a specific character appears in a string.
/// This type alias improves code readability by giving maintainers a better understanding of the intent of a variable.
type CharacterFrequencyMap = Map<string, number>;

/// Produces a Map that relates letters of the alphabet with
/// the frequency of each letter in a given word.
/// For example: "foo" => {"f": 1, "o": 2}
const buildCharacterFrequencyMap = (word: string): CharacterFrequencyMap => {
    const characterCounts: CharacterFrequencyMap = new Map();
    // Iterate over every character in the word and keeps track of how many times
    // we've seen each letter using `characterCounts`.
    for (const character of word) {
        // If a character hasn't been seen before, `characterCounts.get` returns `undefined`.
        // In that case, initialize the count to 0.
        const count = characterCounts.get(character) ?? 0;
        characterCounts.set(character, count + 1);
    }
    return characterCounts;
};

/// Checks if a word's letter frequency
/// is a subset of the input string's letter frequency.
const isSubset = (
    input: CharacterFrequencyMap,
    dictionaryWord: CharacterFrequencyMap,
): boolean => {
    // Iterate over every letter in the dictionary word.
    // If a letter appears more times in the dictionary word than the input string,
    // then it's impossible to form that word from the input string.
    for (const [character, dictionaryCount] of dictionaryWord.entries()) {
        // Get the count of the character in the input string (or 0 if not present).
        const inputCount = input.get(character) ?? 0;
        if (dictionaryCount > inputCount) return false;
    }
    return true;
};

// Returns a subset of `dictionary` where the elements can be formed using the letters in `inputString`.
export const findWords = (
    inputString: string,
    dictionary: string[],
): string[] => {
    // Pre-compute the character frequency for the input string to avoid redundant calculations.
    const inputFrequencyMap = buildCharacterFrequencyMap(inputString);
    // Filter the dictionary to only include words that can be formed from the input string.
    // This approach is more concise and idiomatic in TypeScript compared to a loop and accumulator.
    return dictionary.filter((word) =>
        isSubset(inputFrequencyMap, buildCharacterFrequencyMap(word)),
    );
};
