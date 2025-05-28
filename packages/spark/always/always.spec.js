import { describe, it, expect } from "vitest";
import { always } from "./always.js";

describe("always", () => {
	it("deve retornar sempre o mesmo valor", () => {
		expect(always(null, 0)).toBe(0);
		expect(always(null, "nodus")).toBe("nodus");
	});
});
