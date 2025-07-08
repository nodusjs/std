# Decorator `@define`

O decorator `@define` simplifica o processo de registro de uma classe como um Custom Element. Ele atua como um invólucro conveniente e seguro para a API padrão do navegador `customElements.define()`.

## Instalação e Importação

O decorator faz parte do pacote `@nodusjs/std` e pode ser importado do módulo `directive`:

```javascript
import { define } from '@nodusjs/std/directive';
```

## Como Usar

`@define` é um decorator de fábrica que deve ser aplicado diretamente sobre a classe que você deseja registrar como um Custom Element.

  - **`name` (string):** O nome da tag do Custom Element (ex: `'my-component'`). Deve conter um hífen.
  - **`options` (ElementDefinitionOptions):** (Opcional) Um objeto de configuração, usado principalmente para criar elementos embutidos customizados (que estendem elementos HTML nativos como `<div>` ou `<p>`).

### Exemplo 1: Elemento Autônomo (Uso Comum)

Este é o caso de uso mais comum, onde você cria um elemento totalmente novo que estende `HTMLElement`.

```javascript
import { define } from '@nodusjs/std/directive';

@define('my-widget')
class MyWidget extends HTMLElement {
  constructor() {
    super();
    this.textContent = 'Este é o meu widget!';
  }
}
```

**No HTML:**

```html
<my-widget></my-widget>
```

### Exemplo 2: Elemento Embutido Customizado

Você também pode usar `@define` para estender elementos HTML existentes, como `<div>`, `<a>`, ou `<button>`.

```javascript
import { define } from '@nodusjs/std/directive';

// Estende a funcionalidade de um <div> nativo
@define('expanding-div', { extends: 'div' })
class ExpandingDiv extends HTMLDivElement {
  constructor() {
    super();
    this.style.backgroundColor = 'lightblue';
    this.addEventListener('focus', () => this.textContent = 'Focado!');
    this.addEventListener('blur', () => this.textContent = 'Fora de foco.');
  }
}
```

**No HTML:**

```html
<div is="expanding-div" tabindex="0">Clique aqui</div>
```

## Descrição

O decorator `@define` envolve a chamada `customElements.define(name, constructor, options)`, mas com uma vantagem crucial de segurança: **ele evita erros de redefinição**.

Antes de tentar registrar um novo elemento, o decorator primeiro verifica se um elemento com o mesmo nome já foi definido, usando `customElements.get(name)`. Se o elemento já existir, nenhuma ação é tomada, prevenindo erros de "já definido" que são comuns em aplicações grandes ou em ambientes de desenvolvimento com recarregamento rápido (hot-reload). Se não existir, ele prossegue com o registro.
