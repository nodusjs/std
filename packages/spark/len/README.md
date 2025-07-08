# Spark: `len`

O `len` (uma abreviação para *length*) é um helper do pacote `@nodusjs/std/spark` que retorna de forma segura o número de chaves de um objeto, o número de elementos de um array ou o número de caracteres de uma string.

## Instalação e Importação

O `len` pode ser importado diretamente do pacote de sparks:

```javascript
import { len } from '@nodusjs/std/spark';
```

## Possíveis Usos

O `len` é extremamente útil para obter contagens em um fluxo de dados ou para realizar verificações seguras no seu código antes de tentar iterar sobre um valor.

### Uso 1: Contando Itens em um Dataflow com `Echo`

Este é um caso de uso muito comum: você tem um evento que carrega uma lista de itens e quer exibir a quantidade de itens em outro componente.

**Cenário**: Um componente de busca dispara um evento `results-found` com um array de produtos no `event.detail`. Um componente de cabeçalho ouve esse evento e usa `len` para exibir "Encontrados X resultados".

**HTML:**

```html
<search-summary on="*/results-found:setter/resultCount|len"></search-summary>
```

**Fluxo:**

1.  O evento ocorre com `detail: [item1, item2, item3, item4, item5]`.
2.  O spark `len` é acionado, executando `len([...])`.
3.  O resultado `5` é passado para o setter `resultCount` do componente `<search-summary>`.

### Uso 2: Compondo Sparks para Lógica Condicional

A verdadeira força dos sparks está em sua capacidade de serem compostos. Você pode usar o resultado do `len` como entrada para outro spark, como o `gt` (greater than).

**Cenário**: Exibir um aviso no carrinho de compras apenas se o número de itens for maior que 5.

**HTML:**

```html
<cart-warning on="*/cart-updated:setter/show|len|gt=5"></cart-warning>
```

**Fluxo:**

1.  O evento `cart-updated` ocorre com um array de 7 itens.
2.  O spark `len` transforma o array no número `7`.
3.  O número `7` é passado para o próximo spark, `gt=5`, que executa `gt(7, 5)` e retorna `true`.
4.  O valor `true` é passado para o setter `show` do componente `<cart-warning>`.

### Uso 3: Verificações Seguras no Código

Programaticamente, `len` é uma forma segura de verificar se um objeto ou array tem conteúdo antes de processá-lo, pois ele lida com valores `null` ou `undefined` sem gerar erros.

```javascript
import { len } from '@nodusjs/std/spark';

function processItems(items) { // items pode ser um array, null ou undefined
  // Se 'items' for null, len(items) retornará 0, evitando um erro.
  if (len(items) > 0) {
    console.log(`Processando ${len(items)} itens...`);
    // ... lógica de processamento
  } else {
    console.log('Nenhum item para processar.');
  }
}

processItems(['a', 'b']); // Log: Processando 2 itens...
processItems(null);       // Log: Nenhum item para processar.
```

## Descrição Técnica

A implementação do `len` usa o operador de coalescência nula (`??`) para garantir que, se o valor de entrada for `null` ou `undefined`, ele seja tratado como um objeto vazio, retornando `0` e prevenindo erros.

```javascript
function len(x) {
  return Object.keys(x ?? {})?.length; //
}
```

Como ele utiliza `Object.keys`, ele funciona para objetos, arrays e strings, retornando o número de chaves ou o comprimento de forma consistente.
