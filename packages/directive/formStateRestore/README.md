# Decorator `@formState-Restore`

O decorator `@formStateRestore` oferece um gancho para quando o navegador tenta restaurar o estado de um Custom Element associado a um formulário. Isso geralmente acontece quando o usuário navega para frente e para trás no histórico do navegador.

## Instalação e Importação

Este decorator faz parte do pacote `@nodusjs/std` e pode ser importado do módulo `directive`:

```javascript
import { formStateRestore } from '@nodusjs/std/directive';
```

## Como Usar

Assim como os outros decorators de formulário, `@formStateRestore` requer que a classe tenha `static formAssociated = true` e que `this.attachInternals()` seja chamado.

O método decorado receberá dois argumentos passados pelo navegador:

  - **`state`**: O estado a ser restaurado. Pode ser uma string, um `File`, ou um `FormDataEntry`, dependendo de como foi definido com `ElementInternals.setFormValue()`.
  - **`mode`**: Uma string que pode ser `"restore"` (navegação de histórico) ou `"autocomplete"` (preenchimento automático do navegador).

### Exemplo de Uso

Neste exemplo, criamos um campo customizado que salva seu estado através do `setFormValue` e o restaura quando o `formStateRestoreCallback` é acionado pelo navegador.

```javascript
import { formStateRestore, define } from '@nodusjs/std/directive';

@define('state-aware-input')
class StateAwareInput extends HTMLElement {
  // Pré-requisitos para associação com formulários
  static formAssociated = true;
  private internals: ElementInternals;
  private input: HTMLInputElement;

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.innerHTML = `<input type="text" placeholder="Digite algo...">`;
    this.input = this.querySelector('input');

    // Sempre que o valor muda, informamos à API de formulários
    // para que ela possa salvá-lo no histórico.
    this.input.addEventListener('input', () => {
      this.internals.setFormValue(this.input.value);
    });
  }

  /**
   * Este método é invocado pelo decorator @formStateRestore.
   * Ele recebe o estado salvo e o modo de restauração.
   */
  @formStateRestore
  handleFormStateRestore(state: string, mode: 'restore' | 'autocomplete') {
    console.log(`Restaurando estado! Modo: ${mode}, Valor: ${state}`);

    // Aplica o valor restaurado de volta ao nosso input.
    this.input.value = state;
  }
}
```

## Descrição

O decorator `@formStateRestore` é um atalho para o método de ciclo de vida `formStateRestoreCallback(state, mode)`. Este callback é a parte final da API de *Form-associated Custom Elements* e é crucial para garantir que seus componentes customizados se comportem como os nativos em cenários de navegação no histórico.

Quando um usuário preenche um formulário, navega para outra página e depois clica em "Voltar", o navegador tenta restaurar os valores que ele digitou. O `@formStateRestore` permite que seu componente participe desse processo, recebendo o valor salvo (`state`) e aplicando-o novamente, melhorando significativamente a experiência do usuário.
