import { describe, expect, it } from "vitest";
import { lt } from "./lt";

describe("lt", () => {
  it("deve retornar true se o primeiro valor for menor", () => {
    expect(lt(1, 2)).toBe(true);
  });

  it("deve retornar false se o primeiro valor for maior ou igual", () => {
    expect(lt(2, 2)).toBe(false);
    expect(lt(3, 2)).toBe(false);
  });
});
