# Decorator `@formAssociated`

O decorator `@formAssociated` simplifica a interação com formulários, executando um método de classe sempre que um Custom Element é associado a um elemento `<form>` no DOM.

## Instalação e Importação

Este decorator faz parte do pacote `@nodusjs/std` e pode ser importado do módulo `directive`:

```javascript
import { formAssociated } from '@nodusjs/std/directive';
```

## Como Usar

Para que um Custom Element possa ser associado a um formulário, ele precisa atender a dois pré-requisitos da especificação de Web Components:

1.  A classe deve ter a propriedade estática `formAssociated` definida como `true`.
2.  Você deve chamar `this.attachInternals()` no construtor para obter acesso ao objeto `ElementInternals`.

O decorator `@formAssociated` então se encarrega de acionar seu método quando o `formAssociatedCallback` do ciclo de vida for chamado.

### Exemplo de Uso

Neste exemplo, usamos o decorator para obter uma referência ao formulário ao qual nosso componente customizado foi associado.

```javascript
import { formAssociated, define } from '@nodusjs/std/directive';

@define('custom-input')
class CustomInput extends HTMLElement {
  // Pré-requisito 1: Habilita a associação com formulários.
  static formAssociated = true;

  private internals: ElementInternals;
  private parentForm: HTMLFormElement | null = null;

  constructor() {
    super();
    // Pré-requisito 2: Anexa o 'ElementInternals'.
    this.internals = this.attachInternals();
  }

  /**
   * Este método é invocado pelo decorator @formAssociated.
   * O argumento 'form' é passado automaticamente pelo ciclo de vida
   * e contém a referência para o elemento <form>.
   */
  @formAssociated
  handleFormAssociation(form: HTMLFormElement) {
    console.log('Meu componente foi associado a este formulário:', form);
    this.parentForm = form;
    // Agora podemos, por exemplo, ouvir o evento de submit do formulário.
    form.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit = (event: Event) => {
    // Lógica para quando o formulário for enviado.
  }
}
```

## Descrição

O decorator `@formAssociated` é um atalho para o método de ciclo de vida `formAssociatedCallback(form)`. Este callback é parte da API de *Form-associated Custom Elements*, que permite que seus componentes se comportem como campos de formulário nativos (como `<input>`, `<select>`, etc.).

A principal função deste callback (e, por consequência, do decorator) é dar ao seu componente uma referência ao formulário ao qual ele pertence. Isso é útil para:

  - Acessar outros campos do mesmo formulário.
  - Ouvir eventos do formulário, como `submit` ou `reset`.
  - Sincronizar o estado ou a validação com o formulário pai.

O decorator `@formAssociated` gerencia a chamada do seu método de forma segura, garantindo que ele seja executado com o argumento `form` correto e sem interferir em outras lógicas do componente.
