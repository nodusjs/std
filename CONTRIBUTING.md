# Guia de Contribuição para **@nodusjs/std**

Obrigado por seu interesse em contribuir para o **@nodusjs/std**! Sua ajuda é essencial para manter esta biblioteca de utilitários robusta e útil para toda a comunidade Nodus. Siga este passo a passo para colaborar de forma eficaz.

## Formas de Contribuir

- **Reportar Bugs**: encontrou um comportamento inesperado? Abra uma issue detalhando o problema e, se possível, forneça um exemplo mínimo para reproduzir.  
- **Sugerir Melhorias**: tem ideias para novos helpers, diretivas ou otimizações? Abra uma issue descrevendo sua proposta de forma clara.  
- **Enviar Pull Requests**: já tem uma correção ou nova funcionalidade pronta? Envie um PR seguindo as orientações abaixo.

---

## Passo a Passo

### 1. Fork do Repositório

Clique em **Fork** no canto superior direito do repositório **@nodusjs/std**.

### 2. Clone para sua Máquina

```bash
git clone https://github.com/seu-usuario/std.git
cd std
````

### 3. Instale as Dependências

```bash
bun install
```

### 4. Crie sua Branch

```bash
git checkout -b minha-feature-std
```

Use um nome descritivo (e.g. `fix/attributeChanged-bug` ou `feat/dom-helper`).

### 5. Implemente as Alterações

* Siga as convenções de código existentes (use Biome para formatação).
* Mantenha docblocks (JSDoc/TSDoc) consistentes.
* Adicione ou atualize testes em `*.spec.ts` para cobrir o comportamento novo ou corrigido.

### 6. Rode os Testes Locais

```bash
bun run test
```

Certifique-se de que todos os testes passam antes de prosseguir.

### 7. Commit e Push

```bash
git add .
git commit -m "Descrição curta e clara do que foi feito"
git push origin minha-feature-std
```

### 8. Abra um Pull Request

No GitHub, abra um PR da sua branch **minha-feature-std** para **main**. No corpo do PR, inclua:

* **O que** foi alterado ou adicionado.
* **Por que** a mudança é necessária.
* **Como** testar manualmente (se aplicável).

---

## Diretrizes de Qualidade

* Use **aspas duplas** e **ponto‐e‐vírgula** sempre (conforme configuração do Biome).
* Mantenha o lint limpo (`biome check`).
* Documente qualquer API pública nova ou modificada com exemplos claros.
* Escreva testes que cubram casos de sucesso e de erro.

---

## Comunicação

* Se tiver dúvidas ou quiser discutir uma ideia antes de codificar, abra uma issue com o rótulo **discussion**.
* Seja respeitoso e colaborativo em todas as interações.

## Código de Conduta

Ao contribuir para **@nodusjs/std**, você concorda em seguir nosso [Código de Conduta](https://github.com/nodusjs/std/blob/main/CODE_OF_CONDUCT.md) e ajudar a manter um ambiente acolhedor e produtivo para todos.
