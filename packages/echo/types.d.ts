/**
 * @module @nodusjs/std/echo
 *
 * @description
 * Declaração de tipo para o mixin 'Echo', o pilar de Dataflow
 * do ecossistema @nodusjs/std.
 */
declare module "@nodusjs/std/echo" {
  type CustomElementConstructor = new (...args: any[]) => HTMLElement;

  /**
   * Mixin Echo
   *
   * @param {CustomElementConstructor} Klass - A classe base (geralmente HTMLElement).
   * @returns {Klass} Uma nova classe estendida com suporte ao atributo `on`.
   *
   * @description
   * O mixin `Echo` adiciona suporte ao atributo `on`, permitindo que eventos externos
   * sejam mapeados para atributos, métodos ou setters do próprio componente.
   *
   * Ele observa o atributo `on`, escuta eventos no escopo do DOM e realiza o roteamento
   * declarativo via arcos no formato: `source/event:type/sink|sparks`.
   *
   * Os filtros (sparks) são aplicados antes da atribuição do valor no destino.
   * Este mixin é não opinativo, compatível com o ciclo de vida nativo e com outros decorators.
   *
   * @example
   * class MyElement extends Echo(HTMLElement) {
   *   set color(value) {
   *     this.style.color = value;
   *   }
   * }
   */
  export default function Echo<TBase extends CustomElementConstructor>(
    Klass: TBase,
  ): TBase;
}
