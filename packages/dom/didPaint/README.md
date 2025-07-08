# Decorator `@didPaint`

O decorator `@didPaint` oferece um gancho para executar uma lógica imediatamente **após** um componente ter seu conteúdo (HTML) e estilos (CSS) renderizados no DOM.

## Instalação e Importação

Este decorator faz parte do pacote `@nodusjs/std/dom` e pode ser importado junto com outros utilitários de renderização.

```javascript
import { didPaint } from '@nodusjs/std/dom';
```

## Como Usar

Aplique o decorator `@didPaint` diretamente sobre o método da classe que deve ser executado após o ciclo de pintura do componente.

### Exemplo de Uso

O `@didPaint` é extremamente útil para tarefas que dependem do DOM já estar totalmente renderizado e "visível" na tela. Isso inclui:

  - Focar em um elemento de input.
  - Medir as dimensões de um elemento para animações ou cálculos de layout.
  - Integrar com bibliotecas de terceiros que precisam de um elemento DOM como alvo.

Neste exemplo, usamos `@didPaint` para focar automaticamente em um campo de input assim que o componente é renderizado.

```javascript
import { define } from '@nodusjs/std/directive';
import { paint, didPaint, html } from '@nodusjs/std/dom';

const componentHtml = () => html`
  <label for="username">Nome de Usuário:</label>
  <input type="text" id="username" />
`;

@define('auto-focus-input')
@paint(componentHtml)
class AutoFocusInput extends HTMLElement {
  /**
   * Este método é invocado pelo decorator @didPaint.
   * Como o DOM já está renderizado neste ponto, podemos com segurança
   * buscar o input e chamar o método .focus() nele.
   */
  @didPaint
  focusOnInput() {
    const inputElement = this.shadowRoot.querySelector('#username');
    if (inputElement) {
      console.log('Renderização concluída, focando no input...');
      inputElement.focus();
    }
  }
}
```

## Descrição

O decorator `@didPaint` é um atalho para o `didPaintCallback`, um callback customizado do ciclo de vida de renderização do pacote `@nodusjs/std/dom`. Ele é executado dentro do `connectedCallback` do componente, mas é agendado para rodar após a renderização do HTML e a aplicação dos estilos.

Tecnicamente, a lógica dentro do `@didPaint` é executada após o `requestAnimationFrame`, garantindo que o navegador já tenha processado o layout e a pintura, tornando-o o local ideal para interações que dependem de um DOM estável e medível.
