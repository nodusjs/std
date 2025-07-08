import type { add } from "./add/types.d.ts";
import type { always } from "./always/types.d.ts";
import type { dec } from "./dec/types.d.ts";
import type { different } from "./different/types.d.ts";
import type { equals } from "./equals/types.d.ts";
import type { gt } from "./gt/types.d.ts";
import type { gte } from "./gte/types.d.ts";
import type { inc } from "./inc/types.d.ts";
import type { len } from "./len/types.d.ts";
import type { lt } from "./lt/types.d.ts";
import type { lte } from "./lte/types.d.ts";
import type { not } from "./not/types.d.ts";
import type { prop } from "./prop/types.d.ts";
import type { subtract } from "./subtract/types.d.ts";
import type { truthy } from "./truthy/types.d.ts";

/**
 * @module @nodusjs/std/spark
 *
 * @description
 * Declaração de tipo para o pacote 'spark'. Este módulo fornece uma
 * coleção de pequenas funções puras para a transformação de dados,
 * usadas como filtros no 'Echo', '@attributeChanged' e '@event'.
 */
declare module "@nodusjs/std/spark" {
  export type {
    add,
    always,
    dec,
    different,
    equals,
    gt,
    gte,
    inc,
    len,
    lt,
    lte,
    not,
    prop,
    subtract,
    truthy,
  };
}
