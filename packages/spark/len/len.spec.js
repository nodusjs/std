import { describe, expect, it } from "vitest";
import { len } from "./len";

describe("len", () => {
  it("deve retornar o número de chaves em um objeto", () => {
    expect(len({ a: 1, b: 2 })).toBe(2);
  });

  it("deve retornar 0 se o valor for null ou indefinido", () => {
    expect(len(null)).toBe(0);
    expect(len(undefined)).toBe(0);
  });
});
