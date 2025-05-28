import {
  didPaintCallback,
  isPainted,
  paintCallback,
  willPaintCallback,
} from "@dom/interfaces";
import { describe, expect, it, vi } from "vitest";
import repaint from "./repaint";

describe("repaint", () => {
  it("deve funcionar corretamente em um setter", async () => {
    const log = [];

    class MyElement {
      [isPainted] = true;

      [willPaintCallback]() {
        log.push("will");
      }

      [paintCallback](resolve) {
        log.push("paint");
        resolve();
      }

      [didPaintCallback]() {
        log.push("did");
      }

      @repaint
      set value(_) {
        log.push("set");
      }
    }

    const el = new MyElement();
    el.value = 42;

    await new Promise((r) => setTimeout(r, 100));

    expect(log).toEqual(["set", "will", "paint", "did"]);
  });

  it("deve funcionar corretamente em um método", async () => {
    const log = [];

    class MyElement {
      [isPainted] = true;

      [willPaintCallback]() {
        log.push("will");
      }

      [paintCallback](resolve) {
        log.push("paint");
        resolve();
      }

      [didPaintCallback]() {
        log.push("did");
      }

      @repaint
      trigger() {
        log.push("method");
      }
    }

    const el = new MyElement();
    el.trigger();

    await new Promise((r) => setTimeout(r, 10));
    expect(log).toEqual(["method", "will", "paint", "did"]);
  });

  it("não deve disparar os callbacks de render se isPainted = false", async () => {
    const log = [];

    class MyElement {
      [isPainted] = false;

      [willPaintCallback]() {
        log.push("will");
      }

      [paintCallback](resolve) {
        log.push("paint");
        resolve();
      }

      [didPaintCallback]() {
        log.push("did");
      }

      @repaint
      trigger() {
        log.push("method");
      }
    }

    const el = new MyElement();
    el.trigger();

    await new Promise((r) => setTimeout(r, 100));

    expect(log).toEqual(["method"]);
  });
});
