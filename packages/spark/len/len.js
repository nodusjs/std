/**
 * Retorna o número de chaves de um objeto.
 *
 * @param {object} x
 * @returns {number}
 */
export function len(x) {
  return Object.keys(x ?? {})?.length;
}
