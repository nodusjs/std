import { beforeEach, describe, expect, it, vi } from "vitest";
import css from "./css";

describe("css", () => {
  it("deve retornar uma instância de CSSStyleSheet", () => {
    const result = css``;
    expect(result).toBeInstanceOf(CSSStyleSheet);
  });

  it("deve aplicar regras CSS corretamente", () => {
    const color = "red";
    const sheet = css`
      :host {
        color: ${color};
      }
    `;
    const rules = sheet.cssRules.map((r) => r.cssText);

    expect(rules[0]).toContain("color: red");
  });

  it("deve interpolar múltiplos valores no template", () => {
    const prop = "font-size";
    const size = "16px";
    const sheet = css`
      :host {
        ${prop}: ${size};
      }
    `;
    const rule = sheet.cssRules[0].cssText;

    expect(rule).toContain("font-size: 16px");
  });
});
