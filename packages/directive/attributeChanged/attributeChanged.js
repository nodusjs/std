import execute from "@directive/attributeChanged/execute";

/**
 * Decorator que executa um setter quando um atributo observado é alterado.
 *
 * @param {string} attribute - Nome do atributo a ser monitorado.
 * @param {...Function} filters - Funções que transformam o novo valor antes da atribuição.
 * @returns {void}
 *
 * @description
 * O decorator `attributeChanged` registra o atributo como observado e
 * executa o setter decorado sempre que ele for alterado, utilizando
 * a API `attributeChangedCallback`. O novo valor pode ser transformado por filtros.
 *
 * @example
 * import { attributeChanged } from '@nodusjs/std/directive';
 *
 * class MyElement extends HTMLElement {
 *   @attributeChanged('visible', value => value === 'true')
 *   set visible(value) {
 *     this.toggleAttribute('hidden', !value);
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
const attributeChanged =
	(attribute, ...filters) =>
	(target, property) => {
		execute(property)
			.with(filters)
			.from(target)
			.whenAttributeChanges(attribute);
	};

export default attributeChanged;
