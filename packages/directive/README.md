# Pacote `@nodusjs/std/directive`

O pacote `directive` é uma coleção de decorators projetados para simplificar o desenvolvimento de Web Components, tornando a interação com o ciclo de vida nativo e outras APIs da plataforma mais declarativa e menos verbosa.

## Responsabilidade

A principal responsabilidade deste grupo de funções (decorators) é abstrair a complexidade de se conectar aos hooks do ciclo de vida dos Custom Elements (como `connectedCallback`, `disconnectedCallback`, `adoptedCallback`), ao `attributeChangedCallback` e às APIs de associação de formulários (`formAssociatedCallback`, etc.).

Em vez de implementar manualmente esses métodos e suas lógicas de proxy para estender o comportamento, você pode usar um decorator simples e elegante diretamente no método que deseja executar, mantendo o código da sua classe mais limpo e focado na lógica de negócios.

## Decorators Disponíveis

Abaixo está uma lista de todos os decorators fornecidos por este pacote:

### Ciclo de Vida do Componente

  * `@define`: Define um Custom Element no `customElements.registry`.
  * `@connected`: Executa um método quando o elemento é inserido no DOM (`connectedCallback`).
  * `@disconnected`: Executa um método quando o elemento é removido do DOM (`disconnectedCallback`).
  * `@adopted`: Executa um método quando o elemento é movido para um novo documento (`adoptedCallback`).
  * `@attributeChanged`: Executa um método ou setter quando um atributo observado muda (`attributeChangedCallback`).

### Associação com Formulários

Estes decorators simplificam a interação com formulários quando se está construindo um Custom Element associado a um formulário (`form-associated custom element`).

  * `@formAssociated`: Executa um método quando o elemento é associado a um formulário (`formAssociatedCallback`).
  * `@formDisabled`: Executa um método quando o estado de `disabled` do elemento muda através do formulário (`formDisabledCallback`).
  * `@formReset`: Executa um método quando o formulário é resetado (`formResetCallback`).
  * `@formStateRestore`: Executa um método quando o estado do elemento é restaurado pelo formulário (`formStateRestoreCallback`).

## Exemplo de Uso

```javascript
import { define, connected, attributeChanged } from '@nodusjs/std/directive';

@define('meu-componente')
class MeuComponente extends HTMLElement {
  // Será executado quando <meu-componente> for conectado ao DOM
  @connected
  inicializar() {
    console.log('Componente conectado!');
  }

  // O setter 'visible' será executado quando o atributo 'visible' mudar
  @attributeChanged('visible')
  set visible(novoValor) {
    console.log(`A visibilidade mudou para: ${novoValor}`);
    // Lógica para mostrar ou esconder o componente
  }
}
```
