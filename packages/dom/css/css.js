/**
 * Template tag `css` que gera uma instância de `CSSStyleSheet` a partir de um template literal.
 *
 * @param {TemplateStringsArray} strings - Fragmentos de strings literais do template CSS.
 * @param {...any} values - Valores interpolados no template.
 * @returns {CSSStyleSheet} Uma instância de folha de estilo pronta para ser aplicada.
 *
 * @description
 * Ideal para uso em Web Components com `adoptedStyleSheets`, fornecendo uma API declarativa
 * para definir estilos encapsulados.
 *
 * @example
 * const primary = "blue";
 * const styleSheet = css`
 *   :host {
 *     color: ${primary};
 *     display: block;
 *   }
 * `;
 *
 * shadowRoot.adoptedStyleSheets = [styleSheet];
 */
const css = (strings, ...values) => {
  const styleSheet = new CSSStyleSheet();
  const text = String.raw({ raw: strings }, ...values);
  styleSheet.replaceSync(text);
  return styleSheet;
};

export default css;
