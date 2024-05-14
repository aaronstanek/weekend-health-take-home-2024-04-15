import { findWords } from "./index.js";

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

test("if inputString is a single character and dictionary contains a single string that is equal to inputString, then the result is that single dictionary string", () => {
    expect(findWords("a", ["a"])).toEqual(["a"]);
});

test("if inputString is a single character and dictionary contains a single character string that is not equal to inputString, then the result is empty", () => {
    expect(findWords("a", ["b"])).toEqual([]);
});
