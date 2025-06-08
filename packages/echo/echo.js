import spark from "@spark";
import { connectArc, disconnectArc, on } from "./interfaces";
import target from "./target";

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
const Echo = (Klass) => {
  class Host extends Klass {
    #controllers = {};

    /**
     * Define os atributos observados pelo componente, incluindo o `on`.
     * Isso permite reagir dinamicamente a alterações no atributo `on` e
     * registrar ou remover arcos declarados.
     */
    static observedAttributes = [...(Klass.observedAttributes ?? []), on];

    /**
     * Intercepta mudanças em atributos observados.
     * No caso do Echo, lida com a ativação/desativação de arcos declarados via `on`.
     *
     * @param {string} name - Nome do atributo alterado.
     * @param {string|null} oldValue - Valor anterior do atributo.
     * @param {string|null} newValue - Novo valor do atributo.
     * @returns {this}
     */
    attributeChangedCallback(name, oldValue, newValue) {
      super.attributeChangedCallback?.(name, oldValue, newValue);

      if (name === on) {
        this[disconnectArc](oldValue);
        this[connectArc](newValue);
      }

      return this;
    }

    /**
     * Encerra todos os arcos ativos quando o elemento é removido do DOM.
     *
     * @returns {this}
     */
    disconnectedCallback() {
      super.disconnectedCallback?.();

      for (const arc of Object.keys(this.#controllers)) {
        this[disconnectArc](arc);
      }

      return this;
    }

    /**
     * Dispara um evento customizado para que outros componentes Echo possam reagir.
     *
     * O nome do evento é mantido (sem prefixo) e o payload `detail` inclui:
     *
     * - `attribute.id`: valor do atributo `id` do componente.
     * - `attribute.name`: valor do atributo `name`.
     * - `node`: nome da tag (`localName`).
     * - `token`: conteúdo original do `event.detail` recebido.
     *
     * Essa estrutura padroniza os metadados de origem para filtragem por parte dos listeners.
     *
     * @param {CustomEvent} event - Evento a ser despachado.
     */
    dispatchEvent(event) {
      super.dispatchEvent?.(event);

      target.dispatchEvent(
        new CustomEvent(event.type, {
          detail: {
            attribute: {
              id: this.getAttribute("id"),
              name: this.getAttribute("name"),
            },
            node: this.localName,
            token: event.detail,
          },
        }),
      );
    }

    /**
     * Interpreta e executa um arco definido no atributo `on`.
     *
     * Um arco define:
     * - `source`: origem do evento (`id`, `name` ou `tag`).
     * - `event`: tipo do evento.
     * - `type`: tipo de execução (method, setter ou attribute).
     * - `sink`: destino no componente.
     * - `filters`: transformations aplicadas ao valor antes de chegar no destino.
     *
     * @param {string} arc - Arco no formato `source/event:type/sink|filters`.
     * @returns {this}
     */
    [connectArc](arc) {
      this.#controllers[arc] = new AbortController();

      const [, source, event, type, sink, filters] =
        arc.match(/^([*#\w-]+)\/([\w-]+):([a-z]+)\/([\w-]+)(?:\|(.*))?$/i) ||
        [];

      const transforms = (filters || "")
        .split("|")
        .filter(Boolean)
        .map((filter) => filter.split("="))
        .map(([name, value]) => [spark.get(name), value]);

      target.addEventListener(
        event,
        (e) => {
          const {
            attribute: { id, name },
            node,
            token,
          } = e.detail;

          if (new RegExp(`^(\\*|#${id}|${name}|${node})$`, "i").test(source)) {
            const payload = transforms.reduce(
              (data, [fn, value]) => fn(data, value),
              token,
            );

            if (/method$/i.test(type)) this[sink]?.(payload);
            if (/attribute$/i.test(type)) this.setAttribute(sink, payload);
            if (/setter$/i.test(type)) this[sink] = payload;
          }

          return this;
        },
        {
          signal: this.#controllers[arc].signal,
        },
      );

      return this;
    }

    /**
     * Remove o listener associado a um arco específico utilizando AbortController.
     *
     * @param {string} arc - Arco que será desconectado.
     * @returns {this}
     */
    [disconnectArc](arc) {
      this.#controllers[arc]?.abort();
      return this;
    }
  }

  return Host;
};

export default Echo;
