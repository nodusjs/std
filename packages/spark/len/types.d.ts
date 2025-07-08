/**
 * Declaração de tipo para o spark 'len' (length).
 *
 * @description
 * Retorna de forma segura o número de chaves de um objeto, o número de
 * elementos de um array ou o número de caracteres de uma string. Lida com
 * valores nulos ou indefinidos retornando 0, o que previne erros.
 *
 * @param x - O objeto, array ou string cujo tamanho será medido.
 * @returns O "comprimento" do valor de entrada como um número.
 *
 * @example
 * import { len } from '@nodusjs/std/spark';
 *
 * len({ a: 1, b: 2 }); // 2
 * len(['a', 'b', 'c']); // 3
 * len('hello'); // 5
 * len(null); // 0
 */
export declare function len(
  x: object | any[] | string | null | undefined,
): number;
