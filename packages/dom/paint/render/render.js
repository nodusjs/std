import {
  didPaintCallback,
  isPainted,
  paintCallback,
  willPaintCallback,
} from "@dom/interfaces";

/**
 * Registra a renderização de um componente com estilos quando o Custom Element é conectado ao DOM.
 *
 * @param {Function} component - Função que retorna o HTML do componente. Recebe `this` como argumento.
 * @returns {{ with: (styles: Function[]) => { on: (target: Object) => { whenConnected: () => void } } }}
 *
 * @description
 * O helper `render` permite executar de forma fluente a renderização de um componente,
 * aplicando estilos dinâmicos ao `shadowRoot` (ou ao elemento diretamente),
 * logo após a execução do `connectedCallback`.
 *
 * Ele suporta os callbacks `willPaintCallback`, `paintCallback` e `didPaintCallback`,
 * além de aplicar folhas de estilo usando `adoptedStyleSheets`.
 *
 * @example
 * render(component)
 *   .with([style])
 *   .on(MyElement.prototype)
 *   .whenConnected();
 */
const render = (component) => ({
  /**
   * Define os estilos a serem aplicados ao shadowRoot ou document.
   *
   * @param {Function[]} styles - Lista de funções que retornam CSSStyleSheet (recebem `this`).
   * @returns {{ on: (target: Object) => { whenConnected: () => void } }}
   */
  with: (styles) => ({
    /**
     * Define o protótipo alvo onde a lógica será aplicada.
     *
     * @param {Object} target - O prototype do Custom Element decorado.
     * @returns {{ whenConnected: () => void }}
     */
    on: (target) => ({
      /**
       * Finaliza a definição e intercepta o connectedCallback para aplicar a renderização e os estilos.
       *
       * @returns {void}
       */
      whenConnected: () => {
        target.prototype.connectedCallback = new Proxy(
          target.prototype.connectedCallback || (() => {}),
          {
            async apply(original, context, args) {
              await original.apply(context, args);

              context[paintCallback] = (resolve) => {
                requestAnimationFrame(async () => {
                  const styleSheets = styles.map((style) => style(context));
                  (context.shadowRoot ?? document).adoptedStyleSheets =
                    await Promise.all(styleSheets);
                  (context.shadowRoot ?? context).innerHTML =
                    await component(context);
                  context[isPainted] = true;
                  resolve();
                });
              };

              await context[willPaintCallback]?.();
              await new Promise(context[paintCallback]);
              await context[didPaintCallback]?.();
            },
          },
        );
      },
    }),
  }),
});

export default render;
