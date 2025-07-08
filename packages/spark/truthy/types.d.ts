/**
 * Declaração de tipo para o spark 'truthy'.
 *
 * @description
 * Avalia se um valor pode ser considerado "verdadeiro" seguindo as convenções
 * de atributos booleanos do HTML, onde strings como "false", "0", "no" e o
 * valor 'null' são tratados como falsos.
 *
 * @param value - O valor a ser avaliado, geralmente vindo de um atributo HTML.
 * @returns `true` se o valor for considerado verdadeiro, senão `false`.
 *
 * @example
 * import { truthy } from '@nodusjs/std/spark';
 *
 * truthy("false"); // false
 * truthy(null);    // false
 * truthy("true");  // true
 * truthy("");      // true (atributo presente é considerado verdadeiro)
 */
export declare function truthy(value: string | null): boolean;
