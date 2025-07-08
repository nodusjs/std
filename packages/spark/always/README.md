# Spark: `always`

O `always` é um helper do pacote `@nodusjs/std/spark`. Sua função é muito simples, mas poderosa: ele **ignora o valor atual** em um fluxo de dados e o **substitui por um valor fixo** que você define.

## Instalação e Importação

O `always` pode ser importado diretamente do pacote de sparks:

```javascript
import { always } from '@nodusjs/std/spark';
```

## Possíveis Usos

O `always` é quase exclusivamente utilizado como um "pipe" no atributo `on` do mixin `Echo`, onde seu propósito é descartar o dado de um evento e fornecer um valor constante em seu lugar.

### Uso 1: Definindo um Estado Fixo em Resposta a um Evento

Este é o caso de uso mais comum. Você quer que um estado mude para um valor específico e pré-determinado quando um evento ocorre, sem se importar com os dados que o evento possa carregar.

**Cenário**: Um painel de login deve exibir a mensagem "Conectando..." sempre que o botão de "Login" for clicado. O evento de clique não carrega nenhum dado útil, então usamos `always` para fornecer a string de texto.

**HTML:**

```html
<login-status on="#login-btn/click:setter/statusMessage|always=Conectando..."></login-status>

<button id="login-btn">Entrar</button>
```

**Fluxo:**

1.  O botão `#login-btn` é clicado. O `CustomEvent` do clique é o dado inicial no pipeline.
2.  O spark `always=Conectando...` ignora completamente o objeto do evento.
3.  Ele retorna a string `'Conectando...'`.
4.  O resultado é passado para o setter `statusMessage` do componente `<login-status>`.

### Uso 2: Resetando um Estado para um Valor Padrão

O `always` é perfeito para ações de "reset".

**Cenário**: Um componente exibe um contador. Um botão externo "Zerar Contador" dispara um evento `reset`. O contador deve voltar a `0`.

**HTML:**

```html
<counter-display on="*/reset:setter/count|always=0"></counter-display>

<button onclick="dispatchEvent(new CustomEvent('reset'))">Zerar Contador</button>
```

Neste caso, o `always=0` garante que o setter `count` do `<counter-display>` receberá o número `0`, resetando o estado do componente.

## Descrição Técnica

A implementação do `always` é minimalista e revela seu propósito:

```javascript
// A função recebe o valor do pipeline (_token) e o valor do argumento (value)
// e retorna apenas o segundo.
const always = (_token, value) => value; //
```

  - `_token`: Representa o dado que vem do passo anterior no pipeline (seja o `event.detail` ou o resultado de outro spark). O underscore `_` é uma convenção para indicar que este parâmetro é intencionalmente ignorado.
  - `value`: Este é o valor que você define no atributo `on` após o sinal de igual (ex: o `'Conectando...'` em `always=Conectando...`).

Ele efetivamente **substitui** o fluxo de dados por um valor constante, tornando-o uma ferramenta previsível e segura para definir estados fixos.
