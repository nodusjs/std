# Helper de Template `html`

O helper `html` é uma *tagged template literal* projetada para construir strings de HTML de forma declarativa e legível. É a ferramenta recomendada para definir a estrutura do DOM de seus Web Components no ecossistema `@nodusjs/std`.

## Instalação e Importação

Este helper faz parte do pacote `@nodusjs/std/dom` e geralmente é usado em conjunto com o decorator `@paint`.

```javascript
import { html } from '@nodusjs/std/dom';
```

## Como Usar

Você utiliza `html` como um prefixo para uma string de template. Expressões JavaScript interpoladas (`${...}`) serão inseridas no HTML final. Uma das grandes vantagens é sua capacidade de lidar nativamente com arrays, tornando a renderização de listas muito simples.

### Exemplo de Uso com o Decorator `@paint`

A forma mais eficaz de usar o `html` é definindo a estrutura do seu componente em uma função e aplicando-a com o decorator `@paint`.

```javascript
import { define } from '@nodusjs/std/directive';
import { paint, html } from '@nodusjs/std/dom';

// 1. Defina uma função que retorna o HTML do componente usando a tag `html`.
const shoppingListHtml = (el) => {
  const title = el.getAttribute('list-title') || 'Minha Lista de Compras';
  const items = [
    { id: 1, name: 'Maçãs', done: true },
    { id: 2, name: 'Leite', done: false },
    { id: 3, name: 'Pão', done: false },
  ];

  return html`
    <h3>${title}</h3>
    <ul>
      ${items.map(item =>
        html`<li class="${item.done ? 'done' : ''}">${item.name}</li>`
      )}
    </ul>
  `;
};

// 2. Use @paint para aplicar o template HTML à classe do componente.
@define('shopping-list')
@paint(shoppingListHtml)
class ShoppingList extends HTMLElement {
  // O @paint cuida de criar o shadowRoot e inserir este HTML.
}
```

**No HTML:**

```html
<shopping-list list-title="Tarefas de Casa"></shopping-list>
```

## Descrição

O helper `html` funciona como uma função que recebe os fragmentos de string e os valores interpolados do seu template. Ele utiliza `String.raw` para processar e concatenar tudo em uma única string HTML.

Seu principal benefício é a legibilidade e a manutenibilidade do código. Escrever HTML complexo com múltiplas variáveis se torna muito mais fácil e menos propenso a erros do que a concatenação manual de strings.

É importante notar que, em sua versão atual, o helper `html` foca apenas na concatenação de valores e **não realiza a sanitização do HTML**. Por segurança, evite passar dados não confiáveis ou gerados por usuários diretamente para o template para prevenir vulnerabilidades de Cross-Site Scripting (XSS).
