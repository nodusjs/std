/**
 * Declaração de tipo para o spark 'inc' (Increment).
 *
 * @description
 * Incrementa um valor em 1. A função converte o valor de entrada para o tipo
 * Number antes da operação para garantir um resultado matemático correto.
 *
 * @param x - O valor a ser incrementado.
 * @returns O valor incrementado como um número.
 *
 * @example
 * import { inc } from '@nodusjs/std/spark';
 *
 * const result = inc("9"); // Retorna 10 (number)
 */
export declare function inc(x: number | string): number;
