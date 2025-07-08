# Spark: `truthy`

O `truthy` é um helper do pacote `@nodusjs/std/spark` que avalia se um valor pode ser considerado "verdadeiro", seguindo as convenções de atributos booleanos do HTML, em vez das regras padrão do JavaScript.

## Instalação e Importação

O `truthy` pode ser importado diretamente do pacote de sparks:

```javascript
import { truthy } from '@nodusjs/std/spark';
```

## Nota Importante: `truthy` vs. `Boolean()` do JavaScript

É crucial entender que `truthy` **não se comporta** como a conversão padrão para booleano do JavaScript. Ele foi projetado para interpretar corretamente os valores de atributos HTML.

| Valor | `Boolean(valor)` (JavaScript Padrão) | `truthy(valor)` (Resultado do Spark) | Motivo |
| :--- | :--- | :--- | :--- |
| `"false"` | `true` | `false` | `truthy` entende a string "false" como falso. |
| `"0"` | `true` | `false` | `truthy` entende a string "0" como falso. |
| `""` | `false` | `true` | `truthy` considera um atributo presente (mesmo que vazio) como verdadeiro. |
| `"no"` | `true` | `false` | `truthy` entende a string "no" como falso. |
| `null` | `false` | `false` | Ambos consideram `null` como falso. |

`truthy` foi feito para responder à pergunta: "No contexto de um atributo HTML, este valor significa 'sim' ou 'não'?"

## Possíveis Usos

O principal uso do `truthy` é como um filtro para converter valores de atributos em booleanos reais para a lógica do seu componente.

### Uso 1: Convertendo Atributos com `@attributeChanged` (Uso Principal)

Este é o caso de uso canônico. Web Components frequentemente usam atributos como `disabled`, `checked` ou `open`. O valor desses atributos no DOM é sempre uma string. `truthy` é a ferramenta perfeita para traduzir isso.

**Cenário**: Um componente customizado tem um atributo `disabled`. Queremos que a propriedade `isDisabled` na nossa classe seja um booleano de verdade.

```javascript
import { define, attributeChanged } from '@nodusjs/std/directive';
import { truthy } from '@nodusjs/std/spark';

@define('my-button')
class MyButton extends HTMLElement {
  
  // O filtro 'truthy' converte o valor do atributo 'disabled'
  // (que pode ser "", "true", "false", etc.) em um booleano.
  @attributeChanged('disabled', truthy)
  set isDisabled(value: boolean) {
    // Agora 'value' é um booleano, não uma string!
    console.log(`O botão está desabilitado? ${value}`);
    this.querySelector('button').disabled = value;
  }
}
```

**HTML e Resultados:**

````html
<my-button disabled></my-button> <my-button disabled="true"></my-button> <my-button disabled="false"></my-button> ```

### Uso 2: Normalizando Dados de Eventos com `Echo`

Se um evento pode carregar valores como `"true"` ou `"false"`, você pode usar `truthy` para normalizá-los em um pipeline do `Echo`.

**Cenário**: Um sistema de configuração dispara um evento `feature-toggled` com `detail: "false"`. Um componente precisa reagir a esse valor como um booleano.

**HTML:**
```html
<feature-display on="*/feature-toggled:setter/isEnabled|truthy"></feature-display>
````

**Fluxo:**

1.  O evento ocorre com `detail: "false"`.
2.  O spark `truthy` é acionado, executando `truthy("false")`.
3.  O resultado é `false`.
4.  O valor `false` é passado para o setter `isEnabled`.

## Descrição Técnica

A implementação do `truthy` verifica explicitamente por um conjunto de valores que representam `false` em um contexto de atributos HTML.

```javascript
function truthy(value) {
  if (value === "no") return false;
  if (value === "false") return false;
  if (value === "0") return false;
  if (value === null) return false;
  return true;
}
```

Qualquer valor que não corresponda a `"no"`, `"false"`, `"0"` ou `null` é considerado `true`, incluindo a string vazia (`""`), que é o valor de um atributo booleano quando ele está apenas presente na tag (ex: `<my-element disabled>`).
