# Instruções para Executar o Projeto

## 📋 Descrição do Projeto

Este é um projeto frontend desenvolvido para o teste técnico da Knex Empresa Júnior de Computação. A aplicação implementa um CRUD de posts de usuário utilizando as APIs RandomUser e JSONPlaceholder, com interface moderna e responsiva.

### 🎯 Funcionalidades Principais

- **Perfil do Usuário**: Exibe informações do usuário aleatório (nome, foto, email, telefone, idade, localização)
- **Feed de Posts**: Lista posts com informações completas
- **CRUD de Posts**: Criar, ler, atualizar e deletar posts
- **Formulários Validados**: Validação em tempo real com feedback visual
- **Interface Responsiva**: Design adaptável para diferentes dispositivos

## 🛠️ Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)

### Verificando as Instalações

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version

# Ou verificar versão do yarn (se preferir usar yarn)
yarn --version
```

## 🚀 Como Executar o Projeto

### 1. Clone o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd frontend
```

### 2. Instale as Dependências

```bash
# Usando npm
npm install

# Ou usando yarn
yarn install
```

### 3. Execute o Projeto em Modo de Desenvolvimento

```bash
# Usando npm
npm run dev

# Ou usando yarn
yarn dev
```

O projeto será iniciado em `http://localhost:3000`

## 🏗️ Tecnologias Utilizadas

### Frontend
- **React** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento da aplicação
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Componentes UI modernos

### Gerenciamento de Estado e Dados
- **Zustand** - Gerenciamento de estado
- **React Query (TanStack Query)** - Gerenciamento de cache e estado do servidor
- **Axios** - Cliente HTTP para requisições

### Formulários e Validação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **@hookform/resolvers** - Integração entre React Hook Form e Zod

### Outras Bibliotecas
- **Lucide React** - Ícones
- **Sonner** - Notificações toast
- **js-cookie** - Gerenciamento de cookies
- **crypto-js** - Criptografia para tokens

## 🌐 APIs Utilizadas

### RandomUser API
- **URL**: https://randomuser.me/api/
- **Propósito**: Obter dados do usuário aleatório (nome, foto, email, etc.)

### JSONPlaceholder API
- **URL**: https://jsonplaceholder.typicode.com/
- **Propósito**: CRUD de posts (GET, POST, PUT, DELETE)

### Linting e Formatação
- **ESLint** configurado para React e TypeScript
- **Prettier** para formatação de código

## 🧪 Testes

Para executar os testes:

```bash
npm test
```

## 📝 Notas Importantes

1. **Tokens de Usuário**: Os tokens são armazenados em cookies para persistência
2. **Cache de Dados**: A aplicação utiliza React Query para cache inteligente
3. **Validação em Tempo Real**: Formulários validam dados conforme o usuário digita
4. **Feedback Visual**: Todas as ações têm feedback visual claro para o usuário