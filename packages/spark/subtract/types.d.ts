/**
 * Declaração de tipo para o spark 'subtract'.
 *
 * @description
 * Subtrai o segundo valor do primeiro. A função garante que a operação
 * seja matemática, convertendo os valores para o tipo Number.
 *
 * @param x - O valor base (minuendo).
 * @param y - O valor a ser subtraído (subtraendo).
 * @returns A diferença entre os dois valores como um número.
 *
 * @example
 * import { subtract } from '@nodusjs/std/spark';
 *
 * const result = subtract(100, "25.5"); // Retorna 74.5 (number)
 */
export declare function subtract(
  x: number | string,
  y: number | string,
): number;
