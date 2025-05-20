import listen from "./listen";

/**
 * Decorator que adiciona um event listener a um elemento dentro do Shadow DOM.
 *
 * @param {string} type - Tipo do evento (ex: 'click').
 * @param {string} selector - Seletor CSS para identificar o alvo do evento.
 * @param {...Function} filters - Funções aplicadas ao evento antes da execução do método.
 * @returns {Function} Um decorator que associa o método ao evento.
 *
 * @description
 * O decorator `event` permite ouvir eventos DOM disparados em elementos
 * do Shadow DOM do Custom Element. Ele permite aplicar filtros no evento
 * antes de chamar o método decorado, e realiza o gerenciamento automático
 * com `AbortController` para remoção do listener no `disconnectedCallback`.
 *
 * @example
 * class MyElement extends HTMLElement {
 *   @event.click('button')
 *   handleClick(event) {
 *     console.log('Botão clicado', event);
 *   }
 * }
 */
const event = new Proxy(
	{},
	{
		get(_, type) {
			return (selector, ...filters) =>
				(target, method) => {
					listen(type)
						.on(selector)
						.with(...filters)
						.in(target)
						.call(method);
				};
		},
	},
);

export default event;
