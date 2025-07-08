# Pacote `@nodusjs/std/echo`

O pacote `echo` é a implementação do pilar de **Dataflow** no ecossistema `@nodusjs/std`. Ele fornece um mecanismo de comunicação entre componentes baseado em um barramento de eventos, permitindo que eles troquem informações de forma desacoplada e declarativa.

## Responsabilidade: Habilitando o Dataflow

A principal responsabilidade do `echo` é permitir que Web Components se comuniquem sem a necessidade de referências diretas ou de subir e descer eventos pela árvore DOM (o que é conhecido como *prop drilling*). Em vez disso, ele estabelece um **barramento de eventos** centralizado.

  - **Componentes Produtores**: Despacham eventos no barramento.
  - **Componentes Consumidores**: Se inscrevem declarativamente para ouvir esses eventos e reagir a eles.

Isso cria um fluxo de dados (Dataflow) claro e de fácil manutenção, onde os componentes são unidades independentes que reagem a eventos do sistema, em vez de estarem rigidamente acoplados uns aos outros.

## O Mixin `Echo` e o Atributo `on`

Diferente dos outros pacotes que fornecem decorators, `echo` exporta um **mixin**. Um mixin é uma função que você aplica a uma classe para "misturar" novas funcionalidades a ela.

O mixin `Echo` estende seu Custom Element com uma capacidade fundamental: o suporte ao atributo `on`.

O atributo `on` é a forma declarativa de conectar um componente ao barramento de eventos. Sua sintaxe é poderosa e segue o formato:

`on="source/event:type/sink|spark1|spark2=valor"`

  - **`source`**: Quem dispara o evento? Pode ser um seletor de ID (`#meu-id`), um nome (`meu-nome`), uma tag (`minha-tag`) ou um wildcard (`*` para ouvir de qualquer fonte).
  - **`event`**: Qual o nome do evento? (ex: `click`, `state-changed`, `color-selected`).
  - **`type`**: Como o dado do evento deve ser aplicado?
      - `setter`: Chama um setter de propriedade (ex: `this.color = ...`).
      - `method`: Executa um método (ex: `this.updateData(...)`).
      - `attribute`: Define um atributo HTML (ex: `this.setAttribute(...)`).
  - **`sink`**: Onde o dado deve ser aplicado? (O nome do setter, método ou atributo).
  - **`sparks`**: (Opcional) Uma cadeia de funções de transformação (do pacote `spark`) para modificar o dado antes que ele chegue ao `sink`.

## Exemplo de Uso Prático

Imagine dois componentes: um seletor de cores (`color-picker`) e uma caixa que exibe a cor selecionada (`display-box`). Eles não precisam se conhecer, apenas concordar com o nome de um evento.

**1. O Componente Produtor (`color-picker`)**

Ele precisa usar o mixin `Echo` para que seus eventos sejam transmitidos no barramento.

```javascript
import Echo from '@nodusjs/std/echo';
import { define } from '@nodusjs/std/directive';

@define('color-picker')
class ColorPicker extends Echo(HTMLElement) {
  connectedCallback() {
    this.innerHTML = `
      <p>Selecione uma cor:</p>
      <input type="color" value="#0000ff">
    `;
    this.querySelector('input').addEventListener('input', (e) => {
      // Dispara um evento customizado com a nova cor.
      // O mixin Echo vai garantir que ele chegue ao barramento.
      this.dispatchEvent(new CustomEvent('color-change', {
        detail: e.target.value
      }));
    });
  }
}
```

**2. O Componente Consumidor (`display-box`)**

Este componente usa o atributo `on` para se inscrever no evento `color-change`.

```javascript
import Echo from '@nodusjs/std/echo';
import { define } from '@nodusjs/std/directive';

@define('display-box')
class DisplayBox extends Echo(HTMLElement) {
  // O setter que será o 'sink' do nosso dataflow.
  set backgroundColor(newColor) {
    this.style.backgroundColor = newColor;
  }
  
  connectedCallback() {
    this.style.width = '100px';
    this.style.height = '100px';
    this.style.border = '1px solid black';
  }
}
```

**3. O HTML Final**

No HTML, conectamos os dois de forma declarativa:

```html
<color-picker id="picker1"></color-picker>
<hr>

<display-box on="#picker1/color-change:setter/backgroundColor"></display-box>
```

Com isso, o `display-box` reage às ações do `color-picker` sem que nenhum dos dois tenha uma referência direta ao outro, demonstrando o poder do dataflow declarativo.
