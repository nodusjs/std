# Decorator de Eventos `@event`

O decorator `@event` oferece uma maneira declarativa e segura de ouvir eventos do DOM que ocorrem dentro do Shadow DOM de um componente. Ele substitui a necessidade de adicionar `event listeners` manualmente, gerenciando automaticamente o ciclo de vida do listener para evitar vazamentos de memória.

## Instalação e Importação

Este decorator é a exportação padrão do pacote `@nodusjs/std/event`.

```javascript
import event from '@nodusjs/std/event';
```

## Como Usar: A Sintaxe Dinâmica

A grande vantagem do `@event` é sua sintaxe dinâmica. Você pode ouvir **qualquer evento do DOM** simplesmente anexando o nome do evento após o ponto.

`@event.nomeDoEvento(seletor, ...filtros)`

  - **`nomeDoEvento`**: O nome do evento que você quer ouvir. Pode ser qualquer evento padrão (`click`, `input`, `submit`, `mouseover`) ou **qualquer evento customizado** (`item-selected`, `state-changed`, etc.).
  - **`seletor`**: Um seletor CSS para identificar o elemento alvo *dentro do Shadow DOM* do seu componente.
  - **`filtros`**: (Opcional) Uma ou mais funções que podem transformar o objeto do evento antes que ele chegue ao seu método.

### Exemplo 1: Ouvindo um Evento `click`

Este é o caso de uso mais comum: executar uma ação quando um botão é clicado.

```javascript
import event from '@nodusjs/std/event';
import { define } from '@nodusjs/std/directive';
import { paint, html } from '@nodusjs/std/dom';

@define('my-card')
@paint(() => html`<button>Clique em mim</button>`)
class MyCard extends HTMLElement {

  @event.click('button')
  handleClick(evt) {
    console.log('O botão dentro do card foi clicado!', evt);
    evt.target.textContent = 'Clicado!';
  }
}
```

### Exemplo 2: Ouvindo um Evento `input`

O decorator funciona perfeitamente com eventos de formulário para capturar dados do usuário.

```javascript
import event from '@nodusjs/std/event';
import { define } from '@nodusjs/std/directive';
import { paint, html } from '@nodusjs/std/dom';

@define('my-input-form')
@paint(() => html`<input type="text" placeholder="Digite seu nome">`)
class MyInputForm extends HTMLElement {

  @event.input('input')
  handleInput(evt) {
    // Acessa o valor do input através do evento
    const currentValue = evt.target.value;
    console.log(`Valor atual: ${currentValue}`);
  }
}
```

### Exemplo 3: Ouvindo um Custom Event

Esta é a característica mais poderosa do `@event`. Ele permite que seus componentes se comuniquem de forma desacoplada através de eventos customizados.

```javascript
import event from '@nodusjs/std/event';
// ... outros imports

// Componente Filho que dispara o evento
@define('list-item')
@paint(() => html`<slot></slot>`)
class ListItem extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', () => {
      // Dispara um evento customizado com dados
      this.dispatchEvent(new CustomEvent('itemSelected', {
        bubbles: true,
        composed: true,
        detail: { id: this.id, text: this.textContent }
      }));
    });
  }
}

// Componente Pai que ouve o evento
@define('my-list')
@paint(() => html`
  <list-item id="item-1">Maçã</list-item>
  <list-item id="item-2">Banana</list-item>
`)
class MyList extends HTMLElement {

  // Ouve o evento 'itemSelected' que borbulha dos filhos
  @event.itemSelected('list-item')
  handleSelection(evt) {
    const { id, text } = evt.detail;
    console.log(`Item selecionado! ID: ${id}, Texto: ${text}`);
  }
}
```

## Descrição

O decorator `@event` é, na verdade, um `Proxy` JavaScript. Quando você acessa uma propriedade como `event.click`, o Proxy intercepta a chamada, extrai o nome do evento ("click") e gera dinamicamente um decorator configurado para ouvir aquele evento específico.

Internamente, ele utiliza a função `listen` que:

1.  Adiciona um único event listener ao `shadowRoot` do componente (usando delegação de eventos para performance).
2.  Verifica se o alvo do evento corresponde ao seletor CSS fornecido.
3.  Gerencia automaticamente a remoção do listener quando o componente é desconectado do DOM, usando um `AbortController` para prevenir vazamentos de memória.
