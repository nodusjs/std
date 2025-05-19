export const isPainted = Symbol("isPainted");

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
