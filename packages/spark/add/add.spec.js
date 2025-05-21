import { describe, it, expect } from "vitest";
import { add } from "./add";

describe("add", () => {
	it("deve somar dois números", () => {
		expect(add(1, 2)).toBe(3);
	});
});
