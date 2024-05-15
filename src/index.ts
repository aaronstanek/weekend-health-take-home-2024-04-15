/// Produce a Map that relates letters of the alphabet with
/// those letters' frequency in a given word.
/// For example: "foo" => {"f": 1, "o": 2}
const vectorize = (word: string): Map<string, number> => {
    const characterCounts: Map<string, number> = new Map();
    // Thought Process:
    // Iterate over every character in the word and keep track of how many times
    // we seen each letter of the alphabet using `characterCounts`
    for (const character of word) {
        // Thought Process:
        // If we haven't seen a specific character value in a word before, then `characterCounts.get` returns `undefined`.
        // When this happens, we need to replace the `undefined` with `0` indicating that we have seen that character value zero times before.
        // This way, `count` is always a number, and `count + 1` will never produce a type error.
        const count = characterCounts.get(character) ?? 0;
        characterCounts.set(character, count + 1);
    }
    return characterCounts;
};

/// Return whether dictionaryWordVector is a subset of inputStringVector.
const isSubset = (
    inputStringVector: Map<string, number>,
    dictionaryWordVector: Map<string, number>,
): boolean => {
    // Thought Process:
    // Iterate over every letter of the alphabet that appears in the dictionary word.
    // If a letter in the dictionary word appears more times in the dictionary word than the input string,
    // then there's no way to rearrange the letters of the input string to produce the dictionary word.
    // Otherwise, we can rearrange the letter of the input string to produce the dictionary word.
    for (const [character, dictionaryCount] of dictionaryWordVector.entries()) {
        // Thought Process:
        // Just like in the `vectorize` function, if we haven't seen a specific character value in a word,
        // then we need to replace the `undefined` with `0` to indicate that the number of times we're seen the letter is zero.
        // We don't need to do this replacement for dictionaryWordVector because we know that `character` must exist as a key in that Map.
        const inputCount = inputStringVector.get(character) ?? 0;
        if (dictionaryCount > inputCount) return false;
    }
    return true;
};

// Return a subset of `dictionary` where the elements of that subset can each be composed from the characters present in `inputString`.
export const findWords = (
    inputString: string,
    dictionary: string[],
): string[] => {
    // Though Process:
    // Compute `inputVector` once and save as a constant instead of re-computing it for every dictionary word.
    const inputVector = vectorize(inputString);
    // Thought Process:
    // I use the `filter` method to get a subset of `dictionary` that fufills our criteria.
    // Instead of `filter`, we could use a loop and an accumulator like we do in `vectorize`,
    // However, it's idiomatic in JavaScript/TypeScript to use `filter` for this purpose.
    return dictionary.filter((word) => isSubset(inputVector, vectorize(word)));
};
