import execute from "@directive/execute";

/**
 * Decorator que executa um método ao restaurar o estado do formulário associado.
 *
 * @param {Object} target - Protótipo do Custom Element decorado.
 * @param {string|Symbol} method - Nome do método a ser executado.
 * @returns {void}
 *
 * @description
 * O decorator `formStateRestore` registra um método específico para ser executado
 * automaticamente quando o formulário associado ao Custom Element tiver seu estado restaurado,
 * utilizando a API `formStateRestoreCallback` com Proxy para manter o fluxo original.
 *
 * @example
 * import { formStateRestore } from '@nodusjs/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   static formAssociated = true;
 *
 *   @formStateRestore
 *   onFormStateRestore() {
 *     console.log('Estado do formulário restaurado.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
const formStateRestore = (target, method) =>
  execute(method).on(target).after("formStateRestoreCallback");

export default formStateRestore;
