import {
  didPaintCallback,
  isPainted,
  willPaintCallback,
} from "@dom/interfaces";
import { beforeEach, describe, expect, it, vi } from "vitest";
import render from "./render";

describe("render", () => {
  let element;
  let target;

  beforeEach(() => {
    element = {
      shadowRoot: {},
      [willPaintCallback]: vi.fn(),
      [didPaintCallback]: vi.fn(),
    };

    target = {
      prototype: {},
    };
  });

  it("deve aplicar o adoptedStyleSheets com os valores de styles", async () => {
    const sheet = {};
    const style = vi.fn(() => sheet);

    element.shadowRoot.adoptedStyleSheets = [];

    render(() => "<div></div>")
      .with([style])
      .on(target)
      .whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(style).toHaveBeenCalledWith(element);
    expect(element.shadowRoot.adoptedStyleSheets).toEqual([sheet]);
  });

  it("deve aplicar todos os styles concatenados", async () => {
    const sheet1 = {};
    const sheet2 = {};
    const s1 = vi.fn(() => sheet1);
    const s2 = vi.fn(() => sheet2);
    element.shadowRoot.adoptedStyleSheets = [];

    render(() => "<div></div>")
      .with([s1, s2])
      .on(target)
      .whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(element.shadowRoot.adoptedStyleSheets).toEqual([sheet1, sheet2]);
  });

  it("deve aplicar o resultado de component no innerHTML", async () => {
    const html = "<p>Hello</p>";
    element.shadowRoot.innerHTML = "";
    const component = vi.fn(() => html);

    render(component).with([]).on(target).whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(element.shadowRoot.innerHTML).toBe(html);
  });

  it("deve executar tudo após o connectedCallback original", async () => {
    const steps = [];
    target.prototype.connectedCallback = () => steps.push("original");
    const component = () => {
      steps.push("render");
      return "<div></div>";
    };

    render(component).with([]).on(target).whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(steps).toEqual(["original", "render"]);
  });

  it("deve executar willPaintCallback antes do render", async () => {
    const steps = [];
    element[willPaintCallback] = vi.fn(() => steps.push("will"));
    const component = () => {
      steps.push("render");
      return "ok";
    };

    render(component).with([]).on(target).whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(steps).toEqual(["will", "render"]);
  });

  it("deve executar didPaintCallback após o render", async () => {
    const steps = [];
    element[didPaintCallback] = vi.fn(() => steps.push("did"));
    const component = () => {
      steps.push("render");
      return "ok";
    };

    render(component).with([]).on(target).whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(steps).toEqual(["render", "did"]);
  });

  it("deve definir isPainted como true", async () => {
    const component = () => "done";

    render(component).with([]).on(target).whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(element[isPainted]).toBe(true);
  });

  it("deve usar document.adoptedStyleSheets quando shadowRoot não existir", async () => {
    const globalAdopt = vi.fn();
    const sheet = {};
    const style = vi.fn(() => sheet);
    Object.defineProperty(document, "adoptedStyleSheets", {
      configurable: true,
      set: globalAdopt,
    });

    delete element.shadowRoot;

    render(() => "<div></div>")
      .with([style])
      .on(target)
      .whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(globalAdopt).toHaveBeenCalledWith([sheet]);
  });

  it("deve usar this.innerHTML quando shadowRoot não existir", async () => {
    const html = "<x-rendered />";
    const component = vi.fn(() => html);
    delete element.shadowRoot;

    render(component).with([]).on(target).whenConnected();

    await target.prototype.connectedCallback.call(element);
    expect(element.innerHTML).toBe(html);
  });
});
