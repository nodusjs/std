import { vi, describe, it, expect, beforeEach } from "vitest";
import define from "./define";

describe("define", () => {
	beforeEach(() => {
		customElements.get = vi.fn();
		customElements.define = vi.fn();
	});

	it("deve chamar customElements.get para validar se o elemento já foi definido", () => {
		@define("my-element")
		class MyElement extends HTMLElement {}

		expect(customElements.get).toHaveBeenCalledWith("my-element");
	});

	it("não deve chamar customElements.define caso o elemento já esteja definido", () => {
		customElements.get.mockReturnValue(class {});

		@define("existing-element")
		class ExistingElement extends HTMLElement {}

		expect(customElements.define).not.toHaveBeenCalled();
	});

	it("deve chamar customElements.define com os parâmetros corretos quando o elemento não existir", () => {
		customElements.get.mockReturnValue(undefined);

		@define("new-element", { extends: "div" })
		class NewElement extends HTMLElement {}

		expect(customElements.define).toHaveBeenCalledWith(
			"new-element",
			NewElement,
			{ extends: "div" },
		);
	});
});
