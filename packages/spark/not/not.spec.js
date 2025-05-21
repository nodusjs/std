import { describe, it, expect } from "vitest";
import { not } from "./not";

describe("not", () => {
	it("deve inverter o valor booleano", () => {
		expect(not(true)).toBe(false);
		expect(not(false)).toBe(true);
	});
});
