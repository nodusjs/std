import execute from "@directive/execute";
import { describe, expect, it, vi } from "vitest";
import formDisabled from "./formDisabled";

vi.mock("@directive/execute", () => {
  return {
    default: vi.fn(() => ({
      on: vi.fn(() => ({ after: vi.fn() })),
    })),
  };
});

describe("formDisabled", () => {
  it("deve encadear corretamente execute -> on -> after", () => {
    const afterMock = vi.fn();
    const onMock = vi.fn(() => ({ after: afterMock }));
    const executeMock = vi.fn(() => ({ on: onMock }));

    execute.mockImplementation(executeMock);

    class MyElement {
      @formDisabled
      onFormDisabled() {}
    }

    const target = MyElement.prototype;

    expect(executeMock).toHaveBeenCalledWith("onFormDisabled");
    expect(onMock).toHaveBeenCalledWith(target);
    expect(afterMock).toHaveBeenCalledWith("formDisabledCallback");
  });
});
