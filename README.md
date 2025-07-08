# @nodusjs/std

`@nodusjs/std` é a biblioteca de utilitários padrão do ecossistema Nodus. Ela fornece diretivas, helpers DOM e um pilar de dataflow declarativo que simplificam a construção de Web Components modernos, reativos e fáceis de manter.

Com uma abordagem baseada em decorators, `@nodusjs/std` permite que você se conecte ao ciclo de vida dos componentes e responda a eventos de forma limpa e intuitiva.

> ⚠️ **Este projeto está em desenvolvimento ativo.** As APIs e os pacotes podem mudar entre as versões menores.

## Princípios

  - **Declarativo:** Escreva o que seu componente *faz*, não como ele o faz. Decorators como `@paint`, `@repaint` e `@event` abstraem a manipulação manual do DOM.
  - **Reativo:** Crie componentes que reagem a mudanças de estado automaticamente. O dataflow integrado facilita a comunicação entre componentes.
  - **Moderno:** Construído sobre as APIs nativas da plataforma web, como Custom Elements, Shadow DOM e `adoptedStyleSheets`, garantindo performance e interoperabilidade.
  - **Modular:** Importe apenas o que você precisa, mantendo seus componentes leves e eficientes.

## Instalação

Você pode adicionar o `@nodusjs/std` ao seu projeto usando seu gerenciador de pacotes preferido ou diretamente no navegador através de uma CDN.

### 1\. Usando um Gerenciador de Pacotes

```bash
# npm
npm install @nodusjs/std

# yarn
yarn add @nodusjs/std

# bun
bun add @nodusjs/std
```

**Importação:**

```javascript
import { define, attributeChanged } from "@nodusjs/std/directive";
import { paint, repaint, html, css } from "@nodusjs/std/dom";
import on from "@nodusjs/std/event";
```

### 2\. Usando via CDN

Para prototipagem rápida ou uso em plataformas como CodePen e JSFiddle, você pode importar os módulos diretamente da CDN `esm.sh`.

```javascript
import { define } from "https://esm.sh/@nodusjs/std/directive";
import { paint, html, css } from "https://esm.sh/@nodusjs/std/dom";
import on from "https://esm.sh/@nodusjs/std/event";
```

## Exemplo Rápido: Um Contador Reativo

O exemplo abaixo demonstra como os diferentes módulos do `@nodusjs/std` trabalham em harmonia para criar um componente de contador interativo e reativo com poucas linhas de código.

```html
<x-counter value="1"></x-counter>
```

```javascript
import {
  attributeChanged,
  define
} from "https://esm.sh/@nodusjs/std/directive";
import { html, paint, repaint, css } from "https://esm.sh/@nodusjs/std/dom";
import on from "https://esm.sh/@nodusjs/std/event";

// 1. Defina o componente e seu nome de tag
@define("x-counter")
// 2. Pinte o componente com seu HTML e CSS iniciais
@paint(component, style)
class Counter extends HTMLElement {
  #value;

  get value() {
    return (this.#value ??= 0);
  }

  // 3. Conecte o atributo 'value' à propriedade da classe.
  //    O @repaint garante que o componente será re-renderizado
  //    sempre que a propriedade 'value' for alterada.
  @attributeChanged("value", Number)
  @repaint
  set value(value) {
    this.#value = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // 4. Ouça o evento de 'click' no botão e execute a lógica.
  @on.click("button")
  click() {
    this.value += 1;
    return this;
  }
}

// 5. Função que descreve a estrutura HTML
function component(counter) {
  return html`
    <button>Count ${counter.value}</button>
  `;
}

// 6. Função que descreve os estilos, que também podem ser reativos!
function style(counter) {
  return css`
    button {
      background-color: hsl(calc(${counter.value} * 3.6), 80%, 60%);
      border: none;
      border-radius: 8px;
      color: #ffffff;
      font-size: 18px;
      font-weight: bold;
      padding: 12px 24px;
      cursor: pointer;
    }
  `;
}
```

## Scripts Úteis

  - `bun dev` — Inicia o servidor de desenvolvimento.
  - `bun run build` — Gera os pacotes para distribuição.
  - `bun run test` — Executa a suíte de testes com Vitest.

## Contribuindo

Contribuições são muito bem-vindas\! Siga nosso [Guia de Contribuição](https://www.google.com/search?q=CONTRIBUTING.md) para reportar bugs, sugerir melhorias e submeter pull requests.

## Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.
