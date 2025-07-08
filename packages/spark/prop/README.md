# Spark: `prop`

O `prop` (uma abreviação para *property*) é um helper do pacote `@nodusjs/std/spark` que permite acessar de forma segura uma propriedade aninhada dentro de um objeto, usando uma string como caminho.

## Instalação e Importação

O `prop` pode ser importado diretamente do pacote de sparks:

```javascript
import { prop } from '@nodusjs/std/spark';
```

## Possíveis Usos

O `prop` é a ferramenta ideal para "pinçar" um dado específico de um objeto complexo, como o `detail` de um `CustomEvent`, antes de passá-lo para o próximo estágio de um fluxo de dados.

### Uso 1: Extraindo Dados de Eventos com `Echo` (Uso Mais Comum)

Este é o principal caso de uso do `prop`. Quando um evento carrega um objeto com múltiplos dados, você pode usar `prop` para extrair apenas a informação que seu componente consumidor precisa.

**Cenário**: Um sistema dispara um evento `user-login` com um objeto `detail` contendo várias informações do usuário. Um componente quer exibir apenas o nome do usuário, enquanto outro quer exibir o nível de acesso.

**Objeto do Evento:**

```javascript
// event.detail
{
  user: {
    name: 'Alice',
    level: 'admin',
    preferences: { theme: 'dark' }
  },
  timestamp: 1677696000000
}
```

**HTML:**

```html
<welcome-banner on="*/user-login:setter/userName|prop=detail.user.name"></welcome-banner>

<theme-manager on="*/user-login:setter/theme|prop=detail.user.preferences.theme"></theme-manager>
```

**Fluxo para `<welcome-banner>`:**

1.  O evento `user-login` ocorre, e seu objeto `detail` entra no pipeline.
2.  O spark `prop=detail.user.name` é acionado. Ele navega pelo objeto e extrai o valor `'Alice'`.
3.  A string `'Alice'` é passada para o setter `userName` do componente.

### Uso 2: Acesso Seguro a Propriedades no Código

Programaticamente, `prop` é uma alternativa segura para acessar propriedades aninhadas, pois ele retorna `undefined` em vez de lançar um erro se um caminho intermediário não existir.

**Cenário**: Você recebe um objeto de uma API e não tem certeza se todas as propriedades aninhadas existem.

```javascript
import { prop } from '@nodusjs/std/spark';

const apiResponse = {
  data: {
    user: {
      name: 'Bob'
      // A propriedade 'address' não existe
    }
  }
};

// Acesso tradicional (lançaria um erro se 'address' não existisse)
// const city = apiResponse.data.user.address.city; // TypeError: Cannot read properties of undefined

// Acesso seguro com 'prop'
const city = prop(apiResponse, 'data.user.address.city');

console.log(city); // Retorna undefined, sem quebrar a aplicação.
```

## Descrição Técnica

O `prop` utiliza `new Function()` para criar dinamicamente uma função que acessa o caminho da propriedade fornecida no objeto alvo.

```javascript
function prop(target, path) {
  try {
    return new Function(
      "target",
      `return target${/\[/.test(path) ? "" : "."}${path}`
    )(target);
  } catch (_) {
    return undefined;
  }
}
```

A lógica é envolvida por um bloco `try...catch`, que é o que garante a segurança da operação. Se qualquer parte do caminho não puder ser acessada, a função captura o erro e retorna `undefined`, tornando-a uma ferramenta robusta para lidar com objetos de estrutura incerta.
