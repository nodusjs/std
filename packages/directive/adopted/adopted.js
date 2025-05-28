import execute from "@directive/execute";

/**
 * Decorator que executa um método ao mover o Custom Element para outro Document.
 *
 * @param {Object} target - Protótipo do Custom Element decorado.
 * @param {string|Symbol} method - Nome do método a ser executado.
 * @returns {void}
 *
 * @description
 * O decorator `adopted` registra um método específico para ser executado
 * automaticamente sempre que o Custom Element for movido de um documento para outro,
 * utilizando a API `adoptedCallback` com Proxy para manter o fluxo original.
 *
 * @example
 * import { adopted } from '@nodusjs/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   @adopted
 *   onAdopted() {
 *     console.log('Elemento movido para outro document.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
const adopted = (target, method) =>
  execute(method).on(target).after("adoptedCallback");

export default adopted;
