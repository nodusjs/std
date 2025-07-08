/**
 * Decorator que renderiza um componente com estilos ao ser conectado ao DOM.
 *
 * @param {Function} component - Função responsável por retornar o HTML do componente. Recebe `this` como argumento.
 * @param {...Function} styles - Funções que retornam `CSSStyleSheet`. Cada uma recebe `this` como argumento.
 * @returns {void}
 *
 * @description
 * O decorator `paint` permite executar a renderização de um componente customizado
 * no momento em que ele é conectado ao DOM, aplicando também estilos encapsulados
 * via `adoptedStyleSheets` no `shadowRoot` ou diretamente no próprio elemento.
 *
 * Ele suporta a execução dos callbacks `willPaintCallback`, `paintCallback` e `didPaintCallback`
 * para permitir controle sobre o ciclo de renderização.
 *
 * @example
 * import { paint } from '@nodusjs/std/dom';
 *
 * const component = (el) => `<p>Hello, ${el.name}</p>`;
 * const style = (el) => new CSSStyleSheet();
 *
 * @paint(component, style)
 * class MyElement extends HTMLElement {
 *   name = 'world';
 * }
 */
export declare function paint(
  component: (context: any) => string,
  ...styles: ((context: any) => CSSStyleSheet)[]
): (target: any) => void;
