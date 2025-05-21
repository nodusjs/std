/**
 * Canal global de eventos utilizado pelo mixin `Echo`.
 *
 * @const {EventTarget}
 *
 * @description
 * O `target` atua como um barramento de eventos interno entre componentes personalizados.
 * Ele é usado pelo mixin `Echo` para despachar e ouvir eventos com base nos protocolos
 * declarados no atributo `on`.
 *
 * Ao invés de registrar eventos diretamente no `document` ou em elementos específicos,
 * o `Echo` utiliza esta instância única de `EventTarget` para garantir isolamento e performance.
 *
 * Esse canal também facilita a composição entre componentes sem acoplamento direto.
 *
 * @example
 * target.addEventListener("deck/review:method>markCorrect", (event) => {
 *   // processa valor transformado e repassa para o método
 * });
 */
const target = new EventTarget();

export default target;
