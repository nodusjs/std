# Spark: `equals`

O `equals` é um helper do pacote `@nodusjs/std/spark` que compara dois valores e retorna `true` se eles forem considerados iguais.

## Instalação e Importação

O `equals` pode ser importado diretamente do pacote de sparks:

```javascript
import { equals } from '@nodusjs/std/spark';
```

## Nota Importante: Comparação Não-Estrita (`==`)

Assim como o `different`, o `equals` utiliza intencionalmente o operador de igualdade não-estrita (`==`) em vez do estrito (`===`).

**Por quê?** No contexto de Web Components, é muito comum comparar valores de atributos (que são sempre `string`) com valores `number` ou `boolean` do JavaScript. A comparação não-estrita faz a conversão de tipo necessária para que essas comparações funcionem de forma intuitiva.

**Exemplo Prático da Comparação:**

```javascript
equals('10', 10); // Retorna true (porque 10 é igual a 10)
equals(1, true);  // Retorna true (porque 1 é igual a true após coerção)
equals(0, false); // Retorna true

equals('10', 5);   // Retorna false
```

## Possíveis Usos

O `equals` é ideal para ser usado como um "portão" ou filtro em um fluxo de dados, permitindo que uma ação prossiga apenas se uma condição de igualdade for atendida.

### Uso 1: Filtrando Eventos com `Echo` (Uso Mais Comum)

Este é o principal caso de uso do `equals`. Você pode usá-lo em um pipeline de `Echo` para garantir que um componente só reaja a um evento se o dado carregado por ele corresponder a um valor específico.

**Cenário**: Um sistema de abas dispara um evento `tab-changed` com o ID da nova aba selecionada. Um painel de conteúdo específico deve se tornar visível apenas se o ID da aba for `"profile"`.

**HTML:**

```html
<profile-panel on="*/tab-changed:setter/visible|equals=profile"></profile-panel>
```

**Fluxo:**

1.  O evento `tab-changed` ocorre com `detail: "profile"`.
2.  O spark `equals=profile` é acionado, executando `equals("profile", "profile")`.
3.  O resultado é `true`.
4.  O valor `true` é passado para o setter `visible` do componente `<profile-panel>`.

### Uso 2: Lógica Condicional em Componentes

Você pode usar o `equals` programaticamente para simplificar comparações onde os tipos podem ser mistos.

**Cenário**: Um componente precisa verificar se um `data-id` vindo do HTML corresponde a um `id` numérico vindo de uma API.

```javascript
import { equals } from '@nodusjs/std/spark';

class DataItem extends HTMLElement {
  apiId = 123; // um número

  checkIfSelected() {
    const selectedId = this.dataset.selectedId; // uma string, ex: "123"

    // 'equals' faz a comparação segura entre string e número.
    if (equals(selectedId, this.apiId)) {
      console.log('Este item está selecionado!');
      this.classList.add('selected');
    }
  }
}
```

## Descrição Técnica

A implementação do `equals` é direta e foi projetada para ser flexível em um ambiente web.

```javascript
function equals(x, y) {
  return x == y; //
}
```

A escolha deliberada pelo `==` permite que o `equals` funcione de maneira robusta ao lidar com a natureza de "tudo é string" dos atributos HTML.
