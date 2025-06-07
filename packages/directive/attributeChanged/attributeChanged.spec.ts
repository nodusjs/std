import execute from "@directive/attributeChanged/execute";
import { describe, expect, it, vi } from "vitest";
import attributeChanged from "./attributeChanged";

vi.mock("@directive/attributeChanged/execute", () => {
  return {
    default: vi.fn(() => ({
      with: vi.fn(() => ({
        from: vi.fn(() => ({
          whenAttributeChanges: vi.fn(),
        })),
      })),
    })),
  };
});

describe("attributeChanged (uso do execute)", () => {
  it("deve encadear corretamente execute -> with -> from -> whenAttributeChanges", () => {
    const whenAttributeChangesMock = vi.fn();
    const fromMock = vi.fn(() => ({
      whenAttributeChanges: whenAttributeChangesMock,
    }));
    const withMock = vi.fn(() => ({ from: fromMock }));
    const executeMock = vi.fn(() => ({ with: withMock }));

    execute.mockImplementation(executeMock);

    class MyElement {
      @attributeChanged("visible", Boolean)
      set visible(_) {}
    }

    expect(executeMock).toHaveBeenCalledWith("visible");
    expect(withMock).toHaveBeenCalledWith([Boolean]);
    expect(fromMock).toHaveBeenCalledWith(MyElement.prototype);
    expect(whenAttributeChangesMock).toHaveBeenCalledWith("visible");
  });
});
