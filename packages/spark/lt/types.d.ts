/**
 * Declaração de tipo para o spark 'lt' (Less Than).
 *
 * @description
 * Compara dois valores e retorna `true` se o primeiro for estritamente menor
 * que o segundo. A função converte ambos os valores para o tipo Number
 * antes da comparação para garantir um resultado matemático.
 *
 * @param x - O primeiro valor (o valor base).
 * @param y - O segundo valor (o valor de comparação).
 * @returns `true` se x for menor que y, senão `false`.
 *
 * @example
 * import { lt } from '@nodusjs/std/spark';
 *
 * lt(5, 10); // true
 * lt("5", 10); // true
 * lt(5, 5); // false
 */
export declare function lt(x: number | string, y: number | string): boolean;
