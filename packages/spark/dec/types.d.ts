/**
 * Declaração de tipo para o spark 'dec'.
 *
 * @description
 * Decrementa um valor em 1. A função converte o valor de entrada para o tipo
 * Number antes da operação para garantir um resultado matemático correto.
 *
 * @param x - O valor a ser decrementado.
 * @returns O valor decrementado como um número.
 *
 * @example
 * import { dec } from '@nodusjs/std/spark';
 *
 * const result = dec("10"); // Retorna 9 (number)
 */
export declare function dec(x: number | string): number;
