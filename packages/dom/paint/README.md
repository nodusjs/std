# Decorator `@paint`

O decorator `@paint` é a principal ferramenta do pacote `@nodusjs/std/dom`. Ele orquestra a renderização inicial da estrutura (HTML) e dos estilos (CSS) de um Web Component de forma declarativa, executando o processo assim que o elemento é conectado ao DOM.

## Instalação e Importação

Este decorator foi projetado para funcionar em conjunto com os helpers `html` e `css`, todos disponíveis no pacote `@nodusjs/std/dom`.

```javascript
import { paint, html, css } from '@nodusjs/std/dom';
```

## Como Usar

`@paint` é um decorator de fábrica que deve ser aplicado diretamente sobre a classe do seu componente. Ele aceita uma função de `component` (para o HTML) como primeiro argumento, seguida por uma ou mais funções de `styles` (para o CSS).

### A Receita de Uso

1.  **Defina o HTML**: Crie uma função que recebe a instância do elemento (`el`) e retorna uma string de HTML, preferencialmente usando o helper `html`.
2.  **Defina os Estilos**: Crie uma ou mais funções que recebem a instância do elemento (`el`) e retornam uma `CSSStyleSheet`, preferencialmente usando o helper `css`.
3.  **Aplique o Decorator**: Adicione `@paint(componentHtml, componentStyle)` diretamente acima da declaração da sua classe.

### Exemplo de Uso Completo

```javascript
import { define } from '@nodusjs/std/directive';
import { paint, html, css } from '@nodusjs/std/dom';

// 1. Função que define a estrutura HTML do componente.
//    Ela pode acessar propriedades do elemento, como 'el.title'.
const cardHtml = (el) => html`
  <h3>${el.title}</h3>
  <p><slot>Conteúdo padrão do card.</slot></p>
`;

// 2. Função que define os estilos.
//    Também pode ser dinâmica, lendo atributos do elemento.
const cardCss = (el) => css`
  :host {
    display: block;
    font-family: sans-serif;
    border: 1px solid ${el.getAttribute('borderColor') || 'lightgray'};
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
  }
  h3 {
    margin-top: 0;
    color: #333;
  }
`;

// 3. Aplicação do decorator na classe do componente.
@define('my-card')
@paint(cardHtml, cardCss)
class MyCard extends HTMLElement {
  title = 'Título do Card';

  connectedCallback() {
    // O @paint já cuidou da renderização neste ponto.
    // Podemos adicionar lógicas adicionais aqui se necessário.
  }
}
```

**No HTML:**

```html
<my-card borderColor="royalblue">
  Este é o conteúdo que será inserido pelo slot.
</my-card>
```

## Descrição

O decorator `@paint` é um orquestrador que automatiza o processo de renderização inicial de um Web Component. Internamente, ele se acopla ao `connectedCallback` e realiza as seguintes ações:

1.  Garante que o componente tenha um `shadowRoot` para encapsulamento.
2.  Chama sua função de `component` para obter a string de HTML e a insere no `shadowRoot`.
3.  Chama cada uma das suas funções de `styles` para obter as instâncias de `CSSStyleSheet`.
4.  Aplica as folhas de estilo ao `shadowRoot` através da API `adoptedStyleSheets`, garantindo uma renderização performática.
5.  Suporta o ciclo de vida de renderização completo, permitindo o uso dos decorators `@willPaint` (para lógica *antes* da renderização) e `@didPaint` (para lógica *depois* da renderização).
