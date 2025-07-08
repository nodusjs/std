/**
 * Decorator que executa um método ao remover o Custom Element do DOM.
 *
 * @param {Object} target - Protótipo do Custom Element decorado.
 * @param {string|Symbol} method - Nome do método a ser executado.
 * @returns {void}
 *
 * @description
 * O decorator `disconnected` registra um método específico para ser executado
 * automaticamente sempre que o Custom Element for desconectado do DOM,
 * utilizando a API `disconnectedCallback` com Proxy para manter o fluxo original.
 *
 * @example
 * import { disconnected } from '@nodusjs/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   @disconnected
 *   cleanup() {
 *     console.log('Elemento removido do DOM.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function disconnected(
  target: object,
  method: string | symbol,
): void;
