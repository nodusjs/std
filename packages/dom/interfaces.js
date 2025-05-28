/**
 * Propriedade simbólica usada para indicar se o componente já foi renderizado.
 *
 * Essa flag é automaticamente definida como `true` após a execução do `paintCallback`,
 * e é utilizada internamente por decorators como `@repaint` para condicionar a nova renderização
 * apenas quando o componente já passou por uma renderização inicial.
 */
export const isPainted = Symbol.from("isPainted");

/**
 * Identificador exclusivo para o callback executado após a renderização do componente.
 *
 * Usado internamente pelos decorators e helpers como `@didPaint` para garantir que o método
 * associado seja executado após a aplicação de estilos e atualização do DOM.
 */
export const didPaintCallback = Symbol("didPaintCallback");

/**
 * Identificador exclusivo para o callback de renderização principal do componente.
 *
 * É utilizado pelo helper `paint` como ponto central para renderizar o HTML e aplicar estilos
 * ao `shadowRoot` ou ao próprio componente. Serve como marcador intermediário entre os callbacks
 * `willPaint` e `didPaint`.
 */
export const paintCallback = Symbol("paintCallback");

/**
 * Identificador exclusivo para o callback executado antes da renderização do componente.
 *
 * É usado por decorators como `@willPaint` para indicar que um método deve ser executado
 * antes de qualquer manipulação de DOM, dentro do `connectedCallback`.
 */
export const willPaintCallback = Symbol("willPaintCallback");
