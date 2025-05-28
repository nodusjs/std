import { describe, expect, it } from "vitest";
import { subtract } from "./subtract";

describe("subtract", () => {
  it("deve subtrair dois números", () => {
    expect(subtract(5, 2)).toBe(3);
  });
});
