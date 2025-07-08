# Decorator `@retouch`

O decorator `@retouch` é uma versão especializada e mais performática do `@repaint`. Ele foi projetado para disparar uma atualização **apenas nos estilos** de um componente em resposta a uma mudança de estado, sem reconstruir seu DOM.

## Instalação e Importação

Este decorator faz parte do pacote `@nodusjs/std/dom` e deve ser usado em componentes que já utilizam `@paint`.

```javascript
import { retouch, paint, html, css } from '@nodusjs/std/dom';
```

## Como Usar

Aplique o decorator `@retouch` a um setter ou método que modifica uma propriedade utilizada **exclusivamente** na função de estilos do seu componente (a função que usa o helper `css`).

### Exemplo de Uso

Neste exemplo, temos um botão cujo `background-color` é controlado pela propriedade `statusColor`. Como a mudança de cor afeta apenas o CSS e não a estrutura HTML, `@retouch` é a escolha perfeita e mais eficiente.

```javascript
import { define } from '@nodusjs/std/directive';
import { retouch, paint, html, css } from '@nodusjs/std/dom';

// O CSS do componente é dinâmico e depende da propriedade 'statusColor'.
const statusCss = (el) => css`
  button {
    background-color: ${el.statusColor};
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
`;

// O HTML é estático.
const statusHtml = () => html`<button>Salvar</button>`;

@define('status-button')
@paint(statusHtml, statusCss)
class StatusButton extends HTMLElement {
  private _statusColor = 'gray'; // Cor inicial

  get statusColor() {
    return this._statusColor;
  }

  // @retouch garante que, ao alterar a cor, apenas a função de CSS
  // será re-executada, o que é muito mais rápido do que re-renderizar o HTML.
  @retouch
  set statusColor(newColor) {
    this._statusColor = newColor;
  }
  
  connectedCallback() {
    // Simula uma mudança de estado após 2 segundos
    setTimeout(() => {
      this.statusColor = 'green'; // Isso dispara o @retouch
    }, 2000);
  }
}
```

## Quando Preferir `@retouch` em Vez de `@repaint`?

Esta é a pergunta mais importante. A escolha correta pode trazer ganhos significativos de desempenho.

  - **Use `@retouch` quando:** A mudança de estado afeta **apenas a aparência visual** do componente, controlada pelo CSS.

      - **Exemplos:** Mudar uma cor, um tamanho de fonte, a visibilidade com `display: none`, ou alternar uma classe que modifica estilos.
      - **Vantagem:** É muito mais rápido, pois evita a manipulação do DOM (não reconstrói o HTML), apenas atualiza os estilos adotados.

  - **Use `@repaint` quando:** A mudança de estado afeta a **estrutura HTML** do componente.

      - **Exemplos:** Adicionar ou remover itens de uma lista, alterar o texto de um parágrafo, ou mostrar/esconder elementos de forma condicional no template.
      - **Necessidade:** Como o HTML precisa ser reconstruído para refletir os novos dados, uma nova "pintura" completa é necessária.

**Regra de ouro:** Se a propriedade que você está alterando só é usada dentro da sua função `css`, use `@retouch`. Se ela é usada dentro da sua função `html`, use `@repaint`.

## Descrição

O decorator `@retouch` intercepta a execução de um método ou setter. Após a execução da lógica original, ele verifica se o componente já foi renderizado (`isPainted = true`) e, em caso afirmativo, ele re-executa **apenas** o `cssCallback` definido no `@paint`, reaplicando os novos estilos. Ele ignora intencionalmente o `htmlCallback` para otimizar a atualização.
