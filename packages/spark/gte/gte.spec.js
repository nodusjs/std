import { describe, expect, it } from "vitest";
import { gte } from "./gte";

describe("gte", () => {
  it("deve retornar true se o primeiro valor for maior ou igual", () => {
    expect(gte(2, 2)).toBe(true);
    expect(gte(3, 2)).toBe(true);
  });

  it("deve retornar false se o primeiro valor for menor", () => {
    expect(gte(1, 2)).toBe(false);
  });
});
