# @nodusjs/std

`@nodusjs/std` é a biblioteca de utilitários padrão do ecossistema Nodus. Ela fornece diretivas, helpers DOM, event emitters, streams funcionais e outros módulos reutilizáveis que simplificam a construção de Web Components e dataflows declarativos.

> ⚠️  Este projeto está em desenvolvimento ativo. APIs e pacotes podem mudar entre versões menores.

## Instalação

### npm / yarn / bun

```bash
# usando npm
npm install @nodusjs/std

# usando yarn
yarn add @nodusjs/std

# usando bun
bun add @nodusjs/std
````

#### Importação

Para usar os módulos do `@nodusjs/std`, basta importá-los diretamente:

```js
import { define, attributeChanged } from "@nodusjs/std/directive";
import { paint, repaint } from "@nodusjs/std/dom";
import on from "@nodusjs/std/event";
```

## Scripts Úteis

* `bun dev` — Inicia o servidor de desenvolvimento (utilize o Vite configurado no monorepo).
* `bun run build` — Gera os pacotes para distribuição (CommonJS + ES Modules).
* `bun run test` — Executa a suíte de testes com Vitest.

## Contribuindo

Contribuições são muito bem-vindas! Siga nosso [Guia de Contribuição](CONTRIBUTING.md) para reportar bugs, sugerir melhorias e submeter pull requests.

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.
