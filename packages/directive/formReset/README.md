# Decorator `@formReset`

O decorator `@formReset` oferece um gancho para executar uma lógica específica quando o formulário ao qual um Custom Element está associado é resetado.

## Instalação e Importação

Este decorator faz parte do pacote `@nodusjs/std` e pode ser importado do módulo `directive`:

```javascript
import { formReset } from '@nodusjs/std/directive';
```

## Como Usar

Assim como outros decorators de formulário, o `@formReset` requer que a classe do Custom Element tenha a propriedade estática `formAssociated` definida como `true` e que `this.attachInternals()` seja chamado no construtor.

O método decorado com `@formReset` é o lugar ideal para restaurar o estado interno do seu componente para seus valores iniciais.

### Exemplo de Uso

Neste exemplo, criamos um campo de texto customizado que, ao ser resetado pelo formulário, volta ao seu valor original em vez de simplesmente ficar em branco.

```javascript
import { formReset, define } from '@nodusjs/std/directive';

@define('resettable-input')
class ResettableInput extends HTMLElement {
  // Pré-requisitos para associação com formulários
  static formAssociated = true;
  private internals: ElementInternals;
  private input: HTMLInputElement;
  private initialValue: string = '';

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.innerHTML = `<input type="text">`;
    this.input = this.querySelector('input');
  }

  // Guarda o valor inicial quando o componente entra no DOM
  connectedCallback() {
    this.initialValue = this.getAttribute('value') || '';
    this.input.value = this.initialValue;
  }

  /**
   * Este método é invocado pelo decorator @formReset quando
   * o <form> pai dispara o evento de reset.
   */
  @formReset
  handleFormReset() {
    console.log('Formulário resetado! Restaurando o valor para:', this.initialValue);
    // Restaura o valor do input para o estado inicial
    this.input.value = this.initialValue;
    // Atualiza o valor interno do formulário
    this.internals.setFormValue(this.input.value);
  }
}
```

**No HTML:**

```html
<form>
  <resettable-input value="Valor Padrão"></resettable-input>
  <button type="reset">Resetar Formulário</button>
</form>
```

Ao clicar no botão "Resetar Formulário", o método `handleFormReset` será chamado.

## Descrição

O decorator `@formReset` é um atalho para o método de ciclo de vida `formResetCallback()`. Este callback é parte da API de *Form-associated Custom Elements* e é invocado para notificar o componente de que ele deve restaurar seu estado.

A principal utilidade deste decorator é permitir que seus componentes se comportem como elementos de formulário nativos, limpando ou restaurando seus valores para um estado padrão quando o usuário aciona a ação de reset do formulário. O decorator gerencia a chamada do seu método de forma segura e previsível, sem a necessidade de implementar o `formResetCallback` manualmente.
