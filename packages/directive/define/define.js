/**
 * Define e registra um Custom Element usando decorator.
 *
 * @param {string} name - Nome do Custom Element a ser registrado.
 * @param {ElementDefinitionOptions} [options] - Configurações opcionais do Custom Element.
 * @returns {(target: CustomElementConstructor) => void} - Decorator que define o Custom Element.
 *
 * @description
 * Utiliza a API `customElements.define` para registrar uma classe como um Custom Element.
 * Caso o Custom Element já esteja definido, não realiza nenhuma ação.
 *
 * @example
 * import { define } from '@nodusjs/std/directive';
 *
 * @define('my-element', { extends: 'div' })
 * class MyElement extends HTMLDivElement {
 *   constructor() {
 *     super();
 *     this.textContent = 'Hello, world!';
 *   }
 * }
 */
const define = (name, options) => (target) =>
	customElements.get(name) ?? customElements.define(name, target, options);

export default define;
