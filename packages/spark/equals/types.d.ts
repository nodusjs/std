/**
 * Declaração de tipo para o spark 'equals'.
 *
 * @description
 * Compara dois valores e retorna `true` se eles forem iguais. Utiliza a
 * comparação não-estrita (`==`) para permitir a coerção de tipo, o que é
 * útil no contexto do DOM onde valores como `5` e `"5"` devem ser
 * considerados iguais.
 *
 * @param x - O primeiro valor a ser comparado.
 * @param y - O segundo valor a ser comparado.
 * @returns `true` se os valores forem iguais após a coerção de tipo, senão `false`.
 *
 * @example
 * import { equals } from '@nodusjs/std/spark';
 *
 * equals('5', 5); // true
 * equals(1, true); // true
 * equals('hello', 'world'); // false
 */
export declare function equals(x: any, y: any): boolean;
