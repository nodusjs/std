/**
 * Propriedade simbólica usada para indicar se o componente já foi renderizado.
 *
 * Essa flag é automaticamente definida como `true` após a execução do `paintCallback`,
 * e é utilizada internamente por decorators como `@repaint` para condicionar a nova renderização
 * apenas quando o componente já passou por uma renderização inicial.
 */
export const isPainted = Symbol.for("isPainted");

/**
 * Identificador exclusivo para o callback executado após a renderização do componente.
 *
 * Usado internamente pelos decorators e helpers como `@didPaint` para garantir que o método
 * associado seja executado após a aplicação de estilos e atualização do DOM.
 */
export const didPaintCallback = Symbol("didPaintCallback");

/**
 * Identificador exclusivo para o callback de atualização do conteúdo HTML do componente.
 *
 * Esse callback é invocado durante o processo de `paint` ou `repaint`, e é responsável por
 * renderizar o HTML no `shadowRoot` (ou no elemento diretamente, caso o `shadowRoot` não exista).
 *
 * Pode ser usado isoladamente com decorators como `@html`, ou em conjunto com `@paint` e `@repaint`.
 */
export const htmlCallback = Symbol("htmlCallback");

/**
 * Identificador exclusivo para o callback de aplicação de estilos do componente.
 *
 * Esse callback é chamado para obter os estilos (CSSStyleSheet) que devem ser aplicados
 * via `adoptedStyleSheets`. Ele pode ser utilizado de forma isolada através do decorator `@retouch`
 * ou combinado em fluxos mais amplos como `@paint`.
 *
 * Deve retornar uma instância de `CSSStyleSheet` ou uma Promise que resolve para ela.
 */
export const cssCallback = Symbol("cssCallback");

/**
 * Identificador exclusivo para o callback executado antes da renderização do componente.
 *
 * É usado por decorators como `@willPaint` para indicar que um método deve ser executado
 * antes de qualquer manipulação de DOM, dentro do `connectedCallback`.
 */
export const willPaintCallback = Symbol("willPaintCallback");
