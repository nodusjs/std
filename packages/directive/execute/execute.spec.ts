import { describe, expect, it } from "vitest";
import execute from "./execute";

describe("execute", () => {
  it("deve rodar o callback original antes do método registrado", () => {
    const log = [];

    class MyElement {
      connectedCallback() {
        log.push("original");
      }

      handler() {
        log.push("decorated");
      }
    }

    execute("handler").on(MyElement.prototype).after("connectedCallback");

    const element = new MyElement();
    element.connectedCallback();

    expect(log).toEqual(["original", "decorated"]);
  });

  it("não deve disparar erro se o callback original não existir", () => {
    const log = [];

    class MyElement {
      handler() {
        log.push("decorated");
      }
    }

    execute("handler").on(MyElement.prototype).after("disconnectedCallback");

    const element = new MyElement();

    expect(() => element.disconnectedCallback()).not.toThrow();
    expect(log).toEqual(["decorated"]);
  });
});
