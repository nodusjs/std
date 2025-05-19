import { describe, it, expect, vi } from "vitest";

vi.mock("@dom/render", () => {
	return {
		default: vi.fn(() => ({
			with: vi.fn(() => ({
				from: vi.fn(() => ({
					whenConnected: vi.fn(),
				})),
			})),
		})),
	};
});

import render from "@dom/render";
import paint from "./paint";

describe("paint", () => {
	it("deve encadear corretamente render -> with -> from -> whenConnected", () => {
		const whenConnected = vi.fn();
		const on = vi.fn(() => ({ whenConnected }));
		const withStyles = vi.fn(() => ({ on }));
		const renderFn = vi.fn(() => ({ with: withStyles }));

		render.mockImplementation(renderFn);

		const component = vi.fn();
		const style = vi.fn();

		@paint(component, style)
		class MyElement {}

		expect(renderFn).toHaveBeenCalledWith(component);
		expect(withStyles).toHaveBeenCalledWith([style]);
		expect(on).toHaveBeenCalledWith(MyElement);
		expect(whenConnected).toHaveBeenCalled();
	});
});
