# Spark: `lt`

O `lt` (uma abreviação para *Less Than*) é um helper do pacote `@nodusjs/std/spark` que compara dois valores e retorna `true` se o primeiro for estritamente menor que o segundo.

## Instalação e Importação

O `lt` pode ser importado diretamente do pacote de sparks:

```javascript
import { lt } from '@nodusjs/std/spark';
```

## Possíveis Usos

O `lt` é ideal para ser usado como um filtro condicional, especialmente para verificar se um valor ainda não atingiu um determinado limite.

### Uso 1: Como Filtro em um Dataflow com `Echo` (Uso Mais Comum)

Você pode usar o `lt` em um pipeline de `Echo` para acionar uma ação apenas quando um valor estiver abaixo de um limite específico.

**Cenário**: Um sistema de estoque dispara um evento `stock-changed` com a quantidade atual de um produto. Um componente de alerta deve ser exibido se o estoque for menor que 20 unidades.

**HTML:**

```html
<low-stock-alert on="*/stock-changed:setter/showWarning|lt=20"></low-stock-alert>
```

**Fluxo:**

1.  O evento `stock-changed` ocorre com `detail: 15`.
2.  O spark `lt=20` é acionado, executando `lt(15, 20)`.
3.  O resultado é `true`.
4.  O valor `true` é passado para o setter `showWarning` do componente `<low-stock-alert>`.

### Uso 2: Validação de Lógica em Componentes

Programaticamente, `lt` é uma forma robusta de fazer comparações numéricas, especialmente quando os dados vêm de fontes que podem ser strings, como atributos HTML.

**Cenário**: Um formulário de feedback só permite o envio se a avaliação do usuário, inserida em um campo de texto, for menor que 5 (indicando uma necessidade de atenção especial).

```javascript
import { lt } from '@nodusjs/std/spark';

class FeedbackForm extends HTMLElement {
  handleReview() {
    const ratingInput = this.querySelector('#rating');
    const ratingValue = ratingInput.value; // ex: "3" (string)
    const threshold = 5;

    // 'lt' converte a string "3" para o número 3 antes de comparar.
    if (lt(ratingValue, threshold)) {
      console.log('Atenção especial necessária para este feedback.');
      // Lógica para escalar o feedback para um time de suporte
    } else {
      console.log('Feedback positivo recebido.');
    }
  }
}
```

## Descrição Técnica

A implementação do `lt` garante que a comparação seja sempre numérica, convertendo ambos os argumentos para `Number` antes da verificação.

```javascript
function lt(x, y) {
  return Number(x) < Number(y); //
}
```

Essa conversão explícita é o que torna o `lt` seguro e previsível, permitindo comparar de forma correta um valor de atributo (string) com um número de referência do JavaScript.
