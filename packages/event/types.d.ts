/**
 * @module @nodusjs/std/event
 *
 * @description
 * Declaração de tipo para o decorator dinâmico '@event'. Este módulo
 * permite a escuta declarativa de eventos do DOM dentro do Shadow DOM.
 */
declare module "@nodusjs/std/event" {
  /**
   * Define a assinatura de um decorator de evento.
   *
   * @param selector - Um seletor CSS para o elemento alvo dentro do Shadow DOM.
   * @param filters - (Opcional) Funções que transformam o objeto de evento.
   * @returns Um decorator de método.
   */
  type EventDecorator = (
    selector: string,
    ...filters: ((event: Event) => any)[]
  ) => (target: object, propertyKey: string | symbol) => void;

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
  const event: {
    [K in keyof GlobalEventHandlersEventMap]: EventDecorator;
  } & {
    [key: string]: EventDecorator;
  };

  export default event;
}
