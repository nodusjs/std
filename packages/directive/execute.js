/**
 * Registra a execução de um método após um evento do ciclo de vida de um Custom Element.
 *
 * @param {string|Symbol} method - Nome do método a ser executado.
 * @returns {{ on: (target: Object) => { after: (event: string) => void } }}
 *
 * @description
 * A função `execute` permite registrar de forma fluente a execução de um método de instância
 * logo após a invocação de um evento de ciclo de vida padrão do Web Component,
 * como `connectedCallback`, `disconnectedCallback` ou `adoptedCallback`.
 *
 * Internamente, a função substitui o callback nativo com um Proxy que mantém o comportamento
 * original e executa o método decorado após a conclusão do callback.
 *
 * @example
 * import execute from './execute';
 *
 * execute('onConnect').on(MyElement.prototype).after('connectedCallback');
 *
 * // Equivalente a:
 * // MyElement.prototype.connectedCallback = new Proxy(...);
 */
const execute = (method) => ({
	/**
	 * Define o alvo (normalmente o prototype do Custom Element).
	 *
	 * @param {Object} target - O protótipo onde o método de ciclo de vida será interceptado.
	 * @returns {{ after: (event: string) => void }}
	 */
	on: (target) => ({
		/**
		 * Registra o método para execução após o evento especificado.
		 *
		 * @param {string} event - Nome do evento de ciclo de vida (ex: 'connectedCallback').
		 * @returns {void}
		 */
		after: (event) => {
			target[event] = new Proxy(target[event] || (() => {}), {
				apply(original, context, args) {
					original.apply(context, args);
					context[method]();
				},
			});
		},
	}),
});

export default execute;
