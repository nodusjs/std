import type { css } from "./css/types.d.ts";
import type { didPaint } from "./didPaint/types.d.ts";
import type { html } from "./html/types.d.ts";
import type { paint } from "./paint/types.d.ts";
import type { repaint } from "./repaint/types.d.ts";
import type { retouch } from "./retouch/types.d.ts";
import type { willPaint } from "./willPaint/types.d.ts";

/**
 * @module @nodusjs/std/dom
 *
 * @description
 * Este módulo fornece um conjunto de decorators e helpers para simplificar
 * a renderização e a manipulação do DOM em Web Components. Ele facilita
 * a criação de componentes reativos e a conexão com o ciclo de pintura
 * (paint) do navegador.
 */
declare module "@nodusjs/std/dom" {
  export type { css, didPaint, html, paint, repaint, retouch, willPaint };
}
