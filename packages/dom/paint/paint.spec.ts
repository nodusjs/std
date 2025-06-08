import render from "@dom/paint/render";
import { describe, expect, it, vi } from "vitest";
import paint from "./paint";

vi.mock("@dom/paint/render", () => {
  return {
    default: vi.fn(() => ({
      with: vi.fn(() => ({
        on: vi.fn(() => ({
          whenConnected: vi.fn(),
        })),
      })),
    })),
  };
});

describe("paint", () => {
  it("deve encadear corretamente render -> with -> from -> whenConnected", () => {
    const whenConnectedMock = vi.fn();
    const onMock = vi.fn(() => ({ whenConnected: whenConnectedMock }));
    const withMock = vi.fn(() => ({ on: onMock }));
    const renderMock = vi.fn(() => ({ with: withMock }));

    render.mockImplementation(renderMock);

    const component = vi.fn();
    const style = vi.fn();

    @paint(component, style)
    class MyElement {}

    expect(renderMock).toHaveBeenCalledWith(component);
    expect(withMock).toHaveBeenCalledWith([style]);
    expect(onMock).toHaveBeenCalledWith(MyElement);
    expect(whenConnectedMock).toHaveBeenCalled();
  });
});
