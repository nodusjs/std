# Decorator `@connected`

O decorator `@connected` oferece uma maneira declarativa e limpa de executar uma lógica de inicialização no momento exato em que um Custom Element é inserido no DOM.

## Instalação e Importação

Este decorator faz parte do pacote `@nodusjs/std` e pode ser importado do módulo `directive`:

```javascript
import { connected } from '@nodusjs/std/directive';
```

## Como Usar

Aplique o decorator `@connected` diretamente sobre o método da classe que deve ser executado quando o componente for conectado à página.

### Exemplo de Uso

Neste exemplo, o método `initializeComponent` será invocado automaticamente assim que o elemento `<my-element>` for adicionado ao documento HTML.

```javascript
import { connected, define } from '@nodusjs/std/directive';

@define('my-element')
class MyElement extends HTMLElement {
  /**
   * Este método é executado automaticamente pelo decorator @connected.
   * É o lugar ideal para realizar configurações iniciais, buscar dados
   * ou manipular o DOM do componente pela primeira vez.
   */
  @connected
  initializeComponent() {
    console.log('Componente conectado ao DOM.');
    this.textContent = 'Olá, mundo! Estou pronto.';
  }
}
```

**No HTML:**

```html
<my-element></my-element>
```

## Descrição

O decorator `@connected` é um atalho para o método de ciclo de vida `connectedCallback()` dos Web Components. Em vez de implementar o `connectedCallback` manualmente, você pode simplesmente decorar um método com um nome mais significativo (como `initialize`, `setup`, ou `fetchData`) para executar sua lógica de inicialização.

Internamente, o decorator utiliza um interceptor para se acoplar ao `connectedCallback` do ciclo de vida. Isso garante que o método decorado seja chamado de forma organizada e previsível, sem sobrescrever qualquer outra lógica que possa existir no `connectedCallback` original. É a ferramenta perfeita para qualquer tarefa que precise acontecer assim que o elemento se torna "vivo" na página.
