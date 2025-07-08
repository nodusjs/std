# Decorator `@formDisabled`

O decorator `@formDisabled` oferece um gancho para reagir quando o estado de "desabilitado" de um Custom Element é alterado por seu formulário pai.

## Instalação e Importação

Este decorator faz parte do pacote `@nodusjs/std` e pode ser importado do módulo `directive`:

```javascript
import { formDisabled } from '@nodusjs/std/directive';
```

## Como Usar

Assim como outros decorators relacionados a formulários, `@formDisabled` requer que a classe do seu Custom Element tenha a propriedade estática `formAssociated` definida como `true` e que `this.attachInternals()` seja chamado no construtor.

O método decorado com `@formDisabled` receberá automaticamente um argumento booleano que indica o novo estado ( `true` para desabilitado, `false` para habilitado).

### Exemplo de Uso

Neste exemplo, criamos um botão customizado que altera sua aparência e comportamento quando seu estado `disabled` é modificado pelo formulário (por exemplo, ao ser colocado dentro de um `<fieldset disabled>`).

```javascript
import { formDisabled, define } from '@nodusjs/std/directive';

@define('my-submit-button')
class MySubmitButton extends HTMLElement {
  // Pré-requisitos para associação com formulários
  static formAssociated = true;
  private internals: ElementInternals;
  private button: HTMLButtonElement;

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.innerHTML = `<button type="submit">Enviar</button>`;
    this.button = this.querySelector('button');
  }

  /**
   * Este método é invocado pelo decorator @formDisabled.
   * O argumento 'disabled' (true ou false) é passado automaticamente.
   */
  @formDisabled
  handleDisabledState(disabled: boolean) {
    console.log(`O componente foi ${disabled ? 'desabilitado' : 'habilitado'}.`);

    // Repassa o estado 'disabled' para o botão interno para
    // que ele pareça e se comporte como um botão desabilitado nativo.
    this.button.disabled = disabled;
  }
}
```

**No HTML:**

```html
<form>
  <fieldset id="my-fieldset">
    <my-submit-button></my-submit-button>
  </fieldset>
</form>

<script>
  // Ao desabilitar o fieldset, o handleDisabledState(true) será chamado.
  document.getElementById('my-fieldset').disabled = true;
</script>
```

## Descrição

O decorator `@formDisabled` é um atalho para o método de ciclo de vida `formDisabledCallback(disabled)`. Este callback é parte da API de *Form-associated Custom Elements* e é invocado sempre que o estado `disabled` do elemento muda devido à interação com seu formulário pai.

A principal utilidade deste decorator é permitir que seu componente sincronize sua aparência e funcionalidade interna com o estado de desabilitado do formulário, garantindo uma experiência de usuário consistente e acessível. O decorator gerencia a chamada do seu método de forma segura, passando o estado booleano `disabled` e sem interferir em outras lógicas do componente.
