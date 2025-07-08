/**
 * Declaração de tipo para o spark 'add'.
 *
 * @description
 * Soma dois valores, convertendo-os para o tipo Number antes da operação
 * para garantir um resultado matemático e evitar a concatenação de strings.
 *
 * @param x - O primeiro valor (número base).
 * @param y - O segundo valor a ser somado.
 * @returns A soma dos dois valores como um número.
 *
 * @example
 * import { add } from '@nodusjs/std/spark';
 *
 * const result = add("10", 5); // Retorna 15 (number)
 */
export declare function add(x: number | string, y: number | string): number;
