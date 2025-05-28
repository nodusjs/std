import { describe, expect, it } from "vitest";
import { dec } from "./dec";

describe("dec", () => {
  it("deve decrementar um número", () => {
    expect(dec(2)).toBe(1);
  });
});
