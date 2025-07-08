# Decorator `@willPaint`

O decorator `@willPaint` oferece um gancho para executar uma lógica imediatamente **antes** que um componente tenha seu conteúdo (HTML) e estilos (CSS) renderizados no DOM. É a ferramenta ideal para tarefas de preparação.

## Instalação e Importação

Este decorator faz parte do pacote `@nodusjs/std/dom` e deve ser usado em componentes que também utilizam o decorator `@paint`.

```javascript
import { willPaint, paint, html } from '@nodusjs/std/dom';
```

## Como Usar

Aplique o decorator `@willPaint` diretamente sobre o método da classe que deve ser executado antes do ciclo de pintura do componente.

### Exemplo de Uso

O `@willPaint` é perfeito para preparar o estado do componente antes que ele seja visualmente renderizado. Um ótimo caso de uso é definir um atributo de "carregando", que pode ser usado por estilos CSS para mostrar um estado de carregamento enquanto o resto do componente (ou dados assíncronos) é processado.

Neste exemplo, usamos `@willPaint` para adicionar um atributo e `@didPaint` para simular uma carga de dados, mostrando o fluxo completo.

```javascript
import { define } from '@nodusjs/std/directive';
import { paint, willPaint, didPaint, html, css } from '@nodusjs/std/dom';

const componentHtml = () => html`<div class="content">Carregando...</div>`;

// O CSS usa o atributo 'data-loading' para mostrar um feedback visual.
const componentCss = () => css`
  :host([data-loading]) .content {
    opacity: 0.5;
    font-style: italic;
  }
`;

@define('async-widget')
@paint(componentHtml, componentCss)
class AsyncWidget extends HTMLElement {
  /**
   * Este método é invocado pelo @willPaint ANTES da renderização.
   * Ótimo para adicionar um estado inicial.
   */
  @willPaint
  prepare() {
    console.log('1. Preparando para renderizar...');
    this.setAttribute('data-loading', 'true');
  }

  /**
   * Este método é invocado pelo @didPaint DEPOIS da renderização.
   * Ideal para buscar dados ou manipular o DOM já renderizado.
   */
  @didPaint
  loadData() {
    console.log('2. Renderização concluída. Buscando dados...');
    setTimeout(() => {
      this.shadowRoot.querySelector('.content').textContent = 'Dados carregados!';
      this.removeAttribute('data-loading');
      console.log('3. Dados carregados e estado finalizado.');
    }, 2000);
  }
}
```

## Descrição

O decorator `@willPaint` é um atalho para o `willPaintCallback`, um callback customizado do ciclo de vida de renderização do pacote `@nodusjs/std/dom`. Ele é invocado pelo `@paint` logo no início do processo de renderização, dentro do `connectedCallback`, mas antes da aplicação de qualquer HTML ou CSS.

Ao contrário do `@didPaint` que roda *após* o `requestAnimationFrame`, o `@willPaint` é acionado **antes**, garantindo que qualquer lógica de pré-renderização ocorra com antecedência e seja refletida no primeiro ciclo de pintura do navegador.
