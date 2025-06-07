import { describe, expect, it, vi } from "vitest";
import execute from "./execute";

describe("execute", () => {
  it("deve registrar o atributo como observado", () => {
    class Dummy {
      static observedAttributes = [];
    }

    execute("visible")
      .with([])
      .from(Dummy.prototype)
      .whenAttributeChanges("visible");

    expect(Dummy.observedAttributes).toContain("visible");
  });

  it("deve preservar outros atributos observados existentes", () => {
    class Dummy {
      static observedAttributes = ["other"];
    }

    execute("visible")
      .with([])
      .from(Dummy.prototype)
      .whenAttributeChanges("visible");

    expect(Dummy.observedAttributes).toEqual(["other", "visible"]);
  });

  it("deve executar o setter quando o atributo correto for alterado", () => {
    const setSpy = vi.fn();

    class Dummy {
      set visible(value) {
        setSpy(value);
      }
    }

    const context = new Dummy();

    execute("visible")
      .with([(v) => v === "true"])
      .from(Dummy.prototype)
      .whenAttributeChanges("visible");

    context.attributeChangedCallback("visible", "false", "true");

    expect(setSpy).toHaveBeenCalledWith(true);
  });

  it("não deve executar o setter se o atributo não corresponder", () => {
    const setSpy = vi.fn();

    class Dummy {
      set visible(value) {
        setSpy(value);
      }
    }

    const context = new Dummy();

    execute("visible")
      .with([(v) => v === "true"])
      .from(Dummy.prototype)
      .whenAttributeChanges("visible");

    context.attributeChangedCallback("hidden", "false", "true");

    expect(setSpy).not.toHaveBeenCalled();
  });

  it.skip("não deve executar o setter se os valores forem iguais", () => {
    const setSpy = vi.fn();

    class Dummy {
      set visible(value) {
        setSpy(value);
      }
    }

    const context = new Dummy();

    execute("visible")
      .with([(v) => v === "true"])
      .from(Dummy.prototype)
      .whenAttributeChanges("visible");

    context.attributeChangedCallback("visible", "true", "true");

    expect(setSpy).not.toHaveBeenCalled();
  });
});
