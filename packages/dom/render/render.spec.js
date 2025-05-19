import { describe, it, expect, vi, beforeEach } from "vitest";
import render from "./render";

describe("render", () => {
	let context;
	let target;

	beforeEach(() => {
		context = {
			shadowRoot: {},
			willPaintCallback: vi.fn(),
			didPaintCallback: vi.fn(),
		};
		target = {};
	});

	it("deve aplicar o adoptedStyleSheets com os valores de styles", async () => {
		const sheet = {};
		const style = vi.fn(() => sheet);
		context.shadowRoot.adoptedStyleSheets = [];

		render(() => "<div></div>")
			.with([style])
			.on(target)
			.whenConnected();

		await target.connectedCallback.call(context);
		expect(style).toHaveBeenCalledWith(context);
		expect(context.shadowRoot.adoptedStyleSheets).toEqual([sheet]);
	});

	it("deve aplicar todos os styles concatenados", async () => {
		const sheet1 = {};
		const sheet2 = {};
		const s1 = vi.fn(() => sheet1);
		const s2 = vi.fn(() => sheet2);
		context.shadowRoot.adoptedStyleSheets = [];

		render(() => "<div></div>")
			.with([s1, s2])
			.on(target)
			.whenConnected();

		await target.connectedCallback.call(context);
		expect(context.shadowRoot.adoptedStyleSheets).toEqual([sheet1, sheet2]);
	});

	it("deve aplicar o resultado de component no innerHTML", async () => {
		const html = "<p>Hello</p>";
		context.shadowRoot.innerHTML = "";
		const component = vi.fn(() => html);

		render(component).with([]).on(target).whenConnected();

		await target.connectedCallback.call(context);
		expect(context.shadowRoot.innerHTML).toBe(html);
	});

	it("deve executar tudo após o connectedCallback original", async () => {
		const steps = [];
		target.connectedCallback = () => steps.push("original");
		const component = () => {
			steps.push("render");
			return "<div></div>";
		};

		render(component).with([]).on(target).whenConnected();

		await target.connectedCallback.call(context);
		expect(steps).toEqual(["original", "render"]);
	});

	it("deve executar willPaintCallback antes do render", async () => {
		const order = [];
		context.willPaintCallback = vi.fn(() => order.push("will"));
		const component = () => {
			order.push("render");
			return "ok";
		};

		render(component).with([]).on(target).whenConnected();

		await target.connectedCallback.call(context);
		expect(order).toEqual(["will", "render"]);
	});

	it("deve executar didPaintCallback após o render", async () => {
		const order = [];
		context.didPaintCallback = vi.fn(() => order.push("did"));
		const component = () => {
			order.push("render");
			return "ok";
		};

		render(component).with([]).on(target).whenConnected();

		await target.connectedCallback.call(context);
		expect(order).toEqual(["render", "did"]);
	});

	it("deve definir isPainted como true", async () => {
		const component = () => "done";

		render(component).with([]).on(target).whenConnected();

		await target.connectedCallback.call(context);
		expect(context.isPainted).toBe(true);
	});

	it("deve usar document.adoptedStyleSheets quando shadowRoot não existir", async () => {
		const globalAdopt = vi.fn();
		const sheet = {};
		const style = vi.fn(() => sheet);
		Object.defineProperty(document, "adoptedStyleSheets", {
			configurable: true,
			set: globalAdopt,
		});

		delete context.shadowRoot;

		render(() => "<div></div>")
			.with([style])
			.on(target)
			.whenConnected();

		await target.connectedCallback.call(context);
		expect(globalAdopt).toHaveBeenCalledWith([sheet]);
	});

	it("deve usar this.innerHTML quando shadowRoot não existir", async () => {
		const html = "<x-rendered />";
		const component = vi.fn(() => html);
		delete context.shadowRoot;

		render(component).with([]).on(target).whenConnected();

		await target.connectedCallback.call(context);
		expect(context.innerHTML).toBe(html);
	});
});
