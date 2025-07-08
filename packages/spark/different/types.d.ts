/**
 * Declaração de tipo para o spark 'different'.
 *
 * @description
 * Compara dois valores e retorna `true` se eles forem diferentes. Utiliza a
 * comparação não-estrita (`!=`) para permitir a coerção de tipo, o que é
 * útil no contexto do DOM onde valores como `5` e `"5"` devem ser
 * considerados iguais.
 *
 * @param x - O primeiro valor a ser comparado.
 * @param y - O segundo valor a ser comparado.
 * @returns `true` se os valores forem diferentes após a coerção de tipo, senão `false`.
 *
 * @example
 * import { different } from '@nodusjs/std/spark';
 *
 * different('5', 5); // false
 * different(1, true); // false
 * different('hello', 'world'); // true
 */
export declare function different(x: any, y: any): boolean;
