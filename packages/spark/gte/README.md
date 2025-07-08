# Spark: `gte`

O `gte` (uma abreviação para *Greater Than or Equal to*) é um helper do pacote `@nodusjs/std/spark` que compara dois valores e retorna `true` se o primeiro for maior ou igual ao segundo.

## Instalação e Importação

O `gte` pode ser importado diretamente do pacote de sparks:

```javascript
import { gte } from '@nodusjs/std/spark';
```

## Possíveis Usos

Assim como outros operadores de comparação, o `gte` é ideal para ser usado como um filtro condicional, permitindo que uma lógica seja executada apenas se um valor atingir um determinado limite.

### Uso 1: Como Filtro em um Dataflow com `Echo` (Uso Mais Comum)

Você pode usar o `gte` em um pipeline de `Echo` para acionar uma ação quando um valor atinge ou ultrapassa um limite.

**Cenário**: Uma barra de progresso em um jogo dispara um evento `xp-gained` com a experiência total do jogador. Um componente de "nível" deve exibir uma mensagem de "Nível Subiu\!" assim que a experiência for maior ou igual a 1000.

**HTML:**

```html
<level-notifier on="*/xp-gained:setter/levelUp|gte=1000"></level-notifier>
```

**Fluxo:**

1.  O evento `xp-gained` ocorre com `detail: 1025`.
2.  O spark `gte=1000` é acionado, executando `gte(1025, 1000)`.
3.  O resultado é `true`.
4.  O valor `true` é passado para o setter `levelUp` do componente `<level-notifier>`.

### Uso 2: Validação de Entradas e Lógica de Negócio

Programaticamente, `gte` é útil para validar se um valor atende a um requisito mínimo.

**Cenário**: Um formulário de inscrição para um evento online requer que o participante tenha pelo menos 18 anos.

```javascript
import { gte } from '@nodusjs/std/spark';

class SignupForm extends HTMLElement {
  validateAge() {
    const ageInput = this.querySelector('#age-input');
    const idadeDigitada = ageInput.value; // ex: "18" (string)
    const idadeMinima = 18; // número

    // 'gte' lida com a conversão de string para número automaticamente.
    if (gte(idadeDigitada, idadeMinima)) {
      console.log('Idade válida. Inscrição permitida.');
      // Lógica para permitir o envio do formulário
    } else {
      console.log('O participante deve ter 18 anos ou mais.');
      // Lógica para bloquear o envio
    }
  }
}
```

## Descrição Técnica

A implementação do `gte` é focada em garantir que a comparação seja sempre numérica, o que a torna robusta para casos de uso na web.

```javascript
function gte(x, y) {
  return Number(x) >= Number(y); //
}
```

Ao converter ambos os operandos para `Number` antes da comparação, o `gte` evita erros comuns ao lidar com valores que vêm de atributos HTML ou outros dados do DOM, que são frequentemente strings.
