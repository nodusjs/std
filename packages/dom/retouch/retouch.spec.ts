import {
  cssCallback,
  didPaintCallback,
  htmlCallback,
  isPainted,
  willPaintCallback,
} from "@dom/interfaces";
import { describe, expect, it } from "vitest";
import retouch from "./retouch";

describe("retouch", () => {
  it("deve funcionar corretamente em um setter", async () => {
    const steps = [];

    class MyElement {
      [isPainted] = true;

      [willPaintCallback]() {
        steps.push("will");
      }

      [htmlCallback](resolve) {
        steps.push("html");
        resolve();
      }

      [cssCallback](resolve) {
        steps.push("css");
        resolve();
      }

      [didPaintCallback]() {
        steps.push("did");
      }

      @retouch
      set value(_) {
        steps.push("set");
      }
    }

    const element = new MyElement();
    element.value = 42;

    await new Promise((r) => setTimeout(r, 100));

    expect(steps).toEqual(["set", "css"]);
  });

  it("deve funcionar corretamente em um método", async () => {
    const steps = [];

    class MyElement {
      [isPainted] = true;

      [willPaintCallback]() {
        steps.push("will");
      }

      [htmlCallback](resolve) {
        steps.push("html");
        resolve();
      }

      [cssCallback](resolve) {
        steps.push("css");
        resolve();
      }

      [didPaintCallback]() {
        steps.push("did");
      }

      @retouch
      trigger() {
        steps.push("method");
      }
    }

    const element = new MyElement();
    element.trigger();

    await new Promise((r) => setTimeout(r, 10));
    expect(steps).toEqual(["method", "css"]);
  });

  it("não deve disparar os callbacks de render se isPainted = false", async () => {
    const steps = [];

    class MyElement {
      [isPainted] = false;

      [willPaintCallback]() {
        steps.push("will");
      }

      [htmlCallback](resolve) {
        steps.push("html");
        resolve();
      }

      [cssCallback](resolve) {
        steps.push("css");
        resolve();
      }

      [didPaintCallback]() {
        steps.push("did");
      }

      @retouch
      trigger() {
        steps.push("method");
      }
    }

    const element = new MyElement();
    element.trigger();

    await new Promise((r) => setTimeout(r, 100));

    expect(steps).toEqual(["method"]);
  });
});
