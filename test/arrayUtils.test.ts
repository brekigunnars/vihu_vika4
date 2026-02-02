import { describe, it, expect } from "vitest";
import { unique, flatten, chunk } from "../src/arrayUtils";

describe("unique", () => {
  it("removes duplicates", () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  });

  it("works with strings", () => {
    expect(unique(["a", "b", "a"])).toEqual(["a", "b"]);
  });

  it("returns empty array if input is empty", () => {
    expect(unique([])).toEqual([]);
  });
});

describe("flatten", () => {
  it("flattens one level", () => {
    expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
  });

  it("flattens nested arrays of multiple levels", () => {
    expect(flatten([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
  });

  it("returns empty array if input is empty", () => {
    expect(flatten([])).toEqual([]);
  });
});

describe("chunk", () => {
  it("splits array into chunks of given size", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("returns one chunk if size is larger than array length", () => {
    expect(chunk([1, 2, 3], 10)).toEqual([[1, 2, 3]]);
  });

  it("returns empty array for empty input", () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it("throws for invalid chunk size (<= 0)", () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow();
    expect(() => chunk([1, 2, 3], -1)).toThrow();
  });
});
