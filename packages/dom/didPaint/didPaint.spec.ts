import execute from "@dom/execute";
import { didPaintCallback } from "@dom/interfaces";
import { describe, expect, it, vi } from "vitest";
import didPaint from "./didPaint";

vi.mock("@dom/execute", () => {
  return {
    default: vi.fn(() => ({
      on: vi.fn(() => ({
        after: vi.fn(),
      })),
    })),
  };
});

describe("didPaint", () => {
  it("deve encadear corretamente execute -> on -> after", () => {
    const afterMock = vi.fn();
    const onMock = vi.fn(() => ({ after: afterMock }));
    const executeMock = vi.fn(() => ({ on: onMock }));

    execute.mockImplementation(executeMock);

    class MyElement {
      @didPaint
      finalize() {}
    }

    expect(executeMock).toHaveBeenCalledWith("finalize");
    expect(onMock).toHaveBeenCalledWith(MyElement.prototype);
    expect(afterMock).toHaveBeenCalledWith(didPaintCallback);
  });
});
