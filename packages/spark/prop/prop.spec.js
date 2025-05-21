import { describe, it, expect } from "vitest";
import { prop } from "./prop";

describe("prop", () => {
	it("deve acessar uma propriedade do objeto", () => {
		expect(prop([1, { a: 1 }, 3], "[1].a")).toBe(1);
	});

	it("deve retornar undefined para caminhos inválidos", () => {
		expect(prop({ a: 2 }, "a.b.c")).toBe(undefined);
	});
});
