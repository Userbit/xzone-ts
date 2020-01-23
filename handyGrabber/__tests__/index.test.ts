import { add, sub } from "../index";

describe("add should return", () => {
  test("4 when 2,2", () => {
    expect(add(2, 2)).toBe(4);
  });
  test("0 when -2,2", () => {
    expect(add(-2, 2)).toBe(0);
  });
});

describe("sub should return", () => {
  test("4 when 6,2", () => {
    expect(sub(6, 2)).toBe(4);
  });
});
