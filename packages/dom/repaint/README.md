# Decorator `@repaint`

O decorator `@repaint` é a principal ferramenta para criar componentes reativos no ecossistema `@nodusjs/std`. Ele conecta as mudanças de estado do seu componente a uma nova renderização da UI, garantindo que a tela sempre reflita os dados mais recentes.

## Instalação e Importação

Este decorator faz parte do pacote `@nodusjs/std/dom` e geralmente é usado em conjunto com `@paint`.

```javascript
import { repaint, paint, html } from '@nodusjs/std/dom';
```

## Como Usar

Aplique o decorator `@repaint` em um **setter** ou em um **método**. Toda vez que esse setter for chamado (ou o método executado), o decorator irá disparar uma nova renderização completa (HTML e CSS) do seu componente.

A condição para que o `@repaint` funcione é que o componente já tenha sido renderizado pelo menos uma vez pelo decorator `@paint`.

### Exemplo de Uso (Componente de Contador)

Neste exemplo, o setter da propriedade `count` é decorado com `@repaint`. Sempre que o valor de `count` for alterado, o componente inteiro será "repintado" com o novo valor.

```javascript
import { define } from '@nodusjs/std/directive';
import { repaint, paint, html } from '@nodusjs/std/dom';

// O HTML do componente depende da propriedade 'count'.
const counterHtml = (el) => html`
  <p>Contagem atual: <strong>${el.count}</strong></p>
  <button>Incrementar +1</button>
`;

@define('my-counter')
@paint(counterHtml)
class MyCounter extends HTMLElement {
  private _count = 0;

  get count() {
    return this._count;
  }

  // O decorator @repaint no setter é a chave da reatividade.
  // Sempre que 'this.count = ...' for chamado, o componente será
  // renderizado novamente, atualizando a <strong>.
  @repaint
  set count(newValue) {
    this._count = newValue;
  }

  // No connectedCallback, adicionamos a lógica para alterar o estado.
  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      // Esta linha invoca o setter, que por sua vez aciona o @repaint.
      this.count++;
    });
  }
}
```

## Descrição

O decorator `@repaint` intercepta a execução de um método ou setter. Após a execução da lógica original, ele verifica se o componente já foi renderizado (`isPainted = true`).

Se afirmativo, ele reexecuta todo o ciclo de renderização definido pelo `@paint`:

1.  Chama o `willPaintCallback` (se existir).
2.  Chama a função de `html` para gerar o novo HTML.
3.  Chama a função de `css` para gerar os novos estilos.
4.  Chama o `didPaintCallback` (se existir).

Esse comportamento garante que qualquer alteração no estado do seu componente seja refletida de forma automática e completa na interface do usuário, tornando `@repaint` a ponte entre a lógica de dados e a visualização.
