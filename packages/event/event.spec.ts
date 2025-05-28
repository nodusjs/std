import { describe, expect, it, vi } from "vitest";

vi.mock("./listen", () => {
  return {
    default: vi.fn(() => ({
      on: vi.fn(() => ({
        with: vi.fn(() => ({
          in: vi.fn(() => ({
            call: vi.fn(),
          })),
        })),
      })),
    })),
  };
});

import event from "./event";
import listen from "./listen";

describe("event", () => {
  it("deve encadear corretamente listen -> on -> with -> in -> call", () => {
    const call = vi.fn();
    const inFn = vi.fn(() => ({ call }));
    const withFn = vi.fn(() => ({ in: inFn }));
    const onFn = vi.fn(() => ({ with: withFn }));
    const listenFn = vi.fn(() => ({ on: onFn }));

    listen.mockImplementation(listenFn);

    class MyElement {
      @event.click("button")
      handleClick() {}
    }

    expect(listenFn).toHaveBeenCalledWith("click");
    expect(onFn).toHaveBeenCalledWith("button");
    expect(withFn).toHaveBeenCalledWith();
    expect(inFn).toHaveBeenCalledWith(MyElement.prototype);
    expect(call).toHaveBeenCalledWith("handleClick");
  });
});
