/**
 * Template tag `html` para gerar strings HTML de forma segura e controlada.
 *
 * Essa função será utilizada no helper `component` para definir o conteúdo HTML
 * dos Web Components de forma declarativa, usando template literals.
 *
 * O comportamento atual apenas concatena os valores e strings,
 * respeitando a interpolação dos dados sem aplicar nenhuma transformação
 * ou sanitização. Versões futuras podem incluir minificação, limpeza ou validação.
 *
 * @param {TemplateStringsArray} strings - Array com os pedaços literais do template.
 * @param {...any} values - Valores interpolados no template.
 * @returns {string} HTML combinado como string.
 *
 * @example
 * const name = "Clebão";
 * const htmlOutput = html`<h1>Olá, ${name}!</h1>`;
 * console.log(htmlOutput); // "<h1>Olá, Clebão!</h1>"
 */
const html = (strings, ...values) => {
  return String.raw(
    { raw: strings },
    ...values.map((value) => [].concat(value).join("")),
  );
};

export default html;
