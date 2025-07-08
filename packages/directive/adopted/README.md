# Decorator `@adopted`

O decorator `@adopted` permite que um método de classe seja executado automaticamente sempre que um Custom Element for movido de um documento para outro (por exemplo, de um documento principal para um `<iframe>`).

## Instalação e Importação

O decorator faz parte do pacote `@nodusjs/std` e pode ser importado da seguinte maneira:

```javascript
import { adopted } from '@nodusjs/std/directive';
```

## Como Usar

Aplique o decorator `@adopted` diretamente sobre o método que você deseja executar quando o evento de "adoção" ocorrer.

```javascript
import { adopted, define } from '@nodusjs/std/directive';

// Define o custom element para que ele seja reconhecido pelo navegador
@define('my-element')
class MyElement extends HTMLElement {

  /**
   * O método 'onAdopted' será invocado automaticamente
   * quando a instância de 'my-element' for movida para um novo documento.
   */
  @adopted
  onAdopted() {
    console.log('Elemento foi movido para outro documento!');
    // Aqui você pode adicionar lógica para reconfigurar o estado do componente,
    // se necessário.
  }
}

// Exemplo de como o evento seria acionado:
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);

const myElementInstance = document.createElement('my-element');
// Ao mover o elemento para o documento do iframe, o 'adoptedCallback' é disparado.
iframe.contentDocument.body.appendChild(myElementInstance);
```

## Descrição

O decorator `@adopted` serve como um atalho para o hook de ciclo de vida `adoptedCallback` dos Web Components. Sua função é registrar um método para ser executado quando o elemento é "adotado" por um novo `document`.

Internamente, ele utiliza a função `execute` para se acoplar de forma segura ao `adoptedCallback` do protótipo do elemento. Isso garante que, mesmo se houver outra lógica no `adoptedCallback` original, ela será preservada e o método decorado com `@adopted` será executado na sequência.
