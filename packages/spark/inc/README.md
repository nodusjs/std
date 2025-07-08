# Spark: `inc`

O `inc` (uma abreviação para *Increment*) é um helper do pacote `@nodusjs/std/spark` cuja função é incrementar um valor em 1, convertendo-o para o tipo `Number` de forma segura antes da operação.

## Instalação e Importação

O `inc` pode ser importado diretamente do pacote de sparks:

```javascript
import { inc } from '@nodusjs/std/spark';
```

## Possíveis Usos

O `inc` é uma função utilitária versátil, ideal para manipular estados numéricos em componentes ou para transformar dados em um fluxo de eventos.

### Uso 1: Lógica Interna de Componentes (Uso Mais Comum)

A forma mais comum de usar o `inc` é para gerenciar o estado de um componente, como em um contador de "curtidas" ou em um carrinho de compras.

**Cenário**: Um componente de contador que permite ao usuário aumentar um valor.

```javascript
import { define } from '@nodusjs/std/directive';
import { paint, repaint, html } from '@nodusjs/std/dom';
import { inc } from '@nodusjs/std/spark';

const counterHtml = (el) => html`
  <span>Likes: ${el.count}</span>
  <button>Curtir 👍</button>
`;

@define('like-button')
@paint(counterHtml)
class LikeButton extends HTMLElement {
  private _count = 0;

  get count() {
    return this._count;
  }

  // O @repaint garante que o componente será re-renderizado
  // sempre que a contagem for alterada.
  @repaint
  set count(newCount) {
    this._count = newCount;
  }

  // O método que usa o spark `inc`
  increaseCount() {
    // Uso direto da função 'inc' para atualizar o estado
    this.count = inc(this.count);
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.increaseCount();
    });
  }
}
```

### Uso 2: Transformando Dados de Eventos com `Echo`

Você pode usar `inc` em um pipeline de `Echo` para incrementar um valor recebido de um evento antes de aplicá-lo a um componente.

**Cenário**: Um sistema dispara um evento `page-viewed` com o número da página atual. Um componente de estatísticas ouve esse evento e usa `inc` para exibir qual será a "próxima página".

**HTML:**

```html
<stats-widget on="*/page-viewed:setter/nextPage|inc"></stats-widget>
```

**Fluxo:**

1.  O evento ocorre com `detail: 3`.
2.  O spark `inc` é acionado, executando `inc(3)`.
3.  O resultado `4` é passado para o setter `nextPage` do componente `<stats-widget>`.

## Descrição Técnica

A implementação do `inc` é simples e robusta, garantindo que a operação seja sempre uma adição matemática.

```javascript
function inc(x) {
  return Number(x) + 1; //
}
```

Ao usar `Number(x)`, a função lida de forma segura com valores de entrada que podem ser strings (como `"9"`), convertendo-os para número antes de incrementar. Isso previne o comportamento indesejado de concatenação de strings.
