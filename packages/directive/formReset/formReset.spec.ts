import execute from "@directive/execute";
import { describe, expect, it, vi } from "vitest";
import formReset from "./formReset";

vi.mock("@directive/execute", () => {
  return {
    default: vi.fn(() => ({
      on: vi.fn(() => ({ after: vi.fn() })),
    })),
  };
});

describe("formReset", () => {
  it("deve encadear corretamente execute -> on -> after", () => {
    const afterMock = vi.fn();
    const onMock = vi.fn(() => ({ after: afterMock }));
    const executeMock = vi.fn(() => ({ on: onMock }));

    execute.mockImplementation(executeMock);

    class MyElement {
      @formReset
      onFormReset() {}
    }

    expect(executeMock).toHaveBeenCalledWith("onFormReset");
    expect(onMock).toHaveBeenCalledWith(MyElement.prototype);
    expect(afterMock).toHaveBeenCalledWith("formResetCallback");
  });
});
