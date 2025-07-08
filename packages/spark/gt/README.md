# Spark: `gt`

O `gt` (uma abreviação para *Greater Than*) é um helper do pacote `@nodusjs/std/spark` que compara dois valores e retorna `true` se o primeiro for estritamente maior que o segundo.

## Instalação e Importação

O `gt` pode ser importado diretamente do pacote de sparks:

```javascript
import { gt } from '@nodusjs/std/spark';
```

## Possíveis Usos

O `gt` é ideal para ser usado como um filtro condicional em um fluxo de dados ou para validações lógicas dentro de um componente.

### Uso 1: Como Filtro em um Dataflow com `Echo` (Uso Mais Comum)

Você pode usar o `gt` em um pipeline de `Echo` para criar um "portão" que só permite a passagem de dados que atendam a um critério numérico.

**Cenário**: Um painel de jogo deve exibir um alerta de "Pontuação Alta\!" somente se a pontuação de um jogador, enviada em um evento `new-score`, ultrapassar 10.000 pontos.

**HTML:**

```html
<highscore-alert on="*/new-score:setter/show|gt=10000"></highscore-alert>
```

**Fluxo:**

1.  O evento `new-score` ocorre com `detail: 12500`.
2.  O spark `gt=10000` é acionado, executando `gt(12500, 10000)`.
3.  O resultado é `true`.
4.  O valor `true` é passado para o setter `show` do componente `<highscore-alert>`. Se a pontuação fosse `9000`, o resultado seria `false`.

### Uso 2: Validação de Dados em Componentes

Programaticamente, `gt` é útil para validar entradas de usuário ou outras lógicas de negócio, especialmente quando os tipos podem ser mistos (string e número).

**Cenário**: Um formulário de doação requer que o valor inserido seja maior que um mínimo de R$ 5,00.

```javascript
import { gt } from '@nodusjs/std/spark';

class DonationWidget extends HTMLElement {
  validateInput() {
    const input = this.querySelector('input');
    const valorDigitado = input.value; // ex: "10" (string)
    const minimo = 5; // número

    // 'gt' converte a string "10" para o número 10 antes de comparar.
    if (gt(valorDigitado, minimo)) {
      console.log('Obrigado! Doação válida.');
      input.setCustomValidity('');
    } else {
      console.log('O valor deve ser maior que R$ 5,00.');
      input.setCustomValidity('Valor muito baixo.');
    }
    input.reportValidity();
  }
}
```

## Descrição Técnica

A implementação do `gt` garante que a comparação seja sempre numérica, convertendo ambos os argumentos para `Number` antes da verificação.

```javascript
function gt(x, y) {
  return Number(x) > Number(y); //
}
```

Essa conversão explícita é o que torna o `gt` robusto, permitindo comparar de forma segura um valor de atributo (string) com um número de referência do JavaScript, evitando resultados inesperados.
