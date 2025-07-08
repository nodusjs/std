# Spark: `add`

O `add` é um helper do pacote `@nodusjs/std/spark`. Sua função é somar dois valores, convertendo-os para números de forma segura antes da operação.

## Instalação e Importação

O `add` pode ser importado diretamente do pacote de sparks:

```javascript
import { add } from '@nodusjs/std/spark';
```

## Possíveis Usos

A principal força dos sparks como o `add` é sua capacidade de serem compostos em diferentes partes da biblioteca para transformar dados em um fluxo.

### Uso 1: Em um Dataflow com o Mixin `Echo`

Este é o caso de uso mais comum para sparks. Você pode usá-lo como um "pipe" no atributo `on` para modificar o dado de um evento antes que ele chegue ao seu destino.

**Cenário**: Um componente de jogo dispara um evento `score-increased` com a pontuação do jogador. Um outro componente, que exibe o "total de pontos de bônus", ouve esse evento e adiciona 50 pontos de bônus à pontuação recebida.

**HTML:**

```html
<bonus-display on="*/score-increased:setter/bonusPoints|add=50"></bonus-display>
```

**Fluxo:**

1.  O evento ocorre com `detail: 1000`.
2.  O `spark` `add=50` é acionado, executando `add(1000, 50)`.
3.  O resultado `1050` é passado para o setter `bonusPoints` do componente `<bonus-display>`.

### Uso 2: Como Filtro no Decorator `@attributeChanged`

Você pode usar o `add` para realizar cálculos baseados em atributos que mudam.

**Cenário**: Um componente de e-commerce exibe o preço final de um produto. Ele recebe um `base-price` como atributo e precisa adicionar um valor fixo de frete.

```javascript
import { define, attributeChanged } from '@nodusjs/std/directive';
import { add } from '@nodusjs/std/spark';

const FRETE_FIXO = 10;

@define('price-display')
class PriceDisplay extends HTMLElement {
  
  // 1. O atributo 'base-price' (string) é convertido para Número.
  // 2. O spark 'add' é usado programaticamente no setter.
  @attributeChanged('base-price', Number)
  set price(basePrice) {
    // Uso direto da função 'add'
    const finalPrice = add(basePrice, FRETE_FIXO);
    this.textContent = `Preço Total: R$ ${finalPrice.toFixed(2)}`;
  }
}
```

**HTML:**

```html
<price-display base-price="50"></price-display>
```

### Uso 3: Como uma Função Utilitária Pura

No fim das contas, `add` é uma função JavaScript normal e pode ser usada em qualquer lugar do seu código onde você precise de uma soma segura. Sua vantagem é que ela sempre converte os operandos para `Number`, evitando erros de concatenação de strings.

```javascript
import { add } from '@nodusjs/std/spark';

const totalCarrinho = 150; // um número
const valorItem = "25.50";   // uma string

// Em vez de fazer Number(totalCarrinho) + Number(valorItem),
// você pode usar o 'add' para uma soma garantida.
const novoTotal = add(totalCarrinho, valorItem); // Resultado: 175.5 (número)

console.log(novoTotal);
```

## Descrição Técnica

A implementação do `add` é simples e robusta, focada em garantir uma operação matemática.

```javascript
function add(x, y) {
  return Number(x) + Number(y); //
}
```

Ao usar `Number()` em ambos os argumentos, ele lida de forma transparente com valores que podem vir como strings (de atributos HTML ou `event.detail`, por exemplo), prevenindo o comportamento inesperado de concatenação de strings (ex: `"10" + "5"` resultando em `"105"` em vez de `15`).
