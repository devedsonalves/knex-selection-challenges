## Como rodar o projeto Backend

### 1. Pré-requisitos

- **Node.js** (versão 18 ou superior recomendada)
- **npm** (geralmente já vem com o Node)
- **Git** (opcional, para clonar o repositório)

> **Obs:** O projeto utiliza **SQLite** como banco de dados, não é necessário instalar nada extra para o banco.

---

### 2. Instalação

Clone o repositório e acesse a pasta do projeto:

```sh
git clone <URL_DO_REPOSITORIO>
cd backend
```

Instale as dependências:

```sh
npm install
```

---

### 3. Configuração do Banco de Dados

O projeto já está configurado para usar SQLite.  
Para criar o banco e aplicar as migrations, rode:

```sh
npx prisma migrate deploy
```

Se quiser visualizar o banco de dados, rode:

```sh
npx prisma studio
```

---

### 4. Rodando o Servidor

Para iniciar o servidor em modo desenvolvimento:

```sh
npm run dev
```

O servidor irá rodar por padrão em `http://localhost:3333`.

---

### 5. Endpoints Disponíveis

- **POST `/processar-dados`**  
  Faz o processamento dos dados da api e passa pro banco de dados

- **GET `/deputados?uf=XX`**  
  Lista deputados filtrando por UF (ex: `uf=SP`).

- **GET `/despesas`**  
  Lista despesas, com filtros opcionais.

- **GET `/relatorios/total-despesas`**  
  Retorna o total geral de despesas.

- **GET `/relatorios/deputados/:id/total-despesas`**  
  Retorna o total de despesas de um deputado específico.

---

### 6. Observações

- O banco de dados fica em `prisma/dev.db`.
- O upload de dados deve ser feito via endpoint `/processar-dados` antes de consultar deputados ou despesas.
- O projeto utiliza TypeScript e Fastify.
