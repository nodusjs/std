# Spark: `not`

O `not` é um helper do pacote `@nodusjs/std/spark` que inverte o valor booleano de qualquer entrada que recebe, aplicando o operador lógico NOT (`!`) do JavaScript.

## Instalação e Importação

O `not` pode ser importado diretamente do pacote de sparks:

```javascript
import { not } from '@nodusjs/std/spark';
```

## Possíveis Usos

O `not` é uma ferramenta de composição poderosa, usada para inverter resultados em um fluxo de dados ou para alternar estados booleanos na lógica de um componente.

### Uso 1: Lógica de "Toggle" em Componentes

O uso mais direto do `not` é para alternar um estado booleano (de `true` para `false` e vice-versa).

**Cenário**: Um componente de interruptor (`toggle`) que alterna seu estado de ligado/desligado.

```javascript
import { define } from '@nodusjs/std/directive';
import { paint, repaint, html } from '@nodusjs/std/dom';
import { not } from '@nodusjs/std/spark';

const toggleHtml = (el) => html`
  <p>Estado: ${el.isOn ? 'Ligado' : 'Desligado'}</p>
  <button>Alternar</button>
`;

@define('toggle-switch')
@paint(toggleHtml)
class ToggleSwitch extends HTMLElement {
  private _isOn = false;

  get isOn() { return this._isOn; }

  @repaint
  set isOn(value) { this._isOn = value; }

  toggleState() {
    // Uso direto do 'not' para inverter o estado atual.
    this.isOn = not(this.isOn);
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.toggleState();
    });
  }
}
```

### Uso 2: Invertendo Dados de Eventos com `Echo`

Em um fluxo de dados `Echo`, `not` pode ser usado para inverter um valor booleano vindo de um evento.

**Cenário**: Um sistema dispara um evento `session-active` com `detail: true`. Um componente de UI precisa controlar a propriedade `isSessionExpired`, que deve ser o inverso do status da sessão.

**HTML:**

```html
<session-ui on="*/session-active:setter/isSessionExpired|not"></session-ui>
```

### Uso 3: Composição Avançada de Sparks

O `not` brilha quando é combinado com outros sparks para criar lógicas condicionais complexas de forma declarativa.

**Cenário**: Uma loja virtual exibe um banner "Você ainda pode adicionar itens\!" se o número de itens no carrinho **não for maior que 5**.

**HTML:**

```html
<cart-message on="*/cart-updated:setter/showAddMoreItems|len|gt=5|not"></cart-message>
```

**Fluxo (para um carrinho com 3 itens):**

1.  O evento `cart-updated` ocorre com um array de 3 itens.
2.  `len` transforma o array no número `3`.
3.  `gt=5` recebe `3`, executa `gt(3, 5)` e retorna `false`.
4.  `not` recebe `false` e retorna `true`.
5.  O setter `showAddMoreItems` é chamado com `true`, exibindo a mensagem.

## Descrição Técnica

A implementação do `not` utiliza diretamente o operador lógico NOT (`!`) do JavaScript.

```javascript
function not(x) {
  return !x; //
}
```

Isso significa que ele primeiro converte o valor de entrada `x` para um booleano com base nas regras de "truthiness" do JavaScript (onde `0`, `""`, `null`, `undefined`, `NaN` são `false` e todo o resto é `true`) e, em seguida, inverte esse resultado.
