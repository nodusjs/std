import { describe, it, expect, vi, beforeEach } from "vitest";
import Echo from "./echo";

/**
 * Elemento base simulado, com suporte mínimo a atributos e dispatch.
 */
class FakeElement extends EventTarget {
	#attributes = {
		id: "x",
		name: "fake",
	};

	get localName() {
		return "fake-element";
	}

	attributeChangedCallback() {}

	connectedCallback() {}

	disconnectedCallback() {}

	getAttribute(name) {
		return this.#attributes[name];
	}
}

describe("Echo", () => {
	let instance;
	let methodSpy;
	let setAttributeSpy;
	let setterSpy;

	beforeEach(() => {
		class Host extends Echo(FakeElement) {
			set setter(_) {}
			setAttribute() {}
			method() {}
		}

		instance = new Host();

		methodSpy = vi.spyOn(instance, "method");
		setAttributeSpy = vi.spyOn(instance, "setAttribute");
		setterSpy = vi.spyOn(Host.prototype, "setter", "set");
	});

	it("deve adicionar o atributo 'on' aos observedAttributes", () => {
		expect(instance.constructor.observedAttributes).toContain("on");
	});

	it("deve ativar e desativar arco ao mudar atributo 'on'", () => {
		instance.attributeChangedCallback("on", "", "#x/click:method/sink");
		instance.attributeChangedCallback("on", "", "");
		instance.dispatchEvent(new CustomEvent("click"));
		expect(methodSpy).not.toHaveBeenCalled();
	});

	it("deve reagir ao source igual a id", () => {
		instance.attributeChangedCallback("on", "", "#x/ping:method/method");
		instance.dispatchEvent(new CustomEvent("ping", { detail: 42 }));
		expect(methodSpy).toHaveBeenCalledWith(42);
	});

	it("deve reagir ao source igual a name", () => {
		instance.attributeChangedCallback("on", "", "fake/ping:method/method");
		instance.dispatchEvent(new CustomEvent("ping", { detail: "hi" }));
		expect(methodSpy).toHaveBeenCalledWith("hi");
	});

	it("deve reagir ao source igual à tag", () => {
		instance.attributeChangedCallback(
			"on",
			"",
			"fake-element/ping:method/method",
		);
		instance.dispatchEvent(new CustomEvent("ping", { detail: 123 }));
		expect(methodSpy).toHaveBeenCalledWith(123);
	});

	it("deve reagir ao wildcard * como source", () => {
		instance.attributeChangedCallback("on", "", "*/ping:method/method");
		instance.dispatchEvent(new CustomEvent("ping", { detail: "any" }));
		expect(methodSpy).toHaveBeenCalledWith("any");
	});

	it("deve ignorar evento de origem diferente", () => {
		instance.attributeChangedCallback("on", "", "#b/ping:method/method");
		instance.dispatchEvent(new CustomEvent("ping", { detail: 42 }));
		expect(methodSpy).not.toHaveBeenCalled();
	});

	it("deve executar tipo attribute", () => {
		instance.attributeChangedCallback("on", "", "*/fire:attribute/attribute");
		instance.dispatchEvent(new CustomEvent("fire", { detail: "blue" }));
		expect(setAttributeSpy).toHaveBeenCalledWith("attribute", "blue");
	});

	it("deve executar tipo setter", () => {
		instance.attributeChangedCallback("on", "", "*/set:setter/setter");
		instance.dispatchEvent(new CustomEvent("set", { detail: "SET" }));
		expect(setterSpy).toHaveBeenCalledWith("SET");
	});

	it.skip("deve aplicar filtros (sparks) na ordem", () => {
		instance.attributeChangedCallback(
			"on",
			"",
			"*/cast:method/method|add=1|add=2",
		);
		instance.dispatchEvent(new CustomEvent("cast", { detail: "x" }));
		expect(methodSpy).toHaveBeenCalledWith("x12");
	});

	it("deve encerrar listeners no disconnectedCallback", () => {
		instance.attributeChangedCallback("on", "", "*/event:method/method");
		instance.disconnectedCallback();
		instance.dispatchEvent(new CustomEvent("event", { detail: "bye" }));
		expect(methodSpy).not.toHaveBeenCalled();
	});
});
