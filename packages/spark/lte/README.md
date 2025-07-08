# Spark: `lte`

O `lte` (uma abreviação para *Less Than or Equal to*) é um helper do pacote `@nodusjs/std/spark` que compara dois valores e retorna `true` se o primeiro for menor ou igual ao segundo.

## Instalação e Importação

O `lte` pode ser importado diretamente do pacote de sparks:

```javascript
import { lte } from '@nodusjs/std/spark';
```

## Possíveis Usos

O `lte` é ideal para ser usado como um filtro condicional, especialmente para verificar se um valor está dentro de um limite máximo permitido.

### Uso 1: Como Filtro Composto em um Dataflow com `Echo`

A verdadeira força dos sparks está na composição. Você pode usar o `lte` em conjunto com outros sparks, como o `len`, para criar uma lógica condicional complexa de forma declarativa.

**Cenário**: Uma loja virtual oferece frete grátis para compras com 3 itens ou menos. Um componente deve exibir o banner de "frete grátis" com base no número de itens no carrinho, que é enviado em um evento `cart-updated`.

**HTML:**

```html
<shipping-banner on="*/cart-updated:setter/show|len|lte=3"></shipping-banner>
```

**Fluxo:**

1.  O evento `cart-updated` ocorre com um array de 2 itens no `detail`.
2.  O spark `len` transforma o array no número `2`.
3.  O número `2` é passado para o próximo spark, `lte=3`, que executa `lte(2, 3)` e retorna `true`.
4.  O valor `true` é passado para o setter `show` do componente `<shipping-banner>`.

### Uso 2: Validação de Limites em Componentes

Programaticamente, `lte` é uma forma robusta de garantir que um valor não exceda um máximo permitido, tratando a conversão de tipos automaticamente.

**Cenário**: Um componente de player de vídeo não permite que o volume, ajustado por um input de texto, passe de 100.

```javascript
import { lte } from '@nodusjs/std/spark';

class VideoPlayer extends HTMLElement {
  MAX_VOLUME = 100;

  setVolume() {
    const volumeInput = this.querySelector('#volume-control');
    const volumeDesejado = volumeInput.value; // ex: "101" (string)

    // 'lte' converte a string para número antes de comparar.
    if (lte(volumeDesejado, this.MAX_VOLUME)) {
      console.log('Volume ajustado para:', volumeDesejado);
      // ...lógica para ajustar o volume
    } else {
      console.log('O volume não pode ser maior que 100.');
    }
  }
}
```

## Descrição Técnica

A implementação do `lte` garante que a comparação seja sempre numérica, convertendo ambos os argumentos para `Number` antes da verificação.

```javascript
function lte(x, y) {
  return Number(x) <= Number(y); //
}
```

Essa conversão explícita torna o `lte` seguro e previsível, especialmente ao lidar com dados que vêm de atributos HTML ou outros contextos do DOM, que frequentemente são strings.
