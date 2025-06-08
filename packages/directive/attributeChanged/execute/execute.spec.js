import { describe, expect, it, vi } from "vitest";
import execute from "./execute";

describe("execute", () => {
  it("deve registrar o atributo como observado", () => {
    class MyElement {
      static observedAttributes = [];
    }

    execute("visible")
      .with([])
      .from(MyElement.prototype)
      .whenAttributeChanges("visible");

    expect(MyElement.observedAttributes).toContain("visible");
  });

  it("deve preservar outros atributos observados existentes", () => {
    class MyElement {
      static observedAttributes = ["other"];
    }

    execute("visible")
      .with([])
      .from(MyElement.prototype)
      .whenAttributeChanges("visible");

    expect(MyElement.observedAttributes).toEqual(["other", "visible"]);
  });

  it("deve executar o setter quando o atributo correto for alterado", () => {
    const setSpy = vi.fn();

    class MyElement {
      set visible(value) {
        setSpy(value);
      }
    }

    const element = new MyElement();

    execute("visible")
      .with([(v) => v === "true"])
      .from(MyElement.prototype)
      .whenAttributeChanges("visible");

    element.attributeChangedCallback("visible", "false", "true");

    expect(setSpy).toHaveBeenCalledWith(true);
  });

  it("não deve executar o setter se o atributo não corresponder", () => {
    const setSpy = vi.fn();

    class MyElement {
      set visible(value) {
        setSpy(value);
      }
    }

    const element = new MyElement();

    execute("visible")
      .with([(v) => v === "true"])
      .from(MyElement.prototype)
      .whenAttributeChanges("visible");

    element.attributeChangedCallback("hidden", "false", "true");

    expect(setSpy).not.toHaveBeenCalled();
  });

  it.skip("não deve executar o setter se os valores forem iguais", () => {
    const setSpy = vi.fn();

    class MyElement {
      set visible(value) {
        setSpy(value);
      }
    }

    const element = new MyElement();

    execute("visible")
      .with([(v) => v === "true"])
      .from(MyElement.prototype)
      .whenAttributeChanges("visible");

    element.attributeChangedCallback("visible", "true", "true");

    expect(setSpy).not.toHaveBeenCalled();
  });
});
