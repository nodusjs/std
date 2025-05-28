/**
 * Registra um listener para eventos delegados no Shadow DOM de um Custom Element.
 *
 * @param {string} type - Tipo do evento a ser escutado (ex: 'click', 'input').
 * @returns {{ on: (selector: string) => { with: (...filters: Function[]) => { in: (target: Object) => { call: (method: string|symbol) => void } } } }}
 *
 * @description
 * A função `listen` permite registrar ouvintes de eventos delegados no `shadowRoot`
 * de um Custom Element, de forma fluente e segura. É ideal para escutar eventos em
 * elementos internos sem necessidade de binds manuais ou remoções explícitas.
 *
 * Internamente, a função conecta-se ao `connectedCallback` para registrar o listener,
 * e ao `disconnectedCallback` para removê-lo automaticamente, utilizando `AbortController`.
 *
 * O evento pode ser filtrado por um seletor CSS (`on`) e transformado por uma cadeia de filtros (`with`).
 * O método (`call`) será invocado com o resultado final do filtro aplicado ao evento original.
 *
 * @example
 * listen('click')
 *   .on('button')
 *   .with(e => e) // filtros opcionais
 *   .in(MyElement.prototype)
 *   .call('handleClick');
 */
const listen = (type) => ({
  /**
   * Define o seletor CSS do elemento alvo dentro do Shadow DOM.
   *
   * @param {string} selector - Seletor do elemento a ser escutado.
   * @returns {{ with: (...filters: Function[]) => { in: (target: Object) => { call: (method: string|symbol) => void } } }}
   */
  on: (selector) => ({
    /**
     * Define os filtros a serem aplicados ao evento capturado.
     *
     * @param {...Function} filters - Funções que recebem o evento e retornam uma transformação.
     * @returns {{ in: (target: Object) => { call: (method: string|symbol) => void } }}
     */
    with: (...filters) => ({
      /**
       * Define o protótipo do Custom Element onde os callbacks serão interceptados.
       *
       * @param {Object} target - O alvo que terá o connected/disconnected interceptado.
       * @returns {{ call: (method: string|symbol) => void }}
       */
      in: (target) => ({
        /**
         * Define o método a ser chamado com o resultado dos filtros aplicados ao evento.
         *
         * @param {string|symbol} method - Nome do método que será chamado.
         * @returns {void}
         */
        call: (method) => {
          const controller = new AbortController();
          const options = { signal: controller.signal };

          target.connectedCallback = new Proxy(
            target.connectedCallback ?? (() => {}),
            {
              apply(original, context, args) {
                const listener = (event) => {
                  if (event.target.matches(selector)) {
                    context[method](
                      filters.reduce((target, filter) => filter(target), event),
                    );
                  }
                };

                context.shadowRoot?.addEventListener(type, listener, options);

                return original.apply(context, args);
              },
            },
          );

          target.disconnectedCallback = new Proxy(
            target.disconnectedCallback ?? (() => {}),
            {
              apply(original, context, args) {
                controller.abort();
                return original.apply(context, args);
              },
            },
          );
        },
      }),
    }),
  }),
});

export default listen;
