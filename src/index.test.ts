import { findWords } from "./index.js";

/// The simplest non-trivial case of the function is where the inputString is a single character.
/// These tests show that the implementation can include strings that perfectly match the input,
/// ignore strings that contain a letter that does not appear in the input, can correctly handle cases,
/// involving multiple dictionary words
describe("single character inputString", () => {
    test("include a dictionary word if it matches the inputString", () => {
        expect(findWords("a", ["a"])).toEqual(["a"]);
    });
    test("ignore a dictionary word if it contains a letter not in the inputString", () => {
        expect(findWords("a", ["b"])).toEqual([]);
    });
    test("include multiple dictionary words that match each match the inputString", () => {
        expect(findWords("a", ["a", "a"])).toEqual(["a", "a"]);
    });
    test("ignore multiple dictionary words that contain letters not in the inputString", () => {
        expect(findWords("a", ["b", "b"])).toEqual([]);
    });
    test("ignore the second dictionary word and include the first when only the first matches", () => {
        expect(findWords("a", ["a", "b"])).toEqual(["a"]);
    });
    test("ignore the first dictionary word and include the second when only the second matches", () => {
        expect(findWords("a", ["b", "a"])).toEqual(["a"]);
    });
});

/// These tests show that the implementation counts letter frequency and isn't just checking for the existance or nonexistance of a letter.
/// Additionally, these tests show that the order of letters in word does not matter.
describe("subsets and supersets of the inputString", () => {
    test("ignore the inputString  concatenated with itself", () => {
        expect(findWords("a", ["aa"])).toEqual([]);
    });
    test("ignore the inputString with a prefix", () => {
        expect(findWords("a", ["ba"])).toEqual([]);
    });
    test("ignore the inputString with a suffix", () => {
        expect(findWords("a", ["ab"])).toEqual([]);
    });
    test("include proper subsets of the inputString", () => {
        expect(findWords("ab", ["a"])).toEqual(["a"]);
    });
    test("ignore a dictionary word if it includes a letter in the inputString more times that the inputString", () => {
        expect(findWords("ab", ["aa"])).toEqual([]);
    });
    test("include a dictionary word if it contains the same letters as the inputString, but in a different order", () => {
        expect(findWords("ab", ["ba"])).toEqual(["ba"]);
    });
    test("return words in the order they are entered (1/2)", () => {
        expect(findWords("ab", ["ab", "ba"])).toEqual(["ab", "ba"]);
    });
    test("return words in the order they are entered (2/2)", () => {
        expect(findWords("ab", ["ba", "ab"])).toEqual(["ba", "ab"]);
    });
});

/// Empty strings and empty arrays are very common edge cases.
describe("empty strings and arrays", () => {
    test("if inputString and dictionary are both empty, then the result is empty", () => {
        expect(findWords("", [])).toEqual([]);
    });
    test("if inputString is empty, and dictionary contains a single empty string, then the result is a single empty string", () => {
        expect(findWords("", [""])).toEqual([""]);
    });
    test("if inputString is empty, and dictionary contains a single non-empty string, then the result is empty", () => {
        expect(findWords("", ["a"])).toEqual([]);
    });
    test("if inputString is a single character and dictionary is empty, then the result is empty", () => {
        expect(findWords("a", [])).toEqual([]);
    });
    test("if inputString is a single character and dictionary is a single empty string, then the result is a single empty string", () => {
        expect(findWords("a", [""])).toEqual([""]);
    });
});

/// The following tests encode the two test cases that were included in the take-home challenge instructions.
/// I would not include these tests in a production-level codebase because these tests are more complex than they need to be.
/// i.e. If either of these tests were to fail it wouldn't be plainly obvious why the test failed.
/// I include these tests in this submission only to prove that my implementation aligns with the intent of the instructions.
describe("supplied example test cases", () => {
    test("supplied test 1", () => {
        expect(
            findWords("ate", [
                "ate",
                "eat",
                "tea",
                "dog",
                "do",
                "god",
                "goo",
                "go",
                "good",
            ]),
        ).toEqual(["ate", "eat", "tea"]);
    });

    test("supplied test 2", () => {
        expect(
            findWords("oogd", [
                "ate",
                "eat",
                "tea",
                "dog",
                "do",
                "god",
                "goo",
                "go",
                "good",
            ]),
        ).toEqual(["dog", "do", "god", "goo", "go", "good"]);
    });
});
