import { describe, it, expect, vi, beforeEach } from "vitest";
import listen from "./listen";

describe("listen", () => {
	let element;
	let shadowRoot;

	beforeEach(() => {
		shadowRoot = {
			addEventListener: vi.fn(),
		};

		element = {
			shadowRoot,
		};
	});

	it("deve adicionar o event listener no connectedCallback", () => {
		const prototype = {};

		listen("click").on("button").with().in(prototype).call("handleClick");

		expect(prototype.connectedCallback).toBeInstanceOf(Function);

		prototype.connectedCallback.call(element);

		expect(shadowRoot.addEventListener).toHaveBeenCalledWith(
			"click",
			expect.any(Function),
			expect.objectContaining({ signal: expect.any(Object) }),
		);
	});

	it("deve chamar o método decorado se o seletor combinar", () => {
		const spy = vi.fn();
		const prototype = { handleClick: spy };

		listen("click").on("button").with().in(prototype).call("handleClick");

		element.handleClick = spy;
		prototype.connectedCallback.call(element);

		const evt = { target: { matches: () => true } };
		const handler = shadowRoot.addEventListener.mock.calls[0][1];

		handler(evt);

		expect(spy).toHaveBeenCalledWith(evt);
	});

	it("não deve chamar o método se o seletor não combinar", () => {
		const spy = vi.fn();
		const prototype = { handleClick: spy };

		listen("click").on("button").with().in(prototype).call("handleClick");

		element.handleClick = spy;
		prototype.connectedCallback.call(element);

		const evt = { target: { matches: () => false } };
		const handler = shadowRoot.addEventListener.mock.calls[0][1];

		handler(evt);

		expect(spy).not.toHaveBeenCalled();
	});

	it("deve aplicar os filtros antes de chamar o método", () => {
		const spy = vi.fn();
		const filter1 = vi.fn((e) => ({ ...e, step: 1 }));
		const filter2 = vi.fn((e) => ({ ...e, step: e.step + 1 }));

		const prototype = { handleClick: spy };

		listen("click")
			.on("button")
			.with(filter1, filter2)
			.in(prototype)
			.call("handleClick");

		element.handleClick = spy;
		prototype.connectedCallback.call(element);

		const evt = { target: { matches: () => true } };
		const handler = shadowRoot.addEventListener.mock.calls[0][1];

		handler(evt);

		expect(spy).toHaveBeenCalledWith({
			target: expect.any(Object),
			step: 2,
		});
	});

	it("deve compor com connectedCallback existente", () => {
		const log = [];
		const prototype = {
			connectedCallback() {
				log.push("original");
			},
		};

		listen("click").on("button").with().in(prototype).call("handleClick");

		prototype.connectedCallback.call(element);

		expect(log).toEqual(["original"]);
	});

	it("deve compor com disconnectedCallback existente", () => {
		const log = [];
		const prototype = {
			disconnectedCallback() {
				log.push("disconnected");
			},
		};

		listen("click").on("button").with().in(prototype).call("handleClick");

		prototype.disconnectedCallback.call(element);

		expect(log).toEqual(["disconnected"]);
	});
});
