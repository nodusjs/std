import { describe, expect, it } from "vitest";
import { inc } from "./inc";

describe("inc", () => {
  it("deve incrementar um número", () => {
    expect(inc(1)).toBe(2);
  });
});
