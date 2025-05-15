/**
 * Decorator que executa um método ao inserir o Custom Element no DOM.
 *
 * @param {Object} target - Protótipo do Custom Element decorado.
 * @param {string|Symbol} method - Nome do método a ser executado.
 * @returns {void}
 *
 * @description
 * O decorator `connected` registra um método específico para ser executado
 * automaticamente sempre que o Custom Element for conectado ao DOM.
 * Internamente, o registro é realizado utilizando um interceptor para garantir
 * a execução organizada e previsível do método decorado.
 *
 * @example
 * import { connected } from '@nodusjs/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   @connected
 *   initializeComponent() {
 *     console.log('Componente conectado ao DOM.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
const connected = (target, method) => {
	target.connectedCallback = new Proxy(target.connectedCallback ?? (() => {}), {
		apply(target, context, args) {
			target.apply(context, args);
			context[method]();
		},
	});
};

export default connected;
