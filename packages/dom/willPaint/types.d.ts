/**
 * Decorator que executa um método antes da renderização do componente no ciclo de vida do DOM.
 *
 * @param {Object} target - O protótipo do Custom Element decorado.
 * @param {string|symbol} method - Nome do método a ser executado antes do render.
 * @returns {void}
 *
 * @description
 * O decorator `willPaint` registra um método para ser executado imediatamente antes
 * da renderização do conteúdo do componente, dentro do `connectedCallback`, e antes
 * da aplicação de estilos e da atualização de `innerHTML`.
 *
 * Esse decorator é útil para preparar o estado do componente antes que ele seja pintado.
 * Ele é acionado antes da `requestAnimationFrame`, garantindo que qualquer lógica de pré-renderização
 * ocorra com antecedência.
 *
 * @example
 * import { willPaint } from '@nodusjs/std/dom';
 *
 * class MyElement extends HTMLElement {
 *   @willPaint
 *   prepare() {
 *     this.setAttribute('data-loading', 'true');
 *   }
 * }
 */
export declare function willPaint(
  target: object,
  method: string | symbol,
): void;
