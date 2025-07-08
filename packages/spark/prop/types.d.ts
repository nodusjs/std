/**
 * Declaração de tipo para o spark 'prop'.
 *
 * @description
 * Acessa de forma segura uma propriedade aninhada dentro de um objeto
 * usando uma string como caminho. Retorna 'undefined' em vez de lançar
 * um erro se qualquer parte do caminho não existir.
 *
 * @param target - O objeto do qual a propriedade será extraída.
 * @param path - O caminho para a propriedade desejada (ex: 'user.address.city').
 * @returns O valor da propriedade encontrada ou `undefined` se o caminho for inválido.
 *
 * @example
 * import { prop } from '@nodusjs/std/spark';
 *
 * const user = { data: { name: 'Alice' } };
 *
 * prop(user, 'data.name'); // 'Alice'
 * prop(user, 'data.address.street'); // undefined
 */
export declare function prop(target: object, path: string): any;
