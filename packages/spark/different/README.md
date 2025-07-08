# Spark: `different`

O `different` é um helper do pacote `@nodusjs/std/spark` que compara dois valores e retorna `true` se eles forem diferentes.

## Instalação e Importação

O `different` pode ser importado diretamente do pacote de sparks:

```javascript
import { different } from '@nodusjs/std/spark';
```

## Nota Importante: Comparação Não-Estrita (`!=`)

O `different` utiliza intencionalmente o operador de desigualdade não-estrita (`!=`) em vez do estrito (`!==`).

**Por quê?** No contexto do HTML e de Web Components, os valores de atributos são sempre strings. Se usássemos uma comparação estrita, a comparação entre o atributo `value="5"` (string) e o número `5` (number) seria `true` (pois `string` é diferente de `number`), o que geralmente não é o comportamento desejado.

A comparação não-estrita realiza a coerção de tipo antes de comparar, permitindo uma verificação mais flexível e intuitiva no ambiente do DOM.

**Exemplo Prático da Comparação:**

```javascript
different('10', 10); // Retorna false (porque 10 não é diferente de 10)
different(1, true);  // Retorna false (porque 1 não é diferente de true após coerção)
different(0, false); // Retorna false

different('10', 5);   // Retorna true
```

## Possíveis Usos

O `different` é extremamente útil para otimizações e lógicas condicionais.

### Uso 1: Prevenindo Re-renders Desnecessários (Uso Mais Comum)

Este é o principal caso de uso. Antes de atualizar uma propriedade e disparar um `@repaint` (que é uma operação custosa), você pode usar `different` para verificar se o novo valor é realmente diferente do valor atual.

```javascript
import { define } from '@nodusjs/std/directive';
import { paint, repaint, html } from '@nodusjs/std/dom';
import { different } from '@nodusjs/std/spark';

@define('optimized-display')
@paint((el) => html`<span>${el.data}</span>`)
class OptimizedDisplay extends HTMLElement {
  
  private _data = '';

  @repaint
  set data(newValue) {
    // A verificação com 'different' previne que o @repaint
    // seja acionado se o novo valor for igual ao antigo.
    if (different(newValue, this._data)) {
      console.log(`Valor mudou de "${this._data}" para "${newValue}". Re-renderizando.`);
      this._data = newValue;
    } else {
      console.log(`Valor "${newValue}" é o mesmo. Nenhuma ação necessária.`);
    }
  }
}
```

### Uso 2: Como Condicional em um Dataflow com `Echo`

Em um pipeline de `Echo`, o `different` pode atuar como um portão, permitindo que o fluxo de dados continue apenas se o valor for diferente de um valor específico.

**Cenário**: Um componente deve reagir a um evento `change-status`, mas apenas se o novo status não for `"pending"`.

**HTML:**

```html
<task-item on="*/change-status:setter/updateStatus|different=pending"></task-item>
```

## Descrição Técnica

A implementação do `different` é direta e explora a coerção de tipo do JavaScript para ser mais eficaz no contexto do DOM.

```javascript
function different(x, y) {
  return x != y; //
}
```
