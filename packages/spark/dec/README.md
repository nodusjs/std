# Spark: `dec`

O `dec` é um helper do pacote `@nodusjs/std/spark` cuja função é decrementar um valor em 1, convertendo-o para o tipo `Number` de forma segura antes da operação.

## Instalação e Importação

O `dec` pode ser importado diretamente do pacote de sparks:

```javascript
import { dec } from '@nodusjs/std/spark';
```

## Possíveis Usos

Assim como outros sparks, o `dec` pode ser usado como um transformador de dados em um fluxo ou como uma função utilitária pura dentro da lógica dos seus componentes.

### Uso 1: Lógica Interna de Componentes (Uso Mais Comum)

O uso mais direto do `dec` é para manipular o estado de um componente, como em um contador. Ele garante que a operação de decremento seja sempre matemática, mesmo que o estado seja armazenado como string.

**Cenário**: Um componente de "carrinho de compras" permite ao usuário diminuir a quantidade de um item.

```javascript
import { define } from '@nodusjs/std/directive';
import { paint, repaint, html } from '@nodusjs/std/dom';
import { dec } from '@nodusjs/std/spark';

const cartItemHtml = (el) => html`
  <span>Quantidade: ${el.quantity}</span>
  <button>Remover 1</button>
`;

@define('cart-item')
@paint(cartItemHtml)
class CartItem extends HTMLElement {
  private _quantity = 5;

  get quantity() {
    return this._quantity;
  }

  // @repaint garante que o componente será re-renderizado
  // sempre que a quantidade for alterada.
  @repaint
  set quantity(newQuantity) {
    this._quantity = newQuantity;
  }

  // O método que usa o spark `dec`
  decreaseQuantity() {
    if (this.quantity > 0) {
      // Uso direto da função 'dec' para atualizar o estado
      this.quantity = dec(this.quantity);
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.decreaseQuantity();
    });
  }
}
```

### Uso 2: Transformando Dados de Eventos com `Echo`

Você pode usar o `dec` em um pipeline de dataflow para decrementar um valor vindo de um evento.

**Cenário**: Um sistema de gerenciamento de estoque dispara um evento `item-sold` com o número de itens restantes no `event.detail`. Um painel de exibição ouve esse evento e usa `dec` para mostrar qual será o "próximo" nível de estoque.

**HTML:**

```html
<stock-dashboard on="*/item-sold:setter/nextStockLevel|dec"></stock-dashboard>
```

**Fluxo:**

1.  O evento ocorre com `detail: 28`.
2.  O `spark` `dec` é acionado, executando `dec(28)`.
3.  O resultado `27` é passado para o setter `nextStockLevel` do componente `<stock-dashboard>`.

## Descrição Técnica

A implementação do `dec` é focada em segurança e previsibilidade.

```javascript
function dec(x) {
  return Number(x) - 1; //
}
```

Ao usar `Number(x)`, a função garante que, mesmo que o valor de entrada `x` seja uma string (como `"10"`), a operação será um decremento matemático, não resultando em `NaN` ou outros erros. Isso a torna ideal para lidar com dados de atributos HTML ou payloads de eventos.
