# Decorator `@attributeChanged`

O decorator `@attributeChanged` é uma ferramenta poderosa que conecta um *setter* de uma classe a um atributo HTML. Ele monitora o atributo e executa o setter automaticamente sempre que seu valor é alterado, permitindo também a transformação do dado recebido.

## Instalação e Importação

O decorator faz parte do pacote `@nodusjs/std` e pode ser importado do módulo `directive`:

```javascript
import { attributeChanged } from '@nodusjs/std/directive';
```

## Como Usar

`@attributeChanged` é um decorator de fábrica, o que significa que você o invoca como uma função, passando os argumentos de configuração.

  - **`attribute` (string):** O nome do atributo HTML que será observado (ex: `'value'`, `'visible'`).
  - **`filters` (...Function):** (Opcional) Uma ou mais funções que recebem o novo valor do atributo (que é sempre uma string) e o transformam antes de ser passado para o setter.

### Exemplo 1: Uso Básico

Neste exemplo, o setter `username` será chamado toda vez que o atributo `username` do elemento for alterado.

```javascript
import { attributeChanged, define } from '@nodusjs/std/directive';

@define('user-greeting')
class UserGreeting extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Olá, <span>viajante</span>!</h1>`;
  }

  // Vincula o setter 'username' ao atributo 'username'
  @attributeChanged('username')
  set username(newName) {
    // newName é o valor do atributo (ex: "Clebão")
    this.querySelector('span').textContent = newName;
  }
}
```

**No HTML:**

```html
<user-greeting username="Clebão"></user-greeting>
```

### Exemplo 2: Com Filtro de Transformação

É muito comum que atributos representem valores booleanos (`true`/`false`). O decorator facilita a conversão da string do atributo para um booleano real.

```javascript
import { attributeChanged, define } from '@nodusjs/std/directive';

@define('my-modal')
class MyModal extends HTMLElement {
  constructor() {
    super();
    this.style.display = 'none'; // Começa escondido
  }

  // 1. Observa o atributo 'visible'.
  // 2. O valor do atributo (ex: "true") é passado para o filtro.
  // 3. O filtro `value => value === 'true'` retorna um booleano.
  // 4. O booleano é passado para o setter 'visible'.
  @attributeChanged('visible', value => value === 'true')
  set visible(isVisible) {
    console.log(`O modal está visível? ${isVisible}`); // true ou false
    this.style.display = isVisible ? 'block' : 'none';
  }
}
```

## Descrição

O decorator `@attributeChanged` abstrai duas tarefas manuais e repetitivas no desenvolvimento de Web Components:

1.  **Registro Automático de Atributos:** Ele adiciona automaticamente o nome do atributo ao array estático `observedAttributes` da classe, o que é necessário para que o `attributeChangedCallback` seja disparado.
2.  **Roteamento e Transformação:** Ele intercepta o `attributeChangedCallback`, verifica se o atributo alterado é o que está sendo observado e, em caso afirmativo, passa o novo valor através da cadeia de filtros antes de invocar o setter correspondente.

Isso mantém o código do componente mais limpo e declarativo, concentrando a lógica de reação a mudanças de atributos diretamente no setter responsável.
