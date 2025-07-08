/**
 * Retorna o número de chaves de um objeto.
 *
 * @param {object|string} x
 * @returns {number}
 */
export function len(x) {
  return Object.keys(x ?? {})?.length;
}
