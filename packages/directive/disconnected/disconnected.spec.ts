import execute from "@directive/execute";
import { describe, expect, it, vi } from "vitest";
import disconnected from "./disconnected";

vi.mock("@directive/execute", () => {
  return {
    default: vi.fn(() => ({
      on: vi.fn(() => ({ after: vi.fn() })),
    })),
  };
});

describe("disconnected", () => {
  it("deve encadear corretamente execute -> on -> after", () => {
    const afterMock = vi.fn();
    const onMock = vi.fn(() => ({ after: afterMock }));
    const executeMock = vi.fn(() => ({ on: onMock }));

    execute.mockImplementation(executeMock);

    class MyElement {
      @disconnected
      onDisconnect() {}
    }

    expect(executeMock).toHaveBeenCalledWith("onDisconnect");
    expect(onMock).toHaveBeenCalledWith(MyElement.prototype);
    expect(afterMock).toHaveBeenCalledWith("disconnectedCallback");
  });
});
