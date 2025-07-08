# Pacote `@nodusjs/std/dom`

O pacote `dom` é uma coleção de decorators e helpers de template projetados para gerenciar de forma declarativa e eficiente o ciclo de vida de renderização de Web Components.

## Responsabilidade

A principal responsabilidade deste pacote é fornecer uma API de alto nível para "pintar" o conteúdo (HTML) e os estilos (CSS) de um componente no DOM. Ele abstrai a complexidade da manipulação manual do DOM, a criação de Shadow DOM e o uso de APIs modernas como `adoptedStyleSheets` para um gerenciamento de estilos performático.

Em vez de implementar manualmente o `connectedCallback` para definir `innerHTML` e criar tags `<style>`, este pacote permite que você defina a aparência e o comportamento de renderização do seu componente usando decorators e helpers, resultando em um código mais limpo, reativo e fácil de manter.

## Helpers e Decorators Disponíveis

Abaixo está uma lista das principais ferramentas fornecidas por este pacote:

  - **`@paint`**: O decorator principal que orquestra a renderização inicial do componente quando ele é conectado ao DOM.
  - **`@repaint`**: Um decorator para métodos ou setters que dispara uma nova renderização completa (HTML e CSS) sempre que uma propriedade do componente é alterada.
  - **`@retouch`**: Similar ao `@repaint`, mas reaplica apenas os estilos, sendo uma opção mais performática para atualizações puramente visuais.
  - **`@willPaint`**: Um decorator de método que executa uma lógica imediatamente *antes* do conteúdo ser renderizado.
  - **`@didPaint`**: Um decorator de método que executa uma lógica imediatamente *após* o conteúdo ser renderizado.
  - **`html`**: Um helper de *template tag* para criar o conteúdo HTML do componente de forma declarativa.
  - **`css`**: Um helper de *template tag* para criar instâncias de `CSSStyleSheet`, otimizado para uso com `adoptedStyleSheets`.

## Exemplo de Uso

O exemplo abaixo demonstra como os helpers e decorators do pacote `dom` trabalham em conjunto para criar um componente reativo.

```javascript
import { define } from '@nodusjs/std/directive';
import { paint, repaint, html, css } from '@nodusjs/std/dom';

// 1. Define os estilos do componente usando a tag `css`.
const componentStyle = (el) => css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    border: 2px solid ${el.color};
    border-radius: 8px;
    font-family: sans-serif;
  }
  p {
    color: ${el.color};
    font-size: 1.2rem;
    margin: 0;
  }
`;

// 2. Define o HTML do componente usando a tag `html`.
const componentHtml = (el) => html`
  <p>${el.message}</p>
  <button>Mudar Mensagem</button>
`;

@define('interactive-box')
// 3. O decorator @paint renderiza o HTML e os estilos na primeira vez.
@paint(componentHtml, componentStyle)
class InteractiveBox extends HTMLElement {
  color = 'darkcyan';
  
  // O valor inicial da mensagem.
  private _message = 'Clique no botão!';

  // Getter para a mensagem.
  get message() {
    return this._message;
  }

  // 4. O decorator @repaint no setter faz o componente re-renderizar
  //    automaticamente sempre que a propriedade 'message' for alterada.
  @repaint
  set message(newMessage) {
    this._message = newMessage;
  }
  
  // 5. Adiciona um listener para alterar a mensagem.
  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.message = 'A mágica aconteceu!';
    });
  }
}
```
