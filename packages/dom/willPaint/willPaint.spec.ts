import { willPaintCallback } from "@dom/interfaces";
import { describe, expect, it, vi } from "vitest";

vi.mock("@dom/execute", () => {
  return {
    default: vi.fn(() => ({
      on: vi.fn(() => ({
        after: vi.fn(),
      })),
    })),
  };
});

import execute from "@dom/execute";
import willPaint from "./willPaint";

describe("willPaint", () => {
  it("deve encadear corretamente execute -> on -> after", () => {
    const after = vi.fn();
    const on = vi.fn(() => ({ after }));
    const exec = vi.fn(() => ({ on }));

    execute.mockImplementation(exec);

    class MyElement {
      @willPaint
      prepare() {}
    }

    expect(exec).toHaveBeenCalledWith("prepare");
    expect(on).toHaveBeenCalledWith(MyElement.prototype);
    expect(after).toHaveBeenCalledWith(willPaintCallback);
  });
});
