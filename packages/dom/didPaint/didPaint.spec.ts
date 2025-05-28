import { didPaintCallback } from "@dom/interfaces";
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
import didPaint from "./didPaint";

describe("didPaint", () => {
  it("deve encadear corretamente execute -> on -> after", () => {
    const after = vi.fn();
    const on = vi.fn(() => ({ after }));
    const exec = vi.fn(() => ({ on }));

    execute.mockImplementation(exec);

    class MyElement {
      @didPaint
      finalize() {}
    }

    expect(exec).toHaveBeenCalledWith("finalize");
    expect(on).toHaveBeenCalledWith(MyElement.prototype);
    expect(after).toHaveBeenCalledWith(didPaintCallback);
  });
});
