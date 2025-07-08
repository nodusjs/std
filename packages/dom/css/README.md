# Helper de Template `css`

O `css` é um helper no formato de *tagged template literal* que converte uma string de template CSS em uma instância de `CSSStyleSheet`. Ele foi projetado para ser usado com a API `adoptedStyleSheets` de Web Components, oferecendo uma maneira moderna e performática de aplicar estilos encapsulados.

## Instalação e Importação

Este helper faz parte do pacote `@nodusjs/std/dom` e pode ser importado junto com outros utilitários de renderização.

```javascript
import { css } from '@nodusjs/std/dom';
```

## Como Usar

Você utiliza `css` como um prefixo para uma string de template. Qualquer variável ou expressão JavaScript interpolada (`${...}`) será inserida no CSS final. O resultado é um objeto `CSSStyleSheet` que pode ser adicionado ao array `adoptedStyleSheets` do `shadowRoot` de um componente.

### Exemplo de Uso com o Decorator `@paint`

A maneira mais comum de usar o helper `css` é em conjunto com o decorator `@paint` para definir os estilos de um componente de forma declarativa.

```javascript
import { define } from '@nodusjs/std/directive';
import { paint, html, css } from '@nodusjs/std/dom';

// 1. Defina uma função que retorna os estilos usando a tag `css`.
//    Note como podemos usar variáveis JavaScript (${...}) para criar estilos dinâmicos.
const componentStyle = (el) => {
  const textColor = el.getAttribute('color') || 'black';
  const paddingSize = '1.5rem';

  return css`
    :host {
      display: block;
      font-family: sans-serif;
      color: ${textColor};
      border: 2px solid ${textColor};
      padding: ${paddingSize};
      border-radius: 8px;
    }
  `;
};

// 2. Defina o template HTML do componente.
const componentHtml = () => html`<p>Este é o meu componente estilizado!</p>`;

// 3. Use @paint para aplicar o HTML e os estilos à classe.
@define('my-styled-box')
@paint(componentHtml, componentStyle)
class MyStyledBox extends HTMLElement {
  // O @paint cuida de criar o shadowRoot e aplicar os estilos.
}
```

**No HTML:**

```html
<my-styled-box color="crimson"></my-styled-box>
<my-styled-box color="darkblue"></my-styled-box>
```

## Descrição

O helper `css` é um invólucro para a API `CSSStyleSheet` do navegador. Ele cria uma nova folha de estilo em memória e usa o método `replaceSync()` para preenchê-la com o CSS fornecido.

A principal vantagem de usar `css` e a API `adoptedStyleSheets` é o **desempenho**. Quando você adota uma folha de estilo, o navegador pode analisar o CSS uma única vez e compartilhar a mesma instância de folha de estilo entre múltiplos componentes do mesmo tipo. Isso é muito mais eficiente do que ter uma tag `<style>` dentro de cada instância do componente, o que forçaria o navegador a analisar e processar o mesmo CSS repetidamente.
