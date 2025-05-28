import { describe, expect, it, vi } from "vitest";

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

import execute from "@directive/attributeChanged/execute";
import attributeChanged from "./attributeChanged";

describe("attributeChanged (uso do execute)", () => {
  it("deve encadear corretamente execute -> with -> from -> whenAttributeChanges", () => {
    const whenAttributeChanges = vi.fn();
    const from = vi.fn(() => ({ whenAttributeChanges }));
    const withFilters = vi.fn(() => ({ from }));
    const exec = vi.fn(() => ({ with: withFilters }));

    execute.mockImplementation(exec);

    class MyElement {
      @attributeChanged("visible", Boolean)
      set visible(_) {}
    }

    expect(exec).toHaveBeenCalledWith("visible");
    expect(withFilters).toHaveBeenCalledWith([Boolean]);
    expect(from).toHaveBeenCalledWith(MyElement.prototype);
    expect(whenAttributeChanges).toHaveBeenCalledWith("visible");
  });
});
