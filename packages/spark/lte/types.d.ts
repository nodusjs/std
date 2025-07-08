/**
 * Declaração de tipo para o spark 'lte' (Less Than or Equal to).
 *
 * @description
 * Compara dois valores e retorna `true` se o primeiro for menor ou igual
 * ao segundo. A função converte ambos os valores para o tipo Number
 * antes da comparação para garantir um resultado matemático.
 *
 * @param x - O primeiro valor (o valor base).
 * @param y - O segundo valor (o valor de comparação).
 * @returns `true` se x for menor ou igual a y, senão `false`.
 *
 * @example
 * import { lte } from '@nodusjs/std/spark';
 *
 * lte(5, 10); // true
 * lte(5, 5); // true
 * lte("5", 5); // true
 */
export declare function lte(x: number | string, y: number | string): boolean;
