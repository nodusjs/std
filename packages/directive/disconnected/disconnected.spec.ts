import { describe, it, expect } from "vitest";
import disconnected from "./disconnected";

describe("disconnected", () => {
	it("deve rodar o disconnectedCallback primeiro", () => {
		const log = [];

		class MyElement {
			disconnectedCallback() {
				log.push("original");
			}

			@disconnected
			onDisconnect() {
				log.push("decorated");
			}
		}

		const el = new MyElement();
		el.disconnectedCallback();

		expect(log).toEqual(["original", "decorated"]);
	});

	it("quando nao existir o disconnectedCallback nao pode disparar erro", () => {
		const log = [];

		class MyElement {
			@disconnected
			onDisconnect() {
				log.push("decorated");
			}
		}

		const el = new MyElement();

		expect(() => el.disconnectedCallback()).not.toThrow();
		expect(log).toEqual(["decorated"]);
	});
});
