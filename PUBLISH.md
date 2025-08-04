# 📦 Como Publicar o Pacote no NPM

Este guia explica como publicar o pacote `ts-class-mixing` no NPM.

## 🚀 Pré-requisitos

### 1. Conta no NPM
- Crie uma conta em [npmjs.com](https://www.npmjs.com/)
- Verifique seu email

### 2. Login no NPM CLI
```bash
npm login
```
- Digite seu username, password e email
- Se usar 2FA, digite o código quando solicitado

### 3. Verificar Login
```bash
npm whoami
```

## 📋 Checklist Antes da Publicação

### ✅ Verificações Obrigatórias

1. **Testes passando:**
   ```bash
   npm test
   ```

2. **Build funcionando:**
   ```bash
   npm run build
   ```

3. **Performance OK:**
   ```bash
   npm run perf
   ```

4. **Verificar arquivos que serão publicados:**
   ```bash
   npm pack --dry-run
   ```

5. **Verificar se o nome está disponível:**
   ```bash
   npm view ts-class-mixing
   ```
   - Se retornar erro 404, o nome está disponível
   - Se retornar dados, o nome já existe

## 🔄 Processo de Publicação

### Opção 1: Publicação Manual

#### Para correções (patch - 1.0.0 → 1.0.1):
```bash
npm run publish:patch
```

#### Para novas funcionalidades (minor - 1.0.0 → 1.1.0):
```bash
npm run publish:minor
```

#### Para mudanças breaking (major - 1.0.0 → 2.0.0):
```bash
npm run publish:major
```

### Opção 2: Publicação Passo a Passo

1. **Atualizar versão:**
   ```bash
   npm version patch  # ou minor/major
   ```

2. **Publicar:**
   ```bash
   npm publish
   ```

### Opção 3: Primeira Publicação

Se for a primeira vez publicando:

```bash
# Build e teste
npm run build
npm test

# Publicar
npm publish
```

## 🏷️ Versionamento Semântico

Siga o [Semantic Versioning](https://semver.org/):

- **PATCH** (1.0.1): Bug fixes, sem breaking changes
- **MINOR** (1.1.0): Novas funcionalidades, sem breaking changes  
- **MAJOR** (2.0.0): Breaking changes

### Exemplos:
- Corrigir bug no mixin: `patch`
- Adicionar novo método `isOfType`: `minor`
- Mudar API do constructor: `major`

## 🔒 Publicação com Escopo (Opcional)

Se quiser publicar com escopo (ex: `@seu-username/ts-class-mixing`):

1. **Alterar nome no package.json:**
   ```json
   {
     "name": "@seu-username/ts-class-mixing"
   }
   ```

2. **Publicar:**
   ```bash
   npm publish --access public
   ```

## 🤖 Automação com GitHub Actions

### Opção: Publicação Automática

Crie `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm ci
      - run: npm run build
      - run: npm test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**Para usar:**
1. Gere um token no NPM: [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens)
2. Adicione como secret `NPM_TOKEN` no GitHub
3. Crie uma release no GitHub para publicar automaticamente

## 📊 Após a Publicação

### Verificar Publicação
```bash
npm view ts-class-mixing
```

### Testar Instalação
```bash
# Em outro diretório
mkdir test-install
cd test-install
npm init -y
npm install ts-class-mixing
```

### Atualizar README
Adicione badge de versão:
```markdown
[![npm version](https://badge.fury.io/js/ts-class-mixing.svg)](https://badge.fury.io/js/ts-class-mixing)
```

## 🚨 Troubleshooting

### Erro: "Package name already exists"
- Mude o nome no `package.json`
- Ou use escopo: `@seu-username/ts-class-mixing`

### Erro: "You must be logged in"
```bash
npm logout
npm login
```

### Erro: "403 Forbidden"
- Verifique se tem permissão para publicar
- Se usar 2FA, certifique-se de estar autenticado

### Erro: "Files missing in package"
- Verifique se `dist/` existe
- Execute `npm run build` antes de publicar

## 📈 Monitoramento

### Estatísticas de Download
- [npmjs.com/package/ts-class-mixing](https://www.npmjs.com/package/ts-class-mixing)
- [npm-stat.com](https://npm-stat.com/charts.html?package=ts-class-mixing)

### Atualizações
- Configure notificações no NPM
- Monitor dependents no GitHub

---

## 🎉 Primeira Publicação - Comando Completo

```bash
# 1. Verificar tudo
npm test && npm run build && npm run perf

# 2. Login (se necessário)
npm login

# 3. Publicar
npm publish

# 4. Verificar
npm view ts-class-mixing
```

**Parabéns! Seu pacote está no NPM! 🚀**
