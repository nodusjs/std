# Spark: `subtract`

O `subtract` é um helper do pacote `@nodusjs/std/spark` que subtrai um valor de outro, garantindo que a operação seja sempre matemática.

## Instalação e Importação

O `subtract` pode ser importado diretamente do pacote de sparks:

```javascript
import { subtract } from '@nodusjs/std/spark';
```

## Possíveis Usos

O `subtract` é uma função utilitária ideal para cálculos de "restante", descontos ou qualquer lógica que envolva subtração, tanto em fluxos de dados quanto programaticamente.

### Uso 1: Aplicando Descontos com `Echo`

Em um pipeline de `Echo`, você pode usar `subtract` para aplicar um desconto fixo a um valor recebido de um evento.

**Cenário**: Um componente calcula o preço de um produto e dispara um evento `price-calculated` com o valor total no `event.detail`. Um outro componente, que exibe o preço final, ouve esse evento e aplica um cupom de desconto de R$ 15,00.

**HTML:**

```html
<final-price on="*/price-calculated:setter/finalPrice|subtract=15"></final-price>
```

**Fluxo:**

1.  O evento `price-calculated` ocorre com `detail: 100`.
2.  O spark `subtract=15` é acionado, executando `subtract(100, 15)`.
3.  O resultado `85` é passado para o setter `finalPrice` do componente `<final-price>`.

### Uso 2: Lógica de Cálculo em Componentes

Programaticamente, `subtract` é uma forma segura de realizar subtrações, especialmente quando um dos valores pode vir como uma string.

**Cenário**: Um componente de finanças calcula o saldo restante de uma conta após uma retirada.

```javascript
import { subtract } from '@nodusjs/std/spark';

class AccountWidget extends HTMLElement {
  updateBalance(saldoAtual, valorDaRetirada) {
    // saldoAtual é um número, ex: 200
    // valorDaRetirada pode ser uma string de um input, ex: "50.75"

    // 'subtract' garante que a operação será numérica.
    const novoSaldo = subtract(saldoAtual, valorDaRetirada);
    
    console.log(`Saldo restante: ${novoSaldo.toFixed(2)}`); // "Saldo restante: 149.25"
    this.textContent = `Saldo: ${novoSaldo.toFixed(2)}`;
  }
}
```

## Descrição Técnica

A implementação do `subtract` foca em garantir que a operação seja uma subtração numérica.

```javascript
function subtract(x, y) {
  // O operador de subtração (-) no JavaScript já tenta converter ambos
  // os operandos para número, mas a conversão explícita de 'y'
  // adiciona uma camada de robustez.
  return x - Number(y); //
}
```

Isso previne erros e comportamentos inesperados ao lidar com valores que podem vir como strings, como é comum em atributos HTML e dados de eventos.
