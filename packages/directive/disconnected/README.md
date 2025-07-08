# Decorator `@disconnected`

O decorator `@disconnected` oferece uma maneira declarativa e segura de executar uma lógica de limpeza no exato momento em que um Custom Element é removido do DOM.

## Instalação e Importação

Este decorator faz parte do pacote `@nodusjs/std` e pode ser importado do módulo `directive`:

```javascript
import { disconnected } from '@nodusjs/std/directive';
```

## Como Usar

Aplique o decorator `@disconnected` diretamente sobre o método da classe que deve ser executado quando o componente for removido da página. É o local perfeito para tarefas de "limpeza".

### Exemplo de Uso

O caso de uso mais importante para o `@disconnected` é prevenir vazamentos de memória (memory leaks), limpando recursos que foram alocados quando o componente foi conectado, como `setIntervals`, `WebSockets` ou `EventListeners` globais.

```javascript
import { disconnected, define } from '@nodusjs/std/directive';

@define('live-clock')
class LiveClock extends HTMLElement {
  private intervalId: number;

  // Quando o relógio é adicionado à página, iniciamos um intervalo.
  connectedCallback() {
    this.intervalId = setInterval(() => {
      this.textContent = `Horário: ${new Date().toLocaleTimeString()}`;
    }, 1000);
  }

  /**
   * Este método é chamado automaticamente pelo @disconnected
   * quando o elemento <live-clock> é removido do DOM.
   * Se não limpássemos o intervalo, ele continuaria rodando
   * para sempre em segundo plano, causando um memory leak.
   */
  @disconnected
  cleanup() {
    console.log('Relógio removido, limpando o intervalo.');
    clearInterval(this.intervalId);
  }
}
```

## Descrição

O decorator `@disconnected` é um atalho para o método de ciclo de vida `disconnectedCallback()` dos Web Components. Em vez de implementar o `disconnectedCallback` manualmente, você pode simplesmente decorar um método com um nome mais descritivo (como `cleanup`, `destroy` ou `teardown`) para executar sua lógica de finalização.

Internamente, o decorator utiliza um interceptor para se acoplar ao `disconnectedCallback`, garantindo que o método decorado seja chamado de forma organizada e previsível, sem sobrescrever qualquer outra lógica que possa existir no `disconnectedCallback` original do componente.
