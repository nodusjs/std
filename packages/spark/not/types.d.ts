/**
 * Declaração de tipo para o spark 'not'.
 *
 * @description
 * Inverte o valor booleano de qualquer entrada. A função primeiro converte
 * o valor para um booleano com base nas regras de "truthiness" do JavaScript
 * e depois aplica o operador lógico NOT (!).
 *
 * @param x - O valor a ser invertido.
 * @returns O valor booleano invertido.
 *
 * @example
 * import { not } from '@nodusjs/std/spark';
 *
 * not(true); // false
 * not(0); // true
 * not('hello'); // false
 */
export declare function not(x: any): boolean;
