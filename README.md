# weekend-health-take-home-2024-04-15

-   [Introduction](#introduction)
-   [Installing, building, and testing](#installing-building-and-testing)
-   [Approach to the problem](#approach-to-the-problem)
-   [Approach to testing](#approach-to-testing)

Read the implementation [here](https://github.com/aaronstanek/weekend-health-take-home-2024-04-15/blob/main/src/index.ts).

Read the tests [here](https://github.com/aaronstanek/weekend-health-take-home-2024-04-15/blob/main/src/index.test.ts).

## Introduction

This repository implements a function `findWords` as described [here](https://weekendhealth.notion.site/Weekend-Health-Take-home-Challenge-327d5972824041829cf9ddc32cb7acd6).

`findWords` accepts an `inputString` and a `dictionary` with the following function signature:

```typescript
function findWords(inputString: string, dictionary: string[]): string[];
```

`findWords` returns an array of words from the dictionary that can be formed by rearranging some or all of the characters in the input string. Each character in the input string may be used up to once per word.

## Installing, building, and testing

### Dependencies

-   npm
-   node

### To install

```bash
npm install
```

### To build and test

```bash
npm run build-and-test
```

## Approach to the problem

Read the implementation [here](https://github.com/aaronstanek/weekend-health-take-home-2024-04-15/blob/main/src/index.ts).

I considered several approaches to this problem, settling on an `O(n)` solution where `n` is the total number of characters in all input strings. I count the number of times each character appears in the `inputString` and then compare that to how many times each character appears in each of the `dictionary` words.

If the number of times that a character appears in a `dictionary` word is greater than the number of times that same character appears in the `inputString`, then we can't possibly rearrange the characters of the `inputString` to create the `dictionary` word. However, if every character in the `dictionary word` appears in the `inputString` at least as many times as it appears in the `dictionary` word, then we can rearrange the characters of the `inputString` to make that `dictionary` word.

This approach is powered by the following two observations:

-   Dictionary words can be evaluated independently; whether a given dictionary word appears in the output depends only on that word and the `inputString`.
-   The order of characters in the `inputString` and the `dictionary` words does not matter.

The two facts above greatly simply the scope of the problem. The first fact means that determining the set of words to return from
`findWords` is no more complex than determining if any one `dictionary` word should be returned. The second fact means that we can abstract away the input strings entirely and deal only with sets of numbers representing the number of times a given character appears in a word.

Using these facts, I transform the `inputString` and each of the `dictionary` words into a character frequency map, then I compare each of the `dictionary` maps to the `inputString` map to determine whether each of the `dictionary` words can appear in the output. If a `dictionary` word can be made by rearranging the letters of the `inputString`, then the `dictionary` word's character frequency map is a subset of the `inputString` character frequency map, and vice-versa.

To simplify the logic of the implementation, I separated the problem into the following two steps:

-   Transforming a string into a character frequency map.
-   Determining if one character frequency map is a subset of another character frequency map.

In the implementation, each of the above steps is a helper function. The top-level `findWords` only exists to apply the helper functions across the many strings in the parameters.

### Rejected approaches

I believe that it is good engineering practice to seek multiple solutions to any problem.

One alternative solution would be to compute the edits needed to transform the `inputString` into a given dictionary word. This approach has similarities to computing the Levenshtein edit distance between two strings, and would likely have a similar time complexity. This is undesirable because Levenshtein typically runs in `O(n*m)` with `n` and `m` being the lengths of the input strings.

Another alternative would be to generate all possible permutations of the `inputString` and then compare those permutations to the set of `dictionary` words. This is by far the worst solution as it would require superexponenetial time complexity, approximately `O(n!)` with `n` being the length of `inputString`.

## Approach to testing

To run tests see: [To build and test](#to-build-and-test).

Read the tests [here](https://github.com/aaronstanek/weekend-health-take-home-2024-04-15/blob/main/src/index.test.ts).

I use [Jest](https://jestjs.io/) for unit testing. I provide enough test coverage to be confident that `findWords` works, however I see areas that could use greater test coverage. Some of these areas include the following:

-   Testing lowercase characters other than `a` and `b`.
-   Testing more complex string patterns, for example `aba` where a sequence of `a`s is broken by another character.
-   Testing very long inputs.
-   Testing against non-lowercase characters, including a wide range of Unicode characters. (While the specification for `findWords` does not handle non-lowercase or non-ASCII characters, [Hyrum's law](https://www.laws-of-software.com/laws/hyrum/) dictates that at least one user will rely on `findWords` behavior when given these characters)
