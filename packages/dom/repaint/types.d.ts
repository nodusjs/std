/**
 * Decorator que força uma nova renderização do componente após a execução de um método ou setter.
 *
 * @param {Object} target - O protótipo do Custom Element decorado.
 * @param {string|symbol} propertyKey - O nome do método ou setter decorado.
 * @param {PropertyDescriptor} descriptor - O descritor do método ou setter.
 * @returns {void}
 *
 * @description
 * O decorator `repaint` intercepta a execução de métodos ou setters e,
 * caso o componente já tenha sido renderizado (`isPainted = true`),
 * executa novamente o ciclo de renderização através do `paintCallback`.
 *
 * Esse comportamento é útil para manter a UI atualizada automaticamente após alterações de estado.
 *
 * @example
 * import { repaint } from '@nodusjs/std/dom';
 *
 * class MyElement extends HTMLElement {
 *   @repaint
 *   set data(value) {
 *     this._data = value;
 *   }
 *
 *   @repaint
 *   update() {
 *     this._updated = true;
 *   }
 * }
 */
export declare function repaint(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
): void;
