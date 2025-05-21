/**
 * Identificador exclusivo do callback executado ao conectar um arco Echo.
 *
 * @const {symbol}
 * @description
 * Utilizado internamente pelo mixin `Echo` para configurar os listeners associados
 * ao atributo `on`. Esse callback é chamado quando o atributo `on` é adicionado ou alterado,
 * permitindo o registro de novos arcos declarativos (eventos que chegam no componente).
 */
export const connectArc = Symbol.for("connectArc");

/**
 * Identificador exclusivo do callback executado ao desconectar um arco Echo.
 *
 * @const {symbol}
 * @description
 * Utilizado internamente pelo mixin `Echo` para remover listeners de eventos
 * registrados via o atributo `on`. É chamado ao remover o valor do atributo `on` ou
 * quando o componente é desconectado do DOM.
 */
export const disconnectArc = Symbol.for("disconnectArc");

/**
 * Identificador exclusivo para o atributo `on`, utilizado para declarar escutas reativas.
 *
 * @const {symbol}
 * @description
 * Usado para indicar que o mixin `Echo` deve observar mudanças no atributo `on`,
 * que define os protocolos de roteamento de eventos externos para destinos internos
 * (atributos, setters ou métodos). Cada valor do `on` representa um grafo declarativo.
 */
export const on = "on";
