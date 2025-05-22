import { describe, it, expect } from "vitest";
import { truthy } from "./truthy";

describe("trythy", () => {
	it("deve retornar false para 'no'", () => {
		expect(truthy("no")).toBe(false);
	});

	it("deve retornar false para 'false'", () => {
		expect(truthy("false")).toBe(false);
	});

	it("deve retornar false para '0'", () => {
		expect(truthy("0")).toBe(false);
	});

	it("deve retornar false para 'null'", () => {
		expect(truthy(null)).toBe(false);
	});

	it("deve retornar false para 'no'", () => {
		expect(truthy("no")).toBe(false);
	});

	it("deve retornar true para 'true'", () => {
		expect(truthy("true")).toBe(true);
	});

	it("deve retornar true para string vazia", () => {
		expect(truthy("")).toBe(true);
	});

	it("deve retornar true para qualquer outro valor", () => {
		expect(truthy("yes")).toBe(true);
		expect(truthy("1")).toBe(true);
		expect(truthy("x")).toBe(true);
	});
});
