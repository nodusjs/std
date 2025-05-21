/**
 * Acessa uma propriedade dinamicamente de um objeto.
 *
 * @param {object} target - Objeto de origem.
 * @param {string} path - Caminho da propriedade, pode conter notacao com colchetes.
 * @returns {any} Valor da propriedade ou `undefined`.
 */
export function prop(target, path) {
	try {
		return new Function(
			"target",
			`return target${/\[/.test(path) ? "" : "."}${path}`,
		)(target);
	} catch (_) {
		return undefined;
	}
}
