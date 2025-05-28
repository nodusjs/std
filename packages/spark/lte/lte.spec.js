import { describe, expect, it } from "vitest";
import { lte } from "./lte";

describe("lte", () => {
  it("deve retornar true se o primeiro valor for menor ou igual", () => {
    expect(lte(1, 2)).toBe(true);
    expect(lte(2, 2)).toBe(true);
  });

  it("deve retornar false se o primeiro valor for maior", () => {
    expect(lte(3, 2)).toBe(false);
  });
});
