/**
 * Declaração de tipo para o spark 'gte' (Greater Than or Equal to).
 *
 * @description
 * Compara dois valores e retorna `true` se o primeiro for maior ou igual
 * ao segundo. A função converte ambos os valores para o tipo Number
 * antes da comparação para garantir um resultado matemático.
 *
 * @param x - O primeiro valor (o valor base).
 * @param y - O segundo valor (o valor de comparação).
 * @returns `true` se x for maior ou igual a y, senão `false`.
 *
 * @example
 * import { gte } from '@nodusjs/std/spark';
 *
 * gte(10, 5); // true
 * gte(5, 5); // true
 * gte("5", 5); // true
 */
export declare function gte(x: number | string, y: number | string): boolean;
