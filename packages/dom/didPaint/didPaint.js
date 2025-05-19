import execute from "@dom/execute";
import { didPaintCallback } from "@dom/interfaces";

/**
 * Decorator que executa um método após a renderização do componente no ciclo de vida do DOM.
 *
 * @param {Object} target - O protótipo do Custom Element decorado.
 * @param {string|symbol} method - Nome do método a ser executado após o render.
 * @returns {void}
 *
 * @description
 * O decorator `didPaint` registra um método para ser executado imediatamente após
 * a renderização do conteúdo do componente, dentro do `connectedCallback`, e após
 * a aplicação de estilos e atualização de `innerHTML`.
 *
 * Esse decorator é últil para realizar tarefas que dependem do DOM já renderizado,
 * como medição de layout, animações, foco ou integração com terceiros.
 * Ele é acionado após o `requestAnimationFrame`.
 *
 * @example
 * import { didPaint } from '@nodusjs/std/dom';
 *
 * class MyElement extends HTMLElement {
 *   @didPaint
 *   finalize() {
 *     console.log('render concluído');
 *   }
 * }
 */
const didPaint = (target, method) =>
	execute(method).on(target).after(didPaintCallback);

export default didPaint;
