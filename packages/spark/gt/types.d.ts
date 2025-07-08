/**
 * Declaração de tipo para o spark 'gt' (Greater Than).
 *
 * @description
 * Compara dois valores e retorna `true` se o primeiro for estritamente maior
 * que o segundo. A função converte ambos os valores para o tipo Number
 * antes da comparação para garantir um resultado matemático.
 *
 * @param x - O primeiro valor (o valor base).
 * @param y - O segundo valor (o valor de comparação).
 * @returns `true` se x for maior que y, senão `false`.
 *
 * @example
 * import { gt } from '@nodusjs/std/spark';
 *
 * gt(10, 5); // true
 * gt("10", 5); // true
 * gt(5, 5); // false
 */
export declare function gt(x: number | string, y: number | string): boolean;
