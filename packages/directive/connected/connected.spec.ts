import execute from "@directive/execute";
import { describe, expect, it, vi } from "vitest";
import connected from "./connected";

vi.mock("@directive/execute", () => {
  return {
    default: vi.fn(() => ({
      on: vi.fn(() => ({ after: vi.fn() })),
    })),
  };
});

describe("connected", () => {
  it("deve encadear corretamente execute -> on -> after", () => {
    const afterMock = vi.fn();
    const onMock = vi.fn(() => ({ after: afterMock }));
    const executeMock = vi.fn(() => ({ on: onMock }));

    execute.mockImplementation(executeMock);

    class MyElement {
      @connected
      onConnect() {}
    }

    expect(executeMock).toHaveBeenCalledWith("onConnect");
    expect(onMock).toHaveBeenCalledWith(MyElement.prototype);
    expect(afterMock).toHaveBeenCalledWith("connectedCallback");
  });
});
