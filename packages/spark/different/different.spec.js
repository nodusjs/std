import { describe, expect, it } from "vitest";
import { different } from "./different";

describe("different", () => {
  it("deve retornar true se os valores forem diferentes", () => {
    expect(different(1, 2)).toBe(true);
  });

  it("deve retornar false se os valores forem iguais", () => {
    expect(different(2, 2)).toBe(false);
  });
});
