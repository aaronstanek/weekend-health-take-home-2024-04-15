import { findWords } from "./index.js";

test("empty input returns empty result", () => {
  expect(findWords("", []).length).toBe(0);
});
