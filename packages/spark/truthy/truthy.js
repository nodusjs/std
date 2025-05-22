/**
 * Avalia se um valor pode ser considerado truthy, seguindo convenções de atributos booleanos HTML.
 *
 * @param {string|null} value - Valor bruto vindo do DOM.
 * @returns {boolean} `false` para `"false"`, `"0"`, `"no"` ou `null`; `true` caso contrário.
 *
 * @description
 * Este spark interpreta os valores `"false"`, `"0"`, `"no"` e `null` como `false`,
 * e qualquer outro valor como `true`. É útil para uso com atributos HTML
 * que representam flags booleanas, como `disabled`, `checked`, etc.
 *
 * @example
 * truthy("no");     // false
 * truthy("false");  // false
 * truthy("0");      // false
 * truthy(null);     // false
 * truthy("true");   // true
 * truthy("");       // true
 */
export function truthy(value) {
	if (value === "no") return false;
	if (value === "false") return false;
	if (value === "0") return false;
	if (value === null) return false;
	return true;
}
