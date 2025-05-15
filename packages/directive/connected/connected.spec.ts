import { describe, it, expect, vi } from "vitest";
import connected from "./connected";

describe("connected", () => {
	it("deve executar o connectedCallback primeiro", () => {
		const log = [];

		class MyElement {
			connectedCallback() {
				log.push("original");
			}

			@connected
			afterConnect() {
				log.push("decorated");
			}
		}

		const el = new MyElement();
		el.connectedCallback();

		expect(log).toEqual(["original", "decorated"]);
	});

	it("quando nao existir o connectedCallback nao pode disparar erro", () => {
		const log = [];

		class MyElement {
			@connected
			afterConnect() {
				log.push("decorated");
			}
		}

		const el = new MyElement();
		expect(() => el.connectedCallback()).not.toThrow();
		expect(log).toEqual(["decorated"]);
	});
});
