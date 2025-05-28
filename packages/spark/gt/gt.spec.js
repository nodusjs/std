import { describe, expect, it } from "vitest";
import { gt } from "./gt";

describe("gt", () => {
  it("deve retornar true se o primeiro valor for maior", () => {
    expect(gt(3, 2)).toBe(true);
  });

  it("deve retornar false se o primeiro valor for menor ou igual", () => {
    expect(gt(2, 2)).toBe(false);
    expect(gt(1, 2)).toBe(false);
  });
});
