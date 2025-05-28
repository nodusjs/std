import { describe, expect, it } from "vitest";
import { equals } from "./equals";

describe("equals", () => {
  it("deve retornar true se os valores forem iguais", () => {
    expect(equals(1, 1)).toBe(true);
  });

  it("deve retornar false se os valores forem diferentes", () => {
    expect(equals(1, 2)).toBe(false);
  });
});
