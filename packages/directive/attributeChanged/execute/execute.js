/**
 * Registra a execução de um setter ou método sempre que um atributo observado for alterado.
 *
 * @param {string|symbol} property - Nome do setter ou método a ser executado.
 * @returns {{ with: (filters: Function[]) => { from: (target: Object) => { whenAttributeChanges: (attribute: string) => void } } }}
 *
 * @description
 * A função `execute` permite registrar de forma fluente a execução de um setter ou método
 * sempre que um atributo observado for alterado, utilizando a API `attributeChangedCallback`.
 * O valor novo pode ser transformado por uma sequência de filtros definidos previamente.
 *
 * @example
 * execute('visible')
 *   .with([value => value === 'true'])
 *   .from(MyElement.prototype)
 *   .whenAttributeChanges('visible');
 */
const execute = (property) => ({
  /**
   * Define os filtros que serão aplicados ao novo valor do atributo.
   *
   * @param {Function[]} filters - Lista de funções de transformação para o novo valor.
   * @returns {{ from: (target: Object) => { whenAttributeChanges: (attribute: string) => void } }}
   */
  with: (filters) => ({
    /**
     * Define o alvo (geralmente o prototype do Custom Element) onde a lógica será aplicada.
     *
     * @param {Object} target - Protótipo da classe onde o atributo será observado.
     * @returns {{ whenAttributeChanges: (attribute: string) => void }}
     */
    from: (target) => ({
      /**
       * Finaliza o encadeamento: registra o atributo como observado e aplica o setter ao ser alterado.
       *
       * @param {string} attribute - Nome do atributo a ser monitorado.
       * @returns {void}
       */
      whenAttributeChanges: (attribute) => {
        target.constructor.observedAttributes = [
          ...new Set([
            ...(target.constructor.observedAttributes || []),
            attribute,
          ]),
        ];

        target.attributeChangedCallback = new Proxy(
          target.attributeChangedCallback || (() => {}),
          {
            apply(original, context, [name, oldValue, newValue]) {
              original.apply(context, [name, oldValue, newValue]);
              if (name === attribute) {
                context[property] = filters.reduce((v, fn) => fn(v), newValue);
              }
            },
          },
        );
      },
    }),
  }),
});

export default execute;
