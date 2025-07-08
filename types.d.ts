/**
 * =================================================================
 * Ponto de Entrada para Declarações de Tipo - @nodusjs/std
 * =================================================================
 *
 * Este arquivo é o principal ponto de entrada para o compilador TypeScript.
 * Ele utiliza referências para carregar as declarações de tipo para cada
 * módulo (pacote) da biblioteca, mantendo a estrutura organizada.
 *
 * Para adicionar tipos para um novo módulo, crie um arquivo de declaração
 * para ele (ex: `packages/meu-novo-pacote/types.d.ts`) e adicione uma
 * nova linha de referência aqui.
 */

/// <reference path="./packages/directive/types.d.ts" />
/// <reference path="./packages/dom/types.d.ts" />
/// <reference path="./packages/event/types.d.ts" />
/// <reference path="./packages/echo/types.d.ts" />
/// <reference path="./packages/spark/types.d.ts" />
