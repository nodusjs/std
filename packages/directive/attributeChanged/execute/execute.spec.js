import { beforeEach, describe, expect, it, vi } from "vitest";
import execute from "./execute";

describe("execute", () => {
  let prototype;

  beforeEach(() => {
    prototype = {};
  });

  it("deve registrar o atributo como observado", () => {
    class Dummy {}
    prototype.constructor = Dummy;

    execute("visible").with([]).from(prototype).whenAttributeChanges("visible");

    expect(Dummy.observedAttributes).toContain("visible");
  });

  it("deve preservar outros atributos observados existentes", () => {
    class Dummy {}
    Dummy.observedAttributes = ["other"];
    prototype.constructor = Dummy;

    execute("visible").with([]).from(prototype).whenAttributeChanges("visible");

    expect(Dummy.observedAttributes).toEqual(["other", "visible"]);
  });

  it("deve executar o setter quando o atributo correto for alterado", () => {
    const setSpy = vi.fn();

    const context = {
      set visible(value) {
        setSpy(value);
      },
    };

    prototype.constructor = class {};

    execute("visible")
      .with([(v) => v === "true"])
      .from(prototype)
      .whenAttributeChanges("visible");

    prototype.attributeChangedCallback.call(
      context,
      "visible",
      "false",
      "true",
    );

    expect(setSpy).toHaveBeenCalledWith(true);
  });

  it("não deve executar o setter se o atributo não corresponder", () => {
    const setSpy = vi.fn();

    const context = {
      set visible(value) {
        setSpy(value);
      },
    };

    prototype.constructor = class {};

    execute("visible")
      .with([(v) => v === "true"])
      .from(prototype)
      .whenAttributeChanges("visible");

    prototype.attributeChangedCallback.call(context, "hidden", "false", "true");

    expect(setSpy).not.toHaveBeenCalled();
  });

  it.skip("não deve executar o setter se os valores forem iguais", () => {
    const setSpy = vi.fn();

    const context = {
      set visible(value) {
        setSpy(value);
      },
    };

    prototype.constructor = class {};

    execute("visible")
      .with([(v) => v === "true"])
      .from(prototype)
      .whenAttributeChanges("visible");

    prototype.attributeChangedCallback.call(context, "visible", "true", "true");

    expect(setSpy).not.toHaveBeenCalled();
  });
});
