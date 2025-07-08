import type { adopted } from "./adopted/types.d.ts";
import type { attributeChanged } from "./attributeChanged/types.d.ts";
import type { connected } from "./connected/types.d.ts";
import type { define } from "./define/types.d.ts";
import type { disconnected } from "./disconnected/types.d.ts";
import type { formAssociated } from "./formAssociated/types.d.ts";
import type { formDisabled } from "./formDisabled/types.d.ts";
import type { formReset } from "./formReset/types.d.ts";
import type { formSateRestore } from "./formStateRestore/types.d.ts";

/**
 * @module @nodusjs/std/directive
 *
 * @description
 * Este módulo fornece uma coleção de decorators TypeScript projetados para
 * simplificar a interação com o ciclo de vida nativo e as APIs de
 * Web Components. Com eles, você pode escrever um código mais declarativo,
 * limpo e focado na lógica de negócios do seu componente.
 */
declare module "@nodusjs/std/directive" {
  export type {
    adopted,
    attributeChanged,
    connected,
    define,
    disconnected,
    formAssociated,
    formDisabled,
    formReset,
    formStateRestore,
  };
}
