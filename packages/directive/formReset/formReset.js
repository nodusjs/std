import execute from "@directive/execute";

/**
 * Decorator que executa um método ao resetar o formulário associado ao Custom Element.
 *
 * @param {Object} target - Protótipo do Custom Element decorado.
 * @param {string|Symbol} method - Nome do método a ser executado.
 * @returns {void}
 *
 * @description
 * O decorator `formReset` registra um método específico para ser executado
 * automaticamente quando o formulário associado ao Custom Element for resetado,
 * utilizando a API `formResetCallback` com Proxy para manter o fluxo original.
 *
 * @example
 * import { formReset } from '@nodusjs/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   static formAssociated = true;
 *
 *   @formReset
 *   onFormReset() {
 *     console.log('Formulário resetado.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
const formReset = (target, method) =>
  execute(method).on(target).after("formResetCallback");

export default formReset;
