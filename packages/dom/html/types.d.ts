/**
 * Template tag `html` para gerar strings HTML de forma segura e controlada.
 *
 * @param {TemplateStringsArray} strings - Array com os pedaços literais do template.
 * @param {...any} values - Valores interpolados no template.
 * @returns {string} HTML combinado como string.
 *
 * @description
 * Essa função será utilizada no helper `component` para definir o conteúdo HTML
 * dos Web Components de forma declarativa, usando template literals.
 *
 * O comportamento atual apenas concatena os valores e strings,
 * respeitando a interpolação dos dados sem aplicar nenhuma transformação
 * ou sanitização. Versões futuras podem incluir minificação, limpeza ou validação.
 *
 * @example
 * const name = "Clebão";
 * const text = html`<h1>Olá, ${name}!</h1>`;
 * console.log(text); // "<h1>Olá, Clebão!</h1>"
 */
export declare function html(
  strings: TemplateStringsArray,
  ...values: any[]
): string;
