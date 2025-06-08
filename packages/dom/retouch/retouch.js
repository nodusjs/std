import "@polyfill/setImmediate";
import { cssCallback, isPainted } from "@dom/interfaces";

/**
 * Decorator que reaplica os estilos do componente após a execução de um método ou setter.
 *
 * @param {Object} target - O protótipo do Custom Element decorado.
 * @param {string|symbol} propertyKey - O nome do método ou setter decorado.
 * @param {PropertyDescriptor} descriptor - O descritor do método ou setter.
 * @returns {void}
 *
 * @description
 * O decorator `retouch` intercepta a execução de métodos ou setters e,
 * caso o componente já tenha sido renderizado (`isPainted = true`),
 * executa novamente a aplicação de estilos definidos no `cssCallback`.
 *
 * Isso é útil quando o estilo do componente depende de dados dinâmicos
 * que podem mudar durante a execução do componente.
 *
 * @example
 * import { retouch } from '@nodusjs/std/dom';
 *
 * class MyElement extends HTMLElement {
 *   static [cssCallback]() {
 *     const sheet = new CSSStyleSheet();
 *     sheet.replaceSync(`:host { color: ${this.color}; }`);
 *     return sheet;
 *   }
 *
 *   @retouch
 *   set color(value) {
 *     this._color = value;
 *   }
 *
 *   @retouch
 *   updateStyle() {
 *     this._refresh = true;
 *   }
 * }
 */
const retouch = (_target, _propertyKey, descriptor) => {
  const apply = (original, context, args) => {
    setImmediate(async () => {
      if (context[isPainted]) {
        await new Promise(context[cssCallback]);
      }
    });

    return original.apply(context, args);
  };

  if (descriptor.set) {
    descriptor.set = new Proxy(descriptor.set, { apply });
  }

  if (descriptor.value) {
    descriptor.value = new Proxy(descriptor.value, { apply });
  }
};

export default retouch;
