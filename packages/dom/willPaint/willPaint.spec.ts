import execute from "@dom/execute";
import { willPaintCallback } from "@dom/interfaces";
import { describe, expect, it, vi } from "vitest";
import willPaint from "./willPaint";

vi.mock("@dom/execute", () => {
  return {
    default: vi.fn(() => ({
      on: vi.fn(() => ({
        after: vi.fn(),
      })),
    })),
  };
});

describe("willPaint", () => {
  it("deve encadear corretamente execute -> on -> after", () => {
    const afterMock = vi.fn();
    const onMock = vi.fn(() => ({ after: afterMock }));
    const executeMok = vi.fn(() => ({ on: onMock }));

    execute.mockImplementation(executeMok);

    class MyElement {
      @willPaint
      prepare() {}
    }

    expect(executeMok).toHaveBeenCalledWith("prepare");
    expect(onMock).toHaveBeenCalledWith(MyElement.prototype);
    expect(afterMock).toHaveBeenCalledWith(willPaintCallback);
  });
});
