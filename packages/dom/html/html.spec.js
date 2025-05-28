import { describe, expect, it } from "vitest";
import html from "./html";

describe("html", () => {
  it("deve interpolar valores simples em uma string HTML", () => {
    const name = "Clebão";
    const result = html`<h1>Olá, ${name}!</h1>`;
    expect(result).toBe("<h1>Olá, Clebão!</h1>");
  });

  it("deve interpolar arrays de valores", () => {
    const items = ["<li>Item 1</li>", "<li>Item 2</li>"];
    const result = html`<ul>${items}</ul>`;
    expect(result).toBe("<ul><li>Item 1</li><li>Item 2</li></ul>");
  });

  it("deve funcionar com strings multilinha", () => {
    const result = html`
      <div>
        <p>Parágrafo</p>
      </div>
    `;
    expect(result).toMatch(/<div>\s*<p>Parágrafo<\/p>\s*<\/div>/);
  });
});
