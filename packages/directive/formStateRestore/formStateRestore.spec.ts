import { describe, expect, it, vi } from "vitest";

vi.mock("@directive/execute", () => {
  return {
    default: vi.fn(() => ({
      on: vi.fn(() => ({ after: vi.fn() })),
    })),
  };
});

import execute from "@directive/execute";
import formStateRestore from "./formStateRestore";

describe("formStateRestore", () => {
  it("deve encadear corretamente execute -> on -> after", () => {
    const after = vi.fn();
    const on = vi.fn(() => ({ after }));
    const exec = vi.fn(() => ({ on }));

    execute.mockImplementation(exec);

    class MyElement {
      @formStateRestore
      onFormStateRestore() {}
    }

    expect(exec).toHaveBeenCalledWith("onFormStateRestore");
    expect(on).toHaveBeenCalledWith(MyElement.prototype);
    expect(after).toHaveBeenCalledWith("formStateRestoreCallback");
  });
});
