import execute from "@directive/execute";

/**
 * Decorator que executa um método ao associar o Custom Element a um formulário.
 *
 * @param {Object} target - Protótipo do Custom Element decorado.
 * @param {string|Symbol} method - Nome do método a ser executado.
 * @returns {void}
 *
 * @description
 * O decorator `formAssociated` registra um método específico para ser executado
 * automaticamente quando o Custom Element for associado a um `<form>`, utilizando
 * a API `formAssociatedCallback` com Proxy para manter o fluxo original.
 *
 * @example
 * import { formAssociated } from '@nodusjs/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   static formAssociated = true;
 *
 *   @formAssociated
 *   onFormAssociated() {
 *     console.log('Elemento associado ao formulário.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
const formAssociated = (target, method) =>
	execute(method).on(target).after("formAssociatedCallback");

export default formAssociated;
