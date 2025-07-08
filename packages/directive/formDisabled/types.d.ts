/**
 * Decorator que executa um método ao desabilitar o Custom Element via formulário.
 *
 * @param {Object} target - Protótipo do Custom Element decorado.
 * @param {string|Symbol} method - Nome do método a ser executado.
 * @returns {void}
 *
 * @description
 * O decorator `formDisabled` registra um método específico para ser executado
 * automaticamente quando o Custom Element for desabilitado via formulário,
 * utilizando a API `formDisabledCallback` com Proxy para manter o fluxo original.
 *
 * @example
 * import { formDisabled } from '@nodusjs/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   static formAssociated = true;
 *
 *   @formDisabled
 *   onFormDisabled() {
 *     console.log('Elemento desabilitado pelo formulário.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function formDisabled(
  target: object,
  method: string | symbol,
): void;
